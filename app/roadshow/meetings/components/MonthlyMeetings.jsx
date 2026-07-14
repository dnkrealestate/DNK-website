"use client";
import { useParams, useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import MeetingsList from "./MeetingsList";
import Card from "@/app/dashboard/components/ui/Card";

export default function MonthlyMeetings({ meetings = [] }) {
  const { slug: month } = useParams();
  const router = useRouter();

  const monthlyData = meetings.filter((item) => {
    if (!item.attendDate) return false;
    const [, monthNum, year] = item.attendDate.split("-");
    const key = `${year}-${String(monthNum).padStart(2, "0")}`;
    return key === month;
  });

  return (
    <div>
      <button
        onClick={() => router.push("/roadshow/meetings")}
        className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#4B5566] hover:text-[#0F2C45]"
      >
        <MdArrowBack /> Back to months
      </button>

      <h1 className="mb-5 text-xl font-semibold text-[#1A2233]">
        {new Date(month + "-01").toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}{" "}
        Meetings
      </h1>

      {!monthlyData.length ? (
        <Card className="py-14 text-center text-sm text-[#8791A1]">Loading...</Card>
      ) : (
        <MeetingsList meetings={monthlyData} />
      )}
    </div>
  );
}
