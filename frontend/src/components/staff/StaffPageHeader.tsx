import { UserPlus } from 'lucide-react';

interface StaffPageHeaderProps {
  onAddClick: () => void;
}

export default function StaffPageHeader({ onAddClick }: StaffPageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Oversee your medical team, manage roles, and track account activity.
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
      >
        <UserPlus className="h-4 w-4" />
        Add Staff Member
      </button>
    </div>
  );
}