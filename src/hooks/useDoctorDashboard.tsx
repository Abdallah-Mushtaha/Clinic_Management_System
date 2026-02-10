import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useDoctorDashboard() {
  const localUser =
    typeof window !== "undefined" ? localStorage.getItem("clinic_user") : null;
  const user = localUser ? JSON.parse(localUser) : null;
  const doctorId = user?.id;

  const { data: doctor } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => api.get(`/doctors/${doctorId}`).then((res) => res.data),
    enabled: !!doctorId,
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ["doctorAppointments", doctorId],
    queryFn: () =>
      api.get(`/appointments?doctorId=${doctorId}`).then((res) => res.data),
    enabled: !!doctorId,
  });

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: () => api.get("/patients").then((res) => res.data),
  });

  const { data: salaryData = [] } = useQuery({
    queryKey: ["doctorSalaries", doctorId],
    queryFn: () =>
      api
        .get(`/doctorSalaries`, { params: { doctorId } })
        .then((res) => res.data),
    enabled: !!doctorId,
  });

  const salary = useMemo(() => {
    if (!salaryData.length) return null;
    const latest = salaryData[salaryData.length - 1];
    return {
      ...latest,
      total: latest.baseSalary + latest.bonuses - latest.deductions,
      displayMonth: latest.month || "فبراير 2026",
    };
  }, [salaryData]);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const now = new Date();

    const rated = appointments.filter(
      (a) => a.status === "completed" && a.rating > 0,
    );
    const avg = rated.length
      ? (rated.reduce((s, c) => s + c.rating, 0) / rated.length).toFixed(1)
      : 0;

    return {
      todayCount: appointments.filter(
        (a) => new Date(a.date).toDateString() === today,
      ).length,
      upcomingCount: appointments.filter((a) => new Date(a.date) > now).length,
      patientCount: new Set(appointments.map((a) => a.patientId)).size,
      averageRating: avg,
      totalRatings: rated.length,
    };
  }, [appointments]);

  return { doctor, salary, stats };
}
