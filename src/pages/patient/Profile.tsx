import { DashboardLayout } from "../../components/layouts/Layout";
import { useProfile } from "../../hooks/PatientHooks/useProfile";
import { ProfileHeader } from "../../components/Patient/ProfileComponents/ProfileHeader";
import { ProfileForm } from "../../components/Patient/ProfileComponents/ProfileForm";
import { SecuritySection } from "../../components/Patient/ProfileComponents/SecuritySection";

export default function ProfilePage() {
  const {
    patient,
    formData,
    isLoading,
    editMode,
    setEditMode,
    passwordMode,
    setPasswordMode,
    passwords,
    setPasswords,
    handleFormChange,
    handleUpdateProfile,
    handleUpdatePassword,
  } = useProfile();

  if (isLoading || !formData)
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-10" dir="rtl">
        <ProfileHeader
          name={patient?.name}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ProfileForm
              formData={formData}
              editMode={editMode}
              handleFormChange={handleFormChange}
              onSubmit={handleUpdateProfile}
            />
          </div>

          <div className="space-y-6">
            <SecuritySection
              passwordMode={passwordMode}
              setPasswordMode={setPasswordMode}
              passwords={passwords}
              setPasswords={setPasswords}
              onSubmit={handleUpdatePassword}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
