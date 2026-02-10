import { useState } from "react";
import { Eye, Trash2, X, Activity, ShieldAlert, Syringe } from "lucide-react";

export default function PatientTable({ patients, onDelete }) {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="bg-white md:rounded-[2.5rem] rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Desktop Table: Hidden on Mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-right" dir="rtl">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-right">
                المريض
              </th>
              <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-right">
                الاتصال
              </th>
              <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">
                التفاصيل الحيوية
              </th>
              <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="group hover:bg-blue-50/20 transition-all"
              >
                <td className="px-8 py-6">
                  <div className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                    {patient.name}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    معرف: #{patient.id.slice(0, 8)}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-slate-700">
                    {patient.email}
                  </div>
                  <div className="text-xs text-blue-500 font-medium mt-1">
                    {patient.phone}
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <div className="flex justify-center gap-3">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold whitespace-nowrap">
                      العمر: {patient.age}
                    </span>
                    <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold">
                      {patient.bloodType}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 rounded-2xl transition-all shadow-sm cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(patient.id)}
                      className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 rounded-2xl transition-all shadow-sm cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards: Visible ONLY on Mobile */}
      <div className="block md:hidden divide-y divide-slate-50" dir="rtl">
        {patients.map((patient) => (
          <div key={patient.id} className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {patient.name}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                  ID: #{patient.id.slice(0, 8)}
                </p>
              </div>
              <div className="flex gap-1.5">
                <span className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-[9px] font-black">
                  {patient.bloodType}
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-black">
                  {patient.age} سنة
                </span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100/50">
              <p className="text-xs font-bold text-slate-700 truncate">
                {patient.email}
              </p>
              <p className="text-[11px] text-blue-500 font-black mt-0.5">
                {patient.phone}
              </p>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setSelectedPatient(patient)}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[11px] font-black shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Eye className="w-3.5 h-3.5" /> عرض الملف
              </button>
              <button
                onClick={() => onDelete(patient.id)}
                className="w-12 h-12 flex items-center justify-center bg-rose-50 text-rose-600 rounded-xl active:scale-95 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {patients.length === 0 && (
        <div className="py-20 text-center text-slate-300 font-medium">
          لم يتم العثور على مرضى
        </div>
      )}

      {/* Responsive Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white md:rounded-[3rem] rounded-t-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh] animate-in slide-in-from-bottom md:slide-in-from-none duration-300">
            {/* Header */}
            <div className="relative p-6 md:p-8 bg-slate-900 text-white shrink-0">
              <button
                onClick={() => setSelectedPatient(null)}
                className="absolute left-4 top-4 md:left-6 md:top-6 p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">
                الملف الطبي الشامل
              </div>
              <h2 className="text-xl md:text-3xl font-black">
                {selectedPatient.name}
              </h2>
              <p className="text-slate-400 mt-1 text-xs md:text-base leading-relaxed">
                {selectedPatient.address}
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm uppercase tracking-tight">
                  <ShieldAlert size={18} /> الحساسية
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.allergies?.map((a, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black"
                    >
                      {a}
                    </span>
                  )) || (
                    <span className="text-slate-300 text-xs italic">
                      لا يوجد
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-tight">
                  <Activity size={18} /> الأمراض المزمنة
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.chronicDiseases?.map((d, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black"
                    >
                      {d}
                    </span>
                  )) || (
                    <span className="text-slate-300 text-xs italic">
                      لا يوجد
                    </span>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-4 uppercase tracking-tight">
                  <Syringe size={18} /> العمليات الجراحية
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {selectedPatient.previousSurgeries?.map((s, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 bg-slate-50 text-slate-700 rounded-xl text-xs font-bold border border-slate-100/50"
                    >
                      • {s}
                    </div>
                  )) || (
                    <span className="text-slate-300 text-xs italic">
                      لم يخضع لعمليات
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Safe Area for Mobile */}
            <div className="h-6 md:hidden shrink-0 bg-white"></div>
          </div>
        </div>
      )}
    </div>
  );
}
