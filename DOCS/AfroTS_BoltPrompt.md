# ================================================================
#  BOLT.NEW PROMPT — AFROTECH SUITE
#  UI Shell Prototype — Desktop Feel, Windows Native Style
#
#  Paste this entire prompt into bolt.new
#  Goal: generate the full React UI shell
#        then export components into the Electron project
# ================================================================


# ── PASTE START ─────────────────────────────────────────────────

Build a React desktop application UI shell called **AfroTech Suite**
for a portable Windows desktop tool built with Electron.
This is a professional internal toolkit for IT technicians and
consultants at a software company called AfroditeSoft.

---

## DESIGN DIRECTION — WINDOWS NATIVE DESKTOP FEEL

The aesthetic must feel like a **real Windows desktop application**,
not a web app or SaaS dashboard. Think:
- Windows title bar with app name + window controls (minimize, maximize, close)
- Horizontal menu bar below the title bar (File | Tools | View | Help)
- Left sidebar for navigation between tools — collapsible
- Main content area — fills the remaining space
- Status bar fixed at the bottom — shows current tool, version, status
- Dark theme by default — deep dark grays, NOT pure black
- Accent color: Steel Blue (#2A6EBB) — used for active states, highlights, badges
- Monospace font for technical data (Consolas or JetBrains Mono)
- Clean sans-serif for UI labels (Segoe UI or equivalent)
- Subtle borders — 1px solid #2E2E2E between panels
- No gradients on panels — flat, solid dark surfaces
- No rounded corners on major panels — sharp edges like native Windows UI
- Small radius (4px) only on buttons and badges

The overall tone: **industrial, utilitarian, precision-built**.
Like VS Code meets Windows Device Manager meets a professional ERP tool.

---

## COLOR PALETTE (use as CSS variables)

```css
:root {
  /* === [1] BACKGROUNDS === */
  --bg-titlebar:    #1A1A1A;   /* title bar */
  --bg-menubar:     #252526;   /* menu bar */
  --bg-sidebar:     #1E1E1E;   /* left sidebar */
  --bg-main:        #252526;   /* main content area */
  --bg-panel:       #2D2D2D;   /* cards, panels, inner boxes */
  --bg-statusbar:   #007ACC;   /* status bar — VS Code blue */
  --bg-hover:       #2A2D2E;   /* sidebar item hover */
  --bg-active:      #37373D;   /* sidebar item active/selected */

  /* === [2] TEXT === */
  --text-primary:   #CCCCCC;   /* main readable text */
  --text-secondary: #858585;   /* labels, captions */
  --text-muted:     #555555;   /* placeholders, disabled */
  --text-accent:    #4FC3F7;   /* highlighted values, links */
  --text-white:     #FFFFFF;   /* title bar, status bar text */

  /* === [3] ACCENT & STATUS === */
  --accent:         #2A6EBB;   /* primary accent — steel blue */
  --accent-hover:   #3A7ECC;   /* button hover */
  --success:        #4CAF50;   /* PASS badges */
  --warning:        #FF9800;   /* WARN badges */
  --error:          #F44336;   /* FAIL / ERROR badges */
  --badge-text:     #FFFFFF;   /* text on all badges */

  /* === [4] BORDERS === */
  --border:         #3C3C3C;   /* main panel borders */
  --border-light:   #4A4A4A;   /* subtle inner borders */
  --border-accent:  #2A6EBB;   /* active/selected border */
}
```

---

## LAYOUT STRUCTURE

```
┌─────────────────────────────────────────────────────────────┐
│  TITLE BAR: [AfroTech Suite icon] AfroTech Suite   [_ □ X] │ ← #1A1A1A
├─────────────────────────────────────────────────────────────┤
│  MENU BAR: File  |  Tools  |  View  |  Help                 │ ← #252526
├───────────┬─────────────────────────────────────────────────┤
│           │  CONTENT AREA (main panel)                      │
│  SIDEBAR  │                                                 │
│           │  Shows the active tool screen                   │
│  Tool 1   │  Default: Launcher dashboard with tool cards    │
│  Tool 2   │                                                 │
│  Tool 3   │                                                 │
│  Tool 4   │                                                 │
│  Tool 5   │                                                 │
│  Tool 6   │                                                 │
│  Tool 7   │                                                 │
│           │                                                 │
│  ──────── │                                                 │
│  Settings │                                                 │
│           │                                                 │
├───────────┴─────────────────────────────────────────────────┤
│  STATUS BAR: [Tool 2 — System Inspector]  [v0.0.1-beta.1]  │ ← --bg-statusbar
└─────────────────────────────────────────────────────────────┘
```

---

## COMPONENT 1 — TITLE BAR

- Height: 32px
- Background: --bg-titlebar (#1A1A1A)
- Left: small square app icon (use a circuit/tech SVG icon inline) + "AfroTech Suite"
- Text: white, Segoe UI, 13px
- Right: three window control buttons — minimize [_], maximize [□], close [X]
- Close button turns red on hover (#E81123)
- Minimize/Maximize turn slightly lighter on hover
- No actual Electron IPC needed — make them visually correct only

---

## COMPONENT 2 — MENU BAR

- Height: 28px
- Background: --bg-menubar (#252526)
- Items: File | Tools | View | Help
- Text: --text-primary, 13px, Segoe UI
- Hover: background --bg-active, no border
- Active (clicked): dropdown appears below — simple flat dropdown menu
- Dropdown items are plain text with subtle hover highlight
- Dropdown has 1px border --border, background --bg-panel

File menu items:
  New Session | Open Session | Save Session | ─── | Exit

Tools menu items:
  Tool 1: SRS Configurator
  Tool 2: System Inspector
  Tool 3: Hardware & Driver Scanner
  Tool 4: Data Migration Wizard
  Tool 5: Data Comparator
  Tool 6: ERP Config Manager
  Tool 7: Dev Toolkit

View menu items:
  Toggle Sidebar | Dark Mode | Light Mode | Font Size +/−

Help menu items:
  About AfroTech Suite | Documentation | Version Info

---

## COMPONENT 3 — LEFT SIDEBAR

- Width: 220px (collapsed: 48px icon-only mode)
- Background: --bg-sidebar (#1E1E1E)
- Right border: 1px solid --border
- Top section: toggle collapse button (« / ») at top right of sidebar
- Then: list of 7 tool navigation items

Each sidebar item:
  - Height: 40px
  - Left: 16px icon (SVG, tool-specific — see icons below)
  - Right of icon: tool name text (hidden when collapsed)
  - Hover: background --bg-hover
  - Active/selected: background --bg-active, left border 2px solid --accent
  - Badge on right side for tools marked "Coming Soon" — small gray pill

Tool sidebar items with icons:
  🔧 Tool 1 — SRS Configurator       (icon: document/form)
  💻 Tool 2 — System Inspector        (icon: monitor/cpu chip)
  🔍 Tool 3 — Driver Scanner          (icon: search/magnify)
  🔄 Tool 4 — Migration Wizard        (icon: arrows transfer)
  📊 Tool 5 — Data Comparator         (icon: two columns diff)
  🗂️  Tool 6 — ERP Config Manager     (icon: layers/stack)
  ⚙️  Tool 7 — Dev Toolkit             (icon: terminal/code)

Sidebar bottom section (separated by horizontal rule):
  - Settings gear icon
  - Collapse toggle

---

## COMPONENT 4 — MAIN CONTENT AREA (Launcher Dashboard)

Default screen when app opens = Launcher Dashboard.
Show this when no tool is selected, or when user navigates to Home.

### Launcher Dashboard

- Background: --bg-main
- Top: breadcrumb "AfroTech Suite / Home"
- Below breadcrumb: section title "Select a Tool" in --text-primary, 16px
- Below title: 7 tool cards in a responsive grid (3 columns on wide, 2 on narrow)

Each tool card:
  - Background: --bg-panel
  - Border: 1px solid --border
  - Border-radius: 0px (sharp corners — Windows native feel)
  - Padding: 20px
  - Top-left: tool number badge — small square, --accent background, white text, "T1" "T2" etc.
  - Top-right: status badge — "Available" (green) or "Coming Soon" (gray)
  - Below badges: large tool icon (32px SVG)
  - Tool name: --text-primary, 14px, bold
  - Short description: --text-secondary, 12px, 2 lines max
  - Bottom: [Launch Tool] button — --accent background, white text, full width
  - Hover on card: border-color changes to --accent, subtle background shift
  - Coming Soon cards: button is disabled, grayed out, cursor not-allowed

Tool card content:

  T1 — SRS Configurator
  "Guide clients through a 7-step business assessment wizard and
  generate a professional ABMS configuration report."
  Status: Available

  T2 — System Inspector
  "Read CPU, RAM, storage, OS, GPU, and network data via PowerShell.
  Includes ABMS compatibility check with PASS/WARN/FAIL ratings."
  Status: Available

  T3 — Hardware & Driver Scanner
  "Detect all PnP devices including unknown hardware. Identify missing
  drivers using bundled pci.ids and usb.ids databases."
  Status: Available

  T4 — Data Migration Wizard
  "Connect to MS SQL, MySQL, Access, or QuickBooks. Map fields,
  validate data, and export a clean migration-ready file."
  Status: Coming Soon

  T5 — Data Comparator
  "Load two datasets or config files and produce a visual diff showing
  added, removed, and changed records side by side."
  Status: Coming Soon

  T6 — ERP Config Manager
  "Save, compare, and promote ABMS configurations across
  Dev, Staging, and Production stages."
  Status: Coming Soon

  T7 — Dev Toolkit
  "JSON viewer, log reader, API endpoint tester, and environment
  variable checker for AfroditeSoft developers."
  Status: Coming Soon

---

## COMPONENT 5 — TOOL SCREEN (Tool 2 — System Inspector)

When user clicks Tool 2 from launcher or sidebar:
Show Tool 2 screen in the main content area.

Layout:
- Breadcrumb: "AfroTech Suite / System Inspector"
- Tool header row:
    Left: "System Inspector" title (18px, --text-primary)
    Right: two buttons — [▶ Run Scan] (accent filled) and [⬇ Export PDF] (outline)
- Below header: horizontal tab bar with tabs:
    Overview | CPU | RAM | Storage | OS | Network | GPU | Compatibility

### Overview Tab (default)
Show a summary grid of 6 info boxes (2 rows × 3 columns):

Each info box:
  - Background: --bg-panel
  - Border: 1px solid --border
  - Label: --text-secondary, 11px uppercase
  - Value: --text-primary, 20px, bold, monospace font
  - Sub-value: --text-secondary, 12px

Info boxes:
  CPU Model        → "Intel Core i7-12700"
  Total RAM        → "16 GB"
  OS               → "Windows 11 Pro"
  Free Disk (C:)   → "234 GB"
  Architecture     → "64-bit"
  Last Boot        → "2h 34m ago"

Below info boxes: ABMS Compatibility Summary panel
- Title: "ABMS Compatibility Check"
- Background: --bg-panel, full width
- 5 rows, each with:
    Requirement label | Required value | Detected value | Badge (PASS/WARN/FAIL)
- Example rows:
    CPU Cores     | 2+ cores    | 12 cores  | PASS (green)
    RAM           | 4 GB min    | 16 GB     | PASS (green)
    OS Version    | Win 10 64b  | Win 11    | PASS (green)
    Free Disk     | 10 GB min   | 234 GB    | PASS (green)
    Screen Res    | 1280×720    | 1920×1080 | PASS (green)
- Bottom: overall result "✓ This machine meets all ABMS requirements" in green

### CPU Tab
Table layout showing:
  Processor Name | Cores | Threads | Base Clock | Architecture | Utilization
All in a styled data table — alternating row colors --bg-panel / --bg-main

### RAM Tab
Two sections:
  Top: summary bar showing Used / Free / Total (visual bar, accent color)
  Below: table of RAM modules — Slot | Size | Type | Speed | Status

### Compatibility Tab
Full detailed version of the compatibility check from Overview.
Same table but with more rows and an export section at the bottom.

---

## COMPONENT 6 — TOOL SCREEN (Tool 3 — Driver Scanner)

When user clicks Tool 3:

Layout:
- Breadcrumb: "AfroTech Suite / Hardware & Driver Scanner"
- Header row: title left, [▶ Scan Devices] and [⬇ Export Report] buttons right
- Summary bar below header (4 stat boxes side by side):
    Total Devices: 48 | Drivers OK: 44 | Missing Drivers: 3 | Errors: 1

- Two-tab view:
    All Devices | ⚠ Unknown / Missing (badge with count)

### All Devices Tab
Full-width data table:
  Columns: Device Name | Class | Status | Driver Version | Driver Date | Vendor
  Status column shows colored badge: OK (green) | ERROR (red) | UNKNOWN (orange) | DISABLED (gray)
  Table has search input above and column sort on headers

### Unknown / Missing Tab
Focused view — only problem devices:
Each problem device shown as a card (not table):
  - Red left border (3px)
  - Device raw HID string: "PCI\VEN_8086&DEV_A0F0"
  - Resolved name from local db: "Intel Wi-Fi 6 AX201" (or "ID not found in local database")
  - Status badge: DRIVER MISSING
  - Windows error code if present: "Code 28 — No driver installed"
  - Button: [🔍 Search Driver] — opens browser (grayed if offline, labeled "Requires Internet")

---

## COMPONENT 7 — TOOLBOX BAR

A horizontal bar sitting between the menu bar and the sidebar/content area.
Height: 36px, background: --bg-menubar, bottom border: 1px solid --border.

Items left to right:
  [A−] [14] [A+]          ← font size controls
  |                        ← separator
  [☀ Light] [● Dark]      ← mode toggle (active one highlighted)
  |
  [EN] [FR] [AR]           ← language toggle buttons
  |
  [● Navy] [● Green] [● Purple] [● Teal]   ← theme color dots
  |
  [↺ Reset]                ← red outlined button

All buttons: height 26px, small text 12px, flat style matching menu bar

---

## COMPONENT 8 — STATUS BAR

- Height: 24px fixed at bottom
- Background: --bg-statusbar (#007ACC — VS Code blue)
- Text: white, 12px, Segoe UI
- Left: "●  Tool 2 — System Inspector" (green dot = active, gray = idle)
- Center: "AfroTS-Data: D:\AfroTS-Data\sessions"  ← portable data path
- Right: "v0.0.1-beta.1" | "AfroditeSoft"

---

## TECHNICAL REQUIREMENTS

- React functional components only — no class components
- CSS variables for all colors — defined in :root in index.css
- Plain CSS — no Tailwind, no styled-components, no CSS modules
- useState for active tool, active tab, sidebar collapsed state
- No backend calls needed — use hardcoded realistic sample data
- Sidebar navigation switches the main content area between screens
- Clicking a tool card on the Launcher also opens that tool screen
- Comments follow AfroditeSoft style:
    Section : // === [N] SECTION NAME ===
    Block   : // ── [N.X] Block Name ───
    Syntax  : same-line comments explaining the line

File structure to generate:
  src/
    App.jsx              ← main layout controller
    index.css            ← all CSS variables + global styles
    components/
      TitleBar.jsx
      MenuBar.jsx
      Sidebar.jsx
      ToolboxBar.jsx
      StatusBar.jsx
      Launcher.jsx
      tools/
        SystemInspector.jsx
        DriverScanner.jsx

---

## IMPORTANT CONSTRAINTS

- This is an Electron desktop app — design for minimum 1280×720 window
- Do NOT use any web-only patterns (no hero sections, no landing page feel)
- Do NOT use rounded cards with shadows — this is not a SaaS web app
- Do NOT use gradient backgrounds on panels
- The app must feel like it belongs next to Windows Task Manager and Device Manager
- Font sizes: 12px–14px for UI, 11px for labels, 18px–20px for values in data cards
- All icons should be inline SVG or lucide-react — no emoji in final UI

# ── PASTE END ───────────────────────────────────────────────────
