// ================================================================
//  ModuleSelection.jsx — Step 4
//  User selects which modules they need
//  by AfroditeSoft © 2026
//
//  SECTIONS:
//  [1] DATA — modules list
//  [2] COMPONENT
//      [2.1] Toggle handler
//      [2.2] Render
//  [3] EXPORT
//
//  RULES:
//  Core modules (Inventory, Finance) are optional — client picks what they need
//  Example: warehouse needs Inventory only, law firm needs Finance only
//  Microservices are add-ons plugged in as business grows
//  All selected modules appear in the final report
// ================================================================


// ================================================================
//  [1] DATA
// ================================================================

// ── Modules list ──────────────────────────────────────────────────
// badge: 'Core'         = base package, optional
// badge: 'Microservice' = add-on service, plug in when needed
const MODULES = [
  {
    key:   'inventory',
    label: 'Inventory & Stock',
    desc:  'Products, stock levels, warehouses, stock movements',
    badge: 'Core',        // base package — optional
  },
  {
    key:   'finance',
    label: 'Finance & Accounting',
    desc:  'Invoices, payments, COA, journal entries, reports',
    badge: 'Core',        // base package — optional
  },
  {
    key:   'hr',
    label: 'HR & Payroll',
    desc:  'Employees, attendance, leave management, payroll',
    badge: 'Microservice', // add-on — plug in when needed
  },
  {
    key:   'trading',
    label: 'Trading & Orders',
    desc:  'Purchase orders, sales orders, vendor catalog',
    badge: 'Microservice',
  },
  {
    key:   'manufacturing',
    label: 'Manufacturing',
    desc:  'Bill of materials, production orders, quality control',
    badge: 'Microservice',
  },
  {
    key:   'pos',
    label: 'Point of Sale',
    desc:  'Retail sales, cash register, receipts, daily closing',
    badge: 'Microservice',
  },
  {
    key:   'projects',
    label: 'Project Management',
    desc:  'Tasks, timesheets, milestones, project billing',
    badge: 'Microservice',
  },
]


// ================================================================
//  [2] COMPONENT
// ================================================================

function ModuleSelection({ data, onUpdate, onNext, onBack }) {

  // ── [2.1] Toggle handler ──────────────────────────────────────
  // Flips module on/off — all modules are toggleable
  const toggleModule = (key) => {
    onUpdate({
      modules: {
        ...data.modules,
        [key]: !data.modules[key]   // flip true → false or false → true
      }
    })
  }

  // Count selected modules for display
  const selectedCount = Object.values(data.modules || {}).filter(Boolean).length

  // ── [2.2] Render ──────────────────────────────────────────────
  return (
    <div className="card">

      {/* Title */}
      <h2 className="card-title">Module Selection</h2>
      <p className="card-subtitle">
        Select the modules your business needs.
        Core modules are in the base package — microservices are add-ons.
      </p>

      {/* Modules list */}
      <div className="checkbox-group">
        {MODULES.map(module => (
          <div
            key={module.key}
            className="checkbox-item"
            onClick={() => toggleModule(module.key)}
            style={{
              borderColor: data.modules[module.key] ? '#1a3c5e' : '',
              background:  data.modules[module.key] ? '#eef4fb' : '',
            }}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={data.modules[module.key] || false}
              onChange={() => {}}   // handled by parent div onClick
            />

            {/* Module info */}
            <div style={{ flex: 1 }}>
              <div className="checkbox-label">
                {module.label}

                {/* Badge — blue for Core, amber for Microservice */}
                {module.badge && (
                  <span style={{
                    fontSize:     '11px',
                    fontWeight:   '600',
                    marginLeft:   '8px',
                    padding:      '1px 7px',
                    borderRadius: '4px',
                    color:        module.badge === 'Core' ? '#2d6a9f' : '#854f0b',
                    background:   module.badge === 'Core' ? '#e8f4fd' : '#faeeda',
                  }}>
                    {module.badge}
                  </span>
                )}
              </div>

              {/* Module description */}
              <div style={{
                fontSize:  '12px',
                color:     '#6c7a89',
                marginTop: '2px'
              }}>
                {module.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected modules count */}
      <p style={{ fontSize: '13px', color: '#6c7a89', marginBottom: '8px' }}>
        {selectedCount} module{selectedCount !== 1 ? 's' : ''} selected
      </p>

      {/* Navigation */}
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


// ================================================================
//  [3] EXPORT
// ================================================================

export default ModuleSelection
