import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axiosInstance";
import { SignJWT } from "jose";

export const useProfile = () => {
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [formData, setFormData] = useState<any>(null);

  const localUser =
    typeof window !== "undefined" ? localStorage.getItem("clinic_user") : null;
  const user = localUser ? JSON.parse(localUser) : null;

  const { data: patient, isLoading } = useQuery({
    queryKey: ["patient", user?.id],
    queryFn: async () => {
      const res = await api.get(`/patients/${user?.id}`);
      return res.data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (patient) setFormData(patient);
  }, [patient]);

  const updatePatientMutation = useMutation({
    mutationFn: (updatedData: any) =>
      api.patch(`/patients/${user?.id}`, updatedData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["patient", user?.id] });
      setEditMode(false);
      setPasswordMode(false);
      localStorage.setItem("clinic_user", JSON.stringify(res.data));
    },
  });

  const handleFormChange = (field: string) => (e: any) => {
    if (formData) setFormData({ ...formData, [field]: e.target.value });
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) updatePatientMutation.mutate(formData);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm)
      return alert("كلمات المرور غير متطابقة");

    const secret = new TextEncoder().encode("your-secret-key");
    const encryptedNewPassword = await new SignJWT({ password: passwords.new })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    updatePatientMutation.mutate({ password: encryptedNewPassword });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return {
    patient,
    formData,
    isLoading,
    editMode,
    setEditMode,
    passwordMode,
    setPasswordMode,
    passwords,
    setPasswords,
    handleFormChange,
    handleUpdateProfile,
    handleUpdatePassword,
  };
};
