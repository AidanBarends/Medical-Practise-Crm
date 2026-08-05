import { Paperclip, LayoutTemplate } from 'lucide-react';

interface NoteHeaderProps {
  sessionDate: string;
}

export default function NoteHeader({ sessionDate }: NoteHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-base font-semibold text-gray-800">Clinical Encounter Note</h2>
        <p className="text-xs text-gray-400">Drafting session for {sessionDate}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
          <Paperclip className="h-3.5 w-3.5" />
          Attach Labs
        </button>
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
          <LayoutTemplate className="h-3.5 w-3.5" />
          Templates
        </button>
      </div>
    </div>
  );
}