import type {LocalizedText} from './site';

export type IndustryDetail = {
  slug:string;
  name:LocalizedText;
  tagline:LocalizedText;
  description:LocalizedText;
  problems:LocalizedText[];
  solutions:LocalizedText[];
  modules:LocalizedText[];
  outcomes:LocalizedText[];
};

const L=(en:string,hi:string):LocalizedText=>({en,hi});

export const industryDetails:IndustryDetail[]=[
  {
    slug:'manufacturing',name:L('Manufacturing','मैन्युफैक्चरिंग'),
    tagline:L('Connect production, inventory, quality and dispatch in one operational system.','प्रोडक्शन, इन्वेंटरी, क्वालिटी और डिस्पैच को एक ऑपरेशनल सिस्टम में जोड़ें।'),
    description:L('SystemMaster builds manufacturing ERP and workflow systems for production planning, material movement, scrap tracking, quality control and management reporting.','SystemMaster प्रोडक्शन प्लानिंग, मटेरियल मूवमेंट, स्क्रैप ट्रैकिंग, क्वालिटी कंट्रोल और मैनेजमेंट रिपोर्टिंग के लिए मैन्युफैक्चरिंग ERP और वर्कफ़्लो सिस्टम बनाता है।'),
    problems:[L('Production data spread across sheets and registers','प्रोडक्शन डेटा अलग-अलग शीट और रजिस्टर में होना'),L('No real-time visibility of WIP and delays','WIP और देरी की रियल-टाइम विजिबिलिटी न होना'),L('Scrap and quality issues are hard to trace','स्क्रैप और क्वालिटी इश्यू को ट्रैक करना कठिन होना')],
    solutions:[L('Step-wise production tracking','स्टेप-वाइज प्रोडक्शन ट्रैकिंग'),L('Plan vs actual monitoring','प्लान बनाम एक्चुअल मॉनिटरिंग'),L('QC, scrap and user-wise reporting','QC, स्क्रैप और यूज़र-वाइज रिपोर्टिंग')],
    modules:[L('Production Management','प्रोडक्शन मैनेजमेंट'),L('Inventory & Materials','इन्वेंटरी और मटेरियल'),L('Quality Control','क्वालिटी कंट्रोल'),L('Purchase & Vendors','परचेज और वेंडर'),L('Dispatch','डिस्पैच'),L('Management Dashboard','मैनेजमेंट डैशबोर्ड')],
    outcomes:[L('Faster decisions','तेज़ निर्णय'),L('Lower manual reporting','कम मैनुअल रिपोर्टिंग'),L('Better process control','बेहतर प्रोसेस कंट्रोल'),L('Clear accountability','स्पष्ट जवाबदेही')]
  },
  {
    slug:'logistics',name:L('Logistics','लॉजिस्टिक्स'),
    tagline:L('Control leads, trips, POD, billing and customer communication from one platform.','लीड, ट्रिप, POD, बिलिंग और कस्टमर कम्युनिकेशन को एक प्लेटफॉर्म से कंट्रोल करें।'),
    description:L('Custom logistics systems can connect sales, operations, transport documents, delivery status, billing and performance reporting.','कस्टम लॉजिस्टिक्स सिस्टम सेल्स, ऑपरेशंस, ट्रांसपोर्ट डॉक्यूमेंट, डिलीवरी स्टेटस, बिलिंग और परफॉर्मेंस रिपोर्टिंग को जोड़ सकते हैं।'),
    problems:[L('Trip information lives in multiple tools','ट्रिप की जानकारी कई टूल्स में बिखरी रहती है'),L('POD and delivery follow-up is manual','POD और डिलीवरी फॉलो-अप मैनुअल होता है'),L('Sales and operations are disconnected','सेल्स और ऑपरेशंस आपस में जुड़े नहीं होते')],
    solutions:[L('Trip and shipment workflow','ट्रिप और शिपमेंट वर्कफ़्लो'),L('POD and document tracking','POD और डॉक्यूमेंट ट्रैकिंग'),L('Customer updates and reporting','कस्टमर अपडेट और रिपोर्टिंग')],
    modules:[L('CRM','CRM'),L('Trip Management','ट्रिप मैनेजमेंट'),L('POD Tracking','POD ट्रैकिंग'),L('Billing','बिलिंग'),L('Customer Portal','कस्टमर पोर्टल'),L('Analytics','एनालिटिक्स')],
    outcomes:[L('Fewer follow-up gaps','कम फॉलो-अप गैप'),L('Faster billing','तेज़ बिलिंग'),L('Better customer visibility','बेहतर कस्टमर विजिबिलिटी'),L('Centralized operations','सेंट्रलाइज्ड ऑपरेशंस')]
  },
  {
    slug:'printing-packaging',name:L('Printing & Packaging','प्रिंटिंग और पैकेजिंग'),
    tagline:L('Manage estimates, job cards, material, production and dispatch with less manual work.','एस्टिमेट, जॉब कार्ड, मटेरियल, प्रोडक्शन और डिस्पैच को कम मैनुअल काम के साथ मैनेज करें।'),
    description:L('A tailored printing or packaging ERP can track enquiry to quotation, job planning, material consumption, production stages, wastage and delivery.','टेलर्ड प्रिंटिंग या पैकेजिंग ERP enquiry से quotation, job planning, material consumption, production stages, wastage और delivery तक ट्रैक कर सकता है।'),
    problems:[L('Complex job costing','कॉम्प्लेक्स जॉब कॉस्टिंग'),L('Material and wastage leakage','मटेरियल और वेस्टेज लीकेज'),L('Delayed production status updates','प्रोडक्शन स्टेटस अपडेट में देरी')],
    solutions:[L('Estimate to job-card workflow','एस्टिमेट से जॉब-कार्ड वर्कफ़्लो'),L('Material consumption tracking','मटेरियल कंजम्प्शन ट्रैकिंग'),L('Stage-wise production monitoring','स्टेज-वाइज प्रोडक्शन मॉनिटरिंग')],
    modules:[L('CRM & Estimation','CRM और एस्टिमेशन'),L('Job Cards','जॉब कार्ड'),L('Inventory','इन्वेंटरी'),L('Production','प्रोडक्शन'),L('Wastage','वेस्टेज'),L('Dispatch','डिस्पैच')],
    outcomes:[L('Accurate job costing','सटीक जॉब कॉस्टिंग'),L('Lower wastage','कम वेस्टेज'),L('On-time delivery','समय पर डिलीवरी'),L('Better margin visibility','बेहतर मार्जिन विजिबिलिटी')]
  },
  {
    slug:'wood-furniture',name:L('Wood & Furniture','वुड और फर्नीचर'),
    tagline:L('Track raw material, cutting, production, job work and finished goods.','रॉ मटेरियल, कटिंग, प्रोडक्शन, जॉब वर्क और फिनिश्ड गुड्स ट्रैक करें।'),
    description:L('Build a practical ERP around wood stock, production stages, custom orders, wastage, purchase and dispatch.','वुड स्टॉक, प्रोडक्शन स्टेज, कस्टम ऑर्डर, वेस्टेज, परचेज और डिस्पैच के अनुसार प्रैक्टिकल ERP बनाएं।'),
    problems:[L('Raw material variations','रॉ मटेरियल में वैरिएशन'),L('Custom order tracking','कस्टम ऑर्डर ट्रैकिंग'),L('Wastage visibility','वेस्टेज विजिबिलिटी')],
    solutions:[L('Material and batch tracking','मटेरियल और बैच ट्रैकिंग'),L('Order-wise production','ऑर्डर-वाइज प्रोडक्शन'),L('Wastage and stock reporting','वेस्टेज और स्टॉक रिपोर्टिंग')],
    modules:[L('Sales Orders','सेल्स ऑर्डर'),L('Purchase','परचेज'),L('Inventory','इन्वेंटरी'),L('Production','प्रोडक्शन'),L('Job Work','जॉब वर्क'),L('Dispatch','डिस्पैच')],
    outcomes:[L('Better stock control','बेहतर स्टॉक कंट्रोल'),L('Order visibility','ऑर्डर विजिबिलिटी'),L('Reduced wastage','कम वेस्टेज'),L('Faster reporting','तेज़ रिपोर्टिंग')]
  },
  {
    slug:'healthcare',name:L('Healthcare','हेल्थकेयर'),
    tagline:L('Connect patient, appointment, billing and internal operations with secure workflows.','पेशेंट, अपॉइंटमेंट, बिलिंग और इंटरनल ऑपरेशंस को सुरक्षित वर्कफ़्लो से जोड़ें।'),
    description:L('We can build clinic, hospital and healthcare management systems around appointments, records, billing, inventory and reporting requirements.','हम अपॉइंटमेंट, रिकॉर्ड, बिलिंग, इन्वेंटरी और रिपोर्टिंग की जरूरतों के अनुसार क्लिनिक, हॉस्पिटल और हेल्थकेयर मैनेजमेंट सिस्टम बना सकते हैं।'),
    problems:[L('Fragmented patient records','बिखरे हुए पेशेंट रिकॉर्ड'),L('Manual appointment follow-up','मैनुअल अपॉइंटमेंट फॉलो-अप'),L('Disconnected billing and inventory','बिलिंग और इन्वेंटरी अलग-अलग होना')],
    solutions:[L('Patient and appointment workflow','पेशेंट और अपॉइंटमेंट वर्कफ़्लो'),L('Billing and payment tracking','बिलिंग और पेमेंट ट्रैकिंग'),L('Medicine or consumable inventory','मेडिसिन या कंज्यूमेबल इन्वेंटरी')],
    modules:[L('Appointments','अपॉइंटमेंट'),L('Patient CRM','पेशेंट CRM'),L('Billing','बिलिंग'),L('Inventory','इन्वेंटरी'),L('Reports','रिपोर्ट'),L('Notifications','नोटिफिकेशन')],
    outcomes:[L('Faster service','तेज़ सर्विस'),L('Better patient follow-up','बेहतर पेशेंट फॉलो-अप'),L('Central records','सेंट्रल रिकॉर्ड'),L('Clear reporting','स्पष्ट रिपोर्टिंग')]
  },
  {
    slug:'real-estate',name:L('Real Estate','रियल एस्टेट'),
    tagline:L('Capture every enquiry and turn follow-ups, site visits and bookings into one sales pipeline.','हर enquiry को कैप्चर करें और follow-up, site visit और booking को एक sales pipeline में लाएं।'),
    description:L('Real estate CRM solutions can connect lead sources, assignment, calling, WhatsApp, site visits, inventory and booking status.','रियल एस्टेट CRM lead sources, assignment, calling, WhatsApp, site visits, inventory और booking status को जोड़ सकता है।'),
    problems:[L('Leads get missed','लीड मिस हो जाती हैं'),L('Follow-ups depend on individuals','फॉलो-अप व्यक्ति पर निर्भर रहते हैं'),L('No clear source-to-booking analytics','source-to-booking analytics स्पष्ट नहीं होती')],
    solutions:[L('Lead capture and routing','लीड कैप्चर और रूटिंग'),L('Follow-up automation','फॉलो-अप ऑटोमेशन'),L('Site visit and booking pipeline','साइट विजिट और बुकिंग पाइपलाइन')],
    modules:[L('Lead CRM','लीड CRM'),L('Calling','कॉलिंग'),L('WhatsApp','WhatsApp'),L('Site Visits','साइट विजिट'),L('Inventory','इन्वेंटरी'),L('Sales Analytics','सेल्स एनालिटिक्स')],
    outcomes:[L('Higher lead response','बेहतर लीड रिस्पॉन्स'),L('Consistent follow-ups','कंसिस्टेंट फॉलो-अप'),L('Better conversion visibility','बेहतर कन्वर्ज़न विजिबिलिटी'),L('Team accountability','टीम जवाबदेही')]
  },
  {
    slug:'import-export',name:L('Import Export','इम्पोर्ट एक्सपोर्ट'),
    tagline:L('Organize enquiry, documentation, shipment, compliance and payment follow-up.','enquiry, documentation, shipment, compliance और payment follow-up को व्यवस्थित करें।'),
    description:L('Custom systems can centralize import-export sales, shipment milestones, documents, vendors, customers and operational reports.','कस्टम सिस्टम import-export sales, shipment milestones, documents, vendors, customers और operational reports को सेंट्रलाइज कर सकते हैं।'),
    problems:[L('Document-heavy processes','बहुत अधिक डॉक्यूमेंटेशन'),L('Shipment milestones are hard to monitor','शिपमेंट milestone मॉनिटर करना कठिन'),L('Follow-ups across parties are manual','कई पार्टियों के बीच फॉलो-अप मैनुअल')],
    solutions:[L('Document checklist workflows','डॉक्यूमेंट चेकलिस्ट वर्कफ़्लो'),L('Shipment milestone tracking','शिपमेंट milestone tracking'),L('Customer and vendor coordination','कस्टमर और वेंडर coordination')],
    modules:[L('CRM','CRM'),L('Documentation','डॉक्यूमेंटेशन'),L('Shipment Tracking','शिपमेंट ट्रैकिंग'),L('Vendor Management','वेंडर मैनेजमेंट'),L('Payments','पेमेंट'),L('Reports','रिपोर्ट')],
    outcomes:[L('Fewer missed documents','कम मिस्ड डॉक्यूमेंट'),L('Better shipment visibility','बेहतर शिपमेंट विजिबिलिटी'),L('Faster coordination','तेज़ coordination'),L('Central records','सेंट्रल रिकॉर्ड')]
  },
  {
    slug:'travel',name:L('Travel','ट्रैवल'),
    tagline:L('Manage enquiries, packages, bookings, customer follow-ups and payments.','enquiry, package, booking, customer follow-up और payment मैनेज करें।'),
    description:L('Travel CRM and operations systems can streamline quotation, itinerary, booking workflow, reminders and customer communication.','ट्रैवल CRM और operations system quotation, itinerary, booking workflow, reminders और customer communication को streamline कर सकते हैं।'),
    problems:[L('Enquiries across many channels','कई चैनल से enquiry आना'),L('Quotation and itinerary work is repetitive','quotation और itinerary काम repetitive होना'),L('Payment and travel follow-up is manual','payment और travel follow-up मैनुअल होना')],
    solutions:[L('Travel lead CRM','ट्रैवल लीड CRM'),L('Package and itinerary workflow','पैकेज और itinerary workflow'),L('Booking and payment reminders','बुकिंग और payment reminders')],
    modules:[L('CRM','CRM'),L('Packages','पैकेज'),L('Itinerary','itinerary'),L('Bookings','बुकिंग'),L('Payments','पेमेंट'),L('WhatsApp Automation','WhatsApp ऑटोमेशन')],
    outcomes:[L('Faster quotations','तेज़ quotation'),L('Better follow-up','बेहतर follow-up'),L('Organized bookings','व्यवस्थित booking'),L('Improved customer experience','बेहतर customer experience')]
  },
  {
    slug:'education',name:L('Education','एजुकेशन'),
    tagline:L('Digitize admissions, student records, fees, attendance and communication.','admission, student record, fees, attendance और communication को digitize करें।'),
    description:L('School, institute and training management systems can be tailored around student lifecycle, fees, academics and reporting.','स्कूल, इंस्टीट्यूट और training management systems student lifecycle, fees, academics और reporting के अनुसार customize किए जा सकते हैं।'),
    problems:[L('Manual student records','मैनुअल student records'),L('Fee follow-up gaps','fee follow-up gaps'),L('Scattered communication','बिखरा communication')],
    solutions:[L('Admission workflow','admission workflow'),L('Fees and attendance','fees और attendance'),L('Student and parent communication','student और parent communication')],
    modules:[L('Admissions','admission'),L('Student Master','student master'),L('Fees','fees'),L('Attendance','attendance'),L('Reports','reports'),L('Notifications','notifications')],
    outcomes:[L('Central student data','central student data'),L('Faster fee tracking','तेज़ fee tracking'),L('Better communication','बेहतर communication'),L('Cleaner reports','बेहतर reports')]
  },
  {
    slug:'retail-wholesale',name:L('Retail & Wholesale','रिटेल और होलसेल'),
    tagline:L('Control customers, stock, billing, purchase and multi-location operations.','customers, stock, billing, purchase और multi-location operations को control करें।'),
    description:L('Retail and wholesale systems can combine POS, inventory, purchasing, customer records and management reporting.','रिटेल और होलसेल सिस्टम POS, inventory, purchasing, customer records और management reporting को जोड़ सकते हैं।'),
    problems:[L('Stock mismatch','stock mismatch'),L('Slow purchasing decisions','slow purchasing decisions'),L('Limited branch visibility','branch visibility की कमी')],
    solutions:[L('Real-time inventory','real-time inventory'),L('Purchase and reorder workflows','purchase और reorder workflow'),L('Branch and sales reporting','branch और sales reporting')],
    modules:[L('POS & Billing','POS और billing'),L('Inventory','inventory'),L('Purchase','purchase'),L('CRM','CRM'),L('Branches','branches'),L('Reports','reports')],
    outcomes:[L('Better stock accuracy','बेहतर stock accuracy'),L('Faster replenishment','तेज़ replenishment'),L('Clear branch performance','clear branch performance'),L('Improved margins','बेहतर margin')]
  },
  {
    slug:'textile',name:L('Textile','टेक्सटाइल'),
    tagline:L('Track material, processing, production, stock and orders with structured workflows.','material, processing, production, stock और orders को structured workflow से track करें।'),
    description:L('Textile ERP workflows can be designed around raw material, lots, production, job work, finished stock and dispatch.','टेक्सटाइल ERP workflow raw material, lots, production, job work, finished stock और dispatch के अनुसार design किया जा सकता है।'),
    problems:[L('Lot and process tracking','lot और process tracking'),L('Material consumption variation','material consumption variation'),L('Job work coordination','job work coordination')],
    solutions:[L('Lot-wise production','lot-wise production'),L('Material and job-work tracking','material और job-work tracking'),L('Stock and dispatch visibility','stock और dispatch visibility')],
    modules:[L('Purchase','purchase'),L('Inventory','inventory'),L('Production','production'),L('Job Work','job work'),L('Sales','sales'),L('Dispatch','dispatch')],
    outcomes:[L('Better traceability','बेहतर traceability'),L('Controlled stock','controlled stock'),L('Faster production reporting','तेज़ production reporting'),L('Lower manual work','कम manual work')]
  },
  {
    slug:'construction',name:L('Construction','कंस्ट्रक्शन'),
    tagline:L('Bring projects, vendors, materials, approvals, tasks and progress reporting together.','projects, vendors, materials, approvals, tasks और progress reporting को एक साथ लाएं।'),
    description:L('Construction management systems can connect project planning, material requests, purchase, contractor work, site progress and management dashboards.','construction management systems project planning, material requests, purchase, contractor work, site progress और management dashboards को जोड़ सकते हैं।'),
    problems:[L('Site updates arrive late','site updates देर से मिलना'),L('Material requests are difficult to control','material request control कठिन होना'),L('Vendor and task accountability is unclear','vendor और task accountability स्पष्ट न होना')],
    solutions:[L('Site progress workflow','site progress workflow'),L('Material request and approvals','material request और approvals'),L('Task and vendor tracking','task और vendor tracking')],
    modules:[L('Projects','projects'),L('Tasks','tasks'),L('Material Requests','material requests'),L('Purchase','purchase'),L('Vendors','vendors'),L('Progress Dashboard','progress dashboard')],
    outcomes:[L('Clear project status','clear project status'),L('Better material control','बेहतर material control'),L('Improved accountability','बेहतर accountability'),L('Faster reporting','तेज़ reporting')]
  }
];

export const industrySlugs=industryDetails.map(x=>x.slug);
