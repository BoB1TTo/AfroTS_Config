// ================================================================
//  ModuleSelection.tsx — Step 4
//  User selects which modules they need
//  by AfroditeSoft © 2026
// ================================================================

import type { FormData, ModuleKey } from '../types/wizard'

const MODULES = [
  {
    key: 'inventory',
    label: 'Inventory & Stock',
    desc: 'Products, stock levels, warehouses, stock movements',
    badge: 'Core',
  },
  {
    key: 'finance',
    label: 'Finance & Accounting',
    desc: 'Invoices, payments, COA, journal entries, reports',
    badge: 'Core',
  },
  {
    key: 'hr',
    label: 'HR & Payroll',
    desc: 'Employees, attendance, leave management, payroll',
    badge: 'Microservice',
  },
  {
    key: 'trading',
    label: 'Trading & Orders',
    desc: 'Purchase orders, sales orders, vendor catalog',
    badge: 'Microservice',
  },
  {
    key: 'manufacturing',
    label: 'Manufacturing',
    desc: 'Bill of materials, production orders, quality control',
    badge: 'Microservice',
  },
  {
    key: 'pos',
    label: 'Point of Sale',
    desc: 'Retail sales, cash register, receipts, daily closing',
    badge: 'Microservice',
  },
  {
    key: 'projects',
    label: 'Project Management',
    desc: 'Tasks, timesheets, milestones, project billing',
    badge: 'Microservice',
  },
] as const satisfies ReadonlyArray<{
  key: ModuleKey
  label: string
  desc: string
  badge: string
}>

interface ModuleSelectionProps {
  data: FormData
  onUpdate: (newData: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

function ModuleSelection({ data, onUpdate, onNext, onBack }: ModuleSelectionProps) {
  const toggleModule = (key: ModuleKey) => {
    onUpdate({
      modules: {
        ...data.modules,
        [key]: !data.modules[key],
      },
    })
  }

  const selectedCount = Object.values(data.modules || {}).filter(Boolean).length

  return (
    <div className="card">
      <h2 className="card-title">Module Selection</h2>
      <p className="card-subtitle">
        Select the modules your business needs.
        Core modules are in the base package — microservices are add-ons.
      </p>

      <div className="checkbox-group">
        {MODULES.map(module => (
          <div
            key={module.key}
            className="checkbox-item"
            onClick={() => toggleModule(module.key)}
            style={{
              borderColor: data.modules[module.key] ? '#1a3c5e' : '',
              background: data.modules[module.key] ? '#eef4fb' : '',
            }}
          >
            <input
              type="checkbox"
              checked={data.modules[module.key] || false}
              onChange={() => {}}
            />

            <div style={{ flex: 1 }}>
              <div className="checkbox-label">
                {module.label}
                <span style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  marginLeft: '8px',
                  padding: '1px 7px',
                  borderRadius: '4px',
                  color: module.badge === 'Core' ? '#2d6a9f' : '#854f0b',
                  background: module.badge === 'Core' ? '#e8f4fd' : '#faeeda',
                }}
                >
                  {module.badge}
                </span>
              </div>

              <div style={{
                fontSize: '12px',
                color: '#6c7a89',
                marginTop: '2px',
              }}
              >
                {module.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '13px', color: '#6c7a89', marginBottom: '8px' }}>
        {selectedCount} module{selectedCount !== 1 ? 's' : ''} selected
      </p>

      <div className="btn-row">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn-primary" onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  )
}

export default ModuleSelection
