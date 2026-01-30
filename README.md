# Ivy Strategic Logic Engine

A governed decision-making environment where user inputs are treated as variables in a high-stakes business simulation. This is not a learning app—it's a **Strategy Compiler**.

## Architecture Overview

### Core Data Model: "The Strategic Object"

Every module in the app isn't just a lesson; it's a **State-Updater**. The app maintains a global `BusinessState` object that evolves as the user completes worksheets.

- **Pillar I (Foundations)**: Defines the Economic Constraints (Unit Economics, Five Forces Scores, LTV/CAC ratios)
- **Pillar II (Psychology)**: Defines the Perception Layers (Mental Accounting, Loss Aversion triggers, Identity Anchors) - *Placeholder for future*
- **Pillar III (Systems)**: Defines the Control Logic (Pricing Guardrails, Experiment Objects, Growth Loops) - *Placeholder for future*

### Interactive Components

1. **Cold Call Hook**: A global component that triggers a "Gray Page" takeover with a 90-second countdown timer. If the user doesn't submit a one-sentence answer that meets specific semantic criteria (e.g., "no hedging"), their "Board Credibility Score" decreases.

2. **Red Team Adversary**: A diagnostic component that scans the user's inputs for contradictions. For example, if a user inputs a "Premium Brand" identity but also sets "High Price Elasticity," the app triggers a Red Warning alert for "Strategic Delusion".

3. **Scenario Simulator**: A React-based dashboard where users manipulate Range Sliders (Price, Retention, CAC). As the sliders move, the UI dynamically updates a Sensitivity Graph showing "Enterprise Value" in real-time.

### Progress System: "Output-Gated Advancement"

Unlike most apps, you cannot "scroll" to the end. Progression is blocked by `required_output` flags.

- **Logic Gate**: To unlock "Module 2," the Module1_State must contain five non-null entries: Market Assumption, Non-Obvious Competitor, Job Layer, Context Risk, and Advantage.
- **Final Exam**: Each module ends with a "Final Exam Prompt" that requires the user to solve a crisis using the mathematical models they built in that module.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (Custom design system with EB Garamond, Inter, JetBrains Mono)
- **Zustand** (State management)
- **Recharts** (Data visualization)
- **Framer Motion** (Animations)

## Design System

- **Typography**: EB Garamond (serif headings), Inter (body), JetBrains Mono (math/models)
- **Colors**: Charcoal ink, muted sage/stone accents, cream/parchment backgrounds
- **Aesthetic**: Minimal, academic, case-study inspired, no "startup bro" energy

## Deploy (Vercel)

1. Push your code to GitHub (repo: `sarahkitay/IVY`):
   ```bash
   git add -A
   git status
   git commit -m "Your message"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New… → Project** and import the **IVY** repository.
4. Leave **Framework Preset** as Next.js and **Root Directory** as `.`. Click **Deploy**.
5. Your app will be live at `https://your-project.vercel.app`. Future pushes to `main` auto-deploy.

Optional: from the project root you can also run `npx vercel` (after `npm i -g vercel` and `vercel login`) to deploy from the CLI.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
/app
  /modules/[id]     # Individual module pages
  /scenario-simulator  # Interactive financial model
  /board-memo      # Memo generation
  page.tsx         # Home/dashboard

/components
  ColdCall.tsx     # 90-second timer component
  RedTeam.tsx      # Contradiction detection
  ScenarioSimulator.tsx  # Interactive sliders + charts
  Worksheet.tsx    # Fillable forms

/data
  modules.ts       # All 15 Pillar I modules

/store
  useBusinessState.ts  # Global state management
  useProgress.ts      # Progress tracking

/types
  index.ts        # TypeScript definitions
```

## Modules

Pillar I: Strategic Foundations (15 modules)

1. Market Reality Before Marketing Illusion
2. Structural Attractiveness
3. Value Chain Deconstruction
4. Positioning Through Exclusion
5. Value Capture & Pricing Power
6. Unit Economics & Defensibility
7. Competitive Dynamics & Game Theory
8. Demand Creation vs Demand Capture
9. Capital Allocation as a Marketing Skill
10. Strategic Failure & Exit Discipline
11. Market Creation & Category Design
12. Strategy Under Constraint
13. Multi-Business Orchestration
14. Speed vs Perfection
15. Narrative as Economic Infrastructure

## Features

- ✅ Output-gated module progression
- ✅ Cold Call timer with semantic validation
- ✅ Red Team contradiction detection
- ✅ Interactive Scenario Simulator
- ✅ Board Memo generation (Markdown export)
- ✅ Persistent BusinessState across sessions
- ✅ Board Credibility Score tracking

## Future Enhancements

- [ ] Pillar II: Psychology modules
- [ ] Pillar III: Systems modules
- [ ] PDF export for Board Memo
- [ ] Experiment tracking and metrics locking
- [ ] Global Cold Call hook (random triggers)
- [ ] Advanced Red Team logic
- [ ] Data persistence (localStorage/backend)

## License

Private - Sarah Kitay
