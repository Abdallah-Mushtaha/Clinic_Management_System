import { Clock, X } from "lucide-react";

interface PaymentModalProps {
  onClose: () => void;
}

export const PaymentModal = ({ onClose }: PaymentModalProps) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
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
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-blue-600 animate-pulse" />
        </div>

        <h3 className="text-xl font-bold text-gray-900">
          نظام الدفع الإلكتروني
        </h3>
        <p className="text-gray-600">
          نحن نعمل حالياً على بناء بوابة الدفع الإلكتروني لتوفير تجربة آمنة
          وسهلة لك.
        </p>

        <div className="bg-blue-600 text-white p-3 rounded-xl font-bold text-sm">
          قريباً: الدفع عبر فيزا، ماستر كارد، وفوري
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
