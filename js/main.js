document.addEventListener("DOMContentLoaded", () => {

  // ── Année footer ──────────────────────────────────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Onglets Work / Info ───────────────────────────────────────
  const mainTabs    = document.querySelectorAll(".tab-btn[data-tab]");
  const sectionWork = document.getElementById("section-work");
  const sectionInfo = document.getElementById("section-info");

  mainTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      mainTabs.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      if (btn.dataset.tab === "work") {
        sectionWork?.classList.remove("is-hidden");
        sectionInfo?.classList.add("is-hidden");
      } else {
        sectionWork?.classList.add("is-hidden");
        sectionInfo?.classList.remove("is-hidden");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // ── Filtre Dev / Design ───────────────────────────────────────
  const filterBtns  = document.querySelectorAll(".filter-btn[data-category]");
  const grid        = document.getElementById("projects-grid");
  const allCards    = document.querySelectorAll(".card[data-category]");
  let   activeFilter = null; // aucun filtre actif au départ

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category;

      // Cliquer sur le bouton déjà actif → tout masquer
      if (activeFilter === cat) {
        activeFilter = null;
        btn.classList.remove("active");
        // Réinitialiser toutes les cards et cacher la grille
        allCards.forEach((c) => {
          c.classList.remove("card-in");
          c.style.removeProperty("--delay");
          c.style.opacity = "0";
        });
        grid.classList.remove("is-visible");
        return;
      }

      // Nouveau filtre
      activeFilter = cat;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Réinitialiser les cards visibles
      allCards.forEach((c) => {
        c.classList.remove("card-in");
        c.style.removeProperty("--delay");
        c.style.opacity = "0";
      });

      // Récupérer les cards correspondantes
      const visible = [...allCards].filter(
        (c) => c.dataset.category === cat
      );

      // Afficher la grille
      grid.classList.add("is-visible");

      // Masquer les cards qui ne correspondent pas
      allCards.forEach((c) => {
        if (c.dataset.category !== cat) {
          c.style.display = "none";
        } else {
          c.style.display = "";
        }
      });

      // Déclencher l'animation en décalé (stagger)
      requestAnimationFrame(() => {
        visible.forEach((c, i) => {
          c.style.setProperty("--delay", `${i * 0.12}s`);
          // On force un reflow pour que l'animation reparte
          void c.offsetWidth;
          c.classList.add("card-in");
        });
      });

      // Scroll doux vers la grille
      setTimeout(() => {
        grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    });
  });

  // ── Scroll hero → projets ─────────────────────────────────────
  const heroScrollBtn  = document.querySelector(".hero-scroll");
  const projectsAnchor = document.getElementById("projects");

  if (heroScrollBtn && projectsAnchor) {
    heroScrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      projectsAnchor.scrollIntoView({ behavior: "smooth" });
    });
  }

});
