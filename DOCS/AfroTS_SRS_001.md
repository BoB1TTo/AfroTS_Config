# ================================================================
#  AFROTECH SUITE
#  SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
#
#  Document ID      : AfroTS-SRS-001
#  Version          : 2.0 DRAFT
#  Standard         : Based on IEEE 830
#  Status           : IN REVIEW
#  Date             : April 2026
#  Owner            : AfroditeSoft
#  Product          : AfroTech Suite
#  Parent System    : ABMS — Afro Business Management Suite
#  Evolved From     : ASRS-SRS-001 (AfroTech Suite v1.0)
#
#  SECTIONS:
#  [1]   INTRODUCTION
#  [2]   PRODUCT OVERVIEW
#  [3]   USER PROFILES
#  [4]   FUNCTIONAL REQUIREMENTS
#  [4.1] Tool 1  — SRS Configurator
#  [4.2] Tool 2  — System Inspector
#  [4.3] Tool 3  — Hardware & Driver Scanner
#  [4.4] Tool 4  — Data Migration Wizard
#  [4.5] Tool 5  — Data Comparator
#  [4.6] Tool 6  — ERP Config Manager
#  [4.7] Tool 7  — Dev Toolkit
#  [5]   UI/UX REQUIREMENTS
#  [6]   TECHNICAL STACK
#  [7]   EXPORT & IMPORT
#  [8]   TWO VERSION STRATEGY
#  [9]   NON-FUNCTIONAL REQUIREMENTS
#  [10]  CONSTRAINTS & ASSUMPTIONS
#  [11]  TOOL ROLLOUT ROADMAP
#  [12]  GLOSSARY
# ================================================================


# ================================================================
#  [1] INTRODUCTION
# ================================================================

## [1.1] Purpose
  This document defines the complete software requirements for
  AfroTech Suite — a portable, modular desktop toolkit designed
  for AfroditeSoft technicians and consultants.

  AfroTech Suite consolidates multiple technical tools under one
  unified launcher:
    - Hardware inspection and driver discovery
    - Business SRS configuration
    - Data migration from legacy systems to ABMS
    - Dataset comparison and ERP configuration management
    - Developer utilities

  This SRS serves as:
    - Primary reference for all development decisions
    - Feature specification for current and future versions
    - Guide for testing and quality validation
    - Handover document for any future developer

  Evolved from: ASRS-SRS-001 (AfroTech Suite v1.0 FINAL)

## [1.2] Product Identity
  Full Name    :  AfroTech Suite
  Short Name   :  AfroTS
  Version      :  2.0
  Type         :  Standalone desktop tool (portable)
  Owner        :  AfroditeSoft
  Parent       :  ABMS — Afro Business Management Suite
  Evolved From :  AfroTech Suite (ASRS-SRS-001)
  Repository   :  https://github.com/AfroditeSoft/AfroTech_Suite

## [1.3] Scope
  AfroTech Suite is a portable desktop application that:
    - Provides a unified launcher for 7 independent technical tools
    - Guides consultants through ABMS SRS configuration (Tool 1)
    - Inspects client hardware via PowerShell/WMI (Tool 2)
    - Detects unknown/missing drivers using bundled hardware ID databases (Tool 3)
    - Collects and exports legacy data for migration to ABMS (Tool 4)
    - Compares two datasets or configuration files visually (Tool 5)
    - Saves and manages multiple ABMS ERP configurations (Tool 6)
    - Provides developer utilities: JSON viewer, API tester, log reader (Tool 7)
    - Exports all tool outputs to PDF and Excel formats
    - Runs as a portable .exe — no installation required
    - Works fully offline — no internet connection needed (except optional driver search)

  OUT OF SCOPE (version 2.0):
    - Direct write/import into live ABMS database (planned v2.1+)
    - Driver auto-download and installation (planned v2.1+)
    - Online/cloud version (planned v3.0)
    - Mobile version
    - Multi-user collaboration
    - Digital signature on reports

## [1.4] Definitions & Abbreviations
  ABMS     Afro Business Management Suite
  SRS      Software Requirements Specification
  AfroTS   AfroTech Suite (this product)
  ERP      Enterprise Resource Planning
  WMI      Windows Management Instrumentation
  PnP      Plug and Play (Windows device system)
  VEN      Vendor ID (hardware identifier prefix)
  DEV      Device ID (hardware identifier prefix)
  PCI      Peripheral Component Interconnect (hardware bus)
  USB      Universal Serial Bus
  HID      Hardware ID (raw device identifier string)
  SMART    Self-Monitoring Analysis and Reporting Technology (disk health)
  ODBC     Open Database Connectivity (database driver standard)
  pkg      Package level (SB, SB+, MB, LB)
  SB       Small Business package
  SB+      Small Business Advanced package
  MB       Medium Business package
  LB       Large Business / Enterprise package
  HO       Head Office
  COA      Chart of Accounts
  OHADA    African accounting standard
  IFRS     International Financial Reporting Standards
  GAAP     Generally Accepted Accounting Principles
  UI       User Interface
  UX       User Experience
  exe      Executable file — Windows application
  PDF      Portable Document Format
  xlsx     Microsoft Excel format
  RTL      Right-to-Left (Arabic layout)
  LTR      Left-to-Right (English/French layout)
  mdb      Microsoft Access database file (legacy)
  accdb    Microsoft Access database file (modern)
  IIF      Intuit Interchange Format (QuickBooks export)
  JSON     JavaScript Object Notation
  API      Application Programming Interface

