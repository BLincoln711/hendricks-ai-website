import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ExternalLink, Clock, CheckCircle, ArrowRight, Globe, Smartphone, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Portal | Hendricks.AI",
  description: "View your active projects and website development progress with Hendricks.AI.",
  robots: "noindex, nofollow", // Keep client pages private from search
};

// Client project data
const clients = [
  {
    id: "abm-tv-mounting",
    name: "ABM TV Mounting",
    description: "Houston's Most Trusted TV Mounting Service",
    status: "in-progress",
    progress: 90,
    previewUrl: "https://abm-tv-mounting.vercel.app",
    services: ["Website Design", "SEO Optimization", "Local Search"],
    lastUpdated: "January 16, 2026",
    milestones: [
      { name: "Discovery & Strategy", status: "complete" },
      { name: "Design & Development", status: "complete" },
      { name: "Content & SEO", status: "in-progress" },
      { name: "Launch & Optimization", status: "pending" },
    ],
  },
];

export default function ClientsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-slate-900 bg-gradient-to-b from-slate-900 to-slate-950 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4">
              <Globe className="w-4 h-4" />
              <span>Client Portal</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Projects
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Track the progress of your website development, SEO optimization, and AI visibility projects.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-6">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Project Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-white">{client.name}</h2>
                        <span
                          className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                            client.status === "in-progress"
                              ? "bg-amber-500/20 text-amber-400"
                              : client.status === "complete"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-slate-500/20 text-slate-400"
                          }`}
                        >
                          {client.status === "in-progress" ? "In Progress" : client.status}
                        </span>
                      </div>
                      <p className="text-slate-400 mb-4">{client.description}</p>

                      {/* Services Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {client.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">Overall Progress</span>
                          <span className="text-emerald-400 font-medium">{client.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
                            style={{ width: `${client.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Milestones */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {client.milestones.map((milestone, index) => (
                          <div
                            key={milestone.name}
                            className={`flex items-center gap-2 text-xs ${
                              milestone.status === "complete"
                                ? "text-emerald-400"
                                : milestone.status === "in-progress"
                                ? "text-amber-400"
                                : "text-slate-500"
                            }`}
                          >
                            {milestone.status === "complete" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : milestone.status === "in-progress" ? (
                              <Clock className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-slate-600" />
                            )}
                            <span>{milestone.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 lg:items-end">
                      <Link
                        href={`/clients/${client.id}`}
                        className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-2.5 rounded-lg transition-colors"
                      >
                        View Project Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a
                        href={client.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-emerald-300 px-5 py-2.5 rounded-lg transition-colors"
                      >
                        <Smartphone className="w-4 h-4" />
                        Preview Live Site
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <p className="text-xs text-slate-500">
                        Last updated: {client.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-12 border-t border-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                Have questions about your project?
              </h3>
              <p className="text-slate-400 mb-6">
                Contact us anytime for updates, feedback, or to discuss next steps.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
