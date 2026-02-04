export const PaymentsSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse text-right" dir="rtl">
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded-lg w-48"></div>
        <div className="h-4 bg-gray-100 rounded-lg w-64"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 p-6 h-32 flex justify-between items-center"
          >
            <div className="space-y-3 flex-1">
              <div className="h-4 bg-gray-100 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="h-12 bg-gray-50 border-b border-gray-100"></div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0"
            >
              <div className="h-4 bg-gray-100 rounded w-1/5"></div>
              <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/6"></div>
              <div className="h-6 bg-gray-100 rounded-full w-20"></div>
              <div className="h-8 bg-gray-100 rounded-lg w-24"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
