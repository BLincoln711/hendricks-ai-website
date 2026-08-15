import { FieldAtmosphere } from "../field/FieldAtmosphere";
import { InteriorFrame } from "./InteriorFrame";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <FieldAtmosphere />
      <InteriorFrame>{children}</InteriorFrame>
    </div>
  );
}
