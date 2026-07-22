// Some older projects predate this schema tracking `createdAt` and have it
// missing entirely. Comparing `new Date(undefined)` against a real date
// produces NaN, and a sort comparator returning NaN has unspecified behavior
// per the JS spec — it doesn't cleanly reverse, it corrupts the order
// unpredictably. Falling back to the timestamp MongoDB's ObjectId always
// encodes keeps every project sortable by true creation time regardless.
export function getCreatedTime(project) {
  if (project?.createdAt) {
    const t = new Date(project.createdAt).getTime();
    if (!Number.isNaN(t)) return t;
  }
  const id = project?._id;
  if (id) {
    const hex = id.toString().substring(0, 8);
    const seconds = parseInt(hex, 16);
    if (!Number.isNaN(seconds)) return seconds * 1000;
  }
  return 0;
}

// Newest-created first, oldest-created last.
export function sortByCreatedDesc(list) {
  return [...list].sort((a, b) => getCreatedTime(b) - getCreatedTime(a));
}
