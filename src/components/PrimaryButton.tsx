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