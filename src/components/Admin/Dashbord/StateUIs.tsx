import React from "react";
import { DashboardLayout } from "../../layouts/Layout";

export const LoadingSpinner: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto space-y-10 animate-pulse">
        {/* Header Skeleton */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-8 bg-slate-200"></div>
              <div className="h-3 w-32 bg-slate-200 rounded"></div>
            </div>
            <div className="h-10 w-48 bg-slate-200 rounded-xl"></div>
          </div>
          <div className="h-16 w-64 bg-slate-100 rounded-[2rem]"></div>
        </header>

        {/* Stats Grid Skeleton (4 Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 bg-slate-100 rounded-[2rem]"></div>
          ))}
        </section>

        {/* Quick Links Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-2xl"></div>
          ))}
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table Skeleton */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 h-20"></div>
            <div className="p-8 space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-10 w-1/3 bg-slate-100 rounded-lg"></div>
                  <div className="h-8 w-20 bg-slate-100 rounded-xl"></div>
                  <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Card Skeleton */}
          <div className="h-[500px] bg-slate-900 rounded-[2.5rem] p-10 space-y-10">
            <div className="h-6 w-32 bg-white/10 rounded"></div>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-3 w-full bg-white/10 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-3 w-full bg-white/10 rounded-full"></div>
              </div>
            </div>
            <div className="mt-auto h-24 bg-white/5 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export const ErrorMessage: React.FC = () => (
  <DashboardLayout>
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-10 text-center max-w-md">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-rose-900 mb-2">
          حدث خطأ غير متوقع
        </h2>
        <p className="text-rose-600/80 font-medium leading-relaxed">
          حدث خطأ أثناء تحميل البيانات. يرجى التحقق من الاتصال بالإنترنت أو
          المحاولة مرة أخرى لاحقاً.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  </DashboardLayout>
);
