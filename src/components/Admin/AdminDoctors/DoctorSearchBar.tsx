import { Search } from "lucide-react";

export default function DoctorSearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative group">
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
      <input
        type="text"
        placeholder="ابحث باسم الطبيب أو التخصص..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-5 pr-12 bg-white border border-slate-100 rounded-3xl shadow-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-700 font-medium placeholder:text-slate-400"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
        >
          مسح
        </button>
      )}
    </div>
  );
}
