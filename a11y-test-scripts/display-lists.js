// -------------------------------------------
// Scroll-safe overlay container
// -------------------------------------------
const overlay = document.createElement("div");
overlay.style.position = "absolute";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.pointerEvents = "none";
overlay.style.zIndex = "999999";
document.body.appendChild(overlay);

// -------------------------------------------
// Badge helper
// -------------------------------------------
function drawBadge(el, label, color) {
  // Outline element
  el.style.outline = `3px solid ${color}`;

  // Position calculation with scroll offsets
  const rect = el.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY - 28; // float above element

  // Create floating badge
  const badge = document.createElement("div");
  badge.textContent = label;
  badge.style.position = "absolute";
  badge.style.left = `${left}px`;
  badge.style.top = `${top}px`;
  badge.style.background = color;
  badge.style.color = "white";
  badge.style.padding = "5px";
  badge.style.borderRadius = "5px";
  badge.style.fontSize = "16px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";
  badge.style.zIndex = "999999";

  overlay.appendChild(badge);
}

// -------------------------------------------
// 1. Highlight UL / OL / DL
// -------------------------------------------
document.querySelectorAll("ul").forEach((el) => {
  drawBadge(el, "UL", "#006d77");
});

document.querySelectorAll("ol").forEach((el) => {
  drawBadge(el, "OL", "#005f8f");
});

document.querySelectorAll("dl").forEach((el) => {
  drawBadge(el, "DL", "#4a148c");
});

// -------------------------------------------
// 2. Highlight LI / DT / DD
// -------------------------------------------
document.querySelectorAll("li").forEach((el) => {
  drawBadge(el, "LI", "#8a5a44");
});

document.querySelectorAll("dt").forEach((el) => {
  drawBadge(el, "DT", "#7f3d9c");
});

document.querySelectorAll("dd").forEach((el) => {
  drawBadge(el, "DD", "#b83b5e");
});
