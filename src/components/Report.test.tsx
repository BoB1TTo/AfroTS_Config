import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { FormData } from '../types/wizard'
import Report from './Report'

const reportData: FormData = {
  businessType: 'trading',
  businessRegion: 'west_africa',
  country: '',
  employeeCount: '25-100',
  locationCount: '4-10',
  companyCount: '2-5',
  hasHeadOffice: true,
  modules: {
    inventory: true,
    finance: true,
    hr: false,
    trading: true,
    manufacturing: false,
    pos: false,
    projects: false,
  },
  platform: 'desktop',
  accountingStd: 'ohada',
  languages: ['en', 'fr'],
  offlineNeeded: true,
  includeClientInfo: true,
  clientCompany: 'Afro Trading Ltd',
  clientContact: 'Ahmed Ali',
  clientPhone: '+221 77 000 0000',
  clientEmail: 'hello@afrotrading.example',
  clientAddress: 'Main Road',
  clientCity: 'Dakar',
  clientCountry: 'Senegal',
  clientWebsite: 'afrotrading.example',
  clientNotes: 'Bring the quote to the meeting.',
}

describe('Report', () => {
  it('renders the report summary and actions', () => {
    const onBack = vi.fn()
    const onRestart = vi.fn()

    render(<Report data={reportData} onBack={onBack} onRestart={onRestart} />)

    expect(screen.getByText('ABMS CONFIGURATION REPORT')).toBeInTheDocument()
    expect(screen.getByText('Medium Business')).toBeInTheDocument()
    expect(screen.getByText('Prepared For')).toBeInTheDocument()
    expect(screen.getByText('Print Report')).toBeInTheDocument()
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Start Over')).toBeInTheDocument()
    expect(screen.getByText('Selected Modules (3)')).toBeInTheDocument()
    expect(screen.getByText('Languages (2)')).toBeInTheDocument()
  })
})
