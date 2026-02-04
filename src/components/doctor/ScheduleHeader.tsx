import { ShieldCheck } from "lucide-react";

export const ScheduleHeader = ({ editMode, setEditMode }: any) => (
  <header className="flex justify-between items-center bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
        <ShieldCheck size={24} />
      </div>
      <div>
        <h1 className="text-xl font-black text-slate-800">
          إدارة الجدول الزمني
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1">
          تحديد أوقات التوفر والإجازات
        </p>
      </div>
    </div>
    <button
      onClick={() => setEditMode(!editMode)}
      className={`px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all ${
        editMode
          ? "bg-red-50 text-red-600 border border-red-100"
          : "bg-slate-800 text-white hover:bg-slate-700 shadow-md"
      }`}
    >
      {editMode ? "إلغاء التعديل" : "تعديل الجدول"}
    </button>
  </header>
);
