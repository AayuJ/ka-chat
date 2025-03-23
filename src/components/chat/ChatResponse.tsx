'use client'

import { ChatMessage } from '@/types/chat'

interface ChatResponseProps {
  message: ChatMessage
}

export const ChatResponse = ({ message }: ChatResponseProps) => {
  return (
    <div className={`${message.role === 'assistant' ? 'bg-white' : ''} rounded-lg p-4`}>
      {message.role === 'user' ? (
        <div className="text-lg">{message.content}</div>
      ) : (
        <div>
          <div className="whitespace-pre-wrap">{message.content}</div>
          <div className="text-right mt-2">
            <button className="text-sm text-gray-500 underline hover:text-gray-700">
              Sources
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatResponse