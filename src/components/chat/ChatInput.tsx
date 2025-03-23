'use client'

import { useState } from 'react'
import ActionButtons from './ActionButtons'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a follow-up question..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
      <ActionButtons />
    </div>
  )
}

export default ChatInput