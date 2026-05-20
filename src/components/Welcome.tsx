// ================================================================
//  Welcome.tsx — Step 1
//  First screen — explains what the configurator does
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] TYPES
//  [2] COMPONENT
//  [3] EXPORT
// ================================================================


// ================================================================
//  [1] TYPES
// ================================================================

interface WelcomeProps {
  onNext: () => void
}


// ================================================================
//  [2] COMPONENT
// ================================================================

function Welcome({ onNext }: WelcomeProps) {
  const steps = [
    { num: '01', text: 'Tell us about your business type and location' },
    { num: '02', text: 'Tell us about your business size and structure' },
    { num: '03', text: 'Select the modules your business needs' },
    { num: '04', text: 'Choose your technical preferences' },
    { num: '05', text: 'Get your customized ABMS profile and report' },
  ]

  return (
    <div className="card" style={{ textAlign: 'center', maxWidth: '600px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          fontSize: '52px',
          fontWeight: '800',
          color: '#1a3c5e',
          letterSpacing: '6px',
          marginBottom: '8px',
        }}
        >
          ABMS
        </div>
        <div style={{ fontSize: '15px', color: '#6c7a89' }}>
          Afro Business Management Suite
        </div>
      </div>

      <h1 style={{
        fontSize: '22px',
        color: '#1a3c5e',
        marginBottom: '12px',
        fontWeight: '600',
      }}
      >
        SRS Business Configurator
      </h1>

      <p style={{
        fontSize: '14px',
        color: '#6c7a89',
        marginBottom: '32px',
        lineHeight: '1.7',
      }}
      >
        Answer a few simple questions about your business and we will
        generate a customized Software Requirements Specification (SRS)
        showing exactly which ABMS features and package level fits your needs.
      </p>

      <div style={{
        background: '#f4f6f9',
        borderRadius: '10px',
        padding: '20px 24px',
        marginBottom: '32px',
        textAlign: 'left',
      }}
      >
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#1a3c5e',
          marginBottom: '14px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
        >
          What to expect:
        </div>

        {steps.map(step => (
          <div key={step.num} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px',
          }}
          >
            <span style={{
              background: '#1a3c5e',
              color: 'white',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: '700',
              flexShrink: 0,
            }}
            >
              {step.num}
            </span>
            <span style={{ fontSize: '13px', color: '#2c3e50' }}>
              {step.text}
            </span>
          </div>
        ))}
      </div>

      <p style={{
        fontSize: '13px',
        color: '#aaa',
        marginBottom: '24px',
      }}
      >
        Takes approximately 3 — 5 minutes to complete
      </p>

      <button
        className="btn-primary"
        onClick={onNext}
        style={{ padding: '14px 48px', fontSize: '15px' }}
      >
        Start Configuration
      </button>

      <p style={{
        fontSize: '12px',
        color: '#ccc',
        marginTop: '20px',
      }}
      >
        by AfroditeSoft — All rights reserved © 2026
      </p>
    </div>
  )
}


// ================================================================
//  [3] EXPORT
// ================================================================

export default Welcome
