export default function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle ? <p className="text-sm text-gray-700">{subtitle}</p> : null}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}