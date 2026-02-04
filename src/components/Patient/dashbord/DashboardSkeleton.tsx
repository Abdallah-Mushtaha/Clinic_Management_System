export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" dir="rtl">
      <div className="flex flex-col gap-2">
        <div className="h-8 bg-gray-200 rounded-md w-48"></div>
        <div className="h-4 bg-gray-200 rounded-md w-32"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl p-6 h-28"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl p-6 h-64"
          >
            <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="space-y-4">
              <div className="h-16 bg-gray-50 rounded-xl w-full"></div>
              <div className="h-16 bg-gray-50 rounded-xl w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
