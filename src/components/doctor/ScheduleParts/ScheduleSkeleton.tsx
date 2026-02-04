import { DashboardLayout } from "../../layouts/Layout";

export function ScheduleSkeleton() {
  return (
    <DashboardLayout>
      <div
        className="max-w-6xl mx-auto space-y-6 animate-pulse p-4 text-right"
        dir="rtl"
      >
        {/* Header Skeleton */}
        <div className="bg-white h-24 rounded-[24px] border border-slate-100" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* Days Card Skeleton */}
            <div className="bg-white p-8 rounded-[28px] border border-slate-100 space-y-6">
              <div className="h-6 bg-slate-100 rounded-md w-32" />
              <div className="grid grid-cols-4 lg:grid-cols-7 gap-3">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-20 bg-slate-50 rounded-2xl" />
                ))}
              </div>
            </div>
            {/* Hours Card Skeleton */}
            <div className="bg-white p-8 rounded-[28px] border border-slate-100 space-y-6">
              <div className="h-6 bg-slate-100 rounded-md w-40" />
              <div className="grid grid-cols-3 gap-4">
                <div className="h-16 bg-slate-50 rounded-2xl" />
                <div className="h-16 bg-slate-50 rounded-2xl" />
                <div className="h-16 bg-slate-50 rounded-2xl" />
              </div>
            </div>
          </div>
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 h-[400px] bg-white p-6 rounded-[28px] border border-slate-100" />
        </div>
      </div>
    </DashboardLayout>
  );
}
