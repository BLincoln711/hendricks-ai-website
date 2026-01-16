import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  ExternalLink,
  Clock,
  CheckCircle,
  ArrowLeft,
  Globe,
  Smartphone,
  Search,
  FileText,
  Code,
  Palette,
  Rocket,
  Phone,
  MapPin,
  Star,
  DollarSign,
  Users,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ABM TV Mounting Project | Hendricks.AI Client Portal",
  description: "View the development progress for ABM TV Mounting website - Houston's Most Trusted TV Mounting Service.",
  robots: "noindex, nofollow",
};

// Project details
const project = {
  name: "ABM TV Mounting",
  tagline: "Houston's Most Trusted TV Mounting Service",
  status: "in-progress",
  progress: 90,
  previewUrl: "https://abm-tv-mounting.vercel.app",
  startDate: "January 2026",
  estimatedLaunch: "January 2026",
  lastUpdated: "January 16, 2026",
  contact: {
    phone: "281-818-5071",
    email: "bgeezyabm1@gmail.com",
  },
};

const milestones = [
  {
    phase: "Discovery & Strategy",
    status: "complete",
    icon: FileText,
    tasks: [
      { name: "Analyzed existing Google Sites website", status: "complete" },
      { name: "Identified conversion optimization opportunities", status: "complete" },
      { name: "Developed SEO and content strategy", status: "complete" },
      { name: "Created sitemap and page structure", status: "complete" },
    ],
  },
  {
    phase: "Design & Development",
    status: "complete",
    icon: Code,
    tasks: [
      { name: "Built Next.js 14 application framework", status: "complete" },
      { name: "Implemented mobile-first responsive design", status: "complete" },
      { name: "Created reusable component library", status: "complete" },
      { name: "Added sticky mobile CTAs for calls/texts", status: "complete" },
      { name: "Integrated Facebook Marketplace reviews badge", status: "complete" },
    ],
  },
  {
    phase: "Content & SEO",
    status: "in-progress",
    icon: Search,
    tasks: [
      { name: "Homepage with trust signals and CTAs", status: "complete" },
      { name: "Services page with detailed offerings", status: "complete" },
      { name: "Pricing page with transparent pricing", status: "complete" },
      { name: "20+ city-specific service area pages", status: "complete" },
      { name: "Reviews page with Facebook Marketplace integration", status: "complete" },
      { name: "JSON-LD schema markup (LocalBusiness, Service, FAQ)", status: "complete" },
      { name: "Add Facebook Marketplace profile URL", status: "pending" },
      { name: "Upload review screenshot images", status: "pending" },
    ],
  },
  {
    phase: "Launch & Optimization",
    status: "in-progress",
    icon: Rocket,
    tasks: [
      { name: "Deploy to Vercel production", status: "complete" },
      { name: "Configure custom domain", status: "pending" },
      { name: "Set up Google Analytics & Search Console", status: "pending" },
      { name: "Submit sitemap to Google", status: "pending" },
      { name: "Performance optimization", status: "pending" },
    ],
  },
];

const features = [
  {
    icon: Phone,
    title: "Click-to-Call/Text CTAs",
    description: "Sticky mobile buttons for instant customer contact",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Clear pricing table: $65-$95 for all services",
  },
  {
    icon: MapPin,
    title: "20+ Service Area Pages",
    description: "SEO-optimized pages for Houston neighborhoods",
  },
  {
    icon: Star,
    title: "500+ Reviews Integration",
    description: "Facebook Marketplace reviews badge site-wide",
  },
  {
    icon: Search,
    title: "Schema Markup",
    description: "LocalBusiness, Service, FAQ structured data",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Optimized for smartphone users seeking services",
  },
];

const pages = [
  { name: "Homepage", path: "/", status: "complete" },
  { name: "Services", path: "/services", status: "complete" },
  { name: "Pricing", path: "/pricing", status: "complete" },
  { name: "Reviews", path: "/reviews", status: "complete" },
  { name: "FAQ", path: "/faq", status: "complete" },
  { name: "About", path: "/about", status: "complete" },
  { name: "Contact", path: "/contact", status: "complete" },
  { name: "Gallery", path: "/gallery", status: "complete" },
  { name: "Service Areas Hub", path: "/service-areas", status: "complete" },
];

const serviceAreas = [
  "Downtown Houston", "Midtown", "Heights", "Montrose", "River Oaks",
  "Memorial", "Katy", "Cypress", "Sugar Land", "Spring",
  "The Woodlands", "Humble", "Kingwood", "Pearland", "Clear Lake",
  "League City", "Pasadena", "Baytown", "Missouri City", "Richmond",
];

