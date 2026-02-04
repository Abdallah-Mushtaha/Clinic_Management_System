import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import { DollarSign, CheckCircle, Clock, Eye } from "lucide-react";
import { StatCard } from "../../components/Patient/Payments/StatCard";
import { PaymentModal } from "../../components/Patient/Payments/PaymentModal";
import api from "../../api/axiosInstance";
import { PaymentsSkeleton } from "../../components/Patient/Payments/PaymentsSkeleton";

export default function PaymentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/appointments`);
        setAppointments(data.filter((a: any) => a.patientId === user.id));
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user?.id]);

  const { totalPaid, totalPending, combinedPayments } = useMemo(() => {
    const paid = appointments.filter((a) => a.status === "completed");
    const pending = appointments.filter((a) => a.status === "pending");

    return {
      totalPaid: paid.reduce(
        (sum, a) => sum + Number(a.consultationFee || 200),
        0,
      ),
      totalPending: pending.reduce(
        (sum, a) => sum + Number(a.consultationFee || 200),
        0,
      ),
      combinedPayments: appointments.map((a) => ({
        id: a.id,
        date: a.date,
        amount: Number(a.consultationFee || 200),
        status: a.status === "completed" ? "paid" : "pending",
        type: "استشارة طبية",
      })),
    };
  }, [appointments]);

  if (isLoading)
    return (
      <DashboardLayout>
        <PaymentsSkeleton />
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="space-y-6 text-right" dir="rtl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">السجلات المالية</h1>
          <p className="text-gray-600 mt-1">
            عرض الدفعات بناءً على حالة المواعيد (مكتملة / معلقة)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="إجمالي المدفوع (المكتمل)"
            amount={totalPaid}
            icon={CheckCircle}
            colorClass="text-green-600"
            bgColorClass="bg-green-50"
          />
          <StatCard
            label="المعلق الدفع"
            amount={totalPending}
            icon={Clock}
            colorClass="text-orange-600"
            bgColorClass="bg-orange-50"
          />
          <StatCard
            label="الإجمالي المستحق"
            amount={totalPaid + totalPending}
            icon={DollarSign}
            colorClass="text-blue-600"
            bgColorClass="bg-blue-50"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-700">
                    تاريخ الموعد
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-700">
                    التفاصيل
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-700">المبلغ</th>
                  <th className="px-6 py-4 font-bold text-gray-700">
                    الحالة المالية
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-700">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {combinedPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50/50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {new Date(payment.date).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {payment.type} - #{payment.id.toString().slice(-5)}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {payment.amount} ج.م
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${payment.status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {payment.status === "paid"
                          ? "تم الدفع"
                          : "بانتظار الدفع"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {payment.status === "paid" ? (
                        <button className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1">
                          <Eye className="w-4 h-4" /> الفاتورة
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowPaymentModal(true)}
                          className="bg-orange-500 text-white px-4 py-1 rounded-lg text-xs font-bold hover:bg-orange-600 transition-transform active:scale-95"
                        >
                          سداد الآن
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showPaymentModal && (
          <PaymentModal onClose={() => setShowPaymentModal(false)} />
        )}
      </div>
    </DashboardLayout>
  );
}
