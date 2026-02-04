import { Settings } from "lucide-react";

export const SystemInfoSection = ({ systemInfo, editMode }: any) => (
  <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
        <Settings size={20} />
      </div>
      معلومات النظام
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputGroup
        label="اسم المنشأة"
        value={systemInfo.clinicName}
        edit={editMode}
      />
      <InputGroup
        label="بريد الإدارة"
        value={systemInfo.adminEmail}
        edit={editMode}
      />
    </div>
  </section>
);

const InputGroup = ({ label, value, edit }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-500 mr-2">{label}</label>
    <div
      className={`w-full p-4 rounded-2xl font-bold transition-all border ${
        edit
          ? "bg-white border-blue-200 shadow-sm"
          : "bg-slate-50 border-transparent text-slate-700"
      }`}
    >
      {edit ? (
        <input
          className="bg-transparent w-full outline-none"
          defaultValue={value}
        />
      ) : (
        value
      )}
    </div>
  </div>
);