## [1.5] References
  - ASRS-SRS-001 (AfroTech Suite v1.0 — parent document)
  - ABMS SRS Document (ABMS-SRS-001)
  - AfroditeSoft Architecture Document (SRC.md)
  - IEEE 830 SRS Standard
  - Electron Documentation
  - React Documentation
  - i18next Documentation
  - systeminformation npm package documentation
  - SheetJS (xlsx) documentation
  - pci.ids / usb.ids public hardware ID databases


# ================================================================
#  [2] PRODUCT OVERVIEW
# ================================================================

## [2.1] Product Vision
  "Inspect, Configure, Migrate — one portable suite."

  AfroTech Suite is the unified technical toolkit used by
  AfroditeSoft technicians at every stage of the client engagement:
    - Before ABMS installation: inspect hardware, detect missing drivers
    - During onboarding: configure SRS, assess business needs
    - During migration: extract and map legacy data for import
    - During development: compare configs, test APIs, review logs

## [2.2] Core Principles
  SIMPLICITY      Technicians can operate each tool without training
  PORTABILITY     Single .exe file — runs anywhere, no install
  OFFLINE         Works with zero internet connection
  PROFESSIONAL    All outputs look like formal technical documents
  MODULAR         Each tool is independent — launch only what you need
  DIAGNOSTIC      Hardware and software inspection at technician level
  EXPORTABLE      PDF + Excel — all tool outputs shareable
  DUAL MODE       Client version and Developer version (where applicable)

## [2.3] How AfroTech Suite Fits in the ABMS Ecosystem

  PRE-INSTALLATION:
    Technician runs Tool 2 (System Inspector)
    → validates client machine meets ABMS requirements
    ↓
    Technician runs Tool 3 (Hardware & Driver Scanner)
    → identifies and resolves missing drivers before setup
    ↓

  ONBOARDING:
    Consultant runs Tool 1 (SRS Configurator)
    → fills wizard with client → generates configuration report
    ↓
    AfroditeSoft reviews report → confirms package and modules
    ↓

  MIGRATION:
    Technician runs Tool 4 (Data Migration Wizard)
    → connects to legacy system → maps fields → exports clean file
    ↓
    AfroditeSoft reviews exported file → imports into ABMS
    ↓

  ONGOING / DEVELOPMENT:
    Tool 5 (Data Comparator)   → verify migrated data integrity
    Tool 6 (ERP Config Manager) → manage and promote configurations
    Tool 7 (Dev Toolkit)        → debug, test APIs, review logs

## [2.4] Tool Launcher
  The AfroTech Suite opens to a central launcher dashboard.
  Each tool is displayed as a card with:
    - Tool number and name
    - Short description
    - Status badge (Available / Coming Soon)
    - Launch button
  The launcher follows the same Toolbox settings as all tools
  (font, dark mode, language, theme).


# ================================================================
#  [3] USER PROFILES
# ================================================================

## [3.1] Primary User — AfroditeSoft Technician
  Technical level  : High
  Tools used       : Tool 2, Tool 3 (pre-installation)
                     Tool 4, Tool 5 (migration)
                     Tool 7 (development)
  Usage            : Client site visits, hardware checks, data migration
  Needs            : Full raw technical details
                     PowerShell output, hardware IDs, driver status
                     Exportable PDF report to leave with client

## [3.2] Primary User — AfroditeSoft Consultant
  Technical level  : Medium to High
  Tools used       : Tool 1 (SRS configuration)
                     Tool 6 (ERP config management)
  Usage            : Client meetings, proposals, onboarding
  Needs            : Professional PDF for client presentation
                     Save/load sessions between meetings

## [3.3] Primary User — AfroditeSoft Developer
  Technical level  : High
  Tools used       : Tool 5, Tool 6, Tool 7
  Usage            : Technical planning, debugging, architecture decisions
  Needs            : Full stack details, JSON viewer, API tester
                     Excel export for editing and re-importing

## [3.4] Secondary User — Client (limited)
  Technical level  : Low to medium
  Tools used       : Tool 1 (Client version only — self-assessment)
  Usage            : Independent assessment before contacting AfroditeSoft
  Needs            : Plain business language — no technical jargon
                     Simple clean interface, easy export


# ================================================================
#  [4] FUNCTIONAL REQUIREMENTS
# ================================================================

# ================================================================
#  [4.1] TOOL 1 — SRS CONFIGURATOR
#  Carried forward from ASRS-SRS-001 — no changes to core wizard
# ================================================================

## [4.1.1] Overview
  The original AfroTech Suite becomes Tool 1 in the suite.
  All requirements from ASRS-SRS-001 sections [4] and [5] remain
  valid and are incorporated by reference.
  This section documents only additions and changes.

## [4.1.2] Integration Changes
  REQ-T1-001  Tool 1 launched from AfroTech Suite launcher
  REQ-T1-002  Back to Launcher button available at all wizard steps
  REQ-T1-003  Session saved per tool — each tool has its own session file
  REQ-T1-004  All original 7 wizard steps preserved unchanged
  REQ-T1-005  All original export options (PDF, Excel) preserved
  REQ-T1-006  Client / Developer version toggle preserved


# ================================================================
#  [4.2] TOOL 2 — SYSTEM INSPECTOR
# ================================================================

## [4.2.1] Overview
  System Inspector collects full hardware and software information
  from the client machine before ABMS installation.
  It is designed for AfroditeSoft technicians — not end clients.
  All data collection uses PowerShell commands spawned from Electron.
  No low-level language required — PowerShell/WMI provides full access.

