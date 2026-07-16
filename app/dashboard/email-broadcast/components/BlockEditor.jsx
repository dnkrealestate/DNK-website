"use client";

import Image from "next/image";
import {
  MdTitle,
  MdNotes,
  MdImage,
  MdSmartButton,
  MdArrowUpward,
  MdArrowDownward,
  MdDelete,
  MdClose,
  MdLink,
  MdFormatUnderlined,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdFormatListBulleted,
  MdFormatListNumbered,
} from "react-icons/md";
import { Input, Textarea } from "@/app/dashboard/components/ui/Field";
import { URL } from "@/url/axios";

const BLOCK_TYPES = [
  { type: "heading", label: "Heading", icon: MdTitle },
  { type: "text", label: "Text", icon: MdNotes },
  { type: "image", label: "Image", icon: MdImage },
  { type: "button", label: "Button", icon: MdSmartButton },
];

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px"];
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
  link: "",
  imageFile: null,
  imagePreview: null,
  existingImage: "", // filename already on the server (loaded from a template/draft)
  fontSize: "",
  fontWeight: "",
  underline: false,
  textAlign: "left",
  listType: "none",
});

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

function TextFormatToolbar({ block, updateBlock, showList }) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-1.5">
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
    </div>
  );
}

function LinkField({ value, onChange, placeholder }) {
  return (
    <div className="mt-2 flex items-center gap-1.5">
      <MdLink className="shrink-0 text-[#8791A1]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3 py-2 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] focus:border-[#0F2C45] focus:outline-none"
      />
    </div>
  );
}

export default function BlockEditor({ blocks, setBlocks }) {
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

  const handleImageChange = (id, file) => {
    if (!file) return;
    updateBlock(id, { imageFile: file, imagePreview: window.URL.createObjectURL(file), existingImage: "" });
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
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
        <div className="rounded-lg border border-dashed border-[#D7DCE3] py-10 text-center text-sm text-[#9AA4B2]">
          No content yet — add a heading, text, image, or button block above.
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
                    <TextFormatToolbar block={block} updateBlock={updateBlock} showList={false} />
                    <Input
                      placeholder="Heading text"
                      value={block.text}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                    />
                    <LinkField
                      placeholder="Link when clicked (optional) — e.g. https://..."
                      value={block.link}
                      onChange={(e) => updateBlock(block.id, { link: e.target.value })}
                    />
                  </>
                )}

                {block.type === "text" && (
                  <>
                    <TextFormatToolbar block={block} updateBlock={updateBlock} showList={true} />
                    <Textarea
                      rows={4}
                      placeholder={
                        block.listType === "none"
                          ? "Hi {{name}}, ..."
                          : "One point per line — each line becomes a list item"
                      }
                      hint="Use {{name}} to personalize with each recipient's name."
                      value={block.text}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                    />
                    <LinkField
                      placeholder="Link when clicked (optional) — e.g. https://..."
                      value={block.link}
                      onChange={(e) => updateBlock(block.id, { link: e.target.value })}
                    />
                  </>
                )}

                {block.type === "image" && (
                  <div>
                    {block.imagePreview || block.existingImage ? (
                      <div className="relative mb-2 h-32 w-full max-w-xs overflow-hidden rounded-lg border border-[#D7DCE3]">
                        <Image
                          src={block.imagePreview || URL + block.existingImage}
                          alt="Block preview"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateBlock(block.id, { imageFile: null, imagePreview: null, existingImage: "" })
                          }
                          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                        >
                          <MdClose className="text-sm" />
                        </button>
                      </div>
                    ) : (
                      <label className="mb-2 flex h-24 w-full max-w-xs cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#D7DCE3] text-xs text-[#9AA4B2] hover:border-[#0F2C45]/40 hover:text-[#0F2C45]">
                        Click to upload image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(block.id, e.target.files[0])}
                        />
                      </label>
                    )}
                    <LinkField
                      placeholder="Link when clicked (optional) — e.g. https://..."
                      value={block.link}
                      onChange={(e) => updateBlock(block.id, { link: e.target.value })}
                    />
                  </div>
                )}

                {block.type === "button" && (
                  <>
                    <div className="mb-2 flex items-center gap-1 border-b border-[#E5E8EE] pb-2">
                      {ALIGNS.slice(0, 3).map(({ value, icon: AlignIcon }) => (
                        <IconToggle
                          key={value}
                          active={block.textAlign === value}
                          onClick={() => updateBlock(block.id, { textAlign: value })}
                          title={`Align ${value}`}
                        >
                          <AlignIcon className="text-sm" />
                        </IconToggle>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <Input
                        placeholder="Button label, e.g. Register Now"
                        value={block.text}
                        onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      />
                      <Input
                        placeholder="Link when clicked — e.g. https://..."
                        value={block.link}
                        onChange={(e) => updateBlock(block.id, { link: e.target.value })}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
