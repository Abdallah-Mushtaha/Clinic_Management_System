import { ArrowUpRight } from "lucide-react";
import type { Appointment } from "./admin";

const StatusBadge = ({ status }: { status: Appointment["status"] }) => {
  const configs = {
    completed: "bg-emerald-50 text-emerald-600",
    pending: "bg-amber-50 text-amber-600",
    cancelled: "bg-rose-50 text-rose-600",
  };
  const labels = { completed: "مكتمل", pending: "معلق", cancelled: "ملغي" };
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-black shadow-sm ${configs[status]}`}
    >
      {labels[status]}
    </span>
  );
};

export const RecentActivityTable = ({
  appointments,
}: {
  appointments: Appointment[];
}) => (
  <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
        آخر النشاطات
      </h2>
      <button className="text-xs font-bold text-blue-600 hover:underline">
        كل السجلات
      </button>
    </div>
    <div className="p-2 overflow-x-auto">
      <table className="w-full text-right">
        <thead>
          <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
            <th className="py-4 px-6 text-right">التاريخ والوقت</th>
            <th className="py-4 px-6 text-center">الحالة التشغيلية</th>
            <th className="py-4 px-6 text-center">التفاصيل</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {appointments.map((apt) => (
            <tr
              key={apt.id}
              className="group hover:bg-slate-50/50 transition-all"
            >
              <td className="py-5 px-6 font-medium text-slate-900">
                {new Date(apt.date).toLocaleDateString("ar-SA", {
                  month: "long",
                  day: "numeric",
                })}
                <span className="block text-[10px] text-slate-400 font-bold mt-0.5">
                  {apt.time}
                </span>
              </td>
              <td className="py-5 px-6 text-center">
                <StatusBadge status={apt.status} />
              </td>
              <td className="py-5 px-6 text-center">
                <button className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-all mx-auto">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
