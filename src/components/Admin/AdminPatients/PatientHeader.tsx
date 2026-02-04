import { Users } from "lucide-react";

export default function PatientHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <div className="flex items-center gap-5">
        <div className="bg-blue-50 p-4 rounded-3xl">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            إدارة المرضى
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            مراقبة وتنظيم سجلات المستفيدين من الخدمة
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-xs font-bold text-slate-600">
          النظام متصل وقيد التشغيل
        </span>
      </div>
    </div>
  );
}
