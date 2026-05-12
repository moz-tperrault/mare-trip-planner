/**
 * Human-friendly phrase for how far a future date is.
 * Computed at request time on the server — the page is re-fetched on
 * navigation so this stays current enough without client state.
 */
export function timeUntil(target: string | Date): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const t = new Date(target);
  t.setHours(0, 0, 0, 0);
  const days = Math.round((t.getTime() - now.getTime()) / 86_400_000);

  if (days < 0) return "Past journey";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days <= 7) return `${days} days from now`;
  if (days <= 60) return `${days} days from now`;
  const months = Math.round(days / 30);
  return months === 1 ? "Next month" : `${months} months from now`;
}
