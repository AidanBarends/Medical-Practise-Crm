export type StaffRole = 'Doctor' | 'Nurse' | 'Receptionist' | 'Admin';
export type AccountStatus = 'Active' | 'On Leave' | 'Inactive';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  status: AccountStatus;
  joinDate: string;
  lastActive: string;
}