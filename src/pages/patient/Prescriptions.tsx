import { DashboardLayout } from "../../components/layouts/Layout";
import { ClipboardList, FileText } from "lucide-react";
import { useMedicalRecords } from "../../hooks/PatientHooks/useMedicalRecords";
import { MedicalRecordCard } from "../../components/Patient/patientPrescriptions/MedicalRecordCard";
import { RecordsSkeleton } from "../../components/Patient/patientPrescriptions/RecordsSkeleton";

export default function PatientRecordsPage() {
  const { records, isLoading, handleDownloadPDF } = useMedicalRecords();

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-12" dir="rtl">
        <header className="text-right border-b pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-[#0f172a]">
              ملفي <span className="text-[#3b82f6]">الطبي الشامل</span>
            </h1>
            <p className="text-[#94a3b8] mt-2 font-medium">
              جميع التقارير، التشخيصات، والوصفات الطبية في مكان واحد
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 hidden md:block">
            <ClipboardList className="text-blue-600" size={32} />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {isLoading ? (
            <RecordsSkeleton />
          ) : records.length > 0 ? (
            records.map((rec: any) => (
              <MedicalRecordCard
                key={rec.id}
                record={rec}
                onDownload={handleDownloadPDF}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

const EmptyState = () => (
  <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-[#e2e8f0]">
    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
      <FileText size={40} />
    </div>
    <h3 className="text-xl font-bold text-gray-900">لا توجد سجلات بعد</h3>
    <p className="text-[#94a3b8] mt-2">
      سيتم عرض تقاريرك الطبية هنا فور صدورها من الطبيب
    </p>
  </div>
);
