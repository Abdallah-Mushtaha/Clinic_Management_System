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
    "w-full p-5 md:p-6 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition-all";
  const labelClass =
    "text-sm font-black text-slate-500 flex items-center gap-2";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl border-t-8 border-blue-600 animate-in fade-in slide-in-from-top-10 duration-500 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 md:mb-10 pb-4 md:pb-6 border-b border-slate-50">
        <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-3">
          <Briefcase className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />{" "}
          {editingId ? "تحديث القسم" : "قسم جديد"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 md:p-3 bg-slate-50 rounded-xl md:rounded-2xl hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-3">
            <label className={labelClass}>
              <AlertCircle size={16} /> اسم القسم
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${inputClass} font-black text-lg md:text-xl`}
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

        <div className="space-y-4 md:space-y-6">
          <label className="text-sm font-black text-slate-700 flex items-center gap-2">
            <UserCheck size={20} /> الطاقم ({formData.doctorIds.length})
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 p-4 md:p-6 bg-slate-50/50 rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-dashed border-slate-200 max-h-[280px] md:max-h-[300px] overflow-y-auto custom-scrollbar">
            {doctors.map((doc) => {
              const isSelected = formData.doctorIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDoctor(doc.id)}
                  className={`relative cursor-pointer p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all flex flex-col items-center text-center ${
                    isSelected
                      ? "border-blue-500 bg-white ring-4 ring-blue-50"
                      : "border-transparent bg-white/60 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black mb-2 shrink-0 text-xs md:text-base ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {doc.name[0]}
                  </div>
                  <div className="w-full">
                    <span className="text-[10px] md:text-xs font-black block truncate text-slate-800">
                      {doc.name}
                    </span>
                    <span className="text-[8px] md:text-[10px] font-bold block truncate text-blue-600 uppercase">
                      {doc.specialty}
                    </span>
                  </div>
                  {isSelected && (
                    <Check
                      className="absolute top-1.5 left-1.5 md:top-2 md:left-2 text-blue-600"
                      size={14}
                      strokeWidth={4}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <button
            type="submit"
            className="w-full md:flex-1 h-14 md:h-16 bg-emerald-500 text-white rounded-xl md:rounded-[1.25rem] font-black flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all active:scale-95 cursor-pointer order-1 md:order-2"
          >
            <Save className="ml-2 w-5 h-5 md:w-6 md:h-6" /> حفظ البيانات
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full md:w-auto md:px-12 h-14 md:h-16 rounded-xl md:rounded-[1.25rem] border-2 border-slate-100 font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer order-2 md:order-1"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};
