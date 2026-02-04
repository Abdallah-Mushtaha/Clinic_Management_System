import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import { ClipboardList, Plus, FileText } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import { RecordCard } from "../../components/doctor/RecordCard";
import { RecordForm } from "../../components/doctor/RecordForm";

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

export default function MedicalRecordsPage() {
  const { user } = useAuth();
  const { patientId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const {
    patients,
    records,
    createRecord,
    updateRecord,
    deleteRecord,
    isCreating,
    isUpdating,
  } = useMedicalRecords(user?.id, patientId);

  const confirmDelete = useCallback(
    (id: string) => {
      toast((t) => (
        <div className="flex flex-col gap-3">
          <span className="font-bold text-sm">هل أنت متأكد من الحذف؟</span>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                deleteRecord(id);
                toast.dismiss(t.id);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold"
            >
              حذف
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-500"
            >
              إلغاء
            </button>
          </div>
        </div>
      ));
    },
    [deleteRecord],
  );

  const sortedRecords = useMemo(
    () =>
      [...records].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [records],
  );

  return (
    <DashboardLayout>
      <Toaster />
      <div className="space-y-8 text-right" dir="rtl">
        <header className="flex justify-between items-center bg-white p-8 rounded-[32px] shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                <ClipboardList />
              </div>
              سجلات المرضى
            </h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700"
          >
            <Plus size={20} /> إضافة سجل
          </button>
        </header>

        {showForm && (
          <RecordForm
            patients={patients}
            types={RECORD_TYPES}
            isSubmitting={isCreating}
            onClose={() => setShowForm(false)}
            onSubmit={(data) =>
              createRecord(
                {
                  ...data,
                  doctorId: user?.id,
                  doctorName: user?.name,
                  date: new Date().toISOString(),
                },
                { onSuccess: () => setShowForm(false) },
              )
            }
          />
        )}

        {editingRecord && (
          <RecordForm
            patients={patients}
            initialData={editingRecord}
            isEdit
            types={RECORD_TYPES}
            isSubmitting={isUpdating}
            onClose={() => setEditingRecord(null)}
            onSubmit={(data) =>
              updateRecord(
                { ...editingRecord, ...data },
                {
                  onSuccess: () => {
                    setEditingRecord(null);
                  },
                },
              )
            }
          />
        )}

        <div className="grid grid-cols-1 gap-6">
          {sortedRecords.length > 0 ? (
            sortedRecords.map((r: any) => (
              <RecordCard
                key={r.id}
                record={r}
                types={RECORD_TYPES}
                onDelete={confirmDelete}
                onEdit={() => setEditingRecord(r)}
              />
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-[32px] border border-dashed">
              <FileText size={40} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-bold">لا توجد سجلات</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
