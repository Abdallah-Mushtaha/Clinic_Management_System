import { DashboardLayout } from "../../components/layouts/Layout";
import { useAdminData } from "../../hooks/AdminHooks/useAdminData";
import { BarChart3, Users, DollarSign, Activity } from "lucide-react";
import { ReportsSkeleton } from "../../components/Admin/AdminReports/ReportsSkeleton";

export default function AdminReportsPage() {
  const { doctors, patients, appointments, isLoading } = useAdminData();

  if (isLoading) return <ReportsSkeleton />;

  const stats = {
    totalDoctors: doctors.length,
    totalPatients: patients.length,
    totalAppointments: appointments.length,

    totalRevenue: appointments
      .filter((a) => a.status === "completed")
      .reduce((sum, a) => sum + Number(a.consultationFee || 0), 0),

    // actualPaid: payments.reduce((sum, p) => sum + p.amount, 0),
  };

  const appointmentsByStatus = [
    {
      status: "مكتملة",
      count: appointments.filter((a) => a.status === "completed").length,
      color: "bg-green-500",
    },
    {
      status: "قيد الانتظار",
      count: appointments.filter((a) => a.status === "pending").length,
      color: "bg-yellow-500",
    },
    {
      status: "ملغاة",
      count: appointments.filter((a) => a.status === "cancelled").length,
      color: "bg-red-500",
    },
  ];

  const doctorPerformance = doctors.map((doc) => {
    const docApps = appointments.filter((a) => a.doctorId === doc.id);
    const completed = docApps.filter((a) => a.status === "completed").length;
    return {
      name: doc.name,
      specialty: doc.specialty,
      total: docApps.length,
      completed: completed,
      rate: docApps.length > 0 ? (completed / docApps.length) * 100 : 0,
    };
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 p-4" dir="rtl">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            لوحة التقارير الذكية
          </h1>
          <p className="text-slate-500 mt-2">
            تحليل شامل لبيانات العيادة بناءً على السجلات الحالية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="الأطباء"
            value={stats.totalDoctors}
            icon={<Users />}
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <StatCard
            title="المرضى"
            value={stats.totalPatients}
            icon={<Activity />}
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <StatCard
            title="المواعيد"
            value={stats.totalAppointments}
            icon={<BarChart3 />}
            color="text-purple-600"
            bg="bg-purple-50"
          />
          <StatCard
            title="إيرادات مكتملة"
            value={`${stats.totalRevenue} $`}
            icon={<DollarSign />}
            color="text-amber-600"
            bg="bg-amber-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-6">حالات المواعيد</h2>
            <div className="space-y-6">
              {appointmentsByStatus.map((item) => (
                <div key={item.status} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{item.status}</span>
                    <span>{item.count} موعد</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-1000`}
                      style={{
                        width: `${stats.totalAppointments > 0 ? (item.count / stats.totalAppointments) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-6">
              كفاءة الأطباء (المواعيد المكتملة)
            </h2>
            <div className="overflow-hidden">
              <table className="w-full text-right">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-slate-50">
                    <th className="pb-4 font-medium">الطبيب</th>
                    <th className="pb-4 font-medium">المكتملة</th>
                    <th className="pb-4 font-medium">النسبة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {doctorPerformance.slice(0, 5).map((doc, idx) => (
                    <tr key={idx} className="group">
                      <td className="py-4">
                        <p className="font-bold text-slate-800">{doc.name}</p>
                        <p className="text-xs text-slate-400">
                          {doc.specialty}
                        </p>
                      </td>
                      <td className="py-4 text-slate-600">
                        {doc.completed} / {doc.total}
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">
                          {doc.rate.toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm mb-1">{title}</p>
        <p className={`text-3xl font-black ${color}`}>{value}</p>
      </div>
      <div className={`p-4 ${bg} ${color} rounded-2xl`}>{icon}</div>
    </div>
  );
}
