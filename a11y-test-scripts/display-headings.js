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
// Colour map per heading level
// ----------------------
const colours = {
  H1: "red",
  H2: "green",
  H3: "blue",
  H4: "purple",
  H5: "deepPink",
  H6: "black",
};

// ----------------------
// Main Logic
// ----------------------
document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((h) => {
  const tag = h.tagName.toUpperCase();
  const colour = colours[tag] || "#147580"; // fallback just in case

  // Border
  h.style.outline = `3px solid ${colour}`;

  // Position
  const rect = h.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Floating badge
  const badge = document.createElement("div");
  badge.textContent = tag;
  badge.style.position = "absolute";
  badge.style.left = `${left - 20}px`;
  badge.style.top = `${top - 30}px`;
  badge.style.background = colour;
  badge.style.color = "white";
  badge.style.padding = "5px 8px";
  badge.style.borderRadius = "5px";
  badge.style.fontSize = "16px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";
  badge.style.zIndex = "999999";

  overlay.appendChild(badge);
});
