'use client'

import { useEffect } from 'react'

interface HubSpotContactFormProps {
  formId: string
  portalId: string
}

export default function HubSpotContactForm({ formId, portalId }: HubSpotContactFormProps) {
  useEffect(() => {
    // Create the form container div
    const script = document.createElement('script')
    script.src = '//js.hsforms.net/forms/v2.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      // @ts-ignore
      if (window.hbspt) {
        // @ts-ignore
        window.hbspt.forms.create({
          portalId: portalId,
          formId: formId,
          target: '#hubspot-form-container',
          css: '',
          cssClass: 'hubspot-form',
          onFormReady: function() {
            // Custom styling after form loads
            const form = document.querySelector('.hubspot-form')
            if (form) {
              // Apply Tailwind-like styles
              const inputs = form.querySelectorAll('input, textarea, select')
              inputs.forEach((input) => {
                input.classList.add('w-full', 'px-4', 'py-3', 'bg-gray-900', 'border', 'border-gray-700', 'rounded-lg', 'text-white', 'focus:border-blue-500', 'focus:outline-none')
              })
              
              const labels = form.querySelectorAll('label')
              labels.forEach((label) => {
                label.classList.add('block', 'text-sm', 'font-medium', 'text-gray-300', 'mb-2')
              })
              
              const submitButton = form.querySelector('input[type="submit"]')
              if (submitButton) {
                submitButton.classList.add('w-full', 'bg-gradient-to-r', 'from-blue-600', 'to-blue-700', 'hover:from-blue-700', 'hover:to-blue-800', 'text-white', 'font-semibold', 'py-4', 'px-6', 'rounded-lg', 'transition-all', 'duration-200', 'transform', 'hover:scale-105', 'cursor-pointer')
              }
              
              const fieldGroups = form.querySelectorAll('.hs-form-field')
              fieldGroups.forEach((group) => {
                group.classList.add('mb-6')
              })
            }
          }
        })
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [formId, portalId])

  return (
    <div id="hubspot-form-container" className="hubspot-form-wrapper">
      <style jsx global>{`
        .hubspot-form-wrapper .hs-form {
          width: 100%;
        }
        
        .hubspot-form-wrapper .hs-error-msgs {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        
        .hubspot-form-wrapper .hs-form-required {
          color: #ef4444;
        }
        
        .hubspot-form-wrapper .submitted-message {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          padding: 2rem;
          border-radius: 0.5rem;
          text-align: center;
        }
        
        .hubspot-form-wrapper .hs-button {
          width: 100%;
          background: linear-gradient(to-right, #2563eb, #1d4ed8);
          color: white;
          font-weight: 600;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .hubspot-form-wrapper .hs-button:hover {
          transform: scale(1.05);
          background: linear-gradient(to-right, #1d4ed8, #1e40af);
        }
        
        .hubspot-form-wrapper .hs-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #111827;
          border: 1px solid #374151;
          border-radius: 0.5rem;
          color: white;
          font-size: 1rem;
        }
        
        .hubspot-form-wrapper .hs-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .hubspot-form-wrapper .hs-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #d1d5db;
          margin-bottom: 0.5rem;
        }
        
        .hubspot-form-wrapper .hs-form-field {
          margin-bottom: 1.5rem;
        }
        
        .hubspot-form-wrapper select.hs-input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }
        
        .hubspot-form-wrapper .hs-form-checkbox-display {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .hubspot-form-wrapper .hs-form-checkbox-display input {
          width: auto;
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  )
}