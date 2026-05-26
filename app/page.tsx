import HeroSection from "@/src/components/sections/HeroSection";
import ProjectsSection from "@/src/components/sections/ProjectsSection";
import PillNav from "@/src/components/layout/PillNav";
import { SmoothScrollProvider } from "@/src/components/SmoothScrollProvider";
import { profile } from "@/src/data";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* ----- Navbar --------------------------------------------------- */}
      <PillNav
        items={[
          { label: "Home", href: "#home" },
          { label: "Projects", href: "#projects" },
          { label: "Experience", href: "#experience" },
          { label: "Contact", href: `mailto:${profile.email}` },
        ]}
        onMobileMenuClick={''}
        activeHref="#home"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#ededed"
        pillColor="#0a0a0a"
        pillTextColor="#ededed"
        hoveredPillTextColor="#0a0a0a"
        initialLoadAnimation
      />

      {/* ----- Sections ------------------------------------------------- */}
      <HeroSection />
      <ProjectsSection />
    </SmoothScrollProvider>
  );
}
