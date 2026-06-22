import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Compass,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Activity,
  Cpu,
  Wrench,
  Gauge,
  Zap,
} from "lucide-react";

interface BananaVehicleCaseStudyProps {
  onClose: () => void;
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background & Challenge" },
  { id: "design", label: "Chassis & Suspension" },
  { id: "dynamics", label: "Dynamics & Electronics" },
  { id: "impact", label: "Outcomes & Lessons" },
];

export function BananaVehicleCaseStudy({ onClose }: BananaVehicleCaseStudyProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselFading, setCarouselFading] = useState(false);

  const images = ["/Baja_1.png", "/Baja_2.png", "/Baja_3.png"];

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

  const engineeringObjectives = [
    {
      title: "Chassis Optimization",
      desc: "Maximize chassis strength-to-weight ratio using hollow tubular sections.",
    },
    {
      title: "Off-Road Suspension",
      desc: "Design a suspension capable of handling highly uneven agricultural terrain.",
    },
    {
      title: "Structural Validation",
      desc: "Perform FEA static and dynamic load simulations to confirm yield safety factors.",
    },
    {
      title: "Vehicle Dynamics",
      desc: "Evaluate roll, steering geometry, and load transfers in simulation.",
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
            BANANA_UTV
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
                Compact Banana Plantation UTV
              </h1>
              <p className="mt-4 text-xl text-muted-foreground font-light leading-relaxed">
                Virtual Prototyping of a Compact Utility Transport Vehicle for Narrow Slopes
              </p>

              {/* Metadata Cards */}
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Calendar size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Duration</span>
                  </div>
                  <div className="text-sm font-semibold">Jan 2026 – Present</div>
                </div>

                <div className="border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Users size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">
                      Team Size
                    </span>
                  </div>
                  <div className="text-sm font-semibold">12 Members</div>
                </div>

                <div className="border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5 sm:col-span-1">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Briefcase size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">My Role</span>
                  </div>
                  <div className="text-sm font-semibold">Dynamics & Electronics Lead</div>
                </div>
              </div>

              <div className="mt-6 border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent mb-2">
                  My Core Contributions
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Vehicle Dynamics Calculations",
                    "Suspension Geometry Selection",
                    "Lotus Suspension Analysis",
                    "Chassis Static & Dynamic FEA",
                    "ANSYS Validation Review",
                    "Electronic Bus Layout Planning",
                    "Safety Interlock & Sensors",
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
              {images[carouselIndex] ? (
                <img
                  src={images[carouselIndex]}
                  alt={`Banana UTV virtual design rendering`}
                  className="w-full h-full object-contain transition-opacity duration-200"
                  style={{ opacity: carouselFading ? 0 : 1 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-950 font-mono text-muted-foreground text-xs">
                  UTV CAD Render Not Found
                </div>
              )}

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
                The Plantation Challenge
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Banana harvesting typically relies heavily on manual labor to carry heavy bunches
                from steep, narrow plantation pathways to central collection trucks. Traditional 4x4
                utility vehicles are oversized, costly, and unable to negotiate tight row clearances
                without damaging trees or compacting soil.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-surface/20 p-6">
                <div className="flex items-center gap-2.5 text-accent font-semibold mb-3">
                  <Compass size={18} />
                  <span>Problem Statements</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground font-light">
                  <li className="flex gap-2">
                    <span className="text-accent">•</span> High physical fatigue for workers
                    transporting bunches manually.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span> Damage and bruising to delicate fruit
                    skins during multi-handling transit.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span> Narrow pathway widths (often &lt; 1.5m)
                    and uneven, muddy terrains.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span> High operational cost of large
                    agricultural machinery.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-surface/40 backdrop-blur p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
                  Engineering Objectives
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {engineeringObjectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="border border-border/60 bg-background/50 rounded-xl p-4"
                    >
                      <div className="text-sm font-semibold text-accent mb-1">{obj.title}</div>
                      <div className="text-xs text-muted-foreground leading-normal">{obj.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-surface/40 backdrop-blur p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-3">Functional Architecture Goals</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  To achieve stable operations, the vehicle architecture requires a very low center
                  of gravity (CoG), narrow track width, high approach/departure angles, and an
                  electric drivetrain capable of high-torque, low-speed hauling. Additionally, a
                  modular rear bed system was selected to accommodate customizable harvesting
                  baskets, minimizing manual fruit handling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Chassis & Suspension */}
        <section id="design" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
            02 · Mechanical Design
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
            Chassis Engineering & Suspension Design
          </h2>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/30 transition">
              <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Wrench size={18} />
              </div>
              <h3 className="text-lg font-semibold mb-2">CAD Modeling in SolidWorks</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                The space frame chassis was fully modeled in SolidWorks. Tubular profiles were
                packed tightly to maximize passenger cockpit protection, ground clearance, and
                battery packing space, while maintaining a track width of under 1.2 meters.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/30 transition">
              <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4">
                <ShieldAlert size={18} />
              </div>
              <h3 className="text-lg font-semibold mb-2">ANSYS FEA Validation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                We validated the structural integrity of the frame under static loading, bending,
                and torsion using ANSYS. Simulated loads represented peak payload payload, battery
                packs, and dynamic bump reactions. Stress distributions remained within yield
                strength boundaries.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/30 transition">
              <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Compass size={18} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Double A-Arm Suspension</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                To maintain maximum tire-ground contact on uneven terrain, a double wishbone
                suspension was chosen. The geometry keeps wheels vertical during heavy bump
                deflections, ensuring consistent tire grip on slick soil.
              </p>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-8 border-t border-border/20 pt-8">
            <div className="rounded-3xl border border-border bg-surface/10 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4 text-accent">
                Chassis Design Considerations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Designing a vehicle chassis for small-scale agriculture requires a strict weight
                budget. Using AISI 4130 chromoly steel tubing allowed high structural rigidity with
                thin wall sections. Key joints were structurally reinforced with gussets at areas of
                highest bending moments identified in ANSYS FEA. Special attention was paid to the
                front suspension pick-up points and rear load bed mountings to prevent fatigue
                cracks under continuous vibrational off-road loads.
              </p>
            </div>

            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Activity size={18} className="text-accent" />
                Structural Integrity Results
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                The ANSYS simulation results proved that the design met safety margins under severe
                agricultural loads:
                <br />
                <br />
                <span className="text-xs font-mono text-accent">
                  - Maximum Von Mises Stress: 185 MPa (Yield Strength: 460 MPa)
                  <br />
                  - Structural Safety Factor: 2.48 under 3G bump impact load
                  <br />- Torsional Rigidity: Optimized to absorb frame twisting, reducing wheel
                  lift on cross-axle ditches.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Dynamics & Electronics */}
        <section id="dynamics" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="max-w-4xl mb-12">
            <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
              03 · Dynamics & Controls
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
              Vehicle Dynamics & Electronics Architecture
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed font-light">
              As the Dynamics and Electronics Lead, I performed kinematics simulations to optimize
              handling stability and planned the power distribution network supporting clean
              electrical control signals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-border bg-surface/30 backdrop-blur p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-accent" />
                  Lotus Suspension Kinematics Analysis
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  Suspension geometry was simulated and refined using Lotus Suspension Analysis
                  software. We optimized roll center migration, camber gain, and steer kinematics
                  (Ackermann geometry) to deliver predictable handling and minimal tire scrub.
                  Camber change was constrained within ±1.5° over the full suspension travel range,
                  keeping maximum tire tread contact during sharp turns.
                </p>
              </div>
              <div className="mt-6 border-t border-border/40 pt-4 flex justify-between text-xs font-mono text-muted-foreground">
                <span>Roll Center Migration: Minimized</span>
                <span>Ackermann: 85% geometry</span>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/30 backdrop-blur p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Electronic Control Architecture
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  The UTV electronic platform was designed with a dual-voltage layout. A 48V
                  high-torque electric powertrain handles propulsion, while an isolated 12V DC-DC
                  system powers sensors and safety interlocks. By mapping this decoupled wiring
                  layout, we eliminated electromagnetical interference from motor switching current
                  on delicate control lines.
                </p>
              </div>
              <div className="mt-6 border-t border-border/40 pt-4 flex justify-between text-xs font-mono text-muted-foreground">
                <span>Powertrain Bus: 48V isolated</span>
                <span>Control Bus: 12V DC-DC regulated</span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-primary/20 bg-primary/5 p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4 text-accent">
              Proposed Electronics & Safety Features
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              {[
                {
                  icon: <Cpu className="h-5 w-5 text-accent mx-auto mb-2" />,
                  title: "Vehicle Monitoring",
                  desc: "Real-time logging of motor temperature, battery SoC, and wheel speed.",
                },
                {
                  icon: <ShieldAlert className="h-5 w-5 text-accent mx-auto mb-2" />,
                  title: "Safety Interlocks",
                  desc: "Emergency cutoffs linked to seat occupancy sensors and brake pressure sensors.",
                },
                {
                  icon: <Activity className="h-5 w-5 text-accent mx-auto mb-2" />,
                  title: "Rollover Protection",
                  desc: "Inclinometer integrations trigger speed limiting on steep hillsides.",
                },
                {
                  icon: <Layers className="h-5 w-5 text-accent mx-auto mb-2" />,
                  title: "Future Autonomy",
                  desc: "CAN bus framework enables direct integration of GPS/LiDAR guidance modules.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-border/80 bg-background/60 p-4 rounded-xl hover:border-primary/30 transition"
                >
                  {item.icon}
                  <div className="text-xs font-semibold text-foreground mb-1">{item.title}</div>
                  <div className="text-[10px] text-muted-foreground leading-normal">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Outcomes & Lessons */}
        <section id="impact" className="scroll-mt-24 mb-16 border-t border-border/30 pt-20">
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
            04 · Results
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
            Virtual Validation Outcomes & Impact
          </h2>

          {/* Metric block */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Pathway Clearance
                </div>
                <div className="mt-2 text-4xl font-semibold text-foreground">&lt; 1.2m</div>
                <div className="text-xs text-muted-foreground mt-1">Fits narrow rows</div>
              </div>
            </div>

            <div className="rounded-2xl border border-accent/40 bg-accent/5 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                  Roll Limit Angle
                </div>
                <div className="mt-2 text-4xl font-semibold text-accent flex items-center gap-2">
                  35°
                  <TrendingUp size={24} className="text-accent" />
                </div>
                <div className="text-xs text-accent mt-1">Virtual roll safety boundary</div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Target Payload
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground">350 kg</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Harvesters payload baseline
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Simulation Tools
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground">ANSYS & Lotus</div>
                <div className="text-xs text-muted-foreground mt-1">Double validation coverage</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 text-accent">Key Project Outcomes</h3>
              <ul className="space-y-3.5 text-sm text-foreground/90 font-light">
                {[
                  "Successfully completed the kinematic optimization of a double wishbone suspension layout.",
                  "Validated a lightweight tubular chassis frame that reduces overall vehicle weight by 22% compared to standard profiles.",
                  "Designed an isolated 48V power distribution layout to support reliable off-grid battery charging.",
                  "Modeled a space-efficient front steering assembly that yields a turning radius of under 2.8m, optimal for compact fields.",
                ].map((out, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0 animate-pulse-glow" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 text-accent">Lessons Learned</h3>
              <ul className="space-y-3.5 text-sm text-foreground/90 font-light">
                {[
                  "Lotus kinematic studies must run iteratively with chassis CAD reviews to prevent mounting bracket overlaps.",
                  "Rigid safety interlock systems require low-latency filters to filter out transient vibration sensor noise.",
                  "Electrification calculations must factor in mud rolling resistance, which can double normal slope torque requirements.",
                  "Coordinating structural and electrical sub-teams is critical when routing cable channels through steel frames.",
                ].map((les, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
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
