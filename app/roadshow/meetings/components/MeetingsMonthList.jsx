"use client";
import { useRouter } from "next/navigation";
import { MdEventNote, MdArrowForward } from "react-icons/md";
import Card from "@/app/dashboard/components/ui/Card";
import PageHeader from "@/app/dashboard/components/ui/PageHeader";

export default function MeetingsMonthList({ meetings = [] }) {
  const router = useRouter();

  const yearMap = meetings.reduce((acc, item) => {
    if (!item.attendDate) return acc;

    const [, monthNum, year] = item.attendDate.split("-");
    const monthKey = `${year}-${String(monthNum).padStart(2, "0")}`;

    if (!acc[year]) acc[year] = {};
    acc[year][monthKey] = (acc[year][monthKey] || 0) + 1;

    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="Meeting Appointments"
        description="Browse booked meetings grouped by month."
      />

      {!meetings.length ? (
        <Card className="flex flex-col items-center justify-center gap-2 py-14 text-center">
          <MdEventNote className="text-3xl text-[#C4CAD4]" />
          <p className="text-sm text-[#8791A1]">No meetings available.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.keys(yearMap)
            .sort((a, b) => b - a)
            .map((year) => (
              <div key={year}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#8791A1]">
                  {year}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.keys(yearMap[year]).map((month) => (
                    <Card
                      key={month}
                      className="group flex cursor-pointer items-center justify-between p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                      onClick={() => router.push(`/roadshow/meetings/${month}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0F2C45]/10 text-[#0F2C45]">
                          <MdEventNote />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-[#1A2233]">
                            {new Date(month + "-01").toLocaleString("default", {
                              month: "long",
                            })}
                          </h3>
                          <p className="text-xs text-[#8791A1]">
                            {yearMap[year][month]} meeting{yearMap[year][month] === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>
                      <MdArrowForward className="text-[#C4CAD4] transition-transform group-hover:translate-x-1 group-hover:text-[#18A4A0]" />
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
