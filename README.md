# Clinic Management System

A modern **Clinic Management System** built with **React + Vite** using a **mock backend** powered by **json-server**.  
The system supports **multiple user roles** (Patient, Doctor, Admin) with **role-based access control**, a **shared login interface**, and a **fully Arabic (RTL) user interface**.

This project is designed with **clean architecture**, **scalable structure**, and **readable code**, suitable for a **mid-level React developer** and easily extendable to a real backend in the future.

---

## Key Features

### Authentication & Authorization

- Single shared login page for all roles (Patient / Doctor / Admin)
- Registration allowed only for **Patients and Doctors**
- **One predefined Admin account** (no registration)
- Role-based route protection
- Secure logout and session handling

---

### Patient Features

- Register, login, and logout
- View and edit personal profile
- Manage medical history:
    - Blood type
    - Allergies
    - Chronic diseases
    - Previous surgeries
- Book appointments with doctors
- Select available dates and time slots
- View appointments:
    - Upcoming
    - Past
    - Cancelled
- Cancel or reschedule appointments
- View appointment details:
    - Doctor name
    - Specialty
    - Date & time
    - Status
    - Consultation fee
- View prescriptions and medical reports
- Download reports and prescriptions as PDF
- Receive notifications:
    - Appointment confirmation
    - Reminders
    - Cancellations
- Rate and review doctors
- View payment history and payment status
- Security options:
    - Change password
    - Logout from all devices
    - View login history

---

### Doctor Features

- Register, login, and logout
- View and edit profile:
    - Specialty
    - Experience
    - Working days and hours
- Manage schedule:
    - Available time slots
    - Block unavailable dates
- View appointments:
    - Today’s appointments
    - Upcoming appointments
    - Cancelled appointments
- Access patient medical profiles
- Add medical data:
    - Diagnosis
    - Prescriptions
    - Medical notes
    - Lab tests and imaging requests
- Receive notifications for new and cancelled appointments
- View performance reports:
    - Number of patients
    - Monthly appointments
    - Statistics and charts
- View salary, bonuses, and deductions (read-only, managed by Admin)

---

### Admin Features

- Login and logout
- Manage doctors:
    - Add, edit, remove doctors
    - Assign specialties
    - Activate / deactivate accounts
- View and manage patients
- Manage clinic data:
    - Departments
    - Services
    - Consultation fees
- View and manage all appointments
- Manage doctors’ salaries, bonuses, and incentives
- Manage doctor leaves and vacations
- View analytics and reports:
    - Clinic revenue
    - Appointment statistics
    - Doctor performance metrics

---

## Language & UI

- Full **Arabic language support**
- **RTL layout**
- Modern, clean, and responsive UI
- Mobile-first design for patients
- Web dashboard optimized for doctors and admin
- Dashboard charts and statistics

---

## Mock Backend

- Implemented using **json-server**
- Single database file: `src/Model/db.json`
- All data operations handled via **React Query**
- No real backend or authentication service

---

## Tech Stack & Libraries

### Frontend

- **React 19**
- **Vite**
- **TypeScript**
- **React Router DOM**
- **React Query (@tanstack/react-query)**
- **Axios**

### Forms & Validation

- **React Hook Form**
- **Formik**
- **@hookform/resolvers**

### UI & Styling

- **Tailwind CSS**
- **PostCSS**
- **Autoprefixer**
- **Lucide React (Icons)**
- **Framer Motion (Animations)**
- **React Hot Toast (Notifications)**

### Charts & Reports

- **Recharts**

### PDF & Export

- **jsPDF**
- **html2canvas**

### Backend (Mock)

- **json-server**
- **JOSE (JWT handling for mock auth)**

### Development Tools

- **ESLint**
- **TypeScript ESLint**
- **Vite React Plugin**

---

## Project Structure

