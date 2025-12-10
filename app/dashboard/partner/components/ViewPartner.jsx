"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { userPartnerServices } from "@/services/partnerServices";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import addLogo from "@/public/assets/icons/addlogo.webp";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { URL } from "@/url/axios";
import ReactPaginate from "react-paginate";
import Image from "next/image";

const ViewPartner = (props) => {
  const { setAddPartner, submit, params } = props;
  const pathname = usePathname();
  const [partnerList, setPartnerList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const { getPartnerR, deletePartner } = userPartnerServices();

  useEffect(() => {
    let filtered = partnerList
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setSearchedList(filtered);
  }, [params, partnerList]);

  useEffect(() => {
    getData();
  }, [submit]);

const getData = async () => {
  try {
    const response = await getPartnerR();
    if (response.success) {
      const sorted = response.data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setPartnerList(sorted);
    }
  } catch (err) {
    console.error("Error fetching partners:", err);
  }
};

  const handleEdit = (data) => {
    setAddPartner({
      id: data._id,
      partnername: data.partnername?.replace(/-/g, " ") || "",
      image: data.image,
      partnerdescription: data.partnerdescription
        ? data.partnerdescription
        : "",
    });

     // Update image preview in AddPartner
     props.setImageUrl?.({ image: data.image ? URL + data.image : null });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePartner(id);
      if (response.success) {
        setPartnerList((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Error deleting partner:", err);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = searchedList
    .filter((data) =>
      data.partnername?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(searchedList.length / itemsPerPage);

  return (
    <div className="text-[#000]">
      <table className="w-full border my-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Developer Name</th>
            <th className="p-2 border">Partners Logo</th>
            <th className="p-2 border">Description</th>
            {pathname === "/dashboard/partner" && (
              <>
                <th className="p-2 border">Edit</th>
                <th className="p-2 border">Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((data, i) => (
              <tr key={data._id || i}>
                <td className="p-2 border">
                  {data?.partnername?.replace(/-/g, " ") ||
                    "Partner name not available"}
                </td>
                <td className="p-2 border">
                  <Image
                    width={200}
                    height={70}
                    className="bg-black object-contain h-[70px]"
                    src={data.image ? URL + data.image : addLogo.src}
                    alt="partner-logo"
                  />
                </td>
                <td className="p-2 border">
                  <p className="line-clamp-4 text-xs m-0 text-gray-800">
                    {data?.partnerdescription ||
                      "Partner description not available"}
                  </p>
                </td>
                {pathname === "/dashboard/partner" && (
                  <>
                    <td className="p-2 border text-center">
                      <MdModeEditOutline
                        onClick={() => handleEdit(data)}
                        className="text-blue-600 cursor-pointer inline-block"
                      />
                    </td>
                    <td className="p-2 border text-center">
                      <MdDelete
                        onClick={() => handleDelete(data._id)}
                        className="text-red-600 cursor-pointer inline-block"
                      />
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No partner created yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-5">
        <ReactPaginate
          className="flex gap-2 text-black"
          previousLabel={<IoIosArrowBack className="text-xl" />}
          nextLabel={<IoIosArrowForward className="text-xl" />}
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          activeClassName="font-bold text-blue-500"
          previousClassName="cursor-pointer"
          nextClassName="cursor-pointer"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default ViewPartner;