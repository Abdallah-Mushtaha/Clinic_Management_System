import React from "react";
import { DollarSign, User, Clock, X } from "lucide-react";

export function PendingPaymentsList({
  pendingConsultations,
  doctorMap,
  onPayClick,
}: any) {
  if (pendingConsultations.length === 0)
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-400 border-dashed">
        لا توجد استشارات معلقة بانتظار الدفع
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-orange-500" /> استشارات لم تُدفع
      </h2>
      <div className="space-y-3">
        {pendingConsultations.map((apt: any) => {
          const doctor = doctorMap[apt.doctorId];
          return (
            <div
              key={apt.id}
              className="border border-orange-100 p-4 rounded-xl bg-orange-50/30 flex justify-between items-center group hover:bg-orange-50 transition-colors"
            >
              <div className="flex gap-4 items-center">
                <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">
                    كشف {doctor ? `د. ${doctor.name}` : "طبيب"}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold">
                    {apt.date} | {apt.time}
                  </p>
                  <p className="text-xs text-orange-600 font-extrabold mt-1">
                    {apt.consultationFee || 200} جنيه مصري
                  </p>
                </div>
              </div>
              <button
                onClick={onPayClick}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md active:scale-95"
              >
                ادفع الآن
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PaymentModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-right"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center space-y-4">
          <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-orange-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            نظام الدفع الإلكتروني
          </h3>
          <p className="text-gray-600 text-sm">
            نحن نعمل حالياً على بناء بوابة الدفع الإلكتروني لتتمكن من سداد رسوم
            كشفك مباشرة من هنا.
          </p>
          <div className="bg-orange-500 text-white p-3 rounded-xl font-bold text-xs">
            قريباً: الدفع عبر البطاقات البنكية والمحافظ الإلكترونية
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
