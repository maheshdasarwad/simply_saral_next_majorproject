// app/management/schemes/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';
import {
  Search,
  Filter,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
} from 'lucide-react';

interface Scheme {
  _id: string;
  title: string;
  shortName:String,
  detailedPage: string;
  category:string,
  keyInfo:{
    duration:string,
    amount:string,
    applyFrom:string | null,
    lastDate:string | null,
  }
}

const categories = [
  { label: "All", value: "All" },
  { label: "Higher Education", value: "higher_education" },
  { label: "Farmers Welfare", value: "farmer_schemes" },
  { label: "Women Welfare", value: "women_welfare" },
  { label: "Secondary Education", value: "secondary_education" },
];

export default function SchemesListPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [schemeToDelete, setSchemeToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const isDark = theme === 'dark';
  const itemsPerPage = 10;

  const [schemes, setSchemes] = useState<Scheme[]>([
    {
      _id: '',
      title: '',
      shortName:'',
      detailedPage:'',
      category:'',
      keyInfo:{
        duration:"",
        amount:"",
        applyFrom:"",
        lastDate:""
      }
    },
   
  ]);


  useEffect(() => {
  const getData = async () => {
      const response = await fetch("/management/schemes/api");
      const data = await response.json();
      setSchemes(data);
    }
      getData(); 
}, []);


 useEffect(() => {
    fetchSchemes();
  }, [currentPage, selectedCategory, selectedStatus, searchQuery]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      // Filter locally for demo
      await new Promise(resolve => setTimeout(resolve, 300));
      setTotalPages(Math.ceil(filteredSchemes.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!schemeToDelete) return;
    
    try {
      setDeleteLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSchemes(prev => prev.filter(scheme => scheme._id !== schemeToDelete));
      setShowDeleteModal(false);
      setSchemeToDelete(null);
      
    } catch (error) {
      console.error('Error deleting scheme:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getCategoryStyles = (category: string) => {
    const styles: Record<string, string> = {
      'Education': isDark 
        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
        : 'bg-blue-50 text-blue-700 border-blue-200',
      'Farmers': isDark 
        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
        : 'bg-green-50 text-green-700 border-green-200',
      'Women': isDark 
        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
        : 'bg-purple-50 text-purple-700 border-purple-200',
      'Youth': isDark 
        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' 
        : 'bg-orange-50 text-orange-700 border-orange-200',
      'Senior Citizens': isDark 
        ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' 
        : 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Healthcare': isDark 
        ? 'bg-red-500/20 text-red-400 border-red-500/30' 
        : 'bg-red-50 text-red-700 border-red-200',
    };
    return styles[category] || (isDark 
      ? 'bg-slate-700 text-slate-300 border-slate-600' 
      : 'bg-gray-100 text-gray-700 border-gray-200');
  };


 const formatDate = (value?: string | null): string => {
  if (!value) return "-";

  // Try parsing as date
  const parsed = new Date(value);

  // If valid date → format it
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // Otherwise → return raw text (e.g. "As per bank")
  return value;
};

 // Filter schemes based on search, category, and status
const filteredSchemes = schemes.filter((scheme) => {
  const matchesSearch =
    searchQuery === "" ||
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.shortName.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" || scheme.detailedPage === selectedCategory;

  return matchesSearch && matchesCategory;
});



  // Paginate filtered schemes
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSchemes = filteredSchemes.slice(startIndex, startIndex + itemsPerPage);
  const totalFilteredPages = Math.max(1, Math.ceil(filteredSchemes.length / itemsPerPage));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Manage Schemes
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Create, edit, and manage all government schemes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSchemes}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/management/schemes/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5" />
            New Scheme
          </Link>
        </div>
      </div>

      {/* Filters Card */}
      <div
        className={`rounded-2xl border p-6 ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              Search Schemes
            </label>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-slate-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search by title or short name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 hover:border-slate-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                }`}
              />
            </div>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              Category
            </label>
            <div className="relative">

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white hover:border-slate-500'
                    : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
                }`}
              >
                 {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
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
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            {filteredSchemes.length} schemes found • Total {schemes.length} schemes
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all hover:scale-105 ${
                isDark
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Clear Filters
            </button>
            <button
              onClick={fetchSchemes}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Schemes Table Card */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
        }`}
      >
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center">
              <RefreshCw className={`w-8 h-8 animate-spin ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
              <span className={`ml-3 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Loading schemes...</span>
            </div>
          </div>
        ) : paginatedSchemes.length === 0 ? (
          <div className="p-12 text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isDark ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <FileText className={`w-10 h-10 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No schemes found
            </h3>
            <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Try adjusting your filters or create a new scheme
            </p>
            <Link
              href="/management/schemes/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
            >
              <PlusCircle className="w-5 h-5" />
              Create New Scheme
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDark ? 'bg-slate-900/30' : 'bg-gray-50'}>
                    <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Scheme Name
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Category
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Start Date
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      End Date
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/20">
                  {paginatedSchemes.map((scheme) => (
                    <tr
                      key={scheme._id}
                      className={`group transition-all duration-200 ${
                        isDark 
                          ? 'hover:bg-slate-700/20' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <h3 className={`font-semibold text-base group-hover:text-blue-500 transition-colors ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {scheme.title}
                          </h3>
                          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                            {scheme.shortName}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryStyles(scheme.category)}`}>
                          {scheme.category}
                        </span>
                      </td>
              
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                          {formatDate(scheme.keyInfo.applyFrom)}
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                          {formatDate(scheme.keyInfo.lastDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/schemes/${scheme.detailedPage}/${scheme._id}`}
                            className={`p-2 rounded-lg transition-all hover:scale-110 ${
                              isDark 
                                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                            title="View Scheme"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/management/schemes/${scheme._id}`}
                            className={`p-2 rounded-lg transition-all hover:scale-110 ${
                              isDark 
                                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                            title="Edit Scheme"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              setSchemeToDelete(scheme._id);
                              setShowDeleteModal(true);
                            }}
                            className={`p-2 rounded-lg transition-all hover:scale-110 ${
                              isDark 
                                ? 'hover:bg-red-500/20 text-red-400 hover:text-red-300' 
                                : 'hover:bg-red-50 text-red-500 hover:text-red-700'
                            }`}
                            title="Delete Scheme"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className={`px-6 py-4 border-t ${
              isDark ? 'border-slate-700/50 bg-slate-900/30' : 'border-gray-100 bg-gray-50'
            }`}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  Page {currentPage} of {totalFilteredPages} • Showing {paginatedSchemes.length} of {filteredSchemes.length} schemes
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDark 
                        ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalFilteredPages) }, (_, i) => {
                    let pageNum;
                    if (totalFilteredPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalFilteredPages - 2) {
                      pageNum = totalFilteredPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 text-sm rounded-lg font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                            : isDark
                            ? 'hover:bg-slate-700 text-slate-400'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalFilteredPages, p + 1))}
                    disabled={currentPage === totalFilteredPages}
                    className={`p-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDark 
                        ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl transform transition-all ${
              isDark ? 'bg-slate-800 border-slate-700/50' : 'bg-white border-gray-100'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-red-500/20' : 'bg-red-100'
              }`}>
                <AlertCircle className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Delete Scheme
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  This action cannot be undone
                </p>
              </div>
            </div>
            
            <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              Are you sure you want to delete this scheme? All associated data will be permanently removed.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSchemeToDelete(null);
                }}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-medium hover:from-red-700 hover:to-pink-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {deleteLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deleting...
                  </div>
                ) : (
                  'Delete Scheme'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}