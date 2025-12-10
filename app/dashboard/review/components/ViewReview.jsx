"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { userReviewServices } from "@/services/reviewServices";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

const ViewReview = (props) => {
  const { setAddReview, submit, params } = props;
  const [reviewList, setReviewList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const { getReviewR, deleteReview } = userReviewServices();

  const pathname = usePathname();

  useEffect(() => {
    setSearchedList([...reviewList]);
  }, [params, reviewList]);

  useEffect(() => {
    getData();
  }, [submit]);

  const getData = async () => {
    try {
      const response = await getReviewR();
      if (response.success) {
        setReviewList(response.data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleEdit = (data) => {
    setAddReview({
      id: data._id,
      image: data.image,
      name: data.name,
      message: data.message,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteReview(id);
      if (response.success) {
        setReviewList((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  return (
    <div>
      <table className="w-full border border-gray-300 my-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Message</th>
            {pathname === "/dashboard/review" && (
              <>
                <th className="p-2 border">Edit</th>
                <th className="p-2 border">Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {searchedList.length > 0 ? (
            searchedList.map((data, i) => (
              <tr key={data._id || i}>
                <td className="p-2 border">{data.name}</td>
                <td className="p-2 border">{data.message}</td>
                {pathname === "/dashboard/review" && (
                  <>
                    <td className="text-center border">
                      <MdModeEditOutline
                        onClick={() => handleEdit(data)}
                        className="text-blue-600 cursor-pointer mx-auto"
                      />
                    </td>
                    <td className="text-center border">
                      <MdDelete
                        onClick={() => handleDelete(data._id)}
                        className="text-red-600 cursor-pointer mx-auto"
                      />
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No review created yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewReview;
