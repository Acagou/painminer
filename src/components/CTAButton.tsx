import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type CTAButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const styles = {
  primary:
    "bg-accent text-white border-accent hover:bg-orange-600 focus-visible:outline-accent",
  secondary:
    "bg-chip text-ink border-line hover:border-accent focus-visible:outline-accent"
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: CTAButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
