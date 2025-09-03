import Link from "next/link";

type DashboardCardProps = {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ href, title, description, icon }) => {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-white hover:bg-gray-50"
    >
      <div className="text-gray-700">{icon}</div>
      <div>
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
}

export default DashboardCard;