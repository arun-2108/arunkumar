import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Award,
  Sparkles,
  Cpu,
  Wrench,
  FlaskConical,
  Code2,
  Rocket,
  PenTool,
  Trophy,
  GraduationCap,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { resume } from "@/data/resume";
import { Wireframe } from "./Wireframe";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/* ---------- shared bits ---------- */

function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="max-w-3xl mb-14">
      <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase mb-4">
        <span className="h-px w-8 bg-accent" /> {kicker}
      </div>
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-lg">{sub}</p>}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ---------- HERO ---------- */

export function Hero() {
  // mouse-following glow
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bg = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, color-mix(in oklab, var(--primary) 22%, transparent), transparent 50%)`,
  );

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-32 pb-20 bg-hero-glow"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <motion.div style={{ background: bg }} className="pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.1fr,1fr] gap-12 items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-3 py-1.5 text-xs font-mono tracking-widest text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              {resume.tag.toUpperCase()}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
              {resume.hero.title.map((line, i) => (
                <span key={i} className="block">
                  {i === resume.hero.title.length - 1 ? (
                    <span className="text-gradient">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/90 leading-relaxed font-light">{resume.hero.sub}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={resume.resumeUrl}
                download
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-medium text-primary-foreground glow-ring transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Download size={16} className="transition-transform group-hover:translate-y-0.5 duration-200" />
                Download Resume
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-6 py-3 text-sm font-medium text-foreground hover:bg-surface hover:border-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Mail size={16} className="text-muted-foreground group-hover:text-accent transition-colors duration-200" />
                Get in Touch
              </a>
            </div>
          </Reveal>

          {/* Credibility Strip */}
          <Reveal delay={0.2}>
            <div className="mt-12 pt-6 border-t border-border/40 flex flex-wrap gap-x-8 gap-y-4 text-xs font-mono text-muted-foreground tracking-wider">
              <div className="group/cred flex items-center gap-2 transition-colors hover:text-foreground duration-300 cursor-default">
                <Rocket size={14} className="text-accent group-hover/cred:text-primary transition-colors duration-300 shrink-0" />
                <span>Founder, EAURA Pvt Ltd</span>
              </div>
              <div className="group/cred flex items-center gap-2 transition-colors hover:text-foreground duration-300 cursor-default">
                <FlaskConical size={14} className="text-accent group-hover/cred:text-primary transition-colors duration-300 shrink-0" />
                <span>ASME Research Author</span>
              </div>
              <div className="group/cred flex items-center gap-2 transition-colors hover:text-foreground duration-300 cursor-default">
                <Cpu size={14} className="text-accent group-hover/cred:text-primary transition-colors duration-300 shrink-0" />
                <span>CAD • FEA • Simulation</span>
              </div>
              <div className="group/cred flex items-center gap-2 transition-colors hover:text-foreground duration-300 cursor-default">
                <PenTool size={14} className="text-accent group-hover/cred:text-primary transition-colors duration-300 shrink-0" />
                <span>Product Designer & Engineer</span>
              </div>
            </div>
          </Reveal>

          {/* Location & Availability Status */}
          <Reveal delay={0.25}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground/75 tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-muted-foreground/60" /> {resume.location.toUpperCase()}
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" /> AVAILABLE FOR COLLAB
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative w-full max-w-[420px] aspect-[4/5] mx-auto animate-float">
            {/* Ambient glows behind the photo */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-primary to-accent opacity-20 blur-2xl -z-10" />
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-primary/10 to-accent/10 border border-white/10 shadow-elegant -z-10" />

            {/* The photo container */}
            <div className="w-full h-full rounded-[28px] overflow-hidden border border-border bg-[#0a0f1e]/40 backdrop-blur">
              <img
                src="/Arun.png"
                alt="Arunkumar Sundaravel"
                className="w-full h-full object-cover object-center filter grayscale contrast-[1.1] brightness-[0.95] hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700 ease-out"
              />
            </div>

            {/* Floating tech badge */}
            <div className="absolute -bottom-4 -right-4 bg-surface/90 border border-border backdrop-blur px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-elegant">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent/20 text-accent">
                <Sparkles size={16} className="animate-pulse-glow" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  FOUNDER & CEO
                </div>
                <div className="text-xs font-semibold text-gradient">Eaura Pvt Ltd</div>
              </div>
            </div>

            {/* Corner brackets overlay */}
            <div className="absolute top-2.5 left-3.5 font-mono text-[9px] text-accent/50 tracking-widest">
              SYS.ACTIVE
            </div>
            <div className="absolute top-2.5 right-3.5 font-mono text-[9px] text-accent/50 tracking-widest">
              ARUN_S_
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */

export function About() {
  const quickFacts = [
    { label: "Founder", detail: "EAURA Pvt Ltd", icon: Rocket },
    { label: "B.Tech", detail: "Smart Manufacturing", icon: GraduationCap },
    { label: "Research Author", detail: "ASME", icon: FlaskConical },
    { label: "SIH Participant", detail: "Smart India Hackathon", icon: Trophy },
    { label: "Product Designer", detail: "CAD & DFM", icon: PenTool },
    { label: "Mechanical Engineer", detail: "IIITDM Kancheepuram", icon: Wrench },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1fr,1.3fr] gap-12 lg:gap-16 items-start">
          {/* Photo Side */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden border border-border bg-[#0a0f1e]/40 backdrop-blur shadow-elegant group">
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-primary to-accent opacity-25 blur-2xl -z-10" />
              <img
                src="/about.jpg"
                alt="Arunkumar S - Professional Engineering Work"
                className="w-full h-full object-cover object-center filter grayscale contrast-[1.05] hover:grayscale-0 hover:contrast-100 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs font-mono uppercase tracking-widest text-accent">IIITDM Chennai</div>
                <div className="text-lg font-semibold text-gradient mt-1">Smart Manufacturing Lab</div>
              </div>
            </div>
          </Reveal>

          {/* Content Side */}
          <div>
            <Reveal>
              <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase mb-4">
                <span className="h-px w-8 bg-accent" /> About Me
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
                Engineer. Builder. Problem Solver.
              </h2>
            </Reveal>

            {/* Narrative Story */}
            <Reveal delay={0.1} className="mt-8 space-y-5 text-base text-muted-foreground/90 leading-relaxed font-light">
              <p>
                I've always been fascinated by how things work—not just on a screen, but in the physical world. Growing up, I found myself drawn to the tangible, complex beauty of machinery and systems. That curiosity naturally led me to pursue a B.Tech in Smart Manufacturing at IIITDM Kancheepuram, where I began bridging the gap between classical mechanical design and modern digital automation. To me, engineering isn't just about drafting CAD models; it's the art of bringing static ideas into dynamic, functional existence.
              </p>
              <p>
                What truly drives me is the intersection of mechanical engineering, AI, and entrepreneurship. I believe that next-generation industrial systems shouldn't just be robust; they should be intelligent. This philosophy led me to found Eaura, a government-approved startup where we are creating a voice-first AI companion paired with dedicated, hardware-ambient components to help senior citizens live independently. Navigating the challenge of designing hardware that integrates seamlessly with complex software has refined my product development mindset.
              </p>
              <p>
                Alongside my startup, my research has allowed me to dive deep into materials and automation, developing models to characterize auxetic honeycomb structures for ASME IMECE-INDIA and designing AI-driven separator units for Neyveli Lignite Corporation (NLC). Whether optimizing suspension dynamics for electric agricultural transport or building machine learning algorithms for industrial computer vision, I approach every challenge with the goal of creating validated, deployable prototypes that solve real-world problems.
              </p>
              <p>
                Looking ahead, I am excited about a future where hardware and intelligent automation act as force multipliers for human potential. I want to build systems that improve lives—whether that means automating agricultural logistics, designing safer EV battery systems, or crafting inclusive consumer products. I'm always looking for collaborative projects, research partnerships, and forward-thinking teams that are eager to push the boundaries of what physical machines and smart systems can achieve together.
              </p>
            </Reveal>

            {/* Quick Facts Grid */}
            <Reveal delay={0.15}>
              <h3 className="mt-10 text-xs font-mono uppercase tracking-widest text-accent/80">Quick Facts</h3>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickFacts.map((fact, i) => {
                  const Icon = fact.icon;
                  return (
                    <div
                      key={i}
                      className="group/fact flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
                    >
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-accent group-hover/fact:bg-primary/20 transition-colors duration-300">
                        <Icon size={14} />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60">
                          {fact.label}
                        </div>
                        <div className="text-xs font-semibold text-foreground/90">
                          {fact.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Current Focus Highlight Card */}
            <Reveal delay={0.2}>
              <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-[#0a0f1e]/40 p-6 backdrop-blur">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-accent flex items-center gap-2">
                  <Sparkles size={14} className="animate-pulse-glow text-accent" /> Currently Working On
                </h4>
                <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground/90 leading-relaxed font-light">
                  <li className="flex gap-2.5 items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0 animate-pulse-glow" />
                    <span>Ambient voice-first hardware and AI companion for <strong className="font-semibold text-foreground/90">EAURA</strong> senior citizen support.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>High-capacity battery packaging and composite enclosures at <strong className="font-semibold text-foreground/90">SRJ Energy (IITM Research Park)</strong>.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>Suspension & dynamics design for a compact electric agricultural transport vehicle.</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* CTA Button */}
            <Reveal delay={0.25} className="mt-8">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3.5 text-sm font-medium text-primary-foreground glow-ring transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Let's Build Something Together
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 duration-200"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- EXPERIENCE ---------- */

export function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Experience" title="Where I've Built" />

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          <div className="space-y-12">
            {resume.experience.map((e, i) => (
              <Reveal key={e.org} delay={i * 0.05}>
                <div
                  className={`relative grid md:grid-cols-2 gap-8 ${i % 2 ? "md:[direction:rtl]" : ""}`}
                >
                  <div
                    className={`md:[direction:ltr] ${i % 2 ? "md:text-right" : ""} pl-12 md:pl-0`}
                  >
                    <div className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2 h-3 w-3 rounded-full bg-accent shadow-[0_0_16px_4px_color-mix(in_oklab,var(--accent)_50%,transparent)]" />
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {e.duration}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold">{e.org}</h3>
                    <div className="text-accent text-sm mt-1">{e.role}</div>
                    <div className="text-xs text-muted-foreground mt-1">{e.tagline}</div>
                  </div>
                  <div className="md:[direction:ltr] pl-12 md:pl-0">
                    <div className="rounded-2xl border border-border bg-surface/40 backdrop-blur p-6 hover:border-primary/30 transition">
                      <ul className="space-y-3 text-sm text-foreground/90">
                        {e.points.map((p, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />
                            <span className="leading-relaxed">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROJECTS ---------- */

export function Projects({ onViewCaseStudy }: { onViewCaseStudy?: (title: string) => void }) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    if (!api) return;

    setTotalSlides(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || isInteracted) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // loop back to first project
      }
    }, 3000); // auto-scrolls every 3 seconds

    return () => clearInterval(interval);
  }, [api, isInteracted]);

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase mb-4">
                <span className="h-px w-8 bg-accent" /> Featured Work
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
                Projects Engineered to Ship
              </h2>
              <p className="mt-4 text-muted-foreground text-lg font-light leading-relaxed">
                Hardware × software × research. Each project is a real-world system, not a
                coursework deliverable.
              </p>
            </div>

            {/* Premium Control Deck Console */}
            <div className="flex items-center gap-3 bg-surface/80 backdrop-blur-md border border-border px-4 py-2 rounded-full shadow-elegant transition-all duration-300 hover:border-primary/40 shrink-0 mb-2 select-none">
              {/* Prev Button */}
              <button
                onClick={() => {
                  api?.scrollPrev();
                  setIsInteracted(true);
                }}
                className="h-8 w-8 rounded-full border border-border/80 bg-background hover:bg-accent hover:text-accent-foreground text-foreground cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
                disabled={!api?.canScrollPrev()}
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Index Indicator */}
              <span className="text-xs font-mono text-foreground font-semibold px-1 min-w-[36px] text-center">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(totalSlides || 1).padStart(2, "0")}
              </span>

              {/* Next Button */}
              <button
                onClick={() => {
                  api?.scrollNext();
                  setIsInteracted(true);
                }}
                className="h-8 w-8 rounded-full border border-border/80 bg-background hover:bg-accent hover:text-accent-foreground text-foreground cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
                disabled={!api?.canScrollNext()}
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <CarouselContent className="-ml-6" onClickCapture={() => setIsInteracted(true)}>
            {resume.projects.map((p, i) => (
              <CarouselItem key={p.title} className="pl-6 md:basis-1/2 flex">
                <Reveal delay={i * 0.05} className="h-full w-full flex">
                  <article className="group relative h-full flex flex-col rounded-3xl border border-border bg-surface/40 backdrop-blur p-5 md:p-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_color-mix(in_oklab,var(--primary)_25%,transparent)] hover:border-primary/60 overflow-hidden w-full">
                    <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none [background:linear-gradient(135deg,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_60%)]" />

                    <ProjectVisual images={p.images} title={p.title} />

                    <div className="relative mt-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {String(i + 1).padStart(2, "0")} · {p.client} · {p.duration}
                        </div>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {p.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-mono text-accent/90 hover:border-accent/50 hover:bg-accent/10 transition-colors duration-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
                            Outcomes
                          </div>
                          <ul className="space-y-2 text-xs text-foreground/90">
                            {p.outcomes.map((o, j) => (
                              <li key={j} className="flex gap-2.5 items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0 animate-pulse-glow shadow-[0_0_8px_color-mix(in_oklab,var(--accent)_60%,transparent)]" />
                                <span className="leading-relaxed">{o}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/40 flex justify-between items-center">
                        <button
                          onClick={() => onViewCaseStudy?.(p.title)}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-foreground hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group/btn cursor-pointer shadow-sm hover:shadow-[0_0_16px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
                        >
                          View Case Study
                          <ArrowUpRight
                            size={14}
                            className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          />
                        </button>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                          Full details
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

function ProjectVisual({ images, title }: { images: readonly string[]; title: string }) {
  const slides = images ?? [];
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  if (slides.length === 0) {
    return (
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-black">
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>
    );
  }

  const goTo = (idx: number) => {
    if (idx === current || fading) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 180);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo((current - 1 + slides.length) % slides.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo((current + 1) % slides.length);
  };

  return (
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-black">
      <img
        src={slides[current]}
        alt={`${title} — view ${current + 1}`}
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200"
        style={{ opacity: fading ? 0 : 1 }}
      />

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-xl text-white transition-all duration-200 hover:scale-110 hover:bg-white hover:text-gray-900 hover:border-white"
            style={{
              boxShadow:
                "0 0 28px 6px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.30)",
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-xl text-white transition-all duration-200 hover:scale-110 hover:bg-white hover:text-gray-900 hover:border-white"
            style={{
              boxShadow:
                "0 0 28px 6px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.30)",
            }}
            aria-label="Next image"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-4 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="absolute top-2 right-2 z-10 rounded px-2 py-0.5 bg-black/50 backdrop-blur font-mono text-[10px] text-white/50">
            {current + 1} / {slides.length}
          </div>
        </>
      )}
    </div>
  );
}
/* ---------- RESEARCH ---------- */

export function Research() {
  return (
    <section id="research" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="Research & Innovation"
          title="Publishing the Work"
          sub="Peer-reviewed engineering research at the intersection of materials, AI, and heavy industry."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {resume.research.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border bg-surface/40 backdrop-blur p-6 hover:border-primary/40 transition flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {r.area}
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug">{r.title}</h3>
                <div className="mt-2 text-xs text-accent">{r.venue}</div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">
                  {r.summary}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-accent transition">
                  <FlaskConical size={14} /> Publication
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const accepted = status.toLowerCase() === "accepted";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border ${
        accepted
          ? "border-accent/50 text-accent bg-accent/10"
          : "border-border text-muted-foreground bg-surface"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          accepted ? "bg-accent animate-pulse-glow" : "bg-muted-foreground"
        }`}
      />
      {status}
    </span>
  );
}

