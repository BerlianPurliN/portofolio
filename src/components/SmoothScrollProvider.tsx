"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register the GSAP plugin so it works.
gsap.registerPlugin(ScrollToPlugin);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  /**
   * Navbar height (in pixels) used to offset the scroll target so content
   * doesn't sit underneath the sticky navbar.
   * Default: 0 (set this to match your header / sticky navbar height).
   */
  navHeight?: number;
}

export function SmoothScrollProvider({
  children,
  navHeight = 0, // Default offset for your navbar height
}: SmoothScrollProviderProps) {
  useEffect(() => {
    // 1. Select every anchor link whose href starts with "#".
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

    const handleClick = (e: Event) => {
      // 2. Make sure the target element exists.
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const targetId = href.substring(1); // Strip the "#" character
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault(); // Prevent the browser's default jump

        // 3. Compute the target scroll position minus the navbar height.
        // getBoundingClientRect().top is relative to the viewport, so add
        // window.scrollY to get the absolute position.
        const targetScrollY =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navHeight;

        // 4. Run the GSAP animation.
        gsap.to(window, {
          scrollTo: {
            y: targetScrollY,
            autoKill: false, // Don't stop abruptly when the user scrolls manually
          },
          duration: 1.2, // Longer for a heavier, smoother feel
          ease: "power3.out", // Smoother than power2.out
        });
      }
    };

    // Attach the event listener.
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    // Cleanup when the component unmounts (important in React).
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [navHeight]); // Re-run effect if navHeight changes

  return <>{children}</>;
}
