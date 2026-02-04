import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Patient, Appointment, Payment } from "./types.ts";

const api = axios.create({ baseURL: "http://localhost:3001" });

export const usePatientData = (userId: string | undefined) => {
  const patientQuery = useQuery<Patient>({
    queryKey: ["patient", userId],
    queryFn: async () => {
      const { data } = await api.get(`/patients/${userId}`);
      return data;
    },
    enabled: !!userId,
    retry: false,
  });

  const appointmentsQuery = useQuery<Appointment[]>({
    queryKey: ["appointments", userId],
    queryFn: async () => {
      const { data } = await api.get(`/appointments?patientId=${userId}`);
      return data;
    },
    enabled: !!userId,
  });

  const paymentsQuery = useQuery<Payment[]>({
    queryKey: ["payments", userId],
    queryFn: async () => {
      const { data } = await api.get(`/payments?patientId=${userId}`);
      return data;
    },
    enabled: !!userId,
  });

  return {
    patient: patientQuery.data,
    appointments: appointmentsQuery.data || [],
    payments: paymentsQuery.data || [],
    isLoading: patientQuery.isLoading || appointmentsQuery.isLoading || paymentsQuery.isLoading,
    isError: patientQuery.isError,
  };
};