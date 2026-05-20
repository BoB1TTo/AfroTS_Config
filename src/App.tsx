// ================================================================
//  AfroTech Suite — App.tsx
//  Main wizard controller — Dashboard Pro Layout
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] IMPORTS
//  [2] APP COMPONENT
//  [3] EXPORT
// ================================================================

import { useEffect, useState } from 'react'
import Welcome from './components/Welcome.tsx'
import BusinessProfile from './components/BusinessProfile.tsx'
import SizeAssessment from './components/SizeAssessment.tsx'
import ModuleSelection from './components/ModuleSelection.tsx'
import TechPreferences from './components/TechPreferences.tsx'
import ClientInfo from './components/ClientInfo.tsx'
import Report from './components/Report.tsx'
import {
  INITIAL_FORM_DATA,
  NAV_STEPS,
  THEMES,
  TOOL_LANGUAGES,
} from './app/config/wizardConfig'
import { getPackageSummary } from './features/report/reportSelectors'
import type { FormData, ThemeOption, ToolLanguage } from './types/wizard'
import './App.css'


// ================================================================
//  [2] APP COMPONENT
// ================================================================

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [fontSize, setFontSize] = useState<number>(15)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [language, setLanguage] = useState<ToolLanguage>('EN')
  const [theme, setTheme] = useState<ThemeOption>(THEMES[0])

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  const updateData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 1, 20))
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 1, 12))
  const toggleDarkMode = () => setDarkMode(prev => !prev)

  const cycleLanguage = () => {
    setLanguage(prev => TOOL_LANGUAGES[(TOOL_LANGUAGES.indexOf(prev) + 1) % TOOL_LANGUAGES.length])
  }

  const resetWizard = () => {
    setFormData(INITIAL_FORM_DATA)
    setCurrentStep(1)
  }

  const handleReset = () => {
    if (window.confirm('Start over? All answers will be cleared.')) {
      resetWizard()
    }
  }

  useEffect(() => {
    const root = document.documentElement

    root.style.fontSize = `${fontSize}px`
    root.style.setProperty('--font-base', `${fontSize}px`)
    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-secondary', theme.secondary)
    root.style.setProperty('--color-accent', theme.accent)
    root.style.setProperty('--color-bg', darkMode ? '#12131a' : '#f0f2f5')
    root.style.setProperty('--color-white', darkMode ? '#1a1b26' : '#ffffff')
    root.style.setProperty('--color-text', darkMode ? '#e0e0e0' : '#1a2332')
    root.style.setProperty('--color-text-light', darkMode ? '#8888a0' : '#6c7a89')
    root.style.setProperty('--color-border', darkMode ? '#2a2b3a' : '#e2e6ea')
    root.style.setProperty('--color-selected-bg', darkMode ? '#1e2a3a' : '#eef4fb')
    root.style.setProperty('--color-metric-bg', darkMode ? '#1e1f2e' : '#f4f6f9')
  }, [fontSize, darkMode, theme])

  const moduleCount = Object.values(formData.modules || {}).filter(Boolean).length

  const completionPct = currentStep <= 1
    ? 0
    : currentStep >= 7
      ? 100
      : Math.round(((currentStep - 1) / 5) * 100)

  const packageSummary = getPackageSummary(formData)

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Welcome onNext={nextStep} />
      case 2:
        return <BusinessProfile data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 3:
        return <SizeAssessment data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 4:
        return <ModuleSelection data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 5:
        return <TechPreferences data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 6:
        return <ClientInfo data={formData} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />
      case 7:
        return <Report data={formData} onBack={prevStep} onRestart={resetWizard} />
      default:
        return <Welcome onNext={nextStep} />
    }
  }

  const progress =
    currentStep === 1
      ? 0
      : currentStep === 7
        ? 100
        : ((currentStep - 1) / 6) * 100

  return (
    <div className="app" style={{ fontSize: `${fontSize}px` }}>
      <div className="topbar">
        <div className="topbar-brand">
          <span className="brand-abms">ABMS</span>
          <span className="brand-sep">|</span>
          <span className="brand-sub">SRS Configurator</span>
        </div>

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

      <div className="toolstrip">
        <div className="ts-group">
          <span className="ts-label">Size</span>
          <button className="ts-btn" onClick={decreaseFontSize}>A−</button>
          <span className="ts-value">{fontSize}px</span>
          <button className="ts-btn" onClick={increaseFontSize}>A+</button>
        </div>

        <div className="ts-group">
          <span className="ts-label">Mode</span>
          <button
            className={`ts-btn ${darkMode ? 'ts-btn-active' : ''}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Dark' : 'Light'}
          </button>
        </div>

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

        <div className="ts-group">
          <span className="ts-label">Theme</span>
          {THEMES.map(item => (
            <button
              key={item.key}
              className={`ts-dot ${theme.key === item.key ? 'ts-dot-active' : ''}`}
              onClick={() => setTheme(item)}
              title={item.label}
              style={{ background: item.primary }}
            />
          ))}
        </div>

        <div className="ts-group">
          <button className="ts-btn ts-btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {currentStep > 1 && currentStep < 7 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="body-layout">
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-section-label">Progress</div>

            {NAV_STEPS.map(({ step, label }) => {
              const isDone = currentStep > step
              const isActive = currentStep === step

              return (
                <div
                  key={step}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''} ${isDone ? 'nav-item-done' : ''}`}
                >
                  <div className={`nav-dot ${
                    isDone
                      ? 'nav-dot-done'
                      : isActive
                        ? 'nav-dot-active'
                        : 'nav-dot-pending'
                  }`}
                  />
                  {label}
                </div>
              )
            })}
          </div>

          {currentStep > 1 && (
            <div style={{ padding: '0 12px 16px' }}>
              <div className="sidebar-section-label" style={{ padding: '16px 4px 8px' }}>
                Summary
              </div>

              <div className="metric-card" style={{ marginBottom: '8px' }}>
                <div className="metric-label">Package</div>
                <div className="metric-value">{packageSummary}</div>
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

        <div className="main">
          {renderStep()}
        </div>
      </div>

      <footer className="footer">
        <span>ABMS — Afro Business Management Suite</span>
        <span>by AfroditeSoft © 2026</span>
      </footer>
    </div>
  )
}


// ================================================================
//  [3] EXPORT
// ================================================================

export default App
