// Client Portal Chatbot — Conversation Flow Model
// Deep branching decision tree with advocate filtering

export const ADVOCATES_DATA = [
  {
    id: 1,
    name: "Adv. Rajesh Kumar",
    initials: "RK",
    specialty: "Property & Real Estate",
    experience: 12,
    rating: 4.9,
    price: 1500,
    priceLabel: "₹1,500/hr",
    available: true,
    casesWon: 340,
    languages: ["English", "Hindi", "Tamil"]
  },
  {
    id: 2,
    name: "Adv. Sunita Rao",
    initials: "SR",
    specialty: "Corporate Law",
    experience: 15,
    rating: 4.8,
    price: 2000,
    priceLabel: "₹2,000/hr",
    available: true,
    casesWon: 520,
    languages: ["English", "Hindi", "Telugu"]
  },
  {
    id: 3,
    name: "Adv. Michael D'Souza",
    initials: "MD",
    specialty: "Family & Divorce",
    experience: 8,
    rating: 4.7,
    price: 1200,
    priceLabel: "₹1,200/hr",
    available: false,
    casesWon: 180,
    languages: ["English", "Hindi"]
  },
  {
    id: 4,
    name: "Adv. Priya Sharma",
    initials: "PS",
    specialty: "Criminal Defense",
    experience: 20,
    rating: 4.95,
    price: 3000,
    priceLabel: "₹3,000/hr",
    available: true,
    casesWon: 780,
    languages: ["English", "Hindi", "Punjabi"]
  },
  {
    id: 5,
    name: "Adv. Arjun Mehta",
    initials: "AM",
    specialty: "Labour & Employment",
    experience: 6,
    rating: 4.5,
    price: 800,
    priceLabel: "₹800/hr",
    available: true,
    casesWon: 95,
    languages: ["English", "Hindi", "Gujarati"]
  },
  {
    id: 6,
    name: "Adv. Lakshmi Iyer",
    initials: "LI",
    specialty: "Civil Litigation",
    experience: 10,
    rating: 4.6,
    price: 1800,
    priceLabel: "₹1,800/hr",
    available: true,
    casesWon: 290,
    languages: ["English", "Tamil", "Malayalam"]
  }
];

export const clientChatFlow = {
  // ── Entry Point ───────────────────────────────────────────
  start: {
    message: "Hello! 👋 I'm your Legal24 Smart Assistant. I can help you find the right advocate, book consultations, track cases, and more. What would you like to do?",
    options: [
      { label: "🔍 I want a consultant", next: "case_type" },
      { label: "📋 Track my case", action: "NAVIGATE", target: "/client-cases" },
      { label: "📄 View my documents", action: "NAVIGATE", target: "/client-documents" },
      { label: "💳 Payment history", action: "NAVIGATE", target: "/client-payments" },
      { label: "💬 Speak with my advocate", action: "NAVIGATE", target: "/client-consultations" }
    ]
  },

  // ── Step 1: Case Type ─────────────────────────────────────
  case_type: {
    message: "Great choice! To connect you with the best legal expert, please tell me what type of legal matter you need help with:",
    options: [
      { label: "⚖️ Civil Matter", next: "intent", meta: { caseType: "Civil" } },
      { label: "🔒 Criminal Matter", next: "intent", meta: { caseType: "Criminal" } },
      { label: "🏢 Corporate / Business", next: "intent", meta: { caseType: "Corporate" } },
      { label: "👨‍👩‍👧 Family / Divorce", next: "intent", meta: { caseType: "Family" } },
      { label: "🏠 Property / Real Estate", next: "intent", meta: { caseType: "Property" } },
      { label: "👷 Labour / Employment", next: "intent", meta: { caseType: "Labour" } },
      { label: "← Start over", next: "start" }
    ]
  },

  // ── Step 2: Just Consult or File Case ─────────────────────
  intent: {
    message: "Got it! Are you looking for a quick expert consultation, or do you need to formally file a case with an advocate?",
    options: [
      { label: "💬 Just a Consultation", next: "consult_mode", meta: { intent: "consultation" } },
      { label: "📁 File a Full Case", next: "case_urgency", meta: { intent: "file_case" } },
      { label: "← Change case type", next: "case_type" }
    ]
  },

  // ── Step 3A: Consultation Mode ────────────────────────────
  consult_mode: {
    message: "Perfect! How would you prefer to speak with the advocate?",
    options: [
      { label: "📹 Video Call", next: "pre_filter", meta: { mode: "Video Call" } },
      { label: "📞 Voice Call", next: "pre_filter", meta: { mode: "Voice Call" } },
      { label: "💬 Chat / Messaging", next: "pre_filter", meta: { mode: "Chat" } },
      { label: "← Go back", next: "intent" }
    ]
  },

  // ── Step 3B: Case Filing — Urgency ────────────────────────
  case_urgency: {
    message: "How urgent is your case? This helps us prioritize the right advocates for you.",
    options: [
      { label: "🔴 Urgent — Need immediate help", next: "pre_filter", meta: { urgency: "urgent" } },
      { label: "🟡 Moderate — Within this week", next: "pre_filter", meta: { urgency: "moderate" } },
      { label: "🟢 Not urgent — Planning ahead", next: "pre_filter", meta: { urgency: "low" } },
      { label: "← Go back", next: "intent" }
    ]
  },

  // ── Step 4: Pre-filter prompt ─────────────────────────────
  pre_filter: {
    message: "Excellent! I've found several top-rated advocates matching your needs. Would you like to filter them to find the perfect match?",
    options: [
      { label: "🎯 Yes, let me filter", action: "SHOW_FILTERS" },
      { label: "📋 Show all advocates", action: "SHOW_ALL_ADVOCATES" },
      { label: "← Start over", next: "start" }
    ]
  },

  // ── Results shown after filtering ─────────────────────────
  results_shown: {
    message: "Here are the advocates matching your criteria. You can book a consultation directly or refine your filters.",
    options: [
      { label: "🔄 Adjust filters", action: "SHOW_FILTERS" },
      { label: "🏠 Start over", next: "start" }
    ]
  },

  // ── After booking ─────────────────────────────────────────
  booked: {
    message: "🎉 Redirecting you to the booking page now. You'll be able to select a time slot and confirm your appointment.",
    options: [
      { label: "🏠 Back to start", next: "start" }
    ]
  }
};
