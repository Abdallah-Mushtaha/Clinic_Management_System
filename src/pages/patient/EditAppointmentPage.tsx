import React from "react";
import { DashboardLayout } from "../../components/layouts/Layout";
import {
  Calendar,
  Clock,
  ChevronRight,
  Save,
  AlertCircle,
  User,
} from "lucide-react";
import { useEditAppointment } from "../../hooks/PatientHooks/useEditAppointment";

export default function EditAppointmentPage() {
  const {
    form,
    doctorName,
    loading,
    submitting,
    timeSlots,
    handleUpdate,
    updateField,
    navigate,
  } = useEditAppointment();

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto py-8 px-4" dir="rtl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold mb-8 transition-all group"
        >
          <ChevronRight
            size={20}
            className="group-hover:translate-x-1 transition-transform rotate-180"
          />
          <span>الرجوع للمواعيد</span>
        </button>

        <div className="mb-10 text-right">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            تحديث الموعد
          </h1>
          <p className="text-gray-500 mt-2">
            اختر الوقت والتاريخ الجديد المناسب لك
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="bg-white border border-gray-100 p-6 rounded-[28px] shadow-sm flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <User size={32} />
            </div>
            <div className="text-right">
              <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">
                طبيب الموعد
              </span>
              <h3 className="text-2xl font-black text-gray-900">
                د. {doctorName}
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-gray-900 font-black">
                <Calendar className="text-blue-600" size={20} />
                <span>التاريخ</span>
              </div>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-bold text-gray-700 outline-none"
              />
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-gray-900 font-black">
                <Clock className="text-blue-600" size={20} />
                <span>التوقيت</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => updateField("time", slot)}
                    className={`py-3 rounded-xl text-xs font-black transition-all ${
                      form.time === slot
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-95"
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-amber-50 rounded-[24px] border border-amber-100 text-amber-700">
            <AlertCircle size={24} className="shrink-0" />
            <p className="text-sm font-bold leading-relaxed">
              يرجى العلم أن تغيير الموعد يعتمد على توفر الطبيب في الوقت المختار.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white py-5 rounded-[28px] font-black text-xl transition-all shadow-xl hover:shadow-2xl disabled:bg-gray-200 disabled:shadow-none"
          >
            {submitting ? (
              <div className="h-6 w-6 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
            ) : (
              <>
                <Save size={24} />
                تأكيد وحفظ
              </>
            )}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
