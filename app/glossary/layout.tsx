// /app/glossary/layout.tsx

import "../globals.css"
import { IndexSidebar } from "./components/IndexSidebar"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="w-full flex pt-20">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-64 h-screen sticky top-20 overflow-y-auto border-r border-slate-800 bg-black">
          <IndexSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-3xl mx-auto">{children}</main>

        {/* Right spacer, reserved for future related-terms sidebar */}
        <div className="hidden lg:block w-64" />
      </div>

      <Footer />
    </div>
  )
}
