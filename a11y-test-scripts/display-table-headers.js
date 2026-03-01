/* -----------------------------------------
   Shared overlay container (scroll-safe)
------------------------------------------ */
const overlay = document.createElement("div");
overlay.style.position = "absolute";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.pointerEvents = "none";
overlay.style.zIndex = "999999";
document.body.appendChild(overlay);

/* -----------------------------------------
   1. Highlight all TABLES
------------------------------------------ */
document.querySelectorAll("table").forEach((table) => {
  // Add visible outline
  table.style.outline = "3px solid #d35400";

  // Get caption text (if present)
  const captionEl = table.querySelector("caption");
  const caption =
    captionEl && captionEl.textContent.trim()
      ? captionEl.textContent.trim()
      : "(no caption)";

  // Compute position
  const rect = table.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Floating label for the table
  const badge = document.createElement("div");
  badge.textContent = `Table: ${caption}`;
  badge.style.position = "absolute";
  badge.style.left = `${left}px`;
  badge.style.top = `${top - 30}px`;
  badge.style.background = "#d35400";
  badge.style.color = "white";
  badge.style.padding = "4px 6px";
  badge.style.borderRadius = "4px";
  badge.style.fontSize = "14px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";

  overlay.appendChild(badge);
});

/* -----------------------------------------
   2. Highlight all TH cells
------------------------------------------ */
document.querySelectorAll("th").forEach((th) => {
  // Add outline
  th.style.outline = "2px dashed #8e44ad";

  // Compute position
  const rect = th.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Floating label
  const thBadge = document.createElement("div");
  thBadge.textContent = "TH";
  thBadge.style.position = "absolute";
  thBadge.style.left = `${left}px`;
  thBadge.style.top = `${top - 20}px`;
  thBadge.style.background = "#8e44ad";
  thBadge.style.color = "white";
  thBadge.style.padding = "2px 4px";
  thBadge.style.borderRadius = "3px";
  thBadge.style.fontSize = "16px";
  thBadge.style.whiteSpace = "nowrap";
  thBadge.style.pointerEvents = "none";

  overlay.appendChild(thBadge);
});
