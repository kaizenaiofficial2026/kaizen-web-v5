export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "contact";
      items: Array<{
        label: string;
        value: string;
      }>;
    };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalPageContent = {
  title: string;
  description: string;
  lastUpdated: string;
  introduction: string;
  sections: LegalSection[];
};

const contactBlock: LegalBlock = {
  type: "contact",
  items: [
    { label: "KaizenAI", value: "AI automation consultancy" },
    { label: "Website", value: "kaizenai.dev" },
    { label: "Email", value: "hello@kaizenai.dev" },
    { label: "WhatsApp", value: "+94 77 029 9569" },
  ],
};

export const privacyPolicy: LegalPageContent = {
  title: "Privacy Policy",
  description:
    "How KaizenAI collects, uses, protects, and manages information across our website, consultations, AI automation projects, integrations, dashboards, agentic AI systems, and client services.",
  lastUpdated: "11 June 2026",
  introduction:
    "KaizenAI respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect information when you visit kaizenai.dev, contact us, book a consultation, use our website, or work with us on AI automation and agentic AI implementation projects.",
  sections: [
    {
      id: "who-we-are",
      title: "1. Who We Are",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI is an AI automation consultancy that helps businesses identify high-impact AI opportunities, design tailored AI system architecture, build and deploy production-ready automations, and train teams to use those systems effectively.",
        },
        {
          type: "paragraph",
          text: "Our services may include AI workflow automation, agentic AI systems, AI chat agents, AI voice agents, AI receptionists, business process automation, dashboards, CRM integrations, customer communication systems, and other automation solutions depending on the client's business needs.",
        },
        contactBlock,
      ],
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      blocks: [
        {
          type: "paragraph",
          text: "We may collect information you provide directly, including your name, email address, phone number, company name, business details, consultation requests, form submissions, messages, and information submitted through our website, WhatsApp, email, booking forms, live chat, or consultation process.",
        },
        {
          type: "paragraph",
          text: "When you work with KaizenAI, we may collect business and operational information about workflows, departments, customer journeys, bottlenecks, current tools, processes, services, pricing, FAQs, team structure, booking processes, sales processes, support processes, and automation requirements.",
        },
        {
          type: "paragraph",
          text: "For AI automation projects, we may collect project requirements, approved knowledge base content, workflow rules, integration requirements, user roles, business logic, system prompts, process maps, dashboard requirements, automation triggers, and related implementation details.",
        },
        {
          type: "paragraph",
          text: "If a KaizenAI system processes customer interactions on behalf of a client, it may handle customer messages, call data, chat transcripts, enquiry details, booking details, order details, customer contact information, summaries, intent indicators, support notes, and escalation records.",
        },
        {
          type: "paragraph",
          text: "When you visit our website, we may collect technical data such as IP address, browser type, device type, operating system, pages visited, referral source, time spent on the website, and general usage activity.",
        },
        {
          type: "paragraph",
          text: "Where requested by a client, KaizenAI may process data through third-party platforms such as WhatsApp, Instagram, Facebook Messenger, Gmail, Google Calendar, Calendly, Salesforce, HubSpot, Zoho, Shopify, Slack, Stripe, Google Workspace, OpenAI, Anthropic, and similar tools.",
        },
        {
          type: "paragraph",
          text: "If you purchase a service, billing details may be processed by payment providers, banks, or accounting systems. KaizenAI does not intentionally store full card details on its website.",
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "3. How We Use Your Information",
      blocks: [
        {
          type: "list",
          items: [
            "Provide and improve our website and services",
            "Respond to enquiries and consultation requests",
            "Understand your business needs and identify AI automation opportunities",
            "Map workflows, design automation architecture, and build AI systems",
            "Configure, test, deploy, and maintain AI automations and integrations",
            "Train client teams to use deployed systems",
            "Manage dashboards, bookings, conversations, workflows, and support processes",
            "Provide technical support and service updates",
            "Generate operational summaries, reports, and project documentation",
            "Improve website performance, analytics, and user experience",
            "Protect our systems, clients, and users from misuse, fraud, or security threats",
            "Comply with legal, regulatory, and contractual obligations",
            "Send marketing communications where permitted or where you have opted in",
          ],
        },
      ],
    },
    {
      id: "ai-processing",
      title: "4. AI Automation and Agentic AI Processing",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI systems may process business and customer data to automate workflows, respond to enquiries, answer calls, manage bookings, update records, recommend actions, generate summaries, escalate issues, sync information between tools, and support business operations.",
        },
        {
          type: "paragraph",
          text: "AI systems are configured using business-approved information, such as service details, FAQs, policies, prices, workflows, customer handling rules, escalation paths, and integration logic.",
        },
        {
          type: "paragraph",
          text: "Clients are responsible for ensuring that information provided to KaizenAI is accurate, lawful, approved for use, and suitable for use in business automation or customer-facing systems.",
        },
      ],
    },
    {
      id: "sharing-information",
      title: "5. How We Share Information",
      blocks: [
        {
          type: "paragraph",
          text: "We do not sell your personal information. We may share information only where necessary with:",
        },
        {
          type: "list",
          items: [
            "Hosting and cloud infrastructure providers",
            "Analytics and website performance tools",
            "CRM, calendar, messaging, and communication platforms",
            "AI model and automation infrastructure providers",
            "Payment and billing service providers",
            "Technical support providers",
            "Legal, regulatory, or professional advisers",
            "Authorities where required by law",
            "Third-party integrations requested by the client",
          ],
        },
      ],
    },
    {
      id: "international-transfers",
      title: "6. International Data Transfers",
      blocks: [
        {
          type: "paragraph",
          text: "Some service providers, platforms, AI infrastructure, or integrations used by KaizenAI may operate outside Sri Lanka. Where information is transferred internationally, we take reasonable steps to ensure it is handled securely and in line with applicable data protection requirements.",
        },
      ],
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      blocks: [
        {
          type: "paragraph",
          text: "We keep information only for as long as necessary for the purpose it was collected, including consultation follow-up, service delivery, project implementation, support, reporting, legal compliance, dispute resolution, and legitimate business records.",
        },
        {
          type: "paragraph",
          text: "Client project records, system configuration details, conversation records, transcripts, workflow logs, and customer data may be retained according to the client's service agreement, dashboard configuration, or requested retention period.",
        },
      ],
    },
    {
      id: "security",
      title: "8. Data Security",
      blocks: [
        {
          type: "paragraph",
          text: "We use reasonable technical and organisational measures to protect information from unauthorised access, misuse, loss, alteration, or disclosure.",
        },
        {
          type: "paragraph",
          text: "However, no online system is completely secure. Clients are responsible for maintaining secure passwords, controlling dashboard access, managing authorised users, and protecting their connected third-party accounts.",
        },
      ],
    },
    {
      id: "client-responsibilities",
      title: "9. Client Responsibilities",
      blocks: [
        {
          type: "list",
          items: [
            "Providing lawful and accurate business information",
            "Ensuring they have the right to share data with KaizenAI",
            "Reviewing and approving AI system behaviour before launch",
            "Managing access to client dashboards and connected tools",
            "Informing their own customers where their data is processed through AI or automation systems",
            "Complying with applicable privacy, data protection, consumer protection, and industry-specific laws",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      title: "10. Your Rights",
      blocks: [
        {
          type: "paragraph",
          text: "Depending on applicable law, you may have the right to:",
        },
        {
          type: "list",
          items: [
            "Request access to your personal information",
            "Request correction of inaccurate information",
            "Request deletion of your information",
            "Object to or restrict certain processing",
            "Withdraw consent where processing is based on consent",
            "Request a copy of your information",
            "Complain to a relevant data protection authority",
          ],
        },
        {
          type: "paragraph",
          text: "To exercise these rights, contact us at hello@kaizenai.dev.",
        },
      ],
    },
    {
      id: "cookies",
      title: "11. Cookies and Tracking",
      blocks: [
        {
          type: "paragraph",
          text: "Our website may use cookies and similar technologies to improve functionality, understand website performance, remember preferences, and support analytics or marketing. For more details, please read our Cookie Policy.",
        },
      ],
    },
    {
      id: "third-party-links",
      title: "12. Third-Party Links and Platforms",
      blocks: [
        {
          type: "paragraph",
          text: "Our website and services may link to or integrate with third-party websites, platforms, tools, booking pages, payment providers, CRMs, messaging platforms, social media platforms, and AI infrastructure providers.",
        },
        {
          type: "paragraph",
          text: "We are not responsible for the privacy practices, policies, outages, or content of third-party services.",
        },
      ],
    },
    {
      id: "children",
      title: "13. Children's Privacy",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI services are intended for businesses and are not directed at children. We do not knowingly collect personal information from children.",
        },
      ],
    },
    {
      id: "changes",
      title: "14. Changes to This Privacy Policy",
      blocks: [
        {
          type: "paragraph",
          text: "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a new Last updated date.",
        },
      ],
    },
    {
      id: "contact",
      title: "15. Contact Us",
      blocks: [
        {
          type: "paragraph",
          text: "For privacy questions or requests, contact:",
        },
        contactBlock,
      ],
    },
  ],
};

