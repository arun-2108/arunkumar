import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  TrendingDown,
  ShieldAlert,
  Compass,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Activity,
} from "lucide-react";

interface BananaCaseStudyProps {
  onClose: () => void;
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background & Challenge" },
  { id: "architecture", label: "System Architecture" },
  { id: "design", label: "Engineering Design" },
  { id: "impact", label: "Impact & Outcomes" },
];

export function BananaCaseStudy({ onClose }: BananaCaseStudyProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselFading, setCarouselFading] = useState(false);

  const images = ["/banana_unit.png", "/banana-mpu.png"];

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

  const processingStages = [
    {
      name: "Bunch Receiving",
      desc: "Harvested banana bunches enter the system onto intake rails.",
    },
    { name: "De-flowering", desc: "Removal of the remaining flowers from the tip of each fruit." },
    {
      name: "De-handing",
      desc: "Carefully slicing individual banana hands from the main bunch stalk.",
    },
    {
      name: "Washing & Cleaning",
      desc: "Primary water bath to remove dirt, latex, and farm residues.",
    },
    {
      name: "Fungicide Treatment",
      desc: "Fungicide washing to prevent crown rot during shipping.",
    },
    { name: "Drying", desc: "Continuous forced-air drying to prep fruit skins for packaging." },
    {
      name: "Grading & Sorting",
      desc: "Classifying banana hands by length, girth, and visual quality.",
    },
    { name: "Quality Inspection", desc: "Manual check by quality control operators for defects." },
    { name: "Weighing", desc: "Grouping hands into exact standard export crate weights." },
    {
      name: "Boxing & Packaging",
      desc: "Placing bananas in ventilated boxes with liners for shipment.",
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
            M-BPU DESIGN
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
                Mobile Banana Processing Unit
              </h1>
              <p className="mt-4 text-xl text-muted-foreground font-light leading-relaxed">
                Bringing Post-Harvest Processing Directly to the Farm
              </p>

              {/* Metadata Cards */}
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Calendar size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Duration</span>
                  </div>
                  <div className="text-sm font-semibold">Dec 2024 – Mar 2025</div>
                </div>

                <div className="border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Users size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">
                      Team Size
                    </span>
                  </div>
                  <div className="text-sm font-semibold">13 Members</div>
                </div>

                <div className="border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5 sm:col-span-1">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Briefcase size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">My Role</span>
                  </div>
                  <div className="text-sm font-semibold">Mechanical Lead</div>
                </div>
              </div>

              <div className="mt-6 border border-border/80 bg-surface/30 backdrop-blur rounded-2xl p-5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent mb-2">
                  Contributions
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Process Analysis",
                    "Mechanical Layout Design",
                    "CAD Development",
                    "System Integration",
                    "Workflow Optimization",
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
                alt={`Mobile Banana Processing Unit model design view`}
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
                Banana processing remains highly labor-intensive across agricultural regions in
                India. Typically, banana bunches are transported to centralized facilities for
                manual processing. This delay, coupled with multiple handling stages, causes fruit
                bruising, high transit losses, and high operations costs.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-surface/20 p-6">
                <div className="flex items-center gap-2.5 text-accent font-semibold mb-3">
                  <Compass size={18} />
                  <span>Design Objective</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Develop a semi-autonomous mobile processing system operating directly at farm
                  locations. The system must reduce labor requirements, minimize handling damage,
                  maintain product quality, and eliminate dependency on permanent infrastructure.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-surface/40 backdrop-blur p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
                  Operational Challenges Analyzed
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "High Labor Dependency",
                      desc: "15-20 workers required per processing line in centralized yards.",
                    },
                    {
                      title: "Produce Damage",
                      desc: "Multiple manual loading and handling stages cause bruising.",
                    },
                    {
                      title: "Processing Delays",
                      desc: "Delayed processing after harvest triggers early spoilage.",
                    },
                    {
                      title: "Logistics Overhead",
                      desc: "Increased shipping weight and transportation costs before sorting.",
                    },
                    {
                      title: "Lack of Local Infra",
                      desc: "Remote farms lack power, clean water, or processing structures.",
                    },
                    {
                      title: "Fragmented Workflows",
                      desc: "Inefficient manual transfer and accumulation bottlenecks.",
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
                <h3 className="text-xl font-semibold mb-3">Research & Field Study</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To gather physical data, our team conducted a field visit to{" "}
                  <strong>Trident Fruits'</strong> processing facilities and farms in Mumbai. We
                  tracked the post-harvest workflow from harvesting to cold storage. Our
                  observations showed that excessive manual transfer between processing steps (e.g.
                  de-flowering, washing, sorting, weighing, and boxing) was the primary cause of
                  downtime and crop bruising.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-accent">
                  <Activity size={14} /> FIELD INSIGHT: REDUCED HANDLING = EXTENDED SHELF LIFE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: System Architecture */}
        <section id="architecture" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="max-w-4xl mb-12">
            <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
              02 · Workflow
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
              System Architecture
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We replaced the static facility model with a continuous-flow processing sequence
              integrated directly inside a heavy-vehicle transport platform. Below is the
              step-by-step conveyor pathway designed for the mobile unit.
            </p>
          </div>

          {/* Process Timeline Flow */}
          <div className="relative overflow-x-auto pb-4 scrollbar-thin">
            <div className="flex gap-4 min-w-[1000px] px-2">
              {processingStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="flex-1 min-w-[220px] rounded-2xl border border-border bg-surface/30 backdrop-blur p-5 flex flex-col justify-between hover:border-primary/40 transition group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-[10px] text-accent font-bold uppercase">
                        Stage {idx + 1}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/60 group-hover:bg-accent group-hover:animate-pulse-glow" />
                    </div>
                    <h4 className="text-sm font-semibold mb-2 group-hover:text-accent transition">
                      {stage.name}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < processingStages.length - 1 && (
                    <div className="mt-4 flex justify-end">
                      <ArrowRight
                        size={14}
                        className="text-border group-hover:text-accent group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Engineering Design */}
        <section id="design" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
            03 · Mechanics
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
            Engineering Design & CAD
          </h2>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/30 transition">
              <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Compass size={18} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Circular Overhead Transport System</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rather than manual carrying, a motorized circular monorail track suspends and
                carries banana bunches continuously through the receiving, de-flowering, and washing
                zones. This reduces operator strain and minimizes bruising.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/30 transition">
              <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Layers size={18} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Integrated Conveyor Line</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Belt and roller conveyors link downstream de-handing, washing, chemical treating,
                drying, and packing tables. This creates a unified flow line that compresses layout
                space to fit on a trailer bed.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/30 transition">
              <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Maximize2 size={18} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Modular Deployment & Fold-outs</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Designed to fold securely into a standard heavy-duty logistics truck container
                during transport. Once parked at a farm, hydraulic fold-out platforms and awnings
                double the functional width for workstations.
              </p>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-8 border-t border-border/20 pt-8">
            <div className="rounded-3xl border border-border bg-surface/10 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4 text-accent">
                CAD Assembly & SolidWorks Details
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The mechanical design was fully modeled and analyzed in SolidWorks. The spatial
                limitations of a mobile chassis (12m x 2.5m footprint) required compact nesting of
                the circular transport system, sub-floor water recirculation pumps, and packaging
                tables.
                <br />
                <br />
                We utilized <strong>Design for Manufacturing (DFM)</strong> guidelines and{" "}
                <strong>GD&T</strong> stackup analysis for the monorail mounting frame to ensure it
                can withstand vibration loads during off-road farm transportation.
              </p>
            </div>

            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <ShieldAlert size={18} className="text-accent" />
                Key Decision: Semi-Autonomous vs Fully Automated
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Why didn't we fully automate the process? Banana hands vary drastically in weight,
                shape, and ripeness. Automated grading using mechanical grippers can damage delicate
                fruit skin and fail on irregular shapes.
                <br />
                <br />
                We chose a <strong>semi-autonomous</strong> approach: heavy transportation and
                chemical washing are fully mechanized, while grading, sorting, and packaging remain
                operator-assisted. This hybrid layout maintains extreme flexibility and ensures
                product quality.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Impact & Outcomes */}
        <section id="impact" className="scroll-mt-24 mb-16 border-t border-border/30 pt-20">
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
            04 · Results
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
            Impact & Outcomes
          </h2>

          {/* Metric block */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Traditional Labor
                </div>
                <div className="mt-2 text-4xl font-semibold text-foreground">15–20</div>
                <div className="text-xs text-muted-foreground mt-1">Workers per line</div>
              </div>
            </div>

            <div className="rounded-2xl border border-accent/40 bg-accent/5 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                  M-BPU Labor
                </div>
                <div className="mt-2 text-4xl font-semibold text-accent flex items-center gap-2">
                  3–7
                  <TrendingDown size={24} className="text-accent" />
                </div>
                <div className="text-xs text-accent mt-1">~65% Labor Reduction</div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Workflow Model
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground">Continuous Flow</div>
                <div className="text-xs text-muted-foreground mt-1">Zero buffer bottle-necks</div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Deployment Time
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground">Rapid On-site</div>
                <div className="text-xs text-muted-foreground mt-1">Under 2 hours setup</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 text-accent">Key Project Outcomes</h3>
              <ul className="space-y-3.5 text-sm text-foreground/90">
                {[
                  "Developed a complete mobile post-harvest processing layout fit for travel.",
                  "Integrated mechanical de-flowering, washing, and grading into a single workflow.",
                  "Eliminated fixed packing house infrastructure requirement for smaller co-operative farms.",
                  "Created a scalable chassis packaging solution that meets regional vehicle dimension codes.",
                ].map((out, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 text-accent">Lessons Learned</h3>
              <ul className="space-y-3.5 text-sm text-foreground/90">
                {[
                  "Process flow modeling is vital before initiating CAD sketches to save modeling time.",
                  "Designing within heavy-vehicle transport dimensions requires extremely tight tolerance stacks.",
                  "Human-machine interaction dynamics dictate structural spacing near conveyors.",
                  "Simulating vehicle vibration loading reveals stress spots in long framing spans.",
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
