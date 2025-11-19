import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 1. Fetch Website Content (Simple fetch)
    const siteResponse = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HendricksAI/1.0)' },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!siteResponse.ok) {
      throw new Error(`Failed to fetch site: ${siteResponse.statusText}`);
    }

    const html = await siteResponse.text();
    // Basic text extraction (remove tags)
    const textContent = html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 5000);

    // 2. Prompt Gemini
    const prompt = `
      Analyze the following B2B website content for "AI Search Visibility" (how well it might rank in ChatGPT/Gemini).

      Website Content:
      ${textContent}

      Return a JSON object with exactly these fields:
      - score: integer (0-100)
      - sentiment: string (one of: Positive, Neutral, Mixed, Promising)
      - gaps: list of strings (3 specific technical or content gaps)
      - visibility: string (High, Moderate, Low)

      Be critical but fair. Return ONLY valid JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown if present
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(jsonStr);

    return NextResponse.json(data);

  } catch (error) {
    console.error('Analysis Error:', error);
    return NextResponse.json(
      {
        score: 0,
        sentiment: 'Error',
        gaps: ['Analysis failed. Please check the URL or try again later.'],
        visibility: 'None'
      },
      { status: 500 }
    );
  }
}
