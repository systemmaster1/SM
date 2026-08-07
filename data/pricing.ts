export const pricingProducts = [
  {
    slug: 'books',
    name: 'SM-Books Accounting Software',
    price: '₹699',
    priceType: 'starting',
    url: 'https://books.systemmaster.in',
    popular: false,
    features: [
      'Accounting & business finance',
      'GST billing & invoices',
      'Expense tracking',
      'Business reports',
      'Cloud access'
    ]
  },
  {
    slug: 'hrms',
    name: 'SM-HRMS + Task Management',
    price: '₹19',
    priceType: 'perUser',
    url: 'https://hrms.systemmaster.in',
    popular: true,
    features: [
      'Employee management',
      'Attendance & leave',
      'Task management',
      'Employee portal',
      'Reports'
    ]
  },
  {
    slug: 'erp',
    name: 'SM-ERP + CRM',
    price: '₹229',
    priceType: 'perUser',
    url: 'https://erp.systemmaster.in',
    popular: true,
    features: [
      'CRM & lead management',
      'Sales & quotations',
      'Inventory & purchase',
      'Workflow tracking',
      'Reports & analytics'
    ]
  }
] as const;
