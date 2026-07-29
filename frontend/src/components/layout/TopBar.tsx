import { Search, Bell, Settings } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="relative w-96">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search patients, staff, or documents..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-5">
        <button aria-label="Notifications" className="text-gray-500 hover:text-gray-700">
          <Bell className="h-5 w-5" />
        </button>
        <button aria-label="Settings" className="text-gray-500 hover:text-gray-700">
          <Settings className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-gray-800">Dr. Sarah Smith</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
            SS
          </div>
        </div>
      </div>
    </header>
  );
}