// ================================================================
//  src/types/wizard.ts
//  Shared wizard types for the AfroTech Suite configurator
//  Used by: app config, report selectors, App.tsx, Report.tsx
//  Date: 27Mar2026
// ================================================================

export type ModuleKey =
  | 'inventory'
  | 'finance'
  | 'hr'
  | 'trading'
  | 'manufacturing'
  | 'pos'
  | 'projects'

export type PackageCode = 'SB' | 'SB+' | 'MB' | 'LB'

export type ToolLanguage = 'EN' | 'FR' | 'AR'

export interface ThemeOption {
  key: string
  label: string
  primary: string
  secondary: string
  accent: string
}

export interface NavStep {
  step: number
  label: string
}

export interface FormData {
  businessType: string
  businessRegion: string
  country: string
  employeeCount: string
  locationCount: string
  companyCount: string
  hasHeadOffice: boolean
  modules: Record<ModuleKey, boolean>
  platform: string
  accountingStd: string
  languages: string[]
  offlineNeeded: boolean
  includeClientInfo: boolean
  clientCompany: string
  clientContact: string
  clientPhone: string
  clientEmail: string
  clientAddress: string
  clientCity: string
  clientCountry: string
  clientWebsite: string
  clientNotes: string
}

export interface PackageInfo {
  label: string
  clientLabel: string
  users: string
  color: string
  bg: string
  desc: string
  clientDesc: string
  includes: string[]
}

export interface ModuleLabel {
  client: string
  dev: string
}

export interface ModuleTechDetail {
  services: string[]
  database: string
  routes: string[]
  notes: string
}

export interface ReportViewModel {
  packageCode: PackageCode
  packageInfo: PackageInfo
  selectedModules: ModuleKey[]
  recommendations: string[]
  developerNeeds: string[]
  implementationPhases: string[]
}
