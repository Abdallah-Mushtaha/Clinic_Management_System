import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { FormHeader } from "./BuildRecordForm/FormHeader";
import { MedicationSection } from "./BuildRecordForm/MedicationSection";

interface RecordFormProps {
  patients: any[];
  onSubmit: (data: any) => void;
  onClose: () => void;
  isSubmitting: boolean;
  types: any;
  initialData?: any;
}

export const RecordForm = ({
  patients,
  onSubmit,
  onClose,
  isSubmitting,
  types,
  initialData,
}: RecordFormProps) => {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    patientId: "",
    type: "diagnosis",
    title: "",
    content: "",
    medications: [] as any[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        patientId: initialData.patientId || "",
        type: initialData.type || "diagnosis",
        title: initialData.title || "",
        content: initialData.content || "",
        medications: initialData.medications || [],
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === formData.patientId);
    onSubmit({ ...formData, patientName: patient?.name });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-100">
        <FormHeader isEditMode={isEditMode} onClose={onClose} />

        <form
          className="p-8 space-y-6 overflow-y-auto text-right"
          dir="rtl"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 mr-1 uppercase">
                المريض
              </label>
              <select
                disabled={isEditMode}
                className="w-full p-3.5 bg-slate-50 border-none rounded-2xl font-bold text-sm disabled:opacity-60 cursor-not-allowed outline-none focus:ring-2 focus:ring-blue-100"
                value={formData.patientId}
                onChange={(e) =>
                  setFormData({ ...formData, patientId: e.target.value })
                }
                required
              >
                <option value="">-- اختر المريض --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 mr-1 uppercase">
                نوع السجل
              </label>
              <select
                className="w-full p-3.5 bg-slate-50 border-none rounded-2xl font-bold text-sm cursor-pointer outline-none focus:ring-2 focus:ring-blue-100"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                {Object.entries(types).map(([k, v]: [string, any]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 mr-1 uppercase">
              عنوان التقرير
            </label>
            <input
              className="w-full p-3.5 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              placeholder="مثال: متابعة حالة ضغط الدم"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 mr-1 uppercase">
              المحتوى الطبي
            </label>
            <textarea
              className="w-full p-3.5 bg-slate-50 border-none rounded-2xl font-bold text-sm h-40 resize-none outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              placeholder="اكتب تفاصيل التشخيص أو الملاحظات هنا..."
            />
          </div>

          {formData.type === "prescription" && (
            <MedicationSection
              medications={formData.medications}
              onAdd={() =>
                setFormData({
                  ...formData,
                  medications: [
                    ...formData.medications,
                    { name: "", dosage: "" },
                  ],
                })
              }
              onRemove={(idx) =>
                setFormData({
                  ...formData,
                  medications: formData.medications.filter((_, i) => i !== idx),
                })
              }
              onUpdate={(idx, field, val) => {
                const updated = [...formData.medications];
                updated[idx][field] = val;
                setFormData({ ...formData, medications: updated });
              }}
            />
          )}

          <div className="flex gap-4 pt-6 mt-auto border-t border-slate-50">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-[2] py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg cursor-pointer text-white disabled:opacity-50 ${
                isEditMode
                  ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/10"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/10"
              }`}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isEditMode ? (
                "حفظ التعديلات"
              ) : (
                "إضافة السجل الطبي"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 cursor-pointer transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
