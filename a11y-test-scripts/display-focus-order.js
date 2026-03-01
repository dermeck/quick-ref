// ----------------------
// Focus order tracker (number as you TAB)
// ----------------------
let focusStep = 0;

// Create one floating badge for the currently focused element
const focusBadge = document.createElement("div");
focusBadge.style.position = "absolute";
focusBadge.style.background = "#111";
focusBadge.style.color = "white";
focusBadge.style.padding = "5px 8px";
focusBadge.style.borderRadius = "6px";
focusBadge.style.fontSize = "16px";
focusBadge.style.whiteSpace = "nowrap";
focusBadge.style.pointerEvents = "none";
focusBadge.style.zIndex = "999999";
document.body.appendChild(focusBadge);

function getLabel(el) {
  // Small, readable label to help identify the element
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const role = el.getAttribute("role");
  const name =
    (el.getAttribute("aria-label") || "").trim() ||
    (el.textContent || "").trim().slice(0, 40);

  const roleText = role ? `[role="${role}"]` : "";
  const nameText = name ? ` "${name.replace(/\s+/g, " ")}"` : "";

  return `${tag}${id}${roleText}${nameText}`;
}

function placeBadge(el) {
  const rect = el.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  focusBadge.style.left = `${left}px`;
  focusBadge.style.top = `${top - 30}px`;
}

function onFocusIn(e) {
  const el = e.target;
  if (!el || el === document.body || el === document.documentElement) return;

  focusStep += 1;

  // Outline the focused element so it’s obvious
  el.style.outline = "3px solid #111";

  // Update badge content + position
  focusBadge.textContent = `${focusStep}. ${getLabel(el)}`;
  placeBadge(el);
}

// Keep the badge aligned if the page scrolls/resizes while focused
function onScrollOrResize() {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return;
  placeBadge(el);
}

document.addEventListener("focusin", onFocusIn, true);
window.addEventListener("scroll", onScrollOrResize, true);
window.addEventListener("resize", onScrollOrResize, true);

console.log(
  "Focus order tracker active. Press Tab to step through focusable elements.",
);
