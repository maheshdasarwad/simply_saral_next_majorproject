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
import WW from "../../models/WomenWelfare.js"

const data = [
  {
    title: "Beti Bachao Beti Padhao (BBBP)",
    shortName: "Beti Bachao Beti Padhao",
    keyInfo: {
      duration: "Ongoing",
      amount: "Linked benefits",
      applyFrom: "2015",
      lastDate: "Not fixed",
    },
    shortDescription: "A national campaign and scheme to address declining child sex ratio, prevent gender-biased sex selection, and promote education and empowerment of the girl child across India.",
    portalLink: "https://wcd.nic.in/bbbp-schemes",
    detailedDescription: [
      "Beti Bachao Beti Padhao (BBBP) is a flagship national initiative launched in 2015 to tackle the declining Child Sex Ratio and discrimination against the girl child.",
      "It is implemented jointly by the Ministries of Women and Child Development, Health and Family Welfare, and Education, combining awareness campaigns and multi-sectoral interventions in targeted districts.",
      "BBBP promotes attitudinal change, prevention of gender-biased sex selection, improved girl child survival, and universal access to quality education for girls through coordinated government and community action.",
    ],
    benefits: [
      "Addresses declining child sex ratio and gender-biased sex selection.",
      "Promotes gender equality and the value of the girl child in family and society.",
      "Improves survival, health, and education outcomes for girls through convergent action.",
      "Encourages opening of Sukanya Samriddhi Accounts for girl children with tax and interest benefits.",
      "Mobilises community participation and behavioural change campaigns at local levels.",
    ],
    eligibilityCriteria: [
      "Families with at least one girl child, generally below 10 years of age, for benefits linked to Sukanya Samriddhi Accounts.",
      "The girl child must be an Indian citizen.",
      "A Sukanya Samriddhi Account should be opened in the name of the eligible girl at a designated bank or post office for linked financial benefits.",
      "Residents of districts and areas where BBBP interventions and campaigns are being actively implemented.",
    ],
    nonEligible: [
      "Non-resident Indians (NRIs) for Sukanya Samriddhi and linked financial benefits.",
      "Families without a girl child for girl-child-specific financial components.",
      "Applicants not meeting age, residency, or account-opening conditions for Sukanya Samriddhi or related benefits.",
    ],
    requiredDocuments: [
      {
        name: "Girl Child Birth Certificate",
        description: "Official birth certificate of the girl child issued by a recognized hospital or government authority.",
        image: "/Images/bbbp/birth-certificate.jpeg",
        officialLink: "https://wcd.nic.in/",
        videoGuide: "https://youtu.be/bbbp-birthcertificate",
        importance: "High",
      },
      {
        name: "Identity Proof of Parents/Guardian",
        description: "Aadhaar card, PAN card, ration card, or any valid government-issued identity proof of parents or guardian.",
        image: "/Images/bbbp/parent-id.jpeg",
        officialLink: "https://uidai.gov.in/",
        videoGuide: "https://youtu.be/bbbp-parentid",
        importance: "High",
      },
      {
        name: "Address Proof",
        description: "Passport, voter ID, ration card, driving licence, or recent utility bills as address proof.",
        image: "/Images/bbbp/address-proof.jpeg",
        officialLink: "https://www.india.gov.in/",
        videoGuide: "https://youtu.be/bbbp-addressproof",
        importance: "High",
      },
      {
        name: "Passport Size Photographs",
        description: "Recent passport-sized photographs of the girl child and parents/guardian as required by bank or post office.",
        image: "/Images/bbbp/photograph.jpeg",
        officialLink: "https://www.passportindia.gov.in/",
        videoGuide: "https://youtu.be/bbbp-photos",
        importance: "Medium",
      },
      {
        name: "Sukanya Samriddhi Account Form",
        description: "Filled application form for Sukanya Samriddhi Account or BBBP-linked savings account at bank or post office.",
        image: "/Images/bbbp/ssa-form.jpeg",
        officialLink: "https://www.indiapost.gov.in/",
        videoGuide: "https://youtu.be/bbbp-ssaform",
        importance: "Medium",
      },
    ],
    applicationProcess: {
      online: [
        "Visit the official Women and Child Development or Sukanya Samriddhi information portal for scheme details and latest instructions.",
        "Identify eligible banks or post offices that open Sukanya Samriddhi Accounts and provide BBBP-linked services.",
        "Download or access the Sukanya Samriddhi Account application form and collect required documents for the girl child and parents.",
        "Follow any online appointment or enquiry process offered by the chosen bank or post office, if available.",
      ],
      offline: [
        "Visit a nearby participating bank branch or post office offering Sukanya Samriddhi Accounts.",
        "Obtain and fill the application form for Sukanya Samriddhi / BBBP-linked account in the girl child's name.",
        "Attach required documents such as birth certificate, identity proof, address proof and photographs.",
        "Submit the completed form with the initial deposit and obtain the passbook or account details.",
        "Contact local Women and Child Development, Health, or Education offices for information on BBBP awareness activities and support.",
      ],
    },
    faqs: [
      {
        question: "What is the main objective of Beti Bachao Beti Padhao?",
        answer: "The scheme aims to improve the child sex ratio, prevent gender-biased sex selection, and promote survival, protection and education of the girl child across India.",
      },
      {
        question: "Is there any direct cash transfer benefit under BBBP?",
        answer: "BBBP mainly focuses on awareness and convergence of services; financial benefits are usually provided through linked schemes such as Sukanya Samriddhi Accounts.",
      },
      {
        question: "Who can open a Sukanya Samriddhi Account under this initiative?",
        answer: "Parents or legal guardians of an Indian girl child below the notified age limit can open a Sukanya Samriddhi Account at designated banks or post offices.",
      },
      {
        question: "Where can forms for BBBP-linked savings benefits be obtained?",
        answer: "Forms for Sukanya Samriddhi and other linked savings products are available at participating bank branches and post offices, while scheme details are on official government portals.",
      },
      {
        question: "Is there any fee for participating in BBBP activities?",
        answer: "Awareness and campaign activities do not charge a fee; for savings components like Sukanya Samriddhi, only the prescribed deposit and usual bank or post office norms apply.",
      },
    ],
    imageUrl: "/Images/women_welf/beti_bachao_beti_padhao.jpg",
    launchedYear: 2015,
    category: "Education & Skill Development",
    detailedPage: "BBBP",
    icon: "GraduationCap",
  },
  {
    title: "Ladki Bahin Yojana (Mukhya Mantri Mazi Ladki Bahin Yojana)",
    shortName: "Ladki Bahin Yojana",
    keyInfo: {
      duration: "Ongoing",
      amount: "₹1,500/month",
      applyFrom: "2024",
      lastDate: "31 March 2025",
    },
    shortDescription: "A scheme providing monthly financial assistance of ₹1,500 to eligible women across the state to support economic empowerment and social welfare.",
    portalLink: "https://ladakibahin.maharashtra.gov.in",
    detailedDescription: [
      "The Mukhyamantri Ladki Bahin Yojana is a state-level initiative aimed at providing financial security and empowerment to women aged 21 to 60 years.",
      "Eligible women receive ₹1,500 per month directly into their bank accounts via Direct Benefit Transfer, with no usage restrictions so that funds can support education, healthcare, skilling or household needs.",
      "The scheme focuses on economically weaker women, with additional consideration for widows, divorced women and women from marginalised communities.",
    ],
    benefits: [
      "Monthly financial assistance of ₹1,500 credited directly to beneficiaries' bank accounts.",
      "No restrictions on how the assistance is spent, allowing women to prioritise their own needs.",
      "Priority and relaxed consideration for widows, divorced women, and women from SC/ST and other vulnerable groups.",
      "Simple, largely online application process supported by help centres and facilitation at local offices.",
    ],
    eligibilityCriteria: [
      "Woman resident of the state aged between 21 and 60 years.",
      "Family annual income less than ₹2.5 lakh (as per current scheme criteria).",
      "Possession of Aadhaar card linked with a mobile number and an active bank account in her own name.",
      "Not receiving similar recurring financial assistance from other government schemes.",
    ],
    nonEligible: [
      "Women below 21 years or above 60 years.",
      "Families with annual income exceeding ₹2.5 lakh.",
      "Women in government service or their specified family members as per rules.",
      "Income tax payers and professionals filing returns beyond notified thresholds.",
      "Women already receiving other government pensions or similar monthly benefits.",
      "Non-residents of the state.",
    ],
    requiredDocuments: [
      {
        name: "Aadhaar Card",
        description: "Mandatory identity document used for beneficiary verification and DBT linking.",
        image: "/Images/aadharformat.jpeg",
        officialLink: "https://uidai.gov.in/",
        videoGuide: "https://youtu.be/EUJ4Lf2B0Nc",
        importance: "High",
      },
      {
        name: "Age Proof Certificate",
        description: "Birth certificate, school leaving certificate, or any valid government age proof.",
        image: "/Images/age-proof.jpeg",
        officialLink: "https://edistrict.gov.in/",
        videoGuide: "https://youtu.be/ageproof",
        importance: "High",
      },
      {
        name: "Income Certificate",
        description: "Certificate issued by the competent revenue authority (e.g., Tehsildar) showing annual income below ₹2.5 lakh.",
        image: "/Images/income-certificate.jpeg",
        officialLink: "https://edistrict.gov.in/",
        videoGuide: "https://youtu.be/incomecertificate",
        importance: "High",
      },
      {
        name: "Bank Account Passbook",
        description: "First page of bank passbook or statement showing account holder name, account number and IFSC.",
        image: "/Images/bankdetails.jpeg",
        officialLink: "https://www.npci.org.in/",
        videoGuide: "https://youtu.be/bankdetails",
        importance: "High",
      },
      {
        name: "Residence Certificate",
        description: "Domicile certificate or valid address proof establishing state residency.",
        image: "/Images/residence-proof.jpeg",
        officialLink: "https://edistrict.gov.in/",
        videoGuide: "https://youtu.be/residenceproof",
        importance: "Medium",
      },
      {
        name: "Passport Photo",
        description: "Two recent passport-sized colour photographs.",
        image: "/Images/photograph.jpeg",
        officialLink: "https://www.passportindia.gov.in/",
        videoGuide: "https://youtu.be/photoguide",
        importance: "Medium",
      },
      {
        name: "Caste Certificate",
        description: "For SC/ST/OBC or other reserved categories, if applicable for priority or special provisions.",
        image: "/Images/caste-certificate.jpeg",
        officialLink: "https://edistrict.gov.in/",
        videoGuide: "https://youtu.be/castecertificate",
        importance: "Medium",
      },
    ],
    applicationProcess: {
      online: [
        "Visit https://ladakibahin.maharashtra.gov.in and register with basic personal, contact and income details.",
        "Fill in the online application form with Aadhaar, bank and family information.",
        "Upload scanned copies of required documents such as Aadhaar, income and residence proof.",
        "Submit the application and note the reference number to track approval status.",
      ],
      offline: [
        "Obtain the application form from the Gram Panchayat, Municipal Office or designated help centre.",
        "Fill in all required details and attach photocopies of supporting documents.",
        "Submit the completed form to the respective local authority for verification and onward processing.",
      ],
    },
    faqs: [
      {
        question: "What is the last date to apply for Ladki Bahin Yojana?",
        answer: "Applications are generally accepted up to the notified closing date for the phase, currently indicated as 31 March 2025, subject to official updates.",
      },
      {
        question: "How will the monthly amount be paid?",
        answer: "The assistance of ₹1,500 per month is paid through Direct Benefit Transfer into the registered bank account of the beneficiary.",
      },
      {
        question: "Can employed women apply for this scheme?",
        answer: "Employed women may apply if the total family income remains within the prescribed limit and all other eligibility conditions are met.",
      },
      {
        question: "What happens if my application is rejected?",
        answer: "Applicants typically receive an SMS or portal update with the reason for rejection and may correct deficiencies and reapply within the allowed timeframe, if permitted.",
      },
      {
        question: "Is there any official application fee?",
        answer: "No official application fee is charged; applicants should avoid paying intermediaries and use only authorised channels.",
      },
      {
        question: "How can I track my application status?",
        answer: "Status can usually be checked on the official portal using the application reference number or Aadhaar-linked login.",
      },
      {
        question: "Which documents are usually needed for an income certificate?",
        answer: "Income certificates may require salary slips, Form 16, self-declaration, land or agricultural income records and other proofs as per local revenue office rules.",
      },
    ],
    imageUrl: "/Images/women_welf/ladki_bahin.jpg",
    launchedYear: 2023,
    category: "Financial Assistance & Social Security",
    detailedPage: "LBY",
    icon: "Shield",
  },
];


const InsertData=async()=>{
    connection();
    await WW.deleteMany();
    const ack=await WW.insertMany(data);
}
InsertData()