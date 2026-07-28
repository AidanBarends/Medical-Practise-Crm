'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  UserCircle,
  Stethoscope,
  Calendar,
  FileStack,
  LogOut,
} from 'lucide-react';

const navItems = [
  { label: 'Staff Management', href: '/staff-management', icon: Users },
  { label: 'Patient Directory', href: '/patient-directory', icon: UserCircle },
  { label: 'Clinical Workspace', href: '/clinical-workspace', icon: Stethoscope },
  { label: 'Appointment Scheduler', href: '/appointment-scheduler', icon: Calendar },
  { label: 'Document Vault', href: '/document-vault', icon: FileStack },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col justify-between border-r border-gray-200 bg-white">
      <div>
        <div className="flex items-center gap-2 px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-blue-600">
            PracticeFlow
          </span>
        </div>

        <nav className="mt-2 flex flex-col gap-1 px-3">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-100 px-6 py-4">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}