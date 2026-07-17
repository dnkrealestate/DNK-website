"use client";

import React, { forwardRef } from "react";
import { WWURL } from "@/url/axios";

export function substituteTokens(text, tokens = {}) {
  if (!text) return "";
  return text
    .replace(/\{\{\s*name\s*\}\}/gi, tokens.name || "there")
    .replace(/\{\{\s*date\s*\}\}/gi, tokens.date || "")
    .replace(/\{\{\s*time\s*\}\}/gi, tokens.time || "")
    .replace(/\{\{\s*eventName\s*\}\}/gi, tokens.eventName || "");
}

// Converts the server's stored shape ({ backgroundImage: "file.webp", blocks:
// [{ image: "file.webp", ... }] }) into resolved URLs the poster can render
// directly. The editor builds its own version of this shape inline so it can
// mix in not-yet-uploaded blob URLs for live preview.
export function resolveInvitationTemplate(raw) {
  if (!raw) return { backgroundImageUrl: "", blocks: [], posterWidth: 1080, posterHeight: 1350 };
  return {
    backgroundImageUrl: raw.backgroundImage ? `${WWURL}${raw.backgroundImage}` : "",
    blocks: (raw.blocks || []).map((b) => ({
      ...b,
      imageUrl: b.image ? `${WWURL}${b.image}` : "",
    })),
    posterWidth: raw.posterWidth || 1080,
    posterHeight: raw.posterHeight || 1350,
  };
}

function blockTextStyle(block) {
  return {
    fontFamily: block.fontFamily || undefined,
    fontSize: block.fontSize || undefined,
    fontWeight: block.fontWeight || undefined,
    textDecoration: block.underline ? "underline" : undefined,
    textAlign: block.textAlign || "center",
    color: block.color || "#ffffff",
    WebkitTextStroke:
      block.strokeWidth > 0 ? `${block.strokeWidth}px ${block.strokeColor || "#000000"}` : undefined,
  };
}

function BlockText({ block, tokens }) {
  const content = substituteTokens(block.text, tokens);

  if (block.listType === "bullet" || block.listType === "number") {
    const items = content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const ListTag = block.listType === "bullet" ? "ul" : "ol";
    return (
      <ListTag
        className={block.listType === "bullet" ? "list-disc pl-5" : "list-decimal pl-5"}
        style={{ display: "inline-block", textAlign: block.textAlign || "left" }}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ListTag>
    );
  }

  return <div className="whitespace-pre-line">{content}</div>;
}

// Renders the poster at its true pixel size (width/height in px, matching the
// template's frame settings) so font sizes etc. are always 1:1 with the
// actual exported image — whether this is shown scaled-down (see
// ScaledPosterPreview below) or captured directly at full size for sharing.
const InvitationPoster = forwardRef(function InvitationPoster(
  { backgroundImageUrl, blocks = [], tokens = {}, width = 1080, height = 1350, className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-[#0B0E14] ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...(backgroundImageUrl
          ? {
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}),
      }}
    >
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden px-6 py-8 text-center">
        {blocks.length === 0 ? (
          <p className="text-sm text-white/60">Add blocks to design your invitation...</p>
        ) : (
          blocks.map((block) => (
            <div key={block.id} className="w-full">
              {block.type === "heading" && (
                <h2 style={blockTextStyle(block)} className="text-2xl font-bold leading-snug">
                  {substituteTokens(block.text, tokens) || "Heading"}
                </h2>
              )}

              {block.type === "text" && (
                <div style={blockTextStyle(block)} className="text-sm leading-relaxed">
                  <BlockText block={block} tokens={tokens} />
                </div>
              )}

              {block.type === "image" && (block.imagePreview || block.imageUrl) && (
                <img
                  src={block.imagePreview || block.imageUrl}
                  alt=""
                  crossOrigin="anonymous"
                  className="mx-auto max-h-28 object-contain"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
});

// Displays a true-size InvitationPoster shrunk to fit a fixed-width preview
// box via CSS transform, so the editor preview and the real exported image
// always agree on font/element proportions instead of drifting apart.
export function ScaledPosterPreview({ displayWidth = 320, width, height, className = "", children }) {
  const scale = width > 0 ? displayWidth / width : 1;
  const displayHeight = height * scale;

  return (
    <div
      className={`relative overflow-hidden bg-[#0B0E14] ${className}`}
      style={{ width: displayWidth, height: displayHeight }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

export default InvitationPoster;
