'use client'

import posthog from 'posthog-js'
import { postHogProvider } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    })
}

export default function PHProvider({ children }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (pathname) {
            let url = window.origin + pathname
            if (searchParams.toString) {
                url += '?' + searchParams.toString()
            }
            posthog.capture('$pageview', {
                '$current_url': url,
            })
        }
    }, [pathname, searchParams])

    return (
        <postHogProvider client={posthog}>
            {children}
        </postHogProvider>
    )
    
}