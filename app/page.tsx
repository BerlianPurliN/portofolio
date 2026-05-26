import HeroSection from "@/src/components/sections/HeroSection";
import ProjectsSection from "@/src/components/sections/ProjectsSection";
import ContactSection from "@/src/components/sections/ContactSection";
import PillNav from "@/src/components/layout/PillNav";
import { SmoothScrollProvider } from "@/src/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* ----- Navbar --------------------------------------------------- */}
      <PillNav
        items={[
          { label: "Home", href: "#home" },
          { label: "Projects", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ]}
        onMobileMenuClick={""}
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
      <ContactSection />
    </SmoothScrollProvider>
  );
}
