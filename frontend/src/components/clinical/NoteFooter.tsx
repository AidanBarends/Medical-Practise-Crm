interface NoteFooterProps {
  lastSavedAt: Date | null;
  onDiscard: () => void;
  onPreview: () => void;
  onComplete: () => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function NoteFooter({
  lastSavedAt,
  onDiscard,
  onPreview,
  onComplete,
}: NoteFooterProps) {
  return (
    <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4">
      <span className="text-xs text-gray-400">
        {lastSavedAt ? `Auto-saved at ${formatTime(lastSavedAt)}` : 'No changes yet'}
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={onDiscard}
          className="text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          Discard Draft
        </button>
        <button
          onClick={onPreview}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Preview Note
        </button>
        <button
          onClick={onComplete}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
        >
          Complete Encounter
        </button>
      </div>
    </div>
  );
}