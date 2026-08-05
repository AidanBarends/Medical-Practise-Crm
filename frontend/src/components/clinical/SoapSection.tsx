interface SoapSectionProps {
  label: string;
  dotColorClass: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SoapSection({
  label,
  dotColorClass,
  placeholder,
  value,
  onChange,
}: SoapSectionProps) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1.5 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dotColorClass}`} />
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-y rounded-lg border border-gray-200 p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}