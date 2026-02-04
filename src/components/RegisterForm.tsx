import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const registerSchema = z
  .object({
    role: z.enum(["patient", "doctor"]),
    name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    password: z.string().min(8, "كلمة المرور يجب أن لا تقل عن 8 أحرف"),
    specialty: z.string().optional(),
  })
  .refine((data) => data.role === "patient" || data.specialty, {
    path: ["specialty"],
    message: "التخصص مطلوب للطبيب",
  });

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterForm({ onBack }: { onBack: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "patient" },
  });

  const currentRole = watch("role");

  const mutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      if (data.role === "patient") {
        return axios.post("http://localhost:3001/patients", {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "patient",
          bloodType: "",
          allergies: [],
          chronicDiseases: [],
        });
      }

      return axios.post("http://localhost:3001/doctors", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "Doctor",
        specialty: data.specialty,
      });
    },
    onSuccess: () => {
      toast.success("تم إنشاء الحساب بنجاح! مرحباً بك");
      onBack();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء التسجيل");
    },
  });

  const onSubmit = (data: RegisterInput) => {
    mutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* العنوان */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          إنشاء حساب
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          كن جزءاً من منظومتنا الصحية المتكاملة
        </p>
      </div>

      {/* الفورم */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* اختيار الدور */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          {(["patient", "doctor"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setValue("role", r)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                currentRole === r
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {r === "patient" ? "مريض" : "طبيب"}
            </button>
          ))}
        </div>

        {/* الحقول */}
        <div className="space-y-3">
          <div>
            <input
              {...register("name")}
              placeholder="الاسم الكامل"
              className={`w-full px-4 py-3.5 bg-slate-50 border ${
                errors.name ? "border-red-500" : "border-slate-200"
              } rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 mr-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="البريد الإلكتروني"
              className={`w-full px-4 py-3.5 bg-slate-50 border ${
                errors.email ? "border-red-500" : "border-slate-200"
              } rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 mr-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="كلمة المرور"
              className={`w-full px-4 py-3.5 bg-slate-50 border ${
                errors.password ? "border-red-500" : "border-slate-200"
              } rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 mr-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* تخصص الطبيب */}
          {currentRole === "doctor" && (
            <div>
              <input
                {...register("specialty")}
                placeholder="التخصص الطبي"
                className={`w-full px-4 py-3.5 bg-slate-50 border ${
                  errors.specialty ? "border-red-500" : "border-slate-200"
                } rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              />
              {errors.specialty && (
                <p className="text-red-500 text-xs mt-1 mr-2">
                  {errors.specialty.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* زر الإرسال */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={mutation.isPending}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
            mutation.isPending
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600"
          }`}
        >
          {mutation.isPending ? "جاري المعالجة..." : "تأكيد الاشتراك"}
        </motion.button>
      </form>

      {/* رجوع */}
      <button
        onClick={onBack}
        className="w-full text-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer "
      >
        العودة لتسجيل الدخول
      </button>
    </motion.div>
  );
}