export const termsOfService: LegalPageContent = {
  title: "Terms of Service",
  description:
    "The terms that govern use of KaizenAI's website, consultations, AI automation projects, agentic AI systems, integrations, dashboards, and related services.",
  lastUpdated: "11 June 2026",
  introduction:
    "These Terms of Service govern your access to and use of kaizenai.dev, KaizenAI consultations, AI automation projects, agentic AI systems, dashboards, integrations, demos, and related services. By using our website or services, you agree to these Terms.",
  sections: [
    {
      id: "about-kaizenai",
      title: "1. About KaizenAI",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI is an AI automation consultancy. We help businesses identify automation opportunities, map operational bottlenecks, design AI system architecture, build and deploy AI-powered systems, integrate them with existing tools, and train teams to use them effectively.",
        },
        {
          type: "paragraph",
          text: "Our services may include AI workflow automation, agentic AI systems, AI chat agents, AI voice agents, AI receptionists, dashboards, CRM integrations, booking automations, customer communication systems, and other business automation solutions.",
        },
      ],
    },
    {
      id: "website-use",
      title: "2. Use of the Website",
      blocks: [
        {
          type: "paragraph",
          text: "You may use our website for lawful business purposes only. You must not misuse the website, attempt to disrupt its operation, access restricted areas without permission, copy protected content, or use the website for fraudulent, harmful, or unlawful activity.",
        },
      ],
    },
    {
      id: "consultations",
      title: "3. Consultations, Demos, and Website Information",
      blocks: [
        {
          type: "paragraph",
          text: "Any demo, consultation, pricing discussion, proposal, website content, or automation recommendation is provided for general business evaluation purposes.",
        },
        {
          type: "paragraph",
          text: "Final service scope, pricing, implementation timeline, integrations, deliverables, support terms, training requirements, and usage limits will be confirmed separately through a proposal, agreement, invoice, or written confirmation.",
        },
      ],
    },
    {
      id: "client-responsibilities",
      title: "4. Client Responsibilities",
      blocks: [
        {
          type: "list",
          items: [
            "Providing accurate business and operational information",
            "Providing approved workflows, policies, FAQs, service details, pricing, and process rules",
            "Ensuring they have the right to share any business, customer, or operational data with KaizenAI",
            "Reviewing and approving AI system workflows before launch",
            "Maintaining secure access to dashboards, accounts, integrations, and credentials",
            "Complying with applicable laws when using AI systems with customers, employees, or third parties",
            "Monitoring workflows where human review, approval, or escalation is required",
            "Keeping connected third-party accounts active and compliant with their own platform rules",
          ],
        },
      ],
    },
    {
      id: "ai-output",
      title: "5. AI System Output and Automation Behaviour",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI systems are designed to assist with business operations, customer communication, workflow automation, lead handling, appointment booking, information routing, reporting, and similar tasks.",
        },
        {
          type: "paragraph",
          text: "AI-generated outputs, automation decisions, summaries, or recommendations may not always be perfect, complete, or suitable for every situation. Clients should review important workflows, high-risk responses, pricing rules, policies, approval steps, and escalation paths before making any AI system live.",
        },
        {
          type: "paragraph",
          text: "KaizenAI does not guarantee that AI outputs will always be error-free, uninterrupted, or result in specific business outcomes, revenue, sales, bookings, conversions, or cost savings.",
        },
      ],
    },
    {
      id: "no-professional-advice",
      title: "6. No Professional Advice",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI services do not provide legal, financial, medical, emergency, or regulated professional advice unless specifically agreed in writing and reviewed by qualified professionals.",
        },
        {
          type: "paragraph",
          text: "Clients must not rely on AI systems for emergency response, regulated professional advice, legally binding decisions, medical decisions, financial decisions, or high-risk decision-making without appropriate human oversight.",
        },
      ],
    },
    {
      id: "accounts",
      title: "7. Accounts, Dashboards, and Access Control",
      blocks: [
        {
          type: "paragraph",
          text: "Some services may include access to a client dashboard, admin panel, CRM connection, automation workspace, or related portal.",
        },
        {
          type: "paragraph",
          text: "Clients are responsible for keeping login details confidential, managing authorised users, and ensuring only approved personnel access the system.",
        },
        {
          type: "paragraph",
          text: "KaizenAI may suspend access if we detect misuse, unauthorised access, security concerns, unpaid invoices, violation of these Terms, or activity that may harm KaizenAI, the client, customers, or third parties.",
        },
      ],
    },
    {
      id: "billing",
      title: "8. Payments and Billing",
      blocks: [
        {
          type: "paragraph",
          text: "Fees, retainers, setup costs, consultation fees, usage limits, integration costs, additional charges, and payment terms will be confirmed separately in the applicable proposal, agreement, invoice, or written communication.",
        },
        {
          type: "paragraph",
          text: "Unless otherwise agreed, payments must be made on time to continue service access. Late or failed payments may result in suspension, delay, or termination of services.",
        },
      ],
    },
    {
      id: "integrations",
      title: "9. Third-Party Platforms and Integrations",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI may integrate with third-party platforms such as WhatsApp, Instagram, Facebook Messenger, Gmail, Google Calendar, Calendly, Salesforce, HubSpot, Zoho, Shopify, Slack, Stripe, Google Workspace, OpenAI, Anthropic, hosting providers, analytics tools, and other business platforms.",
        },
        {
          type: "paragraph",
          text: "KaizenAI is not responsible for outages, API changes, pricing changes, policy changes, account restrictions, data limits, model behaviour changes, or technical issues caused by third-party platforms.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "10. Intellectual Property",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI owns or licenses all rights in its website, branding, designs, software workflows, dashboards, automation architecture, AI configurations, implementation methods, technical materials, templates, prompts, documentation, and service materials unless otherwise agreed in writing.",
        },
        {
          type: "paragraph",
          text: "Clients retain ownership of their own business data, customer data, brand assets, product information, service information, and content provided to KaizenAI.",
        },
        {
          type: "paragraph",
          text: "You must not copy, resell, reverse engineer, reproduce, distribute, or commercially exploit KaizenAI systems, designs, workflows, prompts, documentation, or materials without written permission.",
        },
      ],
    },
    {
      id: "client-data",
      title: "11. Client Data",
      blocks: [
        {
          type: "paragraph",
          text: "Client data is used only to provide, support, improve, and maintain the agreed services.",
        },
        {
          type: "paragraph",
          text: "Clients are responsible for ensuring their data is accurate, lawful, approved for processing, and does not infringe the rights of any third party.",
        },
      ],
    },
    {
      id: "confidentiality",
      title: "12. Confidentiality",
      blocks: [
        {
          type: "paragraph",
          text: "Both KaizenAI and the client agree to protect confidential business, technical, customer, pricing, operational, workflow, and project information shared during the service relationship.",
        },
        {
          type: "paragraph",
          text: "Confidential information must not be disclosed to third parties unless required for service delivery, authorised by the other party, or required by law.",
        },
      ],
    },
    {
      id: "availability",
      title: "13. Service Availability",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI aims to provide reliable services, but we do not guarantee uninterrupted access at all times. Services may be affected by maintenance, updates, internet issues, hosting providers, AI infrastructure, third-party platform downtime, integration issues, security incidents, or events outside our control.",
        },
      ],
    },
    {
      id: "liability",
      title: "14. Limitation of Liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the maximum extent permitted by law, KaizenAI is not liable for indirect losses, loss of profits, loss of revenue, loss of business opportunity, loss of data, reputational damage, customer complaints, third-party platform issues, client misuse, incorrect information provided by the client, unauthorised access caused by client-side security failures, or decisions made without appropriate human review.",
        },
      ],
    },
    {
      id: "termination",
      title: "15. Termination",
      blocks: [
        {
          type: "paragraph",
          text: "KaizenAI may suspend or terminate services if a client violates these Terms, fails to make payment, misuses the service, provides unlawful content, compromises system security, breaches third-party platform rules, or uses the service in a way that may harm KaizenAI, its clients, customers, or third parties.",
        },
        {
          type: "paragraph",
          text: "Clients may stop using the services according to the cancellation or termination terms agreed in their proposal, invoice, or service agreement.",
        },
      ],
    },
    {
      id: "changes",
      title: "16. Changes to These Terms",
      blocks: [
        {
          type: "paragraph",
          text: "We may update these Terms from time to time. The updated version will be posted on this page with a new Last updated date.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "17. Governing Law",
      blocks: [
        {
          type: "paragraph",
          text: "These Terms are governed by the laws of Sri Lanka, unless otherwise agreed in writing.",
        },
      ],
    },
    {
      id: "contact",
      title: "18. Contact Us",
      blocks: [
        {
          type: "paragraph",
          text: "For questions about these Terms, contact:",
        },
        contactBlock,
      ],
    },
  ],
};

