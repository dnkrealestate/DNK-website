"use client";
import React, { useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { TableKit } from "@tiptap/extension-table";
import { TextSelection } from "@tiptap/pm/state";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdLink,
  MdLinkOff,
  MdTableChart,
  MdDeleteOutline,
} from "react-icons/md";

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Old About Paragraph data (saved before this rich-text editor existed) is
// plain text with real line breaks (\r\n). Tiptap parses its `content` as
// HTML, and HTML collapses bare newlines into spaces — so without this, an
// old paragraph's lines merge into one blob and "bullet list" wraps all of
// it as a single bullet instead of one bullet per line.
function plainTextToHtml(text) {
  if (!text) return "";
  if (/<[a-z][\s\S]*>/i.test(text)) return text;
  return text
    .split(/\r\n|\r|\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

// Lets "select multiple lines, click Bullet/Numbered list" work even when
// those lines are hard breaks (Shift+Enter) inside one paragraph, not
// separate paragraphs — ProseMirror's list commands only turn whole block
// nodes into list items, so a multi-line paragraph would otherwise become
// a single bullet. Splits the selection's paragraph at each hard break into
// separate paragraphs first, and re-selects the full range so the list
// command that runs right after wraps every resulting line.
function splitSelectionByHardBreaks(editor) {
  const { state } = editor;
  const { from, to } = state.selection;

  // Selecting all also selects any trailing empty paragraph Tiptap keeps
  // after the last block — collect every textblock the selection touches
  // (not just one) so mixed multi-paragraph selections still work.
  const targets = [];
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.isTextblock) {
      let hasBreak = false;
      node.forEach((child) => {
        if (child.type.name === "hardBreak") hasBreak = true;
      });
      if (hasBreak) targets.push({ pos, node });
      return false;
    }
    return true;
  });
  if (!targets.length) return;

  const schema = state.schema;
  const tr = state.tr;
  for (let i = targets.length - 1; i >= 0; i -= 1) {
    const { pos, node } = targets[i];
    const mappedStart = tr.mapping.map(pos);
    const mappedEnd = tr.mapping.map(pos + node.nodeSize);
    const lines = [[]];
    node.forEach((child) => {
      if (child.type.name === "hardBreak") {
        lines.push([]);
      } else {
        lines[lines.length - 1].push(child);
      }
    });
    const newNodes = lines
      .filter((line) => line.length > 0)
      .map((line) => schema.nodes.paragraph.create(null, line));
    if (!newNodes.length) continue;
    tr.replaceWith(mappedStart, mappedEnd, newNodes);
  }

  tr.setSelection(TextSelection.create(tr.doc, tr.mapping.map(from), tr.mapping.map(to)));
  editor.view.dispatch(tr);
}

function ToolbarButton({ active, onClick, title, children }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-md text-[#33394B] transition-colors ${
        active ? "bg-[#0F2C45] text-white" : "hover:bg-[#F3F5F8]"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        link: {
          openOnClick: false,
          autolink: true,
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({ types: ["paragraph"] }),
      TableKit.configure({
        table: { resizable: true },
      }),
    ],
    content: plainTextToHtml(value || ""),
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] rounded-b-lg bg-white px-3.5 py-2.5 text-sm text-[#1A2233] focus:outline-none rich-content",
      },
    },
  });

  // The editor only reads `value` once on mount. When the parent loads an
  // existing project's data asynchronously (edit mode), resync the content —
  // but skip it while the user is actively typing, since setContent would
  // reset the cursor position mid-edit.
  useEffect(() => {
    if (!editor) return;
    if (editor.isFocused) return;
    const current = editor.getHTML();
    const next = plainTextToHtml(value || "");
    if (next !== current) {
      editor.commands.setContent(next, false);
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Link URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="mb-5 overflow-hidden rounded-lg border border-[#D7DCE3] focus-within:border-[#0F2C45] focus-within:ring-2 focus-within:ring-[#0F2C45]/10">
      <div className="flex flex-wrap items-center gap-1 border-b border-[#D7DCE3] bg-[#F9FAFC] p-1.5">
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <MdFormatBold size={18} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <MdFormatItalic size={18} />
        </ToolbarButton>
        <ToolbarButton
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <MdFormatUnderlined size={18} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#D7DCE3]" />

        <ToolbarButton
          title="Align left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <MdFormatAlignLeft size={18} />
        </ToolbarButton>
        <ToolbarButton
          title="Align center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <MdFormatAlignCenter size={18} />
        </ToolbarButton>
        <ToolbarButton
          title="Align right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <MdFormatAlignRight size={18} />
        </ToolbarButton>
        <ToolbarButton
          title="Justify"
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <MdFormatAlignJustify size={18} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#D7DCE3]" />

        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => {
            splitSelectionByHardBreaks(editor);
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <MdFormatListBulleted size={18} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => {
            splitSelectionByHardBreaks(editor);
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <MdFormatListNumbered size={18} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#D7DCE3]" />

        <ToolbarButton title="Add link" active={editor.isActive("link")} onClick={setLink}>
          <MdLink size={18} />
        </ToolbarButton>
        <ToolbarButton
          title="Remove link"
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <MdLinkOff size={18} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#D7DCE3]" />

        <ToolbarButton
          title="Insert table"
          active={editor.isActive("table")}
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          <MdTableChart size={18} />
        </ToolbarButton>
        {editor.isActive("table") && (
          <>
            <ToolbarButton
              title="Add column after"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              <span className="text-xs font-semibold">Col+</span>
            </ToolbarButton>
            <ToolbarButton
              title="Delete column"
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              <span className="text-xs font-semibold">Col-</span>
            </ToolbarButton>
            <ToolbarButton
              title="Add row after"
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <span className="text-xs font-semibold">Row+</span>
            </ToolbarButton>
            <ToolbarButton
              title="Delete row"
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              <span className="text-xs font-semibold">Row-</span>
            </ToolbarButton>
            <ToolbarButton
              title="Delete table"
              onClick={() => editor.chain().focus().deleteTable().run()}
            >
              <MdDeleteOutline size={18} />
            </ToolbarButton>
          </>
        )}

        <span className="mx-1 h-5 w-px bg-[#D7DCE3]" />

        <label
          title="Text color"
          className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#F3F5F8]"
        >
          <span
            className="h-4 w-4 rounded-full border border-[#D7DCE3]"
            style={{ backgroundColor: editor.getAttributes("textStyle").color || "#1A2233" }}
          />
          <input
            type="color"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            value={editor.getAttributes("textStyle").color || "#1A2233"}
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </label>
      </div>
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
}
