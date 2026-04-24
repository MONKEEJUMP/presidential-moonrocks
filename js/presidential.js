/* Presidential — Maison Digitale
   Quiet interactions: age gate, scroll reveals, nav scrim, drawer. */
(function () {
  "use strict";

  // ---------- Age gate ----------
  const gate = document.querySelector("[data-gate]");
  if (gate) {
    const ok = sessionStorage.getItem("prx-verified") === "1";
    if (ok) gate.setAttribute("hidden", "");
    gate.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-gate-action]");
      if (!btn) return;
      const action = btn.dataset.gateAction;
      if (action === "yes") {
        sessionStorage.setItem("prx-verified", "1");
        gate.style.transition = "opacity .6s ease";
        gate.style.opacity = "0";
        setTimeout(() => gate.setAttribute("hidden", ""), 620);
      } else {
        window.location.href = "https://www.google.com";
      }
    });
  }

  // ---------- Nav scrim on scroll ----------
  const nav = document.querySelector(".nav");
  if (nav) {
    const darkByDefault = nav.classList.contains("nav--dark");
    const onScroll = () => {
      if (darkByDefault) {
        nav.classList.toggle("nav--dark", window.scrollY < 60);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------- Mobile drawer ----------
  const burger = document.querySelector("[data-burger]");
  const drawer = document.querySelector("[data-drawer]");
  const close = document.querySelector("[data-drawer-close]");
  if (burger && drawer) {
    burger.addEventListener("click", () => drawer.classList.add("is-open"));
    if (close) close.addEventListener("click", () => drawer.classList.remove("is-open"));
    drawer.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => drawer.classList.remove("is-open"))
    );
  }

  // ---------- Scroll reveals ----------
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -80px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }
})();
