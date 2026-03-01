// ----------------------
// Scroll-safe overlay container
// ----------------------
const overlay = document.createElement("div");
overlay.style.position = "absolute";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.pointerEvents = "none";
overlay.style.zIndex = "999999";
document.body.appendChild(overlay);

// ----------------------
// Helpers
// ----------------------

// Accessible name helper (shared with radio-group)
function getAccessibleName(el) {
  // 1. aria-label
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();

  // 2. aria-labelledby
  const labelledby = el.getAttribute("aria-labelledby");
  if (labelledby) {
    const ids = labelledby.split(" ");
    const texts = ids
      .map((id) => {
        const ref = document.getElementById(id);
        return ref ? ref.textContent.trim() : "";
      })
      .filter(Boolean);
    if (texts.length) return texts.join(" ");
  }

  return "(no name)";
}

// ----------------------
// 1. FIELDSETS
// ----------------------
document.querySelectorAll("fieldset").forEach((fs) => {
  // Compute accessible name from LEGEND
  const legend = fs.querySelector("legend");
  const name =
    legend && legend.textContent.trim()
      ? legend.textContent.trim()
      : "(no name)";

  // Outline fieldset
  fs.style.outline = "3px solid #1e8449";

  // Position of fieldset
  const rect = fs.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Floating badge
  const badge = document.createElement("div");
  badge.textContent = `Fieldset: ${name}`;
  badge.style.position = "absolute";
  badge.style.left = `${left}px`;
  badge.style.top = `${top - 30}px`;
  badge.style.background = "#1e8449";
  badge.style.color = "white";
  badge.style.padding = "4px 6px";
  badge.style.borderRadius = "4px";
  badge.style.fontSize = "16px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";
  badge.style.zIndex = "999999";

  overlay.appendChild(badge);
});

// ----------------------
// 2. ARIA RADIO-GROUPS
// ----------------------
document.querySelectorAll('[role="radiogroup"]').forEach((rg) => {
  const accName = getAccessibleName(rg);

  // Outline group
  rg.style.outline = "3px solid #7d3c98";

  // Position of the element
  const rect = rg.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Floating badge
  const badge = document.createElement("div");
  badge.textContent = `Radio-group: ${accName}`;
  badge.style.position = "absolute";
  badge.style.left = `${left}px`;
  badge.style.top = `${top - 30}px`;
  badge.style.background = "#7d3c98";
  badge.style.color = "white";
  badge.style.padding = "5px";
  badge.style.borderRadius = "5px";
  badge.style.fontSize = "16px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";
  badge.style.zIndex = "999999";

  overlay.appendChild(badge);
});
