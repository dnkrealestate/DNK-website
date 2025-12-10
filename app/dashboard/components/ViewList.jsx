"use client";

import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { useProjectServices } from "../../../services/projectServices";

export const ViewList = ({ setCreateProject, submit, params }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [projectList, setProjectList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(30);

  const { getProjectListR, deleteProjectList } = useProjectServices();

  useEffect(() => {
    getData();
  }, [submit]);

  useEffect(() => {
    let tempList = projectList;
    if (params !== "allProject" && params) {
      tempList = projectList
        .filter((data) => data.status === params)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    setSearchedList(tempList);
  }, [params, projectList]);

  const getData = async () => {
    try {
      const response = await getProjectListR();
      if (response.success) {
        const sortedProjects = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setProjectList(sortedProjects);
      }
    } catch (err) {
      console.error("Failed to fetch project list:", err);
    }
  };

  const handleEdit = (data) => {
    setCreateProject({
      id: data._id,
      projectname: data.projectname,
      thumbnail: data.thumbnail,
      developer: data.developer,
      type: data.type,
      type2: data.type2,
      type3: data.type3,
      type4: data.type4,
      type5: data.type5,
      type6: data.type6,
      bedroom: data.bedroom,
      handover: data.handover,
      totalarea: data.totalarea,
      coverimage: data.coverimage,
      bannertitile: data.bannertitile,
      bannersubtitile: data.bannersubtitile,
      gallary1: data.gallary1,
      gallary2: data.gallary2,
      gallary3: data.gallary3,
      mainhead: data.mainhead,
      about: data.about,
      about1: data.about1,
      about2: data.about2,
      startingprice: data.startingprice,
      locationname: data.locationname,
      location: data.location,
      nearby1: data.nearby1,
      dec1: data.dec1,
      nearby2: data.nearby2,
      dec2: data.dec2,
      nearby3: data.nearby3,
      dec3: data.dec3,
      nearby4: data.nearby4,
      dec4: data.dec4,
      status: data.status,
      pointhead: data.pointhead,
      point1: data.point1,
      point2: data.point2,
      point3: data.point3,
      point4: data.point4,
      point5: data.point5,
      point6: data.point6,
      point7: data.point7,
      point8: data.point8,
      runingstatus: data.runingstatus,
      youtubeid: data.youtubeid,
      developerlogo: data.developerlogo,
      projectlogo: data.projectlogo,
      downpayment: data.downpayment,
      paymentplan: data.paymentplan,
      projectkeyword: data.projectkeyword,
      projectdescription: data.projectdescription,
      altprojectlogo: data.altprojectlogo,
      altthumbnail: data.altthumbnail,
      altcoverimage: data.altcoverimage,
      altgallary1: data.altgallary1,
      altgallary2: data.altgallary2,
      altgallary3: data.altgallary3,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteProjectList(id);
        if (response.success) {
          setProjectList((prev) => prev.filter((item) => item._id !== id));
          Swal.fire(
            "Deleted!",
            response.message || "Project deleted.",
            "success"
          );
        } else {
          Swal.fire("Failed", response.message || "Failed to delete.", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Error occurred while deleting.", "error");
        console.error(err);
      }
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const filteredItems = searchedList.filter((data) =>
    data.projectname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div>
      <table className="w-full border overflow-auto text-[#000]">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Developer</th>
            <th>Type</th>
            <th>Handover Date</th>
            <th>Status</th>
            {pathname === "/dashboard/addProject" && <th>Edit</th>}
            {pathname === "/dashboard/addProject" && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((data, i) => (
              <tr key={data._id}>
                <td>{data.projectname}</td>
                <td>{data.developer}</td>
                <td>{data.type}</td>
                <td>{data.handover}</td>
                <td>{data.status}</td>
                {pathname === "/dashboard/addProject" && (
                  <td className="text-center">
                    <MdModeEditOutline
                      onClick={() => handleEdit(data)}
                      className="cursor-pointer text-blue-600"
                    />
                  </td>
                )}
                {pathname === "/dashboard/addProject" && (
                  <td className="text-center">
                    <MdDelete
                      onClick={() => handleDelete(data._id)}
                      className="cursor-pointer text-red-600"
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-5 text-[#000]">
        <ReactPaginate
          className="flex gap-2"
          previousLabel={<IoIosArrowBack className="text-[1.5rem]" />}
          nextLabel={<IoIosArrowForward className="text-[1.5rem]" />}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"previous-button"}
          nextClassName={"next-button"}
          disabledClassName={"disabled"}
        />
      </div>
    </div>
  );
};

export default ViewList;
