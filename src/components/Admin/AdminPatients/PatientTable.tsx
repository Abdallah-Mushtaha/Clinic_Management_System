import { useState } from "react";
import { Eye, Trash2, X, Activity, ShieldAlert, Syringe } from "lucide-react";

export default function PatientTable({ patients, onDelete }) {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-right">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr>
            <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              المريض
            </th>
            <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
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

      {patients.length === 0 && (
        <div className="py-20 text-center text-slate-300 font-medium">
          لم يتم العثور على مرضى بهذا الاسم
        </div>
      )}

      {selectedPatient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative p-8 bg-slate-900 text-white">
              <button
                onClick={() => setSelectedPatient(null)}
                className="absolute left-6 top-6 p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">
                الملف الطبي الشامل
              </div>
              <h2 className="text-3xl font-black">{selectedPatient.name}</h2>
              <p className="text-slate-400 mt-2">{selectedPatient.address}</p>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-rose-600 font-bold">
                  <ShieldAlert className="w-5 h-5" /> الحساسية
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.allergies?.map((a, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold"
                    >
                      {a}
                    </span>
                  )) || "لا يوجد"}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-600 font-bold">
                  <Activity className="w-5 h-5" /> الأمراض المزمنة
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.chronicDiseases?.map((d, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold"
                    >
                      {d}
                    </span>
                  )) || "لا يوجد"}
                </div>
              </div>

              <div className="md:col-span-2 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-900 font-bold mb-4">
                  <Syringe className="w-5 h-5" /> العمليات الجراحية السابقة
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.previousSurgeries?.map((s, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      {s}
                    </span>
                  )) || "لم يخضع لعمليات"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
