import React from "react";
import { Calendar } from "lucide-react";

export function AppointmentsList({
  appointments,
  doctorMap,
}: {
  appointments: any[];
  doctorMap: any;
}) {
  const statusStyles: Record<string, string> = {
    confirmed: "bg-blue-600 text-white",
    completed: "bg-green-600 text-white",
    cancelled: "bg-red-600 text-white",
    pending: "bg-yellow-500 text-white",
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-400 border-dashed">
        لا توجد مواعيد قادمة
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold mb-4">
        أهم المواعيد القادمة
      </h2>
      <div className="space-y-3">
        {appointments.slice(0, 4).map((apt) => {
          const doctor = doctorMap[apt.doctorId];
          return (
            <div
              key={apt.id}
              className="border border-gray-100 p-4 rounded-xl bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex gap-4 items-center">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 truncate">
                    {doctor ? `د. ${doctor.name}` : "طبيب المركز"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {doctor?.specialty}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="bg-white border border-gray-200 text-gray-700 text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      {new Date(apt.date).toLocaleDateString("ar-SA")}
                    </span>
                    <span
                      className={`text-[10px] md:text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${statusStyles[apt.status] || "bg-gray-400 text-white"}`}
                    >
                      {apt.time}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] md:text-xs font-medium px-4 py-1.5 rounded-full self-start sm:self-center whitespace-nowrap ${statusStyles[apt.status] || "bg-gray-300 text-white"}`}
              >
                {apt.status === "confirmed"
                  ? "مؤكد"
                  : apt.status === "completed"
                    ? "تم"
                    : apt.status === "cancelled"
                      ? "ملغي"
                      : "بانتظار"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
