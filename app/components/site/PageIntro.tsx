export function PageIntro({
  eyebrow,
  title,
  deck,
  children,
}: {
  eyebrow?: string;
  title: string;
  deck?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="product-hero">
      {eyebrow ? <p className="mono-label">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {deck ? <p className="deck">{deck}</p> : null}
      {children}
    </header>
  );
}
