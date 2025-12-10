export async function GET() {
    try {
        const res = await fetch("https://api.dnkre.com/sync-projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.WWW_PUBLIC_API_URL
            }
        });

        const result = await res.json();
        return new Response(JSON.stringify({ success: true, result }), {
            status: 200
        });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500
        });
    }
}
