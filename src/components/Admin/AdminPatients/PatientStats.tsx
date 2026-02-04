import { Users, UserSearch, Target } from "lucide-react";

export default function PatientStats({ total, filtered }) {
  const searchRatio = total > 0 ? Math.round((filtered / total) * 100) : 0;

  const stats = [
    {
      label: "إجمالي المسجلين",
      value: total,
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      borderColor: "group-hover:border-blue-200",
    },
    {
      label: "نتائج البحث",
      value: filtered,
      icon: <UserSearch className="w-6 h-6" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      borderColor: "group-hover:border-emerald-200",
    },
    {
      label: "دقة التصفية",
      value: `${searchRatio}%`,
      icon: <Target className="w-6 h-6" />,
      color: "text-amber-600",
      bg: "bg-amber-50",
      borderColor: "group-hover:border-amber-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 ${stat.borderColor}`}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </span>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </div>
            <p className={`text-5xl font-black tracking-tight ${stat.color}`}>
              {stat.value}
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div
              className={`absolute w-16 h-16 ${stat.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
            />
            <div
              className={`relative w-2 h-12 rounded-full ${stat.bg} opacity-20 group-hover:h-16 transition-all duration-500`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
