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
import PE from "../../models/PrimaryEducation.js";

const data = [
  {
    title: "Right to Education (RTE) Act, 2009",
    shortName: "RTE Act",
    keyInfo: {
      duration: "Age 6–14",
      amount: "Free schooling",
      applyFrom: "2010",
      lastDate: "Ongoing",
    },
    shortDescription: "Free and compulsory education for children aged 6-14 years, with special focus on underprivileged groups.",
    portalLink: "https://education.gov.in/rte",
    detailedDescription: [
      "A landmark legislation making education a fundamental right for children aged 6–14 years and mandating free and compulsory elementary education.",
      "Includes provisions like neighbourhood schools, no capitation fees, no screening procedure, and norms for pupil–teacher ratio and infrastructure.",
      "Requires private unaided schools to reserve 25% of entry-level seats for children from economically weaker sections and disadvantaged groups.",
    ],
    benefits: [
      "Free education for children aged 6–14 years in neighbourhood schools.",
      "25% reservation in private unaided schools at entry level for EWS and disadvantaged groups.",
      "Improvement of school infrastructure, teacher availability, and learning conditions.",
      "Protection against discrimination and arbitrary expulsion or detention.",
    ],
    eligibilityCriteria: [
      "Children aged 6 to 14 years.",
      "Resident of India within the jurisdiction of the local authority/school.",
      "For 25% reserved seats: belongs to eligible categories such as Economically Weaker Sections (EWS) and disadvantaged groups as defined by the state.",
    ],
    nonEligible: [
      "Children outside the specified age group for RTE coverage (below 6 or above 14) for this specific entitlement.",
    ],
    requiredDocuments: [
      {
        name: "Identity Proof (child/parent)",
        description: "Aadhaar card, birth certificate, or other valid identity proof of child or parent/guardian",
        image: "",
        officialLink: "https://education.gov.in/rte-guidelines.pdf",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Address Proof",
        description: "Ration card, electricity bill, or residence certificate showing local address",
        image: "",
        officialLink: "https://education.gov.in/rte-guidelines.pdf",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Income Certificate (for EWS)",
        description: "Family income certificate for Economically Weaker Section category eligibility",
        image: "",
        officialLink: "https://education.gov.in/rte-guidelines.pdf",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Caste/Category Certificate (if applicable)",
        description: "Caste certificate for disadvantaged group reservation eligibility",
        image: "",
        officialLink: "https://education.gov.in/rte-guidelines.pdf",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Disability Certificate (for CwSN)",
        description: "Medical certificate for Children with Special Needs (CwSN) quota",
        image: "",
        officialLink: "https://education.gov.in/rte-guidelines.pdf",
        videoGuide: "",
        importance: "High",
      },
    ],
    applicationProcess: {
      online: [
        "Register on the state/UT RTE or school admission portal, select area and preferred schools, fill child's details and upload supporting documents, then submit the application and track allotment.",
      ],
      offline: [
        "Visit the nearest government or participating private school or local education office, fill the RTE admission form, attach required documents, and submit for verification and seat allocation.",
      ],
    },
    faqs: [
      {
        question: "Is any fee charged under RTE for children aged 6–14?",
        answer: "No tuition or compulsory fees are to be charged for children covered under the free and compulsory education provisions in government schools and for RTE seats in private unaided schools.",
      },
      {
        question: "What percentage of seats are reserved in private unaided schools?",
        answer: "At least 25% of entry-level seats are reserved for children from economically weaker sections and disadvantaged groups as per the Act.",
      },
    ],
    imageUrl: "/Images/school_Edu/RTE.jpg",
    launchedYear: 2010,
    category: "School Education & Rights",
    detailedPage: "/schemes/rte-act",
    icon: "ShieldCheck",
  },
  {
    title: "Pradhan Mantri Schools for Rising India (PM SHRI Schools)",
    shortName: "PM SHRI Schools",
    keyInfo: {
      duration: "Scheme period",
      amount: "School-level grants",
      applyFrom: "2022",
      lastDate: "As per MoE",
    },
    shortDescription: "Model schools initiative for top quality education, infrastructure, digital learning, and sustainable development.",
    portalLink: "https://pmshrischools.education.gov.in",
    detailedDescription: [
      "A centrally sponsored scheme to develop selected existing schools into PM SHRI Schools as exemplary schools demonstrating all components of the National Education Policy.",
      "Focuses on high-quality infrastructure, inclusive and holistic education, technology integration, and green and sustainable practices.",
    ],
    benefits: [
      "Upgradation of infrastructure including smart classrooms, labs, libraries and sports facilities.",
      "Support for digital learning, experiential pedagogy, and skill-based education.",
      "Strengthened teacher training and professional development.",
      "Promotion of inclusive, accessible and environment-friendly school campuses.",
    ],
    eligibilityCriteria: [
      "Covers eligible Kendriya Vidyalayas, Jawahar Navodaya Vidyalayas, and state/UT government schools fulfilling PM SHRI selection criteria.",
      "Schools must meet prescribed benchmarks related to infrastructure, learning outcomes, governance and environmental sustainability to be selected.",
    ],
    nonEligible: [
      "Schools that do not meet minimum eligibility or fail selection/verification as per PM SHRI guidelines.",
    ],
    requiredDocuments: [
      {
        name: "School Recognition / Affiliation Certificate",
        description: "Valid school recognition or CBSE/State board affiliation certificate",
        image: "",
        officialLink: "https://pmshrischools.education.gov.in/guidelines.pdf",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Infrastructure and Facilities Report",
        description: "Detailed report of existing school infrastructure and facilities",
        image: "",
        officialLink: "https://pmshrischools.education.gov.in/guidelines.pdf",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Teacher Strength and Qualification Details",
        description: "List of teachers with qualifications and experience details",
        image: "",
        officialLink: "https://pmshrischools.education.gov.in/guidelines.pdf",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "School Development / Sustainability Plan",
        description: "Comprehensive plan for school upgradation and sustainability practices",
        image: "",
        officialLink: "https://pmshrischools.education.gov.in/guidelines.pdf",
        videoGuide: "",
        importance: "High",
      },
    ],
    applicationProcess: {
      online: [
        "Eligible schools or authorities register on the PM SHRI portal, fill the nomination form with details on infrastructure, academics and sustainability indicators, upload required documents, and submit for appraisal.",
      ],
      offline: [
        "Schools coordinate with district/state education departments, prepare the School Development Plan and necessary reports as per PM SHRI guidelines, and submit to competent authorities for verification and nomination.",
      ],
    },
    faqs: [
      {
        question: "Are PM SHRI Schools new schools or existing ones?",
        answer: "PM SHRI Schools are selected from existing government schools (including KVs and JNVs) that are upgraded to serve as model schools.",
      },
      {
        question: "Do students have to pay extra fees to study in PM SHRI Schools?",
        answer: "PM SHRI Schools remain government schools; fee and access norms continue to follow applicable government/affiliation rules.",
      },
    ],
    imageUrl: "/Images/school_Edu/PM_SHRI.jpg",
    launchedYear: 2022,
    category: "School Education & Rights",
    detailedPage: "/schemes/pm-shri-schools",
    icon: "Building",
  },
  {
    title: "Digital Infrastructure for Knowledge Sharing (DIKSHA)",
    shortName: "DIKSHA",
    keyInfo: {
      duration: "Ongoing",
      amount: "Free content",
      applyFrom: "2017",
      lastDate: "Not applicable",
    },
    shortDescription: "Free digital portal offering e-learning resources for students, teachers, and schools throughout India.",
    portalLink: "https://diksha.gov.in",
    detailedDescription: [
      "A national digital platform that offers free e‑content, QR‑coded textbooks and interactive resources for school education.",
      "Provides multilingual resources aligned to state and national curricula along with teacher professional development courses.",
    ],
    benefits: [
      "Free access to digital textbooks, videos, quizzes and interactive materials for Classes 1–12.",
      "Online and app-based teacher training modules and certification.",
      "Supports anytime, anywhere learning and content sharing across states and boards.",
      "Facilitates inclusive access through offline download options and QR‑coded textbooks.",
    ],
    eligibilityCriteria: [
      "Students from Class 1 to 12 in India.",
      "All teachers in government, government-aided and private schools.",
      "Recognized educational institutions and education officials.",
    ],
    nonEligible: [],
    requiredDocuments: [
      {
        name: "Teacher/Institution ID (for advanced access)",
        description: "Teacher ID card or institution recognition number for advanced features",
        image: "",
        officialLink: "https://diksha.gov.in/guidelines.pdf",
        videoGuide: "",
        importance: "Medium",
      },
      {
        name: "Institution Details (for admin roles)",
        description: "School UDISE code or institution details for administrative access",
        image: "",
        officialLink: "https://diksha.gov.in/guidelines.pdf",
        videoGuide: "",
        importance: "Medium",
      },
      {
        name: "Student Credentials (as per school/board login)",
        description: "School-issued student ID or board registration number if required",
        image: "",
        officialLink: "https://diksha.gov.in/guidelines.pdf",
        videoGuide: "",
        importance: "Low",
      },
    ],
    applicationProcess: {
      online: [
        "Visit the DIKSHA portal or install the DIKSHA app, select role (student/teacher/parent), choose language and board, and start accessing available resources or courses.",
      ],
      offline: [
        "Download DIKSHA resources on school devices or via QR‑coded textbooks for use in classrooms or community learning centres with limited connectivity.",
      ],
    },
    faqs: [
      {
        question: "Is there any fee to use DIKSHA?",
        answer: "No, DIKSHA is a free platform; learners and teachers can access content without subscription charges.",
      },
      {
        question: "Can DIKSHA be used without internet?",
        answer: "Content can be downloaded via the app or accessed through QR‑coded textbooks for offline use where connectivity is limited.",
      },
    ],
    imageUrl: "/Images/school_Edu/DIKSHA.jpg",
    launchedYear: 2017,
    category: "School Education & Rights",
    detailedPage: "/schemes/diksha",
    icon: "BookOpen",
  },
];

const InsertData=async()=>{
    connection();
    await PE.deleteMany();
    const ack=await PE.insertMany(data);
}
InsertData()