import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  MessageSquare,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import { useBooking } from "../../hooks/PatientHooks/useBooking";
import {
  DoctorCard,
  TimeSlotGrid,
} from "../../components/Patient/Appointments/BookingComponents";

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

export default function AppointmentsPage() {
  const { user } = useAuth();
  const { doctors, form, updateForm, handleBooking, currentFee, isSubmitting } =
    useBooking(user?.id);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-12 text-right" dir="rtl">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            حجز موعد جديد
          </h1>
          <p className="text-gray-500 mt-2">
            اختر الطبيب والوقت المناسب لك بكل سهولة.
          </p>
        </header>

        <form onSubmit={handleBooking} className="space-y-8">
          {/* Doctor Selection */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-blue-700 font-semibold">
              <User size={20} /> <h2>اختر الطبيب المتخصص</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((doc: any) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  isSelected={form.doctorId === doc.id}
                  onSelect={() => updateForm("doctorId", doc.id)}
                />
              ))}
            </div>
          </section>

          {/* Fee Banner */}
          {form.doctorId && (
            <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-xl flex justify-between items-center animate-in zoom-in-95">
              <div>
                <p className="text-blue-100 text-xs font-bold uppercase">
                  سعر الاستشارة
                </p>
                <h3 className="text-3xl font-black">{currentFee} ج.م</h3>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl">
                <DollarSign size={32} />
              </div>
            </div>
          )}

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-blue-700 font-semibold">
                <CalendarIcon size={20} /> <h2>تاريخ الموعد</h2>
              </div>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={form.date}
                onChange={(e) => updateForm("date", e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </section>

            <section
              className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-opacity ${!form.date && "opacity-50 pointer-events-none"}`}
            >
              <div className="flex items-center gap-2 mb-4 text-blue-700 font-semibold">
                <Clock size={20} /> <h2>الوقت المتاح</h2>
              </div>
              <TimeSlotGrid
                slots={TIME_SLOTS}
                selected={form.time}
                onSelect={(time: string) => updateForm("time", time)}
              />
            </section>
          </div>

          {/* Notes */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-blue-700 font-semibold">
              <MessageSquare size={20} /> <h2>إضافة ملاحظات</h2>
            </div>
            <textarea
              value={form.notes}
              onChange={(e) => updateForm("notes", e.target.value)}
              placeholder="اكتب تفاصيل الموعد..."
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              isSubmitting || !form.doctorId || !form.date || !form.time
            }
            className="w-full flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-xl"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
            ) : (
              <>
                <span className="flex items-center gap-2">
                  تأكيد الحجز ({currentFee} ج.م){" "}
                  <ChevronRight className="rotate-180" />
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
