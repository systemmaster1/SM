export const companyStats = [
  { value: '10+', key: 'years' },
  { value: '3', key: 'products' },
  { value: '12+', key: 'services' },
  { value: 'AI+', key: 'direction' }
] as const;

export const companyTimeline = [
  { year: '2016', key: 'start', phase: 'Data & Reporting' },
  { year: '2018', key: 'digital', phase: 'Digital Systems' },
  { year: '2021', key: 'business', phase: 'Business Operations' },
  { year: '2022', key: 'automation', phase: 'Automation Ecosystem' },
  { year: '2023', key: 'rnd', phase: 'R&D + Business Systems' },
  { year: '2024', key: 'growth', phase: 'Growth Systems' },
  { year: '2025', key: 'connected', phase: 'Connected Automation' },
  { year: '2026', key: 'ai', phase: 'AI-Powered Systems' },
  { year: 'Next', key: 'next', phase: 'Continuous Innovation' }
] as const;

export const growthFlow = [
  'requirement',
  'system',
  'automation',
  'integration',
  'ai',
  'growth'
] as const;

export const rndFlow = [
  'research',
  'test',
  'develop',
  'implement',
  'measure',
  'improve'
] as const;

export const founderProgress = [
  { year: '2016', label: 'Data & Reporting' },
  { year: '2018', label: 'Digital Systems' },
  { year: '2021', label: 'Business Software' },
  { year: '2022', label: 'Process Automation' },
  { year: '2024', label: 'ERP + CRM + Integrations' },
  { year: '2025', label: 'Connected Automation' },
  { year: '2026', label: 'AI-Powered Business Systems' }
] as const;

export const companyProcess = [
  'discovery',
  'planning',
  'design',
  'development',
  'testing',
  'deployment',
  'support'
] as const;

export const technologyStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'AWS',
  'Vercel',
  'Cloudflare',
  'n8n',
  'WhatsApp API',
  'OpenAI',
  'Claude',
  'Gemini',
  'REST API'
] as const;

export const trustKeys = [
  'source',
  'security',
  'responsive',
  'cloud',
  'integration',
  'documentation'
] as const;

export const whyKeys = [
  'architecture',
  'workflow',
  'automation',
  'support'
] as const;

export const companyContact = {
  founder: 'Sunil Tiwari',
  email: 'Connect@systemmaster.in',
  phoneDisplay: '+91 90279 65956',
  phoneHref: 'tel:+919027965956',
  emailHref: 'mailto:Connect@systemmaster.in',
  whatsappHref: 'https://wa.me/919027965956',
  website: 'https://systemmaster.in'
} as const;
