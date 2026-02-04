export const DoctorSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex justify-between items-center">
      <div className="h-10 bg-slate-200 rounded-xl w-48"></div>
      <div className="h-12 bg-slate-200 rounded-2xl w-36"></div>
    </div>

    {/* Search Bar Skeleton */}
    <div className="h-14 bg-slate-100 rounded-2xl w-full"></div>

    {/* Table Skeleton */}
    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
      <div className="h-16 bg-slate-50 border-b border-slate-100"></div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center space-x-4 p-6 border-b border-slate-50 space-x-reverse"
        >
          <div className="h-12 w-12 bg-slate-100 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-100 rounded w-1/4"></div>
            <div className="h-3 bg-slate-50 rounded w-1/6"></div>
          </div>
          <div className="h-8 bg-slate-50 rounded-lg w-20"></div>
        </div>
      ))}
    </div>
  </div>
);
