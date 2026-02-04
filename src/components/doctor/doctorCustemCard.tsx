import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: StatCardProps) => (
  <div className="bg-white p-7 rounded-[2rem] border border-[#e2e8f0] shadow-sm flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <div
        className="p-3 rounded-2xl"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-black px-2 py-1 bg-[#ecfdf5] text-[#10b981] rounded-lg">
        {trend}
      </span>
    </div>
    <div>
      <p className="text-[#94a3b8] font-bold text-[10px] uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-3xl font-black text-[#0f172a] mt-1">{value}</h3>
    </div>
  </div>
);
