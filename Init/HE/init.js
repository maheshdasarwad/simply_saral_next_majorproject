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
      amount: "Hostel/living allowance",
      applyFrom: "2011",
      lastDate: "As per state schedule",
    },
    shortDescription: "A scheme providing financial assistance for hostel and living expenses to students in higher education.",
    detailedDescription: [
      "Provides a maintenance allowance to students staying in hostels or rented accommodation to support food and lodging expenses during higher education.",
      "Primarily targets economically weaker students from farming and labour families to encourage continuation of higher studies.",
      "Benefits and income limits differ based on rural–urban category, course type, and social category as per updated GRs.",
    ],
    portalLink: "https://highereducation.maharashtra.gov.in/",
    benefits: [
      "Financial aid for hostel and living expenses for eligible students from Maharashtra.",
      "Reduces cost burden on families, enabling economically weaker students to pursue higher and professional courses.",
      "Applicable across a wide range of recognized courses and institutions where hostel or paying-guest stay is necessary.",
    ],
    eligibilityCriteria: [
      "Permanent resident of Maharashtra enrolled in a recognized higher or professional education institution in the state.",
      "Staying in a government/recognized hostel or in rented accommodation away from home for educational purposes.",
      "Annual family income within the limits prescribed in the latest government resolutions for the scheme.",
    ],
    nonEligible: [
      "Students already receiving full residential support or hostel facility under another government scheme.",
      "Students not fulfilling residency, income, or course-type conditions laid down in scheme guidelines.",
    ],
    requiredDocuments: [
      {
        name: "Identity Proof (Aadhaar or equivalent)",
        description: "Aadhaar card, voter ID, or other government-issued identity proof",
        image: "",
        officialLink: "https://highereducation.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Address Proof",
        description: "Ration card, electricity bill, or rental agreement showing current address",
        image: "",
        officialLink: "https://highereducation.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Admission Letter / Bonafide Certificate",
        description: "Proof of current enrollment from the educational institution",
        image: "",
        officialLink: "https://highereducation.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Income Certificate",
        description: "Valid income certificate issued by competent authority",
        image: "",
        officialLink: "https://highereducation.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Hostel / Rent Agreement or Certificate",
        description: "Proof of hostel stay or rented accommodation away from home",
        image: "",
        officialLink: "https://highereducation.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Photograph",
        description: "Recent passport-size photograph",
        image: "",
        officialLink: "https://highereducation.maharashtra.gov.in/",
        videoGuide: "",
        importance: "Medium",
      },
      {
        name: "Bank Account Details",
        description: "Bank passbook first page or cancelled cheque",
        image: "",
        officialLink: "https://highereducation.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
    ],
    applicationProcess: {
      online: [
        "Visit the Maharashtra DBT/scholarship portal linked from the higher education department website.",
        "Register as a student, update profile details, and select the Dr. Panjabrao Deshmukh Vastigruh Nirvah Bhatta Yojna.",
        "Fill in course, institution, hostel/accommodation, and income details in the online form.",
        "Upload scanned copies of required documents including income certificate, admission letter, hostel or rent proof, and bank details.",
        "Submit the application for institute and department verification and track status online.",
      ],
      offline: [
        "Approach the college or institute scholarship cell for guidance if offline support is available.",
        "Fill in the prescribed form (or download, fill, and submit through the institute) with all necessary details.",
        "Attach photocopies of income certificate, address proof, admission and hostel documents, and bank details.",
        "Submit the form to the institutional authority for verification and forwarding to the concerned department.",
      ],
    },
    faqs: [
      {
        question: "Who can apply for Dr. Panjabrao Deshmukh Vastigruh Nirvah Bhatta Yojna?",
        answer: "Students who are permanent residents of Maharashtra, studying in recognized higher education institutions and staying away from home in hostels or rented accommodation, with family income within notified limits, can apply as per scheme rules.",
      },
      {
        question: "Is this scheme available for all types of courses?",
        answer: "The scheme generally covers approved higher and professional courses notified by the state; students should check the latest eligibility list on the state scholarship portal or department website.",
      },
    ],
    imageUrl: "/Images/higher_Edu/PJVNB.jpg",
    launchedYear: 2011,
    category: "Scholarships & Financial Aid",
    detailedPage: "/schemes/panjabrao-deshmukh-bhatta",
    icon: "BadgeDollarSign",
  },
  {
    title: "Post-Matric Scholarship Scheme",
    shortName: "Post‑Matric Scholarship",
    keyInfo: {
      duration: "Course duration",
      amount: "Fees + maintenance",
      applyFrom: "1944",
      lastDate: "As per NSP calendar",
    },
    shortDescription: "Government-funded scholarship enabling students from SC, ST, OBC and other notified communities to pursue post-matric studies.",
    detailedDescription: [
      "Introduced in the 1940s and subsequently revised, the Post‑Matric Scholarship schemes provide financial assistance to students from Scheduled Castes, Scheduled Tribes, Other Backward Classes and other eligible categories for studies beyond Class 10.",
      "The assistance generally covers compulsory non‑refundable fees such as tuition and exam fees along with a monthly maintenance allowance based on course category and whether the student is a hosteller or day scholar.",
      "Implementation is routed through state/UT welfare departments, with applications commonly made via the National Scholarship Portal for central components.",
    ],
    portalLink: "https://scholarships.gov.in/",
    benefits: [
      "Reimbursement of tuition and examination fees for eligible post‑matric and post‑secondary courses.",
      "Payment of maintenance allowance to support boarding, lodging, and other study-related expenses.",
      "Increases retention and transition rates of students from disadvantaged communities into higher education.",
    ],
    eligibilityCriteria: [
      "Belongs to the specified community (such as SC, ST, OBC, EBC or other notified category) under the relevant Post‑Matric scheme variant.",
      "Has passed the previous qualifying examination and secured admission in a recognized post-matric or post‑secondary course.",
      "Annual family income does not exceed the limit notified for the respective category and scheme component.",
    ],
    nonEligible: [
      "Students who are already receiving another scholarship for the same course that duplicates tuition and maintenance benefits.",
      "Students who have failed to progress to the next class or do not meet attendance and academic performance conditions laid down by the scheme.",
    ],
    requiredDocuments: [
      {
        name: "Caste/Community Certificate",
        description: "Valid caste certificate issued by competent authority",
        image: "",
        officialLink: "https://scholarships.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Income Certificate",
        description: "Family income certificate for the assessment year",
        image: "",
        officialLink: "https://scholarships.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Previous Year Marksheet",
        description: "Marksheet of last qualifying examination",
        image: "",
        officialLink: "https://scholarships.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Fee Receipt / Admission Proof",
        description: "Current course fee receipt or admission letter",
        image: "",
        officialLink: "https://scholarships.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Bank Passbook / Account Details",
        description: "First page of passbook or cancelled cheque",
        image: "",
        officialLink: "https://scholarships.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Photograph",
        description: "Recent passport-size photograph",
        image: "",
        officialLink: "https://scholarships.gov.in/",
        videoGuide: "",
        importance: "Medium",
      },
    ],
    applicationProcess: {
      online: [
        "Register or log in on the National Scholarship Portal (NSP).",
        "Select the appropriate Post‑Matric Scholarship scheme based on category and state.",
        "Fill in academic, personal, and bank details and upload required documents including caste and income certificates, marksheet, and fee receipt.",
        "Submit the application and track institute and state‑level verification status through NSP.",
      ],
      offline: [
        "Where applicable, obtain the Post‑Matric Scholarship form from the institution or district welfare office.",
        "Fill the form with personal, course, and bank details and attach photocopies of caste, income, marksheet and fee receipts.",
        "Submit the application to the institution or designated welfare office for verification and forwarding.",
      ],
    },
    faqs: [
      {
        question: "Can a student receive Post‑Matric Scholarship along with another scholarship?",
        answer: "Generally, students cannot draw two scholarships that both cover tuition and maintenance for the same course; they should read scheme rules regarding combination with other benefits.",
      },
      {
        question: "Is renewal automatic each year?",
        answer: "Renewal usually depends on passing the previous class and maintaining the required attendance and conduct; students must re‑apply or renew on the portal as per annual instructions.",
      },
    ],
    imageUrl: "/Images/higher_Edu/POST.jpg",
    launchedYear: 1944,
    category: "Scholarships & Financial Aid",
    detailedPage: "/schemes/post-matric-scholarship",
    icon: "BadgeDollarSign",
  },
  {
    title: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna",
    shortName: "Rajarshi Shahu Fee Scholarship",
    keyInfo: {
      duration: "Course duration",
      amount: "Tuition fee reimbursement",
      applyFrom: "2013",
      lastDate: "As per MahaDBT schedule",
    },
    shortDescription: "Scholarship scheme providing tuition fee support for meritorious and eligible students in Maharashtra.",
    detailedDescription: [
      "Provides reimbursement of tuition fees for eligible students from Maharashtra pursuing higher and professional education in approved institutions.",
      "Targets economically weaker and reserved category students to reduce financial barriers and improve access to quality education.",
    ],
    portalLink: "https://mahaeschol.maharashtra.gov.in/",
    benefits: [
      "Reimbursement of tuition fees for eligible students studying in recognized colleges and universities in Maharashtra.",
      "Reduces out-of-pocket expenditure on fees, making professional and technical education more affordable.",
      "Encourages continuation of studies for meritorious students who may otherwise discontinue due to cost.",
    ],
    eligibilityCriteria: [
      "Resident of Maharashtra enrolled in an approved course and institution covered under the scheme.",
      "Meets category, income, and academic performance conditions specified for the specific variant of the scholarship.",
    ],
    nonEligible: [
      "Students enrolled in non-recognized institutions or non-approved courses.",
      "Students already availing full tuition support under another overlapping state scholarship for the same course.",
    ],
    requiredDocuments: [
      {
        name: "Previous Year Marksheet",
        description: "Marksheet of the last academic year showing academic performance",
        image: "",
        officialLink: "https://mahaeschol.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Admission Receipt / Fee Receipt",
        description: "Proof of fee payment and current course admission",
        image: "",
        officialLink: "https://mahaeschol.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Bank Details / Passbook",
        description: "Bank account details for direct benefit transfer",
        image: "",
        officialLink: "https://mahaeschol.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Income and Category Documents (if applicable)",
        description: "Income certificate and caste certificate if required for the scheme variant",
        image: "",
        officialLink: "https://mahaeschol.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Photograph",
        description: "Recent passport-size photograph",
        image: "",
        officialLink: "https://mahaeschol.maharashtra.gov.in/",
        videoGuide: "",
        importance: "Medium",
      },
    ],
    applicationProcess: {
      online: [
        "Register and log in on the Maharashtra scholarship/MahaDBT portal.",
        "Select the Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti or relevant fee scholarship scheme.",
        "Fill course, institution, fee, and bank details and upload required documents.",
        "Submit the application for institute-level and department-level verification and monitor status online.",
      ],
      offline: [
        "Contact the institutional scholarship cell for guidance and, where allowed, fill paper forms with the same details as on the portal.",
        "Attach fee receipts, marksheets, and required category/income documents.",
        "Submit to the authorized institutional authority for verification and forwarding to the department.",
      ],
    },
    faqs: [
      {
        question: "Does the scheme cover all fees or only tuition fees?",
        answer: "The scheme focuses primarily on tuition fee reimbursement as per government notifications; other charges may or may not be covered depending on the latest GR and scheme variant.",
      },
      {
        question: "Is there any academic performance condition?",
        answer: "Yes, continuation and sanction may require passing the previous exam and maintaining academic standards as specified in the state guidelines.",
      },
    ],
    imageUrl: "/Images/higher_Edu/RSMS.png",
    launchedYear: 2013,
    category: "Scholarships & Financial Aid",
    detailedPage: "/schemes/shahu-maharaj-shishyavrutti",
    icon: "BadgeDollarSign",
  },
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
        name: "Caste Certificate",
        description: "Valid caste certificate issued by competent authority",
        image: "",
        officialLink: "https://samajkalyan.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Tuition Fee Receipt",
        description: "Original fee receipt showing tuition fee payment",
        image: "",
        officialLink: "https://samajkalyan.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Admission Letter / Bonafide Certificate",
        description: "Proof of enrollment from the educational institution",
        image: "",
        officialLink: "https://samajkalyan.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Income Certificate (if required)",
        description: "Income certificate if applicable for the specific category",
        image: "",
        officialLink: "https://samajkalyan.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Photograph",
        description: "Recent passport-size photograph",
        image: "",
        officialLink: "https://samajkalyan.maharashtra.gov.in/",
        videoGuide: "",
        importance: "Medium",
      },
      {
        name: "Bank Account Details",
        description: "Bank passbook first page or cancelled cheque for DBT",
        image: "",
        officialLink: "https://samajkalyan.maharashtra.gov.in/",
        videoGuide: "",
        importance: "High",
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
    detailedPage: "/schemes/tuition-fee-reimbursement",
    icon: "BadgeDollarSign",
  },
];

const InsertData=async()=>{
    connection();
    await HE.deleteMany();
    const ack=await HE.insertMany(data);
}
InsertData()