## [4.2.2] CPU Information
  REQ-T2-001  Read CPU model name and manufacturer
  REQ-T2-002  Read number of physical cores and logical processors
  REQ-T2-003  Read CPU base clock speed (GHz)
  REQ-T2-004  Read CPU current utilization (%)
  REQ-T2-005  Read CPU architecture (x64 / x86 / ARM)
  REQ-T2-006  PowerShell source: Get-CimInstance Win32_Processor

## [4.2.3] RAM / Memory Information
  REQ-T2-007  Read total installed RAM (GB)
  REQ-T2-008  Read currently used RAM (GB)
  REQ-T2-009  Read free available RAM (GB)
  REQ-T2-010  Read number of RAM slots used vs total slots
  REQ-T2-011  Read RAM type (DDR4, DDR5, etc.) if available
  REQ-T2-012  Read RAM speed (MHz) if available
  REQ-T2-013  PowerShell source: Get-CimInstance Win32_PhysicalMemory

## [4.2.4] Storage Information
  REQ-T2-014  List all drives (HDD, SSD, NVMe, USB)
  REQ-T2-015  Show drive letter, total size, used space, free space
  REQ-T2-016  Show drive type (Fixed, Removable, Network)
  REQ-T2-017  Show file system (NTFS, FAT32, exFAT)
  REQ-T2-018  PowerShell source: Get-PSDrive, Get-CimInstance Win32_DiskDrive

## [4.2.5] Operating System Information
  REQ-T2-019  Read OS name (Windows 10, Windows 11, etc.)
  REQ-T2-020  Read OS build number and version
  REQ-T2-021  Read OS architecture (64-bit / 32-bit)
  REQ-T2-022  Read OS install date
  REQ-T2-023  Read last boot time
  REQ-T2-024  Read Windows activation status
  REQ-T2-025  Read current username and hostname
  REQ-T2-026  PowerShell source: Get-CimInstance Win32_OperatingSystem

## [4.2.6] Network Information
  REQ-T2-027  List all network adapters (name, type, status)
  REQ-T2-028  Show IP address per adapter (IPv4 and IPv6)
  REQ-T2-029  Show MAC address per adapter
  REQ-T2-030  Show connection speed if available
  REQ-T2-031  PowerShell source: Get-NetAdapter, Get-NetIPAddress

## [4.2.7] GPU Information
  REQ-T2-032  Read GPU model name and manufacturer
  REQ-T2-033  Read dedicated VRAM (MB/GB) if available
  REQ-T2-034  Read current display resolution
  REQ-T2-035  PowerShell source: Get-CimInstance Win32_VideoController

## [4.2.8] ABMS Compatibility Check
  REQ-T2-036  Automatically evaluate collected data against ABMS minimum requirements:
               CPU    : 2+ cores required
               RAM    : 4GB minimum, 8GB recommended
               OS     : Windows 10 64-bit minimum
               Disk   : 10GB free space on C: drive minimum
               Screen : 1280x720 minimum
  REQ-T2-037  Show PASS / WARN / FAIL badge per requirement
  REQ-T2-038  Show overall compatibility summary at top of report

## [4.2.9] Export
  REQ-T2-039  Export full system report to PDF (technician format)
  REQ-T2-040  Export full system report to Excel
  REQ-T2-041  Report includes: scan date, hostname, technician name field
  REQ-T2-042  Report includes ABMS compatibility summary section


# ================================================================
#  [4.3] TOOL 3 — HARDWARE & DRIVER SCANNER
# ================================================================

## [4.3.1] Overview
  Hardware & Driver Scanner enumerates ALL devices on the client
  machine — including unknown and driver-missing devices.
  Uses PowerShell WMI queries to read Windows PnP device registry.
  Matches raw hardware IDs against bundled pci.ids and usb.ids
  databases to identify unknown hardware without internet access.

## [4.3.2] Device Enumeration
  REQ-T3-001  List ALL PnP devices — installed and uninstalled
  REQ-T3-002  Show device friendly name if driver is installed
  REQ-T3-003  Show device class (Display, Network, Audio, Storage, etc.)
  REQ-T3-004  Show device status (OK / Error / Unknown / Disabled)
  REQ-T3-005  Show Windows error code if device has error (Code 10, 28, etc.)
  REQ-T3-006  Flag devices with status NOT OK in red
  REQ-T3-007  PowerShell source: Get-CimInstance Win32_PnPEntity

## [4.3.3] Hardware ID Reading
  REQ-T3-008  Read raw Hardware ID string for all devices
               Example: PCI\VEN_8086&DEV_1234&SUBSYS_00000000&REV_04
  REQ-T3-009  Parse VEN (Vendor ID) and DEV (Device ID) from HID string
  REQ-T3-010  Parse SUBSYS (Subsystem ID) if present
  REQ-T3-011  Handle USB IDs format: USB\VID_XXXX&PID_XXXX

## [4.3.4] Local Hardware ID Lookup (Offline)
  REQ-T3-012  Bundle pci.ids file inside the Electron app (~1MB)
  REQ-T3-013  Bundle usb.ids file inside the Electron app (~0.5MB)
  REQ-T3-014  On scan, match VEN+DEV against pci.ids for PCI devices
  REQ-T3-015  On scan, match VID+PID against usb.ids for USB devices
  REQ-T3-016  Show resolved name: "Intel HD Audio Controller" (from local db)
  REQ-T3-017  Show "ID not found in local database" if no match
  REQ-T3-018  Show database version and last update date in tool footer

