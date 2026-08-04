import { Calendar } from 'lucide-react';
import { Visit, VisitType } from '@/types/clinical';

interface VisitHistoryTimelineProps {
  visits: Visit[];
}

const visitTypeStyles: Record<VisitType, string> = {
  'Follow-up': 'bg-blue-50 text-blue-600',
  'Annual Wellness': 'bg-green-50 text-green-600',
  'Urgent Care': 'bg-orange-50 text-orange-600',
};

export default function VisitHistoryTimeline({ visits }: VisitHistoryTimelineProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Calendar className="h-4 w-4 text-gray-400" />
        Visit History
      </h2>

      {visits.length === 0 ? (
        <p className="text-sm text-gray-400">No prior visits on file.</p>
      ) : (
        <ol className="relative space-y-5 border-l border-gray-200 pl-4">
          {visits.map((visit) => (
            <li key={visit.id} className="relative">
              <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-gray-300" />

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">{visit.date}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${visitTypeStyles[visit.type]}`}>
                  {visit.type}
                </span>
              </div>

              <p className="mt-1 text-sm font-medium text-gray-900">{visit.diagnosis}</p>
              <p className="mt-0.5 text-xs text-gray-500">{visit.note}</p>
              <p className="mt-1 text-xs text-gray-400">{visit.providerName}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}