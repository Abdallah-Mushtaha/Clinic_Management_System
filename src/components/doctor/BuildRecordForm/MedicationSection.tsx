import { Pill, Trash2 } from "lucide-react";

interface Medication {
  name: string;
  dosage: string;
}

interface MedicationSectionProps {
  medications: Medication[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: "name" | "dosage", value: string) => void;
}

export const MedicationSection = ({
  medications,
  onAdd,
  onRemove,
  onUpdate,
}: MedicationSectionProps) => (
  <div className="space-y-4 border-t border-slate-50 pt-6">
    <div className="flex justify-between items-center">
      <h3 className="font-black text-orange-600 flex items-center gap-2 text-sm">
        <Pill size={18} /> الأدوية الموصوفة
      </h3>
      <button
        type="button"
        onClick={onAdd}
        className="text-[10px] bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-black hover:bg-orange-100 cursor-pointer transition-colors"
      >
        + أضف دواء جديد
      </button>
    </div>
    <div className="grid gap-3">
      {medications.map((med, idx) => (
        <div
          key={idx}
          className="flex gap-2 bg-slate-50/50 p-3 rounded-2xl items-center border border-slate-100 animate-in fade-in slide-in-from-top-2"
        >
          <input
            className="flex-[2] p-2 bg-white rounded-xl text-xs font-bold border border-slate-100 outline-none focus:border-orange-200"
            placeholder="اسم الدواء"
            value={med.name}
            onChange={(e) => onUpdate(idx, "name", e.target.value)}
            required
          />
          <input
            className="flex-1 p-2 bg-white rounded-xl text-xs font-bold border border-slate-100 outline-none focus:border-orange-200"
            placeholder="الجرعة"
            value={med.dosage}
            onChange={(e) => onUpdate(idx, "dosage", e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="text-slate-300 hover:text-red-500 p-2 cursor-pointer transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  </div>
);
