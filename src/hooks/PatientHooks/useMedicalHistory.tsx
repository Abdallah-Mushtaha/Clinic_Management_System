import { useState, useEffect, useCallback } from "react";
import api from "../../api/axiosInstance";

export const useMedicalHistory = (userId: string | undefined) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    bloodType: "",
    allergies: [] as string[],
    chronicDiseases: [] as string[],
    previousSurgeries: [] as string[],
  });

  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const { data } = await api.get(`/patients/${userId}`);
      setFormData({
        bloodType: data.bloodType || "",
        allergies: Array.isArray(data.allergies) ? data.allergies : [],
        chronicDiseases: Array.isArray(data.chronicDiseases)
          ? data.chronicDiseases
          : [],
        previousSurgeries: Array.isArray(data.previousSurgeries)
          ? data.previousSurgeries
          : [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleItem = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => {
      const list = prev[key];
      if (!Array.isArray(list)) return { ...prev, [key]: value };
      return {
        ...prev,
        [key]: list.includes(value)
          ? list.filter((i) => i !== value)
          : [...list, value],
      };
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await api.patch(`/patients/${userId}`, formData);
      setEditMode(false);
      return { success: true };
    } catch (error) {
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    editMode,
    setEditMode,
    isLoading,
    isSubmitting,
    toggleItem,
    handleSave,
  };
};
