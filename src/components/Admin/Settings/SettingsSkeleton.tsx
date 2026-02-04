export const SettingsSkeleton = () => (
  <div className="space-y-6 animate-pulse" dir="rtl">
    <div className="space-y-2">
      <div className="h-9 bg-slate-200 rounded-xl w-48"></div>
      <div className="h-4 bg-slate-100 rounded-lg w-64"></div>
    </div>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white rounded-[2rem] p-8 border border-slate-100 space-y-4"
      >
        <div className="h-6 bg-slate-200 rounded-lg w-40 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-12 bg-slate-50 rounded-xl w-full"></div>
          <div className="h-12 bg-slate-50 rounded-xl w-full"></div>
        </div>
      </div>
    ))}
  </div>
);
