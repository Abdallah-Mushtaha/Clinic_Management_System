import React, { ChangeEvent, FormEvent } from "react";
import {
  X,
  Briefcase,
  AlertCircle,
  Info,
  UserCheck,
  Check,
  Save,
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface FormData {
  name: string;
  description: string;
  doctorIds: string[];
}

interface DepartmentFormProps {
  editingId: string | null;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  doctors: Doctor[];
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  toggleDoctor: (id: string) => void;
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({
  editingId,
  formData,
  setFormData,
  doctors = [],
  onClose,
  onSubmit,
  toggleDoctor,
}) => {
  const inputClass =
    "w-full p-6 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition-all";
  const labelClass =
    "text-sm font-black text-slate-500 flex items-center gap-2";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-t-8 border-blue-600 animate-in fade-in slide-in-from-top-10 duration-500">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          <Briefcase className="text-blue-600" />{" "}
          {editingId ? "تحديث القسم" : "قسم جديد"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-3 bg-slate-50 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className={labelClass}>
              <AlertCircle size={16} /> اسم القسم
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${inputClass} font-black text-xl`}
              required
            />
          </div>
          <div className="space-y-3">
            <label className={labelClass}>
              <Info size={16} /> الوصف
            </label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-sm font-black text-slate-700 flex items-center gap-2">
            <UserCheck size={20} /> الطاقم ({formData.doctorIds.length})
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 max-h-[300px] overflow-y-auto">
            {doctors.map((doc) => {
              const isSelected = formData.doctorIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDoctor(doc.id)}
                  className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center ${
                    isSelected
                      ? "border-blue-500 bg-white ring-4 ring-blue-50"
                      : "border-transparent bg-white/60 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black mb-2 shrink-0 ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {doc.name[0]}
                  </div>
                  <div className="w-full">
                    <span className="text-xs font-black block truncate text-slate-800">
                      {doc.name}
                    </span>
                    <span className="text-[10px] font-bold block truncate text-blue-600 uppercase">
                      {doc.specialty}
                    </span>
                  </div>
                  {isSelected && (
                    <Check
                      className="absolute top-2 left-2 text-blue-600"
                      size={14}
                      strokeWidth={4}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 h-16 bg-emerald-500 text-white rounded-[1.25rem] font-black flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all active:scale-95"
          >
            <Save className="ml-2" /> حفظ البيانات
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-16 px-12 rounded-[1.25rem] border-2 border-slate-100 font-bold text-slate-500 hover:bg-slate-50 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};
