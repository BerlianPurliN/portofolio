// =============================================================================
// src/hooks/useSmoothScroll.ts
// -----------------------------------------------------------------------------
// Hook for smooth-scroll animation using GSAP.
// Produces a smoother, more elegant scroll effect when the user clicks
// an anchor link.
// =============================================================================

import { useEffect } from "react";
import { gsap } from "gsap";

export function useSmoothScroll() {
  useEffect(() => {
    // Capture every anchor link (href starting with #).
    const links = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");

      // Skip if href is just "#".
      if (!href || href === "#") return;

      const targetId = href.substring(1); // Strip "#" from href
      const targetElement = document.getElementById(targetId);

      // If the target is found, run the smooth scroll with GSAP.
      if (targetElement) {
        e.preventDefault();

        // Get the target scroll position.
        const targetScrollY =
          targetElement.getBoundingClientRect().top + window.scrollY;

        // Animate the scroll with GSAP.
        gsap.to(window, {
          scrollTo: {
            y: targetScrollY,
            autoKill: false,
          },
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    };

    // Add the event listener to every anchor link.
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    // Cleanup
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);
}
