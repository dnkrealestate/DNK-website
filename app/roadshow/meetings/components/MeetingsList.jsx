"use client";
import React, { useState, useEffect } from "react";
import { MdDelete, MdEventNote } from "react-icons/md";
import Swal from "sweetalert2";
import { userRoadshowServices } from "@/services/roadshowService";
import Card from "@/app/dashboard/components/ui/Card";

export default function MeetingsList({ meetings = [] }) {
  const { deleteMeeting } = userRoadshowServices();
  const [meetingList, setMeetingList] = useState(meetings);

  useEffect(() => {
    setMeetingList(meetings);
  }, [meetings]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this meeting?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await deleteMeeting(id);
      if (response.success) {
        setMeetingList((prevList) => prevList.filter((item) => item._id !== id));
        Swal.fire("Deleted", "The meeting has been removed.", "success");
      } else {
        Swal.fire("Failed", "Failed to delete meeting.", "error");
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8791A1] whitespace-nowrap";
  const td = "px-4 py-3 text-sm text-[#33394B] whitespace-nowrap";

  return (
    <Card className="overflow-hidden">
      {meetingList.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-14 text-center">
          <MdEventNote className="text-3xl text-[#C4CAD4]" />
          <p className="text-sm text-[#8791A1]">No meetings found for this month.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead className="bg-[#F8F9FB]">
              <tr>
                <th className={th}>Source RM</th>
                <th className={th}>Client</th>
                <th className={th}>Phone</th>
                <th className={th}>Email</th>
                <th className={th}>Date</th>
                <th className={th}>Time</th>
                <th className={th}>Project Location</th>
                <th className={`${th} text-center`}>Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F4]">
              {meetingList.map((data) => (
                <tr key={data._id} className="hover:bg-[#F8F9FB]">
                  <td className={`${td} font-medium text-[#1A2233]`}>{data.sourcedRm}</td>
                  <td className={td}>{data.fullName}</td>
                  <td className={td}>{data.phone}</td>
                  <td className={td}>{data.email}</td>
                  <td className={td}>{data.attendDate}</td>
                  <td className={td}>{data.attendTime}</td>
                  <td className={td}>{data.projectLocation}</td>
                  <td className="text-center">
                    <button onClick={() => handleDelete(data._id)} title="Delete">
                      <MdDelete className="cursor-pointer text-lg text-red-400 hover:text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