export const cookiePolicy: LegalPageContent = {
  title: "Cookie Policy",
  description:
    "How KaizenAI uses cookies and similar technologies to keep the website functional, improve performance, remember preferences, and understand website activity.",
  lastUpdated: "11 June 2026",
  introduction:
    "This Cookie Policy explains how KaizenAI uses cookies and similar technologies on kaizenai.dev.",
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What Are Cookies?",
      blocks: [
        {
          type: "paragraph",
          text: "Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember preferences, understand visitor activity, and improve user experience.",
        },
        {
          type: "paragraph",
          text: "Similar technologies may include pixels, tags, local storage, scripts, embedded widgets, and analytics tools.",
        },
      ],
    },
    {
      id: "how-we-use-cookies",
      title: "2. How We Use Cookies",
      blocks: [
        {
          type: "list",
          items: [
            "Keep the website secure and functional",
            "Remember user preferences",
            "Understand how visitors use the website",
            "Improve page speed, layout, and performance",
            "Measure marketing and campaign performance",
            "Support contact forms, booking forms, chat widgets, consultation forms, or embedded tools",
            "Improve our website, content, and service experience",
          ],
        },
      ],
    },
    {
      id: "cookie-types",
      title: "3. Types of Cookies We Use",
      blocks: [
        {
          type: "paragraph",
          text: "Strictly necessary cookies are required for the website to work properly. They may support security, page navigation, form submission, session management, and basic website functionality. These cookies cannot usually be switched off because the website may not work correctly without them.",
        },
        {
          type: "paragraph",
          text: "Performance and analytics cookies help us understand how visitors use the website, such as which pages are visited, how long users stay, which links are clicked, and where traffic comes from. This helps us improve website content, layout, messaging, and user experience.",
        },
        {
          type: "paragraph",
          text: "Preference cookies remember choices you make, such as language, region, display preferences, or other website settings.",
        },
        {
          type: "paragraph",
          text: "Marketing cookies may be used to measure advertising performance, understand campaign results, or show relevant ads across platforms. Marketing cookies may be placed by KaizenAI or third-party platforms only where applicable and permitted.",
        },
        {
          type: "paragraph",
          text: "Some cookies may be placed by third-party services used on our website, such as analytics tools, booking tools, chat widgets, social media platforms, embedded content, advertising platforms, CRM tools, or automation tools. These third parties may process data according to their own privacy and cookie policies.",
        },
      ],
    },
    {
      id: "managing-cookies",
      title: "4. Managing Cookies",
      blocks: [
        {
          type: "paragraph",
          text: "You can manage cookies through your browser settings. Most browsers allow you to block, delete, or control cookies.",
        },
        {
          type: "paragraph",
          text: "If KaizenAI uses a cookie consent banner, you may also manage your cookie choices directly through the banner or cookie settings panel.",
        },
        {
          type: "paragraph",
          text: "Blocking some cookies may affect how the website works.",
        },
      ],
    },
    {
      id: "consent",
      title: "5. Consent",
      blocks: [
        {
          type: "paragraph",
          text: "Where required, we will ask for your consent before using non-essential cookies, such as analytics or marketing cookies.",
        },
        {
          type: "paragraph",
          text: "Strictly necessary cookies may be used without consent because they are required for the website to function.",
        },
      ],
    },
    {
      id: "updates",
      title: "6. Updates to This Cookie Policy",
      blocks: [
        {
          type: "paragraph",
          text: "We may update this Cookie Policy from time to time. The updated version will be posted on this page with a new Last updated date.",
        },
      ],
    },
    {
      id: "contact",
      title: "7. Contact Us",
      blocks: [
        {
          type: "paragraph",
          text: "For questions about this Cookie Policy, contact:",
        },
        contactBlock,
      ],
    },
  ],
};
