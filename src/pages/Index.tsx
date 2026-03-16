import HeroSection from "@/components/HeroSection";
import LiveDashboard from "@/components/LiveDashboard";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <LiveDashboard />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
