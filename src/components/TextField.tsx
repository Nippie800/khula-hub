type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  autoComplete?: string;
};

export default function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  hint,
  autoComplete,
}: Props) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-900">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </span>

      <input
        id={name}
        className="mt-1 h-11 w-full rounded-2xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
      />

      {hint ? <p className="mt-1 text-xs text-gray-600">{hint}</p> : null}
    </label>
  );
}