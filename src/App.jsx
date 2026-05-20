// ================================================================
//  AfroTech Suite — App.jsx
//  Main wizard controller — Dashboard Pro Layout
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] IMPORTS
//  [2] INITIAL STATE
//  [3] THEMES
//  [4] SIDEBAR NAV CONFIG
//  [5] APP COMPONENT
//      [5.1] State
//      [5.2] Navigation
//      [5.3] Data update
//      [5.4] Toolbox handlers
//      [5.5] Theme + dark mode effect
//  [6] METRIC CALCULATIONS
//  [7] STEP RENDERER
//  [8] RENDER
//  [9] EXPORT
//
//  WIZARD FLOW:
//  Step 1: Welcome
//  Step 2: Business Profile
//  Step 3: Size Assessment
//  Step 4: Module Selection
//  Step 5: Technical Preferences
//  Step 6: Client Information
//  Step 7: Report
// ================================================================


// ================================================================
//  [1] IMPORTS
// ================================================================

import { useState, useEffect } from 'react'
import Welcome          from './components/Welcome'
import BusinessProfile  from './components/BusinessProfile'
import SizeAssessment   from './components/SizeAssessment'
import ModuleSelection  from './components/ModuleSelection'
import TechPreferences  from './components/TechPreferences'
import ClientInfo       from './components/ClientInfo'
import Report           from './components/Report'
import './App.css'


// ================================================================
//  [2] INITIAL STATE
//  Default values for all wizard fields
// ================================================================

const initialData = {

  // ── Step 2 — Business Profile ─────────────────────────────────
  businessType:   '',
  businessRegion: '',
  country:        '',

  // ── Step 3 — Size Assessment ──────────────────────────────────
  employeeCount:  '',
  locationCount:  '',
  companyCount:   '',
  hasHeadOffice:  false,

  // ── Step 4 — Module Selection ─────────────────────────────────
  modules: {
    inventory:     true,
    finance:       true,
    hr:            false,
    trading:       false,
    manufacturing: false,
    pos:           false,
    projects:      false,
  },

  // ── Step 5 — Technical Preferences ───────────────────────────
  platform:      '',
  accountingStd: '',
  languages:     ['en'],
  offlineNeeded: false,

  // ── Step 6 — Client Information ──────────────────────────────
  includeClientInfo: true,
  clientCompany:     '',
  clientContact:     '',
  clientPhone:       '',
  clientEmail:       '',
  clientAddress:     '',
  clientCity:        '',
  clientCountry:     '',
  clientWebsite:     '',
  clientNotes:       '',
}


// ================================================================
//  [3] THEMES
//  Each theme sets primary + secondary + accent colors
// ================================================================

const THEMES = [

  // ── Classic Navy ──────────────────────────────────────────────
  {
    key:       'navy',
    label:     'Classic Navy',
    primary:   '#1a3c5e',
    secondary: '#2d6a9f',
    accent:    '#e8a020',
  },

  // ── Executive Dark ────────────────────────────────────────────
  {
    key:       'dark',
    label:     'Executive Dark',
    primary:   '#1c1c2e',
    secondary: '#2a2a4e',
    accent:    '#f0c040',
  },

  // ── Forest ───────────────────────────────────────────────────
  {
    key:       'forest',
    label:     'Forest',
    primary:   '#1a4731',
    secondary: '#27ae60',
    accent:    '#f0a500',
  },

  // ── Royal Purple ─────────────────────────────────────────────
  {
    key:       'purple',
    label:     'Royal Purple',
    primary:   '#2d1b5e',
    secondary: '#5e35b1',
    accent:    '#e040a0',
  },

  // ── Ocean Teal ───────────────────────────────────────────────
  {
    key:       'teal',
    label:     'Ocean Teal',
    primary:   '#0d3d4f',
    secondary: '#0d6e8a',
    accent:    '#00e5c0',
  },

  // ── Crimson ───────────────────────────────────────────────────
  {
    key:       'crimson',
    label:     'Crimson',
    primary:   '#5e1a1a',
    secondary: '#922b21',
    accent:    '#f39c12',
  },
]


// ================================================================
//  [4] SIDEBAR NAV CONFIG
//  Step number, label, shown in sidebar
// ================================================================