/* ---------- STARTUP ---------- */

export function Startup() {
  const s = resume.startup;
  return (
    <section id="startup" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-8 md:p-14">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1.2fr,1fr] gap-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-accent">
                <Sparkles size={12} /> {s.status}
              </div>
              <h2 className="mt-5 text-5xl md:text-6xl font-semibold tracking-tight">
                Building <span className="text-gradient">{s.name}</span>
              </h2>
              <div className="mt-2 text-sm text-muted-foreground font-mono uppercase tracking-widest">
                {s.role}
              </div>

              <p className="mt-6 text-xl text-foreground/90 leading-relaxed">{s.mission}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">{s.problem}</p>

              <div className="mt-8">
                <div className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
                  Milestones
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.milestones.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs text-foreground/90"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 content-start">
              {s.pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border bg-background/60 backdrop-blur p-5"
                >
                  <div className="text-sm font-semibold text-accent">{p.title}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SKILLS ---------- */

const skillIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  "CAD & Design": PenTool,
  Simulation: Cpu,
  Manufacturing: Wrench,
  Research: FlaskConical,
  Programming: Code2,
  "Product Development": Rocket,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="Engineering Expertise"
          title="The Stack I Build With"
          sub="From first sketch to validated prototype — design, simulate, prototype, ship."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resume.skills.map((s, i) => {
            const Icon = skillIcons[s.category] ?? Cpu;
            return (
              <Reveal key={s.category} delay={i * 0.04}>
                <div className="group rounded-2xl border border-border bg-surface/40 backdrop-blur p-6 hover:border-primary/40 transition h-full">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-accent ring-1 ring-primary/30">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-base font-semibold">{s.category}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        Proficiency · {s.level}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-background/80">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- LEADERSHIP ---------- */

export function Leadership() {
  return (
    <section id="leadership" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Leadership" title="Leading Teams. Delivering Results." />

        <div className="grid md:grid-cols-3 gap-5">
          {resume.leadership.map((l, i) => (
            <Reveal key={l.role} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-surface/40 backdrop-blur p-6 hover:border-primary/40 transition">
                <Users size={18} className="text-accent" />
                <div className="mt-4 text-lg font-semibold leading-snug">{l.role}</div>
                <div className="mt-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {l.duration}
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{l.impact}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ACHIEVEMENTS ---------- */

export function Achievements() {
  const [hero, ...rest] = resume.achievements;
  return (
    <section id="achievements" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Achievements" title="Marks on the Map" />

        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-6">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/20 via-surface to-background p-10">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative">
                <Trophy size={28} className="text-accent" />
                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-accent">
                  {hero.year} · National
                </div>
                <div className="mt-3 text-7xl md:text-8xl font-semibold tracking-tight text-gradient">
                  {hero.headline}
                </div>
                <div className="mt-3 text-xl font-medium">{hero.title}</div>
                <div className="mt-1 text-muted-foreground">{hero.detail}</div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {rest.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-surface/40 backdrop-blur p-6">
                  <Award size={18} className="text-accent" />
                  <div className="mt-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {a.year}
                  </div>
                  <div className="mt-1 text-lg font-semibold">{a.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {a.headline} · {a.detail}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- EDUCATION ---------- */

export function Education() {
  return (
    <section id="education" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Education" title="Academic Journey" />

        <div className="grid md:grid-cols-3 gap-5">
          {resume.education.map((ed, i) => (
            <Reveal key={ed.degree} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-surface/40 backdrop-blur p-6 hover:border-primary/40 transition">
                <GraduationCap size={18} className="text-accent" />
                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {ed.duration}
                </div>
                <div className="mt-2 text-lg font-semibold leading-snug">{ed.degree}</div>
                <div className="mt-2 text-sm text-muted-foreground">{ed.school}</div>
                <div className="mt-4 inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-mono text-accent">
                  {ed.score}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const mailto = () => {
    const subject = encodeURIComponent(`Hello from ${form.name || "your site"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${resume.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              <span className="inline-block h-px w-8 align-middle bg-accent mr-2" />
              Contact
            </div>
            <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight">
              Let's build <span className="text-gradient">something meaningful.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Open to research collaborations, founding-team conversations, and engineering projects
              that push real systems forward.
            </p>

            <div className="mt-10 space-y-4">
              <ContactRow
                icon={<Mail size={16} />}
                label="Email"
                value={resume.email}
                href={`mailto:${resume.email}`}
              />
              <ContactRow
                icon={<Phone size={16} />}
                label="Phone"
                value={resume.phone}
                href={`tel:${resume.phone.replace(/\s+/g, "")}`}
              />
              <ContactRow
                icon={<LinkedinIcon />}
                label="LinkedIn"
                value="arun-kumar-7755492a5"
                href={resume.linkedin}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mailto();
              }}
              className="rounded-3xl border border-border bg-surface/40 backdrop-blur p-6 md:p-8"
            >
              <div className="grid gap-4">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                  maxLength={100}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                  maxLength={255}
                  placeholder="you@company.com"
                />
                <Field
                  label="Message"
                  textarea
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  required
                  maxLength={1000}
                  placeholder="Tell me what you're building."
                />
              </div>

              <button
                type="submit"
                className="mt-6 group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-medium text-primary-foreground glow-ring transition-transform hover:scale-[1.01]"
              >
                Send Message
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              <p className="mt-3 text-[11px] text-muted-foreground text-center">
                Opens your email client preloaded with the message.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface/40 backdrop-blur px-5 py-4 hover:border-primary/40 transition"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-accent ring-1 ring-primary/30">
          {icon}
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            {label}
          </div>
          <div className="text-sm text-foreground">{value}</div>
        </div>
      </div>
      <ArrowUpRight
        size={16}
        className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
      />
    </a>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea,
  required,
  maxLength,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  const base =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition";
  return (
    <label className="block">
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5">
        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            maxLength={maxLength}
            rows={5}
            placeholder={placeholder}
            className={base + " resize-none"}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            maxLength={maxLength}
            placeholder={placeholder}
            className={base}
          />
        )}
      </div>
    </label>
  );
}

/* ---------- FOOTER ---------- */

export function Footer() {
  return (
    <footer className="relative border-t border-border py-10 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
        <div>© {new Date().getFullYear()} Arunkumar Sundaravel · Designed & Built in Chennai</div>
        <div className="flex items-center gap-4">
          <a
            href={resume.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition"
          >
            LinkedIn
          </a>
          <a href={`mailto:${resume.email}`} className="hover:text-accent transition">
            Email
          </a>
          <a href={resume.resumeUrl} download className="hover:text-accent transition">
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
