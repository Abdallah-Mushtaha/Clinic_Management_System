export const FormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="space-y-2 text-center">
      <div className="h-8 bg-slate-200 rounded-lg w-1/2 mx-auto" />
      <div className="h-4 bg-slate-100 rounded-lg w-3/4 mx-auto" />
    </div>

    <div className="space-y-4">
      {/* Skeleton for inputs */}
      <div className="h-12 bg-slate-100 rounded-xl w-full" />
      <div className="h-12 bg-slate-100 rounded-xl w-full" />
      <div className="h-12 bg-slate-100 rounded-xl w-full" />

      {/* Skeleton for button */}
      <div className="h-14 bg-slate-200 rounded-xl w-full mt-6" />
    </div>

    <div className="h-4 bg-slate-100 rounded-lg w-1/2 mx-auto mt-4" />
  </div>
);
