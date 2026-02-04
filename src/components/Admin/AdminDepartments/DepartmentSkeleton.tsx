export const DepartmentSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm animate-pulse">
    <div className="flex justify-between items-start mb-8">
      <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
        <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
      </div>
    </div>
    <div className="h-7 bg-slate-200 rounded-lg w-3/4 mb-4"></div>
    <div className="h-4 bg-slate-100 rounded-lg w-full mb-2"></div>
    <div className="h-4 bg-slate-100 rounded-lg w-1/2 mb-8"></div>
    <div className="pt-6 border-t border-slate-50">
      <div className="flex justify-between mb-4">
        <div className="h-3 bg-slate-100 rounded w-16"></div>
        <div className="h-5 bg-blue-50 rounded w-12"></div>
      </div>
      <div className="flex -space-x-3 space-x-reverse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-2xl border-4 border-white bg-slate-100"
          ></div>
        ))}
      </div>
    </div>
  </div>
);
