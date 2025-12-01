export const dynamic = 'force-dynamic';
export const revalidate = 0;

import WelfareSchemesPage, { SchemeData, CarouselSlide, FilterCategory, IconName } from "../../../(common)/_welfSchComp";
import axios from "axios";

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
  const response = await axios.get("http://localhost:3000/schemes/secondary_education/api");
// THE FIX IS HERE:
  const Secondary_Education_SCHEMES = response.data.data;
  console.log(Secondary_Education_SCHEMES);

  return (
    <WelfareSchemesPage
      pageTitle="Secondary Education Schemes"
      pageSubtitle = "Discover government initiatives empowering students in Secondary education across India"
      schemes={Secondary_Education_SCHEMES}
      carouselSlides={SECONDARY_EDU_CAROUSEL_SLIDES}
      filterCategories={Secondary_FILTER_CATEGORIES}
      accentColor={{ light: "blue-700", dark: "orange-400" }}
    />
  );
}
