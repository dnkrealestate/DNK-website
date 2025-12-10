"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { userRoadshowServices } from "@/services/roadshowService";

const SourceRMList = (props) => {
  const { setAddSourceRM, submit, params } = props;
  const [sourceRMList, setSourceRMList] = useState([]);
  const [searchedSourceRMList, setSearchedSourceRMList] = useState([]);
  const { getSourceRM, deleteSourceRM } = userRoadshowServices();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getSourceRMData();
  }, [submit]);

  useEffect(() => {
    const tempList = sourceRMList
      .filter((data) => data.status == params)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    setSearchedSourceRMList(tempList);
  }, [sourceRMList, params]);

  const getSourceRMData = async () => {
    try {
      const response = await getSourceRM();
      if (response.success) {
        const sortedProjects = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setSourceRMList(sortedProjects);
      }
    } catch (err) {
      console.error("Error fetching sourceRM data:", err);
    }
  };

  const handleEdit = (data) => {
    setAddSourceRM({
      id: data._id,
      name: data.name,
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteSourceRM(id);
      if (response.success) {
        setSourceRMList((prevList) =>
          prevList.filter((item) => item._id !== id)
        );
      } else {
        console.error("Failed to delete");
      }
    } catch (err) {
      console.error("Error during deletion:", err);
    }
  };

  return (
    <div className="overflow-hidden relative">
      <div className="overflow-x-auto max-h-full">
        <table className="w-full border overflow-auto text-[0.8rem]">
          <thead>
            <tr>
              <th>SourceRM Name</th>
              {pathname === "/roadshow/add-source-rm" && <th>Edit</th>}
              {pathname === "/roadshow/add-source-rm" && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {searchedSourceRMList.length > 0 ? (
              searchedSourceRMList.map((data, i) => (
                <tr key={i}>
                  <td>{data.name}</td>
                  {pathname === "/roadshow/add-source-rm" && (
                    <td className="text-center">
                      <MdModeEditOutline
                        onClick={() => handleEdit(data)}
                        className="text-[1rem] m-auto cursor-pointer text-[#00A3FF]"
                      />
                    </td>
                  )}
                  {pathname === "/roadshow/add-source-rm" && (
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
                  No sourceRM created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SourceRMList;
