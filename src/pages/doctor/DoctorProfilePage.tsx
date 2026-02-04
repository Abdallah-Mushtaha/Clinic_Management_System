import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Save,
  Lock,
  Loader2,
  DollarSign,
} from "lucide-react";
import { useDoctorProfile } from "../../hooks/useDoctorProfile";
import {
  ProfileHeader,
  InfoField,
} from "../../components/doctor/DoctorProfile/ProfileComponents";
import toast from "react-hot-toast";

export default function DoctorProfilePage() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const { formData, isLoading, updateMutation, handleChange } =
    useDoctorProfile(user?.id);

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div
        className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500 text-right"
        dir="rtl"
      >
        <ProfileHeader
          name={formData.name}
          specialty={formData.specialty}
          isEdit={editMode}
          onToggleEdit={() => setEditMode(!editMode)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-800">
                  البيانات الشخصية
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField
                  label="الاسم الكامل"
                  name="name"
                  value={formData.name}
                  isEdit={editMode}
                  icon={User}
                  onChange={handleChange}
                />
                <InfoField
                  label="البريد الإلكتروني"
                  name="email"
                  value={formData.email}
                  isEdit={editMode}
                  icon={Mail}
                  onChange={handleChange}
                />
                <InfoField
                  label="رقم الهاتف"
                  name="phone"
                  value={formData.phone}
                  isEdit={editMode}
                  icon={Phone}
                  onChange={handleChange}
                />
                <InfoField
                  label="سعر الاستشارة"
                  name="consultationFee"
                  value={formData.consultationFee}
                  isEdit={editMode}
                  icon={DollarSign}
                  type="number"
                  onChange={handleChange}
                />
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Briefcase size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-800">
                  الخبرة المهنية
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InfoField
                  label="التخصص"
                  name="specialty"
                  value={formData.specialty}
                  isEdit={editMode}
                  onChange={handleChange}
                />
                <InfoField
                  label="سنوات الخبرة"
                  name="experience"
                  value={formData.experience}
                  type="number"
                  isEdit={editMode}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  المؤهلات العلمية
                </label>
                {editMode ? (
                  <textarea
                    value={formData.education}
                    onChange={(e) => handleChange("education", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 focus:ring-4 focus:ring-blue-500/10 outline-none"
                  />
                ) : (
                  <div className="p-6 bg-slate-50 rounded-[2rem] text-slate-700 leading-relaxed font-medium">
                    {formData.education}
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Lock size={24} />
                <h3 className="text-xl font-black">أمان الحساب</h3>
              </div>
              <button
                onClick={() => setPasswordMode(!passwordMode)}
                className="w-full h-14 bg-white/20 hover:bg-white/30 rounded-2xl font-bold backdrop-blur-md"
              >
                تغيير كلمة المرور
              </button>
              {passwordMode && (
                <div className="mt-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <input
                    type="password"
                    placeholder="الكلمة الجديدة"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl outline-none"
                  />
                  <button
                    onClick={() => {
                      toast.success("تم التحديث");
                      setPasswordMode(false);
                    }}
                    className="w-full bg-white text-indigo-600 rounded-xl font-black h-12"
                  >
                    تحديث الآن
                  </button>
                </div>
              )}
            </div>
            {editMode && (
              <div className="sticky top-6">
                <button
                  onClick={() => updateMutation.mutate(formData)}
                  disabled={updateMutation.isPending}
                  className="w-full h-20 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[2rem] text-xl font-black shadow-2xl flex flex-col items-center justify-center"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Save size={24} /> <span>حفظ التغييرات</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