export default function ABMTVMountingPage() {
  const completedTasks = milestones.flatMap((m) => m.tasks).filter((t) => t.status === "complete").length;
  const totalTasks = milestones.flatMap((m) => m.tasks).length;

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Header />

      <main className="flex-1">
        {/* Back Link */}
        <div className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Client Portal
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-slate-900 bg-gradient-to-b from-slate-900 to-slate-950 py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.status === "in-progress"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {project.status === "in-progress" ? "In Progress" : "Complete"}
                  </span>
                  <span className="text-slate-500 text-sm">Started {project.startDate}</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
                <p className="text-xl text-slate-400 mb-6">{project.tagline}</p>

                {/* Progress */}
                <div className="max-w-md">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">
                      {completedTasks} of {totalTasks} tasks complete
                    </span>
                    <span className="text-emerald-400 font-semibold">{project.progress}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Preview Button */}
              <div className="flex flex-col gap-3">
                <a
                  href={project.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  Preview Live Website
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-xs text-slate-500 text-center">
                  Live on Vercel
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-12 border-b border-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features Built</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg"
                >
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Timeline */}
        <section className="py-12 border-b border-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-white mb-8">Development Progress</h2>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.phase}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden"
                >
                  {/* Phase Header */}
                  <div
                    className={`flex items-center justify-between p-4 border-b ${
                      milestone.status === "complete"
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : milestone.status === "in-progress"
                        ? "border-amber-500/20 bg-amber-500/5"
                        : "border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          milestone.status === "complete"
                            ? "bg-emerald-500/20"
                            : milestone.status === "in-progress"
                            ? "bg-amber-500/20"
                            : "bg-slate-800"
                        }`}
                      >
                        <milestone.icon
                          className={`w-5 h-5 ${
                            milestone.status === "complete"
                              ? "text-emerald-400"
                              : milestone.status === "in-progress"
                              ? "text-amber-400"
                              : "text-slate-500"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          Phase {index + 1}: {milestone.phase}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {milestone.tasks.filter((t) => t.status === "complete").length} of{" "}
                          {milestone.tasks.length} tasks complete
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        milestone.status === "complete"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : milestone.status === "in-progress"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {milestone.status === "complete"
                        ? "Complete"
                        : milestone.status === "in-progress"
                        ? "In Progress"
                        : "Upcoming"}
                    </span>
                  </div>

                  {/* Tasks */}
                  <div className="p-4">
                    <ul className="grid gap-2">
                      {milestone.tasks.map((task) => (
                        <li key={task.name} className="flex items-center gap-3">
                          {task.status === "complete" ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : task.status === "in-progress" ? (
                            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0" />
                          )}
                          <span
                            className={`text-sm ${
                              task.status === "complete"
                                ? "text-slate-300"
                                : task.status === "in-progress"
                                ? "text-amber-300"
                                : "text-slate-500"
                            }`}
                          >
                            {task.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pages Built */}
        <section className="py-12 border-b border-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-white mb-6">Pages Built</h2>

            {/* Main Pages */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Main Pages</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {pages.map((page) => (
                  <a
                    key={page.path}
                    href={`${project.previewUrl}${page.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-emerald-500/50 transition-colors group"
                  >
                    <span className="text-sm text-slate-300 group-hover:text-emerald-300">
                      {page.name}
                    </span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Service Area Pages */}
            <div>
              <h3 className="text-lg font-semibold text-slate-300 mb-4">
                Service Area Pages ({serviceAreas.length} cities)
              </h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <a
                    key={area}
                    href={`${project.previewUrl}/service-areas/${area.toLowerCase().replace(/\s+/g, "-")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-slate-800 text-slate-400 text-xs rounded-full hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
                  >
                    {area}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-white mb-6">What&apos;s Next</h2>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-4">Action Items Needed</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-400 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Provide Facebook Marketplace Profile URL</p>
                    <p className="text-sm text-slate-400">
                      We need the actual URL to your Facebook Marketplace seller profile to link the 500+ reviews badge.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-400 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Send Review Screenshots</p>
                    <p className="text-sm text-slate-400">
                      Screenshots of your best Facebook Marketplace reviews to display on the Reviews page (6 images recommended).
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-400 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Gallery Images (Optional)</p>
                    <p className="text-sm text-slate-400">
                      Photos of completed TV mounting jobs to showcase on the Gallery page.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 border-t border-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <div className="bg-gradient-to-r from-emerald-500/10 to-slate-900 border border-slate-800 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                Questions about your project?
              </h3>
              <p className="text-slate-400 mb-6">
                We&apos;re here to help. Reach out anytime for updates or to discuss next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Contact Hendricks.AI
                </Link>
                <a
                  href={project.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-emerald-300 px-6 py-3 rounded-lg transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  Preview Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
