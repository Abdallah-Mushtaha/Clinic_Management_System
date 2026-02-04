import { useAuth } from "../../hooks/useAuth";
import { useScheduleManager } from "../../hooks/useScheduleManager";
import { DashboardLayout } from "../../components/layouts/Layout";
import { WorkDays } from "../../components/doctor/WorkDays";
import { WorkHours } from "../../components/doctor/WorkHours";
import { VacationManager } from "../../components/doctor/VacationManager";
import { ScheduleHeader } from "../../components/doctor/ScheduleHeader";
import { Loader2, Save } from "lucide-react";
import { ScheduleSkeleton } from "../../components/doctor/ScheduleParts/ScheduleSkeleton";

export default function SchedulePage() {
  const { user } = useAuth();
  const {
    formData,
    setFormData,
    editMode,
    setEditMode,
    isLoading,
    updateMutation,
  } = useScheduleManager(user?.id);

  if (isLoading) return <ScheduleSkeleton />;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-24 text-right" dir="rtl">
        <ScheduleHeader editMode={editMode} setEditMode={setEditMode} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <WorkDays
              selectedDays={formData.workingDays}
              isEdit={editMode}
              onToggle={(day) => {
                setFormData((prev: any) => ({
                  ...prev,
                  workingDays: prev.workingDays.includes(day)
                    ? prev.workingDays.filter((d: any) => d !== day)
                    : [...prev.workingDays, day],
                }));
              }}
            />
            <WorkHours
              data={formData}
              setData={setFormData}
              isEdit={editMode}
            />
          </div>

          <div className="lg:col-span-4">
            <VacationManager
              blockedDates={formData.blockedDates}
              setData={setFormData}
              isEdit={editMode}
            />
          </div>
        </div>

        {editMode && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => updateMutation.mutate(formData)}
              disabled={updateMutation.isPending}
              className="group relative w-full bg-slate-900 text-white py-4 rounded-[20px] font-black text-sm shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {updateMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
              ) : (
                <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              <span className="relative">
                {updateMutation.isPending
                  ? "جاري الحفظ..."
                  : "حفظ وإعتماد الجدول"}
              </span>
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