## [4.3.5] Unknown Device Identification
  REQ-T3-019  Detect devices where driver status = "Unknown" or "No Driver"
  REQ-T3-020  Show raw HID string for each unknown device
  REQ-T3-021  Attempt local ID lookup — show resolved vendor+device name
  REQ-T3-022  Show "Driver Missing" badge in red per unknown device
  REQ-T3-023  Count total unknown devices — show in summary at top

## [4.3.6] Driver Search Link (Online Optional)
  REQ-T3-024  For each unknown device, generate a driver search URL:
               https://www.google.com/search?q=driver+VEN_XXXX+DEV_XXXX+Windows
  REQ-T3-025  Show [Search Driver] button per unknown device
  REQ-T3-026  Clicking opens the URL in the system default browser
  REQ-T3-027  Button visible but labeled "Requires Internet" when offline
  REQ-T3-028  No driver download or installation in v2.0 (planned v2.1)

## [4.3.7] Installed Driver Details
  REQ-T3-029  For devices WITH drivers: show driver name and version
  REQ-T3-030  Show driver provider (manufacturer)
  REQ-T3-031  Show driver install date
  REQ-T3-032  PowerShell source: Get-WmiObject Win32_PnPSignedDriver

## [4.3.8] Export
  REQ-T3-033  Export full driver report to PDF
  REQ-T3-034  Export full driver report to Excel
  REQ-T3-035  Separate section in report for unknown/missing drivers
  REQ-T3-036  Report includes: scan date, hostname, OS version


# ================================================================
#  [4.4] TOOL 4 — DATA MIGRATION WIZARD
# ================================================================

## [4.4.1] Overview
  Data Migration Wizard extracts legacy business data from multiple
  source types, allows visual field mapping, validates the data,
  and exports a clean migration-ready file for AfroditeSoft to
  import into the new ABMS system.

  TWO-PHASE DESIGN:
    Phase 1 (v2.0) : Extract → Map → Validate → Export file
    Phase 2 (v2.1+): Load exported file → Write directly into ABMS DB

  This tool is for internal AfroditeSoft use only.

## [4.4.2] Supported Source Types

  ── FILE SOURCES (no driver required) ───────────────────────────
  REQ-T4-001  CSV file (.csv) — detect delimiter automatically
  REQ-T4-002  Excel file (.xlsx, .xls) — list sheets for selection
  REQ-T4-003  JSON file (.json) — flat or array format
  REQ-T4-004  QuickBooks export file (.iif, .csv exported from QB)

  ── DATABASE SOURCES (connection required) ───────────────────────
  REQ-T4-005  MS SQL Server — connection string input:
               Host, Port, Database name, Username, Password
  REQ-T4-006  MySQL / MariaDB — connection string input:
               Host, Port, Database name, Username, Password
  REQ-T4-007  MS Access — file picker (.mdb or .accdb)
               Note: Requires Microsoft Access ODBC driver on machine
               Tool checks for ODBC driver and shows warning if missing
  REQ-T4-008  Connection test button before proceeding
  REQ-T4-009  Show connection error message inline on failure

## [4.4.3] Schema Discovery
  REQ-T4-010  After connection: auto-read all tables/sheets
  REQ-T4-011  Show table list — user selects which tables to migrate
  REQ-T4-012  Auto-read column names and data types per table
  REQ-T4-013  Show row count per table
  REQ-T4-014  Show preview of first 10 rows per table

## [4.4.4] Field Mapping
  REQ-T4-015  Show side-by-side mapping interface:
               LEFT  : source columns (from legacy system)
               RIGHT : ABMS target fields (predefined list)
  REQ-T4-016  Allow drag-and-drop or dropdown mapping per field
  REQ-T4-017  Mark required ABMS fields with red asterisk
  REQ-T4-018  Allow leaving source fields unmapped (they are excluded)
  REQ-T4-019  Allow leaving ABMS fields unmapped (they remain empty)
  REQ-T4-020  Show data type mismatch warning (text → number, etc.)
  REQ-T4-021  Save mapping as a reusable profile (.json)
  REQ-T4-022  Load a previously saved mapping profile

## [4.4.5] Data Validation
  REQ-T4-023  Run validation before export — check for:
               Empty required fields
               Type mismatches (text in numeric field)
               Duplicate primary keys
               Date format inconsistencies
               Values exceeding field length limits
  REQ-T4-024  Show validation summary: X errors, Y warnings
  REQ-T4-025  Show per-row error list with row number and issue
  REQ-T4-026  Allow export despite warnings (with confirmation)
  REQ-T4-027  Block export if hard errors remain (require fix)

## [4.4.6] Export (Phase 1)
  REQ-T4-028  Export mapped and validated data to Excel (.xlsx)
  REQ-T4-029  Export mapped and validated data to JSON
  REQ-T4-030  Each ABMS table becomes one sheet in Excel
  REQ-T4-031  Export includes mapping summary sheet
  REQ-T4-032  Export includes validation log sheet
  REQ-T4-033  File named: Migration_[ClientName]_[Date].xlsx

## [4.4.7] Phase 2 — ABMS Direct Import (Planned v2.1)
  REQ-T4-034  [PLANNED] Load validated migration file
  REQ-T4-035  [PLANNED] Connect to target ABMS database
  REQ-T4-036  [PLANNED] Insert records with conflict handling
  REQ-T4-037  [PLANNED] Full rollback on error
  REQ-T4-038  [PLANNED] Generate migration completion log


