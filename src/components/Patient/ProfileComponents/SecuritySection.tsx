import { Lock } from "lucide-react";
import { PassInput } from "./ProfileComponents";

export const SecuritySection = ({
  passwordMode,
  setPasswordMode,
  passwords,
  setPasswords,
  onSubmit,
}: any) => (
  <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
        <Lock size={20} className="text-rose-500" /> الحماية
      </h2>
      <button
        onClick={() => setPasswordMode(!passwordMode)}
        className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase"
      >
        {passwordMode ? "إلغاء" : "تغيير"}
      </button>
    </div>

    {passwordMode ? (
      <form onSubmit={onSubmit} className="space-y-4">
        <PassInput
          label="كلمة السر الحالية"
          value={passwords.current}
          onChange={(e: any) =>
            setPasswords({ ...passwords, current: e.target.value })
          }
        />
        <PassInput
          label="الجديدة"
          value={passwords.new}
          onChange={(e: any) =>
            setPasswords({ ...passwords, new: e.target.value })
          }
        />
        <PassInput
          label="تأكيد الجديدة"
          value={passwords.confirm}
          onChange={(e: any) =>
            setPasswords({ ...passwords, confirm: e.target.value })
          }
        />
        <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors">
          تحديث
        </button>
      </form>
    ) : (
      <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
          لحماية بياناتك، تأكد من اختيار كلمة سر قوية وعدم مشاركتها مع الآخرين.
        </p>
      </div>
    )}
  </div>
);
