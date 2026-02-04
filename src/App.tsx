import { Route, Routes } from "react-router";
import { AuthProvider } from "./hooks/useAuth.tsx";
import PatientDashboard from "./pages/patient/Dashboard.tsx";
import DoctorDashboard from "./pages/doctor/Dashboard.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import { Toaster } from "react-hot-toast";
import AppointmentsPage from "./pages/patient/Appointments.tsx";
import MyAppointmentsPage from "./pages/patient/MyAppointments.tsx";
import EditAppointmentPage from "./pages/patient/EditAppointmentPage.tsx";
import MedicalHistoryPage from "./pages/patient/MedicalHistory.tsx";
import PrescriptionsPage from "./pages/patient/Prescriptions.tsx";
import PaymentsPage from "./pages/patient/Payments.tsx";
import NotificationsPage from "./pages/patient/Notifications.tsx";
import ProfilePage from "./pages/patient/Profile.tsx";
import DoctorAppointmentsPage from "./pages/doctor/Appointments.tsx";
import DoctorPatientsPage from "./pages/doctor/DoctorPatientsPage.tsx";
import MedicalRecordsPage from "./pages/doctor/MedicalRecordsPage.tsx";
import SchedulePage from "./pages/doctor/SchedulePage.tsx";
import PatientHistoryPage from "./pages/doctor/PatientHistoryPage.tsx";
import ReportsPage from "./pages/doctor/ReportsDoctor.tsx";
import SalaryPage from "./pages/doctor/SalaryPage.tsx";
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage.tsx";
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import AdminDoctorsPage from "./pages/admin/AdminDoctorsPage.tsx";
import AdminPatientsPage from "./pages/admin/AdminPatientsPage.tsx";
import AdminAppointmentsPage from "./pages/admin/AdminAppointmentsPage.tsx";
import AdminSalariesPage from "./pages/admin/AdminSalariesPage.tsx";
import AdminReportsPage from "./pages/admin/AdminReportsPage.tsx";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage.tsx";
import AdminDepartmentsPage from "./pages/admin/AdminDepartmentsPage.tsx";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Toaster position="top-center" reverseOrder={false} />
              <AuthPage />
            </>
          }
        />

        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        {/* PATIENTS */}
        <Route path="/patient/appointments" element={<AppointmentsPage />} />

        <Route
          path="/patient/medical-history"
          element={<MedicalHistoryPage />}
        />
        <Route
          path="/patient/my-appointments"
          element={<MyAppointmentsPage />}
        />
        <Route
          path="/patient/edit-appointment/:id"
          element={<EditAppointmentPage />}
        />
        <Route path="/patient/prescriptions" element={<PrescriptionsPage />} />

        <Route path="/patient/payments" element={<PaymentsPage />} />
        <Route path="/patient/notifications" element={<NotificationsPage />} />
        <Route path="/patient/profile" element={<ProfilePage />} />

        {/* *********************** */}
        {/* DOCTORS */}

        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route
          path="/doctor/appointments"
          element={<DoctorAppointmentsPage />}
        />
        <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
        <Route
          path="/doctor/medical-records"
          element={<MedicalRecordsPage />}
        />
        <Route path="/doctor/schedule" element={<SchedulePage />} />

        <Route
          path="/doctor/medical-records/:patientId"
          element={<PatientHistoryPage />}
        />

        <Route path="/doctor/reports" element={<ReportsPage />} />
        <Route path="/doctor/salary" element={<SalaryPage />} />
        <Route path="/doctor/profile" element={<DoctorProfilePage />} />

        {/* ADMIN */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
        <Route path="/admin/patients" element={<AdminPatientsPage />} />
        <Route path="/admin/appointments" element={<AdminAppointmentsPage />} />
        <Route path="/admin/salaries" element={<AdminSalariesPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
        <Route path="/admin/departments" element={<AdminDepartmentsPage />} />
      </Routes>
    </AuthProvider>
  );
}
