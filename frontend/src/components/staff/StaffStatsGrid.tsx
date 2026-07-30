import { Users, ShieldCheck, UsersRound, Settings } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

const stats = [
  {
    icon: Users,
    label: 'Total Staff',
    value: 24,
    subLabel: '4 new since last month',
    trend: '+12%',
  },
  {
    icon: ShieldCheck,
    label: 'Active Doctors',
    value: 8,
    subLabel: 'Full clinical capacity',
  },
  {
    icon: UsersRound,
    label: 'Support Team',
    value: 12,
    subLabel: 'Receptionists & Nurses',
  },
  {
    icon: Settings,
    label: 'System Admins',
    value: 4,
    subLabel: 'Full access privileges',
  },
];

export default function StaffStatsGrid() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}