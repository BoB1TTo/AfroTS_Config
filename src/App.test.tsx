import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App wizard flow', () => {
  it('moves from welcome to business profile and blocks progression until required selections are made', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Start Configuration' }))

    expect(screen.getByRole('heading', { name: 'Business Profile' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next →' })).toBeDisabled()

    fireEvent.click(screen.getByText('Trading / Distribution'))
    fireEvent.click(screen.getByText('Middle East'))

    expect(screen.getByRole('button', { name: 'Next →' })).toBeEnabled()

    fireEvent.click(screen.getByRole('button', { name: 'Next →' }))

    expect(screen.getByRole('heading', { name: 'Business Size' })).toBeInTheDocument()
    expect(screen.getByText('How many employees do you have?')).toBeInTheDocument()
  })
})