```txt
clinicSystem/
└─ Clinic_Management_System/
   ├─ public/
   │  └─ img/
   │     └─ pharmacy.png
   │
   ├─ src/
   │  ├─ api/
   │  │  └─ axiosInstance.ts
   │  │
   │  ├─ components/
   │  │  ├─ Admin/
   │  │  │  ├─ AdminAppointments/
   │  │  │  │  ├─ admin.ts
   │  │  │  │  ├─ AppointmentDetailsModal.tsx
   │  │  │  │  ├─ AppointmentFilters.tsx
   │  │  │  │  ├─ AppointmentHeader.tsx
   │  │  │  │  ├─ AppointmentShimmer.tsx
   │  │  │  │  ├─ AppointmentStats.tsx
   │  │  │  │  ├─ AppointmentTable.tsx
   │  │  │  │  └─ DeleteConfirmationModal.tsx
   │  │  │  ├─ AdminDepartments/
   │  │  │  │  ├─ DepartmentCard.tsx
   │  │  │  │  ├─ DepartmentForm.tsx
   │  │  │  │  └─ DepartmentSkeleton.tsx
   │  │  │  ├─ AdminDoctors/
   │  │  │  │  ├─ DoctorForm.tsx
   │  │  │  │  ├─ DoctorHeader.tsx
   │  │  │  │  ├─ DoctorSearchBar.tsx
   │  │  │  │  ├─ DoctorSkeleton.tsx
   │  │  │  │  └─ DoctorTable.tsx
   │  │  │  ├─ AdminPatients/
   │  │  │  │  ├─ PatientHeader.tsx
   │  │  │  │  ├─ PatientSearchBar.tsx
   │  │  │  │  ├─ PatientSkeleton.tsx
   │  │  │  │  ├─ PatientStats.tsx
   │  │  │  │  └─ PatientTable.tsx
   │  │  │  ├─ AdminReports/
   │  │  │  │  └─ ReportsSkeleton.tsx
   │  │  │  ├─ AdminSalaries/
   │  │  │  │  ├─ SalariesSkeleton.tsx
   │  │  │  │  └─ SalaryRow.tsx
   │  │  │  ├─ Dashbord/
   │  │  │  │  ├─ admin.ts
   │  │  │  │  ├─ AppointmentsDistribution.tsx
   │  │  │  │  ├─ RecentActivityTable.tsx
   │  │  │  │  ├─ StatCard.tsx
   │  │  │  │  ├─ StateUIs.tsx
   │  │  │  │  └─ SystemStatus.tsx
   │  │  │  └─ Settings/
   │  │  │     ├─ DatabaseCard.tsx
   │  │  │     ├─ SecuritySection.tsx
   │  │  │     ├─ SettingsSkeleton.tsx
   │  │  │     └─ SystemInfoSection.tsx
   │  │  │
   │  │  ├─ doctor/
   │  │  │  ├─ AppointmentParts/
   │  │  │  ├─ BuildRecordForm/
   │  │  │  ├─ Dashbord/
   │  │  │  ├─ DoctorProfile/
   │  │  │  ├─ PatientHistory/
   │  │  │  ├─ Salary/
   │  │  │  ├─ ScheduleParts/
   │  │  │  ├─ doctorCustemCard.tsx
   │  │  │  ├─ DoctorSalaryCard.tsx
   │  │  │  ├─ RecordCard.tsx
   │  │  │  ├─ RecordForm.tsx
   │  │  │  ├─ SalaryDetailList.tsx
   │  │  │  ├─ SatisfactionCard.tsx
   │  │  │  ├─ ScheduleHeader.tsx
   │  │  │  ├─ types.ts
   │  │  │  ├─ VacationManager.tsx
   │  │  │  ├─ WorkDays.tsx
   │  │  │  └─ WorkHours.tsx
   │  │  │
   │  │  ├─ layouts/
   │  │  │  ├─ Layout.tsx
   │  │  │  └─ Sidebar.tsx
   │  │  │
   │  │  ├─ Patient/
   │  │  │  ├─ Appointments/
   │  │  │  ├─ dashbord/
   │  │  │  ├─ MedicalSection/
   │  │  │  ├─ myAppointmentCard/
   │  │  │  ├─ Notifications/
   │  │  │  ├─ patientPrescriptions/
   │  │  │  ├─ Payments/
   │  │  │  └─ ProfileComponents/
   │  │  │
   │  │  ├─ RegisterForm/
   │  │  ├─ ActionGrid.tsx
   │  │  ├─ RegisterForm.tsx
   │  │  └─ StatCard.tsx
   │  │
   │  ├─ hooks/
   │  │  ├─ AdminHooks/
   │  │  ├─ PatientHooks/
   │  │  ├─ useAuth.tsx
   │  │  ├─ useAnalytics.tsx
   │  │  └─ useScheduleManager.tsx
   │  │
   │  ├─ Model/
   │  │  └─ db.json
   │  │
   │  ├─ pages/
   │  │  ├─ admin/
   │  │  ├─ doctor/
   │  │  ├─ patient/
   │  │  ├─ AuthPage.tsx
   │  │  ├─ Login.tsx
   │  │  └─ NotFound.tsx
   │  │
   │  ├─ utils/
   │  │  └─ exportUtils.tsx
   │  │
   │  ├─ App.tsx
   │  ├─ index.css
   │  └─ main.tsx
   │
   ├─ .editorconfig
   ├─ .env.local
   ├─ .gitignore
   ├─ eslint.config.js
   ├─ index.html
   ├─ package.json
   ├─ postcss.config.js
   ├─ tailwind.config.js
   ├─ tsconfig.json
   └─ vite.config.ts
```

## Project Scripts

```bash
# Run frontend
npm run dev

# Run mock backend
npm run backend

# Build project
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```
