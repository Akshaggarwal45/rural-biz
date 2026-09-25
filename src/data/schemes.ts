export interface GovernmentScheme {
  id: string;
  name: string;
  shortName: string;
  category: 'loan' | 'subsidy' | 'grant' | 'shg';
  level: 'central' | 'state';
  applicableStates: string[]; // 'all' or state keys like 'up', 'bihar', etc.
  locationTypes: ('rural' | 'semi' | 'urban')[];
  maxLoan: number;
  subsidyRate: {
    ruralSpecial?: string;
    ruralGeneral?: string;
    urbanSpecial?: string;
    urbanGeneral?: string;
    flat?: string;
  };
  interestRate?: string;
  description: string;
  keyBenefits: string[];
  conditions: string[];
  requiredDocuments: string[];
  targetSectors: string[]; // 'dairy', 'poultry', 'grocery', 'tailoring', 'food', 'agriculture', 'transport', 'mobile', 'beekeeping', 'general'
  priorityGroups: string[];
  officialPortal: string;
  portalName: string;
  nodalAgency: string;
  isLatest2025: boolean;
}

export const INDIAN_STATES: { id: string; name: string }[] = [
  { id: 'all', name: 'All India (Central Schemes)' },
  { id: 'up', name: 'Uttar Pradesh' },
  { id: 'bihar', name: 'Bihar' },
  { id: 'mp', name: 'Madhya Pradesh' },
  { id: 'rajasthan', name: 'Rajasthan' },
  { id: 'maharashtra', name: 'Maharashtra' },
  { id: 'gujarat', name: 'Gujarat' },
  { id: 'karnataka', name: 'Karnataka' },
  { id: 'tamilnadu', name: 'Tamil Nadu' },
  { id: 'telangana', name: 'Telangana' },
  { id: 'ap', name: 'Andhra Pradesh' },
  { id: 'wb', name: 'West Bengal' },
  { id: 'odisha', name: 'Odisha' },
  { id: 'jharkhand', name: 'Jharkhand' },
  { id: 'chhattisgarh', name: 'Chhattisgarh' },
  { id: 'haryana', name: 'Haryana' },
  { id: 'punjab', name: 'Punjab' },
  { id: 'kerala', name: 'Kerala' },
  { id: 'assam', name: 'Assam' },
  { id: 'uttarakhand', name: 'Uttarakhand' },
  { id: 'hp', name: 'Himachal Pradesh' },
  { id: 'jk', name: 'Jammu & Kashmir' },
  { id: 'other', name: 'Other States & UTs' },
];

