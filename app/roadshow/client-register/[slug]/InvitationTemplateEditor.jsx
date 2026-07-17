"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  MdClose,
  MdImage,
  MdTitle,
  MdNotes,
  MdFormatUnderlined,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdArrowUpward,
  MdArrowDownward,
  MdDelete,
} from "react-icons/md";
import { useInvitationTemplateServices } from "@/services/invitationTemplateServices";
import { Input, Textarea } from "@/app/dashboard/components/ui/Field";
import Button from "@/app/dashboard/components/ui/Button";
import { WWURL } from "@/url/axios";
import { GOOGLE_FONTS, ALL_GOOGLE_FONTS_URL } from "@/utils/googleFonts";
import InvitationPoster, { ScaledPosterPreview } from "./InvitationPoster";

const SIZE_PRESETS = [
  { label: "Story (9:16)", width: 1080, height: 1920 },
  { label: "Portrait (4:5)", width: 1080, height: 1350 },
  { label: "Square (1:1)", width: 1080, height: 1080 },
  { label: "Landscape (16:9)", width: 1920, height: 1080 },
];

const BLOCK_TYPES = [
  { type: "heading", label: "Heading", icon: MdTitle },
  { type: "text", label: "Text", icon: MdNotes },
  { type: "image", label: "Image", icon: MdImage },
];

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "40px"];
const FONT_WEIGHTS = [
  { value: "400", label: "Normal" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
];
const ALIGNS = [
  { value: "left", icon: MdFormatAlignLeft },
  { value: "center", icon: MdFormatAlignCenter },
  { value: "right", icon: MdFormatAlignRight },
  { value: "justify", icon: MdFormatAlignJustify },
];

const newBlock = (type) => ({
  id: crypto.randomUUID(),
  type,
  text: "",
  imageFile: null,
  imagePreview: null,
  existingImage: "",
  fontFamily: "",
  fontSize: "",
  fontWeight: type === "heading" ? "700" : "",
  underline: false,
  textAlign: "center",
  listType: "none",
  color: "#ffffff",
  strokeColor: "#000000",
  strokeWidth: 0,
});

const blockFromServer = (b) => ({
  id: crypto.randomUUID(),
  type: b.type,
  text: b.text || "",
  imageFile: null,
  imagePreview: null,
  existingImage: b.image || "",
  fontFamily: b.fontFamily || "",
  fontSize: b.fontSize || "",
  fontWeight: b.fontWeight || "",
  underline: Boolean(b.underline),
  textAlign: b.textAlign || "center",
  listType: b.listType || "none",
  color: b.color || "#ffffff",
  strokeColor: b.strokeColor || "#000000",
  strokeWidth: b.strokeWidth || 0,
});

const SAMPLE_TOKENS = {
  name: "Ahmed",
  date: "25 Jul 2026",
  time: "6:00 PM",
  eventName: "DNK Roadshow",
};

function IconToggle({ active, onClick, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-7 w-7 items-center justify-center rounded-md border transition-colors ${
        active
          ? "border-[#0F2C45] bg-[#0F2C45]/10 text-[#0F2C45]"
          : "border-[#D7DCE3] bg-white text-[#8791A1] hover:text-[#0F2C45]"
      }`}
    >
      {children}
    </button>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-1.5 rounded-md border border-[#D7DCE3] bg-white px-1.5 py-1 text-xs text-[#4B5566]">
      {label}
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
      />
    </label>
  );
}

function BlockToolbar({ block, updateBlock }) {
  const showList = block.type === "text";
  return (
    <div className="mb-2 flex flex-wrap items-center gap-1.5">
      <select
        value={block.fontFamily}
        onChange={(e) => updateBlock(block.id, { fontFamily: e.target.value })}
        className="rounded-md border border-[#D7DCE3] bg-white px-1.5 py-1 text-xs text-[#1A2233]"
        title="Font family"
      >
        <option value="">Default Font</option>
        {GOOGLE_FONTS.map((f) => (
          <option key={f.family} value={f.value} style={{ fontFamily: f.value }}>
            {f.label}
          </option>
        ))}
      </select>

      <select
        value={block.fontSize}
        onChange={(e) => updateBlock(block.id, { fontSize: e.target.value })}
        className="rounded-md border border-[#D7DCE3] bg-white px-1.5 py-1 text-xs text-[#1A2233]"
        title="Font size"
      >
        <option value="">Size</option>
        {FONT_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <select
        value={block.fontWeight}
        onChange={(e) => updateBlock(block.id, { fontWeight: e.target.value })}
        className="rounded-md border border-[#D7DCE3] bg-white px-1.5 py-1 text-xs text-[#1A2233]"
        title="Font weight"
      >
        <option value="">Weight</option>
        {FONT_WEIGHTS.map((w) => (
          <option key={w.value} value={w.value}>
            {w.label}
          </option>
        ))}
      </select>

      <IconToggle
        active={block.underline}
        onClick={() => updateBlock(block.id, { underline: !block.underline })}
        title="Underline"
      >
        <MdFormatUnderlined className="text-sm" />
      </IconToggle>

      <div className="flex items-center gap-1 border-l border-[#E5E8EE] pl-1.5">
        {ALIGNS.map(({ value, icon: Icon }) => (
          <IconToggle
            key={value}
            active={block.textAlign === value}
            onClick={() => updateBlock(block.id, { textAlign: value })}
            title={`Align ${value}`}
          >
            <Icon className="text-sm" />
          </IconToggle>
        ))}
      </div>

      {showList && (
        <div className="flex items-center gap-1 border-l border-[#E5E8EE] pl-1.5">
          <IconToggle
            active={block.listType === "none"}
            onClick={() => updateBlock(block.id, { listType: "none" })}
            title="No list"
          >
            <MdNotes className="text-sm" />
          </IconToggle>
          <IconToggle
            active={block.listType === "bullet"}
            onClick={() => updateBlock(block.id, { listType: "bullet" })}
            title="Bullet points"
          >
            <MdFormatListBulleted className="text-sm" />
          </IconToggle>
          <IconToggle
            active={block.listType === "number"}
            onClick={() => updateBlock(block.id, { listType: "number" })}
            title="Numbered list"
          >
            <MdFormatListNumbered className="text-sm" />
          </IconToggle>
        </div>
      )}

      <div className="flex items-center gap-1.5 border-l border-[#E5E8EE] pl-1.5">
        <ColorField label="Text" value={block.color} onChange={(v) => updateBlock(block.id, { color: v })} />
        <ColorField
          label="Stroke"
          value={block.strokeColor}
          onChange={(v) => updateBlock(block.id, { strokeColor: v })}
        />
        <label className="flex items-center gap-1 rounded-md border border-[#D7DCE3] bg-white px-1.5 py-1 text-xs text-[#4B5566]">
          Width
          <input
            type="number"
            min={0}
            max={6}
            step={0.5}
            value={block.strokeWidth}
            onChange={(e) => updateBlock(block.id, { strokeWidth: parseFloat(e.target.value) || 0 })}
            className="w-10 border-0 bg-transparent p-0 text-xs outline-none"
            title="Stroke width (px)"
          />
        </label>
      </div>
    </div>
  );
}

export default function InvitationTemplateEditor({ eventplace, onClose, onSaved }) {
  const { getInvitationTemplate, saveInvitationTemplate } = useInvitationTemplateServices();

  const [blocks, setBlocks] = useState([]);
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [posterWidth, setPosterWidth] = useState(1080);
  const [posterHeight, setPosterHeight] = useState(1350);
  const [existingImage, setExistingImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBlocks([]);
    setWhatsappMessage("");
    setPosterWidth(1080);
    setPosterHeight(1350);
    setExistingImage("");
    setImageFile(null);
    setImagePreview("");
    setLoading(true);

    const load = async () => {
      try {
        const response = await getInvitationTemplate(eventplace);
        if (response.success && response.data) {
          setBlocks((response.data.blocks || []).map(blockFromServer));
          setWhatsappMessage(
            response.data.whatsappMessage ||
              "Hi {{name}}, you're invited to our {{eventName}} event on {{date}} at {{time}}! We'd love to see you there."
          );
          setPosterWidth(response.data.posterWidth || 1080);
          setPosterHeight(response.data.posterHeight || 1350);
          setExistingImage(response.data.backgroundImage || "");
        } else {
          setWhatsappMessage(
            "Hi {{name}}, you're invited to our {{eventName}} event on {{date}} at {{time}}! We'd love to see you there."
          );
        }
      } catch (err) {
        console.error("Error loading invitation template:", err);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Could not load the existing template",
          showConfirmButton: false,
          timer: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    if (eventplace) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventplace]);

  const addBlock = (type) => setBlocks((prev) => [...prev, newBlock(type)]);
  const updateBlock = (id, patch) =>
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const removeBlock = (id) => setBlocks((prev) => prev.filter((b) => b.id !== id));
  const moveBlock = (index, direction) => {
    setBlocks((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const validateImageFile = (file) => {
    if (!file.type.startsWith("image/")) {
      Swal.fire("Invalid file", "Please choose an image file.", "warning");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      Swal.fire("Too large", "Please choose an image under 10MB.", "warning");
      return false;
    }
    return true;
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateImageFile(file)) {
      e.target.value = "";
      return;
    }
    setImageFile(file);
    setImagePreview(window.URL.createObjectURL(file));
  };

  const handleBlockImageChange = (id, file) => {
    if (!file || !validateImageFile(file)) return;
    updateBlock(id, { imageFile: file, imagePreview: window.URL.createObjectURL(file), existingImage: "" });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formdata = new FormData();

      const blockPayload = blocks.map(
        ({ type, text, existingImage: img, fontFamily, fontSize, fontWeight, underline, textAlign, listType, color, strokeColor, strokeWidth }) => ({
          type,
          text: text || "",
          image: img || "",
          fontFamily: fontFamily || "",
          fontSize: fontSize || "",
          fontWeight: fontWeight || "",
          underline: Boolean(underline),
          textAlign: textAlign || "center",
          listType: listType || "none",
          color: color || "#ffffff",
          strokeColor: strokeColor || "",
          strokeWidth: strokeWidth || 0,
        })
      );
      formdata.append("blocks", JSON.stringify(blockPayload));
      formdata.append("whatsappMessage", whatsappMessage);
      formdata.append("posterWidth", posterWidth);
      formdata.append("posterHeight", posterHeight);

      blocks.forEach((block, i) => {
        if (block.type === "image" && block.imageFile) {
          formdata.append(`block_image_${i}`, block.imageFile);
        }
      });

      if (imageFile) formdata.append("backgroundImage", imageFile);

      const response = await saveInvitationTemplate(eventplace, formdata);
      if (response.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Invitation template saved",
          showConfirmButton: false,
          timer: 2500,
        });
        onSaved?.();
        onClose?.();
      } else {
        Swal.fire("Failed", response.message || "Could not save the template.", "error");
      }
    } catch (err) {
      console.error("Error saving invitation template:", err);
      Swal.fire(
        "Error",
        err?.response?.data?.message || err?.message || "Something went wrong while saving.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const previewBackgroundUrl = imagePreview || (existingImage ? `${WWURL}${existingImage}` : "");
  const previewBlocks = blocks.map((b) => ({
    ...b,
    imageUrl: b.imagePreview || (b.existingImage ? `${WWURL}${b.existingImage}` : ""),
  }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      {/* Loads every curated font once so both the dropdown options and the
          live preview render in their real typeface immediately. */}
      <link rel="stylesheet" href={ALL_GOOGLE_FONTS_URL} />

      <div
        className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E5E8EE] px-5 py-4">
          <h3 className="text-sm font-semibold text-[#1A2233]">Customize WhatsApp Invitation</h3>
          <button onClick={onClose} title="Close">
            <MdClose className="text-lg text-[#8791A1] hover:text-[#1A2233]" />
          </button>
        </div>

        {loading ? (
          <div className="py-14 text-center text-sm text-[#8791A1]">Loading...</div>
        ) : (
          <div className="grid gap-5 p-5 sm:grid-cols-[1.3fr_1fr]">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#33394B]">
                  Background Image
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#D7DCE3] bg-[#F8F9FB] px-4 py-6 text-center hover:bg-[#F3F5F8]">
                  <MdImage className="text-2xl text-[#8791A1]" />
                  <span className="text-xs text-[#8791A1]">
                    Click to upload {existingImage || imageFile ? "(replace)" : ""}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBackgroundImageChange}
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-2">
                {BLOCK_TYPES.map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addBlock(type)}
                    className="flex items-center gap-1.5 rounded-lg border border-[#D7DCE3] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5566] hover:border-[#0F2C45]/40 hover:text-[#0F2C45]"
                  >
                    <Icon /> Add {label}
                  </button>
                ))}
              </div>

              {blocks.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#D7DCE3] py-8 text-center text-sm text-[#9AA4B2]">
                  No content yet — add a heading, text, or image block above.
                </div>
              ) : (
                <div className="space-y-3">
                  {blocks.map((block, i) => {
                    const meta = BLOCK_TYPES.find((t) => t.type === block.type);
                    const Icon = meta?.icon || MdNotes;
                    return (
                      <div key={block.id} className="rounded-lg border border-[#E5E8EE] bg-[#FBFBFC] p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#8791A1]">
                            <Icon /> {meta?.label}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => moveBlock(i, -1)}
                              disabled={i === 0}
                              className="text-[#8791A1] hover:text-[#0F2C45] disabled:opacity-30"
                              title="Move up"
                            >
                              <MdArrowUpward />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveBlock(i, 1)}
                              disabled={i === blocks.length - 1}
                              className="text-[#8791A1] hover:text-[#0F2C45] disabled:opacity-30"
                              title="Move down"
                            >
                              <MdArrowDownward />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeBlock(block.id)}
                              className="text-red-400 hover:text-red-600"
                              title="Delete block"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </div>

                        {block.type === "heading" && (
                          <>
                            <BlockToolbar block={block} updateBlock={updateBlock} />
                            <Input
                              placeholder="Heading text — e.g. You're Invited"
                              value={block.text}
                              onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                            />
                          </>
                        )}

                        {block.type === "text" && (
                          <>
                            <BlockToolbar block={block} updateBlock={updateBlock} />
                            <Textarea
                              rows={4}
                              placeholder={
                                block.listType === "none"
                                  ? "Hi {{name}}, join us on {{date}} at {{time}}..."
                                  : "One point per line — each line becomes a list item"
                              }
                              hint="Use {{name}}, {{date}}, {{time}} and {{eventName}} to personalize."
                              value={block.text}
                              onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                            />
                          </>
                        )}

                        {block.type === "image" && (
                          <div>
                            {block.imagePreview || block.existingImage ? (
                              <div className="relative mb-2 h-24 w-full max-w-xs overflow-hidden rounded-lg border border-[#D7DCE3] bg-white">
                                <img
                                  src={
                                    block.imagePreview ||
                                    `${WWURL}${block.existingImage}`
                                  }
                                  alt="Block preview"
                                  className="h-full w-full object-contain"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateBlock(block.id, {
                                      imageFile: null,
                                      imagePreview: null,
                                      existingImage: "",
                                    })
                                  }
                                  className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                                >
                                  <MdClose className="text-sm" />
                                </button>
                              </div>
                            ) : (
                              <label className="mb-2 flex h-20 w-full max-w-xs cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#D7DCE3] text-xs text-[#9AA4B2] hover:border-[#0F2C45]/40 hover:text-[#0F2C45]">
                                Click to upload image
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleBlockImageChange(block.id, e.target.files[0])}
                                />
                              </label>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <Textarea
                label="WhatsApp Message"
                rows={3}
                placeholder="Hi {{name}}, you're invited to our {{eventName}} event on {{date}} at {{time}}!"
                hint="Sent alongside the invitation image. Use {{name}}, {{date}}, {{time}} and {{eventName}}."
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
              />
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium text-[#33394B]">Frame Size</p>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {SIZE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setPosterWidth(preset.width);
                      setPosterHeight(preset.height);
                    }}
                    className={`rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
                      posterWidth === preset.width && posterHeight === preset.height
                        ? "border-[#0F2C45] bg-[#0F2C45]/10 text-[#0F2C45]"
                        : "border-[#D7DCE3] bg-white text-[#4B5566] hover:border-[#0F2C45]/40"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="mb-4 flex items-center gap-2">
                <label className="flex items-center gap-1.5 rounded-md border border-[#D7DCE3] bg-white px-2 py-1 text-xs text-[#4B5566]">
                  W
                  <input
                    type="number"
                    min={200}
                    max={4000}
                    value={posterWidth}
                    onChange={(e) => setPosterWidth(parseInt(e.target.value, 10) || 1080)}
                    className="w-16 border-0 bg-transparent p-0 text-xs outline-none"
                  />
                  px
                </label>
                <label className="flex items-center gap-1.5 rounded-md border border-[#D7DCE3] bg-white px-2 py-1 text-xs text-[#4B5566]">
                  H
                  <input
                    type="number"
                    min={200}
                    max={4000}
                    value={posterHeight}
                    onChange={(e) => setPosterHeight(parseInt(e.target.value, 10) || 1350)}
                    className="w-16 border-0 bg-transparent p-0 text-xs outline-none"
                  />
                  px
                </label>
              </div>

              <p className="mb-1.5 text-sm font-medium text-[#33394B]">Preview</p>
              <ScaledPosterPreview
                displayWidth={320}
                width={posterWidth}
                height={posterHeight}
                className="rounded-xl border border-[#E5E8EE]"
              >
                <InvitationPoster
                  backgroundImageUrl={previewBackgroundUrl}
                  blocks={previewBlocks}
                  tokens={SAMPLE_TOKENS}
                  width={posterWidth}
                  height={posterHeight}
                />
              </ScaledPosterPreview>
              <p className="mt-2 text-xs text-[#9AA4B2]">
                Preview uses sample values — {SAMPLE_TOKENS.name}, {SAMPLE_TOKENS.date},{" "}
                {SAMPLE_TOKENS.time}.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 border-t border-[#E5E8EE] px-5 py-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving} disabled={loading}>
            Save Template
          </Button>
        </div>
      </div>
    </div>
  );
}
