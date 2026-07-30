'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { StaffRole, AccountStatus } from '@/types/staff';

interface StaffFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: StaffRole | 'All Roles';
  onRoleFilterChange: (value: StaffRole | 'All Roles') => void;
  statusFilter: AccountStatus | 'All Statuses';
  onStatusFilterChange: (value: AccountStatus | 'All Statuses') => void;
}

const roles: (StaffRole | 'All Roles')[] = [
  'All Roles',
  'Doctor',
  'Nurse',
  'Receptionist',
  'Admin',
];
const statuses: (AccountStatus | 'All Statuses')[] = [
  'All Statuses',
  'Active',
  'On Leave',
  'Inactive',
];

export default function StaffFilterBar({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
}: StaffFilterBarProps) {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <select
        value={roleFilter}
        onChange={(e) => onRoleFilterChange(e.target.value as StaffRole | 'All Roles')}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusFilterChange(e.target.value as AccountStatus | 'All Statuses')
        }
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button
        aria-label="More filters"
        className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}