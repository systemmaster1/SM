export type Locale = 'en' | 'hi';

type Localized = { en: string; hi: string };

export type ProductDetail = {
  slug: 'books' | 'hrms' | 'erp';
  name: string;
  shortName: string;
  price: string;
  priceNote: Localized;
  href: string;
  logo: string;
  accent: string;
  tagline: Localized;
  description: Localized;
  highlights: Localized[];
  modules: Localized[];
  idealFor: Localized[];
};

export const productDetails: ProductDetail[] = [
  {
    slug: 'books',
    name: 'SM-Books Accounting Software',
    shortName: 'SM-Books',
    price: 'Starting at ₹699',
    priceNote: {en: 'Ready-to-use cloud accounting software', hi: 'तुरंत उपयोग के लिए क्लाउड अकाउंटिंग सॉफ्टवेयर'},
    href: 'https://books.systemmaster.in',
    logo: '/logo/sm-books.png',
    accent: 'from-amber-400/25 to-blue-500/10',
    tagline: {en: 'Simple accounting, billing and business finance in one place.', hi: 'अकाउंटिंग, बिलिंग और बिजनेस फाइनेंस एक ही जगह पर।'},
    description: {en: 'Built for growing Indian businesses that need professional billing, GST-ready workflows, expense tracking and clear financial reports without unnecessary complexity.', hi: 'बढ़ते भारतीय व्यवसायों के लिए बनाया गया, जहाँ प्रोफेशनल बिलिंग, GST-ready workflow, खर्च ट्रैकिंग और स्पष्ट वित्तीय रिपोर्ट एक सरल सिस्टम में चाहिए।'},
    highlights: [
      {en:'GST-ready billing & invoicing',hi:'GST-ready बिलिंग और इनवॉइसिंग'},
      {en:'Income & expense tracking',hi:'आय और खर्च ट्रैकिंग'},
      {en:'Business reports & summaries',hi:'बिजनेस रिपोर्ट और सारांश'},
      {en:'Cloud access from anywhere',hi:'कहीं से भी क्लाउड एक्सेस'}
    ],
    modules: [
      {en:'Customers & Vendors',hi:'कस्टमर और वेंडर'},
      {en:'Invoices & Payments',hi:'इनवॉइस और पेमेंट'},
      {en:'Expenses',hi:'खर्च'},
      {en:'GST & Tax Reports',hi:'GST और टैक्स रिपोर्ट'},
      {en:'Business Dashboard',hi:'बिजनेस डैशबोर्ड'},
      {en:'Financial Reports',hi:'फाइनेंशियल रिपोर्ट'}
    ],
    idealFor: [
      {en:'Small businesses',hi:'छोटे व्यवसाय'},
      {en:'Service companies',hi:'सर्विस कंपनियाँ'},
      {en:'Traders & distributors',hi:'ट्रेडर और डिस्ट्रीब्यूटर'},
      {en:'Growing teams',hi:'बढ़ती हुई टीमें'}
    ]
  },
  {
    slug: 'hrms',
    name: 'SM-HRMS + Task Management',
    shortName: 'SM-HRMS',
    price: '₹19 per user / month',
    priceNote: {en: 'Special offer price', hi: 'स्पेशल ऑफर प्राइस'},
    href: 'https://hrms.systemmaster.in',
    logo: '/logo/sm-hrms.png',
    accent: 'from-sky-400/25 to-emerald-400/10',
    tagline: {en: 'Manage people, attendance and tasks from one intelligent workspace.', hi: 'कर्मचारी, अटेंडेंस और टास्क एक ही स्मार्ट वर्कस्पेस से मैनेज करें।'},
    description: {en: 'A ready-to-use HRMS and task management platform for teams that want employee records, leave, attendance, payroll workflows and daily task visibility in one system.', hi: 'टीमों के लिए तैयार HRMS और Task Management प्लेटफॉर्म, जिसमें employee records, leave, attendance, payroll workflow और daily task visibility एक ही सिस्टम में मिलती है।'},
    highlights: [
      {en:'Employee & attendance management',hi:'Employee और attendance management'},
      {en:'Leave & approval workflows',hi:'Leave और approval workflows'},
      {en:'Task assignment & tracking',hi:'Task assignment और tracking'},
      {en:'Employee self-service portal',hi:'Employee self-service portal'}
    ],
    modules: [
      {en:'Employee Directory',hi:'Employee Directory'},
      {en:'Attendance',hi:'Attendance'},
      {en:'Leave Management',hi:'Leave Management'},
      {en:'Payroll Workflow',hi:'Payroll Workflow'},
      {en:'Task Management',hi:'Task Management'},
      {en:'Reports & Employee Portal',hi:'Reports और Employee Portal'}
    ],
    idealFor: [
      {en:'Offices & SMEs',hi:'ऑफिस और SMEs'},
      {en:'Field teams',hi:'फील्ड टीमें'},
      {en:'Service businesses',hi:'सर्विस बिजनेस'},
      {en:'Multi-team organizations',hi:'Multi-team organizations'}
    ]
  },
  {
    slug: 'erp',
    name: 'SM-ERP + CRM',
    shortName: 'SM-ERP',
    price: '₹229 per user / month',
    priceNote: {en: 'Special offer price', hi: 'स्पेशल ऑफर प्राइस'},
    href: 'https://erp.systemmaster.in',
    logo: '/logo/sm-erp.png',
    accent: 'from-blue-500/25 to-amber-400/10',
    tagline: {en: 'Connect leads, sales, inventory and operations in one business system.', hi: 'Leads, sales, inventory और operations को एक ही business system में जोड़ें।'},
    description: {en: 'A production-ready ERP + CRM for businesses that need a single view of leads, customers, quotations, orders, purchasing, inventory, workflows, reporting and analytics.', hi: 'Businesses के लिए production-ready ERP + CRM जिसमें leads, customers, quotation, orders, purchase, inventory, workflows, reporting और analytics एक ही जगह पर मिलते हैं।'},
    highlights: [
      {en:'CRM & lead pipeline',hi:'CRM और lead pipeline'},
      {en:'Sales, quotations & orders',hi:'Sales, quotations और orders'},
      {en:'Inventory & purchase workflows',hi:'Inventory और purchase workflows'},
      {en:'Dashboards & analytics',hi:'Dashboards और analytics'}
    ],
    modules: [
      {en:'Lead Management',hi:'Lead Management'},
      {en:'CRM & Follow-ups',hi:'CRM और Follow-ups'},
      {en:'Quotation & Sales',hi:'Quotation और Sales'},
      {en:'Purchase & Vendors',hi:'Purchase और Vendors'},
      {en:'Inventory',hi:'Inventory'},
      {en:'Reports & Analytics',hi:'Reports और Analytics'}
    ],
    idealFor: [
      {en:'Manufacturing',hi:'Manufacturing'},
      {en:'Logistics',hi:'Logistics'},
      {en:'Trading & distribution',hi:'Trading और distribution'},
      {en:'Service enterprises',hi:'Service enterprises'}
    ]
  }
];

