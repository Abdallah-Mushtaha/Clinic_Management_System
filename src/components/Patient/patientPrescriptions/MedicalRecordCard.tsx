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
      className="bg-white rounded-[24px] md:rounded-[32px] border border-[#f1f5f9] shadow-sm p-5 md:p-8 text-right transition-all hover:shadow-md group/card"
      dir="rtl"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 md:mb-8">
        <div className="flex items-start gap-4 md:gap-5 w-full">
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl text-white flex items-center justify-center shadow-lg shrink-0"
            style={{ backgroundColor: config.color }}
          >
            {config.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* العنوان: يختفي ما بعد السطر الأول (أو الطول المحدد) ويظهر عند الهوفر */}
              <h3
                className="text-lg md:text-xl font-bold text-[#0f172a] transition-all duration-300 line-clamp-1 hover:line-clamp-none cursor-help"
                title={record.title}
              >
                {record.title}
              </h3>
              <span
                className="px-2 md:px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-black border whitespace-nowrap"
                style={{
                  color: config.color,
                  borderColor: `${config.color}20`,
                  backgroundColor: `${config.color}10`,
                }}
              >
                {config.label}
              </span>
            </div>
            <div className="text-[12px] md:text-sm text-[#64748b] mt-1 font-medium flex flex-wrap items-center">
              <span className="whitespace-nowrap">
                د. {record.doctorName || "طبيب متخصص"}
              </span>
              <span className="mx-2 text-[#e2e8f0] hidden md:inline">|</span>
              <span className="mx-2 text-[#e2e8f0] md:hidden">•</span>
              <span className="whitespace-nowrap">
                {new Date(record.date).toLocaleDateString("ar-EG")}
              </span>
            </div>
          </div>
        </div>

        <button
          data-html2canvas-ignore
          onClick={() => onDownload(record.id)}
          className="w-full md:w-auto px-6 py-3 md:py-3.5 bg-[#0f172a] text-white rounded-xl md:rounded-2xl text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Download size={16} /> تحميل التقرير PDF
        </button>
      </div>

      {/* صندوق المحتوى: يظهر أول 5 أسطر فقط وعند الهوفر يظهر الباقي */}
      <div className="bg-[#f8fafc] p-5 md:p-6 rounded-xl md:rounded-2xl border border-[#f1f5f9] mb-6 transition-all duration-500 group/content hover:bg-white hover:border-blue-100">
        <p className="text-[#475569] text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium line-clamp-5 md:line-clamp-5 hover:line-clamp-none transition-all duration-500">
          {record.content}
        </p>
      </div>

      {/* قسم الأدوية كما هو */}
      {record.medications?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[1px] flex-1 bg-[#f1f5f9]"></div>
            <span className="text-[9px] md:text-[10px] font-black text-[#94a3b8] uppercase tracking-wider">
              الأدوية المرفقة
            </span>
            <div className="h-[1px] flex-1 bg-[#f1f5f9]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {record.medications.map((med: any, idx: number) => (
              <div
                key={idx}
                className="bg-white p-3.5 md:p-4 rounded-xl md:rounded-xl border border-[#f1f5f9] flex justify-between items-center shadow-sm"
              >
                <div className="font-bold text-sm md:text-base text-[#1e293b] truncate ml-2">
                  💊 {med.name}
                </div>
                <div className="text-[10px] md:text-xs font-bold text-[#2563eb] bg-blue-50 px-2.5 py-1 rounded-md whitespace-nowrap border border-blue-100/50">
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
