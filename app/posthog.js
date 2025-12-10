import { PostHog } from 'posthog-js';

export default function PostHogClient() {
    const PostHogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    })
    return PostHogClient;
}