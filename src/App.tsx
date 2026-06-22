import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/portfolio/Nav";
import { BananaCaseStudy } from "@/components/portfolio/BananaCaseStudy";
import { AuthenDriveCaseStudy } from "@/components/portfolio/AuthenDriveCaseStudy";
import {
  Hero,
  About,
  Experience,
  Projects,
  Research,
  Startup,
  Skills,
  Leadership,
  Achievements,
  Education,
  Contact,
  Footer,
} from "@/components/portfolio/Sections";

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);

  useEffect(() => {
    if (activeCaseStudy) {
      window.scrollTo(0, 0);
    }
  }, [activeCaseStudy]);

  const handleViewCaseStudy = (title: string) => {
    if (title === "Mobile Banana Processing Unit") {
      setActiveCaseStudy("Mobile Banana Processing Unit");
    } else if (title === "Driver Authentication & Monitoring System") {
      setActiveCaseStudy("Driver Authentication & Monitoring System");
    } else {
      toast.info(`Case study for "${title}" is in development!`, {
        description: "The complete design and documentation will be published soon.",
        duration: 4000,
      });
    }
  };

  const handleCloseCaseStudy = () => {
    setActiveCaseStudy(null);
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-[Inter,system-ui,sans-serif] [&_h1]:font-[Space_Grotesk,system-ui,sans-serif] [&_h2]:font-[Space_Grotesk,system-ui,sans-serif] [&_h3]:font-[Space_Grotesk,system-ui,sans-serif] [&_.font-mono]:font-[JetBrains_Mono,ui-monospace,monospace]">
      <Toaster position="bottom-right" />
      {activeCaseStudy === "Mobile Banana Processing Unit" ? (
        <BananaCaseStudy onClose={handleCloseCaseStudy} />
      ) : activeCaseStudy === "Driver Authentication & Monitoring System" ? (
        <AuthenDriveCaseStudy onClose={handleCloseCaseStudy} />
      ) : (
        <>
          <Nav />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects onViewCaseStudy={handleViewCaseStudy} />
            <Research />
            <Startup />
            <Skills />
            <Leadership />
            <Achievements />
            <Education />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
