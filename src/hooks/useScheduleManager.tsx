import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:3001";

export function useScheduleManager(doctorId: string) {
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    workingDays: [] as string[],
    startTime: "09:00",
    endTime: "17:00",
    slotDuration: 30,
    blockedDates: [] as any[],
  });

  const { data: doctorData, isLoading } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: async () =>
      (await axios.get(`${API_URL}/doctors/${doctorId}`)).data,
    enabled: !!doctorId,
  });

  useEffect(() => {
    if (doctorData) {
      setFormData({
        workingDays: doctorData.workingDays || [],
        startTime: doctorData.workingHours?.start || "09:00",
        endTime: doctorData.workingHours?.end || "17:00",
        slotDuration: doctorData.slotDuration || 30,
        blockedDates: doctorData.blockedDates || [],
      });
    }
  }, [doctorData]);

  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      axios.patch(`${API_URL}/doctors/${doctorId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctor", doctorId]);
      setEditMode(false);
      toast.success("تم الحفظ بنجاح");
    },
  });

  return {
    formData,
    setFormData,
    editMode,
    setEditMode,
    isLoading,
    updateMutation,
  };
}
