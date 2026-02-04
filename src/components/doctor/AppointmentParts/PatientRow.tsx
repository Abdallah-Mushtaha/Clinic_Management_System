import {
  Eye,
  FileText,
  Phone,
  Mail,
  ChevronLeft,
  Activity,
  AlertTriangle,
  MessageCircle,
  Info,
} from "lucide-react";

interface Props {
  patient: any;
  onWhatsApp: (phone: string, name: string) => void;
  onNavigate: (id: string) => void;
}

export const PatientRow = ({ patient, onWhatsApp, onNavigate }: Props) => (
  <tr className="hover:bg-blue-50/20 transition-colors group">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold border-2 border-white ring-1 ring-gray-100">
          {patient.name?.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {patient.name}
          </p>
          <p className="text-xs text-gray-400 font-medium">
            {patient.age} سنة • {patient.gender}
          </p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-col gap-1 text-xs font-medium italic">
        <div className="flex items-center gap-2 text-gray-600">
          <Phone size={12} className="text-gray-400" /> {patient.phone}
        </div>
        <div className="flex items-center gap-2 text-gray-400 truncate max-w-[150px]">
          <Mail size={12} /> {patient.email}
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      {patient.bloodType ? (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-black">
          <Activity size={12} /> {patient.bloodType}
        </span>
      ) : (
        <span className="text-gray-300 text-xs">—</span>
      )}
    </td>
    <td className="px-6 py-4">
      {patient.chronicDiseases?.length > 0 ? (
        <div className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100">
          <AlertTriangle size={10} /> {patient.chronicDiseases[0]}
          {patient.chronicDiseases.length > 1 &&
            ` +${patient.chronicDiseases.length - 1}`}
        </div>
      ) : (
        <span className="text-gray-400 text-[10px] italic">
          لا يوجد سجل مزمن
        </span>
      )}
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center justify-center gap-2">
        <div className="relative group/info">
          <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-blue-600 transition-all border border-transparent hover:border-gray-100">
            <Eye size={18} />
          </button>
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 min-w-[220px] p-4 bg-gray-900 text-white rounded-2xl text-[11px] shadow-2xl invisible group-hover/info:visible opacity-0 group-hover/info:opacity-100 transition-all z-50 pointer-events-none text-right">
            <p className="font-bold border-b border-gray-700 pb-2 mb-2 text-blue-400 flex items-center gap-2 justify-end">
              تفاصيل طبية <Info size={14} />
            </p>
            <div className="space-y-2">
              <p>
                <span className="text-gray-400 block">الحساسية:</span>{" "}
                {patient.allergies?.join("، ") || "لا يوجد"}
              </p>
              <p>
                <span className="text-gray-400 block">المزمنة:</span>{" "}
                {patient.chronicDiseases?.join("، ") || "لا يوجد"}
              </p>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
          </div>
        </div>

        <button
          onClick={() => onNavigate(patient.id)}
          className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-green-600 transition-all"
        >
          <FileText size={18} />
        </button>

        <button
          onClick={() => onWhatsApp(patient.phone, patient.name)}
          className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-emerald-500 transition-all flex items-center gap-1 group/wa"
        >
          <MessageCircle size={18} />
          <ChevronLeft
            size={14}
            className="group-hover/wa:-translate-x-1 transition-transform"
          />
        </button>
      </div>
    </td>
  </tr>
);
