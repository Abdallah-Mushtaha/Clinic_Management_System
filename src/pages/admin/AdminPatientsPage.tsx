import { DashboardLayout } from "../../components/layouts/Layout";
import { usePatientsManager } from "../../hooks/AdminHooks/usePatientsManager";
import PatientSearchBar from "../../components/Admin/AdminPatients/PatientSearchBar";
import PatientTable from "../../components/Admin/AdminPatients/PatientTable";
import PatientHeader from "../../components/Admin/AdminPatients/PatientHeader";
import PatientStats from "../../components/Admin/AdminPatients/PatientStats";
import { PatientSkeleton } from "../../components/Admin/AdminPatients/PatientSkeleton";

export default function AdminPatientsPage() {
  const {
    patients,
    filteredPatients,
    isLoading,
    searchTerm,
    setSearchTerm,
    deletePatient,
  } = usePatientsManager();

  if (isLoading) return <PatientSkeleton />;

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto space-y-10 pb-20 px-4">
        <PatientHeader />

        <div className="space-y-6">
          <PatientSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <PatientTable patients={filteredPatients} onDelete={deletePatient} />
        </div>

        <PatientStats
          total={patients.length}
          filtered={filteredPatients.length}
        />
      </div>
    </DashboardLayout>
  );
}
