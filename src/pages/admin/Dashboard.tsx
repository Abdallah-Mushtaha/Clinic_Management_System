import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Users,
  Calendar,
  DollarSign,
  Activity,
  ChevronLeft,
} from "lucide-react";

// Layout & Hooks
import { DashboardLayout } from "../../components/layouts/Layout";
import { useAdminData } from "../../hooks/AdminHooks/useAdminData";

// Components
import { StatCard } from "../../components/Admin/Dashbord/StatCard";
import { SystemStatus } from "../../components/Admin/Dashbord/SystemStatus";
import { RecentActivityTable } from "../../components/Admin/Dashbord/RecentActivityTable";
import { AppointmentsDistribution } from "../../components/Admin/Dashbord/AppointmentsDistribution";
import {
  LoadingSpinner,
  ErrorMessage,
} from "../../components/Admin/Dashbord/StateUIs";

// Types & Constants
import type { QuickLinkItem } from "../../components/Admin/Dashbord/admin";

const QUICK_LINKS: QuickLinkItem[] = [
  {
    title: "الأطباء",
    path: "/admin/doctors",
    icon: Stethoscope,
    color: "text-blue-600",
  },
  {
    title: "المرضى",
    path: "/admin/patients",
    icon: Users,
    color: "text-emerald-600",
  },
  {
    title: "المواعيد",
    path: "/admin/appointments",
    icon: Calendar,
    color: "text-violet-600",
  },
  {
    title: "الرواتب",
    path: "/admin/salaries",
    icon: DollarSign,
    color: "text-amber-500",
  },
];

export default function AdminDashboard() {
  const {
    doctors = [],
    patients = [],
    appointments = [],
    isLoading,
    isError,
  } = useAdminData();

  const stats = useMemo(() => {
    const activeDocs = doctors.filter((d) => d.workingDays?.length > 0).length;
    const pending = appointments.filter((a) => a.status === "pending").length;
    const completed = appointments.filter(
      (a) => a.status === "completed",
    ).length;

    return {
      activeDocs,
      pending,
      completed,
      usageRate:
        doctors.length > 0
          ? Math.round((activeDocs / doctors.length) * 100)
          : 0,
      avgAppts:
        doctors.length > 0
          ? (appointments.length / doctors.length).toFixed(1)
          : "0",
    };
  }, [doctors, appointments]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-8 bg-slate-900"></span>
              <span className="text-[15px] font-black uppercase tracking-[0.3em] text-slate-400">
                إدارة المنشأة الصحية
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              الرئيسية
            </h1>
          </div>
          <SystemStatus />
        </header>

        {/* Stats Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="الكادر الطبي"
            value={doctors.length}
            subtext={`${stats.activeDocs} طبيب متاح للعمل اليوم`}
            icon={Stethoscope}
            variant="blue"
          />
          <StatCard
            title="إجمالي المرضى"
            value={patients.length}
            subtext="+12 مريض جديد هذا الشهر"
            icon={Users}
            variant="emerald"
          />
          <StatCard
            title="المواعيد"
            value={appointments.length}
            subtext={`${stats.pending} قيد الانتظار حالياً`}
            icon={Calendar}
            variant="white-violet"
          />
          <StatCard
            title="كفاءة الأداء"
            value={`${stats.usageRate}%`}
            subtext={`متوسط ${stats.avgAppts} موعد/طبيب`}
            icon={Activity}
            variant="white-amber"
          />
        </section>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_LINKS.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <link.icon className={`w-5 h-5 ${link.color}`} />
                <span className="font-bold text-slate-700">{link.title}</span>
              </div>
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
        </div>

        {/* Dynamic Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RecentActivityTable appointments={appointments.slice(0, 5)} />
          <AppointmentsDistribution stats={stats} total={appointments.length} />
        </div>
      </div>
    </DashboardLayout>
  );
}
