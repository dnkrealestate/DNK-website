"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdDelete, MdModeEditOutline, MdInsights, MdEvent } from "react-icons/md";
import Swal from "sweetalert2";
import { userRoadshowServices } from "@/services/roadshowService";
import Card from "@/app/dashboard/components/ui/Card";

const RoadshowList = (props) => {
  const { setAddRoadshow, submit } = props;
  const [roadshowList, setRoadshowList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getRoadshow, deleteRoadshow } = userRoadshowServices();
  const router = useRouter();

  useEffect(() => {
    getRoadshowData();
  }, [submit]);

  const getRoadshowData = async () => {
    try {
      const response = await getRoadshow();
      if (response.success) {
        const sortedProjects = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setRoadshowList(sortedProjects);
      }
    } catch (err) {
      console.error("Error fetching roadshow data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    setAddRoadshow({
      id: data._id,
      name: data.name,
      address: data.address,
      date: data.date,
      date2: data.date2,
      hotelName: data.hotelName,
      place: data.place,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this roadshow?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await deleteRoadshow(id);
      if (response.success) {
        setRoadshowList((prevList) => prevList.filter((item) => item._id !== id));
        Swal.fire("Deleted", "The roadshow has been removed.", "success");
      } else {
        Swal.fire("Failed", "Failed to delete the roadshow.", "error");
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const handleResultClick = (place) => {
    const slug = place.replace(/\s+/g, "-").toLowerCase();
    router.push(`/live/${slug}`);
  };

  const handleCardClick = (place) => {
    const slug = place.replace(/\s+/g, "-").toLowerCase();
    router.push(`/link/${slug}`);
  };

  const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8791A1]";
  const td = "px-4 py-3 text-sm text-[#33394B]";

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#E5E8EE] px-5 py-4">
        <h3 className="text-sm font-semibold text-[#1A2233]">All Roadshows</h3>
      </div>

      {loading ? (
        <div className="py-14 text-center text-sm text-[#8791A1]">Loading roadshows...</div>
      ) : roadshowList.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-14 text-center">
          <MdEvent className="text-3xl text-[#C4CAD4]" />
          <p className="text-sm text-[#8791A1]">No roadshows created yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead className="bg-[#F8F9FB]">
              <tr>
                <th className={th}>Event Name</th>
                <th className={th}>Hotel Name</th>
                <th className={th}>Address</th>
                <th className={th}>Place</th>
                <th className={th}>Day 1</th>
                <th className={th}>Day 2</th>
                <th className={th}>Insights</th>
                <th className={`${th} text-center`}>Edit</th>
                <th className={`${th} text-center`}>Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F4]">
              {roadshowList.map((data) => (
                <tr key={data._id} className="hover:bg-[#F8F9FB]">
                  <td
                    className={`${td} cursor-pointer font-medium text-[#0F2C45] hover:underline`}
                    onClick={() => handleCardClick(data.place)}
                    title="Open public registration link"
                  >
                    {data.name}
                  </td>
                  <td className={td}>{data.hotelName}</td>
                  <td className={td}>{data.address}</td>
                  <td className={td}>{data.place}</td>
                  <td className={td}>{data.date}</td>
                  <td className={td}>{data.date2}</td>
                  <td className={td}>
                    <button
                      onClick={() => handleResultClick(data.place)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F2C45]/10 px-3 py-1.5 text-xs font-medium text-[#0F2C45] hover:bg-[#0F2C45]/15"
                    >
                      <MdInsights /> Insights
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleEdit(data)}
                      className="text-lg text-[#0F2C45]/70 hover:text-[#0F2C45]"
                      title="Edit"
                    >
                      <MdModeEditOutline />
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="text-lg text-red-400 hover:text-red-600"
                      title="Delete"
                    >
                      <MdDelete />
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
};

export default RoadshowList;
