import { useState, useMemo } from "react";
import { DashboardLayout } from "../../components/layouts/Layout";
import { useAdminData } from "../../hooks/AdminHooks/useAdminData";
import { SettingsSkeleton } from "../../components/Admin/Settings/SettingsSkeleton";
import { SystemInfoSection } from "../../components/Admin/Settings/SystemInfoSection";
import { SecuritySection } from "../../components/Admin/Settings/SecuritySection";
import { DatabaseCard } from "../../components/Admin/Settings/DatabaseCard";

export default function AdminSettingsPage() {
  const { doctors, patients, appointments, isLoading } = useAdminData();
  const [editMode, setEditMode] = useState(false);
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    dataEncryption: true,
    sessionTimeout: 60,
  });
  const [systemInfo] = useState({
    clinicName: "مجمع الشفاء الطبي",
    adminEmail: "admin@gmail.com",
  });

  const dbStats = useMemo(
    () => ({
      details: {
        doctors: doctors?.length || 0,
        patients: patients?.length || 0,
      },
      raw: { doctors, patients, appointments },
    }),
    [doctors, patients, appointments],
  );

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(dbStats.raw, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute(
      "download",
      `system_backup_${new Date().toISOString().split("T")[0]}.json`,
    );
    link.click();
  };

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="max-w-[1200px] mx-auto p-4">
          <SettingsSkeleton />
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-8 pb-20 p-4" dir="rtl">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              الإعدادات المركزية
            </h1>
            <p className="text-slate-500 mt-2">
              إدارة الأمان والبيانات المستمدة من قاعدة البيانات
            </p>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`rounded-2xl px-8 h-12 font-bold transition-all ${editMode ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" : "bg-blue-600 text-white"}`}
          >
            {editMode ? "حفظ الإعدادات" : "تحرير البيانات"}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SystemInfoSection systemInfo={systemInfo} editMode={editMode} />
            <SecuritySection security={security} setSecurity={setSecurity} />
          </div>
          <DatabaseCard dbStats={dbStats} onExport={handleExportJSON} />
        </div>
      </div>
    </DashboardLayout>
  );
}
