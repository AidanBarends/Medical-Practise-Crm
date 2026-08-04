'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { SoapNote } from '@/types/clinical';

const emptyNote: SoapNote = {
  subjective: '',
  objective: '',
  assessment: '',
  plan: '',
};

const sections: { key: keyof SoapNote; label: string; placeholder: string }[] = [
  { key: 'subjective', label: 'Subjective', placeholder: "Patient's reported symptoms, history..." },
  { key: 'objective', label: 'Objective', placeholder: 'Exam findings, vitals, test results...' },
  { key: 'assessment', label: 'Assessment', placeholder: 'Diagnosis or clinical impression...' },
  { key: 'plan', label: 'Plan', placeholder: 'Treatment plan, follow-up, prescriptions...' },
];

export default function EncounterNotePanel() {
  const [note, setNote] = useState<SoapNote>(emptyNote);

  const handleChange = (key: keyof SoapNote, value: string) => {
    setNote((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <FileText className="h-4 w-4 text-gray-400" />
        Clinical Encounter Note
      </h2>

      <div className="space-y-4">
        {sections.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label htmlFor={key} className="mb-1 block text-xs font-medium text-gray-500">
              {label}
            </label>
            <textarea
              id={key}
              value={note[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}