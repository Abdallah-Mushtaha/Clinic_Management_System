import { CheckCircle2, XCircle, Clock, LayoutGrid } from "lucide-react";

export default function AppointmentStats({ appointments }) {
  const stats = [
    {
      label: "إجمالي المواعيد",
      value: appointments.length,
      icon: <LayoutGrid />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "مكتملة",
      value: appointments.filter((a) => a.status === "completed").length,
      icon: <CheckCircle2 />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "معلقة",
      value: appointments.filter((a) => a.status === "pending").length,
      icon: <Clock />,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "ملغاة",
      value: appointments.filter((a) => a.status === "cancelled").length,
      icon: <XCircle />,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 transition-hover hover:border-slate-200"
        >
          <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {stat.label}
            </p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
