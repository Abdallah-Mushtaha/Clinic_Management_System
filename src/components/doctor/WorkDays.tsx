export const WorkDays = ({ selectedDays, onToggle, isEdit }: any) => {
  const days = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  return (
    <section className="bg-white p-7 rounded-[28px] border border-slate-100 shadow-sm">
      <h2 className="font-black text-slate-700 mb-6">أيام العمل الإسبوعية</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {days.map((day) => (
          <button
            key={day}
            disabled={!isEdit}
            onClick={() => onToggle(day)}
            className={`h-20 rounded-2xl font-bold text-xs border-2 transition-all ${
              selectedDays.includes(day)
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-slate-50 text-slate-400 border-transparent"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </section>
  );
};