# ================================================================
#  [4.5] TOOL 5 — DATA COMPARATOR
# ================================================================

## [4.5.1] Overview
  Data Comparator loads two datasets or configuration files and
  produces a visual diff showing what was added, removed, or changed.
  Useful for verifying migrated data or comparing two ERP configs.

## [4.5.2] Input Sources
  REQ-T5-001  Load File A and File B independently
  REQ-T5-002  Supported formats: Excel (.xlsx), CSV, JSON
  REQ-T5-003  For Excel: select which sheet to compare
  REQ-T5-004  Auto-detect column headers as comparison keys
  REQ-T5-005  Allow user to select the primary key column for matching

## [4.5.3] Comparison Engine
  REQ-T5-006  Match rows by primary key value
  REQ-T5-007  Identify: Added rows (in B, not in A)
  REQ-T5-008  Identify: Removed rows (in A, not in B)
  REQ-T5-009  Identify: Changed rows (key exists in both, values differ)
  REQ-T5-010  Identify: Unchanged rows (identical in both)
  REQ-T5-011  Show summary: X added, Y removed, Z changed, N unchanged

## [4.5.4] Visual Diff Display
  REQ-T5-012  Color coding:
               Green  = Added row
               Red    = Removed row
               Yellow = Changed row (highlight changed cells only)
               White  = Unchanged row
  REQ-T5-013  Toggle: Show all rows / Show changes only
  REQ-T5-014  For changed rows: show old value vs new value per cell
  REQ-T5-015  Filter by change type (added / removed / changed)

## [4.5.5] Export
  REQ-T5-016  Export comparison report to Excel (color-coded)
  REQ-T5-017  Export comparison report to PDF
  REQ-T5-018  Include summary statistics at top of report


# ================================================================
#  [4.6] TOOL 6 — ERP CONFIG MANAGER
# ================================================================

## [4.6.1] Overview
  ERP Config Manager saves, loads, and manages multiple ABMS
  configuration sessions. Allows comparing two configurations
  side by side and promoting a config from dev to production stage.

## [4.6.2] Config Storage
  REQ-T6-001  Save any SRS Configurator session as a named config
  REQ-T6-002  Store configs as JSON files in local configs/ folder
  REQ-T6-003  List all saved configs with: name, client, date, package
  REQ-T6-004  Open / Edit / Delete / Duplicate any saved config
  REQ-T6-005  Tag configs with status: Draft / Review / Approved / Deployed

## [4.6.3] Config Comparison
  REQ-T6-006  Select two configs to compare side by side
  REQ-T6-007  Show differences: modules added/removed, size changes, etc.
  REQ-T6-008  Highlight fields that differ between the two configs
  REQ-T6-009  Export comparison to PDF

## [4.6.4] Promotion Workflow
  REQ-T6-010  Mark a config as: Dev → Staging → Production
  REQ-T6-011  Promotion requires confirmation dialog
  REQ-T6-012  Log promotion history with date and user note
  REQ-T6-013  Exported report shows current promotion stage


# ================================================================
#  [4.7] TOOL 7 — DEV TOOLKIT
# ================================================================

## [4.7.1] Overview
  Dev Toolkit provides lightweight developer utilities for
  AfroditeSoft developers: JSON formatting, log reading,
  API endpoint testing, and environment variable inspection.

## [4.7.2] JSON Viewer / Formatter
  REQ-T7-001  Paste or load JSON from file
  REQ-T7-002  Format/prettify JSON with syntax highlighting
  REQ-T7-003  Validate JSON — show error with line number
  REQ-T7-004  Collapse/expand nested objects and arrays
  REQ-T7-005  Copy formatted JSON to clipboard

## [4.7.3] Log File Reader
  REQ-T7-006  Open and display any plain text log file
  REQ-T7-007  Filter log lines by keyword search
  REQ-T7-008  Highlight ERROR and WARNING lines in red/yellow
  REQ-T7-009  Jump to end of file (tail mode)
  REQ-T7-010  Show line numbers

## [4.7.4] API Endpoint Tester
  REQ-T7-011  Input: HTTP method (GET, POST, PUT, DELETE)
  REQ-T7-012  Input: URL / endpoint
  REQ-T7-013  Input: Headers (key-value pairs)
  REQ-T7-014  Input: Body (JSON or form data)
  REQ-T7-015  Send request and display: status code, response time, body
  REQ-T7-016  Format response JSON automatically
  REQ-T7-017  Save request as named preset for reuse
  REQ-T7-018  Note: Requires internet — show warning if offline

## [4.7.5] Environment Checker
  REQ-T7-019  Read and display Node.js version
  REQ-T7-020  Read and display npm version
  REQ-T7-021  Read and display Electron version
  REQ-T7-022  Read and display OS info (reuses Tool 2 data if available)
  REQ-T7-023  Read PATH environment variable — list all entries
  REQ-T7-024  Show which ABMS-required tools are found/missing


# ================================================================
#  [5] UI/UX REQUIREMENTS
# ================================================================

## [5.1] Launcher Dashboard
  REQ-UI-001  Launcher shows all 7 tools as cards in a responsive grid
  REQ-UI-002  Each card: tool number, icon, name, short description
  REQ-UI-003  Each card: status badge — Available or Coming Soon
  REQ-UI-004  Coming Soon tools are visible but button is disabled
  REQ-UI-005  Launcher header shows AfroTech Suite name and version
  REQ-UI-006  Toolbox is visible on launcher (same as all tools)

