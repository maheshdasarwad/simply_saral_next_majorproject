"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  BookOpen,
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  UserCircle,
  ChevronDown,
  Home as HomeIcon,
  ArrowUp,
  Search,
  Filter,
  Calendar,
  Award,
  GraduationCap,
  Shield,
  Flame,
  Heart,
  Users,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Briefcase,
  BadgeDollarSign,
  Megaphone,
  Banknote,
  Cog,
  Building,
  Leaf,
  Droplet,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export type IconName =
  | "BookOpen"
  | "LayoutDashboard"
  | "ChevronRight"
  | "ChevronLeft"
  | "Sun"
  | "Moon"
  | "UserCircle"
  | "ChevronDown"
  | "Home"
  | "ArrowUp"
  | "Search"
  | "Filter"
  | "Calendar"
  | "Award"
  | "GraduationCap"
  | "Shield"
  | "HomeIcon"
  | "Flame"
  | "Heart"
  | "Users"
  | "Sparkles"
  | "ShieldCheck"
  | "HeartPulse"
  | "Briefcase"
  | "BadgeDollarSign"
  | "Megaphone"
  | "Banknote"
  | "Cog"
  | "Building"
  | "Leaf"
  | "Droplet"
  | "Menu"
  | "X";

const iconMap: Record<IconName, React.ComponentType<any>> = {
  BookOpen,
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  UserCircle,
  ChevronDown,
  Home: HomeIcon,
  ArrowUp,
  Search,
  Filter,
  Calendar,
  Award,
  GraduationCap,
  Shield,
  HomeIcon,
  Flame,
  Heart,
  Users,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Briefcase,
  BadgeDollarSign,
  Megaphone,
  Banknote,
  Cog,
  Building,
  Leaf,
  Droplet,
  Menu,
  X,
};

export interface RequiredDocumentSchema {
  name: string;
  sampleImage?: string;
  portalLink?: string;
  videoLink?: string;
}

export interface SchemeData {
  _id: string;
  title: string;
  shortDescription: string;
  portalLink: string;
  detailedDescription: string;
  benefits: string[];
  eligibilityCriteria: string[];
  nonEligible: string[];
  requiredDocuments: RequiredDocumentSchema[];
  applicationProcess: {
    online: string[];
    offline: string[];
  };
  faqs: string[];
  imageUrl: string;
  launchedYear: string;
  category: string;
  detailedPage: string;
  icon: IconName;
}

export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
}

export interface FilterCategory {
  heading: string;
  items: Array<{
    label: string;
    icon: IconName;
  }>;
}

export interface WelfareSchemesProps {
  pageTitle: string;
  pageSubtitle: string;
  schemes: SchemeData[];
  carouselSlides: CarouselSlide[];
  filterCategories?: FilterCategory[];
  defaultCategory?: string;
  accentColor?: {
    light: string;
    dark: string;
  };
  sModule?: string; // Added for dynamic routing
}

const SidebarHeader = ({
  open,
  setOpen,
  theme,
  isMobile,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  theme: "light" | "dark";
  isMobile: boolean;
}) => (
  <div className="relative flex items-center w-full h-20 mt-14 mb-3">
    <div className="flex flex-col items-center w-full mb-20">
      <img
        src="/Images/logo2.png"
        alt="Simply Saral Logo"
        className={`object-contain transition-all duration-300 ${
          open ? "w-25 h-25" : "w-16 h-16"
        }`}
      />
      {open && (
        <div
          className={`text-2xl font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-blue-700"
          }`}
        >
          Simply <span className="text-amber-500">Saral</span>
        </div>
      )}
    </div>
    {!isMobile && (
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        className="absolute right-[-22px] top-1/2 -translate-y-1/2 z-10 border-2 border-blue-400 rounded-full w-8 h-8 flex items-center justify-center shadow-xl transition-transform duration-300 group"
      >
        {open
          ? React.createElement(iconMap["ChevronLeft"], { className: "text-blue-500 w-5 h-5" })
          : React.createElement(iconMap["ChevronRight"], { className: "text-blue-500 w-5 h-5" })}
      </button>
    )}
  </div>
);

const NAVIGATION_ITEMS: Array<{
  label: string;
  icon: IconName;
  path: string;
}> = [
  { label: "Home", icon: "Home", path: "/" },
  { label: "Schemes", icon: "LayoutDashboard", path: "/schemes" },
];

const SafeIcon = ({ 
  name, 
  className = "",
  fallback = "Sparkles" 
}: { 
  name: string; 
  className?: string;
  fallback?: IconName;
}) => {
  const IconComponent = iconMap[name as IconName] || iconMap[fallback];
  return React.createElement(IconComponent, { className });
};

