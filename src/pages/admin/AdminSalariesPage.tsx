import { useState, useMemo } from "react";
import { DashboardLayout } from "../../components/layouts/Layout";
import { useSalaries } from "../../hooks/AdminHooks/useSalaries";
import { SalaryRow } from "../../components/Admin/AdminSalaries/SalaryRow";
import { SalariesSkeleton } from "../../components/Admin/AdminSalaries/SalariesSkeleton";

export default function AdminSalariesPage() {
  const { salaries, doctors, loading, updateSalary } = useSalaries();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    baseSalary: 0,
    bonuses: 0,
    deductions: 0,
  });

  const fullSalariesData = useMemo(
    () =>
      doctors.map((doc) => {
        const s = salaries.find((s) => s.doctorId === doc.id);
        return {
          id: s?.id || `temp-${doc.id}`,
          doctorId: doc.id,
          doctorName: doc.name,
          baseSalary: s?.baseSalary || 0,
          bonuses: s?.bonuses || 0,
          deductions: s?.deductions || 0,
        };
      }),
    [doctors, salaries],
  );

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      baseSalary: item.baseSalary,
      bonuses: item.bonuses,
      deductions: item.deductions,
    });
  };

  const handleSave = async (id: string) => {
    const item = fullSalariesData.find((s) => s.id === id);
    if (!item) return;
    await updateSalary(id, {
      ...formData,
      doctorId: item.doctorId,
      month: "فبراير 2026",
    });
    setEditingId(null);
  };

  if (loading) return <SalariesSkeleton />;

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        <header>
          <h1 className="text-3xl font-black text-slate-900">إدارة الرواتب</h1>
          <p className="text-slate-500 mt-1 font-medium italic">
            عرض وإدارة مستحقات الأطباء
          </p>
        </header>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                {[
                  "الطبيب",
                  "الأساسي",
                  "المكافآت",
                  "الخصومات",
                  "الصافي",
                  "الإجراءات",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-5 text-slate-400 text-xs font-black"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {fullSalariesData.map((item) => (
                <SalaryRow
                  key={item.id}
                  item={item}
                  isEditing={editingId === item.id}
                  formData={formData}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  setFormData={setFormData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
