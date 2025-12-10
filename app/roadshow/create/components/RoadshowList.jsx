"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { userRoadshowServices } from "@/services/roadshowService";

const RoadshowList = (props) => {
  const { setAddRoadshow, submit, params } = props;
  const [roadshowList, setRoadshowList] = useState([]);
  const [searchedRoadshowListList, setSearchedRoadshowList] = useState([]);
  const { getRoadshow, deleteRoadshow } = userRoadshowServices();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getRoadshowData();
  }, [submit]);

  useEffect(() => {
    const tempList = roadshowList
      .filter((data) => data.status == params)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    setSearchedRoadshowList(tempList);
  }, [roadshowList, params]);

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
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteRoadshow(id);
      if (response.success) {
        setRoadshowList((prevList) =>
          prevList.filter((item) => item._id !== id)
        );
      } else {
        console.error("Failed to delete");
      }
    } catch (err) {
      console.error("Error during deletion:", err);
    }
  };

  const handleCardClick = (place) => {
    const slug = place.replace(/\s+/g, "-").toLowerCase();
    router.push(`/link/${slug}`);
  };

   const handleResultClick = (place) => {
     const slug = place.replace(/\s+/g, "-").toLowerCase();
     router.push(`/live/${slug}`);
   };

  return (
    <div className="overflow-hidden relative">
      <div className="overflow-x-auto max-h-full">
        <table className="w-full border overflow-auto text-[0.8rem]">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Hotel Name</th>
              <th>Event Address</th>
              <th>Place Name</th>
              <th>Event Date Day1</th>
              <th>Event Date Day2</th>
              <th>Result</th>
              {pathname === "/roadshow/create" && <th>Edit</th>}
              {pathname === "/roadshow/create" && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {searchedRoadshowListList.length > 0 ? (
              searchedRoadshowListList.map((data, i) => (
                <tr key={i}>
                  <td
                    className="cursor-pointer text-blue-600 hover:underline"
                    onClick={() => handleCardClick(data.place)}
                  >
                    {data.name}
                  </td>
                  <td>{data.hotelName}</td>
                  <td>{data.address}</td>
                  <td>{data.place}</td>
                  <td>{data.date}</td>
                  <td>{data.date2}</td>
                  <td>
                    <button
                      onClick={() => handleResultClick(data.place)}
                      className="bg-[#00A3FF] hover:bg-[#6A9F43] px-[10px] py-[5px] rounded-md text-[#ffffff]"
                    >
                      Insights
                    </button>
                  </td>
                  {pathname === "/roadshow/create" && (
                    <td className="text-center">
                      <MdModeEditOutline
                        onClick={() => handleEdit(data)}
                        className="text-[1rem] m-auto cursor-pointer text-[#00A3FF]"
                      />
                    </td>
                  )}
                  {pathname === "/roadshow/create" && (
                    <td className="text-center">
                      <MdDelete
                        onClick={() => handleDelete(data._id)}
                        className="text-[1rem] m-auto cursor-pointer text-[#FF0202]"
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No roadshows created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoadshowList;
