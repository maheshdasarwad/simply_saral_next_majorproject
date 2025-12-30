export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import con from '@/lib/conn.js';
import FWM from '@/models/FarmerWelfare.js';

import WelfareSchemesPage, {
  CarouselSlide,
  FilterCategory,
} from "../../../(common)/_welfSchComp";


const FARMER_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: "/Images/farmer_welf/kisan_Credit_Card.jpg",
    title: "Kisan Credit Card",
    subtitle: "Providing financial support to farmers",
  },
  {
    image: "/Images/farmer_welf/pm_Kisan_Samman.jpg",
    title: "PM Kisan Samman",
    subtitle: "Direct benefit transfer for farmers",
  },
  {
    image: "/Images/farmer_welf/PMKSY.jpg",
    title: "PMKSY Scheme",
    subtitle: "Promoting efficient water use in farming",
  },
  {
    image: "/Images/farmer_welf/pradhan_Mantri_Fasal.jpg",
    title: "Fasal Bima Yojana",
    subtitle: "Crop insurance for risk-free farming",
  },
];

const FARMER_FILTER_CATEGORIES: FilterCategory[] = [
  {
    heading: "Category",
    items: [
      { label: "All", icon: "Sparkles" },
      { label: "Income Support Schemes", icon: "BadgeDollarSign" },
      { label: "Crop Insurance & Risk Management", icon: "ShieldCheck" },
      { label: "Credit & Loan Schemes", icon: "Banknote" },
      { label: "Irrigation & Water Management", icon: "Droplet" },
      { label: "Farm Mechanization & Equipment Subsidy", icon: "Cog" },
      { label: "Agricultural Infrastructure & Development", icon: "Building" },
      { label: "Seeds, Fertilizers & Input Support", icon: "Leaf" },
      { label: "Training, Education & Skill Development", icon: "GraduationCap" },
      { label: "Welfare & Social Security Schemes", icon: "HeartPulse" },
    ],
  },
];

export default async function FarmerSchemesPage() {
  await con();
  const docs = await FWM.find({}).lean();
  const data = JSON.parse(JSON.stringify(docs));
  return (
    <WelfareSchemesPage
      sModule="farmer_schemes"
      pageTitle="Farmer Welfare Schemes"
      pageSubtitle="Discover government initiatives empowering farmers across India"
      schemes={data}
      carouselSlides={FARMER_CAROUSEL_SLIDES}
      filterCategories={FARMER_FILTER_CATEGORIES}
      accentColor={{ light: "blue-700", dark: "orange-400" }}
    />
  );
}
