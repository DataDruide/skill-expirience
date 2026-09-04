import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LiveDashboard from "@/components/LiveDashboard";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CompanySection from "@/components/CompanySection";
import ContactSection from "@/components/ContactSection";
import SectionProgress from "@/components/ui/section-progress";
import ScrollProgress from "@/components/ui/scroll-progress";
import BackToTop from "@/components/ui/back-to-top";
import SpotlightCursor from "@/components/ui/spotlight-cursor";

const sections = [
  { id: "ueber", label: "Über" },
  { id: "projekte", label: "Projekte" },
  { id: "skills", label: "Skills" },
  { id: "firma", label: "Firma" },
  { id: "kontakt", label: "Kontakt" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative grain">
      <Helmet>
        <title>Marcel Zimmermann – Fullstack Developer Portfolio</title>
        <meta name="description" content="Fullstack Developer Portfolio von Marcel Zimmermann: React, Flutter, Swift & Node.js – B2B, SaaS und Social Impact Projekte." />
        <link rel="canonical" href="https://code-craft-impact.lovable.app/" />
        <meta property="og:title" content="Marcel Zimmermann – Fullstack Developer Portfolio" />
        <meta property="og:description" content="Fullstack Developer Portfolio: React, Flutter, Swift & Node.js – B2B, SaaS und Social Impact Projekte." />
        <meta property="og:url" content="https://code-craft-impact.lovable.app/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <ScrollProgress />
      <SpotlightCursor />
      <a href="#hauptinhalt" className="skip-link">Zum Inhalt springen</a>
      <Navbar />
      <SectionProgress sections={sections} />
      <main id="hauptinhalt">
        <HeroSection />
        <AboutSection />
        <LiveDashboard />
        <ProjectsSection />
        <SkillsSection />
        <CompanySection />
        <ContactSection />
      </main>
      <BackToTop />
    </div>
  );
};

export default Index;
