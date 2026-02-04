import React, { type JSX } from "react";
import { CalendarCheck } from "lucide-react";

export default function AppointmentHeader(): JSX.Element {
  const statusCircles = [
    { color: "bg-blue-400", title: "مواعيد جديدة" },
    { color: "bg-emerald-400", title: "مواعيد مكتملة" },
    { color: "bg-amber-400", title: "مواعيد معلقة" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <div className="flex items-center gap-5">
        <div className="bg-blue-50 p-4 rounded-3xl transition-transform hover:rotate-6">
          <CalendarCheck className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            إدارة المواعيد
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            تتبع وحالات الحجوزات الطبية في المركز
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
        <div className="flex -space-x-3 rtl:space-x-reverse">
          {statusCircles.map((circle, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full border-2 border-white shadow-sm ${circle.color}`}
              title={circle.title}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase leading-none">
            Status
          </span>
          <span className="text-xs font-bold text-slate-600">تحديث فوري</span>
        </div>
      </div>
    </div>
  );
}
