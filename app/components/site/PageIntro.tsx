export function PageIntro({
  title,
  deck,
  children,
}: {
  title: string;
  deck?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-intro">
      <h1>{title}</h1>
      {deck ? <p className="deck">{deck}</p> : null}
      {children}
    </header>
  );
}
