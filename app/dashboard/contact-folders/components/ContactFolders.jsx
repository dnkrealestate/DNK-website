"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  MdFolder,
  MdAdd,
  MdDelete,
  MdEdit,
  MdUploadFile,
  MdPersonAdd,
  MdContentPaste,
  MdClose,
  MdArrowBack,
} from "react-icons/md";
import { useContactFolderServices } from "@/services/contactFolderServices";
import { parseContactsExcel } from "@/app/dashboard/utils/parseContactsExcel";
import { parsePastedContacts } from "@/app/dashboard/utils/parsePastedContacts";
import Card from "@/app/dashboard/components/ui/Card";
import Button from "@/app/dashboard/components/ui/Button";
import PageHeader from "@/app/dashboard/components/ui/PageHeader";

export default function ContactFolders() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFolderName, setNewFolderName] = useState("");
  const [activeFolder, setActiveFolder] = useState(null);
  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [pastedText, setPastedText] = useState("");

  const {
    getFolders,
    createFolder,
    getFolderById,
    addContactsToFolder,
    updateContactInFolder,
    removeContactFromFolder,
    deleteFolder,
  } = useContactFolderServices();

  const fetchFolders = async () => {
    try {
      const response = await getFolders();
      if (response.success) setFolders(response.data);
    } catch (err) {
      console.error("Failed to fetch folders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    try {
      const response = await createFolder(newFolderName.trim());
      if (response.success) {
        setFolders((prev) => [{ ...response.data, contactCount: 0 }, ...prev]);
        setNewFolderName("");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to create folder.", "error");
    }
  };

  const handleDeleteFolder = async (id) => {
    const result = await Swal.fire({
      title: "Delete this folder?",
      text: "All saved contacts in it will be removed. This can't be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await deleteFolder(id);
      if (response.success) {
        setFolders((prev) => prev.filter((f) => f._id !== id));
        if (activeFolder?._id === id) setActiveFolder(null);
      }
    } catch (err) {
      Swal.fire("Error", "Failed to delete folder.", "error");
    }
  };

  const openFolder = async (id) => {
    try {
      const response = await getFolderById(id);
      if (response.success) setActiveFolder(response.data);
    } catch (err) {
      Swal.fire("Error", "Failed to load folder.", "error");
    }
  };

  const refreshActiveFolder = async () => {
    if (activeFolder) {
      const response = await getFolderById(activeFolder._id);
      if (response.success) setActiveFolder(response.data);
      setFolders((prev) =>
        prev.map((f) =>
          f._id === activeFolder._id ? { ...f, contactCount: response.data.contacts.length } : f
        )
      );
    }
  };

  const handleExcelImport = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeFolder) return;

    try {
      const parsed = await parseContactsExcel(file);
      if (parsed.length === 0) {
        Swal.fire("No valid emails found", "Check the sheet has an Email column.", "warning");
        return;
      }
      const response = await addContactsToFolder(activeFolder._id, parsed);
      if (response.success) {
        Swal.fire("Success", response.message, "success");
        refreshActiveFolder();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to import contacts.", "error");
    }
  };

  const handleAddManual = async () => {
    if (!/^\S+@\S+\.\S+$/.test(manualEmail)) {
      Swal.fire("Invalid email", "Enter a valid email address.", "warning");
      return;
    }
    try {
      const response = await addContactsToFolder(activeFolder._id, [
        { name: manualName.trim(), email: manualEmail.trim(), phone: manualPhone.trim() },
      ]);
      if (response.success) {
        setManualName("");
        setManualEmail("");
        setManualPhone("");
        refreshActiveFolder();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add contact.", "error");
    }
  };

  const handleAddPasted = async () => {
    const parsed = parsePastedContacts(pastedText);
    if (parsed.length === 0) {
      Swal.fire("No valid emails found", "Paste a list with at least one email address.", "warning");
      return;
    }
    try {
      const response = await addContactsToFolder(activeFolder._id, parsed);
      if (response.success) {
        Swal.fire("Success", response.message, "success");
        setPastedText("");
        refreshActiveFolder();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add pasted contacts.", "error");
    }
  };

  const handleRemoveContact = async (email) => {
    try {
      await removeContactFromFolder(activeFolder._id, email);
      refreshActiveFolder();
    } catch (err) {
      Swal.fire("Error", "Failed to remove contact.", "error");
    }
  };

  const handleEditContact = async (contact) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Contact",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${contact.name || ""}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${contact.email || ""}">
        <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${contact.phone || ""}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const email = document.getElementById("swal-email").value.trim();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          Swal.showValidationMessage("Enter a valid email address");
          return false;
        }
        return {
          name: document.getElementById("swal-name").value.trim(),
          email,
          phone: document.getElementById("swal-phone").value.trim(),
        };
      },
    });

    if (!formValues) return;

    try {
      const response = await updateContactInFolder(activeFolder._id, contact.email, formValues);
      if (response.success) {
        Swal.fire("Updated", "Contact updated successfully.", "success");
        refreshActiveFolder();
      } else {
        Swal.fire("Failed", response.message || "Failed to update contact.", "error");
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "Failed to update contact.", "error");
    }
  };

  if (activeFolder) {
    return (
      <div>
        <button
          onClick={() => setActiveFolder(null)}
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#4B5566] hover:text-[#0F2C45]"
        >
          <MdArrowBack /> Back to folders
        </button>

        <PageHeader
          title={activeFolder.name}
          description={`${activeFolder.contacts.length} saved contact${activeFolder.contacts.length === 1 ? "" : "s"}`}
        />

        <Card className="mb-4 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[#D7DCE3] px-4 py-2 text-sm text-[#5B6472] hover:border-[#0F2C45]/40 hover:text-[#0F2C45]">
              <MdUploadFile /> Import Excel
              <input type="file" accept=".xlsx,.xls,.csv" onChange={handleExcelImport} className="hidden" />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Name"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                className="w-28 rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233]"
              />
              <input
                type="email"
                placeholder="Email*"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                className="w-40 rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233]"
              />
              <input
                type="text"
                placeholder="Phone"
                value={manualPhone}
                onChange={(e) => setManualPhone(e.target.value)}
                className="w-28 rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233]"
              />
              <Button type="button" size="sm" onClick={handleAddManual}>
                <MdPersonAdd /> Add
              </Button>
            </div>
          </div>

          <div className="mt-3 border-t border-[#E5E8EE] pt-3">
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#5B6472]">
              <MdContentPaste /> Or paste a list of emails
            </p>
            <div className="flex flex-wrap items-start gap-2">
              <textarea
                rows={2}
                placeholder={"One per line or comma-separated, e.g. John Doe <john@example.com>, jane@example.com"}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                className="w-full max-w-md rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233] placeholder:text-[#9AA4B2] focus:border-[#0F2C45] focus:outline-none"
              />
              <Button type="button" size="sm" onClick={handleAddPasted}>
                Add Pasted
              </Button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          {activeFolder.contacts.length === 0 ? (
            <div className="py-14 text-center text-sm text-[#8791A1]">No contacts in this folder yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse">
                <thead className="bg-[#F8F9FB]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#8791A1]">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#8791A1]">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#8791A1]">Phone</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-[#8791A1]">Edit</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-[#8791A1]">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF0F4]">
                  {activeFolder.contacts.map((c, i) => (
                    <tr key={i} className="hover:bg-[#F8F9FB]">
                      <td className="px-4 py-3 text-sm text-[#33394B]">{c.name || "—"}</td>
                      <td className="px-4 py-3 text-sm text-[#33394B]">{c.email}</td>
                      <td className="px-4 py-3 text-sm text-[#33394B]">{c.phone || "—"}</td>
                      <td className="text-center">
                        <button onClick={() => handleEditContact(c)} title="Edit">
                          <MdEdit className="text-lg text-[#0F2C45]/70 hover:text-[#0F2C45]" />
                        </button>
                      </td>
                      <td className="text-center">
                        <button onClick={() => handleRemoveContact(c.email)} title="Remove">
                          <MdClose className="text-lg text-red-400 hover:text-red-600" />
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
  }

  return (
    <div>
      <PageHeader
        title="Contact Folders"
        description="Save and organize client contact lists for reuse across email broadcasts."
      />

      <Card className="mb-6 p-5">
        <form onSubmit={handleCreateFolder} className="flex gap-3">
          <input
            type="text"
            placeholder="New folder name, e.g. Ahmedabad Roadshow Leads"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] focus:border-[#0F2C45] focus:outline-none"
          />
          <Button type="submit">
            <MdAdd /> Create Folder
          </Button>
        </form>
      </Card>

      {loading ? (
        <div className="py-14 text-center text-sm text-[#8791A1]">Loading folders...</div>
      ) : folders.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-14 text-center">
          <MdFolder className="text-3xl text-[#C4CAD4]" />
          <p className="text-sm text-[#8791A1]">No contact folders yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {folders.map((folder) => (
            <Card
              key={folder._id}
              className="group flex cursor-pointer items-center justify-between p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              onClick={() => openFolder(folder._id)}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0F2C45]/10 text-[#0F2C45]">
                  <MdFolder />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A2233]">{folder.name}</h3>
                  <p className="text-xs text-[#8791A1]">
                    {folder.contactCount} contact{folder.contactCount === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFolder(folder._id);
                }}
                className="text-[#C4CAD4] hover:text-red-500"
                title="Delete folder"
              >
                <MdDelete />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
