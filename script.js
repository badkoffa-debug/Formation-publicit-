const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  header.classList.remove("menu-active");
  nav.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  header.classList.toggle("menu-active", isOpen);
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeLink = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
      navLinks.forEach((link) => link.classList.toggle("is-active", link === activeLink));
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => observer.observe(section));
window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

document.querySelector("[data-contact-form]").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const message = formData.get("message").trim();

  const text = [
    "Bonjour, je veux des informations sur la formation affiches et videos publicitaires.",
    `Nom: ${name}`,
    `Telephone: ${phone}`,
    `Message: ${message}`,
  ].join("\n");

  window.open(`https://wa.me/22898837548?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});
