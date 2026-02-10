import { Edit, Trash2, Stethoscope, ArrowRight } from "lucide-react";

export const DepartmentCard = ({ dept, allDoctors, onEdit, onDelete }: any) => {
  const deptDoctors =
    allDoctors?.filter((d: any) => dept.doctorIds?.includes(d.id)) || [];

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700 opacity-50"></div>

      <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
          <Stethoscope className="w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div className="flex gap-1.5 md:gap-2">
          <button
            onClick={onEdit}
            className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={onDelete}
            className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2 relative z-10 truncate">
        {dept.name}
      </h3>

      <p className="text-slate-500 font-medium h-12 overflow-hidden text-xs md:text-sm italic relative z-10 line-clamp-2">
        "{dept.description}"
      </p>

      <div className="pt-5 md:pt-6 border-t border-slate-50 relative z-10 mt-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-tighter md:tracking-normal">
            الطاقم الطبي
          </span>
          <span className="text-[10px] md:text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
            {deptDoctors.length} أعضاء
          </span>
        </div>

        <div className="flex -space-x-2 md:-space-x-3 space-x-reverse items-center min-h-[40px] md:min-h-[48px] overflow-x-auto no-scrollbar">
          {deptDoctors.length > 0 ? (
            deptDoctors.map((doc: any) => (
              <div
                key={doc.id}
                title={doc.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 md:border-4 border-white bg-slate-100 flex items-center justify-center text-[9px] md:text-[10px] font-black shadow-sm shrink-0"
              >
                {doc.name.substring(0, 2)}
              </div>
            ))
          ) : (
            <p className="text-[10px] md:text-[11px] text-slate-400 font-bold flex items-center gap-1">
              <ArrowRight size={12} /> شاغر
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
