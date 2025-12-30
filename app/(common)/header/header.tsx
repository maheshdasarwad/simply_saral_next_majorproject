'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';
import {
  UserButton,
  SignedIn,
  SignedOut,
  useClerk,
} from "@clerk/nextjs";

import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Header() {
  const { openSignIn } = useClerk();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      {/* Add global theme variables (from your old HomePage) */}
      <style jsx global>{`
        body {
          --bg-primary: #ffffff;
          --bg-secondary: #0f172A;
          --bg-tertiary: #1e40af;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-tertiary: #6b7280;
          --border-color: #e5e7eb;
          --shadow: rgba(0, 0, 0, 0.1);
          --card-bg: #ffffff;
          --header-bg: rgba(255, 255, 255, 0.95);
          transition: background-color 0.3s, color 0.3s;
        }
        body.dark {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-tertiary: #2563eb;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
          --text-tertiary: #94a3b8;
          --border-color: #334155;
          --shadow: rgba(0, 0, 0, 0.3);
          --card-bg: #1e293b;
          --header-bg: rgba(15, 23, 42, 0.95);
        }
        /* Example: use background and text classes elsewhere */
        .bg-primary { background-color: var(--bg-primary); }
        .bg-secondary { background-color: var(--bg-secondary); }
        .bg-card { background-color: var(--card-bg); }
        .text-primary { color: var(--text-primary); }
        .text-secondary { color: var(--text-secondary); }
        .text-tertiary { color: var(--text-tertiary); }
        .border-custom { border-color: var(--border-color); }
      `}</style>

      {/* Your header JSX, using color variables */}
      <header
        className="sticky top-0 z-50 shadow-md backdrop-blur-sm transition-all duration-300"
        style={{
          backgroundColor: theme === 'dark' ? '#0F172A' : '#ffffff',
          borderBottom: `1px solid ${theme === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'transparent'}`
        }}
      >
        <div className="max-w-7xl mx-auto px-1">
          <nav className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <img
                src="/Images/logo2.png"
                alt="Simply Saral Logo"
                className="mr-2 h-10 w-16"
                style={{ borderRadius: "0%" }}
              />
              <div
                className="text-3xl font-bold"
                style={{ color: theme === 'dark' ? '#60a5fa' : '#1d4ed8' }}
              >
                Simply <span className="text-amber-500">Saral</span>
              </div>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/"
                className="px-6 py-2 text-white rounded-full font-semibold transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                style={{ backgroundColor: theme === 'dark' ? '#2563eb' : '#1d4ed8' }}
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>

             <Link
                href="/management"
                className="px-6 py-2 text-white rounded-full font-semibold transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                style={{ backgroundColor: theme === 'dark' ? '#2563eb' : '#1d4ed8' }}
              >
                <span className="relative z-10">Management</span>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>

               {/* Auth Section */}
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "w-9 h-9 rounded-full ring-2 ring-blue-500",
                    userButtonTrigger:
                      "transition-transform duration-300 hover:-translate-y-0.5",
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <button
                onClick={() => openSignIn()}
                className="px-6 py-2 text-white rounded-full font-semibold transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                style={{ backgroundColor: theme === "dark" ? "#2563eb" : "#1d4ed8" }}
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </button>
            </SignedOut>


              <button
                onClick={toggleTheme}
                className="ml-4 w-9 h-9 rounded-full border-2 flex items-center justify-center transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                style={{
                  borderColor: theme === 'dark' ? 'rgba(96, 165, 250, 0.4)' : '#d1d5db',
                  backgroundColor: theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
                  boxShadow: theme === 'dark' ? '0 4px 6px rgba(96, 165, 250, 0.2)' : 'none'
                }}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" style={{ color: '#374151' }} />
                ) : (
                  <Sun className="w-5 h-5" style={{ color: '#93c5fd' }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 flex flex-col gap-4">
              
              {/* Mobile Auth */}
                <SignedIn>
                  <div className="flex justify-center py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>

                <SignedOut>
                  <button
                    onClick={() => openSignIn()}
                    className="px-6 py-2 bg-blue-700 text-white rounded-full font-semibold text-center"
                  >
                    Sign In
                  </button>
                </SignedOut>

              
              <Link
                href="/management"
                className="px-6 py-2 bg-blue-700 text-white rounded-full font-semibold text-center"
              >
                Management
              </Link>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 mx-auto rounded-full border-2 border-gray-300 flex items-center justify-center"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
