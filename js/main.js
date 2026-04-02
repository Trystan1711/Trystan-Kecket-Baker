document.addEventListener("DOMContentLoaded", () => {

  // ── Année footer ──────────────────────────────────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Éléments ──────────────────────────────────────────────────
  const navBtns    = document.querySelectorAll(".nav-btn[data-category]");
  const backBtn    = document.getElementById("back-btn");
  const panelTitle = document.getElementById("proj-panel-title");
  const panelCount = document.getElementById("proj-panel-count");
  const allCards   = document.querySelectorAll(".card[data-category]");

  let activeCategory = null;

  // ── Ouvrir une catégorie ──────────────────────────────────────
  function openCategory(category) {
    activeCategory = category;

    // Mise à jour des boutons nav
    navBtns.forEach(b => b.classList.toggle("active", b.dataset.category === category));

    // Titre et compteur
    const label = category === "dev" ? "Développement" : "Artistique";
    panelTitle.textContent = label;

    // Compter les cards visibles
    const visible = [...allCards].filter(c => c.dataset.category === category);
    panelCount.textContent = `${visible.length} projet${visible.length > 1 ? "s" : ""}`;

    // Réinitialiser toutes les cards
    allCards.forEach(c => {
      c.classList.remove("card-in");
      c.style.removeProperty("--delay");
      c.style.display = c.dataset.category === category ? "" : "none";
    });

    // Ouvrir le panneau
    document.body.classList.add("projects-open");

    // Scroll en haut du panneau
    const panel = document.getElementById("view-projects");
    panel.scrollTop = 0;

    // Animer les cards après le slide (0.75s)
    setTimeout(() => {
      visible.forEach((c, i) => {
        c.style.setProperty("--delay", `${i * 0.11}s`);
        c.classList.add("card-in");
      });
    }, 680);
  }

  // ── Fermer le panneau (retour hero) ───────────────────────────
  function closePanel() {
    document.body.classList.remove("projects-open");
    navBtns.forEach(b => b.classList.remove("active"));

    // Réinitialiser les cards après la fermeture
    setTimeout(() => {
      allCards.forEach(c => {
        c.classList.remove("card-in");
        c.style.removeProperty("--delay");
        c.style.display = "";
      });
      activeCategory = null;
    }, 750);
  }

  // ── Listeners boutons nav ─────────────────────────────────────
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category;
      if (activeCategory === cat && document.body.classList.contains("projects-open")) {
        // Re-clic sur le même bouton → fermer
        closePanel();
      } else {
        openCategory(cat);
      }
    });
  });

  // ── Listener bouton retour ────────────────────────────────────
  if (backBtn) {
    backBtn.addEventListener("click", closePanel);
  }

  // ── Touche Échap pour fermer ──────────────────────────────────
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.body.classList.contains("projects-open")) {
      closePanel();
    }
  });

});
