import { useState } from "react";
import { DashboardLayout } from "../../components/layouts/Layout";
import { Plus, LayoutGrid } from "lucide-react";
import { useAdminData } from "../../hooks/AdminHooks/useAdminData";
import { useDepartments } from "../../hooks/AdminHooks/useDepartments";
import { DepartmentCard } from "../../components/Admin/AdminDepartments/DepartmentCard";
import { DepartmentForm } from "../../components/Admin/AdminDepartments/DepartmentForm";
import toast, { Toaster } from "react-hot-toast";
import { DepartmentSkeleton } from "../../components/Admin/AdminDepartments/DepartmentSkeleton";

export default function AdminDepartmentsPage() {
  const { doctors, isLoading: loadingDocs } = useAdminData();
  const { departments, isLoading, saveDepartment, deleteDepartment } =
    useDepartments();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    doctorIds: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveDepartment({ id: editingId, data: formData });
    resetForm();
  };

  const handleDeleteRequest = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3" dir="rtl">
        <p className="font-bold">تأكيد الحذف؟</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-xs font-bold text-slate-400"
          >
            تراجع
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              deleteDepartment(id);
            }}
            className="bg-red-500 text-white px-4 py-1 rounded-lg text-xs font-bold"
          >
            حذف
          </button>
        </div>
      </div>
    ));
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", doctorIds: [] });
    setShowForm(false);
    setEditingId(null);
  };

  if (isLoading || loadingDocs)
    return (
      <DashboardLayout>
        <DepartmentSkeleton />
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      <div className="max-w-[1240px] mx-auto space-y-10 p-6" dir="rtl">
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 gap-6">
          <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 text-white rounded-xl md:rounded-[1.5rem] flex items-center justify-center shrink-0">
              <LayoutGrid size={24} className="md:w-8 md:h-8" />
            </div>
            <h1 className="text-xl md:text-3xl font-black text-slate-900 truncate">
              إدارة الأقسام
            </h1>
          </div>

          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
            }}
            className="w-full md:w-auto bg-blue-600 text-white rounded-xl md:rounded-2xl h-12 md:h-16 px-6 md:px-10 font-black shadow-xl flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
          >
            <Plus size={20} className="ml-2" />
            <span className="text-sm md:text-base">إضافة قسم</span>
          </button>
        </header>

        {showForm && (
          <DepartmentForm
            editingId={editingId}
            formData={formData}
            setFormData={setFormData}
            doctors={doctors}
            onClose={resetForm}
            onSubmit={handleSubmit}
            toggleDoctor={(id: string) =>
              setFormData((p) => ({
                ...p,
                doctorIds: p.doctorIds.includes(id)
                  ? p.doctorIds.filter((i) => i !== id)
                  : [...p.doctorIds, id],
              }))
            }
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {departments.map((dept: any) => (
            <DepartmentCard
              key={dept.id}
              dept={dept}
              allDoctors={doctors}
              onEdit={() => {
                setEditingId(dept.id);
                setFormData({
                  name: dept.name,
                  description: dept.description,
                  doctorIds: dept.doctorIds || [],
                });
                setShowForm(true);
              }}
              onDelete={() => handleDeleteRequest(dept.id)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
