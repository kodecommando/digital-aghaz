export function wrapCarouselIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return ((current + delta) % total + total) % total;
}

export function formatSlideCounter(index: number, total: number): string {
  if (total <= 0) return '00 / 00';
  const safeIndex = wrapCarouselIndex(index, 0, total) + 1;
  return `${String(safeIndex).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}
