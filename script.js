document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    // Ajouter le bouton de fermeture
    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "×";
    card.appendChild(closeButton);

    // Ouvrir la carte
    card.addEventListener("click", function (e) {
      // Vérifier que le clic n'est pas sur le bouton de fermeture ou un lien
      if (!e.target.closest(".close-button") && !e.target.closest("a")) {
        // Ajouter une classe pour l'animation de début
        card.classList.add("card-opening");
        document.body.classList.add("card-active");

        // Attendre un peu pour que la transition commence
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.classList.add("active");
          });
        });
      }
    });

    // Fermer la carte
    closeButton.addEventListener("click", function (e) {
      e.stopPropagation();
      closeCard(card);
    });
  });

  // Fermer en cliquant en dehors
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".project-card")) {
      const activeCard = document.querySelector(".project-card.active");
      if (activeCard) {
        closeCard(activeCard);
      }
    }
  });

  // Fonction de fermeture avec animation
  function closeCard(card) {
    card.classList.add("card-closing");
    card.classList.remove("active");

    // Attendre la fin de l'animation avant de retirer les classes
    setTimeout(() => {
      card.classList.remove("card-closing", "card-opening");
      document.body.classList.remove("card-active");
    }, 600); // Correspondre à la durée de la transition CSS
  }
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
