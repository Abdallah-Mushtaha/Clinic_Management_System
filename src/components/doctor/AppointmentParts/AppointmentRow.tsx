import { Calendar, Clock, Phone, Info } from "lucide-react";
import { STATUS_CONFIG } from "./constants";

interface Props {
  apt: any;
  onStatusUpdate: (id: string, status: string) => void;
  onShowDetails: (info: string) => void;
}

export const AppointmentRow = ({
  apt,
  onStatusUpdate,
  onShowDetails,
}: Props) => {
  const statusInfo = STATUS_CONFIG[apt.status] || {
    color: "bg-gray-100 text-gray-700",
    text: apt.status,
    info: "",
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 text-sm font-bold text-gray-900">
        {apt.patient?.name || "مريض"}
      </td>
      <td className="px-6 py-4 text-sm">
        <a
          href={`tel:${apt.patient?.phone}`}
          className="text-blue-600 flex items-center gap-1"
        >
          <Phone size={14} /> {apt.patient?.phone}
        </a>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
        <div className="flex items-center gap-2">
          <Calendar size={14} />{" "}
          {new Date(apt.date).toLocaleDateString("ar-SA")}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <Clock size={12} /> {apt.time}
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color}`}
        >
          {statusInfo.text}
        </span>
      </td>
      <td className="px-6 flex gap-3 py-4 space-x-2 space-x-reverse">
        {["confirmed", "pending"].includes(apt.status) ? (
          <>
            <button
              className="text-green-600 hover:underline font-bold"
              onClick={() => onStatusUpdate(apt.id, "completed")}
            >
              إكمال
            </button>
            <button
              className="text-red-600 hover:underline font-bold"
              onClick={() => onStatusUpdate(apt.id, "cancelled")}
            >
              إلغاء
            </button>
          </>
        ) : (
          <button
            className="text-blue-600 flex items-center gap-1 font-bold"
            onClick={() => onShowDetails(statusInfo.info)}
          >
            <Info size={14} /> التفاصيل
          </button>
        )}
      </td>
    </tr>
  );
};
