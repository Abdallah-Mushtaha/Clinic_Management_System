import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

export function useEditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [form, setForm] = useState({
    date: "",
    time: "",
  });

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const appointmentRes = await api.get(`/appointments/${id}`);
        const { date, time, doctorId } = appointmentRes.data;

        setForm({ date, time });

        const doctorRes = await api.get(`/doctors/${doctorId}`);
        setDoctorName(doctorRes.data.name);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAppointmentData();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.patch(`/appointments/${id}`, {
        date: form.date,
        time: form.time,
      });
      navigate("/patient-dashboard");
    } catch (error) {
      alert("حدث خطأ أثناء التحديث");
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form,
    doctorName,
    loading,
    submitting,
    timeSlots,
    handleUpdate,
    updateField,
    navigate,
  };
}
