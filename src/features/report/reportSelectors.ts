// ================================================================
//  src/features/report/reportSelectors.ts
//  Report domain selectors and derived logic
//  Used by: Report.tsx and App.tsx
//  Date: 27Mar2026
// ================================================================

import type { FormData, ModuleKey, PackageCode, ReportViewModel } from '../../types/wizard'
import {
  ACCOUNTING_LABELS,
  LANGUAGE_LABELS,
  PACKAGE_INFO,
  PLATFORM_LABELS,
} from './reportConfig'


// ================================================================
//  [1] PACKAGE LOGIC
// ================================================================

export const calculatePackage = (data: FormData): PackageCode => {
  if (
    data.employeeCount === '100+' ||
    data.locationCount === '10+' ||
    data.companyCount === '5+'
  ) return 'LB'

  if (
    data.employeeCount === '25-100' ||
    data.locationCount === '4-10' ||
    data.companyCount === '2-5'
  ) return 'MB'

  if (
    data.employeeCount === '10-25' ||
    data.locationCount === '2-3'
  ) return 'SB+'

  return 'SB'
}

export const getPackageSummary = (data: FormData): PackageCode | '—' => {
  if (!data.employeeCount && !data.locationCount && !data.companyCount) {
    return '—'
  }

  return calculatePackage(data)
}


// ================================================================
//  [2] REPORT DATA
// ================================================================

export const getSelectedModules = (data: FormData): ModuleKey[] => {
  return Object.entries(data.modules || {})
    .filter(([, active]) => active)
    .map(([key]) => key as ModuleKey)
}

export const getRecommendations = (data: FormData): string[] => {
  const notes: string[] = []

  if (data.accountingStd === 'ohada') {
    notes.push('OHADA selected — French language support should be considered strongly for implementation and training.')
  } else if (data.accountingStd === 'gaap') {
    notes.push('GAAP selected — align financial configuration with US-style accounting expectations.')
  } else {
    notes.push('IFRS selected — configuration should follow international reporting conventions.')
  }

  const langs = data.languages || []
  if (data.businessRegion === 'middle_east' && !langs.includes('ar')) {
    notes.push('Consider Arabic support for stronger adoption in Middle East deployments.')
  }

  if (
    ['north_africa', 'west_africa', 'central_africa'].includes(data.businessRegion) &&
    !langs.includes('fr')
  ) {
    notes.push('Consider French support for North, West, or Central African users.')
  }

  if (data.offlineNeeded && data.platform === 'web') {
    notes.push('Offline requirement conflicts with a web-only target. Desktop or hybrid delivery is recommended.')
  }

  return notes
}

export const getDeveloperNeeds = (data: FormData, selectedModules: ModuleKey[]): string[] => {
  const needs: string[] = []

  needs.push(`Target platform: ${PLATFORM_LABELS[data.platform] || 'Not specified'}`)
  needs.push(`Accounting baseline: ${ACCOUNTING_LABELS[data.accountingStd] || 'Not specified'}`)
  needs.push(`Language pack: ${(data.languages || ['en']).map(lang => LANGUAGE_LABELS[lang] || lang).join(', ')}`)
  needs.push(`Connectivity mode: ${data.offlineNeeded ? 'Offline-capable implementation required' : 'Standard online/LAN operation'}`)

  if (data.hasHeadOffice) {
    needs.push('Head office hierarchy and cross-branch reporting should be included.')
  }

  if (data.companyCount && data.companyCount !== '1') {
    needs.push('Multi-company data partitioning and consolidated reporting should be planned.')
  }

  if (selectedModules.includes('finance') && data.accountingStd === 'ohada') {
    needs.push('Finance configuration should include an OHADA-ready chart of accounts structure.')
  }

  return needs
}

export const getImplementationPhases = (selectedModules: ModuleKey[]): string[] => {
  const phases = [
    'Project setup, environment preparation, and shared master data',
    'Core business flows for the selected modules',
    'Reporting, permissions, language support, and final acceptance preparation',
  ]

  if (selectedModules.length >= 4) {
    phases.splice(2, 0, 'Module integration, cross-module workflows, and technical hardening')
  }

  return phases
}

export const getReportViewModel = (data: FormData): ReportViewModel => {
  const packageCode = calculatePackage(data)
  const selectedModules = getSelectedModules(data)

  return {
    packageCode,
    packageInfo: PACKAGE_INFO[packageCode],
    selectedModules,
    recommendations: getRecommendations(data),
    developerNeeds: getDeveloperNeeds(data, selectedModules),
    implementationPhases: getImplementationPhases(selectedModules),
  }
}
