import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

export function useBooking(userId?: string) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    notes: "",
  });

  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => api.get("/doctors").then((res) => res.data),
  });

  const bookingMutation = useMutation({
    mutationFn: (newAppointment: any) =>
      api.post("/appointments", newAppointment),
    onSuccess: () => navigate("/patient-dashboard"),
  });

  const selectedDoctor = doctors.find((d: any) => d.id === form.doctorId);
  const currentFee = selectedDoctor?.consultationFee || 200;

  const updateForm = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !form.doctorId || !form.date || !form.time) return;
    bookingMutation.mutate({
      ...form,
      patientId: userId,
      status: "pending",
      consultationFee: currentFee,
    });
  };

  return {
    doctors,
    form,
    updateForm,
    handleBooking,
    currentFee,
    isSubmitting: bookingMutation.isPending,
  };
}
