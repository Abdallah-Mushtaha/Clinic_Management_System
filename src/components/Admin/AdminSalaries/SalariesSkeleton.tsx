export const SalariesSkeleton = () => (
  <div className="space-y-6 animate-pulse" dir="rtl">
    {/* Header Skeleton */}
    <div className="space-y-3">
      <div className="h-9 bg-slate-200 rounded-xl w-48"></div>
      <div className="h-4 bg-slate-100 rounded-lg w-64"></div>
    </div>

    {/* Table Skeleton */}
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      {/* Table Head Mock */}
      <div className="bg-slate-50/50 border-b border-slate-100 h-16 flex items-center px-6 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-3 bg-slate-200 rounded-full flex-1"></div>
        ))}
      </div>

      {/* Table Rows Mock */}
      {[1, 2, 3, 4, 5].map((row) => (
        <div
          key={row}
          className="flex items-center px-6 py-5 border-b border-slate-50 gap-8"
        >
          {/* Doctor Name */}
          <div className="h-4 bg-slate-100 rounded-lg flex-1"></div>
          {/* Basic Salary */}
          <div className="h-4 bg-slate-50 rounded-lg flex-1"></div>
          {/* Bonuses */}
          <div className="h-4 bg-slate-50 rounded-lg flex-1"></div>
          {/* Deductions */}
          <div className="h-4 bg-slate-50 rounded-lg flex-1"></div>
          {/* Net */}
          <div className="h-4 bg-slate-100 rounded-lg flex-1"></div>
          {/* Action Button */}
          <div className="h-8 w-8 bg-slate-50 rounded-lg"></div>
        </div>
      ))}
    </div>
  </div>
);
