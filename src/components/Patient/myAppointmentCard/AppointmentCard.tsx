import React from "react";
import {
  Calendar,
  Clock,
  MoreHorizontal,
  Activity,
  Trash2,
  Star,
} from "lucide-react";

export const AppointmentCard = ({
  apt,
  doctor,
  onCancel,
  onEdit,
  activeMenu,
  setActiveMenu,
}: any) => {
  const isCancelled = apt.status === "cancelled";
  const isPast = new Date(apt.date) < new Date() || apt.status === "completed";

  const statusStyles: any = {
    confirmed: "bg-emerald-50 text-emerald-600 ring-emerald-500/20",
    pending: "bg-amber-50 text-amber-600 ring-amber-500/20",
    completed: "bg-blue-50 text-blue-600 ring-blue-500/20",
    cancelled: "bg-rose-50 text-rose-600 ring-rose-500/20",
  };

  const statusLabels: any = {
    confirmed: "مؤكد",
    pending: "قيد الانتظار",
    completed: "مكتمل",
    cancelled: "ملغى",
  };

  return (
    <div className="group bg-white rounded-[24px] border border-gray-100 p-6 transition-all hover:shadow-2xl hover:shadow-blue-500/5 relative">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex gap-5">
          <div
            className={`hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-2xl font-black ${isCancelled ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"}`}
          >
            <span className="text-xs uppercase">
              {new Date(apt.date).toLocaleDateString("ar-SA", {
                month: "short",
              })}
            </span>
            <span className="text-2xl">{new Date(apt.date).getDate()}</span>
          </div>

          <div className="space-y-3 text-right">
            <div className="flex items-center justify-end gap-3">
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ring-1 ring-inset ${statusStyles[apt.status]}`}
              >
                {statusLabels[apt.status]}
              </span>
              <h3
                className={`text-xl font-bold ${isCancelled ? "text-gray-400" : "text-gray-900"}`}
              >
                {doctor ? `د. ${doctor.name}` : "طبيب متخصص"}
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                {apt.time}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                {new Date(apt.date).toLocaleDateString("ar-SA", {
                  weekday: "long",
                })}
              </span>
              <span
                className={`flex items-center gap-1.5 font-bold ${isCancelled ? "text-gray-400" : "text-blue-600"}`}
              >
                <Activity size={16} />
                {doctor?.specialty}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0">
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              رسوم الاستشارة
            </p>
            <p
              className={`text-2xl font-black ${isCancelled ? "text-gray-400" : "text-gray-900"}`}
            >
              {apt.consultationFee}{" "}
              <span className="text-xs font-medium">ج.م</span>
            </p>
          </div>

          <div className="flex items-center gap-2 relative">
            {!isCancelled && !isPast && (
              <>
                <button
                  onClick={onEdit}
                  className="px-4 h-11 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  تعديل
                </button>
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === apt.id ? null : apt.id)
                    }
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-gray-900 transition-all"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  {activeMenu === apt.id && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      <button
                        onClick={() => onCancel(apt.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 size={18} /> إلغاء الموعد
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            {apt.status === "completed" && (
              <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 px-3 py-2 rounded-lg">
                <Star size={16} fill="currentColor" />
                <span>{apt.rating || "لم يقيم"}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
