const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const contactForm = document.querySelector(".contact-form");

const primaryWhatsapp = "22898837548";

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "Je veux m'inscrire a la formation.";

  const whatsappText = [
    "Bonjour, je suis interesse(e) par la formation en creation d'affiches et videos publicitaires.",
    name ? `Nom: ${name}` : "",
    phone ? `Telephone: ${phone}` : "",
    `Message: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  window.open(`https://wa.me/${primaryWhatsapp}?text=${encodeURIComponent(whatsappText)}`, "_blank", "noopener");
});
