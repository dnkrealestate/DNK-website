"use client";

import { useEffect, useState } from "react";
import { useSplash } from "../context/SplashContext";
import { usePathname } from "next/navigation";
import SplashScreen from "./splashScreen/SplashScreen";
import HeaderMain from "./header/headerMain";
import FooterSection from "./footer/FooterSection";
import HeaderProject from "./header/HeaderProject";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export default function ClientWrapper({ children, spclLogo,  developerSlugs = [] }) {
    const pathname = usePathname();
    const { showSplash } = useSplash();
    const [isSplashComplete, setIsSplashComplete] = useState(!showSplash);
    

    useEffect(() => {
        if (showSplash) {
            setTimeout(() => setIsSplashComplete(true), 40);
        }
    }, [showSplash]);


  // ✅ Get first URL segment
  const currentSlug = pathname.split("/")[1];

  // ✅ Check if it matches developer slug
  const isDeveloperPage =
    currentSlug && developerSlugs.includes(currentSlug);


    const isProjectPage = pathname.startsWith("/projects");
    const isAdminPage = pathname.startsWith("/admin");
    const isLoginPage = pathname.startsWith("/login");
    const isDashboardPage = pathname.startsWith("/dashboard");
    const isRoadshowPage = pathname.startsWith("/roadshow");
    const isAddressVillas = pathname.startsWith("/address-villas-the-oasis");
    const isGrandPolo = pathname.startsWith("/grand-polo-club-resort");
    const isDubaiApartments = pathname.startsWith("/dubai-apartments");
    const isNadAlSheba = pathname.startsWith("/nad-al-sheba-gardens");
    const isRoadshowLive = pathname.startsWith("/live"); 
    const isAttendance = pathname.startsWith("/attendance");
    const isForgotPassword = pathname.startsWith("/forgot-password");
    const isIslands = pathname.startsWith("/damac-islands-new-community");
    const isPromotion = pathname.startsWith("/promotion");
    const isHudayriyat = pathname.startsWith("/hudayriyat-island");
    const isPalmJebelAli = pathname.startsWith("/palmjebelali");

    return (
        <>
            {!isProjectPage && !isAdminPage && !isDashboardPage && !isLoginPage && !isRoadshowPage && !isAddressVillas && !isGrandPolo && !isDubaiApartments && !isNadAlSheba && !isForgotPassword && !isIslands && !isPromotion && !isHudayriyat && !isPalmJebelAli && !isDeveloperPage && !isRoadshowLive && !isAttendance && <HeaderMain logoData={spclLogo} />}
            {children}
            <SpeedInsights />
            <Analytics />
            {!isAdminPage && !isDashboardPage && !isLoginPage && !isRoadshowPage && !isAddressVillas && !isGrandPolo && !isDubaiApartments && !isNadAlSheba && !isForgotPassword && !isIslands && !isPromotion && !isHudayriyat && !isPalmJebelAli && !isDeveloperPage && !isRoadshowLive && !isAttendance && <FooterSection />}
            {!isSplashComplete && !isAddressVillas && !isGrandPolo && !isNadAlSheba && !isForgotPassword && !isIslands && !isPromotion && !isHudayriyat && !isPalmJebelAli && <SplashScreen logoData={spclLogo} />}
        </>
    );
}