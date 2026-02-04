import { ShieldCheck } from "lucide-react";

export const SecuritySection = ({ security, setSecurity }: any) => (
  <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
      <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
        <ShieldCheck size={20} />
      </div>
      الأمان والخصوصية
    </h2>
    <div className="space-y-4">
      <ToggleGroup
        label="تفعيل المصادقة الثنائية (2FA)"
        active={security.twoFactorAuth}
        onToggle={() =>
          setSecurity((s: any) => ({ ...s, twoFactorAuth: !s.twoFactorAuth }))
        }
      />
      <ToggleGroup
        label="تشفير بيانات المرضى (Active)"
        active={security.dataEncryption}
        onToggle={() =>
          setSecurity((s: any) => ({ ...s, dataEncryption: !s.dataEncryption }))
        }
      />
      <div className="pt-4 border-t border-slate-50">
        <div className="p-4 bg-slate-50 rounded-2xl inline-block min-w-[200px]">
          <p className="text-xs text-slate-400 mb-1">وقت انتهاء الجلسة</p>
          <p className="font-bold text-slate-700">
            {security.sessionTimeout} دقيقة
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ToggleGroup = ({ label, active, onToggle }: any) => (
  <div
    onClick={onToggle}
    className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group"
  >
    <span className="font-bold text-slate-700">{label}</span>
    <div
      className={`w-12 h-6 rounded-full relative transition-all duration-300 ${active ? "bg-emerald-500" : "bg-slate-300"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? "right-1" : "right-7"}`}
      />
    </div>
  </div>
);
