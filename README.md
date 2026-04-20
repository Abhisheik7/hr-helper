🔗 Live Demo: your-netlify-url.netlify.app
💻 GitHub: github.com/Abhisheik7/hr-helper

# React + TypeScript + Vite

# 🧩 HR Helper

> A visual, drag-and-drop HR Workflow Designer built for 
> modern People Operations teams.

![HR Helper](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat&logo=tailwindcss)
![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat&logo=netlify)

**🔗 Live Demo:** [hr-helper.netlify.app](https://hr-helper.netlify.app)  
**💻 GitHub:** [github.com/YOURUSERNAME/hr-helper](https://github.com/YOURUSERNAME/hr-helper)

---

## 🎯 What is HR Helper?

HR Helper is a production-grade, visually rich HR Workflow 
Designer that lets HR admins create, configure, and simulate 
internal workflows — such as employee onboarding, leave 
approvals, and document verification — through an intuitive 
drag-and-drop canvas interface.

Think of it as a mini **n8n meets Notion** — purpose-built 
for HR teams, with zero backend required.

---

## ✨ Features

### 🖼️ Visual Workflow Canvas
- Drag-and-drop nodes from the sidebar onto the canvas
- Connect nodes with animated flowing edges
- Delete nodes and edges with keyboard or button
- Pan, zoom, and navigate with React Flow's built-in controls
- Minimap for navigating large workflows

### 🧱 5 Custom Node Types
| Node | Color | Purpose |
|------|-------|---------|
| **Start** | 🟢 Green | Workflow entry point / trigger |
| **Task** | 🔵 Blue | Human task with assignee + priority |
| **Approval** | 🟡 Amber | Manager or HR approval step |
| **Automated Step** | 🟣 Purple | System action (email, HRIS, Slack) |
| **End** | 🔴 Coral | Workflow completion |

### 📝 Rich Node Configuration
- Each node has a dedicated configuration form
- Dynamic fields powered by `react-hook-form` + `zod`
- Real-time validation with visual feedback
- Live status dots on nodes (grey → amber → green)
- Animated key-value builders and tag inputs

### ⚡ 5 Mock Automations (via MSW)
- Send Email
- Generate Document
- Slack Notification
- Update HRIS Record
- Schedule Meeting

### 🧪 Workflow Simulation Sandbox
- One-click workflow execution simulation
- Pre-run validation checklist (start node, end node, 
  connections, cycle detection)
- Animated step-by-step execution timeline
- Per-step status, duration, and contextual messages
- Canvas replay: nodes glow in execution sequence

### 📋 3 Built-in Templates
- **Employee Onboarding** — 7-step full onboarding flow
- **Leave Approval** — 5-step leave request workflow
- **Document Verification** — 6-step verification pipeline

### 🔍 CMD+K Spotlight Search
- Search across all nodes by title
- Pan and zoom canvas to selected node instantly
- Keyboard navigable results

### 📊 Live Workflow Health Score
- Real-time 0–100 health score in toolbar
- Checks: start present, end present, 
  all nodes connected, no cycles
- Color coded: red → amber → green

### ↩️ Undo / Redo
- Full history stack (up to 50 states)
- Keyboard shortcuts: ⌘Z / ⌘⇧Z

### 📤 Export / Import
- Export entire workflow as JSON
- Import and restore any saved workflow
- Portable workflow definitions

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript (strict) |
| Build Tool | Vite 5 |
| Canvas | React Flow (@xyflow/react) |
| State | Zustand |
| Forms | react-hook-form + zod |
| Styling | TailwindCSS 3 |
| Animations | Framer Motion |
| Mock API | MSW (Mock Service Worker) |
| Icons | Lucide React |
| Notifications | react-hot-toast |
| Deployment | Netlify |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Abhisheik7/hr-helper.git
cd hr-helper

# 2. Install dependencies
npm install

# 3. Initialize MSW worker
npx msw init public/ --save

# 4. Start development server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) 🎉

---

## 📁 Project Architecture

src/
├── components/
│   ├── canvas/          # React Flow canvas, toolbar, edges
│   ├── nodes/           # 5 custom node components
│   ├── forms/           # Node config forms + shared inputs
│   ├── sidebar/         # Node palette + templates
│   ├── sandbox/         # Simulation drawer + timeline
│   └── spotlight/       # CMD+K search modal
├── hooks/               # useWorkflow, useSimulate, useSpotlight
├── store/               # Zustand global state + history
├── api/                 # Typed API client functions
├── mocks/               # MSW handlers + browser worker
├── templates/           # 3 pre-built workflow templates
├── types/               # TypeScript interfaces + enums
└── utils/               # Graph validation, health score, serializer



---

## 🧠 Design Decisions

**1. Zustand over Redux**
Zustand provides a minimal, hook-first API that integrates
naturally with React Flow's state model. The flat store 
structure keeps undo/redo history simple to implement 
without middleware.

**2. MSW for Mock APIs**
Mock Service Worker intercepts fetch at the network level,
meaning the API layer behaves identically in dev and 
production. This makes the codebase ready to swap in a 
real backend with zero changes to component logic.

**3. Discriminated Union Types for Nodes**
Each node type has its own TypeScript interface united by 
a NodeType enum discriminant. This gives exhaustive type 
checking in switch statements and ensures forms always 
receive correctly typed data.

**4. react-hook-form + zod**
Separating validation schema (zod) from form registration
(react-hook-form) keeps forms declarative and testable.
Zod schemas double as the single source of truth for both
runtime validation and TypeScript types.

**5. Component Decomposition**
Every node component extends BaseNode, keeping visual 
consistency while allowing type-specific metadata chips.
Forms are decomposed into shared primitives 
(ToggleSwitch, TagInput, KeyValueBuilder) that can be 
reused across any future node types.

**6. Framer Motion for All Transitions**
Using a single animation library ensures consistent 
easing curves and duration tokens across panels, drawers,
list items, and node status changes.

---

## ⚠️ Known Limitations

- No backend persistence (by design — mock API only)
- MSW requires service worker support (all modern browsers)
- Large workflows (50+ nodes) may need performance tuning
- No mobile/touch support for drag-and-drop canvas

---

## 🔮 What I'd Add With More Time

- [ ] Real backend with PostgreSQL persistence
- [ ] Multi-user collaboration (WebSockets)
- [ ] Workflow versioning and change history
- [ ] Conditional branching edges (if/else logic)
- [ ] Node comments and annotations
- [ ] Scheduled workflow triggers
- [ ] Role-based access control
- [ ] Workflow analytics dashboard
- [ ] Export to PDF/image
- [ ] Mobile-responsive layout

---

## 👩‍💻 Built By

**Abhisheik Yerubothu**  
Full Stack Engineering Intern Candidate  
Tredence Studio — AI Agents Engineering  
April 2026

---

*Built with ❤️ as part of the Tredence Studio 
Full Stack Engineering Internship case study.*
