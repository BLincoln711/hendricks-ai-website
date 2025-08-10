import Link from "next/link";
import { Linkedin, Twitter, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    solutions: [
      { label: "Demand Intelligence", href: "/solutions/intelligence" },
      { label: "Predictive Analytics", href: "/solutions/analytics" },
      { label: "Campaign Optimization", href: "/solutions/optimization" },
      { label: "ROI Maximization", href: "/solutions/roi" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api" },
      { label: "Support", href: "/support" },
      { label: "Status", href: "/status" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/hendricks-ai", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/hendricks_ai", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@hendricks.ai", label: "Email" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-white">Hendricks.AI</span>
            </Link>
            <p className="text-sm mb-4">
              Demand Intelligence to Demand Capture. Transform your marketing with predictive AI technology.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Hendricks.AI. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Houston, Texas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}