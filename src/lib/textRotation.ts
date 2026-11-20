export function nextRotatingIndex(current: number, length: number): number {
  if (length <= 1) return 0;
  return (current + 1) % length;
}

export function resolveRotatingItem<T>(items: readonly T[], index: number): T | undefined {
  if (items.length === 0) return undefined;
  const safeIndex = ((index % items.length) + items.length) % items.length;
  return items[safeIndex];
}
