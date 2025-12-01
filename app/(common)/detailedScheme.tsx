"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/app/context/ThemeContext";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Moon,
  Sun,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronRight,
  Calendar,
  IndianRupee,
  FileText,
  Clock,
  CheckCircle,
  Info,
  Users,
  HelpCircle,
  ExternalLink,
  Play,
  ChevronDown,
  Home,
  Book,
  User,
  X as CloseIcon,
} from "lucide-react";

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const NAVIGATION_SECTIONS = [
  { id: "key-info", icon: Info, label: "Key Information" },
  { id: "about", icon: Book, label: "About Scheme" },
  { id: "eligibility", icon: CheckCircle, label: "Eligibility" },
  { id: "documents", icon: FileText, label: "Documents" },
  { id: "application", icon: Users, label: "How to Apply" },
  { id: "faqs", icon: HelpCircle, label: "FAQs" },
];

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  documentName: string;
}

//======================================================================

export interface IRequiredDocument {
  name: string;
  description: string;
  image?: string;
  officialLink?: string;
  videoGuide?: string;
  importance?: "High" | "Medium" | "Low";
}

export interface IApplicationProcess {
  online: string[];
  offline: string[];
}

export interface IFaq {
  question: string;
  answer: string;
}

export interface IKeyInfo {
  duration: string;
  amount: string;
  applyFrom?: string;
  lastDate?: string;
}

export interface IWW {
  title: string;
  shortName: string;
  keyInfo: IKeyInfo;
  shortDescription: string;
  detailedDescription: string[];
  portalLink: string;
  benefits: string[];
  eligibilityCriteria: string[];
  nonEligible: string[];
  requiredDocuments: IRequiredDocument[];
  applicationProcess: IApplicationProcess;
  faqs: IFaq[];
  imageUrl?: string;
  launchedYear?: number;
  category?: string;
  detailedPage?: string;
  icon?: string;
}

