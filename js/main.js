document.addEventListener("DOMContentLoaded", () => {

  // Année dans le footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── ONGLETS DE FILTRAGE ───────────────────────────────────────
  const tabs = document.querySelectorAll(".tab-btn");
  const cards = document.querySelectorAll(".card[data-category]");

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Mettre à jour l'onglet actif
      tabs.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
          // Relancer l'animation de révélation
          card.classList.remove("is-visible");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => card.classList.add("is-visible"));
          });
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ─── SCROLL SMOOTH VERS #PROJECTS ─────────────────────────────
  const heroScroll = document.querySelector(".hero-scroll");
  const projectsSection = document.getElementById("projects");

  if (heroScroll && projectsSection) {
    heroScroll.addEventListener("click", (e) => {
      e.preventDefault();
      projectsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ─── ANIMATION REVEAL AU SCROLL ───────────────────────────────
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

});
