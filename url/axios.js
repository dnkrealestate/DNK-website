import axios from "axios";

// const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8800/";

// export { URL };

// const WWURL = "http://localhost:3000/";

// export { WWURL };

const URL =
    process.env.NEXT_PUBLIC_API_URL || "https://api.dnkre.com/";

export { URL };
    
// Must be NEXT_PUBLIC_-prefixed: Next.js only inlines that prefix into the
// browser bundle. An unprefixed var like the old WWW_PUBLIC_API_URL is only
// visible during server rendering, so the client silently fell back to the
// hardcoded default below while the server used the real .env value —
// producing a client/server mismatch on every image src built from this.
//
// Images now live in S3 under an `image/` key prefix, served via CloudFront —
// the backend's fileUploader uploads new files there instead of to local
// disk. The trailing "image/" is baked into the default here (not just the
// domain) so every existing `WWURL + filename` call site across the site
// resolves to the correct S3 key with no changes needed.
const WWURL =
    process.env.NEXT_PUBLIC_WWW_API_URL || "https://d1k91sbs9n9dpy.cloudfront.net/image/";

export { WWURL };  
    
const axiosPrivate = axios.create({
    baseURL: URL,
    headers: {},
    withCredentials: true,
});

export default axiosPrivate;