## [5.2] Toolbox (Global — All Tools)
  REQ-UI-007  Font size: A− value A+ (12px to 20px)
  REQ-UI-008  Mode: Light / Dark toggle
  REQ-UI-009  Lang: EN / FR / AR cycle button
  REQ-UI-010  Theme: 4 color dots (Navy, Green, Purple, Teal)
  REQ-UI-011  Reset: red outlined button with confirmation
  REQ-UI-012  Toolbox persists across all tools — one setting for all

## [5.3] Navigation
  REQ-UI-013  Every tool has a Back to Launcher button (top-left)
  REQ-UI-014  Back to Launcher prompts confirmation if unsaved work exists
  REQ-UI-015  Step-based tools (Tool 1, Tool 4) show step navigator dots
  REQ-UI-016  Single-screen tools (Tool 2, 3, 5, 6, 7) show no step dots

## [5.4] Data Display — Tables
  REQ-UI-017  All tabular data shown in styled data tables
  REQ-UI-018  Tables support column sorting (click header)
  REQ-UI-019  Tables support keyword filter/search input above
  REQ-UI-020  Alternating row colors for readability
  REQ-UI-021  Status badges (PASS, WARN, FAIL, OK, ERROR) color-coded

## [5.5] Forms and Inputs
  REQ-UI-022  Required fields marked with red asterisk
  REQ-UI-023  Validation messages shown inline — never popup
  REQ-UI-024  File picker uses Electron native dialog
  REQ-UI-025  Connection string fields: host / port / db / user / pass
               shown as labeled individual inputs — not one string field

## [5.6] Accessibility
  REQ-UI-026  Minimum font size 12px
  REQ-UI-027  Sufficient color contrast in both light and dark mode
  REQ-UI-028  Keyboard navigation supported
  REQ-UI-029  All tool cards accessible via Tab key on launcher


# ================================================================
#  [6] TECHNICAL STACK
# ================================================================

## [6.1] Core Stack
  Frontend     :  React 19 + Vite 8
  Language     :  JSX (JavaScript)
  Styling      :  Plain CSS with CSS variables
  Desktop      :  Electron 41
  Build tool   :  electron-builder 26
  i18n         :  i18next
  PDF export   :  jsPDF or Puppeteer
  Excel export :  SheetJS (xlsx)
  Excel import :  SheetJS (xlsx)

## [6.2] Tool-Specific Libraries
  Tool 2 & 3   :  PowerShell spawned via Node.js child_process
                   systeminformation (npm) — fallback/supplement
                   pci.ids + usb.ids — bundled static files
  Tool 4       :  mssql (npm) — MS SQL Server connection
                   mysql2 (npm) — MySQL / MariaDB connection
                   node-adodb (npm) — MS Access via ODBC
                   SheetJS — CSV, Excel read/write
  Tool 5       :  Custom diff engine (pure JS)
  Tool 7       :  node-fetch or axios — API tester HTTP calls

## [6.3] File Structure
  AfroTech_Suite\
    ├── src\
    │   ├── App.jsx                  ← suite launcher controller
    │   ├── App.css                  ← global styles + CSS variables
    │   ├── electron\
    │   │   └── main.js              ← Electron entry point
    │   ├── assets\
    │   │   ├── pci.ids              ← bundled PCI hardware ID database
    │   │   └── usb.ids              ← bundled USB hardware ID database
    │   └── tools\
    │       ├── tool1_srs\           ← SRS Configurator (original components)
    │       │   ├── Welcome.jsx
    │       │   ├── BusinessProfile.jsx
    │       │   ├── SizeAssessment.jsx
    │       │   ├── ModuleSelection.jsx
    │       │   ├── TechPreferences.jsx
    │       │   ├── ClientInfo.jsx
    │       │   ├── StepNavigator.jsx
    │       │   └── Report.jsx
    │       ├── tool2_system\        ← System Inspector
    │       │   ├── SystemInspector.jsx
    │       │   ├── CpuPanel.jsx
    │       │   ├── RamPanel.jsx
    │       │   ├── StoragePanel.jsx
    │       │   ├── OsPanel.jsx
    │       │   ├── NetworkPanel.jsx
    │       │   ├── GpuPanel.jsx
    │       │   ├── CompatibilityReport.jsx
    │       │   └── ps_queries.js    ← PowerShell command strings
    │       ├── tool3_drivers\       ← Hardware & Driver Scanner
    │       │   ├── DriverScanner.jsx
    │       │   ├── DeviceTable.jsx
    │       │   ├── UnknownDevices.jsx
    │       │   └── ids_lookup.js    ← pci.ids / usb.ids parser
    │       ├── tool4_migration\     ← Data Migration Wizard
    │       │   ├── MigrationWizard.jsx
    │       │   ├── SourceSelector.jsx
    │       │   ├── SchemaViewer.jsx
    │       │   ├── FieldMapper.jsx
    │       │   ├── Validator.jsx
    │       │   └── ExportStep.jsx
    │       ├── tool5_comparator\    ← Data Comparator
    │       │   ├── Comparator.jsx
    │       │   ├── DiffTable.jsx
    │       │   └── diff_engine.js
    │       ├── tool6_erpconfig\     ← ERP Config Manager
    │       │   ├── ConfigManager.jsx
    │       │   ├── ConfigList.jsx
    │       │   └── ConfigCompare.jsx
    │       └── tool7_devkit\        ← Dev Toolkit
    │           ├── DevToolkit.jsx
    │           ├── JsonViewer.jsx
    │           ├── LogReader.jsx
    │           ├── ApiTester.jsx
    │           └── EnvChecker.jsx
    ├── public\
    ├── dist\                        ← React build output
    ├── release\                     ← Electron portable .exe
    └── package.json

