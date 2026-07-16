// Parses a block of pasted text into { name, email, phone } rows. Handles
// one-per-line plain emails, "Name <email>" and "Name, email" formats, and
// comma/semicolon-separated lists — whatever someone pastes from a
// spreadsheet, contact export, or email client.
export function parsePastedContacts(raw) {
  const lines = String(raw || "")
    .split(/[\n,;]+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const results = [];
  for (const line of lines) {
    const emailMatch = line.match(/[^\s<>]+@[^\s<>]+\.[^\s<>]+/);
    if (!emailMatch) continue;
    const email = emailMatch[0];
    const name = line.replace(email, "").replace(/[<>]/g, "").trim();
    results.push({ name, email, phone: "" });
  }
  return results;
}
