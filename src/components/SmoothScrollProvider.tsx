// =============================================================================
// src/components/SmoothScrollProvider.tsx
// -----------------------------------------------------------------------------
// Component wrapper yang mengaktifkan smooth scroll di seluruh halaman.
// Gunakan di layout atau di page utama.
// =============================================================================

"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

        // Dapatkan posisi scroll target dengan offset untuk navbar
        const navHeight = 1; // Sesuaikan dengan tinggi navbar sticky Anda
        const targetScrollY =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navHeight;

        // Animate scroll dengan GSAP
        gsap.to(window, {
          scrollTo: {
            y: targetScrollY,
            autoKill: false,
          },
          duration: 0.1,
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

  return <>{children}</>;
}
