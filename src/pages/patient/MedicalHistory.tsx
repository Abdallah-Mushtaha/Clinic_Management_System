import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import {
  Heart,
  AlertTriangle,
  Syringe,
  Save,
  Activity,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useMedicalHistory } from "../../hooks/PatientHooks/useMedicalHistory";
import { MEDICAL_OPTIONS } from "../../components/Patient/MedicalSection/constants";
import { MedicalSection } from "../../components/Patient/MedicalSection/MedicalSection";

export default function MedicalHistoryPage() {
  const { user } = useAuth();
  const {
    formData,
    setFormData,
    editMode,
    setEditMode,
    isLoading,
    isSubmitting,
    toggleItem,
    handleSave,
  } = useMedicalHistory(user?.id);

  const onSave = async () => {
    const res = await handleSave();
    if (!res.success) alert("فشل في حفظ البيانات");
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-blue-100 animate-spin" />
      </div>
    );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#FBFCFE] py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[32px] shadow-sm border border-slate-50 gap-6">
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-emerald-400 mb-1">
                <ShieldCheck size={16} />
                <span className="text-[9px] font-bold uppercase tracking-widest">
                  سجل طبي مشفر
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                الملف الصحي
              </h1>
              <p className="text-slate-400 text-sm">
                إدارة التاريخ الطبي لضمان رعاية أفضل
              </p>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-8 py-3.5 rounded-2xl font-bold text-[11px] tracking-wider transition-all duration-300 ${
                editMode
                  ? "bg-rose-50 text-rose-400"
                  : "bg-blue-500 text-white hover:bg-blue-600 shadow-md shadow-blue-100"
              }`}
            >
              {editMode ? "إلغاء التعديل" : "تحديث السجل"}
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 bg-white p-10 rounded-[40px] border border-rose-50 flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-300">
                <Heart size={32} strokeWidth={1.5} />
              </div>
              <div className="text-center w-full">
                <span className="text-[10px] text-rose-200 font-bold uppercase block mb-3">
                  فصيلة الدم
                </span>
                {editMode ? (
                  <div className="grid grid-cols-4 gap-2">
                    {MEDICAL_OPTIONS.bloodTypes.map((bt) => (
                      <button
                        key={bt}
                        onClick={() =>
                          setFormData({ ...formData, bloodType: bt })
                        }
                        className={`py-2 rounded-lg text-[10px] font-bold transition-all ${
                          formData.bloodType === bt
                            ? "bg-rose-400 text-white shadow-sm"
                            : "bg-rose-50/50 text-rose-300 border border-rose-100/50"
                        }`}
                      >
                        {bt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <h2 className="text-6xl font-black text-rose-400/80 tracking-tighter">
                    {formData.bloodType || "--"}
                  </h2>
                )}
              </div>
            </div>

            <div className="md:col-span-8">
              <MedicalSection
                title="الحساسية"
                icon={AlertTriangle}
                color="amber"
                selected={formData.allergies}
                options={MEDICAL_OPTIONS.allergies}
                isEdit={editMode}
                onToggle={(v) => toggleItem("allergies", v)}
              />
            </div>

            <div className="md:col-span-6">
              <MedicalSection
                title="الأمراض المزمنة"
                icon={Syringe}
                color="blue"
                selected={formData.chronicDiseases}
                options={MEDICAL_OPTIONS.chronicDiseases}
                isEdit={editMode}
                onToggle={(v) => toggleItem("chronicDiseases", v)}
              />
            </div>

            <div className="md:col-span-6">
              <MedicalSection
                title="السجل الجراحي"
                icon={Activity}
                color="green"
                selected={formData.previousSurgeries}
                options={MEDICAL_OPTIONS.surgeries}
                isEdit={editMode}
                onToggle={(v) => toggleItem("previousSurgeries", v)}
              />
            </div>
          </div>

          {editMode && (
            <div className="flex justify-center pt-4 animate-in fade-in slide-in-from-bottom-4">
              <button
                onClick={onSave}
                disabled={isSubmitting}
                className="bg-slate-800 text-white px-12 py-4 rounded-2xl font-bold text-[11px] hover:bg-black transition-all shadow-xl flex items-center gap-3"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin w-4" />
                ) : (
                  <>
                    <Save size={16} /> حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
