export const dynamic = "force-dynamic"; 

export async function GET() {
    const origin = "https://api.dnkre.com"; 
    const url = `${origin}/sitemap.xml`;

    try {
        // Choose ONE of the two caching behaviors:

        // A) Always fresh (no cache)
        const resp = await fetch(url, { cache: "no-store" });

        // B) CDN cache for 1 hour (uncomment to use)
        // const resp = await fetch(url, { next: { revalidate: 3600 } });

        if (!resp.ok) {
            throw new Error(`Upstream returned ${resp.status}`);
        }

        const xml = await resp.text();

        // If you used option B above, you can add CDN cache headers:
        // return new Response(xml, {
        //   headers: {
        //     "Content-Type": "application/xml",
        //     "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        //   },
        // });

        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
    } catch (err) {
        // Optional: a minimal valid fallback so crawlers don't fail hard
        const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.dnkre.com/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
</urlset>`;
        return new Response(fallback, {
            status: 503,
            headers: { "Content-Type": "application/xml" },
        });
    }
}
