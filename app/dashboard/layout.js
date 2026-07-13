"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  MdSpaceDashboard,
  MdGroups,
  MdLocalOffer,
  MdApartment,
  MdArticle,
  MdPersonAdd,
  MdCampaign,
  MdRateReview,
  MdBusinessCenter,
  MdSettings,
  MdCelebration,
  MdPhotoLibrary,
  MdLogout,
  MdMenu,
  MdClose,
  MdPeopleAlt,
} from "react-icons/md";
import Swal from "sweetalert2";
import dnkLogo from "@/public/assets/logo/dnklogo_1.webp";
import { userUserServices } from "../../services/userServices";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: MdSpaceDashboard },
      { href: "/dashboard/leads", label: "Leads", icon: MdPeopleAlt },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/dashboard/addProject", label: "Add Project", icon: MdApartment },
      { href: "/dashboard/addPromotion", label: "Add Promotion", icon: MdLocalOffer },
      { href: "/dashboard/addNews", label: "Add News", icon: MdArticle },
      { href: "/dashboard/ad", label: "Add Ad", icon: MdCampaign },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/dashboard/team", label: "All Team", icon: MdGroups },
      { href: "/dashboard/addTeam", label: "Add Team", icon: MdPersonAdd },
      { href: "/dashboard/partner", label: "Add Partner", icon: MdBusinessCenter },
      { href: "/dashboard/review", label: "Add Review", icon: MdRateReview },
    ],
  },
  {
    label: "Site settings",
    items: [
      { href: "/dashboard/home-banner", label: "General Settings", icon: MdSettings },
      { href: "/dashboard/special-day", label: "Special Day Wish", icon: MdCelebration },
      {
        href: "/dashboard/special-day-logo",
        label: "Special Day Logo",
        icon: MdPhotoLibrary,
      },
    ],
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutUser } = userUserServices();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLabel =
    NAV_SECTIONS.flatMap((s) => s.items).find((i) => i.href === pathname)
      ?.label || "Dashboard";

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log out?",
      text: "You'll need to sign in again to make changes.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Log out",
      confirmButtonColor: "#0F2C45",
    });
    if (!result.isConfirmed) return;

    await logoutUser();
    localStorage.removeItem("login");
    Swal.fire("Signed out", "You've been logged out.", "success");
    router.push("/admin");
  };

  const NavLink = ({ href, label, icon: Icon }) => {
    const active = pathname === href;
    return (
      <button
        onClick={() => {
          router.push(href);
          setMobileOpen(false);
        }}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
          active
            ? "bg-[#18A4A0] text-white"
            : "text-white/60 hover:bg-white/5 hover:text-white"
        }`}
      >
        <Icon className="shrink-0 text-lg" />
        <span className="truncate">{label}</span>
      </button>
    );
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-5 py-5">
        <div className="relative h-10 w-[110px]">
          <Image src={dnkLogo} alt="DNK Logo" fill style={{ objectFit: "contain" }} />
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="text-white/60 hover:text-white lg:hidden"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      {/* Topbar */}
      <div className="fixed top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#040406] px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-white/70 hover:text-white lg:hidden"
          >
            <MdMenu className="text-2xl" />
          </button>
          <span className="text-sm font-medium text-white/80">{currentLabel}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
        >
          <MdLogout />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <div className="flex pt-16">
        {/* Desktop sidebar */}
        <aside className="fixed bottom-0 top-16 hidden w-64 flex-col bg-[#1C1D22] lg:flex">
          {sidebarContent}
        </aside>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute bottom-0 left-0 top-0 flex w-64 flex-col bg-[#1C1D22]">
              {sidebarContent}
            </aside>
          </div>
        )}

        {/* Content */}
        <main className="min-h-[calc(100vh-4rem)] w-full lg:pl-64">
          <div className="mx-auto max-w-[1240px] px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
