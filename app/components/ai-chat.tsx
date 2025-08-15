'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, Bot, User, Sparkles, X, Volume2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    adCopy?: string[]
    keywords?: string[]
    recommendations?: string[]
  }
}

interface ChatState {
  messages: Message[]
  isLoading: boolean
  isListening: boolean
  context: {
    industry?: string
    platform?: string
    budget?: string
    goals?: string[]
  }
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hi! I\'m your AI Marketing Consultant. I can help you optimize your campaigns, generate ad copy, suggest keywords, and share predictive insights. What marketing challenge can I help you solve today?',
        timestamp: new Date()
      }
    ],
    isLoading: false,
    isListening: false,
    context: {}
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognition = useRef<any>(null)
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition()
      recognition.current.continuous = false
      recognition.current.interimResults = false
      recognition.current.lang = 'en-US'
      
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setChatState(prev => ({ ...prev, isListening: false }))
      }
      
      recognition.current.onerror = () => {
        setChatState(prev => ({ ...prev, isListening: false }))
      }
    }
  }, [])
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatState.messages])
  
  const toggleVoice = () => {
    if (!recognition.current) return
    
    if (chatState.isListening) {
      recognition.current.stop()
      setChatState(prev => ({ ...prev, isListening: false }))
    } else {
      recognition.current.start()
      setChatState(prev => ({ ...prev, isListening: true }))
    }
  }
  
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || chatState.isLoading) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }))
    
    setInput('')
    
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          messages: chatState.messages,
          context: chatState.context
        })
      })
      
      const data = await response.json()
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        metadata: data.metadata
      }
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
        context: { ...prev.context, ...data.contextUpdate }
      }))
      
      // Collect lead data if certain thresholds are met
      if (chatState.messages.length > 3 && !localStorage.getItem('lead_captured')) {
        setTimeout(() => {
          setChatState(prev => ({
            ...prev,
            messages: [...prev.messages, {
              id: Date.now().toString(),
              role: 'assistant',
              content: 'By the way, I can create a free custom Intelligence Report for your business. Would you like me to analyze your market for hidden opportunities?',
              timestamp: new Date()
            }]
          }))
        }, 2000)
      }
      
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        messages: [...prev.messages, {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
          timestamp: new Date()
        }]
      }))
    }
  }
  
  const suggestedQuestions = [
    'How can I optimize my Bing ads for e-commerce?',
    'Generate ad copy for a B2B SaaS product',
    'What keywords should I target for AI consulting?',
    'How do I reduce my Google Ads CPA?'
  ]
  
  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 z-40 group"
        aria-label="Open AI Marketing Consultant"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute -top-12 right-0 bg-black/90 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Marketing Consultant
        </div>
      </button>
      
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col border border-gray-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-t-2xl border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Bot className="w-8 h-8 text-blue-400" />
                    <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Marketing Consultant</h3>
                    <p className="text-sm text-gray-400">Powered by Predictive Intelligence</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatState.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-300'
                    } rounded-2xl px-4 py-3`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      
                      {/* Render metadata if available */}
                      {message.metadata && (
                        <div className="mt-4 space-y-3">
                          {message.metadata.adCopy && (
                            <div className="bg-gray-900/50 rounded-lg p-3">
                              <p className="text-sm font-semibold text-blue-400 mb-2">Generated Ad Copy:</p>
                              {message.metadata.adCopy.map((copy, idx) => (
                                <div key={idx} className="mb-2 p-2 bg-gray-800/50 rounded">
                                  <p className="text-sm">{copy}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {message.metadata.keywords && (
                            <div className="bg-gray-900/50 rounded-lg p-3">
                              <p className="text-sm font-semibold text-purple-400 mb-2">Suggested Keywords:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.metadata.keywords.map((keyword, idx) => (
                                  <span key={idx} className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => speakText(message.content)}
                          className="mt-2 text-xs text-gray-400 hover:text-white transition-colors"
                          aria-label="Read message aloud"
                        >
                          <Volume2 className="w-4 h-4 inline mr-1" />
                          Read aloud
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {chatState.isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-800 rounded-2xl px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggested Questions */}
            {chatState.messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-400 mb-2">Try asking:</p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(question)}
                      className="text-left text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-gray-800">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={toggleVoice}
                  disabled={!recognition.current}
                  className={`p-3 rounded-lg transition-colors ${
                    chatState.isListening 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                  aria-label={chatState.isListening ? 'Stop recording' : 'Start voice input'}
                >
                  {chatState.isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
                
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about campaigns, keywords, ad copy..."
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={chatState.isLoading}
                />
                
                <button
                  type="submit"
                  disabled={!input.trim() || chatState.isLoading}
                  className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}