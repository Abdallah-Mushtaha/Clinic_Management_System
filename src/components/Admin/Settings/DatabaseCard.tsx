import { Database, Download } from "lucide-react";

export const DatabaseCard = ({ dbStats, onExport }: any) => (
  <div className="space-y-8">
    <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-900/20">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-lg text-blue-400">
          <Database size={20} />
        </div>
        إدارة البيانات
      </h2>
      <div className="space-y-6">
        <div className="bg-white/5 p-4 rounded-2xl space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">إجمالي الأطباء</span>
            <span className="font-bold">{dbStats.details.doctors}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">إجمالي المرضى</span>
            <span className="font-bold">{dbStats.details.patients}</span>
          </div>
        </div>
        <div className="pt-2">
          <button
            onClick={onExport}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm text-white"
          >
            <Download size={18} />
            تصدير كملف JSON
          </button>
          <p className="text-[10px] text-slate-500 text-center mt-3">
            سيتم تصدير ملف يحتوي على كامل بيانات النظام الحالية
          </p>
        </div>
      </div>
    </section>
    <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100">
      <p className="text-amber-800 text-xs font-medium leading-relaxed">
        تغيير إعدادات التشفير يؤثر على عرض السجلات الطبية القديمة.
      </p>
    </div>
  </div>
);
