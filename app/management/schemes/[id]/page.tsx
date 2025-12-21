// Edit Scheme
// app/management/schemes/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

// Same form as CreateSchemePage but with data fetching and update logic
// This would be very similar to CreateSchemePage but with:
// 1. Fetch scheme data by ID on mount
// 2. Update instead of create on submit
// 3. Loading states for fetching

// Since it's very similar, I'll just show the key differences:

export default function EditSchemePage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchScheme();
  }, [id]);

  const fetchScheme = async () => {
    try {
      const response = await fetch(`/api/schemes/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching scheme:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch(`/api/schemes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        router.push('/management/schemes');
      }
    } catch (error) {
      console.error('Error updating scheme:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // ... rest of the form is identical to CreateSchemePage
  // just replace handleSubmit and initial loading state
}