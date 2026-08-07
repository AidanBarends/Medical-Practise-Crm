import Modal from '@/components/ui/Modal';
import { SoapNote } from '@/types/clinical';

interface PreviewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: SoapNote;
  patientName: string;
  sessionDate: string;
}

const sections: { key: keyof SoapNote; label: string }[] = [
  { key: 'subjective', label: 'Subjective' },
  { key: 'objective', label: 'Objective' },
  { key: 'assessment', label: 'Assessment' },
  { key: 'plan', label: 'Plan' },
];

export default function PreviewNoteModal({
  isOpen,
  onClose,
  note,
  patientName,
  sessionDate,
}: PreviewNoteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Note Preview">
      <div className="mb-4 border-b border-gray-100 pb-3">
        <p className="text-sm font-semibold text-gray-800">{patientName}</p>
        <p className="text-xs text-gray-400">Session: {sessionDate}</p>
      </div>
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section.key}>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {section.label}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              {note[section.key].trim() ? (
                note[section.key]
              ) : (
                <span className="italic text-gray-400">Not documented</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
}