import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRegister } from "../hooks/useRegister";

const InputField = memo(({ error, ...props }: any) => (
  <div className="w-full">
    <input
      {...props}
      className={`w-full px-4 py-3.5 bg-slate-50 border ${
        error ? "border-red-500" : "border-slate-200"
      } rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
    />
    {error && <p className="text-red-500 text-xs mt-1 mr-2">{error.message}</p>}
  </div>
));

InputField.displayName = "InputField";

export default function RegisterForm({ onBack }: { onBack: () => void }) {
  const { register, onSubmit, setValue, currentRole, isLoading, errors } =
    useRegister(onBack);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          إنشاء حساب
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          كن جزءاً من منظومتنا الصحية المتكاملة
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          {(["patient", "doctor"] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setValue("role", role)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                currentRole === role
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              {role === "patient" ? "مريض" : "طبيب"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <InputField
            {...register("name")}
            placeholder="الاسم الكامل"
            error={errors.name}
          />
          <InputField
            {...register("email")}
            type="email"
            placeholder="البريد الإلكتروني"
            error={errors.email}
          />
          <InputField
            {...register("password")}
            type="password"
            placeholder="كلمة المرور"
            error={errors.password}
          />

          <AnimatePresence mode="wait">
            {currentRole === "doctor" && (
              <motion.div
                key="specialty-input"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <InputField
                  {...register("specialty")}
                  placeholder="التخصص الطبي"
                  error={errors.specialty}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
            isLoading
              ? "bg-slate-400"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 active:scale-[0.98]"
          }`}
        >
          {isLoading ? "جاري المعالجة..." : "تأكيد الاشتراك"}
        </button>
      </form>

      <button
        onClick={onBack}
        className="w-full text-center text-sm font-bold text-blue-600 hover:underline"
      >
        العودة لتسجيل الدخول
      </button>
    </motion.div>
  );
}
