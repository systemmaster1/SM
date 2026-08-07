export type Locale = 'en' | 'hi';
export type LocalizedText = { en: string; hi: string };

export const products = [
  {
    key: 'books',
    name: 'SM-Books Accounting Software',
    price: { en: 'Starting at ₹699', hi: '₹699 से शुरू' },
    logo: '/logo/sm-books.png',
    href: 'https://books.systemmaster.in',
    features: [
      { en: 'GST billing', hi: 'GST बिलिंग' },
      { en: 'Invoices & expenses', hi: 'इनवॉइस और खर्च' },
      { en: 'Accounting reports', hi: 'अकाउंटिंग रिपोर्ट' },
      { en: 'Business finance', hi: 'बिजनेस फाइनेंस' }
    ]
  },
  {
    key: 'hrms',
    name: 'SM-HRMS + Task Management',
    price: { en: '₹19 per user / month', hi: '₹19 प्रति यूज़र / माह' },
    logo: '/logo/sm-hrms.png',
    href: 'https://hrms.systemmaster.in',
    features: [
      { en: 'Attendance & leave', hi: 'अटेंडेंस और लीव' },
      { en: 'Payroll workflows', hi: 'पेरोल वर्कफ़्लो' },
      { en: 'Task management', hi: 'टास्क मैनेजमेंट' },
      { en: 'Employee portal', hi: 'एम्प्लॉयी पोर्टल' }
    ]
  },
  {
    key: 'erp',
    name: 'SM-ERP + CRM',
    price: { en: '₹229 per user / month', hi: '₹229 प्रति यूज़र / माह' },
    logo: '/logo/sm-erp.png',
    href: 'https://erp.systemmaster.in',
    features: [
      { en: 'CRM & sales', hi: 'CRM और सेल्स' },
      { en: 'Inventory & purchase', hi: 'इन्वेंटरी और परचेज' },
      { en: 'Quotations & orders', hi: 'कोटेशन और ऑर्डर' },
      { en: 'Workflow & analytics', hi: 'वर्कफ़्लो और एनालिटिक्स' }
    ]
  }
] as const;

export const services = [
  { slug:'website-development', label:{en:'Website Development',hi:'वेबसाइट डेवलपमेंट'} },
  { slug:'web-app-development', label:{en:'Web Application Development',hi:'वेब एप्लिकेशन डेवलपमेंट'} },
  { slug:'mobile-app-development', label:{en:'Mobile App Development',hi:'मोबाइल ऐप डेवलपमेंट'} },
  { slug:'erp-development', label:{en:'ERP Development',hi:'ERP डेवलपमेंट'} },
  { slug:'crm-development', label:{en:'CRM Development',hi:'CRM डेवलपमेंट'} },
  { slug:'hrms-development', label:{en:'HRMS Development',hi:'HRMS डेवलपमेंट'} },
  { slug:'ai-automation', label:{en:'AI Automation',hi:'AI ऑटोमेशन'} },
  { slug:'whatsapp-automation', label:{en:'WhatsApp Automation',hi:'WhatsApp ऑटोमेशन'} },
  { slug:'dashboard-bi', label:{en:'Dashboard & BI',hi:'डैशबोर्ड और BI'} },
  { slug:'api-integration', label:{en:'API Integration',hi:'API इंटीग्रेशन'} },
  { slug:'cloud-applications', label:{en:'Cloud Applications',hi:'क्लाउड एप्लिकेशन'} },
  { slug:'custom-enterprise', label:{en:'Custom Enterprise Software',hi:'कस्टम एंटरप्राइज सॉफ्टवेयर'} }
] as const;

export const industries = [
  { slug:'manufacturing', label:{en:'Manufacturing',hi:'मैन्युफैक्चरिंग'} },
  { slug:'logistics', label:{en:'Logistics',hi:'लॉजिस्टिक्स'} },
  { slug:'printing-packaging', label:{en:'Printing & Packaging',hi:'प्रिंटिंग और पैकेजिंग'} },
  { slug:'wood-furniture', label:{en:'Wood & Furniture',hi:'वुड और फर्नीचर'} },
  { slug:'healthcare', label:{en:'Healthcare',hi:'हेल्थकेयर'} },
  { slug:'real-estate', label:{en:'Real Estate',hi:'रियल एस्टेट'} },
  { slug:'import-export', label:{en:'Import Export',hi:'इम्पोर्ट एक्सपोर्ट'} },
  { slug:'travel', label:{en:'Travel',hi:'ट्रैवल'} },
  { slug:'education', label:{en:'Education',hi:'एजुकेशन'} },
  { slug:'retail-wholesale', label:{en:'Retail & Wholesale',hi:'रिटेल और होलसेल'} },
  { slug:'textile', label:{en:'Textile',hi:'टेक्सटाइल'} },
  { slug:'construction', label:{en:'Construction',hi:'कंस्ट्रक्शन'} }
] as const;

export const pick = (value: LocalizedText, locale: string) => value[locale === 'hi' ? 'hi' : 'en'];
