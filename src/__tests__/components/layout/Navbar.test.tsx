import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

describe('Navbar', () => {
  it('renders logo and navigation links', () => {
    render(<Navbar />)
    
    // Check if logo is present
    expect(screen.getByText('KA')).toBeInTheDocument()
    
    // Check if navigation links are present
    expect(screen.getByText('Knowledge')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    
    // Check if links have correct href attributes
    expect(screen.getByText('Knowledge').closest('a')).toHaveAttribute('href', '/knowledge')
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '/projects')
  })
})