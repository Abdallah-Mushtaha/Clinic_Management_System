import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  amount: number;
  icon: LucideIcon;
  colorClass: string;
  bgColorClass: string;
}

export const StatCard = ({
  label,
  amount,
  icon: Icon,
  colorClass,
  bgColorClass,
}: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className={`text-3xl font-bold ${colorClass} mt-2`}>
          {amount} <small className="text-sm font-normal">ج.م</small>
        </p>
      </div>
      <div className={`${bgColorClass} p-3 rounded-lg`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>
  </div>
);
