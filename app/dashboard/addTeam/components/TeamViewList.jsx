"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { userTeamServices } from "@/services/teamServices";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";

const TeamViewList = (props) => {
  const { setCreateTeam, submit, params } = props;
  const [teamList, setTeamList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(20);

  const pathname = usePathname();
  const { getTeamListR, deleteTeamList } = userTeamServices();

  useEffect(() => {
    let tempList = teamList
      .filter((data) => data.status === params)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setSearchedList(tempList);
  }, [params, teamList]);

  useEffect(() => {
    getData();
  }, [submit]);

  const getData = async () => {
    try {
      const response = await getTeamListR();

      if (response?.data && Array.isArray(response.data)) {
        const sorted = response.data.sort((a, b) => {
          const orderA = Number(a.ordernumber);
          const orderB = Number(b.ordernumber);

          const hasOrderA = !isNaN(orderA);
          const hasOrderB = !isNaN(orderB);

          if (hasOrderA && hasOrderB) {
            return orderA - orderB; // sort ascending
          }
          if (hasOrderA) return -1; // a has order, goes first
          if (hasOrderB) return 1; // b has order, goes first
          return 0; // both empty, keep relative order
        });

        setTeamList(sorted);
      } else {
        setTeamList([]);
      }
    } catch (err) {
      console.error("Error fetching team list:", err);
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
      ordernumber: data.ordernumber,
    });

     window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTeamList(id);
      if (response.success) {
        setTeamList((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = searchedList
    .filter((data) =>
      data.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(searchedList.length / itemsPerPage);

  return (
    <div>
      <table className="w-full border overflow-auto my-4">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Specialization</th>
            <th>Phone</th>
            {pathname === "/dashboard/addTeam" && <th></th>}
            {pathname === "/dashboard/addTeam" && <th></th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((data, i) => (
              <tr key={data._id}>
                <td>{data.ordernumber}</td>
                <td>{data.name}</td>
                <td>{data.position}</td>
                <td>{data.department}</td>
                <td>{data.specialization}</td>
                <td>{data.phone}</td>
                {pathname === "/dashboard/addTeam" && (
                  <td className="text-center">
                    <MdModeEditOutline
                      onClick={() => handleEdit(data)}
                      className="text-[1rem] cursor-pointer text-blue-600"
                    />
                  </td>
                )}
                {pathname === "/dashboard/addTeam" && (
                  <td className="text-center">
                    <MdDelete
                      onClick={() => handleDelete(data._id)}
                      className="text-[1rem] cursor-pointer text-red-600"
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No team member found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-5">
        <ReactPaginate
          className="flex text-[#000] gap-2 "
          previousLabel={<IoIosArrowBack className="text-[1.5rem]" />}
          nextLabel={<IoIosArrowForward className="text-[1.5rem]" />}
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          previousClassName="previous-button"
          nextClassName="next-button"
          disabledClassName="disabled"
        />
      </div>
    </div>
  );
};

export default TeamViewList;
