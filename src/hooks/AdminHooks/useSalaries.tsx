import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";

export function useSalaries() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [salRes, docRes] = await Promise.all([
        api.get(`/doctorSalaries`),
        api.get(`/doctors`),
      ]);
      setSalaries(salRes.data);
      setDoctors(docRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSalary = async (id: string, updatedData: any) => {
    try {
      const existingSalary = salaries.find((s) => s.id === id);
      if (existingSalary) {
        await api.patch(`/doctorSalaries/${id}`, updatedData);
      } else {
        await api.post(`/doctorSalaries`, { id, ...updatedData });
      }
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { salaries, doctors, loading, updateSalary };
}
