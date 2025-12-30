// app/management/schemes/new/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import createScheme from './newServerAction'
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  Calendar,
  IndianRupee,
  CheckCircle,
  XCircle,
  Link as LinkIcon,
  Video,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  AlertCircle,
} from "lucide-react";

// Interface for Required Documents
interface IRequiredDocument {
  name: string;
  description: string;
  image?: string;
  officialLink?: string;
  videoGuide?: string;
  importance?: "High" | "Medium" | "Low";
}

// Interface for FAQA
interface IFaq {
  question: string;
  answer: string;
}

// Interface for EC
interface EligibilityState {
  eligible: string[];
  nonEligible: string[];
};

// Interface for AP
interface ApplicationProcessState  {
  online: string[];
  offline: string[];
};

export interface SchemeFormData {
  title: string;
  shortName: string;
  shortDescription: string;
  detailedDescription: string[];
  portalLink: string;
  imageUrl: string;
  launchedYear: string;
  category: string;
  detailedPage: string;
  icon: string;
  keyInfo: {
    duration: string;
    amount: string;
    applyFrom: string;
    lastDate: string;
  };
  benefits: string[];
  eligibilityCriteria: string[];
  nonEligible: string[];
  requiredDocuments: IRequiredDocument[];
  applicationProcess: {
    online: string[];
    offline: string[];
  };
  faqs: IFaq[];
}

