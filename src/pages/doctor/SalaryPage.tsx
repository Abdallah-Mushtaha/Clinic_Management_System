import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import { DollarSign, TrendingUp, Wallet, CheckCircle2 } from "lucide-react";
import { StatCard } from "../../components/doctor/doctorCustemCard";
import { SalaryDetailList } from "../../components/doctor/SalaryDetailList";
import { useSalary } from "../../hooks/useSalary";
import {
  SalarySkeleton,
  SalaryEmptyState,
} from "../../components/doctor/Salary/SalaryStates";

export default function SalaryPage() {
  const { user } = useAuth();
  const { currentSalary, isLoading } = useSalary(user?.id);

  if (isLoading)
    return (
      <DashboardLayout>
        <SalarySkeleton />
      </DashboardLayout>
    );
  if (!currentSalary)
    return (
      <DashboardLayout>
        <SalaryEmptyState />
      </DashboardLayout>
    );

  const formatNum = (num: number) => num.toLocaleString();

  return (
    <DashboardLayout>
      <div
        className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-8 min-h-screen bg-[#fafafb] text-right"
        dir="rtl"
      >
        <header>
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight">
            كشف الرواتب
          </h1>
          <p className="text-[#64748b] mt-2 font-medium">
            مستحقاتك لشهر {currentSalary.displayMonth}
          </p>
        </header>

        {/* Hero Section */}
        <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center">
            <div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">
                إجمالي الراتب المستلم
              </p>
              <h2 className="text-7xl font-black tracking-tighter">
                {formatNum(currentSalary.total)}{" "}
                <span className="text-2xl text-gray-400 font-normal">EGP</span>
              </h2>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-sm">
              <CheckCircle2 className="text-green-500" size={20} />
              <span className="font-bold text-sm">حالة الدفع: مكتمل</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="الأساسي"
            value={currentSalary.baseSalary}
            icon={DollarSign}
            color="#3b82f6"
            trend="ثابت"
          />
          <StatCard
            title="المكافآت"
            value={currentSalary.bonuses}
            icon={TrendingUp}
            color="#10b981"
            trend="إضافي"
          />
          <StatCard
            title="الخصومات"
            value={currentSalary.deductions}
            icon={Wallet}
            color="#f43f5e"
            trend="مستقطع"
          />
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalaryDetailList
            title="تفاصيل الإضافات"
            amount={currentSalary.bonuses}
            type="bonus"
          />
          <SalaryDetailList
            title="تفاصيل الخصومات"
            amount={currentSalary.deductions}
            type="deduction"
          />
        </div>

        {/* Financial Table */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-200 shadow-sm overflow-hidden">
          <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
            <div className="w-2 h-6 bg-blue-600 rounded-full" /> تفاصيل السجل
            المالي
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {[
                    "رقم السجل",
                    "الأساسي",
                    "الإضافي",
                    "الخصم",
                    "الصافي النهائي",
                  ].map((h) => (
                    <th
                      key={h}
                      className="p-5 font-black text-gray-500 text-sm border-b border-gray-100"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-bold text-gray-900 border-b border-gray-100">
                    {currentSalary.id}
                  </td>
                  <td className="p-5 text-gray-700 border-b border-gray-100">
                    {formatNum(currentSalary.baseSalary)}
                  </td>
                  <td className="p-5 text-green-600 font-black border-b border-gray-100">
                    +{formatNum(currentSalary.bonuses)}
                  </td>
                  <td className="p-5 text-red-500 font-black border-b border-gray-100">
                    -{formatNum(currentSalary.deductions)}
                  </td>
                  <td className="p-5 font-black text-blue-700 text-lg border-b border-gray-100">
                    {formatNum(currentSalary.total)} EGP
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
