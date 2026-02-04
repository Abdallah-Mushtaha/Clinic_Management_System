import { X } from "lucide-react";

export const DetailsModal = ({
  note,
  onClose,
}: {
  note: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
      >
        <X size={20} />
      </button>
      <h3 className="text-lg font-bold text-gray-900 mb-2">تفاصيل الحالة</h3>
      <p className="text-gray-600 leading-relaxed">{note}</p>
      <button
        onClick={onClose}
        className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
      >
        إغلاق
      </button>
    </div>
  </div>
);
