import { render, screen } from '@testing-library/react'
import { ChatResponse } from '@/components/chat/ChatResponse'
import { ChatMessage } from '@/types/chat'

describe('ChatResponse', () => {
  it('renders user message correctly', () => {
    const message: ChatMessage = {
      id: '1',
      role: 'user',
      content: 'Test question?',
      timestamp: Date.now(),
    }

    render(<ChatResponse message={message} />)
    expect(screen.getByText('Test question?')).toBeInTheDocument()
    expect(screen.queryByText('Sources')).not.toBeInTheDocument()
  })

  it('renders assistant message with sources button', () => {
    const message: ChatMessage = {
      id: '1',
      role: 'assistant',
      content: 'Test answer',
      timestamp: Date.now(),
    }

    render(<ChatResponse message={message} />)
    expect(screen.getByText('Test answer')).toBeInTheDocument()
    expect(screen.getByText('Sources')).toBeInTheDocument()
  })
})