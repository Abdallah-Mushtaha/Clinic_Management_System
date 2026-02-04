import { Edit, Trash2, Stethoscope, ArrowRight } from "lucide-react";

export const DepartmentCard = ({ dept, allDoctors, onEdit, onDelete }: any) => {
  const deptDoctors =
    allDoctors?.filter((d: any) => dept.doctorIds?.includes(d.id)) || [];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="w-14 h-14 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
          <Stethoscope size={28} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={onDelete}
            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <h3 className="text-2xl font-black text-slate-800 mb-2 relative z-10">
        {dept.name}
      </h3>
      <p className="text-slate-500 font-medium h-12 overflow-hidden text-sm italic relative z-10">
        "{dept.description}"
      </p>
      <div className="pt-6 border-t border-slate-50 relative z-10 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] font-black text-slate-400 uppercase">
            الطاقم الطبي
          </span>
          <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
            {deptDoctors.length} أعضاء
          </span>
        </div>
        <div className="flex -space-x-3 space-x-reverse items-center min-h-[48px]">
          {deptDoctors.length > 0 ? (
            deptDoctors.map((doc: any) => (
              <div
                key={doc.id}
                title={doc.name}
                className="w-12 h-12 rounded-2xl border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black shadow-sm"
              >
                {doc.name.substring(0, 2)}
              </div>
            ))
          ) : (
            <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
              <ArrowRight size={12} /> شاغر
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