export default function CreateSchemePage() {
  const { theme } = useTheme();
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [externalImageUrl, setExternalImageUrl] = useState("");
  
  // State for expanding sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basicInfo: true,
    keyInfo: true,
    benefits: true,
    eligibility: true,
    documents: true,
    application: true,
    faqs: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // <----------------------------------------->
  // <----------------------------------------->

  //state for Required documents
  const [documents, setDocuments] = useState<IRequiredDocument[]>([
    {
      name: "",
      description: "",
      image:"",
      officialLink:"",
      videoGuide:"",
      importance:"Low",
    }
  ]);

  //state for eligibility criteria 
  const [eligibilityState, setEligibilityState] = useState<EligibilityState>({
    eligible: [""],
    nonEligible: [""],
  });

  //state for Application Process
  const [applicationProcess, setApplicationProcess] = useState<ApplicationProcessState>({
    online: [""],
    offline: [""],
  });

  //state for FAQ's
  const [faqs, setFaqs] = useState<IFaq[]>([
    { question: "", answer: "" },
  ]);

  //state for detailed description
  const [detailedDescription, setDetailedDescription] = useState<string[]>([""]);

  //state for benefits
  const [benefits, setBenefits] = useState<string[]>([""]);

  // <------------------------------------------->
  // <----------------------------------------->

  // helper1 - Update document
  const updateDocument = <K extends keyof IRequiredDocument>(
    index: number,
    field: K,
    value: IRequiredDocument[K]
  ) => {
    const copy = [...documents];
    copy[index][field] = value;
    setDocuments(copy);
  };

  // Add new document
  const addDocument = () => {
    setDocuments([
      ...documents,
      {
        name: "",
        description: "",
        image: "",
        officialLink: "",
        videoGuide: "",
        importance: "Medium",
      },
    ]);
  };

  //helper 2 - Eligibility
  const updateEligibility = (
    section: "eligible" | "nonEligible",
    index: number,
    value: string
  ) => {
    const copy = { ...eligibilityState };
    copy[section][index] = value;
    setEligibilityState(copy);
  };

  const addEligibility = (section: "eligible" | "nonEligible") => {
    setEligibilityState({
      ...eligibilityState,
      [section]: [...eligibilityState[section], ""],
    });
  };

  const removeEligibility = (
    section: "eligible" | "nonEligible",
    index: number
  ) => {
    setEligibilityState({
      ...eligibilityState,
      [section]: eligibilityState[section].filter((_, i) => i !== index),
    });
  };

  //helper 3 - Application Process
  const updateProcessStep = (
    type: "online" | "offline",
    index: number,
    value: string
  ) => {
    const copy = { ...applicationProcess };
    copy[type][index] = value;
    setApplicationProcess(copy);
  };

  const addProcessStep = (type: "online" | "offline") => {
    setApplicationProcess({
      ...applicationProcess,
      [type]: [...applicationProcess[type], ""],
    });
  };

  const removeProcessStep = (
    type: "online" | "offline",
    index: number
  ) => {
    setApplicationProcess({
      ...applicationProcess,
      [type]: applicationProcess[type].filter((_, i) => i !== index),
    });
  };

  //helper4 - FAQs
  const updateFaq = (
    index: number,
    field: keyof IFaq,
    value: string
  ) => {
    const copy = [...faqs];
    copy[index][field] = value;
    setFaqs(copy);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const isDark = theme === "dark";

  //helper 5 - Detailed Description
  const updateDescription = (index: number, value: string): void => {
    setDetailedDescription((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  const addDescription = (): void => {
    setDetailedDescription((prev) => [...prev, ""]);
  };

  const removeDescription = (index: number): void => {
    setDetailedDescription((prev) => prev.filter((_, i) => i !== index));
  };

  //helper6 - Benefits
  const updateBenefit = (index: number, value: string): void => {
    setBenefits((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  const addBenefit = (): void => {
    setBenefits((prev) => [...prev, ""]);
  };

  const removeBenefit = (index: number): void => {
    setBenefits((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setExternalImageUrl(""); // clear URL if file chosen
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => router.back()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                isDark
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Create New Scheme
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Fill in all required details for the new government scheme
          </p>
        </div>
        <button
          type="submit"
          form="scheme-form"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Save className="w-5 h-5" />
          Create Scheme
        </button>
      </div>

      <form 
        id="scheme-form"
        action={createScheme} 
        encType="multipart/form-data" 
        className="space-y-6"
      >
        {/* Basic Information Card */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('basicInfo')}
            className={`w-full px-6 py-4 flex items-center justify-between text-left ${
              isDark ? 'hover:bg-slate-700/30' : 'hover:bg-gray-50'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
                <FileText className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Basic Information
              </h2>
            </div>
            {expandedSections.basicInfo ? (
              <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            )}
          </button>
          
          {expandedSections.basicInfo && (
            <div className="px-6 pb-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Scheme Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter scheme title"
                  />
                </div>

                {/* Short Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Short Name *
                  </label>
                  <input
                    type="text"
                    name="shortName"
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter short name"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      name="group"
                      required
                      className={`w-full px-4 py-2.5 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark
                          ? 'bg-slate-700 border-slate-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="farmer">Farmers</option>
                      <option value="women">Women</option>
                      <option value="secondary">Senior Citizens</option>
                      <option value="higher">Healthcare</option>
                    </select>
                    <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                      isDark ? 'text-slate-400' : 'text-gray-400'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Launched Year */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Launched Year *
                  </label>
                  <input
                    type="number"
                    min="2000"
                    max="2030"
                    name="launchedYear"
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="2024"
                  />
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Short Description *
                  </label>
                  <textarea
                    rows={3}
                    name="shortDescription"
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Brief description of the scheme"
                  />
                </div>

                {/* Detailed Description */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Detailed Description
                  </label>
                  <div className="space-y-3">
                    {detailedDescription.map((desc, index) => (
                      <div key={index} className="flex gap-2">
                        <textarea
                          value={desc}
                          onChange={(e) => updateDescription(index, e.target.value)}
                          className={`flex-1 px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDark
                              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          placeholder={`Paragraph ${index + 1}`}
                          rows={2}
                        />
                        {detailedDescription.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDescription(index)}
                            className={`p-2.5 rounded-lg transition-all hover:scale-110 ${
                              isDark 
                                ? 'hover:bg-red-500/20 text-red-400' 
                                : 'hover:bg-red-50 text-red-500'
                            }`}
                            title="Remove paragraph"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addDescription}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                        isDark
                          ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      Add Paragraph
                    </button>
                  </div>
                  <input
                    type="hidden"
                    name="detailedDescription"
                    value={JSON.stringify(detailedDescription)}
                  />
                </div>

                {/* Portal Link */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Portal Link *
                  </label>
                  <div className="relative">
                    <LinkIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDark ? 'text-slate-400' : 'text-gray-400'
                    }`} />
                    <input
                      type="url"
                      name="portalLink"
                      required
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="https://official-portal.gov.in"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Information Card */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('keyInfo')}
            className={`w-full px-6 py-4 flex items-center justify-between text-left ${
              isDark ? 'hover:bg-slate-700/30' : 'hover:bg-gray-50'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                <Calendar className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Key Information
              </h2>
            </div>
            {expandedSections.keyInfo ? (
              <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            )}
          </button>
          
          {expandedSections.keyInfo && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Duration */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., 1 Year"
                  />
                </div>

                {/* Amount/Benefit */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    <IndianRupee className="inline w-4 h-4 mr-2" />
                    Amount/Benefit
                  </label>
                  <input
                    type="text"
                    name="amount"
                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., ₹50,000 per year"
                  />
                </div>

                {/* Apply From */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Apply From
                  </label>
                  <input
                    type="date"
                    name="applyFrom"
                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                {/* Last Date */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Last Date
                  </label>
                  <input
                    type="date"
                    name="lastDate"
                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scheme Image Card */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <div className="px-6 py-4 border-b border-slate-700/30">
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Scheme Image & Icon
            </h2>
          </div>
          
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* File Upload Section */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  Upload Scheme Image *
                </label>
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  isDark
                    ? 'border-slate-600 hover:border-slate-500 bg-slate-700/50'
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}>
                  <input
                    type="file"
                    id="image-upload"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={externalImageUrl.length > 0}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer block">
                    {imagePreview ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-40 h-40 object-cover rounded-lg mb-4"
                        />
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className={`w-12 h-12 mb-4 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
                        <p className={`font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Click to upload image
                        </p>
                        <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Image URL & Icon Section */}
              <div className="space-y-6">
                {/* Image URL */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Or Enter Image URL
                  </label>
                  <input
                    type="url"
                    name="externalImageUrl"
                    value={externalImageUrl}
                    onChange={(e) => {
                      setExternalImageUrl(e.target.value);
                      setImagePreview(null);
                    }}
                    disabled={!!imagePreview}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Icon Selection */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Select Icon
                  </label>
                  <div className="relative">
                    <select
                      name="icon"
                      className={`w-full px-4 py-2.5 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark
                          ? 'bg-slate-700 border-slate-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="BookOpen">📚 Book Open</option>
                      <option value="GraduationCap">🎓 Graduation Cap</option>
                      <option value="Heart">❤️ Heart</option>
                      <option value="Sprout">🌱 Sprout</option>
                      <option value="Shield">🛡️ Shield</option>
                      <option value="Briefcase">💼 Briefcase</option>
                      <option value="Users">👥 Users</option>
                      <option value="Home">🏠 Home</option>
                    </select>
                    <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                      isDark ? 'text-slate-400' : 'text-gray-400'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Card */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('benefits')}
            className={`w-full px-6 py-4 flex items-center justify-between text-left ${
              isDark ? 'hover:bg-slate-700/30' : 'hover:bg-gray-50'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-50'}`}>
                <CheckCircle className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Benefits
              </h2>
            </div>
            {expandedSections.benefits ? (
              <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            )}
          </button>
          
          {expandedSections.benefits && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 pt-2">
                      <CheckCircle className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                    </div>
                    <textarea
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      className={`flex-1 px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder={`Benefit ${index + 1}`}
                      rows={2}
                    />
                    {benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className={`p-2.5 rounded-lg transition-all hover:scale-110 ${
                          isDark 
                            ? 'hover:bg-red-500/20 text-red-400' 
                            : 'hover:bg-red-50 text-red-500'
                        }`}
                        title="Remove benefit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBenefit}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                    isDark
                      ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add Benefit
                </button>
                <input
                  type="hidden"
                  name="benefits"
                  value={JSON.stringify(benefits)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Eligibility Criteria Card */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('eligibility')}
            className={`w-full px-6 py-4 flex items-center justify-between text-left ${
              isDark ? 'hover:bg-slate-700/30' : 'hover:bg-gray-50'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                <AlertCircle className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Eligibility Criteria
              </h2>
            </div>
            {expandedSections.eligibility ? (
              <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            )}
          </button>
          
          {expandedSections.eligibility && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Eligible Applicants */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    ✅ Eligible Applicants
                  </h3>
                  {eligibilityState.eligible.map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 border-green-500 ${
                      isDark ? 'bg-slate-700/30' : 'bg-green-50/50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Criteria #{index + 1}
                        </span>
                        {eligibilityState.eligible.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEligibility("eligible", index)}
                            className={`p-1.5 rounded-lg transition-all hover:scale-110 ${
                              isDark 
                                ? 'hover:bg-red-500/20 text-red-400' 
                                : 'hover:bg-red-50 text-red-500'
                            }`}
                            title="Remove criteria"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <textarea
                        placeholder="Description"
                        value={item}
                        onChange={(e) => updateEligibility("eligible", index, e.target.value)}
                        rows={2}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addEligibility("eligible")}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                      isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add Eligible Criteria
                  </button>
                </div>

                {/* Not Eligible */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    ❌ Not Eligible
                  </h3>
                  {eligibilityState.nonEligible.map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 border-red-500 ${
                      isDark ? 'bg-slate-700/30' : 'bg-red-50/50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Restriction #{index + 1}
                        </span>
                        {eligibilityState.nonEligible.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEligibility("nonEligible", index)}
                            className={`p-1.5 rounded-lg transition-all hover:scale-110 ${
                              isDark 
                                ? 'hover:bg-red-500/20 text-red-400' 
                                : 'hover:bg-red-50 text-red-500'
                            }`}
                            title="Remove restriction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <textarea
                        placeholder="Description"
                        value={item}
                        onChange={(e) => updateEligibility("nonEligible", index, e.target.value)}
                        rows={2}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addEligibility("nonEligible")}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                      isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add Non-Eligible Case
                  </button>
                </div>
              </div>
              <input
                type="hidden"
                name="eligibility"
                value={JSON.stringify({
                  eligible: eligibilityState.eligible,
                  nonEligible: eligibilityState.nonEligible,
                })}
              />
            </div>
          )}
        </div>

        {/* Required Documents Card */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('documents')}
            className={`w-full px-6 py-4 flex items-center justify-between text-left ${
              isDark ? 'hover:bg-slate-700/30' : 'hover:bg-gray-50'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                <FileText className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Required Documents
              </h2>
            </div>
            {expandedSections.documents ? (
              <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            )}
          </button>
          
          {expandedSections.documents && (
            <div className="px-6 pb-6">
              <div className="space-y-6">
                {documents.map((doc, index) => (
                  <div key={index} className={`p-6 rounded-xl border ${
                    isDark ? 'bg-slate-700/30 border-slate-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Document #{index + 1}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          doc.importance === "High" 
                            ? (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-800')
                            : doc.importance === "Medium"
                            ? (isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800')
                            : (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800')
                        }`}>
                          {doc.importance}
                        </span>
                      </div>
                      {documents.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
                          className={`p-2 rounded-lg transition-all hover:scale-110 ${
                            isDark 
                              ? 'hover:bg-red-500/20 text-red-400' 
                              : 'hover:bg-red-50 text-red-500'
                          }`}
                          title="Remove document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Document Name */}
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Document Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Aadhaar Card"
                          value={doc.name}
                          onChange={(e) => updateDocument(index, "name", e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDark
                              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Description
                        </label>
                        <textarea
                          placeholder="Brief description of what this document contains and why it's needed"
                          value={doc.description}
                          onChange={(e) => updateDocument(index, "description", e.target.value)}
                          rows={3}
                          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDark
                              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>

                      {/* Image/Document Preview */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Image/Document URL
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            placeholder="https://example.com/document-image.jpg"
                            value={doc.image || ""}
                            onChange={(e) => updateDocument(index, "image", e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDark
                                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                          {doc.image && (
                            <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                          )}
                        </div>
                      </div>

                      {/* Official Link */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Official Link
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            placeholder="https://gov.in/official-document-link"
                            value={doc.officialLink || ""}
                            onChange={(e) => updateDocument(index, "officialLink", e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDark
                                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                          <LinkIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                        </div>
                      </div>

                      {/* Video Guide */}
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Video Guide (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            placeholder="https://youtube.com/how-to-upload-document"
                            value={doc.videoGuide || ""}
                            onChange={(e) => updateDocument(index, "videoGuide", e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDark
                                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                          <Video className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                        </div>
                      </div>

                      {/* Importance */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Importance Level
                        </label>
                        <div className="relative">
                          <select
                            value={doc.importance}
                            onChange={(e) =>
                              updateDocument(index, "importance", e.target.value as "High" | "Medium" | "Low")
                            }
                            className={`w-full px-4 py-2.5 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDark
                                ? 'bg-slate-700 border-slate-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="Low">Low Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="High">High Priority</option>
                          </select>
                          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                            isDark ? 'text-slate-400' : 'text-gray-400'
                          }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addDocument}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all hover:scale-105 ${
                    isDark
                      ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Required Document
                </button>
              </div>
              <input
                type="hidden"
                name="documents"
                value={JSON.stringify(documents)}
              />
            </div>
          )}
        </div>

        {/* Application Process Card */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('application')}
            className={`w-full px-6 py-4 flex items-center justify-between text-left ${
              isDark ? 'hover:bg-slate-700/30' : 'hover:bg-gray-50'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                <ArrowLeft className={`w-5 h-5 rotate-90 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Application Process
              </h2>
            </div>
            {expandedSections.application ? (
              <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            )}
          </button>
          
          {expandedSections.application && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Online Application */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    Online Application Steps
                  </h3>
                  {applicationProcess.online.map((step, index) => (
                    <div key={`online-${index}`} className="flex gap-3 items-start">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mt-2 ${
                        isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {index + 1}
                      </div>
                      <textarea
                        value={step}
                        onChange={(e) => updateProcessStep("online", index, e.target.value)}
                        placeholder={`Step ${index + 1}`}
                        rows={2}
                        className={`flex-1 px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      {applicationProcess.online.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProcessStep("online", index)}
                          className={`p-2.5 mt-2 rounded-lg transition-all hover:scale-110 ${
                            isDark 
                              ? 'hover:bg-red-500/20 text-red-400' 
                              : 'hover:bg-red-50 text-red-500'
                          }`}
                          title="Remove step"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addProcessStep("online")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                      isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add Step
                  </button>
                </div>

                {/* Offline Application */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    Offline Application Steps
                  </h3>
                  {applicationProcess.offline.map((step, index) => (
                    <div key={`offline-${index}`} className="flex gap-3 items-start">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mt-2 ${
                        isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                      }`}>
                        {index + 1}
                      </div>
                      <textarea
                        value={step}
                        onChange={(e) => updateProcessStep("offline", index, e.target.value)}
                        placeholder={`Step ${index + 1}`}
                        rows={2}
                        className={`flex-1 px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      {applicationProcess.offline.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProcessStep("offline", index)}
                          className={`p-2.5 mt-2 rounded-lg transition-all hover:scale-110 ${
                            isDark 
                              ? 'hover:bg-red-500/20 text-red-400' 
                              : 'hover:bg-red-50 text-red-500'
                          }`}
                          title="Remove step"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addProcessStep("offline")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                      isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add Step
                  </button>
                </div>
              </div>
              <input
                type="hidden"
                name="applicationProcess"
                value={JSON.stringify(applicationProcess)}
              />
            </div>
          )}
        </div>

        {/* FAQs Card */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('faqs')}
            className={`w-full px-6 py-4 flex items-center justify-between text-left ${
              isDark ? 'hover:bg-slate-700/30' : 'hover:bg-gray-50'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-pink-500/20' : 'bg-pink-50'}`}>
                <AlertCircle className={`w-5 h-5 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Frequently Asked Questions (FAQs)
              </h2>
            </div>
            {expandedSections.faqs ? (
              <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
            )}
          </button>
          
          {expandedSections.faqs && (
            <div className="px-6 pb-6">
              <div className="space-y-6">
                {faqs.map((faq, index) => ( 
                  <div key={index} className={`p-6 rounded-xl border ${
                    isDark ? 'bg-slate-700/30 border-slate-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        FAQ #{index + 1}
                      </h3>
                      {faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFaq(index)}
                          className={`p-2 rounded-lg transition-all hover:scale-110 ${
                            isDark 
                              ? 'hover:bg-red-500/20 text-red-400' 
                              : 'hover:bg-red-50 text-red-500'
                          }`}
                          title="Remove FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Question */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Question
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFaq(index, "question", e.target.value)}
                          placeholder="Enter question"
                          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDark
                              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>

                      {/* Answer */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Answer
                        </label>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => updateFaq(index, "answer", e.target.value)}
                          placeholder="Enter answer"
                          rows={3}
                          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDark
                              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addFaq}
                className={`mt-6 flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Another FAQ
              </button>

              <input
                type="hidden"
                name="faqs"
                value={JSON.stringify(faqs)}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`rounded-2xl border p-6 ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all hover:scale-105 ${
                isDark
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Save className="w-5 h-5" />
              Create Scheme
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}