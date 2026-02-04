import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layouts/Layout";
import { Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PatientRow } from "../../components/doctor/AppointmentParts/PatientRow";
import { useDoctorPatients } from "../../hooks/useDoctorPatients";

export default function DoctorPatientsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { filteredPatients, searchTerm, setSearchTerm } = useDoctorPatients(
    user?.id,
  );

  const handleWhatsApp = (phone: string, name: string) => {
    const msg = encodeURIComponent(
      `مرحباً أ/ ${name}، نود تذكيركم بموعدكم القادم في عيادة دكتور ${user?.name || ""}`,
    );
    window.open(
      `https://wa.me/${phone.replace(/\D/g, "")}?text=${msg}`,
      "_blank",
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-right" dir="rtl">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              سجل المرضى الموحد
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              إدارة ومتابعة الحالة الصحية لمرضاك
            </p>
          </div>
          <span className="hidden md:block text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            اخر تحديث: {new Date().toLocaleDateString("ar-EG")}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 relative">
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="البحث السريع عن مريض..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                العدد الإجمالي
              </p>
              <p className="text-xl font-black text-gray-900 leading-none">
                {filteredPatients.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-[24px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  {[
                    "المريض",
                    "التواصل",
                    "البيانات الحيوية",
                    "ملاحظات طبية",
                    "الإجراءات",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className={`px-6 py-4 text-sm font-bold text-gray-500 ${h === "الإجراءات" ? "text-center" : "text-right"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {filteredPatients.map((patient: any) => (
                  <PatientRow
                    key={patient.id}
                    patient={patient}
                    onWhatsApp={handleWhatsApp}
                    onNavigate={(id) =>
                      navigate(`/doctor/medical-records/${id}`)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="p-20 text-center">
              <Users size={40} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 font-medium">
                لم يتم العثور على أي نتائج للبحث
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
