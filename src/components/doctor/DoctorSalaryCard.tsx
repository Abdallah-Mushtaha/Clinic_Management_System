import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DoctorSalary {
  baseSalary: number;
  bonuses: number;
  deductions: number;
}

export function DoctorSalaryCard({
  baseSalary,
  bonuses,
  deductions,
}: DoctorSalary) {
  const total = baseSalary + bonuses - deductions;
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden text-right"
      dir="rtl"
    >
      <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Wallet className="text-blue-600" size={24} />
            المستحقات المالية
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            تفاصيل الراتب والحوافز للشهر الحالي
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/doctor/salary");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 cursor-pointer cursor-pointer "
        >
          كشف حساب
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative group p-6 rounded-[20px] bg-white border border-gray-100 hover:border-blue-200 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600">
                <CircleDollarSign size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  الأساسي
                </p>
                <p className="text-xl font-black text-gray-900">
                  {baseSalary.toLocaleString()}{" "}
                  <span className="text-xs font-medium">ج.م</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative group p-6 rounded-[20px] bg-emerald-50/50 border border-emerald-100 hover:border-emerald-200 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  المكافآت
                </p>
                <p className="text-xl font-black text-emerald-700">
                  +{bonuses.toLocaleString()}{" "}
                  <span className="text-xs font-medium">ج.م</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative group p-6 rounded-[20px] bg-rose-50/50 border border-rose-100 hover:border-rose-200 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-rose-600 shadow-sm">
                <TrendingDown size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  الخصومات
                </p>
                <p className="text-xl font-black text-rose-700">
                  -{deductions.toLocaleString()}{" "}
                  <span className="text-xs font-medium">ج.م</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-[20px] bg-blue-600 shadow-xl shadow-blue-100 border border-blue-600 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-white transform translate-x-2 -translate-y-2">
              <Wallet size={80} />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-blue-100 uppercase tracking-wider">
                صافي الربح
              </p>
              <p className="text-2xl font-black text-white">
                {total.toLocaleString()}{" "}
                <span className="text-sm font-medium text-blue-100">ج.م</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-400 font-bold flex justify-between items-center">
        <span>تاريخ التحديث: {new Date().toLocaleDateString("ar-SA")}</span>
        <span className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          بيانات موثقة
        </span>
      </div>
    </div>
  );
}
