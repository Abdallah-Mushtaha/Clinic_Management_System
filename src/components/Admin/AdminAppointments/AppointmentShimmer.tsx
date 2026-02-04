import React from "react";

const ShimmerRow = () => (
  <div className="flex items-center justify-between p-6 border-b border-slate-50 animate-pulse">
    <div className="flex flex-col gap-2 w-1/4">
      <div className="h-4 bg-slate-200 rounded-md w-32"></div>
      <div className="h-3 bg-slate-100 rounded-md w-24"></div>
    </div>
    <div className="flex flex-col items-center gap-2 w-1/4">
      <div className="h-4 bg-slate-200 rounded-md w-24"></div>
      <div className="h-3 bg-slate-100 rounded-md w-16"></div>
    </div>
    <div className="h-6 bg-slate-200 rounded-xl w-20"></div>
    <div className="flex gap-2">
      <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
      <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
    </div>
  </div>
);

export default function AppointmentShimmer() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4 mt-8">
      <div className="flex justify-between items-center animate-pulse">
        <div className="h-10 bg-slate-200 rounded-2xl w-48"></div>
        <div className="h-12 bg-slate-200 rounded-full w-12"></div>
      </div>

      <div className="flex gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-slate-100 rounded-xl w-24"></div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="bg-slate-50/50 h-16 w-full mb-2"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <ShimmerRow key={i} />
        ))}
      </div>
    </div>
  );
}
