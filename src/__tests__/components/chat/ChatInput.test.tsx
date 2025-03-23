import { render, screen, fireEvent } from '@testing-library/react'
import { ChatInput } from '@/components/chat/ChatInput'

describe('ChatInput', () => {
  it('handles message submission', () => {
    const mockSendMessage = jest.fn()
    render(<ChatInput onSendMessage={mockSendMessage} />)

    const input = screen.getByPlaceholderText('Ask a follow-up question...')
    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.submit(input)

    expect(mockSendMessage).toHaveBeenCalledWith('Test message')
    expect(input).toHaveValue('')
  })

  it('does not submit empty messages', () => {
    const mockSendMessage = jest.fn()
    render(<ChatInput onSendMessage={mockSendMessage} />)

    const input = screen.getByPlaceholderText('Ask a follow-up question...')
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.submit(input)

    expect(mockSendMessage).not.toHaveBeenCalled()
  })
})