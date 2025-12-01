"use client";

import { useEffect, useState } from "react";
import WelfareSchemesPage, { SchemeData, CarouselSlide, FilterCategory, IconName } from "../../../(common)/_welfSchComp";
import axios from "axios";

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

export default function HigherEducationPage() {
  const [schemes, setSchemes] = useState<SchemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get("/schemes/higher_education/api");
        setSchemes(response.data.data || []);
        console.log('Higher Education schemes loaded:', response.data.data);
      } catch (err) {
        console.error('Error fetching higher education schemes:', err);
        setError('Failed to load schemes');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading higher education schemes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">Error Loading Schemes</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <WelfareSchemesPage
      pageTitle="Higher Education Schemes"
      pageSubtitle="Discover government initiatives empowering students in higher education across India"
      schemes={schemes}
      carouselSlides={HIGHER_EDU_CAROUSEL_SLIDES}
      filterCategories={HIGHER_FILTER_CATEGORIES}
      accentColor={{ light: "blue-700", dark: "orange-400" }}
    />
  );
}