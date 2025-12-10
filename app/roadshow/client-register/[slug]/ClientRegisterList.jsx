"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { userRoadshowServices } from "@/services/roadshowService";

const ClientRegisterList = () => {
  const [registerList, setRegisterList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [eventFilter, setEventFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedEventList, setSearchedEventList] = useState([]);
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const { getClientRegister, deleteClentRegister, getRoadshow } =
    userRoadshowServices();
  
   const generateSlug = (name) => {
     return name
       .toLowerCase()
       .replace(/[^\w\s-]/g, "")
       .trim()
       .replace(/\s+/g, "-");
   };

  useEffect(() => {
    getClientRegisterData();
    getEventData();
  }, []);

  useEffect(() => {
    filterList(registerList, eventFilter, searchQuery);
  }, [registerList, eventFilter, searchQuery]);

  const getClientRegisterData = async () => {
    try {
      const response = await getClientRegister();
      if (response.success) {
        const sortedData = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        const filtered = sortedData.filter(
          (item) => generateSlug(item.eventName) === slug
        );

        setRegisterList(filtered);
        setSearchedList(filtered);
      }
    } catch (err) {
      console.error("Error fetching register list:", err);
    }
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
        const response = await deleteClentRegister(id);
        if (response.success) {
          setRegisterList((prevList) =>
            prevList.filter((item) => item._id !== id)
          );
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } else {
          Swal.fire("Failed!", "Failed to delete the item.", "error");
        }
      } catch (err) {
        Swal.fire("Error!", "An error occurred while deleting.", "error");
        console.error("Error delete:", err);
      }
    }
  };

  const getEventData = async () => {
    try {
      const response = await getRoadshow();
      if (response.success) {
        const sortedData = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setSearchedEventList(sortedData);
      }
    } catch (err) {
      console.error("Error fetching event list:", err);
    }
  };

  const handleFilterChange = (e) => {
    const selectedEvent = e.target.value;
    setEventFilter(selectedEvent);
    filterList(registerList, selectedEvent, searchQuery);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchQuery(term);
    filterList(registerList, eventFilter, term);
  };

  const filterList = (list, filter, search) => {
    setSearchedList(
      list.filter((item) => {
        const matchesEvent = filter ? item.eventName === filter : true;
        const matchesSearch = search
          ? item.sourcedRm?.toLowerCase().includes(search)
          : true;
        return matchesEvent && matchesSearch;
      })
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("DNK Real Estate Client Register List", 14, 10);
    doc.setFontSize(8);
    doc.autoTable({
      startY: 20,
      head: [
        [
          "Sourced RM",
          "Event Name",
          "Client Name",
          "Email",
          "Mobile Number",
          "Date",
          "Time",
          "Budget",
        ],
      ],
      body: searchedList.map((data) => [
        data.sourcedRm,
        data.eventName,
        data.fullName,
        data.email,
        data.phone,
        data.attendDate,
        data.attendTime,
        data.budget || "N/A",
      ]),
    });
    doc.save("register_list.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      searchedList.map(
        ({
          sourcedRm,
          eventName,
          fullName,
          email,
          phone,
          attendDate,
          attendTime,
          budget,
        }) => ({
          "Sourced RM": sourcedRm,
          "Event Name": eventName,
          "Full Name": fullName,
          Email: email,
          "Mobile Number": phone,
          Date: attendDate,
          Time: attendTime,
          Budget: budget || "N/A",
        })
      )
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Register List");
    XLSX.writeFile(workbook, "register_list.xlsx");
  };

  return (
    <div className="w-full flex items-start justify-center h-full bg-[#1E1E1E]">
      <div className="w-full">
        <div className="rounded-2xl p-4 sm:px-6 m-4 relative">
          <div className="overflow-hidden relative">
            <h2 className="text-center text-[0.9rem] md:text-[1.5rem] mb-2 md:mb-5">
              Registration {registerList[0]?.eventName}
            </h2>
            <div className="sm:flex gap-5">
              <div className="flex gap-4">
                <button
                  onClick={generatePDF}
                  className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  <FaFilePdf />
                </button>
                <button
                  onClick={exportToExcel}
                  className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
                >
                  <PiMicrosoftExcelLogoFill />
                </button>
              </div>
              <div className="mb-4 w-full md:w-[30%] flex items-center border border-[#fff] p-2 rounded">
                <input
                  type="text"
                  placeholder="Search Sourced RM name..."
                  className="w-full bg-transparent text-[#fff]"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <IoSearch className="text-[#fff] text-[1.2rem]" />
              </div>
            </div>
            <div className="overflow-x-auto max-h-full">
              <table className="w-full border text-sm">
                <thead>
                  <tr>
                    <th>Sourced RM</th>
                    <th>Event Name</th>
                    <th>Client Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Budget</th>
                    {pathname === "/roadshow/clientregisterlist" && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {searchedList.length > 0 ? (
                    searchedList.map((data, i) => (
                      <tr key={i}>
                        <td>{data.sourcedRm}</td>
                        <td>{data.eventName}</td>
                        <td>{data.fullName}</td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td>{data.attendDate}</td>
                        <td>{data.attendTime}</td>
                        <td>{data.budget || "N/A"}</td>
                        <td className="text-center">
                          <MdDelete
                            onClick={() => handleDelete(data._id)}
                            className="text-lg m-auto cursor-pointer text-red-500"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th>Total:</th>
                    <td colSpan="7" className="text-left pl-5">
                      {searchedList.length}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientRegisterList;
