import { Pill } from 'lucide-react';
import { Medication } from '@/types/clinical';

interface ActiveMedicationsListProps {
  medications: Medication[];
}

export default function ActiveMedicationsList({ medications }: ActiveMedicationsListProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Pill className="h-4 w-4 text-gray-400" />
        Active Medications
      </h2>

      {medications.length === 0 ? (
        <p className="text-sm text-gray-400">No active medications on file.</p>
      ) : (
        <ul className="space-y-3">
          {medications.map((med) => (
            <li key={med.id} className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{med.name}</p>
                <p className="text-xs text-gray-500">{med.instructions}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}