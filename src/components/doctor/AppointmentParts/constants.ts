export const STATUS_CONFIG: Record<string, { color: string; text: string; info: string }> = {
  confirmed: { color: "bg-green-100 text-green-700", text: "مؤكد", info: "الموعد مؤكد بانتظار الحضور" },
  pending: { color: "bg-orange-100 text-orange-700", text: "قيد الانتظار", info: "بانتظار تأكيد الطبيب أو السكرتارية" },
  completed: { color: "bg-blue-100 text-blue-700", text: "مكتمل", info: "تمت الجلسة بنجاح وتم تسجيل البيانات" },
  cancelled: { color: "bg-red-100 text-red-700", text: "ملغى", info: "تم الغاء الموعد من قبل المريض عبر الهاتف" },
};

export const FILTER_OPTIONS = [
  { id: "all", label: "جميع المواعيد" },
  { id: "today", label: "اليوم" },
  { id: "upcoming", label: "قادمة" },
  { id: "completed", label: "مكتملة" },
  { id: "cancelled", label: "ملغاة" },
];