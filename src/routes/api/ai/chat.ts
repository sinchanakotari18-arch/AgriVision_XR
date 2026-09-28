import { createFileRoute } from "@tanstack/react-router";

// Knowledge base for expert agronomic decision support
const AGRONOMIC_KNOWLEDGE = [
  {
    keywords: ["spot", "colletotrichum", "leaf", "blight", "yellow", "disease", "fungus", "necrotic", "mahali", "koleroga"],
    title: "Foliar Pathology & Disease Remediation Protocol",
    category: "Crop Pathology",
    response: `**Diagnostic Assessment: Colletotrichum / Fungal Foliar Infection**

Based on your plantation imagery and micro-climate conditions (78% humidity, 29.4°C):
- **Immediate Foliar Treatment:** Spray **Copper Oxychloride (COC) 50% WP** @ 2.5 g/liter of water or **Carbendazim 12% + Mancozeb 63% WP** @ 2 g/liter.
- **Canopy Sanitation:** Prune heavily infested lower fronds/leaves and dispose of them away from the plantation to prevent airborne spore propagation.
- **Irrigation Adjustment:** Avoid overhead sprinkler irrigation which splashes fungal spores across adjacent palms; switch completely to drip irrigation.
- **Preventive Monsoon Shield:** Apply 1% Bordeaux mixture prior to heavy monsoon onset.`,
    action: { text: "Add Fungicide Protocol to Action Plan", type: "action-plan", payload: "Apply Copper Oxychloride 0.25% Spray (Plot 2)" }
  },
  {
    keywords: ["fertigation", "drip", "fertilizer", "npk", "dose", "water", "schedule", "irrigation"],
    title: "Drip Fertigation & Nutrient Schedule",
    category: "Soil & Nutrients",
    response: `**Precision Fertigation Recommendation (4.5 Acres Plantation):**

For high-yielding Arecanut with Black Pepper multi-tier model:
- **Annual Recommended Dose:** 100g N : 40g P2O5 : 140g K2O per bearing palm per year.
- **Water Soluble Fertigation:**
  - *Phase 1 (Post-Monsoon Sep-Nov):* 19:19:19 @ 15 kg/acre/month split into weekly fertigation runs.
  - *Phase 2 (Nut Development Dec-Mar):* 13:0:45 (Potassium Nitrate) @ 20 kg/acre/month to boost nut weight and kernel density.
- **Irrigation Budget:** 18 - 22 liters per palm per day during dry periods; maintain lateral pressure between 2.0 - 2.2 Bar.`,
    action: { text: "Calculate Exact Dosage in Economics", type: "economics" }
  },
  {
    keywords: ["intercrop", "pepper", "banana", "cocoa", "cardamom", "vanilla", "companion"],
    title: "Multi-Tier High-Density Intercropping System",
    category: "Crop Strategy",
    response: `**Optimized Agro-Forestry Multi-Tier Intercropping Matrix:**

1. **Tier 1 (Base Tree):** Arecanut palms spaced at 2.7m × 2.7m (approx. 550 palms/acre).
2. **Tier 2 (Trunk Climber):** **Black Pepper (Panniyur-1 or IISR Thevam)** trailed on palms:
   - Yield: 1.5 - 2.2 kg dry pepper per vine after year 4.
   - Additional Revenue: ₹75,000 - ₹95,000 per acre net profit.
3. **Tier 3 (Sub-Canopy):** **Cocoa (Criollo/Forastero)** or **Cardamom** in high rainfall zones:
   - Utilizes 40-50% diffuse sunlight penetrating the palm canopy.
4. **Tier 4 (Ground Floor):** Bush pepper, turmeric, or ginger during initial vegetative phase.`,
    action: { text: "Simulate Financial ROI", type: "economics" }
  },
  {
    keywords: ["soil", "ph", "acidity", "lime", "organic", "laterite", "red loam", "carbon"],
    title: "Soil Chemistry & pH Correction Advisory",
    category: "Soil Health",
    response: `**Soil Health Analysis for Laterite Red Loam (Current pH: 6.4):**

- **pH Status:** Slightly acidic (6.4 is near-optimal for Arecanut 5.5-6.5 and Black Pepper 5.5-6.0).
- **Organic Carbon Enhancement:** Apply 12-15 kg well-decomposed Farm Yard Manure (FYM) or vermicompost per palm basin along with 1.5 kg Neem Cake to deter soil-borne root grubs.
- **Micronutrient Correction:**
  - Borax @ 15 g/palm/year (vital to prevent nut splitting and crown choking).
  - Zinc Sulphate @ 25 g/palm/year for robust foliar chlorophyll synthesis.
  - Dolomite @ 500 g/palm if pH drops below 5.8 to supply Calcium and Magnesium.`,
    action: { text: "View Diagnostic Telemetry", type: "reasoning" }
  },
  {
    keywords: ["weather", "rain", "monsoon", "temperature", "forecast", "humidity", "wind", "spray"],
    title: "Agro-Meteorological Spray Window Analysis",
    category: "Weather & Spraying",
    response: `**48-Hour Micro-Climate & Spray Suitability Window:**

- **Current Conditions:** 29.4°C, 78% RH, Wind 6.8 km/h NW.
- **Spray Window Status:** **OPTIMAL UNTIL 11:30 AM TODAY**.
- **Monsoon Precautions:**
  - Use agricultural stickers/spreaders (e.g., non-ionic wetting agent @ 0.5 ml/L) to prevent chemical wash-off during intermittent showers.
  - Delay systemic sprays if rainfall probability exceeds 65% within 4 hours.
  - Ensure soil moisture is adequate before applying root-zone nutrient drenches.`,
    action: { text: "Open AR Field HUD", type: "ar-field" }
  }
];

export const Route = createFileRoute("/api/ai/chat")({
  loader: async () => {
    return {
      status: "AI Agronomist Engine Ready",
      version: "v4.5-neural",
      capabilities: ["pathology", "fertigation", "intercropping", "soil_chemistry", "weather_spray"]
    };
  }
});
