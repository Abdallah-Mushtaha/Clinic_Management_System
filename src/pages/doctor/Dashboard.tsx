import { DashboardLayout } from "../../components/layouts/Layout";
import { Calendar, Users, Star, Clock } from "lucide-react";
import { ActionGrid } from "../../components/ActionGrid";
import { StatCard } from "../../components/StatCard";
import { DoctorSalaryCard } from "../../components/doctor/DoctorSalaryCard";
import { useDoctorDashboard } from "../../hooks/useDoctorDashboard";
import { DashboardHeader } from "../../components/doctor/Dashbord/SubDashboard";

export default function DoctorDashboard() {
  const { doctor, salary, stats } = useDoctorDashboard();

  const ACTION_ITEMS = [
    {
      to: "/doctor/appointments",
      label: "إدارة المواعيد",
      icon: Calendar,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      to: "/doctor/patients",
      label: "قائمة المرضى",
      icon: Users,
      color: "bg-gray-600 hover:bg-gray-700",
    },
    {
      to: "/doctor/schedule",
      label: "الجدول الزمني",
      icon: Clock,
      color: "bg-green-600 hover:bg-green-700",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 text-right" dir="rtl">
        <DashboardHeader name={doctor?.name} specialty={doctor?.specialty} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="مواعيد اليوم"
            value={stats.todayCount}
            icon={<Clock className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="المواعيد القادمة"
            value={stats.upcomingCount}
            icon={<Calendar className="w-6 h-6" />}
            color="green"
          />
          <StatCard
            title="إجمالي المرضى"
            value={stats.patientCount}
            icon={<Users className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="تقييم المرضى"
            value={
              stats.averageRating > 0
                ? `${stats.averageRating} / 5`
                : "لا تقييم"
            }
            extra={
              stats.totalRatings > 0
                ? `من ${stats.totalRatings} مراجعين`
                : "بانتظار أول تقييم"
            }
            icon={
              <Star
                className={`w-6 h-6 ${stats.averageRating > 0 ? "fill-yellow-400 text-yellow-400" : ""}`}
              />
            }
            color="yellow"
          />
        </div>

        <ActionGrid items={ACTION_ITEMS} />

        {salary && (
          <DoctorSalaryCard
            baseSalary={salary.baseSalary}
            bonuses={salary.bonuses}
            deductions={salary.deductions}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
