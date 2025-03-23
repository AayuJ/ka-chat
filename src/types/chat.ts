export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ChatResponse {
  answer: string
  sources?: string[]
  suggestions?: string[]
}

export interface ChatState {
  messages: ChatMessage[]
  isLoading: boolean
  error?: string
}