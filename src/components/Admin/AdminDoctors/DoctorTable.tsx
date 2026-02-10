import { Edit3, Trash2, GraduationCap } from "lucide-react";

export default function DoctorTable({ doctors, onEdit, onDelete, isPending }) {
  return (
    <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="hidden md:block overflow-x-auto custom-scrollbar">
        <table className="w-full text-right" dir="rtl">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-10 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-right">
                الطبيب
              </th>
              <th className="px-10 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-right">
                التخصص والخبرة
              </th>
              <th className="px-10 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">
                الرسوم
              </th>
              <th className="px-10 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="group hover:bg-slate-50/40 transition-all"
              >
                <td className="px-10 py-8">
                  <div className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                    {doctor.name}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {doctor.email}
                  </div>
                  {doctor.phone && (
                    <div className="text-[10px] text-blue-500 mt-1">
                      {doctor.phone}
                    </div>
                  )}
                </td>
                <td className="px-10 py-8">
                  <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-black mb-2">
                    {doctor.specialty}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <GraduationCap className="w-3 h-3" /> {doctor.experience}{" "}
                    سنوات خبرة
                  </div>
                </td>
                <td className="px-10 py-8 text-center">
                  <span className="text-xl font-black text-slate-900">
                    {doctor.consultationFee}
                  </span>
                  <span className="text-[10px] text-slate-400 mr-1 italic">
                    جنيه مصري
                  </span>
                </td>
                <td className="px-10 py-8 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(doctor)}
                      className="p-3 bg-white border border-slate-100 text-slate-600 hover:text-blue-600 rounded-2xl transition-all shadow-sm"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(doctor.id)}
                      disabled={isPending}
                      className="p-3 bg-white border border-slate-100 text-slate-600 hover:text-rose-600 rounded-2xl transition-all shadow-sm disabled:opacity-50"
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

      <div className="md:hidden divide-y divide-slate-50" dir="rtl">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-black text-slate-900 text-base">
                  {doctor.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium truncate max-w-[150px]">
                  {doctor.email}
                </p>
                <p className="text-[10px] text-blue-500 font-bold">
                  {doctor.phone}
                </p>
              </div>
              <div className="text-left bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                <p className="text-sm font-black text-slate-900 leading-none">
                  {doctor.consultationFee}
                </p>
                <p className="text-[8px] text-slate-400 font-black uppercase mt-1">
                  ج.م
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-2xl border border-blue-100/30">
              <div className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black">
                {doctor.specialty}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                {doctor.experience} سنة خبرة
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(doctor)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-black active:scale-95 transition-all"
              >
                <Edit3 className="w-4 h-4" /> تعديل
              </button>
              <button
                onClick={() => onDelete(doctor.id)}
                disabled={isPending}
                className="w-12 h-12 flex items-center justify-center bg-rose-50 text-rose-600 rounded-xl active:scale-95 transition-all disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="py-20 text-center text-slate-300 font-medium">
          لم يتم العثور على أطباء
        </div>
      )}
    </div>
  );
}