## [6.4] Code Style Rules
  Following AfroditeSoft code style (SRC.md Section [7]):
  Section headers  : // === [N] TITLE ===
  Block headers    : // ── [N.X] NAME ───
  Syntax comments  : same line explanation
  Numbering        : sequential, no gaps
  Export           : always last section in every file


# ================================================================
#  [7] EXPORT & IMPORT
# ================================================================

## [7.1] Export Formats (All Tools)
  REQ-EXP-001  PDF export available in all tools that produce a report
  REQ-EXP-002  Excel export available in Tool 1, 2, 3, 4, 5
  REQ-EXP-003  JSON export available in Tool 4, 6
  REQ-EXP-004  All exports include: date, tool name, version, hostname

## [7.2] Import Formats
  REQ-IMP-001  Tool 1 : Import previous session from Excel (.xlsx)
  REQ-IMP-002  Tool 4 : Import source data from CSV, Excel, JSON, IIF
  REQ-IMP-003  Tool 5 : Import two files for comparison
  REQ-IMP-004  Tool 6 : Import saved config JSON

## [7.3] Session Management
  REQ-SES-001  Each tool saves its own session file independently
  REQ-SES-002  Sessions auto-saved on every change (debounced 2 seconds)
  REQ-SES-003  Session files stored in same folder as .exe
  REQ-SES-004  Session file naming: [ToolN]_session.json
  REQ-SES-005  On relaunch: offer to restore last session per tool


# ================================================================
#  [8] TWO VERSION STRATEGY
# ================================================================

## [8.1] Applies To
  The Client / Developer version toggle applies ONLY to Tool 1
  (SRS Configurator) — same as in the original AfroTech Suite design.
  All other tools are Developer/Technician mode only.

## [8.2] Client Version (Tool 1 only)
  Plain business language — no technical jargon
  Simplified report output — business-level summary
  Suitable for client self-assessment and review

## [8.3] Developer Version (Tool 1 + default for all other tools)
  Full technical details in all reports
  Stack, databases, module codes, architecture decisions
  Raw hardware IDs, driver versions, error codes visible

## [8.4] Beta Versioning Rule
  The project uses a beta-first numbering rule during active
  development:
    - `0.0.1-beta.1` is the starting beta baseline
    - minor changes increment the rightmost number only
    - example: `0.0.1-beta.1` → `0.0.2-beta.1` → `0.0.3-beta.1`
  Major or scope-level changes are handled separately only when the
  product exits the beta track.


# ================================================================
#  [9] NON-FUNCTIONAL REQUIREMENTS
# ================================================================

## [9.1] Performance
  REQ-PER-001  App launcher loads in under 3 seconds
  REQ-PER-002  Tool launch from launcher: under 1 second
  REQ-PER-003  System scan (Tool 2): completes in under 10 seconds
  REQ-PER-004  Driver scan (Tool 3): completes in under 15 seconds
  REQ-PER-005  Hardware ID lookup (local): instant — no delay
  REQ-PER-006  DB connection test (Tool 4): timeout after 10 seconds
  REQ-PER-007  Excel export: under 5 seconds
  REQ-PER-008  PDF export: under 10 seconds

## [9.2] Portability
  REQ-POR-001  Single .exe file — no installation required
  REQ-POR-002  Works from USB drive or any folder
  REQ-POR-003  Sessions auto-saved in same folder as .exe
  REQ-POR-004  No registry entries — clean uninstall by deleting folder
  REQ-POR-005  Works on Windows 10 and Windows 11 (64-bit)
  REQ-POR-006  Exception: Tool 4 MS Access source requires ODBC driver
               — documented and checked at runtime

## [9.3] Reliability
  REQ-REL-001  Core tools work with zero internet connection
  REQ-REL-002  Tool 7 API tester degrades gracefully when offline
  REQ-REL-003  Driver search URLs open browser — no crash if offline
  REQ-REL-004  Session auto-saved — no data loss on crash
  REQ-REL-005  Invalid file imports handled with inline error message
  REQ-REL-006  DB connection failures shown inline — no crash

## [9.4] Usability
  REQ-USE-001  Technician launches any tool within 3 clicks from .exe
  REQ-USE-002  All labels clear — technical terms explained on hover
  REQ-USE-003  Validation messages shown inline — never popup
  REQ-USE-004  Confirmation required before reset or delete
  REQ-USE-005  Back navigation always available in every tool
  REQ-USE-006  No training required for AfroditeSoft technician users


# ================================================================
#  [10] CONSTRAINTS & ASSUMPTIONS
# ================================================================

## [10.1] Technical Constraints
  Windows 10 64-bit or Windows 11 required
  Minimum 4GB RAM — 8GB recommended for running DB connections
  Minimum 1GB disk space (Electron bundle + databases)
  Screen resolution minimum 1280x720
  MS Access source (Tool 4) requires Microsoft Access ODBC driver
  API Tester (Tool 7) requires active internet connection

## [10.2] Development Constraints
  Solo developer — AfroditeSoft
  Open source tools only — no paid licenses
  Must remain portable — no installer
  pci.ids and usb.ids must be updated manually per release

