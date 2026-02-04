import { X, Save, FilePlus } from "lucide-react";

interface FormHeaderProps {
  isEditMode: boolean;
  onClose: () => void;
}

export const FormHeader = ({ isEditMode, onClose }: FormHeaderProps) => (
  <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
    <div className="flex items-center gap-3">
      <div
        className={`p-2 rounded-xl ${isEditMode ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}
      >
        {isEditMode ? <Save size={20} /> : <FilePlus size={20} />}
      </div>
      <h2 className="text-xl font-black text-slate-800">
        {isEditMode ? "تعديل السجل الطبي" : "إنشاء سجل طبي جديد"}
      </h2>
    </div>
    <button
      onClick={onClose}
      className="p-2 bg-white border border-slate-100 rounded-full hover:text-red-500 transition-all shadow-sm cursor-pointer"
    >
      <X size={20} />
    </button>
  </div>
);
