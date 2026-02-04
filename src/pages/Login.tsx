import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginInput) => {
    setLoading(true);
    try {
      const user = await login(data.email, data.password);
      toast.success(`أهلاً بك ${user.name}`);

      if (user.role === "admin") navigate("/admin-dashboard");
      else if (user.role === "doctor") navigate("/doctor-dashboard");
      else navigate("/patient-dashboard");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">تسجيل الدخول</h2>
        <p className="text-slate-500 text-sm mt-1">
          الرجاء إدخال بياناتك للوصول للوحة التحكم
        </p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div>
          <input
            {...register("email")}
            placeholder="البريد الإلكتروني"
            className="w-full px-4 py-3 bg-slate-50 border rounded-xl"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="كلمة المرور"
            className="w-full px-4 py-3 bg-slate-50 border rounded-xl"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-slate-900 cursor-pointer  text-white py-3 rounded-xl"
        >
          {loading ? "جاري التحقق..." : "دخول"}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={onSwitch}
          className="text-sm cursor-pointer  font-medium text-blue-600"
        >
          لا تملك حساباً؟ أنشئ حسابك الآن
        </button>
      </div>
    </div>
  );
}
