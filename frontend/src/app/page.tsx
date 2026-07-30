'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import StaffPageHeader from '@/components/staff/StaffPageHeader';
import StaffStatsGrid from '@/components/staff/StaffStatsGrid';
import StaffFilterBar from '@/components/staff/StaffFilterBar';
import StaffTable from '@/components/staff/StaffTable';
import PaginationFooter from '@/components/staff/PaginationFooter';
import { getStaffMembers } from '@/data/mockStaff';
import { StaffMember, StaffRole, AccountStatus } from '@/types/staff';

const PAGE_SIZE = 5;

export default function Home() {
  const [allStaff, setAllStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    getStaffMembers().then((data) => {
      if (!isCancelled) {
        setAllStaff(data);
        setIsLoading(false);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<StaffRole | 'All Roles'>('All Roles');
  const [statusFilter, setStatusFilter] = useState<AccountStatus | 'All Statuses'>(
    'All Statuses'
  );
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStaff = useMemo(() => {
    return allStaff.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All Roles' || member.role === roleFilter;
      const matchesStatus =
        statusFilter === 'All Statuses' || member.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [allStaff, searchTerm, roleFilter, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / PAGE_SIZE));
  const rangeStart = filteredStaff.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredStaff.length);
  const paginatedStaff = filteredStaff.slice(rangeStart - 1, rangeEnd);

  return (
    <AppShell>
      <StaffPageHeader />
      <StaffStatsGrid />
      <StaffFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-800">Team Directory</h2>
            <p className="text-sm text-gray-400">
              {filteredStaff.length} registered staff members found
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-sm text-gray-400">
            Loading staff directory...
          </div>
        ) : (
          <>
            <StaffTable staff={paginatedStaff} />
            <PaginationFooter
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              total={filteredStaff.length}
              onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              canGoPrevious={currentPage > 1}
              canGoNext={currentPage < totalPages}
            />
          </>
        )}
      </div>
    </AppShell>
  );
}