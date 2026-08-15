export function PageIntro({
  title,
  deck,
  kicker,
  spec,
  compact,
  legend,
  wide,
  children,
}: {
  title: string;
  deck?: string;
  kicker?: string;
  spec?: boolean;
  compact?: boolean;
  legend?: boolean;
  wide?: boolean;
  children?: React.ReactNode;
}) {
  const titleClass = legend
    ? "mono-label"
    : spec
      ? `spec${wide ? " is-wide" : ""}`
      : undefined;

  return (
    <header
      className={`product-hero masthead${compact ? " is-compact" : ""}${legend ? " is-legend" : ""}`}
    >
      {kicker && !legend ? <p className="mono-label">{kicker}</p> : null}
      <h1 className={titleClass}>{title}</h1>
      {deck ? <p className="deck">{deck}</p> : null}
      {children}
    </header>
  );
}
