export const PatientSkeleton = () => (
  <div className="space-y-10 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex justify-between items-center">
      <div className="h-10 bg-slate-200 rounded-2xl w-48"></div>
    </div>

    <div className="space-y-6">
      {/* Search Bar Skeleton */}
      <div className="h-14 bg-slate-100 rounded-[1.5rem] w-full"></div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="h-16 bg-slate-50 border-b border-slate-100"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center p-6 border-b border-slate-50 gap-4"
          >
            <div className="h-12 w-12 bg-slate-100 rounded-full shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-slate-100 rounded-lg w-1/4"></div>
              <div className="h-3 bg-slate-50 rounded-lg w-1/3"></div>
            </div>
            <div className="h-8 bg-slate-50 rounded-xl w-24"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Stats Skeleton */}
    <div className="flex gap-4">
      <div className="h-20 bg-slate-100 rounded-[2rem] w-40"></div>
      <div className="h-20 bg-slate-100 rounded-[2rem] w-40"></div>
    </div>
  </div>
);
