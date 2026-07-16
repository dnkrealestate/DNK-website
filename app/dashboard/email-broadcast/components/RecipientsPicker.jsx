"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdUploadFile, MdFolder, MdPersonAdd, MdClose, MdContentPaste } from "react-icons/md";
import { useContactFolderServices } from "@/services/contactFolderServices";
import { parseContactsExcel } from "@/app/dashboard/utils/parseContactsExcel";
import { parsePastedContacts } from "@/app/dashboard/utils/parsePastedContacts";
import Button from "@/app/dashboard/components/ui/Button";

export default function RecipientsPicker({ recipients, setRecipients }) {
  const [folders, setFolders] = useState([]);
  const [selectedFolderIds, setSelectedFolderIds] = useState(new Set());
  const [fileName, setFileName] = useState("");
  const [saveToFolder, setSaveToFolder] = useState(false);
  const [saveFolderChoice, setSaveFolderChoice] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [pastedText, setPastedText] = useState("");

  const { getFolders, getFolderById, addContactsToFolder, createFolder } = useContactFolderServices();

  useEffect(() => {
    getFolders()
      .then((res) => res.success && setFolders(res.data))
      .catch((err) => console.error("Failed to load folders:", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mergeRecipients = (incoming) => {
    setRecipients((prev) => {
      const map = new Map(prev.map((r) => [r.email.toLowerCase(), r]));
      incoming.forEach((r) => {
        if (!r.email) return;
        const key = r.email.toLowerCase();
        map.set(key, { ...map.get(key), ...r });
      });
      return Array.from(map.values());
    });
  };

  const handleToggleFolder = async (folder) => {
    const isSelected = selectedFolderIds.has(folder._id);
    const nextSelected = new Set(selectedFolderIds);

    if (isSelected) {
      nextSelected.delete(folder._id);
      setSelectedFolderIds(nextSelected);
      return;
    }

    nextSelected.add(folder._id);
    setSelectedFolderIds(nextSelected);

    try {
      const response = await getFolderById(folder._id);
      if (response.success) {
        mergeRecipients(response.data.contacts);
      }
    } catch (err) {
      console.error("Failed to load folder contacts:", err);
      Swal.fire("Error", "Could not load that folder's contacts.", "error");
    }
  };

  // Shared by all three add methods (Excel, manual, pasted) — saves the
  // newly-added contacts to the selected/new folder when the "save to
  // folder" checkbox is on. Previously this only ran from the Excel path,
  // so contacts added manually or pasted never actually reached a folder.
  const saveToFolderIfChecked = async (parsed) => {
    if (!saveToFolder || parsed.length === 0) return;

    let folderId = saveFolderChoice;
    if (saveFolderChoice === "__new__") {
      if (!newFolderName.trim()) {
        Swal.fire("Folder name required", "Type a name for the new folder.", "warning");
        return;
      }
      const created = await createFolder(newFolderName.trim());
      if (created.success) {
        folderId = created.data._id;
        setFolders((prev) => [{ ...created.data, contactCount: 0 }, ...prev]);
      }
    }
    if (!folderId) return;

    const response = await addContactsToFolder(folderId, parsed);
    if (response.success) {
      setFolders((prev) =>
        prev.map((f) =>
          f._id === folderId ? { ...f, contactCount: f.contactCount + parsed.length } : f
        )
      );
    }
  };

  const handleExcelChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    try {
      const parsed = await parseContactsExcel(file);

      if (parsed.length === 0) {
        Swal.fire(
          "No valid emails found",
          "Make sure the sheet has at least an Email column (Name and Phone are optional).",
          "warning"
        );
        return;
      }

      mergeRecipients(parsed);
      await saveToFolderIfChecked(parsed);
    } catch (err) {
      console.error("Failed to parse Excel file:", err);
      Swal.fire("Failed to read file", "Please upload a valid .xlsx or .csv file.", "error");
    }
  };

  const handleAddManual = async () => {
    if (!/^\S+@\S+\.\S+$/.test(manualEmail)) {
      Swal.fire("Invalid email", "Enter a valid email address.", "warning");
      return;
    }
    const parsed = [{ name: manualName.trim(), email: manualEmail.trim(), phone: manualPhone.trim() }];
    mergeRecipients(parsed);
    await saveToFolderIfChecked(parsed);
    setManualName("");
    setManualEmail("");
    setManualPhone("");
  };

  const handleAddPasted = async () => {
    const parsed = parsePastedContacts(pastedText);
    if (parsed.length === 0) {
      Swal.fire("No valid emails found", "Paste a list with at least one email address.", "warning");
      return;
    }
    mergeRecipients(parsed);
    await saveToFolderIfChecked(parsed);
    setPastedText("");
  };

  const handleRemoveRecipient = (email) => {
    setRecipients((prev) => prev.filter((r) => r.email.toLowerCase() !== email.toLowerCase()));
  };

  return (
    <div>
      {/* Folders */}
      <div className="mb-4">
        <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#33394B]">
          <MdFolder className="text-[#8791A1]" /> Contact Folders
        </p>
        {folders.length === 0 ? (
          <p className="text-xs text-[#9AA4B2]">
            No saved folders yet — create one from the Contact Folders page, or save contacts to a
            new folder while uploading an Excel sheet below.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {folders.map((folder) => (
              <label
                key={folder._id}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedFolderIds.has(folder._id)
                    ? "border-[#0F2C45] bg-[#0F2C45]/10 text-[#0F2C45]"
                    : "border-[#D7DCE3] text-[#5B6472] hover:border-[#0F2C45]/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFolderIds.has(folder._id)}
                  onChange={() => handleToggleFolder(folder)}
                  className="hidden"
                />
                {folder.name} ({folder.contactCount})
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Save-to-folder applies to Excel, manual add, and paste alike */}
      <div className="mb-4 rounded-lg border border-[#E5E8EE] bg-[#FBFBFC] p-3">
        <label className="flex items-center gap-2 text-xs font-medium text-[#33394B]">
          <input
            type="checkbox"
            checked={saveToFolder}
            onChange={(e) => setSaveToFolder(e.target.checked)}
          />
          Also save contacts added below to a folder for reuse
        </label>

        {saveToFolder && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <select
              value={saveFolderChoice}
              onChange={(e) => setSaveFolderChoice(e.target.value)}
              className="rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233]"
            >
              <option value="">Select a folder...</option>
              {folders.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name}
                </option>
              ))}
              <option value="__new__">+ New folder</option>
            </select>
            {saveFolderChoice === "__new__" && (
              <input
                type="text"
                placeholder="New folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233]"
              />
            )}
          </div>
        )}
      </div>

      {/* Excel upload */}
      <div className="mb-4">
        <p className="mb-1.5 text-sm font-medium text-[#33394B]">Upload Excel Sheet</p>
        <label
          htmlFor="recipients-excel"
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#D7DCE3] px-4 py-3 text-sm text-[#5B6472] hover:border-[#0F2C45]/40 hover:text-[#0F2C45]"
        >
          <MdUploadFile className="shrink-0 text-xl" />
          <span className="truncate">{fileName || "Name, Email, Phone columns — Email required"}</span>
        </label>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          id="recipients-excel"
          onChange={handleExcelChange}
          className="hidden"
        />
      </div>

      {/* Manual add */}
      <div className="mb-4">
        <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#33394B]">
          <MdPersonAdd className="text-[#8791A1]" /> Add One Manually
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Name"
            value={manualName}
            onChange={(e) => setManualName(e.target.value)}
            className="w-32 rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233]"
          />
          <input
            type="email"
            placeholder="Email*"
            value={manualEmail}
            onChange={(e) => setManualEmail(e.target.value)}
            className="w-44 rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233]"
          />
          <input
            type="text"
            placeholder="Phone"
            value={manualPhone}
            onChange={(e) => setManualPhone(e.target.value)}
            className="w-32 rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233]"
          />
          <Button type="button" size="sm" onClick={handleAddManual}>
            Add
          </Button>
        </div>
      </div>

      {/* Paste a list */}
      <div className="mb-4">
        <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#33394B]">
          <MdContentPaste className="text-[#8791A1]" /> Paste a List of Emails
        </p>
        <textarea
          rows={3}
          placeholder={"Paste emails, one per line or comma-separated\ne.g. John Doe <john@example.com>, jane@example.com"}
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-xs text-[#1A2233] placeholder:text-[#9AA4B2] focus:border-[#0F2C45] focus:outline-none"
        />
        <div className="mt-1.5 flex justify-end">
          <Button type="button" size="sm" onClick={handleAddPasted}>
            Add Pasted Emails
          </Button>
        </div>
      </div>

      {/* Preview */}
      {recipients.length > 0 && (
        <div className="max-h-56 overflow-y-auto rounded-lg border border-[#E5E8EE]">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-[#F8F9FB]">
              <tr>
                <th className="px-3 py-2 font-semibold text-[#8791A1]">Name</th>
                <th className="px-3 py-2 font-semibold text-[#8791A1]">Email</th>
                <th className="px-3 py-2 font-semibold text-[#8791A1]">Phone</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F4]">
              {recipients.map((r, i) => (
                <tr key={i}>
                  <td className="px-3 py-1.5 text-[#33394B]">{r.name || "—"}</td>
                  <td className="px-3 py-1.5 text-[#33394B]">{r.email}</td>
                  <td className="px-3 py-1.5 text-[#33394B]">{r.phone || "—"}</td>
                  <td className="px-3 py-1.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveRecipient(r.email)}
                      className="text-[#9AA4B2] hover:text-red-500"
                    >
                      <MdClose />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {recipients.length > 0 && (
        <p className="mt-2 text-xs font-medium text-[#0F2C45]">
          {recipients.length} recipient{recipients.length === 1 ? "" : "s"} total
        </p>
      )}
    </div>
  );
}
