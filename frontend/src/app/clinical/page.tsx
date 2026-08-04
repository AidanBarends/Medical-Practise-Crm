import { getActivePatient } from '@/data/mockPatient';
import PatientContextBar from '@/components/clinical/PatientContextBar';
import ActiveMedicationsList from '@/components/clinical/ActiveMedicationsList';
import VisitHistoryTimeline from '@/components/clinical/VisitHistoryTimeline';
import EncounterNotePanel from '@/components/clinical/EncounterNotePanel';

export default async function ClinicalWorkspacePage() {
  const patient = await getActivePatient();

  return (
    <div className="p-6">
      <PatientContextBar patient={patient} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <ActiveMedicationsList medications={patient.medications} />
          <VisitHistoryTimeline visits={patient.visitHistory} />
        </div>

        <div className="lg:col-span-2">
          <EncounterNotePanel />
        </div>
      </div>
    </div>
  );
}