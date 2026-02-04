import { FileText, Trash2, User, Pencil } from "lucide-react";
import { memo } from "react";

export const RecordCard = memo(({ record, onDelete, onEdit, types }: any) => (
  <div className="bg-white border border-gray-100 rounded-[24px] p-6 hover:shadow-xl transition-all group relative flex flex-col justify-between min-h-[200px]">
    <div>
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${types[record.type]?.color} border`}
          >
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">{record.title}</h3>
            <div className="flex gap-3 mt-1 font-bold text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <User size={14} /> {record.patientName}
              </span>
              <span>• {new Date(record.date).toLocaleDateString("ar-EG")}</span>
            </div>
          </div>
        </div>
        <span
          className={`px-4 py-1.5 rounded-xl text-xs font-black border ${types[record.type]?.color}`}
        >
          {types[record.type]?.label}
        </span>
      </div>

      <p className="mt-4 text-gray-600 text-sm bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
        {record.content}
      </p>
    </div>

    <div className="mt-4 flex justify-between items-end">
      <div className="flex flex-wrap gap-2">
        {record.medications?.map((m: any, i: number) => (
          <span
            key={i}
            className="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded-lg font-bold border border-orange-100"
          >
            💊 {m.name}
          </span>
        ))}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={() => onEdit(record)}
          className="p-2.5 text-gray-400 hover:text-white hover:bg-blue-600 rounded-xl bg-gray-50"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(record.id)}
          className="p-2.5 text-gray-300 hover:text-white hover:bg-red-500 rounded-xl bg-gray-50"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </div>
));
