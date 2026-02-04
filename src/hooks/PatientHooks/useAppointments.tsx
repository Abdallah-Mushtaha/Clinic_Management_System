import { useState, useEffect, useMemo, useCallback } from "react";
import api from "../../api/axiosInstance";

export const useAppointments = (userId: string | undefined) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [filter, setFilter] = useState<
    "all" | "upcoming" | "past" | "cancelled"
  >("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [pendingRatingAppt, setPendingRatingAppt] = useState<any>(null);
  const [ratingScore, setRatingScore] = useState(0);

  const fetchData = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    try {
      const [appointmentsRes, doctorsRes] = await Promise.all([
        api.get("/appointments"),
        api.get("/doctors"),
      ]);

      const userAppointments = appointmentsRes.data.filter(
        (a: any) => a.patientId === userId,
      );
      setAppointments(userAppointments);
      setDoctors(doctorsRes.data);

      const unratedCompleted = userAppointments.find(
        (a: any) => a.status === "completed" && !a.rating,
      );

      if (unratedCompleted) {
        setPendingRatingAppt(unratedCompleted);
        setShowRatingModal(true);
      }
    } catch (error) {
      console.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCancelAppointment = async (id: string) => {
    try {
      await api.patch(`/appointments/${id}`, { status: "cancelled" });
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id ? { ...apt, status: "cancelled" } : apt,
        ),
      );
      return true;
    } catch (error) {
      alert("حدث خطأ أثناء إلغاء الموعد");
      return false;
    }
  };

  const submitRating = async () => {
    if (ratingScore === 0) return;
    try {
      await api.patch(`/appointments/${pendingRatingAppt.id}`, {
        rating: ratingScore,
      });
      setShowRatingModal(false);
      fetchData();
    } catch (error) {
      alert("فشل حفظ التقييم");
    }
  };

  const doctorMap = useMemo(
    () => doctors.reduce((acc: any, d: any) => ({ ...acc, [d.id]: d }), {}),
    [doctors],
  );

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const isPast = new Date(apt.date) < new Date();
      if (filter === "upcoming") return !isPast && apt.status !== "cancelled";
      if (filter === "past") return isPast || apt.status === "completed";
      if (filter === "cancelled") return apt.status === "cancelled";
      return true;
    });
  }, [appointments, filter]);

  return {
    appointments: filteredAppointments,
    doctorMap,
    filter,
    setFilter,
    isLoading,
    handleCancelAppointment,
    showRatingModal,
    setShowRatingModal,
    pendingRatingAppt,
    ratingScore,
    setRatingScore,
    submitRating,
  };
};
