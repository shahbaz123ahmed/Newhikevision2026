"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Mail,
  Box,
  Search,
  Phone,
  Building2,
  Clock,
  Eye,
  Edit3,
  Trash2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Plus,
  X,
  ArrowUpRight,
  ChevronRight,
  Check,
  Copy,
  Lock,
  User,
  LogOut,
  Database,
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import { InquiryItem } from '@/lib/inquiriesStore';

type CategoryFilter = 'all' | 'contact' | 'product_enquiry';
type StatusFilter = 'all' | 'new' | 'contacted' | 'in_progress' | 'closed';

export default function AdminDashboardPage() {
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginUsername, setLoginUsername] = useState('hikvisionuae.ae@gmail.com');
  const [loginPassword, setLoginPassword] = useState('Hikvision-uae.ae@123');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Inquiries states
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [editingInquiry, setEditingInquiry] = useState<InquiryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Real-time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check Auth on Mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/me');
        if (res.ok) {
          setIsAuthenticated(true);
          fetchInquiries();
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    };
    checkAuth();
  }, []);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchInquiries();
      } else {
        setLoginError(data.error || 'Invalid credentials. Please check username and password.');
      }
    } catch {
      setLoginError('Failed to communicate with authentication server.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch inquiries from API
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/inquiries');
      if (!res.ok) throw new Error('Failed to load inquiries');
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      } else {
        throw new Error(data.error || 'Invalid response format');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Counts
  const counts = useMemo(() => {
    return {
      all: inquiries.length,
      contacts: inquiries.filter((i) => i.type === 'contact').length,
      productEnquiries: inquiries.filter((i) => i.type === 'product_enquiry').length,
      new: inquiries.filter((i) => i.status === 'new').length,
      contacted: inquiries.filter((i) => i.status === 'contacted').length,
      in_progress: inquiries.filter((i) => i.status === 'in_progress').length,
      closed: inquiries.filter((i) => i.status === 'closed').length
    };
  }, [inquiries]);

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      // Category filter
      if (category === 'contact' && item.type !== 'contact') return false;
      if (category === 'product_enquiry' && item.type !== 'product_enquiry') return false;

      // Status filter
      if (status !== 'all' && item.status !== status) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name?.toLowerCase().includes(q);
        const matchesEmail = item.email?.toLowerCase().includes(q);
        const matchesPhone = item.phone?.toLowerCase().includes(q);
        const matchesCompany = item.company?.toLowerCase().includes(q);
        const matchesReq = item.requirement?.toLowerCase().includes(q);
        const matchesProduct = item.productName?.toLowerCase().includes(q);
        const matchesMsg = item.message?.toLowerCase().includes(q);

        return (
          matchesName ||
          matchesEmail ||
          matchesPhone ||
          matchesCompany ||
          matchesReq ||
          matchesProduct ||
          matchesMsg
        );
      }

      return true;
    });
  }, [inquiries, category, status, searchQuery]);

  // Quick Status Change
  const handleQuickStatusChange = async (id: string, newStatus: InquiryItem['status']) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Save Edit Modal
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInquiry) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingInquiry.id,
          status: editingInquiry.status,
          notes: editingInquiry.notes,
          company: editingInquiry.company,
          requirement: editingInquiry.requirement
        })
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries((prev) =>
          prev.map((item) => (item.id === editingInquiry.id ? data.inquiry : item))
        );
        setEditingInquiry(null);
      }
    } catch (err) {
      console.error('Save edit error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Item
  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries?id=${deletingId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== deletingId));
        if (selectedInquiry?.id === deletingId) setSelectedInquiry(null);
        setDeletingId(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Create Test Inquiry
  const handleCreateTest = async (type: 'contact' | 'product_enquiry') => {
    setActionLoading(true);
    try {
      const testItem =
        type === 'contact'
          ? {
              type: 'contact',
              name: 'Mohammed Al-Falasi',
              email: 'm.falasi@alqudra-group.ae',
              phone: '+971 50 123 4567',
              company: 'Al Qudra Holdings LLC',
              subject: 'Corporate CCTV Upgrade',
              requirement: 'Corporate CCTV & Access Control Upgrade',
              message:
                'We require a turnkey proposal for replacing 80 legacy analog cameras with Hikvision 4MP DeepinView and AcuSense cameras across our headquarters in Dubai Marina.',
              status: 'new',
              notes: 'Generated test inquiry'
            }
          : {
              type: 'product_enquiry',
              name: 'Dr. Rashid Al-Nuaimi',
              email: 'r.nuaimi@emirateshealth.ae',
              phone: '+971 55 987 6543',
              company: 'Emirates Healthcare Network',
              subject: 'DS-2SF7C442MXG2/LM-EL(W)(Y)/26 Quotation',
              requirement: 'DeepinViewX TandemVu 7C 4MP 42X Speed Dome',
              productName: 'DS-2SF7C442MXG2/LM-EL(W)(Y)/26',
              productSlug: 'ds-2sf7c442mxg2-lm-el-w-y-26',
              productImage: '/vidcom/ptz3.webp',
              productPath: '/products/network-products/ptz-cameras/ptz-ultra-series/ds-2sf7c442mxg2-lm-el-w-y-26',
              message:
                'Please share official pricing and delivery lead-time for 6 units of the TandemVu 42X camera for hospital perimeter installation.',
              status: 'new',
              notes: 'Generated product quote request'
            };

      const res = await fetch('/api/admin/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testItem)
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries((prev) => [data.inquiry, ...prev]);
        setShowNewModal(false);
      }
    } catch (err) {
      console.error('Create test error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Copy info helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return iso;
    }
  };

  // Loading Screen
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#E8272A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Connecting to Portal...
          </p>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // LOGIN SCREEN (Hikvision UAE Website Theme)
  // ══════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-[32px] p-8 sm:p-10 shadow-xl border border-slate-200/80 space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center">
              <span className="h-10 px-4 bg-[#E8272A] text-white font-black text-sm uppercase tracking-widest rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                HIKVISION
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage customer inquiries, RFQs, and product quote requests.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Username / Email
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="hikvisionuae.ae@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8272A]/20 focus:border-[#E8272A] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8272A]/20 focus:border-[#E8272A] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-[#E8272A] hover:bg-[#c91d20] active:scale-[0.99] text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-slate-700 flex items-center gap-1">
              ← Return to Website
            </Link>
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <Database size={13} />
              <span>MongoDB Atlas</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // AUTHENTICATED DASHBOARD (Hikvision Website Theme)
  // ══════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#F8FAFB] text-slate-900 font-sans pb-16">
      {/* Top Admin Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="h-8 px-3 bg-[#E8272A] text-white font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center shadow-md shadow-red-500/20">
                HIKVISION
              </span>
              <div className="border-l border-slate-200 pl-3">
                <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none">
                  Admin Dashboard
                </h1>
                <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                  Inquiries & Lead Management
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-emerald-700 text-[11px] font-semibold">
              <Database size={12} className="text-emerald-600" />
              <span>MongoDB Atlas Connected</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-medium font-mono">
              <Clock size={13} className="text-slate-400" />
              {currentTime || 'Syncing...'}
            </div>

            <button
              onClick={() => setShowNewModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8272A] hover:bg-[#c91d20] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add Test Inquiry</span>
            </button>

            <button
              onClick={fetchInquiries}
              disabled={loading}
              title="Refresh Inquiries"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin text-[#E8272A]' : ''} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#E8272A] hover:bg-red-50 rounded-xl border border-slate-200 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-colors"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ══════════════════════════════════════════════
              LEFT SIDEBAR (Categories & Status Filter)
             ══════════════════════════════════════════════ */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-6">
            {/* Categories Card */}
            <div className="bg-white rounded-[26px] p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-4 px-1">
                CATEGORIES
              </h2>

              <div className="space-y-2">
                {/* All Inquiries */}
                <button
                  onClick={() => setCategory('all')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    category === 'all'
                      ? 'bg-[#E8272A] text-white shadow-lg shadow-red-500/25'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Inbox size={18} />
                    <span>All Inquiries</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      category === 'all'
                        ? 'bg-white text-[#E8272A]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {counts.all}
                  </span>
                </button>

                {/* Contacts */}
                <button
                  onClick={() => setCategory('contact')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    category === 'contact'
                      ? 'bg-[#E8272A] text-white shadow-lg shadow-red-500/25'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span>Contacts</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      category === 'contact'
                        ? 'bg-white text-[#E8272A]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {counts.contacts}
                  </span>
                </button>

                {/* Product Enquiries */}
                <button
                  onClick={() => setCategory('product_enquiry')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    category === 'product_enquiry'
                      ? 'bg-[#E8272A] text-white shadow-lg shadow-red-500/25'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Box size={18} />
                    <span>Product Enquiries</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      category === 'product_enquiry'
                        ? 'bg-white text-[#E8272A]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {counts.productEnquiries}
                  </span>
                </button>
              </div>
            </div>

            {/* Filter By Status Card */}
            <div className="bg-white rounded-[26px] p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-4 px-1">
                FILTER BY STATUS
              </h2>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setStatus('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    status === 'all'
                      ? 'bg-[#E8272A] text-white shadow-md shadow-red-500/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Status
                </button>

                <button
                  onClick={() => setStatus('new')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    status === 'new'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${status === 'new' ? 'bg-white' : 'bg-emerald-500'}`} />
                  New ({counts.new})
                </button>

                <button
                  onClick={() => setStatus('contacted')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    status === 'contacted'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${status === 'contacted' ? 'bg-white' : 'bg-slate-500'}`} />
                  Contacted ({counts.contacted})
                </button>

                <button
                  onClick={() => setStatus('in_progress')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    status === 'in_progress'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${status === 'in_progress' ? 'bg-white' : 'bg-amber-500'}`} />
                  In Progress ({counts.in_progress})
                </button>

                <button
                  onClick={() => setStatus('closed')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    status === 'closed'
                      ? 'bg-slate-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${status === 'closed' ? 'bg-white' : 'bg-slate-400'}`} />
                  Closed ({counts.closed})
                </button>
              </div>
            </div>

            {/* Quick Database Status Info */}
            <div className="bg-white rounded-[26px] p-5 border border-slate-200/80 text-xs text-slate-500 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Database size={14} className="text-[#E8272A]" />
                <span>MongoDB Cloud Sync</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-slate-500">
                All client requests, contact inquiries, and product RFQs are synced to your MongoDB Atlas cluster in real time.
              </p>
            </div>
          </aside>

          {/* ══════════════════════════════════════════════
              RIGHT MAIN AREA (Inquiries Feed)
             ══════════════════════════════════════════════ */}
          <main className="flex-1 w-full space-y-6">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {category === 'all' && 'All Inquiries'}
                {category === 'contact' && 'Contacts'}
                {category === 'product_enquiry' && 'Product Enquiries'}
              </h2>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 sm:w-64 md:w-80">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client or product..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8272A]/20 focus:border-[#E8272A] transition-all shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Showing Badge */}
                <div className="px-3.5 py-2 bg-red-50 border border-red-200/70 rounded-full text-[#E8272A] font-bold text-xs whitespace-nowrap shadow-sm">
                  Showing: <span className="text-slate-900">{filteredInquiries.length}</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-red-700 text-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
                <button
                  onClick={fetchInquiries}
                  className="px-3 py-1 bg-[#E8272A] text-white rounded-lg text-xs font-bold hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[26px] p-6 border border-slate-200 animate-pulse flex flex-col md:flex-row gap-6 justify-between"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                      <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                      <div className="h-4 bg-slate-100 rounded w-2/5"></div>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                      <div className="h-16 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredInquiries.length === 0 && (
              <div className="bg-white rounded-[26px] p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-16 h-16 bg-red-50 text-[#E8272A] rounded-full flex items-center justify-center mx-auto">
                  <Inbox size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">No Inquiries Found</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
                    {searchQuery
                      ? `No inquiries match the search "${searchQuery}". Try a different keyword.`
                      : 'There are no inquiries under this selected category or status filter.'}
                  </p>
                </div>
                {(searchQuery || status !== 'all' || category !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setStatus('all');
                      setCategory('all');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}

            {/* Inquiries List Cards */}
            {!loading && filteredInquiries.length > 0 && (
              <div className="space-y-4">
                {filteredInquiries.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-[26px] p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-red-200/80 transition-all"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left Column: Client Info */}
                      <div className="md:col-span-5 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-black text-sm flex-shrink-0">
                            {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-0.5">
                              <Clock size={12} />
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Contact details */}
                        <div className="space-y-1 text-xs text-slate-600 pt-1">
                          <div className="flex items-center gap-2">
                            <Mail size={13} className="text-slate-400 flex-shrink-0" />
                            <a
                              href={`mailto:${item.email}`}
                              className="hover:text-[#E8272A] transition-colors font-medium break-all"
                            >
                              {item.email}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone size={13} className="text-slate-400 flex-shrink-0" />
                            <a
                              href={`tel:${item.phone}`}
                              className="hover:text-[#E8272A] transition-colors font-medium"
                            >
                              {item.phone}
                            </a>
                          </div>

                          {item.company && (
                            <div className="flex items-center gap-2">
                              <Building2 size={13} className="text-slate-400 flex-shrink-0" />
                              <span className="font-medium text-slate-800">{item.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div className="pt-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              item.status === 'contacted'
                                ? 'bg-slate-100 text-slate-700 border border-slate-200'
                                : item.status === 'in_progress'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : item.status === 'closed'
                                ? 'bg-slate-100 text-slate-500 border border-slate-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.status === 'contacted'
                                  ? 'bg-slate-500'
                                  : item.status === 'in_progress'
                                  ? 'bg-amber-500'
                                  : item.status === 'closed'
                                  ? 'bg-slate-400'
                                  : 'bg-emerald-500'
                              }`}
                            />
                            {item.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      {/* Right Column: Requirement, Message, & Action Buttons */}
                      <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-xs font-black text-slate-900 uppercase tracking-wide">
                              REQUIREMENT:{' '}
                              <span className="text-[#E8272A] font-bold">
                                {item.requirement || item.subject || 'General Inquiry'}
                              </span>
                            </div>

                            <span
                              className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1 ${
                                item.type === 'product_enquiry'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : 'bg-red-50 text-[#E8272A] border border-red-200'
                              }`}
                            >
                              {item.type === 'product_enquiry' ? (
                                <>
                                  <Box size={11} />
                                  <span>PRODUCT</span>
                                </>
                              ) : (
                                <>
                                  <Mail size={11} />
                                  <span>CONTACT</span>
                                </>
                              )}
                            </span>
                          </div>

                          {/* Message Box */}
                          <div className="mt-3 bg-slate-50 rounded-2xl p-4 text-xs md:text-sm text-slate-700 leading-relaxed border border-slate-200/80">
                            {item.productName && (
                              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200 font-semibold text-xs text-slate-900">
                                {item.productImage && (
                                  <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="w-8 h-8 object-contain rounded bg-white p-0.5 border border-slate-200"
                                  />
                                )}
                                <span>Product: {item.productName}</span>
                                {item.productPath && (
                                  <Link
                                    href={item.productPath}
                                    target="_blank"
                                    className="text-[#E8272A] hover:underline inline-flex items-center gap-0.5 text-[11px] ml-auto font-bold"
                                  >
                                    View <ArrowUpRight size={12} />
                                  </Link>
                                )}
                              </div>
                            )}
                            <p className="line-clamp-3">{item.message}</p>
                          </div>
                        </div>

                        {/* Bottom Actions Row */}
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => setSelectedInquiry(item)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-200 text-[#E8272A] bg-red-50/50 hover:bg-red-100 hover:text-red-800 text-xs font-bold uppercase tracking-wider transition-all"
                          >
                            <Eye size={13} />
                            <span>VIEW</span>
                          </button>

                          <button
                            onClick={() => setEditingInquiry(item)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 text-xs font-bold uppercase tracking-wider transition-all"
                          >
                            <Edit3 size={13} />
                            <span>EDIT</span>
                          </button>

                          <button
                            onClick={() => setDeletingId(item.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-rose-200 text-rose-600 bg-rose-50/50 hover:bg-rose-100 hover:text-rose-800 text-xs font-bold uppercase tracking-wider transition-all"
                          >
                            <Trash2 size={13} />
                            <span>DELETE</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          VIEW MODAL (Full Details Glass Modal)
         ══════════════════════════════════════════════ */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#E8272A] bg-red-50 px-2.5 py-1 rounded-full">
                  {selectedInquiry.type === 'product_enquiry' ? 'Product Enquiry' : 'Contact Submission'}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  {selectedInquiry.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Received on: {formatDate(selectedInquiry.createdAt)}
                </p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase">Email</span>
                <p className="font-semibold text-slate-900 text-sm mt-0.5 break-all">
                  {selectedInquiry.email}
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase">Phone / Mobile</span>
                <p className="font-semibold text-slate-900 text-sm mt-0.5">
                  {selectedInquiry.phone}
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase">Company / Organization</span>
                <p className="font-semibold text-slate-900 text-sm mt-0.5">
                  {selectedInquiry.company || 'Not Specified'}
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase">Current Status</span>
                <div className="mt-1">
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) =>
                      handleQuickStatusChange(
                        selectedInquiry.id,
                        e.target.value as InquiryItem['status']
                      )
                    }
                    className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg font-bold text-xs text-slate-700"
                  >
                    <option value="new">🟢 New</option>
                    <option value="contacted">⚪ Contacted</option>
                    <option value="in_progress">🟡 In Progress</option>
                    <option value="closed">⚫ Closed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Requirement / Subject */}
            <div>
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Requirement / Subject
              </span>
              <p className="text-base font-bold text-slate-900 mt-1">
                {selectedInquiry.requirement || selectedInquiry.subject}
              </p>
            </div>

            {/* Product Details (If applicable) */}
            {selectedInquiry.productName && (
              <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {selectedInquiry.productImage && (
                    <img
                      src={selectedInquiry.productImage}
                      alt={selectedInquiry.productName}
                      className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-slate-200"
                    />
                  )}
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#E8272A] tracking-wider">
                      Target Product
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {selectedInquiry.productName}
                    </h4>
                  </div>
                </div>

                {selectedInquiry.productPath && (
                  <Link
                    href={selectedInquiry.productPath}
                    target="_blank"
                    className="px-3 py-1.5 bg-white hover:bg-red-50 text-[#E8272A] rounded-xl text-xs font-bold border border-red-200 inline-flex items-center gap-1 transition-all"
                  >
                    Open Product <ArrowUpRight size={13} />
                  </Link>
                )}
              </div>
            )}

            {/* Message Body */}
            <div>
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Inquiry Message / Details
              </span>
              <div className="mt-1 bg-slate-50 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed border border-slate-200 whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Internal Notes */}
            {selectedInquiry.notes && (
              <div>
                <span className="text-xs font-black uppercase text-amber-700 tracking-wider">
                  Internal Staff Notes
                </span>
                <p className="mt-1 text-xs text-slate-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  {selectedInquiry.notes}
                </p>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() =>
                  handleCopy(
                    `Name: ${selectedInquiry.name}\nEmail: ${selectedInquiry.email}\nPhone: ${selectedInquiry.phone}\nCompany: ${selectedInquiry.company || 'N/A'}\nRequirement: ${selectedInquiry.requirement}\nMessage: ${selectedInquiry.message}`,
                    selectedInquiry.id
                  )
                }
                className="px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200 inline-flex items-center gap-1.5 transition-all"
              >
                {copiedId === selectedInquiry.id ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Info</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-all"
                >
                  <Phone size={13} />
                  Call Client
                </a>

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry on Hikvision UAE`}
                  className="px-4 py-2 bg-[#E8272A] hover:bg-[#c91d20] text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all"
                >
                  <Mail size={13} />
                  Reply Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          EDIT MODAL
         ══════════════════════════════════════════════ */}
      {editingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white rounded-[28px] max-w-lg w-full shadow-2xl border border-slate-200 p-6 md:p-8 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Edit Inquiry — {editingInquiry.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingInquiry(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Status</label>
                <select
                  value={editingInquiry.status}
                  onChange={(e) =>
                    setEditingInquiry({
                      ...editingInquiry,
                      status: e.target.value as InquiryItem['status']
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#E8272A]/20 focus:border-[#E8272A]"
                >
                  <option value="new">🟢 New</option>
                  <option value="contacted">⚪ Contacted</option>
                  <option value="in_progress">🟡 In Progress</option>
                  <option value="closed">⚫ Closed</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={editingInquiry.company || ''}
                  onChange={(e) =>
                    setEditingInquiry({ ...editingInquiry, company: e.target.value })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#E8272A]/20 focus:border-[#E8272A]"
                  placeholder="e.g. Gulf Retail Group"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Requirement / Subject</label>
                <input
                  type="text"
                  value={editingInquiry.requirement || ''}
                  onChange={(e) =>
                    setEditingInquiry({ ...editingInquiry, requirement: e.target.value })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#E8272A]/20 focus:border-[#E8272A]"
                  placeholder="e.g. Perimeter Security Project"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Internal Staff Remarks / Notes
                </label>
                <textarea
                  rows={3}
                  value={editingInquiry.notes || ''}
                  onChange={(e) =>
                    setEditingInquiry({ ...editingInquiry, notes: e.target.value })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#E8272A]/20 focus:border-[#E8272A]"
                  placeholder="Add notes about call, client budget, site survey date..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingInquiry(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="px-5 py-2 bg-[#E8272A] hover:bg-[#c91d20] text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/20"
              >
                {actionLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          DELETE CONFIRMATION MODAL
         ══════════════════════════════════════════════ */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[26px] max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Delete this Inquiry?</h3>
              <p className="text-xs text-slate-500 mt-1">
                This record will be permanently deleted from the admin dashboard and database.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                {actionLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          ADD TEST INQUIRY MODAL
         ══════════════════════════════════════════════ */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[26px] max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Create Test Inquiry
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Generate a realistic test submission to preview how new inquiries appear in your dashboard:
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => handleCreateTest('contact')}
                disabled={actionLoading}
                className="w-full p-3.5 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-2xl flex items-center justify-between text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-100 text-[#E8272A] flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      New Contact Inquiry
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Simulate a general CCTV consultation lead
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              <button
                onClick={() => handleCreateTest('product_enquiry')}
                disabled={actionLoading}
                className="w-full p-3.5 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-2xl flex items-center justify-between text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Box size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      New Product Quote Request
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Simulate a PTZ camera pricing inquiry
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
