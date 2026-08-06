import { Pencil, UserX, MoreHorizontal } from 'lucide-react';
import { StaffMember } from '@/types/staff';
import Badge from '@/components/ui/Badge';
import AccountStatusIndicator from './AccountStatusIndicator';
import { roleStyles } from '@/lib/badgeStyles';

interface StaffTableRowProps {
  staff: StaffMember;
  onEdit: (staff: StaffMember) => void;
  onDeactivate: (staff: StaffMember) => void;
}

function getInitials(name: string): string {
  const words = name.replace('Dr. ', '').split(' ');
  return words.slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export default function StaffTableRow({ staff, onEdit, onDeactivate }: StaffTableRowProps) {
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-4 pr-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
            {getInitials(staff.name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{staff.name}</p>
            <p className="text-xs text-gray-400">{staff.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 pr-4">
        <Badge className={roleStyles[staff.role]}>{staff.role}</Badge>
      </td>
      <td className="py-4 pr-4">
        <AccountStatusIndicator status={staff.status} />
      </td>
      <td className="py-4 pr-4 text-sm text-gray-500">{staff.joinDate}</td>
      <td className="py-4 pr-4 text-sm text-gray-500">{staff.lastActive}</td>
      <td className="py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(staff)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDeactivate(staff)}
            aria-label="Deactivate"
            className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
          >
            <UserX className="h-4 w-4" />
          </button>
          <button
            aria-label="More options"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}