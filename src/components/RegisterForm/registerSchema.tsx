import { z } from "zod";

export const registerSchema = z
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

export type RegisterInput = z.infer<typeof registerSchema>;
