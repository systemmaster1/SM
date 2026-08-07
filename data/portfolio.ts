import type {LocalizedText} from './site';

export type PortfolioProject = {
  slug:string;
  name:LocalizedText;
  category:LocalizedText;
  shortDescription:LocalizedText;
  description:LocalizedText;
  demoUrl:string;
  technologies:string[];
  modules:LocalizedText[];
  highlights:LocalizedText[];
  idealFor:LocalizedText[];
};

const L=(en:string,hi:string):LocalizedText=>({en,hi});

export const portfolioProjects:PortfolioProject[]=[
  {
    slug:'enterprise-erp',
    name:L('Enterprise ERP Demo','एंटरप्राइज ERP डेमो'),
    category:L('ERP & CRM','ERP और CRM'),
    shortDescription:L('A complete business operations demo covering sales, purchase, inventory, workflows and reporting.','सेल्स, परचेज, इन्वेंटरी, वर्कफ़्लो और रिपोर्टिंग को कवर करने वाला पूरा बिजनेस ऑपरेशंस डेमो।'),
    description:L('Explore how a unified ERP can connect lead-to-order processes, purchase, stock, operational workflows and management reporting in one system.','देखें कि एक यूनिफाइड ERP किस तरह lead-to-order process, purchase, stock, operational workflow और management reporting को एक सिस्टम में जोड़ सकता है।'),
    demoUrl:'/demos/demo-erp-full.html',
    technologies:['ERP','CRM','Workflow','Analytics'],
    modules:[L('Lead & Sales Pipeline','लीड और सेल्स पाइपलाइन'),L('Purchase Management','परचेज मैनेजमेंट'),L('Inventory Control','इन्वेंटरी कंट्रोल'),L('Management Reports','मैनेजमेंट रिपोर्ट')],
    highlights:[L('Single operational view','एक ही जगह पूरा ऑपरेशनल व्यू'),L('Role-based business workflow','रोल-बेस्ड बिजनेस वर्कफ़्लो'),L('Real-time reporting experience','रियल-टाइम रिपोर्टिंग अनुभव')],
    idealFor:[L('Manufacturing','मैन्युफैक्चरिंग'),L('Trading & Distribution','ट्रेडिंग और डिस्ट्रीब्यूशन'),L('Service Businesses','सर्विस बिजनेस')]
  },
  {
    slug:'erp-dashboard',name:L('ERP Dashboard Demo','ERP डैशबोर्ड डेमो'),category:L('ERP Dashboard','ERP डैशबोर्ड'),
    shortDescription:L('Executive dashboard experience for sales, operations and business KPIs.','सेल्स, ऑपरेशंस और बिजनेस KPI के लिए एग्जीक्यूटिव डैशबोर्ड अनुभव।'),
    description:L('A management-focused dashboard demo showing how important operational and commercial metrics can be surfaced clearly for faster decisions.','मैनेजमेंट-केंद्रित डैशबोर्ड डेमो जो दिखाता है कि महत्वपूर्ण operational और commercial metrics को तेज़ निर्णय के लिए कैसे स्पष्ट रूप से दिखाया जा सकता है।'),
    demoUrl:'/demos/demo-erp.html',technologies:['Dashboard','ERP','KPI','Reporting'],
    modules:[L('Sales KPIs','सेल्स KPI'),L('Operations Overview','ऑपरेशंस ओवरव्यू'),L('Alerts & Status','अलर्ट और स्टेटस'),L('Quick Reports','क्विक रिपोर्ट')],
    highlights:[L('Executive-friendly layout','एग्जीक्यूटिव-फ्रेंडली लेआउट'),L('Actionable KPIs','एक्शन लेने योग्य KPI'),L('Fast status visibility','तेज़ स्टेटस विजिबिलिटी')],
    idealFor:[L('Business Owners','बिजनेस ओनर'),L('CXO Teams','CXO टीम'),L('Department Heads','डिपार्टमेंट हेड')]
  },
  {
    slug:'workflow-fms',name:L('FMS Workflow Demo','FMS वर्कफ़्लो डेमो'),category:L('Workflow Automation','वर्कफ़्लो ऑटोमेशन'),
    shortDescription:L('Track tasks, stages, responsibility, deadlines and operational follow-ups.','टास्क, स्टेज, जिम्मेदारी, डेडलाइन और ऑपरेशनल फॉलो-अप ट्रैक करें।'),
    description:L('This workflow demo illustrates how multi-step business processes can be assigned, monitored and escalated instead of being managed through scattered chats and sheets.','यह workflow demo दिखाता है कि multi-step business process को scattered chat और sheet की जगह assign, monitor और escalate कैसे किया जा सकता है।'),
    demoUrl:'/demos/demo-fms.html',technologies:['FMS','Workflow','Tasks','Automation'],
    modules:[L('Stage Tracking','स्टेज ट्रैकिंग'),L('Task Ownership','टास्क ओनरशिप'),L('Due Dates','ड्यू डेट'),L('Escalation View','एस्केलेशन व्यू')],
    highlights:[L('Clear accountability','स्पष्ट जवाबदेही'),L('Less manual follow-up','कम मैनुअल फॉलो-अप'),L('Process visibility','प्रोसेस विजिबिलिटी')],
    idealFor:[L('Operations Teams','ऑपरेशंस टीम'),L('Back Office','बैक ऑफिस'),L('Multi-step Processes','मल्टी-स्टेप प्रोसेस')]
  },
  {
    slug:'inventory-ims',name:L('Inventory Management Demo','इन्वेंटरी मैनेजमेंट डेमो'),category:L('Inventory','इन्वेंटरी'),
    shortDescription:L('A practical stock and inventory workflow with movement and reporting visibility.','स्टॉक मूवमेंट और रिपोर्टिंग विजिबिलिटी के साथ एक practical inventory workflow।'),
    description:L('See how stock, inward, outward and management visibility can be organized into one structured inventory experience.','देखें कि stock, inward, outward और management visibility को एक structured inventory experience में कैसे व्यवस्थित किया जा सकता है।'),
    demoUrl:'/demos/demo-ims.html',technologies:['IMS','Stock','Warehouse','Reports'],
    modules:[L('Stock Master','स्टॉक मास्टर'),L('Inward / Outward','इनवर्ड / आउटवर्ड'),L('Warehouse View','वेयरहाउस व्यू'),L('Inventory Reports','इन्वेंटरी रिपोर्ट')],
    highlights:[L('Better stock visibility','बेहतर स्टॉक विजिबिलिटी'),L('Structured movement records','स्ट्रक्चर्ड मूवमेंट रिकॉर्ड'),L('Faster reporting','तेज़ रिपोर्टिंग')],
    idealFor:[L('Warehouse','वेयरहाउस'),L('Manufacturing','मैन्युफैक्चरिंग'),L('Wholesale & Distribution','होलसेल और डिस्ट्रीब्यूशन')]
  },
  {
    slug:'production-pms',name:L('Production Management Demo','प्रोडक्शन मैनेजमेंट डेमो'),category:L('Manufacturing','मैन्युफैक्चरिंग'),
    shortDescription:L('Track production stages, output, pending work and process performance.','प्रोडक्शन स्टेज, आउटपुट, पेंडिंग वर्क और प्रोसेस परफॉर्मेंस ट्रैक करें।'),
    description:L('A manufacturing-focused demo for stage-wise production visibility, handovers, pending quantities and operational reporting.','stage-wise production visibility, handover, pending quantity और operational reporting के लिए manufacturing-focused demo।'),
    demoUrl:'/demos/demo-pms.html',technologies:['PMS','Manufacturing','Production','Reports'],
    modules:[L('Production Stages','प्रोडक्शन स्टेज'),L('Plan vs Actual','प्लान बनाम वास्तविक'),L('Pending Work','पेंडिंग वर्क'),L('Production Reports','प्रोडक्शन रिपोर्ट')],
    highlights:[L('Stage-wise control','स्टेज-वाइज कंट्रोल'),L('Production accountability','प्रोडक्शन जवाबदेही'),L('Clear pending visibility','स्पष्ट पेंडिंग विजिबिलिटी')],
    idealFor:[L('Factories','फैक्ट्री'),L('Assembly Units','असेंबली यूनिट'),L('Process Manufacturing','प्रोसेस मैन्युफैक्चरिंग')]
  },
  {
    slug:'business-analytics',name:L('Business Analytics Demo','बिजनेस एनालिटिक्स डेमो'),category:L('Analytics & BI','एनालिटिक्स और BI'),
    shortDescription:L('Interactive reporting and analytics experience for management decision-making.','मैनेजमेंट decision-making के लिए interactive reporting और analytics experience।'),
    description:L('This demo shows how operational data can be converted into visual KPIs, trends and management insights instead of static spreadsheets.','यह demo दिखाता है कि operational data को static spreadsheet की जगह visual KPI, trend और management insight में कैसे बदला जा सकता है।'),
    demoUrl:'/demos/demo-analytics.html',technologies:['BI','Analytics','Charts','KPI'],
    modules:[L('KPI Dashboard','KPI डैशबोर्ड'),L('Trend Analysis','ट्रेंड एनालिसिस'),L('Performance Views','परफॉर्मेंस व्यू'),L('Management Summary','मैनेजमेंट समरी')],
    highlights:[L('Visual decision support','विजुअल decision support'),L('Trend visibility','ट्रेंड विजिबिलिटी'),L('Management-ready reports','मैनेजमेंट-रेडी रिपोर्ट')],
    idealFor:[L('Management Teams','मैनेजमेंट टीम'),L('Sales Operations','सेल्स ऑपरेशंस'),L('Business Reviews','बिजनेस रिव्यू')]
  },
  {
    slug:'performance-dashboard',name:L('Performance Dashboard Demo','परफॉर्मेंस डैशबोर्ड डेमो'),category:L('Performance Management','परफॉर्मेंस मैनेजमेंट'),
    shortDescription:L('Monitor employee or team performance using structured KPIs and progress views.','structured KPI और progress view से employee या team performance मॉनिटर करें।'),
    description:L('A performance-focused dashboard showing how targets, activity and progress can be brought together for transparent reviews.','performance-focused dashboard जो दिखाता है कि target, activity और progress को transparent review के लिए एक साथ कैसे लाया जा सकता है।'),
    demoUrl:'/demos/demo-performance.html',technologies:['KPI','HR','Performance','Dashboard'],
    modules:[L('Targets','टार्गेट'),L('Performance KPIs','परफॉर्मेंस KPI'),L('Progress Tracking','प्रोग्रेस ट्रैकिंग'),L('Review Dashboard','रिव्यू डैशबोर्ड')],
    highlights:[L('Transparent reviews','पारदर्शी रिव्यू'),L('Goal visibility','गोल विजिबिलिटी'),L('Team-level insights','टीम-लेवल इनसाइट')],
    idealFor:[L('Sales Teams','सेल्स टीम'),L('Operations Teams','ऑपरेशंस टीम'),L('HR & Managers','HR और मैनेजर')]
  },
  {
    slug:'certificate-automation',name:L('Certificate Automation Demo','सर्टिफिकेट ऑटोमेशन डेमो'),category:L('Document Automation','डॉक्यूमेंट ऑटोमेशन'),
    shortDescription:L('Generate structured certificates and documents through a controlled digital workflow.','controlled digital workflow के जरिए structured certificate और document generate करें।'),
    description:L('This demo represents document automation use-cases where standardized outputs can be generated consistently from structured business data.','यह demo document automation use-case दिखाता है जहां structured business data से standardized output लगातार generate किए जा सकते हैं।'),
    demoUrl:'/demos/demo-certificates.html',technologies:['Automation','Documents','PDF','Workflow'],
    modules:[L('Template Control','टेम्पलेट कंट्रोल'),L('Data-driven Generation','डेटा-ड्रिवन जनरेशन'),L('PDF Output','PDF आउटपुट'),L('Records','रिकॉर्ड')],
    highlights:[L('Consistent documents','कंसिस्टेंट डॉक्यूमेंट'),L('Less repetitive work','कम repetitive work'),L('Faster generation','तेज़ जनरेशन')],
    idealFor:[L('HR Teams','HR टीम'),L('Training Institutes','ट्रेनिंग इंस्टीट्यूट'),L('Compliance Workflows','कम्प्लायंस वर्कफ़्लो')]
  }
];

export const portfolioSlugs=portfolioProjects.map(x=>x.slug);
