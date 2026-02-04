import { UserCircle2, ShieldCheck, Edit3 } from "lucide-react";

export const ProfileHeader = ({ name, editMode, setEditMode }: any) => (
  <div className="relative overflow-hidden bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
    <div className="relative flex flex-col md:flex-row items-center gap-6">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-xl">
        <UserCircle2 size={48} strokeWidth={1.5} />
      </div>
      <div className="text-center md:text-right flex-1 space-y-1">
        <h1 className="text-3xl font-black text-slate-900">{name}</h1>
        <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2 text-sm">
          <ShieldCheck size={16} className="text-emerald-500" /> مريض مسجل ونشط
        </p>
      </div>
      <button
        onClick={() => setEditMode(!editMode)}
        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
          editMode
            ? "bg-slate-100 text-slate-600"
            : "bg-slate-900 text-white hover:bg-black"
        }`}
      >
        {editMode ? (
          "إلغاء التعديل"
        ) : (
          <>
            <Edit3 size={18} /> تحرير البيانات
          </>
        )}
      </button>
    </div>
  </div>
);
