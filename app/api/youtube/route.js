export async function GET() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;

    if (!API_KEY || !PLAYLIST_ID) {
      return Response.json(
        { error: "Missing API key or Playlist ID" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=${PLAYLIST_ID}&key=${API_KEY}`,
      {
        next: { revalidate: 60 }, // cache for 60 seconds
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch from YouTube API");
    }

    const data = await res.json();

    // ✅ filter valid videos only
    const videoItems = data.items?.filter(
      (item) => item.snippet?.resourceId?.videoId
    );

    return Response.json({
      success: true,
      items: videoItems,
    });
  } catch (error) {
    console.error("YouTube API Error:", error);

    return Response.json(
      { success: false, error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
  
}