## [10.3] Assumptions
  Tool is operated by AfroditeSoft technicians — not end clients
  Client machine has PowerShell available (all Windows 10/11 machines do)
  QuickBooks data accessed via file export — not live QB connection
  Excel file structure not modified manually before import
  PDF viewer installed on machine for viewing exports


# ================================================================
#  [11] TOOL ROLLOUT ROADMAP
# ================================================================

## [11.1] Version 2.0 — Core Suite (Current Target)
  ✅ Launcher dashboard with tool cards
  ✅ Tool 1: SRS Configurator (carried forward from v1.0)
  ✅ Portable Electron packaging enabled
  ✅ Portable startup workspace created beside the EXE
  ✅ Portable database placeholder `ATSDB.SQLite` created in root
  ✅ Portable settings folder renamed to `AfroTS-Data`
  ✅ Startup splash now dismisses correctly after app mount
  ✅ Beta baseline organized at `0.0.1-beta.1`
  ⬜ Tool 2: System Inspector (CPU, RAM, OS, Network, GPU)
  ⬜ Tool 2: ABMS Compatibility Check
  ⬜ Tool 3: Hardware & Driver Scanner
  ⬜ Tool 3: Local pci.ids / usb.ids lookup
  ⬜ Tool 3: Driver search URL generation
  ⬜ Toolbox global settings (carried forward)
  ⬜ Session management per tool

## [11.2] Version 2.1 — Data Tools
  ⬜ Tool 4: Data Migration Wizard — Phase 1 (extract + export)
  ⬜ Tool 4: MS SQL Server connection
  ⬜ Tool 4: MySQL / MariaDB connection
  ⬜ Tool 4: MS Access connection (ODBC)
  ⬜ Tool 4: QuickBooks file import (IIF / CSV)
  ⬜ Tool 5: Data Comparator
  ⬜ Tool 4 Phase 2: Direct ABMS DB write (advanced)

## [11.3] Version 2.2 — Dev & Config Tools
  ⬜ Tool 6: ERP Config Manager
  ⬜ Tool 7: Dev Toolkit (JSON, Logs, API Tester, Env Checker)
  ⬜ Arabic UI — RTL layout (i18next)
  ⬜ French UI (i18next)

## [11.4] Version 3.0 — Advanced
  ⬜ Tool 3+: Driver auto-download when online
  ⬜ Tool 3+: Driver install after download
  ⬜ Online/web version of AfroTech Suite
  ⬜ Multi-session manager (compare client scan histories)
  ⬜ Email reports directly from app


# ================================================================
#  [12] GLOSSARY
# ================================================================

  AfroTech Suite    This product — unified technical toolkit
                    Evolved from AfroTech Suite

  ABMS              Afro Business Management Suite
                    The ERP system this suite supports

  Tool Launcher     Main dashboard of AfroTech Suite
                    Entry point — shows all available tools as cards

  SRS               Software Requirements Specification
                    Formal document defining what software must do

  Wizard            Multi-step form guiding user through questions
                    one step at a time (Tool 1, Tool 4)

  WMI               Windows Management Instrumentation
                    Windows API for reading hardware and OS data

  PowerShell        Windows command shell used to query WMI
                    Spawned as child process from Electron/Node.js

  Hardware ID (HID) Raw device identifier string from Windows
                    Format: PCI\VEN_XXXX&DEV_XXXX

  VEN               Vendor ID — 4-character hex, identifies manufacturer
  DEV               Device ID — 4-character hex, identifies specific chip

  pci.ids           Public database of all PCI VEN+DEV ID mappings
                    Open source, updated regularly, bundled in app

  usb.ids           Public database of all USB VID+PID ID mappings
                    Open source, updated regularly, bundled in app

  Unknown Device    A hardware device with no driver installed
                    Appears in Windows Device Manager with warning icon

  ODBC              Open Database Connectivity
                    Windows driver standard for database connections
                    Required on machine to connect to MS Access

  Migration         Process of moving data from old system to ABMS
                    Tool 4 handles extract → map → validate → export

  Field Mapping     Linking old system columns to ABMS target fields
                    Visual interface in Tool 4 Migration Wizard

  Diff              Comparison showing what changed between two files
                    Tool 5 produces visual diff with color coding

  Config            Saved ABMS configuration session
                    Managed and compared in Tool 6

  Promotion         Moving a config through stages: Dev → Staging → Prod
                    Tracked in Tool 6 with date and note log

  Session           All answers/data in a tool saved to a JSON file
                    Auto-saved — restored on next launch

  Portable          App runs from single .exe file
                    No installation — works from USB or any folder

  Client Version    Report mode with plain business language (Tool 1)
  Developer Version Report mode with full technical details (all tools)

  IIF               Intuit Interchange Format
                    QuickBooks Desktop export file format (.iif)

  SMART             Self-Monitoring Analysis and Reporting Technology
                    Disk health data — planned for Tool 3 v2.1+


# ================================================================
#  END OF SOFTWARE REQUIREMENTS SPECIFICATION
#
#  Document ID  : AfroTS-SRS-001
#  Version      : 2.0 DRAFT
#  Status       : IN REVIEW
#  Owner        : AfroditeSoft
#  Evolved From : ASRS-SRS-001 (AfroTech Suite v1.0 FINAL)
#
#  Version History:
#  1.0  March 2026   AfroTech Suite — SRS Configurator only
#  2.0  April 2026   AfroTech Suite — expanded to 7-tool universal suite
#
#  Change Policy:
#  Minor changes  → version X.Y+1
#  Major changes  → version X+1.0
# ================================================================
