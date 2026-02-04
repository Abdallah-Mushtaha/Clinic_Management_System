import { Edit3, Trash2, GraduationCap } from "lucide-react";

export default function DoctorTable({ doctors, onEdit, onDelete, isPending }) {
  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-right">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr>
            <th className="px-10 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">الطبيب</th>
            <th className="px-10 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">التخصص والخبرة</th>
            <th className="px-10 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">الرسوم</th>
            <th className="px-10 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="group hover:bg-slate-50/40 transition-all">
              <td className="px-10 py-8">
                <div className="font-bold text-slate-900 text-lg">{doctor.name}</div>
                <div className="text-xs text-slate-400 font-medium">{doctor.email}</div>
                {doctor.phone && <div className="text-[10px] text-blue-500 mt-1">{doctor.phone}</div>}
              </td>
              <td className="px-10 py-8">
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-black mb-2">{doctor.specialty}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500"><GraduationCap className="w-3 h-3" /> {doctor.experience} سنوات خبرة</div>
              </td>
              <td className="px-10 py-8 text-center">
                <span className="text-xl font-black text-slate-900">{doctor.consultationFee}</span>
                <span className="text-[10px] text-slate-400 mr-1 italic">جنيه مصري</span>
              </td>
              <td className="px-10 py-8 text-center">
                <div className="flex justify-center gap-3">
                  <button onClick={() => onEdit(doctor)} className="p-3 bg-white cursor-pointer border border-slate-100 text-slate-600 hover:text-blue-600 hover:border-blue-100 rounded-2xl transition-all shadow-sm"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => onDelete(doctor.id)} disabled={isPending} className="p-3 bg-white cursor-pointer border border-slate-100 text-slate-600 hover:text-rose-600 hover:border-rose-100 rounded-2xl transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}