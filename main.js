// ----------------------------------------------------------------------------
// Demo scheduling link.
// Replace this with your real calendar URL (Calendly, Cal.com, Google, etc.).
// Every "Request a demo" button on the page points here.
// ----------------------------------------------------------------------------
const DEMO_CALENDAR_URL = "https://calendly.com/ellis-immigration/demo";

document.querySelectorAll(".js-demo").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(DEMO_CALENDAR_URL, "_blank", "noopener,noreferrer");
  });
  if (el.tagName === "A") el.setAttribute("href", DEMO_CALENDAR_URL);
});

// Sticky nav shadow on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const burger = document.getElementById("burger");
const navMobile = document.getElementById("navMobile");
burger.addEventListener("click", () => {
  const open = navMobile.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
});
navMobile.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navMobile.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  })
);

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
