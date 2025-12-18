import { title } from "process";

interface PolicyData {
    id: string;
    icon: string;
    title: string;
    points: string[];
    button?: {
        text: string;
        url: string;
    };
}


const policyData: PolicyData[] = [
  {
    id: 'orders-delivery',
    icon: '📦',
    title: 'Orders & Delivery',
    points: [
      'Free shipping across Pakistan',
      '5–6 business days in major cities, 7–8 in others',
      'Trackable with Z‑xxxxx ID'
    ],
    button: {
      text: 'Click here to track order',
      url: 'https://zerolifestyle.co/pages/order-tracking'
    }
  },
  {
    id: 'change-cancellation',
    icon: '✍️',
    title: 'Change & Cancellation',
    points: [
      'Modify/cancel within 4 hours or before dispatch',
      'Cancellations processed within 2 days',
      'Refunds take 7–10 business days'
    ],
    button: {
      text: 'Click here to change/cancel',
      url: 'https://dev-api.myalice.ai/zero-life-style/issue-form'
    }
  },
  {
    id: 'warranty-repair',
    icon: '🛠️',
    title: 'Warranty, Repair & Replacement',
    points: [
      'Report wrong/damaged items within 24 h',
      'Report software faults within 7 d',
      'Physical damage after 24 h → Repair only',
      'Fault repairs: 15–20 days (parts + labor under 1‑year warranty)'
    ],
    button: {
      text: 'Click here to generate ticket',
      url: 'https://dev-api.myalice.ai/zero-life-style/issue-form'
    }
  },
  {
    id: 'complaint-process',
    icon: '🔄',
    title: 'Complaint Process',
    points: [
      'Register via \'Register Complaint\' form + video',
      'Quality & authenticity checked on return',
      'Wrong/damaged replacements after verification'
    ],
    button: {
      text: 'Click here for return/complaint',
      url: 'https://dev-api.myalice.ai/zero-life-style/issue-form'
    }
  },
  {
    id: 'app-tech-support',
    icon: '📱',
    title: 'App & Tech Support',
    points: [
      'Use correct app (Zero Lifestyle, Da Fit, Wear Pro, FitCloud Pro)',
      'Ensure Bluetooth 4.4/IOS 7+, app runs in background',
      'Troubleshooting: connectivity, notifications, GPS, sensors'
    ]
  },
  {
    id: 'usage-guidelines',
    icon: '📋',
    title: 'Usage Guidelines',
    points: [
      'Use recommended charger—no fast charging or water exposure',
      'Bluetooth range max ~10 m',
      'Battery life: 7–10 days (2–3 days with calling)',
      'Health metrics are for lifestyle only, not medical'
    ]
  },
  {
    id: 'contact-info',
    icon: '☎️',
    title: 'Contact & Additional Info',
    points: [
      '📞 +92 21‑37189376 or WhatsApp (via site widget)',
      '1-year warranty—only parts charged outside warranty',
      'PDFs for Terms, Privacy, Warranty, Corporate policies',
      'Follow updates/offers on FB, IG, TikTok & YouTube'
    ],
    button: {
      text: 'Get Connected',
      url: 'https://api.whatsapp.com/send?phone=923331177318&text=Hello'
    }
  },
  {
    id: 'important-notice',
    icon: '🚨',
    title: 'Important Notice',
    points: [
      'Only accept parcels with ZERO-branded packaging (flyer & box).',
      'Do not accept if the parcel is damaged, opened, or mishandled.',
      'Product should not any scratched or damage.',
      'All Accessories should be present with in the box.',
      'Box should not be damaged.',
      'The QA department will determine the refund or replacement after the inspection.'
    ]
  }
];

export default policyData;