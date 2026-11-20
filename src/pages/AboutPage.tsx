import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TEAM_STRUCTURE_PLACEHOLDERS } from '../data/agencyContent';
import { applyPageMeta } from '../lib/seo';
import { FinalCTA } from '../components/FinalCTA';

export function AboutPage() {
  const { language, t } = useApp();

  useEffect(() => {
    applyPageMeta({
      title: 'About Digital Aghaz — Our Team & Philosophy',
      description:
        'Meet Digital Aghaz led by CEO Muhammad Salman—combining creative design, full-stack engineering, video & practical AI under written project scopes.',
    });
  }, []);

  const fiveDocuments = [
    {
      num: '01',
      title: 'Quick Project Brief',
      desc: 'Your goals, customers, links you like, and what needs fixing first.',
    },
    {
      num: '02',
      title: 'Clear Price Quote',
      desc: 'Exact deliverables, timeline, price, and payment steps—all up front.',
    },
    {
      num: '03',
      title: 'Simple Agreement',
      desc: 'Revision rules, ownership of final files, and clear promises on both sides.',
    },
    {
      num: '04',
      title: 'Live Task List',
      desc: 'Who is doing what, key dates, current status, and client feedback notes.',
    },
    {
      num: '05',
      title: 'Final Files & Handover',
      desc: 'All approved work, logins, source files, and help getting started.',
    },
  ];

  return (
    <div className="bg-transparent text-[#0F172A] dark:text-white">
      <section className="py-16 sm:py-20 bg-[#F8FAFC]/72 dark:bg-black/72 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <p className="text-xs font-medium text-[#EA0400]">{t.nav.about}</p>
          <h1 className="da-h1 text-slate-900 dark:text-white">
            Great ideas deserve a strong, honest start online.
          </h1>
          <p className="da-body text-slate-600 dark:text-neutral-300">
            Digital Aghaz is a five-person team serving businesses in Pakistan and around the world. Instead of hiring disconnected freelancers, you get one coordinated crew covering branding, websites, video editing, and smart AI tools.
          </p>
        </div>
      </section>

      {/* Operating Philosophy */}
      <section className="py-16 bg-white/78 dark:bg-[#070708]/78 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-6 space-y-2">
            <span className="font-mono-label text-xs text-[#EA0400]">01 · How We Think</span>
            <h2 className="da-h3 text-slate-900 dark:text-white">Create. Learn. Serve. Grow.</h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400">
              Share helpful guides, keep getting sharper every week, deliver honest work, and grow alongside our clients.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-6 space-y-2">
            <span className="font-mono-label text-xs text-[#EA0400]">02 · Teamwork</span>
            <h2 className="da-h3 text-slate-900 dark:text-white">Clear Ownership & Backups</h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400">
              Every project has a clear lead and a backup owner so deadlines never slip because one person is away.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-6 space-y-2">
            <span className="font-mono-label text-xs text-[#EA0400]">03 · Zero Fake Stuff</span>
            <h2 className="da-h3 text-slate-900 dark:text-white">No Fake Numbers Ever</h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400">
              We never buy fake views or followers, never touch cracked software, and never brag about made-up results.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-[#F8FAFC]/68 dark:bg-black/68 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-medium text-[#EA0400]">Our Crew</p>
            <h2 className="da-h2 text-slate-900 dark:text-white">
              Digital Aghaz Team
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TEAM_STRUCTURE_PLACEHOLDERS.map((member) => (
              <div
                key={member.name}
                data-testid={member.isCeo ? 'team-card-ceo' : 'team-card-member'}
                className={`rounded-xl border p-5 flex flex-col justify-between gap-3 ${
                  member.isCeo
                    ? 'border-[#EA0400]/60 bg-white/95 dark:bg-[#141416]/95'
                    : 'border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                    member.isCeo
                      ? 'bg-[#EA0400] text-white'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-black'
                  }`}
                >
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="text-xs font-semibold text-[#EA0400] mt-1 tracking-wide">
                      {member.role[language]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Standard Client Documents */}
      <section className="py-16 bg-white/78 dark:bg-[#070708]/78">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-medium text-[#EA0400]">How We Stay Organized</p>
            <h2 className="da-h2 text-slate-900 dark:text-white">
              Five simple docs prepared for every project
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fiveDocuments.map((doc) => (
              <div
                key={doc.num}
                className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-5 space-y-2"
              >
                <span className="font-mono-label text-xs text-[#EA0400]">{doc.num}</span>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
