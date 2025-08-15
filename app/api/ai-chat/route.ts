import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Lazy initialize OpenAI client
let openai: OpenAI | null = null

function getOpenAIClient() {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey || apiKey === 'your-openai-api-key-here') {
      throw new Error('OpenAI API key not configured')
    }
    openai = new OpenAI({ apiKey })
  }
  return openai
}

// Marketing-specific system prompt
const SYSTEM_PROMPT = `You are an expert AI Marketing Consultant for Hendricks.AI, specializing in predictive AI marketing, Google Performance Max, and Bing Performance Max campaigns.

Your expertise includes:
- Predictive demand forecasting (2-4 weeks in advance with 74% accuracy)
- Google and Bing Performance Max optimization
- Ad copy generation and A/B testing strategies
- Keyword research and competitive analysis
- ROI optimization and budget allocation
- B2B and e-commerce marketing strategies

Key facts about Hendricks.AI:
- We achieve 312% average ROI for clients
- Our predictive models analyze 2.8M+ data points daily
- We're the only agency mastering both Google AND Bing Performance Max
- We help brands capture demand before competitors even see it coming

Your responses should:
1. Be helpful, specific, and actionable
2. Generate ad copy when requested (include headlines, descriptions, CTAs)
3. Suggest keywords with estimated search volume and competition levels
4. Provide data-driven recommendations
5. Subtly guide users toward booking a strategy call or requesting an Intelligence Report
6. Collect context about their business (industry, budget, goals) naturally through conversation

When generating ad copy, follow these best practices:
- Headlines: Max 30 characters for Google, compelling and benefit-focused
- Descriptions: 90 characters max, include social proof or urgency
- Use power words and emotional triggers
- Include numbers and specifics when possible`

// Context extraction patterns
const CONTEXT_PATTERNS = {
  industry: /(?:industry|business|company|sell|provide|offer|service|product)/i,
  budget: /(?:budget|spend|invest|cost|price|\$|dollar)/i,
  platform: /(?:google|bing|facebook|meta|linkedin|tiktok)/i,
  goals: /(?:goal|objective|achieve|want|need|looking|trying)/i,
}

// Generate marketing-specific responses
async function generateMarketingResponse(
  message: string,
  context: any,
  conversationHistory: any[]
) {
  // Check for specific marketing requests
  const isAdCopyRequest = /(?:ad copy|ad text|write ads?|create ads?|generate ads?)/i.test(message)
  const isKeywordRequest = /(?:keywords?|search terms?|queries)/i.test(message)
  const isOptimizationRequest = /(?:optimize|improve|enhance|boost|increase)/i.test(message)
  
  // Build conversation history for context
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-10).map((msg: any) => ({
      role: msg.role,
      content: msg.content
    })),
    { role: 'user', content: message }
  ]
  
  try {
    const client = getOpenAIClient()
    const completion = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 800,
    })
    
    const response = completion.choices[0].message.content || ''
    
    // Extract metadata based on response type
    const metadata: any = {}
    
    // Extract ad copy if generated
    if (isAdCopyRequest) {
      const adCopyMatches = response.match(/(?:Headline|Title|H1|H2|H3):\s*(.+?)(?:\n|$)/gi)
      if (adCopyMatches) {
        metadata.adCopy = adCopyMatches.map(match => match.replace(/(?:Headline|Title|H1|H2|H3):\s*/i, '').trim())
      }
    }
    
    // Extract keywords if provided
    if (isKeywordRequest) {
      const keywordSection = response.match(/(?:Keywords?|Search Terms?)[\s\S]*?(?=\n\n|$)/i)
      if (keywordSection) {
        const keywords = keywordSection[0]
          .split('\n')
          .filter(line => line.includes('-') || line.includes('•') || line.match(/^\d+\./))
          .map(line => line.replace(/^[\d\-•*\s]+/, '').trim())
          .filter(k => k.length > 0)
        
        if (keywords.length > 0) {
          metadata.keywords = keywords.slice(0, 10) // Limit to 10 keywords
        }
      }
    }
    
    // Extract context updates
    const contextUpdate: any = {}
    
    // Extract industry
    if (!context.industry && CONTEXT_PATTERNS.industry.test(message)) {
      const industryMatch = message.match(/(?:in|for|selling|providing)\s+(\w+(?:\s+\w+)?)\s+(?:industry|business|products?|services?)/i)
      if (industryMatch) {
        contextUpdate.industry = industryMatch[1]
      }
    }
    
    // Extract budget
    if (!context.budget && CONTEXT_PATTERNS.budget.test(message)) {
      const budgetMatch = message.match(/\$?([\d,]+(?:k|K|m|M)?)\s*(?:per\s+)?(?:month|monthly|year|annually)?/i)
      if (budgetMatch) {
        contextUpdate.budget = budgetMatch[0]
      }
    }
    
    // Extract platform preferences
    if (!context.platform && CONTEXT_PATTERNS.platform.test(message)) {
      const platforms = []
      if (/google/i.test(message)) platforms.push('Google')
      if (/bing/i.test(message)) platforms.push('Bing')
      if (/facebook|meta/i.test(message)) platforms.push('Meta')
      if (/linkedin/i.test(message)) platforms.push('LinkedIn')
      if (platforms.length > 0) {
        contextUpdate.platform = platforms.join(', ')
      }
    }
    
    // Lead qualification check
    const shouldQualify = conversationHistory.length > 3 && 
      (context.industry || context.budget || context.platform) &&
      !context.qualified
    
    if (shouldQualify) {
      contextUpdate.qualified = true
    }
    
    return {
      message: response,
      metadata,
      contextUpdate,
      shouldShowCTA: shouldQualify
    }
    
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw error
  }
}

