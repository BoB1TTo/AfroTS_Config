import { describe, expect, it } from 'vitest'
import type { FormData } from '../../types/wizard'
import {
  calculatePackage,
  getDeveloperNeeds,
  getImplementationPhases,
  getPackageSummary,
  getRecommendations,
  getReportViewModel,
  getSelectedModules,
} from './reportSelectors'

const baseData: FormData = {
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
  clientNotes: '',
}

describe('reportSelectors', () => {
  it('calculates the correct package from size inputs', () => {
    expect(calculatePackage(baseData)).toBe('MB')
    expect(getPackageSummary({ ...baseData, employeeCount: '', locationCount: '', companyCount: '' })).toBe('—')
  })

  it('returns the selected modules in a stable list', () => {
    expect(getSelectedModules(baseData)).toEqual(['inventory', 'finance', 'trading'])
  })

  it('builds recommendations from region, standard, and platform choices', () => {
    const notes = getRecommendations(baseData)

    expect(notes).toEqual([
      'OHADA selected — French language support should be considered strongly for implementation and training.',
    ])
  })

  it('adds regional and connectivity notes when the input requires them', () => {
    const notes = getRecommendations({
      ...baseData,
      businessRegion: 'north_africa',
      languages: ['en'],
      platform: 'web',
    })

    expect(notes).toEqual([
      'OHADA selected — French language support should be considered strongly for implementation and training.',
      'Consider French support for North, West, or Central African users.',
      'Offline requirement conflicts with a web-only target. Desktop or hybrid delivery is recommended.',
    ])
  })

  it('builds developer needs and implementation phases', () => {
    expect(getDeveloperNeeds(baseData, getSelectedModules(baseData))).toEqual([
      'Target platform: Desktop app',
      'Accounting baseline: OHADA',
      'Language pack: English, French',
      'Connectivity mode: Offline-capable implementation required',
      'Head office hierarchy and cross-branch reporting should be included.',
      'Multi-company data partitioning and consolidated reporting should be planned.',
      'Finance configuration should include an OHADA-ready chart of accounts structure.',
    ])

    expect(getImplementationPhases(getSelectedModules(baseData))).toEqual([
      'Project setup, environment preparation, and shared master data',
      'Core business flows for the selected modules',
      'Reporting, permissions, language support, and final acceptance preparation',
    ])
  })

  it('returns a full report view model', () => {
    const viewModel = getReportViewModel(baseData)

    expect(viewModel.packageCode).toBe('MB')
    expect(viewModel.packageInfo.label).toBe('Medium Business')
    expect(viewModel.selectedModules).toEqual(['inventory', 'finance', 'trading'])
    expect(viewModel.recommendations).toHaveLength(1)
    expect(viewModel.developerNeeds).toHaveLength(7)
  })
})
