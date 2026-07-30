import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subLabel: string;
  trend?: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  subLabel,
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-green-600">{trend}</span>
        )}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{subLabel}</p>
    </div>
  );
}