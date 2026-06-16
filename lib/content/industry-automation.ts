export type IndustryAutomationItem = {
  title: string;
  description: string;
  badge?: string;
};

export type IndustryAutomationContent = {
  slug: string;
  industryName: string;
  subheading: string;
  scope: string;
  painPoints: IndustryAutomationItem[];
  solutions: IndustryAutomationItem[];
};

export const industryAutomationPages: IndustryAutomationContent[] = [
  {
    slug: "healthcare-clinics",
    industryName: "Healthcare & Clinics",
    subheading:
      "We do not believe in one-size-fits-all AI. First, we understand how your process actually works. Then we automate what matters — patient enquiries, bookings, reminders, intake, follow-ups, billing support, and daily clinic operations.",
    scope:
      "Dental clinics, medical practices, therapy centers, specialist clinics, physiotherapy centers, wellness centers, diagnostic laboratories, and primary care centers.",
    painPoints: [
      {
        title: "Unanswered Calls / Missed Inbound Enquiries",
        description:
          "Incoming calls during busy clinic hours go unanswered, causing patients to hang up and contact competitors.",
      },
      {
        title: "After-Hours & Weekend Enquiries Lost",
        description:
          "Patients who contact the clinic outside working hours often receive no immediate response and choose another provider.",
      },
      {
        title: "High No-Show Rates",
        description:
          "Patients forget appointments when confirmations and reminders are not automated.",
      },
      {
        title: "Repetitive Questions Waste Staff Time",
        description:
          "Reception teams spend a large part of the day answering the same questions about hours, pricing, slots, procedures, and insurance.",
      },
      {
        title: "Manual Scheduling Creates Bottlenecks",
        description:
          "Bookings handled through calls, WhatsApp, and manual calendars create delays, double-bookings, and missed confirmations.",
      },
      {
        title: "Slow Patient Intake",
        description:
          "New patients complete forms manually, delaying consultations and forcing doctors to wait for basic history and insurance information.",
      },
      {
        title: "Insurance Claims & Billing Chaos",
        description:
          "Claims, policy checks, invoices, and payment follow-ups are handled manually, slowing cash collection and creating administrative pressure.",
      },
      {
        title: "Patient Follow-Up & Reactivation Missing",
        description:
          "Dormant patients are rarely contacted again, reducing retention and repeat appointment revenue.",
      },
    ],
    solutions: [
      {
        title: "AI Receptionist (Voice + WhatsApp)",
        badge: "MUST-AUTOMATE",
        description:
          "Answers inbound calls and WhatsApp messages 24/7, checks live calendar availability, books appointments, logs every interaction in CRM, and escalates urgent cases.",
      },
      {
        title: "Appointment Reminder & No-Show Reduction",
        description:
          "Sends automated WhatsApp/SMS reminders, captures one-tap confirmations, flags no-show patterns, and triggers post-visit follow-ups.",
      },
      {
        title: "Patient FAQ Automation",
        description:
          "Answers common clinic questions instantly across WhatsApp and website chat while escalating complex patient queries to staff with full context.",
      },
      {
        title: "Patient Intake Automation",
        description:
          "Sends pre-visit forms, captures medical history, insurance details, allergies, and symptoms, then updates the patient CRM record automatically.",
      },
      {
        title: "Insurance Claims & Billing Automation",
        description:
          "Prepares claim details, validates insurance data, generates patient invoices, tracks claim status, and triggers payment reminders.",
      },
      {
        title: "Patient Reactivation & Win-Back Campaigns",
        description:
          "Identifies inactive patients and sends personalized WhatsApp campaigns to bring them back for follow-up care or routine checkups.",
      },
      {
        title: "Patient CRM Dashboard & Analytics",
        description:
          "Creates a single patient view with visit history, payment status, lifetime value, next-visit alerts, and retention opportunities.",
      },
    ],
  },
  {
    slug: "hospitality-travel-restaurants",
    industryName: "Hospitality, Travel & Restaurants",
    subheading:
      "We do not force a generic AI tool into your business. First, we understand how your process actually works. Then we automate what matters — bookings, guest enquiries, reservations, confirmations, review follow-ups, repeat visits, and daily hospitality operations.",
    scope:
      "Hotels, resorts, restaurants, cafes, travel agencies, tour operators, homestays, wedding venues, and event halls.",
    painPoints: [
      {
        title: "After-Hours Bookings Lost",
        description:
          "Guests enquire after closing hours and book with competitors when no one replies.",
      },
      {
        title: "Time-Zone Gaps",
        description:
          "International guests contact the business during local off-hours and move to another hotel, restaurant, or travel provider when responses are delayed.",
      },
      {
        title: "Jammed Phone Lines",
        description:
          "Peak service periods overload staff and phone lines, causing callers to hang up before anyone answers.",
      },
      {
        title: "Repetitive Enquiries Waste Staff",
        description:
          "Teams repeatedly answer the same questions about menus, prices, opening hours, packages, and event availability.",
      },
      {
        title: "No-Shows",
        description:
          "Unconfirmed bookings result in empty tables, unused rooms, or wasted event capacity.",
      },
      {
        title: "Unmanaged Reviews & Lost Repeat Guests",
        description:
          "Reviews are not monitored or responded to, and previous guests are not contacted for repeat bookings.",
      },
      {
        title: "Inventory & Supplier Chaos",
        description:
          "Food, beverage, stock, supplier invoices, and payment records are manually tracked across disconnected channels.",
      },
      {
        title: "Labor Costs & Profitability Unknown",
        description:
          "Staff hours and labor cost per event or service are not tracked, making profitability unclear.",
      },
    ],
    solutions: [
      {
        title: "24/7 Reservation Agent (Voice + WhatsApp)",
        badge: "MUST-AUTOMATE",
        description:
          "Answers booking calls and messages instantly, checks availability, captures guest details, confirms reservations, and logs bookings in CRM.",
      },
      {
        title: "Booking Confirmation & Reminder Automation",
        description:
          "Sends confirmation messages, pre-arrival reminders, cancellation recovery prompts, and post-visit review or repeat-booking requests.",
      },
      {
        title: "Quote & Itinerary Drafting",
        description:
          "Creates travel quotes, itineraries, packages, and price adjustments automatically based on guest preferences and availability.",
      },
      {
        title: "Review Automation & Response",
        description:
          "Monitors review platforms, detects sentiment, drafts professional responses, and escalates critical reviews to management.",
      },
      {
        title: "Repeat-Visit Campaigns & Guest Loyalty",
        description:
          "Segments past guests and sends personalized WhatsApp/email offers to increase repeat bookings and loyalty revenue.",
      },
      {
        title: "Inventory Tracking & Consumption Analysis",
        description:
          "Predicts and tracks stock consumption against bookings, POS orders, and events to reduce waste and prevent stock-outs.",
      },
      {
        title: "Unified Booking & Revenue Dashboard",
        description:
          "Combines bookings, walk-ins, revenue, payment reconciliation, no-shows, and channel performance into one operational dashboard.",
      },
      {
        title: "Supplier Invoice & Payment Automation",
        description:
          "Captures supplier invoices from email, WhatsApp, or scans, detects duplicates, tracks payables, and alerts overdue payments.",
      },
      {
        title: "Labor Cost Tracking & Event Profitability",
        description:
          "Logs staff shifts, overtime, and event-specific labor cost to calculate accurate profit margins per event or service.",
      },
    ],
  },
  {
    slug: "ecommerce-retail",
    industryName: "Ecommerce & Retail",
    subheading:
      "There is no single AI setup that works for every store. First, we understand how your process actually works. Then we automate what matters — abandoned carts, customer support, order updates, returns, retention, inventory visibility, and margin protection.",
    scope:
      "Online stores, Shopify and WooCommerce brands, retail chains, fashion, electronics, grocery retailers, and marketplace sellers on platforms such as Daraz or Jumia.",
    painPoints: [
      {
        title: "Overwhelmed Support",
        description:
          "As order volume grows, support teams cannot keep up and response times stretch from hours to days.",
      },
      {
        title: "Order Status Questions Overwhelm Inbox",
        description:
          "Customers repeatedly ask where their order is because tracking updates are not automated.",
      },
      {
        title: "Abandoned Carts",
        description:
          "Shoppers add products to cart but leave before completing checkout, creating recoverable lost revenue.",
      },
      {
        title: "Manual Returns Process",
        description:
          "Returns require staff to manually issue labels, track packages, process refunds, and update customers.",
      },
      {
        title: "Lost Shoppers",
        description:
          "Customers cannot easily find the right product and leave without buying.",
      },
      {
        title: "No Follow-Up",
        description:
          "Customers buy once and are never re-engaged for repeat purchases, reviews, or loyalty offers.",
      },
      {
        title: "Multi-Channel Revenue Chaos",
        description:
          "Orders from Shopify, marketplaces, WhatsApp, and direct sales are tracked separately and reconciled manually.",
      },
      {
        title: "Inventory Mismatches & Overselling",
        description:
          "Inventory is not synced across channels, causing overselling, refunds, and customer frustration.",
      },
      {
        title: "COGS Not Tracked",
        description:
          "Revenue is recorded without accurate product cost and margin visibility, making pricing decisions weak.",
      },
      {
        title: "Marketplace Commission & Refund Disputes",
        description:
          "Marketplace payouts, commissions, refunds, and chargebacks are difficult to verify accurately.",
      },
    ],
    solutions: [
      {
        title: "24/7 Support Agent",
        badge: "MUST-AUTOMATE",
        description:
          "Answers common customer questions instantly across WhatsApp, website chat, and support channels while escalating complex cases.",
      },
      {
        title: "Order-Status Agent",
        description:
          "Sends order confirmations, fetches live tracking updates, answers delivery questions, and notifies customers at each delivery stage.",
      },
      {
        title: "Abandoned Cart Recovery",
        badge: "HIGHEST ROI",
        description:
          "Tracks abandoned carts and sends timed WhatsApp/email reminders or incentives to recover lost sales.",
      },
      {
        title: "Returns Automation",
        description:
          "Guides customers through return requests, collects reasons and photos, generates labels, tracks returns, and updates refund status.",
      },
      {
        title: "Product Recommendations",
        description:
          "Uses browsing and purchase behavior to suggest relevant products, upsells, and cross-sells that increase average order value.",
      },
      {
        title: "Post-Purchase Campaigns",
        description:
          "Sends review requests, refill reminders, win-back offers, and loyalty messages based on customer purchase history.",
      },
      {
        title: "Multi-Channel Order Consolidation & Revenue Dashboard",
        description:
          "Aggregates orders from Shopify, marketplaces, and direct channels into one dashboard with revenue and payment reconciliation.",
      },
      {
        title: "Inventory Sync & Overstock Prevention",
        description:
          "Updates stock levels across channels in real time, prevents overselling, and highlights low-stock or slow-moving products.",
      },
      {
        title: "COGS Tracking & Margin Analysis",
        description:
          "Tracks product cost, calculates gross margin, identifies low-margin items, and supports better pricing decisions.",
      },
      {
        title: "Marketplace Commission & Refund Tracking",
        description:
          "Calculates expected marketplace commissions and payouts, compares them against actual settlements, and flags discrepancies.",
      },
      {
        title: "Customer Lifetime Value Tracking",
        description:
          "Segments customers by lifetime value, churn risk, order frequency, and next-purchase prediction to improve retention.",
      },
    ],
  },
  {
    slug: "education",
    industryName: "Education",
    subheading:
      "Education businesses do not need random AI tools. First, we understand how your process actually works. Then we automate what matters — enquiries, applications, trial bookings, class scheduling, payment reminders, student support, and retention workflows.",
    scope:
      "Coaching centers, online course providers, tutoring platforms, universities, admissions teams, training institutes, and skill-development centers.",
    painPoints: [
      {
        title: "Enrollment Overload",
        description:
          "Marketing campaigns create more enquiries than staff can handle, causing delayed replies and lost enrollments.",
      },
      {
        title: "Repetitive Questions Waste Staff",
        description:
          "Staff repeatedly answer the same questions about fees, schedules, discounts, financing, syllabus, and outcomes.",
      },
      {
        title: "Dropped Applications",
        description:
          "Prospects start application forms but fail to complete them because follow-up is manual or missing.",
      },
      {
        title: "Manual Scheduling",
        description:
          "Trial classes, demos, and counselling sessions require long back-and-forth coordination between students and staff.",
      },
      {
        title: "After-Hours Gaps",
        description:
          "Students enquire at night or during weekends and lose interest before staff respond.",
      },
      {
        title: "Slow Follow-Up",
        description:
          "Interested students are not followed up consistently and enroll with competitors.",
      },
      {
        title: "Invoice Not Generated & Payment Tracking Scattered",
        description:
          "Invoices are delayed and payment status is tracked manually across Excel, WhatsApp, and accounting tools.",
      },
      {
        title: "Installment Payment Defaults",
        description:
          "Students miss installment payments because reminders and escalation are not automated.",
      },
      {
        title: "Course Profitability Unknown",
        description:
          "Institutes cannot quickly see which course batches are profitable after trainer, platform, and marketing costs.",
      },
      {
        title: "Student Completion & Dropout Tracking Missing",
        description:
          "Dropouts, completion rates, progress, and refund exposure are difficult to monitor in real time.",
      },
    ],
    solutions: [
      {
        title: "Enrollment Agent",
        badge: "MUST-AUTOMATE",
        description:
          "Answers enquiries 24/7, qualifies prospects, explains course details, captures lead data, and offers trial class booking.",
      },
      {
        title: "Admissions FAQ Assistant",
        description:
          "Answers common questions about fees, schedules, syllabus, discounts, placements, trainers, and course outcomes.",
      },
      {
        title: "Application Follow-Up",
        badge: "HIGHEST ROI",
        description:
          "Tracks incomplete applications and sends personalized nudges until the prospect completes the form or books the next step.",
      },
      {
        title: "Demo & Class Scheduler",
        description:
          "Shows available trainer slots, lets students self-book, sends confirmations, reminders, and post-class enrollment prompts.",
      },
      {
        title: "24/7 Student Support",
        description:
          "Handles enrolled student questions about assignments, materials, class links, refund rules, and technical access.",
      },
      {
        title: "Nurture Sequences",
        description:
          "Automates pre-course, during-course, and post-course communication to improve engagement, completion, and placement outcomes.",
      },
      {
        title: "Instant Invoice Generation & Payment Tracking",
        description:
          "Creates invoices at enrollment, sends them instantly, tracks payment status, and updates dashboards.",
      },
      {
        title: "Installment Payment Reminders & Default Prevention",
        description:
          "Sends due-date reminders, payment links, overdue alerts, and status updates to reduce installment defaults.",
      },
      {
        title: "Course Batch Profitability Analysis",
        description:
          "Calculates revenue, costs, margin, and per-student profitability for each course or batch.",
      },
      {
        title: "Student Completion & Dropout Tracking",
        description:
          "Tracks attendance, lessons completed, assignments, at-risk students, dropouts, refunds, and placement progress.",
      },
      {
        title: "Refund & Dropout Management",
        description:
          "Applies refund rules based on course progress, calculates refund amounts, routes approval, and logs accounting entries.",
      },
    ],
  },
  {
    slug: "real-estate",
    industryName: "Real Estate",
    subheading:
      "Real estate moves fast, and generic AI will not fix a broken lead process. First, we understand how your process actually works. Then we automate what matters — lead response, buyer qualification, viewing bookings, follow-ups, CRM updates, and deal tracking.",
    scope:
      "Real estate agents, brokerages, property developers, property management companies, and real estate consultancies.",
    painPoints: [
      {
        title: "Slow Lead Response",
        description:
          "Buyer enquiries lose value within minutes when agents are busy, unavailable, or out at viewings.",
      },
      {
        title: "Lost After-Hours Enquiries",
        description:
          "Buyers who enquire at night, early morning, or weekends often move to another agent before receiving a response.",
      },
      {
        title: "Unqualified Leads Waste Agent Time",
        description:
          "Agents spend hours with buyers who are browsing, under-budget, or not ready to purchase.",
      },
      {
        title: "Dropped Follow-Ups",
        description:
          "Warm leads are forgotten after viewings or initial conversations and eventually purchase elsewhere.",
      },
      {
        title: "Scheduling Back-and-Forth",
        description:
          "Property viewings require multiple messages to coordinate a suitable time between buyer and agent.",
      },
      {
        title: "Manual Admin",
        description:
          "Listing copy, CRM entry, property documentation, and commission tracking consume agent time and create errors.",
      },
    ],
    solutions: [
      {
        title: "Instant Lead-Response Agent",
        badge: "MUST-AUTOMATE",
        description:
          "Answers property enquiries 24/7, provides listing information, captures buyer intent, and offers viewing booking immediately.",
      },
      {
        title: "Lead Qualification & Scoring",
        description:
          "Asks budget, timeline, financing, and preference questions, then scores and routes high-priority leads to agents.",
      },
      {
        title: "Viewing Scheduler",
        description:
          "Checks agent calendar availability, lets buyers self-select a viewing slot, sends confirmations, reminders, and logs the event in CRM.",
      },
      {
        title: "Nurture & Follow-Up Sequences",
        description:
          "Automatically follows up after enquiries and viewings with property updates, urgency prompts, and alternative listings.",
      },
      {
        title: "Listing Copy Generator & Property Documentation",
        description:
          "Generates listing descriptions, brochures, and portal-ready copy from property details and photos.",
      },
      {
        title: "Commission Tracking & Deal Pipeline Automation",
        description:
          "Calculates commissions when deals close, tracks approval/payment status, and visualizes pipeline revenue.",
      },
      {
        title: "Auto-CRM Logging & Lead Management",
        description:
          "Logs calls, WhatsApp conversations, viewing details, transcripts, follow-ups, and status changes into the lead record automatically.",
      },
    ],
  },
  {
    slug: "accounting-audit-financial-reporting",
    industryName: "Accounting, Audit & Financial Reporting",
    subheading:
      "Accounting and audit automation has to follow your exact workflow. First, we understand how your process actually works. Then we automate what matters — document collection, bookkeeping support, reconciliation, tax preparation, audit evidence, and management reporting.",
    scope:
      "Accounting firms, audit firms, bookkeeping providers, tax consultants, outsourced CFO teams, finance advisory practices, payroll service providers, corporate finance departments, and SME finance teams.",
    painPoints: [
      {
        title: "Client Document Collection Chaos",
        description:
          "Invoices, receipts, statements, payroll details, and tax records arrive across many channels and require constant chasing.",
      },
      {
        title: "Manual Bookkeeping & Data Entry",
        description:
          "Accounting teams repeatedly key in financial documents, increasing staff hours and error risk.",
      },
      {
        title: "Bank Reconciliation Bottlenecks",
        description:
          "Payments, receipts, refunds, and bank charges pile up unmatched until month-end.",
      },
      {
        title: "Tax Filing Preparation Pressure",
        description:
          "Missing documents and unclear tax categories are discovered too late, creating last-minute filing stress.",
      },
      {
        title: "Audit Evidence & Working Paper Delays",
        description:
          "Audit evidence requests, source-document linkage, and query tracking are manual and slow.",
      },
      {
        title: "Balance Sheet Schedules Prepared Manually",
        description:
          "Receivables, payables, accruals, prepayments, fixed assets, loans, and tax balances rely on disconnected spreadsheets.",
      },
      {
        title: "Management Reporting Comes Too Late",
        description:
          "Owners receive financial reports after the decision window has passed, leaving them to act on stale numbers.",
      },
      {
        title: "Payroll, Statutory & Compliance Deadline Risk",
        description:
          "Payroll inputs, statutory payments, tax deadlines, audit deadlines, and reporting dates are manually tracked and easy to miss.",
      },
    ],
    solutions: [
      {
        title: "Document Collection & Reconciliation Agent",
        badge: "MUST-AUTOMATE",
        description:
          "Requests, receives, extracts, organizes, matches, and tracks client documents while flagging missing or duplicate records.",
      },
      {
        title: "AI Bookkeeping & Expense Classification",
        description:
          "Reads invoices and receipts, predicts chart-of-account categories, identifies tax treatment, and prepares entries for review.",
      },
      {
        title: "Bank Reconciliation & Payment Matching",
        description:
          "Matches bank feeds, gateway payouts, invoices, refunds, and supplier payments while flagging exceptions.",
      },
      {
        title: "Tax Preparation & Filing Support",
        description:
          "Organizes tax-period records, detects missing inputs, prepares tax-ready summaries, and tracks filing deadlines.",
      },
      {
        title: "Audit Evidence & Working Paper Assistant",
        description:
          "Builds evidence request lists, links source documents to working paper sections, and tracks open audit queries.",
      },
      {
        title: "Balance Sheet Schedule & Month-End Close Automation",
        description:
          "Prepares balance support schedules, compares them to ledger balances, flags variances, and tracks close progress.",
      },
      {
        title: "Management Accounts & Advisory Reporting",
        description:
          "Generates P&L summaries, balance snapshots, cash flow views, ageing reports, margin analysis, and plain-English insights.",
      },
      {
        title: "Client Query & Finance FAQ Assistant",
        description:
          "Answers client status questions about missing documents, filing deadlines, invoices, reports, and escalates judgment-heavy queries.",
      },
    ],
  },
];

export const industryAutomationSlugs = industryAutomationPages.map(
  (page) => page.slug,
);

export function getIndustryAutomationContent(slug: string) {
  return industryAutomationPages.find((page) => page.slug === slug);
}
