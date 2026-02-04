import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export function useDoctorProfile(userId?: string) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>({});

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["doctor", userId],
    queryFn: () => api.get(`/doctors/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  useEffect(() => {
    if (doctor) setFormData(doctor);
  }, [doctor]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.patch(`/doctors/${userId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor", userId] });
      toast.success("تم تحديث البيانات بنجاح");
    },
    onError: () => toast.error("فشل التحديث، حاول لاحقاً"),
  });

  const handleChange = (name: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [name]: value }));

  return { doctor, formData, isLoading, updateMutation, handleChange };
}
