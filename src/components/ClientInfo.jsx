// ================================================================
//  ClientInfo.jsx — Step 6
//  Collects client information for the report header
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] COMPONENT
//      [1.1] Validation
//      [1.2] Handle change
//      [1.3] Render
//  [2] EXPORT
//
//  EFFECT ON REPORT:
//  All fields appear in "Prepared For" section of report
//  Contact person and phone are required if page included
//  Company name is optional
//  If includeClientInfo is false — card is hidden everywhere
// ================================================================


// ================================================================
//  [1] COMPONENT
// ================================================================

function ClientInfo({ data, onUpdate, onNext, onBack }) {

  // ── [1.1] Validation ──────────────────────────────────────────
  // If client info included — contact person and phone are required
  // If not included — always valid, user can skip
  const included = data.includeClientInfo !== false     // default true if not set
  const isValid  = !included || (
    (data.clientContact || '').trim() !== '' &&         // contact person required
    (data.clientPhone   || '').trim() !== ''            // phone required
  )

  // ── [1.2] Handle change ───────────────────────────────────────
  // Updates single field in parent formData
  const handleChange = (field, value) => {
    onUpdate({ [field]: value })
  }

  // ── [1.3] Render ──────────────────────────────────────────────
  return (
    <div className="card">

      {/* Title */}
      <h2 className="card-title">Client Information</h2>
      <p className="card-subtitle">
        This information will appear on the final report header
      </p>

      {/* ── Include toggle checkbox ───────────────────────────── */}
      <div style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '10px',
        marginBottom:  '20px',
        padding:       '12px 16px',
        background:    '#f4f6f9',
        borderRadius:  '8px',
        cursor:        'pointer'
      }}
        onClick={() => handleChange('includeClientInfo', !included)}  // toggle on row click
      >
        <input
          type="checkbox"
          checked={included}
          onChange={e => handleChange('includeClientInfo', e.target.checked)}  // checkbox change
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

      {/* ── Fields — only shown when included ────────────────── */}
      {included && (
        <>

          {/* Contact person — required */}
          <div className="form-group">
            <label>Contact Person <span style={{ color: 'var(--color-error)' }}>*</span></label>
            <input
              type="text"
              value={data.clientContact || ''}
              onChange={e => handleChange('clientContact', e.target.value)}
              placeholder="e.g. Ahmed Ali"
            />
          </div>

          {/* Phone number — required */}
          <div className="form-group">
            <label>Phone Number <span style={{ color: 'var(--color-error)' }}>*</span></label>
            <input
              type="text"
              value={data.clientPhone || ''}
              onChange={e => handleChange('clientPhone', e.target.value)}
              placeholder="e.g. +966 50 123 4567"
            />
          </div>

          {/* Company name — optional */}
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={data.clientCompany || ''}
              onChange={e => handleChange('clientCompany', e.target.value)}
              placeholder="e.g. Afro Trading Ltd"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={data.clientEmail || ''}
              onChange={e => handleChange('clientEmail', e.target.value)}
              placeholder="e.g. info@company.com"
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={data.clientAddress || ''}
              onChange={e => handleChange('clientAddress', e.target.value)}
              placeholder="e.g. King Fahd Road, Building 12"
            />
          </div>

          {/* City + Country side by side */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>City</label>
              <input
                type="text"
                value={data.clientCity || ''}
                onChange={e => handleChange('clientCity', e.target.value)}
                placeholder="e.g. Riyadh"
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Country</label>
              <input
                type="text"
                value={data.clientCountry || ''}
                onChange={e => handleChange('clientCountry', e.target.value)}
                placeholder="e.g. Saudi Arabia"
              />
            </div>
          </div>

          {/* Website */}
          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              value={data.clientWebsite || ''}
              onChange={e => handleChange('clientWebsite', e.target.value)}
              placeholder="e.g. www.company.com"
            />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label>Notes / Comments</label>
            <input
              type="text"
              value={data.clientNotes || ''}
              onChange={e => handleChange('clientNotes', e.target.value)}
              placeholder="e.g. Urgent requirement, needs demo by end of month"
            />
          </div>

          {/* Required fields note */}
          <p style={{ fontSize: '12px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
            <span style={{ color: 'var(--color-error)' }}>*</span> Required fields
          </p>

        </>
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
          Generate Report →
        </button>
      </div>

      {/* Validation hint — only shown when included and invalid */}
      {included && !isValid && (
        <p className="msg-error" style={{ textAlign: 'center', marginTop: '12px' }}>
          Please enter contact person and phone number to continue
        </p>
      )}

    </div>
  )
}


// ================================================================
//  [2] EXPORT
// ================================================================

export default ClientInfo