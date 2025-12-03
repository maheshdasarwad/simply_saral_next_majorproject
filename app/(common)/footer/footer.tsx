'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPinned,
  Phone,
  Mail,
  ChevronRight,
} from 'lucide-react';

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full flex items-center justify-center transform hover:-translate-y-1 transition-all duration-300"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-300"
        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
      >
        <ChevronRight className="w-3 h-3" />
        {text}
      </Link>
    </li>
  );
}

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className="text-white py-12"
      style={{ backgroundColor: theme === 'dark' ? '#020617' : '#172554' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-orange-500 after:rounded-full">
              About Simply Saral
            </h3>
            <p className="text-white/80 mb-6">
              Simply Saral is dedicated to making government services accessible to all citizens through a user-friendly digital platform that simplifies complex processes.
            </p>
            <div className="flex gap-3">
              <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Youtube className="w-4 h-4" />} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-orange-500 after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/" text="Home" />
              <FooterLink href="#services" text="Services" />
              <FooterLink href="/#features" text="Why Us" />
              <FooterLink href="#contact" text="Contact" />
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-orange-500 after:rounded-full">
              Services
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/schemes/secondary_education" text="Secondary Education" />
              <FooterLink href="/schemes/higher_education" text="Higher Education" />
              <FooterLink href="/schemes/farmer_schemes" text="Farmer Programs" />
              <FooterLink href="/schemes/women_welfare" text="Women's Welfare" />
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-orange-500 after:rounded-full">
              Contact Us
            </h3>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start gap-3">
                <MapPinned className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>DYPCOE Akurdi, Pune</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>support@simplysaral.com.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2025 Simply Saral. All rights reserved. Designed to empower Indian citizens.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}