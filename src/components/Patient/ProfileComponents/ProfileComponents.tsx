import { User, Lock, Hash } from "lucide-react";

export const InputField = ({
  label,
  icon,
  value,
  editMode,
  onChange,
  type = "text",
}: any) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
      {icon} {label}
    </label>
    {editMode ? (
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold transition-all text-slate-800"
      />
    ) : (
      <p className="p-4 bg-slate-50/50 rounded-2xl font-bold text-slate-700 border border-transparent">
        {value || "-"}
      </p>
    )}
  </div>
);

export const PassInput = ({ label, value, onChange }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase mr-1">
      {label}
    </label>
    <input
      type="password"
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-bold transition-all text-sm"
      required
    />
  </div>
);

export const GenderSelect = ({ value, editMode, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
      <Hash size={14} /> الجنس
    </label>
    {editMode ? (
      <select
        value={value}
        onChange={onChange}
        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-800"
      >
        <option value="ذكر">ذكر</option>
        <option value="أنثى">أنثى</option>
      </select>
    ) : (
      <p className="p-4 bg-slate-50/50 rounded-2xl font-bold text-slate-700">
        {value || "غير محدد"}
      </p>
    )}
  </div>
);
