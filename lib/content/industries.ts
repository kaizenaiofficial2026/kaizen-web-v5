export type IndustryOverview = {
  slug: string;
  emoji: string;
  name: string;
  href: string;
  description: string;
};

export type IndustryPainPoint = {
  emoji: string;
  title: string;
  description: string;
};

export type IndustrySolution = {
  title: string;
  description: string;
};

export type IndustryWorkflow = {
  customer: string;
  system: string;
  outcome: string;
};

export type IndustryPageContent = IndustryOverview & {
  label: string;
  title: string;
  subtitle: string;
  painPoints: IndustryPainPoint[];
  solutions: IndustrySolution[];
  workflow: IndustryWorkflow;
  ctaTitle: string;
  ctaText: string;
  metadataTitle: string;
  metadataDescription: string;
};

export const industries: IndustryPageContent[] = [
  {
    slug: "ecommerce-retail",
    emoji: "🛍️",
    name: "Ecommerce & Retail",
    label: "Ecommerce & Retail",
    href: "/industries/ecommerce-retail",
    description: "Turn product enquiries into sales around the clock.",
    title: "Turn Every Product Enquiry Into a Sale.",
    subtitle:
      "AI agents that reply instantly to product questions, recover abandoned interest, and help customers buy across WhatsApp, Instagram, Facebook, and your website 24/7.",
    painPoints: [
      {
        emoji: "🌙",
        title: "After-Hours Silence",
        description: "Customers ask questions at night and buy from whoever replies first.",
      },
      {
        emoji: "💬",
        title: "Unanswered DMs",
        description: "Messages on WhatsApp and Instagram go unread and customers disappear.",
      },
      {
        emoji: "🛒",
        title: "Abandoned Purchases",
        description: "Interested buyers drop off when no one follows up at the right moment.",
      },
      {
        emoji: "🔁",
        title: "Repetitive Questions",
        description: "Your team answers the same questions about price, stock, size, and delivery every day.",
      },
      {
        emoji: "📦",
        title: "Manual Order Handling",
        description: "Staff manually process enquiries instead of focusing on closing orders.",
      },
      {
        emoji: "📉",
        title: "Missed Upsells",
        description: "Without smart recommendations, customers buy one item and leave.",
      },
    ],
    solutions: [
      {
        title: "AI Sales Agent",
        description: "Replies to product enquiries, qualifies buyers, and guides them to purchase.",
      },
      {
        title: "WhatsApp Shopping Assistant",
        description: "Handles full buying conversations inside WhatsApp.",
      },
      {
        title: "Product Recommendation Engine",
        description: "Suggests the right product based on customer needs and budget.",
      },
      {
        title: "Order Tracking Agent",
        description: "Answers order status questions automatically.",
      },
      {
        title: "Automated Follow-Ups",
        description: "Re-engages customers who showed interest but did not complete a purchase.",
      },
      {
        title: "Customer Service Agent",
        description: "Handles returns, complaints, and support questions 24/7.",
      },
      {
        title: "CRM Integration",
        description: "Logs every lead, order, and conversation into your CRM automatically.",
      },
      {
        title: "Loyalty Campaign Automation",
        description: "Sends targeted promotions to returning customers.",
      },
    ],
    workflow: {
      customer: "Sends a product enquiry on WhatsApp at 11pm",
      system: "AI replies instantly, answers questions, recommends the right product, captures order details",
      outcome: "Sale confirmed before your team starts their day",
    },
    ctaTitle: "Ready To Turn More Enquiries Into Sales?",
    ctaText: "Book a consultation and we will map the highest-impact ecommerce automations for your store.",
    metadataTitle: "Ecommerce & Retail AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds ecommerce and retail AI agents for product enquiries, WhatsApp sales, order tracking, follow-ups, and CRM automation.",
  },
  {
    slug: "healthcare-clinics",
    emoji: "🏥",
    name: "Healthcare & Clinics",
    label: "Healthcare & Clinics",
    href: "/industries/healthcare-clinics",
    description: "Automate bookings, reminders, and patient communication.",
    title: "Never Miss a Patient Booking Again.",
    subtitle:
      "AI systems that answer calls, book appointments, send reminders, and handle patient enquiries automatically so your front desk can focus on care.",
    painPoints: [
      {
        emoji: "📞",
        title: "Unanswered Calls",
        description: "Patients call during busy hours and hang up before anyone picks up.",
      },
      {
        emoji: "📅",
        title: "Manual Scheduling",
        description: "Your team spends hours booking, rescheduling, and confirming appointments.",
      },
      {
        emoji: "🔁",
        title: "Repetitive Questions",
        description: "Staff answer the same questions about services, hours, costs, and availability every day.",
      },
      {
        emoji: "❌",
        title: "High No-Show Rates",
        description: "Patients forget appointments without timely reminders and confirmations.",
      },
      {
        emoji: "🌙",
        title: "Out-of-Hours Enquiries",
        description: "Patients message after hours and receive no response until the next day.",
      },
      {
        emoji: "📋",
        title: "Patient Intake Workload",
        description: "Manual intake forms and data collection slow down every new patient.",
      },
    ],
    solutions: [
      {
        title: "AI Receptionist",
        description: "Answers inbound calls instantly and handles patient enquiries 24/7.",
      },
      {
        title: "Appointment Booking Agent",
        description: "Books, reschedules, and confirms appointments automatically.",
      },
      {
        title: "Patient FAQ Assistant",
        description: "Answers questions about services, pricing, availability, and policies.",
      },
      {
        title: "Appointment Reminder System",
        description: "Sends automated reminders via WhatsApp to reduce no-shows.",
      },
      {
        title: "Follow-Up Agent",
        description: "Checks in with patients after appointments and manages follow-up care.",
      },
      {
        title: "Voice Scheduling Assistant",
        description: "Handles booking over the phone in a natural conversation.",
      },
      {
        title: "Patient Intake Automation",
        description: "Collects patient information before the appointment automatically.",
      },
      {
        title: "WhatsApp Patient Support",
        description: "Handles patient questions and booking confirmations over WhatsApp.",
      },
    ],
    workflow: {
      customer: "Patient calls at 7pm to book a consultation",
      system: "AI answers instantly, checks availability, books the appointment, sends WhatsApp confirmation",
      outcome: "Appointment confirmed, reminder sent, no staff involvement required",
    },
    ctaTitle: "Ready To Automate Patient Communication?",
    ctaText: "Book a consultation and we will identify where AI can support your clinic without adding admin burden.",
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
    title: "Never Miss a Property Enquiry Again.",
    subtitle:
      "AI agents that qualify leads, book viewings, and follow up with buyers and tenants automatically so your agents spend time closing, not chasing.",
    painPoints: [
      {
        emoji: "⏱️",
        title: "Slow Enquiry Response",
        description: "Leads go cold when agents are in viewings or unavailable.",
      },
      {
        emoji: "📱",
        title: "Lost Social Leads",
        description: "Enquiries from Instagram and Facebook go unanswered and disappear.",
      },
      {
        emoji: "🔁",
        title: "Repetitive Property Questions",
        description: "Agents answer the same questions about price, size, location, and availability.",
      },
      {
        emoji: "📅",
        title: "Missed Viewing Bookings",
        description: "Manual scheduling causes delays and lost opportunities.",
      },
      {
        emoji: "🔍",
        title: "Poor Lead Qualification",
        description: "Time is wasted on unqualified leads instead of serious buyers.",
      },
      {
        emoji: "📂",
        title: "Scattered Lead Data",
        description: "Lead information is spread across WhatsApp, email, and spreadsheets.",
      },
    ],
    solutions: [
      {
        title: "Property Enquiry Agent",
        description: "Replies instantly to property questions across all channels.",
      },
      {
        title: "Viewing Booking Agent",
        description: "Books property viewings automatically into agent calendars.",
      },
      {
        title: "Lead Qualification Agent",
        description: "Filters serious buyers from casual enquirers before passing to agents.",
      },
      {
        title: "Follow-Up Automation",
        description: "Keeps leads warm with timely, personalised follow-up messages.",
      },
      {
        title: "Property Recommendation Engine",
        description: "Matches buyers to available properties based on their requirements.",
      },
      {
        title: "CRM Automation",
        description: "Logs all leads, conversations, and viewing details into your CRM.",
      },
      {
        title: "WhatsApp Sales Assistant",
        description: "Handles full property enquiry conversations inside WhatsApp.",
      },
      {
        title: "AI Receptionist",
        description: "Answers inbound calls and routes them to the right agent or books a callback.",
      },
    ],
    workflow: {
      customer: "Submits a property enquiry on Instagram at 9pm",
      system: "AI qualifies the lead, answers property questions, books a viewing for the next morning",
      outcome: "Qualified viewing booked before the agent starts their day",
    },
    ctaTitle: "Ready To Book More Qualified Viewings?",
    ctaText: "Book a consultation and we will map how AI can capture, qualify, and route your property leads.",
    metadataTitle: "Real Estate AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds real estate AI agents for property enquiries, lead qualification, viewing bookings, WhatsApp follow-up, and CRM automation.",
  },
  {
    slug: "hospitality-restaurants",
    emoji: "🍽️",
    name: "Hospitality & Restaurants",
    label: "Hospitality & Restaurants",
    href: "/industries/hospitality-restaurants",
    description: "Handle reservations, menus, and event enquiries automatically.",
    title: "Fill More Tables. Miss Zero Reservations.",
    subtitle:
      "AI systems that handle reservations, answer menu questions, manage event enquiries, and follow up with guests automatically, around the clock.",
    painPoints: [
      {
        emoji: "📞",
        title: "Missed Reservation Calls",
        description: "Busy phone lines during service mean lost bookings.",
      },
      {
        emoji: "🍽️",
        title: "Repetitive Menu Questions",
        description: "Staff waste time answering questions about menus, dietary options, and hours.",
      },
      {
        emoji: "🎉",
        title: "Event Booking Admin",
        description: "Managing event and private dining enquiries manually is slow and error-prone.",
      },
      {
        emoji: "❌",
        title: "Lost Reservations",
        description: "Walk-ins and online enquiries fall through without a proper system.",
      },
      {
        emoji: "🌙",
        title: "After-Hours Bookings",
        description: "Guests want to book late at night when no one is available.",
      },
      {
        emoji: "👥",
        title: "Peak Hour Overload",
        description: "Front-of-house and phone lines get overwhelmed during busy service periods.",
      },
    ],
    solutions: [
      {
        title: "Reservation Agent",
        description: "Accepts and confirms table bookings automatically via phone, WhatsApp, and web.",
      },
      {
        title: "AI Receptionist",
        description: "Answers inbound calls and handles guest enquiries 24/7.",
      },
      {
        title: "Event Booking Assistant",
        description: "Manages private dining and event enquiries from first contact to confirmation.",
      },
      {
        title: "Catering Enquiry Agent",
        description: "Handles catering requests and collects all relevant details automatically.",
      },
      {
        title: "WhatsApp Reservation System",
        description: "Accepts and confirms reservations directly inside WhatsApp.",
      },
      {
        title: "Customer Support Agent",
        description: "Answers guest questions about menus, allergens, hours, and policies.",
      },
      {
        title: "Automated Confirmations",
        description: "Sends booking confirmations and reminders to reduce no-shows.",
      },
      {
        title: "Follow-Up Automation",
        description: "Follows up with guests after their visit for feedback and repeat bookings.",
      },
    ],
    workflow: {
      customer: "Calls to book a table for 8 at 11pm on a Saturday",
      system: "AI answers, checks availability, confirms the booking, sends WhatsApp confirmation",
      outcome: "Table reserved, guest confirmed, zero staff involvement",
    },
    ctaTitle: "Ready To Capture Every Reservation?",
    ctaText: "Book a consultation and we will map the fastest AI booking workflows for your venue.",
    metadataTitle: "Hospitality & Restaurant AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds hospitality AI systems for reservations, event enquiries, menu questions, confirmations, reminders, and guest follow-up.",
  },
  {
    slug: "education",
    emoji: "🎓",
    name: "Education",
    label: "Education",
    href: "/industries/education",
    description: "Manage admissions enquiries and student support at scale.",
    title: "Enrol More Students. Answer Every Enquiry.",
    subtitle:
      "AI agents that handle admissions enquiries, support students, automate applications, and manage scheduling so your team can focus on teaching.",
    painPoints: [
      {
        emoji: "📬",
        title: "Admissions Overload",
        description: "Your team is overwhelmed with repetitive enquiries during enrolment seasons.",
      },
      {
        emoji: "🌙",
        title: "Out-of-Hours Questions",
        description: "Prospective students enquire late at night and do not get a response until days later.",
      },
      {
        emoji: "📋",
        title: "Manual Applications",
        description: "Application intake is handled manually, causing delays and errors.",
      },
      {
        emoji: "📅",
        title: "Scheduling Inefficiency",
        description: "Booking open days, consultations, and interviews is a manual, time-consuming process.",
      },
      {
        emoji: "🔁",
        title: "Repetitive Student Questions",
        description: "Staff answer the same questions about courses, fees, and requirements every day.",
      },
      {
        emoji: "👋",
        title: "Poor Onboarding",
        description: "New students do not get timely information and orientation support.",
      },
    ],
    solutions: [
      {
        title: "Admissions Agent",
        description: "Handles all admissions enquiries, qualifies prospects, and guides them through next steps.",
      },
      {
        title: "Student Support Agent",
        description: "Answers student questions about courses, schedules, fees, and campus life 24/7.",
      },
      {
        title: "Application Intake Assistant",
        description: "Collects application details automatically and routes them to the right team.",
      },
      {
        title: "Course Recommendation Agent",
        description: "Matches prospective students to the right programme based on their goals.",
      },
      {
        title: "Appointment Booking Agent",
        description: "Books open days, consultations, and academic appointments automatically.",
      },
      {
        title: "Document Collection Automation",
        description: "Requests and tracks required documents from applicants automatically.",
      },
      {
        title: "Student Onboarding Agent",
        description: "Guides new students through orientation, forms, and first-week information.",
      },
      {
        title: "WhatsApp Student Assistant",
        description: "Handles student enquiries and support requests via WhatsApp.",
      },
    ],
    workflow: {
      customer: "Prospective student enquires about an MBA programme at midnight",
      system: "AI answers course questions, collects contact details, books a consultation for the next day",
      outcome: "Lead captured, consultation scheduled, enrolment team briefed",
    },
    ctaTitle: "Ready To Scale Student Enquiries?",
    ctaText: "Book a consultation and we will map AI workflows for admissions, support, and onboarding.",
    metadataTitle: "Education AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds education AI agents for admissions, student support, application intake, course recommendations, scheduling, and onboarding.",
  },
  {
    slug: "legal-professional-services",
    emoji: "⚖️",
    name: "Legal & Professional Services",
    label: "Legal & Professional Services",
    href: "/industries/legal-professional-services",
    description: "Streamline client intake, scheduling, and follow-ups.",
    title: "Win More Clients Before They Call Someone Else.",
    subtitle:
      "AI systems that handle client intake, book consultations, answer common questions, and follow up with leads so your team stays focused on billable work.",
    painPoints: [
      {
        emoji: "⏱️",
        title: "Slow Initial Response",
        description: "Potential clients contact multiple firms. The first to respond wins.",
      },
      {
        emoji: "📋",
        title: "Client Intake Bottlenecks",
        description: "Manual intake processes delay the start of every new client relationship.",
      },
      {
        emoji: "📅",
        title: "Consultation Scheduling Delays",
        description: "Booking consultations requires back-and-forth that slows everything down.",
      },
      {
        emoji: "🔁",
        title: "Non-Billable Enquiries",
        description: "Your team spends time answering general questions that do not generate revenue.",
      },
      {
        emoji: "📂",
        title: "Document Collection",
        description: "Chasing clients for documents manually wastes time and creates delays.",
      },
      {
        emoji: "🔍",
        title: "Poor Lead Qualification",
        description: "Time is wasted on enquiries that are not the right fit for the firm.",
      },
    ],
    solutions: [
      {
        title: "Client Intake Agent",
        description: "Collects all required client information before the first consultation.",
      },
      {
        title: "Consultation Booking Agent",
        description: "Books appointments automatically into attorney or advisor calendars.",
      },
      {
        title: "AI Receptionist",
        description: "Answers inbound calls and routes them to the right team member instantly.",
      },
      {
        title: "FAQ Assistant",
        description: "Handles common questions about services, fees, and process without staff involvement.",
      },
      {
        title: "Document Collection Automation",
        description: "Requests, tracks, and follows up on required documents automatically.",
      },
      {
        title: "Lead Qualification Agent",
        description: "Identifies serious prospects and filters out unqualified enquiries.",
      },
      {
        title: "Follow-Up Automation",
        description: "Keeps warm leads engaged until they are ready to proceed.",
      },
      {
        title: "CRM Integration",
        description: "Logs all client interactions and intake data into your CRM automatically.",
      },
    ],
    workflow: {
      customer: "Potential client submits an enquiry about a commercial dispute at 8pm",
      system: "AI responds immediately, qualifies the enquiry, collects intake details, books a consultation",
      outcome: "Qualified consultation booked, intake complete, no staff time used",
    },
    ctaTitle: "Ready To Streamline Client Intake?",
    ctaText: "Book a consultation and we will map AI workflows that protect your team's billable time.",
    metadataTitle: "Legal & Professional Services AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds legal and professional services AI systems for client intake, consultation booking, FAQ handling, document collection, and CRM updates.",
  },
  {
    slug: "financial-services-insurance",
    emoji: "💰",
    name: "Financial Services & Insurance",
    label: "Financial Services & Insurance",
    href: "/industries/financial-services-insurance",
    description: "Automate quotes, onboarding, and client communication.",
    title: "Respond Faster. Convert More Clients.",
    subtitle:
      "AI agents that handle enquiries, generate quotes, onboard clients, and follow up with leads so your advisors spend time advising, not administering.",
    painPoints: [
      {
        emoji: "📬",
        title: "High Enquiry Volume",
        description: "Your team is overwhelmed with incoming requests for quotes, information, and support.",
      },
      {
        emoji: "⏱️",
        title: "Slow Quote Responses",
        description: "Delays in responding to quote requests cause prospects to go elsewhere.",
      },
      {
        emoji: "🔁",
        title: "Policy and Product FAQs",
        description: "Staff spend hours answering the same questions about products, terms, and coverage.",
      },
      {
        emoji: "📋",
        title: "Client Onboarding Delays",
        description: "Manual onboarding processes slow down new client activation.",
      },
      {
        emoji: "📂",
        title: "Document Collection",
        description: "Chasing clients for required documents manually wastes advisor time.",
      },
      {
        emoji: "📉",
        title: "Poor Follow-Up Consistency",
        description: "Warm leads are lost because follow-ups happen too late or not at all.",
      },
    ],
    solutions: [
      {
        title: "Insurance Enquiry Agent",
        description: "Handles all inbound enquiries about products, coverage, and pricing instantly.",
      },
      {
        title: "Quote Generation Assistant",
        description: "Collects required details and initiates the quote process automatically.",
      },
      {
        title: "Client Onboarding Agent",
        description: "Guides new clients through onboarding steps and collects required information.",
      },
      {
        title: "Document Collection Automation",
        description: "Requests and tracks documents from clients without manual chasing.",
      },
      {
        title: "Appointment Booking Agent",
        description: "Books advisor consultations and review meetings automatically.",
      },
      {
        title: "Follow-Up Agent",
        description: "Re-engages warm leads who have not yet completed their application or purchase.",
      },
      {
        title: "AI Receptionist",
        description: "Answers inbound calls and routes them to the correct advisor or department.",
      },
      {
        title: "CRM Automation",
        description: "Logs all leads, interactions, and client data into your CRM in real time.",
      },
    ],
    workflow: {
      customer: "Business owner requests a commercial insurance quote on WhatsApp at 7pm",
      system: "AI collects business details, answers coverage questions, schedules an advisor call",
      outcome: "Qualified lead with full details passed to advisor for same-day follow-up",
    },
    ctaTitle: "Ready To Accelerate Client Response?",
    ctaText: "Book a consultation and we will identify where AI can reduce admin and improve conversion.",
    metadataTitle: "Financial Services & Insurance AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds financial services and insurance AI systems for enquiries, quote intake, onboarding, appointments, follow-up, and CRM automation.",
  },
  {
    slug: "recruitment-hr",
    emoji: "👥",
    name: "Recruitment & HR",
    label: "Recruitment & HR",
    href: "/industries/recruitment-hr",
    description: "Screen candidates and schedule interviews automatically.",
    title: "Screen Faster. Hire Smarter.",
    subtitle:
      "AI systems that handle candidate enquiries, screen applicants, schedule interviews, and support your HR team so recruiters focus on placing the right people.",
    painPoints: [
      {
        emoji: "📬",
        title: "Application Volume Overload",
        description: "Hundreds of applications arrive and manual screening takes weeks.",
      },
      {
        emoji: "⏱️",
        title: "Slow Candidate Response",
        description: "Candidates lose interest when communication is slow or inconsistent.",
      },
      {
        emoji: "📅",
        title: "Interview Scheduling Workload",
        description: "Coordinating interview times manually wastes recruiter and candidate time.",
      },
      {
        emoji: "🔁",
        title: "Repetitive Candidate Questions",
        description: "Recruiters answer the same questions about roles, process, and timelines.",
      },
      {
        emoji: "📋",
        title: "HR Administration Burden",
        description: "HR teams spend too much time on routine tasks instead of strategic work.",
      },
      {
        emoji: "👋",
        title: "Onboarding Inefficiency",
        description: "New employee onboarding is slow, manual, and inconsistent.",
      },
    ],
    solutions: [
      {
        title: "Candidate Screening Agent",
        description: "Asks qualifying questions, scores candidates, and shortlists the best fit automatically.",
      },
      {
        title: "Interview Scheduling Agent",
        description: "Books interviews directly into recruiter and candidate calendars without back-and-forth.",
      },
      {
        title: "Recruitment Assistant",
        description: "Handles candidate enquiries about roles, process, and next steps 24/7.",
      },
      {
        title: "Employee Support Agent",
        description: "Answers HR questions from existing employees about policies, benefits, and procedures.",
      },
      {
        title: "HR FAQ Agent",
        description: "Handles routine HR queries without requiring human involvement.",
      },
      {
        title: "Onboarding Assistant",
        description: "Guides new employees through onboarding steps, forms, and first-week information.",
      },
      {
        title: "Internal Knowledge Agent",
        description: "Gives employees instant access to internal policies, documents, and procedures.",
      },
      {
        title: "Workflow Automation",
        description: "Automates repetitive HR processes including reminders, follow-ups, and status updates.",
      },
    ],
    workflow: {
      customer: "100 applications arrive for a senior role overnight",
      system: "AI screens all applicants, scores by fit, shortlists top 10, schedules interviews automatically",
      outcome: "Recruiter starts the day with a ranked shortlist and confirmed interview schedule",
    },
    ctaTitle: "Ready To Shortlist Faster?",
    ctaText: "Book a consultation and we will map AI workflows for screening, scheduling, and onboarding.",
    metadataTitle: "Recruitment & HR AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds recruitment and HR AI systems for candidate screening, interview scheduling, candidate support, employee FAQs, and onboarding.",
  },
  {
    slug: "professional-services-agencies",
    emoji: "💼",
    name: "Professional Services & Agencies",
    label: "Professional Services & Agencies",
    href: "/industries/professional-services-agencies",
    description: "Qualify leads, onboard clients, and automate operations.",
    title: "Scale Your Agency Without Scaling Your Headcount.",
    subtitle:
      "AI systems that qualify leads, onboard clients, manage communication, and automate operations so your team delivers more without burning out.",
    painPoints: [
      {
        emoji: "⏱️",
        title: "Slow Lead Response",
        description: "Prospects contact multiple agencies and go with whoever responds first.",
      },
      {
        emoji: "📋",
        title: "Client Onboarding Friction",
        description: "Manual onboarding processes create a poor first impression and waste time.",
      },
      {
        emoji: "🔁",
        title: "Repetitive Client Communication",
        description: "Your team answers the same questions about services, pricing, and timelines.",
      },
      {
        emoji: "📅",
        title: "Scheduling Inefficiency",
        description: "Booking discovery calls, reviews, and updates requires constant manual coordination.",
      },
      {
        emoji: "📂",
        title: "CRM Management Overhead",
        description: "Keeping CRM data updated manually takes time away from client work.",
      },
      {
        emoji: "📈",
        title: "Scaling Bottlenecks",
        description: "Growth is limited by the hours your team has available for admin and communication.",
      },
    ],
    solutions: [
      {
        title: "Lead Qualification Agent",
        description: "Responds to inbound leads instantly, qualifies them, and books discovery calls.",
      },
      {
        title: "Client Onboarding Agent",
        description: "Guides new clients through onboarding, collects briefs, and sets expectations automatically.",
      },
      {
        title: "Proposal Assistant",
        description: "Drafts and sends initial proposal information based on client requirements.",
      },
      {
        title: "Scheduling Agent",
        description: "Books all calls, reviews, and meetings automatically without back-and-forth.",
      },
      {
        title: "Follow-Up Automation",
        description: "Keeps proposals and warm leads moving forward with timely follow-ups.",
      },
      {
        title: "CRM Automation",
        description: "Keeps your CRM updated automatically from every client interaction.",
      },
      {
        title: "Internal Operations Agent",
        description: "Handles internal team queries, project status requests, and process questions.",
      },
      {
        title: "AI Receptionist",
        description: "Answers inbound calls and routes them to the right team member instantly.",
      },
    ],
    workflow: {
      customer: "Potential client submits a brief via the website contact form at 10pm",
      system: "AI responds immediately, qualifies the project, collects requirements, books a discovery call",
      outcome: "Qualified discovery call booked with full brief ready before the team arrives in the morning",
    },
    ctaTitle: "Ready To Scale Delivery Without More Admin?",
    ctaText: "Book a consultation and we will map AI workflows for leads, onboarding, and operations.",
    metadataTitle: "Professional Services & Agencies AI Systems — KaizenAI",
    metadataDescription:
      "KaizenAI builds agency and professional services AI systems for lead qualification, onboarding, scheduling, proposal support, CRM automation, and operations.",
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
