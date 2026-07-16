"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdBookmark } from "react-icons/md";
import { useEmailCampaignServices } from "@/services/emailCampaignServices";
import { useEmailTemplateServices } from "@/services/emailTemplateServices";
import Card from "@/app/dashboard/components/ui/Card";
import Button from "@/app/dashboard/components/ui/Button";
import { Input } from "@/app/dashboard/components/ui/Field";
import BlockEditor from "./BlockEditor";
import RecipientsPicker from "./RecipientsPicker";
import EmailPreview from "./EmailPreview";

const blockFromServer = (b) => ({
  id: crypto.randomUUID(),
  type: b.type,
  text: b.text || "",
  link: b.link || "",
  imageFile: null,
  imagePreview: null,
  existingImage: b.image || "",
  fontSize: b.fontSize || "",
  fontWeight: b.fontWeight || "",
  underline: Boolean(b.underline),
  textAlign: b.textAlign || "left",
  listType: b.listType || "none",
});

export default function CampaignComposer({ onSent, editingCampaign, onDoneEditing }) {
  const [subject, setSubject] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [sendMode, setSendMode] = useState("now");
  const [scheduledAt, setScheduledAt] = useState("");
  const [sending, setSending] = useState(false);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [templateChoice, setTemplateChoice] = useState("");

  const { createCampaign, updateCampaign } = useEmailCampaignServices();
  const { createTemplate, getTemplates, getTemplateById } = useEmailTemplateServices();

  useEffect(() => {
    getTemplates()
      .then((res) => res.success && setTemplates(res.data))
      .catch((err) => console.error("Failed to load templates:", err));
  }, []);

  // Loads an existing draft into the composer for editing.
  useEffect(() => {
    if (!editingCampaign) return;
    setSubject(editingCampaign.subject || "");
    setBlocks((editingCampaign.blocks || []).map(blockFromServer));
    setRecipients(editingCampaign.recipients || []);
    setSendMode("now");
    setScheduledAt("");
  }, [editingCampaign]);

  const handleReset = () => {
    setSubject("");
    setBlocks([]);
    setRecipients([]);
    setSendMode("now");
    setScheduledAt("");
    setTemplateChoice("");
    onDoneEditing?.();
  };

  const buildBlockFormData = (formdata) => {
    const blockPayload = blocks.map(
      ({ type, text, link, existingImage, fontSize, fontWeight, underline, textAlign, listType }) => ({
        type,
        text: text || "",
        link: link || "",
        image: existingImage || "",
        fontSize: fontSize || "",
        fontWeight: fontWeight || "",
        underline: Boolean(underline),
        textAlign: textAlign || "left",
        listType: listType || "none",
      })
    );
    formdata.append("blocks", JSON.stringify(blockPayload));

    blocks.forEach((block, i) => {
      if (block.type === "image" && block.imageFile) {
        formdata.append(`block_image_${i}`, block.imageFile);
      }
    });
  };

  const handleLoadTemplate = async (id) => {
    setTemplateChoice(id);
    if (!id) return;
    try {
      const response = await getTemplateById(id);
      if (response.success) {
        setSubject(response.data.subject || "");
        setBlocks(response.data.blocks.map(blockFromServer));
      }
    } catch (err) {
      console.error("Failed to load template:", err);
      Swal.fire("Error", "Failed to load template.", "error");
    }
  };

  const handleSaveTemplate = async () => {
    if (blocks.length === 0) {
      Swal.fire("Nothing to save", "Add at least one block first.", "warning");
      return;
    }
    const { value: name } = await Swal.fire({
      title: "Save as Template",
      input: "text",
      inputLabel: "Template name",
      inputPlaceholder: "e.g. Roadshow Announcement",
      showCancelButton: true,
      confirmButtonText: "Save",
      inputValidator: (value) => (!value ? "Enter a name" : undefined),
    });
    if (!name) return;

    setSavingTemplate(true);
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("subject", subject);
      buildBlockFormData(formdata);

      const response = await createTemplate(formdata);
      if (response.success) {
        Swal.fire("Saved", "Template saved for reuse.", "success");
        setTemplates((prev) => [response.data, ...prev]);
      } else {
        Swal.fire("Failed", response.message || "Failed to save template.", "error");
      }
    } catch (err) {
      console.error("Failed to save template:", err);
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setSavingTemplate(false);
    }
  };

  const handleSubmit = async (e, isDraft) => {
    e.preventDefault();

    if (!subject.trim()) {
      Swal.fire("Missing subject", "Give this broadcast a subject line.", "warning");
      return;
    }
    if (!isDraft && blocks.length === 0) {
      Swal.fire(
        "Empty email",
        "Add at least one content block (heading, text, image, or button).",
        "warning"
      );
      return;
    }
    if (!isDraft && recipients.length === 0) {
      Swal.fire(
        "No recipients",
        "Select a folder, upload an Excel sheet, paste emails, or add one manually.",
        "warning"
      );
      return;
    }
    if (!isDraft && sendMode === "schedule" && !scheduledAt) {
      Swal.fire("Missing schedule time", "Pick a date and time to schedule this broadcast.", "warning");
      return;
    }

    setSending(true);
    try {
      const formdata = new FormData();
      formdata.append("subject", subject);
      formdata.append("recipients", JSON.stringify(recipients));
      formdata.append("saveAsDraft", isDraft ? "true" : "false");
      if (!isDraft && sendMode === "schedule") {
        formdata.append("scheduledAt", new Date(scheduledAt).toISOString());
      }
      buildBlockFormData(formdata);

      const response = editingCampaign
        ? await updateCampaign(editingCampaign._id, formdata)
        : await createCampaign(formdata);

      if (response.success) {
        Swal.fire(
          "Success",
          isDraft
            ? "Saved as draft."
            : sendMode === "schedule"
            ? "Broadcast scheduled."
            : "Broadcast is sending now.",
          "success"
        );
        handleReset();
        onSent?.();
      } else {
        Swal.fire("Failed", response.message || "Failed to save campaign.", "error");
      }
    } catch (err) {
      console.error("Failed to save campaign:", err);
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="p-6">
      {editingCampaign && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
          <span>Editing draft: {editingCampaign.subject}</span>
          <button type="button" onClick={handleReset} className="font-medium underline">
            Cancel
          </button>
        </div>
      )}
      <form onSubmit={(e) => handleSubmit(e, false)} encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: template, recipients, send options */}
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-[#1A2233]">Message Template</h3>
              <div className="flex items-center gap-2">
                <select
                  value={templateChoice}
                  onChange={(e) => handleLoadTemplate(e.target.value)}
                  className="rounded-lg border border-[#D7DCE3] bg-white px-2 py-1.5 text-xs text-[#1A2233]"
                >
                  <option value="">Load a template...</option>
                  {templates.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleSaveTemplate}
                  disabled={savingTemplate}
                  className="flex items-center gap-1 rounded-lg border border-[#D7DCE3] bg-white px-2.5 py-1.5 text-xs font-medium text-[#4B5566] hover:border-[#0F2C45]/40 hover:text-[#0F2C45]"
                >
                  <MdBookmark /> Save as Template
                </button>
              </div>
            </div>

            <Input
              label="Subject"
              required
              placeholder="e.g. New launch you don't want to miss"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mb-4"
            />

            <BlockEditor blocks={blocks} setBlocks={setBlocks} />

            <h3 className="mb-3 mt-6 text-sm font-semibold text-[#1A2233]">Recipients</h3>
            <RecipientsPicker recipients={recipients} setRecipients={setRecipients} />

            <h3 className="mb-3 mt-6 text-sm font-semibold text-[#1A2233]">Send Options</h3>
            <div className="mb-3 inline-flex rounded-lg bg-[#E9ECF1] p-1">
              <button
                type="button"
                onClick={() => setSendMode("now")}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  sendMode === "now"
                    ? "bg-white text-[#0F2C45] shadow-sm"
                    : "text-[#5B6472] hover:text-[#0F2C45]"
                }`}
              >
                Send Now
              </button>
              <button
                type="button"
                onClick={() => setSendMode("schedule")}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  sendMode === "schedule"
                    ? "bg-white text-[#0F2C45] shadow-sm"
                    : "text-[#5B6472] hover:text-[#0F2C45]"
                }`}
              >
                Schedule
              </button>
            </div>

            {sendMode === "schedule" && (
              <Input
                type="datetime-local"
                label="Send at"
                min={new Date().toISOString().slice(0, 16)}
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
              />
            )}
          </div>

          {/* Right: live preview, pinned while the left column scrolls */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <h3 className="mb-3 text-sm font-semibold text-[#1A2233]">Live Preview</h3>
            <div className="h-[600px]">
              <EmailPreview blocks={blocks} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-[#E5E8EE] pt-4">
          <Button type="button" variant="secondary" onClick={handleReset}>
            Clear
          </Button>
          <Button
            type="button"
            variant="secondary"
            loading={sending}
            onClick={(e) => handleSubmit(e, true)}
          >
            Save as Draft
          </Button>
          <Button type="submit" loading={sending}>
            {sendMode === "schedule" ? "Schedule Broadcast" : "Send Now"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
