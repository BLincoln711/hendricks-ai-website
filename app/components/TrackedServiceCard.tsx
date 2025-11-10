'use client'

import Link from 'next/link'
import { trackServiceInterest } from '@/lib/analytics'

interface TrackedServiceCardProps {
  title: string
  subtitle: string
  description: string
  icon: string
  benefits: string[]
  color: string
  cta: string
  pricing: string
  priceRange: string
  href: string
}

export default function TrackedServiceCard({
  title,
  subtitle,
  description,
  icon,
  benefits,
  color,
  cta,
  pricing,
  priceRange,
  href
}: TrackedServiceCardProps) {

  const handleClick = () => {
    trackServiceInterest(title, priceRange)
  }

  return (
    <div className="relative group">
      <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <div className="text-5xl mb-4 flex justify-center">{icon}</div>
        <h3 className="text-2xl font-bold mb-2 text-center">{title}</h3>
        <p className="text-sm text-blue-400 mb-4 text-center font-medium">{subtitle}</p>
        <p className="text-sm text-gray-400 mb-6 text-center flex-grow">{description}</p>

        <div className="space-y-2 mb-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`}></div>
              <span className="text-sm text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href={href}
            onClick={handleClick}
            className={`block text-center py-3 px-4 rounded-lg bg-gradient-to-r ${color} bg-opacity-10 text-white font-medium hover:bg-opacity-20 transition-all duration-300 mb-3`}
          >
            {cta}
          </Link>
          <p className="text-xs text-gray-500 text-center leading-relaxed px-2">
            {pricing}
          </p>
        </div>
      </div>
    </div>
  )
}
