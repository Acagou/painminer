export function SelectInput({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <select
        className="mt-2 h-11 w-full rounded-full border border-line bg-paper px-4 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-orange-950"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
