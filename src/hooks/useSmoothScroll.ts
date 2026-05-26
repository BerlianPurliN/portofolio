// =============================================================================
// src/hooks/useSmoothScroll.ts
// -----------------------------------------------------------------------------
// Hook untuk smooth scroll animation menggunakan GSAP.
// Memberikan efek scroll yang lebih smooth dan elegant saat user klik anchor.
// =============================================================================

import { useEffect } from "react";
import { gsap } from "gsap";

export function useSmoothScroll() {
  useEffect(() => {
    // Tangkap semua anchor links (href dimulai dengan #)
    const links = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");

      // Skip jika href hanya "#"
      if (!href || href === "#") return;

      const targetId = href.substring(1); // Hapus # dari href
      const targetElement = document.getElementById(targetId);

      // Jika target ditemukan, lakukan smooth scroll dengan GSAP
      if (targetElement) {
        e.preventDefault();

        // Dapatkan posisi scroll target
        const targetScrollY = targetElement.getBoundingClientRect().top + window.scrollY;

        // Animate scroll dengan GSAP
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

    // Tambahkan event listener ke semua anchor links
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
