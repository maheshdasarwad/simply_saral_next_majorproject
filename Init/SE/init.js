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
    amount: "Free (Government funded)",
    applyFrom: "2014",
    lastDate: "As per State Education Board / School",
  },
  shortDescription:
    "A centrally sponsored scheme under Samagra Shiksha that integrates NSQF-aligned vocational education with school academics to enhance employability and skill development of students.",
  portalLink: "https://samagra.education.gov.in/vocational.html",
  detailedDescription: [
    "Vocational Education under NSQF is implemented as part of Samagra Shiksha by the Ministry of Education, Government of India.",
    "Students of Classes 9 to 12 in government and government-aided schools can opt for NSQF-aligned vocational subjects along with regular academics.",
    "Courses are based on approved job roles developed by Sector Skill Councils and include theory, practical training, field visits, internships, and employability skills.",
    "Assessment and certification are conducted jointly by State Education Boards and Sector Skill Councils as per NSQF norms.",
  ],
  benefits: [
    "NSQF-aligned skill training integrated within school curriculum.",
    "Industry-relevant job role exposure at secondary and higher secondary level.",
    "Joint certification by State Board and Sector Skill Council.",
    "Improved employability and career readiness after school education.",
    "Pathways for higher education, skill training, or employment.",
  ],
  eligibilityCriteria: [
    "Indian students enrolled in Classes 9 to 12.",
    "Studying in Government or Government-aided schools implementing NSQF vocational courses.",
    "Selection of vocational subject as per school and state board guidelines.",
  ],
  nonEligible: [
    "Students studying outside Classes 9 to 12.",
    "Students from schools not offering NSQF vocational education.",
    "Private schools not approved under Samagra Shiksha vocational component.",
  ],
  requiredDocuments: [
    {
      name: "School Enrollment / ID Proof",
      description:
        "Proof of enrollment in a government or government-aided school offering NSQF vocational education.",
      image: "https://www.shutterstock.com/image-vector/student-id-card-template-260nw-1976109844.jpg",
      officialLink: "https://samagra.education.gov.in/vocational.html",
      videoGuide: "https://m.youtube.com/watch?v=vnh2pvBHbKk&t=39s&pp=ygUraG93IHRvIGdldCBib25hZmlkZSBjZXJ0aWZpY2F0ZSBmcm9tIHNjaG9vbA%3D%3D",
      importance: "High",
    },
    {
      name: "Aadhaar Card / Date of Birth Proof",
      description:
        "Identity and age proof of the student maintained in school records.",
      image: "public/Imges/common/aadhar_card_sample.jpeg",
      officialLink: "https://uidai.gov.in",
      videoGuide: "https://m.youtube.com/watch?v=ld-aM5DPVj8&pp=ygUVSG93IHRvIGdldCBhYWRoYXJjYXJk",
      importance: "Medium",
    },
    {
      name: "Parental Consent (If Required)",
      description:
        "Consent from parent/guardian as prescribed by school or state education authority.",
      image: "https://www.pdffiller.com/preview/100/92/100092833/large.png",
      officialLink: "https://samagra.education.gov.in",
      videoGuide: "https://www.youtube.com/watch?v=Dx8D9f-x7gg",
      importance: "Medium",
    },
  ],
  applicationProcess: {
    offline: [
      "Student selects vocational subject at the time of subject selection in school.",
      "School verifies eligibility and enrolls the student under NSQF vocational course.",
      "School coordinates training, assessment, and certification with implementing agency and Sector Skill Council.",
    ],
  },
  faqs: [
    {
      question: "Is there an online application portal for students?",
      answer:
        "No. Students are enrolled through their respective schools. There is no direct public online application portal for individual students.",
    },
    {
      question: "Is the vocational education under NSQF free?",
      answer:
        "Yes. For government and government-aided schools, vocational education is funded under Samagra Shiksha and students are not charged separate fees.",
    },
    {
      question: "Who issues the certificate?",
      answer:
        "Certification is jointly issued by the State Education Board and the respective Sector Skill Council under NSQF.",
    },
  ],
  imageUrl: "/public/Images/secondary_Edu/vocational_education.jpg",
  launchedYear: 2014,
  category: "Skill & Employability Enhancement",
  detailedPage: "secondary_education",
  icon: "GraduationCap",
},
  {
  title: "Samagra Shiksha Abhiyan (Samagra Shiksha)",
  shortName: "Samagra Shiksha",
  keyInfo: {
    duration: "Pre-primary to Class 12",
    amount: "Grants to States/UTs for school education",
    applyFrom: "2018",
    lastDate: "As per annual planning and budgeting cycle of States/UTs"
  },
  shortDescription:
    "Samagra Shiksha is the Government of India’s flagship integrated scheme for school education, covering pre-school to senior secondary level, aimed at ensuring inclusive, equitable and quality education.",
  portalLink: "https://samagra.education.gov.in",
  detailedDescription: [
    "Samagra Shiksha integrates Sarva Shiksha Abhiyan (SSA), Rashtriya Madhyamik Shiksha Abhiyan (RMSA) and Teacher Education into a single scheme covering school education from pre-primary to Class 12.",
    "The scheme supports States and UTs in improving school infrastructure, teacher quality, digital education, inclusive education for children with special needs, and access to education for disadvantaged groups, in alignment with the Right to Education Act, 2009 and National Education Policy 2020."
  ],
  benefits: [
    "Support for construction and upgradation of school infrastructure such as classrooms, laboratories, libraries and toilets.",
    "Provision for ICT labs, digital classrooms and e-learning initiatives.",
    "Teacher training, professional development and academic support.",
    "Inclusive education support for children with special needs and disadvantaged sections.",
    "Interventions for girls’ education, including KGBVs and hostels, along with support for free textbooks and uniforms as per state norms."
  ],
  eligibilityCriteria: [
    "Government and Government-aided schools covered under approved State/UT Samagra Shiksha plans.",
    "Students enrolled in Government and Government-aided schools from pre-primary to Class 12.",
    "State and UT Education Departments responsible for implementation through approved Annual Work Plan and Budget (AWP&B)."
  ],
  nonEligible: [
    "Private unaided schools not covered under approved State/UT Samagra Shiksha plans.",
    "Individuals seeking direct central application or cash benefits, as the scheme is implemented institutionally through schools and departments."
  ],
  requiredDocuments: [],
  applicationProcess: {
    online: [
      "States and UTs prepare and submit Annual Work Plan and Budget (AWP&B) proposals through the prescribed planning and appraisal mechanism under Samagra Shiksha at the national level."
    ],
    offline: [
      "Schools provide requirements and data to block, district and state education offices, which consolidate proposals for approval and fund release under Samagra Shiksha."
    ]
  },
  faqs: [
    {
      question: "Who implements Samagra Shiksha Abhiyan?",
      answer:
        "The scheme is implemented by State and UT Education Departments through their respective Samagra Shiksha societies with support from the Government of India."
    },
    {
      question: "Do students apply individually for Samagra Shiksha benefits?",
      answer:
        "No. There is no individual application process. Benefits are provided institutionally through Government and Government-aided schools."
    },
    {
      question: "Which levels of education are covered under Samagra Shiksha?",
      answer:
        "The scheme covers education from pre-primary, primary, upper primary, secondary and senior secondary levels."
    }
  ],
  imageUrl: "/Images/school_Edu/Samagra.jpg",
  launchedYear: 2018,
  category: "School Education (Integrated Scheme)",
  detailedPage: "school_education",
  icon: "Building"
}
,
  {
  title: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
  shortName: "NMMSS",
  keyInfo: {
    duration: "Class IX to Class XII",
    amount: "₹12,000 per year",
    applyFrom: "2008",
    lastDate: "As per National Scholarship Portal (NSP) schedule"
  },
  shortDescription:
    "A centrally sponsored scholarship scheme of the Government of India to support meritorious students from economically weaker sections and reduce dropouts after Class VIII.",
  portalLink: "https://scholarships.gov.in",
  detailedDescription: [
    "The National Means-cum-Merit Scholarship Scheme (NMMSS) was launched to encourage meritorious students from economically weaker sections to continue secondary education by providing financial assistance.",
    "Scholarships are awarded to students selected through a state-level competitive examination conducted at Class VIII stage and are payable from Class IX to Class XII, subject to fulfillment of renewal conditions."
  ],
  benefits: [
    "Scholarship amount of ₹12,000 per annum (₹1,000 per month) from Class IX to Class XII.",
    "Direct Benefit Transfer (DBT) of scholarship amount into the student’s bank account.",
    "Helps reduce dropout rates at secondary and higher secondary levels.",
    "State-wise quota ensures equitable distribution of scholarships across India."
  ],
  eligibilityCriteria: [
    "Students studying in Class VIII in Government, Government-aided or local body schools.",
    "Parental annual income not exceeding ₹3,50,000 from all sources.",
    "Minimum 55% marks in Class VII examination (50% for SC/ST students).",
    "Must qualify the State/UT-conducted NMMSS selection examination."
  ],
  nonEligible: [
    "Students studying in private unaided schools.",
    "Students of Kendriya Vidyalayas (KVs), Jawahar Navodaya Vidyalayas (JNVs) and Sainik Schools.",
    "Students whose parental income exceeds the prescribed limit.",
    "Students who do not qualify in the NMMSS selection examination."
  ],
  requiredDocuments: [
    {
      name: "Aadhaar Card or Valid Identity Proof",
      description: "Student Aadhaar number or alternative valid government-issued identity proof",
      image: "public/Imges/common/aadhar_card_sample.jpeg",
      officialLink: "https://uidai.gov.in/",
      videoGuide: "https://www.youtube.com/watch?app=desktop&v=ld-aM5DPVj8",
      importance: "High"
    },
    {
      name: "Income Certificate",
      description: "Valid family income certificate issued by competent authority",
      image: "public/Imges/common/income_certificate_sample.jpg",
      officialLink: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1251",
      videoGuide: "https://youtu.be/sHVU8Z7ymvk?si=dvi6DSf1aui6lg1f",
      importance: "High"
    },
    {
      name: "Class VII Marksheet",
      description: "Marksheet showing minimum required percentage in Class VII",
      image: "public/Imges/common/marksheet_sample.jpg",
      officialLink: "",
      videoGuide: "",
      importance: "High"
    },
    {
      name: "Bank Account Passbook",
      description: "Student bank account details for Direct Benefit Transfer (DBT)",
      image: "public/Imges/common/bank_account_sample.jpg",
      officialLink: "https://sbi.bank.in/web/customer-care/m-passbook",
      videoGuide: "https://youtu.be/WmaXsYNvRhk?si=PiGdNj99QIEVj4cm",
      importance: "High"
    },
    {
      name: "School Bonafide Certificate",
      description: "Certificate issued by the school confirming enrollment",
      image: "public/Imges/common/bonafide_sample.jpg",
      officialLink: "Take from school/college",
      videoGuide: "https://youtu.be/vnh2pvBHbKk?si=pmWRocm8VFxgosEi",
      importance: "Medium"
    }
  ],
  applicationProcess: {
    online: [
      "Register and apply for NMMSS through the National Scholarship Portal (NSP) during the notified application period.",
      "Complete One Time Registration (OTR) and fill the NMMSS application form.",
      "Upload required documents and submit the application before the deadline.",
      "Track application status and scholarship payment through NSP dashboard."
    ],
    offline: [
      "Appear for the NMMSS selection examination conducted by the respective State/UT authority.",
      "Submit required documents to the school for verification and forwarding to education authorities, if instructed by the State/UT."
    ]
  },
  faqs: [
    {
      question: "Who can apply for the National Means-cum-Merit Scholarship Scheme?",
      answer:
        "Students studying in Class VIII in Government, Government-aided or local body schools who meet income and academic eligibility criteria and qualify the selection examination can apply."
    },
    {
      question: "How much scholarship amount is provided under NMMSS?",
      answer:
        "An amount of ₹12,000 per year is provided to selected students from Class IX to Class XII, subject to renewal conditions."
    },
    {
      question: "How is the scholarship amount disbursed?",
      answer:
        "The scholarship amount is transferred directly to the student’s bank account through Direct Benefit Transfer (DBT) via the National Scholarship Portal."
    }
  ],
  imageUrl: "/Images/school_Edu/NMMSS.jpg",
  launchedYear: 2008,
  category: "Scholarships & Financial Assistance",
  detailedPage: "secondary_education",
  icon: "BadgeDollarSign"
}
,
  {
  title: "Rashtriya Madhyamik Shiksha Abhiyan (RMSA)",
  shortName: "RMSA",
  keyInfo: {
    duration: "Class IX–X (Secondary Education)",
    amount: "Grants to States/UTs for secondary schools",
    applyFrom: "2009",
    lastDate: "Merged into Samagra Shiksha (2018)"
  },
  shortDescription:
    "Rashtriya Madhyamik Shiksha Abhiyan (RMSA) was a centrally sponsored scheme to enhance access, equity and quality of secondary education (Classes IX–X), now subsumed under Samagra Shiksha.",
  portalLink: "https://dsel.education.gov.in/en/scheme/rmsa",
  detailedDescription: [
    "RMSA was launched to increase enrolment, reduce dropouts and improve the quality of secondary education by strengthening school infrastructure, teacher availability and learning outcomes.",
    "In 2018, RMSA was integrated into the Samagra Shiksha Abhiyan, and all its components are now implemented under the unified school education framework covering pre-primary to senior secondary levels."
  ],
  benefits: [
    "Construction and upgradation of secondary school infrastructure such as classrooms, laboratories, libraries and toilets.",
    "Provision of ICT facilities and support for smart classrooms at the secondary level.",
    "Teacher recruitment, in-service training and academic support.",
    "Equity interventions for girls, SC, ST, minority and educationally backward groups as per approved state plans."
  ],
  eligibilityCriteria: [
    "Government and Government-aided secondary schools (Classes IX–X) covered under approved State/UT RMSA plans prior to 2018.",
    "State and UT Education Departments responsible for planning and implementation through Annual Work Plans."
  ],
  nonEligible: [
    "Private unaided schools not covered under approved RMSA or Samagra Shiksha plans.",
    "Individuals seeking direct application or cash benefits, as RMSA was institutionally implemented."
  ],
  requiredDocuments: [],
  applicationProcess: {
    offline: [
      "Schools submitted infrastructure and academic requirements to district and state education offices.",
      "States consolidated proposals into Annual Work Plans for approval and fund release by the Government of India."
    ]
  },
  faqs: [
    {
      question: "Is Rashtriya Madhyamik Shiksha Abhiyan (RMSA) still active?",
      answer:
        "No. RMSA was merged into Samagra Shiksha Abhiyan in 2018 and no longer operates as a standalone scheme."
    },
    {
      question: "How are RMSA components implemented now?",
      answer:
        "All RMSA components such as infrastructure development, ICT support and equity interventions are now implemented under Samagra Shiksha."
    }
  ],
  imageUrl: "/Images/school_Edu/RMSA.jpg",
  launchedYear: 2009,
  category: "Secondary Education (Merged Scheme)",
  detailedPage: "secondary_education",
  icon: "Building"
}
,
];

const InsertData=async()=>{
    connection();
    await SE.deleteMany();
    const ack=await SE.insertMany(schemes);
}
InsertData()