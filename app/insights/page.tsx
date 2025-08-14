'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function InsightsPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to resources page since insights is now under resources
    router.push('/resources#insights')
  }, [router])
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400">Redirecting to Resources...</p>
      </div>
    </div>
  )
}