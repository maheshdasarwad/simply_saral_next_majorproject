export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import WelfareSchemesPage, { SchemeData, CarouselSlide, FilterCategory, IconName } from "../../../(common)/_welfSchComp";
import con from '@/lib/conn.js';
import SEM from '@/models/SecondaryEducation.js';

const SECONDARY_EDU_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: "/Images/secondary_Edu/NMMS.jpg",
    title: "NMMS Scholarship",
    subtitle: "National Means-Cum-Merit Scholarship"
  },
  {
    image: "/Images/secondary_Edu/RMSA.jpg",
    title: "Rashtriya Madhyamik Shiksha Abhiyan",
    subtitle: "Improving secondary education infrastructure"
  },
  {
    image: "/Images/secondary_Edu/SSA.jpg",
    title: "Samagra Shiksha Abhiyan",
    subtitle: "Integrated school education scheme"
  },
  {
    image: "/Images/secondary_Edu/vocational.jpg",
    title: "Vocational Education Scheme",
    subtitle: "Skill development for secondary students"
  }
];


const Secondary_FILTER_CATEGORIES: FilterCategory[] = [
  {
    heading: "Category",
    items: [
      { label: "All", icon: "Sparkles" },
      { label: "Scholarships & Financial Aid", icon: "BadgeDollarSign" },
      { label: "Education", icon: "BookOpen" },
      { label: "School Infrastructure Development", icon: "Building" },
    ],
  },
];


export default async function SecondaryEducationPage() {
      await con();
      const docs = await SEM.find({}).lean();
      const data = JSON.parse(JSON.stringify(docs));
  
  return (
    <WelfareSchemesPage
      sModule="secondary_education"
      pageTitle="Secondary Education Schemes"
      pageSubtitle = "Discover government initiatives empowering students in Secondary education across India"
      schemes={data}
      carouselSlides={SECONDARY_EDU_CAROUSEL_SLIDES}
      filterCategories={Secondary_FILTER_CATEGORIES}
      accentColor={{ light: "blue-700", dark: "orange-400" }}
    />
  );
}
