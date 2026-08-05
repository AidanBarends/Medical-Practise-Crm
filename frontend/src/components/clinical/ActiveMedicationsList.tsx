import { Link2 } from 'lucide-react';
import { Medication } from '@/types/clinical';

interface ActiveMedicationsListProps {
  medications: Medication[];
}

export default function ActiveMedicationsList({ medications }: ActiveMedicationsListProps) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Link2 className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-800">Active Medications</h2>
        </div>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
          Read-only
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {medications.map((med) => (
          <div
            key={med.id}
            className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
          >
            <p className="text-sm font-medium text-gray-800">{med.name}</p>
            <p className="text-xs text-gray-500">{med.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}