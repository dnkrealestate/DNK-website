export const dynamic = "force-dynamic";

export async function GET() {
    const origin = "https://api.dnkre.com";
    const url = `${origin}/robots.txt`;

    try {
        const resp = await fetch(url, { cache: "no-store" });
        if (!resp.ok) throw new Error(`Upstream returned ${resp.status}`);
        const text = await resp.text();

        return new Response(text, { headers: { "Content-Type": "text/plain" } });
    } catch (err) {
        // Minimal safe fallback
        const fallback = `User-agent: *
Allow: /
Sitemap: https://www.dnkre.com/sitemap.xml`;
        return new Response(fallback, {
            status: 503,
            headers: { "Content-Type": "text/plain" },
        });
    }
}
