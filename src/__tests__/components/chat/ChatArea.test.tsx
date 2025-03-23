import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ChatArea } from '@/components/chat/ChatArea'

describe('ChatArea', () => {
  it('renders initial messages', () => {
    render(<ChatArea />)
    
    expect(screen.getByText("What's our parental leave policy?")).toBeInTheDocument()
    expect(screen.getByText(/12 weeks of paid parental leave/)).toBeInTheDocument()
  })

  it('allows sending new messages', async () => {
    render(<ChatArea />)
    
    const input = screen.getByPlaceholderText('Ask a follow-up question...')
    fireEvent.change(input, { target: { value: 'How do I apply?' } })
    fireEvent.submit(input)

    // Check if user message appears
    expect(screen.getByText('How do I apply?')).toBeInTheDocument()

    // Wait for mock response
    await waitFor(() => {
      expect(screen.getByText(/This is a mock response/)).toBeInTheDocument()
    })
  })
})