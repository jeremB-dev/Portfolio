document.addEventListener("DOMContentLoaded", function () {
  // Créer l'overlay une seule fois
  const overlay = document.createElement("div");
  overlay.className = "projects-overlay";
  document.body.appendChild(overlay);

  const projectCards = document.querySelectorAll(".project-card");
  let activeCard = null;

  projectCards.forEach((card) => {
    // Ajouter le bouton de fermeture à chaque carte
    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "×";
    card.appendChild(closeButton);

    card.addEventListener("click", function (e) {
      // Ne rien faire si on clique sur un lien ou le bouton fermer
      if (
        e.target.tagName === "A" ||
        e.target.classList.contains("close-button")
      ) {
        return;
      }

      // Ouvrir la carte
      activeCard = card;
      card.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    closeButton.addEventListener("click", function (e) {
      e.stopPropagation();
      closeCard();
    });
  });

  // Fermer la carte quand on clique sur l'overlay
  overlay.addEventListener("click", closeCard);

  // Fonction pour fermer la carte active
  function closeCard() {
    if (activeCard) {
      activeCard.classList.remove("active");
      overlay.classList.remove("active");

      setTimeout(() => {
        overlay.style.display = "none";
      }, 500); // Ajusté à 500ms pour correspondre à la transition

      document.body.style.overflow = "auto";
      activeCard = null;
    }
  }

  // Fermer avec la touche Échap
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

    // Afficher la modale immédiatement
    successModal.style.display = "flex";

    const formData = new FormData(form);
    formData.append("_captcha", "false");

    try {
      // Envoi en arrière-plan
      await fetch("https://formsubmit.co/jeremybrunel.dev@gmail.com", {
        method: "POST",
        body: formData,
      });

      // Réinitialiser le formulaire après l'envoi réussi
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }

    // Masquer la modale après 3 secondes
    setTimeout(() => {
      successModal.style.display = "none";
    }, 3000);
  });
}
