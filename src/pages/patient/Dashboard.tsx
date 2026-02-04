import React, { useState } from "react";
import { DashboardLayout } from "../../components/layouts/Layout";
import { Calendar, FileText, Heart, Clock, AlertCircle } from "lucide-react";
import { ActionGrid } from "../../components/ActionGrid";
import { usePatientData } from "../../hooks/PatientHooks/usePatientData";
import { StatCard } from "../../components/Patient/dashbord/StatCard";
import { AppointmentsList } from "../../components/Patient/dashbord/AppointmentsList";
import {
  PendingPaymentsList,
  PaymentModal,
} from "../../components/Patient/dashbord/PaymentSection";
import { DashboardSkeleton } from "../../components/Patient/dashbord/DashboardSkeleton";

export default function PatientDashboard() {
  const {
    patient,
    appointments,
    doctorMap,
    isLoading,
    isError,
    upcomingAppointments,
    pendingConsultations,
    totalPendingAmount,
  } = usePatientData();

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  if (isError || !patient) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-orange-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-bold font-sans">
            لم يتم العثور على سجل طبي لهذا المستخدم
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            مرحباً بك يا {patient.name}
          </h1>
          <p className="text-gray-600 font-medium">
            الرقم الطبي: #{patient.id}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="المواعيد القادمة"
            value={upcomingAppointments.length}
            icon={<Calendar className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="إجمالي الدفعات المعلقة"
            value={`${totalPendingAmount} ج.م`}
            extra={`عدد الاستشارات: ${pendingConsultations.length}`}
            icon={<AlertCircle className="w-6 h-6" />}
            color="orange"
          />
          <StatCard
            title="فصيلة الدم"
            value={patient.bloodType || "N/A"}
            icon={<Heart className="w-6 h-6" />}
            color="red"
          />
          <StatCard
            title="إجمالي المواعيد"
            value={appointments.length}
            icon={<Clock className="w-6 h-6" />}
            color="green"
          />
        </div>

        {/* ... بقية الكود كما هو بدون تغيير ... */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-900">
            <AlertCircle className="w-5 h-5" />
            <div>
              <p className="font-semibold">الحساسيات</p>
              <p className="text-sm">{patient.allergies.join("، ")}</p>
            </div>
          </div>
        )}

        <ActionGrid
          items={[
            {
              to: "/patient/appointments",
              label: "حجز موعد جديد",
              icon: Calendar,
              color: "bg-blue-600 hover:bg-blue-700",
            },
            {
              to: "/patient/medical-history",
              label: "ملفي الطبي",
              icon: Heart,
              color: "bg-gray-500 hover:bg-gray-600",
            },
            {
              to: "/patient/prescriptions",
              label: "الوصفات الطبية",
              icon: FileText,
              color: "bg-green-600 hover:bg-green-700",
            },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AppointmentsList
            appointments={upcomingAppointments}
            doctorMap={doctorMap}
          />
          <PendingPaymentsList
            pendingConsultations={pendingConsultations}
            doctorMap={doctorMap}
            onPayClick={() => setShowPaymentModal(true)}
          />
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </DashboardLayout>
  );
}
