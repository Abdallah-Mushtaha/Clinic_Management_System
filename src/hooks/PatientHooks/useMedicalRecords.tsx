import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axiosInstance";

export const useMedicalRecords = () => {
  const { user } = useAuth();

  const { data: records = [], isLoading } = useQuery({
    queryKey: ["patient-medical-records", user?.id],
    queryFn: async () => {
      const response = await api.get(`/medical-records?patientId=${user?.id}`);
      return response.data;
    },
    enabled: !!user?.id,
  });

  const handleDownloadPDF = useCallback(async (id: string) => {
    const element = document.getElementById(`rec-${id}`);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.getElementById(`rec-${id}`);
          if (clonedEl) {
            const buttons = clonedEl.querySelectorAll(
              "button, [data-html2canvas-ignore]",
            );
            buttons.forEach((b) => b.remove());

            clonedEl.querySelectorAll("*").forEach((node) => {
              const el = node as HTMLElement;
              const style = window.getComputedStyle(el);
              if (style.color.includes("oklch")) el.style.color = "#1e293b";
              if (style.backgroundColor.includes("oklch"))
                el.style.backgroundColor = "#ffffff";
              if (style.borderColor.includes("oklch"))
                el.style.borderColor = "#f1f5f9";
            });
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`medical-report-${id.substring(0, 6)}.pdf`);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء تحميل الملف");
    }
  }, []);

  const sortedRecords = [...records].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return { records: sortedRecords, isLoading, handleDownloadPDF };
};
