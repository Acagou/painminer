export function TextAreaInput({
  label,
  value,
  onChange,
  error,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <textarea
        className="mt-2 min-h-72 w-full resize-y rounded-2xl border border-line bg-paper px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-gray-500 focus:border-accent focus:ring-2 focus:ring-orange-950"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        <span className={error ? "text-orange-400" : "text-muted"}>
          {error || "Paste at least 300 characters for a useful mock report."}
        </span>
        <span className="text-muted">{value.length} characters</span>
      </div>
    </label>
  );
}
