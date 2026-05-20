// ================================================================
//  BusinessProfile.tsx — Step 2
//  Collects business type and region
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] IMPORTS
//  [2] DATA
//  [3] TYPES
//  [4] COMPONENT
//  [5] EXPORT
// ================================================================

import type { FormData } from '../types/wizard'

const BUSINESS_TYPES = [
  { value: 'trading', label: 'Trading / Distribution', desc: 'Buy and sell products' },
  { value: 'services', label: 'Services / Consulting', desc: 'Provide services to clients' },
  { value: 'manufacturing', label: 'Manufacturing', desc: 'Produce goods' },
  { value: 'hospital', label: 'Hospital / Clinic', desc: 'Healthcare services' },
  { value: 'school', label: 'School / University', desc: 'Education services' },
  { value: 'restaurant', label: 'Restaurant / F&B', desc: 'Food and beverage' },
  { value: 'realestate', label: 'Real Estate', desc: 'Property management' },
  { value: 'other', label: 'Other', desc: 'Other business type' },
] as const

const REGIONS = [
  { value: 'middle_east', label: 'Middle East', desc: 'UAE, Saudi, Kuwait...' },
  { value: 'north_africa', label: 'North Africa', desc: 'Morocco, Algeria, Tunisia...' },
  { value: 'central_africa', label: 'Central Africa', desc: 'Cameroon, Congo, Gabon...' },
  { value: 'west_africa', label: 'West Africa', desc: 'Senegal, Côte d\'Ivoire...' },
  { value: 'east_africa', label: 'East Africa', desc: 'Kenya, Tanzania, Ethiopia...' },
  { value: 'europe', label: 'Europe', desc: 'France, Belgium, Netherlands...' },
  { value: 'americas', label: 'Americas', desc: 'USA, Brazil, Canada...' },
  { value: 'international', label: 'International', desc: 'Multiple regions' },
] as const

interface BusinessProfileProps {
  data: FormData
  onUpdate: (newData: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

function BusinessProfile({ data, onUpdate, onNext, onBack }: BusinessProfileProps) {
  const isValid = data.businessType !== '' && data.businessRegion !== ''

  return (
    <div className="card">
      <h2 className="card-title">Business Profile</h2>
      <p className="card-subtitle">
        Tell us about your business so we can recommend the right configuration
      </p>

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
          Please select both your business type and region to continue
        </p>
      )}
    </div>
  )
}

export default BusinessProfile
