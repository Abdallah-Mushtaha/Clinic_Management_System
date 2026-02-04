import { memo } from "react";
import {
  FileText,
  Download,
  Activity,
  TestTube,
  Image as ImageIcon,
} from "lucide-react";

const RECORD_CONFIG = {
  diagnosis: {
    label: "تشخيص طبي",
    color: "#2563eb",
    icon: <Activity size={26} />,
  },
  lab: {
    label: "تحليل مختبري",
    color: "#059669",
    icon: <TestTube size={26} />,
  },
  imaging: {
    label: "تقرير أشعة",
    color: "#7c3aed",
    icon: <ImageIcon size={26} />,
  },
  prescription: {
    label: "وصفة طبية",
    color: "#ea580c",
    icon: <FileText size={26} />,
  },
};

export const MedicalRecordCard = memo(({ record, onDownload }: any) => {
  const config =
    RECORD_CONFIG[record.type as keyof typeof RECORD_CONFIG] ||
    RECORD_CONFIG.diagnosis;

  return (
    <div
      id={`rec-${record.id}`}
      className="bg-white rounded-[32px] border border-[#f1f5f9] shadow-sm p-8 text-right transition-all hover:shadow-md"
      dir="rtl"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex items-start gap-5">
          <div
            className="w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-lg"
            style={{ backgroundColor: config.color }}
          >
            {config.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[#0f172a]">
                {record.title}
              </h3>
              <span
                className="px-3 py-1 rounded-lg text-[10px] font-black border"
                style={{
                  color: config.color,
                  borderColor: `${config.color}20`,
                  backgroundColor: `${config.color}10`,
                }}
              >
                {config.label}
              </span>
            </div>
            <div className="text-sm text-[#64748b] mt-1 font-medium">
              <span>د. {record.doctorName || "طبيب متخصص"}</span>
              <span className="mx-2 text-[#e2e8f0]">|</span>
              <span>{new Date(record.date).toLocaleDateString("ar-EG")}</span>
            </div>
          </div>
        </div>
        <button
          data-html2canvas-ignore
          onClick={() => onDownload(record.id)}
          className="px-6 py-3 bg-[#0f172a] text-white rounded-2xl text-xs font-bold hover:bg-black transition-all flex items-center gap-2"
        >
          <Download size={16} /> تحميل التقرير PDF
        </button>
      </div>

      <div className="bg-[#f8fafc] p-6 rounded-2xl border border-[#f1f5f9] mb-6">
        <p className="text-[#475569] leading-relaxed whitespace-pre-wrap font-medium">
          {record.content}
        </p>
      </div>

      {record.medications?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[1px] flex-1 bg-[#f1f5f9]"></div>
            <span className="text-[10px] font-black text-[#94a3b8] uppercase">
              الأدوية المرفقة
            </span>
            <div className="h-[1px] flex-1 bg-[#f1f5f9]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {record.medications.map((med: any, idx: number) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-[#f1f5f9] flex justify-between items-center shadow-sm"
              >
                <div className="font-bold text-[#1e293b]">💊 {med.name}</div>
                <div className="text-xs font-bold text-[#2563eb] bg-blue-50 px-2 py-1 rounded-md">
                  {med.dosage}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
