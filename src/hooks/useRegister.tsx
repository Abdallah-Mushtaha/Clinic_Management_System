import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SignJWT } from "jose";
import toast from "react-hot-toast";
import { z } from "zod";
import { useMemo, useCallback } from "react";
import api from "../api/axiosInstance";

const registerSchema = z
  .object({
    role: z.enum(["patient", "doctor"]),
    name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    password: z.string().min(8, "كلمة المرور يجب أن لا تقل عن 8 أحرف"),
    specialty: z.string().optional(),
  })
  .refine((data) => data.role === "patient" || !!data.specialty, {
    path: ["specialty"],
    message: "التخصص مطلوب للطبيب",
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const useRegister = (onSuccessCallback: () => void) => {
  const resolver = useMemo(() => zodResolver(registerSchema), []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver,
    defaultValues: { role: "patient" },
    mode: "onTouched",
  });

  const currentRole = watch("role");

  const mutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const [patientsRes, doctorsRes] = await Promise.all([
        api.get(`/patients?email=${data.email}`),
        api.get(`/doctors?email=${data.email}`),
      ]);

      if (patientsRes.data.length > 0 || doctorsRes.data.length > 0) {
        throw new Error("البريد الإلكتروني مسجل بالفعل");
      }

      const secret = new TextEncoder().encode("your-secret-key");
      const encryptedPassword = await new SignJWT({ password: data.password })
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      const isPatient = data.role === "patient";
      const payload = {
        name: data.name,
        email: data.email,
        password: encryptedPassword,
        role: isPatient ? "patient" : "Doctor",
        ...(isPatient
          ? { bloodType: "", allergies: [], chronicDiseases: [] }
          : { specialty: data.specialty }),
      };

      return api.post(`${isPatient ? "patients" : "doctors"}`, payload);
    },
    onSuccess: () => {
      toast.success("تم إنشاء الحساب بنجاح!");
      onSuccessCallback();
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء التسجيل");
    },
  });

  const onSubmit = useCallback(
    (data: RegisterInput) => mutation.mutate(data),
    [mutation],
  );

  return {
    register,
    errors,
    currentRole,
    setValue,
    isLoading: mutation.isPending,
    onSubmit: handleSubmit(onSubmit),
  };
};
