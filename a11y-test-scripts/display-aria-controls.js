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

// Colour for aria-controls highlights
const controlsColor = "#00796b"; // teal

// ----------------------
// Main logic
// ----------------------
document.querySelectorAll("[aria-controls]").forEach((controller) => {
  const controlsValue = controller.getAttribute("aria-controls");
  if (!controlsValue || !controlsValue.trim()) {
    return;
  }

  const ids = controlsValue.trim().split(/\s+/);

  // Outline the controller element
  controller.style.outline = `3px solid ${controlsColor}`;

  // Coordinates for controller badge
  const rect = controller.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Badge for the controller
  const controllerBadge = document.createElement("div");
  controllerBadge.textContent = `aria-controls: ${controlsValue}`;
  controllerBadge.style.position = "absolute";
  controllerBadge.style.left = `${left}px`;
  controllerBadge.style.top = `${top - 30}px`;
  controllerBadge.style.background = controlsColor;
  controllerBadge.style.color = "white";
  controllerBadge.style.padding = "5px";
  controllerBadge.style.borderRadius = "5px";
  controllerBadge.style.fontSize = "16px";
  controllerBadge.style.whiteSpace = "nowrap";
  controllerBadge.style.pointerEvents = "none";
  controllerBadge.style.zIndex = "999999";
  overlay.appendChild(controllerBadge);

  // Highlight each controlled element
  ids.forEach((id) => {
    const controlled = document.getElementById(id);

    if (!controlled) {
      console.warn(
        `aria-controls references missing element with id="${id}"`,
        controller,
      );
      return;
    }

    // Outline controlled element (dashed to distinguish)
    controlled.style.outline = `3px dashed ${controlsColor}`;

    const cRect = controlled.getBoundingClientRect();
    const cLeft = cRect.left + window.scrollX;
    const cTop = cRect.top + window.scrollY;

    const controlledBadge = document.createElement("div");
    controlledBadge.textContent = `controls: #${id}`;
    controlledBadge.style.position = "absolute";
    controlledBadge.style.left = `${cLeft}px`;
    controlledBadge.style.top = `${cTop - 24}px`;
    controlledBadge.style.background = controlsColor;
    controlledBadge.style.color = "white";
    controlledBadge.style.padding = "3px 5px";
    controlledBadge.style.borderRadius = "5px";
    controlledBadge.style.fontSize = "14px";
    controlledBadge.style.whiteSpace = "nowrap";
    controlledBadge.style.pointerEvents = "none";
    controlledBadge.style.zIndex = "999999";
    overlay.appendChild(controlledBadge);
  });
});
