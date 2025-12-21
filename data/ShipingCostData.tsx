interface CityShippingInfo {
  name: string;
  code: string;
  shippingCost: number;
}

interface ProvinceShipping {
  id: number;
  province_name: string;
  province_code: string;
  cities: CityShippingInfo[];
}

// cost bands (PKR)
const FREE = 0;
const NEAR = 100;
const MID = 250;
const FAR = 400;
const MAX = 500;

export const ShippingCostData: ProvinceShipping[] = [
  // Punjab
  {
    id: 1,
    province_name: "Punjab",
    province_code: "PB",
    cities: [
      // HUB (origin)
      { name: "Lahore", code: "LHE", shippingCost: FREE },

      // Nearby / low
      { name: "Sheikhupura", code: "SKP", shippingCost: NEAR },
      { name: "Kasur", code: "KSR", shippingCost: NEAR },
      { name: "Gujranwala", code: "GUJ", shippingCost: NEAR },
      { name: "Sialkot", code: "SKT", shippingCost: NEAR },
      { name: "Faisalabad", code: "FSD", shippingCost: NEAR },
      { name: "Okara", code: "OKR", shippingCost: NEAR },
      { name: "Nankana Sahib", code: "NKS", shippingCost: NEAR },

      // Mid
      { name: "Multan", code: "MUX", shippingCost: MID },
      { name: "Sargodha", code: "SGD", shippingCost: MID },
      { name: "Sahiwal", code: "SWL", shippingCost: MID },
      { name: "Bahawalpur", code: "BWP", shippingCost: MID },
      { name: "Gujrat", code: "GJT", shippingCost: MID },
      { name: "Jhelum", code: "JLM", shippingCost: MID },

      // Far inside Punjab / towards north & south
      { name: "Rawalpindi", code: "RWP", shippingCost: FAR },
      { name: "Islamabad", code: "ISB", shippingCost: FAR },
      { name: "Rahim Yar Khan", code: "RYK", shippingCost: FAR },
      { name: "Dera Ghazi Khan", code: "DGK", shippingCost: FAR },
      { name: "Layyah", code: "LYH", shippingCost: FAR },
      { name: "Bhakkar", code: "BKR", shippingCost: FAR },

      // Edge / max band (remote in context of Lahore)
      { name: "Fort Abbas", code: "FBA", shippingCost: MAX },
    ],
  },

  // Sindh
  {
    id: 2,
    province_name: "Sindh",
    province_code: "SD",
    cities: [
      // HUB (origin)
      { name: "Karachi", code: "KHI", shippingCost: FREE },

      // Nearby / low
      { name: "Hyderabad", code: "HYD", shippingCost: NEAR },
      { name: "Jamshoro", code: "JMR", shippingCost: NEAR },
      { name: "Kotri", code: "KTR", shippingCost: NEAR },
      { name: "Thatta", code: "THT", shippingCost: NEAR },
      { name: "Tando Allahyar", code: "TAY", shippingCost: NEAR },

      // Mid
      { name: "Nawabshah", code: "NWS", shippingCost: MID },
      { name: "Mirpur Khas", code: "MPS", shippingCost: MID },
      { name: "Badin", code: "BDN", shippingCost: MID },

      // Far inside Sindh
      { name: "Sukkur", code: "SKZ", shippingCost: FAR },
      { name: "Larkana", code: "LRK", shippingCost: FAR },
      { name: "Khairpur", code: "KHP", shippingCost: FAR },
      { name: "Shikarpur", code: "SKP2", shippingCost: FAR },

      // Edge / near other provinces
      { name: "Jacobabad", code: "JCD", shippingCost: MAX },
      { name: "Kandhkot", code: "KDK", shippingCost: MAX },
      { name: "Ghotki", code: "GTK", shippingCost: MAX },
    ],
  },

  // Khyber Pakhtunkhwa
  {
    id: 3,
    province_name: "Khyber Pakhtunkhwa",
    province_code: "KP",
    cities: [
      // HUB (origin)
      { name: "Peshawar", code: "PEW", shippingCost: FREE },

      // Nearby / low
      { name: "Charsadda", code: "CHD", shippingCost: NEAR },
      { name: "Mardan", code: "MRD", shippingCost: NEAR },
      { name: "Nowshera", code: "NSH", shippingCost: NEAR },
      { name: "Chakdara", code: "CKD", shippingCost: NEAR },

      // Mid
      { name: "Swabi", code: "SWB", shippingCost: MID },
      { name: "Abbottabad", code: "ABB", shippingCost: MID },
      { name: "Haripur", code: "HRP", shippingCost: MID },
      { name: "Kohat", code: "KHT", shippingCost: MID },

      // Far within KP
      { name: "Dera Ismail Khan", code: "DIK", shippingCost: FAR },
      { name: "Bannu", code: "BNN", shippingCost: FAR },
      { name: "Lakki Marwat", code: "LKM", shippingCost: FAR },
      { name: "Mansehra", code: "MSH", shippingCost: FAR },

      // Remote / max band
      { name: "Chitral", code: "CHT", shippingCost: MAX },
      { name: "Dir", code: "DIR", shippingCost: MAX },
      { name: "Swat (Mingora)", code: "MWR", shippingCost: MAX },
    ],
  },

  // Balochistan
  {
    id: 4,
    province_name: "Balochistan",
    province_code: "BL",
    cities: [
      // HUB (origin)
      { name: "Quetta", code: "UET", shippingCost: FREE },

      // Nearby / low
      { name: "Pishin", code: "PSN", shippingCost: NEAR },
      { name: "Chaman", code: "CHM", shippingCost: NEAR },
      { name: "Kuchlak", code: "KCK", shippingCost: NEAR },

      // Mid
      { name: "Mastung", code: "MSG", shippingCost: MID },
      { name: "Zhob", code: "ZHB", shippingCost: MID },
      { name: "Loralai", code: "LOR", shippingCost: MID },

      // Far
      { name: "Sibi", code: "SBI", shippingCost: FAR },
      { name: "Khuzdar", code: "KZD", shippingCost: FAR },
      { name: "Dera Murad Jamali", code: "DMJ", shippingCost: FAR },

      // Very far / coastal & border
      { name: "Gwadar", code: "GWD", shippingCost: MAX },
      { name: "Turbat", code: "TBT", shippingCost: MAX },
      { name: "Panjgur", code: "PNJ", shippingCost: MAX },
    ],
  },

  // Islamabad Capital Territory
  {
    id: 5,
    province_name: "Islamabad Capital Territory",
    province_code: "ICT",
    cities: [
      { name: "Islamabad", code: "ISB", shippingCost: FAR }, // far from all four hubs
    ],
  },

  // Azad Jammu & Kashmir
  {
    id: 6,
    province_name: "Azad Jammu and Kashmir",
    province_code: "AJK",
    cities: [
      { name: "Muzaffarabad", code: "MZD", shippingCost: FAR },
      { name: "Mirpur", code: "MPR", shippingCost: FAR },
      { name: "Kotli", code: "KTL", shippingCost: FAR },
      { name: "Rawalakot", code: "RKT", shippingCost: MAX },
    ],
  },

  // Gilgit‑Baltistan
  {
    id: 7,
    province_name: "Gilgit-Baltistan",
    province_code: "GB",
    cities: [
      { name: "Gilgit", code: "GIL", shippingCost: MAX },
      { name: "Skardu", code: "SKD", shippingCost: MAX },
      { name: "Hunza", code: "HNZ", shippingCost: MAX },
    ],
  },
];
