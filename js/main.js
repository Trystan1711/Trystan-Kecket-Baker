document.addEventListener("DOMContentLoaded", () => {

  // Année footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
