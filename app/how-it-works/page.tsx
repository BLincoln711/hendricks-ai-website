'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HowItWorksPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to solutions page since how it works is now part of solutions
    router.push('/solutions#how-it-works')
  }, [router])
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400">Redirecting to Solutions...</p>
      </div>
    </div>
  )
}