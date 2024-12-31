document.addEventListener("DOMContentLoaded", function () {
  // Créer l'overlay une seule fois
  const overlay = document.createElement("div");
  overlay.className = "projects-overlay";
  document.body.appendChild(overlay);

  const projectCards = document.querySelectorAll(".project-card");
  const header = document.querySelector(".header"); // Sélectionne le header
  let activeCard = null;

  projectCards.forEach((card) => {
    // Ajoute le bouton de fermeture à chaque carte
    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "×";
    card.appendChild(closeButton);

    card.addEventListener("click", function (e) {
      if (
        e.target.tagName === "A" ||
        e.target.classList.contains("close-button")
      ) {
        return;
      }

      // Ouvrir la carte
      activeCard = card;
      card.classList.add("active");
      header.classList.add("darkened"); // Assombrir le header
      overlay.style.display = "block"; // Affiche l'overlay avant d'ajouter la classe active
      requestAnimationFrame(() => {
        overlay.classList.add("active");
      });
      document.body.style.overflow = "hidden";
    });

    closeButton.addEventListener("click", function (e) {
      e.stopPropagation();
      closeCard();
    });
  });

  // Ferme la carte quand on clique sur l'overlay
  overlay.addEventListener("click", closeCard);

  // Fonction pour fermer la carte active
  function closeCard() {
    if (activeCard) {
      activeCard.classList.remove("active");
      header.classList.remove("darkened"); // Réinitialise le header
      overlay.classList.remove("active");

      // Attendre la fin de l'animation avant de cacher l'overlay
      setTimeout(() => {
        overlay.style.display = "none";
      }, 500);

      document.body.style.overflow = "auto";
      activeCard = null;
    }
  }

  // Ferme avec la touche Échap
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeCard();
    }
  });
});

// Gestion du formulaire de contact
const form = document.querySelector("#contact form");
const successModal = document.getElementById("success-modal");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    successModal.style.display = "flex";

    const formData = new FormData(form);
    formData.append("_captcha", "false");

    try {
      await fetch("https://formsubmit.co/jeremybrunel.dev@gmail.com", {
        method: "POST",
        body: formData,
      });
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }

    setTimeout(() => {
      successModal.style.display = "none";
    }, 2000);
  });
}
