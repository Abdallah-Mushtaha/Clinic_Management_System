export const RecordsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 animate-pulse" dir="rtl">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-[32px] border border-[#f1f5f9] p-8 space-y-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-start gap-5 w-full">
              <div className="w-14 h-14 rounded-2xl bg-slate-200 shrink-0"></div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-6 bg-slate-200 rounded-lg w-1/3"></div>
                  <div className="h-5 bg-slate-100 rounded-lg w-20"></div>
                </div>
                <div className="h-4 bg-slate-100 rounded-md w-1/4"></div>
              </div>
            </div>
            <div className="h-12 bg-slate-200 rounded-2xl w-full md:w-40"></div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
            <div className="h-3 bg-slate-200 rounded w-full"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
            <div className="h-3 bg-slate-200 rounded w-4/6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="h-14 bg-slate-50 rounded-xl border border-slate-100"></div>
            <div className="h-14 bg-slate-50 rounded-xl border border-slate-100"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
