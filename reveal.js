(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    // threshold 0: show as soon as the block enters view.
    // Large sections (e.g. foot-guide) never reached 10% visible soon enough.
    { threshold: 0, rootMargin: "0px 0px -48px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
})();
