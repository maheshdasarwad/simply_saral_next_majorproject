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
    title: "Kisan Credit Card (KCC) Scheme – A Comprehensive Guide",
    shortName: "KCC",
    keyInfo: {
      duration: "Up to 5 years",
      amount: "Up to ₹3,00,000",
      applyFrom: "1998",
      lastDate: "As per bank",
    },
    shortDescription:
      "The Kisan Credit Card (KCC) Scheme, launched in 1998, is a vital government initiative designed to provide farmers with timely and adequate credit support to meet their agricultural needs.",
    portalLink: "https://rbi.org.in",
    detailedDescription: [
      "Launched in 1998 to provide timely and hassle-free credit support to farmers based on land holding and cropping pattern.",
      "Short-term crop loan limit generally up to ₹3 lakh, with flexible limits based on land, crops, and scale of finance.",
      "Typical interest rate around 7% per annum on crop loans, with additional interest subvention and prompt repayment incentives reducing effective rate for eligible farmers.",
      "Card validity usually up to 5 years with periodic review and enhancement for rising costs or change in cropping pattern.",
    ],
    benefits: [
      "Subsidized interest on crop loans, with government interest subvention and prompt repayment incentives lowering effective rates for eligible farmers.",
      "Flexible repayment schedule aligned with crop harvest and marketing seasons, reducing stress on farmers’ cash flow.",
      "Single KCC limit usable for crop production, post-harvest expenses, consumption needs, and allied activities such as dairy, poultry, and fisheries.",
      "Simplified and recurrent access to working capital through a revolving credit facility instead of repeated loan applications.",
    ],
    eligibilityCriteria: [
      "Individuals or joint borrowers who are owner-cultivators of agricultural land.",
      "Tenant farmers, oral lessees and sharecroppers as per bank and state guidelines.",
      "Age generally between 18 and 75 years, with a co-borrower required if above upper age limit as per bank norms.",
    ],
    nonEligible: [
      "Borrowers with willful default or adverse credit history as per bank appraisal.",
      "Activities not related to agriculture or allied sectors, as per scheme guidelines.",
    ],
    requiredDocuments: [
      {
        name: "Identity Proof",
        description:
          "Valid government-issued photo identity document of the farmer (e.g. Aadhaar, voter ID, PAN).",
        image: "/Images/farmer_welf/kcc-id-proof.jpg",
        officialLink: "https://uidai.gov.in",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Address Proof",
        description:
          "Document confirming the current residential address of the farmer (e.g. ration card, utility bill, voter ID).",
        image: "/Images/farmer_welf/kcc-address-proof.jpg",
        officialLink: "https://www.india.gov.in",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Land Ownership Proof",
        description:
          "Land records or other documents showing cultivable land or tenancy rights in the farmer’s name as per bank norms.",
        image: "/Images/farmer_welf/kcc-land-proof.jpg",
        officialLink: "https://bhulekh.mahabhumi.gov.in",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Photographs",
        description:
          "Recent passport-sized photographs of the farmer as required by the bank.",
        image: "/Images/farmer_welf/kcc-photo.jpg",
        officialLink: "",
        videoGuide: "",
        importance: "Medium",
      },
      {
        name: "Bank Account Details",
        description:
          "First page of bank passbook or statement showing account number, IFSC and farmer’s name.",
        image: "/Images/farmer_welf/kcc-bank.jpg",
        officialLink: "",
        videoGuide: "",
        importance: "High",
      },
    ],
    applicationProcess: {
      online: [
        "Visit the eligible bank’s online portal or Kisan Rin related portal if available.",
        "Register or log in and select the Kisan Credit Card (KCC) application option.",
        "Fill out the application form with personal, landholding, and cropping details.",
        "Upload KYC documents, land records, and bank account details as required.",
        "Submit the application and track sanction status through the portal or SMS alerts.",
      ],
      offline: [
        "Visit a nearby bank branch that offers Kisan Credit Card services.",
        "Collect and fill out the KCC application form with details of landholding and crops grown.",
        "Attach required documents including identity proof, address proof, land ownership records, and bank account details.",
        "Submit the application to the bank officer for appraisal and verification.",
        "Await sanction, execution of documents, and issuance of the Kisan Credit Card cum passbook or Rupay card.",
      ],
    },
    faqs: [
      {
        question: "What is the maximum loan limit under KCC for crop loans?",
        answer:
          "KCC crop loan limits are typically fixed based on landholding, cropping pattern, and scale of finance, and many banks permit limits up to about ₹3 lakh for short-term crop credit, subject to internal policy.",
      },
      {
        question: "Is collateral required for KCC?",
        answer:
          "Collateral requirements depend on the loan amount and bank guidelines; loans up to specified thresholds may be eligible for collateral-free coverage under applicable schemes.",
      },
    ],
    imageUrl: "/Images/farmer_welf/kisan_Credit_Card.jpg",
    launchedYear: 1998,
    category: "Credit & Loan Schemes",
    detailedPage: "/schemes/kisan-credit-card",
    icon: "Banknote",
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    shortName: "PMFBY",
    keyInfo: {
      duration: "Per season",
      amount: "As per sum insured",
      applyFrom: "2016",
      lastDate: "State cut-off date",
    },
    shortDescription:
      "The Pradhan Mantri Fasal Bima Yojana (PMFBY) provides comprehensive crop insurance coverage to farmers, protecting them from financial loss due to natural calamities, pests, and diseases.",
    portalLink: "https://pmfby.gov.in",
    detailedDescription: [
      "Launched in 2016 to provide comprehensive risk coverage to farmers from pre-sowing to post-harvest stages for notified crops.",
      "Premium payable by farmers is generally capped at around 2% of sum insured for Kharif food and oilseed crops, 1.5% for Rabi food and oilseed crops, and 5% for annual commercial and horticultural crops, with the balance premium subsidized.",
      "Coverage includes yield losses due to widespread calamities and localised risks as notified, subject to scheme guidelines.",
    ],
    benefits: [
      "Provides financial support to farmers in the event of crop failure due to natural calamities, pests, and diseases.",
      "Encourages farmers to adopt modern and innovative agricultural practices by reducing income uncertainty.",
      "Ensures flow of institutional credit to the agriculture sector by reducing credit risk.",
    ],
    eligibilityCriteria: [
      "All eligible loanee farmers cultivating notified crops and having seasonal agricultural loans from financial institutions in notified areas are mandatorily covered.",
      "Non-loanee farmers growing notified crops in notified areas can enrol on a voluntary basis within the stipulated cut-off dates.",
    ],
    nonEligible: [
      "Crops and areas not notified by the state government for the given season.",
      "Enrolments made after the cut-off date prescribed in state notifications.",
    ],
    requiredDocuments: [
      {
        name: "Identity Proof",
        description: "Photo ID of the farmer for PMFBY enrolment.",
        image: "/Images/farmer_welf/pmfby-id.jpg",
        officialLink: "https://pmfby.gov.in",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Land Ownership or Cultivation Proof",
        description:
          "Land records or cultivation/tenancy proof for the insured crops and area.",
        image: "/Images/farmer_welf/pmfby-land.jpg",
        officialLink: "https://pmfby.gov.in",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Bank Account Details",
        description: "Bank account where claim or benefit will be credited.",
        image: "/Images/farmer_welf/pmfby-bank.jpg",
        officialLink: "https://pmfby.gov.in",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Loan Sanction Papers (for loanee farmers)",
        description:
          "Copy of crop loan sanction or KCC documents from the lending institution.",
        image: "/Images/farmer_welf/pmfby-loan.jpg",
        officialLink: "https://pmfby.gov.in",
        videoGuide: "",
        importance: "Medium",
      },
    ],
    applicationProcess: {
      online: [
        "Register or log in on the official PMFBY portal as a farmer.",
        "Select state, district, crop, and season, and fill in required personal and landholding details.",
        "Upload necessary documents such as identity proof, land records, and bank account details.",
        "Pay the applicable farmer share of premium through the portal or designated payment options.",
        "Submit the application and note the acknowledgement/reference number for future tracking.",
      ],
      offline: [
        "Visit the nearest bank branch, CSC, or agriculture department office that facilitates PMFBY enrolment.",
        "Obtain and fill the PMFBY application form with details of notified crops, area, and season.",
        "Attach required documents like identity proof, land documents or tenancy/cultivation proof, and bank account details.",
        "Pay the applicable premium share at the counter or as directed.",
        "Submit the form before the cut-off date and obtain a receipt or acknowledgement.",
      ],
    },
    faqs: [
      {
        question: "What premium does a farmer pay under PMFBY?",
        answer:
          "Farmers generally pay around 2% of the sum insured for Kharif food and oilseed crops, 1.5% for Rabi food and oilseed crops, and 5% for annual commercial and horticultural crops, with the remaining premium subsidized as per scheme rules.",
      },
      {
        question: "Which crops are covered under PMFBY?",
        answer:
          "Only those crops which are notified by the respective state or union territory for a given season and area are covered; notifications and crop lists are issued by state authorities each season.",
      },
    ],
    imageUrl: "/Images/farmer_welf/pradhan_Mantri_Fasal.jpg",
    launchedYear: 2016,
    category: "Crop Insurance & Risk Management",
    detailedPage: "/schemes/pmfby",
    icon: "ShieldCheck",
  },
  {
    title: "Pradhan Mantri Krishi Sinchayee Yojana",
    shortName: "PMKSY",
    keyInfo: {
      duration: "Ongoing",
      amount: "Subsidy on micro‑irrigation",
      applyFrom: "2015",
      lastDate: "As per phase",
    },
    shortDescription:
      "A scheme to improve irrigation efficiency and ensure water availability for agriculture.",
    portalLink: "https://pmksy.gov.in",
    detailedDescription: [
      "Launched in 2015 with the motto “Har Khet Ko Pani” to expand cultivated area under assured irrigation and improve water use efficiency.",
      "Supports micro-irrigation through components like Per Drop More Crop, providing financial assistance for drip and sprinkler systems.",
      "Financial assistance commonly around 55% of unit cost for small and marginal farmers and 45% for other farmers, with higher support in specified regions.",
    ],
    benefits: [
      "Improves on-farm water use efficiency and promotes the concept of ‘Per Drop More Crop’ through micro-irrigation.",
      "Provides financial assistance/subsidy for installation of drip and sprinkler irrigation systems, reducing farmers’ capital burden.",
      "Helps expand irrigated area, reduce water wastage, and stabilise yields in drought-prone and water-scarce regions.",
      "Allows convergence with other schemes and watershed interventions for holistic water resource development.",
    ],
    eligibilityCriteria: [
      "Farmers owning or cultivating agricultural land in areas covered under the notified PMKSY micro-irrigation or related components.",
      "Priority often given to small and marginal farmers, water-stressed areas, and crops suitable for micro-irrigation as per state guidelines.",
    ],
    nonEligible: [
      "Projects or installations that do not follow approved technical standards or are outside notified areas.",
      "Applicants who do not provide required land and identity documents or who have already availed full subsidy for the same land and system under the scheme.",
    ],
    requiredDocuments: [
      {
        name: "Identity Proof",
        description: "Identity document of the farmer for scheme registration.",
        image: "/Images/farmer_welf/pmksy-id.jpg",
        officialLink: "https://pmksy.gov.in",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Address Proof",
        description: "Proof of residence in the eligible area.",
        image: "/Images/farmer_welf/pmksy-address.jpg",
        officialLink: "https://pmksy.gov.in",
        videoGuide: "",
        importance: "Medium",
      },
      {
        name: "Land Ownership or Cultivation Proof",
        description:
          "Land records specifying plots where micro‑irrigation will be installed.",
        image: "/Images/farmer_welf/pmksy-land.jpg",
        officialLink: "https://pmksy.gov.in",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Photographs",
        description:
          "Photographs of the farmer and proposed installation site as required.",
        image: "/Images/farmer_welf/pmksy-photo.jpg",
        officialLink: "",
        videoGuide: "",
        importance: "Medium",
      },
      {
        name: "Bank Account Details",
        description: "Bank account for receiving subsidy/assistance.",
        image: "/Images/farmer_welf/pmksy-bank.jpg",
        officialLink: "",
        videoGuide: "",
        importance: "High",
      },
    ],
    applicationProcess: {
      online: [
        "Visit the official PMKSY or relevant state micro-irrigation portal, if available.",
        "Register as a farmer and provide details of landholding, crops, and proposed micro-irrigation system.",
        "Upload scanned copies of required documents, including identity proof, land records, and bank details.",
        "Submit the application, select empanelled supplier/agency where required, and track approval status online.",
      ],
      offline: [
        "Visit the nearest agriculture department office or designated implementing agency office in your area.",
        "Obtain and fill in the PMKSY or micro-irrigation assistance application form with land and crop details.",
        "Attach required documents such as land records, Aadhaar or other identity proof, and bank account details.",
        "Submit the form for verification and technical assessment.",
        "After approval, coordinate with authorised suppliers for installation and claim subsidy as per scheme procedure.",
      ],
    },
    faqs: [
      {
        question: "What level of subsidy is available for micro-irrigation under PMKSY?",
        answer:
          "Financial assistance is generally around 55% of the unit cost for small and marginal farmers and 45% for other farmers, with some states offering additional top-up subsidies.",
      },
      {
        question: "Which irrigation systems are eligible?",
        answer:
          "Drip and sprinkler systems and other notified micro-irrigation technologies are eligible as per the Per Drop More Crop component guidelines.",
      },
    ],
    imageUrl: "/Images/farmer_welf/PMKSY.jpg",
    launchedYear: 2015,
    category: "Irrigation & Water Management",
    detailedPage: "/schemes/pmksy",
    icon: "Droplet",
  },
  {
    title: "PM Kisan Samman Nidhi Yojana",
    shortName: "PM-KISAN",
    keyInfo: {
      duration: "Ongoing",
      amount: "₹6,000/year",
      applyFrom: "2018",
      lastDate: "As per portal",
    },
    shortDescription:
      "A government initiative to provide financial assistance to farmers across India to support their agricultural and allied needs.",
    portalLink: "https://pmkisan.gov.in/",
    detailedDescription: [
      "Launched in 2018–19 to provide assured income support of ₹6,000 per year to eligible farmer families.",
      "Amount is paid in three equal instalments of ₹2,000 each directly into beneficiaries’ bank accounts through Direct Benefit Transfer.",
      "Intended to support purchase of agricultural inputs and meet household needs of small and marginal farmers.",
    ],
    benefits: [
      "Provides ₹6,000 annual income support to eligible farmer families in three equal instalments, credited directly to bank accounts.",
      "Helps farmers meet agricultural input costs such as seeds, fertilizers, and other necessities, reducing dependence on informal credit.",
      "Promotes financial inclusion by linking farmers to formal banking and digital payment systems.",
    ],
    eligibilityCriteria: [
      "Farmer families with cultivable landholding recorded in their names as per land records, subject to scheme cut-off dates.",
      "Applicants must complete mandatory e-KYC and have valid bank account and identity details linked as per scheme instructions.",
    ],
    nonEligible: [
      "Institutional landholders and farmer families in higher income categories such as certain income tax payers, serving or retired senior government officers, and professionals as defined in the scheme guidelines.",
      "Non-resident Indians and those not meeting landholding or documentation requirements.",
    ],
    requiredDocuments: [
      {
        name: "Identity Proof (e.g., Aadhaar)",
        description:
          "Aadhaar or other accepted identity document of the farmer.",
        image: "/Images/farmer_welf/pmkisan-id.jpg",
        officialLink: "https://pmkisan.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Land Ownership Records",
        description:
          "Land records showing cultivable land in the name of the farmer or eligible family member.",
        image: "/Images/farmer_welf/pmkisan-land.jpg",
        officialLink: "https://pmkisan.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Bank Account Details",
        description:
          "Savings bank account details for receiving instalments via DBT.",
        image: "/Images/farmer_welf/pmkisan-bank.jpg",
        officialLink: "https://pmkisan.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Address Proof",
        description:
          "Document confirming residence in the eligible village/town or area.",
        image: "/Images/farmer_welf/pmkisan-address.jpg",
        officialLink: "https://pmkisan.gov.in/",
        videoGuide: "",
        importance: "Medium",
      },
      {
        name: "Recent Photograph",
        description: "Recent passport-sized photograph of the farmer.",
        image: "/Images/farmer_welf/pmkisan-photo.jpg",
        officialLink: "https://pmkisan.gov.in/",
        videoGuide: "",
        importance: "Medium",
      },
    ],
    applicationProcess: {
      online: [
        "Visit the official PM‑KISAN portal and open the farmer registration section.",
        "Enter Aadhaar number or other required identification details and fill basic personal and landholding information.",
        "Provide bank account details and complete e‑KYC or OTP‑based verification as per instructions.",
        "Submit the application and note the registration/reference number for tracking status.",
        "Track approval and instalment status through the portal’s beneficiary status section.",
      ],
      offline: [
        "Visit the nearest CSC, revenue/tehsildar office, or agriculture department office facilitating PM‑KISAN registration.",
        "Fill in the prescribed application form with details of landholding, family, and bank account information.",
        "Submit required documents such as Aadhaar, land records, and bank passbook copy.",
        "Complete biometric or e‑KYC verification where required.",
        "Wait for verification and inclusion in the beneficiary list; instalments are credited after approval.",
      ],
    },
    faqs: [
      {
        question: "How much assistance is provided under PM‑KISAN?",
        answer:
          "Eligible farmer families receive ₹6,000 per year in three equal instalments of ₹2,000 each, paid at four‑monthly intervals through Direct Benefit Transfer.",
      },
      {
        question: "Who is not eligible for PM‑KISAN benefits?",
        answer:
          "Institutional landholders and specified higher‑income categories such as certain income tax payers, senior serving or retired officials, and some professionals are excluded as per scheme guidelines.",
      },
    ],
    imageUrl: "/Images/farmer_welf/pm_Kisan_Samman.jpg",
    launchedYear: 2019,
    category: "Income Support Schemes",
    detailedPage: "/schemes/pm-kisan",
    icon: "BadgeDollarSign",
  },
];

const InsertData=async()=>{
    connection();
    await FW.deleteMany();
    const ack=await FW.insertMany(data);
}
InsertData()