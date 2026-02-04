import { useState, useEffect, useMemo } from "react";
import api from "../../api/axiosInstance";
import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import { Bell } from "lucide-react";
import { NotificationItem } from "../../components/Patient/Notifications/NotificationItem";
import { NotificationsSkeleton } from "../../components/Patient/Notifications/NotificationsSkeleton";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState<any[]>([]);

  const DISMISSED_KEY = `dismissed_notifs_${user?.id}`;
  const READ_KEY = `read_notifs_${user?.id}`;

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        setLoading(true);
        const [apptsRes, doctorsRes] = await Promise.all([
          api.get("/appointments"),
          api.get("/doctors"),
        ]);

        const dismissedIds = JSON.parse(
          localStorage.getItem(DISMISSED_KEY) || "[]",
        );
        const readIds = JSON.parse(localStorage.getItem(READ_KEY) || "[]");

        const db = {
          appointments: apptsRes.data,
          doctors: doctorsRes.data,
        };

        const generated: any[] = [];
        const now = new Date();

        db.appointments
          ?.filter((a: any) => a.patientId === user?.id)
          .forEach((apt: any) => {
            const doctor = db.doctors.find((d: any) => d.id === apt.doctorId);
            const aptDate = new Date(`${apt.date}T${apt.time}`);
            const diffInHours =
              (aptDate.getTime() - now.getTime()) / (1000 * 60 * 60);

            const checkAndPush = (notif: any) => {
              if (!dismissedIds.includes(notif.id)) {
                generated.push({
                  ...notif,
                  read: readIds.includes(notif.id),
                });
              }
            };

            if (apt.status === "cancelled") {
              checkAndPush({
                id: `cancel-${apt.id}`,
                title: "تم إلغاء الموعد",
                message: `تم إلغاء موعدك مع د. ${doctor?.name} بتاريخ ${apt.date}`,
                type: "appointment_cancelled",
                timestamp: apt.date,
              });
            }

            if (
              apt.status !== "cancelled" &&
              diffInHours > 0 &&
              diffInHours <= 1
            ) {
              checkAndPush({
                id: `remind-${apt.id}`,
                title: "تذكير: موعدك بعد قليل",
                message: `موعدك مع د. ${doctor?.name} سيبدأ الساعة ${apt.time}`,
                type: "appointment_reminder",
                timestamp: new Date().toISOString(),
              });
            }

            if (apt.status === "pending") {
              checkAndPush({
                id: `pay-${apt.id}`,
                title: "دفعة مستحقة",
                message: `يرجى سداد ${apt.consultationFee} ريال لموعد د. ${doctor?.name}`,
                type: "payment_pending",
                timestamp: new Date().toISOString(),
              });
            }
          });

        setNotifications(
          generated.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
          ),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchAndProcessData();
  }, [user?.id]);

  const handleRemove = (id: string) => {
    const dismissedIds = JSON.parse(
      localStorage.getItem(DISMISSED_KEY) || "[]",
    );
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...dismissedIds, id]));
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMarkRead = (id: string) => {
    const readIds = JSON.parse(localStorage.getItem(READ_KEY) || "[]");
    localStorage.setItem(READ_KEY, JSON.stringify([...readIds, id]));
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  const filtered = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications,
    [filter, notifications],
  );

  if (loading)
    return (
      <DashboardLayout>
        <NotificationsSkeleton />
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4" dir="rtl">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <div className="text-right">
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                التنبيهات
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                لديك {notifications.filter((n) => !n.read).length} تنبيهات غير
                مقروءة
              </p>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
              <button
                onClick={() => setFilter("all")}
                className={`px-8 py-2.5 rounded-xl text-xs font-bold transition-all ${filter === "all" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
              >
                الكل
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-8 py-2.5 rounded-xl text-xs font-bold transition-all ${filter === "unread" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
              >
                غير المقروء
              </button>
            </div>
          </header>

          <div className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((n) => (
                <NotificationItem
                  key={n.id}
                  n={n}
                  onMarkRead={handleMarkRead}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-slate-200">
                <Bell className="mx-auto text-slate-200 mb-4" size={48} />
                <p className="text-slate-400 font-bold text-sm">
                  لا توجد تنبيهات حالية
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
