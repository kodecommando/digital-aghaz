import React, { useEffect, useState } from 'react';
import {
  Lock,
  LogOut,
  Search,
  Plus,
  RefreshCw,
  Download,
  Mail,
} from 'lucide-react';
import { LEAD_STATUSES, type LeadRecord, type LeadStatus } from '../lib/crm';
import type { PortfolioItem, InsightItem } from '../types/agency';
import { useApp } from '../context/AppContext';
import { applyPageMeta } from '../lib/seo';
import {
  apiFetchJson,
  clearAdminSessionToken,
  getAdminSessionToken,
  invalidatePublicCache,
  setAdminSessionToken,
} from '../lib/api';

interface AuditEntry {
  id: string;
  action: string;
  actor: string;
  detail: string;
  createdAt: string;
}

export function AdminPage() {
  const { addToast } = useApp();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Dashboard state
  const [tab, setTab] = useState<'leads' | 'portfolio' | 'insights' | 'audit'>('leads');
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([]);
  const [emailConfigured, setEmailConfigured] = useState(false);
  const [adminEmailTarget, setAdminEmailTarget] = useState('salmancreatorlabs@gmail.com');
  const [refreshing, setRefreshing] = useState(false);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [statusDraft, setStatusDraft] = useState<LeadStatus>('NEW');
  const [savingLead, setSavingLead] = useState(false);

  // Quick add portfolio form
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjSummary, setNewProjSummary] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<PortfolioItem['category']>('Web Design');

  // Quick add insight form
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtExcerpt, setNewArtExcerpt] = useState('');
  const [newArtCategory, setNewArtCategory] = useState<InsightItem['category']>('Technology');

  useEffect(() => {
    applyPageMeta({
      title: 'Admin Portal — Digital Aghaz',
      description: 'Private authenticated portal for Digital Aghaz administration.',
      noindex: true,
    });
  }, []);

  const loadDashboardData = async (tokenOverride?: string | null) => {
    const bearerToken = tokenOverride ?? getAdminSessionToken();
    const adminRes = await apiFetchJson<{
      leads?: LeadRecord[];
      portfolio?: PortfolioItem[];
      insights?: InsightItem[];
      auditLogs?: AuditEntry[];
      emailConfigured?: boolean;
      adminEmailTarget?: string;
      error?: string;
    }>('/api/admin/leads', { method: 'GET', bearerToken, retries: 1 });

    if (adminRes.ok && adminRes.data) {
      setLeads(adminRes.data.leads ?? []);
      setPortfolio(adminRes.data.portfolio ?? []);
      setInsights(adminRes.data.insights ?? []);
      setAuditLogs(adminRes.data.auditLogs ?? []);
      setEmailConfigured(Boolean(adminRes.data.emailConfigured));
      if (adminRes.data.adminEmailTarget) setAdminEmailTarget(adminRes.data.adminEmailTarget);
    } else if (adminRes.status === 401) {
      clearAdminSessionToken();
      setAuthenticated(false);
      addToast('error', 'Admin session expired. Please sign in again.');
    } else if (adminRes.error) {
      addToast('error', adminRes.error);
    }
  };

  useEffect(() => {
    let active = true;
    const bootstrap = async () => {
      try {
        const bearerToken = getAdminSessionToken();
        const checkRes = await apiFetchJson<{ authenticated?: boolean; error?: string }>(
          '/api/admin/auth/check',
          { method: 'GET', bearerToken, retries: 1 }
        );
        if (!active) return;
        if (checkRes.ok && checkRes.data?.authenticated) {
          setAuthenticated(true);
          await loadDashboardData(bearerToken);
        } else {
          if (bearerToken) clearAdminSessionToken();
          setAuthenticated(false);
        }
      } finally {
        if (active) setCheckingAuth(false);
      }
    };

    bootstrap();
    return () => {
      active = false;
    };
  }, []);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setAuthError(null);
    try {
      const res = await apiFetchJson<{
        ok?: boolean;
        authenticated?: boolean;
        sessionToken?: string;
        error?: string;
      }>('/api/admin/auth/login', {
        method: 'POST',
        retries: 1,
        body: { email: loginEmail.trim(), password: loginPassword },
      });

      if (!res.ok || !res.data?.ok) {
        setAuthError(res.error || 'Incorrect email or password.');
        return;
      }

      if (res.data.sessionToken) {
        setAdminSessionToken(res.data.sessionToken);
      }
      setLoginPassword('');
      setAuthenticated(true);
      await loadDashboardData(res.data.sessionToken ?? null);
      addToast('success', 'Signed in to Digital Aghaz Admin Portal.');
    } finally {
      setSigningIn(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
    addToast('info', 'Lead inbox refreshed.');
  };

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Company', 'Country', 'Services', 'Budget', 'Timeline', 'Status', 'CreatedAt', 'Description'];
    const escape = (val: string) => `"${String(val || '').replace(/"/g, '""')}"`;
    const rows = leads.map((l) =>
      [
        l.id,
        l.fullName,
        l.email,
        l.company,
        l.country,
        l.services.join('; '),
        l.budget,
        l.timeline,
        l.status,
        l.createdAt,
        l.description,
      ]
        .map(escape)
        .join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digital-aghaz-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    await apiFetchJson<{ ok?: boolean; error?: string }>('/api/admin/auth/logout', {
      method: 'POST',
      bearerToken: getAdminSessionToken(),
      retries: 0,
    });
    clearAdminSessionToken();
    setAuthenticated(false);
    setLeads([]);
    setSelectedLead(null);
    setAuditLogs([]);
    setAuthError(null);
    addToast('info', 'Signed out.');
  };

  const openLeadEditor = (lead: LeadRecord) => {
    setSelectedLead(lead);
    setStatusDraft(lead.status);
    setNoteDraft(lead.notes || '');
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    setSavingLead(true);
    try {
      const res = await apiFetchJson<{ ok?: boolean; lead?: LeadRecord; error?: string }>(
        `/api/admin/leads/${encodeURIComponent(selectedLead.id)}`,
        {
          method: 'PATCH',
          bearerToken: getAdminSessionToken(),
          body: { status: statusDraft, notes: noteDraft },
        }
      );
      if (!res.ok || !res.data?.lead) {
        addToast('error', res.error || 'Could not update lead.');
        return;
      }
      const updatedLead = res.data.lead;
      setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
      setSelectedLead(updatedLead);
      addToast('success', 'Lead updated.');
    } finally {
      setSavingLead(false);
    }
  };

  const handleCreatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiFetchJson<{ ok?: boolean; item?: PortfolioItem; error?: string }>(
      '/api/admin/portfolio',
      {
        method: 'POST',
        bearerToken: getAdminSessionToken(),
        body: {
          title: newProjTitle,
          summary: newProjSummary,
          category: newProjCategory,
          isConceptDemo: true,
        },
      }
    );
    if (!res.ok || !res.data?.item) {
      addToast('error', res.error || 'Unable to add project.');
      return;
    }
    invalidatePublicCache('/api/portfolio');
    setPortfolio((prev) => [res.data!.item!, ...prev]);
    setNewProjTitle('');
    setNewProjSummary('');
    addToast('success', 'Portfolio item added.');
  };

  const togglePortfolioPublish = async (item: PortfolioItem) => {
    const res = await apiFetchJson<{ ok?: boolean; item?: PortfolioItem; error?: string }>(
      `/api/admin/portfolio/${encodeURIComponent(item.id)}`,
      {
        method: 'PATCH',
        bearerToken: getAdminSessionToken(),
        body: { published: !item.published },
      }
    );
    if (res.ok && res.data?.item) {
      invalidatePublicCache('/api/portfolio');
      const updated = res.data.item;
      setPortfolio((prev) => prev.map((p) => (p.id === item.id ? updated : p)));
      addToast('info', `${updated.title} is now ${updated.published ? 'published' : 'draft'}.`);
    } else if (res.error) {
      addToast('error', res.error);
    }
  };

  const handleCreateInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiFetchJson<{ ok?: boolean; item?: InsightItem; error?: string }>(
      '/api/admin/insights',
      {
        method: 'POST',
        bearerToken: getAdminSessionToken(),
        body: {
          title: newArtTitle,
          excerpt: newArtExcerpt,
          category: newArtCategory,
        },
      }
    );
    if (!res.ok || !res.data?.item) {
      addToast('error', res.error || 'Unable to publish insight.');
      return;
    }
    invalidatePublicCache('/api/insights');
    setInsights((prev) => [res.data!.item!, ...prev]);
    setNewArtTitle('');
    setNewArtExcerpt('');
    addToast('success', 'Insight published.');
  };

  if (checkingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-500">
        Verifying session...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-[75vh] bg-[#F8FAFC]/82 dark:bg-black/82 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#EA0400]/10 text-[#EA0400] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="da-h2 text-slate-900 dark:text-white">Admin Portal</h1>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-neutral-400">
              Sign in with your administrator email and password to manage client inquiries and website content.
            </p>
          </div>

          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-xs font-medium text-slate-800 dark:text-neutral-200"
              >
                Email Address
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-medium text-slate-800 dark:text-neutral-200"
              >
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={signingIn}
              data-testid="admin-login-submit"
              className="btn-primary-motion w-full py-2.5 px-4 rounded-md bg-[#EA0400] text-white text-xs font-semibold hover:bg-[#c80400] disabled:opacity-50 cursor-pointer"
            >
              {signingIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {authError && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400"
            >
              {authError}
            </div>
          )}
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter((l) => {
    const matchStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      l.fullName.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-black text-[#0F172A] dark:text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-6">
          <div>
            <p className="text-xs font-medium text-[#EA0400]">Digital Aghaz Owner Inbox</p>
            <h1 className="da-h2 text-slate-900 dark:text-white">
              Lead CRM & Content Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
              Active session · Notifications routed to {adminEmailTarget}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-medium hover:border-[#EA0400] cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-medium hover:border-[#EA0400] disabled:opacity-40 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-medium hover:border-[#EA0400] cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Email Forwarding Connection Notice */}
        <div
          className={`rounded-xl border p-4 text-xs flex flex-wrap items-center justify-between gap-3 ${
            emailConfigured
              ? 'border-emerald-500/30 bg-emerald-500/5 text-slate-800 dark:text-neutral-200'
              : 'border-amber-500/30 bg-amber-500/5 text-slate-700 dark:text-neutral-300'
          }`}
        >
          <span>
            {emailConfigured
              ? `Live email forwarding active: every new website project brief is saved here and emailed directly to ${adminEmailTarget}.`
              : `Private Dashboard Inbox active: every website project brief is saved here automatically. To also mirror instant email alerts into ${adminEmailTarget}, add SMTP_PASS (Gmail App Password) or RESEND_API_KEY in server environment secrets.`}
          </span>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-5">
            <div className="font-display text-2xl font-semibold tabular-nums">{leads.length}</div>
            <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Total Saved Leads</div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-5">
            <div className="font-display text-2xl font-semibold text-[#EA0400] tabular-nums">
              {leads.filter((l) => l.status === 'NEW').length}
            </div>
            <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">New Inquiries</div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-5">
            <div className="font-display text-2xl font-semibold tabular-nums">
              {portfolio.filter((p) => p.published).length}
            </div>
            <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Published Portfolio</div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-5">
            <div className="font-display text-2xl font-semibold tabular-nums">
              {insights.filter((i) => i.published).length}
            </div>
            <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Published Insights</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-neutral-800 pb-3">
          {(['leads', 'portfolio', 'insights', 'audit'] as const).map((tKey) => (
            <button
              key={tKey}
              type="button"
              onClick={() => setTab(tKey)}
              className={`px-4 py-2 rounded-md text-xs font-medium capitalize cursor-pointer ${
                tab === tKey
                  ? 'bg-[#EA0400] text-white'
                  : 'bg-white dark:bg-[#111111] border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300'
              }`}
            >
              {tKey === 'leads'
                ? 'Lead Pipeline'
                : tKey === 'audit'
                  ? 'Audit Trail'
                  : tKey}
            </button>
          ))}
        </div>

        {/* TAB: LEADS */}
        {tab === 'leads' && (
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search leads by name, email, company..."
                    className="w-full rounded-lg border border-slate-300 dark:border-neutral-800 bg-white dark:bg-[#111111] ps-9 pe-3 py-2 text-xs"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-slate-300 dark:border-neutral-800 bg-white dark:bg-[#111111] px-3 py-2 text-xs"
                >
                  <option value="ALL">All Statuses</option>
                  {LEAD_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-8 text-center text-sm text-slate-500">
                  No matching inquiries yet. Submit one via Start a Project to see leads appear directly in your private inbox.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLeads.map((lead) => (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => openLeadEditor(lead)}
                      className={`w-full text-start rounded-xl border p-4 transition-colors cursor-pointer ${
                        selectedLead?.id === lead.id
                          ? 'border-[#EA0400] bg-white dark:bg-[#161618]'
                          : 'border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{lead.fullName}</span>
                        <span className="font-mono-label text-[11px] text-[#EA0400]">
                          {lead.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                        {lead.company} · {lead.country} · {lead.email}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1.5">
                        {lead.services.join(', ')}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              {selectedLead ? (
                <form
                  onSubmit={handleSaveLead}
                  className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold">{selectedLead.fullName}</h2>
                    <span className="font-mono-label text-xs text-slate-400">{selectedLead.id}</span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-600 dark:text-neutral-400">
                    <p>Email: {selectedLead.email}</p>
                    <p>Company: {selectedLead.company}</p>
                    <p>Country: {selectedLead.country}</p>
                    <p>Budget: {selectedLead.budget} · Timeline: {selectedLead.timeline}</p>
                    <p>Email Notification: {selectedLead.emailStatus}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-900 text-xs text-slate-700 dark:text-neutral-300">
                    {selectedLead.description}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`mailto:${encodeURIComponent(selectedLead.email)}?subject=${encodeURIComponent(`Re: Digital Aghaz Project Inquiry (${selectedLead.id})`)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-medium hover:border-[#EA0400]"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#EA0400]" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium">CRM Stage</label>
                    <select
                      value={statusDraft}
                      onChange={(e) => setStatusDraft(e.target.value as LeadStatus)}
                      className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3 py-2 text-xs"
                    >
                      {LEAD_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium">Internal Handover Notes</label>
                    <textarea
                      rows={4}
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] p-2.5 text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={savingLead}
                    className="btn-primary-motion w-full py-2.5 rounded-md bg-[#EA0400] text-white text-xs font-semibold cursor-pointer"
                  >
                    {savingLead ? 'Saving...' : 'Save CRM Update'}
                  </button>
                </form>
              ) : (
                <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-6 text-xs text-slate-500">
                  Select a lead from the list to review project details, reply directly, update CRM status, or add handover notes.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: PORTFOLIO */}
        {tab === 'portfolio' && (
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <form
              onSubmit={handleCreatePortfolio}
              className="lg:col-span-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-6 space-y-4"
            >
              <h2 className="text-sm font-semibold flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#EA0400]" />
                <span>Add Concept / Portfolio Entry</span>
              </h2>
              <input
                type="text"
                required
                value={newProjTitle}
                onChange={(e) => setNewProjTitle(e.target.value)}
                placeholder="Project title"
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3 py-2 text-xs"
              />
              <select
                value={newProjCategory}
                onChange={(e) => setNewProjCategory(e.target.value as PortfolioItem['category'])}
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3 py-2 text-xs"
              >
                <option value="Branding">Branding</option>
                <option value="Web Design">Web Design</option>
                <option value="Applications">Applications</option>
                <option value="Video">Video</option>
                <option value="Marketing">Marketing</option>
                <option value="AI Solutions">AI Solutions</option>
              </select>
              <textarea
                rows={3}
                required
                value={newProjSummary}
                onChange={(e) => setNewProjSummary(e.target.value)}
                placeholder="Concise project summary..."
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] p-2.5 text-xs"
              />
              <button
                type="submit"
                className="btn-primary-motion w-full py-2 rounded-md bg-[#EA0400] text-white text-xs font-semibold cursor-pointer"
              >
                Create Project
              </button>
            </form>

            <div className="lg:col-span-8 space-y-3">
              {portfolio.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="text-xs text-slate-500">
                      {p.category} · {p.published ? 'Published' : 'Draft'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePortfolioPublish(p)}
                    className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-medium cursor-pointer"
                  >
                    {p.published ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: INSIGHTS */}
        {tab === 'insights' && (
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <form
              onSubmit={handleCreateInsight}
              className="lg:col-span-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-6 space-y-4"
            >
              <h2 className="text-sm font-semibold flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#EA0400]" />
                <span>Publish New Insight</span>
              </h2>
              <input
                type="text"
                required
                value={newArtTitle}
                onChange={(e) => setNewArtTitle(e.target.value)}
                placeholder="Article title"
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3 py-2 text-xs"
              />
              <select
                value={newArtCategory}
                onChange={(e) => setNewArtCategory(e.target.value as InsightItem['category'])}
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3 py-2 text-xs"
              >
                <option value="AI">AI</option>
                <option value="Technology">Technology</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Web Development">Web Development</option>
                <option value="Branding">Branding</option>
                <option value="Business Growth">Business Growth</option>
                <option value="Tutorials">Tutorials</option>
              </select>
              <textarea
                rows={4}
                required
                value={newArtExcerpt}
                onChange={(e) => setNewArtExcerpt(e.target.value)}
                placeholder="Article excerpt / summary..."
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] p-2.5 text-xs"
              />
              <button
                type="submit"
                className="btn-primary-motion w-full py-2 rounded-md bg-[#EA0400] text-white text-xs font-semibold cursor-pointer"
              >
                Publish Insight
              </button>
            </form>

            <div className="lg:col-span-8 space-y-3">
              {insights.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-4"
                >
                  <div className="text-sm font-semibold">{a.title}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {a.category} · {a.publishedAt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: AUDIT TRAIL */}
        {tab === 'audit' && (
          <div className="space-y-3 max-w-4xl">
            <h2 className="text-sm font-semibold">Server Audit Trail</h2>
            <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] divide-y divide-slate-100 dark:divide-neutral-800 max-h-[520px] overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 text-xs space-y-0.5">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-[#EA0400]">{log.action}</span>
                    <span className="font-mono-label text-[10px] text-slate-400">
                      {log.createdAt.slice(0, 19).replace('T', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-neutral-400">{log.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
