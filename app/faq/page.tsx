'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FAQPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to about page since FAQ is now part of about or footer
    router.push('/about#faq')
  }, [router])
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400">Redirecting to About...</p>
      </div>
    </div>
  )
}