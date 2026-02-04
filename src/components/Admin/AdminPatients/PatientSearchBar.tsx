import { Search } from "lucide-react";

export default function PatientSearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative group">
      <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
      <input
        type="text"
        placeholder="ابحث باسم المريض، البريد الإلكتروني أو رقم الهاتف..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-5 pr-14 bg-white border border-slate-100 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all text-lg font-medium text-slate-700 placeholder:text-slate-400"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
        >
          إلغاء
        </button>
      )}
    </div>
  );
}
