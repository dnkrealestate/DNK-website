"use client";
import React, { useEffect, useState } from "react";
import { userRoadshowServices } from "@/services/roadshowService";
import Link from "next/link";

const RegisterView = () => {
  const [registerList, setRegisterList] = useState([]);
  const [searchedEventList, setSearchedEventList] = useState([]);

  const { getClientRegister, deleteRegister, getRoadshow } =
    userRoadshowServices();

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    try {
      const response = await getClientRegister();
      if (response.success) {
        const eventArray = response.data;

        const eventMap = {};

        eventArray.forEach((item) => {
          const event = item.eventName || "Unnamed Event";
          if (!eventMap[event]) {
            eventMap[event] = {
              eventName: event,
              count: 1,
              latestUpdate: new Date(item.updatedAt),
            };
          } else {
            eventMap[event].count += 1;

            const currentLatest = new Date(eventMap[event].latestUpdate);
            const newUpdated = new Date(item.updatedAt);

            if (newUpdated > currentLatest) {
              eventMap[event].latestUpdate = newUpdated;
            }
          }
        });

        // Convert to array and sort by latest update (descending)
        const eventCountsArray = Object.values(eventMap).sort(
          (a, b) => b.latestUpdate - a.latestUpdate
        );

        setSearchedEventList(eventCountsArray);
      }
    } catch (err) {
      console.error("Error fetching event list:", err);
    }
  };

  return (
    <div className="about-section w-full bg-[#121215]">
      <div className="py-5 sm:px-4 md:py-9 relative">
        <h1 className="p-1">Registration Dashboard</h1>
        <div className="w-full relative grid grid-cols-2 md:grid-cols-3 gap-1">
          {searchedEventList.map((data, i) => {
            const slug = generateSlug(data.eventName);

            return (
              <Link
                href={`/roadshow/client-register/${slug}`}
                key={i}
                className="bg-gray-700 rounded-2xl py-5 md:py-10 px-3 sm:px-6 m-2 relative cursor-pointer group hover:bg-[#18A4A0]"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-[0.8rem] md:text-[1rem] group-hover:text-white text-gray-500 font-semibold">
                      Event Name
                    </h2>
                    <h3 className="text-[0.8rem] md:text-[1rem] m-0 text-[#fff]">
                      {data.eventName}
                    </h3>
                  </div>
                  <div>
                    <h2 className="text-[0.5rem] md:text-[1rem] group-hover:text-white text-gray-500 font-semibold">
                      Count
                    </h2>
                    <h3 className="text-[0.8rem] md:text-[1rem] m-0 text-center text-[#fff]">
                      {data.count}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
