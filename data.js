/* ============================================================================
 *  PORTFOLIO DATA — "MOHAMMED SULTAN THE SERIES"
 * ----------------------------------------------------------------------------
 *  ★ EDIT ONLY THIS FILE to personalize the site. ★
 *  Layout, styling and animation code lives in index.html / styles.css / app.js
 *  and reads everything from the single PORTFOLIO object below.
 *
 *  All content below comes from the owner's brief. "TODO:" marks the few
 *  things still missing (photo, contact details, employer names) — search
 *  this file for "TODO" to find them.
 * ========================================================================== */

const PORTFOLIO = {
  /* ------------------------------------------------------------------ */
  /* Site / brand strings                                                */
  /* ------------------------------------------------------------------ */
  meta: {
    siteTitle: "Mohammed Sultan — The Series",
    brandWord: "SULTANFLIX", // the little red logo in the top nav
    seriesTitle: "MOHAMMED SULTAN THE SERIES", // cinematic title card
    footerNote:
      "© 2026 Mohammed Sultan · Karimnagar, Telangana, India. A Netflix-style portfolio — a playful homage, not affiliated with Netflix.",
  },

  /* ------------------------------------------------------------------ */
  /* Core profile                                                         */
  /* ------------------------------------------------------------------ */
  profile: {
    name: "Mohammed Sultan",
    firstName: "Mohammed",
    role: "Healthcare Operations & Digital Innovation Professional",
    tagline: "Bridging Healthcare Operations, Digital Marketing and Technology.",
    secondaryTagline: "Practical Healthcare Experience. Smarter Digital Solutions.",
    location: "Karimnagar, Telangana, India",
    // ▼▼▼ PROFILE PHOTO PLACEHOLDER ▼▼▼
    // Replace the "MS" monogram avatar with a real photograph:
    // in styles.css, give .hero-avatar a background-image, or swap the
    // <div class="hero-avatar"> block in index.html for an <img>.
    avatarInitial: "MS", // TODO: replace with real photo (see comment above)
    heroKicker: "HEALTHCARE OPERATIONS · DIGITAL INNOVATION",
    heroTitle: "MOHAMMED SULTAN",
    heroDescription:
      "I combine practical hospital experience, healthcare administration, digital marketing, and an interest in technology to explore smarter solutions for healthcare operations and patient engagement.",
    heroMetaYear: "2026",
    heroMetaTags: ["Karimnagar, India", "Healthcare Operations", "Digital Innovation"],
    aboutLong: [
      "I am Mohammed Sultan, a healthcare professional with approximately seven years of experience in hospital environments. My experience includes anesthesia technology, operation theatre support, patient reception, billing, discharge documentation, hospital software workflows, surgical coordination, and exposure to multiple hospital departments.",
      "Alongside my healthcare experience, I have developed practical interests in digital marketing, medical content creation, social media management, clinic branding, and local search visibility.",
      "I have also explored digital solutions for patient registration, billing calculations, patient follow-up systems, and healthcare administration. I am currently developing my technical skills and exploring how software and digital tools can address practical challenges in healthcare.",
      "My long-term goal is to combine healthcare knowledge, operational understanding, and digital innovation to contribute to more efficient healthcare services.",
    ],
    learningNote:
      "I am currently learning and developing my coding skills — this site presents concepts and explorations honestly, not senior engineering credentials.",
  },

  /* ------------------------------------------------------------------ */
  /* "Who's watching?" profiles. Selecting 'Recruiter' swaps the hero     */
  /* description for heroEmphasis (leave as "" to use the default).       */
  /* ------------------------------------------------------------------ */
  profiles: [
    {
      id: "mohammed",
      label: "Mohammed Sultan",
      initial: "MS",
      accent: "#E50914",
      blurb: "The director's cut — healthcare operations, digital marketing, and technology.",
      heroEmphasis: "",
    },
    {
      id: "recruiter",
      label: "Recruiter",
      initial: "R",
      accent: "#0071EB",
      blurb: "The hiring-manager edit: skills, services, experience, contact.",
      heroEmphasis:
        "Healthcare operations professional with approximately seven years of hospital experience — anesthesia technology, OT support, patient reception, billing, discharge documentation, and surgical coordination — now bridging clinical workflows, digital marketing, and technology. Explore the skill universe, services, and projects below, or jump straight to contact.",
    },
    {
      id: "developer",
      label: "Developer",
      initial: "D",
      accent: "#46D369",
      blurb: "For the technically curious: workflow prototypes, tools, and concepts.",
      heroEmphasis: "",
    },
    {
      id: "creative",
      label: "Creative",
      initial: "C",
      accent: "#B9090B",
      blurb: "Medical creatives, clinic branding, and social content.",
      heroEmphasis: "",
    },
  ],

  /* ------------------------------------------------------------------ */
  /* Homepage content rails (rendered in order)                           */
  /* ------------------------------------------------------------------ */
  rails: [
    { id: "full-story", title: "THE FULL STORY", subtitle: "Seven years in hospitals — and what comes next." },
    { id: "skills", title: "MY SKILL UNIVERSE", subtitle: "Every capability, honestly labelled." },
    { id: "services", title: "SERVICES", subtitle: "What I can help with, based on real capabilities." },
    { id: "originals", title: "ORIGINALS", subtitle: "Projects and concepts — only on Sultanflix." },
    { id: "journey", title: "MY JOURNEY", subtitle: "Experience across hospital departments." },
  ],

  /* ------------------------------------------------------------------ */
  /* THE FULL STORY — about cards (each opens the detail modal)           */
  /* ------------------------------------------------------------------ */
  fullStory: [
    {
      title: "The Foundation",
      tagline: "Seven years inside hospital walls.",
      description:
        "Approximately seven years of hospital experience: anesthesia technology, operation theatre support, hospital administration, patient reception, billing, discharge documentation, hospital software workflows, and surgical coordination — with exposure to ICU, emergency, pharmacy, and laboratory operations.",
      meta: ["Chapter 1", "Hands-on"],
    },
    {
      title: "The Crossover",
      tagline: "From wards to the web.",
      description:
        "Alongside clinical work, I developed practical interests in healthcare digital marketing, medical poster design, social media management, clinic branding, and local SEO planning — plus patient engagement workflows, Google Sheets planning, HTML-based tool exploration, Firebase projects, and healthcare workflow automation.",
      meta: ["Chapter 2", "Digital"],
    },
    {
      title: "The Mission",
      tagline: "Smarter operations, better care.",
      description:
        "My long-term goal is to combine healthcare knowledge, operational understanding, and digital innovation to contribute to more efficient healthcare services. I am currently developing my technical skills and exploring how software and digital tools can address practical challenges in healthcare.",
      meta: ["Chapter 3", "Now"],
    },
  ],

  /* ------------------------------------------------------------------ */
  /* EXPERIENCE OVERVIEW — exposure areas (no invented employers/dates).  */
  /* "employers" holds clearly-marked slots for real details to be added.  */
  /* ------------------------------------------------------------------ */
  experienceAreas: [
    { area: "Clinical & OT Support", detail: "Anesthesia technology, operation theatre workflows and assistance, C-arm use in the OT, surgical workflow coordination." },
    { area: "Patient Administration", detail: "Patient reception and registration, appointment and follow-up processes, discharge documentation." },
    { area: "Billing & Documentation", detail: "Hospital billing, surgery package coordination, HMS and CMR software workflows." },
    { area: "Departmental Exposure", detail: "Familiarity with ICU, emergency, pharmacy, and laboratory workflows; clinical department coordination." },
    { area: "Operational Analysis", detail: "Hospital operational workflow analysis, staff and departmental coordination, cost-conscious operational planning." },
    { area: "Digital & Creative Projects", detail: "Healthcare digital marketing, medical promotional design, social media management, clinic branding, local SEO planning." },
  ],
  employers: [
    {
      role: "TODO: Official job title",
      org: "TODO: Employer / hospital name",
      years: "TODO: Employment dates",
      detail: "TODO: Key responsibilities and highlights.",
    },
    {
      role: "TODO: Official job title",
      org: "TODO: Employer / hospital name",
      years: "TODO: Employment dates",
      detail: "TODO: Key responsibilities and highlights.",
    },
  ],

  /* ------------------------------------------------------------------ */
  /* MY SKILL UNIVERSE — level is one of: hands-on / familiar /          */
  /* exploring / learning (see skillLevels legend below). Tags were      */
  /* inferred from the wording of the brief (e.g. "familiarity" →        */
  /* familiar, "exploration"/"concepts" → exploring, "currently          */
  /* learning" → learning); everything else hands-on.                    */
  /* ------------------------------------------------------------------ */
  skillLevels: [
    { id: "hands-on", label: "Hands-on", meaning: "Used regularly in real hospital or project work." },
    { id: "familiar", label: "Familiar", meaning: "Working familiarity from exposure, not daily practice." },
    { id: "exploring", label: "Exploring", meaning: "Concepts and prototypes I am actively exploring." },
    { id: "learning", label: "Learning", meaning: "Currently learning — early stage." },
  ],
  skills: {
    clinical: [
      { name: "Anesthesia technology and support", level: "hands-on" },
      { name: "Operation theatre workflows and assistance", level: "hands-on" },
      { name: "C-arm use in the OT", level: "hands-on" },
      { name: "Surgical workflow coordination", level: "hands-on" },
      { name: "ICU and emergency workflow familiarity", level: "familiar" },
      { name: "Clinical department coordination", level: "hands-on" },
    ],
    administration: [
      { name: "Patient reception and registration", level: "hands-on" },
      { name: "Hospital billing", level: "hands-on" },
      { name: "Discharge documentation", level: "hands-on" },
      { name: "HMS and CMR software workflows", level: "hands-on" },
      { name: "Surgery package coordination", level: "hands-on" },
      { name: "Staff and departmental coordination", level: "hands-on" },
      { name: "Appointment and patient follow-up processes", level: "hands-on" },
      { name: "Hospital operational workflow analysis", level: "hands-on" },
    ],
    marketing: [
      { name: "Healthcare social media content", level: "hands-on" },
      { name: "Medical poster design", level: "hands-on" },
      { name: "Doctor and clinic branding", level: "hands-on" },
      { name: "Healthcare promotional campaigns", level: "hands-on" },
      { name: "Google Business Profile optimization planning", level: "exploring" },
      { name: "Local SEO research", level: "exploring" },
      { name: "Patient engagement workflows", level: "exploring" },
      { name: "Online review and reputation management planning", level: "exploring" },
    ],
    technology: [
      { name: "Google Sheets workflow planning", level: "hands-on" },
      { name: "Patient registration system concepts", level: "exploring" },
      { name: "HTML-based billing tool exploration", level: "exploring" },
      { name: "Firebase project exploration", level: "exploring" },
      { name: "Patient record search and update workflows", level: "exploring" },
      { name: "OCR-to-Excel workflow exploration", level: "exploring" },
      { name: "Healthcare workflow automation concepts", level: "exploring" },
      { name: "Coding and software development", level: "learning" },
    ],
    creative: [
      { name: "Medical promotional design", level: "hands-on" },
      { name: "Social media creative development", level: "hands-on" },
      { name: "Healthcare content creation", level: "hands-on" },
      { name: "AI-assisted content workflows", level: "hands-on" },
      { name: "CapCut and Adobe Premiere Pro workflow familiarity", level: "familiar" },
    ],
    business: [
      { name: "Hospital workflow improvement", level: "hands-on" },
      { name: "Surgical service coordination", level: "hands-on" },
      { name: "Patient journey improvement", level: "hands-on" },
      { name: "Cost-conscious operational planning", level: "familiar" },
      { name: "Digital patient acquisition strategies", level: "exploring" },
      { name: "Healthcare business development", level: "exploring" },
      { name: "Hospital management and setup planning", level: "exploring" },
    ],
  },
  skillCategoryLabels: {
    clinical: "Healthcare & Clinical Support",
    administration: "Hospital Administration",
    marketing: "Digital Marketing & Branding",
    technology: "Technology & Digital Workflows",
    creative: "Creative Skills",
    business: "Business & Management",
  },
  skillCategoryIcons: {
    clinical: "✚",
    administration: "▤",
    marketing: "✦",
    technology: "◈",
    creative: "◐",
    business: "▲",
  },

  /* ------------------------------------------------------------------ */
  /* SERVICES — capability-worded; not presented as certified offerings.  */
  /* ------------------------------------------------------------------ */
  services: [
    {
      title: "Healthcare Digital Marketing",
      icon: "◉",
      tagline: "Campaigns built for clinics, not generic brands.",
      description:
        "Planning and running digital marketing for healthcare settings — content calendars, patient-education posts, and promotional workflows shaped by real hospital experience.",
    },
    {
      title: "Medical Social Media Content & Poster Design",
      icon: "▦",
      tagline: "Treatment-awareness creatives that look clinical, not stock.",
      description:
        "Medical posters and social media creatives for doctors and clinics — treatment awareness, health days, and service announcements designed with clinical accuracy in mind.",
    },
    {
      title: "Doctor & Clinic Branding",
      icon: "◆",
      tagline: "A consistent, trustworthy face for your practice.",
      description:
        "Practical branding support for doctors and clinics: consistent visuals, clear messaging, and a professional online presence that patients can trust.",
    },
    {
      title: "Google Business Profile & Local SEO Support",
      icon: "◎",
      tagline: "Help patients in your city find you first.",
      description:
        "Setup and optimization planning for Google Business Profiles, plus local search research so patients nearby can discover and choose your practice.",
    },
    {
      title: "Hospital Workflow Analysis & Improvement",
      icon: "▲",
      tagline: "Find the friction in everyday operations.",
      description:
        "Drawing on years across hospital departments to map everyday workflows — reception, billing, discharge, coordination — and suggest practical, cost-conscious improvements.",
    },
    {
      title: "Patient Follow-up Workflow Planning",
      icon: "◐",
      tagline: "Follow-ups that don't fall through the cracks.",
      description:
        "Structured follow-up workflows — dates, staff assignments, appointment reminders, confirmations, and review requests — designed around how hospital staff actually work.",
    },
    {
      title: "Healthcare Administrative Tool Prototyping",
      icon: "◈",
      tagline: "Early prototypes for admin busywork.",
      description:
        "Early-stage prototypes for registration, billing, and record-search workflows using spreadsheets, HTML-based tools, and Firebase exploration. Offered as concepts in development — not production software.",
    },
  ],

  /* ------------------------------------------------------------------ */
  /* ORIGINALS — projects. Statuses are honest labels from the brief:    */
  /* Concept / In Progress / Professional Experience. Descriptions are   */
  /* editable working notes, not proof of finished products.             */
  /* ------------------------------------------------------------------ */
  projectFilters: ["All", "Concept", "In Progress", "Professional Experience"],
  projectStatusNote:
    "Project descriptions are editable working notes — not proof of finished products. Statuses reflect the brief provided; no results, testimonials, or statistics are claimed.",
  projects: [
    {
      title: "Patient Registration & Reception Dashboard",
      tagline: "A calmer front desk, on one screen.",
      overview:
        "Concept for a dashboard covering patient registration, visit type, patient information, referral source, specialty, diagnosis, status tracking, record search and updates, and printable records.",
      problem:
        "Explore how a single, simple dashboard could organize registration data, track visit status, and make patient records searchable, updatable, and printable — reducing front-desk friction.",
      role: "Concept & workflow design (exploration)",
      tools: ["Google Sheets", "Firebase", "Web interfaces"],
      status: "Concept",
    },
    {
      title: "WhatsApp Patient Follow-up Workflow",
      tagline: "Follow-ups, reminders, and reviews — structured.",
      overview:
        "A workflow concept for patient follow-ups: follow-up dates, staff assignments, appointment reminders, confirmation tracking, and patient review requests.",
      problem:
        "Design a practical follow-up workflow that keeps patients engaged after their visit and gives staff a clear, repeatable process for reminders and confirmations.",
      role: "Workflow concept design",
      tools: ["WhatsApp", "Google Sheets", "Workflow planning"],
      status: "Concept",
    },
    {
      title: "Pharmacy & Laboratory Billing Tools",
      tagline: "Simpler billing for pharmacy and lab counters.",
      overview:
        "Concepts for MRP calculations, laboratory billing, and simplified billing interfaces built with spreadsheets and HTML-based tools.",
      problem:
        "Explore lightweight billing calculations and interfaces that pharmacy and laboratory staff can use without heavy software — fast, simple, and easy to correct.",
      role: "Tool concept exploration",
      tools: ["Google Sheets", "HTML-based tools"],
      status: "Concept",
    },
    {
      title: "AR Plastic Surgery Digital Marketing",
      tagline: "Digital presence for a surgical practice in Karimnagar.",
      overview:
        "Medical promotional content, doctor branding, social media campaigns, treatment awareness posters, and local SEO planning for a plastic surgery practice in Karimnagar.",
      problem:
        "Build digital visibility and patient awareness for a plastic surgery practice through consistent branded content, treatment education, and local search planning.",
      role: "Digital marketing & content creator",
      tools: ["Social media campaigns", "Poster design", "Local SEO planning", "Clinic branding"],
      status: "In Progress",
    },
    {
      title: "Hospital Operations & Surgical Coordination",
      tagline: "Seven years of how hospitals actually run.",
      overview:
        "Professional experience and process knowledge covering hospital workflows, patient administration, surgical package coordination, and departmental communication.",
      problem:
        "Apply hands-on hospital process knowledge to keep patient administration smooth, surgical packages coordinated, and departments communicating clearly.",
      role: "Hands-on professional experience",
      tools: ["HMS / CMR software", "Surgical coordination", "Departmental workflows"],
      status: "Professional Experience",
    },
  ],

  /* ------------------------------------------------------------------ */
  /* MY APPROACH — four principles + the exact description from the brief */
  /* ------------------------------------------------------------------ */
  approach: {
    description:
      "I believe useful innovation starts with understanding real problems. My goal is to combine practical healthcare experience with digital tools and organized workflows to make everyday healthcare operations more efficient.",
    principles: [
      { title: "Practical Problem-Solving", icon: "◈", detail: "Start from real ward-level problems, not technology for its own sake." },
      { title: "Continuous Learning", icon: "◎", detail: "Currently developing coding skills and exploring new digital tools." },
      { title: "Healthcare-Focused Thinking", icon: "✚", detail: "Every idea is judged by whether it helps patients and staff." },
      { title: "Operational Efficiency", icon: "▲", detail: "Small, cost-conscious improvements that compound over time." },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Contact — finale screen ("TO BE CONTINUED…")                         */
  /* The form is a FRONTEND DEMONSTRATION: submitting shows a clear       */
  /* notice and never claims delivery. Contact details are TODO           */
  /* placeholders — no real info invented.                                */
  /* ------------------------------------------------------------------ */
  contact: {
    heading: "TO BE CONTINUED…",
    subheading: "Have a healthcare project or an idea worth exploring? Let's connect.",
    enquiryTypes: [
      "Healthcare Digital Marketing",
      "Medical Content & Poster Design",
      "Doctor & Clinic Branding",
      "Google Business Profile & Local SEO",
      "Hospital Workflow Analysis",
      "Patient Follow-up Workflows",
      "Administrative Tool Prototyping",
      "Something else",
    ],
    formDemoNotice:
      "This is a frontend demonstration — no enquiry has been delivered. To receive messages, connect a form backend (e.g. Formspree or Netlify Forms) and update the form handler in app.js.",
    placeholders: [
      { label: "Email", value: "TODO: your professional email address" },
      { label: "Phone", value: "TODO: your phone number" },
      { label: "LinkedIn", value: "TODO: your LinkedIn profile URL" },
      { label: "Instagram", value: "TODO: your Instagram profile URL" },
    ],
  },
};
