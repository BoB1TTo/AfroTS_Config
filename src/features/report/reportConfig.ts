// ================================================================
//  src/features/report/reportConfig.ts
//  Report labels and static domain configuration
//  Used by: reportSelectors.ts and Report.tsx
//  Date: 27Mar2026
// ================================================================

import type { ModuleKey, ModuleLabel, ModuleTechDetail, PackageCode, PackageInfo } from '../../types/wizard'


// ================================================================
//  [1] PACKAGE INFO
// ================================================================

export const PACKAGE_INFO: Record<PackageCode, PackageInfo> = {
  SB: {
    label: 'Small Business',
    clientLabel: 'Starter Package',
    users: 'Up to 10 users',
    color: '#2d6a9f',
    bg: '#e8f4fd',
    desc: 'Perfect for small single-location businesses',
    clientDesc: 'A focused package for a small business starting with core digital operations.',
    includes: [
      'HR basics — employees, leave, payroll',
      'Finance basics — invoices, payments',
      '1 business module',
      'Single location',
      'Basic reports',
      '1 language',
    ],
  },
  'SB+': {
    label: 'Small Business Advanced',
    clientLabel: 'Growth Package',
    users: 'Up to 25 users',
    color: '#27ae60',
    bg: '#eaf7ee',
    desc: 'For growing businesses with multiple locations',
    clientDesc: 'A flexible package for a growing business with more than one branch or team.',
    includes: [
      'Full HR module',
      'Full Finance module',
      'Up to 3 branches',
      'COA standard switcher',
      'Up to 2 languages',
      'PDF + Excel export',
      'Inter-branch stock transfers',
      'Leave approval workflow',
    ],
  },
  MB: {
    label: 'Medium Business',
    clientLabel: 'Business Expansion Package',
    users: 'Up to 100 users',
    color: '#e8a020',
    bg: '#fef6e8',
    desc: 'For businesses with multiple companies and branches',
    clientDesc: 'A broader package built for larger teams, multiple branches, and more advanced reporting.',
    includes: [
      'All core modules',
      'Up to 2 business modules',
      'Up to 3 companies',
      'Unlimited branches',
      'GAAP / IFRS / OHADA switcher',
      'All 3 languages (EN + AR + FR)',
      'Consolidated reports',
      'Terminology customization',
      'Department → Section → Unit hierarchy',
      'Advanced COA mapping tool',
    ],
  },
  LB: {
    label: 'Large Business',
    clientLabel: 'Enterprise Package',
    users: 'Unlimited users',
    color: '#c0392b',
    bg: '#fdecea',
    desc: 'Full enterprise — unlimited scale',
    clientDesc: 'A full enterprise package for complex organizations with advanced operational needs.',
    includes: [
      'All modules included',
      'Full org → company → HO → branch hierarchy',
      'All languages including Spanish + Portuguese',
      'Intercompany transactions',
      'Group consolidation reports',
      'Public API access',
      'Custom modules',
      'Dedicated server option',
      'SLA priority support',
      'Branch offline + sync mode',
    ],
  },
}


// ================================================================
//  [2] LABEL MAPS
// ================================================================

export const MODULE_LABELS: Record<ModuleKey, ModuleLabel> = {
  inventory: {
    client: 'Inventory and stock control',
    dev: 'Inventory & Stock',
  },
  finance: {
    client: 'Finance and accounting',
    dev: 'Finance & Accounting',
  },
  hr: {
    client: 'HR and payroll',
    dev: 'HR & Payroll',
  },
  trading: {
    client: 'Trading and order handling',
    dev: 'Trading & Orders',
  },
  manufacturing: {
    client: 'Manufacturing operations',
    dev: 'Manufacturing',
  },
  pos: {
    client: 'Point of sale',
    dev: 'Point of Sale',
  },
  projects: {
    client: 'Project delivery',
    dev: 'Project Management',
  },
}

export const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  ar: 'Arabic',
  fr: 'French',
  es: 'Spanish',
  pt: 'Portuguese',
}

export const REGION_LABELS: Record<string, string> = {
  middle_east: 'Middle East',
  north_africa: 'North Africa',
  central_africa: 'Central Africa',
  west_africa: 'West Africa',
  east_africa: 'East Africa',
  europe: 'Europe',
  americas: 'Americas',
  international: 'International',
}

export const PLATFORM_LABELS: Record<string, string> = {
  web: 'Web browser',
  desktop: 'Desktop app',
  both: 'Web and desktop',
}

export const ACCOUNTING_LABELS: Record<string, string> = {
  ifrs: 'IFRS',
  gaap: 'GAAP',
  ohada: 'OHADA',
}


// ================================================================
//  [3] TECHNICAL DETAILS
// ================================================================

export const MODULE_TECH_DETAILS: Record<ModuleKey, ModuleTechDetail> = {
  inventory: {
    services: ['inventory-service', 'warehouse-service'],
    database: 'abms_inventory_db',
    routes: ['/products', '/warehouses', '/stock-movements'],
    notes: 'Track products, stock balances, branch transfers, and reorder workflows.',
  },
  finance: {
    services: ['finance-service'],
    database: 'abms_finance_db',
    routes: ['/invoices', '/payments', '/journal-entries', '/chart-of-accounts'],
    notes: 'Enable accounting books, document posting, and financial statements.',
  },
  hr: {
    services: ['hr-service'],
    database: 'abms_hr_db',
    routes: ['/employees', '/attendance', '/leave', '/payroll'],
    notes: 'Support employee records, attendance flows, and payroll processing.',
  },
  trading: {
    services: ['trading-service'],
    database: 'abms_trading_db',
    routes: ['/sales-orders', '/purchase-orders', '/vendors'],
    notes: 'Handle order lifecycle, supplier records, and commercial documents.',
  },
  manufacturing: {
    services: ['manufacturing-service'],
    database: 'abms_manufacturing_db',
    routes: ['/bom', '/production-orders', '/work-centers'],
    notes: 'Manage bill of materials, production planning, and shop-floor status.',
  },
  pos: {
    services: ['pos-service'],
    database: 'abms_pos_db',
    routes: ['/pos-sales', '/registers', '/receipts'],
    notes: 'Cover front-counter sales, cashier sessions, and end-of-day closing.',
  },
  projects: {
    services: ['projects-service'],
    database: 'abms_projects_db',
    routes: ['/projects', '/tasks', '/timesheets', '/milestones'],
    notes: 'Track project delivery, effort, milestones, and project billing hooks.',
  },
}
