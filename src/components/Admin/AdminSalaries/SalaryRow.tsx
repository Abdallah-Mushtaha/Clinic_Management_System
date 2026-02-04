import { Edit, Save, X } from "lucide-react";

interface SalaryRowProps {
  item: any;
  isEditing: boolean;
  formData: any;
  onEdit: (item: any) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  setFormData: (data: any) => void;
}

export const SalaryRow = ({
  item,
  isEditing,
  formData,
  onEdit,
  onSave,
  onCancel,
  setFormData,
}: SalaryRowProps) => {
  const currentData = isEditing ? formData : item;
  const net =
    currentData.baseSalary + currentData.bonuses - currentData.deductions;

  const cells = [
    { key: "baseSalary", val: item.baseSalary, color: "text-slate-600" },
    {
      key: "bonuses",
      val: item.bonuses,
      color: "text-emerald-600",
      prefix: "+",
    },
    {
      key: "deductions",
      val: item.deductions,
      color: "text-rose-600",
      prefix: "-",
    },
  ];

  return (
    <tr className="hover:bg-slate-50/30 transition-colors">
      <td className="px-6 py-4 font-bold text-slate-900">
        د. {item.doctorName}
      </td>

      {cells.map((cell) => (
        <td
          key={cell.key}
          className={`px-6 py-4 text-sm font-bold ${cell.color}`}
        >
          {isEditing ? (
            <input
              type="number"
              value={formData[cell.key]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [cell.key]: parseInt(e.target.value) || 0,
                })
              }
              className="w-24 p-2 bg-white border border-slate-200 rounded-xl outline-none ring-blue-500 focus:ring-2"
            />
          ) : (
            `${cell.prefix || ""}${cell.val.toLocaleString()}`
          )}
        </td>
      ))}

      <td className="px-6 py-4 font-black text-blue-700">
        {net.toLocaleString()}
      </td>

      <td className="px-6 py-4">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={() => onSave(item.id)}
              className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={onCancel}
              className="p-2 bg-slate-100 text-slate-400 rounded-lg hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}
      </td>
    </tr>
  );
};
