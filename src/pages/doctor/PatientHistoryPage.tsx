import { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../components/layouts/Layout";
import { FileText } from "lucide-react";
import { RecordCard } from "../../components/doctor/RecordCard";
import { RecordForm } from "../../components/doctor/RecordForm";
import { usePatientRecords } from "../../hooks/usePatientRecords";
import { HistoryHeader } from "../../components/doctor/PatientHistory/HistoryHeader";

const RECORD_TYPES = {
  diagnosis: {
    label: "تشخيص",
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  lab: {
    label: "فحص مختبري",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  imaging: {
    label: "أشعة",
    color: "bg-purple-50 text-purple-700 border-purple-100",
  },
  prescription: {
    label: "وصفة",
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
};

export default function PatientHistoryPage() {
  const { patientId } = useParams();
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const { patient, sortedRecords, isLoading, updateMutation, deleteMutation } =
    usePatientRecords(patientId);

  return (
    <DashboardLayout>
      <div className="space-y-8 text-right" dir="rtl">
        <HistoryHeader patientName={patient?.name} />

        {editingRecord && (
          <RecordForm
            patients={[patient]}
            initialData={editingRecord}
            isEdit
            types={RECORD_TYPES}
            onClose={() => setEditingRecord(null)}
            onSubmit={(data) =>
              updateMutation.mutate(
                { ...editingRecord, ...data },
                { onSuccess: () => setEditingRecord(null) },
              )
            }
            isSubmitting={updateMutation.isPending}
          />
        )}

        <div className="grid grid-cols-1 gap-6">
          {!isLoading && sortedRecords.length > 0 ? (
            sortedRecords.map((record: any) => (
              <RecordCard
                key={record.id}
                record={record}
                types={RECORD_TYPES}
                onEdit={() => setEditingRecord(record)}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-[32px] border border-dashed">
              <FileText size={40} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-bold">
                لا توجد سجلات لهذا المريض
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
