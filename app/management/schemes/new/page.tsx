// create new scheme
// app/management/schemes/new/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  X,
  Calendar,
  IndianRupee,
  FileText,
  CheckCircle,
  XCircle,
  Link as LinkIcon,
  Video,
} from 'lucide-react';

interface IRequiredDocument {
  name: string;
  description: string;
  image?: string;
  officialLink?: string;
  videoGuide?: string;
  importance?: "High" | "Medium" | "Low";
}

interface IFaq {
  question: string;
  answer: string;
}

export default function CreateSchemePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    title: '',
    shortName: '',
    shortDescription: '',
    detailedDescription: [''],
    portalLink: '',
    imageUrl: '',
    launchedYear: new Date().getFullYear().toString(),
    category: 'Education',
    detailedPage: '',
    icon: 'BookOpen',
    isActive: true,
    
    keyInfo: {
      duration: '',
      amount: '',
      applyFrom: '',
      lastDate: '',
    },
    
    benefits: [''],
    eligibilityCriteria: [''],
    nonEligible: [''],
    
    requiredDocuments: [{
      name: '',
      description: '',
      image: '',
      officialLink: '',
      videoGuide: '',
      importance: 'Medium' as const,
    }],
    
    applicationProcess: {
      online: [''],
      offline: [''],
    },
    
    faqs: [{
      question: '',
      answer: '',
    }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        router.push('/management/schemes');
      } else {
        throw new Error('Failed to create scheme');
      }
    } catch (error) {
      console.error('Error creating scheme:', error);
      alert('Failed to create scheme. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.url) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        setImagePreview(data.url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item, i) => 
        i === index ? value : item
      )
    }));
  };

  const isDark = theme === 'dark';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={() => router.back()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium mb-4 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl lg:text-3xl font-bold">Create New Scheme</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Fill in all required details for the new government scheme
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Scheme Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter scheme title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Short Name *</label>
              <input
                type="text"
                required
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter short name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="Education">Education</option>
                <option value="Farmers">Farmers</option>
                <option value="Women">Women</option>
                <option value="Youth">Youth</option>
                <option value="Senior Citizens">Senior Citizens</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Employment">Employment</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Launched Year *</label>
              <input
                type="number"
                required
                min="2000"
                max="2030"
                value={formData.launchedYear}
                onChange={(e) => setFormData({ ...formData, launchedYear: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="2024"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Short Description *</label>
              <textarea
                required
                rows={3}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Brief description of the scheme"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Detailed Description</label>
              {formData.detailedDescription.map((desc, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <textarea
                    value={desc}
                    onChange={(e) => updateArrayItem('detailedDescription', index, e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder={`Paragraph ${index + 1}`}
                    rows={2}
                  />
                  {formData.detailedDescription.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('detailedDescription', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('detailedDescription')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Paragraph
              </button>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Portal Link *</label>
              <div className="flex gap-2">
                <LinkIcon className={`w-5 h-5 mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="url"
                  required
                  value={formData.portalLink}
                  onChange={(e) => setFormData({ ...formData, portalLink: e.target.value })}
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="https://official-portal.gov.in"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Information */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Key Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Duration
              </label>
              <input
                type="text"
                required
                value={formData.keyInfo.duration}
                onChange={(e) => setFormData({
                  ...formData,
                  keyInfo: { ...formData.keyInfo, duration: e.target.value }
                })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="e.g., 1 Year"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                Amount/Benefit
              </label>
              <input
                type="text"
                required
                value={formData.keyInfo.amount}
                onChange={(e) => setFormData({
                  ...formData,
                  keyInfo: { ...formData.keyInfo, amount: e.target.value }
                })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="e.g., ₹50,000 per year"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Apply From</label>
              <input
                type="date"
                value={formData.keyInfo.applyFrom}
                onChange={(e) => setFormData({
                  ...formData,
                  keyInfo: { ...formData.keyInfo, applyFrom: e.target.value }
                })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Last Date</label>
              <input
                type="date"
                value={formData.keyInfo.lastDate}
                onChange={(e) => setFormData({
                  ...formData,
                  keyInfo: { ...formData.keyInfo, lastDate: e.target.value }
                })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Scheme Image</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Upload Scheme Image *</label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDark
                    ? 'border-slate-600 hover:border-slate-500'
                    : 'border-gray-300 hover:border-gray-400'
                } transition-colors`}
              >
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {uploadingImage ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p>Uploading...</p>
                    </div>
                  ) : imagePreview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mb-4"
                      />
                      <p className="text-sm text-gray-500 mb-2">Click to change image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="font-medium mb-2">Click to upload image</p>
                      <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Or Enter Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => {
                  setFormData({ ...formData, imageUrl: e.target.value });
                  setImagePreview(e.target.value);
                }}
                className={`w-full px-4 py-2 rounded-lg border mb-4 ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="BookOpen">Book Open</option>
                  <option value="GraduationCap">Graduation Cap</option>
                  <option value="Heart">Heart</option>
                  <option value="Sprout">Sprout</option>
                  <option value="Shield">Shield</option>
                  <option value="Briefcase">Briefcase</option>
                  <option value="Users">Users</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              
              <div className="mt-4 flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Active Scheme</span>
                </label>
                {formData.isActive ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Visible to users
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-500">
                    <XCircle className="w-4 h-4" />
                    Hidden from users
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Benefits</h2>
          
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <div className="flex items-start pt-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <textarea
                required
                value={benefit}
                onChange={(e) => updateArrayItem('benefits', index, e.target.value)}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder={`Benefit ${index + 1}`}
                rows={2}
              />
              {formData.benefits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('benefits', index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg mt-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('benefits')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-slate-700 hover:bg-slate-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Benefit
          </button>
        </div>

        {/* Eligibility Criteria */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Eligibility Criteria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600">Eligible Applicants</h3>
              {formData.eligibilityCriteria.map((criteria, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <textarea
                    required
                    value={criteria}
                    onChange={(e) => updateArrayItem('eligibilityCriteria', index, e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder={`Criteria ${index + 1}`}
                    rows={2}
                  />
                  {formData.eligibilityCriteria.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('eligibilityCriteria', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg mt-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('eligibilityCriteria')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Criteria
              </button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600">Not Eligible</h3>
              {formData.nonEligible.map((nonEligible, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <textarea
                    value={nonEligible}
                    onChange={(e) => updateArrayItem('nonEligible', index, e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder={`Non-eligible case ${index + 1}`}
                    rows={2}
                  />
                  {formData.nonEligible.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('nonEligible', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg mt-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('nonEligible')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Non-eligible Case
              </button>
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Required Documents</h2>
          
          {formData.requiredDocuments.map((doc, index) => (
            <div key={index} className={`p-6 rounded-lg mb-6 ${
              isDark ? 'bg-slate-700' : 'bg-gray-50'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Document #{index + 1}</h3>
                {formData.requiredDocuments.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      requiredDocuments: formData.requiredDocuments.filter((_, i) => i !== index)
                    })}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Document Name *</label>
                  <input
                    type="text"
                    required
                    value={doc.name}
                    onChange={(e) => {
                      const newDocs = [...formData.requiredDocuments];
                      newDocs[index].name = e.target.value;
                      setFormData({ ...formData, requiredDocuments: newDocs });
                    }}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-600 border-slate-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="e.g., Aadhar Card"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Importance</label>
                  <select
                    value={doc.importance}
                    onChange={(e) => {
                      const newDocs = [...formData.requiredDocuments];
                      newDocs[index].importance = e.target.value as any;
                      setFormData({ ...formData, requiredDocuments: newDocs });
                    }}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-600 border-slate-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    required
                    value={doc.description}
                    onChange={(e) => {
                      const newDocs = [...formData.requiredDocuments];
                      newDocs[index].description = e.target.value;
                      setFormData({ ...formData, requiredDocuments: newDocs });
                    }}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-600 border-slate-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Describe the document requirements"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sample Image URL</label>
                  <input
                    type="url"
                    value={doc.image || ''}
                    onChange={(e) => {
                      const newDocs = [...formData.requiredDocuments];
                      newDocs[index].image = e.target.value;
                      setFormData({ ...formData, requiredDocuments: newDocs });
                    }}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-600 border-slate-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="https://example.com/sample.jpg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Official Link
                  </label>
                  <input
                    type="url"
                    value={doc.officialLink || ''}
                    onChange={(e) => {
                      const newDocs = [...formData.requiredDocuments];
                      newDocs[index].officialLink = e.target.value;
                      setFormData({ ...formData, requiredDocuments: newDocs });
                    }}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-600 border-slate-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="https://official-portal.gov.in/document"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Video Guide URL
                  </label>
                  <input
                    type="url"
                    value={doc.videoGuide || ''}
                    onChange={(e) => {
                      const newDocs = [...formData.requiredDocuments];
                      newDocs[index].videoGuide = e.target.value;
                      setFormData({ ...formData, requiredDocuments: newDocs });
                    }}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-600 border-slate-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => setFormData({
              ...formData,
              requiredDocuments: [...formData.requiredDocuments, {
                name: '',
                description: '',
                image: '',
                officialLink: '',
                videoGuide: '',
                importance: 'Medium',
              }]
            })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-slate-700 hover:bg-slate-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Another Document
          </button>
        </div>

        {/* Application Process */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Application Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-600">Online Application Steps</h3>
              {formData.applicationProcess.online.map((step, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">
                    {index + 1}
                  </div>
                  <textarea
                    required
                    value={step}
                    onChange={(e) => {
                      const newProcess = { ...formData.applicationProcess };
                      newProcess.online[index] = e.target.value;
                      setFormData({ ...formData, applicationProcess: newProcess });
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder={`Step ${index + 1}`}
                    rows={2}
                  />
                  {formData.applicationProcess.online.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newProcess = { ...formData.applicationProcess };
                        newProcess.online = newProcess.online.filter((_, i) => i !== index);
                        setFormData({ ...formData, applicationProcess: newProcess });
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg mt-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => {
                  const newProcess = { ...formData.applicationProcess };
                  newProcess.online.push('');
                  setFormData({ ...formData, applicationProcess: newProcess });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600">Offline Application Steps</h3>
              {formData.applicationProcess.offline.map((step, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold">
                    {index + 1}
                  </div>
                  <textarea
                    value={step}
                    onChange={(e) => {
                      const newProcess = { ...formData.applicationProcess };
                      newProcess.offline[index] = e.target.value;
                      setFormData({ ...formData, applicationProcess: newProcess });
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder={`Step ${index + 1}`}
                    rows={2}
                  />
                  {formData.applicationProcess.offline.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newProcess = { ...formData.applicationProcess };
                        newProcess.offline = newProcess.offline.filter((_, i) => i !== index);
                        setFormData({ ...formData, applicationProcess: newProcess });
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg mt-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => {
                  const newProcess = { ...formData.applicationProcess };
                  newProcess.offline.push('');
                  setFormData({ ...formData, applicationProcess: newProcess });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Frequently Asked Questions (FAQs)</h2>
          
          {formData.faqs.map((faq, index) => (
            <div key={index} className={`p-6 rounded-lg mb-6 ${
              isDark ? 'bg-slate-700' : 'bg-gray-50'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">FAQ #{index + 1}</h3>
                {formData.faqs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      faqs: formData.faqs.filter((_, i) => i !== index)
                    })}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Question *</label>
                  <input
                    type="text"
                    required
                    value={faq.question}
                    onChange={(e) => {
                      const newFaqs = [...formData.faqs];
                      newFaqs[index].question = e.target.value;
                      setFormData({ ...formData, faqs: newFaqs });
                    }}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-600 border-slate-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter question"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Answer *</label>
                  <textarea
                    required
                    value={faq.answer}
                    onChange={(e) => {
                      const newFaqs = [...formData.faqs];
                      newFaqs[index].answer = e.target.value;
                      setFormData({ ...formData, faqs: newFaqs });
                    }}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-600 border-slate-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter answer"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => setFormData({
              ...formData,
              faqs: [...formData.faqs, { question: '', answer: '' }]
            })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-slate-700 hover:bg-slate-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Another FAQ
          </button>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className={`px-6 py-3 rounded-lg font-medium ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Create Scheme
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}