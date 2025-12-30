
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/app/context/ThemeContext';
import {
  FileText,
  Users,
  TrendingUp,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  PlusCircle,
  RefreshCw,
  Calendar,
  Layers,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface Scheme {
  _id: string;
  title: string;
  shortName?: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  imageUrl?: string;
  totalApplications?: number;
}

interface Stats {
  totalSchemes: number;
  totalUsers: number;
  schemesThisMonth: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green';
  change?: number;
  isDark: boolean;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, change, isDark, description }) => {
  const colorStyles = {
    blue: {
      bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
      border: isDark ? 'border-blue-500/20' : 'border-blue-100',
      accent: isDark ? 'text-blue-400' : 'text-blue-600',
      gradient: isDark ? 'from-blue-900/20 to-blue-500/5' : 'from-blue-50 to-white',
    },
    green: {
      bg: isDark ? 'bg-green-500/10' : 'bg-green-50',
      border: isDark ? 'border-green-500/20' : 'border-green-100',
      accent: isDark ? 'text-green-400' : 'text-green-600',
      gradient: isDark ? 'from-green-900/20 to-green-500/5' : 'from-green-50 to-white',
    },
  };

  const styles = colorStyles[color];

  return (
    <div
      className={`relative overflow-hidden p-6 rounded-2xl border bg-gradient-to-br ${styles.gradient} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isDark 
          ? 'border-slate-700/50' 
          : 'border-gray-100 shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            {title}
          </p>
          <h3 className={`text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {value.toLocaleString()}
          </h3>
          {description && (
            <p className={`text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
              {description}
            </p>
          )}
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp className={`w-4 h-4 ${change >= 0 ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
              <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${styles.bg} ${styles.border} border transform hover:scale-105 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [recentSchemes, setRecentSchemes] = useState<Scheme[]>([]);
  const isDark = theme === 'dark';

  ////////////////
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalSchemes,setTotalSchemes]=useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const res = await fetch("/management/api");
        const data = await res.json();
        setTotalUsers(data.totalUsers);
        setTotalSchemes(data.schemecount);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserCount();
  }, []);
  /////////////////

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [schemesRes, statsRes] = await Promise.all([
        fetch('/api/schemes?limit=6'),
        fetch('/api/stats'),
      ]);

      if (schemesRes.ok) {
        const schemesData = await schemesRes.json();
        setRecentSchemes(schemesData);
        setStats(prev => ({ ...prev, totalSchemes: schemesData.length }));
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(prev => ({ ...prev, ...statsData }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this scheme?')) {
      try {
        await fetch(`/api/schemes/${id}`, { method: 'DELETE' });
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting scheme:', error);
      }
    }
  };

  const getCategoryStyles = (category: string) => {
    const styles: Record<string, string> = {
      'Primary Education': isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200',
      'Secondary Education': isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-50 text-green-700 border-green-200',
      'Higher Education': isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-50 text-purple-700 border-purple-200',
      'Farmer\'s Welfare': isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-50 text-orange-700 border-orange-200',
      'Women\'s Welfare': isDark ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-pink-50 text-pink-700 border-pink-200',
      'Healthcare': isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200',
      'Employment': isDark ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Housing': isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-50 text-yellow-700 border-yellow-200',
    };
    return styles[category] || (isDark ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-gray-100 text-gray-700 border-gray-200');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Manage government schemes and platform analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
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

      {/* Stats Grid - Only 2 cards now */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Schemes"
          value={totalSchemes}
          icon={<FileText className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />}
          color="blue"
          change={12}
          isDark={isDark}
          description="Government schemes in platform"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<Users className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />}
          color="green"
          change={24}
          isDark={isDark}
          description="Registered beneficiaries"
        />
      </div>

      {/* Recent Schemes Section */}
      <div className={`rounded-2xl border overflow-hidden ${
        isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
      }`}>
        <div className={`px-6 py-4 border-b ${isDark ? 'border-slate-700/50' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Schemes
              </h2>
              <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Latest government schemes added to the platform
              </p>
            </div>
            <Link
              href="/management/schemes"
              className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              View All
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center">
              <RefreshCw className={`w-8 h-8 animate-spin ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
              <span className={`ml-3 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Loading schemes...</span>
            </div>
          </div>
        ) : recentSchemes.length === 0 ? (
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
              Get started by creating your first government scheme
            </p>
            <Link
              href="/management/schemes/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
            >
              <PlusCircle className="w-5 h-5" />
              Create First Scheme
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDark ? 'bg-slate-900/30' : 'bg-gray-50'}>
                    <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Scheme Details
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Category
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Created
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/20">
                  {recentSchemes.map((scheme) => (
                    <tr
                      key={scheme._id}
                      className={`group transition-all duration-300 ${
                        isDark 
                          ? 'hover:bg-slate-700/30' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isDark ? 'bg-slate-700' : 'bg-gray-100'
                          }`}>
                            {scheme.imageUrl ? (
                              <img
                                src={scheme.imageUrl}
                                alt={scheme.title}
                                className="w-full h-full rounded-lg object-cover"
                              />
                            ) : (
                              <FileText className={`w-6 h-6 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className={`font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {scheme.title}
                            </h3>
                            {scheme.shortName && (
                              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                                {scheme.shortName}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getCategoryStyles(scheme.category)}`}>
                          <BarChart3 className="w-3 h-3" />
                          {scheme.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${scheme.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className={`text-sm font-medium ${
                            scheme.isActive 
                              ? isDark ? 'text-green-400' : 'text-green-600'
                              : isDark ? 'text-red-400' : 'text-red-600'
                          }`}>
                            {scheme.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className={`px-6 py-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(scheme.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/schemes/${scheme._id}`}
                            className={`p-2.5 rounded-lg transition-all hover:scale-110 ${
                              isDark 
                                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                            title="View Scheme"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </Link>
                          <Link
                            href={`/management/schemes/${scheme._id}`}
                            className={`p-2.5 rounded-lg transition-all hover:scale-110 ${
                              isDark 
                                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                            title="Edit Scheme"
                          >
                            <Edit className="w-4.5 h-4.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(scheme._id)}
                            className={`p-2.5 rounded-lg transition-all hover:scale-110 ${
                              isDark 
                                ? 'hover:bg-red-500/20 text-red-400 hover:text-red-300' 
                                : 'hover:bg-red-50 text-red-500 hover:text-red-700'
                            }`}
                            title="Delete Scheme"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Summary Footer */}
            <div className={`px-6 py-4 border-t ${
              isDark ? 'border-slate-700/50 bg-slate-900/30' : 'border-gray-100 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className={isDark ? 'text-slate-400' : 'text-gray-500'}>
                      {recentSchemes.filter(s => s.isActive).length} Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className={isDark ? 'text-slate-400' : 'text-gray-500'}>
                      {recentSchemes.filter(s => !s.isActive).length} Inactive
                    </span>
                  </div>
                </div>
                <div className={isDark ? 'text-slate-400' : 'text-gray-500'}>
                  Showing {recentSchemes.length} of {totalSchemes} schemes
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Section */}
      <div className={`rounded-2xl border p-6 ${
        isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-100 shadow-lg'
      }`}>
        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Platform Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Schemes This Month</span>
              <span className="font-semibold text-lg">{}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Active Schemes</span>
              <span className="font-semibold text-lg text-green-500">
                {recentSchemes.filter(s => s.isActive).length}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Total Categories</span>
              <span className="font-semibold text-lg">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Last Updated</span>
              <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>
                {new Date().toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}