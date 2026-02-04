import { useState } from "react";
import { Plus, Trash2, XCircle, ArrowRightLeft } from "lucide-react";

export const VacationManager = ({ blockedDates, setData, isEdit }: any) => {
  const [singleDate, setSingleDate] = useState("");
  const [range, setRange] = useState({ start: "", end: "" });

  const addBlocked = (payload: any) => {
    setData((prev: any) => ({
      ...prev,
      blockedDates: [...prev.blockedDates, payload],
    }));
  };

  const removeBlocked = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      blockedDates: prev.blockedDates.filter(
        (_: any, i: number) => i !== index,
      ),
    }));
  };

  return (
    <section className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm h-full">
      <h2 className="font-black text-slate-700 mb-6 border-b border-slate-50 pb-4 flex items-center gap-2">
        <XCircle size={18} className="text-red-500" /> نظام الإجازات
      </h2>

      {isEdit && (
        <div className="space-y-4 mb-6">
          {/* يوم واحد */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="text-[10px] font-bold text-slate-500 block mb-2">
              إجازة ليوم واحد
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={singleDate}
                onChange={(e) => setSingleDate(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl text-xs font-bold p-2 focus:ring-1 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => {
                  if (singleDate) {
                    addBlocked({ date: singleDate, reason: "إجازة ليوم" });
                    setSingleDate("");
                  }
                }}
                className="bg-slate-800 text-white p-2 rounded-xl hover:bg-black transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* نطاق تاريخ */}
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <label className="text-[10px] font-bold text-blue-600 block mb-2">
              إجازة من - إلى
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={range.start}
                  onChange={(e) =>
                    setRange({ ...range, start: e.target.value })
                  }
                  className="flex-1 bg-white border border-blue-100 rounded-xl text-[10px] p-2 font-bold focus:ring-1 focus:ring-blue-400"
                />
                <ArrowRightLeft size={14} className="text-blue-300" />
                <input
                  type="date"
                  value={range.end}
                  onChange={(e) => setRange({ ...range, end: e.target.value })}
                  className="flex-1 bg-white border border-blue-100 rounded-xl text-[10px] p-2 font-bold focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (range.start && range.end) {
                    addBlocked({ ...range, reason: "إجازة مطولة" });
                    setRange({ start: "", end: "" });
                  }
                }}
                className="w-full py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black hover:bg-blue-700 shadow-md shadow-blue-100 transition-all"
              >
                تأكيد فترة الإجازة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* القائمة */}
      <div className="space-y-3">
        {blockedDates.map((item: any, idx: number) => (
          <div
            key={idx}
            className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-sm transition-all"
          >
            <div>
              <p className="text-[11px] font-black text-slate-700 flex items-center gap-1">
                {item.date ? item.date : `${item.start} ⬅️ ${item.end}`}
              </p>
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-tight">
                {item.reason}
              </span>
            </div>
            {isEdit && (
              <button
                onClick={() => removeBlocked(idx)}
                className="text-red-200 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
