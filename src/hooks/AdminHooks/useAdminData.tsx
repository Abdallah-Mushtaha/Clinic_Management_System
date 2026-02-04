import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Patient, Doctor, Appointment } from "./clinic";
import api from "../../api/axiosInstance";

export const useAdminData = () => {
  const queryClient = useQueryClient();

  const doctorsQuery = useQuery({
    queryKey: ["doctors"],
    queryFn: async (): Promise<Doctor[]> => (await api.get("/doctors")).data,
  });

  const patientsQuery = useQuery({
    queryKey: ["patients"],
    queryFn: async (): Promise<Patient[]> => (await api.get("/patients")).data,
  });

  const appointmentsQuery = useQuery({
    queryKey: ["appointments"],
    queryFn: async (): Promise<Appointment[]> =>
      (await api.get("/appointments")).data,
  });

  const addDoctorMutation = useMutation({
    mutationFn: (newDoctor: Partial<Doctor>) =>
      api.post("/doctors", {
        ...newDoctor,
        role: "Doctor",
        workingDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
        workingHours: { start: "09:00", end: "17:00" },
        blockedDates: [],
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctors"] }),
  });

  const updateDoctorMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Doctor> }) => {
      const currentDoctors = queryClient.getQueryData<Doctor[]>(["doctors"]);
      const existingDoctor = currentDoctors?.find((d) => d.id === id);

      const updatedData = existingDoctor
        ? { ...existingDoctor, ...data }
        : data;

      return api.put(`/doctors/${id}`, updatedData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctors"] }),
  });

  const deleteDoctorMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/doctors/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctors"] }),
  });

  return {
    doctors: doctorsQuery.data || [],
    patients: patientsQuery.data || [],
    appointments: appointmentsQuery.data || [],
    isLoading:
      doctorsQuery.isLoading ||
      patientsQuery.isLoading ||
      appointmentsQuery.isLoading,
    isError:
      doctorsQuery.isError ||
      patientsQuery.isError ||
      appointmentsQuery.isError,
    addDoctor: addDoctorMutation.mutateAsync,
    updateDoctor: (id: string, data: Partial<Doctor>) =>
      updateDoctorMutation.mutateAsync({ id, data }),
    deleteDoctor: deleteDoctorMutation.mutateAsync,
    isPending:
      updateDoctorMutation.isPending ||
      addDoctorMutation.isPending ||
      deleteDoctorMutation.isPending,
  };
};
