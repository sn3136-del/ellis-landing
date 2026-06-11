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

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

// Sticky nav border + scroll progress bar
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

// Hero headline: word-by-word rise on load
const heroTitle = document.getElementById("heroTitle");
try {
  splitHeroTitle();
} catch (err) {
  /* If splitting fails, the headline simply renders without the rise animation. */
}
function splitHeroTitle() {
  if (!heroTitle || reduceMotion) return;
  const splitWords = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (/^\s+$/.test(part) || part === "") {
            frag.appendChild(document.createTextNode(part));
          } else {
            const word = document.createElement("span");
            word.className = "word";
            const inner = document.createElement("span");
            inner.textContent = part;
            word.appendChild(inner);
            frag.appendChild(word);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        splitWords(child);
      }
    });
  };
  splitWords(heroTitle);
  heroTitle.querySelectorAll(".word > span").forEach((span, i) => {
    span.style.setProperty("--wd", `${0.08 + i * 0.07}s`);
  });
}

// Reveal on scroll, with a fallback that shows everything if the
// observer is unavailable or anything goes wrong (older mobile browsers).
const revealAll = () =>
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
try {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    revealAll();
  }
} catch (err) {
  revealAll();
}

// Magnetic buttons: nudge toward the cursor
if (!reduceMotion && finePointer) {
  document.querySelectorAll(".js-magnet").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
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
