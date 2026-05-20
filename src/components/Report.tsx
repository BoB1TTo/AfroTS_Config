// ================================================================
//  Report.tsx — Step 7
//  Generates client and developer reports from one assessment
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] IMPORTS
//  [2] TYPES
//  [3] COMPONENT
//  [4] EXPORT
// ================================================================

import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  ACCOUNTING_LABELS,
  LANGUAGE_LABELS,
  MODULE_LABELS,
  MODULE_TECH_DETAILS,
  PLATFORM_LABELS,
  REGION_LABELS,
} from '../features/report/reportConfig'
import { getReportViewModel } from '../features/report/reportSelectors'
import type { FormData } from '../types/wizard'


// ================================================================
//  [2] TYPES
// ================================================================

interface ReportProps {
  data: FormData
  onBack: () => void
  onRestart: () => void
}

interface InfoItemProps {
  label: string
  value: string
}

interface TagProps {
  label: string
  tone?: 'blue' | 'green' | 'amber'
}

interface SectionTitleProps {
  children: ReactNode
}


// ================================================================
//  [3] COMPONENT
// ================================================================

function Report({ data, onBack, onRestart }: ReportProps) {
  const [activeView, setActiveView] = useState<'client' | 'developer'>('client')

  const {
    packageCode,
    packageInfo,
    selectedModules,
    recommendations,
    developerNeeds,
    implementationPhases,
  } = getReportViewModel(data)

  const included = data.includeClientInfo !== false

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const documentRef = `ASRS-${today.replace(/\s/g, '-').toUpperCase()}`
  const printLabel = activeView === 'client' ? 'Print Client Report' : 'Print Developer Report'

  const InfoItem = ({ label, value }: InfoItemProps) => (
    <div style={{ background: '#f4f6f9', borderRadius: '8px', padding: '10px 14px' }}>
      <div style={{ fontSize: '11px', color: '#6c7a89', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a3c5e' }}>{value || '—'}</div>
    </div>
  )

  const Tag = ({ label, tone = 'blue' }: TagProps) => {
    const tones = {
      blue: { bg: '#eef4fb', color: '#1a3c5e' },
      green: { bg: '#eaf7ee', color: '#1a4731' },
      amber: { bg: '#fff4dd', color: '#8a5a00' },
    }

    return (
      <span
        style={{
          background: tones[tone].bg,
          color: tones[tone].color,
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
        }}
      >
        {label}
      </span>
    )
  }

  const SectionTitle = ({ children }: SectionTitleProps) => (
    <h3 style={{ color: '#1a3c5e', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
      {children}
    </h3>
  )

  const renderPreparedForCard = () => {
    if (!included) return null

    return (
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#aaa', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>
              Prepared For
            </div>
            {data.clientContact && (
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a3c5e', marginBottom: '4px' }}>
                {data.clientContact}
              </div>
            )}
            {data.clientCompany && (
              <div style={{ fontSize: '14px', color: '#2c3e50', marginBottom: '2px' }}>
                {data.clientCompany}
              </div>
            )}
            {data.clientPhone && (
              <div style={{ fontSize: '13px', color: '#6c7a89', marginBottom: '2px' }}>
                {data.clientPhone}
              </div>
            )}
            {data.clientEmail && (
              <div style={{ fontSize: '13px', color: '#6c7a89', marginBottom: '2px' }}>
                {data.clientEmail}
              </div>
            )}
            {(data.clientAddress || data.clientCity || data.clientCountry) && (
              <div style={{ fontSize: '13px', color: '#6c7a89', marginTop: '4px' }}>
                {[data.clientAddress, data.clientCity, data.clientCountry].filter(Boolean).join(', ')}
              </div>
            )}
          </div>

          <div style={{ minWidth: '220px', textAlign: 'right' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#aaa', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>
              Prepared By
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a3c5e', marginBottom: '4px' }}>
              AfroditeSoft
            </div>
            <div style={{ fontSize: '13px', color: '#6c7a89', marginBottom: '2px' }}>
              AfroTech Suite
            </div>
            <div style={{ fontSize: '13px', color: '#6c7a89' }}>{today}</div>
            <div style={{ fontSize: '12px', color: '#6c7a89', marginTop: '4px' }}>{documentRef}</div>
          </div>
        </div>

        {data.clientNotes && (
          <div style={{ marginTop: '16px', padding: '10px 14px', background: '#f4f6f9', borderRadius: '6px', fontSize: '13px', color: '#2c3e50', borderLeft: '3px solid #2d6a9f' }}>
            <span style={{ fontWeight: '600', marginRight: '8px' }}>Notes:</span>
            {data.clientNotes}
          </div>
        )}
      </div>
    )
  }

  const renderClientReport = () => (
    <>
      <div className="card" style={{ marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px', letterSpacing: '1px' }}>
          CLIENT PROJECT SUMMARY
        </div>
        <h1 style={{ fontSize: '26px', color: '#1a3c5e', marginBottom: '6px' }}>
          {packageInfo.clientLabel}
        </h1>
        <p style={{ color: '#6c7a89', marginBottom: '16px', fontSize: '14px' }}>
          {packageInfo.clientDesc}
        </p>
        <div style={{ display: 'inline-block', background: packageInfo.bg, color: packageInfo.color, padding: '8px 24px', borderRadius: '24px', fontWeight: '800', fontSize: '18px', marginBottom: '8px' }}>
          {packageInfo.clientLabel}
        </div>
        <div style={{ fontSize: '13px', color: '#6c7a89' }}>{packageInfo.users}</div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <SectionTitle>Project Scope For Client Approval</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <InfoItem label="Business Type" value={data.businessType || 'Not provided'} />
          <InfoItem label="Region" value={REGION_LABELS[data.businessRegion] || 'Not provided'} />
          <InfoItem label="Recommended Delivery" value={PLATFORM_LABELS[data.platform] || 'Not provided'} />
          <InfoItem label="Accounting Basis" value={ACCOUNTING_LABELS[data.accountingStd] || 'Not provided'} />
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <SectionTitle>Business Modules Requested</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {selectedModules.length > 0
            ? selectedModules.map(moduleKey => (
              <Tag key={moduleKey} label={MODULE_LABELS[moduleKey]?.client || moduleKey} />
            ))
            : <Tag label="No modules selected yet" tone="amber" />}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <SectionTitle>Languages And Working Conditions</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          {(data.languages || ['en']).map(lang => (
            <Tag key={lang} label={LANGUAGE_LABELS[lang] || lang} tone="green" />
          ))}
        </div>
        <div style={{ fontSize: '14px', color: '#2c3e50' }}>
          {data.offlineNeeded
            ? 'The client needs the system to keep working in low or no internet conditions.'
            : 'Standard connected usage is acceptable for this client project.'}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <SectionTitle>Recommended Delivery Summary</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {packageInfo.includes.map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#27ae60', fontWeight: '700', fontSize: '15px', flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: '14px', color: '#2c3e50' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <SectionTitle>Important Notes</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recommendations.map(note => (
              <div key={note} style={{ padding: '10px 14px', background: '#f4f6f9', borderLeft: '3px solid #2d6a9f', borderRadius: '0 6px 6px 0', fontSize: '13px', color: '#2c3e50' }}>
                {note}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )

  const renderDeveloperReport = () => (
    <>
      <div className="card" style={{ marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px', letterSpacing: '1px' }}>
          DEVELOPER TECHNICAL REFERENCE
        </div>
        <h1 style={{ fontSize: '26px', color: '#1a3c5e', marginBottom: '4px' }}>
          {packageInfo.label}
        </h1>
        <p style={{ color: '#6c7a89', marginBottom: '16px', fontSize: '14px' }}>
          Technical handoff for the same client project, based on the captured SRS needs.
        </p>
        <div style={{ display: 'inline-block', background: packageInfo.bg, color: packageInfo.color, padding: '8px 24px', borderRadius: '24px', fontWeight: '800', fontSize: '20px', letterSpacing: '3px', marginBottom: '8px' }}>
          {packageCode}
        </div>
        <div style={{ fontSize: '13px', color: '#6c7a89' }}>{packageInfo.users}</div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <SectionTitle>Implementation Inputs</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          <InfoItem label="Business Type" value={data.businessType || 'Not provided'} />
          <InfoItem label="Region" value={REGION_LABELS[data.businessRegion] || 'Not provided'} />
          <InfoItem label="Employees" value={data.employeeCount || 'Not provided'} />
          <InfoItem label="Locations" value={data.locationCount || 'Not provided'} />
          <InfoItem label="Companies" value={data.companyCount || 'Not provided'} />
          <InfoItem label="Head Office" value={data.hasHeadOffice ? 'Required' : 'Not required'} />
          <InfoItem label="Platform" value={PLATFORM_LABELS[data.platform] || 'Not provided'} />
          <InfoItem label="Accounting Standard" value={ACCOUNTING_LABELS[data.accountingStd] || 'Not provided'} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {developerNeeds.map(need => (
            <div key={need} style={{ padding: '10px 14px', background: '#f4f6f9', borderLeft: '3px solid #2d6a9f', borderRadius: '0 6px 6px 0', fontSize: '13px', color: '#2c3e50' }}>
              {need}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <SectionTitle>Selected Modules Technical Breakdown</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {selectedModules.length > 0 ? selectedModules.map(moduleKey => {
            const detail = MODULE_TECH_DETAILS[moduleKey]

            return (
              <div key={moduleKey} style={{ border: '1px solid #e2e6ea', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#1a3c5e', marginBottom: '8px' }}>
                  {MODULE_LABELS[moduleKey]?.dev || moduleKey}
                </div>
                <div style={{ fontSize: '13px', color: '#2c3e50', marginBottom: '8px' }}>
                  {detail.notes}
                </div>
                <div style={{ fontSize: '12px', color: '#6c7a89', marginBottom: '4px' }}>
                  Services: {detail.services.join(', ')}
                </div>
                <div style={{ fontSize: '12px', color: '#6c7a89', marginBottom: '4px' }}>
                  Database: {detail.database}
                </div>
                <div style={{ fontSize: '12px', color: '#6c7a89' }}>
                  API routes: {detail.routes.join(', ')}
                </div>
              </div>
            )
          }) : (
            <div style={{ padding: '10px 14px', background: '#fff4dd', borderLeft: '3px solid #e8a020', borderRadius: '0 6px 6px 0', fontSize: '13px', color: '#2c3e50' }}>
              No modules were selected, so module-level technical planning is still incomplete.
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <SectionTitle>Architecture And Delivery Notes</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ padding: '10px 14px', background: '#f4f6f9', borderRadius: '6px', fontSize: '13px', color: '#2c3e50' }}>
            Frontend target: React + Vite user interface adapted to the selected workflow and modules.
          </div>
          <div style={{ padding: '10px 14px', background: '#f4f6f9', borderRadius: '6px', fontSize: '13px', color: '#2c3e50' }}>
            Delivery model: {data.platform === 'desktop' ? 'Electron-first desktop runtime.' : data.platform === 'both' ? 'Hybrid web and Electron delivery.' : 'Browser-based deployment with server-backed services.'}
          </div>
          <div style={{ padding: '10px 14px', background: '#f4f6f9', borderRadius: '6px', fontSize: '13px', color: '#2c3e50' }}>
            Localization scope: {(data.languages || ['en']).map(lang => LANGUAGE_LABELS[lang] || lang).join(', ')}.
          </div>
          <div style={{ padding: '10px 14px', background: '#f4f6f9', borderRadius: '6px', fontSize: '13px', color: '#2c3e50' }}>
            Package baseline: {packageCode} with capacity target of {packageInfo.users.toLowerCase()}.
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <SectionTitle>Suggested Implementation Phases</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {implementationPhases.map((phase, index) => (
            <div key={phase} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ background: '#1a3c5e', color: '#fff', borderRadius: '999px', minWidth: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>
                {index + 1}
              </span>
              <span style={{ fontSize: '14px', color: '#2c3e50', paddingTop: '2px' }}>{phase}</span>
            </div>
          ))}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <SectionTitle>Technical Cautions</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recommendations.map(note => (
              <div key={note} style={{ padding: '10px 14px', background: note.includes('conflicts') ? '#fff8ec' : '#f4f6f9', borderLeft: `3px solid ${note.includes('conflicts') ? '#e8a020' : '#2d6a9f'}`, borderRadius: '0 6px 6px 0', fontSize: '13px', color: '#2c3e50' }}>
                {note}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )

  return (
    <div style={{ width: '100%', maxWidth: '820px' }}>
      {renderPreparedForCard()}

      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6c7a89', marginBottom: '4px', letterSpacing: '0.8px' }}>
              REPORT OUTPUTS
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a3c5e' }}>
              One client assessment, two deliverables
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              className={activeView === 'client' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveView('client')}
            >
              Client Report
            </button>
            <button
              className={activeView === 'developer' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveView('developer')}
            >
              Developer Report
            </button>
          </div>
        </div>
      </div>

      {activeView === 'client' ? renderClientReport() : renderDeveloperReport()}

      <div className="card">
        <p style={{ fontSize: '14px', color: '#6c7a89', marginBottom: '20px' }}>
          Use the client report for approval and business discussion, then switch to the developer report for technical planning and implementation reference.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => window.print()}>
            {printLabel}
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
//  [4] EXPORT
// ================================================================

export default Report
