import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="mb-4">
              <img
                src="/hendricks_logo.png"
                alt="Hendricks.AI"
                className="h-6 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The AI Search Visibility & Measurement Firm for B2B Growth. We unify marketing, data, and AI to measure visibility, prove ROI, and amplify performance across the new AI Search ecosystem.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/hendricksai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                aria-label="Twitter"
              >
                <span className="text-gray-400 text-sm">X</span>
              </a>
              <a
                href="https://linkedin.com/company/hendricks-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <span className="text-gray-400 text-sm">in</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/solutions#visibility-audit" className="hover:text-white transition-colors">Visibility Audit</Link></li>
              <li><Link href="/solutions#attribution-engine" className="hover:text-white transition-colors">Attribution Engine</Link></li>
              <li><Link href="/solutions#ai-visibility-execution" className="hover:text-white transition-colors">AI Visibility Execution</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/playbook" className="hover:text-white transition-colors">2025 Playbook</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 Hendricks.AI. Measure. Attribute. Amplify. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
