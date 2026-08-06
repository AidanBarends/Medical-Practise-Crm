'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { StaffMember, StaffRole, AccountStatus } from '@/types/staff';

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<StaffMember, 'id' | 'joinDate' | 'lastActive'>) => void;
  initialData?: StaffMember; // present = editing; absent = adding new
}

const roles: StaffRole[] = ['Doctor', 'Nurse', 'Receptionist', 'Admin'];
const statuses: AccountStatus[] = ['Active', 'On Leave', 'Inactive'];

export default function StaffFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: StaffFormModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<StaffRole>('Doctor');
  const [status, setStatus] = useState<AccountStatus>('Active');

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name ?? '');
      setEmail(initialData?.email ?? '');
      setRole(initialData?.role ?? 'Doctor');
      setStatus(initialData?.status ?? 'Active');
    }
  }, [isOpen, initialData]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, email, role, status });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Staff Member' : 'Add Staff Member'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as StaffRole)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AccountStatus)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
          >
            {initialData ? 'Save Changes' : 'Add Staff Member'}
          </button>
        </div>
      </form>
    </Modal>
  );
}