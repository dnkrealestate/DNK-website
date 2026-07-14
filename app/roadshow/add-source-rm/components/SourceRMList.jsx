"use client";

import React, { useEffect, useState } from "react";
import { MdDelete, MdModeEditOutline, MdPersonAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { userRoadshowServices } from "@/services/roadshowService";
import Card from "@/app/dashboard/components/ui/Card";

const SourceRMList = (props) => {
  const { setAddSourceRM, submit } = props;
  const [sourceRMList, setSourceRMList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getSourceRM, deleteSourceRM } = userRoadshowServices();

  useEffect(() => {
    getSourceRMData();
  }, [submit]);

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
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    setAddSourceRM({
      id: data._id,
      name: data.name,
      email: data.email,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this source RM?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await deleteSourceRM(id);
      if (response.success) {
        setSourceRMList((prevList) => prevList.filter((item) => item._id !== id));
        Swal.fire("Deleted", "The source RM has been removed.", "success");
      } else {
        Swal.fire("Failed", "Failed to delete.", "error");
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8791A1]";
  const td = "px-4 py-3 text-sm text-[#33394B]";

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#E5E8EE] px-5 py-4">
        <h3 className="text-sm font-semibold text-[#1A2233]">All Source RMs</h3>
      </div>

      {loading ? (
        <div className="py-14 text-center text-sm text-[#8791A1]">Loading...</div>
      ) : sourceRMList.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-14 text-center">
          <MdPersonAdd className="text-3xl text-[#C4CAD4]" />
          <p className="text-sm text-[#8791A1]">No source RM created yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse">
            <thead className="bg-[#F8F9FB]">
              <tr>
                <th className={th}>Name</th>
                <th className={th}>Email</th>
                <th className={`${th} text-center`}>Edit</th>
                <th className={`${th} text-center`}>Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F4]">
              {sourceRMList.map((data) => (
                <tr key={data._id} className="hover:bg-[#F8F9FB]">
                  <td className={`${td} font-medium text-[#1A2233]`}>{data.name}</td>
                  <td className={td}>{data.email}</td>
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

export default SourceRMList;
