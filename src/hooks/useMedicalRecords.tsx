import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:3001";

export const useMedicalRecords = (userId?: string, patientId?: string) => {
  const queryClient = useQueryClient();

  const patientsQuery = useQuery({
    queryKey: ["patients", userId],
    queryFn: async () => {
      const appts = (
        await axios.get(`${API_BASE}/appointments?doctorId=${userId}`)
      ).data;
      const patientIds = [...new Set(appts.map((a: any) => a.patientId))];
      const allPts = (await axios.get(`${API_BASE}/patients`)).data;
      return allPts.filter((p: any) => patientIds.includes(p.id));
    },
    enabled: !!userId,
  });

  const recordsQuery = useQuery({
    queryKey: ["medicalRecords", userId, patientId],
    queryFn: async () => {
      const url = patientId
        ? `${API_BASE}/medical-records?doctorId=${userId}&patientId=${patientId}`
        : `${API_BASE}/medical-records?doctorId=${userId}`;
      return (await axios.get(url)).data;
    },
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: (newRec: any) =>
      axios.post(`${API_BASE}/medical-records`, newRec),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalRecords"] });
      toast.success("تم إضافة السجل بنجاح");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      axios.patch(`${API_BASE}/medical-records/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalRecords"] });
      toast.success("تم تعديل السجل بنجاح");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${API_BASE}/medical-records/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalRecords"] });
      toast.success("تم حذف السجل");
    },
  });

  return {
    patients: patientsQuery.data || [],
    records: recordsQuery.data || [],
    createRecord: createMutation.mutate,
    updateRecord: updateMutation.mutate,
    deleteRecord: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
