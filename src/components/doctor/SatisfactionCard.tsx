import React from "react";
import { Star } from "lucide-react";

interface SatisfactionCardProps {
  avgRating: string;
  totalReviews: number;
}

export const SatisfactionCard = ({
  avgRating,
  totalReviews,
}: SatisfactionCardProps) => (
  <div className="bg-[#1e293b] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
    <h3 className="text-lg font-bold mb-1">ملخص الرضا</h3>
    <p className="text-white text-[10px] mb-6 font-medium uppercase tracking-widest">
      بناءً على {totalReviews} تقييم حقيقي
    </p>
    <div className="flex items-end gap-3 mb-6">
      <span className="text-6xl font-black leading-none">{avgRating}</span>
      <span className="text-xl text-white font-bold mb-1">/ 5.0</span>
    </div>
    <div className="flex gap-1.5 p-3 bg-white/5 rounded-2xl w-fit">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={22}
          className={
            Number(avgRating) >= s
              ? "fill-[#fbbf24] text-[#fbbf24]"
              : "text-[#484848] fill-[#585858]"
          }
        />
      ))}
    </div>
  </div>
);