const Sidebar = ({
  theme,
  toggleTheme,
  open,
  setOpen,
  selectedCategory,
  setSelectedCategory,
  filterCategories = [],
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filterCategories?: FilterCategory[];
  isMobile: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    filterCategories.length > 0 ? filterCategories[0].heading : null
  );
  const router = useRouter();
  const isDark = theme === "dark";

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) setMobileMenuOpen(false);
  };
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (isMobile) setMobileMenuOpen(false);
  };

  const toggleSection = (heading: string) =>
    setExpandedSection((prev) => (prev === heading ? null : heading));

  const renderNavigationItem = (item: typeof NAVIGATION_ITEMS[0]) => (
    <li key={item.label}>
      <button
        onClick={() => handleNavigation(item.path)}
        className={`w-full flex ${open || isMobile ? "flex-row items-center gap-3 px-3" : "flex-col items-center gap-1 px-2"} py-2.5 rounded-lg transition-colors ${
          isDark ? "hover:bg-gray-800 text-gray-300 hover:text-white" : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
        }`}
        title={item.label}
      >
        <SafeIcon 
          name={item.icon} 
          className={`flex-shrink-0 transition-all duration-300 ${open || isMobile ? "w-5 h-5" : "w-6 h-6"}`} 
        />
        {(!open && !isMobile) && <span className="text-xs font-medium text-center leading-tight">{item.label}</span>}
        {(open || isMobile) && <span className="text-sm font-medium tracking-wide">{item.label}</span>}
      </button>
    </li>
  );

  const sidebarContent = (
    <>
      {/* Fixed Header Section */}
      <div className="flex-shrink-0">
        <SidebarHeader open={open || isMobile} setOpen={setOpen} theme={theme} isMobile={isMobile} />
        <nav className="py-4">
          <ul className="space-y-2 px-2">{NAVIGATION_ITEMS.map(renderNavigationItem)}</ul>
        </nav>
      </div>

      {/* Fixed Category Headings Section */}
      {(open || isMobile) && filterCategories.length > 0 && (
        <div className="flex-shrink-0 border-t border-gray-700 pt-4">
          <div className="px-2 space-y-1">
            {filterCategories.map((section) => (
              <div key={section.heading} className="mb-2">
                <button
                  onClick={() => toggleSection(section.heading)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold uppercase tracking-wide text-xs ${
                    isDark ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200" : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <span>{section.heading}</span>
                  <SafeIcon 
                    name="ChevronDown"
                    className={`w-4 h-4 transition-transform ${expandedSection === section.heading ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scrollable Categories Section */}
      <div className="flex-1 overflow-y-auto py-4">
        {(open || isMobile) && filterCategories.length > 0 && (
          <div className="px-2 space-y-1">
            {filterCategories.map((section) => (
              expandedSection === section.heading && (
                <ul key={section.heading} className="mt-1 ml-3 space-y-1 border-l-2 border-pink-500 pl-3">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => handleCategorySelect(item.label)}
                        className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === item.label
                            ? isDark
                              ? "bg-blue-600 text-white"
                              : "bg-pink-100 text-pink-700 font-semibold"
                            : isDark
                            ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                        }`}
                      >
                        <SafeIcon name={item.icon} className="w-4 h-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )
            ))}
          </div>
        )}
      </div>

      {/* Fixed Footer Section */}
      <div className={`flex-shrink-0 border-t ${isDark ? "border-gray-700" : "border-blue-400"} p-2 space-y-2`}>
        <button
          onClick={toggleTheme}
          className={`w-full flex ${open || isMobile ? "flex-row items-center gap-3 px-3" : "flex-col items-center gap-1 px-2"} py-2.5 rounded-lg transition-colors ${
            isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"
          }`}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? (
            <SafeIcon name="Sun" className={`flex-shrink-0 transition-all duration-300 ${open || isMobile ? "w-5 h-5" : "w-6 h-6"}`} />
          ) : (
            <SafeIcon name="Moon" className={`flex-shrink-0 transition-all duration-300 ${open || isMobile ? "w-5 h-5" : "w-6 h-6"}`} />
          )}
          {(!open && !isMobile) && <span className="text-xs font-medium text-center leading-tight">{isDark ? "Light" : "Dark"}</span>}
          {(open || isMobile) && <span className="text-sm font-medium tracking-wide">{isDark ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <button
          onClick={() => handleNavigation("/profile")}
          className={`w-full flex ${open || isMobile ? "flex-row items-center gap-3 px-3" : "flex-col items-center gap-1 px-2"} py-2.5 rounded-lg transition-colors ${
            isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"
          }`}
          title="Profile"
        >
          <SafeIcon name="UserCircle" className={`flex-shrink-0 transition-all duration-300 ${open || isMobile ? "w-5 h-5" : "w-6 h-6"}`} />
          {(!open && !isMobile) && <span className="text-xs font-medium text-center leading-tight">Profile</span>}
          {(open || isMobile) && <span className="text-sm font-medium tracking-wide">Profile</span>}
        </button>
      </div>
    </>
  );

  // Mobile view - overlay drawer
  if (isMobile) {
    return (
      <>
        {/* Backdrop overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        
        {/* Mobile sidebar drawer */}
        <aside
          className={`fixed right-0 top-0 h-full z-50 w-72 flex flex-col transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } ${
            isDark ? "bg-gray-900 text-gray-100 border-gray-800" : "bg-blue-100 text-gray-800 border-blue-400"
          } border-l shadow-2xl`}
        >
          {/* Close button for mobile */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute left-4 top-4 z-10 p-2 rounded-lg ${
              isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Close menu"
          >
            <SafeIcon name="X" className="w-6 h-6" />
          </button>
          
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop view - original sidebar
  return (
    <aside
      className={`fixed left-0 top-0 h-full z-50 flex flex-col transition-all duration-300 ease-in-out ${open ? "w-60" : "w-20"} ${
        isDark ? "bg-gray-900 text-gray-100 border-gray-800" : "bg-blue-100 text-gray-800 border-blue-400"
      } border-r shadow-md`}
    >
      {sidebarContent}
    </aside>
  );
};

const getUniqueCategories = (schemes: SchemeData[]) => [
  ...Array.from(new Set(schemes.map((scheme) => scheme.category))),
];

const getUniqueYears = (schemes: SchemeData[]) => [
  ...Array.from(new Set(schemes.map((scheme) => scheme.launchedYear))).sort(),
];

const SchemeCard = ({ 
  scheme, 
  theme, 
  accentColor,
  sModule = "/schemes" // Default value for sModule
}: { 
  scheme: SchemeData; 
  theme: "light" | "dark"; 
  accentColor?: { light: string; dark: string };
  sModule?: string;
}) => {
  const SchemeIcon = iconMap[scheme.icon];
  const isDark = theme === "dark";
  const lightAccent = accentColor?.light || "blue-500";
  const darkAccent = accentColor?.dark || "blue-400";
  
  return (
    <div className={`rounded-xl p-4 md:p-6 transition-all duration-400 hover:shadow-xl border ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-lg ${isDark ? "bg-orange-500/20" : "bg-blue-100"}`}>
              {SchemeIcon ? React.createElement(SchemeIcon, { className: `w-5 h-5 ${isDark ? `text-${darkAccent}` : `text-${lightAccent}`}` }) : null}
            </div>
            <h3 className={`text-lg md:text-xl font-semibold ${isDark ? `text-${darkAccent}` : `text-${lightAccent}`}`}>{scheme.title}</h3>
          </div>
          <div className={`text-xs md:text-sm flex flex-wrap items-center gap-2 md:gap-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            <span className="flex items-center gap-2 font-semibold text-green-600">
              <SafeIcon name="Award" className="w-4 h-4" />
              {scheme.category}
            </span>
            <span className="flex items-center gap-2">
              <SafeIcon name="Calendar" className="w-4 h-4" />
              Launched: {scheme.launchedYear}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-full md:w-auto md:ml-6">
          <a
            href={`${sModule}/${scheme._id.toString()}`}
            className={`inline-flex items-center justify-center w-full md:w-auto px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden group ${
              isDark
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-500 hover:to-blue-500"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-500 hover:to-blue-500"
            }`}
          >
            <SafeIcon name="BookOpen" className="w-4 h-4 mr-2" />
            Read More
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </a>
        </div>
      </div>
    </div>
  );
};

const WelfareSchemesPage: React.FC<WelfareSchemesProps> = ({
  pageTitle,
  pageSubtitle,
  schemes,
  carouselSlides,
  filterCategories = [],
  defaultCategory = "All",
  accentColor = { light: "blue-600", dark: "orange-400" },
  sModule = "/schemes", // Default value for sModule
}) => {
  const { theme, setTheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoryOptions = getUniqueCategories(schemes);
  const yearOptions = getUniqueYears(schemes);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Combined filtering logic
  const displayedSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      searchQuery === "" ||
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.benefits.some((benefit) => benefit.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSidebarCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    const matchesFilterCategories = selectedCategories.length === 0 || selectedCategories.includes(scheme.category);
    const matchesYears = selectedYears.length === 0 || selectedYears.includes(scheme.launchedYear);
    
    return matchesSearch && matchesSidebarCategory && matchesFilterCategories && matchesYears;
  });

  const hasActiveFilters = searchQuery !== "" || selectedCategories.length > 0 || selectedYears.length > 0 || selectedCategory !== "All";

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        const newTheme = e.newValue as "light" | "dark";
        setTheme(newTheme);
        document.body.className = newTheme;
      }
    };
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail as "light" | "dark";
      setTheme(newTheme);
      document.body.className = newTheme;
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("themeChange" as any, handleThemeChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("themeChange" as any, handleThemeChange);
    };
  }, [setTheme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [carouselSlides.length]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new CustomEvent("themeChange", { detail: newTheme }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedYears([]);
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleYearSelect = (year: string) => {
    setSelectedYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 text-gray-900"
      }`}
    >
      {/* Mobile hamburger button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`fixed top-4 right-4 z-30 p-3 rounded-lg shadow-lg transition-all duration-300 ${
            theme === "dark" ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
          aria-label="Toggle menu"
        >
          <SafeIcon name="Menu" className="w-6 h-6" />
        </button>
      )}

      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filterCategories={filterCategories}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <div className={`transition-all duration-300 ${isMobile ? "ml-0" : sidebarOpen ? "ml-60" : "ml-20"}`}>
        <div className="p-3 md:p-5 pt-16 md:pt-5">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              <span className={`${theme === "dark" ? `text-${accentColor.dark}` : `text-${accentColor.light}`}`}>{pageTitle}</span>
            </h1>
            <p className={`text-sm md:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{pageSubtitle}</p>
          </div>
          
          {/* Enhanced Hero Carousel with Better Text Visibility */}
          <div className="bg-black rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-5 h-48 md:h-70 relative shadow-2xl">
            <div className="relative w-full h-full">
              {carouselSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 md:px-8 py-4 md:py-8">
              <h2 className="text-lg md:text-3xl font-bold mb-2 md:mb-3 tracking-wide text-white drop-shadow-2xl">
                {carouselSlides[currentSlide].title}
              </h2>
              <p className="text-sm md:text-xl text-gray-100 font-medium drop-shadow-lg max-w-3xl">
                {carouselSlides[currentSlide].subtitle}
              </p>
            </div>
            <div className="absolute bottom-3 md:bottom-6 right-4 md:right-8 flex gap-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Filter Section with Multi-Select */}
          <div className={`rounded-xl md:rounded-2xl p-3 md:p-2 mb-4 md:mb-6 shadow-xl ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}>
            <div className="flex flex-col md:flex-row gap-2 mb-1">
              <div className="relative flex-1">
                <SafeIcon
                  name="Search"
                  className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 md:pl-12 pr-1 py-2.5 md:py-3 rounded-lg md:rounded-xl border text-sm md:text-base transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400 focus:border-orange-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                  } focus:outline-none`}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold border transition-all duration-300 ${
                  showFilters
                    ? theme === "dark"
                      ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-500/30"
                      : "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700 hover:border-orange-500"
                      : "bg-white border-gray-300 text-blue-800 hover:bg-blue-50 hover:border-blue-400"
                }`}
              >
                <SafeIcon name="Filter" className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Filters</span>
                {(selectedCategories.length > 0 || selectedYears.length > 0 || selectedCategory !== "All") && (
                  <span
                    className={`ml-1 px-2 py-0.5 md:py-1 rounded-full text-xs font-bold ${
                      theme === "dark" ? "bg-orange-500" : "bg-orange-500 text-white"
                    }`}
                  >
                    {selectedCategories.length + selectedYears.length + (selectedCategory !== "All" ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 ${showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="space-y-4 md:space-y-6 pt-4">
                {/* Category Filter with Multi-select */}
                <div>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <SafeIcon
                        name="Award"
                        className={`w-4 h-4 md:w-5 md:h-5 ${theme === "dark" ? "text-orange-400" : "text-blue-600"}`}
                      />
                      <span className={`font-bold text-sm md:text-base ${theme === "dark" ? "text-orange-400" : "text-blue-700"}`}>
                        Category {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                      </span>
                    </div>
                    {selectedCategories.length > 0 && (
                      <button
                        onClick={() => setSelectedCategories([])}
                        className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-lg ${
                          theme === "dark" 
                            ? "text-orange-400 hover:bg-orange-400/20" 
                            : "text-blue-600 hover:bg-blue-100"
                        }`}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 md:gap-3 flex-wrap">
                    {categoryOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleCategorySelect(option)}
                        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border-2 transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                          selectedCategories.includes(option)
                            ? theme === "dark"
                              ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-500/30"
                              : "bg-blue-600 text-white border-blue-600 shadow-lg"
                            : theme === "dark"
                              ? "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700 hover:border-orange-500"
                              : "bg-white border-gray-300 text-blue-800 hover:bg-blue-50 hover:border-blue-400"
                        }`}
                      >
                        <div className={`w-3 h-3 md:w-4 md:h-4 border rounded flex items-center justify-center ${
                          selectedCategories.includes(option)
                            ? theme === "dark" ? "bg-white border-white" : "bg-white border-white"
                            : theme === "dark" ? "border-gray-500" : "border-gray-400"
                        }`}>
                          {selectedCategories.includes(option) && (
                            <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-sm ${theme === "dark" ? "bg-orange-600" : "bg-blue-600"}`} />
                          )}
                        </div>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Filter with Multi-select */}
                <div>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <SafeIcon
                        name="Calendar"
                        className={`w-4 h-4 md:w-5 md:h-5 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                      />
                      <span className={`font-bold text-sm md:text-base ${theme === "dark" ? "text-green-400" : "text-green-700"}`}>
                        Year {selectedYears.length > 0 && `(${selectedYears.length})`}
                      </span>
                    </div>
                    {selectedYears.length > 0 && (
                      <button
                        onClick={() => setSelectedYears([])}
                        className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-lg ${
                          theme === "dark" 
                            ? "text-green-400 hover:bg-green-400/20" 
                            : "text-green-600 hover:bg-green-100"
                        }`}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 md:gap-3 flex-wrap">
                    {yearOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleYearSelect(option)}
                        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border-2 transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                          selectedYears.includes(option)
                            ? theme === "dark"
                              ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-500/30"
                              : "bg-green-600 text-white border-green-600 shadow-lg"
                            : theme === "dark"
                              ? "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700 hover:border-green-500"
                              : "bg-white border-gray-300 text-green-800 hover:bg-green-50 hover:border-green-400"
                        }`}
                      >
                        <div className={`w-3 h-3 md:w-4 md:h-4 border rounded flex items-center justify-center ${
                          selectedYears.includes(option)
                            ? theme === "dark" ? "bg-white border-white" : "bg-white border-white"
                            : theme === "dark" ? "border-gray-500" : "border-gray-400"
                        }`}>
                          {selectedYears.includes(option) && (
                            <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-sm ${theme === "dark" ? "bg-green-600" : "bg-green-600"}`} />
                          )}
                        </div>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {hasActiveFilters && (
              <div className={`mt-2 pt-2 border-t ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                  <p className={`text-xs md:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Showing <span className="font-bold text-orange-600">{displayedSchemes.length}</span> of{" "}
                    <span className="font-bold">{schemes.length}</span> schemes
                    {selectedCategory !== "All" && (
                      <span className="ml-2 block md:inline">
                        • Filter: <span className="font-semibold text-blue-600">{selectedCategory}</span>
                      </span>
                    )}
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className={`text-xs md:text-sm px-3 py-1 rounded-lg whitespace-nowrap ${
                      theme === "dark" 
                        ? "text-orange-400 hover:bg-orange-400/20" 
                        : "text-orange-600 hover:bg-orange-100"
                    }`}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {displayedSchemes.length > 0 ? (
            <div className="grid gap-3 md:gap-2">
              {displayedSchemes.map((scheme) => (
                <SchemeCard 
                  key={scheme._id} 
                  scheme={scheme} 
                  theme={theme} 
                  accentColor={accentColor} 
                  sModule={sModule} // Pass sModule to SchemeCard
                />
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 md:py-16 rounded-xl ${theme === "dark" ? "bg-slate-900" : "bg-white"} shadow-lg`}>
              <SafeIcon
                name="Search"
                className={`mx-auto mb-4 w-12 h-12 md:w-16 md:h-16 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
              />
              <p className={`text-base md:text-lg font-semibold mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>No schemes found</p>
              <p className={`text-sm md:text-base ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Try adjusting your search criteria or filters</p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className={`mt-4 px-5 md:px-6 py-2 rounded-lg font-medium text-sm md:text-base ${
                    theme === "dark" 
                      ? "bg-orange-600 hover:bg-orange-700 text-white" 
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className={`fixed bottom-6 md:bottom-8 right-6 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group ${
              theme === "dark" ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            title="Back to Top"
          >
            <SafeIcon name="ArrowUp" className="w-4 h-4 md:w-5 md:h-5" />
            <div className="absolute inset-0 rounded-full bg-white/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WelfareSchemesPage;