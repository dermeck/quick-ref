function getAccName(el) {
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

  // 3. label[for]
  if (el.id) {
    const explicit = document.querySelector(`label[for="${el.id}"]`);
    if (explicit) {
      const name = explicit.textContent.trim();
      if (name) return name;
    }
  }

  // 4. nested label
  const nestedLabel = el.closest("label");
  if (nestedLabel) {
    const name = nestedLabel.textContent.trim();
    if (name) return name;
  }

  // 5. element text content
  const text = el.textContent.trim();
  if (text) return text;

  // 6. placeholder fallback
  const placeholder = el.getAttribute("placeholder");
  if (placeholder && placeholder.trim()) return placeholder.trim();

  return "(no accessible name)";
}

// -------------------------------------------
// SCROLL-SAFE OVERLAY (absolute, not fixed)
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
// Elements to inspect
// -------------------------------------------
const controls = document.querySelectorAll(
  'input, select, textarea, [role="textbox"], [role="combobox"], [role="spinbutton"]',
);

// -------------------------------------------
// Main rendering logic
// -------------------------------------------
controls.forEach((ctrl) => {
  const accName = getAccName(ctrl);

  // Outline the control
  ctrl.style.outline = "2px solid #0a558c";

  // Compute absolute coordinates
  const rect = ctrl.getBoundingClientRect();
  const left = rect.left + window.scrollX - 20;
  const top = rect.top + window.scrollY - 30;

  // Create floating badge
  const badge = document.createElement("div");
  badge.textContent = accName;
  badge.style.position = "absolute";
  badge.style.left = `${left}px`;
  badge.style.top = `${top}px`;
  badge.style.background = "#0a558c";
  badge.style.color = "white";
  badge.style.padding = "5px";
  badge.style.borderRadius = "5px";
  badge.style.fontSize = "16px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";

  overlay.appendChild(badge);
});
