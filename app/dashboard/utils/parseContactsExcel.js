import * as XLSX from "xlsx";

const NAME_KEYS = ["name", "full name", "fullname", "client name", "customer name"];
const EMAIL_KEYS = ["email", "email address", "e-mail", "mail"];
const PHONE_KEYS = ["phone", "mobile", "contact number", "phone number", "mobile number", "contact", "whatsapp"];

function pickField(row, candidates) {
  const keys = Object.keys(row);
  for (const candidate of candidates) {
    const matchKey = keys.find((k) => k.trim().toLowerCase() === candidate);
    if (matchKey) return row[matchKey];
  }
  return "";
}

// Reads an uploaded Excel/CSV file and returns { name, email, phone } rows —
// only Email is required, since sheets sometimes only have that column.
export function parseContactsExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        const parsed = rows
          .map((row) => ({
            name: String(pickField(row, NAME_KEYS) || "").trim(),
            email: String(pickField(row, EMAIL_KEYS) || "").trim(),
            phone: String(pickField(row, PHONE_KEYS) || "").trim(),
          }))
          .filter((r) => /^\S+@\S+\.\S+$/.test(r.email));

        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
