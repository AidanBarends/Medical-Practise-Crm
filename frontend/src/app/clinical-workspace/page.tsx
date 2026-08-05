'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import PatientContextBar from '@/components/clinical/PatientContextBar';
import ActiveMedicationsList from '@/components/clinical/ActiveMedicationsList';
import VisitHistoryTimeline from '@/components/clinical/VisitHistoryTimeline';
import ClinicalNoteEditor from '@/components/clinical/ClinicalNoteEditor';
import NoteFooter from '@/components/clinical/NoteFooter';
import { getActivePatient } from '@/data/mockPatient';
import { Patient, SoapNote } from '@/types/clinical';
import { useAutoSave } from '@/hooks/useAutoSave';

export default function ClinicalWorkspacePage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [note, setNote] = useState<SoapNote>({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  });

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

  function handleDiscard() {
    setNote({ subjective: '', objective: '', assessment: '', plan: '' });
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <div>
          <ActiveMedicationsList medications={patient.medications} />
          <VisitHistoryTimeline visits={patient.visitHistory} />
        </div>

        <ClinicalNoteEditor
          sessionDate="4/28/2026"
          note={note}
          onChange={updateNoteField}
        />
      </div>

      <NoteFooter
        lastSavedAt={lastSavedAt}
        onDiscard={handleDiscard}
        onPreview={() => alert('Preview coming soon.')}
        onComplete={() => alert('Encounter completion coming soon.')}
      />
    </AppShell>
  );
}