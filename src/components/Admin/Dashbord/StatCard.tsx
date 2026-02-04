import React from "react";
import { TrendingUp, type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  variant: "blue" | "emerald" | "white-violet" | "white-amber";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  variant,
}) => {
  const themes = {
    blue: "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-200",
    emerald:
      "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-100",
    "white-violet": "bg-white border-slate-100 group hover:border-violet-200",
    "white-amber": "bg-white border-slate-100 group hover:border-amber-200",
  };

  const isGradient = variant === "blue" || variant === "emerald";

  return (
    <div
      className={`relative overflow-hidden p-8 rounded-[2rem] transition-all hover:-translate-y-1 shadow-xl ${themes[variant]}`}
    >
      <div
        className={`absolute top-0 right-0 p-4 transition-transform group-hover:scale-110 ${isGradient ? "opacity-10 text-white" : "text-violet-50 opacity-0 group-hover:opacity-100"}`}
      >
        <Icon className="w-24 h-24" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`p-2 rounded-lg backdrop-blur-md ${isGradient ? "bg-white/20" : variant === "white-violet" ? "bg-violet-50" : "bg-amber-50"}`}
          >
            <Icon
              className={`w-5 h-5 ${isGradient ? "text-white" : variant === "white-violet" ? "text-violet-600" : "text-amber-600"}`}
            />
          </div>
          <span
            className={`text-sm font-medium ${isGradient ? "text-blue-100" : "text-slate-500"}`}
          >
            {title}
          </span>
        </div>
        <div
          className={`text-4xl font-black mb-1 ${!isGradient ? "text-slate-900" : ""}`}
        >
          {value}
        </div>
        <div
          className={`flex items-center gap-2 text-xs font-bold ${isGradient ? "text-blue-100/80" : variant === "white-violet" ? "text-violet-600" : "text-amber-600"}`}
        >
          {isGradient ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${variant === "white-violet" ? "bg-violet-600" : "bg-amber-600"}`}
            />
          )}
          <span>{subtext}</span>
        </div>
      </div>
    </div>
  );
};
