export interface ScrollMetrics {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

/**
 * Determines whether a scrollable chat container is within `thresholdPx`
 * of the bottom anchor.
 */
export function isNearBottom(metrics: ScrollMetrics, thresholdPx = 48): boolean {
  const { scrollTop, scrollHeight, clientHeight } = metrics;
  if (scrollHeight <= clientHeight) return true;
  const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
  return distanceFromBottom <= Math.max(0, thresholdPx);
}

/**
 * Decides whether a chat update should automatically scroll to the bottom
 * anchor. Always scrolls when the user just sent a message, or when the
 * user is already following the bottom of the conversation.
 */
export function shouldAutoScrollOnUpdate(
  wasNearBottom: boolean,
  lastMessageRole?: 'user' | 'model'
): boolean {
  if (lastMessageRole === 'user') return true;
  return wasNearBottom;
}
