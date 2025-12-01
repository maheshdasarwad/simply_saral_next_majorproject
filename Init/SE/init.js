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
import SE from "../../models/SecondaryEducation.js"

const schemes = [
  {
    title: "Vocational Education Scheme (Under NSQF)",
    shortName: "NSQF Vocational Education",
    keyInfo: {
      duration: "Class 9–12",
      amount: "Free training",
      applyFrom: "2013",
      lastDate: "As per state",
    },
    shortDescription: "Integrates skill-based education with academics for secondary & higher secondary students to boost employability.",
    portalLink: "https://www.nsdcindia.org/nsqf",
    detailedDescription: [
      "Under NSQF-aligned vocational education, students in Classes 9–12 can opt for industry-oriented subjects like IT, Healthcare, Retail and Agriculture alongside academics.",
      "Courses are delivered in collaboration with Sector Skill Councils, including practical training, assessment and certification at different NSQF levels.",
      "Priority is generally given to government and aided schools and students from economically weaker and disadvantaged backgrounds.",
    ],
    benefits: [
      "Industry-based training within school timetable.",
      "Multiple career and further education pathways.",
      "Government-funded training for eligible schools and students.",
      "NSQF level skill certification recognised by industry.",
      "Exposure to internships, apprenticeships or placement support links.",
    ],
    eligibilityCriteria: [
      "Resident of India enrolled in Class 9 to 12 in a government or government-aided school implementing NSQF vocational courses.",
      "Age typically between 14 and 18 years at the time of enrollment.",
      "Regular attendance and participation in prescribed vocational classes as per school norms.",
    ],
    nonEligible: [
      "Students outside Classes 9–12.",
      "Students not enrolled in schools offering NSQF vocational subjects.",
    ],
    requiredDocuments: [
      {
        name: "Aadhaar Card",
        description: "Valid Aadhaar card of the student for identity verification",
        image: "",
        officialLink: "https://uidai.gov.in",
        videoGuide: "https://www.youtube.com/vocational-education-india",
        importance: "High",
      },
      {
        name: "School ID / Bonafide Certificate",
        description: "Proof of current enrollment from the school",
        image: "",
        officialLink: "https://samagrashiksha.education.gov.in/forms",
        videoGuide: "https://www.youtube.com/vocational-education-india",
        importance: "High",
      },
      {
        name: "Parental Consent Form",
        description: "Signed consent from parents/guardian for vocational training enrollment",
        image: "",
        officialLink: "https://samagrashiksha.education.gov.in/forms",
        videoGuide: "https://www.youtube.com/vocational-education-india",
        importance: "High",
      },
    ],
    applicationProcess: {
      online: [
        "Where enabled, register on state/NSDC/NSQF portals through the school, select an approved vocational job role, complete the basic form and upload student and school details, then track enrollment status online.",
      ],
      offline: [
        "Visit the school's vocational education department, fill the vocational enrollment form, choose a vocational stream, and allow the school to coordinate with the Sector Skill Council and implementing partner for batches and certification.",
      ],
    },
    faqs: [
      {
        question: "Is vocational training under NSQF free for school students?",
        answer: "For approved government and aided schools, vocational training is generally funded under Samagra Shiksha/NSQF components, so students are not charged separate training fees.",
      },
      {
        question: "What is NSQF certification?",
        answer: "It is a nationally recognised skill qualification level certification that indicates competencies attained in a specific job role as per NSQF.",
      },
    ],
    imageUrl: "/Images/school_Edu/NSQF.jpg",
    launchedYear: 2013,
    category: "Skill & Employability Enhancement",
    detailedPage: "/schemes/vocational-education-nsqf",
    icon: "GraduationCap",
  },
  {
    title: "Samagra Shiksha Abhiyan (Samagra Shiksha)",
    shortName: "Samagra Shiksha",
    keyInfo: {
      duration: "Pre‑primary–Class 12",
      amount: "School grants",
      applyFrom: "2018",
      lastDate: "Annual plan cycle",
    },
    shortDescription: "Government's flagship integrated scheme for accessible, equitable, high-quality school education from pre-primary to Class 12.",
    portalLink: "https://samagrashiksha.education.gov.in",
    detailedDescription: [
      "Samagra Shiksha subsumes Sarva Shiksha Abhiyan, RMSA and Teacher Education into one integrated scheme covering school education from pre-primary to senior secondary.",
      "Provides funding for infrastructure, digital initiatives, teacher training, inclusive education, and incentives like free uniforms and textbooks for eligible students.",
    ],
    benefits: [
      "Infrastructure support for classrooms, laboratories, libraries and toilets.",
      "Support for digital classrooms, ICT labs and e‑learning content.",
      "Inclusive education interventions for children with disabilities and disadvantaged groups.",
      "Remedial teaching, girls' education initiatives and grants for uniforms and textbooks.",
    ],
    eligibilityCriteria: [
      "Government and government‑aided schools covered under state Samagra Shiksha plans.",
      "Schools with approved annual work plan and budget submitted through the state project office.",
    ],
    nonEligible: [
      "Unrecognized or purely private unaided schools that are not part of the approved plan.",
    ],
    requiredDocuments: [
      {
        name: "School Registration/Affiliation Certificate",
        description: "Valid government recognition or board affiliation certificate",
        image: "",
        officialLink: "https://samagrashiksha.education.gov.in/forms",
        videoGuide: "https://www.youtube.com/ssa-education",
        importance: "High",
      },
      {
        name: "School Development Plan / UDISE Details",
        description: "School UDISE code and comprehensive development plan",
        image: "",
        officialLink: "https://samagrashiksha.education.gov.in/forms",
        videoGuide: "https://www.youtube.com/ssa-education",
        importance: "High",
      },
      {
        name: "Teacher and Student Data (as per UDISE)",
        description: "Updated teacher and student enrollment data as per UDISE+ reporting",
        image: "",
        officialLink: "https://samagrashiksha.education.gov.in/forms",
        videoGuide: "https://www.youtube.com/ssa-education",
        importance: "High",
      },
    ],
    applicationProcess: {
      online: [
        "State and district offices prepare and upload annual work plans and budget proposals on the Samagra Shiksha portal, with school inputs for infrastructure, training and interventions.",
      ],
      offline: [
        "Schools submit proposals and requirements through district/state Samagra Shiksha offices, which consolidate, appraise and forward them for approval and fund release.",
      ],
    },
    faqs: [
      {
        question: "Who can receive support under Samagra Shiksha?",
        answer: "Registered government and government‑aided schools included in the approved state annual work plan and budget are eligible for different components.",
      },
      {
        question: "Are there special provisions for girls and disadvantaged students?",
        answer: "Yes, the scheme has focused interventions such as girls' hostels, KGBVs, inclusive education support, remedial teaching and incentives for disadvantaged groups.",
      },
    ],
    imageUrl: "/Images/school_Edu/Samagra.jpg",
    launchedYear: 2018,
    category: "School Infrastructure Development",
    detailedPage: "/schemes/samagra-shiksha-abhiyan",
    icon: "Building",
  },
  {
    title: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    shortName: "NMMSS",
    keyInfo: {
      duration: "Class 9–12",
      amount: "₹12,000/year",
      applyFrom: "2008",
      lastDate: "As per NSP",
    },
    shortDescription: "Central scholarship scheme for meritorious students from economically weaker sections (Class 9–12).",
    portalLink: "https://scholarships.gov.in/",
    detailedDescription: [
      "Provides scholarships to meritorious students from economically weaker sections to reduce dropouts at class 8 and encourage continuation of studies at the secondary stage.",
      "Selected students receive an annual scholarship amount credited directly to their bank accounts through DBT, subject to renewal conditions.",
    ],
    benefits: [
      "Annual scholarship of ₹12,000 per eligible student through Direct Benefit Transfer.",
      "Encourages academic performance and reduces dropout between upper primary and secondary levels.",
      "Covers students across states and UTs through state‑wise quotas.",
    ],
    eligibilityCriteria: [
      "Regular Class 8 students in government, government‑aided or local body schools.",
      "Annual family income generally not exceeding ₹3,50,000 (or current notified limit).",
      "Minimum prescribed marks in Class 7 and qualifying in the NMMSS selection test (with relaxations for SC/ST).",
    ],
    nonEligible: [
      "Students of private unaided schools.",
      "Students exceeding the income limit or not qualifying the merit test.",
    ],
    requiredDocuments: [
      {
        name: "Student Aadhaar Card or ID",
        description: "Aadhaar number or valid student identity proof",
        image: "",
        officialLink: "https://uidai.gov.in",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Income Certificate",
        description: "Valid family income certificate for the assessment year",
        image: "",
        officialLink: "https://scholarships.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Previous Class Marksheet",
        description: "Class 7 marksheet showing minimum required percentage",
        image: "",
        officialLink: "https://scholarships.gov.in/",
        videoGuide: "",
        importance: "High",
      },
      {
        name: "Bank Account Details",
        description: "Student's bank account details for DBT scholarship payment",
        image: "",
        officialLink: "https://scholarships.gov.in/",
        videoGuide: "",
        importance: "High",
      },
    ],
    applicationProcess: {
      online: [
        "Apply on the National Scholarship Portal under NMMSS during the application window.",
        "Appear in the state/UT‑conducted NMMSS selection test and qualify as per cut‑off.",
        "Upload income, marksheet, and bank details and track application and payment status on NSP.",
      ],
      offline: [
        "Obtain information through the school or district education office about NMMSS notification.",
        "Submit required documents to the school for forwarding to authorities for test registration and verification.",
      ],
    },
    faqs: [
      {
        question: "Who is eligible for NMMSS?",
        answer: "Class 8 students of government, government‑aided and local body schools from economically weaker families who meet income and merit criteria are eligible.",
      },
      {
        question: "How is the scholarship amount paid?",
        answer: "The scholarship is paid directly into the selected student's bank account through the Direct Benefit Transfer system via NSP.",
      },
    ],
    imageUrl: "/Images/school_Edu/NMMSS.jpg",
    launchedYear: 2008,
    category: "Scholarships & Financial Aid",
    detailedPage: "/schemes/nmmss",
    icon: "BadgeDollarSign",
  },
  {
    title: "Rashtriya Madhyamik Shiksha Abhiyan (RMSA)",
    shortName: "RMSA",
    keyInfo: {
      duration: "Class 9–12",
      amount: "School grants",
      applyFrom: "2009",
      lastDate: "Merged into Samagra",
    },
    shortDescription: "Government program for secondary education improvement—access, infrastructure, scholarships—for Classes 9–12.",
    portalLink: "https://dsel.education.gov.in/rmsa",
    detailedDescription: [
      "Launched to enhance access to and quality of secondary education through infrastructure expansion, teacher recruitment and training, and special equity interventions.",
      "Now subsumed under Samagra Shiksha, but earlier supported upgradation of secondary schools and scholarships or incentives for disadvantaged students.",
    ],
    benefits: [
      "Support for building and upgrading secondary school infrastructure, including classrooms and labs.",
      "Provision for ICT, smart classrooms and pedagogical support at the secondary level.",
      "Teacher training and capacity building programmes.",
      "Scholarships or incentives for students from EWS, SC/ST and minority communities as per state norms.",
    ],
    eligibilityCriteria: [
      "Government and aided secondary/senior secondary schools included in RMSA/Samagra state plans.",
      "Students nominated by schools under equity and scholarship components as per guidelines.",
    ],
    nonEligible: [
      "Unrecognized and purely private unaided schools not covered under the scheme.",
      "Students who do not meet category or academic criteria for targeted benefits.",
    ],
    requiredDocuments: [
      {
        name: "School Infrastructure and Development Proposal",
        description: "Detailed proposal for infrastructure upgradation and development needs",
        image: "",
        officialLink: "https://dsel.education.gov.in/rmsa",
        videoGuide: "https://www.youtube.com/user/MyGovIndia",
        importance: "High",
      },
      {
        name: "Student Nomination/Beneficiary Details (for incentives)",
        description: "List of eligible students for equity and scholarship components",
        image: "",
        officialLink: "https://dsel.education.gov.in/rmsa",
        videoGuide: "https://www.youtube.com/user/MyGovIndia",
        importance: "High",
      },
    ],
    applicationProcess: {
      online: [
        "State and district authorities upload RMSA/Samagra secondary plans and proposals on designated portals, including school-wise infrastructure and training needs.",
      ],
      offline: [
        "Schools submit proposals and student nominations to district or state project offices, which verify and forward them for sanction and fund allocation.",
      ],
    },
    faqs: [
      {
        question: "Is RMSA still a separate scheme?",
        answer: "RMSA has been integrated into Samagra Shiksha; its components continue within the unified school education framework.",
      },
      {
        question: "Can schools seek support for smart classrooms under this framework?",
        answer: "Yes, secondary schools can seek ICT and smart classroom support under the ICT and infrastructure components of Samagra Shiksha, which evolved from RMSA provisions.",
      },
    ],
    imageUrl: "/Images/school_Edu/RMSA.jpg",
    launchedYear: 2009,
    category: "School Infrastructure Development",
    detailedPage: "/schemes/rmsa",
    icon: "Building",
  },
];

const InsertData=async()=>{
    connection();
    await SE.deleteMany();
    const ack=await SE.insertMany(schemes);
}
InsertData()