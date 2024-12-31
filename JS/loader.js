document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader-container");
  const body = document.body;

  // Ajoute la classe loading au body
  body.classList.add("loading");

  // Attendre 5 secondes
  setTimeout(() => {
    // Cache le loader
    loader.classList.add("hidden");
    body.classList.remove("loading");

    // Supprime le loader après l'animation de fondu
    setTimeout(() => {
      loader.remove();
    }, 200);
  }, 2000);
});
