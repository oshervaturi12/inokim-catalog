export type Variant = "premium" | "default" | "neon";

export interface Product {
  slug: string;
  name: string;
  collection: string;
  collectionLabel: string;
  tagline: string;
  /** Short two-line copy for the catalog tile. Use \n for line break. */
  tileTagline?: string;
  /** Hero subhead — one-sentence headline above the muted description */
  headline?: string;
  description?: string;
  imageSrc: string;
  variant: Variant;

  // Catalog card highlights (4 specs max)
  cardSpecs: { label: string; value: string }[];

  // Inner page hero highlights (4 specs)
  highlights: { label: string; value: string }[];

  // Pricing
  fobFrom: number;
  msrpFrom: number;
  /** For OX which has 48V / 60V variants */
  fobAll?: number[];
  msrpAll?: number[];
  variantLabels?: string[];

  // Full specs (shown on inner page)
  specs: {
    power: { label: string; value: string; unit?: string; secondary?: string }[];
    build: { label: string; value: string; unit?: string; secondary?: string }[];
    smart: { label: string; value: string; unit?: string; secondary?: string }[];
    logistics: { label: string; value: string; unit?: string; secondary?: string }[];
  };

  // Optional color lineup (KIX, Light, Quick4)
  colors?: { name: string; hex: string }[];

  /** Custom feature bands shown on the inner product page. 2-4 per product. */
  features?: ProductFeature[];

  /** Show interactive 3D scooter in the hero (only worth it for flagships) */
  use3D?: boolean;
  /** Path to a .glb model under /public. Falls back to a primitive scooter if absent. */
  model3DSrc?: string;
}

export interface ProductFeature {
  /** Eyebrow label above the feature title */
  eyebrow: string;
  /** Big feature headline. Supports `{accent:text}` for red gradient emphasis. */
  title: string;
  /** Supporting paragraph below */
  description: string;
  /** Image for this feature. Path under /public, e.g. "/products/oxo-dubai-feature-1.png". Falls back to product hero image. */
  imageSrc?: string;
  /** Background treatment */
  theme?: "white" | "section" | "dark";
  /** stacked = image below centered text. split = text + image side by side. split-reverse = image left, text right. mega = no image, big typography. */
  layout?: "stacked" | "split" | "split-reverse" | "mega";
  /** Apply scroll parallax to image (stacked layout only) */
  parallax?: boolean;
}

const SHARED_LOGISTICS = [
  { label: "MOQ", value: "1 × 20ft", unit: "Container" },
  { label: "Lead Time", value: "35–45", unit: "Days" },
  { label: "Payment", value: "30%", secondary: "Deposit · 70% B/L" },
  { label: "Incoterms", value: "FOB", secondary: "China" },
];

