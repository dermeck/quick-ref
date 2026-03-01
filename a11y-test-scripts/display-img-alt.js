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
document.querySelectorAll("img").forEach((img) => {
  // Determine alt text
  const alt = img.getAttribute("alt");
  const altText = alt && alt.trim() ? alt.trim() : "(missing alt)";

  // Add visible outline
  img.style.outline = "2px solid #b23a48";

  // Get absolute coordinates
  const rect = img.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Create floating badge
  const badge = document.createElement("div");
  badge.textContent = altText;
  badge.style.position = "absolute";
  badge.style.left = `${left - 20}px`;
  badge.style.top = `${top - 30}px`;
  badge.style.background = "#b23a48";
  badge.style.color = "white";
  badge.style.padding = "5px";
  badge.style.borderRadius = "5px";
  badge.style.fontSize = "16px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";

  // Add to overlay layer
  overlay.appendChild(badge);
});
