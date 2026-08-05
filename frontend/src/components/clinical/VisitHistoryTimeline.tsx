import { History } from 'lucide-react';
import { Visit } from '@/types/clinical';

interface VisitHistoryTimelineProps {
  visits: Visit[];
}

export default function VisitHistoryTimeline({ visits }: VisitHistoryTimelineProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-1.5">
        <History className="h-4 w-4 text-gray-400" />
        <h2 className="text-sm font-semibold text-gray-800">Visit History</h2>
      </div>

      <div className="flex flex-col">
        {visits.map((visit, index) => (
          <div key={visit.id} className="relative pb-5 pl-5 last:pb-0">
            {/* The vertical connecting line — only render it if this ISN'T the last item */}
            {index !== visits.length - 1 && (
              <span className="absolute left-[3px] top-3 h-full w-px bg-gray-200" />
            )}
            {/* The dot marker */}
            <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-500" />

            <div className="mb-0.5 flex items-center justify-between">
              <span className="text-xs font-medium text-blue-600">{visit.date}</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                {visit.type}
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{visit.diagnosis}</p>
            <p className="mt-0.5 text-xs text-gray-500">{visit.note}</p>
            <p className="mt-1 text-xs text-gray-400">By {visit.providerName}</p>
          </div>
        ))}
      </div>

      <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700">
        View Full Medical Record
      </button>
    </div>
  );
}