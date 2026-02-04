import React from "react";

interface Props {
  title: string;
  amount: number;
  type: "bonus" | "deduction";
}

export const SalaryDetailList = ({ title, amount, type }: Props) => {
  const isBonus = type === "bonus";
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm flex-1">
      <h2 className="text-xl font-black text-[#1e293b] mb-6 flex items-center gap-2">
        <div
          className={`w-2 h-6 ${isBonus ? "bg-[#10b981]" : "bg-[#f43f5e]"} rounded-full`}
        />{" "}
        {title}
      </h2>
      <div className="flex justify-between items-center p-6 rounded-2xl border bg-slate-50/50 border-slate-100">
        <span className="text-[#475569] font-bold">المبلغ الإجمالي</span>
        <span
          className={`text-2xl font-black ${isBonus ? "text-[#10b981]" : "text-[#f43f5e]"}`}
        >
          {isBonus ? "+" : "-"}
          {amount.toLocaleString()} EGP
        </span>
      </div>
    </div>
  );
};
