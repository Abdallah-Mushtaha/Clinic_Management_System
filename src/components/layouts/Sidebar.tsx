import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Heart,
  BarChart3,
  Clock,
  Stethoscope,
  Bell,
  Hospital,
  DollarSign,
} from "lucide-react";

export function Sidebar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = {
    patient: [
      {
        label: "لوحة التحكم",
        href: "/patient-dashboard",
        icon: LayoutDashboard,
      },
      { label: "حجز موعد", href: "/patient/appointments", icon: Calendar },
      { label: "مواعيدي", href: "/patient/my-appointments", icon: Clock },
      { label: "الملف الطبي", href: "/patient/medical-history", icon: Heart },
      {
        label: "الوصفات الطبية",
        href: "/patient/prescriptions",
        icon: FileText,
      },
      { label: "السجلات المالية", href: "/patient/payments", icon: BarChart3 },
      { label: "الإشعارات", href: "/patient/notifications", icon: Bell },
      { label: "الملف الشخصي", href: "/patient/profile", icon: Settings },
    ],
    doctor: [
      {
        label: "لوحة التحكم",
        href: "/doctor-dashboard",
        icon: LayoutDashboard,
      },
      { label: "المواعيد", href: "/doctor/appointments", icon: Calendar },
      { label: "المرضى", href: "/doctor/patients", icon: Users },
      {
        label: "السجلات الطبية",
        href: "/doctor/medical-records",
        icon: FileText,
      },
      { label: "الجدول الزمني", href: "/doctor/schedule", icon: Clock },
      { label: "التقارير", href: "/doctor/reports", icon: BarChart3 },
      { label: "الراتب", href: "/doctor/salary", icon: Stethoscope },
      { label: "الملف الشخصي", href: "/doctor/profile", icon: Settings },
    ],
    admin: [
      { label: "لوحة التحكم", href: "/admin-dashboard", icon: LayoutDashboard },
      { label: "الأطباء", href: "/admin/doctors", icon: Stethoscope },
      { label: "المرضى", href: "/admin/patients", icon: Users },
      { label: "المواعيد", href: "/admin/appointments", icon: Calendar },
      { label: "الأقسام", href: "/admin/departments", icon: Hospital },
      { label: "التقارير", href: "/admin/reports", icon: BarChart3 },
      { label: "الرواتب", href: "/admin/salaries", icon: DollarSign },
      { label: "الإعدادات", href: "/admin/settings", icon: Settings },
    ],
  };

  if (loading) return null;

  const currentMenuItems = user
    ? menuItems[user.role as keyof typeof menuItems] || []
    : [];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 cursor-pointer  lg:hidden bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-40 lg:translate-x-0 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-center gap-3 flex-row-reverse">
            <h1 className="text-xl font-bold text-gray-900">عيادتي الذكية</h1>
            <div className="bg-blue-500 rounded-full p-2">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {user && (
          <div className="p-4 mx-4 my-2 rounded-2xl bg-gray-50 border border-gray-100 text-right">
            <p className="text-sm font-bold text-gray-900">{user.name}</p>
            <p className="text-xs text-blue-600 mt-1 font-medium">
              {user.role}
            </p>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {currentMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all flex-row-reverse ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <Icon
                  size={20}
                  className={active ? "text-white" : "text-gray-400"}
                />
                <span className="flex-1 text-right">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full cursor-pointer  flex items-center justify-between px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-colors flex-row-reverse font-bold text-sm"
          >
            <div className="flex items-center gap-3 flex-row-reverse">
              <LogOut size={18} />
              <span>تسجيل الخروج</span>
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}
