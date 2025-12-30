import dotenv from 'dotenv'; // Note: You need the full import now

// Calculate the path to the project root directory
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The .env file is 3 levels up from the current file's directory:
// init.js -> Init/SE/init.js
// .env is in -> Simply-Saral_next/
const envPath = resolve(__dirname, '../../.env'); 

dotenv.config({ path: envPath });

import connection from "../../lib/conn.js";
import FW from "../../models/FarmerWelfare.js"

const data = [
  {
  title: "Kisan Credit Card (KCC) Scheme",
  shortName: "Kisan Credit Card",
  keyInfo: {
    duration: "5 years (renewable)",
    amount: "Credit limit based on scale of finance, land holding and cropping pattern",
    applyFrom: "August 1998",
    lastDate: "No fixed deadline — applications accepted throughout the year",
  },
  shortDescription:
    "A government-backed credit scheme that provides timely and adequate short-term and term loans to farmers for agricultural and allied activities through banks under a single-window system.",
  detailedDescription: [
    "The Kisan Credit Card (KCC) Scheme was introduced in 1998 to provide farmers with timely access to affordable institutional credit for agriculture and allied activities.",
    "The scheme covers short-term credit for crop cultivation, post-harvest expenses, household consumption needs, working capital for maintenance of farm assets, and term loans for agricultural investments.",
    "The scheme is implemented through Commercial Banks, Regional Rural Banks (RRBs), Cooperative Banks and Small Finance Banks across India.",
    "The credit limit under KCC is fixed by the bank based on land holding, cropping pattern, scale of finance and allied agricultural activities.",
  ],
  portalLink:
    "https://www.myscheme.gov.in/schemes/kcc",
  benefits: [
    "Provides affordable and timely credit support for crop production and allied agricultural activities.",
    "Single credit limit with flexible withdrawals and repayments, generally valid for five years subject to renewal.",
    "RuPay KCC debit card facility for easy cash withdrawal and digital transactions.",
    "Eligible farmers may receive interest subvention and prompt repayment incentives as per government guidelines.",
  ],
  eligibilityCriteria: [
    "Individual farmers who are owner cultivators.",
    "Tenant farmers, oral lessees and share croppers.",
    "Self-Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers.",
    "Farmers engaged in agriculture or allied activities requiring short-term or term credit.",
  ],
  nonEligible: [
    "Individuals not engaged in agriculture or allied farming activities.",
    "Applicants who do not satisfy bank credit norms or have serious loan defaults, as per bank policy.",
  ],
  requiredDocuments: [
    {
      name: "KCC Application Form",
      description: "Duly filled application form provided by the bank",
      image: "/public/Imges/common/application_form_kcc.pdf",
      officialLink: "https://www.myscheme.gov.in/schemes/kcc",
      videoGuide: "https://youtu.be/79uGBtYLvAE?si=UFk0Wciz9YGuR97w",
      importance: "High",
    },
    {
      name: "Identity Proof",
      description: "Aadhaar Card / Voter ID / Driving License / Passport",
      image: "/public/Imges/common/aadhar_card_sample.jpeg",
      officialLink: "https://www.myscheme.gov.in/schemes/kcc",
      videoGuide: "https://youtu.be/79uGBtYLvAE?si=UFk0Wciz9YGuR97w",
      importance: "High",
    },
     {
      name: "Aadhaar Card",
      description: "Valid Aadhaar card linked with bank account",
      image: "public/Imges/common/aadhar_card_sample.jpeg",
      officialLink: "https://uidai.gov.in/",
      videoGuide: "https://www.youtube.com/watch?app=desktop&v=ld-aM5DPVj8",
      importance: "High",
    },
    {
      name: "Land Ownership or Tenancy Documents",
      description: "Land records, lease agreement or certificate from competent authority",
      image: "/public/Imges/common/land_document_sample.jpg",
      officialLink: "https://dolr.gov.in/citizen-centric-services/",
      videoGuide: "https://youtu.be/gvV6B9EKf8M?si=YqnG_abzxqzKip3U",
      importance: "High",
    },
   {
      name: "Bank Account Details",
      description: "Bank passbook first page or cancelled cheque (Aadhaar-linked)",
      image: "public/Imges/common/bank_account_sample.jpg",
      officialLink: "https://sbi.bank.in/web/customer-care/m-passbook",
      videoGuide: "https://youtu.be/WmaXsYNvRhk?si=PiGdNj99QIEVj4cm",
      importance: "High",
    },
    {
      name: "Passport Size Photograph",
      description: "Recent photograph of the applicant",
      image: "public/Imges/common/photograph_sample.jpg",
      officialLink: "",
      videoGuide: "https://youtu.be/YfBiKLKCX0s?si=uPeBzz5h20gIcj6h",
      importance: "Medium",
    },
  ],
  applicationProcess: {
    online: [
      "Visit the official website of a participating bank.",
      "Go to the Agriculture Loans or Kisan Credit Card section.",
      "Fill in the online KCC application form or download and submit as instructed.",
      "Submit required details and wait for bank verification and approval.",
    ],
    offline: [
      "Visit the nearest branch of a participating bank.",
      "Collect and fill the Kisan Credit Card application form.",
      "Attach required documents and submit the application to the bank.",
      "Bank verifies documents and sanctions the credit limit if eligible.",
    ],
  },
  faqs: [
    {
      question: "Who can apply for the Kisan Credit Card?",
      answer:
        "Owner cultivators, tenant farmers, share croppers, oral lessees and SHGs/JLGs involved in agriculture or allied activities can apply.",
    },
    {
      question: "What purposes are covered under KCC?",
      answer:
        "Crop cultivation, post-harvest expenses, household consumption needs, working capital and investment in agricultural assets.",
    },
    {
      question: "Is there any interest subsidy under KCC?",
      answer:
        "Yes, interest subvention and prompt repayment incentives are available as per government norms.",
    },
    {
      question: "What is the validity of a Kisan Credit Card?",
      answer:
        "The KCC is generally valid for 5 years and is renewable subject to bank review.",
    },
  ],
  imageUrl: "/Images/farmer_welf/kisan_credit_card.jpg",
  launchedYear: 1998,
  category: "Agricultural Credit & Finance",
  detailedPage: "farmer_schemes",
  icon: "Banknote",
}
,
 {
  title: "Pradhan Mantri Krishi Sinchayee Yojana",
  shortName: "PMKSY",
  keyInfo: {
    duration: "Ongoing",
    amount: "Subsidy for micro-irrigation (Drip & Sprinkler)",
    applyFrom: "2015",
    lastDate: "As per state-wise phases / availability",
  },
  shortDescription:
    "A Government of India scheme to expand irrigation coverage and improve water-use efficiency in agriculture.",
  portalLink: "https://pmksy.gov.in",
  detailedDescription: [
    "Launched in 2015 with the objectives ‘Har Khet Ko Pani’ and ‘Per Drop More Crop’ to ensure assured irrigation and efficient water use.",
    "Implemented through components such as Accelerated Irrigation Benefit Programme (AIBP), Har Khet Ko Pani (HKKP), and Per Drop More Crop (PDMC).",
    "Under PDMC, farmers receive financial assistance for adoption of micro-irrigation systems like drip and sprinkler irrigation, implemented mainly through state agriculture departments.",
  ],
  benefits: [
    "Promotes efficient use of water resources and reduces wastage through micro-irrigation technologies.",
    "Provides subsidy support to farmers for installing drip and sprinkler irrigation systems.",
    "Helps increase crop productivity and income, especially in water-stressed and rain-fed areas.",
    "Encourages sustainable water management through convergence with watershed and irrigation projects.",
  ],
  eligibilityCriteria: [
    "Farmers owning or cultivating agricultural land in areas notified by the state under PMKSY components.",
    "Small and marginal farmers are given priority under micro-irrigation assistance.",
    "Eligibility and subsidy norms are subject to state-specific guidelines under PMKSY.",
  ],
  nonEligible: [
    "Applicants without valid land ownership or cultivation proof.",
    "Farmers who have already availed full subsidy for the same land and irrigation system under PMKSY or similar schemes.",
  ],
  requiredDocuments: [
    {
      name: "Aadhaar Card",
      description: "Valid Aadhaar card linked with bank account",
      image: "public/Imges/common/aadhar_card_sample.jpeg",
      officialLink: "https://uidai.gov.in/",
      videoGuide: "https://www.youtube.com/watch?app=desktop&v=ld-aM5DPVj8",
      importance: "High",
    },
    {
      name: "Land Ownership or Tenancy Documents",
      description: "Land records, lease agreement or certificate from competent authority",
      image: "/public/Imges/common/land_document_sample.jpg",
      officialLink: "https://dolr.gov.in/citizen-centric-services/",
      videoGuide: "https://youtu.be/gvV6B9EKf8M?si=YqnG_abzxqzKip3U",
      importance: "High",
    },
     {
      name: "Bank Account Details",
      description: "Bank passbook first page or cancelled cheque (Aadhaar-linked)",
      image: "public/Imges/common/bank_account_sample.jpg",
      officialLink: "https://sbi.bank.in/web/customer-care/m-passbook",
      videoGuide: "https://youtu.be/WmaXsYNvRhk?si=PiGdNj99QIEVj4cm",
      importance: "High",
    },
     {
      name: "Passport Size Photograph",
      description: "Recent photograph of the applicant",
      image: "public/Imges/common/photograph_sample.jpg",
      officialLink: "",
      videoGuide: "https://youtu.be/YfBiKLKCX0s?si=uPeBzz5h20gIcj6h",
      importance: "Medium",
    },
  ],
  applicationProcess: {
    online: [
      "Visit the official PMKSY website or the concerned state agriculture / DBT portal.",
      "Register/login as a farmer and select the relevant PMKSY component (e.g., Per Drop More Crop).",
      "Fill in land, crop, and irrigation system details and upload required documents.",
      "Submit the application and track status through the portal.",
    ],
    offline: [
      "Approach the nearest Agriculture Department office or authorised implementing agency.",
      "Collect and fill the PMKSY / micro-irrigation application form.",
      "Attach required documents and submit for verification and technical approval.",
    ],
  },
  faqs: [
    {
      question: "What subsidy is provided under PMKSY for micro-irrigation?",
      answer:
        "Under the Per Drop More Crop component, subsidy is generally up to 55% for small and marginal farmers and up to 45% for other farmers, subject to state norms.",
    },
    {
      question: "Where can farmers apply for PMKSY benefits?",
      answer:
        "Farmers can apply through the PMKSY official portal or the respective state agriculture or DBT portals implementing the scheme.",
    },
  ],
  imageUrl: "/Images/farmer_welf/PMKSY.jpg",
  launchedYear: 2015,
  category: "Irrigation & Water Management",
  detailedPage: "farmer_schemes",
  icon: "Droplet",
}
,
  {
  title: "Pradhan Mantri Kisan Samman Nidhi Yojana",
  shortName: "PM-KISAN",
  keyInfo: {
    duration: "Ongoing",
    amount: "₹6,000/year",
    applyFrom: "2019",
    lastDate: "As per portal"
  },
  shortDescription:
    "PM-KISAN is a Central Sector scheme that provides assured income support of ₹6,000 per year to eligible landholding farmer families, paid in three equal instalments directly into their bank accounts to meet agricultural and household needs.",
  portalLink: "https://pmkisan.gov.in",
  detailedDescription: [
    "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme implemented nationwide to supplement the financial needs of landholding farmer families.",
    "Under the scheme, eligible farmer families receive ₹6,000 per year, paid in three equal instalments of ₹2,000 each at four-monthly intervals through Direct Benefit Transfer (DBT).",
    "The scheme supports farmers in procuring agricultural inputs such as seeds and fertilisers and in meeting other agricultural and household requirements."
  ],
  benefits: [
    "Provides assured income support of ₹6,000 per year to eligible farmer families in three instalments of ₹2,000 each.",
    "Instalments are transferred directly into farmers’ bank accounts through DBT, ensuring transparency and timely payments.",
    "Helps reduce farmers’ dependence on informal credit for agricultural inputs and basic household needs."
  ],
  eligibilityCriteria: [
    "All landholding farmer families having cultivable land recorded in their names in the State/UT land records, subject to verification by the respective State/UT government.",
    "Farmer family is defined as husband, wife and minor children owning cultivable land, provided none falls under the exclusion categories.",
    "Small, marginal and other landholding farmers are eligible; there is no upper landholding size limit, subject to exclusion rules.",
    "Farmer data must be duly uploaded, verified and approved on the PM-KISAN portal."
  ],
  nonEligible: [
    "All institutional landholders such as government institutions, public sector undertakings and other institutional farms.",
    "Present and former constitutional post holders, current and former Union Ministers, MPs, MLAs, MLCs, Mayors of Municipal Corporations and Chairpersons of District Panchayats.",
    "Serving or retired officers and employees of Central/State Government ministries, departments, PSUs, autonomous bodies and local bodies (except Class IV/Multi-Tasking Staff).",
    "Retired pensioners drawing a monthly pension of ₹10,000 or more (excluding Class IV/Multi-Tasking Staff).",
    "Professionals such as doctors, engineers, lawyers, chartered accountants and architects registered with professional bodies and practising the profession, even if they own agricultural land."
  ],
  requiredDocuments: [
    {
      name: "Aadhaar Card",
      description: "Valid Aadhaar card linked with bank account",
      image: "public/Imges/common/aadhar_card_sample.jpeg",
      officialLink: "https://uidai.gov.in/",
      videoGuide: "https://www.youtube.com/watch?app=desktop&v=ld-aM5DPVj8",
      importance: "High",
    },
   {
      name: "Bank Account Details",
      description: "Bank passbook first page or cancelled cheque (Aadhaar-linked)",
      image: "public/Imges/common/bank_account_sample.jpg",
      officialLink: "https://sbi.bank.in/web/customer-care/m-passbook",
      videoGuide: "https://youtu.be/WmaXsYNvRhk?si=PiGdNj99QIEVj4cm",
      importance: "High",
    },
   {
      name: "Land Ownership or Tenancy Documents",
      description: "Land records, lease agreement or certificate from competent authority",
      image: "/public/Imges/common/land_document_sample.jpg",
      officialLink: "https://dolr.gov.in/citizen-centric-services/",
      videoGuide: "https://youtu.be/gvV6B9EKf8M?si=YqnG_abzxqzKip3U",
      importance: "High",
    },
    {
      name: "Valid Identity Document (if Aadhaar not available)",
      description:
        "Voter ID, driving licence, NREGA job card or other government-issued identity document as prescribed, applicable only in special cases.",
      image: "public/Imges/common/aadhar_card_sample.jpeg",
      officialLink: "https://uidai.gov.in/",
      videoGuide: "https://www.youtube.com/watch?app=desktop&v=ld-aM5DPVj8",
      importance: "High",
    },
    {
      name: "Address Proof",
      description: "Valid Aadhaar card linked with bank account",
      image: "public/Imges/common/aadhar_card_sample.jpeg",
      officialLink: "",
      videoGuide: "https://youtu.be/2tbuh8NtNHQ?si=ryOjSuFhzXFWTgly",
      importance: "High",
    },
  ],
  applicationProcess: {
    online: [
      "Visit the official PM-KISAN portal (https://pmkisan.gov.in) and open the Farmers Corner section.",
      "Select New Farmer Registration (where enabled by the State/UT) and enter Aadhaar number, personal details, bank details, land record information and contact details.",
      "Complete Aadhaar-based eKYC using OTP or biometric verification at a CSC, as required.",
      "After submission, details are verified by State/UT officials based on land records and eligibility criteria.",
      "Once approved, the farmer is included in the beneficiary list and instalments are credited directly to the registered bank account. Status can be checked under Know Your Status / Beneficiary Status."
    ],
    offline: [
      "Approach local authorities such as revenue officers, village patwari, village-level computer operators or designated nodal officers for PM-KISAN enrolment.",
      "Apply through Common Service Centres (CSCs) or other government-designated centres where officials register the farmer on the PM-KISAN portal.",
      "Submit Aadhaar, bank details, land records and other required documents for verification.",
      "State/UT Agriculture or Revenue Departments prepare and certify beneficiary lists after verification, and funds are released electronically to approved beneficiaries."
    ]
  },
  faqs: [
    {
      question: "Who can apply for PM-KISAN?",
      answer:
        "All landholding farmer families with cultivable land recorded in their names in State/UT land records, who do not fall under the exclusion categories, can apply for PM-KISAN."
    },
    {
      question: "How much financial benefit is provided and how is it paid?",
      answer:
        "Eligible farmer families receive ₹6,000 per financial year, paid in three equal instalments of ₹2,000 each directly into their registered bank account through Direct Benefit Transfer."
    },
    {
      question: "Is Aadhaar mandatory for PM-KISAN?",
      answer:
        "Yes, Aadhaar is mandatory and eKYC using Aadhaar (OTP-based or biometric) is required for continued release of instalments. In some States/UTs, alternative IDs may be allowed temporarily as per guidelines."
    },
    {
      question: "How can a farmer check beneficiary or instalment status?",
      answer:
        "Farmers can visit https://pmkisan.gov.in, open Farmers Corner and use the Know Your Status / Beneficiary Status option by entering registration or mobile number to view eligibility and payment details."
    },
    {
      question: "What should be done if there is an error in name, Aadhaar or bank details?",
      answer:
        "Farmers can use Edit Aadhaar Details on the portal or contact the local agriculture/revenue office or CSC to correct details. Updates are verified by State/UT officials before instalments resume."
    }
  ],
  imageUrl: "/Images/farmer_welf/pm_Kisan_Samman.jpg",
  launchedYear: 2019,
  category: "Income Support Schemes",
  detailedPage: "farmer_schemes",
  icon: "BadgeDollarSign",
}

];

const InsertData=async()=>{
    connection();
    await FW.deleteMany();
    const ack=await FW.insertMany(data);
}
InsertData()