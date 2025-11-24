import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

// Mock the useMediaQuery hook
jest.mock('../../hooks/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}))

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('PARTNERS HUB INDONESIA')
  })

  it('renders the subtitle text', () => {
    render(<Hero />)
    
    const subtitle = screen.getByText(/Empowering businesses to reach their full potential/i)
    expect(subtitle).toBeInTheDocument()
  })
})

