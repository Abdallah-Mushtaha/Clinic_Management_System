export const ReportsSkeleton = () => (
  <div className="space-y-8 animate-pulse" dir="rtl">
    {/* Title Skeleton */}
    <div className="space-y-3">
      <div className="h-9 bg-slate-200 rounded-xl w-64"></div>
      <div className="h-4 bg-slate-100 rounded-lg w-96"></div>
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-[2rem] border border-slate-50 flex items-center justify-between"
        >
          <div className="space-y-3">
            <div className="h-3 bg-slate-100 rounded w-16"></div>
            <div className="h-8 bg-slate-200 rounded-lg w-20"></div>
          </div>
          <div className="h-14 w-14 bg-slate-50 rounded-2xl"></div>
        </div>
      ))}
    </div>

    {/* Bottom Sections Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Appointment Status Skeleton */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-8">
        <div className="h-6 bg-slate-200 rounded-lg w-40"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex justify-between">
              <div className="h-3 bg-slate-100 rounded w-20"></div>
              <div className="h-3 bg-slate-100 rounded w-12"></div>
            </div>
            <div className="h-3 bg-slate-50 rounded-full w-full"></div>
          </div>
        ))}
      </div>

      {/* Doctor Performance Skeleton */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-6">
        <div className="h-6 bg-slate-200 rounded-lg w-48"></div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center py-2 border-b border-slate-50"
          >
            <div className="space-y-2">
              <div className="h-4 bg-slate-100 rounded w-32"></div>
              <div className="h-3 bg-slate-50 rounded w-20"></div>
            </div>
            <div className="h-6 bg-slate-100 rounded-lg w-12"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
