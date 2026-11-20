import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { GlassFolder, type ArtPreset, type FolderFile } from '@/components/ui/glass-folder-cards';
import type { PortfolioItem, ServiceSlug } from '@/types/agency';

interface CaseStudyFoldersProps {
  items: PortfolioItem[];
  maxItems?: number;
}

const FOLDER_PRESETS: ArtPreset[] = ['ember', 'aurora', 'dusk', 'verdant', 'glacier', 'ember'];

const CATEGORY_TO_SERVICE_SLUG: Record<PortfolioItem['category'], ServiceSlug> = {
  Branding: 'graphic-design',
  'Web Design': 'web-development',
  Applications: 'mobile-apps',
  Video: 'video-production',
  Marketing: 'seo-marketing',
  'AI Solutions': 'ai-automation',
};

export function CaseStudyFolders({ items, maxItems = 3 }: CaseStudyFoldersProps) {
  const { theme, language, openInquiryModal } = useApp();
  const navigate = useNavigate();

  const displayed = items.slice(0, maxItems);
  if (displayed.length === 0) return null;

  const tone = theme === 'dark' ? 'dark' : 'light';

  return (
    <div data-testid="case-study-folders" className="mb-14">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
          {language === 'ur'
            ? 'انٹرایکٹو کیس اسٹڈی فولڈرز — کھولنے کے لیے کلک کریں'
            : 'Interactive Case Study Folders — Hover to peek · Click to open files'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 justify-items-center items-end py-4">
        {displayed.map((item, idx) => {
          const files: FolderFile[] = [
            {
              name: item.title,
              meta: item.category,
              image: item.coverImage,
            },
            {
              name: language === 'ur' ? 'مکمل کیس اسٹڈی' : 'Full Case Study',
              meta: 'Overview & Goals',
              art: FOLDER_PRESETS[(idx + 1) % FOLDER_PRESETS.length],
            },
            {
              name: language === 'ur' ? 'نتائج اور ڈلیوری' : 'Deliverables.pdf',
              meta: item.isConceptDemo ? 'Sample Blueprint' : 'Client Pack',
            },
          ];

          return (
            <div key={item.id} className="flex flex-col items-center gap-3">
              <GlassFolder
                label={item.title}
                meta={item.category}
                tone={tone}
                image={item.coverImage}
                art={FOLDER_PRESETS[idx % FOLDER_PRESETS.length]}
                seed={idx * 7 + 3}
                width={300}
                appearDelay={idx * 100}
                action="more"
                files={files}
                menu={[
                  {
                    label: language === 'ur' ? 'کیس اسٹڈی کھولیں' : 'Open Case Study',
                    onSelect: () => navigate(`/work/${item.slug}`),
                  },
                  {
                    label: language === 'ur' ? 'ایسا پروجیکٹ بنوائیں' : 'Request Similar Build',
                    onSelect: () => openInquiryModal(CATEGORY_TO_SERVICE_SLUG[item.category]),
                  },
                ]}
                onFileSelect={() => navigate(`/work/${item.slug}`)}
              />
              <button
                type="button"
                onClick={() => navigate(`/work/${item.slug}`)}
                className="text-xs font-semibold text-slate-700 dark:text-neutral-300 hover:text-[#EA0400] transition-colors cursor-pointer"
              >
                {language === 'ur' ? `${item.title} دیکھیں ←` : `Open ${item.title} →`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
