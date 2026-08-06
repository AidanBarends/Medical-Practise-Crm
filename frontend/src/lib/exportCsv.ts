import { StaffMember } from '@/types/staff';

export function exportStaffToCsv(staff: StaffMember[]) {
  const headers = ['Name', 'Email', 'Role', 'Status', 'Join Date', 'Last Active'];

  const rows = staff.map((member) => [
    member.name,
    member.email,
    member.role,
    member.status,
    member.joinDate,
    member.lastActive,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((value) => `"${value}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `staff-directory-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}