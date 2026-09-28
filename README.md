# AgriVision XR — Smart Agriculture Decision, Field Assistance, VR Training & Web3 Provenance Platform

[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-5C54F9?style=flat-square)](https://lovable.dev)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-FF4154?style=flat-square)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Web3 Provenance](https://img.shields.io/badge/Web3-Polygon_Ledger-8247E5?style=flat-square&logo=polygon)](https://polygon.technology)

**AgriVision XR** is a next-generation spatial precision agronomy platform engineered to empower farmers, agronomists, and agricultural enterprises with AI-driven decision support, augmented reality (AR) field assistance, computer vision crop diagnostics, immersive virtual reality (VR) training, and an immutable Web3 blockchain crop provenance ledger.

---

## 🌟 Key Features

### 🌾 1. Empty Land AI Suitability Wizard

- **6-Step Guided Evaluation**: Synthesizes terrain imagery, satellite spectra (Sentinel-2 NDVI), soil chemistry (pH, organic carbon, soil type), location GPS coordinates, water source indices, and target planting seasons.
- **Neural Agronomic Inference**: Simulates agro-ecological rule matrices to compute match percentage scores and recommend optimal crops (e.g., Arecanut, Robusta Coffee + Pepper, Grand Naine Banana).
- **Side-by-Side Matrix Comparison**: Evaluates soil affinity, water demand, gestation timelines, capex requirements, labor intensity, and risk profiles.

### 🌿 2. Edge-AI Vision Diagnostic Console

- **Computer Vision Plant Pathology**: Scans crop leaves and fronds using edge-AI models (YOLO-Agri) to detect diseases such as _Colletotrichum Leaf Spot_ with confidence percentage bounding boxes.
- **Structured Remediation Protocols**: Delivers immediate, actionable foliar spray instructions, field sanitation steps, and irrigation adjustment tips, accompanied by scientific transparency disclosures.

### 🥽 3. Spatial AR Field HUD Stream

- **Optical AR Passthrough Viewport**: Real-time HUD overlay featuring spatial reticles, tree target locks (e.g., `#A-104`), canopy vigor indices, azimuth headings, and micro-climate PAR telemetry.
- **Dual Passthrough Modes**:
  - _Live Field HUD Inspection_: Real-time camera passthrough streaming live orchard diagnostic cards.
  - _Empty Land 3D Placement_: Virtual crop canopy grid placement and drip line lateral visualization over terrain contours.

### 🎮 4. VR Training Academy Cockpit

- **Hands-on Virtual Operations**: 6-DOF virtual simulator cockpit allowing field technicians to practice operations without risking actual crop assets.
- **Interactive Modules**:
  - _Precision Crop Health Inspection_
  - _Drip & Fertigation Calibration_ (Venturi injector setup, pressure regulator maintenance)
  - _Safe Sprayer Operation & Drift Prevention_
  - _Integrated Bio-Control Deployment_

### 🔗 5. Web3 Crop Provenance & Immutable Telemetry Ledger

- **NFT Crop Passports**: Mint digital certificates of authenticity for harvest batches (e.g., Arecanut Premium Grade-A, Robusta Organic Coffee) containing embedded soil chemistry hashes, GPS coordinates, and organic certifications.
- **On-Chain Telemetry Log**: Immutable transaction ledger capturing CV leaf diagnostic scans, soil moisture updates, fertigation cycles, and spatial AR waypoints.
- **Cryptographic Hash Verifier**: Real-time validation tool checking diagnostic signatures against Merkle root state with zero-knowledge (ZK-snark) privacy protection for farm ownership data.
- **Web3 Wallet Connectivity**: Integrated wallet link (`0x71C...4f9a`) for instant credential signing and green credit eligibility.

### 📊 6. Predictive Ag-Economics & Scenario Explorer

- **Interactive Financial Calculator**: Dynamic sliders to simulate yield targets (kg/acre), wholesale mandi realization prices (₹/kg), labor/harvesting costs, and fertigation expenditures.
- **Real-time Projections**: Instantly updates net farm returns, gross revenues, operational OPEX, per-acre profit margins, and conservative vs. optimal sensitivity scenarios.

### 📸 7. On-Device Field Camera Subsystem

- **Built-in Camera Integration**: Captures live leaf photos directly from mobile/desktop browser cameras or supports custom uploads from device storage.
- **On-Device Color Screening**: Analyzes green tissue coverage vs. browning/yellowing ratios directly in-browser.
- **Local Photo Gallery**: Stores field photos securely in browser local storage (`localStorage`).

### ⚡ 8. 1-Click Hackathon Walkthrough Mode

- **Automated Guided Tour**: 30-second automated demo tour navigating seamlessly across the entire pipeline: _Wizard → AI Reasoning → Crop Options → CV Scanner → AR Field HUD → VR Simulator → Web3 Blockchain Ledger_.

---

## 🏗️ System Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           AGRIVISION XR CLIENT                          │
├─────────────────┬───────────────────┬──────────────────┬────────────────┤
│ Land Suitability│ Vision Pathology  │ Spatial AR HUD   │ VR Simulator   │
│   (6-Step AI)   │  (YOLO Edge-AI)   │ (Tree Lock HUD)  │ (6-DOF Cockpit)│
└────────┬────────┴─────────┬─────────┴────────┬─────────┴────────┬───────┘
         │                  │                  │                  │
         ▼                  ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     AGRONOMIC INFERENCE & ENGINE                        │
│   • Soil Chemistry Telemetry (pH, Organic Carbon, Red Loam Affinity)    │
│   • Sentinel-2 NDVI & Agro-Climatic Rule Engine                        │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                  WEB3 BLOCKCHAIN & PROVENANCE LEDGER                    │
│   • NFT Harvest Passports (Soil Chem Hash + Origin Verification)        │
│   • Immutable Telemetry Tx Log (CV Scans, Fertigation, AR Waypoints)    │
│   • Cryptographic Hash Explorer & Zero-Knowledge Verification           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

- **Framework & Routing**: [React 19](https://react.dev/), [TanStack Start](https://tanstack.com/start), [TanStack Router](https://tanstack.com/router)
- **State & Data Fetching**: [TanStack Query v5](https://tanstack.com/query)
- **Styling & UI**: Vanilla CSS + [Tailwind CSS v4](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com/) primitive components, Glassmorphism HUD styling, [Material Symbols Outlined](https://fonts.google.com/icons)
- **Web3 & Blockchain**: Polygon Mainnet Ledger integration, NFT Passport Minting Engine, Merkle Tree Cryptographic Verifier, ZK-snark privacy specs
- **Build Engine & Server**: [Vite 8](https://vitejs.dev/), Nitro Server, TypeScript
- **Icons & Fonts**: Google Fonts (_Plus Jakarta Sans_, _Inter_)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+ recommended) and **npm** or **bun** installed on your system.

### Option A: Quick Start (If you already opened this project folder)

If you already have the project directory open in your terminal:

```bash
npm install
npm run dev
```

### Option B: Cloning from GitHub (First-Time Setup)

If you are cloning the project for the first time onto a new machine:

```bash
git clone https://github.com/sinchanakotari18-arch/cam-snap-palette.git
cd cam-snap-palette
npm install
npm run dev
```

> 💡 **Note**: Open your browser at `http://localhost:3000` (or the port displayed in terminal). If you are already inside the project folder, skip `git clone` and `cd cam-snap-palette` and run `npm install` and `npm run dev` directly.

---

## 📜 Available Scripts

| Script          | Command           | Description                                                |
| :-------------- | :---------------- | :--------------------------------------------------------- |
| **Development** | `npm run dev`     | Launches Vite dev server with TanStack Start hot-reloading |
| **Build**       | `npm run build`   | Produces production build bundle via Vite & Nitro          |
| **Preview**     | `npm run preview` | Previews the production build locally                      |
| **Lint**        | `npm run lint`    | Runs ESLint to check code quality                          |
| **Format**      | `npm run format`  | Runs Prettier code formatting                              |

---

## 📁 Directory Structure

```
├── public/
│   ├── agrivision.html    # Core Spatial Agronomy, AR HUD, VR Simulator & Web3 Engine
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/        # Shared UI components & Radix primitives
│   ├── hooks/             # Custom React hooks
│   ├── integrations/      # External service connectors & API wrappers
│   ├── lib/               # Utility functions and helper modules
│   ├── routes/            # TanStack Router file-based route tree
│   │   ├── __root.tsx     # Root layout wrapper with QueryClient & styling
│   │   └── index.tsx      # Main application route hosting AgriVision XR
│   ├── styles.css         # Global stylesheet & Tailwind CSS directives
│   ├── router.tsx         # TanStack router configuration
│   └── server.ts          # Server entrypoint
├── package.json           # Dependencies and project metadata
├── vite.config.ts         # Vite build configuration & TanStack Start plugin
└── README.md              # Project documentation
```

---

## ⚡ Hackathon / Buildathon Quick Walkthrough

To showcase the platform in a pitch or hackathon demo:

1. Click the **"1-Click Live Walkthrough"** or **"Demo Mode: Live Farm Alpha"** button on the top banner or header.
2. The automated script will tour through:
   - **Empty Land Wizard**: Soil & location inputs
   - **AI Reasoning Engine**: Radar sweep & agro-ecological convergence
   - **Crop Prescription Options**: Arecanut, Robusta Coffee & Banana rankings
   - **Vision Diagnostic Telemetry**: YOLO pathogen leaf detection
   - **Spatial AR Field HUD**: Real-time reticle & tree lock (`#A-104`)
   - **VR Training Cockpit**: Drip fertigation & spraying modules
   - **Web3 Blockchain Ledger**: On-chain batch passport verification & cryptographic proof

---

## 🔒 Confidentiality Note

> **Notice**: The contents, ideas, prototype architecture, and code contained within this repository are proprietary. Do not expose or distribute publicly without explicit authorization.

---

## 🤝 Development & Contribution

This project is connected to [Lovable](https://lovable.dev). When making changes locally or pushing to Git, maintain branch integrity and ensure all code compiles cleanly.
