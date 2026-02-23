export default function StatusPill({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-800">
      {value}
    </span>
  );
}