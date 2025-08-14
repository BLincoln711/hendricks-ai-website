'use client'

import Link from 'next/link'

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/hendricks_logo.png" 
                alt="Hendricks.AI" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">Results</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
            <a href="https://calendar.app.google/DHopiSfnLiH5xwKo9" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105">
              Book Strategy Call
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Effective Date: January 14, 2025</p>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using Hendricks.AI's website and services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
              <p>
                Hendricks.AI provides predictive AI marketing services including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Demand Intelligence and market prediction analysis</li>
                <li>Google Performance Max campaign management</li>
                <li>Bing Performance Max optimization</li>
                <li>Marketing automation and amplification</li>
                <li>Conversion optimization services</li>
                <li>Custom Intelligence Reports and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
              <h3 className="text-xl font-semibold text-white mb-2">Account Creation</h3>
              <p>To access certain Services, you must:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Account Termination</h3>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent or harmful activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
              <h3 className="text-xl font-semibold text-white mb-2">Fees and Billing</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All fees are quoted in US Dollars unless otherwise specified</li>
                <li>Payment is due according to the agreed billing cycle</li>
                <li>Late payments may incur additional fees or service suspension</li>
                <li>All sales are final unless otherwise stated in writing</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Refund Policy</h3>
              <p>
                Refunds are evaluated on a case-by-case basis. We do not offer refunds for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Services already rendered</li>
                <li>Custom Intelligence Reports delivered</li>
                <li>Ad spend or third-party platform costs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <h3 className="text-xl font-semibold text-white mb-2">Our Property</h3>
              <p>
                All content, features, and functionality of our Services, including but not limited to text, graphics, logos, and software, are the exclusive property of Hendricks.AI and are protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Client Data</h3>
              <p>
                You retain ownership of all data you provide to us. By using our Services, you grant us a license to use this data solely for providing and improving our Services.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Deliverables</h3>
              <p>
                Unless otherwise agreed in writing, all deliverables created for you become your property upon full payment, except for our proprietary methodologies and technologies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Confidentiality</h2>
              <p>
                Both parties agree to maintain the confidentiality of any proprietary information shared during the course of business. This includes:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Business strategies and plans</li>
                <li>Financial information</li>
                <li>Technical data and trade secrets</li>
                <li>Customer lists and data</li>
                <li>Predictive models and algorithms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Acceptable Use</h2>
              <p>You agree not to use our Services to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malicious code or interfere with our systems</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Harass, abuse, or harm others</li>
                <li>Attempt to reverse engineer our proprietary technology</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Disclaimers</h2>
              <h3 className="text-xl font-semibold text-white mb-2">Service Performance</h3>
              <p>
                While we strive for high accuracy in our predictions and recommendations, we cannot guarantee specific results. Marketing performance depends on many factors beyond our control.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Third-Party Platforms</h3>
              <p>
                We are not responsible for changes to third-party platforms (Google, Microsoft, etc.) that may affect service delivery or performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, HENDRICKS.AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL.
              </p>
              <p className="mt-4">
                Our total liability for any claim arising from these Terms or our Services shall not exceed the amount paid by you to us in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Hendricks.AI, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your use of our Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you provide through our Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Dispute Resolution</h2>
              <h3 className="text-xl font-semibold text-white mb-2">Governing Law</h3>
              <p>
                These Terms are governed by the laws of the State of Texas, United States, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Arbitration</h3>
              <p>
                Any disputes arising from these Terms or our Services shall be resolved through binding arbitration in Houston, Texas, except where prohibited by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Material changes will be notified via email or through our Services. Continued use after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy and any other agreements referenced herein, constitute the entire agreement between you and Hendricks.AI regarding our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
              <p>For questions about these Terms of Service, please contact us:</p>
              <div className="mt-4 p-6 bg-gray-900/50 rounded-lg">
                <p><strong>Hendricks.AI</strong></p>
                <p>Email: legal@hendricks.ai</p>
                <p>Phone: 1-800-HENDRICKS</p>
                <p>Address: Houston, Texas, United States</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Hendricks.AI - Demand Intelligence to Demand Capture. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="text-white hover:text-gray-300">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}