export const dynamic = 'force-dynamic';
export const revalidate = 60;

import WelfareSchemesPage, { SchemeData, CarouselSlide, FilterCategory, IconName } from "../../../(common)/_welfSchComp";
import axios from "axios";

const WOMEN_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: "/Images/women_welf/beti_Bachao.jpg",
    title: "Education Empowerment",
    subtitle: "Building brighter futures through education"
  },
  {
    image: "/Images/women_welf/ladki_bahin.jpg",
    title: "Financial Independence",
    subtitle: "Supporting women's economic growth"
  },
  {
    image: "/Images/women_welf/swadhar_grih.jpg",
    title: "Social Support",
    subtitle: "Creating safe spaces for women"
  },
  {
    image: "/Images/women_welf/women-emp.webp",
    title: "Women Empowerment",
    subtitle: "Transforming lives, building nation"
  }
];

const WOMEN_FILTER_CATEGORIES: FilterCategory[] = [
  {
    heading: "Category",
    items: [
      { label: "All", icon: "Sparkles" },
      { label: "Financial Assistance & Social Security", icon: "BadgeDollarSign" },
      { label: "Education & Skill Development", icon: "GraduationCap" }, 
      { label: "Health & Nutrition", icon: "HeartPulse" },      
      { label: "Employment & Entrepreneurship", icon: "Briefcase" },    
      { label: "Housing & Basic Support", icon: "Home" },      
      { label: "Rights, Awareness & Empowerment", icon: "Megaphone" }
      // { label: "Women Safety", icon: "ShieldCheck" },
      // { label: "Employment & Entrepreneurship", icon: "Briefcase" },
    ],
  },
];


export default async function WomenWelfarePage() {
  const response = await axios.get("http://localhost:3000/schemes/women_welfare/api");
// THE FIX IS HERE:
const WOMEN_WELFARE_SCHEMES = response.data.data;
console.log(WOMEN_WELFARE_SCHEMES);

  return (
    <WelfareSchemesPage
      pageTitle="Women Welfare Schemes"
      pageSubtitle="Discover government initiatives empowering women across India"
      schemes={WOMEN_WELFARE_SCHEMES}
      carouselSlides={WOMEN_CAROUSEL_SLIDES}
      filterCategories={WOMEN_FILTER_CATEGORIES}
      accentColor={{ light: "blue-700", dark: "orange-400" }}
    />
  );
}
