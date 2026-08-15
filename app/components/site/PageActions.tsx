import Link from "next/link";

export function PageActions({
  primary,
}: {
  primary: { href: string; label: string; external?: boolean };
}) {
  return (
    <p className="page-ctas">
      {primary.external ? (
        <a
          className="page-enter"
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {primary.label}
        </a>
      ) : (
        <Link className="page-enter" href={primary.href}>
          {primary.label}
        </Link>
      )}
    </p>
  );
}
