import React from "react";
import type { AppointmentStatus } from "./admin";

interface FiltersProps {
  currentFilter: AppointmentStatus | "all";
  onFilterChange: (filter: AppointmentStatus | "all") => void;
}

export default function AppointmentFilters({
  currentFilter,
  onFilterChange,
}: FiltersProps) {
  const filters: { id: AppointmentStatus | "all"; label: string }[] = [
    { id: "all", label: "جميع المواعيد" },
    { id: "pending", label: "معلقة" },
    { id: "completed", label: "مكتملة" },
    { id: "cancelled", label: "ملغاة" },
  ];

  return (
    <div className="flex gap-2 p-1.5 bg-slate-100/50 rounded-[1.5rem] w-fit border border-slate-100">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onFilterChange(f.id)}
          className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 cursor-pointer ${
            currentFilter === f.id
              ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/50"
              : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
