import { Wallet } from "lucide-react";

export const SalarySkeleton = () => (
  <div
    className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-8 animate-pulse text-right"
    dir="rtl"
  >
    <div className="space-y-3">
      <div className="h-10 w-48 bg-gray-200 rounded-xl" />
      <div className="h-4 w-64 bg-gray-200 rounded-lg" />
    </div>
    <div className="h-64 w-full bg-gray-200 rounded-[3rem]" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-gray-200 rounded-[2rem]" />
      ))}
    </div>
  </div>
);

export const SalaryEmptyState = () => (
  <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
    <div className="p-6 bg-gray-200 rounded-full text-gray-400">
      <Wallet size={48} />
    </div>
    <h2 className="text-2xl font-black text-gray-600">لا توجد بيانات متاحة</h2>
  </div>
);
