import React from "react";
import { X, Star, FileText } from "lucide-react";
import type { Appointment } from "./admin";

interface ModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export default function AppointmentDetailsModal({
  appointment,
  onClose,
}: ModalProps) {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100"
        dir="rtl"
      >
        <div className="relative p-8 bg-slate-900 text-white text-center">
          <button
            onClick={onClose}
            className="absolute left-6 top-6 p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            Appointment Info
          </div>
          <h2 className="text-2xl font-black">تفاصيل الموعد</h2>
        </div>
        <div className="p-8 space-y-6 text-right">
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                قيمة الكشف
              </span>
              <p className="text-xl font-black text-emerald-600">
                {appointment.consultationFee} ج.م
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                تقييم الموعد
              </span>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < (Number(appointment.rating) || 0) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <FileText className="w-4 h-4 text-blue-500" /> ملاحظات الموعد
            </div>
            <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-[1.5rem] text-slate-600 leading-relaxed font-medium italic">
              "{appointment.notes || "لا توجد ملاحظات مسجلة لهذا الموعد"}"
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 cursor-pointer"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
}
