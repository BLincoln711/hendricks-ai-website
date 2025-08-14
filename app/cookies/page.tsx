'use client'

import Link from 'next/link'

export default function CookiePolicy() {
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
            <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105">
              Get Intelligence Report
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last Updated: January 14, 2025</p>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Cookies</h2>
              <p>Hendricks.AI uses cookies and similar tracking technologies for the following purposes:</p>
              
              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Essential Cookies</h3>
              <p>Required for the website to function properly:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>User authentication and security</li>
                <li>Load balancing and performance</li>
                <li>Storing your cookie preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Analytics Cookies</h3>
              <p>Help us understand how visitors interact with our website:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Google Analytics - tracks page views, traffic sources, and user behavior</li>
                <li>HubSpot Analytics - monitors form submissions and conversions</li>
                <li>Heat mapping tools - analyze user interaction patterns</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Marketing Cookies</h3>
              <p>Used to deliver relevant advertisements and track campaign effectiveness:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Google Ads - for retargeting and conversion tracking</li>
                <li>LinkedIn Insight Tag - for B2B audience targeting</li>
                <li>Facebook Pixel - for social media advertising</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Functional Cookies</h3>
              <p>Enhance your experience on our website:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Remember your preferences (language, region)</li>
                <li>Personalize content based on your interests</li>
                <li>Enable chat and support features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="border border-gray-700 px-4 py-2 text-left">Cookie Name</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Provider</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Purpose</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">_ga, _gid</td>
                      <td className="border border-gray-700 px-4 py-2">Google Analytics</td>
                      <td className="border border-gray-700 px-4 py-2">Analytics and performance</td>
                      <td className="border border-gray-700 px-4 py-2">2 years / 24 hours</td>
                    </tr>
                    <tr className="bg-gray-900/50">
                      <td className="border border-gray-700 px-4 py-2">__hssc, __hssrc</td>
                      <td className="border border-gray-700 px-4 py-2">HubSpot</td>
                      <td className="border border-gray-700 px-4 py-2">Analytics and tracking</td>
                      <td className="border border-gray-700 px-4 py-2">Session / 13 months</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">_fbp</td>
                      <td className="border border-gray-700 px-4 py-2">Facebook</td>
                      <td className="border border-gray-700 px-4 py-2">Advertising and retargeting</td>
                      <td className="border border-gray-700 px-4 py-2">3 months</td>
                    </tr>
                    <tr className="bg-gray-900/50">
                      <td className="border border-gray-700 px-4 py-2">li_sugr</td>
                      <td className="border border-gray-700 px-4 py-2">LinkedIn</td>
                      <td className="border border-gray-700 px-4 py-2">B2B marketing insights</td>
                      <td className="border border-gray-700 px-4 py-2">3 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Your Cookie Choices</h2>
              <p>You have several options for managing cookies:</p>
              
              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Browser Settings</h3>
              <p>
                Most browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Clear cookies when you close your browser</li>
                <li>Accept cookies from specific websites only</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">Opt-Out Links</h3>
              <p>You can opt out of specific tracking services:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    Google Analytics Opt-Out
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    Facebook Ads Preferences
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    LinkedIn Ads Opt-Out
                  </a>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                <p className="text-yellow-300">
                  <strong>Note:</strong> Disabling cookies may affect the functionality of our website and limit your ability to use certain features.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Cookies</h2>
              <p>
                Some cookies are placed by third-party services that appear on our pages. We do not control these cookies, and you should refer to the third party's privacy policy for more information.
              </p>
              <p className="mt-4">
                Third parties that may set cookies on our site include:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Google (Analytics, Ads, YouTube)</li>
                <li>HubSpot (Marketing automation)</li>
                <li>LinkedIn (Professional networking)</li>
                <li>Facebook/Meta (Social media)</li>
                <li>Vercel (Hosting analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Local Storage</h2>
              <p>
                In addition to cookies, we may use local storage and similar technologies to store information on your device. This includes:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>HTML5 local storage</li>
                <li>Session storage</li>
                <li>IndexedDB</li>
              </ul>
              <p className="mt-4">
                These technologies function similarly to cookies and are subject to the same controls.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Do Not Track</h2>
              <p>
                Some browsers offer a "Do Not Track" (DNT) setting. Currently, there is no industry standard for handling DNT signals, and our website does not respond differently to browsers with DNT enabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
              <p>If you have questions about our use of cookies, please contact us:</p>
              <div className="mt-4 p-6 bg-gray-900/50 rounded-lg">
                <p><strong>Hendricks.AI</strong></p>
                <p>Email: privacy@hendricks.ai</p>
                <p>Phone: 1-800-HENDRICKS</p>
                <p>Address: Houston, Texas, United States</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. More Information</h2>
              <p>
                For more information about cookies and how to manage them, visit:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    All About Cookies
                  </a>
                </li>
                <li>
                  <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    Your Online Choices
                  </a>
                </li>
              </ul>
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
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link href="/cookies" className="text-white hover:text-gray-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}