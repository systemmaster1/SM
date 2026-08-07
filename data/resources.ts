export type LocalizedText = {
  en: string;
  hi: string;
};

export type ResourceArticle = {
  slug: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  sections: {
    heading: LocalizedText;
    body: LocalizedText;
  }[];
};

export type CaseStudy = {
  slug: string;
  industry: LocalizedText;
  title: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  outcome: LocalizedText;
  tags: string[];
};

export const articles: ResourceArticle[] = [
  {
    slug: 'erp-vs-excel-growing-business',
    category: {en: 'ERP Strategy', hi: 'ERP रणनीति'},
    title: {
      en: 'When should a growing business move from Excel to ERP?',
      hi: 'बढ़ते बिजनेस को Excel से ERP पर कब जाना चाहिए?'
    },
    excerpt: {
      en: 'A practical checklist to understand when spreadsheets start creating operational risk instead of flexibility.',
      hi: 'यह समझने के लिए practical checklist कि spreadsheets कब flexibility के बजाय operational risk बनने लगती हैं।'
    },
    publishedAt: '2026-08-07',
    readTime: 6,
    featured: true,
    sections: [
      {
        heading: {en: 'The real warning signs', hi: 'वास्तविक warning signs'},
        body: {
          en: 'Excel works well for many small workflows, but problems begin when multiple people edit different versions, approvals are informal, data is duplicated, or management cannot see one reliable status. The issue is not Excel itself; the issue is process complexity.',
          hi: 'Excel कई छोटे workflows के लिए अच्छा काम करता है, लेकिन समस्या तब शुरू होती है जब कई लोग अलग-अलग versions edit करते हैं, approvals informal होते हैं, data duplicate होता है या management को एक reliable status नहीं मिलता। समस्या Excel नहीं, process complexity है।'
        }
      },
      {
        heading: {en: 'What ERP should solve first', hi: 'ERP को सबसे पहले क्या solve करना चाहिए'},
        body: {
          en: 'Start with the workflows causing the most delay or uncertainty: leads, quotations, purchase approvals, inventory movements, production tracking, billing or management reporting. A useful ERP implementation should remove confusion before adding complexity.',
          hi: 'सबसे पहले उन workflows से शुरू करें जहाँ सबसे ज्यादा delay या uncertainty है: leads, quotations, purchase approvals, inventory movement, production tracking, billing या management reporting। अच्छा ERP implementation complexity बढ़ाने से पहले confusion कम करता है।'
        }
      },
      {
        heading: {en: 'Ready product or custom ERP?', hi: 'Ready product या custom ERP?'},
        body: {
          en: 'If your workflow is standard and speed matters, a ready ERP can be the better choice. If your business has unique approval rules, manufacturing steps, integrations or role logic, custom development may provide a better long-term fit.',
          hi: 'यदि आपका workflow standard है और speed महत्वपूर्ण है, तो ready ERP बेहतर choice हो सकता है। यदि business में unique approval rules, manufacturing steps, integrations या role logic है, तो custom development long-term में बेहतर fit हो सकता है।'
        }
      }
    ]
  },
  {
    slug: 'crm-follow-up-automation',
    category: {en: 'CRM & Sales', hi: 'CRM और सेल्स'},
    title: {
      en: 'How follow-up automation can reduce lost sales opportunities',
      hi: 'Follow-up automation खोए हुए sales opportunities को कैसे कम कर सकता है'
    },
    excerpt: {
      en: 'Build a simple lead follow-up system that gives sales teams clarity without overwhelming them.',
      hi: 'ऐसा simple lead follow-up system बनाइए जो sales team को clarity दे और unnecessary complexity न बढ़ाए।'
    },
    publishedAt: '2026-08-07',
    readTime: 5,
    featured: true,
    sections: [
      {
        heading: {en: 'Why leads get missed', hi: 'Leads क्यों miss होते हैं'},
        body: {
          en: 'Most missed leads are not caused by lack of effort. They are caused by unclear ownership, inconsistent reminders, scattered notes and no shared next-action view.',
          hi: 'अधिकतर missed leads effort की कमी से नहीं होते। कारण होता है unclear ownership, inconsistent reminders, scattered notes और shared next-action view का न होना।'
        }
      },
      {
        heading: {en: 'The minimum useful CRM workflow', hi: 'Minimum useful CRM workflow'},
        body: {
          en: 'Capture the lead, assign an owner, set the next follow-up date, record the conversation, update the stage and surface overdue actions. Automation should support these steps rather than hide them.',
          hi: 'Lead capture करें, owner assign करें, next follow-up date set करें, conversation record करें, stage update करें और overdue actions दिखाएँ। Automation को इन steps को support करना चाहिए, hide नहीं।'
        }
      }
    ]
  },
  {
    slug: 'manufacturing-production-tracking',
    category: {en: 'Manufacturing', hi: 'मैन्युफैक्चरिंग'},
    title: {
      en: 'A practical production tracking system for small and mid-sized factories',
      hi: 'छोटी और मध्यम फैक्ट्रियों के लिए practical production tracking system'
    },
    excerpt: {
      en: 'Track plan vs actual, step movement, scrap and delays without creating a heavy system for operators.',
      hi: 'Operators के लिए heavy system बनाए बिना plan vs actual, step movement, scrap और delays track करें।'
    },
    publishedAt: '2026-08-07',
    readTime: 7,
    sections: [
      {
        heading: {en: 'Track movement, not only totals', hi: 'सिर्फ totals नहीं, movement track करें'},
        body: {
          en: 'A production dashboard becomes more useful when it shows how many units entered a step, how many moved forward, how many were rejected and where work is waiting.',
          hi: 'Production dashboard तब ज्यादा useful होता है जब वह दिखाए कि कितने units step में आए, कितने आगे बढ़े, कितने reject हुए और work कहाँ waiting में है।'
        }
      },
      {
        heading: {en: 'Make operator entry simple', hi: 'Operator entry simple रखें'},
        body: {
          en: 'Shop-floor users should see only the fields and actions relevant to their assigned step. Fewer clicks and clear permissions improve adoption and data quality.',
          hi: 'Shop-floor users को केवल उनके assigned step से जुड़े fields और actions दिखने चाहिए। कम clicks और clear permissions adoption और data quality improve करते हैं।'
        }
      }
    ]
  },
  {
    slug: 'whatsapp-business-automation-planning',
    category: {en: 'Automation', hi: 'ऑटोमेशन'},
    title: {
      en: 'What to plan before connecting WhatsApp to your business workflow',
      hi: 'WhatsApp को business workflow से जोड़ने से पहले क्या plan करें'
    },
    excerpt: {
      en: 'Define message triggers, consent, ownership and escalation before automating customer communication.',
      hi: 'Customer communication automate करने से पहले message triggers, consent, ownership और escalation define करें।'
    },
    publishedAt: '2026-08-07',
    readTime: 6,
    sections: [
      {
        heading: {en: 'Start with the business event', hi: 'Business event से शुरुआत करें'},
        body: {
          en: 'Good automation begins with a clear event such as a new lead, quotation sent, payment reminder, order update or support request. Avoid automating messages without a defined customer purpose.',
          hi: 'अच्छा automation एक clear event से शुरू होता है, जैसे new lead, quotation sent, payment reminder, order update या support request। Defined customer purpose के बिना messages automate न करें।'
        }
      },
      {
        heading: {en: 'Keep a human escalation path', hi: 'Human escalation path रखें'},
        body: {
          en: 'Automation should make routine communication faster while giving customers a clear route to a person when the situation requires judgment.',
          hi: 'Automation routine communication को faster बनाए, लेकिन जहाँ judgment चाहिए वहाँ customer के पास human support तक clear route होना चाहिए।'
        }
      }
    ]
  },
  {
    slug: 'hrms-task-management-one-workspace',
    category: {en: 'HRMS', hi: 'HRMS'},
    title: {
      en: 'Why HRMS and task management work better when connected',
      hi: 'HRMS और task management connected होने पर बेहतर क्यों काम करते हैं'
    },
    excerpt: {
      en: 'Connect employee records, attendance and task ownership to improve day-to-day accountability.',
      hi: 'Employee records, attendance और task ownership को connect करके day-to-day accountability improve करें।'
    },
    publishedAt: '2026-08-07',
    readTime: 5,
    sections: [
      {
        heading: {en: 'One employee context', hi: 'एक employee context'},
        body: {
          en: 'When attendance, leave, reporting structure and tasks are connected, managers spend less time combining information from separate tools.',
          hi: 'जब attendance, leave, reporting structure और tasks connected हों, managers को अलग-अलग tools से information combine करने में कम समय लगता है।'
        }
      }
    ]
  },
  {
    slug: 'custom-software-discovery-checklist',
    category: {en: 'Custom Software', hi: 'कस्टम सॉफ्टवेयर'},
    title: {
      en: 'Custom software discovery checklist before development starts',
      hi: 'Development शुरू होने से पहले custom software discovery checklist'
    },
    excerpt: {
      en: 'Clarify users, approvals, reports, integrations and success criteria before writing code.',
      hi: 'Code लिखने से पहले users, approvals, reports, integrations और success criteria clear करें।'
    },
    publishedAt: '2026-08-07',
    readTime: 8,
    sections: [
      {
        heading: {en: 'Map the current process first', hi: 'पहले current process map करें'},
        body: {
          en: 'Document what happens today, who performs each step, where approvals occur, what information is captured and what reports management needs. This prevents software from being designed around assumptions.',
          hi: 'Document करें कि आज process कैसे चलता है, कौन सा step कौन करता है, approvals कहाँ होते हैं, कौन-सी information capture होती है और management को कौन-सी reports चाहिए। इससे software assumptions पर design नहीं होता।'
        }
      },
      {
        heading: {en: 'Define success in operational terms', hi: 'Success को operational terms में define करें'},
        body: {
          en: 'Useful success measures include fewer manual entries, faster approvals, better traceability, lower reporting effort and clearer ownership. These are easier to validate than vague goals such as digital transformation.',
          hi: 'Useful success measures में कम manual entries, faster approvals, better traceability, lower reporting effort और clearer ownership शामिल हो सकते हैं। ये vague goals जैसे digital transformation की तुलना में validate करना आसान है।'
        }
      }
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'manufacturing-production-control',
    industry: {en: 'Manufacturing', hi: 'मैन्युफैक्चरिंग'},
    title: {
      en: 'Step-wise production visibility with scrap and delay tracking',
      hi: 'Scrap और delay tracking के साथ step-wise production visibility'
    },
    challenge: {
      en: 'Production status was spread across manual updates, making it difficult to see pending work, scrap and operator-level accountability.',
      hi: 'Production status manual updates में बिखरा हुआ था, जिससे pending work, scrap और operator-level accountability देखना मुश्किल था।'
    },
    solution: {
      en: 'A role-based production workflow with step movement, plan vs actual, scrap capture and management dashboards.',
      hi: 'Step movement, plan vs actual, scrap capture और management dashboards के साथ role-based production workflow।'
    },
    outcome: {
      en: 'A clearer operational view of where work is moving, waiting or being rejected, with structured reporting for management.',
      hi: 'Management के लिए structured reporting के साथ यह स्पष्ट visibility कि work कहाँ move हो रहा है, कहाँ waiting है और कहाँ reject हो रहा है।'
    },
    tags: ['PMS', 'Dashboard', 'Workflow', 'Reports']
  },
  {
    slug: 'sales-followup-crm',
    industry: {en: 'Sales & Services', hi: 'सेल्स और सर्विस'},
    title: {
      en: 'Centralized lead follow-up and next-action tracking',
      hi: 'Centralized lead follow-up और next-action tracking'
    },
    challenge: {
      en: 'Lead notes and follow-ups were scattered across calls, messages and spreadsheets with no consistent next-action view.',
      hi: 'Lead notes और follow-ups calls, messages और spreadsheets में scattered थे और consistent next-action view नहीं था।'
    },
    solution: {
      en: 'A CRM workflow with ownership, stages, reminders, conversation notes and overdue follow-up visibility.',
      hi: 'Ownership, stages, reminders, conversation notes और overdue follow-up visibility के साथ CRM workflow।'
    },
    outcome: {
      en: 'Sales teams can work from one queue of actionable leads instead of manually checking multiple sources.',
      hi: 'Sales team multiple sources manually check करने के बजाय actionable leads की एक queue से काम कर सकती है।'
    },
    tags: ['CRM', 'Lead Management', 'Follow-up', 'Automation']
  },
  {
    slug: 'inventory-warehouse-control',
    industry: {en: 'Warehouse & Distribution', hi: 'वेयरहाउस और डिस्ट्रीब्यूशन'},
    title: {
      en: 'Inventory movement and stock visibility across operations',
      hi: 'Operations में inventory movement और stock visibility'
    },
    challenge: {
      en: 'Stock movement was difficult to reconcile because inward, outward and adjustment records were maintained separately.',
      hi: 'Inward, outward और adjustment records अलग-अलग maintain होने के कारण stock movement reconcile करना मुश्किल था।'
    },
    solution: {
      en: 'A structured inventory workflow for transactions, item history, stock status and management reporting.',
      hi: 'Transactions, item history, stock status और management reporting के लिए structured inventory workflow।'
    },
    outcome: {
      en: 'Improved traceability of stock changes and a more reliable operational view for purchasing and dispatch decisions.',
      hi: 'Stock changes की बेहतर traceability और purchasing तथा dispatch decisions के लिए ज्यादा reliable operational view।'
    },
    tags: ['IMS', 'Inventory', 'Warehouse', 'Reports']
  }
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getLocalized(value: LocalizedText, locale: string) {
  return locale === 'hi' ? value.hi : value.en;
}