export const products: Product[] = [
  // ═══════════════════════════════════════════════
  // DUBAI COLLECTION
  // ═══════════════════════════════════════════════
  {
    slug: "ox-dubai",
    name: "OX Dubai",
    collection: "dubai",
    collectionLabel: "Dubai 2026",
    tagline: "Single motor · Urban precision",
    tileTagline: "Single motor.\nUrban precision.",
    headline: "Single motor. {accent:Urban precision.}",
    description:
      "The Dubai Collection's entry into single-motor performance. Hydraulic brakes front and rear, Ghost Shield smart system included. Available in 48V and 60V.",
    imageSrc: "/products/2.png",
    variant: "neon",
    cardSpecs: [
      { label: "Peak", value: "1300W" },
      { label: "Top Speed", value: "50 / 60 KMH" },
      { label: "Range", value: "60 / 95 KM" },
      { label: "Weight", value: "26 / 28 KG" },
    ],
    highlights: [
      { label: "Peak", value: "1300W" },
      { label: "Top Speed", value: "60 KMH" },
      { label: "Range", value: "95 KM" },
      { label: "Battery", value: "60V 21Ah" },
    ],
    fobFrom: 770,
    msrpFrom: 1990,
    fobAll: [770, 870],
    msrpAll: [1990, 2690],
    variantLabels: ["48V", "60V"],
    specs: {
      power: [
        { label: "Peak Power", value: "1300", unit: "W" },
        { label: "Battery", value: "48V 21Ah / 60V 21Ah" },
        { label: "Top Speed", value: "50 / 60", unit: "KMH", secondary: "31 / 37 MPH" },
        { label: "Range", value: "60 / 95", unit: "KM", secondary: "37 / 59 MI" },
      ],
      build: [
        { label: "Weight", value: "26 / 28", unit: "KG", secondary: "57 / 62 LB" },
        { label: "Tires", value: "10×2.5", unit: "Pneumatic" },
        { label: "Brakes", value: "Hydraulic", secondary: "Front + Rear" },
        { label: "Folded Size", value: "122×59×54", unit: "CM" },
      ],
      smart: [
        { label: "Ghost Shield", value: "Included" },
        { label: "CarPlay", value: "Optional" },
        { label: "GPS / NFC / Alarm", value: "Yes" },
      ],
      logistics: [
        { label: "FOB China", value: "$770 / $870", secondary: "48V / 60V" },
        { label: "MSRP USD", value: "$1,990 / $2,690", secondary: "48V / 60V" },
        { label: "40HQ Container", value: "~110", unit: "PCS" },
        ...SHARED_LOGISTICS.slice(1),
      ],
    },
    features: [
      {
        eyebrow: "Two voltages",
        title: "{accent:Choose} your power.",
        description:
          "48V for the daily city ride. 60V when you need to keep up with traffic. Same chassis, two distinct personalities — both finished to the standard the OX has carried since day one.",
        theme: "section",
        layout: "stacked",
        parallax: true,
      },
      {
        eyebrow: "Hydraulic brakes",
        title: "Stops when\nit matters.",
        description:
          "Front and rear hydraulic disc brakes — the kind you'd find on a downhill mountain bike. Predictable, precise, and they don't fade after the third hard stop.",
        theme: "dark",
        layout: "split",
      },
      {
        eyebrow: "Ghost Shield",
        title: "Smart by\n{accent:default}.",
        description:
          "GPS, NFC, and alarm system included. Track your scooter, tap your phone to unlock, and walk away knowing it's protected.",
        theme: "white",
        layout: "split-reverse",
      },
    ],
  },

  {
    slug: "oxo-dubai",
    name: "OXO Dubai",
    collection: "dubai",
    collectionLabel: "Dubai 2026",
    tagline: "Dual motor · Extreme power",
    tileTagline: "Dual motor.\nExtreme power.",
    headline: "Two motors. {accent:2,600 watts} of force. The new flagship.",
    description:
      "The flagship of the 2026 Dubai Collection. 2,600W of peak power, 110 km of range, and the Ghost Shield smart system included as standard.",
    imageSrc: "/products/2.png",
    variant: "neon",
    cardSpecs: [
      { label: "Peak", value: "2600W" },
      { label: "Top Speed", value: "65 KMH" },
      { label: "Range", value: "110 KM" },
      { label: "Battery", value: "60V 26Ah" },
    ],
    highlights: [
      { label: "Peak", value: "2,600W" },
      { label: "Top Speed", value: "65 km/h" },
      { label: "Range", value: "110 km" },
      { label: "Battery", value: "60V 26Ah" },
    ],
    fobFrom: 1190,
    msrpFrom: 3790,
    use3D: true,
    model3DSrc: "/models/2.png",  // Uncomment when you have a real .glb model
    specs: {
      power: [
        { label: "Peak Power", value: "2,600", unit: "W" },
        { label: "Battery", value: "60V 26Ah" },
        { label: "Top Speed", value: "65", unit: "km/h", secondary: "40 mph" },
        { label: "Range", value: "110", unit: "km", secondary: "68 mi" },
      ],
      build: [
        { label: "Weight", value: "33.5", unit: "kg", secondary: "74 lb" },
        { label: "Tires", value: "10×3", unit: "Pneumatic" },
        { label: "Brakes", value: "Hydraulic", secondary: "Front + Rear" },
        { label: "Folded Size", value: "122×59×54", unit: "cm" },
      ],
      smart: [
        { label: "Ghost Shield", value: "Included" },
        { label: "CarPlay", value: "Optional" },
        { label: "GPS / NFC / Alarm", value: "Yes" },
      ],
      logistics: [
        { label: "FOB China", value: "$1,190" },
        { label: "MSRP USD", value: "$3,790" },
        { label: "40HQ Container", value: "~100", unit: "PCS" },
        ...SHARED_LOGISTICS.slice(1),
      ],
    },
    features: [
      {
        eyebrow: "Dual motor",
        title: "{accent:2,600 watts}\nof pure force.",
        description:
          "Two motors, perfectly synchronized. The kind of acceleration that pushes you back into the deck. The kind of climbing that ignores the gradient. Built for people who refuse to slow down.",
        theme: "dark",
        layout: "stacked",
        parallax: true,
      },
      {
        eyebrow: "Range",
        title: "110 km without\nhesitation.",
        description:
          "A 60V 26Ah lithium battery means you stop thinking about charging. Commute, errands, weekend rides — the OXO Dubai handles a full week without a top-up.",
        theme: "section",
        layout: "split",
      },
      {
        eyebrow: "Ghost Shield",
        title: "Protected. {accent:Always.}",
        description:
          "GPS tracking, NFC unlock, and a built-in alarm system. Your scooter stays connected — and protected — even when you walk away.",
        theme: "white",
        layout: "split-reverse",
      },
      {
        eyebrow: "Hydraulic precision",
        title: "Stops on\na coin.",
        description:
          "Front and rear hydraulic disc brakes — the kind you'd find on a downhill mountain bike. Predictable. Precise. Doesn't fade after the third hard stop.",
        theme: "dark",
        layout: "mega",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // CARBON COLLECTION
  // ═══════════════════════════════════════════════
  {
    slug: "ox-carbon",
    name: "OX Carbon",
    collection: "carbon",
    collectionLabel: "Carbon 2026",
    tagline: "Single motor · Carbon frame",
    tileTagline: "Single motor.\nCarbon frame.",
    headline: "Carbon-fiber chassis. {accent:Refined} performance.",
    description:
      "Premium carbon-fiber frame on the proven OX platform. Same hydraulic stopping power and Ghost Shield system, with a lighter, more refined chassis.",
    imageSrc: "/products/INSCOX010309.png",
    variant: "premium",
    cardSpecs: [
      { label: "Peak", value: "1300W" },
      { label: "Top Speed", value: "50 / 60 KMH" },
      { label: "Range", value: "60 / 95 KM" },
      { label: "Frame", value: "Carbon" },
    ],
    highlights: [
      { label: "Peak", value: "1,300W" },
      { label: "Top Speed", value: "60 km/h" },
      { label: "Range", value: "95 km" },
      { label: "Frame", value: "Carbon" },
    ],
    fobFrom: 990,
    msrpFrom: 2990,
    fobAll: [990, 1090],
    msrpAll: [2990, 3190],
    variantLabels: ["48V", "60V"],
    specs: {
      power: [
        { label: "Peak Power", value: "1,300", unit: "W" },
        { label: "Battery", value: "48V 21Ah / 60V 21Ah" },
        { label: "Top Speed", value: "50 / 60", unit: "km/h", secondary: "31 / 37 mph" },
        { label: "Range", value: "60 / 95", unit: "km", secondary: "37 / 59 mi" },
      ],
      build: [
        { label: "Frame", value: "Carbon Fiber" },
        { label: "Weight", value: "26 / 28", unit: "kg", secondary: "57 / 62 lb" },
        { label: "Tires", value: "10×2.5", unit: "Pneumatic" },
        { label: "Brakes", value: "Hydraulic", secondary: "Front + Rear" },
      ],
      smart: [
        { label: "Ghost Shield", value: "Included" },
        { label: "CarPlay", value: "Optional" },
        { label: "GPS / NFC / Alarm", value: "Yes" },
      ],
      logistics: [
        { label: "FOB China", value: "$990 / $1,090", secondary: "48V / 60V" },
        { label: "MSRP USD", value: "$2,990 / $3,190", secondary: "48V / 60V" },
        { label: "40HQ Container", value: "~110", unit: "PCS" },
        ...SHARED_LOGISTICS.slice(1),
      ],
    },
    features: [
      {
        eyebrow: "Carbon fiber",
        title: "Lighter. Stiffer.\n{accent:Beautiful.}",
        description:
          "The same OX platform you trust, now wrapped in carbon fiber. The weave is visible, the finish is hand-checked, and the ride feels noticeably more responsive.",
        theme: "dark",
        layout: "stacked",
        parallax: true,
      },
      {
        eyebrow: "Two voltages",
        title: "48V or 60V —\nyour call.",
        description:
          "Choose the version that matches your terrain. The 48V keeps it nimble for the city. The 60V opens up the open road. Both wear the same carbon shell.",
        theme: "section",
        layout: "split",
      },
      {
        eyebrow: "Detail",
        title: "It's in the\n{accent:details.}",
        description:
          "Hydraulic disc brakes. 10-inch pneumatic tires. Ghost Shield smart system. Every component on the OX Carbon was chosen because it deserves to be there.",
        theme: "white",
        layout: "split-reverse",
      },
    ],
  },

  {
    slug: "oxo-carbon",
    name: "OXO Carbon",
    collection: "carbon",
    collectionLabel: "Carbon 2026",
    tagline: "Dual motor · Carbon frame",
    tileTagline: "Dual motor in carbon.\nThe ultimate build.",
    headline: "Dual motor in carbon. {accent:The ultimate build.}",
    description:
      "OXO performance in a carbon-fiber chassis. Maximum power, maximum range, refined construction.",
    imageSrc: "/products/INSCOX010309.png",
    variant: "premium",
    cardSpecs: [
      { label: "Peak", value: "2600W" },
      { label: "Top Speed", value: "65 KMH" },
      { label: "Range", value: "110 KM" },
      { label: "Frame", value: "Carbon" },
    ],
    highlights: [
      { label: "Peak", value: "2,600W" },
      { label: "Top Speed", value: "65 km/h" },
      { label: "Range", value: "110 km" },
      { label: "Battery", value: "60V 26Ah" },
    ],
    fobFrom: 1390,
    msrpFrom: 3990,
    specs: {
      power: [
        { label: "Peak Power", value: "2,600", unit: "W" },
        { label: "Battery", value: "60V 26Ah" },
        { label: "Top Speed", value: "65", unit: "km/h", secondary: "40 mph" },
        { label: "Range", value: "110", unit: "km", secondary: "68 mi" },
      ],
      build: [
        { label: "Frame", value: "Carbon Fiber" },
        { label: "Weight", value: "33.5", unit: "kg", secondary: "74 lb" },
        { label: "Tires", value: "10×3", unit: "Pneumatic" },
        { label: "Brakes", value: "Hydraulic", secondary: "Front + Rear" },
      ],
      smart: [
        { label: "Ghost Shield", value: "Included" },
        { label: "CarPlay", value: "Optional" },
        { label: "GPS / NFC / Alarm", value: "Yes" },
      ],
      logistics: [
        { label: "FOB China", value: "$1,390" },
        { label: "MSRP USD", value: "$3,990" },
        { label: "40HQ Container", value: "~100", unit: "PCS" },
        ...SHARED_LOGISTICS.slice(1),
      ],
    },
    features: [
      {
        eyebrow: "The flagship in carbon",
        title: "The {accent:ultimate}\nbuild.",
        description:
          "Take the OXO's 2,600W dual-motor performance. Wrap it in a carbon-fiber chassis. The result is the most refined, most powerful Inokim ever made.",
        theme: "dark",
        layout: "stacked",
        parallax: true,
      },
      {
        eyebrow: "Performance",
        title: "Engineered to\noutperform.",
        description:
          "65 km/h top speed. 110 km of range. Dual hydraulic brakes. Ghost Shield smart system. Nothing on this scooter is there by accident.",
        theme: "section",
        layout: "split",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // QUICK 4 COLLECTION
  // ═══════════════════════════════════════════════
  {
    slug: "quick4-hero",
    name: "Quick⁴ Hero",
    collection: "quick4",
    collectionLabel: "Quick⁴ 2026",
    tagline: "Built for the city · Daily ready",
    tileTagline: "Daily ready.\nFast folding.",
    headline: "Daily ready. Fast folding. {accent:Built for the city.}",
    description:
      "Fast folding, front and rear suspension, and the Quick⁴ chassis everyone loves. Hero is the daily-commute spec.",
    imageSrc: "/products/QUICK-4-INOKIM Colors-1.png",
    variant: "default",
    cardSpecs: [
      { label: "Peak", value: "800W" },
      { label: "Top Speed", value: "40 KMH" },
      { label: "Range", value: "58 KM" },
      { label: "Weight", value: "21.5 KG" },
    ],
    highlights: [
      { label: "Peak", value: "800W" },
      { label: "Top Speed", value: "40 km/h" },
      { label: "Range", value: "58 km" },
      { label: "Battery", value: "50.4V 13Ah" },
    ],
    fobFrom: 690,
    msrpFrom: 1990,
    colors: [
      { name: "Green", hex: "#7BC74D" },
      { name: "Orange", hex: "#FF6B1A" },
      { name: "Blue", hex: "#2BCDF2" },
    ],
    specs: {
      power: [
        { label: "Peak Power", value: "800", unit: "W" },
        { label: "Battery", value: "50.4V 13Ah" },
        { label: "Top Speed", value: "40", unit: "km/h", secondary: "25 mph" },
        { label: "Range", value: "58", unit: "km", secondary: "36 mi" },
      ],
      build: [
        { label: "Weight", value: "21.5", unit: "kg", secondary: "47 lb" },
        { label: "Suspension", value: "Front + Rear" },
        { label: "Brakes", value: "Front + Rear", secondary: "Drum" },
        { label: "Fold Time", value: "Fast Folding" },
      ],
      smart: [{ label: "Daily Ready", value: "Yes" }],
      logistics: [
        { label: "FOB China", value: "$690" },
        { label: "MSRP USD", value: "$1,990" },
        { label: "40HQ Container", value: "~200", unit: "PCS" },
        ...SHARED_LOGISTICS.slice(1),
      ],
    },
    features: [
      {
        eyebrow: "The classic, refined",
        title: "Built for\n{accent:the city.}",
        description:
          "The Quick⁴ chassis everyone loves, in its everyday-ready spec. Front and rear suspension, fast folding, and a battery sized for real commutes — not marketing brochures.",
        theme: "section",
        layout: "stacked",
        parallax: true,
      },
      {
        eyebrow: "Three colors",
        title: "Personality,\nnot paint.",
        description:
          "Green, orange, or blue. The accent color runs through the wheel hubs and frame highlights — small enough to be tasteful, bold enough to be yours.",
        theme: "white",
        layout: "split",
      },
    ],
  },

  {
    slug: "quick4-super",
    name: "Quick⁴ Super",
    collection: "quick4",
    collectionLabel: "Quick⁴ 2026",
    tagline: "Built for the city · Extended range",
    tileTagline: "Extended range.\nSame chassis.",
    headline: "Extended range. {accent:70 km} on a single charge.",
    description:
      "The Super takes the Quick⁴ platform and stretches the range to 70 km with a larger 16Ah battery.",
    imageSrc: "/products/QUICK-4-INOKIM Colors-1.png",
    variant: "default",
    cardSpecs: [
      { label: "Peak", value: "800W" },
      { label: "Top Speed", value: "40 KMH" },
      { label: "Range", value: "70 KM" },
      { label: "Weight", value: "22.5 KG" },
    ],
    highlights: [
      { label: "Peak", value: "800W" },
      { label: "Top Speed", value: "40 km/h" },
      { label: "Range", value: "70 km" },
      { label: "Battery", value: "50.4V 16Ah" },
    ],
    fobFrom: 730,
    msrpFrom: 2290,
    colors: [
      { name: "Green", hex: "#7BC74D" },
      { name: "Orange", hex: "#FF6B1A" },
      { name: "Blue", hex: "#2BCDF2" },
    ],
    specs: {
      power: [
        { label: "Peak Power", value: "800", unit: "W" },
        { label: "Battery", value: "50.4V 16Ah" },
        { label: "Top Speed", value: "40", unit: "km/h", secondary: "25 mph" },
        { label: "Range", value: "70", unit: "km", secondary: "44 mi" },
      ],
      build: [
        { label: "Weight", value: "22.5", unit: "kg", secondary: "50 lb" },
        { label: "Suspension", value: "Front + Rear" },
        { label: "Brakes", value: "Front + Rear", secondary: "Drum" },
        { label: "Fold Time", value: "Fast Folding" },
      ],
      smart: [{ label: "Daily Ready", value: "Yes" }],
      logistics: [
        { label: "FOB China", value: "$730" },
        { label: "MSRP USD", value: "$2,290" },
        { label: "40HQ Container", value: "~200", unit: "PCS" },
        ...SHARED_LOGISTICS.slice(1),
      ],
    },
    features: [
      {
        eyebrow: "Extended range",
        title: "{accent:70 km}\non a single charge.",
        description:
          "A 16Ah battery instead of 13Ah. Twelve more kilometers in the same chassis. For the rider whose route grew, or whose ambition did.",
        theme: "section",
        layout: "stacked",
        parallax: true,
      },
      {
        eyebrow: "Same Quick⁴ chassis",
        title: "Different battery.\nSame DNA.",
        description:
          "Front and rear suspension. Fast folding. Same three colors. The Super is the Hero with more endurance — nothing more, nothing less.",
        theme: "dark",
        layout: "split",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // LIGHT 3 — premium commuter
  // ═══════════════════════════════════════════════
  {
    slug: "light3",
    name: "Light³",
    collection: "light3",
    collectionLabel: "Light³ 2026",
    tagline: "Premium commuter · CarPlay built in",
    tileTagline: "CarPlay built in.\nFive colors. 12 kg.",
    headline: "{accent:CarPlay} built in. The premium commuter.",
    description:
      "The new generation Light³ adds Apple CarPlay, App Store readiness, a wide smart display, and the Ghost Shield system as standard. 12 kg, 35 km/h, all-day commute.",
    imageSrc: "/products/20001M.png",
    variant: "default",
    cardSpecs: [
      { label: "Peak", value: "600W" },
      { label: "Top Speed", value: "35 KMH" },
      { label: "Range", value: "43 KM" },
      { label: "Weight", value: "12 KG" },
    ],
    highlights: [
      { label: "Peak", value: "600W" },
      { label: "Top Speed", value: "35 km/h" },
      { label: "Range", value: "43 km" },
      { label: "Weight", value: "12 kg" },
    ],
    fobFrom: 550,
    msrpFrom: 1690,
    colors: [
      { name: "White", hex: "#F5F5F5" },
      { name: "Sky Blue", hex: "#2BCDF2" },
      { name: "Orange", hex: "#FF8C1A" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Green", hex: "#7BC74D" },
    ],
    specs: {
      power: [
        { label: "Peak Power", value: "600", unit: "W" },
        { label: "Battery", value: "36V 12.8Ah" },
        { label: "Top Speed", value: "35", unit: "km/h", secondary: "22 mph" },
        { label: "Range", value: "43", unit: "km", secondary: "27 mi" },
      ],
      build: [
        { label: "Weight", value: "12", unit: "kg", secondary: "26.5 lb" },
        { label: "Brakes", value: "Front + Rear", secondary: "Drum" },
        { label: "Folded Size", value: "95×36×25", unit: "cm" },
      ],
      smart: [
        { label: "Apple CarPlay", value: "Built In" },
        { label: "App Store", value: "Ready" },
        { label: "Ghost Shield", value: "Included" },
        { label: "Smart Display", value: "Wide" },
      ],
      logistics: [
        { label: "FOB China", value: "$550" },
        { label: "MSRP USD", value: "$1,690" },
        { label: "40HQ Container", value: "~320", unit: "PCS" },
        ...SHARED_LOGISTICS.slice(1),
      ],
    },
    features: [
      {
        eyebrow: "Apple CarPlay",
        title: "{accent:CarPlay,}\non a scooter.",
        description:
          "Connect your iPhone. Get directions, calls, and music on the wide smart display — without ever pulling your phone out of your pocket. The first scooter that thinks like the device in your pocket.",
        theme: "dark",
        layout: "stacked",
        parallax: true,
      },
      {
        eyebrow: "Twelve kilograms",
        title: "Carry it like\na laptop.",
        description:
          "Twelve kilograms is a tote bag of groceries. It's a small dog. It's nothing on the train, in the elevator, up the stairs to your apartment.",
        theme: "section",
        layout: "split",
      },
      {
        eyebrow: "Five colors",
        title: "Five finishes.\n{accent:One favorite.}",
        description:
          "White, sky blue, orange, black, or green. The Light³ is the same scooter every time — but the one you choose is uniquely yours.",
        theme: "white",
        layout: "split-reverse",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // LIGHT 2 — entry tech line
  // ═══════════════════════════════════════════════
  {
    slug: "light2",
    name: "Light²",
    collection: "light2",
    collectionLabel: "Light² 2026",
    tagline: "Smart display · Lightweight frame",
    tileTagline: "Smart display.\nLightweight frame.",
    headline: "Smart display. Lightweight frame. {accent:Daily ready.}",
    description:
      "The Tech Line. Smart display, fast folding, lightweight frame — daily ready in five colors.",
    imageSrc: "/products/20002M.png",
    variant: "default",
    cardSpecs: [
      { label: "Peak", value: "600W" },
      { label: "Top Speed", value: "35 KMH" },
      { label: "Range", value: "43 KM" },
      { label: "Weight", value: "12 KG" },
    ],
    highlights: [
      { label: "Peak", value: "600W" },
      { label: "Top Speed", value: "35 km/h" },
      { label: "Range", value: "43 km" },
      { label: "Weight", value: "12 kg" },
    ],
    fobFrom: 485,
    msrpFrom: 999,
    colors: [
      { name: "White", hex: "#F5F5F5" },
      { name: "Sky Blue", hex: "#2BCDF2" },
      { name: "Orange", hex: "#FF8C1A" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Green", hex: "#7BC74D" },
    ],
    specs: {
      power: [
        { label: "Peak Power", value: "600", unit: "W" },
        { label: "Battery", value: "36V 12.8Ah" },
        { label: "Top Speed", value: "35", unit: "km/h", secondary: "22 mph" },
        { label: "Range", value: "43", unit: "km", secondary: "27 mi" },
      ],
      build: [
        { label: "Weight", value: "12", unit: "kg", secondary: "26.5 lb" },
        { label: "Brakes", value: "Front + Rear", secondary: "Drum" },
        { label: "Folded Size", value: "37×14×10", unit: "in" },
      ],
      smart: [{ label: "Smart Display", value: "Yes" }, { label: "Fast Folding", value: "Yes" }],
      logistics: [
        { label: "FOB China", value: "$485" },
        { label: "MSRP USD", value: "$999" },
        { label: "40HQ Container", value: "~320", unit: "PCS" },
        ...SHARED_LOGISTICS.slice(1),
      ],
    },
    features: [
      {
        eyebrow: "Tech Line",
        title: "Smart, where\n{accent:it matters.}",
        description:
          "A sharp digital display, fast folding, and a frame light enough to forget. Everything you need, nothing you don't — and nothing you'd swap out a year from now.",
        theme: "section",
        layout: "stacked",
        parallax: true,
      },
      {
        eyebrow: "Five colors",
        title: "Pure color\nlineup.",
        description:
          "White, sky blue, orange, black, or green. Choose the one that fits your style — they all carry the same Inokim engineering inside.",
        theme: "white",
        layout: "split",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // KIX — entry-level
  // ═══════════════════════════════════════════════
  {
    slug: "kix",
    name: "KIX",
    collection: "kix",
    collectionLabel: "Kix 2026",
    tagline: "Entry-level · Bold colors",
    tileTagline: "Entry to the Inokim world.\nFive colors. From $1,190 MSRP.",
    headline: "Your {accent:entry} to the Inokim world.",
    description:
      "The most accessible Inokim. Five color options, 40 km range, 16.5 kg. The gateway scooter for the 2026 lineup.",
    imageSrc: "/products/INSCKIX010503.png",
    variant: "default",
    cardSpecs: [
      { label: "Peak", value: "500W" },
      { label: "Top Speed", value: "40 KMH" },
      { label: "Range", value: "40 KM" },
      { label: "Weight", value: "16.5 KG" },
    ],
    highlights: [
      { label: "Peak", value: "500W" },
      { label: "Top Speed", value: "40 km/h" },
      { label: "Range", value: "40 km" },
      { label: "Weight", value: "16.5 kg" },
    ],
    fobFrom: 399,
    msrpFrom: 1190,
    colors: [
      { name: "Pink", hex: "#FF1493" },
      { name: "Blue", hex: "#2BCDF2" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F5F5F5" },
      { name: "Olive", hex: "#8B9D45" },
    ],
    specs: {
      power: [
        { label: "Peak Power", value: "500", unit: "W" },
        { label: "Battery", value: "36V 12.8Ah" },
        { label: "Top Speed", value: "40", unit: "km/h", secondary: "25 mph" },
        { label: "Range", value: "40", unit: "km", secondary: "25 mi" },
      ],
      build: [
        { label: "Weight", value: "16.5", unit: "kg", secondary: "36.5 lb" },
        { label: "Brakes", value: "Front + Rear", secondary: "Drum" },
        { label: "Folded Size", value: "110×50×46", unit: "cm" },
      ],
      smart: [{ label: "Daily Ready", value: "Yes" }],
      logistics: [
        { label: "FOB China", value: "$399" },
        { label: "MSRP USD", value: "$1,190" },
        { label: "40HQ Container", value: "~160", unit: "PCS" },
        ...SHARED_LOGISTICS.slice(1),
      ],
    },
    features: [
      {
        eyebrow: "The entry to Inokim",
        title: "An Inokim,\n{accent:for everyone.}",
        description:
          "Same engineering DNA, same build quality, same warranty. The KIX is the most accessible way into the Inokim world — and the perfect first scooter for new riders.",
        theme: "section",
        layout: "stacked",
        parallax: true,
      },
      {
        eyebrow: "Five colors",
        title: "{accent:Bold,}\nby default.",
        description:
          "Pink. Blue. Black. White. Olive. The KIX comes in finishes that say something — because the first thing you ride should look like you.",
        theme: "dark",
        layout: "split",
      },
    ],
  },
];

// Lookup helpers
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCollection = (collection: string) =>
  products.filter((p) => p.collection === collection);

// Collections — each one corresponds to a /collections/{slug} URL.
// `dataCollections` is the list of `Product.collection` values it includes.
// Most map 1:1, but Light bundles light3 + light2 under one URL.
export interface Collection {
  /** URL slug for /collections/{slug} */
  slug: string;
  /** Short label used in nav */
  label: string;
  /** Long display name shown on the collection page */
  displayName: string;
  /** Hero eyebrow */
  eyebrow: string;
  /** Hero headline. Supports `{accent:text}` for red gradient emphasis. */
  headline: string;
  /** Subhead beneath the headline */
  subhead: string;
  /** Background theme for hero */
  heroTheme: "white" | "section" | "dark";
  /** Which `Product.collection` values belong to this collection */
  dataCollections: string[];
  /** Optional "story" copy for the collection — shown above tiles */
  story?: string;
}

export const collections: Collection[] = [
  {
    slug: "dubai",
    label: "Dubai",
    displayName: "Dubai Collection",
    eyebrow: "The Dubai Collection",
    headline: "Power without {accent:compromise.}",
    subhead:
      "Single or dual motor. Up to 2,600 watts. Ghost Shield smart system included. The collection that defines the 2026 lineup.",
    heroTheme: "dark",
    dataCollections: ["dubai"],
    story:
      "Built for riders who measure performance in numbers. The Dubai Collection takes the Inokim platform to its limit — and then a bit beyond.",
  },
  {
    slug: "carbon",
    label: "Carbon",
    displayName: "Carbon Collection",
    eyebrow: "The Carbon Collection",
    headline: "Lighter. Stiffer. {accent:Beautiful.}",
    subhead:
      "The OX and OXO platforms, now wrapped in carbon fiber. Same hydraulic stopping power. Same Ghost Shield system. A more refined chassis.",
    heroTheme: "dark",
    dataCollections: ["carbon"],
    story:
      "Carbon fiber isn't a finish. It's an engineering decision — lighter weight, higher stiffness, more responsive ride. The Carbon Collection is the proof.",
  },
  {
    slug: "quick4",
    label: "Quick⁴",
    displayName: "Quick⁴ Collection",
    eyebrow: "The Quick⁴ Collection",
    headline: "Built for {accent:the city.}",
    subhead:
      "Fast folding, front and rear suspension, three colors. The Quick⁴ chassis comes in two specs: daily ready, or extended range.",
    heroTheme: "section",
    dataCollections: ["quick4"],
    story:
      "Twelve years of refinement. The Quick⁴ is the platform commuters return to — because it does everything, and nothing in excess.",
  },
  {
    slug: "light",
    label: "Light",
    displayName: "Light Collection",
    eyebrow: "The Light Collection",
    headline: "{accent:Lightweight} by design.",
    subhead:
      "The premium Light³ adds Apple CarPlay and Ghost Shield. The Light² Tech Line keeps it essential. Both are 12 kg, both come in five colors.",
    heroTheme: "section",
    dataCollections: ["light3", "light2"],
    story:
      "Light by name. Light by weight. The Light Collection is for commuters who carry their scooter as much as they ride it.",
  },
  {
    slug: "kix",
    label: "Kix",
    displayName: "KIX Collection",
    eyebrow: "The KIX Collection",
    headline: "Your entry to {accent:the Inokim world.}",
    subhead:
      "Five bold colors. 40 km of range. 16.5 kg. The most accessible Inokim — and the perfect first scooter for new riders.",
    heroTheme: "section",
    dataCollections: ["kix"],
    story:
      "Same engineering DNA, same build quality, same warranty. KIX is the gateway scooter for the 2026 lineup.",
  },
];

export const getCollection = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);

/** Get all products belonging to a collection (including merged ones like Light) */
export const getProductsForCollection = (slug: string): Product[] => {
  const collection = getCollection(slug);
  if (!collection) return [];
  return products.filter((p) =>
    collection.dataCollections.includes(p.collection),
  );
};