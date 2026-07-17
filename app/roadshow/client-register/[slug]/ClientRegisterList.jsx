"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdDelete, MdEdit, MdHowToReg, MdArrowBack, MdEditNote } from "react-icons/md";
import { IoSearch, IoLogoWhatsapp } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import { userRoadshowServices } from "@/services/roadshowService";
import { useInvitationTemplateServices } from "@/services/invitationTemplateServices";
import Card from "@/app/dashboard/components/ui/Card";
import InvitationTemplateEditor from "./InvitationTemplateEditor";
import InvitationPoster, { resolveInvitationTemplate, substituteTokens } from "./InvitationPoster";

function preloadImage(url) {
  return new Promise((resolve) => {
    if (!url) return resolve();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

const ClientRegisterList = () => {
  const [registerList, setRegisterList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showInvitationEditor, setShowInvitationEditor] = useState(false);
  const [sharingClientId, setSharingClientId] = useState(null);
  const [captureData, setCaptureData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const slug = pathname.split("/").pop();
  const eventplace = registerList[0]?.eventplace || slug;
  const captureRef = useRef(null);
  const captureResolveRef = useRef(null);

  const { getClientRegister, deleteClentRegister, updateClientRegister, getActiveRM } =
    userRoadshowServices();
  const { getInvitationTemplate } = useInvitationTemplateServices();

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

  // Renders the hidden poster node with the requested template + tokens, waits
  // for its images to actually load, then rasterizes it with html2canvas —
  // this is what turns the template into a real shareable PNG per client.
  useEffect(() => {
    if (!captureData) return;

    const run = async () => {
      try {
        await Promise.all([
          preloadImage(captureData.backgroundImageUrl),
          ...captureData.blocks
            .filter((b) => b.type === "image" && b.imageUrl)
            .map((b) => preloadImage(b.imageUrl)),
        ]);
        // Let the browser paint the freshly-loaded images before capturing.
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        const node = captureRef.current;
        if (!node) throw new Error("Capture node not ready");

        const canvas = await html2canvas(node, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#0B0E14",
        });
        canvas.toBlob((blob) => {
          captureResolveRef.current?.(blob);
        }, "image/png");
      } catch (err) {
        console.error("Failed to capture invitation image:", err);
        captureResolveRef.current?.(null);
      } finally {
        setCaptureData(null);
      }
    };
    run();
  }, [captureData]);

  const capturePosterImage = (backgroundImageUrl, blocks, tokens, width, height) => {
    return new Promise((resolve) => {
      captureResolveRef.current = resolve;
      setCaptureData({ backgroundImageUrl, blocks, tokens, width, height });
    });
  };

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

  const handleShareInvitation = async (row) => {
    setSharingClientId(row._id);
    try {
      const response = await getInvitationTemplate(eventplace);
      if (!response.success || !response.data) {
        Swal.fire(
          "No invitation set up",
          "Click 'Customize Invitation' first to design one for this event.",
          "info"
        );
        return;
      }

      const tokens = {
        name: row.fullName || "there",
        date: row.attendDate || "",
        time: row.attendTime || "",
        eventName: row.eventName || "DNK Real Estate",
      };
      const resolved = resolveInvitationTemplate(response.data);
      const caption = substituteTokens(
        response.data.whatsappMessage ||
          "Hi {{name}}, you're invited to our {{eventName}} event on {{date}} at {{time}}!",
        tokens
      );

      const blob = await capturePosterImage(
        resolved.backgroundImageUrl,
        resolved.blocks,
        tokens,
        resolved.posterWidth,
        resolved.posterHeight
      );
      if (!blob) {
        Swal.fire("Error", "Could not generate the invitation image. Please try again.", "error");
        return;
      }

      const fileName = `invitation-${(row.fullName || "client").replace(/\s+/g, "-").toLowerCase()}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: caption });
          return;
        } catch (err) {
          if (err?.name === "AbortError") return; // user cancelled the share sheet
          console.error("navigator.share failed, falling back to download:", err);
        }
      }

      // Desktop (or unsupported browsers): download the image, then open
      // WhatsApp with the caption pre-filled so it's one attach away.
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Invitation image downloaded — attach it in the WhatsApp chat that just opened",
        showConfirmButton: false,
        timer: 4000,
      });

      // No stored number (or the admin just wants to pick a recipient
      // manually) — wa.me with no number opens WhatsApp's own contact
      // picker instead of a specific chat.
      const phoneDigits = (row.phone || "").replace(/\D/g, "");
      const waUrl = phoneDigits
        ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(caption)}`
        : `https://wa.me/?text=${encodeURIComponent(caption)}`;
      window.open(waUrl, "_blank");
    } catch (err) {
      console.error("Error sharing invitation:", err);
      Swal.fire("Error", "Something went wrong while preparing the invitation.", "error");
    } finally {
      setSharingClientId(null);
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
            onClick={() => setShowInvitationEditor(true)}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-[#0F2C45]/5 px-3 text-sm font-medium text-[#0F2C45] hover:bg-[#0F2C45]/10"
            title="Customize WhatsApp Invitation"
          >
            <MdEditNote className="text-lg" /> Customize Invitation
          </button>
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
                  <th className={`${th} text-center`}>Invite</th>
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
                      <button
                        onClick={() => handleShareInvitation(data)}
                        disabled={sharingClientId === data._id}
                        title="Share via WhatsApp"
                      >
                        {sharingClientId === data._id ? (
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-500" />
                        ) : (
                          <IoLogoWhatsapp className="cursor-pointer text-lg text-emerald-500 hover:text-emerald-600" />
                        )}
                      </button>
                    </td>
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

      {showInvitationEditor && (
        <InvitationTemplateEditor
          eventplace={eventplace}
          onClose={() => setShowInvitationEditor(false)}
        />
      )}

      {/* Off-screen render used only to rasterize the per-client invitation
          image via html2canvas — rendered at the template's real pixel size
          so the exported image matches the editor preview exactly, never
          visible to the user. */}
      {captureData && (
        <div style={{ position: "fixed", left: "-9999px", top: 0 }}>
          <InvitationPoster
            ref={captureRef}
            backgroundImageUrl={captureData.backgroundImageUrl}
            blocks={captureData.blocks}
            tokens={captureData.tokens}
            width={captureData.width}
            height={captureData.height}
          />
        </div>
      )}
    </div>
  );
};

export default ClientRegisterList;