export type ServiceDetail = {
  slug: string;
  name: string;
  tagline: Localized;
  description: Localized;
  deliverables: Localized[];
  stack: string[];
  idealFor: Localized[];
};

export const serviceDetails: ServiceDetail[] = [
  ['website-development','Website Development','High-converting websites that look premium and load fast.','Corporate websites, SaaS websites and industry-specific marketing sites built for trust, SEO and lead generation.',['UI/UX design','Responsive development','SEO foundation','Lead capture & integrations'],['Next.js','React','Tailwind','Framer Motion'],['B2B companies','SaaS brands','Manufacturers','Service businesses']],
  ['web-app-development','Web Application Development','Secure web applications built around real business workflows.','From portals to internal tools, we design scalable web apps with clear permissions, dashboards, integrations and reporting.',['Product architecture','Role-based access','Dashboards & workflows','API & database integration'],['Next.js','React','TypeScript','PostgreSQL'],['Operations teams','SMEs','Enterprises','Startups']],
  ['mobile-app-development','Mobile App Development','Business apps your teams can use from anywhere.','Responsive and mobile-first applications for field teams, sales, attendance, inventory, delivery, approvals and customer experiences.',['Android/iOS UX','Field workflows','Notifications','Offline-ready flows where required'],['React','PWA','Supabase','REST APIs'],['Field teams','Sales teams','Delivery operations','Service companies']],
  ['erp-development','ERP Development','Custom ERP that follows your company process — not the other way around.','We map departments, approvals, transactions, reports and integrations into a scalable ERP tailored to your operational model.',['Process mapping','ERP modules','Approval workflows','Management reporting'],['Next.js','Node.js','PostgreSQL','Redis'],['Manufacturing','Logistics','Trading','Multi-department businesses']],
  ['crm-development','CRM Development','Turn every lead into a measurable sales process.','Custom CRM systems for lead capture, assignment, follow-up, pipeline management, quotations, reminders and sales reporting.',['Lead sources','Pipeline stages','Follow-up automation','Sales analytics'],['Next.js','Supabase','WhatsApp API','n8n'],['Sales teams','Real estate','B2B services','Distributors']],
  ['hrms-development','HRMS Development','HR workflows customized for your people and policies.','Employee lifecycle, attendance, leave, payroll workflows, tasks, approvals and reports built around your organization.',['Employee master','Attendance & leave','Payroll workflows','Tasks & approvals'],['Next.js','PostgreSQL','Role-based access','APIs'],['Corporate offices','Factories','Field teams','Multi-branch companies']],
  ['ai-automation','AI Automation','Use AI where it actually saves time and improves response speed.','We design practical AI agents and automations for customer support, lead follow-up, document processing, reporting and repetitive operations.',['AI chat agents','Document workflows','Auto summaries','AI-assisted operations'],['OpenAI','Claude','Gemini','n8n'],['Sales','Support','Operations','Management']],
  ['whatsapp-automation','WhatsApp Automation','Connect WhatsApp with your leads, CRM and workflows.','Official WhatsApp integrations for notifications, customer conversations, lead capture, reminders and workflow automation.',['WhatsApp API','Templates & notifications','CRM integration','Automation logs'],['WhatsApp Cloud API','n8n','Webhooks','CRM APIs'],['Sales teams','Support teams','Service businesses','E-commerce']],
  ['dashboard-bi','Dashboard & BI','Turn operational data into decisions.','Executive dashboards, KPI systems and reports for sales, HR, inventory, production, finance and management teams.',['KPI architecture','Interactive dashboards','Filters & drilldowns','Automated reports'],['Recharts','PostgreSQL','APIs','Next.js'],['Management','Operations','Finance','Sales']],
  ['api-integration','API Integration','Make your business tools work together.','Secure integrations between ERP, CRM, payments, websites, WhatsApp, Google services and third-party platforms.',['API mapping','Webhooks','Data sync','Monitoring & error handling'],['REST','Webhooks','OAuth','Node.js'],['SaaS teams','ERP users','Automation projects','Multi-system businesses']],
  ['cloud-applications','Cloud Applications','Modern cloud systems designed for scale and remote access.','We build and deploy secure cloud applications with scalable databases, storage, authentication and production monitoring.',['Cloud architecture','Authentication','Database & storage','Deployment & monitoring'],['Vercel','AWS','Supabase','PostgreSQL'],['Growing businesses','Distributed teams','SaaS products','Enterprise apps']],
  ['custom-enterprise','Custom Enterprise Software','One system built exactly around your business.','When off-the-shelf software is not enough, we design complete enterprise systems with modules, roles, workflows, integrations and reports tailored to you.',['Discovery & BRD','System architecture','Custom modules','Long-term support'],['Next.js','Node.js','PostgreSQL','Cloud'],['Complex workflows','Manufacturing','Logistics','Large operations']]
].map(([slug,name,tagEn,descEn,delEn,stack,idealEn])=>({
  slug: slug as string,
  name: name as string,
  tagline:{en:tagEn as string,hi:tagEn as string},
  description:{en:descEn as string,hi:descEn as string},
  deliverables:(delEn as string[]).map(x=>({en:x,hi:x})),
  stack:stack as string[],
  idealFor:(idealEn as string[]).map(x=>({en:x,hi:x}))
}));

export const productSlugs = productDetails.map(x=>x.slug);
export const serviceSlugs = serviceDetails.map(x=>x.slug);
