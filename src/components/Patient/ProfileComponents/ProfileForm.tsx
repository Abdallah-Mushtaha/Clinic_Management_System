import { User, Calendar, Mail, Phone, MapPin, Save } from "lucide-react";
import { InputField, GenderSelect } from "./ProfileComponents";

export const ProfileForm = ({
  formData,
  editMode,
  handleFormChange,
  onSubmit,
}: any) => (
  <form
    onSubmit={onSubmit}
    className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-8"
  >
    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-4">
      <User size={20} className="text-blue-500" /> المعلومات الشخصية
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="الاسم الكامل"
        icon={<User size={18} />}
        value={formData.name}
        editMode={editMode}
        onChange={handleFormChange("name")}
      />
      <InputField
        label="العمر"
        icon={<Calendar size={18} />}
        value={formData.age}
        type="number"
        editMode={editMode}
        onChange={handleFormChange("age")}
      />
      <GenderSelect
        value={formData.gender}
        editMode={editMode}
        onChange={handleFormChange("gender")}
      />
      <InputField
        label="البريد الإلكتروني"
        icon={<Mail size={18} />}
        value={formData.email}
        type="email"
        editMode={editMode}
        onChange={handleFormChange("email")}
      />
      <InputField
        label="رقم الهاتف"
        icon={<Phone size={18} />}
        value={formData.phone}
        type="tel"
        editMode={editMode}
        onChange={handleFormChange("phone")}
      />

      <div className="md:col-span-2 space-y-2">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <MapPin size={14} /> العنوان السكني
        </label>
        {editMode ? (
          <textarea
            value={formData.address}
            onChange={handleFormChange("address")}
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold h-24 resize-none"
          />
        ) : (
          <p className="p-4 bg-slate-50/50 rounded-2xl font-bold text-slate-700">
            {formData.address || "لا يوجد عنوان مسجل"}
          </p>
        )}
      </div>
    </div>

    {editMode && (
      <button
        type="submit"
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        <Save size={20} /> تأكيد وحفظ التغييرات
      </button>
    )}
  </form>
);
