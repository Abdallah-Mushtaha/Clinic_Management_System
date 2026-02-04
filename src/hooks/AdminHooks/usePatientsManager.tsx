import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../../api/axiosInstance";

export const usePatientsManager = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/patients");
      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error("فشل في تحميل بيانات المرضى");
    } finally {
      setIsLoading(false);
    }
  };

  const deletePatient = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      setPatients((prev) => prev.filter((p) => p.id !== id));
      toast.success("تم حذف المريض بنجاح"); // استخدام التوست هنا
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف");
    }
  };
  const filteredPatients = patients.filter((p) => {
    const search = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(search) ||
      p.email?.toLowerCase().includes(search) ||
      p.phone?.includes(searchTerm)
    );
  });

  return {
    patients,
    filteredPatients,
    isLoading,
    searchTerm,
    setSearchTerm,
    deletePatient,
    refreshPatients: fetchPatients,
  };
};
