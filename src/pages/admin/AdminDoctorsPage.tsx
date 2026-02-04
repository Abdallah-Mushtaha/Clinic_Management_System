import { DashboardLayout } from "../../components/layouts/Layout";
import { useDoctorsManager } from "../../hooks/AdminHooks/useDoctorsManager";
import DoctorHeader from "../../components/Admin/AdminDoctors/DoctorHeader";
import DoctorForm from "../../components/Admin/AdminDoctors/DoctorForm";
import DoctorSearchBar from "../../components/Admin/AdminDoctors/DoctorSearchBar";
import DoctorTable from "../../components/Admin/AdminDoctors/DoctorTable";
import { DoctorSkeleton } from "../../components/Admin/AdminDoctors/DoctorSkeleton";

export default function AdminDoctorsPage() {
  const {
    doctors,
    isLoading,
    isPending,
    showForm,
    setShowForm,
    editingId,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    handleSubmit,
    handleEdit,
    deleteDoctor,
    resetForm,
  } = useDoctorsManager();

  if (isLoading) return <DoctorSkeleton />;

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
        <DoctorHeader onAddClick={() => setShowForm(true)} />

        {showForm && (
          <DoctorForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isPending={isPending}
            editingId={editingId}
          />
        )}

        <DoctorSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <DoctorTable
          doctors={doctors}
          onEdit={handleEdit}
          onDelete={deleteDoctor}
          isPending={isPending}
        />
      </div>
    </DashboardLayout>
  );
}
