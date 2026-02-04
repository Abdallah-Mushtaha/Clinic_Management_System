import { DashboardLayout } from "../../components/layouts/Layout";
import { useAppointmentsManager } from "../../hooks/AdminHooks/useAppointmentsManager";
import AppointmentHeader from "../../components/Admin/AdminAppointments/AppointmentHeader";
import AppointmentFilters from "../../components/Admin/AdminAppointments/AppointmentFilters";
import AppointmentTable from "../../components/Admin/AdminAppointments/AppointmentTable";
import AppointmentStats from "../../components/Admin/AdminAppointments/AppointmentStats";
import AppointmentShimmer from "../../components/Admin/AdminAppointments/AppointmentShimmer";

export default function AdminAppointmentsPage() {
  const {
    appointments,
    filteredAppointments,
    isLoading,
    filter,
    setFilter,
    onDelete,
  } = useAppointmentsManager();

  return (
    <DashboardLayout>
      {isLoading ? (
        <AppointmentShimmer />
      ) : (
        <div className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4">
          <AppointmentHeader />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <AppointmentFilters
              currentFilter={filter}
              onFilterChange={setFilter}
            />
          </div>

          <AppointmentTable
            appointments={filteredAppointments}
            onDelete={onDelete}
          />

          <AppointmentStats appointments={appointments} />
        </div>
      )}
    </DashboardLayout>
  );
}
