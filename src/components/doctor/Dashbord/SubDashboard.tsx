export const DashboardHeader = ({
  name,
  specialty,
}: {
  name?: string;
  specialty?: string;
}) => (
  <div className="flex flex-col gap-2">
    <h1 className="text-3xl font-bold text-gray-900">مرحباً بك د. {name}</h1>
    <p className="text-gray-600">{specialty}</p>
  </div>
);
