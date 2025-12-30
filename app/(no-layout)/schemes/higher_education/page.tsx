export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import WelfareSchemesPage, { SchemeData, CarouselSlide, FilterCategory, IconName } from "../../../(common)/_welfSchComp";
import con from '@/lib/conn.js';
import HEM from '@/models/HigherEducation.js';

const HIGHER_EDU_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: "/Images/higher_Edu/PDS.png",
    title: "Public Distribution Scheme",
    subtitle: "Accessible education resources"
  },
  {
    image: "/Images/higher_Edu/PJVNB.jpg",
    title: "Vidyarthi Nidhi Yojana",
    subtitle: "Empowering students financially"
  },
  {
    image: "/Images/higher_Edu/POST.jpg",
    title: "Post Scholarship",
    subtitle: "Supporting higher education"
  },
  {
    image: "/Images/higher_Edu/RSMS.png",
    title: "Merit Scholarship",
    subtitle: "Rewarding academic excellence"
  },
  {
    image: "/Images/higher_Edu/TF.jpg",
    title: "Tuition Fee Reimbursement",
    subtitle: "Making higher studies affordable"
  },
];

const HIGHER_FILTER_CATEGORIES: FilterCategory[] = [
  {
    heading: "Category",
    items: [
      { label: "All", icon: "Sparkles" },
      { label: "Scholarships & Financial Aid", icon: "BadgeDollarSign" },
      { label: "Fellowships", icon: "Award" },
      { label: "Student Loans", icon: "Banknote" },
      { label: "Research & Innovation Support", icon: "ShieldCheck" },
      { label: "Faculty Development", icon: "Users" },
      { label: "University Infrastructure Development", icon: "Building" },
      { label: "Skill & Employability Enhancement", icon: "GraduationCap" }
    ],
  },
];

export default async function HigherEducationPage() {
    await con();
    const docs = await HEM.find({}).lean();
    const data = JSON.parse(JSON.stringify(docs));

    return(<WelfareSchemesPage
      sModule="higher_education"
      pageTitle="Higher Education Schemes"
      pageSubtitle="Discover government initiatives empowering students in higher education across India"
      schemes={data}
      carouselSlides={HIGHER_EDU_CAROUSEL_SLIDES}
      filterCategories={HIGHER_FILTER_CATEGORIES}
      accentColor={{ light: "blue-700", dark: "orange-400" }}
    />
  );
}