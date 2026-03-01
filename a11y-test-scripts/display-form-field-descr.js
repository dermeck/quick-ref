/* -----------------------------------------
   Shared overlay container (scroll-safe)
------------------------------------------ */
const overlay = document.createElement("div");
overlay.style.position = "absolute";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.pointerEvents = "none";
overlay.style.zIndex = "999999";
document.body.appendChild(overlay);

/* -----------------------------------------
   Find all elements with aria-describedby
------------------------------------------ */
document.querySelectorAll("[aria-describedby]").forEach((el) => {
  const idList = el.getAttribute("aria-describedby").trim().split(/\s+/);

  // Compute description text from referenced elements
  const description = idList
    .map((id) => {
      const ref = document.getElementById(id);
      return ref ? ref.textContent.trim() : `(missing element #${id})`;
    })
    .filter(Boolean)
    .join(" ");

  // Add visible outline
  el.style.outline = "3px solid #0d6efd";

  // Compute absolute element position
  const rect = el.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;

  // Create floating badge
  const badge = document.createElement("div");
  badge.textContent = `Description: ${description}`;
  badge.style.position = "absolute";
  badge.style.left = `${left - 10}px`;
  badge.style.top = `${top - 30}px`;
  badge.style.background = "#0d6efd";
  badge.style.color = "white";
  badge.style.padding = "5px";
  badge.style.borderRadius = "5px";
  badge.style.fontSize = "16px";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";

  overlay.appendChild(badge);
});
