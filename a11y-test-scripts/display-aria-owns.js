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

// Colour for aria-owns highlights
const ownsColor = "#c2185b"; // pink-ish

// ----------------------
// Main logic
// ----------------------
document.querySelectorAll("[aria-owns]").forEach((owner) => {
  const ownsValue = owner.getAttribute("aria-owns");
  if (!ownsValue || !ownsValue.trim()) {
    return;
  }

  const ids = ownsValue.trim().split(/\s+/);

  // Outline the owner
  owner.style.outline = `3px solid ${ownsColor}`;

  // Position for the owner's badge
  const ownerRect = owner.getBoundingClientRect();
  const ownerLeft = ownerRect.left + window.scrollX;
  const ownerTop = ownerRect.top + window.scrollY;

  // Badge for the owner element
  const ownerBadge = document.createElement("div");
  ownerBadge.textContent = `aria-owns: ${ownsValue}`;
  ownerBadge.style.position = "absolute";
  ownerBadge.style.left = `${ownerLeft}px`;
  ownerBadge.style.top = `${ownerTop - 30}px`;
  ownerBadge.style.background = ownsColor;
  ownerBadge.style.color = "white";
  ownerBadge.style.padding = "5px";
  ownerBadge.style.borderRadius = "5px";
  ownerBadge.style.fontSize = "16px";
  ownerBadge.style.whiteSpace = "nowrap";
  ownerBadge.style.pointerEvents = "none";
  ownerBadge.style.zIndex = "999999";
  overlay.appendChild(ownerBadge);

  // Highlight each owned element
  ids.forEach((id) => {
    const owned = document.getElementById(id);
    if (!owned) {
      // Optional: log missing references to the console
      console.warn(
        `aria-owns references missing element with id="${id}"`,
        owner,
      );
      return;
    }

    // Outline the owned element (dashed to distinguish from owner)
    owned.style.outline = `3px dashed ${ownsColor}`;

    const rect = owned.getBoundingClientRect();
    const left = rect.left + window.scrollX;
    const top = rect.top + window.scrollY;

    const ownedBadge = document.createElement("div");
    ownedBadge.textContent = `owned: #${id}`;
    ownedBadge.style.position = "absolute";
    ownedBadge.style.left = `${left}px`;
    ownedBadge.style.top = `${top - 24}px`;
    ownedBadge.style.background = ownsColor;
    ownedBadge.style.color = "white";
    ownedBadge.style.padding = "3px 5px";
    ownedBadge.style.borderRadius = "5px";
    ownedBadge.style.fontSize = "14px";
    ownedBadge.style.whiteSpace = "nowrap";
    ownedBadge.style.pointerEvents = "none";
    ownedBadge.style.zIndex = "999999";
    overlay.appendChild(ownedBadge);
  });
});
