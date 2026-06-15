export function TextArea({
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
      <span className="text-sm font-semibold text-neutral-950">{label}</span>
      <textarea
        className="mt-2 min-h-80 w-full resize-y rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-200"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        <span className={error ? "text-red-600" : "text-neutral-500"}>
          {error || "Paste at least 300 characters."}
        </span>
        <span className="text-neutral-500">{value.length} characters</span>
      </div>
    </label>
  );
}
