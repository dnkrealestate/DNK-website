"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdDelete, MdEdit, MdHowToReg, MdArrowBack } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { userRoadshowServices } from "@/services/roadshowService";
import Card from "@/app/dashboard/components/ui/Card";

const ClientRegisterList = () => {
  const [registerList, setRegisterList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const slug = pathname.split("/").pop();

  const { getClientRegister, deleteClentRegister, updateClientRegister, getActiveRM } =
    userRoadshowServices();

  const generateSlug = (name) =>
    name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  useEffect(() => {
    getClientRegisterData();
  }, []);

  useEffect(() => {
    filterList(registerList, searchQuery);
  }, [registerList, searchQuery]);

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
      }
    } catch (err) {
      console.error("Error fetching register list:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterList = (list, search) => {
    setSearchedList(
      search
        ? list.filter((item) => item.sourcedRm?.toLowerCase().includes(search))
        : list
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteClentRegister(id);
        if (response.success) {
          setRegisterList((prevList) => prevList.filter((item) => item._id !== id));
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

  const handleEditRm = async (row) => {
    try {
      const rmResponse = await getActiveRM();
      if (!rmResponse.success) {
        Swal.fire("Error", "Could not load the RM list.", "error");
        return;
      }

      const options = rmResponse.data
        .map(
          (rm) =>
            `<option value="${rm.name}" ${
              rm.name === row.sourcedRm ? "selected" : ""
            }>${rm.name}</option>`
        )
        .join("");

      const { value: newRm } = await Swal.fire({
        title: "Change Sourced RM",
        html: `<select id="rm-select" class="swal2-select" style="width:85%">
                 <option value="">Select RM</option>
                 ${options}
               </select>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
          const val = document.getElementById("rm-select").value;
          if (!val) {
            Swal.showValidationMessage("Please select an RM");
          }
          return val;
        },
      });

      if (!newRm) return;

      const response = await updateClientRegister(row._id, { sourcedRm: newRm });
      if (response.success) {
        setRegisterList((prev) =>
          prev.map((item) =>
            item._id === row._id ? { ...item, sourcedRm: newRm } : item
          )
        );
        Swal.fire("Updated", "Sourced RM updated successfully.", "success");
      } else {
        Swal.fire("Failed", "Failed to update Sourced RM.", "error");
      }
    } catch (err) {
      console.error("Error updating Sourced RM:", err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("DNK Real Estate Client Register List", 14, 10);
    doc.setFontSize(8);
    doc.autoTable({
      startY: 20,
      head: [
        ["Sourced RM", "Event Name", "Client Name", "Email", "Mobile Number", "Date", "Time", "Budget"],
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
        ({ sourcedRm, eventName, fullName, email, phone, attendDate, attendTime, budget }) => ({
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

  const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8791A1] whitespace-nowrap";
  const td = "px-4 py-3 text-sm text-[#33394B] whitespace-nowrap";

  return (
    <div>
      <button
        onClick={() => router.push("/roadshow/client-register")}
        className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#4B5566] hover:text-[#0F2C45]"
      >
        <MdArrowBack /> Back to events
      </button>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-[#1A2233]">
            {registerList[0]?.eventName || "Client Registrations"}
          </h1>
          <p className="mt-1 text-sm text-[#7A8494]">
            {searchedList.length} client{searchedList.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={generatePDF}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
            title="Export PDF"
          >
            <FaFilePdf />
          </button>
          <button
            onClick={exportToExcel}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
            title="Export Excel"
          >
            <PiMicrosoftExcelLogoFill />
          </button>
        </div>
      </div>

      <Card className="mb-4 flex items-center gap-2 px-3.5 py-2.5 sm:max-w-xs">
        <IoSearch className="shrink-0 text-[#8791A1]" />
        <input
          type="text"
          placeholder="Search Sourced RM name..."
          className="w-full bg-transparent text-sm text-[#1A2233] outline-none placeholder:text-[#9AA4B2]"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="py-14 text-center text-sm text-[#8791A1]">Loading...</div>
        ) : searchedList.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-14 text-center">
            <MdHowToReg className="text-3xl text-[#C4CAD4]" />
            <p className="text-sm text-[#8791A1]">No registrations found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead className="bg-[#F8F9FB]">
                <tr>
                  <th className={th}>Sourced RM</th>
                  <th className={th}>Client Name</th>
                  <th className={th}>Email</th>
                  <th className={th}>Mobile</th>
                  <th className={th}>Date</th>
                  <th className={th}>Time</th>
                  <th className={th}>Budget</th>
                  <th className={`${th} text-center`}>Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF0F4]">
                {searchedList.map((data) => (
                  <tr key={data._id} className="hover:bg-[#F8F9FB]">
                    <td className={td}>
                      <div className="flex items-center gap-1.5">
                        <span>{data.sourcedRm}</span>
                        <button onClick={() => handleEditRm(data)} title="Change Sourced RM">
                          <MdEdit className="cursor-pointer text-[#0F2C45]/50 hover:text-[#0F2C45]" />
                        </button>
                      </div>
                    </td>
                    <td className={`${td} font-medium text-[#1A2233]`}>{data.fullName}</td>
                    <td className={td}>{data.email}</td>
                    <td className={td}>{data.phone}</td>
                    <td className={td}>{data.attendDate}</td>
                    <td className={td}>{data.attendTime}</td>
                    <td className={td}>{data.budget || "N/A"}</td>
                    <td className="text-center">
                      <button onClick={() => handleDelete(data._id)} title="Delete">
                        <MdDelete className="cursor-pointer text-lg text-red-400 hover:text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClientRegisterList;
