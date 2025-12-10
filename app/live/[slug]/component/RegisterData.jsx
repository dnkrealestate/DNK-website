"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { userRoadshowServices } from "@/services/roadshowService";

const RegisterData = () => {
     const params = useParams();
      const slug = params?.slug;
    
      const [searchedRegisterList, setSearchedRegisterList] = useState([]);
      const [leadingRm, setLeadingRm] = useState({ name: "N/A", count: 0 });
      const [highlight, setHighlight] = useState(false);
    
      const prevCountRef = useRef(0);
      const prevLeadingRmRef = useRef("");
      const notificationSoundRef = useRef(null);
      const soundEnabledRef = useRef(false); 
      
    
      const { getRoadshowLinkById, getClientRegister } = userRoadshowServices();
    
     useEffect(() => {
       const enableSound = () => {
         const audio = new Audio("/assets/sounds/Notification.mp3");
         audio.load(); 
    
         audio
           .play()
           .then(() => {
             soundEnabledRef.current = true;
             notificationSoundRef.current = audio; 
             console.log("🔊 Sound enabled and preloaded.");
           })
           .catch((err) => {
             console.warn("⚠️ Could not auto-play sound:", err.message);
           });
    
         document.removeEventListener("click", enableSound);
       };
    
       document.addEventListener("click", enableSound);
     }, [])
      
      // Polling setup
       useEffect(() => {
         const fetchData = async () => {
           try {
             const response = await getClientRegister();
             if (response.success) {
               const sorted = response.data.sort(
                 (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
               );
               const filtered = sorted.filter(
                 (item) =>
                   item?.eventplace?.trim().toLowerCase() ===
                   slug?.trim().toLowerCase()
               );
    
               const rmCountMap = filtered.reduce((acc, curr) => {
                 const rm = curr.sourcedRm || "Unknown";
                 acc[rm] = (acc[rm] || 0) + 1;
                 return acc;
               }, {});
    
               // Determine leading RM
               const entries = Object.entries(rmCountMap);
               const top = entries.sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];
               const [topRm, topCount] = top;
    
               // Notify if new entry or leading RM changes
               const newCount = filtered.length;
    
               if (soundEnabledRef.current && newCount > prevCountRef.current) {
                 try {
                   const audio = notificationSoundRef.current; // ✅ Use correct ref
    
                   if (audio) {
                     audio.currentTime = 0; // reset to start
                     audio.play().catch((err) => {
                       console.warn("🔕 Failed to play sound:", err.message);
                     });
                   }
                 } catch (error) {
                   console.error(
                     "Error while playing notification:",
                     error.message
                   );
                 }
               }
    
               // ✅ Trigger animation
               if (newCount !== prevCountRef.current) {
                 setHighlight(true);
                 setTimeout(() => setHighlight(false), 3000);
               }
    
               prevCountRef.current = newCount;
               prevLeadingRmRef.current = topRm;
    
               setSearchedRegisterList(filtered);
               setLeadingRm({ name: topRm, count: topCount });
             }
           } catch (error) {
             console.error("Polling error:", error);
           }
         };
    
         fetchData(); // initial fetch
         const interval = setInterval(fetchData, 10000); // poll every 10 sec
         return () => clearInterval(interval);
       }, [slug]);
    
  return (
    <div>
      <div
        className={`bg-gray-700 rounded-2xl py-5 md:py-10 px-3 sm:px-6 m-4 relative ${
          highlight ? "animate-greenPulse" : ""
        }`}
      >
        <h2 className="text-[1rem] text-center md:text-left font-normal md:font-semibold">
          Event Registration Leading RM
        </h2>
        <div className="flex justify-between ">
          <h3 className="text-[1.3rem] md:text-[2rem] m-0 text-[#fff]">
            {leadingRm.name}
          </h3>
          <h3 className="text-[1.3rem] md:text-[2rem] m-0 text-[#fff]">
            {leadingRm.count.toString().padStart(2, "0")}
          </h3>
        </div>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th colSpan={2} className="bg-[#FFC700] text-[#000] py-1">
              Event Registration
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-[#fff]">Sourced RM</th>
            <th className="text-[#fff]">Registered</th>
          </tr>
          {Object.entries(
            searchedRegisterList.reduce((acc, curr) => {
              const key = curr.sourcedRm || "Unknown";
              acc[key] = (acc[key] || 0) + 1;
              return acc;
            }, {})
          ).map(([rm, count], index) => (
            <tr key={index}>
              <td className="text-[#fff]">{rm}</td>
              <td className="text-center text-[#fff]">{count}</td>
            </tr>
          ))}

          <tr>
            <th className="text-[#fff]">Total:</th>
            <td className="text-center text-[#fff]">
              {searchedRegisterList.length}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RegisterData