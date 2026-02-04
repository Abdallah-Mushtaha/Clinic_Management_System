import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "red" | "green" | "orange";
  extra?: string;
}

export function StatCard({ title, value, icon, color, extra }: StatCardProps) {
  const styles: Record<string, string> = {
    blue: "border-blue-500 text-blue-600 bg-blue-100",
    red: "border-red-500 text-red-600 bg-red-100",
    green: "border-green-500 text-green-600 bg-green-100",
    orange: "border-orange-500 text-orange-600 bg-orange-100",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-6 border-r-4 ${styles[color].split(" ")[0]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p
            className={`text-2xl font-bold mt-2 ${styles[color].split(" ")[1]}`}
          >
            {value}
          </p>
          {extra && (
            <p className="text-xs text-gray-500 mt-1 font-bold">{extra}</p>
          )}
        </div>
        <div className={`rounded-full p-3 ${styles[color].split(" ")[2]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
