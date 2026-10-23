// Simple enhancement: reveal the page sections gently as visitors scroll.
document.documentElement.classList.add("js-ready");
const sections = document.querySelectorAll(".story, .details, .registry, .contact");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  sections.forEach(section => observer.observe(section));
}
