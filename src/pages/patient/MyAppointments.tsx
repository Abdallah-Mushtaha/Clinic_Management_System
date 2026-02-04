import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/layouts/Layout";
import { Star, X } from "lucide-react";
import { useAppointments } from "../../hooks/PatientHooks/useAppointments";
import { AppointmentCard } from "../../components/Patient/myAppointmentCard/AppointmentCard";

export default function MyAppointmentsPage() {
  const storedUser = useMemo(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("clinic_user");
      return data ? JSON.parse(data) : null;
    }
    return null;
  }, []);

  const navigate = useNavigate();
  const {
    appointments,
    doctorMap,
    filter,
    setFilter,
    isLoading,
    handleCancelAppointment,
    showRatingModal,
    setShowRatingModal,
    pendingRatingAppt,
    ratingScore,
    setRatingScore,
    submitRating,
  } = useAppointments(storedUser?.id);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="flex justify-center p-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 py-4">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-right">
            <h1 className="text-4xl font-extrabold text-gray-900">مواعيدي</h1>
            <p className="text-gray-500 mt-1 font-medium">
              إدارة زياراتك الطبية
            </p>
          </div>
          <div className="inline-flex p-1 bg-gray-100 rounded-2xl" dir="rtl">
            {["all", "upcoming", "past", "cancelled"].map((f: any) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${filter === f ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
              >
                {f === "all"
                  ? "الكل"
                  : f === "upcoming"
                    ? "قادمة"
                    : f === "past"
                      ? "ماضية"
                      : "ملغاة"}
              </button>
            ))}
          </div>
        </header>

        <div className="grid gap-6">
          {appointments.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[24px] border border-dashed text-gray-400 font-bold">
              لا توجد مواعيد في هذا القسم حالياً
            </div>
          ) : (
            appointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                apt={apt}
                doctor={doctorMap[apt.doctorId]}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                onEdit={() => navigate(`/patient/edit-appointment/${apt.id}`)}
                onCancel={(id: string) => {
                  handleCancelAppointment(id);
                  setActiveMenu(null);
                }}
              />
            ))
          )}
        </div>

        {showRatingModal && pendingRatingAppt && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            dir="rtl"
          >
            <div className="bg-white rounded-[32px] shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in duration-300">
              <button
                onClick={() => setShowRatingModal(false)}
                className="absolute top-6 left-6 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <div className="text-center space-y-6">
                <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Star
                    className="w-10 h-10 text-blue-600"
                    fill="currentColor"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">
                    تقييم زيارتك
                  </h3>
                  <p className="text-gray-500 mt-2">
                    كيف كانت تجربتك مع{" "}
                    <strong>
                      د. {doctorMap[pendingRatingAppt.doctorId]?.name}
                    </strong>
                    ؟
                  </p>
                </div>
                <div className="flex justify-center gap-2 py-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatingScore(star)}
                      className="transition-transform active:scale-90"
                    >
                      <Star
                        size={40}
                        className={
                          star <= ratingScore
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }
                        fill={star <= ratingScore ? "currentColor" : "none"}
                        strokeWidth={2}
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={submitRating}
                  disabled={ratingScore === 0}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 disabled:bg-gray-200 transition-all"
                >
                  ارسال التقييم
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
