import { Link } from "react-router-dom";

interface ActionItem {
  to: string;
  label: string;
  icon: any;
  color: string;
}

export function ActionGrid({ items }: { items: ActionItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(({ to, label, icon: Icon, color }) => (
        <Link key={to} to={to}>
          <button
            className={`w-full ${color} text-white py-6 rounded-lg font-semibold transition flex cursor-pointer gap-2 justify-center items-center`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        </Link>
      ))}
    </div>
  );
}
