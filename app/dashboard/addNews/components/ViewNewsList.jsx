"use client";

import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { userNewsServices } from "@/services/newsServices";

const ViewNewsList = ({ setCreateNews, submit, params }) => {
  const [newsList, setNewsList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(30);

  const { getNewsR, deleteNews } = userNewsServices();

  useEffect(() => {
    let filtered = newsList;

    if (params) {
      filtered = newsList
        .filter((data) => data.status === params)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    setSearchedList(filtered);
  }, [params, newsList]);

  useEffect(() => {
    getData();
  }, [submit]);

  const getData = async () => {
    try {
      const response = await getNewsR();
      if (response.success) {
        const sorted = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setNewsList(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
    }
  };

  const handleEdit = (data) => {
    setCreateNews({
      id: data._id,
      newstitle: data.newstitle,
      newsthumbnail: data.newsthumbnail,
      published: data.published,
      newspara1: data.newspara1,
      newspara2: data.newspara2,
      newspara3: data.newspara3,
      newskeyword: data.newskeyword,
      newsdescription: data.newsdescription,
      newsurl: data.newsurl,
      type: data.type,
      alt: data.alt,
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
        const response = await deleteNews(id);
        if (response.success) {
          setNewsList((prevList) => prevList.filter((item) => item._id !== id));
          Swal.fire(
            "Deleted!",
            response.message || "Deleted successfully.",
            "success"
          );
        } else {
          Swal.fire("Failed!", response.message || "Delete failed.", "error");
        }
      } catch (err) {
        Swal.fire("Error", "An error occurred while deleting.", "error");
        console.error("Delete error:", err);
      }
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = searchedList
    .filter((data) =>
      data.newstitle?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(searchedList.length / itemsPerPage);

  return (
    <div>
      <table className="w-full overflow-auto text-[#000] border">
        <thead>
          <tr>
            <th>News Headline</th>
            <th>Publish Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((data, i) => (
              <tr key={i}>
                <td>{data.newstitle}</td>
                <td>{data.published}</td>
                <td className="text-center">
                  <MdModeEditOutline
                    onClick={() => handleEdit(data)}
                    className="text-[1rem] text-center m-auto cursor-pointer text-blue-600"
                  />
                </td>
                <td className="text-center">
                  <MdDelete
                    onClick={() => handleDelete(data._id)}
                    className="text-[1rem] text-center m-auto cursor-pointer text-red-600"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No News updated yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-5 pagination-block">
        <ReactPaginate
          className="flex text-[#000]"
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

export default ViewNewsList;
