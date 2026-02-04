import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useAnalytics(doctorId?: string) {
  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments", doctorId],
    queryFn: () =>
      api
        .get(`/appointments`, { params: { doctorId } })
        .then((res) => res.data),
    enabled: !!doctorId,
  });

  const stats = useMemo(() => {
    const counts = appointments.reduce((acc: any, curr: any) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    const ratedApts = appointments.filter((a: any) => a.rating > 0);
    const avg =
      ratedApts.length > 0
        ? (
            ratedApts.reduce((sum: number, r: any) => sum + r.rating, 0) /
            ratedApts.length
          ).toFixed(1)
        : "0.0";

    return {
      total: appointments.length,
      completed: counts.completed || 0,
      cancelled: counts.cancelled || 0,
      pending: counts.pending || 0,
      uniquePatients: new Set(appointments.map((a: any) => a.patientId)).size,
      totalReviews: ratedApts.length,
      avgRating: avg,
      completionRate: Math.round(
        ((counts.completed || 0) / (appointments.length || 1)) * 100,
      ),
    };
  }, [appointments]);

  const monthlyData = useMemo(() => {
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    return months.map((month, i) => ({
      name: month,
      appointments: appointments.filter(
        (a: any) => new Date(a.date).getMonth() === i,
      ).length,
    }));
  }, [appointments]);

  return { appointments, stats, monthlyData };
}
