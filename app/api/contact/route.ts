import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Add timestamp
    const submission = {
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    }
    
    // Define the path for submissions
    const submissionsPath = path.join(process.cwd(), 'submissions.json')
    
    // Read existing submissions or create new array
    let submissions = []
    try {
      const fileContent = await fs.readFile(submissionsPath, 'utf-8')
      submissions = JSON.parse(fileContent)
    } catch (error) {
      // File doesn't exist yet, start with empty array
      submissions = []
    }
    
    // Add new submission
    submissions.push(submission)
    
    // Save back to file
    await fs.writeFile(submissionsPath, JSON.stringify(submissions, null, 2))
    
    // Log to console for immediate visibility
    console.log('New contact form submission:', submission)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for contacting Hendricks.AI! We\'ll analyze your requirements and send you a custom intelligence report within 24 hours.'
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, message: 'There was an error submitting your form. Please try again.' },
      { status: 500 }
    )
  }
}