export async function POST(req: NextRequest) {
  let message = ''
  
  try {
    const body = await req.json()
    message = body.message
    const messages = body.messages
    const context = body.context
    
    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      )
    }
    
    // Generate response
    const result = await generateMarketingResponse(message, context, messages)
    
    // Add CTA if qualified
    let finalMessage = result.message
    if (result.shouldShowCTA) {
      finalMessage += '\n\n💡 Based on our conversation, I can create a free custom Intelligence Report showing hidden opportunities in your market. Would you like me to analyze your competitive landscape?'
    }
    
    return NextResponse.json({
      message: finalMessage,
      metadata: result.metadata,
      contextUpdate: result.contextUpdate
    })
    
  } catch (error) {
    console.error('Chat API Error:', error)
    
    // Fallback responses for common scenarios
    const fallbackResponses = {
      adCopy: `I'd be happy to help you create compelling ad copy! Here's a framework to get started:

**Headline Formula:**
[Benefit] + [Specificity] + [Urgency]
Example: "Increase ROAS 312% - AI Marketing Insights"

**Description Best Practices:**
- Lead with the main benefit
- Include social proof (numbers/stats)
- Clear call-to-action
- Create urgency or exclusivity

Would you like me to create specific ad copy for your business? Just tell me about your product/service and target audience.`,
      
      keywords: `For keyword research, I recommend this approach:

**Keyword Categories:**
1. **Brand Terms** - Your company/product names
2. **Category Terms** - Industry-specific keywords
3. **Competitor Terms** - Competitor brand names
4. **Long-tail Keywords** - Specific phrases with buying intent

**Tools to Consider:**
- Google Keyword Planner (free)
- SEMrush or Ahrefs (paid)
- Our predictive models identify emerging keywords 2-4 weeks early

What industry are you in? I can suggest specific keywords for your niche.`,
      
      general: `I'm here to help optimize your marketing campaigns! I can assist with:

🎯 **Ad Copy Generation** - Compelling headlines and descriptions
🔍 **Keyword Research** - High-intent search terms for your industry
📊 **Campaign Optimization** - Improve ROAS and reduce CPA
🤖 **Predictive Insights** - Spot trends before competitors

What specific challenge are you facing with your marketing?`
    }
    
    // Determine fallback type
    let fallbackMessage = fallbackResponses.general
    if (/ad copy|write ad/i.test(message)) {
      fallbackMessage = fallbackResponses.adCopy
    } else if (/keyword/i.test(message)) {
      fallbackMessage = fallbackResponses.keywords
    }
    
    return NextResponse.json({
      message: fallbackMessage,
      metadata: {},
      contextUpdate: {}
    })
  }
}