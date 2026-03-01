// ----------------------
// Accessible Name Helper
// ----------------------
function getLinkName(el) {
  // 1. aria-labelledby
  const labelledby = el.getAttribute("aria-labelledby");
  if (labelledby) {
    const parts = labelledby.split(/\s+/).map((id) => {
      const ref = document.getElementById(id);
      return ref ? ref.textContent.trim() : "";
    });
    const name = parts.join(" ").trim();
    if (name) return name;
  }

  // 2. aria-label
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();

  // 3. Text content
  const text = el.textContent.trim();
  if (text) return text;

  // 4. Images inside links (alt text)
  const img = el.querySelector("img");
  if (img) {
    const alt = img.getAttribute("alt");
    if (alt && alt.trim()) return alt.trim();
  }

  return "(no accessible name)";
}

// ----------------------
// Scroll-Safe Overlay Container
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
// Main Logic
// ----------------------
document.querySelectorAll("a").forEach((a) => {
  const accName = getLinkName(a);

  // Add border to the link
  a.style.outline = "2px solid #6a1b9a";

  // Get page coordinates
  const rect = a.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Create floating label
  const badge = document.createElement("div");
  badge.textContent = accName;
  badge.style.position = "absolute";
  badge.style.left = `${left}px`;
  badge.style.top = `${top - 28}px`;
  badge.style.background = "#6a1b9a";
  badge.style.color = "white";
  badge.style.padding = "4px 6px";
  badge.style.borderRadius = "4px";
  badge.style.fontSize = "16px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";

  overlay.appendChild(badge);
});
