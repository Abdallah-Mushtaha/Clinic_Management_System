import { useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import { BarChart3, TrendingUp, Users, Star, Download } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { StatCard } from "../../components/doctor/doctorCustemCard";
import { SatisfactionCard } from "../../components/doctor/SatisfactionCard";
import { useAnalytics } from "../../hooks/useAnalytics";
import { exportToPDF } from "../../utils/exportUtils";

export default function ReportsPage() {
  const { user } = useAuth();
  const reportRef = useRef<HTMLDivElement>(null);
  const { stats, monthlyData } = useAnalytics(user?.id);

  return (
    <DashboardLayout>
      <div
        ref={reportRef}
        className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-10 min-h-screen bg-[#fafafb] text-right"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 no-export">
          <div>
            <h1 className="text-4xl font-black text-[#0f172a] tracking-tight">
              التحليلات الذكية
            </h1>
            <p className="text-[#64748b] mt-2 font-medium">
              متابعة دقيقة لمؤشرات أداء د. {user?.name}
            </p>
          </div>
          <button
            onClick={() => exportToPDF(reportRef.current)}
            className="flex items-center gap-2 bg-[#0f172a] text-white px-8 py-4 rounded-2xl shadow-xl font-bold active:scale-95 transition-all"
          >
            <Download size={20} /> تصدير التقرير PDF
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="إجمالي المواعيد"
            value={stats.total}
            icon={BarChart3}
            color="#3B82F6"
            trend="+12%"
          />
          <StatCard
            title="عدد المرضى"
            value={stats.uniquePatients}
            icon={Users}
            color="#8B5CF6"
            trend="+5%"
          />
          <StatCard
            title="متوسط التقييم"
            value={stats.avgRating}
            icon={Star}
            color="#F59E0B"
            trend={
              stats.totalReviews > 0
                ? `من ${stats.totalReviews} مراجع`
                : "لا يوجد"
            }
          />
          <StatCard
            title="نسبة الإنجاز"
            value={`${stats.completionRate}%`}
            icon={TrendingUp}
            color="#10B981"
            trend="أداء ممتاز"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Area Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-[#e2e8f0]">
            <h2 className="text-xl font-black text-[#1e293b] mb-8 flex items-center gap-2 justify-end">
              تدفق المواعيد الشهري{" "}
              <div className="w-2 h-6 bg-[#2563eb] rounded-full" />
            </h2>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="appointments"
                    stroke="#3b82f6"
                    strokeWidth={4}
                    fill="url(#colorApp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Cards: Pie Chart & Satisfaction */}
          <div className="space-y-8 flex flex-col">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#e2e8f0] flex-1">
              <h2 className="text-xl font-black text-[#1e293b] mb-6">
                توزيع الحالات
              </h2>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "مكتملة", value: stats.completed },
                        { name: "إنتظار", value: stats.pending },
                        { name: "ملغاة", value: stats.cancelled },
                      ]}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#3b82f6" />
                      <Cell fill="#f43f5e" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <SatisfactionCard
              avgRating={stats.avgRating}
              totalReviews={stats.totalReviews}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
