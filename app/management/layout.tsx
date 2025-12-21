// admin layout(protected)
// app/management/layout.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Edit,
  Trash2,
  BarChart3,
  Shield,
  Home,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

function AdminContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme(); // Now this will work
  const router = useRouter();
  const isDark = theme === 'dark';

  // ... rest of your AdminLayout component code
  // Use this component instead of the original layout
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const handleLogout = () => {
    // Clear admin token
    document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/management',
    },
    {
      title: 'All Schemes',
      icon: <FileText className="w-5 h-5" />,
      path: '/management/schemes',
    },
    {
      title: 'Create New Scheme',
      icon: <PlusCircle className="w-5 h-5" />,
      path: '/management/schemes/new',
    },
    {
      title: 'Categories',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/management/categories',
    },
    {
      title: 'Users',
      icon: <Users className="w-5 h-5" />,
      path: '/management/users',
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/management/settings',
    },
  ];

  return (
    
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-slate-950' : 'bg-gray-50'
      }`}
    >
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg ${
          isDark
            ? 'bg-slate-800 text-white hover:bg-slate-700'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        } shadow-lg`}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar for desktop */}
      <aside
        className={`hidden lg:block fixed left-0 top-0 h-full transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
        } border-r shadow-xl z-40`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Shield className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-gray-400">Simply Saral</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                sidebarOpen ? 'justify-start' : 'justify-center'
              } ${
                isDark
                  ? 'hover:bg-slate-800 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title={!sidebarOpen ? item.title : ''}
            >
              {item.icon}
              {sidebarOpen && <span className="font-medium">{item.title}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              isDark
                ? 'hover:bg-slate-800 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <ChevronRight
              className={`w-5 h-5 transition-transform ${
                sidebarOpen ? 'rotate-180' : ''
              }`}
            />
            {sidebarOpen && <span>Collapse</span>}
          </button>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-3 rounded-lg mt-2 ${
              isDark
                ? 'hover:bg-red-900/30 text-red-400'
                : 'hover:bg-red-50 text-red-600'
            }`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-40 ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}
        >
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <Shield className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-gray-400">Simply Saral</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isDark
                    ? 'hover:bg-slate-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                isDark
                  ? 'hover:bg-red-900/30 text-red-400'
                  : 'hover:bg-red-50 text-red-600'
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main
        className={`lg:ml-${sidebarOpen ? '64' : '20'} transition-all duration-300 p-4 lg:p-6`}
      >
        <div
          className={`rounded-xl p-4 lg:p-6 shadow-lg ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}
        >
          {children}
        </div>
      </main>
    </div>
    
  );
}