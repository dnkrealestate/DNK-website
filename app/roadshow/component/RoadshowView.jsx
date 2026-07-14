"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdEvent, MdSearch, MdArrowForward } from "react-icons/md";
import { userRoadshowServices } from "@/services/roadshowService";
import Card from "@/app/dashboard/components/ui/Card";
import PageHeader from "@/app/dashboard/components/ui/PageHeader";
import { Input } from "@/app/dashboard/components/ui/Field";

const RoadshowView = () => {
  const [searchedEventList, setSearchedEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const { getRoadshowRegister } = userRoadshowServices();

  const generateSlug = (name) =>
    name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    try {
      const response = await getRoadshowRegister();
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
            const newUpdated = new Date(item.updatedAt);
            if (newUpdated > eventMap[event].latestUpdate) {
              eventMap[event].latestUpdate = newUpdated;
            }
          }
        });

        const eventCountsArray = Object.values(eventMap).sort(
          (a, b) => b.latestUpdate - a.latestUpdate
        );

        setSearchedEventList(eventCountsArray);
      }
    } catch (err) {
      console.error("Error fetching event list:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredList = searchedEventList.filter((data) =>
    data.eventName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Event Dashboard"
        description="Browse roadshow events and open their client registration lists."
      />

      <div className="mb-5 max-w-sm">
        <Input
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <Card className="flex items-center justify-center py-16 text-sm text-[#8791A1]">
          Loading events...
        </Card>
      ) : filteredList.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-2 py-14 text-center">
          <MdEvent className="text-3xl text-[#C4CAD4]" />
          <p className="text-sm text-[#8791A1]">
            {searchedEventList.length === 0
              ? "No events yet. Create a roadshow to get started."
              : "No events match your search."}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredList.map((data, i) => {
            const slug = generateSlug(data.eventName);
            return (
              <Link href={`/roadshow/register/${slug}`} key={i}>
                <Card className="group flex h-full flex-col justify-between p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0F2C45]/10 text-[#0F2C45]">
                      <MdEvent className="text-xl" />
                    </div>
                    <MdArrowForward className="mt-2 text-[#C4CAD4] transition-transform group-hover:translate-x-1 group-hover:text-[#18A4A0]" />
                  </div>
                  <div className="mt-4">
                    <h3 className="truncate text-sm font-semibold text-[#1A2233]" title={data.eventName}>
                      {data.eventName}
                    </h3>
                    <p className="mt-1 text-xs text-[#8791A1]">
                      {data.count} registration{data.count === 1 ? "" : "s"}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoadshowView;
