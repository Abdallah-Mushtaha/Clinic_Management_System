import { useState, lazy, Suspense } from "react";

const LoginForm = lazy(() => import("../pages/Login"));
const RegisterForm = lazy(() => import("../components/RegisterForm"));

const CURRENT_YEAR = new Date().getFullYear();

const HospitalIcon = () => (
  <svg
    className="w-10 h-10 text-cyan-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans" dir="rtl">
      <div className="relative hidden md:flex md:w-1/2 lg:w-7/12 items-center justify-center bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053"
          alt="Modern Clinic"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-slate-900/60 to-transparent" />

        <div className="relative z-10 p-16 text-white max-w-2xl">
          <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rotate-3">
            <HospitalIcon />
          </div>

          <h1 className="text-6xl font-black mb-6 leading-[1.2] tracking-tight">
            عيادتي <span className="text-cyan-400">الذكية</span> <br />
            إدارة بلا حدود.
          </h1>

          <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light">
            النظام المتكامل لإدارة المواعيد، المرضى، والتقارير الطبية بأحدث
            تقنيات الذكاء الاصطناعي.
          </p>

          <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm inline-flex">
            <div className="flex -space-x-4 space-x-reverse">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?u=doc${i}`}
                  alt="Doctor"
                  className="w-14 h-14 rounded-full border-4 border-slate-900 object-cover"
                  loading="lazy"
                />
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-slate-900 bg-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                +1K
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                موثوق من قبل الأطباء
              </p>
              <p className="text-xs text-gray-400">أكثر من 1000 عيادة مسجلة</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 bg-[linear-gradient(135deg,_#020024_0%,_#090979_45%,_#00d4ff_100%)]">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-10">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              عيادتي الذكية
            </h2>
          </div>

          <div className="relative group overflow-hidden bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 transition-all">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-600" />

            <div className="p-8 md:p-12">
              <div className="mb-10 text-center">
                <h3 className="text-3xl font-bold text-slate-800">
                  {isLogin ? "مرحباً بك" : "ابدأ الآن"}
                </h3>
                <div className="w-12 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
              </div>

              <Suspense
                fallback={
                  <div className="h-40 animate-pulse bg-slate-100 rounded-xl" />
                }
              >
                {isLogin ? (
                  <LoginForm onSwitch={() => setIsLogin(false)} />
                ) : (
                  <RegisterForm onBack={() => setIsLogin(true)} />
                )}
              </Suspense>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/50 text-sm font-light">
              &copy; {CURRENT_YEAR} عيادتي الذكية - جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
