// ================================================================
//  Report.jsx — Step 7
//  Generates customized ABMS profile based on all answers
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] PACKAGE CALCULATOR  — determines SB / SB+ / MB / LB
//  [2] PACKAGE INFO        — what each package includes
//  [3] RECOMMENDATIONS     — language and platform tips
//  [4] COMPONENT
//      [4.1] Calculations
//      [4.2] Render helpers
//      [4.3] Render
//  [5] EXPORT
// ================================================================


// ================================================================
//  [1] PACKAGE CALCULATOR
//  Takes form data → returns recommended package code
// ================================================================

const calculatePackage = (data) => {

  // ── Force Large Business ──────────────────────────────────────
  if (
    data.employeeCount === '100+' ||
    data.locationCount === '10+'  ||
    data.companyCount  === '5+'
  ) return 'LB'

  // ── Force Medium Business ─────────────────────────────────────
  if (
    data.employeeCount === '25-100' ||
    data.locationCount === '4-10'   ||
    data.companyCount  === '2-5'
  ) return 'MB'

  // ── Small Business Advanced ───────────────────────────────────
  if (
    data.employeeCount === '10-25' ||
    data.locationCount === '2-3'
  ) return 'SB+'

  // ── Default: Small Business ───────────────────────────────────
  return 'SB'
}


// ================================================================
//  [2] PACKAGE INFO
// ================================================================

const PACKAGE_INFO = {
  'SB': {
    label:    'Small Business',
    users:    'Up to 10 users',
    color:    '#2d6a9f',
    bg:       '#e8f4fd',
    desc:     'Perfect for small single-location businesses',
    includes: [
      'HR basics — employees, leave, payroll',
      'Finance basics — invoices, payments',
      '1 business module',
      'Single location',
      'Basic reports',
      '1 language',
    ],
    excludes: [
      'Multi-branch management',
      'Multi-company structure',
      'Advanced COA management',
      'Consolidated reports',
      'Terminology customization',
    ]
  },
  'SB+': {
    label:    'Small Business Advanced',
    users:    'Up to 25 users',
    color:    '#27ae60',
    bg:       '#eaf7ee',
    desc:     'For growing businesses with multiple locations',
    includes: [
      'Full HR module',
      'Full Finance module',
      'Up to 3 branches',
      'COA standard switcher',
      'Up to 2 languages',
      'PDF + Excel export',
      'Inter-branch stock transfers',
      'Leave approval workflow',
    ],
    excludes: [
      'Multi-company structure',
      'Consolidated reporting',
      'Terminology customization',
      'Department sections and units',
    ]
  },
  'MB': {
    label:    'Medium Business',
    users:    'Up to 100 users',
    color:    '#e8a020',
    bg:       '#fef6e8',
    desc:     'For businesses with multiple companies and branches',
    includes: [
      'All core modules',
      'Up to 2 business modules',
      'Up to 3 companies',
      'Unlimited branches',
      'GAAP / IFRS / OHADA switcher',
      'All 3 languages (EN + AR + FR)',
      'Consolidated reports',
      'Terminology customization',
      'Department → Section → Unit hierarchy',
      'Advanced COA mapping tool',
    ],
    excludes: [
      'Intercompany transactions',
      'Public API access',
      'Custom modules',
      'Dedicated server option',
    ]
  },
  'LB': {
    label:    'Large Business',
    users:    'Unlimited users',
    color:    '#c0392b',
    bg:       '#fdecea',
    desc:     'Full enterprise — unlimited scale',
    includes: [
      'All modules included',
      'Full org → company → HO → branch hierarchy',
      'All languages including Spanish + Portuguese',
      'Intercompany transactions',
      'Group consolidation reports',
      'Public API access',
      'Custom modules',
      'Dedicated server option',
      'SLA priority support',
      'Branch offline + sync mode',
    ],
    excludes: []
  }
}


// ================================================================
//  [3] RECOMMENDATIONS
// ================================================================

const getRecommendations = (data) => {
  const notes = []

  // ── Accounting standard note ──────────────────────────────────
  if (data.accountingStd === 'ohada') {
    notes.push('OHADA selected — standard for 17 French-speaking African countries. French language is strongly recommended.')
  } else if (data.accountingStd === 'gaap') {
    notes.push('GAAP selected — standard for US-based businesses.')
  } else {
    notes.push('IFRS selected — recommended international standard used in 140+ countries worldwide.')
  }

  // ── Language tip based on region ─────────────────────────────
  const langs = data.languages || []
  if (data.businessRegion === 'middle_east' && !langs.includes('ar')) {
    notes.push('Tip: Consider adding Arabic for better adoption in the Middle East market.')
  }
  if (
    (data.businessRegion === 'north_africa'   ||
     data.businessRegion === 'west_africa'    ||
     data.businessRegion === 'central_africa') &&
    !langs.includes('fr')
  ) {
    notes.push('Tip: Consider adding French — widely used in North, West, and Central Africa.')
  }

  // ── Platform compatibility note ───────────────────────────────
  if (data.offlineNeeded && data.platform === 'web') {
    notes.push('Warning: You need offline capability but selected Web only. Consider Desktop or Both.')
  }

  return notes
}

