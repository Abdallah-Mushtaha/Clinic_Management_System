import { Award } from "lucide-react";

export const ProfileHeader = ({
  name,
  specialty,
  isEdit,
  onToggleEdit,
}: any) => (
  <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl">
    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl font-black">
          {name?.[0]}
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight">{name}</h1>
          <p className="text-blue-300 font-medium flex items-center gap-2 mt-1">
            <Award size={18} /> {specialty}
          </p>
        </div>
      </div>
      <button
        onClick={onToggleEdit}
        className={`${isEdit ? "bg-rose-500" : "bg-white text-slate-900"} h-14 px-8 rounded-2xl font-black transition-all active:scale-95`}
      >
        {isEdit ? "إلغاء التعديل" : "تعديل البيانات"}
      </button>
    </div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
  </div>
);

export const InfoField = ({
  label,
  value,
  icon: Icon,
  isEdit,
  onChange,
  type = "text",
  name,
}: any) => (
  <div className="space-y-2 group">
    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
      {Icon && <Icon size={14} className="text-blue-500" />} {label}
    </label>
    {isEdit ? (
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium text-slate-700"
      />
    ) : (
      <div className="p-4 bg-white border border-slate-100 rounded-2xl group-hover:border-blue-200 transition-colors shadow-sm">
        <span className="text-slate-900 font-bold">{value || "—"}</span>
      </div>
    )}
  </div>
);