//=====================================================================================================================
const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  documentName,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-8 sm:-top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <img
            src={imageUrl}
            alt={`Sample of ${documentName}`}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
          <div className="p-3 sm:p-4 bg-white border-t">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
              {documentName} - Sample
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero Section
interface HeroSectionProps {
  isDarkMode: boolean;
  shortName: string;
  imageUrl?: string;
  shortDescription: string;
  portalLink: string;
  title: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isDarkMode,
  shortName,
  imageUrl,
  shortDescription,
  portalLink,
  title,
}) => {
  return (
    <section
      className="relative h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg mx-0 my-4 sm:my-6 lg:my-8"
      role="region"
      aria-label={`${shortName} hero`}
    >
      <img
        src={imageUrl}
        alt={`${shortName} Scheme Banner`}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 via-blue-600/80 to-blue-500/70 flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight max-w-3xl drop-shadow-md">
          {title}
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 mb-4 sm:mb-5 md:mb-6 max-w-2xl drop-shadow-sm line-clamp-2 sm:line-clamp-none">
          {shortDescription}
        </p>
        <a
          href={portalLink}
          className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 max-w-fit"
          aria-label={`Apply for ${shortName} on official site`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          Apply Now
        </a>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

interface SchemeDetailLayoutProps {
  IWW: IWW;
}

const SchemeDetailPage: React.FC<SchemeDetailLayoutProps> = ({ IWW }) => {
  const {
    title,
    shortName,
    keyInfo,
    shortDescription,
    detailedDescription,
    portalLink,
    benefits,
    eligibilityCriteria,
    nonEligible,
    requiredDocuments,
    applicationProcess,
    faqs,
    imageUrl,
    launchedYear,
    category,
    detailedPage,
    icon,
  } = IWW;
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const isDarkMode = theme === "dark";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        const newTheme = e.newValue as "light" | "dark";
        setTheme(newTheme);
        document.body.className = newTheme;
      }
    };

    const handleThemeChange = (e: Event) => {
      const custom = e as CustomEvent<"light" | "dark">;
      const newTheme = custom.detail;
      setTheme(newTheme);
      document.body.className = newTheme;
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("themeChange", handleThemeChange as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "themeChange",
        handleThemeChange as EventListener
      );
    };
  }, [setTheme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      document.body.className = newTheme;
      localStorage.setItem("theme", newTheme);
      window.dispatchEvent(
        new CustomEvent<"light" | "dark">("themeChange", { detail: newTheme })
      );
    }
  };

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offset = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQIndex((prev) => (prev === index ? null : index));
  };

  const openImageModal = (url: string, name: string) => {
    setSelectedImage({ url, name });
  };

  const closeImageModal = () => setSelectedImage(null);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Container with responsive padding */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <HeroSection
          isDarkMode={isDarkMode}
          shortName={shortName}
          imageUrl={imageUrl}
          title={title}
          shortDescription={shortDescription}
          portalLink={portalLink}
        />
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 relative z-20">
        {/* Breadcrumb - Always visible for all screen sizes */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm flex-wrap">
            <Link
              href="/"
              className={`flex items-center gap-1 ${
                isDarkMode
                  ? "text-blue-400 hover:underline"
                  : "text-blue-600 hover:underline"
              }`}
            >
              <Home className="w-3 h-3 sm:w-4 sm:h-4" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/schemes"
              className={
                isDarkMode
                  ? "text-blue-400 hover:underline"
                  : "text-blue-600 hover:underline"
              }
            >
              Schemes
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span
              className={
                isDarkMode ? "text-slate-400" : "text-gray-600"
              }
            >
              {shortName.length > 20 ? `${shortName.substring(0, 20)}...` : shortName}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar - Hidden on mobile, visible on desktop */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 h-fit">
            <div
              className={`rounded-2xl p-6 shadow-lg border ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`font-bold text-lg mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {NAVIGATION_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${
                      isDarkMode
                        ? "hover:bg-slate-800 text-slate-300 active:bg-slate-700"
                        : "hover:bg-gray-100 text-gray-700 active:bg-gray-200"
                    }`}
                  >
                    <section.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content - Enhanced spacing */}
          <section className="lg:col-span-9 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Key Info - Enhanced mobile grid */}
            <div
              id="key-info"
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                {[
                  {
                    icon: Calendar,
                    label: "Duration",
                    value: keyInfo.duration,
                    color: "purple",
                  },
                  {
                    icon: IndianRupee,
                    label: "Amount",
                    value: keyInfo.amount,
                    color: "green",
                  },
                  {
                    icon: FileText,
                    label: "Apply From",
                    value: keyInfo.applyFrom ?? "N/A",
                    color: "blue",
                  },
                  {
                    icon: Clock,
                    label: "Last Date",
                    value: keyInfo.lastDate ?? "N/A",
                    color: "red",
                  },
                ].map((item, index) => {
                  const bgClass =
                    item.color === "purple"
                      ? isDarkMode
                        ? "bg-purple-900"
                        : "bg-purple-100"
                      : item.color === "green"
                      ? isDarkMode
                        ? "bg-green-900"
                        : "bg-green-100"
                      : item.color === "blue"
                      ? isDarkMode
                        ? "bg-blue-900"
                        : "bg-blue-100"
                      : isDarkMode
                      ? "bg-red-900"
                      : "bg-red-100";

                  const textClass =
                    item.color === "purple"
                      ? isDarkMode
                        ? "text-purple-400"
                        : "text-purple-600"
                      : item.color === "green"
                      ? isDarkMode
                        ? "text-green-400"
                        : "text-green-600"
                      : item.color === "blue"
                      ? isDarkMode
                        ? "text-blue-400"
                        : "text-blue-600"
                      : isDarkMode
                      ? "text-red-400"
                        : "text-red-600";

                  return (
                    <div key={index} className="text-center p-2 sm:p-3">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center ${bgClass} transition-transform hover:scale-110`}
                      >
                        <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${textClass}`} />
                      </div>
                      <h4
                        className={`text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </h4>
                      <p
                        className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold break-words ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* About Section - Enhanced typography */}
            <div
              id="about"
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                About {shortName}
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {detailedDescription.map((para, idx) => (
                  <p
                    key={idx}
                    className={`text-sm sm:text-base leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    {para}
                  </p>
                ))}
                <div className="mt-4 sm:mt-6">
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Key Highlights
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span
                          className={`text-sm sm:text-base ${
                            isDarkMode ? "text-slate-300" : "text-gray-700"
                          }`}
                        >
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Eligibility Section - Better mobile layout */}
            <div
              id="eligibility"
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Eligibility Criteria
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <h3
                    className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    Eligible Applicants
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {eligibilityCriteria.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span
                          className={`text-sm sm:text-base ${
                            isDarkMode ? "text-slate-300" : "text-gray-700"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3
                    className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    Not Eligible
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {nonEligible.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        <span
                          className={`text-sm sm:text-base ${
                            isDarkMode ? "text-slate-300" : "text-gray-700"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Documents Section - Improved mobile table */}
            <div
              id="documents"
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Required Documents
              </h2>
              <p
                className={`text-sm sm:text-base mb-4 sm:mb-6 ${
                  isDarkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Ensure you have all the following documents ready before
                starting your application process. All documents should be
                clear, legible, and in the specified format.
              </p>

              {/* Mobile Card View */}
              <div className="block md:hidden space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div
                    key={doc.name + index}
                    className={`border rounded-lg p-4 ${
                      isDarkMode
                        ? "border-slate-700 bg-slate-800"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              isDarkMode
                                ? "bg-blue-900 text-blue-300"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            #{index + 1}
                          </span>
                        </div>
                        <p className={`font-semibold text-sm sm:text-base mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {doc.name}
                        </p>
                        <p
                          className={`text-xs sm:text-sm ${
                            isDarkMode
                              ? "text-slate-400"
                              : "text-gray-600"
                          }`}
                        >
                          {doc.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {doc.image ? (
                        <button
                          onClick={() => openImageModal(doc.image!, doc.name)}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
                            isDarkMode
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                          View Sample
                        </button>
                      ) : (
                        <div className="flex-1" />
                      )}
                      {doc.officialLink ? (
                        <a
                          href={doc.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Official Link
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto -mx-2 sm:-mx-0">
                <table
                  className={`w-full border-collapse ${
                    isDarkMode ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  <thead>
                    <tr
                      className={`border-b ${
                        isDarkMode
                          ? "border-slate-700 bg-slate-800"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        No.
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Document Name
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">
                        Sample
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">
                        Official Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requiredDocuments.map((doc, index) => (
                      <tr
                        key={doc.name + index}
                        className={`border-b ${
                          isDarkMode
                            ? "border-slate-700 hover:bg-slate-800"
                            : "border-gray-200 hover:bg-gray-50"
                        } transition-colors`}
                      >
                        <td className="py-4 px-4 font-medium text-sm">
                          {index + 1}
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold text-base">
                              {doc.name}
                            </p>
                            <p
                              className={`text-sm ${
                                isDarkMode
                                  ? "text-slate-400"
                                  : "text-gray-600"
                              } mt-1`}
                            >
                              {doc.description}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {doc.image ? (
                            <button
                              onClick={() =>
                                openImageModal(doc.image!, doc.name)
                              }
                              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                                isDarkMode
                                  ? "bg-blue-600 text-white hover:bg-blue-700"
                                  : "bg-blue-500 text-white hover:bg-blue-600"
                              }`}
                            >
                              <FileText className="w-4 h-4" />
                              View
                            </button>
                          ) : (
                            <span
                              className={`text-sm ${
                                isDarkMode
                                  ? "text-slate-500"
                                  : "text-gray-500"
                              }`}
                            >
                              N/A
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {doc.officialLink ? (
                            <a
                              href={doc.officialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Official
                            </a>
                          ) : (
                            <span
                              className={`text-sm ${
                                isDarkMode
                                  ? "text-slate-500"
                                  : "text-gray-500"
                              }`}
                            >
                              N/A
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Application Process - Enhanced mobile */}
            <div
              id="application"
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Application Process
              </h2>
              <p
                className={`text-sm sm:text-base mb-4 sm:mb-6 ${
                  isDarkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Choose your preferred method to apply for the {shortName} scheme:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Online */}
                <div
                  className={`rounded-xl p-4 sm:p-6 border ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-purple-600" : "bg-purple-100"
                    }`}>
                      <span className={`text-lg ${isDarkMode ? "text-white" : "text-purple-600"}`}>🌐</span>
                    </div>
                    Online Application
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {applicationProcess.online.map((step, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2 sm:gap-3 p-3 sm:p-3.5 rounded-lg transition-colors ${
                          isDarkMode
                            ? "bg-slate-700 hover:bg-slate-600"
                            : "bg-white hover:bg-gray-100"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm ${
                            isDarkMode
                              ? "bg-purple-600 text-white"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <p
                          className={`pt-0.5 text-xs sm:text-sm leading-relaxed ${
                            isDarkMode
                              ? "text-slate-300"
                              : "text-gray-700"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offline */}
                <div
                  className={`rounded-xl p-4 sm:p-6 border ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-blue-600" : "bg-blue-100"
                    }`}>
                      <span className={`text-lg ${isDarkMode ? "text-white" : "text-blue-600"}`}>📄</span>
                    </div>
                    Offline Application
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {applicationProcess.offline.map((step, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2 sm:gap-3 p-3 sm:p-3.5 rounded-lg transition-colors ${
                          isDarkMode
                            ? "bg-slate-700 hover:bg-slate-600"
                            : "bg-white hover:bg-gray-100"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm ${
                            isDarkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <p
                          className={`pt-0.5 text-xs sm:text-sm leading-relaxed ${
                            isDarkMode
                              ? "text-slate-300"
                              : "text-gray-700"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs - Better mobile interaction */}
            <div
              id="faqs"
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, idx) => {
                  const active = activeFAQIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`border rounded-xl overflow-hidden transition-all ${
                        isDarkMode ? "border-slate-800" : "border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(idx)}
                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between transition-colors active:scale-[0.99] ${
                          isDarkMode
                            ? "hover:bg-slate-800"
                            : "hover:bg-gray-50"
                        } ${
                          active
                            ? isDarkMode
                              ? "bg-slate-800"
                              : "bg-gray-50"
                            : ""
                        }`}
                      >
                        <span
                          className={`font-semibold text-sm sm:text-base pr-4 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                            active ? "rotate-180" : ""
                          } ${
                            isDarkMode
                              ? "text-slate-400"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          active ? "max-h-[500px]" : "max-h-0"
                        }`}
                      >
                        <div
                          className={`px-4 sm:px-6 py-3 sm:py-4 border-t ${
                            isDarkMode
                              ? "border-slate-800 bg-slate-800/50"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <p
                            className={`text-sm sm:text-base leading-relaxed ${
                              isDarkMode
                                ? "text-slate-300"
                                : "text-gray-700"
                            }`}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Help Section - Responsive CTA */}
            <div
              className={`rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-white shadow-lg ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-900 to-blue-800"
                  : "bg-gradient-to-r from-blue-600 to-blue-500"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                    Need Help with Your Application?
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base">
                    Our support team is here to help you with any queries about{" "}
                    {shortName}. Get personalized assistance for document
                    preparation and application submission.
                  </p>
                </div>
                <div className="w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-5 sm:px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all whitespace-nowrap hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeImageModal}
        imageUrl={selectedImage?.url || ""}
        documentName={selectedImage?.name || ""}
      />

      {/* Back to Top Button - Enhanced mobile */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 text-white rounded-full flex items-center justify-center shadow-lg transform hover:-translate-y-1 active:scale-95 transition-all duration-300 z-50"
          style={{
            backgroundColor: isDarkMode ? "#2563eb" : "#1d4ed8",
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  );
};

export default SchemeDetailPage;