import { useState, useMemo } from "react";
import { useAdminData } from "./useAdminData";

export function useDoctorsManager() {
  const { doctors, isLoading, addDoctor, updateDoctor, deleteDoctor, isPending } = useAdminData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const initialForm = {
    name: "",
    email: "",
    specialty: "",
    experience: 0,
    consultationFee: 100,
    phone: "",      
    education: "",  
    bio: "",
    role: "Doctor",
    password: "12345678"
  };

  const [formData, setFormData] = useState(initialForm);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) =>
      [d.name, d.email, d.specialty].some(f => f?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [doctors, searchTerm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalData = {
      ...formData,
      role: "Doctor",
      password: formData.password || "12345678" // التأكيد على وجودها هنا
    };

    if (editingId) {
      await updateDoctor(editingId, finalData);
    } else {
      await addDoctor(finalData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (doctor: any) => {
    setEditingId(doctor.id);
    setFormData({
      ...doctor,
      password: doctor.password || "12345678"
    });
    setShowForm(true);
  };

  return {
    doctors: filteredDoctors,
    isLoading,
    isPending,
    showForm,
    setShowForm,
    editingId,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    handleSubmit,
    handleEdit,
    deleteDoctor,
    resetForm
  };
}