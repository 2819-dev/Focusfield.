export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "about:blank";

  const looksLikeUrl = /^https?:\/\//i.test(trimmed) || /^[\w-]+(\.[\w-]+)+(\/|$)/.test(trimmed);
  if (looksLikeUrl) {
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
}
