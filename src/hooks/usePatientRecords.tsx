import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function usePatientRecords(patientId?: string) {
  const queryClient = useQueryClient();

  const { data: patient } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => api.get(`/patients/${patientId}`).then((res) => res.data),
    enabled: !!patientId,
  });

  const { data: records = [], isLoading } = useQuery({
    queryKey: ["medical-records", patientId],
    queryFn: () =>
      api
        .get(`/medical-records?patientId=${patientId}`)
        .then((res) => res.data),
    enabled: !!patientId,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["medical-records", patientId] });

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.patch(`/medical-records/${data.id}`, data),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/medical-records/${id}`),
    onSuccess: invalidate,
  });

  const sortedRecords = useMemo(
    () =>
      [...records].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [records],
  );

  return { patient, sortedRecords, isLoading, updateMutation, deleteMutation };
}
