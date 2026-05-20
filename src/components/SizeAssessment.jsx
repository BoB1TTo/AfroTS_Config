// ================================================================
//  SizeAssessment.jsx — Step 3
//  Collects business size information
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] DATA — size option lists
//      [1.1] Employee counts
//      [1.2] Location counts
//      [1.3] Company counts
//  [2] COMPONENT
//      [2.1] Validation
//      [2.2] Render
//  [3] EXPORT
//
//  EFFECT ON REPORT:
//  employeeCount  → primary factor in package calculation
//  locationCount  → secondary factor, triggers HO question
//  companyCount   → tertiary factor, forces MB or LB
//  hasHeadOffice  → adds HO features to report
// ================================================================


// ================================================================
//  [1] DATA
// ================================================================

// ── [1.1] Employee counts ─────────────────────────────────────────
const EMPLOYEE_COUNTS = [
  { value: '1-10',   label: '1 — 10',    desc: 'Very small team' },
  { value: '10-25',  label: '10 — 25',   desc: 'Small team' },
  { value: '25-100', label: '25 — 100',  desc: 'Medium team' },
  { value: '100+',   label: '100+',      desc: 'Large organization' },
]

// ── [1.2] Location counts ─────────────────────────────────────────
const LOCATION_COUNTS = [
  { value: '1',    label: 'Single location',   desc: 'One office or store' },
  { value: '2-3',  label: '2 — 3 locations',   desc: 'Small multi-branch' },
  { value: '4-10', label: '4 — 10 locations',  desc: 'Regional presence' },
  { value: '10+',  label: '10+ locations',     desc: 'National or international' },
]

// ── [1.3] Company counts ──────────────────────────────────────────
const COMPANY_COUNTS = [
  { value: '1',   label: 'One company',      desc: 'Single legal entity' },
  { value: '2-5', label: '2 — 5 companies',  desc: 'Small group' },
  { value: '5+',  label: '5+ companies',     desc: 'Large holding group' },
]


// ================================================================
//  [2] COMPONENT
// ================================================================

function SizeAssessment({ data, onUpdate, onNext, onBack }) {

  // ── [2.1] Validation ──────────────────────────────────────────
  // All three size fields must be answered before proceeding
  const isValid =
    data.employeeCount !== '' &&
    data.locationCount !== '' &&
    data.companyCount  !== ''

  // ── [2.2] Render ──────────────────────────────────────────────
  return (
    <div className="card">

      {/* Title */}
      <h2 className="card-title">Business Size</h2>
      <p className="card-subtitle">
        Help us understand the scale of your operations
      </p>

      {/* Employee count */}
      <div className="form-group">
        <label>How many employees do you have?</label>
        <div className="options-grid">
          {EMPLOYEE_COUNTS.map(opt => (
            <div
              key={opt.value}
              className={`option-card ${data.employeeCount === opt.value ? 'selected' : ''}`}
              onClick={() => onUpdate({ employeeCount: opt.value })}
            >
              <span className="option-title">{opt.label}</span>
              <span className="option-desc">{opt.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Location count */}
      <div className="form-group">
        <label>How many locations / branches do you have?</label>
        <div className="options-grid">
          {LOCATION_COUNTS.map(opt => (
            <div
              key={opt.value}
              className={`option-card ${data.locationCount === opt.value ? 'selected' : ''}`}
              onClick={() => onUpdate({ locationCount: opt.value })}
            >
              <span className="option-title">{opt.label}</span>
              <span className="option-desc">{opt.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Company count */}
      <div className="form-group">
        <label>How many legal companies are in your group?</label>
        <div className="options-grid">
          {COMPANY_COUNTS.map(opt => (
            <div
              key={opt.value}
              className={`option-card ${data.companyCount === opt.value ? 'selected' : ''}`}
              onClick={() => onUpdate({ companyCount: opt.value })}
            >
              <span className="option-title">{opt.label}</span>
              <span className="option-desc">{opt.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Head Office question — only appears when multiple locations selected */}
      {data.locationCount !== '' && data.locationCount !== '1' && (
        <div className="form-group">
          <label>Head Office structure</label>
          <div
            className="checkbox-item"
            onClick={() => onUpdate({ hasHeadOffice: !data.hasHeadOffice })}
            style={{
              borderColor: data.hasHeadOffice ? '#1a3c5e' : '',
              background:  data.hasHeadOffice ? '#eef4fb' : '',
            }}
          >
            <input
              type="checkbox"
              checked={data.hasHeadOffice}
              onChange={() => {}}   // handled by parent div onClick
            />
            <div>
              <div className="checkbox-label">
                We have a Head Office controlling our branches
              </div>
              <div style={{ fontSize: '12px', color: '#6c7a89', marginTop: '2px' }}>
                HO manages all branches with consolidated reporting
              </div>
            </div>
          </div>
        </div>
      )}

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
          Next →
        </button>
      </div>

      {/* Validation hint */}
      {!isValid && (
        <p className="msg-error" style={{ textAlign: 'center', marginTop: '12px' }}>
          Please answer all questions to continue
        </p>
      )}

    </div>
  )
}


// ================================================================
//  [3] EXPORT
// ================================================================

export default SizeAssessment
