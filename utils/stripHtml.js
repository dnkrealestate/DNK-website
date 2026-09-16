// For truncated news-card previews only. These cards are wrapped in a
// next/link <a>, and the CMS-authored excerpt (newspara1) can itself
// contain an <a> (e.g. an in-body "off-plan projects in Dubai" link) —
// nesting an <a> inside an <a> is invalid HTML, so the browser's parser
// silently restructures the DOM on first paint, causing a React hydration
// mismatch. Stripping tags avoids that regardless of what the CMS content
// contains; full articles still render the real HTML via dangerouslySetInnerHTML
// on their own (non-linked) page.
export const stripHtml = (html) =>
  typeof html === "string" ? html.replace(/<[^>]*>/g, "").trim() : "";
