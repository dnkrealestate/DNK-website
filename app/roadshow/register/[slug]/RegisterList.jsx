"use client";

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { userRoadshowServices } from "@/services/roadshowService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const RegisterList = () => {
  const [registerList, setRegisterList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [eventFilter, setEventFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedEventList, setSearchedEventList] = useState([]);
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const { getRoadshowRegister, deleteRegister, getRoadshow } =
    userRoadshowServices();
  
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  useEffect(() => {
    getRegisterData();
    getEventData();
  }, []);

  useEffect(() => {
    setSearchedList(registerList);
  }, [registerList]);

  useEffect(() => {
    const refreshData = () => {
      if (eventFilter) {
        setSearchedList(
          registerList.filter((item) => item.eventName === eventFilter)
        );
      } else {
        getRegisterData();
      }
    };
    const intervalId = setInterval(refreshData, 30000);
    return () => clearInterval(intervalId);
  }, [eventFilter, registerList]);

 const getRegisterData = async () => {
   try {
     const response = await getRoadshowRegister();
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
        const response = await deleteRegister(id);
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
      }
    }
  };

  const handleFilterChange = (e) => {
    const selectedEvent = e.target.value;
    setEventFilter(selectedEvent);
    filterList(registerList, selectedEvent);
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
    doc.text("DNK Real Estate Register List", 14, 10);
    doc.setFontSize(8);
    doc.autoTable({
      startY: 20,
      head: [
        [
          "Event Name",
          "Full Name",
          "Email",
          "Mobile Number",
          "Property Type",
          "Budget",
          "Sourced RM",
          "Attened RM",
          "Event Attended Time",
          "Remark",
        ],
      ],
      body: searchedList.map((data) => [
        data.eventName,
        data.fullName,
        data.email,
        data.phone,
        data.type,
        data.budget,
        data.sourcedRm,
        data.attendedRm,
        new Date(data.updatedAt).toLocaleString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        data.remark,
      ]),
    });

    doc.save("register_list.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      searchedList.map(
        ({
          eventName,
          fullName,
          email,
          phone,
          type,
          budget,
          sourcedRm,
          attendedRm,
          updatedAt,
          remark,
        }) => ({
          "Event Name": eventName,
          "Full Name": fullName,
          "Email ID": email,
          "Mobile Number": phone,
          "Property Type": type,
          Budget: budget,
          "Sourced RM": sourcedRm,
          "Attended RM": attendedRm,
          "Event Attended Time": new Date(updatedAt).toLocaleString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          Remark: remark,
        })
      )
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Register List");
    XLSX.writeFile(workbook, "register_list.xlsx");
  };

  return (
    <div className="overflow-hidden relative bg-[#1E1E1E] p-4">
      <h2 className="text-center text-[0.9rem] md:text-[1.5rem] mb-2 md:mb-5">
        {registerList[0]?.eventName}
      </h2>
      <div className="flex gap-5">
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
        <table className="w-full border text-[0.8rem]">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Status</th>
              <th>Property type</th>
              <th>Budget</th>
              <th>Sourced RM</th>
              <th>Attened RM</th>
              <th>Event Attended Time</th>
              <th>Remark</th>
              {pathname === "/roadshow/register" && <th></th>}
            </tr>
          </thead>
          <tbody>
            {searchedList.length > 0 ? (
              searchedList.map((data, i) => (
                <tr key={i}>
                  <td>{data.eventName}</td>
                  <td>{data.fullName}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.status}</td>
                  <td>{data.type}</td>
                  <td>{data.budget}</td>
                  <td>{data.sourcedRm}</td>
                  <td>{data.attendedRm}</td>
                  <td>
                    {new Date(data.updatedAt).toLocaleString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{data.remark}</td>
                  <td className="text-center">
                    <MdDelete
                      onClick={() => handleDelete(data._id)}
                      className="text-[1rem] m-auto cursor-pointer text-red-500"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12}>
                  <div className="flex justify-center w-full py-4">
                    <div className="bg-[#040406] text-center rounded-3xl p-1">
                      <p className="m-auto loader !w-[24px] !h-[24px]"></p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            <tr>
              <th>Total:</th>
              <td className="px-4 py-2 text-center">{searchedList.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterList;
