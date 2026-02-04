import type { AdminStats } from "./admin";

const ProgressItem = ({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
        {label}
      </span>
      <span className="text-2xl font-black">{count}</span>
    </div>
    <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
      <div
        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
      ></div>
    </div>
  </div>
);

export const AppointmentsDistribution = ({
  stats,
  total,
}: {
  stats: AdminStats;
  total: number;
}) => (
  <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-40"></div>
    <h3 className="text-xl font-bold mb-8 relative z-10 tracking-tight">
      توزيع المواعيد
    </h3>
    <div className="space-y-8 relative z-10">
      <ProgressItem
        label="كشوفات مكتملة"
        count={stats.completed}
        total={total}
        color="bg-blue-500"
      />
      <ProgressItem
        label="مواعيد قيد المراجعة"
        count={stats.pending}
        total={total}
        color="bg-white/20"
      />
    </div>
    <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
      <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-2">
        إشعار النظام
      </p>
      <p className="text-sm text-slate-300 leading-relaxed">
        تمت جدولة {stats.pending} مواعيد جديدة في آخر 24 ساعة.
      </p>
    </div>
  </div>
);
