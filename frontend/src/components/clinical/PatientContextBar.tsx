import { Activity, Clock, Thermometer, AlertTriangle } from 'lucide-react';
import { Patient } from '@/types/clinical';

interface PatientContextBarProps {
  patient: Patient;
}

export default function PatientContextBar({ patient }: PatientContextBarProps) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/50 px-5 py-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-gray-900">{patient.name}</h1>
          <span className="text-sm text-gray-500">
            ({patient.age}y, {patient.gender})
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="text-gray-500">ID: {patient.patientId}</span>
          {patient.allergies.length > 0 && (
            <span className="flex items-center gap-1 font-medium text-red-600">
              <AlertTriangle className="h-3 w-3" />
              ALLERGIES: {patient.allergies.join(', ')}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Activity className="h-4 w-4 text-gray-400" />
          <span className="font-medium">BP</span> {patient.vitals.bloodPressure}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="font-medium">HR</span> {patient.vitals.heartRate}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Thermometer className="h-4 w-4 text-gray-400" />
          <span className="font-medium">TEMP</span> {patient.vitals.temperature}
        </div>

        {patient.isActiveEncounter && (
          <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-600">
            Active Encounter
          </span>
        )}
      </div>
    </div>
  );
}