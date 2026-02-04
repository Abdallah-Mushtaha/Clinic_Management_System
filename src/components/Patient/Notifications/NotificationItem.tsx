import {
  Check,
  Trash2,
  Calendar,
  CreditCard,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const THEMES = {
  appointment_reminder: {
    icon: Calendar,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  appointment_cancelled: {
    icon: XCircle,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  payment_pending: {
    icon: CreditCard,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  appointment_confirmed: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
};

export const NotificationItem = ({ n, onMarkRead, onRemove }: any) => {
  const theme =
    THEMES[n.type as keyof typeof THEMES] || THEMES.appointment_confirmed;
  const Icon = theme.icon;

  return (
    <div
      className={`group bg-white p-5 rounded-[24px] border border-slate-100 flex items-center justify-between gap-4 transition-all hover:border-blue-200 hover:shadow-lg ${!n.read ? "border-r-4 border-r-blue-500" : ""}`}
    >
      <div className="flex items-center gap-5 flex-1">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${theme.bg} ${theme.color}`}
        >
          <Icon size={20} />
        </div>
        <div className="text-right">
          <h3
            className={`font-bold text-sm ${n.read ? "text-slate-500" : "text-slate-800"}`}
          >
            {n.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">{n.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!n.read && (
            <button
              onClick={() => onMarkRead(n.id)}
              className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg"
            >
              <Check size={18} />
            </button>
          )}
          <button
            onClick={() => onRemove(n.id)}
            className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
