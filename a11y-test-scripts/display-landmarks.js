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
// Landmark roles + colours
// ----------------------
const landmarkRoles = [
  "banner",
  "navigation",
  "main",
  "contentinfo",
  "complementary",
  "search",
  "region",
];

const roleColors = {
  banner: "#0a6ebd",
  navigation: "#b85c00",
  main: "#006400",
  contentinfo: "#7a0099",
  complementary: "#990000",
  search: "#357a38",
  region: "#666600",
};

/* Native HTML elements that map to landmarks:
   header, nav, main, footer, aside, section (if named), article (if named)
*/
const selectors = [
  "header",
  "nav",
  "main",
  "footer",
  "aside",
  "section",
  "article",
  "[role]",
].join(",");

// ----------------------
// Helper: compute landmark role
// ----------------------
function getLandmarkRole(el) {
  const role = el.getAttribute("role");
  if (landmarkRoles.includes(role)) return role;

  const tag = el.tagName.toLowerCase();
  if (tag === "header") return "banner";
  if (tag === "nav") return "navigation";
  if (tag === "main") return "main";
  if (tag === "footer") return "contentinfo";
  if (tag === "aside") return "complementary";

  if (
    (tag === "section" || tag === "article") &&
    (el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby"))
  ) {
    return "region";
  }

  return null;
}

// ----------------------
// Helper: compute accessible name
// ----------------------
function getAccessibleName(el) {
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();

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
// Main logic
// ----------------------
document.querySelectorAll(selectors).forEach((el) => {
  const role = getLandmarkRole(el);
  if (!role) return;

  // Apply outline using role colour
  const color = roleColors[role] || "#0a6ebd";
  el.style.outline = `3px solid ${color}`;

  const rect = el.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  const accName = getAccessibleName(el);

  const badge = document.createElement("div");
  badge.textContent = accName !== "(no name)" ? `${role}: ${accName}` : role;
  badge.style.position = "absolute";
  badge.style.left = `${left}px`;
  badge.style.top = `${top - 30}px`;
  badge.style.background = color;
  badge.style.color = "white";
  badge.style.padding = "5px";
  badge.style.borderRadius = "5px";
  badge.style.fontSize = "16px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";
  badge.style.zIndex = "999999";

  overlay.appendChild(badge);
});
