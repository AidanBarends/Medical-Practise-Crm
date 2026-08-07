'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import PatientContextBar from '@/components/clinical/PatientContextBar';
import ActiveMedicationsList from '@/components/clinical/ActiveMedicationsList';
import VisitHistoryTimeline from '@/components/clinical/VisitHistoryTimeline';
import ClinicalNoteEditor from '@/components/clinical/ClinicalNoteEditor';
import NoteFooter from '@/components/clinical/NoteFooter';
import TemplatesModal from '@/components/clinical/TemplatesModal';
import AttachLabsModal from '@/components/clinical/AttachLabsModal';
import PreviewNoteModal from '@/components/clinical/PreviewNoteModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { getActivePatient } from '@/data/mockPatient';
import { Patient, SoapNote } from '@/types/clinical';
import { useAutoSave } from '@/hooks/useAutoSave';

const emptyNote: SoapNote = { subjective: '', objective: '', assessment: '', plan: '' };

export default function ClinicalWorkspacePage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [note, setNote] = useState<SoapNote>(emptyNote);
  const [attachedLabIds, setAttachedLabIds] = useState<string[]>([]);

  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isAttachLabsOpen, setIsAttachLabsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDiscardConfirmOpen, setIsDiscardConfirmOpen] = useState(false);
  const [isCompleteConfirmOpen, setIsCompleteConfirmOpen] = useState(false);
  const [completedMessage, setCompletedMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    getActivePatient().then((data) => {
      if (!isCancelled) setPatient(data);
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  const lastSavedAt = useAutoSave(note);

  function updateNoteField(key: keyof SoapNote, value: string) {
    setNote((prev) => ({ ...prev, [key]: value }));
  }

  function handleConfirmDiscard() {
    setNote(emptyNote);
    setAttachedLabIds([]);
    setIsDiscardConfirmOpen(false);
  }

  function handleConfirmComplete() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCompletedMessage(`Encounter for ${patient?.name} marked complete at ${time}.`);
    setIsCompleteConfirmOpen(false);
  }

  if (!patient) {
    return (
      <AppShell>
        <p className="text-sm text-gray-400">Loading patient...</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PatientContextBar patient={patient} />

      {completedMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {completedMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <div>
          <ActiveMedicationsList medications={patient.medications} />
          <VisitHistoryTimeline visits={patient.visitHistory} />
        </div>

        <ClinicalNoteEditor
          sessionDate="4/28/2026"
          note={note}
          onChange={updateNoteField}
          attachedLabCount={attachedLabIds.length}
          onAttachLabsClick={() => setIsAttachLabsOpen(true)}
          onTemplatesClick={() => setIsTemplatesOpen(true)}
        />
      </div>

      <NoteFooter
        lastSavedAt={lastSavedAt}
        onDiscard={() => setIsDiscardConfirmOpen(true)}
        onPreview={() => setIsPreviewOpen(true)}
        onComplete={() => setIsCompleteConfirmOpen(true)}
      />

      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={setNote}
      />

      <AttachLabsModal
        isOpen={isAttachLabsOpen}
        onClose={() => setIsAttachLabsOpen(false)}
        attachedLabIds={attachedLabIds}
        onSave={setAttachedLabIds}
      />

      <PreviewNoteModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        note={note}
        patientName={patient.name}
        sessionDate="4/28/2026"
      />

      <ConfirmDialog
        isOpen={isDiscardConfirmOpen}
        title="Discard Draft"
        message="Are you sure you want to discard this draft? All unsaved note content and attached labs will be cleared."
        confirmLabel="Discard"
        isDangerous
        onConfirm={handleConfirmDiscard}
        onCancel={() => setIsDiscardConfirmOpen(false)}
      />

      <ConfirmDialog
        isOpen={isCompleteConfirmOpen}
        title="Complete Encounter"
        message="Marking this encounter complete will finalize the note. Continue?"
        confirmLabel="Complete Encounter"
        onConfirm={handleConfirmComplete}
        onCancel={() => setIsCompleteConfirmOpen(false)}
      />
    </AppShell>
  );
}