// Order matters: og:image first, then its secure variant, then Twitter's
// equivalent as a fallback for sites that only set that one.
const META_PATTERNS = [
  /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
  /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
];

export async function getOgImage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      signal: controller.signal,
      cache: "force-cache",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioLinkPreview/1.0)",
      },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;

    const html = await res.text();
    for (const pattern of META_PATTERNS) {
      const match = html.match(pattern)?.[1];
      if (match) return new URL(match, url).toString();
    }
    return null;
  } catch {
    return null;
  }
}
