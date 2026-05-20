// ================================================================
//  TechPreferences.tsx — Step 5
//  Collects technical preferences
//  by AfroditeSoft © 2026
// ================================================================

import type { FormData } from '../types/wizard'

const PLATFORMS = [
  { value: 'web', label: 'Web Browser', desc: 'Access from any browser, requires internet or LAN' },
  { value: 'desktop', label: 'Desktop App', desc: 'Installed on computer, works fully offline' },
  { value: 'both', label: 'Both', desc: 'Web + Desktop — maximum flexibility' },
] as const

const STANDARDS = [
  { value: 'ifrs', label: 'IFRS', desc: 'International — recommended for 140+ countries' },
  { value: 'gaap', label: 'GAAP', desc: 'American standard — for US-based businesses' },
  { value: 'ohada', label: 'OHADA', desc: 'African standard — 17 French-speaking countries' },
] as const

const LANGUAGES = [
  { value: 'en', label: 'English', desc: 'Global standard — always included', required: true },
  { value: 'ar', label: 'Arabic', desc: 'Right-to-left (RTL) layout', required: false },
  { value: 'fr', label: 'French', desc: 'North/West Africa, Europe', required: false },
  { value: 'es', label: 'Spanish', desc: 'Latin America, Spain', required: false },
  { value: 'pt', label: 'Portuguese', desc: 'Brazil, Portugal, Mozambique', required: false },
] as const

interface TechPreferencesProps {
  data: FormData
  onUpdate: (newData: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

function TechPreferences({ data, onUpdate, onNext, onBack }: TechPreferencesProps) {
  const toggleLanguage = (lang: string) => {
    const current = data.languages || ['en']
    if (lang === 'en') return

    if (current.includes(lang)) {
      onUpdate({ languages: current.filter(item => item !== lang) })
    } else {
      onUpdate({ languages: [...current, lang] })
    }
  }

  const isValid =
    data.platform !== '' &&
    data.accountingStd !== '' &&
    (data.languages || []).length > 0

  return (
    <div className="card">
      <h2 className="card-title">Technical Preferences</h2>
      <p className="card-subtitle">
        Tell us how you want to run and configure ABMS
      </p>

      <div className="form-group">
        <label>How do you want to run ABMS?</label>
        <div className="options-grid">
          {PLATFORMS.map(opt => (
            <div
              key={opt.value}
              className={`option-card ${data.platform === opt.value ? 'selected' : ''}`}
              onClick={() => onUpdate({ platform: opt.value })}
            >
              <span className="option-title">{opt.label}</span>
              <span className="option-desc">{opt.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Which accounting standard do you follow?</label>
        <div className="options-grid">
          {STANDARDS.map(opt => (
            <div
              key={opt.value}
              className={`option-card ${data.accountingStd === opt.value ? 'selected' : ''}`}
              onClick={() => onUpdate({ accountingStd: opt.value })}
            >
              <span className="option-title">{opt.label}</span>
              <span className="option-desc">{opt.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Which languages do you need? (select all that apply)</label>
        <div className="checkbox-group">
          {LANGUAGES.map(lang => (
            <div
              key={lang.value}
              className="checkbox-item"
              onClick={() => toggleLanguage(lang.value)}
              style={{
                cursor: lang.required ? 'default' : 'pointer',
                borderColor: (data.languages || []).includes(lang.value) ? '#1a3c5e' : '',
                background: (data.languages || []).includes(lang.value) ? '#eef4fb' : '',
              }}
            >
              <input
                type="checkbox"
                checked={(data.languages || []).includes(lang.value)}
                onChange={() => {}}
                disabled={lang.required}
              />
              <div style={{ flex: 1 }}>
                <div className="checkbox-label">
                  {lang.label}
                  {lang.required && (
                    <span style={{
                      fontSize: '11px',
                      color: '#27ae60',
                      marginLeft: '8px',
                      fontWeight: '400',
                    }}
                    >
                      Always included
                    </span>
                  )}
                </div>
              </div>
              <span className="checkbox-desc">{lang.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Connectivity requirement</label>
        <div
          className="checkbox-item"
          onClick={() => onUpdate({ offlineNeeded: !data.offlineNeeded })}
          style={{
            borderColor: data.offlineNeeded ? '#1a3c5e' : '',
            background: data.offlineNeeded ? '#eef4fb' : '',
          }}
        >
          <input
            type="checkbox"
            checked={data.offlineNeeded || false}
            onChange={() => {}}
          />
          <div>
            <div className="checkbox-label">
              We need the system to work without internet
            </div>
            <div style={{ fontSize: '12px', color: '#6c7a89', marginTop: '2px' }}>
              Required for remote locations or unreliable connectivity
            </div>
          </div>
        </div>
      </div>

      <div className="btn-row">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!isValid}
        >
          Generate Report →
        </button>
      </div>

      {!isValid && (
        <p className="msg-error" style={{ textAlign: 'center', marginTop: '12px' }}>
          Please complete all selections to generate your report
        </p>
      )}
    </div>
  )
}

export default TechPreferences
