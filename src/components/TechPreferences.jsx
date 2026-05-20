// ================================================================
//  TechPreferences.jsx — Step 5
//  Collects technical preferences
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] DATA — platform, standards, languages
//      [1.1] Platform options
//      [1.2] Accounting standards
//      [1.3] Language options
//  [2] COMPONENT
//      [2.1] Language toggle handler
//      [2.2] Validation
//      [2.3] Render
//  [3] EXPORT
//
//  EFFECT ON REPORT:
//  platform      → deployment recommendation
//  accountingStd → COA template suggestion
//  languages     → i18n configuration
//  offlineNeeded → triggers platform compatibility note
// ================================================================


// ================================================================
//  [1] DATA
// ================================================================

// ── [1.1] Platform options ────────────────────────────────────────
const PLATFORMS = [
  { value: 'web',     label: 'Web Browser',  desc: 'Access from any browser, requires internet or LAN' },
  { value: 'desktop', label: 'Desktop App',  desc: 'Installed on computer, works fully offline' },
  { value: 'both',    label: 'Both',         desc: 'Web + Desktop — maximum flexibility' },
]

// ── [1.2] Accounting standards ────────────────────────────────────
const STANDARDS = [
  { value: 'ifrs',  label: 'IFRS',  desc: 'International — recommended for 140+ countries' },
  { value: 'gaap',  label: 'GAAP',  desc: 'American standard — for US-based businesses' },
  { value: 'ohada', label: 'OHADA', desc: 'African standard — 17 French-speaking countries' },
]

// ── [1.3] Language options ────────────────────────────────────────
// en is always required — cannot be deselected
const LANGUAGES = [
  { value: 'en', label: 'English',     desc: 'Global standard — always included', required: true },
  { value: 'ar', label: 'Arabic',      desc: 'Right-to-left (RTL) layout',        required: false },
  { value: 'fr', label: 'French',      desc: 'North/West Africa, Europe',         required: false },
  { value: 'es', label: 'Spanish',     desc: 'Latin America, Spain',              required: false },
  { value: 'pt', label: 'Portuguese',  desc: 'Brazil, Portugal, Mozambique',      required: false },
]


// ================================================================
//  [2] COMPONENT
// ================================================================

function TechPreferences({ data, onUpdate, onNext, onBack }) {

  // ── [2.1] Language toggle handler ────────────────────────────
  // Adds or removes language from the array
  // English cannot be removed — it is always required
  const toggleLanguage = (lang) => {
    const current = data.languages || ['en']
    if (lang === 'en') return   // English always stays

    if (current.includes(lang)) {
      onUpdate({ languages: current.filter(l => l !== lang) })  // remove
    } else {
      onUpdate({ languages: [...current, lang] })                // add
    }
  }

  // ── [2.2] Validation ──────────────────────────────────────────
  // Platform, accounting standard, and at least one language required
  const isValid =
    data.platform      !== '' &&
    data.accountingStd !== '' &&
    (data.languages || []).length > 0

  // ── [2.3] Render ──────────────────────────────────────────────
  return (
    <div className="card">

      {/* Title */}
      <h2 className="card-title">Technical Preferences</h2>
      <p className="card-subtitle">
        Tell us how you want to run and configure ABMS
      </p>

      {/* Platform selection */}
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

      {/* Accounting standard selection */}
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

      {/* Language selection — multi select */}
      <div className="form-group">
        <label>Which languages do you need? (select all that apply)</label>
        <div className="checkbox-group">
          {LANGUAGES.map(lang => (
            <div
              key={lang.value}
              className="checkbox-item"
              onClick={() => toggleLanguage(lang.value)}
              style={{
                cursor:      lang.required ? 'default' : 'pointer',
                borderColor: (data.languages || []).includes(lang.value) ? '#1a3c5e' : '',
                background:  (data.languages || []).includes(lang.value) ? '#eef4fb' : '',
              }}
            >
              <input
                type="checkbox"
                checked={(data.languages || []).includes(lang.value)}
                onChange={() => {}}   // handled by parent div onClick
                disabled={lang.required}
              />
              <div style={{ flex: 1 }}>
                <div className="checkbox-label">
                  {lang.label}
                  {/* Badge for required language */}
                  {lang.required && (
                    <span style={{
                      fontSize:   '11px',
                      color:      '#27ae60',
                      marginLeft: '8px',
                      fontWeight: '400'
                    }}>
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

      {/* Offline requirement toggle */}
      <div className="form-group">
        <label>Connectivity requirement</label>
        <div
          className="checkbox-item"
          onClick={() => onUpdate({ offlineNeeded: !data.offlineNeeded })}
          style={{
            borderColor: data.offlineNeeded ? '#1a3c5e' : '',
            background:  data.offlineNeeded ? '#eef4fb' : '',
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

      {/* Navigation */}
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

      {/* Validation hint */}
      {!isValid && (
        <p className="msg-error" style={{ textAlign: 'center', marginTop: '12px' }}>
          Please complete all selections to generate your report
        </p>
      )}

    </div>
  )
}


// ================================================================
//  [3] EXPORT
// ================================================================

export default TechPreferences
