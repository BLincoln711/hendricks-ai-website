// /app/glossary/layout.tsx

import "../globals.css"
import { IndexSidebar } from "./components/IndexSidebar"

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex">
      {/* Left Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 overflow-y-auto border-r border-neutral-200 bg-white">
        <IndexSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-3xl mx-auto">{children}</main>

      {/* Right spacer, reserved for future related-terms sidebar */}
      <div className="hidden lg:block w-64" />
    </div>
  )
}
