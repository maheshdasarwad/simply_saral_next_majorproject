// app/management/layout.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Home,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";

// Constants
const SIDEBAR_WIDTH_EXPANDED = 240; // w-60
const SIDEBAR_WIDTH_COLLAPSED = 80; // w-20
const MOBILE_BREAKPOINT = 1024;

interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";

  // Custom scrollbar styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: ${isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(59, 130, 246, 0.3)'};
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: ${isDark ? 'rgba(75, 85, 99, 0.7)' : 'rgba(59, 130, 246, 0.5)'};
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [isDark]);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    document.cookie =
      "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) setMobileMenuOpen(false);
  };

  const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/management" },
    { label: "All Schemes", icon: FileText, path: "/management/schemes" },
    { label: "Users", icon: Users, path: "/management/users" },
  ];

  const SidebarHeader = () => (
    <div className="relative w-full mb-6">
      <div className="flex flex-col items-center w-full pt-6">
        <img
          src="/Images/logo2.png"
          alt="Simply Saral Logo"
          className={`object-contain transition-all duration-300 ${
            sidebarOpen || isMobile ? "w-20 h-20" : "w-12 h-12"
          }`}
        />
        {(sidebarOpen || isMobile) && (
          <div
            className={`text-xl font-bold tracking-tight mt-3 ${
              isDark ? "text-white" : "text-blue-700"
            }`}
          >
            Simply <span className="text-amber-500">Saral</span>
          </div>
        )}
      </div>
      {!isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 border-2 border-blue-400 dark:border-blue-500 rounded-full w-8 h-8 flex items-center justify-center shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 hover:scale-110"
        >
          {sidebarOpen ? (
            <ChevronLeft className="text-blue-500 dark:text-blue-400 w-5 h-5" />
          ) : (
            <ChevronRight className="text-blue-500 dark:text-blue-400 w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );

  const NavigationItem = ({ item }: { item: MenuItem }) => {
    const isExpanded = sidebarOpen || isMobile;

    return (
      <li>
        <Link
          href={item.path}
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className={`w-full flex ${
            isExpanded
              ? "flex-row items-center gap-3 px-4"
              : "flex-col items-center gap-1 px-2"
          } py-3 rounded-lg transition-colors ${
            isDark
              ? "hover:bg-gray-800 text-gray-300 hover:text-white"
              : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
          }`}
          title={!isExpanded ? item.label : undefined}
        >
          <item.icon
            className={`flex-shrink-0 transition-all duration-300 ${
              isExpanded ? "w-5 h-5" : "w-6 h-6"
            }`}
          />
          {!isExpanded && (
            <span className="text-xs font-medium text-center leading-tight">
              {item.label}
            </span>
          )}
          {isExpanded && (
            <span className="text-sm font-medium tracking-wide">
              {item.label}
            </span>
          )}
        </Link>
      </li>
    );
  };

  const HomeLink = () => {
    const isExpanded = sidebarOpen || isMobile;

    return (
      <Link
        href="/"
        onClick={() => isMobile && setMobileMenuOpen(false)}
        className={`w-full flex ${
          isExpanded
            ? "flex-row items-center gap-3 px-4"
            : "flex-col items-center gap-1 px-2"
        } py-3 rounded-lg transition-colors ${
          isDark
            ? "hover:bg-gray-800 text-gray-300 hover:text-white"
            : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
        }`}
        title={!isExpanded ? "Home" : undefined}
      >
        <Home
          className={`flex-shrink-0 transition-all duration-300 ${
            isExpanded ? "w-5 h-5" : "w-6 h-6"
          }`}
        />
        {!isExpanded && (
          <span className="text-xs font-medium text-center leading-tight">
            Home
          </span>
        )}
        {isExpanded && (
          <span className="text-sm font-medium tracking-wide">Home</span>
        )}
      </Link>
    );
  };

  const FooterButton = ({
    icon: Icon,
    label,
    onClick,
    variant = "default",
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick: () => void;
    variant?: "default" | "danger";
  }) => {
    const isExpanded = sidebarOpen || isMobile;
    const variantClasses =
      variant === "danger"
        ? isDark
          ? "hover:bg-red-900/30 text-red-400 hover:text-red-300"
          : "hover:bg-red-50 text-red-600 hover:text-red-700"
        : isDark
        ? "hover:bg-gray-800 text-gray-300"
        : "hover:bg-gray-100 text-gray-700";

    return (
      <button
        onClick={onClick}
        className={`w-full flex ${
          isExpanded
            ? "flex-row items-center gap-3 px-4"
            : "flex-col items-center gap-1 px-2"
        } py-3 rounded-lg transition-colors ${variantClasses}`}
        title={!isExpanded ? label : undefined}
      >
        <Icon
          className={`flex-shrink-0 transition-all duration-300 ${
            isExpanded ? "w-5 h-5" : "w-6 h-6"
          }`}
        />
        {!isExpanded && (
          <span className="text-xs font-medium text-center leading-tight">
            {label}
          </span>
        )}
        {isExpanded && (
          <span className="text-sm font-medium tracking-wide">{label}</span>
        )}
      </button>
    );
  };

  const SidebarContent = () => (
    <>
      {/* Fixed Header Section with Logo */}
      <div className="flex-shrink-0">
        <SidebarHeader />
      </div>

      {/* Navigation Menu - Home, Dashboard, All Schemes, Users with equal spacing */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        <nav>
          <ul className="space-y-1 px-2">
            {/* Home Link */}
            <li className="mb-2">
              <HomeLink />
            </li>
            
            {/* Divider */}
            <div className={`h-px mx-4 my-2 ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`} />
            
            {/* Navigation Items - Dashboard, All Schemes, Users */}
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavigationItem item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Fixed Footer Section - Only Theme Toggle and Logout */}
      <div
        className={`flex-shrink-0 border-t ${
          isDark ? "border-gray-700" : "border-blue-400"
        } p-3 space-y-1`}
      >
        <FooterButton
          icon={isDark ? Sun : Moon}
          label={isDark ? "Light Mode" : "Dark Mode"}
          onClick={toggleTheme}
        />
        <FooterButton
          icon={LogOut}
          label="Logout"
          onClick={handleLogout}
          variant="danger"
        />
      </div>
    </>
  );

  return (
    <div
      className={`min-h-screen flex ${
        isDark ? "bg-slate-950" : "bg-gray-50"
      }`}
    >
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`fixed top-4 right-4 z-50 p-2.5 rounded-lg shadow-lg transition-colors duration-200 ${
            isDark
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside
          className={`fixed left-0 top-0 h-full z-50 flex flex-col transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-60" : "w-20"
          } ${
            isDark
              ? "bg-gray-900 text-gray-100 border-gray-800"
              : "bg-blue-100 text-gray-800 border-blue-400"
          } border-r shadow-md`}
        >
          <SidebarContent />
        </aside>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {/* Backdrop */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Sidebar Panel - slides from right */}
          <aside
            className={`fixed right-0 top-0 h-full w-72 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } ${
              isDark
                ? "bg-gray-900 text-gray-100 border-gray-800"
                : "bg-blue-100 text-gray-800 border-blue-400"
            } border-l shadow-2xl`}
          >
            {/* Close button for mobile */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={`absolute left-4 top-4 z-10 p-2 rounded-lg ${
                isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          !isMobile ? (sidebarOpen ? "ml-60" : "ml-20") : "ml-0"
        }`}
      >
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
          {/* Mobile header spacing */}
          {isMobile && <div className="h-16" />}

          {/* Content wrapper */}
          <div
            className={`rounded-xl ${
              isDark
                ? "bg-slate-900 border border-slate-800"
                : "bg-white border border-gray-200"
            } shadow-sm p-6 min-h-[calc(100vh-8rem)]`}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}