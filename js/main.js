document.addEventListener("DOMContentLoaded", () => {

  // ── Année footer ──────────────────────────────────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Onglets Work / Info ───────────────────────────────────────
  const mainTabs   = document.querySelectorAll(".tab-btn[data-tab]");
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
        // Déclencher reveal si première ouverture
        triggerReveal();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // ── Filtre Dev / Design / Tous ────────────────────────────────
  const filterBtns = document.querySelectorAll(".filter-btn[data-category]");
  const cards      = document.querySelectorAll(".card[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.dataset.category;

      cards.forEach((card) => {
        if (cat === "all" || card.dataset.category === cat) {
          card.classList.remove("is-hidden");
          // Rejouer l'animation d'entrée
          card.classList.remove("is-visible");
          requestAnimationFrame(() =>
            requestAnimationFrame(() => card.classList.add("is-visible"))
          );
        } else {
          card.classList.add("is-hidden");
        }
      });
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

  // ── IntersectionObserver – reveal ─────────────────────────────
  function triggerReveal() {
    const revealEls = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!revealEls.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  }

  triggerReveal();
});
