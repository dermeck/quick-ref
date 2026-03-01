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
// Helper: Compute accessible name
// ----------------------
function getAccessibleName(el) {
  // aria-label
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();

  // aria-labelledby
  const labelledby = el.getAttribute("aria-labelledby");
  if (labelledby) {
    const ids = labelledby.trim().split(/\s+/);
    const texts = ids
      .map((id) => {
        const ref = document.getElementById(id);
        return ref ? ref.textContent.trim() : "";
      })
      .filter(Boolean);
    if (texts.length) return texts.join(" ");
  }

  // value for input buttons
  if (el.tagName === "INPUT") {
    const value = el.getAttribute("value");
    if (value && value.trim()) return value.trim();
  }

  // visible text
  const txt = el.textContent.trim();
  if (txt) return txt;

  return "(no name)";
}

// ----------------------
// Button selector
// ----------------------
const buttonSelector = `
  button,
  [role="button"],
  input[type="button"],
  input[type="submit"],
  input[type="reset"]
`;

const buttons = Array.from(document.querySelectorAll(buttonSelector));

// ----------------------
// Process each button
// ----------------------
buttons.forEach((btn) => {
  const name = getAccessibleName(btn);

  // Add outline
  btn.style.outline = "3px solid #ca6510";

  // Compute location
  const rect = btn.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Floating badge
  const badge = document.createElement("div");
  badge.textContent = `Button: ${name}`;
  badge.style.position = "absolute";
  badge.style.left = `${left}px`;
  badge.style.top = `${top - 28}px`;
  badge.style.background = "#ca6510";
  badge.style.color = "white";
  badge.style.padding = "5px";
  badge.style.fontSize = "16px";
  badge.style.borderRadius = "5px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";
  badge.style.zIndex = "999999";

  overlay.appendChild(badge);
});
