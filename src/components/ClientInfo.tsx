// ================================================================
//  ClientInfo.tsx — Step 6
//  Collects client information for the report header
//  by AfroditeSoft © 2026
// ================================================================

import type { FormData } from '../types/wizard'

interface ClientInfoProps {
  data: FormData
  onUpdate: (newData: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

function ClientInfo({ data, onUpdate, onNext, onBack }: ClientInfoProps) {
  const included = data.includeClientInfo !== false
  const isValid = !included || (
    (data.clientContact || '').trim() !== '' &&
    (data.clientPhone || '').trim() !== ''
  )

  const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    onUpdate({ [field]: value } as Partial<FormData>)
  }

  return (
    <div className="card">
      <h2 className="card-title">Client Information</h2>
      <p className="card-subtitle">
        This information will appear on the final report header
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          padding: '12px 16px',
          background: '#f4f6f9',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
        onClick={() => handleChange('includeClientInfo', !included)}
      >
        <input
          type="checkbox"
          checked={included}
          onChange={event => handleChange('includeClientInfo', event.target.checked)}
          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
        />
        <div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a3c5e' }}>
            Include client info in report
          </div>
          <div style={{ fontSize: '12px', color: '#6c7a89' }}>
            Uncheck to print report without personal information
          </div>
        </div>
      </div>

      {included && (
        <>
          <div className="form-group">
            <label>Contact Person <span style={{ color: 'var(--color-error)' }}>*</span></label>
            <input
              type="text"
              value={data.clientContact || ''}
              onChange={event => handleChange('clientContact', event.target.value)}
              placeholder="e.g. Ahmed Ali"
            />
          </div>

          <div className="form-group">
            <label>Phone Number <span style={{ color: 'var(--color-error)' }}>*</span></label>
            <input
              type="text"
              value={data.clientPhone || ''}
              onChange={event => handleChange('clientPhone', event.target.value)}
              placeholder="e.g. +966 50 123 4567"
            />
          </div>

          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={data.clientCompany || ''}
              onChange={event => handleChange('clientCompany', event.target.value)}
              placeholder="e.g. Afro Trading Ltd"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={data.clientEmail || ''}
              onChange={event => handleChange('clientEmail', event.target.value)}
              placeholder="e.g. info@company.com"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={data.clientAddress || ''}
              onChange={event => handleChange('clientAddress', event.target.value)}
              placeholder="e.g. King Fahd Road, Building 12"
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>City</label>
              <input
                type="text"
                value={data.clientCity || ''}
                onChange={event => handleChange('clientCity', event.target.value)}
                placeholder="e.g. Riyadh"
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Country</label>
              <input
                type="text"
                value={data.clientCountry || ''}
                onChange={event => handleChange('clientCountry', event.target.value)}
                placeholder="e.g. Saudi Arabia"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              value={data.clientWebsite || ''}
              onChange={event => handleChange('clientWebsite', event.target.value)}
              placeholder="e.g. www.company.com"
            />
          </div>

          <div className="form-group">
            <label>Notes / Comments</label>
            <input
              type="text"
              value={data.clientNotes || ''}
              onChange={event => handleChange('clientNotes', event.target.value)}
              placeholder="e.g. Urgent requirement, needs demo by end of month"
            />
          </div>

          <p style={{ fontSize: '12px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
            <span style={{ color: 'var(--color-error)' }}>*</span> Required fields
          </p>
        </>
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
          Generate Report →
        </button>
      </div>

      {included && !isValid && (
        <p className="msg-error" style={{ textAlign: 'center', marginTop: '12px' }}>
          Please enter contact person and phone number to continue
        </p>
      )}
    </div>
  )
}

export default ClientInfo
