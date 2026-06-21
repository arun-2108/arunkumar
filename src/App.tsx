import { Nav } from "@/components/portfolio/Nav";
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
  return (
    <div className="min-h-screen bg-background text-foreground font-[Inter,system-ui,sans-serif] [&_h1]:font-[Space_Grotesk,system-ui,sans-serif] [&_h2]:font-[Space_Grotesk,system-ui,sans-serif] [&_h3]:font-[Space_Grotesk,system-ui,sans-serif] [&_.font-mono]:font-[JetBrains_Mono,ui-monospace,monospace]">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Startup />
        <Skills />
        <Leadership />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
