import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: "blue" | "green" | "purple" | "yellow" | "orange" | "red";
  extra?: string;
}

const colors = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
};

export function StatCard({ title, value, icon, color, extra }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className={`${colors[color].bg} rounded-full p-3`}>
          <span className={colors[color].text}>{icon}</span>
        </div>
        <div className="text-left">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${colors[color].text}`}>
            {value}
          </p>
          {extra && <p className="text-xs text-gray-500 mt-1">{extra}</p>}
        </div>
      </div>
    </div>
  );
}