const NAV_STEPS = [
  { step: 1, label: 'Welcome'            },
  { step: 2, label: 'Business Profile'   },
  { step: 3, label: 'Business Size'      },
  { step: 4, label: 'Module Selection'   },
  { step: 5, label: 'Tech Preferences'   },
  { step: 6, label: 'Client Information' },
  { step: 7, label: 'Report'             },
]


// ================================================================
//  [5] APP COMPONENT
// ================================================================

function App() {

  // ── [5.1] State ───────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState(1)
  const [formData,    setFormData]    = useState(initialData)
  const [fontSize,    setFontSize]    = useState(15)
  const [darkMode,    setDarkMode]    = useState(false)
  const [language,    setLanguage]    = useState('EN')
  const [theme,       setTheme]       = useState(THEMES[0])


  // ── [5.2] Navigation ──────────────────────────────────────────
  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)


  // ── [5.3] Data update ─────────────────────────────────────────
  // Merges new fields — never overwrites other steps
  const updateData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }


  // ── [5.4] Toolbox handlers ────────────────────────────────────

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 1, 20))
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 1, 12))
  const toggleDarkMode   = () => setDarkMode(prev => !prev)

  const cycleLanguage = () => {
    const langs = ['EN', 'FR', 'AR']
    setLanguage(prev => langs[(langs.indexOf(prev) + 1) % langs.length])
  }

  const handleReset = () => {
    if (window.confirm('Start over? All answers will be cleared.')) {
      setFormData(initialData)
      setCurrentStep(1)
    }
  }


  // ── [5.5] Theme + dark mode effect ───────────────────────────
  // Applies all CSS variables to :root on every change
  useEffect(() => {
    const root = document.documentElement
    document.documentElement.style.fontSize = `${fontSize}px`
    root.style.setProperty('--font-base',        `${fontSize}px`)
    root.style.setProperty('--color-primary',     theme.primary)
    root.style.setProperty('--color-secondary',   theme.secondary)
    root.style.setProperty('--color-accent',      theme.accent)
    root.style.setProperty('--color-bg',          darkMode ? '#12131a' : '#f0f2f5')
    root.style.setProperty('--color-white',       darkMode ? '#1a1b26' : '#ffffff')
    root.style.setProperty('--color-text',        darkMode ? '#e0e0e0' : '#1a2332')
    root.style.setProperty('--color-text-light',  darkMode ? '#8888a0' : '#6c7a89')
    root.style.setProperty('--color-border',      darkMode ? '#2a2b3a' : '#e2e6ea')
    root.style.setProperty('--color-selected-bg', darkMode ? '#1e2a3a' : '#eef4fb')
    root.style.setProperty('--color-metric-bg',   darkMode ? '#1e1f2e' : '#f4f6f9')
  }, [fontSize, darkMode, theme])


  // ================================================================
  //  [6] METRIC CALCULATIONS
  //  Summary numbers shown in sidebar metric cards
  // ================================================================

  // Count selected modules
  const moduleCount = Object.values(formData.modules || {})
    .filter(Boolean).length

  // Completion percent — steps 2-6 count, step 1 and 7 are outside
  const completionPct = currentStep <= 1 ? 0
    : currentStep >= 7 ? 100
    : Math.round(((currentStep - 1) / 5) * 100)

  // Package badge from size data
  const getPackage = () => {
    if (
      formData.employeeCount === '100+' ||
      formData.locationCount === '10+'  ||
      formData.companyCount  === '5+'
    ) return 'LB'
    if (
      formData.employeeCount === '25-100' ||
      formData.locationCount === '4-10'   ||
      formData.companyCount  === '2-5'
    ) return 'MB'
    if (
      formData.employeeCount === '10-25' ||
      formData.locationCount === '2-3'
    ) return 'SB+'
    if (formData.employeeCount) return 'SB'
    return '—'                            // not yet set
  }


  // ================================================================
  //  [7] STEP RENDERER
  // ================================================================

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Welcome onNext={nextStep} />
      case 2:
        return <BusinessProfile data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 3:
        return <SizeAssessment  data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 4:
        return <ModuleSelection data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 5:
        return <TechPreferences data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 6:
        return <ClientInfo      data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 7:
        return <Report
          data={formData}
          onBack={prevStep}
          onRestart={() => {
            setFormData(initialData)
            setCurrentStep(1)
          }}
        />
      default:
        return <Welcome onNext={nextStep} />
    }
  }


  // ================================================================
  //  [8] RENDER
  // ================================================================

  const progress =
    currentStep === 1 ? 0 :
    currentStep === 7 ? 100 :
    ((currentStep - 1) / 6) * 100

  return (
    <div className="app" style={{ fontSize: `${fontSize}px` }}>

      {/* ── Topbar ───────────────────────────────────────────── */}
      <div className="topbar">

        {/* Left — brand */}
        <div className="topbar-brand">
          <span className="brand-abms">ABMS</span>
          <span className="brand-sep">|</span>
          <span className="brand-sub">SRS Configurator</span>
        </div>

        {/* Right — status pills + step badge */}
        <div className="topbar-right">
          <span className="topbar-pill">{darkMode ? 'Dark' : 'Light'}</span>
          <span className="topbar-pill">{language}</span>
          <span className="topbar-pill">{fontSize}px</span>
          {currentStep > 1 && currentStep < 7 && (
            <span className="topbar-step">
              Step {currentStep - 1} of 5
            </span>
          )}
        </div>

      </div>

      {/* ── Toolstrip ────────────────────────────────────────── */}
      <div className="toolstrip">

        {/* Font size */}
        <div className="ts-group">
          <span className="ts-label">Size</span>
          <button className="ts-btn" onClick={decreaseFontSize}>A−</button>
          <span className="ts-value">{fontSize}px</span>
          <button className="ts-btn" onClick={increaseFontSize}>A+</button>
        </div>

        {/* Dark mode */}
        <div className="ts-group">
          <span className="ts-label">Mode</span>
          <button
            className={`ts-btn ${darkMode ? 'ts-btn-active' : ''}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Dark' : 'Light'}
          </button>
        </div>

        {/* Language */}
        <div className="ts-group">
          <span className="ts-label">Lang</span>
          <button
            className="ts-btn ts-btn-active"
            onClick={cycleLanguage}
            style={{ minWidth: '36px' }}
          >
            {language}
          </button>
        </div>

        {/* Theme dots */}
        <div className="ts-group">
          <span className="ts-label">Theme</span>
          {THEMES.map(t => (
            <button
              key={t.key}
              className={`ts-dot ${theme.key === t.key ? 'ts-dot-active' : ''}`}
              onClick={() => setTheme(t)}
              title={t.label}
              style={{ background: t.primary }}
            />
          ))}
        </div>

        {/* Reset */}
        <div className="ts-group">
          <button className="ts-btn ts-btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>

      </div>

      {/* ── Progress bar — steps 2-6 only ────────────────────── */}
      {currentStep > 1 && currentStep < 7 && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* ── Body — sidebar + main ─────────────────────────────── */}
      <div className="body-layout">

        {/* ── Sidebar ────────────────────────────────────────── */}
        <div className="sidebar">
          <div className="sidebar-section">

            <div className="sidebar-section-label">Progress</div>

            {/* Nav steps */}
            {NAV_STEPS.map(({ step, label }) => {
              const isDone   = currentStep > step     // completed step
              const isActive = currentStep === step   // current step
              return (
                <div
                  key={step}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''} ${isDone ? 'nav-item-done' : ''}`}
                >
                  <div className={`nav-dot ${
                    isDone   ? 'nav-dot-done'    :
                    isActive ? 'nav-dot-active'  :
                               'nav-dot-pending'
                  }`} />
                  {label}
                </div>
              )
            })}

          </div>

          {/* ── Sidebar metrics ──────────────────────────────── */}
          {currentStep > 1 && (
            <div style={{ padding: '0 12px 16px' }}>

              <div className="sidebar-section-label" style={{ padding: '16px 4px 8px' }}>
                Summary
              </div>

              <div className="metric-card" style={{ marginBottom: '8px' }}>
                <div className="metric-label">Package</div>
                <div className="metric-value">{getPackage()}</div>
              </div>

              <div className="metric-card" style={{ marginBottom: '8px' }}>
                <div className="metric-label">Modules</div>
                <div className="metric-value">{moduleCount}</div>
                <div className="metric-sub">selected</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Completion</div>
                <div className="metric-value">{completionPct}%</div>
                <div className="metric-sub">{currentStep - 1} of 5 steps</div>
              </div>

            </div>
          )}

        </div>

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="main">
          {renderStep()}
        </div>

      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="footer">
        <span>ABMS — Afro Business Management Suite</span>
        <span>by AfroditeSoft © 2026</span>
      </footer>

    </div>
  )
}


// ================================================================
//  [9] EXPORT
// ================================================================

export default App
