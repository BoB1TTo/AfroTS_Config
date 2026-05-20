// ================================================================
//  src/app/config/wizardConfig.ts
//  Wizard state and shell configuration
//  Used by: App.tsx and future wizard modules
//  Date: 27Mar2026
// ================================================================

import type { FormData, NavStep, ThemeOption, ToolLanguage } from '../../types/wizard'


// ================================================================
//  [1] INITIAL STATE
// ================================================================

export const INITIAL_FORM_DATA: FormData = {
  businessType: '',
  businessRegion: '',
  country: '',
  employeeCount: '',
  locationCount: '',
  companyCount: '',
  hasHeadOffice: false,
  modules: {
    inventory: true,
    finance: true,
    hr: false,
    trading: false,
    manufacturing: false,
    pos: false,
    projects: false,
  },
  platform: '',
  accountingStd: '',
  languages: ['en'],
  offlineNeeded: false,
  includeClientInfo: true,
  clientCompany: '',
  clientContact: '',
  clientPhone: '',
  clientEmail: '',
  clientAddress: '',
  clientCity: '',
  clientCountry: '',
  clientWebsite: '',
  clientNotes: '',
}


// ================================================================
//  [2] THEMES
// ================================================================

export const THEMES: ThemeOption[] = [
  {
    key: 'navy',
    label: 'Classic Navy',
    primary: '#1a3c5e',
    secondary: '#2d6a9f',
    accent: '#e8a020',
  },
  {
    key: 'dark',
    label: 'Executive Dark',
    primary: '#1c1c2e',
    secondary: '#2a2a4e',
    accent: '#f0c040',
  },
  {
    key: 'forest',
    label: 'Forest',
    primary: '#1a4731',
    secondary: '#27ae60',
    accent: '#f0a500',
  },
  {
    key: 'purple',
    label: 'Royal Purple',
    primary: '#2d1b5e',
    secondary: '#5e35b1',
    accent: '#e040a0',
  },
  {
    key: 'teal',
    label: 'Ocean Teal',
    primary: '#0d3d4f',
    secondary: '#0d6e8a',
    accent: '#00e5c0',
  },
  {
    key: 'crimson',
    label: 'Crimson',
    primary: '#5e1a1a',
    secondary: '#922b21',
    accent: '#f39c12',
  },
]


// ================================================================
//  [3] NAVIGATION
// ================================================================

export const NAV_STEPS: NavStep[] = [
  { step: 1, label: 'Welcome' },
  { step: 2, label: 'Business Profile' },
  { step: 3, label: 'Business Size' },
  { step: 4, label: 'Module Selection' },
  { step: 5, label: 'Tech Preferences' },
  { step: 6, label: 'Client Information' },
  { step: 7, label: 'Report' },
]

export const TOOL_LANGUAGES: ToolLanguage[] = ['EN', 'FR', 'AR']
