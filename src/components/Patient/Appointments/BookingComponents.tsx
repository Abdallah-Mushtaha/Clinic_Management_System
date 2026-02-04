import { CheckCircle2, DollarSign } from "lucide-react";

export const DoctorCard = ({ doctor, isSelected, onSelect }: any) => (
  <div
    onClick={onSelect}
    className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${isSelected ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-100" : "border-gray-100 bg-white"}`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-gray-800 text-lg">{doctor.name}</h3>
        <div className="flex gap-2 mt-2">
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            {doctor.specialty}
          </span>
          <span className="px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-1">
            <DollarSign size={12} /> {doctor.consultationFee || 200} ج.م
          </span>
        </div>
      </div>
      {isSelected && <CheckCircle2 className="text-blue-600" size={24} />}
    </div>
  </div>
);

export const TimeSlotGrid = ({ slots, selected, onSelect }: any) => (
  <div className="grid grid-cols-3 gap-2">
    {slots.map((time: string) => (
      <button
        key={time}
        type="button"
        onClick={() => onSelect(time)}
        className={`py-2 text-sm font-medium rounded-lg transition-all ${selected === time ? "bg-blue-600 text-white shadow-lg" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
      >
        {time}
      </button>
    ))}
  </div>
);
