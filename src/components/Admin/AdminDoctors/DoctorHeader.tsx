import { Plus } from "lucide-react";

export default function DoctorHeader({ onAddClick }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
      <h1 className="text-4xl font-black text-slate-900">إدارة الأطباء</h1>
      <button
        onClick={onAddClick}
        className="group relative flex items-center gap-3 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl h-16 px-8 transition-all duration-300 shadow-xl hover:shadow-blue-200 active:scale-95 overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
          <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-500" />
        </div>
        <span className="text-lg font-bold tracking-wide">إضافة طبيب</span>
      </button>
    </div>
  );
}
