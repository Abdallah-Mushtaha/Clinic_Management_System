import { useState } from "react";
import { Calendar, Clock, Eye, Trash2, User, UserRound } from "lucide-react";
import type { Appointment } from "./admin";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface TableProps {
  appointments: Appointment[];
  onDelete: (id: string) => void;
}

export default function AppointmentTable({
  appointments,
  onDelete,
}: TableProps) {
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const tableHeaders = [
    { id: "entities", label: "المعنيين", align: "text-right" },
    { id: "timing", label: "التوقيت", align: "text-center" },
    { id: "status", label: "الحالة", align: "text-center" },
    { id: "actions", label: "الإجراءات", align: "text-center" },
  ];

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };

  const statusMap: Record<string, string> = {
    pending: "معلق",
    completed: "مكتمل",
    cancelled: "ملغى",
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right" dir="rtl">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.id}
                    className={`px-8 py-6 text-slate-400 text-[1rem] font-black uppercase ${header.align}`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {appointments.map((apt) => (
                <tr
                  key={apt.id}
                  className="group hover:bg-blue-50/20 transition-all duration-300"
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        <User className="w-4 h-4 text-blue-500" />
                        {apt.patient?.name || "مريض غير مسجل"}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <UserRound className="w-3.5 h-3.5" />
                        د. {apt.doctor?.name || "طبيب غير محدد"}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-1.5 text-sm font-black text-slate-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {apt.date}
                      </div>
                      <div className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-2 font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {apt.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span
                      className={`px-4 py-1 rounded-xl text-[.9rem] font-black border tracking-wider ${statusStyles[apt.status]}`}
                    >
                      {statusMap[apt.status] || apt.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedApt(apt)}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-2xl transition-all shadow-sm cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(String(apt.id))}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:border-rose-100 rounded-2xl transition-all shadow-sm cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AppointmentDetailsModal
          appointment={selectedApt}
          onClose={() => setSelectedApt(null)}
        />
      </div>

      <DeleteConfirmationModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
