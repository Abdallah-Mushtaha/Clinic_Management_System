import { Clock } from "lucide-react";

export const WorkHours = ({ data, setData, isEdit }: any) => {
  const handleChange = (key: string, value: any) => {
    setData((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="bg-white p-7 rounded-[28px] border border-slate-100 shadow-sm">
      <h2 className="font-black text-slate-700 mb-6 flex items-center gap-2">
        <Clock size={18} className="text-blue-500" /> ساعات الدوام والمدة
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl">
          <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase">
            من الساعة
          </label>
          <input
            type="time"
            disabled={!isEdit}
            value={data.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
            className="w-full bg-transparent border-none p-0 font-black text-slate-700 focus:ring-0 disabled:opacity-50"
          />
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase">
            إلى الساعة
          </label>
          <input
            type="time"
            disabled={!isEdit}
            value={data.endTime}
            onChange={(e) => handleChange("endTime", e.target.value)}
            className="w-full bg-transparent border-none p-0 font-black text-slate-700 focus:ring-0 disabled:opacity-50"
          />
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase">
            مدة الكشف
          </label>
          <select
            disabled={!isEdit}
            value={data.slotDuration}
            onChange={(e) =>
              handleChange("slotDuration", Number(e.target.value))
            }
            className="w-full bg-transparent border-none p-0 font-black text-slate-700 focus:ring-0"
          >
            {[15, 30, 45, 60].map((v) => (
              <option key={v} value={v}>
                {v} دقيقة
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
