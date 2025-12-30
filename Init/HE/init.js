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
import HE from "../../models/HigherEducation.js"

const data = [
{
  title: "Dr. Panjabrao Deshmukh Vastigruh Nirvah Bhatta Yojna",
  shortName: "Dr. Panjabrao Deshmukh Hostel Scheme",
  keyInfo: {
    duration: "Academic year",
    amount: "Hostel / Living Allowance (DBT)",
    applyFrom: "2011",
    lastDate: "As per MahaDBT state schedule",
  },
  shortDescription:
    "A Maharashtra Government scheme providing financial assistance for hostel and living expenses to eligible higher education students studying away from home.",
  detailedDescription: [
    "Provides maintenance allowance to students residing in hostels or rented accommodation during higher education.",
    "Targets students from economically weaker backgrounds, especially children of registered labourers and marginal landholders.",
    "Benefits vary based on income group, rural–urban category, and course type as per Government Resolutions issued from time to time.",
  ],
  portalLink: "https://mahadbt.maharashtra.gov.in/",
  benefits: [
    "Direct Benefit Transfer (DBT) of hostel and living allowance to eligible students.",
    "Helps reduce financial burden on families of labourers and marginal farmers.",
    "Supports continuation of professional and technical education away from home district.",
  ],
  eligibilityCriteria: [
    "Student must be a domicile of Maharashtra.",
    "Admission must be through Centralized Admission Process (CAP) in a recognized government, government-aided or unaided institution.",
    "Student must be staying in a hostel or rented accommodation away from home for education.",
    "Annual family income must not exceed ₹8,00,000.",
    "Only first two children of the family are eligible for benefit.",
    "Minimum 50% attendance in previous academic year (except fresh admissions).",
  ],
  nonEligible: [
    "Students admitted through management or institute-level quota.",
    "Students studying in deemed or private universities.",
    "Students with educational gap of two years or more.",
    "Students availing similar maintenance or hostel allowance under another scheme.",
    "Non-domicile students of Maharashtra.",
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
      name: "Domicile Certificate",
      description: "Maharashtra domicile certificate issued by competent authority",
      image: "public/Imges/common/domicile_certificate_sample.jpeg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/en/Login/Login",
      videoGuide: "https://www.youtube.com/watch?v=4tBgZ9NFpRM",
      importance: "High",
    },
    {
      name: "Income Certificate",
      description: "Income certificate showing annual income up to ₹8,00,000",
      image: "public/Imges/common/income_certificate_sample.jpg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1251",
      videoGuide: "https://youtu.be/sHVU8Z7ymvk?si=dvi6DSf1aui6lg1f",
      importance: "High",
    },
    {
      name: "CAP Allotment / Admission Letter",
      description: "Proof of admission through centralized admission process",
      image: "public/Imges/common/cap_allotment_sample.jpg",
      officialLink: "https://fe2025.mahacet.org/StaticPages/HomePage",
      videoGuide: "https://youtube.com/shorts/k8yXpED4YXA?si=afNHgqDVw-gOyPY9",
      importance: "High",
    },
    {
      name: "Hostel Certificate / Rent Agreement",
      description: "Proof of staying in hostel or rented accommodation",
      image: "",
      officialLink: "",
      videoGuide: "https://www.youtube.com/watch?v=AtrhTo0vsao",
      importance: "High",
    },
    {
      name: "Previous Year Marksheet",
      description: "Last passed examination marksheet",
     image: "public/Imges/common/clg_marksheet_sample.jpg",
      officialLink: "",
      videoGuide: "",
      importance: "Medium",
    },
    {
      name: "Bank Account Details",
      description: "Bank passbook first page or cancelled cheque (Aadhaar-linked)",
      image: "public/Imges/common/bank_account_sample.jpg",
      officialLink: "https://sbi.bank.in/web/customer-care/m-passbook",
      videoGuide: "https://youtu.be/WmaXsYNvRhk?si=PiGdNj99QIEVj4cm",
      importance: "High",
    },
  ],
  applicationProcess: {
    online: [
      "Visit the official MahaDBT portal.",
      "Register or login using Aadhaar-linked credentials.",
      "Complete student profile and select the Directorate of Technical Education / Higher Education department.",
      "Choose Dr. Panjabrao Deshmukh Vastigruh Nirvah Bhatta Yojna.",
      "Fill application form and upload required documents.",
      "Submit application and track status through MahaDBT dashboard.",
    ],
    offline: [],
  },
  faqs: [
    {
      question: "Is offline application allowed for this scheme?",
      answer:
        "No. The scheme is implemented strictly through the MahaDBT online portal only.",
    },
    {
      question: "Is CAP admission mandatory?",
      answer:
        "Yes. Admission through the Centralized Admission Process (CAP) is compulsory to be eligible.",
    },
    {
      question: "How is the benefit amount paid?",
      answer:
        "The sanctioned amount is transferred directly to the student’s Aadhaar-linked bank account through DBT.",
    },
  ],
  imageUrl: "/Images/higher_Edu/PJVNB.jpg",
  launchedYear: 2011,
  category: "Scholarships & Financial Aid",
  detailedPage: "higher_education",
  icon: "BadgeDollarSign",
}


  ,
  {
  title: "Post-Matric Scholarship for OBC / EBC / DNT Students",
  shortName: "Post-Matric OBC/EBC/DNT",
  keyInfo: {
    duration: "Course duration",
    amount: "Tuition fee reimbursement + maintenance allowance",
    applyFrom: "Annual (as per NSP notification)",
    lastDate: "As per NSP academic year calendar",
  },
  shortDescription:
    "Centrally sponsored Post-Matric Scholarship under PM-YASASVI providing financial assistance to OBC, EBC and De-Notified Tribe (DNT) students pursuing post-matric education.",
  detailedDescription: [
    "The Post-Matric Scholarship for OBC, EBC and DNT students is implemented under the PM-YASASVI scheme by the Ministry of Social Justice & Empowerment, Government of India.",
    "The scheme aims to reduce dropouts and encourage students from socially and educationally backward classes to pursue education beyond Class 10.",
    "Financial assistance includes reimbursement of compulsory non-refundable fees and a maintenance allowance, disbursed through Direct Benefit Transfer (DBT) via the National Scholarship Portal.",
  ],
  portalLink: "https://scholarships.gov.in/",
  benefits: [
    "Reimbursement of compulsory non-refundable tuition and examination fees.",
    "Monthly maintenance allowance for hostellers and day scholars as per norms.",
    "Direct Benefit Transfer (DBT) to Aadhaar-linked bank accounts.",
  ],
  eligibilityCriteria: [
    "Applicant must belong to OBC, EBC or DNT category as notified by the Government of India.",
    "Student must be pursuing a post-matric or post-secondary course in a recognized institution.",
    "Annual family income from all sources must not exceed ₹2.50 lakh.",
    "Student must be a domicile of the concerned State/UT as per applicable rules.",
  ],
  nonEligible: [
    "Students belonging to categories other than OBC, EBC or DNT.",
    "Students whose annual family income exceeds ₹2.50 lakh.",
    "Students studying in unrecognized institutions or non-approved courses.",
    "Students receiving another scholarship covering the same components for the same course.",
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
      name: "Domicile Certificate",
      description: "Maharashtra domicile certificate issued by competent authority",
      image: "public/Imges/common/domicile_certificate_sample.jpeg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/en/Login/Login",
      videoGuide: "https://www.youtube.com/watch?v=4tBgZ9NFpRM",
      importance: "High",
    },
    {
      name: "Income Certificate",
      description: "Income certificate showing annual income up to ₹8,00,000",
      image: "public/Imges/common/income_certificate_sample.jpg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1251",
      videoGuide: "https://youtu.be/sHVU8Z7ymvk?si=dvi6DSf1aui6lg1f",
      importance: "High",
    },
    {
      name: "CAP Allotment / Admission Letter",
      description: "Proof of admission through centralized admission process",
      image: "public/Imges/common/cap_allotment_sample.jpg",
      officialLink: "https://fe2025.mahacet.org/StaticPages/HomePage",
      videoGuide: "https://youtube.com/shorts/k8yXpED4YXA?si=afNHgqDVw-gOyPY9",
      importance: "High",
    },
    {
      name: "Hostel Certificate / Rent Agreement",
      description: "Proof of staying in hostel or rented accommodation",
      image: "",
      officialLink: "",
      videoGuide: "https://www.youtube.com/watch?v=AtrhTo0vsao",
      importance: "High",
    },
    {
      name: "Previous Year Marksheet",
      description: "Last passed examination marksheet",
     image: "public/Imges/common/clg_marksheet_sample.jpg",
      officialLink: "",
      videoGuide: "",
      importance: "Medium",
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
      name: "Caste Certificate (OBC / EBC / DNT)",
      description: "Issued by competent authority",
      image: "public/Imges/common/caste_certificate_sample.jpg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/",
      videoGuide: "https://www.youtube.com/watch?v=T88e0nvUBUw",
      importance: "High",
    },
    {
      name: "Ration Card",
      description: "Family ration card",
      image: "public/Imges/common/ration_card_sample.jpg",
      officialLink: "https://rcms.mahafood.gov.in/PublicLogin/frmPublicLogin.aspx",
      videoGuide: "https://www.youtube.com/watch?v=dj7frtIhlhc",
      importance: "High",
    },
  ],
  applicationProcess: {
    online: [
      "Visit the National Scholarship Portal (NSP).",
      "Register or log in using Aadhaar and basic details.",
      "Select ‘Post-Matric Scholarship for OBC/EBC/DNT (PM-YASASVI)’.",
      "Fill in personal, academic and bank details and upload required documents.",
      "Submit the application and track verification status on NSP.",
    ],
  },
  faqs: [
    {
      question: "What is the income limit for this scholarship?",
      answer:
        "The annual family income of the applicant must not exceed ₹2.50 lakh from all sources.",
    },
    {
      question: "Is offline application allowed for this scheme?",
      answer:
        "No. Applications are accepted only through the National Scholarship Portal (NSP).",
    },
    {
      question: "How is the scholarship amount paid?",
      answer:
        "The scholarship amount is transferred directly to the student’s Aadhaar-linked bank account through DBT.",
    },
  ],
  imageUrl: "/Images/higher_Edu/POST_OBC.jpg",
  launchedYear: 2021,
  category: "Scholarships & Financial Aid",
  detailedPage: "higher_education",
  icon: "BadgeDollarSign",
}
,
 {
  title: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna",
  shortName: "Rajarshi Shahu Fee Reimbursement Scheme",
  keyInfo: {
    duration: "Course duration",
    amount: "Tuition Fee + Examination Fee reimbursement",
    applyFrom: "2013",
    lastDate: "As per MahaDBT notification",
  },
  shortDescription:
    "Fee reimbursement scheme of the Government of Maharashtra providing tuition and examination fee support to eligible students pursuing higher education in approved institutions.",
  detailedDescription: [
    "The Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna is implemented by the Directorate of Higher Education, Government of Maharashtra, through the MahaDBT portal.",
    "The scheme reimburses tuition fees and examination fees to eligible students admitted to recognised professional and non-professional courses in Maharashtra.",
    "Female students are eligible for 100% fee reimbursement, while male students are eligible for up to 50% reimbursement as per government norms and applicable course guidelines.",
  ],
  portalLink: "https://mahadbt.maharashtra.gov.in/",
  benefits: [
    "Reimbursement of tuition fee and examination fee for eligible students studying in recognised institutions in Maharashtra.",
    "100% fee reimbursement for female students and up to 50% reimbursement for male students, subject to scheme rules.",
    "Reduces financial burden and supports continuation of higher education for economically weaker students.",
  ],
  eligibilityCriteria: [
    "Student must be a domicile of Maharashtra.",
    "Annual family income should not exceed ₹8,00,000.",
    "Student must be admitted to a recognised professional or non-professional course in Maharashtra.",
    "Admission should be through CAP or as per the admission norms prescribed by the competent authority.",
    "Student should not be availing any other state or central government scholarship for the same course.",
  ],
  nonEligible: [
    "Students enrolled in distance education, online, part-time, or correspondence courses.",
    "Students admitted to unrecognised institutions or non-approved courses.",
    "Students with an education gap of more than two years (except permissible cases).",
    "Students whose family income exceeds the prescribed limit.",
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
      name: "Domicile Certificate",
      description: "Maharashtra domicile certificate issued by competent authority",
      image: "public/Imges/common/domicile_certificate_sample.jpeg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/en/Login/Login",
      videoGuide: "https://www.youtube.com/watch?v=4tBgZ9NFpRM",
      importance: "High",
    },
    {
      name: "Income Certificate",
      description: "Income certificate showing annual income up to ₹8,00,000",
      image: "public/Imges/common/income_certificate_sample.jpg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1251",
      videoGuide: "https://youtu.be/sHVU8Z7ymvk?si=dvi6DSf1aui6lg1f",
      importance: "High",
    },
    {
      name: "CAP Allotment / Admission Letter",
      description: "Proof of admission through centralized admission process",
      image: "public/Imges/common/cap_allotment_sample.jpg",
      officialLink: "https://fe2025.mahacet.org/StaticPages/HomePage",
      videoGuide: "https://youtube.com/shorts/k8yXpED4YXA?si=afNHgqDVw-gOyPY9",
      importance: "High",
    },
    {
      name: "Hostel Certificate / Rent Agreement",
      description: "Proof of staying in hostel or rented accommodation",
      image: "",
      officialLink: "",
      videoGuide: "https://www.youtube.com/watch?v=AtrhTo0vsao",
      importance: "High",
    },
    {
      name: "Previous Year Marksheet",
      description: "Last passed examination marksheet",
     image: "public/Imges/common/clg_marksheet_sample.jpg",
      officialLink: "",
      videoGuide: "",
      importance: "Medium",
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
      name: "Caste Certificate (OBC / EBC / DNT)",
      description: "Issued by competent authority",
      image: "public/Imges/common/caste_certificate_sample.jpg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/",
      videoGuide: "https://www.youtube.com/watch?v=T88e0nvUBUw",
      importance: "High",
    },
    {
      name: "Fee Receipt",
      description: "Receipt showing payment of tuition and examination fees",
      image: "public/Imges/common/fee_receipt_sample.jpg",
      officialLink: "",
      videoGuide: "",
      importance: "High",
    },
    {
      name: "Gap Certificate (if applicable)",
      description: "Required only if there is a gap in education",
      image: "public/Imges/common/gap_certificate_sample.jpg",
      officialLink: "https://mahadbt.maharashtra.gov.in/",
      videoGuide: "https://youtu.be/beE8rF4MFn0?si=G-3cdxPTape4NJll",
      importance: "Medium",
    },
  ],
  applicationProcess: {
    online: [
      "Register and login on the MahaDBT portal.",
      "Complete profile details including personal, academic, and bank information.",
      "Select the Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna.",
      "Upload required documents and submit the application.",
      "Track application status through institute and department verification stages.",
    ],
  },
  faqs: [
    {
      question: "Is this scheme applicable for all courses?",
      answer:
        "No. The scheme is applicable only to recognised professional and non-professional courses approved by the Government of Maharashtra.",
    },
    {
      question: "Is offline application allowed?",
      answer:
        "No. Applications are accepted only through the MahaDBT online portal.",
    },
    {
      question: "What fees are reimbursed under this scheme?",
      answer:
        "The scheme reimburses tuition fees and examination fees as per government rules.",
    },
  ],
  imageUrl: "/Images/higher_Edu/RSMS.png",
  launchedYear: 2013,
  category: "Scholarships & Financial Aid",
  detailedPage: "higher_education",
  icon: "BadgeDollarSign",
}
,
  {
    title: "Reimbursement of Tuition Fee Scheme for SC/ST/OBC",
    shortName: "Tuition Fee Reimbursement",
    keyInfo: {
      duration: "Course duration",
      amount: "Tuition fee reimbursement",
      applyFrom: "2003",
      lastDate: "As per welfare dept. notice",
    },
    shortDescription: "Scheme providing tuition fee reimbursement for students from SC, ST, and OBC categories.",
    detailedDescription: [
      "Implemented in 2003–04 to reimburse tuition fees for students from Scheduled Castes, Scheduled Tribes and Other Backward Classes studying in higher and professional courses in Maharashtra.",
      "Aims to promote educational inclusion of backward class students by reducing fee-related financial barriers.",
    ],
    portalLink: "https://samajkalyan.maharashtra.gov.in/",
    benefits: [
      "Reimbursement of tuition fees for eligible students from SC, ST, and OBC communities enrolled in approved courses.",
      "Supports participation of backward class students in mainstream higher and professional education.",
    ],
    eligibilityCriteria: [
      "Student must belong to SC, ST, OBC or other eligible backward category and be a resident of Maharashtra.",
      "Enrolled in a government or government-approved private institution and course recognized under the scheme.",
    ],
    nonEligible: [
      "Students studying in unrecognized institutions or pursuing courses not covered under the notified scheme list.",
      "Students drawing equivalent tuition support for the same course from another government scheme.",
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
      name: "Domicile Certificate",
      description: "Maharashtra domicile certificate issued by competent authority",
      image: "public/Imges/common/domicile_certificate_sample.jpeg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/en/Login/Login",
      videoGuide: "https://www.youtube.com/watch?v=4tBgZ9NFpRM",
      importance: "High",
    },
    {
      name: "Income Certificate",
      description: "Income certificate showing annual income up to ₹8,00,000",
      image: "public/Imges/common/income_certificate_sample.jpg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1251",
      videoGuide: "https://youtu.be/sHVU8Z7ymvk?si=dvi6DSf1aui6lg1f",
      importance: "High",
    },
    {
      name: "CAP Allotment / Admission Letter",
      description: "Proof of admission through centralized admission process",
      image: "public/Imges/common/cap_allotment_sample.jpg",
      officialLink: "https://fe2025.mahacet.org/StaticPages/HomePage",
      videoGuide: "https://youtube.com/shorts/k8yXpED4YXA?si=afNHgqDVw-gOyPY9",
      importance: "High",
    },
    {
      name: "Hostel Certificate / Rent Agreement",
      description: "Proof of staying in hostel or rented accommodation",
      image: "",
      officialLink: "",
      videoGuide: "https://www.youtube.com/watch?v=AtrhTo0vsao",
      importance: "High",
    },
    {
      name: "Previous Year Marksheet",
      description: "Last passed examination marksheet",
     image: "public/Imges/common/clg_marksheet_sample.jpg",
      officialLink: "",
      videoGuide: "",
      importance: "Medium",
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
      name: "Caste Certificate",
      description: "Issued by competent authority",
      image: "public/Imges/common/caste_certificate_sample.jpg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/",
      videoGuide: "https://www.youtube.com/watch?v=T88e0nvUBUw",
      importance: "High",
    },
    {
      name: "Fee Receipt",
      description: "Receipt showing payment of tuition and examination fees",
      image: "public/Imges/common/fee_receipt_sample.jpg",
      officialLink: "",
      videoGuide: "",
      importance: "High",
    },
    {
      name: "Gap Certificate (if applicable)",
      description: "Required only if there is a gap in education",
      image: "public/Imges/common/gap_certificate_sample.jpg",
      officialLink: "https://mahadbt.maharashtra.gov.in/",
      videoGuide: "https://youtu.be/beE8rF4MFn0?si=G-3cdxPTape4NJll",
      importance: "Medium",
    },
    ],
    applicationProcess: {
      online: [
        "Log in to the state social welfare/MahaDBT portal using student credentials.",
        "Select the tuition fee reimbursement scheme applicable to SC/ST/OBC students.",
        "Fill in course, fee, institute and category details and upload caste certificate, fee receipt, admission proof and other required documents.",
        "Submit the application for institute and department verification and track its status online.",
      ],
      offline: [
        "Obtain the application form from the college administration office or local social welfare/backward class welfare office.",
        "Fill the form with personal, academic and fee details and attach caste certificate, fee receipt and admission documents.",
        "Submit the completed form to the college or concerned welfare office for verification and processing.",
      ],
    },
    faqs: [
      {
        question: "Is there any income limit for this fee reimbursement scheme?",
        answer: "Some categories and course combinations may have income criteria; students should refer to the latest state GR or portal instructions to confirm applicable income limits.",
      },
      {
        question: "Does the scheme cover other charges like hostel fees?",
        answer: "This scheme is mainly focused on tuition fee reimbursement; separate schemes may exist for hostel or maintenance support depending on category and course.",
      },
    ],
    imageUrl: "/Images/higher_Edu/TF.jpg",
    launchedYear: 2003,
    category: "Scholarships & Financial Aid",
    detailedPage: "higher_education",
    icon: "BadgeDollarSign",
  },
];

const InsertData=async()=>{
    connection();
    await HE.deleteMany();
    const ack=await HE.insertMany(data);
}
InsertData()