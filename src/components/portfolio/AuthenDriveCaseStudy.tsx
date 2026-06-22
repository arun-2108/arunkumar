import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass,
  Cpu,
  Database,
  Key,
  Flame,
  UserCheck,
  Activity,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Lock,
  Eye,
  Server,
} from "lucide-react";

interface AuthenDriveCaseStudyProps {
  onClose: () => void;
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background & Challenge" },
  { id: "architecture", label: "System Architecture" },
  { id: "engineering", label: "Engineering & Dev" },
  { id: "impact", label: "Applications & Impact" },
];

export function AuthenDriveCaseStudy({ onClose }: AuthenDriveCaseStudyProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselFading, setCarouselFading] = useState(false);

  const images = ["/Lic_1.png", "/Lic_2.png", "/Lic_3.png", "/Lic_4.png"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCarouselNext = () => {
    if (carouselFading) return;
    setCarouselFading(true);
    setTimeout(() => {
      setCarouselIndex((prev) => (prev + 1) % images.length);
      setCarouselFading(false);
    }, 150);
  };

  const handleCarouselPrev = () => {
    if (carouselFading) return;
    setCarouselFading(true);
    setTimeout(() => {
      setCarouselIndex((prev) => (prev - 1 + images.length) % images.length);
      setCarouselFading(false);
    }, 150);
  };

  const subsystems = [
    {
      title: "Biometric Authentication Module",
      icon: <UserCheck className="h-5 w-5 text-accent" />,
      desc: "Captures and verifies fingerprint data and facial identity data.",
      details:
        "Integrates capacitive fingerprint scanning and a camera module for continuous in-cab facial tracking during vehicle operations.",
    },
    {
      title: "Control Unit",
      icon: <Cpu className="h-5 w-5 text-accent" />,
      desc: "Processes authentication requests and determines access permissions.",
      details:
        "Receives inputs from sensors, processes recognition algorithms locally, and interfaces with the secure database to confirm credentials.",
    },
    {
      title: "Secure Database",
      icon: <Server className="h-5 w-5 text-accent" />,
      desc: "Stores and validates driver authorization records.",
      details:
        "Queries and cross-references active licenses, expiry dates, restrictions, and explicit owner permissions in real-time.",
    },
    {
      title: "Ignition Control System",
      icon: <Key className="h-5 w-5 text-accent" />,
      desc: "Controls vehicle startup through a relay-based authorization mechanism.",
      details:
        "Hardwired relay switch gates the starter motor power, ensuring ignition remains physically locked unless authentication succeeds.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/50">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Sticky Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </button>

          <nav className="hidden md:flex items-center gap-1.5">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition ${
                  activeSection === s.id
                    ? "bg-accent/15 text-accent ring-1 ring-accent/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <button
            onClick={onClose}
            className="text-xs font-mono bg-surface border border-border px-3 py-1.5 rounded-md text-foreground hover:border-primary/40 transition"
          >
            AUTHEN_DRIVE
          </button>
        </div>
      </header>

      {/* Case Study Content */}
      <main className="pt-24 pb-32 max-w-7xl mx-auto px-6">
        {/* Section 1: Overview */}
        <section id="overview" className="scroll-mt-24 mb-24">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-accent mb-6">
                <Layers size={12} /> Case Study
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient leading-[1.1]">
                AuthenDrive
              </h1>
              <p className="mt-4 text-xl text-muted-foreground font-light leading-relaxed">
                Biometric Vehicle Access & License Verification System
              </p>

              {/* Metadata Cards */}
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Calendar size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Duration</span>
                  </div>
                  <div className="text-sm font-semibold">2025</div>
                </div>

                <div className="border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Users size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Track</span>
                  </div>
                  <div className="text-sm font-semibold">Smart Mobility</div>
                </div>

                <div className="border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Briefcase size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">My Role</span>
                  </div>
                  <div className="text-sm font-semibold">Team Lead & Designer</div>
                </div>
              </div>

              <div className="mt-6 border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent mb-2">
                  My Contributions
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Product Concept Development",
                    "System Architecture Planning",
                    "CAD Modeling & Component Integration",
                    "Design Decision Making",
                    "Team Coordination",
                    "Prototype Development Support",
                    "Stakeholder Communication",
                  ].map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-full border border-border bg-background text-xs text-foreground/90 font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Slider / Image Viewer */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-border bg-black shadow-elegant">
              <img
                src={images[carouselIndex]}
                alt={`AuthenDrive Prototype and CAD Integration views`}
                className="w-full h-full object-contain transition-opacity duration-200"
                style={{ opacity: carouselFading ? 0 : 1 }}
              />

              {/* Slider Controls */}
              <button
                onClick={handleCarouselPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleCarouselNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === carouselIndex ? "w-4 bg-accent" : "w-1 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Background & Challenge */}
        <section id="background" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="grid lg:grid-cols-[1fr,1.3fr] gap-12">
            <div>
              <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
                01 · Background
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
                The Challenge
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Vehicle theft, unlicensed driving, and unauthorized usage continue to be major
                safety and economic challenges. Existing automotive security measures primarily
                protect the vehicle itself (e.g. key fobs, alarms), whereas driver verification
                remains completely manual and retrospective. Unlicensed driving significantly
                increases accident severity and legal liabilities.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-surface/20 p-6">
                <div className="flex items-center gap-2.5 text-accent font-semibold mb-3">
                  <Compass size={18} />
                  <span>Design Objective</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Develop a smart, plug-and-play vehicle access system that verifies driver identity
                  using biometrics, checks active driving authorization, prevents unlicensed vehicle
                  startup, and logs secure travel access logs.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-surface/40 backdrop-blur p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
                  Access System Vulnerabilities
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Physical Key Flaws",
                      desc: "Traditional or smart keys can be lost, cloned, or stolen.",
                    },
                    {
                      title: "No License Validation",
                      desc: "Ignition switches cannot check if a driver is suspended or unlicensed.",
                    },
                    {
                      title: "Theft Vulnerability",
                      desc: "Hot-wiring or relay attacks can bypass entry-only protections.",
                    },
                    {
                      title: "Delayed Enforcement",
                      desc: "Violations are only caught during active accidents or roadblocks.",
                    },
                  ].map((ch, idx) => (
                    <div
                      key={idx}
                      className="border border-border/60 bg-background/50 rounded-xl p-4"
                    >
                      <div className="text-sm font-semibold text-accent mb-1">{ch.title}</div>
                      <div className="text-xs text-muted-foreground leading-normal">{ch.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-surface/40 backdrop-blur p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-3">Research & Analysis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  During our market scan, we observed that commercial vehicle systems focus
                  primarily on convenience (keyless starting) or compliance (alcohol interlocks),
                  leaving a major safety gap in active license verification. AuthenDrive bridges
                  this gap by directly linking biometric identification with an encrypted licensing
                  record database at the vehicle ignition layer.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-accent">
                  <Activity size={14} /> SECURITY INSIGHT: INTERLOCKING AUTHENTICATION & OPERATION
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: System Architecture */}
        <section id="architecture" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="max-w-4xl mb-12">
            <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
              02 · System Flow
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
              System Architecture
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              AuthenDrive implements a multi-layer driver authentication flow. Only when both
              biometric credentials and license validity status checks clear will the ignition
              relays close, enabling the vehicle to start.
            </p>
          </div>

          {/* Subsystems grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subsystems.map((sub, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center mb-4">
                    {sub.icon}
                  </div>
                  <h3 className="text-base font-semibold mb-2">{sub.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{sub.desc}</p>
                </div>
                <div className="border-t border-border/40 pt-3 text-[11px] text-muted-foreground font-mono">
                  {sub.details}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-primary/20 bg-primary/5 p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4 text-accent">
              How it works (Pre-ignition Flow)
            </h3>
            <div className="grid md:grid-cols-5 gap-4 text-center">
              {[
                {
                  step: "1",
                  title: "Fingerprint scan",
                  desc: "Driver initiates capacitive fingerprint verification.",
                },
                {
                  step: "2",
                  title: "Facial confirmation",
                  desc: "Camera validates driver matching face profile.",
                },
                {
                  step: "3",
                  title: "License check",
                  desc: "DB queries validation state, expiry dates, restrictions.",
                },
                {
                  step: "4",
                  title: "Ignition relay closes",
                  desc: "Access signals prompt the control unit to activate relay.",
                },
                {
                  step: "5",
                  title: "Vehicle starts",
                  desc: "Starter motor ignition lock releases for driving.",
                },
              ].map((flow, i) => (
                <div
                  key={i}
                  className="relative border border-border/80 bg-background/60 p-4 rounded-xl"
                >
                  <div className="h-6 w-6 rounded-full bg-accent/25 text-accent text-xs font-mono font-bold flex items-center justify-center mx-auto mb-2">
                    {flow.step}
                  </div>
                  <div className="text-xs font-semibold text-foreground mb-1">{flow.title}</div>
                  <div className="text-[10px] text-muted-foreground leading-normal">
                    {flow.desc}
                  </div>
                  {i < 4 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-accent font-bold">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Engineering & Development */}
        <section id="engineering" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
            03 · Design & Build
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
            Engineering Development
          </h2>

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4 text-accent">CAD Component Integration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A complete steering column and dashboard integration study was modeled inside
                SolidWorks. Komponenten placement is critical: the fingerprint module must align
                with natural reach ergonomics on the ignition console, and the tracking sensor
                requires a clear line-of-sight to the driver's face without blocking instrument
                clusters.
                <br />
                <br />
                We mapped component layout envelopes within space constraints of compact commuter
                sedans to evaluate physical packaging, wiring routing safety, and aftermarket
                installation feasibility.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4 text-accent">Hardware Prototyping</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We developed a functional benchtop proof-of-concept prototype. The hardware stack
                consists of:
                <br />
                <br />
                <ul className="space-y-2 text-xs font-mono text-foreground/90">
                  <li className="flex gap-2">
                    <span className="text-accent">•</span> AS608 Fingerprint Scanner (captures and
                    registers biometrics)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span> ESP32 Microcontroller (handles control
                    logic, TCP/IP networking)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span> Firebase Secure Database (stores
                    authorized license hashes)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span> 5V Electromagnetic Relay (operates as the
                    starter interrupter gate)
                  </li>
                </ul>
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-border/20 pt-8">
            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4 text-accent">
                Three-Factor Authorization Model
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Standard vehicle security only asks for possession:{" "}
                <strong>"Do you have the key?"</strong>. AuthenDrive shifts the vehicle access
                paradigm to check three factors:
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-4 text-center">
                <div className="border border-border/60 bg-background/80 p-5 rounded-xl">
                  <UserCheck className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="text-sm font-semibold text-foreground mb-1">
                    Identity Verification
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Are you who you say you are? (Biometrics)
                  </div>
                </div>
                <div className="border border-border/60 bg-background/80 p-5 rounded-xl">
                  <ShieldCheck className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="text-sm font-semibold text-foreground mb-1">
                    License Verification
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Are you legally allowed to drive? (Expiry check)
                  </div>
                </div>
                <div className="border border-border/60 bg-background/80 p-5 rounded-xl">
                  <Lock className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="text-sm font-semibold text-foreground mb-1">
                    Vehicle Authorization
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Do you have explicit permission for this specific car?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Impact & outcomes */}
        <section id="impact" className="scroll-mt-24 mb-16 border-t border-border/30 pt-20">
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
            04 · Applications
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
            Potential Applications & Impact
          </h2>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-border bg-surface/30 backdrop-blur p-5 rounded-2xl">
              <h4 className="font-semibold text-accent text-sm mb-2">Government & Public Sector</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Integrates into smart licensing programs to automatically block suspended or
                underage drivers.
              </p>
            </div>

            <div className="border border-border bg-surface/30 backdrop-blur p-5 rounded-2xl">
              <h4 className="font-semibold text-accent text-sm mb-2">Automotive Industry</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                OEM component opportunity for smart vehicles and connected car ecosystems.
              </p>
            </div>

            <div className="border border-border bg-surface/30 backdrop-blur p-5 rounded-2xl">
              <h4 className="font-semibold text-accent text-sm mb-2">Fleet Management</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enables logistics and car rentals to verify that only authorized employees operate
                active cargo.
              </p>
            </div>

            <div className="border border-border bg-surface/30 backdrop-blur p-5 rounded-2xl">
              <h4 className="font-semibold text-accent text-sm mb-2">Consumer Market</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Acts as a robust aftermarket anti-theft upgrade, guarding family vehicle safety.
              </p>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 text-accent">Key Project Impact Areas</h3>
              <ul className="space-y-3.5 text-sm text-foreground/90">
                {[
                  "Road Safety: Actively reduces risks by locking unlicensed drivers out.",
                  "Vehicle Security: Eliminates vulnerability to physical key cloning and lockpicking.",
                  "Digital Accountability: Maintains encrypted, tamper-proof logs of driver access events.",
                  "Smart Ecosystems: Future-proof architecture ready for connected transportation networks.",
                ].map((out, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 text-accent">Key Learnings</h3>
              <ul className="space-y-3.5 text-sm text-foreground/90">
                {[
                  "Biometric interface hardware requires noise filtration in rugged automotive environments.",
                  "Connecting embedded edge sensors with remote database checks demands lightweight protocols.",
                  "CAD placement must balance accessibility, ergonomic reach, and passenger impact safety rules.",
                  "Collaborating across mechatronic controls and database backends is vital for systems engineering.",
                ].map((les, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0 animate-pulse-glow" />
                    <span>{les}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button to return */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold shadow-glow transition hover:scale-105"
        >
          <ArrowLeft size={16} />
          Return to Portfolio
        </button>
      </div>
    </div>
  );
}