function InfoItem({ label, value }) {
  return (
    <div style={{
      background:   '#f4f6f9',
      borderRadius: '8px',
      padding:      '10px 14px'
    }}>
      <div style={{ fontSize: '11px', color: '#6c7a89', marginBottom: '2px' }}>
        {label}
      </div>
      <div style={{
        fontSize:      '14px',
        fontWeight:    '600',
        color:         '#1a3c5e',
        textTransform: 'capitalize'
      }}>
        {value || '—'}
      </div>
    </div>
  )
}

function Tag({ label }) {
  return (
    <span style={{
      background:    '#eef4fb',
      color:         '#1a3c5e',
      padding:       '6px 14px',
      borderRadius:  '20px',
      fontSize:      '13px',
      fontWeight:    '600',
      textTransform: 'capitalize'
    }}>
      {label}
    </span>
  )
}


// ================================================================
//  [4] COMPONENT
// ================================================================

function Report({ data, onBack, onRestart }) {

  // ── [4.1] Calculations ────────────────────────────────────────
  const pkg      = calculatePackage(data)
  const pkgInfo  = PACKAGE_INFO[pkg]
  const notes    = getRecommendations(data)
  const included = data.includeClientInfo !== false     // false only if explicitly unchecked

  // Selected modules as readable list
  const selectedModules = Object.entries(data.modules || {})
    .filter(([, active]) => active)
    .map(([key]) => key)

  // Language code to label map
  const langLabels = {
    en: 'English', ar: 'Arabic', fr: 'French',
    es: 'Spanish', pt: 'Portuguese'
  }

  // Today's date for report
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  // ── [4.2] Render ──────────────────────────────────────────────
  return (
    <div style={{ width: '100%', maxWidth: '720px' }}>

      {/* ── Client info card — hidden when not included ───────── */}
      {included && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

            {/* Left — Prepared for */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize:      '11px',
                fontWeight:    '700',
                color:         '#aaa',
                letterSpacing: '1px',
                marginBottom:  '12px',
                textTransform: 'uppercase'
              }}>
                Prepared For
              </div>

              {/* Contact person — shown first */}
              {data.clientContact && (
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a3c5e', marginBottom: '4px' }}>
                  {data.clientContact}
                </div>
              )}

              {/* Phone number — shown second */}
              {data.clientPhone && (
                <div style={{ fontSize: '13px', color: '#6c7a89', marginBottom: '2px' }}>
                  {data.clientPhone}
                </div>
              )}

              {/* Company name — shown third */}
              {data.clientCompany && (
                <div style={{ fontSize: '14px', color: '#2c3e50', marginBottom: '2px' }}>
                  {data.clientCompany}
                </div>
              )}

              {/* Remaining optional fields */}
              {data.clientEmail && (
                <div style={{ fontSize: '13px', color: '#6c7a89', marginBottom: '2px' }}>
                  {data.clientEmail}
                </div>
              )}
              {data.clientWebsite && (
                <div style={{ fontSize: '13px', color: '#6c7a89', marginBottom: '2px' }}>
                  {data.clientWebsite}
                </div>
              )}
              {(data.clientAddress || data.clientCity || data.clientCountry) && (
                <div style={{ fontSize: '13px', color: '#6c7a89', marginTop: '4px' }}>
                  {[data.clientAddress, data.clientCity, data.clientCountry]
                    .filter(Boolean).join(', ')}
                </div>
              )}
            </div>

            {/* Divider */}
            <div style={{
              width:      '1px',
              background: '#dce3ea',
              margin:     '0 24px',
              alignSelf:  'stretch'
            }} />

            {/* Right — Prepared by */}
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize:      '11px',
                fontWeight:    '700',
                color:         '#aaa',
                letterSpacing: '1px',
                marginBottom:  '12px',
                textTransform: 'uppercase'
              }}>
                Prepared By
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a3c5e', marginBottom: '4px' }}>
                AfroditeSoft
              </div>
              <div style={{ fontSize: '13px', color: '#6c7a89', marginBottom: '2px' }}>
                AfroTech Suite
              </div>
              <div style={{ fontSize: '13px', color: '#6c7a89' }}>
                {today}
              </div>
            </div>

          </div>

          {/* Notes if any */}
          {data.clientNotes && (
            <div style={{
              marginTop:    '16px',
              padding:      '10px 14px',
              background:   '#f4f6f9',
              borderRadius: '6px',
              fontSize:     '13px',
              color:        '#2c3e50',
              borderLeft:   '3px solid #2d6a9f'
            }}>
              <span style={{ fontWeight: '600', marginRight: '8px' }}>Notes:</span>
              {data.clientNotes}
            </div>
          )}

        </div>
      )}

      {/* ── Report header ─────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px', letterSpacing: '1px' }}>
          ABMS CONFIGURATION REPORT
        </div>
        <h1 style={{ fontSize: '26px', color: '#1a3c5e', marginBottom: '4px' }}>
          {pkgInfo.label}
        </h1>
        <p style={{ color: '#6c7a89', marginBottom: '16px', fontSize: '14px' }}>
          {pkgInfo.desc}
        </p>
        <div style={{
          display:       'inline-block',
          background:    pkgInfo.bg,
          color:         pkgInfo.color,
          padding:       '8px 24px',
          borderRadius:  '24px',
          fontWeight:    '800',
          fontSize:      '20px',
          letterSpacing: '3px',
          marginBottom:  '8px'
        }}>
          {pkg}
        </div>
        <div style={{ fontSize: '13px', color: '#6c7a89' }}>
          {pkgInfo.users}
        </div>
      </div>

      {/* ── Business summary ──────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h3 style={{ color: '#1a3c5e', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Business Profile Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <InfoItem label="Business Type"       value={data.businessType} />
          <InfoItem label="Region"              value={data.businessRegion?.replace(/_/g, ' ')} />
          <InfoItem label="Employees"           value={data.employeeCount} />
          <InfoItem label="Locations"           value={data.locationCount} />
          <InfoItem label="Companies"           value={data.companyCount} />
          <InfoItem label="Head Office"         value={data.hasHeadOffice ? 'Yes' : 'No'} />
          <InfoItem label="Platform"            value={data.platform} />
          <InfoItem label="Accounting Standard" value={data.accountingStd?.toUpperCase()} />
        </div>
      </div>

      {/* ── Selected modules ──────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h3 style={{ color: '#1a3c5e', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Selected Modules ({selectedModules.length})
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {selectedModules.map(mod => <Tag key={mod} label={mod} />)}
        </div>
      </div>

      {/* ── Languages ─────────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h3 style={{ color: '#1a3c5e', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Languages ({(data.languages || ['en']).length})
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(data.languages || ['en']).map(lang => (
            <Tag key={lang} label={langLabels[lang] || lang} />
          ))}
        </div>
      </div>

      {/* ── What's included ───────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h3 style={{ color: '#1a3c5e', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          What's Included in {pkg}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {pkgInfo.includes.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#27ae60', fontWeight: '700', fontSize: '15px', flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: '14px', color: '#2c3e50' }}>{item}</span>
            </div>
          ))}
        </div>

        {pkgInfo.excludes.length > 0 && (
          <>
            <div style={{ borderTop: '1px solid #dce3ea', margin: '16px 0' }} />
            <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '10px' }}>
              Available in higher packages:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {pkgInfo.excludes.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#ccc', fontSize: '15px', flexShrink: 0 }}>○</span>
                  <span style={{ fontSize: '13px', color: '#bbb' }}>{item}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Recommendations ───────────────────────────────────── */}
      {notes.length > 0 && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <h3 style={{ color: '#1a3c5e', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
            Recommendations & Notes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {notes.map((note, i) => (
              <div key={i} style={{
                padding:      '10px 14px',
                background:   note.startsWith('Warning') ? '#fff8ec' : '#f4f6f9',
                borderLeft:   `3px solid ${note.startsWith('Warning') ? '#e8a020' : '#2d6a9f'}`,
                borderRadius: '0 6px 6px 0',
                fontSize:     '13px',
                color:        '#2c3e50'
              }}>
                {note}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Actions ───────────────────────────────────────────── */}
      <div className="card">
        <p style={{ fontSize: '14px', color: '#6c7a89', marginBottom: '20px' }}>
          Ready to proceed with this configuration?
          Contact AfroditeSoft to get started with your ABMS setup.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => window.print()}>
            Print Report
          </button>
          <button className="btn-secondary" onClick={onBack}>
            Back
          </button>
          <button className="btn-secondary" onClick={onRestart}>
            Start Over
          </button>
        </div>
      </div>

    </div>
  )
}


// ================================================================
//  [5] EXPORT
// ================================================================

export default Report
