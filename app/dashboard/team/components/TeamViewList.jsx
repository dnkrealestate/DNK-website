"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { userTeamServices } from "../../../../services/teamServices";

export default function TeamViewList({ setCreateTeam, submit, params }) {
  const pathname = usePathname();
  const [teamList, setTeamList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(20);
  const { getTeamListR, deleteTeamList } = userTeamServices();

  useEffect(() => {
    getData();
  }, [submit]);

  useEffect(() => {
    let tempList = teamList;
    if (params) {
      tempList = teamList
        .filter((data) => data.status === params)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    setSearchedList(tempList);
  }, [params, teamList]);

  const getData = async () => {
    try {
      const response = await getTeamListR();
      if (response.success) {
        const sorted = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setTeamList(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch team list:", err);
    }
  };

  const handleEdit = (data) => {
    setCreateTeam({
      id: data._id,
      image: data.image,
      sliderimg: data.sliderimg,
      name: data.name,
      position: data.position,
      experience: data.experience,
      specialization: data.specialization,
      language: data.language,
      email: data.email,
      phone: data.phone,
      department: data.department,
      aboutpara1: data.aboutpara1,
      aboutpara2: data.aboutpara2,
      aboutpara3: data.aboutpara3,
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTeamList(id);
      if (response.success) {
        setTeamList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete team member");
      }
    } catch (err) {
      console.error("Error deleting team member:", err);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = searchedList
    .filter((data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(searchedList.length / itemsPerPage);

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="pt-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3 text-[#000] border-[#000]"
        />
      </div>

      {/* Table */}
      <table className="w-full border overflow-auto my-4 text-[#000]">
        <thead>
          <tr className="text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Department</th>
            <th className="p-2">Specialization</th>
            <th className="p-2">Phone</th>
            {pathname === "/dashboard/addTeam" && <th className="p-2">Edit</th>}
            {pathname === "/dashboard/addTeam" && (
              <th className="p-2">Delete</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((data) => (
              <tr key={data._id}>
                <td className="p-2">{data.name}</td>
                <td className="p-2">{data.position}</td>
                <td className="p-2">{data.department}</td>
                <td className="p-2">{data.specialization}</td>
                <td className="p-2">{data.phone}</td>
                {pathname === "/dashboard/addTeam" && (
                  <td className="text-center">
                    <MdModeEditOutline
                      onClick={() => handleEdit(data)}
                      className="text-[1.2rem] m-auto cursor-pointer text-blue-600"
                    />
                  </td>
                )}
                {pathname === "/dashboard/addTeam" && (
                  <td className="text-center">
                    <MdDelete
                      onClick={() => handleDelete(data._id)}
                      className="text-[1.2rem] m-auto cursor-pointer text-red-600"
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No team member found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-5 pagination-block">
        <ReactPaginate
          className="flex gap-2 text-[#000]"
          previousLabel={<IoIosArrowBack className="text-[1.5rem]" />}
          nextLabel={<IoIosArrowForward className="text-[1.5rem]" />}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"font-bold text-blue-600"}
          previousClassName={"px-2"}
          nextClassName={"px-2"}
          disabledClassName={"text-gray-400"}
        />
      </div>
    </div>
  );
}
