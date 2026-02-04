import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../api/axiosInstance";
import type {
  Appointment,
  Doctor,
  Patient,
  AppointmentStatus,
} from "../../components/Admin/AdminAppointments/admin";

export const useAppointmentsManager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [aptRes, doctorsRes, patientsRes] = await Promise.all([
        api.get<Appointment[]>("/appointments"),
        api.get<Doctor[]>("/doctors"),
        api.get<Patient[]>("/patients"),
      ]);

      const populated = aptRes.data.map((apt) => ({
        ...apt,
        doctor: doctorsRes.data.find(
          (d) => String(d.id) === String(apt.doctorId),
        ),
        patient: patientsRes.data.find(
          (p) => String(p.id) === String(apt.patientId),
        ),
      }));

      setAppointments(populated);
    } catch {
      toast.error("فشل في جلب البيانات");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id: string) => {
    const previousState = [...appointments];
    setAppointments((prev) => prev.filter((apt) => String(apt.id) !== id));

    try {
      await api.delete(`/appointments/${id}`);
      toast.success("تم الحذف بنجاح");
    } catch (error) {
      setAppointments(previousState);
      toast.error("فشل الحذف من السيرفر");
    }
  };

  const filteredAppointments = appointments.filter((apt) =>
    filter === "all" ? true : apt.status === filter,
  );

  return {
    appointments,
    filteredAppointments,
    isLoading,
    filter,
    setFilter,
    onDelete,
  };
};
