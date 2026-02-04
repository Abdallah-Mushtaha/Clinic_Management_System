import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useDoctorPatients(doctorId?: string) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments", doctorId],
    queryFn: () =>
      api.get(`/appointments?doctorId=${doctorId}`).then((res) => res.data),
    enabled: !!doctorId,
  });

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: () => api.get("/patients").then((res) => res.data),
  });

  const filteredPatients = useMemo(() => {
    const patientIds = new Set(appointments.map((apt: any) => apt.patientId));
    const doctorPatients = patients.filter((p: any) => patientIds.has(p.id));
    const term = searchTerm.trim().toLowerCase();

    if (!term) return doctorPatients;

    return doctorPatients.filter(
      (p: any) =>
        p.name?.toLowerCase().includes(term) ||
        p.email?.toLowerCase().includes(term) ||
        p.phone?.includes(term),
    );
  }, [appointments, patients, searchTerm]);

  return { filteredPatients, searchTerm, setSearchTerm };
}
