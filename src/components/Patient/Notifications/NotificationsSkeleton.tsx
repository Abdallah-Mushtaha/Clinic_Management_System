export const NotificationsSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-pulse" dir="rtl">
      {/* Skeleton Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
        <div className="space-y-3 w-full md:w-auto">
          <div className="h-7 bg-slate-200 rounded-lg w-40"></div>
          <div className="h-4 bg-slate-100 rounded-lg w-56"></div>
        </div>
        <div className="h-12 bg-slate-100 rounded-2xl w-full md:w-48"></div>
      </header>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-[24px] border border-slate-50 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-5 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0"></div>

              <div className="space-y-2 flex-1 text-right">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-3 bg-slate-100 rounded w-2/3"></div>
              </div>
            </div>

            <div className="h-3 bg-slate-50 rounded w-12 hidden md:block"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
