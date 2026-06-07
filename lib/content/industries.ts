export type IndustryOverview = {
  slug: string;
  emoji: string;
  name: string;
  href: string;
  description: string;
};

export type IndustryPainPoint = {
  title: string;
  description: string;
};

export type IndustrySolution = {
  title: string;
  description: string;
};

export type IndustryPageContent = IndustryOverview & {
  label: string;
  title: string;
  subtitle: string;
  painPoints: IndustryPainPoint[];
  solutions: IndustrySolution[];
  ctaTitle: string;
  ctaText: string;
  metadataTitle: string;
  metadataDescription: string;
};

export const industries: IndustryPageContent[] = [
  {
    slug: "healthcare-clinics",
    emoji: "🏥",
    name: "Healthcare & Clinics",
    label: "Healthcare & Clinics",
    href: "/industries/healthcare-clinics",
    description: "Automate bookings, reminders, and patient communication.",
    title: "Never Miss a Patient Booking Again.",
    subtitle:
      "AI systems that answer calls, book appointments, send reminders, and handle patient enquiries automatically — so your front desk can focus on care.",
    painPoints: [
      {
        title: "Unanswered Calls",
        description: "Patients call during busy hours and hang up before anyone answers.",
      },
      {
        title: "Missed After-Hours Enquiries",
        description: "Messages arrive after closing and get no reply until the next day.",
      },
      {
        title: "High No-Show Rates",
        description: "Patients forget appointments without timely reminders and confirmations.",
      },
      {
        title: "Repetitive Questions",
        description: "Staff answer the same questions on hours, pricing and availability daily.",
      },
      {
        title: "Manual Scheduling",
        description: "The team loses hours booking, rescheduling and confirming appointments.",
      },
      {
        title: "Slow Patient Intake",
        description: "Manual intake forms slow down every new patient.",
      },
    ],
    solutions: [
      {
        title: "AI Receptionist",
        description: "Answers inbound calls instantly and handles patient enquiries 24/7.",
      },
      {
        title: "Appointment Booking Agent",
        description: "Books, reschedules and confirms appointments automatically.",
      },
      {
        title: "Patient FAQ Assistant",
        description: "Answers questions on services, pricing, availability and policies.",
      },
      {
        title: "Appointment Reminder System",
        description: "Sends automated WhatsApp reminders to reduce no-shows.",
      },
      {
        title: "Patient Reactivation",
        description: "Re-engages dormant patients to recover lost recurring revenue.",
      },
      {
        title: "Patient Intake Automation",
        description: "Collects patient information before the appointment automatically.",
      },
    ],
    ctaTitle: "Ready To Automate Patient Communication?",
    ctaText:
      "Book a consultation and we will identify where AI can support your clinic without adding admin burden.",
    metadataTitle: "Healthcare & Clinic AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds healthcare AI receptionists, booking agents, reminders, patient intake systems, and WhatsApp support workflows.",
  },
  {
    slug: "real-estate",
    emoji: "🏠",
    name: "Real Estate",
    label: "Real Estate",
    href: "/industries/real-estate",
    description: "Qualify leads and book viewings without manual follow-up.",
    title: "Answer Every Lead in Seconds, Not Hours.",
    subtitle:
      "AI systems that respond instantly, qualify buyers, and book viewings — so no lead goes cold while you're out showing a property.",
    painPoints: [
      {
        title: "Slow Lead Response",
        description: "Leads go cold while agents are out at viewings.",
      },
      {
        title: "Lost After-Hours Enquiries",
        description: "Buyers message at night and book with whoever replies first.",
      },
      {
        title: "Unqualified Leads",
        description: "Agents waste hours on tyre-kickers instead of serious buyers.",
      },
      {
        title: "Dropped Follow-Ups",
        description: "Warm leads buy elsewhere because no one followed up.",
      },
      {
        title: "Scheduling Back-and-Forth",
        description: "Booking viewings takes endless messages and calls.",
      },
      {
        title: "Manual Admin",
        description: "Listing descriptions, contracts and CRM entry eat selling time.",
      },
    ],
    solutions: [
      {
        title: "Instant Lead-Response Agent",
        description: "Replies to every lead in seconds, day or night.",
      },
      {
        title: "Lead Qualification",
        description: "Captures budget, timeline and intent before handoff.",
      },
      {
        title: "Viewing Scheduler",
        description: "Books property viewings directly into the agent's calendar.",
      },
      {
        title: "Nurture Sequences",
        description: "Keeps warm leads engaged until they are ready to transact.",
      },
      {
        title: "Listing Copy Generator",
        description: "Drafts polished listing descriptions in seconds.",
      },
      {
        title: "Auto-CRM Logging",
        description: "Logs every lead and conversation with full context.",
      },
    ],
    ctaTitle: "Ready To Book More Qualified Viewings?",
    ctaText:
      "Book a consultation and we will map how AI can capture, qualify, and route your property leads.",
    metadataTitle: "Real Estate AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds real estate AI agents for property enquiries, lead qualification, viewing bookings, WhatsApp follow-up, and CRM automation.",
  },
  {
    slug: "hospitality-restaurants",
    emoji: "🍽️",
    name: "Hospitality, Travel & Restaurants",
    label: "Hospitality, Travel & Restaurants",
    href: "/industries/hospitality-restaurants",
    description: "Handle reservations, travel enquiries, and guest follow-up automatically.",
    title: "Capture Every Booking, Around the Clock.",
    subtitle:
      "AI systems that answer enquiries, take reservations, and confirm bookings 24/7 in any language — so you never lose a guest to a slow reply.",
    painPoints: [
      {
        title: "After-Hours Bookings Lost",
        description: "Enquiries arrive 24/7 and go unanswered until morning.",
      },
      {
        title: "Time-Zone Gaps",
        description: "International guests book with whoever replies first.",
      },
      {
        title: "Jammed Phone Lines",
        description: "Peak-time calls go unanswered and reservations are missed.",
      },
      {
        title: "Repetitive Enquiries",
        description: "Staff repeat the same answers on menus, availability and directions.",
      },
      {
        title: "No-Shows",
        description: "Unconfirmed bookings leave tables and rooms empty.",
      },
      {
        title: "Unmanaged Reviews",
        description: "Reviews and repeat-visit follow-ups slip through the cracks.",
      },
    ],
    solutions: [
      {
        title: "24/7 Reservation Agent",
        description: "Handles bookings round the clock across chat and voice.",
      },
      {
        title: "Multilingual Enquiries",
        description: "Replies instantly in the guest's own language.",
      },
      {
        title: "Quote & Itinerary Drafting",
        description: "Builds tour quotes and itineraries automatically.",
      },
      {
        title: "Booking Confirmations",
        description: "Sends automated confirmations and reminders to cut no-shows.",
      },
      {
        title: "Review Automation",
        description: "Requests reviews and manages responses automatically.",
      },
      {
        title: "Repeat-Visit Campaigns",
        description: "Re-engages past guests to drive repeat bookings.",
      },
    ],
    ctaTitle: "Ready To Capture Every Booking?",
    ctaText:
      "Book a consultation and we will map the fastest AI booking workflows for your venue or travel business.",
    metadataTitle: "Hospitality, Travel & Restaurant AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds hospitality, travel, and restaurant AI systems for reservations, enquiries, confirmations, reminders, reviews, and guest follow-up.",
  },
  {
    slug: "ecommerce-retail",
    emoji: "🛍️",
    name: "Ecommerce & Retail",
    label: "Ecommerce & Retail",
    href: "/industries/ecommerce-retail",
    description: "Turn product enquiries into sales around the clock.",
    title: "Support That Scales Without Hiring.",
    subtitle:
      "AI systems that answer customers, track orders, and recover carts across every channel — so support never slows you down as you grow.",
    painPoints: [
      {
        title: "Overwhelmed Support",
        description: "Tickets scale with sales and replies get slow.",
      },
      {
        title: '"Where Is My Order?"',
        description: "Order-status questions flood the inbox daily.",
      },
      {
        title: "Abandoned Carts",
        description: "Shoppers leave without buying and never return.",
      },
      {
        title: "Manual Returns",
        description: "Returns and exchanges are slow and staff-heavy.",
      },
      {
        title: "Lost Shoppers",
        description: "Customers can't find the right product and bounce.",
      },
      {
        title: "No Follow-Up",
        description: "Repeat purchases and win-backs never happen.",
      },
    ],
    solutions: [
      {
        title: "24/7 Support Agent",
        description: "Answers customer questions across WhatsApp, Instagram and web.",
      },
      {
        title: "Order-Status Agent",
        description: 'Resolves "where is my order?" with live tracking.',
      },
      {
        title: "Cart Recovery",
        description: "Automatically follows up on abandoned carts.",
      },
      {
        title: "Returns Automation",
        description: "Guides and logs returns without staff effort.",
      },
      {
        title: "Product Recommendations",
        description: "Suggests the right product by budget and need.",
      },
      {
        title: "Post-Purchase Campaigns",
        description: "Drives repeat orders and customer win-backs.",
      },
    ],
    ctaTitle: "Ready To Turn More Enquiries Into Sales?",
    ctaText:
      "Book a consultation and we will map the highest-impact ecommerce automations for your store.",
    metadataTitle: "Ecommerce & Retail AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds ecommerce and retail AI agents for product enquiries, WhatsApp sales, order tracking, follow-ups, and CRM automation.",
  },
  {
    slug: "education",
    emoji: "🎓",
    name: "Education",
    label: "Education",
    href: "/industries/education",
    description: "Manage admissions enquiries and student support at scale.",
    title: "Turn Every Enquiry Into an Enrolment.",
    subtitle:
      "AI systems that answer prospects instantly, capture applications, and book trials — so no student slips away while your team is busy.",
    painPoints: [
      {
        title: "Enrollment Overload",
        description: "Enquiry spikes overwhelm staff and sign-ups are lost.",
      },
      {
        title: "Repetitive Questions",
        description: "Teams repeat answers on fees, schedules and admissions.",
      },
      {
        title: "Dropped Applications",
        description: "Prospects never complete the application process.",
      },
      {
        title: "Manual Scheduling",
        description: "Booking demos, trials and counselling takes too long.",
      },
      {
        title: "After-Hours Gaps",
        description: "Students get no answers outside office hours.",
      },
      {
        title: "Slow Follow-Up",
        description: "Interested prospects go cold before anyone responds.",
      },
    ],
    solutions: [
      {
        title: "Enrollment Agent",
        description: "Captures and qualifies every applicant 24/7.",
      },
      {
        title: "Admissions FAQ Assistant",
        description: "Answers fees, schedule and syllabus questions instantly.",
      },
      {
        title: "Application Follow-Up",
        description: "Nudges prospects to complete their applications.",
      },
      {
        title: "Demo & Class Scheduler",
        description: "Lets students self-book trials and counselling.",
      },
      {
        title: "24/7 Student Support",
        description: "Handles routine queries with human escalation.",
      },
      {
        title: "Nurture Sequences",
        description: "Keeps prospects warm until they enroll.",
      },
    ],
    ctaTitle: "Ready To Scale Student Enquiries?",
    ctaText:
      "Book a consultation and we will map AI workflows for admissions, support, and onboarding.",
    metadataTitle: "Education AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds education AI agents for admissions, student support, application intake, course recommendations, scheduling, and onboarding.",
  },
  {
    slug: "recruitment-hr",
    emoji: "👥",
    name: "Recruitment & HR",
    label: "Recruitment & HR",
    href: "/industries/recruitment-hr",
    description: "Screen candidates and schedule interviews automatically.",
    title: "Spend Your Time Placing, Not Screening.",
    subtitle:
      "AI systems that screen CVs, schedule interviews, and keep candidates updated — so your recruiters focus on closing placements.",
    painPoints: [
      {
        title: "CV Overload",
        description: "Recruiters drown in screening instead of placing candidates.",
      },
      {
        title: "Ghosted Candidates",
        description: "Status updates slip and good candidates go cold.",
      },
      {
        title: "Scheduling Chaos",
        description: "Interview scheduling is endless back-and-forth.",
      },
      {
        title: "Messy Intake",
        description: "Client job specs arrive incomplete and unclear.",
      },
      {
        title: "Manual Notes",
        description: "Interview notes and summaries are done by hand.",
      },
      {
        title: "Slow Pipelines",
        description: "Repetitive admin slows every placement down.",
      },
    ],
    solutions: [
      {
        title: "CV Screening Agent",
        description: "Screens and ranks candidates against the job spec.",
      },
      {
        title: "Candidate Updates",
        description: "Keeps candidates informed automatically.",
      },
      {
        title: "Interview Scheduler",
        description: "Self-scheduling synced to every calendar.",
      },
      {
        title: "Job-Spec Intake",
        description: "Captures structured role requirements from clients.",
      },
      {
        title: "Interview Summaries",
        description: "Generates clean interview notes automatically.",
      },
      {
        title: "ATS Sync",
        description: "Logs everything into your existing ATS.",
      },
    ],
    ctaTitle: "Ready To Shortlist Faster?",
    ctaText:
      "Book a consultation and we will map AI workflows for screening, scheduling, and onboarding.",
    metadataTitle: "Recruitment & HR AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds recruitment and HR AI systems for candidate screening, interview scheduling, candidate support, employee FAQs, and onboarding.",
  },
  {
    slug: "legal-professional-services",
    emoji: "⚖️",
    name: "Legal Services",
    label: "Legal Services",
    href: "/industries/legal-professional-services",
    description: "Streamline client intake, scheduling, and routine legal admin.",
    title: "Give Your Lawyers Their Hours Back.",
    subtitle:
      "AI systems that handle intake, answer enquiries, and draft routine documents under your supervision — so fee-earners focus on real work.",
    painPoints: [
      {
        title: "Time-Heavy Intake",
        description: "Client intake and screening eats fee-earner hours.",
      },
      {
        title: "Slow Enquiry Response",
        description: "Prospective clients leave for faster firms.",
      },
      {
        title: "Manual Drafting",
        description: "Document drafting and review consume billable time.",
      },
      {
        title: "Status Chasing",
        description: "Clients constantly ask for case updates.",
      },
      {
        title: "Repetitive FAQs",
        description: "Staff repeat answers on process, fees and timelines.",
      },
      {
        title: "Admin Overload",
        description: "Routine paperwork pulls lawyers off real work.",
      },
    ],
    solutions: [
      {
        title: "Client Intake Agent",
        description: "Captures matter details, qualifies and books consultations.",
      },
      {
        title: "24/7 Enquiry Response",
        description: "Answers prospective clients instantly.",
      },
      {
        title: "Document Assist",
        description: "Drafts and reviews documents with human supervision.",
      },
      {
        title: "Matter-Status Updates",
        description: "Keeps clients informed automatically.",
      },
      {
        title: "Legal FAQ Assistant",
        description: "Answers process, fees and document questions.",
      },
      {
        title: "Human-Supervised Workflows",
        description: "Every output stays under your team's review.",
      },
    ],
    ctaTitle: "Ready To Streamline Client Intake?",
    ctaText:
      "Book a consultation and we will map AI workflows that protect your team's billable time.",
    metadataTitle: "Legal Services AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds legal services AI systems for client intake, consultation booking, FAQ handling, document assistance, and supervised workflows.",
  },
  {
    slug: "financial-services-insurance",
    emoji: "💰",
    name: "Financial Services & Insurance",
    label: "Financial Services & Insurance",
    href: "/industries/financial-services-insurance",
    description: "Automate quotes, renewals, claims intake, and client communication.",
    title: "Never Let a Renewal Slip Again.",
    subtitle:
      "AI systems that chase renewals, intake quotes and claims, and collect documents — all under your team's supervision.",
    painPoints: [
      {
        title: "Missed Renewals",
        description: "Renewals slip and clients churn silently.",
      },
      {
        title: "Slow Quotes",
        description: "Quote requests are handled manually and slowly.",
      },
      {
        title: "Stressful Claims Intake",
        description: "Clients struggle through a manual claims process.",
      },
      {
        title: "Document Delays",
        description: "Collecting KYC and forms drags on for weeks.",
      },
      {
        title: "Repetitive Questions",
        description: "Staff repeat the same policy and product answers.",
      },
      {
        title: "Lost Follow-Ups",
        description: "Leads and renewals go unactioned.",
      },
    ],
    solutions: [
      {
        title: "Renewal Automation",
        description: "Sends reminders and outreach before renewals lapse.",
      },
      {
        title: "Quote-Intake Agent",
        description: "Gathers details and routes quotes instantly.",
      },
      {
        title: "Guided Claims Intake",
        description: "Collects claim information and documents step by step.",
      },
      {
        title: "Document Collection",
        description: "Chases and collects KYC and forms automatically.",
      },
      {
        title: "Policy FAQ Assistant",
        description: "Answers product and policy questions with escalation.",
      },
      {
        title: "Human-Supervised Workflows",
        description: "Sensitive steps always stay under review.",
      },
    ],
    ctaTitle: "Ready To Accelerate Client Response?",
    ctaText:
      "Book a consultation and we will identify where AI can reduce admin and improve conversion.",
    metadataTitle: "Financial Services & Insurance AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds financial services and insurance AI systems for renewals, quote intake, claims intake, document collection, FAQs, and supervised workflows.",
  },
  {
    slug: "professional-services-agencies",
    emoji: "💼",
    name: "Professional Services & Agencies",
    label: "Professional Services & Agencies",
    href: "/industries/professional-services-agencies",
    description: "Qualify leads, onboard clients, and automate operations.",
    title: "Do the Work, Not the Admin.",
    subtitle:
      "AI systems that onboard clients, generate reports and proposals, and answer your team from your own docs — so billable time goes to clients.",
    painPoints: [
      {
        title: "Manual Onboarding",
        description: "Client onboarding is repetitive and slow.",
      },
      {
        title: "Reporting Drain",
        description: "Reporting eats hours of billable time.",
      },
      {
        title: "Slow Proposals",
        description: "Proposals and scoping take too long to produce.",
      },
      {
        title: "Dropped Enquiries",
        description: "Leads slip and follow-up is inconsistent.",
      },
      {
        title: "Scattered Knowledge",
        description: "The team keeps re-asking the same internal questions.",
      },
      {
        title: "Admin Overhead",
        description: "Routine tasks pull the team off client work.",
      },
    ],
    solutions: [
      {
        title: "Onboarding Automation",
        description: "Runs intake, briefs and access collection automatically.",
      },
      {
        title: "Automated Reporting",
        description: "Pulls data and generates client-ready reports.",
      },
      {
        title: "Proposal Generator",
        description: "Drafts proposals and scopes from templates.",
      },
      {
        title: "Enquiry-Response Agent",
        description: "Replies to and qualifies new leads instantly.",
      },
      {
        title: "Internal Copilot",
        description: "Answers team questions from your docs and SOPs.",
      },
      {
        title: "Workflow Automation",
        description: "Connects your tools and removes manual steps.",
      },
    ],
    ctaTitle: "Ready To Scale Delivery Without More Admin?",
    ctaText:
      "Book a consultation and we will map AI workflows for leads, onboarding, and operations.",
    metadataTitle: "Professional Services & Agencies AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds agency and professional services AI systems for onboarding, reporting, proposals, lead response, internal copilots, and workflow automation.",
  },
];

export const industriesOverview: IndustryOverview[] = industries.map(
  ({ slug, emoji, name, href, description }) => ({
    slug,
    emoji,
    name,
    href,
    description,
  }),
);

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