export const SCHEMES_DATABASE: GovernmentScheme[] = [
  // 1. PMEGP (Enhanced Guidelines)
  {
    id: 'pmegp',
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    shortName: 'PMEGP',
    category: 'subsidy',
    level: 'central',
    applicableStates: ['all'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 5000000,
    subsidyRate: {
      ruralSpecial: '35% (SC/ST/OBC/Women/Minority/PH in Rural)',
      ruralGeneral: '25% (General Category in Rural)',
      urbanSpecial: '25% (Special Categories in Urban)',
      urbanGeneral: '15% (General Category in Urban)',
    },
    interestRate: 'Normal bank lending rate (Subsidy deposited upfront in TDR for 3 yrs)',
    description: 'Credit-linked subsidy scheme by Ministry of MSME to establish micro-enterprises in non-farm sectors. Rural locations receive significantly higher subsidy (up to 35%) compared to urban locations (15-25%).',
    keyBenefits: [
      'Project cost up to ₹50 Lakh for Manufacturing and ₹20 Lakh for Service sectors',
      'Own contribution is only 5% for SC/ST/Women/OBC/Rural and 10% for General',
      'Subsidized Margin Money credited directly after sanction',
      'Second loan up to ₹1 Crore for existing well-performing units with 15-20% subsidy',
    ],
    conditions: [
      'Age 18+ years with minimum 8th class pass for projects above ₹10 Lakh (Mfg) / ₹5 Lakh (Service)',
      'New greenfield project only (not for expansion of existing registered units)',
      'Should not have availed financial subsidy under any other central/state scheme earlier',
      'Project report and score-card checklist through PMEGP e-portal',
    ],
    requiredDocuments: [
      'Aadhaar Card & PAN Card',
      'Detailed Project Report (DPR) with cost breakdown',
      'Educational Qualification Certificate (8th / 10th / 12th / Degree)',
      'Category / Caste Certificate (for SC/ST/OBC/Minority/PH claim)',
      'Rural Area Certificate from Gram Panchayat / Block Development Officer (mandatory for 35% subsidy)',
      'Proof of business premises (Rent agreement / Land ownership / Consent)',
    ],
    targetSectors: ['manufacturing', 'food', 'tailoring', 'retail', 'services', 'dairy', 'grocery', 'transport'],
    priorityGroups: ['Rural Youth', 'Women Entrepreneurs', 'SC/ST/OBC', 'Ex-Servicemen', 'Differently-abled'],
    officialPortal: 'https://www.kviconline.gov.in/pmegpep/pmegpweb/index.jsp',
    portalName: 'KVIC PMEGP e-Portal',
    nodalAgency: 'Khadi & Village Industries Commission (KVIC) / DIC',
    isLatest2025: true,
  },

  // 2. PM Vishwakarma Yojana
  {
    id: 'pmvishwakarma',
    name: 'PM Vishwakarma Scheme',
    shortName: 'PM Vishwakarma',
    category: 'loan',
    level: 'central',
    applicableStates: ['all'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 300000,
    subsidyRate: {
      flat: '₹15,000 E-Voucher Toolkit Grant + 8% Interest Subvention (Effective 5% Fixed Interest)',
    },
    interestRate: 'Concessional 5% fixed (Govt provides up to 8% interest subvention)',
    description: 'Flagship Central Government initiative supporting traditional artisans, craftsmen, tailors, carpenters, and cobblers across rural and urban India with modern toolkit grants, skill training stipends, and collateral-free institutional credit.',
    keyBenefits: [
      'Collateral-free enterprise loan: Tranche 1 of ₹1,00,000 (18 mo) and Tranche 2 of ₹2,00,000 (30 mo)',
      'Ultra-low 5% interest rate with no guarantee fee',
      '₹15,000 modern toolkit incentive credited directly to bank account / digital voucher',
      '5-7 days basic training with ₹500/day daily stipend + PM Vishwakarma ID card',
      '₹1 per digital transaction incentive (up to 100 transactions/month)',
    ],
    conditions: [
      'Must practice one of the 18 eligible traditional family trades (Tailor/Darzi, Carpenter, Blacksmith, Potter, Cobbler, Basket/Mat/Broom maker, Mason, Barber, Garland maker, Washerman, etc.)',
      'Minimum age 18 years on the date of application',
      'Must not have availed credit under similar central credit schemes (PMEGP, PM SVANidhi, MUDRA) in last 5 years',
      'Registration requires biometric authentication at nearest CSC (Common Service Centre)',
    ],
    requiredDocuments: [
      'Aadhaar Card linked to active Mobile Number',
      'Bank Account passbook or cancelled cheque',
      'Ration Card / Family details',
      'Trade skill self-declaration',
    ],
    targetSectors: ['tailoring', 'crafts', 'services', 'manufacturing'],
    priorityGroups: ['Artisans', 'Craftsmen', 'Tailors', 'Rural Workers', 'Self-employed Youth'],
    officialPortal: 'https://pmvishwakarma.gov.in/',
    portalName: 'PM Vishwakarma Official Portal',
    nodalAgency: 'Ministry of MSME & Ministry of Skill Development',
    isLatest2025: true,
  },

  // 3. MUDRA Yojana
  {
    id: 'mudra',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    shortName: 'PM MUDRA',
    category: 'loan',
    level: 'central',
    applicableStates: ['all'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 2000000,
    subsidyRate: {
      flat: '100% Collateral-Free Bank Financing with CGFMU Credit Guarantee Cover',
    },
    interestRate: '8.5% to 11.5% (Depending on bank and category)',
    description: 'Loans up to ₹20 Lakh without collateral for micro and small enterprises. Covers four stages: Shishu (up to ₹50k), Kishore (₹50k-₹5L), Tarun (₹5L-₹10L), and Tarun Plus (up to ₹20L for entrepreneurs who previously settled Tarun loans).',
    keyBenefits: [
      'Zero collateral or third-party guarantee required',
      'Zero processing fee for Shishu and Kishore categories',
      'Mudra Debit Card issued for seamless working capital withdrawals',
      'Available across all Public Sector Banks, Regional Rural Banks (RRBs), and NBFCs',
    ],
    conditions: [
      'Non-farm enterprise engaged in manufacturing, trading, or service activities (allied agriculture like dairy/poultry also covered)',
      'Applicant must not be a wilful defaulter in any bank or financial institution',
      'Satisfactory credit bureau score (CIBIL/Equifax)',
    ],
    requiredDocuments: [
      'Identity & Address Proof (Aadhaar, Voter ID, Driving License)',
      'Passport size photographs',
      'Quotations of machinery or items to be purchased',
      'Business address proof & Udyam Registration (for loans above ₹50k)',
      'Bank statement of past 6 months',
    ],
    targetSectors: ['grocery', 'tailoring', 'transport', 'mobile', 'food', 'dairy', 'poultry', 'vegetable', 'services'],
    priorityGroups: ['Micro Entrepreneurs', 'Shopkeepers', 'Fruit/Vegetable vendors', 'Small Truck/Auto operators'],
    officialPortal: 'https://www.jansamarth.in/business-loan-pradhan-mantri-mudra-yojana-scheme',
    portalName: 'JanSamarth National Portal',
    nodalAgency: 'MUDRA / Department of Financial Services (DFS)',
    isLatest2025: true,
  },

  // 4. Stand-Up India
  {
    id: 'standup',
    name: 'Stand-Up India Scheme',
    shortName: 'Stand-Up India',
    category: 'loan',
    level: 'central',
    applicableStates: ['all'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 10000000,
    subsidyRate: {
      flat: 'Composite Loan (Term Loan + Working Capital) with State Subsidy Convergence',
    },
    interestRate: 'Lowest applicable rate of the bank (MCLR + 3% + Tenor Premium)',
    description: 'Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.',
    keyBenefits: [
      'Substantial capital access from ₹10 Lakh up to ₹1 Crore',
      'Margin money requirement reduced to 15% (can be clubbed with state subsidies)',
      'Repayment tenure up to 7 years with an 18-month moratorium period',
      'Covers Manufacturing, Services, Trading, and Agri-allied activities (Dairy, Poultry, Fisheries, Polyhouse)',
    ],
    conditions: [
      'Borrower must be a Woman or SC/ST entrepreneur',
      'Greenfield enterprise only (first-time venture in the chosen sector)',
      'In case of non-individual enterprise, at least 51% shareholding & controlling stake must be held by SC/ST and/or Woman',
    ],
    requiredDocuments: [
      'Proof of Identity & Address (Aadhaar / Voter ID)',
      'Caste Certificate (for SC/ST category candidates)',
      'Comprehensive Project Report showing financial viability and balance sheets',
      'Pollution NOC / Industrial licenses if required for the manufacturing unit',
      'Bank statements and asset/liability declaration',
    ],
    targetSectors: ['manufacturing', 'food', 'dairy', 'transport', 'grocery', 'services'],
    priorityGroups: ['Women Entrepreneurs', 'SC/ST Founders', 'First-time Business Owners'],
    officialPortal: 'https://www.standupmitra.in/',
    portalName: 'Stand-Up Mitra Portal',
    nodalAgency: 'SIDBI / Department of Financial Services',
    isLatest2025: true,
  },

  // 5. DAY-NRLM / Lakhpati Didi
  {
    id: 'nrlm',
    name: 'Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (DAY-NRLM)',
    shortName: 'DAY-NRLM (Aajeevika)',
    category: 'shg',
    level: 'central',
    applicableStates: ['all'],
    locationTypes: ['rural'],
    maxLoan: 2000000,
    subsidyRate: {
      ruralSpecial: 'Revolving Fund (₹20,000-₹30,000) + Community Investment Fund + Subsidized 7% Loan (down to 4% with prompt repayment)',
    },
    interestRate: '7% p.a. with 3% interest subvention for timely repayment (effective 4%)',
    description: 'Government program promoting self-employment and poverty reduction in rural India by organizing rural women into Self Help Groups (SHGs) and empowering them as "Lakhpati Didis" with seed capital, training, and low-cost bank loans.',
    keyBenefits: [
      'Collateral-free bank loans up to ₹10-₹20 Lakh for active SHGs',
      'Revolving fund & Community Investment Fund (CIF) for immediate business assets',
      'Subsidized 4% interest rate on prompt repayment',
      'Dedicated market linkage and stalls in SARAS fairs and rural haats',
    ],
    conditions: [
      'Must be an active member of a registered Rural Self Help Group (SHG)',
      'SHG must follow Panchasutra (Regular meetings, Regular savings, Regular inter-loaning, Timely repayment, Up-to-date bookkeeping)',
      'Strictly applicable to Rural Village and Block level residents',
    ],
    requiredDocuments: [
      'Aadhaar card of member & SHG resolution copy',
      'SHG bank passbook with minimum 6 months transaction history',
      'Micro Credit Plan (MCP) prepared by the SHG group',
    ],
    targetSectors: ['dairy', 'poultry', 'tailoring', 'vegetable', 'beekeeping', 'food'],
    priorityGroups: ['Rural Women', 'Lakhpati Didi Candidates', 'Marginalized Households'],
    officialPortal: 'https://nrlm.gov.in/',
    portalName: 'National Rural Livelihoods Portal',
    nodalAgency: 'Ministry of Rural Development',
    isLatest2025: true,
  },

  // 6. PMFME (Food Processing)
  {
    id: 'pmfme',
    name: 'PM Formalisation of Micro Food Processing Enterprises (PMFME)',
    shortName: 'PMFME Scheme',
    category: 'subsidy',
    level: 'central',
    applicableStates: ['all'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 3500000,
    subsidyRate: {
      flat: '35% Credit-Linked Capital Subsidy (Maximum ₹10 Lakh per enterprise)',
    },
    interestRate: 'Normal bank commercial loan rate with capital subsidy credited to beneficiary account',
    description: 'Under Atmanirbhar Bharat Abhiyan, this scheme upgrades individual micro food enterprises (pickles, spices, papads, flour mills, dairy sweets, bakery, honey, oil extraction) and aligns with One District One Product (ODOP) focus.',
    keyBenefits: [
      '35% direct capital subsidy on plant and machinery up to ₹10 Lakh',
      'Seed capital of ₹40,000 per SHG member for working capital and minor tools',
      '50% grant for branding, marketing, and packaging support for FPOs / Cooperatives',
      'Free technical training and FSSAI license registration assistance',
    ],
    conditions: [
      'Existing micro food processing unit or new venture under ODOP / allied food lines',
      'Beneficiary must be 18+ years old, minimum 8th standard pass',
      'Own contribution minimum 10% of total project cost',
    ],
    requiredDocuments: [
      'Aadhaar, PAN & Electricity bill of premises',
      'Detailed Project Report (DPR) with machinery invoices',
      'FSSAI registration or declaration to apply',
      'Udyam Registration certificate',
    ],
    targetSectors: ['food', 'beekeeping', 'dairy'],
    priorityGroups: ['Food Artisans', 'SHG Kitchens', 'Farmer Producer Groups (FPOs)', 'Agri-preneurs'],
    officialPortal: 'https://pmfme.mofpi.gov.in/',
    portalName: 'PMFME National Portal',
    nodalAgency: 'Ministry of Food Processing Industries (MoFPI)',
    isLatest2025: true,
  },

  // 7. National Livestock Mission (NLM)
  {
    id: 'nlm',
    name: 'National Livestock Mission (NLM) - Poultry, Sheep & Goat Entrepreneurship',
    shortName: 'National Livestock Mission',
    category: 'subsidy',
    level: 'central',
    applicableStates: ['all'],
    locationTypes: ['rural', 'semi'],
    maxLoan: 5000000,
    subsidyRate: {
      ruralSpecial: '50% Capital Subsidy (Up to ₹50 Lakh for Goat/Sheep Breeding, ₹25 Lakh for Poultry Hatchery)',
      ruralGeneral: '50% Capital Subsidy',
    },
    interestRate: 'Bank lending rate with direct 50% capital subsidy back-ended by SIDBI',
    description: 'Provides massive 50% capital subsidy to individuals, SHGs, FPOs, and cooperatives to set up parent breeding farms for goats, sheep, rural poultry brooders, and silage fodder production units in rural regions.',
    keyBenefits: [
      'Direct 50% capital subsidy up to ₹50 Lakh for 500+25 goat/sheep breeding farms',
      'Up to ₹25 Lakh subsidy for 1,000 parent broiler/layer poultry hatcheries',
      'Subsidy released in two tranches through SIDBI',
      'State Animal Husbandry Department provides veterinary and vaccine support',
    ],
    conditions: [
      'Applicant must possess adequate land (owned or leased for minimum 10 years)',
      'Training certificate in animal husbandry / poultry farming from recognized institute',
      'Bank sanction letter for minimum 50% loan or proof of margin funding',
    ],
    requiredDocuments: [
      'Land revenue records / Registered lease deed',
      'Animal Husbandry training certificate',
      'Detailed Project Report prepared by certified veterinary / CA consultant',
      'Bank approval letter and KYC documents',
    ],
    targetSectors: ['dairy', 'poultry'],
    priorityGroups: ['Rural Livestock Keepers', 'Farmers', 'Agri-graduates', 'FPOs'],
    officialPortal: 'https://nlm.udyamimitra.in/',
    portalName: 'NLM Udyami Mitra Portal',
    nodalAgency: 'Department of Animal Husbandry & Dairying (DAHD)',
    isLatest2025: true,
  },

  // 8. SMAM (Sub-Mission on Agricultural Mechanization)
  {
    id: 'smam',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    shortName: 'SMAM Farm Machinery Subsidy',
    category: 'subsidy',
    level: 'central',
    applicableStates: ['all'],
    locationTypes: ['rural'],
    maxLoan: 2500000,
    subsidyRate: {
      ruralSpecial: '50% Subsidy for SC/ST/Small & Marginal Farmers/Women (Up to 80% for Custom Hiring Centres)',
      ruralGeneral: '40% Subsidy for General category farmers',
    },
    description: 'Promotes agricultural mechanization in rural areas by subsidizing tractors, power tillers, rotavators, seed drills, and setting up village Custom Hiring Centers (CHC) for farm equipment rental.',
    keyBenefits: [
      '40% to 50% direct subsidy on individual farm machines',
      'Up to 80% subsidy (max ₹8-10 Lakh) to set up village Custom Hiring Centre (CHC)',
      'Equipment geo-tagging ensures transparency and fast DBT subsidy transfer',
    ],
    conditions: [
      'Must have agricultural land records in applicant’s name (Khasra/Khatauni/7/12)',
      'Only one equipment per category in a 3-year period per beneficiary',
      'Equipment must be purchased from an authorized government-empaneled manufacturer',
    ],
    requiredDocuments: [
      'Aadhaar card & Land ownership records (ROR/Patta)',
      'Bank passbook copy linked with Aadhaar',
      'Dealer quotation of equipment with chassis/engine details',
    ],
    targetSectors: ['agriculture', 'transport'],
    priorityGroups: ['Small & Marginal Farmers', 'Rural Youth CHC operators', 'Women Farmers'],
    officialPortal: 'https://agrimachinery.nic.in/',
    portalName: 'FarMech SMAM DBT Portal',
    nodalAgency: 'Ministry of Agriculture & Farmers Welfare',
    isLatest2025: true,
  },

  // STATE-SPECIFIC SCHEMES
  // Uttar Pradesh
  {
    id: 'up-mmysy',
    name: 'UP Mukhyamantri Yuva Swarojgar Yojana (MMYSY)',
    shortName: 'UP Yuva Swarojgar',
    category: 'subsidy',
    level: 'state',
    applicableStates: ['up'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 2500000,
    subsidyRate: {
      ruralSpecial: '25% Margin Money Subsidy (Max ₹6.25 Lakh for Industry, ₹2.5 Lakh for Service)',
      ruralGeneral: '25% Margin Money Subsidy',
    },
    interestRate: 'Bank lending rate with 25% non-refundable margin subsidy from UP state govt',
    description: 'Flagship Uttar Pradesh government scheme offering unemployed youth collateral-friendly bank loans up to ₹25 Lakh for manufacturing and ₹10 Lakh for service units with a 25% state margin money subsidy.',
    keyBenefits: [
      'Up to ₹25 Lakh loan for industrial/manufacturing units',
      'Up to ₹10 Lakh for service/retail shop units',
      '25% margin money subsidy converts into grant after 2 years of successful business operation',
      'District Industry Centre (DIC) guides the entire process',
    ],
    conditions: [
      'Permanent resident of Uttar Pradesh aged between 18 and 40 years',
      'Minimum educational qualification: High School (10th) pass',
      'Applicant should not be a defaulter of any financial institution or earlier government scheme',
    ],
    requiredDocuments: [
      'UP Domicile / Residence Certificate (Niwas Praman Patra)',
      '10th Marksheet / Passing certificate',
      'Detailed Project Report (DPR)',
      'Aadhaar Card, PAN, and Bank passbook',
    ],
    targetSectors: ['manufacturing', 'food', 'tailoring', 'grocery', 'mobile', 'services', 'dairy'],
    priorityGroups: ['UP Youth', 'Unemployed Matriculates', 'Rural Micro-enterprises'],
    officialPortal: 'https://diupmsme.upsdc.gov.in/',
    portalName: 'UP DIUP MSME Portal',
    nodalAgency: 'Directorate of Industries, Uttar Pradesh',
    isLatest2025: true,
  },
  {
    id: 'up-odop',
    name: 'UP One District One Product (ODOP) Margin Money Scheme',
    shortName: 'UP ODOP Margin Money',
    category: 'subsidy',
    level: 'state',
    applicableStates: ['up'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 5000000,
    subsidyRate: {
      flat: '10% to 25% Margin Money Subsidy (Up to ₹20 Lakh depending on project cost)',
    },
    description: 'Promotes indigenous, specialized products in each of Uttar Pradesh’s 75 districts (e.g. Leather in Agra/Kanpur, Chikankari in Lucknow, Terracotta in Gorakhpur, Wood craft in Saharanpur, Brassware in Moradabad, Perfumes in Kannauj).',
    keyBenefits: [
      '25% subsidy for projects up to ₹25 Lakh',
      '20% subsidy for projects from ₹25 Lakh to ₹50 Lakh',
      '10% subsidy (max ₹20 Lakh) for projects from ₹50 Lakh to ₹5 Crore',
      'Free skill development training and design upgrade toolkit',
    ],
    conditions: [
      'Resident of Uttar Pradesh operating in the designated ODOP product of the district',
      'Age 18+ years with no prior institutional default',
    ],
    requiredDocuments: [
      'UP Domicile Certificate',
      'Aadhaar, PAN & Bank Details',
      'ODOP business proposal for district-specific product',
    ],
    targetSectors: ['crafts', 'manufacturing', 'food', 'tailoring'],
    priorityGroups: ['Traditional Artisans', 'District Craft Producers', 'Rural Micro-entrepreneurs'],
    officialPortal: 'https://odopup.in/',
    portalName: 'UP ODOP Official Portal',
    nodalAgency: 'UP MSME & Export Promotion Department',
    isLatest2025: true,
  },

  // Bihar
  {
    id: 'bihar-udyami',
    name: 'Mukhyamantri Udyami Yojana (SC/ST/EBC/Mahila/Yuva)',
    shortName: 'Bihar Mukhyamantri Udyami',
    category: 'grant',
    level: 'state',
    applicableStates: ['bihar'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 1000000,
    subsidyRate: {
      flat: '50% Direct Grant (₹5,00,000 Non-refundable) + 50% Interest-free / 1% soft loan (₹5,00,000)',
    },
    interestRate: '0% Interest for Women, SC/ST, and EBC; Only 1% simple interest for General/OBC Yuva',
    description: 'One of India’s most generous entrepreneurship initiatives: Bihar Government provides ₹10 Lakh total package (₹5 Lakh as 100% grant and ₹5 Lakh as interest-free loan repaid in 84 easy monthly installments).',
    keyBenefits: [
      '₹5 Lakh is completely free grant / subsidy',
      'Remaining ₹5 Lakh is interest-free (0% interest for women and SC/ST) repayable over 7 years in 84 EMIs',
      '₹25,000 additional reimbursement for training and enterprise setup',
      'Covers 50+ pre-approved project templates (Flour mill, Poultry feed, Dairy products, Readymade garments, Fabrication, etc.)',
    ],
    conditions: [
      'Permanent resident of Bihar, aged 18 to 50 years',
      'Minimum qualification: 10+2 / Intermediate, ITI, Polytechnic diploma, or equivalent',
      'Individual proprietor firm or partnership with current bank account in firm name',
    ],
    requiredDocuments: [
      'Bihar Domicile (Awasiya) Certificate',
      'Caste Certificate (Jati Praman Patra)',
      'Intermediate / 10+2 passing certificate',
      'Current Bank Account statement or cancelled cheque',
      'Aadhaar, PAN, and signature scan',
    ],
    targetSectors: ['manufacturing', 'food', 'tailoring', 'services', 'dairy'],
    priorityGroups: ['Bihar Youth', 'Women', 'SC/ST/EBC Applicants', 'Micro Innovators'],
    officialPortal: 'https://udyami.bihar.gov.in/',
    portalName: 'Bihar Udyami Portal',
    nodalAgency: 'Department of Industries, Government of Bihar',
    isLatest2025: true,
  },

  // Maharashtra
  {
    id: 'maha-cmegp',
    name: 'Chief Minister Employment Generation Programme (CMEGP)',
    shortName: 'Maharashtra CMEGP',
    category: 'subsidy',
    level: 'state',
    applicableStates: ['maharashtra'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 5000000,
    subsidyRate: {
      ruralSpecial: '35% Margin Money Subsidy (SC/ST/Women/Minority in Rural)',
      ruralGeneral: '25% Margin Money Subsidy in Rural',
      urbanSpecial: '25% in Urban areas',
      urbanGeneral: '15% in Urban areas',
    },
    interestRate: 'Bank lending rate with Maharashtra state margin subsidy',
    description: 'Maharashtra state government credit-linked subsidy initiative mirroring PMEGP to generate rural and semi-urban livelihoods, offering up to 35% subsidy on manufacturing projects up to ₹50 Lakh and service projects up to ₹20 Lakh.',
    keyBenefits: [
      'Project cost ceiling: ₹50 Lakh (Manufacturing) & ₹20 Lakh (Service)',
      'Substantial 35% margin money subsidy in rural Vidarbha, Marathwada, and Konkan regions',
      'Online application tracking via single-window MAHA-CMEGP portal',
    ],
    conditions: [
      'Resident of Maharashtra aged between 18 and 45 years (50 years for SC/ST/Women/Ex-servicemen)',
      'Minimum 7th standard pass for projects up to ₹10 Lakh; 10th pass for projects above ₹10 Lakh',
    ],
    requiredDocuments: [
      'Maharashtra Domicile Certificate',
      'Aadhaar, PAN & Educational proof',
      'Project Profile Report',
      'Caste certificate if applicable',
    ],
    targetSectors: ['manufacturing', 'food', 'dairy', 'grocery', 'services', 'tailoring'],
    priorityGroups: ['Maharashtra Youth', 'Rural Women', 'Unemployed Graduates'],
    officialPortal: 'https://maha-cmegp.gov.in/',
    portalName: 'Maha CMEGP Portal',
    nodalAgency: 'Directorate of Industries, Maharashtra',
    isLatest2025: true,
  },
  {
    id: 'maha-annasaheb',
    name: 'Annasaheb Patil Arthik-Magas Vikas Mahamandal Scheme',
    shortName: 'Annasaheb Patil Mahamandal',
    category: 'loan',
    level: 'state',
    applicableStates: ['maharashtra'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 1500000,
    subsidyRate: {
      flat: '100% Interest Subvention (Full interest up to 12% refunded by state government)',
    },
    interestRate: '0% Net Interest (Bank charges interest, Mahamandal refunds it into applicant account monthly)',
    description: 'Provides interest refund on bank loans up to ₹15 Lakh for educated unemployed youth from economically weaker and Maratha communities in Maharashtra.',
    keyBenefits: [
      'Up to ₹15 Lakh loan with 0% effective interest (up to ₹4.5 Lakh total interest reimbursed)',
      'Repayment tenure up to 5 years (60 installments)',
      'Supports retail shops, vehicles, clinic setup, small restaurants, and fabrication',
    ],
    conditions: [
      'Resident of Maharashtra aged 18 to 45 years',
      'Annual family income ceiling applies',
      'Must have approved bank loan from participating bank',
    ],
    requiredDocuments: [
      'Aadhaar, PAN, and Maharashtra Domicile',
      'Income Certificate (Tahsildar)',
      'Bank Sanction Letter and repayment schedule',
    ],
    targetSectors: ['grocery', 'transport', 'mobile', 'services', 'retail'],
    priorityGroups: ['Unemployed Youth in Maharashtra', 'Self-employed Entrepreneurs'],
    officialPortal: 'https://mumbaicity.gov.in/scheme/annasaheb-patil-arthik-magas-vikas-mahamandal-maryadit/',
    portalName: 'Annasaheb Patil Portal',
    nodalAgency: 'Government of Maharashtra',
    isLatest2025: true,
  },

  // Rajasthan
  {
    id: 'raj-mlupy',
    name: 'Mukhyamantri Laghu Udyog Protsahan Yojana (MLUPY)',
    shortName: 'Rajasthan MLUPY',
    category: 'subsidy',
    level: 'state',
    applicableStates: ['rajasthan'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 100000000,
    subsidyRate: {
      flat: '8% Interest Subsidy for loans up to ₹25 Lakh; 6% up to ₹5 Crore; 5% up to ₹10 Crore',
    },
    interestRate: '8% interest subvention for 5 years on loans up to ₹25 Lakh',
    description: 'Rajasthan government scheme to facilitate easy loans through banks for setting up new manufacturing, service, or retail enterprises and expanding existing ones, with an extraordinary 8% interest subsidy.',
    keyBenefits: [
      'Up to ₹25 Lakh loans receive 8% interest rebate for 5 full years',
      'Available for Composite loan, Term loan, and Working capital (Cash Credit limit)',
      'Covers trade/retail shops, artisan crafts, food units, and rural agro-enterprises',
    ],
    conditions: [
      'Resident of Rajasthan aged 18 years or above',
      'Applies to newly established enterprises as well as modernizing existing enterprises',
    ],
    requiredDocuments: [
      'Aadhaar, Jan Aadhaar card of Rajasthan',
      'Project proposal & Udyam registration',
      'Bank application form',
    ],
    targetSectors: ['manufacturing', 'food', 'grocery', 'tailoring', 'dairy', 'services'],
    priorityGroups: ['Rajasthan Entrepreneurs', 'Rural Traders', 'Youth'],
    officialPortal: 'https://rajasthan.gov.in/',
    portalName: 'Rajasthan Single Window / MLUPY',
    nodalAgency: 'Department of Industries and Commerce, Rajasthan',
    isLatest2025: true,
  },

  // Madhya Pradesh
  {
    id: 'mp-udyami',
    name: 'Mukhyamantri Udyam Kranti Yojana (MMUKY)',
    shortName: 'MP Udyam Kranti',
    category: 'subsidy',
    level: 'state',
    applicableStates: ['mp'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 5000000,
    subsidyRate: {
      flat: '3% Interest Subvention per annum for 7 years + 100% Credit Guarantee Fee (CGTMSE)',
    },
    interestRate: 'Reduced interest rate via 3% direct subsidy paid by MP Government',
    description: 'Provides collateral-free loans from ₹1 Lakh to ₹50 Lakh for manufacturing and ₹1 Lakh to ₹25 Lakh for service/retail businesses, with 3% annual interest subsidy and complete credit guarantee coverage.',
    keyBenefits: [
      'No collateral needed (CGTMSE fee borne by MP State Govt)',
      '3% interest subsidy paid directly to your loan account every year for 7 years',
      'Fast sanction through MP Samast Portal',
    ],
    conditions: [
      'Permanent resident of Madhya Pradesh aged 18 to 45 years',
      'Minimum educational qualification: 12th (Higher Secondary) pass',
      'Family annual income must not exceed ₹12 Lakh',
    ],
    requiredDocuments: [
      'MP Domicile Certificate & Samagra ID',
      '12th Marksheet',
      'Aadhaar, PAN & Project Report',
    ],
    targetSectors: ['manufacturing', 'services', 'food', 'tailoring', 'grocery', 'dairy'],
    priorityGroups: ['MP Youth', 'Educated Unemployed', 'Rural Entrepreneurs'],
    officialPortal: 'https://samast.mponline.gov.in/',
    portalName: 'MP Samast Udyam Kranti Portal',
    nodalAgency: 'Micro, Small and Medium Enterprises Department, MP',
    isLatest2025: true,
  },

  // Tamil Nadu
  {
    id: 'tn-uyegp',
    name: 'Unemployed Youth Employment Generation Programme (UYEGP)',
    shortName: 'Tamil Nadu UYEGP',
    category: 'subsidy',
    level: 'state',
    applicableStates: ['tamilnadu'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 1500000,
    subsidyRate: {
      flat: '25% Individual Capital Subsidy (Maximum ₹1,25,000)',
    },
    description: 'Tamil Nadu government scheme to mitigate rural and urban unemployment by assisting youth to establish manufacturing, service, and business enterprises with 25% subsidy.',
    keyBenefits: [
      'Project cost up to ₹15 Lakh for Manufacturing, ₹5 Lakh for Service, and ₹5 Lakh for Business',
      '25% state subsidy credited directly to your bank account',
      'Own promoter contribution is only 5% for special categories and 10% for general',
    ],
    conditions: [
      'Resident of Tamil Nadu for minimum 3 years, aged 18 to 35 years (45 for special categories)',
      'Minimum qualification: 8th standard pass',
      'Annual family income should not exceed ₹5,00,000',
    ],
    requiredDocuments: [
      'Nativity / Residence Certificate in Tamil Nadu',
      '8th or 10th Transfer Certificate / Marksheet',
      'Community Certificate & Project Report',
    ],
    targetSectors: ['manufacturing', 'food', 'tailoring', 'grocery', 'mobile', 'services'],
    priorityGroups: ['Tamil Nadu Youth', 'Women', 'Backward Classes'],
    officialPortal: 'https://msmeonline.tn.gov.in/uyegp/',
    portalName: 'Tamil Nadu MSME UYEGP Portal',
    nodalAgency: 'Department of Industries and Commerce, Tamil Nadu',
    isLatest2025: true,
  },

  // Karnataka
  {
    id: 'ka-swavalambana',
    name: 'Rajiv Gandhi Swavalambana Rozgar Yojana (RGSRY)',
    shortName: 'Karnataka Swavalambana',
    category: 'subsidy',
    level: 'state',
    applicableStates: ['karnataka'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 1000000,
    subsidyRate: {
      flat: '25% to 50% Subsidy on capital investments for SC/ST and backward classes',
    },
    description: 'Karnataka State scheme empowering rural artisans and small business aspirants to take up micro-enterprises with high state subsidy and institutional bank linkages.',
    keyBenefits: [
      'High subsidy percentage for marginalized categories',
      'Direct linkage through District Industrial Centre and Gram Panchayats',
      'Covers handlooms, food stalls, repair services, and poultry units',
    ],
    conditions: [
      'Permanent resident of Karnataka',
      'Age 18 to 45 years',
      'Income limit defined by respective development corporations',
    ],
    requiredDocuments: [
      'Karnataka Domicile / Ration card',
      'Caste and Income Certificate (Nadakacheri)',
      'Project estimation and bank account details',
    ],
    targetSectors: ['crafts', 'tailoring', 'grocery', 'dairy', 'services'],
    priorityGroups: ['Karnataka Youth', 'Rural Self-employed', 'Women'],
    officialPortal: 'https://karnataka.gov.in/',
    portalName: 'Karnataka State Portal / DIC',
    nodalAgency: 'Commerce and Industries Department, Karnataka',
    isLatest2025: true,
  },

  // West Bengal
  {
    id: 'wb-bhabishyat',
    name: 'Bhabishyat Credit Card Scheme (BCCS)',
    shortName: 'West Bengal Bhabishyat Credit Card',
    category: 'subsidy',
    level: 'state',
    applicableStates: ['wb'],
    locationTypes: ['rural', 'semi', 'urban'],
    maxLoan: 500000,
    subsidyRate: {
      flat: '10% Government Margin Money Subsidy (Max ₹25,000) + 85% Credit Guarantee',
    },
    description: 'West Bengal initiative enabling 2 lakh youth every year to set up micro-enterprises with collateral-free bank loans up to ₹5 Lakh, subsidized margin money, and 85% state credit guarantee.',
    keyBenefits: [
      'Loans up to ₹5 Lakh for manufacturing, service, or business',
      '10% direct margin grant from West Bengal State Government',
      '85% credit guarantee provided by the state government so banks do not demand collateral',
    ],
    conditions: [
      'Resident of West Bengal for at least 10 years, aged 18 to 45 years',
      'Only one member from a family is eligible',
    ],
    requiredDocuments: [
      'West Bengal Domicile Proof (Aadhaar / Voter ID)',
      'Project Profile and Bank passbook',
    ],
    targetSectors: ['grocery', 'tailoring', 'food', 'mobile', 'services', 'manufacturing'],
    priorityGroups: ['West Bengal Youth', 'Rural Self-employed'],
    officialPortal: 'https://bhabishyat.wb.gov.in/',
    portalName: 'Bhabishyat Portal WB',
    nodalAgency: 'Micro, Small & Medium Enterprises Department, West Bengal',
    isLatest2025: true,
  },
];

// Helper functions for matching
export function getSchemesForLocation(
  stateId: string,
  locationType: 'rural' | 'semi' | 'urban',
  sector?: string,
  searchQuery?: string
): GovernmentScheme[] {
  return SCHEMES_DATABASE.filter((scheme) => {
    // 1. State filter
    const matchesState =
      stateId === 'all' ||
      scheme.applicableStates.includes('all') ||
      scheme.applicableStates.includes(stateId);
    if (!matchesState) return false;

    // 2. Location filter (rural, semi, urban)
    const matchesLocation = scheme.locationTypes.includes(locationType);
    if (!matchesLocation) return false;

    // 3. Sector filter
    if (sector && sector !== 'all') {
      const matchesSector =
        scheme.targetSectors.includes('all') ||
        scheme.targetSectors.includes(sector) ||
        scheme.targetSectors.includes('general');
      if (!matchesSector) return false;
    }

    // 4. Search query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const inName = scheme.name.toLowerCase().includes(q) || scheme.shortName.toLowerCase().includes(q);
      const inDesc = scheme.description.toLowerCase().includes(q);
      const inNodal = scheme.nodalAgency.toLowerCase().includes(q);
      const inSector = scheme.targetSectors.some((s) => s.toLowerCase().includes(q));
      if (!inName && !inDesc && !inNodal && !inSector) return false;
    }

    return true;
  });
}
