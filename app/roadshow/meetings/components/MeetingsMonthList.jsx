'use client'
import { useRouter } from "next/navigation";

export default function MeetingsMonthList({ meetings = [] }) {
  const router = useRouter();

  if (!meetings.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No meetings available
      </div>
    );
  }

  // ✅ YEAR → MONTH STRUCTURE
  const yearMap = meetings.reduce((acc, item) => {
    if (!item.attendDate) return acc;

    // DD-MM-YYYY
    const [day, monthNum, year] = item.attendDate.split("-");
    const monthKey = `${year}-${String(monthNum).padStart(2, "0")}`;

    if (!acc[year]) acc[year] = {};
    acc[year][monthKey] = (acc[year][monthKey] || 0) + 1;

    return acc;
  }, {});

  return (
    <div className="p-4 space-y-6">
      {Object.keys(yearMap)
        .sort((a, b) => b - a) // latest year first
        .map(year => (
          <div key={year}>
            {/* YEAR HEADER */}
            <h2 className="text-xl font-bold text-white mb-3">
              {year}
            </h2>

            {/* MONTH GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(yearMap[year]).map(month => (
                <div
                  key={month}
                  onClick={() => router.push(`/roadshow/meetings/${month}`)}
                  className="bg-gray-700 p-4 rounded cursor-pointer hover:bg-[#18A4A0] transition"
                >
                  <h3 className="font-semibold text-white m-0">
                    {new Date(month + "-01").toLocaleString("default", {
                      month: "long",
                    })}
                  </h3>
                  <p className="text-sm text-white m-0">
                    {yearMap[year][month]} Meetings
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
