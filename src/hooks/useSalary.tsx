import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useSalary(doctorId?: string) {
  const { data: salaryData = [], isLoading } = useQuery({
    queryKey: ["doctorSalaries", doctorId],
    queryFn: () =>
      api
        .get(`/doctorSalaries`, { params: { doctorId } })
        .then((res) => res.data),
    enabled: !!doctorId,
  });

  const currentSalary = useMemo(() => {
    if (!salaryData.length) return null;
    const latest = salaryData[salaryData.length - 1];
    return {
      ...latest,
      total: latest.baseSalary + latest.bonuses - latest.deductions,
      displayMonth: latest.month || "فبراير 2026",
    };
  }, [salaryData]);

  return { currentSalary, isLoading };
}
