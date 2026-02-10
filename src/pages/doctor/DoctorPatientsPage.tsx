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
          <div className="hidden md:block overflow-x-auto">
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

          <div className="md:hidden divide-y divide-gray-100" dir="rtl">
            {filteredPatients.map((patient: any) => (
              <div key={patient.id} className="p-5 bg-white space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {patient.name[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">
                        {patient.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        ID: #{patient.id.toString().slice(-5)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 py-4 border-y border-slate-50">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase">
                      التواصل
                    </span>
                    <button
                      onClick={() => handleWhatsApp(patient.phone)}
                      className="text-xs font-bold text-emerald-600 flex items-center gap-1"
                    >
                      {patient.phone}
                    </button>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase">
                      البيانات الحيوية
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {patient.vitals || "لا يوجد"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase">
                      ملاحظات طبية
                    </span>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {patient.notes || "لا توجد ملاحظات مسجلة"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate(`/doctor/medical-records/${patient.id}`)
                    }
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-100 active:scale-95 transition-all"
                  >
                    السجل الطبي
                  </button>
                  <button
                    onClick={() => handleWhatsApp(patient.phone)}
                    className="px-4 py-3 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black border border-emerald-100 active:scale-95 transition-all"
                  >
                    واتساب
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="p-10 md:p-20 text-center">
              <Users size={40} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 font-medium text-sm md:text-base">
                لم يتم العثور على أي نتائج للبحث
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
