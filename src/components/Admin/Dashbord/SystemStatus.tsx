import { Globe } from "lucide-react";

export const SystemStatus = () => (
  <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 pr-6 rounded-[2rem] border border-slate-100 shadow-sm">
    <div className="flex flex-col items-end text-right">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
        حالة النظام الآن
      </span>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
          متصل ومستقر
        </span>
      </div>
    </div>
    <div className="h-10 w-[1px] bg-slate-100 mx-2 shrink-0"></div>
    <div className="bg-slate-900 p-2.5 rounded-2xl text-white shadow-lg shrink-0">
      <Globe className="h-5 w-5 animate-spin-slow" />
    </div>
  </div>
);
