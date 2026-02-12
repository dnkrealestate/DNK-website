'use client'
import React, { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { userRoadshowServices } from '@/services/roadshowService';

export default function MeetingsList({ meetings = [] }) {
  const { deleteMeeting } = userRoadshowServices();

  // Local state for meetings so we can update after deletion
  const [meetingList, setMeetingList] = useState(meetings);

  // Update local state if prop changes
  useEffect(() => {
    setMeetingList(meetings);
  }, [meetings]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this meeting?")) return;

    try {
      const response = await deleteMeeting(id);
      if (response.success) {
        setMeetingList((prevList) =>
          prevList.filter((item) => item._id !== id)
        );
      } else {
        alert("Failed to delete meeting");
        console.error("Failed to delete", response);
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      alert("An error occurred while deleting the meeting");
    }
  };

  return (
    <div className="overflow-auto">
      <table className="w-full border text-[0.8rem]">
        <thead className="bg-gray-100 text-[#000]">
          <tr>
            <th>Source RM</th>
            <th>Client</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Project Location</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {meetingList.length > 0 ? (
            meetingList.map((data, i) => (
              <tr key={i} className="border-b">
                <td>{data.sourcedRm}</td>
                <td>{data.fullName}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
                <td>{data.attendDate}</td>
                <td>{data.attendTime}</td>
                <td>{data.projectLocation}</td>
                <td className="text-center">
                  <MdDelete
                    onClick={() => handleDelete(data._id)}
                    className="cursor-pointer text-[#FF0202]"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No meetings found for this month
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
