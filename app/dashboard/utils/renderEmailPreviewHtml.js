import { URL } from "@/url/axios";

const escapeHtml = (str) =>
  String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const renderText = (template) => String(template || "").replace(/\{\{\s*name\s*\}\}/gi, "there");

const buildTextStyle = (block, base) => {
  const styles = { ...base };
  if (block.fontSize) styles["font-size"] = block.fontSize;
  if (block.fontWeight) styles["font-weight"] = block.fontWeight;
  if (block.underline) styles["text-decoration"] = "underline";
  styles["text-align"] = block.textAlign || "left";
  return Object.entries(styles)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
};

const wrapLink = (link, content) =>
  link
    ? `<a href="${escapeHtml(link)}" style="text-decoration:none;color:inherit;">${content}</a>`
    : content;

// Client-side mirror of the backend's renderBlocksToHtml — same centered,
// fixed-width shell and formatting, but using local blob/public image URLs
// instead of cid attachments, and plain hrefs instead of click-tracking
// redirects, since this is only ever rendered locally for preview.
export function renderEmailPreviewHtml(blocks) {
  const parts = (blocks || []).map((block) => {
    switch (block.type) {
      case "heading": {
        const style = buildTextStyle(block, {
          "font-family": "Arial,sans-serif",
          color: "#1A2233",
          margin: "20px 0 10px",
          "font-size": "22px",
          "font-weight": "700",
        });
        const content = `<h2 style="${style}">${escapeHtml(renderText(block.text))}</h2>`;
        return wrapLink(block.link, content);
      }
      case "text": {
        const style = buildTextStyle(block, {
          "font-family": "Arial,sans-serif",
          color: "#1A2233",
          "line-height": "1.6",
          "white-space": "pre-line",
          margin: "10px 0",
          "font-size": "15px",
        });
        let content;
        if (block.listType === "bullet" || block.listType === "number") {
          const tag = block.listType === "bullet" ? "ul" : "ol";
          const items = renderText(block.text)
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => `<li style="margin-bottom:6px;">${escapeHtml(line)}</li>`)
            .join("");
          content = `<${tag} style="${style};padding-left:20px;">${items}</${tag}>`;
        } else {
          content = `<p style="${style}">${escapeHtml(renderText(block.text))}</p>`;
        }
        return wrapLink(block.link, content);
      }
      case "image": {
        const src = block.imagePreview || (block.existingImage ? URL + block.existingImage : "");
        if (!src) return "";
        const img = `<img src="${src}" style="max-width:100%;border-radius:8px;display:block;" />`;
        return block.link
          ? `<a href="${escapeHtml(block.link)}" style="text-decoration:none;">${img}</a>`
          : img;
      }
      case "button":
        return `<div style="margin:20px 0;text-align:${block.textAlign || "left"};"><a href="${escapeHtml(block.link || "#")}" style="display:inline-block;background:#0F2C45;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-family:Arial,sans-serif;">${escapeHtml(renderText(block.text))}</a></div>`;
      default:
        return "";
    }
  });

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body { margin: 0; padding: 0; background-color: #f4f4f4; }
  .email-content { padding: 32px; }
</style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td class="email-content">
              ${parts.length > 0 ? parts.join("\n") : '<p style="font-family:Arial,sans-serif;color:#9AA4B2;text-align:center;">Add a block to see a preview...</p>'}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
