import { ArrowRight } from "lucide-react";

export const HistoryHeader = ({ patientName }: { patientName?: string }) => (
  <header className="bg-white p-8 rounded-[32px] shadow-sm flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-black text-gray-900">سجلات المريض</h1>
      {patientName && (
        <p className="text-gray-500 mt-1 font-bold">{patientName}</p>
      )}
    </div>
    <button
      onClick={() => window.history.back()}
      className="group flex items-center gap-4 p-1.5 pe-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-100 transition-all"
    >
      <div className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-[14px] group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        <ArrowRight
          size={20}
          className="group-hover:translate-x-1 transition-transform"
        />
      </div>
      <div className="flex flex-col text-right">
        <span className="text-[9px] font-black text-slate-400 uppercase">
          العودة إلى
        </span>
        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">
          سجل المرضى
        </span>
      </div>
    </button>
  </header>
);
