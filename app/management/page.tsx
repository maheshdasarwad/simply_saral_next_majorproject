// app/management/page.tsx
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
  AlertCircle,
  Activity,
  Server,
  Database,
  HardDrive,
  Clock,
} from 'lucide-react';

interface Scheme {
  _id: string;
  title: string;
  shortName?: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  imageUrl?: string;
}

interface Stats {
  totalSchemes: number;
  activeSchemes: number;
  totalUsers: number;
  pendingApplications: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
  change?: number;
  isDark: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, change, isDark }) => {
  const colorStyles = {
    blue: {
      bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
      border: isDark ? 'border-blue-500/20' : 'border-blue-100',
      accent: isDark ? 'text-blue-400' : 'text-blue-600',
    },
    green: {
      bg: isDark ? 'bg-green-500/10' : 'bg-green-50',
      border: isDark ? 'border-green-500/20' : 'border-green-100',
      accent: isDark ? 'text-green-400' : 'text-green-600',
    },
    purple: {
      bg: isDark ? 'bg-purple-500/10' : 'bg-purple-50',
      border: isDark ? 'border-purple-500/20' : 'border-purple-100',
      accent: isDark ? 'text-purple-400' : 'text-purple-600',
    },
    orange: {
      bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50',
      border: isDark ? 'border-orange-500/20' : 'border-orange-100',
      accent: isDark ? 'text-orange-400' : 'text-orange-600',
    },
  };

  const styles = colorStyles[color];

  return (
    <div
      className={`relative overflow-hidden p-5 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
        isDark 
          ? 'bg-slate-800/80 border-slate-700/50 hover:border-slate-600' 
          : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            {title}
          </p>
          <h3 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {value.toLocaleString()}
          </h3>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className={`w-3 h-3 ${change >= 0 ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
              <span className={`text-xs font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${styles.bg} ${styles.border} border`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [stats, setStats] = useState<Stats>({
    totalSchemes: 0,
    activeSchemes: 0,
    totalUsers: 0,
    pendingApplications: 0,
  });
  const [recentSchemes, setRecentSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const isDark = theme === 'dark';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [schemesRes, statsRes] = await Promise.all([
        fetch('/api/schemes?limit=5'),
        fetch('/api/stats'),
      ]);

      const schemesData = await schemesRes.json();
      const statsData = await statsRes.json();

      setRecentSchemes(schemesData);
      setStats(statsData);
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
      Education: isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200',
      Farmers: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-50 text-green-700 border-green-200',
      Women: isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return styles[category] || (isDark ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-gray-100 text-gray-700 border-gray-200');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Admin Dashboard
            </h1>
            <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Manage schemes, users, and application statistics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
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
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              New Scheme
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <StatCard
            title="Total Schemes"
            value={stats.totalSchemes}
            icon={<FileText className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />}
            color="blue"
            change={12}
            isDark={isDark}
          />
          <StatCard
            title="Active Schemes"
            value={stats.activeSchemes}
            icon={<TrendingUp className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />}
            color="green"
            change={8}
            isDark={isDark}
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />}
            color="purple"
            change={24}
            isDark={isDark}
          />
          <StatCard
            title="Pending Applications"
            value={stats.pendingApplications}
            icon={<AlertCircle className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />}
            color="orange"
            change={-5}
            isDark={isDark}
          />
        </div>

        {/* Recent Schemes Table */}
        <div
          className={`rounded-xl border overflow-hidden mb-8 ${
            isDark ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white border-gray-100 shadow-sm'
          }`}
        >
          <div className={`px-6 py-4 border-b ${isDark ? 'border-slate-700/50' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Schemes
              </h2>
              <Link
                href="/management/schemes"
                className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                View All
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className={`w-8 h-8 animate-spin mx-auto mb-3 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
              <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>Loading schemes...</p>
            </div>
          ) : recentSchemes.length === 0 ? (
            <div className="p-12 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                <FileText className={`w-8 h-8 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
              </div>
              <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>No schemes found</p>
              <Link
                href="/management/schemes/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                <PlusCircle className="w-4 h-4" />
                Create First Scheme
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDark ? 'bg-slate-900/50' : 'bg-gray-50'}>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Scheme
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Category
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Status
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Created
                    </th>
                    <th className={`px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {recentSchemes.map((scheme) => (
                    <tr
                      key={scheme._id}
                      className={`transition-colors ${isDark ? 'hover:bg-slate-700/30' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {scheme.imageUrl ? (
                            <img
                              src={scheme.imageUrl}
                              alt={scheme.title}
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                              <FileText className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {scheme.title}
                            </p>
                            {scheme.shortName && (
                              <p className={`text-sm truncate ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                                {scheme.shortName}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryStyles(scheme.category)}`}>
                          {scheme.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            scheme.isActive
                              ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-700'
                              : isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-700'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${scheme.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                          {scheme.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        {new Date(scheme.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/schemes/${scheme._id}`}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/management/schemes/${scheme._id}`}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(scheme._id)}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-500'
                            }`}
                            title="Delete"
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
          )}
        </div>

        {/* Bottom Grid - Quick Actions, Activity, System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          
          {/* Quick Actions */}
          <div className={`rounded-xl border p-5 ${isDark ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white border-gray-100 shadow-sm'}`}>
            <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/management/schemes/new"
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  isDark ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                }`}
              >
                <span className="text-sm font-medium">Add New Scheme</span>
                <PlusCircle className="w-4 h-4" />
              </Link>
              <Link
                href="/management/categories"
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  isDark ? 'bg-green-500/10 hover:bg-green-500/20 text-green-400' : 'bg-green-50 hover:bg-green-100 text-green-700'
                }`}
              >
                <span className="text-sm font-medium">Manage Categories</span>
                <BarChart3 className="w-4 h-4" />
              </Link>
              <Link
                href="/management/users"
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  isDark ? 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400' : 'bg-purple-50 hover:bg-purple-100 text-purple-700'
                }`}
              >
                <span className="text-sm font-medium">User Management</span>
                <Users className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`rounded-xl border p-5 ${isDark ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white border-gray-100 shadow-sm'}`}>
            <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                { action: 'New scheme added', time: '2 hours ago', icon: PlusCircle, color: 'blue' },
                { action: 'User registration', time: '4 hours ago', icon: Users, color: 'green' },
                { action: 'Scheme updated', time: '1 day ago', icon: Edit, color: 'purple' },
                { action: 'Application approved', time: '2 days ago', icon: Activity, color: 'orange' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activity.color === 'blue' ? (isDark ? 'bg-blue-500/10' : 'bg-blue-50') :
                    activity.color === 'green' ? (isDark ? 'bg-green-500/10' : 'bg-green-50') :
                    activity.color === 'purple' ? (isDark ? 'bg-purple-500/10' : 'bg-purple-50') :
                    (isDark ? 'bg-orange-500/10' : 'bg-orange-50')
                  }`}>
                    <activity.icon className={`w-3.5 h-3.5 ${
                      activity.color === 'blue' ? (isDark ? 'text-blue-400' : 'text-blue-600') :
                      activity.color === 'green' ? (isDark ? 'text-green-400' : 'text-green-600') :
                      activity.color === 'purple' ? (isDark ? 'text-purple-400' : 'text-purple-600') :
                      (isDark ? 'text-orange-400' : 'text-orange-600')
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                      {activity.action}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className={`rounded-xl border p-5 ${isDark ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white border-gray-100 shadow-sm'}`}>
            <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              System Status
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Database', status: 'Online', icon: Database, statusColor: 'green' },
                { label: 'API Services', status: 'Active', icon: Server, statusColor: 'green' },
                { label: 'Storage', status: '78% used', icon: HardDrive, statusColor: 'blue' },
                { label: 'Uptime', status: '99.8%', icon: Clock, statusColor: 'purple' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <item.icon className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                      {item.label}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    item.statusColor === 'green' ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') :
                    item.statusColor === 'blue' ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700') :
                    (isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700')
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
