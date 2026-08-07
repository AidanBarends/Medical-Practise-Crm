import { Paperclip, LayoutTemplate } from 'lucide-react';

interface NoteHeaderProps {
  sessionDate: string;
  attachedLabCount: number;
  onAttachLabsClick: () => void;
  onTemplatesClick: () => void;
}

export default function NoteHeader({
  sessionDate,
  attachedLabCount,
  onAttachLabsClick,
  onTemplatesClick,
}: NoteHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-base font-semibold text-gray-800">Clinical Encounter Note</h2>
        <p className="text-xs text-gray-400">Drafting session for {sessionDate}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onAttachLabsClick}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          <Paperclip className="h-3.5 w-3.5" />
          Attach Labs
          {attachedLabCount > 0 && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-semibold text-white">
              {attachedLabCount}
            </span>
          )}
        </button>
        <button
          onClick={onTemplatesClick}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          <LayoutTemplate className="h-3.5 w-3.5" />
          Templates
        </button>
      </div>
    </div>
  );
}