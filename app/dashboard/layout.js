"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { RiLogoutCircleRLine } from "react-icons/ri";
import dnkLogo from "@/public/assets/logo/dnklogo_1.webp";
import Swal from "sweetalert2";
import { userUserServices } from "../../services/userServices";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutUser } = userUserServices();

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("login");
    Swal.fire("Success", "Logged Out", "success");
    router.push("/admin");
  };

  const navButton = (href, label) => (
    <button
      onClick={() => router.push(href)}
      className={`${pathname === href ? "active" : ""} site-sub-btn text-left bg-[#0F2C45] w-full !border-[#1C1D22]`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="bg-[#040406] flex items-center justify-between h-15 px-8 py-2">
        <div className="relative w-[60px] h-[45px] flex items-center justify-start">
          <Image
            src={dnkLogo}
            alt="DNK Logo"
            layout="fill"
            style={{ objectFit: "contain" }}
          />
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#fff] w-fit p-2 rounded-full mr-3"
        >
          <RiLogoutCircleRLine className="text-[#000] text-[1rem]" />
        </button>
      </div>

      <div className="flex sideBarDashboard">
        <div className="bg-[#1C1D22]" style={{ height: "100vh", width: "40%" }}>
          <div className="sidebar block">
            {navButton("/dashboard", "Dashboard")}
            {navButton("/dashboard/team", "All Team")}
            {navButton("/dashboard/addPromotion", "Add Promotion")}
            {navButton("/dashboard/addProject", "Add Project")}
            {navButton("/dashboard/addNews", "Add News")}
            {navButton("/dashboard/addTeam", "Add Team")}
            {navButton("/dashboard/ad", "Add Ad")}
            {navButton("/dashboard/review", "Add Review")}
            {navButton("/dashboard/partner", "Add Partner")}
            {navButton("/dashboard/home-banner", "Change Home Banner")}
            {navButton("/dashboard/special-day", "Special Day Wish")}
            {navButton("/dashboard/special-day-logo", "Update Special Day Logo")}
          </div>
        </div>

        <div className="container justify-start max-w-[1240px] mx-auto px-4 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}

