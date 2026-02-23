import Link from "next/link";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

type ActionButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

type Props = LinkButtonProps | ActionButtonProps;

export default function PrimaryButton(props: Props) {
  const className =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm " +
    "bg-black text-white hover:opacity-90 active:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed";

    const base =
  "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition-all " +
  "focus:outline-none focus:ring-2 focus:ring-teal-600/40 disabled:opacity-60";

const themed =
  "bg-gray-900 text-white hover:bg-gradient-to-r hover:from-teal-600 hover:via-sky-600 hover:to-lime-400 " +
  "hover:text-white";
  if ("href" in props) {
    return (
      <Link className={className} href={props.href}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
      type="button"
    >
      {props.children}
    </button>
  );
}