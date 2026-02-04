import { memo } from "react";
import { CheckCircle2, Waves } from "lucide-react";

interface Props {
  title: string;
  icon: any;
  color: "blue" | "green" | "amber";
  selected: string[];
  options: string[];
  isEdit: boolean;
  onToggle: (val: string) => void;
}

export const MedicalSection = memo(
  ({
    title,
    icon: Icon,
    color,
    selected = [],
    options,
    isEdit,
    onToggle,
  }: Props) => {
    const themes = {
      blue: {
        bg: "bg-blue-50/60",
        text: "text-blue-400",
        btn: "bg-blue-400",
        border: "border-blue-50",
      },
      green: {
        bg: "bg-emerald-50/60",
        text: "text-emerald-400",
        btn: "bg-emerald-400",
        border: "border-emerald-50",
      },
      amber: {
        bg: "bg-amber-50/60",
        text: "text-amber-400",
        btn: "bg-amber-400",
        border: "border-amber-50",
      },
    };
    const theme = themes[color];
    const itemsToShow = isEdit
      ? Array.from(new Set([...options, ...selected]))
      : selected;

    return (
      <div
        className={`h-full bg-white p-8 rounded-[32px] border ${theme.border} shadow-sm transition-all duration-300 hover:shadow-md`}
      >
        <div className="flex items-center gap-4 mb-8">
          <div
            className={`w-12 h-12 rounded-2xl ${theme.bg} ${theme.text} flex items-center justify-center`}
          >
            <Icon size={20} strokeWidth={2} />
          </div>
          <h2 className="text-lg font-bold text-slate-700">{title}</h2>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {itemsToShow.length > 0 ? (
            itemsToShow.map((item) => (
              <button
                key={item}
                disabled={!isEdit}
                onClick={() => onToggle(item)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold transition-all border ${
                  selected.includes(item)
                    ? `${theme.btn} text-white border-transparent shadow-sm -translate-y-0.5`
                    : `bg-slate-50/50 text-slate-400 border-slate-100/50 hover:border-slate-200`
                }`}
              >
                <div className="flex items-center gap-2">
                  {selected.includes(item) && <CheckCircle2 size={12} />}
                  {item}
                </div>
              </button>
            ))
          ) : (
            <div className="w-full py-8 flex flex-col items-center text-slate-200">
              <Waves size={20} className="mb-2 opacity-50" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                لا توجد بيانات مسجلة
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);
