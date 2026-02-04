import { useState, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import { Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppointmentRow } from "../../components/doctor/AppointmentParts/AppointmentRow";
import { DetailsModal } from "../../components/doctor/AppointmentParts/DetailsModal";
import { FILTER_OPTIONS } from "../../components/doctor/AppointmentParts/constants";
import api from "../../api/axiosInstance";

export default function DoctorAppointmentsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const { data: appointments = [] } = useQuery({
    queryKey: ["doctorAppointments", user?.id],
    queryFn: async () =>
      (await api.get(`/appointments?doctorId=${user?.id}`)).data,
    enabled: !!user?.id,
  });

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => (await api.get("/patients")).data,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/appointments/${id}`, { status }),
    onSuccess: () =>
      queryClient.invalidateQueries(["doctorAppointments", user?.id]),
  });

  const filteredAppointments = useMemo(() => {
    const today = new Date().toDateString();
    const now = new Date();
    const enriched = appointments.map((apt: any) => ({
      ...apt,
      patient: patients.find((p: any) => p.id === apt.patientId),
    }));

    return enriched.filter((apt: any) => {
      const aptDate = new Date(apt.date);
      if (filter === "today") return aptDate.toDateString() === today;
      if (filter === "upcoming")
        return aptDate > now && apt.status !== "cancelled";
      if (filter === "completed") return apt.status === "completed";
      if (filter === "cancelled") return apt.status === "cancelled";
      return true;
    });
  }, [appointments, patients, filter]);

  return (
    <DashboardLayout>
      <div className="space-y-6 text-right" dir="rtl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المواعيد</h1>
          <p className="text-gray-600 mt-1">عرض وإدارة جميع مواعيدك الطبية</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          {FILTER_OPTIONS.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === btn.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {[
                    "اسم المريض",
                    "الهاتف",
                    "التاريخ والوقت",
                    "الحالة",
                    "الإجراءات",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-4 font-bold text-gray-700"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((apt: any) => (
                  <AppointmentRow
                    key={apt.id}
                    apt={apt}
                    onStatusUpdate={(id, status) =>
                      mutation.mutate({ id, status })
                    }
                    onShowDetails={setSelectedNote}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedNote && (
          <DetailsModal
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
          />
        )}

        {filteredAppointments.length === 0 && (
          <div className="bg-gray-50 rounded-2xl p-16 text-center border-2 border-dashed border-gray-100">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">لا توجد مواعيد حالياً</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
