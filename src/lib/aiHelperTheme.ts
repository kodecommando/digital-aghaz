import type { ThemeMode } from '../types/agency';

export interface AiHelperButtonTheme {
  paletteId: 'dark-crimson' | 'light-cobalt';
  accentHex: string;
  secondaryHex: string;
  surfaceBg: string;
  ringStyle: string;
  glowShadow: string;
  buttonClasses: string;
  ringGradientStyle: string;
  tooltipClasses: string;
  statusDotClasses: string;
  closeOverlayClasses: string;
  headerBadgeClasses: string;
  sendBtnClasses: string;
  promptHoverClasses: string;
}

/**
 * Pure theme resolver for the floating AI Helper button and drawer accents.
 * Automatically adapts color palette whenever the site switches between
 * Dark Mode and Light Mode so the AI Helper stands out cleanly on every surface.
 */
export function resolveAiHelperTheme(theme: ThemeMode): AiHelperButtonTheme {
  if (theme === 'light') {
    return {
      paletteId: 'light-cobalt',
      accentHex: '#2563EB',
      secondaryHex: '#0EA5E9',
      surfaceBg: '#FFFFFF',
      ringStyle: 'conic-gradient(from 135deg, #2563EB, #0EA5E9, #6366F1, #2563EB)',
      glowShadow:
        '0 12px 28px -6px rgba(37, 99, 235, 0.42), 0 0 0 3px rgba(255, 255, 255, 0.96)',
      buttonClasses:
        'bg-white text-slate-900 focus-visible:outline-[#2563EB]',
      ringGradientStyle:
        'conic-gradient(from 135deg, #2563EB 0deg, #0EA5E9 120deg, #4F46E5 240deg, #2563EB 360deg)',
      tooltipClasses:
        'bg-[#0F172A] text-white border border-blue-400/40 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.38)]',
      statusDotClasses: 'bg-[#2563EB] ring-2 ring-white',
      closeOverlayClasses: 'bg-[#0F172A]/86 backdrop-blur-[2px] text-white',
      headerBadgeClasses: 'ring-2 ring-[#2563EB]/80 bg-white',
      sendBtnClasses: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white',
      promptHoverClasses: 'hover:border-[#2563EB] hover:text-[#2563EB]',
    };
  }

  return {
    paletteId: 'dark-crimson',
    accentHex: '#EA0400',
    secondaryHex: '#FF6B4A',
    surfaceBg: '#0A0A0C',
    ringStyle: 'conic-gradient(from 135deg, #EA0400, #FF5A36, #B91C1C, #EA0400)',
    glowShadow:
      '0 14px 32px -6px rgba(234, 4, 0, 0.46), 0 0 0 3px rgba(17, 17, 19, 0.94)',
    buttonClasses:
      'bg-[#0A0A0C] text-white focus-visible:outline-[#EA0400]',
    ringGradientStyle:
      'conic-gradient(from 135deg, #EA0400 0deg, #FF5E3A 120deg, #B91C1C 240deg, #EA0400 360deg)',
    tooltipClasses:
      'bg-white text-slate-950 border border-[#EA0400]/30 shadow-[0_10px_24px_-6px_rgba(234,4,0,0.42)]',
    statusDotClasses: 'bg-[#EA0400] ring-2 ring-[#0A0A0C]',
    closeOverlayClasses: 'bg-black/84 backdrop-blur-[2px] text-white',
    headerBadgeClasses: 'ring-2 ring-[#EA0400]/80 bg-[#0A0A0C]',
    sendBtnClasses: 'bg-[#EA0400] hover:bg-[#C80400] text-white',
    promptHoverClasses: 'hover:border-[#EA0400] hover:text-[#EA0400]',
  };
}
