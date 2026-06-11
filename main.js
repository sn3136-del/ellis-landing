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

// Sticky nav shadow + scroll progress bar
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 8);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";
};
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
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

// Count-up stats when they enter the viewport
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (reduceMotion) {
        el.textContent = target;
        return;
      }
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(easeOut(p) * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".count").forEach((el) => countObserver.observe(el));

// Subtle 3D tilt on the hero image
const tilt = document.getElementById("tilt");
if (tilt && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const damp = 28;
  tilt.addEventListener("mousemove", (e) => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `perspective(900px) rotateY(${x * damp * 0.4}deg) rotateX(${-y * damp * 0.4}deg)`;
  });
  tilt.addEventListener("mouseleave", () => {
    tilt.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  });
}

// Cursor-follow glow on capability cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
