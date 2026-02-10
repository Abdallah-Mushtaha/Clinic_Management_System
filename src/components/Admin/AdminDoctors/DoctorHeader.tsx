import { Plus } from "lucide-react";

export default function DoctorHeader({ onAddClick }) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-4xl font-black text-slate-900">
        إدارة الأطباء
      </h1>
      <button
        onClick={onAddClick}
        className="group relative flex items-center gap-2 md:gap-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl md:rounded-2xl h-12 md:h-16 px-4 md:px-8 transition-all duration-300 shadow-xl hover:shadow-blue-200 active:scale-95 overflow-hidden cursor-pointer shrink-0"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        <div className="bg-white/10 p-1.5 md:p-2 rounded-lg md:rounded-xl group-hover:bg-white/20 transition-colors">
          <Plus className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:rotate-90 transition-transform duration-500" />
        </div>
        <span className="text-sm md:text-lg font-bold tracking-wide whitespace-nowrap">
          إضافة طبيب
        </span>
      </button>
    </div>
  );
}
