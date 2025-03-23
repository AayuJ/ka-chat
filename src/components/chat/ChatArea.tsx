'use client'

import { useState } from 'react'
import { ChatMessage } from '@/types/chat'
import ChatResponse from './ChatResponse'
import ChatInput from './ChatInput'

export const ChatArea = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'user',
      content: "What's our parental leave policy?",
      timestamp: Date.now(),
    },
    {
      id: '2',
      role: 'assistant',
      content: `Our parental leave policy includes:
- 12 weeks of paid parental leave
- Must be used within 12 months of birth or adoption
- Additional 4 weeks for primary caregivers
- 30-day notice required before taking leave`,
      timestamp: Date.now(),
    },
  ])

  const handleSendMessage = async (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, newMessage])

    // TODO: Implement actual API call
    // For now, just mock a response after a delay
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a mock response. The actual implementation will connect to your backend.',
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="space-y-6">
        {messages.map((message) => (
          <ChatResponse key={message.id} message={message} />
        ))}
      </div>
      <div className="mt-6">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default ChatArea