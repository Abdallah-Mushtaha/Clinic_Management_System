import { AlertTriangle } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 w-screen min-h-screen">
      <div
        className="bg-white rounded-[2.5rem] max-w-md w-full p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-rose-500" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              تأكيد حذف الحجز
            </h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              هل أنت متأكد من رغبتك في حذف هذا الموعد؟ هذه العملية لا يمكن
              التراجع عنها وسيتم إزالة كافة البيانات المرتبطة بها.
            </p>
          </div>
          <div className="flex gap-3 w-full mt-4">
            <button
              onClick={onConfirm}
              className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-rose-200 cursor-pointer"
            >
              نعم، احذف الآن
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all cursor-pointer"
            >
              تراجع
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
