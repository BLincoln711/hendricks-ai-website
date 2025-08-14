'use client'

import Link from 'next/link'

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last Updated: January 14, 2025</p>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Hendricks.AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website hendricks.ai or use our predictive AI marketing services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
              <p>We may collect the following types of personal information:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Company name and job title</li>
                <li>Billing and payment information</li>
                <li>Marketing preferences and interests</li>
                <li>Communications you send to us</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Analytics Data</h3>
              <p>We automatically collect certain information when you visit our website:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages viewed and time spent</li>
                <li>Referring website</li>
                <li>Click patterns and engagement metrics</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Marketing Intelligence Data</h3>
              <p>For our services, we may analyze:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Search trends and keyword data</li>
                <li>Competitor analysis information</li>
                <li>Market demand signals</li>
                <li>Campaign performance metrics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use the collected information for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Providing and improving our predictive AI marketing services</li>
                <li>Generating custom Intelligence Reports</li>
                <li>Communicating with you about our services</li>
                <li>Processing payments and managing accounts</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Analyzing website usage to improve user experience</li>
                <li>Complying with legal obligations</li>
                <li>Protecting against fraud and unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              
              <h3 className="text-xl font-semibold text-white mb-2">Service Providers</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Analytics platforms (Google Analytics, HubSpot)</li>
                <li>Cloud hosting services (Vercel)</li>
                <li>Payment processors</li>
                <li>Email service providers</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Other Circumstances</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>In connection with a business transaction (merger, acquisition)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information, including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Secure data storage with access controls</li>
                <li>Regular security assessments</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Request corrections to inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we use your information</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at privacy@hendricks.ai
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Remember your preferences</li>
                <li>Analyze website traffic</li>
                <li>Personalize content</li>
                <li>Measure advertising effectiveness</li>
              </ul>
              <p className="mt-4">
                For more information, see our <Link href="/cookies" className="text-blue-400 hover:text-blue-300">Cookie Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in the United States. We ensure appropriate safeguards are in place for international transfers in compliance with applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. California Privacy Rights</h2>
              <p>
                California residents have additional rights under the California Consumer Privacy Act (CCPA), including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Right to know what personal information is collected</li>
                <li>Right to know whether personal information is sold or disclosed</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of material changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
              <div className="mt-4 p-6 bg-gray-900/50 rounded-lg">
                <p><strong>Hendricks.AI</strong></p>
                <p>Email: privacy@hendricks.ai</p>
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
              <Link href="/privacy" className="text-white hover:text-gray-300">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}