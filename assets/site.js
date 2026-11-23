// Plays each clip while it's on screen and pauses it when it leaves, so only what's being
// watched downloads. With reduced motion, clips don't play by themselves; their controls show.
(() => {
  const clips = document.querySelectorAll("video[data-autoplay]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    clips.forEach((v) => { v.controls = true; v.preload = "metadata"; });
  } else {
    const seen = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) target.play().catch(() => { target.controls = true; });
        else target.pause();
      }
    }, { threshold: 0.4 });
    clips.forEach((v) => seen.observe(v));
  }

  // Copy buttons on command blocks.
  document.querySelectorAll(".code .copy").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.parentElement.querySelector("pre").dataset.copy
        ?? button.parentElement.querySelector("pre").innerText;
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
      } catch {
        button.textContent = "Select and copy";
      }
      setTimeout(() => { button.textContent = "Copy"; }, 2000);
    });
  });
})();
