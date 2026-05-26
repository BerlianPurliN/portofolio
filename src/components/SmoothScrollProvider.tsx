"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugin agar berfungsi
gsap.registerPlugin(ScrollToPlugin);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  /**
   * Tinggi navbar (dalam pixel) untuk menghitung offset agar konten tidak tertimpa navbar.
   * Default: 80 (sesuaikan dengan tinggi header/sticky navbar Anda)
   */
  navHeight?: number;
}

export function SmoothScrollProvider({
  children,
  navHeight = 0, // Nilai default alto navbar Anda
}: SmoothScrollProviderProps) {
  useEffect(() => {
    // 1. Pilih semua link yang href-nya dimulai dengan "#"
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

    const handleClick = (e: Event) => {
      // 2. Cek apakah elemen target ada
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const targetId = href.substring(1); // Hapus karakter "#"
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault(); // Mencegah lompatan default browser

        // 3. Hitung posisi scroll target dikurangi tinggi navbar
        // getBoundingClientRect().top relatif terhadap viewport, perlu + window.scrollY (posisi absolut)
        const targetScrollY =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navHeight;

        // 4. EKsekusi Animasi GSAP
        gsap.to(window, {
          scrollTo: {
            y: targetScrollY,
            autoKill: false, // Pastikan animasi tidak berhenti tiba-tiba bila user scroll manual
          },
          duration: 1.2, // <<< PERUBAHAN: Lebih lama agar terlihat "smooth" dan berat
          ease: "power3.out", // <<< PERUBAHAN: Lebih halus daripada power2.out
        });
      }
    };

    // Pasang event listener
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    // Cleanup saat komponen unmount (penting di React)
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [navHeight]); // Re-run effect jika valor navHeight berubah

  return <>{children}</>;
}
