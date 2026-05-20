// ================================================================
//  BusinessProfile.jsx — Step 2
//  Collects business type and region
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] DATA — business types and regions lists
//      [1.1] Business types
//      [1.2] Regions
//  [2] COMPONENT
//      [2.1] Validation
//      [2.2] Render
//  [3] EXPORT
//
//  EFFECT ON REPORT:
//  businessType   → determines which modules are suggested
//  businessRegion → influences language and accounting standard tips
// ================================================================


// ================================================================
//  [1] DATA
// ================================================================

// ── [1.1] Business types ──────────────────────────────────────────
const BUSINESS_TYPES = [
  { value: 'trading',       label: 'Trading / Distribution', desc: 'Buy and sell products' },
  { value: 'services',      label: 'Services / Consulting',  desc: 'Provide services to clients' },
  { value: 'manufacturing', label: 'Manufacturing',          desc: 'Produce goods' },
  { value: 'hospital',      label: 'Hospital / Clinic',      desc: 'Healthcare services' },
  { value: 'school',        label: 'School / University',    desc: 'Education services' },
  { value: 'restaurant',    label: 'Restaurant / F&B',       desc: 'Food and beverage' },
  { value: 'realestate',    label: 'Real Estate',            desc: 'Property management' },
  { value: 'other',         label: 'Other',                  desc: 'Other business type' },
]

// ── [1.2] Regions ─────────────────────────────────────────────────
const REGIONS = [
  { value: 'middle_east',    label: 'Middle East',    desc: 'UAE, Saudi, Kuwait...' },
  { value: 'north_africa',   label: 'North Africa',   desc: 'Morocco, Algeria, Tunisia...' },
  { value: 'central_africa', label: 'Central Africa', desc: 'Cameroon, Congo, Gabon...' },
  { value: 'west_africa',    label: 'West Africa',    desc: 'Senegal, Côte d\'Ivoire...' },
  { value: 'east_africa',    label: 'East Africa',    desc: 'Kenya, Tanzania, Ethiopia...' },
  { value: 'europe',         label: 'Europe',         desc: 'France, Belgium, Netherlands...' },
  { value: 'americas',       label: 'Americas',       desc: 'USA, Brazil, Canada...' },
  { value: 'international',  label: 'International',  desc: 'Multiple regions' },
]


// ================================================================
//  [2] COMPONENT
// ================================================================

function BusinessProfile({ data, onUpdate, onNext, onBack }) {

  // ── [2.1] Validation ──────────────────────────────────────────
  // Both type and region must be selected before proceeding
  const isValid = data.businessType !== '' && data.businessRegion !== ''

  // ── [2.2] Render ──────────────────────────────────────────────
  return (
    <div className="card">

      {/* Title */}
      <h2 className="card-title">Business Profile</h2>
      <p className="card-subtitle">
        Tell us about your business so we can recommend the right configuration
      </p>

      {/* Business type selection */}
      <div className="form-group">
        <label>What type of business are you?</label>
        <div className="options-grid">
          {BUSINESS_TYPES.map(type => (
            <div
              key={type.value}
              className={`option-card ${data.businessType === type.value ? 'selected' : ''}`}
              onClick={() => onUpdate({ businessType: type.value })}
            >
              <span className="option-title">{type.label}</span>
              <span className="option-desc">{type.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Region selection */}
      <div className="form-group">
        <label>Where is your business located?</label>
        <div className="options-grid">
          {REGIONS.map(region => (
            <div
              key={region.value}
              className={`option-card ${data.businessRegion === region.value ? 'selected' : ''}`}
              onClick={() => onUpdate({ businessRegion: region.value })}
            >
              <span className="option-title">{region.label}</span>
              <span className="option-desc">{region.desc}</span>
            </div>
          ))}
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
          disabled={!isValid}   // disabled until both fields selected
        >
          Next →
        </button>
      </div>

      {/* Validation hint — only shows when fields are incomplete */}
      {!isValid && (
        <p className="msg-error" style={{ textAlign: 'center', marginTop: '12px' }}>
          Please select both your business type and region to continue
        </p>
      )}

    </div>
  )
}


// ================================================================
//  [3] EXPORT
// ================================================================

export default BusinessProfile
