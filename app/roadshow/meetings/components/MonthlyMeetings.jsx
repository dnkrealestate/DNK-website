'use client'
import { useParams } from "next/navigation";
import MeetingsList from "./MeetingsList";

export default function MonthlyMeetings({ meetings = [] }) {
  const { slug: month } = useParams(); // YYYY-MM

  const monthlyData = meetings.filter(item => {
    if (!item.attendDate) return false;

   const [day, monthNum, year] = item.attendDate.split("-");
    const key = `${year}-${String(monthNum).padStart(2, "0")}`;

    return key === month;
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        {new Date(month + '-01').toLocaleString('default', {
          month: 'long',
          year: 'numeric'
        })} Meetings
      </h2>

      {!monthlyData.length ? (
        <div className="text-center py-10 text-gray-500">
          Loading...
        </div>
      ) : (
        <MeetingsList meetings={monthlyData} />
      )}
    </div>
  );
}
