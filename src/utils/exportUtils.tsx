import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (element: HTMLElement | null) => {
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,

      useCORS: true,

      backgroundColor: "#ffffff",

      ignoreElements: (el) => el.classList.contains("no-export"),

      onclone: (clonedDoc) => {
        clonedDoc.querySelectorAll("*").forEach((el) => {
          const style = window.getComputedStyle(el);

          if (
            style.color.includes("oklch") ||
            style.color.includes("oklab") ||
            style.backgroundColor.includes("oklch") ||
            style.backgroundColor.includes("oklab")
          ) {
            (el as HTMLElement).style.color = "#1e293b";

            (el as HTMLElement).style.backgroundColor = "transparent";
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("report.pdf");
  } catch {
    alert("حدث خطأ أثناء التنزيل");
  }
};
