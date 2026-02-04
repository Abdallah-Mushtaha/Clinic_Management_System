import { useState, useEffect, useMemo } from "react";
import api from "../../api/axiosInstance";

export function usePatientData() {
  const [patient, setPatient] = useState<any | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const storedUser = useMemo(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("clinic_user");
      return data ? JSON.parse(data) : null;
    }
    return null;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!storedUser?.id) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      try {
        const [patientRes, appointmentsRes, doctorsRes] = await Promise.all([
          api.get(`/patients/${storedUser.id}`),
          api.get(`/appointments`),
          api.get(`/doctors`),
        ]);

        setPatient(patientRes.data);
        const userAppointments = appointmentsRes.data.filter(
          (a: any) => a.patientId === storedUser.id,
        );
        setAppointments(userAppointments);
        setDoctors(doctorsRes.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [storedUser?.id]);

  const doctorMap = useMemo(
    () => doctors.reduce((acc: any, d: any) => ({ ...acc, [d.id]: d }), {}),
    [doctors],
  );

  const upcomingAppointments = useMemo(
    () => appointments.filter((a) => new Date(a.date) > new Date()),
    [appointments],
  );

  const pendingConsultations = useMemo(
    () => appointments.filter((a: any) => a.status === "pending"),
    [appointments],
  );

  const totalPendingAmount = useMemo(() => {
    return pendingConsultations.reduce((sum, apt: any) => {
      const fee = Number(apt.consultationFee) || 200;
      return sum + fee;
    }, 0);
  }, [pendingConsultations]);

  return {
    patient,
    appointments,
    upcomingAppointments,
    pendingConsultations,
    totalPendingAmount,
    doctorMap,
    isLoading,
    isError,
    userId: storedUser?.id,
  };
}
