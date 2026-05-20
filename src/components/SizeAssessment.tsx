// ================================================================
//  SizeAssessment.tsx — Step 3
//  Collects business size information
//  by AfroditeSoft © 2026
// ================================================================

import type { FormData } from '../types/wizard'

const EMPLOYEE_COUNTS = [
  { value: '1-10', label: '1 — 10', desc: 'Very small team' },
  { value: '10-25', label: '10 — 25', desc: 'Small team' },
  { value: '25-100', label: '25 — 100', desc: 'Medium team' },
  { value: '100+', label: '100+', desc: 'Large organization' },
] as const

const LOCATION_COUNTS = [
  { value: '1', label: 'Single location', desc: 'One office or store' },
  { value: '2-3', label: '2 — 3 locations', desc: 'Small multi-branch' },
  { value: '4-10', label: '4 — 10 locations', desc: 'Regional presence' },
  { value: '10+', label: '10+ locations', desc: 'National or international' },
] as const

const COMPANY_COUNTS = [
  { value: '1', label: 'One company', desc: 'Single legal entity' },
  { value: '2-5', label: '2 — 5 companies', desc: 'Small group' },
  { value: '5+', label: '5+ companies', desc: 'Large holding group' },
] as const

interface SizeAssessmentProps {
  data: FormData
  onUpdate: (newData: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

function SizeAssessment({ data, onUpdate, onNext, onBack }: SizeAssessmentProps) {
  const isValid =
    data.employeeCount !== '' &&
    data.locationCount !== '' &&
    data.companyCount !== ''

  return (
    <div className="card">
      <h2 className="card-title">Business Size</h2>
      <p className="card-subtitle">
        Help us understand the scale of your operations
      </p>

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

      {data.locationCount !== '' && data.locationCount !== '1' && (
        <div className="form-group">
          <label>Head Office structure</label>
          <div
            className="checkbox-item"
            onClick={() => onUpdate({ hasHeadOffice: !data.hasHeadOffice })}
            style={{
              borderColor: data.hasHeadOffice ? '#1a3c5e' : '',
              background: data.hasHeadOffice ? '#eef4fb' : '',
            }}
          >
            <input
              type="checkbox"
              checked={data.hasHeadOffice}
              onChange={() => {}}
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

      {!isValid && (
        <p className="msg-error" style={{ textAlign: 'center', marginTop: '12px' }}>
          Please answer all questions to continue
        </p>
      )}
    </div>
  )
}

export default SizeAssessment
