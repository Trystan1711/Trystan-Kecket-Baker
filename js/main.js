document.addEventListener("DOMContentLoaded", () => {
  // Scroll depuis la flèche du hero vers l'aperçu des projets
  const scrollBtn = document.getElementById("scroll");
  const overviewSection = document.getElementById("overview");

  if (scrollBtn && overviewSection) {
    scrollBtn.addEventListener("click", () => {
      overviewSection.scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  // Scroll smooth pour tous les liens internes commençant par #
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Animation d'apparition au scroll (IntersectionObserver)
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
      {
        threshold: 0.2,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback : tout afficher si IntersectionObserver n'est pas dispo
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // Vitesse du carrousel contrôlée par le mouvement de la souris sur chaque ligne
  const scrollers = document.querySelectorAll(".projects-scroller");
  scrollers.forEach((scroller) => {
    const track = scroller.querySelector(".projects-track");
    if (!track) return;

    const baseDuration = 28; // vitesse "normale"
    const minDuration = 8;   // très rapide
    const maxDuration = 40;  // très lent

    // valeur par défaut
    track.style.setProperty("--scroll-duration", `${baseDuration}s`);

    scroller.addEventListener("mousemove", (event) => {
      const rect = scroller.getBoundingClientRect();
      const x = event.clientX - rect.left; // position de la souris dans le scroller
      const ratio = Math.min(Math.max(x / rect.width, 0), 1); // 0 → 1

      // plus on va vers la droite, plus c'est rapide
      const duration =
        maxDuration - ratio * (maxDuration - minDuration); // interpolation

      track.style.setProperty("--scroll-duration", `${duration}s`);
    });

    scroller.addEventListener("mouseleave", () => {
      // retour à la vitesse de base quand on sort de la zone
      track.style.setProperty("--scroll-duration", `${baseDuration}s`);
    });
  });

  // Année dynamique dans le footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }
});
