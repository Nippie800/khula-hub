type Props = {
  label: React.ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
};

export default function CheckboxField({ label, checked, onChange }: Props) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-3">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm text-gray-900">{label}</span>
    </label>
  );
}