import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Cpu,
  Wrench,
  Gauge,
  Zap,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Settings,
  Eye,
} from "lucide-react";

interface MaterialSeparationCaseStudyProps {
  onClose: () => void;
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge & Context" },
  { id: "timeline", label: "Engineering Process" },
  { id: "mechanics", label: "Mechanical Design" },
  { id: "simulation", label: "Interactive Pipeline" },
  { id: "impact", label: "Results & Contribution" },
];

const timelineStages = [
  {
    phase: "01",
    title: "Research & Observation",
    kicker: "FIELD RESEARCH",
    desc: "Conducted initial site observations of raw material high-throughput conveyor lines. Documented operational bottlenecks, physical space constraints, and high-frequency failure locations caused by foreign object ingestion.",
    list: [
      "Analyzed material conveyor flow rate",
      "Mapped structural mounting limitations",
      "Identified main debris types (metal, wood, dense clay)",
    ],
  },
  {
    phase: "02",
    title: "Risk Assessment & FMEA",
    kicker: "FAILURE PREVENTATIVE STUDY",
    desc: "Performed a structured Failure Mode and Effects Analysis (FMEA) to identify severe operational risks. Prioritized automation intervention points where debris ingestion leads to high downtime or mechanical failure.",
    list: [
      "Calculated Risk Priority Numbers (RPN) for equipment damage",
      "Identified downstream jaw crushers as high-risk assets",
      "Justified sensor-based sorting return-on-investment",
    ],
  },
  {
    phase: "03",
    title: "System Architecture",
    kicker: "INTEGRATION PATHWAY",
    desc: "Established a decoupled system architecture linking high-speed optical capture, edge-based neural processing, low-latency programmable logic controllers (PLCs), and pneumatic sorting actuation.",
    list: [
      "Selected gigabit Ethernet industrial vision standards",
      "Mapped isolated dual-voltage wiring safety architectures",
      "Created high-reliability control interlocks for physical override",
    ],
  },
  {
    phase: "04",
    title: "Mechanical Design",
    kicker: "CAD & STRUCTURAL CALCULATIONS",
    desc: "Designed structural support brackets, camera enclosures, and pneumatic cylinder mountings in SolidWorks. Conducted clearance studies to ensure easy maintenance access and avoid conveyor structural interference.",
    list: [
      "Modeled robust camera vibration-isolation frames",
      "Analyzed pneumatic manifold air delivery sizing",
      "Created modular layout sheets with standard metric profiles",
    ],
  },
  {
    phase: "05",
    title: "AI Pipeline Integration",
    kicker: "COMPUTER VISION SYSTEM",
    desc: "Collaborated on the implementation of a real-time object detection and tracking pipeline. Synchronized neural model inferences with mechanical belt positions to trigger precise target diversion signals.",
    list: [
      "Analyzed light conditions and optical filter configurations",
      "Simulated bounding-box center tracking at high belt speed",
      "Calculated latency thresholds for pneumatic valve triggers",
    ],
  },
];

interface SimItem {
  id: number;
  type: "ore" | "debris";
  x: number; // percentage from left (0 to 100)
  y: number; // percentage from top (20 to 80)
  size: number; // diameter in pixels
  detected: boolean;
  diverted: boolean;
}

export function MaterialSeparationCaseStudy({ onClose }: MaterialSeparationCaseStudyProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselFading, setCarouselFading] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  // Simulator state variables
  const [simRunning, setSimRunning] = useState(true);
  const [simSpeed, setSimSpeed] = useState(2); // 1 = Low (1.5 m/s), 2 = Med (2.5 m/s), 3 = High (3.5 m/s)
  const [simItems, setSimItems] = useState<SimItem[]>([]);
  const [scannedCount, setScannedCount] = useState(0);
  const [divertedCount, setDivertedCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [actuatorExtended, setActuatorExtended] = useState(false);
  const [lastDetectionLog, setLastDetectionLog] = useState<string>(
    "System initialized. Awaiting materials...",
  );

  const images = [
    "/Nlc_1.png",
    "/Nlc_2.png",
    "/Nlc_3.png",
    "/Nlc_4.png",
    "/Nlc_5.png",
    "/Nlc_6.png",
    "/Nlc_7.png",
  ];

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulator loop
  const nextId = useRef(0);
  const spawnTimer = useRef<number | null>(null);
  const loopRef = useRef<number | null>(null);

  // Speed-based configurations
  const getSpeedValue = () => {
    if (simSpeed === 1) return 0.5; // slow visual
    if (simSpeed === 2) return 0.95; // medium visual
    return 1.4; // fast visual
  };

  const getRealSpeedMetric = () => {
    if (simSpeed === 1) return "1.5 m/s";
    if (simSpeed === 2) return "2.5 m/s";
    return "3.5 m/s";
  };

  const getLatencyMetric = () => {
    if (simSpeed === 1) return "12.4 ms";
    if (simSpeed === 2) return "9.6 ms";
    return "7.8 ms";
  };

  // Spawn mechanism
  useEffect(() => {
    if (!simRunning) {
      if (spawnTimer.current) clearInterval(spawnTimer.current);
      return;
    }

    spawnTimer.current = window.setInterval(
      () => {
        const isDebris = Math.random() < 0.25;
        const newItem: SimItem = {
          id: nextId.current++,
          type: isDebris ? "debris" : "ore",
          x: -10, // start just off screen left
          y: 35 + Math.random() * 30, // vertical path variation
          size: isDebris ? 28 + Math.random() * 12 : 24 + Math.random() * 16,
          detected: false,
          diverted: false,
        };
        setSimItems((prev) => [...prev, newItem]);
      },
      1200 / (simSpeed * 0.8),
    );

    return () => {
      if (spawnTimer.current) clearInterval(spawnTimer.current);
    };
  }, [simRunning, simSpeed]);

  // Main animation frame physics loop
  useEffect(() => {
    if (!simRunning) {
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
      return;
    }

    const updatePhysics = () => {
      const speed = getSpeedValue();
      const detectionZoneX = 35; // camera line at 35%
      const actuatorZoneX = 75; // pneumatic cylinder line at 75%

      setSimItems((prevItems) => {
        const updated = prevItems.map((item) => {
          const nextX = item.x + speed;
          let nextDetected = item.detected;
          let nextDiverted = item.diverted;

          // Camera Detection event
          if (nextX >= detectionZoneX && item.x < detectionZoneX && !item.detected) {
            nextDetected = true;
            if (item.type === "debris") {
              setLastDetectionLog(
                `[DETECTION] ID #${item.id} - Target: FOREIGN DEBRIS | Conf: ${(97.2 + Math.random() * 2.5).toFixed(1)}% | Pos: X=35.0%`,
              );
            }
          }

          // Pneumatic Actuation event
          if (
            nextX >= actuatorZoneX &&
            item.x < actuatorZoneX &&
            item.detected &&
            item.type === "debris" &&
            !item.diverted
          ) {
            nextDiverted = true;
            // Trigger visual piston extension
            setActuatorExtended(true);
            setTimeout(() => setActuatorExtended(false), 140);
            setDivertedCount((d) => d + 1);
            setLastDetectionLog(
              `[ACTUATION] ID #${item.id} - Pneumatic rod extended. Diverting debris...`,
            );
          }

          return {
            ...item,
            x: nextX,
            detected: nextDetected,
            diverted: nextDiverted,
          };
        });

        // Track stats for off-screen items
        updated.forEach((item) => {
          if (item.x >= 105) {
            setScannedCount((s) => s + 1);
            if (item.type === "debris" && !item.diverted) {
              setMissedCount((m) => m + 1);
              setLastDetectionLog(
                `[WARNING] ID #${item.id} - Foreign debris missed sorting threshold!`,
              );
            }
          }
        });

        // Filter out items that went past the end
        return updated.filter((item) => item.x < 105);
      });

      loopRef.current = requestAnimationFrame(updatePhysics);
    };

    loopRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simRunning, simSpeed]);

  const resetSimStats = () => {
    setSimItems([]);
    setScannedCount(0);
    setDivertedCount(0);
    setMissedCount(0);
    setLastDetectionLog("Simulator reset. Ready.");
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/50">
      {/* Grid backgrounds */}
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
            AI_SEPARATOR
          </button>
        </div>
      </header>

      {/* Case Study Content */}
      <main className="pt-24 pb-32 max-w-7xl mx-auto px-6">
        {/* SECTION 1: OVERVIEW */}
        <section id="overview" className="scroll-mt-24 mb-24">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-accent mb-6">
                <Layers size={12} /> Concept Study
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient leading-[1.1]">
                AI-Powered Industrial Material Separation System
              </h1>
              <p className="mt-4 text-xl text-muted-foreground font-light leading-relaxed">
                Smart automation combining high-speed computer vision, real-time edge processing,
                and pneumatic actuation for sorting conveyor flows.
              </p>

              {/* Metadata Cards */}
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="border border-border/85 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Calendar size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Timeline</span>
                  </div>
                  <div className="text-sm font-semibold">May 2025 – Present</div>
                </div>

                <div className="border border-border/85 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Users size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Type</span>
                  </div>
                  <div className="text-sm font-semibold">Concept Feasibility</div>
                </div>

                <div className="border border-border/85 bg-surface/30 backdrop-blur rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Briefcase size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Role</span>
                  </div>
                  <div className="text-xs font-semibold leading-normal">
                    Mechanical Design & CAD
                  </div>
                </div>
              </div>

              {/* Contributing items */}
              <div className="mt-6 border border-border/85 bg-surface/30 backdrop-blur rounded-2xl p-5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent mb-2">
                  Key Skills Applied
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "CAD Modelling (SolidWorks)",
                    "Dynamic Control Interlocks",
                    "Pneumatic Manifold Analysis",
                    "Conveyor System Integration",
                    "FMEA Risk Matrix",
                    "AI Pipeline Coordination",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full border border-border bg-background text-xs text-foreground/90 font-medium"
                    >
                      {skill}
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
                  alt={`Material Separation Concept view ${carouselIndex + 1}`}
                  className="w-full h-full object-contain transition-opacity duration-200"
                  style={{ opacity: carouselFading ? 0 : 1 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-950 font-mono text-muted-foreground text-xs">
                  Model render {carouselIndex + 1} not found
                </div>
              )}

              {/* Slider Controls */}
              <button
                onClick={handleCarouselPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleCarouselNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCarouselFading(true);
                      setTimeout(() => {
                        setCarouselIndex(i);
                        setCarouselFading(false);
                      }, 150);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === carouselIndex ? "w-4 bg-accent" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CHALLENGE */}
        <section id="challenge" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="grid lg:grid-cols-[1fr,1.3fr] gap-12">
            <div>
              <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
                01 · The Problem
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
                High-Speed Sorting Bottlenecks
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Industrial material handling conveyors transport massive flows of raw materials at
                high speeds. During transport, unwanted foreign objects (like metal shards, timber
                chunks, or high-density rocks) frequently infiltrate the stream.
                <br />
                <br />
                If these foreign objects bypass inspection, they cause severe damage to downstream
                processing units (jaw crushers, pulverizers, or screens). Traditional systems rely
                on manual sorting under hazardous conditions, resulting in:
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-surface/20 p-6">
                <div className="flex items-center gap-2.5 text-accent font-semibold mb-3">
                  <Compass size={18} />
                  <span>Project Objective</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-light">
                  Design a robust, automated inline sorting concept capable of scanning raw
                  materials under high conveyor velocities (up to $3.5\text{m / s}$), detecting
                  foreign anomalies, and triggering rapid mechanical diversion mechanisms without
                  halting belt operations.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-surface/40 backdrop-blur p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
                  Primary System Vulnerabilities
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Downstream Asset Damage",
                      desc: "Ingesting uncrushable debris breaks critical equipment crusher plates.",
                    },
                    {
                      title: "Manual Inspection Hazards",
                      desc: "Operators working near fast-moving high-tonnage belts risk severe injury.",
                    },
                    {
                      title: "Operational Downtime",
                      desc: "Manual belt halts to clear blockages decrease total plant throughput.",
                    },
                    {
                      title: "Harsh Environments",
                      desc: "Severe dust, humidity, and intense vibration cause premature sensor failures.",
                    },
                  ].map((vul, idx) => (
                    <div
                      key={idx}
                      className="border border-border/60 bg-background/50 rounded-xl p-4 transition-colors hover:border-accent/40"
                    >
                      <div className="text-sm font-semibold text-accent mb-1">{vul.title}</div>
                      <div className="text-xs text-muted-foreground leading-normal font-light">
                        {vul.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FMEA Process block */}
              <div className="rounded-3xl border border-border bg-surface/40 backdrop-blur p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-3">
                  Failure Mode & Effects Analysis (FMEA)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  To guide design priorities, I led the FMEA study on sorting processes. We
                  evaluated failure modes by calculating the Risk Priority Number:
                  <span className="block my-2 font-mono text-xs text-center text-accent py-1.5 border border-border/40 rounded bg-background/50">
                    RPN = Severity (S) × Occurrence (O) × Detection (D)
                  </span>
                  Our assessment pinpointed uncrushable metallic debris as the highest hazard RPN
                  (360), which justified investing in a high-speed vision camera coupled with
                  low-latency pneumatic blow-off arrays.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-accent">
                  <Activity size={14} /> FMEA RISK THRESHOLD SET: RPN &gt; 120 MANDATES AUTOMATION
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ENGINEERING PROCESS TIMELINE */}
        <section id="timeline" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="max-w-4xl mb-12">
            <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
              02 · Engineering Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
              Developing the Concept Flow
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed font-light">
              Designing this system required a systematic mechanical and automation review. Explore
              the main milestones of our design timeline below:
            </p>
          </div>

          {/* Interactive Timeline Tabs */}
          <div className="grid md:grid-cols-[280px,1fr] gap-8">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 select-none">
              {timelineStages.map((stage, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition flex items-center justify-between min-w-[200px] md:min-w-0 ${
                    activeStage === idx
                      ? "border-accent/40 bg-accent/15 text-accent shadow-[0_0_15px_color-mix(in_oklab,var(--accent)_10%,transparent)]"
                      : "border-border bg-surface/30 text-muted-foreground hover:text-foreground hover:bg-surface/50"
                  } cursor-pointer`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold">{stage.phase}</span>
                    <span className="text-sm font-semibold truncate">{stage.title}</span>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`hidden md:block transition-transform ${activeStage === idx ? "translate-x-1" : "opacity-35"}`}
                  />
                </button>
              ))}
            </div>

            <div className="min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-border bg-surface/30 p-6 md:p-8 flex flex-col justify-between h-full backdrop-blur-sm"
                >
                  <div>
                    <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest block mb-2">
                      {timelineStages[activeStage].kicker}
                    </span>
                    <h3 className="text-2xl font-bold mb-4">{timelineStages[activeStage].title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6">
                      {timelineStages[activeStage].desc}
                    </p>
                  </div>

                  <div>
                    <div className="h-px bg-border/40 my-4" />
                    <h4 className="text-xs font-mono uppercase text-accent/80 mb-3 tracking-wider">
                      Key Tasks
                    </h4>
                    <ul className="grid sm:grid-cols-3 gap-3">
                      {timelineStages[activeStage].list.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-2 items-start border border-border/40 bg-background/50 rounded-lg p-2.5"
                        >
                          <CheckCircle2 size={12} className="text-accent mt-0.5 shrink-0" />
                          <span className="text-xs text-foreground/80 leading-normal font-light">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION 4: MECHANICAL DESIGN */}
        <section id="mechanics" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
            03 · CAD & Calculations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
            Mechanical Integration Framework
          </h2>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/30 transition">
              <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Wrench size={18} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Conveyor Frame Integration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Developed mounting trusses that bolt directly to existing conveyor stringer
                structures without requiring hot work. Adjustable camera positioning slots allow
                height tuning relative to changing material burden depths.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/30 transition">
              <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4">
                <ShieldAlert size={18} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Camera Vibration Damping</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Conveyors generate severe vibration profiles. Designed custom isolator plates with
                dual-core elastomeric dampeners to absorb high-frequency shaker loads, preventing
                camera image motion blur.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 hover:border-primary/30 transition">
              <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Cpu size={18} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pneumatic Ejector Arrays</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Calculated air manifold delivery values. Designed high-frequency solenoid valves
                hooked up to double-acting pneumatic actuators. Rapid extend and retract strokes
                prevent belt scratching.
              </p>
            </div>
          </div>

          {/* Mathematical Calculations Section */}
          <div className="mt-8 border-t border-border/20 pt-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-border bg-surface/10 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4 text-accent">
                Response Latency Calculations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                For successful sorting, the total cycle latency must be less than the material
                travel time from the camera scan zone to the actuator diversion line.
                <br />
                <br />
                Let belt velocity $v = 2.5\text{m / s}$ and distance $L = 1.8\text{m}$. The physical
                travel duration ($t_{travel}$) is:
                <span className="block my-3 font-mono text-xs text-center text-accent py-2 border border-border/40 rounded bg-background/50">
                  t_travel = L / v = 1.8 / 2.5 = 0.72\text{s} = 720\text{ms}
                </span>
                Our computed response pipeline budget breakdown shows:
              </p>
              <div className="mt-4 space-y-2 text-xs font-mono text-muted-foreground">
                <div className="flex justify-between border-b border-border/30 pb-1">
                  <span>1. Image Acquisition & Exposure</span>
                  <span className="text-foreground font-semibold">15.0 ms</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-1">
                  <span>2. YOLO Object Detection Inference</span>
                  <span className="text-foreground font-semibold">12.5 ms</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-1">
                  <span>3. Controller (PLC) Output Delay</span>
                  <span className="text-foreground font-semibold">2.0 ms</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-1">
                  <span>4. Solenoid Valve Air Rise Time</span>
                  <span className="text-foreground font-semibold">18.0 ms</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-1">
                  <span>5. Cylinder Physical Extension</span>
                  <span className="text-foreground font-semibold">45.0 ms</span>
                </div>
                <div className="flex justify-between text-accent font-semibold pt-1">
                  <span>Total System Latency (t_total)</span>
                  <span>92.5 ms</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground leading-normal font-light">
                Since $t_{total} = 92.5\text{ms} \ll t_{travel} = 720\text{ms}$, we establish a
                generous safety factor of $S_f = 7.78$, allowing robust target confirmation and belt
                speed adjustment tolerances.
              </p>
            </div>

            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Activity size={18} className="text-accent" />
                  CAD Simulation & DFM Review
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  The camera support structure underwent FEA analysis to guarantee structural safety
                  against heavy vibration:
                  <br />
                  <br />
                  - **Natural Frequency Analysis:** Frame natural frequencies were calculated to
                  ensure they sit well outside the main conveyor running frequencies (20-60 Hz),
                  preventing structural resonance.
                  <br />
                  - **Enclosure Design:** Designed a sealed IP66 enclosure with built-in air knives.
                  Constant compressed air sweeps dust particles off the optical glass window,
                  eliminating manually scheduled cleaning.
                  <br />- **DFM Optimization:** Utilized standard laser-cut sheet plates and
                  standardized ISO metric bolts to lower manufacturing fabrication costs.
                </p>
              </div>
              <div className="mt-6 border-t border-border/40 pt-4 flex justify-between text-xs font-mono text-muted-foreground">
                <span>Vibration Safety: FEA verified</span>
                <span>Enclosure Grade: IP66 Dustproof</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE SIMULATOR */}
        <section id="simulation" className="scroll-mt-24 mb-24 border-t border-border/30 pt-20">
          <div className="max-w-4xl mb-12">
            <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
              04 · Interactive Demo
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
              Interactive System Simulator
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed font-light">
              Observe how the mechatronics and computer vision pipeline cooperate. Select the
              conveyor belt speed to simulate sorting, and watch the pneumatic actuator remove
              foreign debris in real time.
            </p>
          </div>

          {/* Simulator Panel Container */}
          <div className="rounded-3xl border border-border bg-surface/30 backdrop-blur-md overflow-hidden shadow-elegant">
            {/* Top Control Bar */}
            <div className="bg-surface/80 px-6 py-4 border-b border-border flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSimRunning(!simRunning)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    simRunning
                      ? "bg-amber-500/20 text-amber-500 border border-amber-500/40 hover:bg-amber-500/30"
                      : "bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 hover:bg-emerald-500/30"
                  } cursor-pointer`}
                >
                  {simRunning ? <Pause size={12} /> : <Play size={12} />}
                  {simRunning ? "Pause Belt" : "Start Belt"}
                </button>

                <button
                  onClick={resetSimStats}
                  className="flex items-center gap-2 border border-border bg-background hover:bg-surface/60 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Reset stats
                </button>
              </div>

              {/* Speed presets */}
              <div className="flex items-center gap-2 border border-border bg-background/60 p-1 rounded-full text-xs">
                <span className="px-2 text-muted-foreground font-mono text-[10px] uppercase">
                  Speed:
                </span>
                {[
                  { label: "1.5m/s", val: 1 },
                  { label: "2.5m/s", val: 2 },
                  { label: "3.5m/s", val: 3 },
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => setSimSpeed(s.val)}
                    className={`rounded-full px-3 py-1 transition cursor-pointer font-mono font-medium ${
                      simSpeed === s.val
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Conveyor Lane */}
            <div className="relative h-48 bg-zinc-950 border-b border-border overflow-hidden select-none flex items-center">
              {/* Belt background pattern */}
              <div
                className="absolute inset-0 bg-repeat-x opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--color-border) 2px, transparent 2px)",
                  backgroundSize: "24px 24px",
                  animation: simRunning ? `spin-slow ${6 / simSpeed}s linear infinite` : "none",
                }}
              />

              {/* Conveyor center rollers */}
              <div className="absolute inset-x-0 h-1 bg-border/40" />

              {/* Camera Field of View Overlay (Glow cone) */}
              <div className="absolute left-[35%] top-0 bottom-0 w-24 bg-gradient-to-r from-accent/0 via-accent/15 to-accent/0 pointer-events-none flex flex-col items-center">
                <div className="w-0.5 h-full bg-accent/40 border-dashed" />
                <span className="absolute top-2 bg-accent/90 text-accent-foreground text-[8px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                  VISION GAUGE
                </span>
              </div>

              {/* Actuation physical zone */}
              <div className="absolute left-[75%] top-0 bottom-0 w-16 pointer-events-none flex flex-col items-center justify-between py-2">
                <div className="h-full w-px bg-red-500/20 border-dashed" />
                <span className="absolute bottom-2 bg-red-500/20 text-red-500 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded">
                  ACTUATOR GATE
                </span>
              </div>

              {/* Pneumatic Cylinder piston visual representation */}
              <div
                className="absolute left-[72.5%] top-0 w-12 bg-zinc-800 border-x border-b border-border rounded-b-md flex flex-col items-center transition-all duration-75 z-10"
                style={{
                  height: actuatorExtended ? "100px" : "30px",
                }}
              >
                {/* Cylinder main body */}
                <div className="w-full h-8 bg-zinc-700 border-b border-border flex items-center justify-center">
                  <Zap
                    size={10}
                    className={
                      actuatorExtended ? "text-accent animate-pulse-glow" : "text-muted-foreground"
                    }
                  />
                </div>
                {/* Actuator shaft rod */}
                <div className="w-2 flex-1 bg-zinc-400" />
                {/* Pusher plate tip */}
                <div className="w-10 h-3 bg-red-500 rounded" />
              </div>

              {/* Live materials on the belt */}
              {simItems.map((item) => (
                <div
                  key={item.id}
                  className={`absolute rounded-xl flex items-center justify-center transition-all duration-75 ${
                    item.diverted ? "rotate-45 translate-y-12 opacity-0" : "hover:scale-105"
                  }`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    transform: `translate(-50%, -50%) ${item.diverted ? "translateY(30px) rotate(45deg)" : ""}`,
                  }}
                >
                  {/* Bounding Box Visual for Detected Debris */}
                  {item.detected && item.type === "debris" && !item.diverted && (
                    <div className="absolute -inset-2 border-2 border-red-500 rounded-lg animate-pulse-glow flex items-start justify-center">
                      <span className="absolute -top-4 text-[7px] font-mono font-bold bg-red-500 text-white px-1 rounded whitespace-nowrap">
                        DEBRIS 98.4%
                      </span>
                    </div>
                  )}

                  {/* Standard Material Ore (Grey Coal) */}
                  {item.type === "ore" ? (
                    <div className="w-full h-full bg-zinc-700/80 border border-zinc-500/40 rounded-lg flex items-center justify-center overflow-hidden shadow-inner">
                      <span className="text-[7px] font-mono text-zinc-400">ORE</span>
                    </div>
                  ) : (
                    /* Debris Target (Metallic/Timber scrap) */
                    <div className="w-full h-full bg-amber-700/70 border-2 border-amber-500 rounded-md flex items-center justify-center shadow-lg relative">
                      <div className="absolute inset-1 border border-dashed border-amber-400/50 rounded" />
                      <span className="text-[7px] font-mono font-bold text-amber-100">SCRAP</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Real-time Dashboard Panel */}
            <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Metrics items */}
              <div className="p-5 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Materials scanned
                </span>
                <div className="text-3xl font-semibold mt-1 font-mono">{scannedCount}</div>
                <span className="text-[9px] text-muted-foreground font-light leading-normal">
                  Total feed passing detection gate
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-accent font-semibold uppercase tracking-widest">
                  Debris Diverted
                </span>
                <div className="text-3xl font-semibold mt-1 text-accent font-mono flex items-center gap-2">
                  {divertedCount}
                  {divertedCount > 0 && (
                    <TrendingDown size={18} className="text-accent animate-pulse-glow" />
                  )}
                </div>
                <span className="text-[9px] text-accent/80 font-light leading-normal">
                  Correctly pushed off conveyor lane
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest">
                  Missed debris
                </span>
                <div className="text-3xl font-semibold mt-1 text-red-500 font-mono">
                  {missedCount}
                </div>
                <span className="text-[9px] text-red-500/80 font-light leading-normal">
                  Objects missed or bypassed limits
                </span>
              </div>

              {/* Dynamic stats diagnostics */}
              <div className="p-5 bg-black/20 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase">
                    Diagnostics
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[8px] font-mono uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                    <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse-glow" />
                    ONLINE
                  </span>
                </div>
                <div className="space-y-1.5 text-[10px] font-mono text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Active velocity:</span>
                    <span className="text-foreground font-semibold">{getRealSpeedMetric()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inference cost:</span>
                    <span className="text-foreground font-semibold">{getLatencyMetric()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sorting accuracy:</span>
                    <span className="text-accent font-semibold">98.4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal console logger display */}
            <div className="bg-black/60 px-6 py-3 border-t border-border/80 flex items-center gap-3">
              <span className="text-[10px] font-mono text-accent uppercase font-bold shrink-0">
                System Log:
              </span>
              <span className="text-[10px] font-mono text-zinc-300 truncate font-light select-text">
                {lastDetectionLog}
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 6: IMPACT & CONTRIBUTION */}
        <section id="impact" className="scroll-mt-24 mb-16 border-t border-border/30 pt-20">
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
            05 · Outcome & Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
            Project Outcome & Contributions
          </h2>

          {/* Metric block */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Sorting Latency
                </div>
                <div className="mt-2 text-4xl font-semibold text-foreground font-mono">
                  &lt; 93ms
                </div>
                <div className="text-xs text-muted-foreground mt-1">Total end-to-end delay</div>
              </div>
            </div>

            <div className="rounded-2xl border border-accent/40 bg-accent/5 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                  Downtime Reduction
                </div>
                <div className="mt-2 text-4xl font-semibold text-accent font-mono flex items-center gap-2">
                  20%
                  <TrendingDown size={24} className="text-accent" />
                </div>
                <div className="text-xs text-accent mt-1">Estimated downtime recovery</div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  YOLO Accuracy
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground font-mono">98.4% AP</div>
                <div className="text-xs text-muted-foreground mt-1">Average precision target</div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/30 backdrop-blur p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Operating Belt Speed
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground font-mono">
                  Up to 3.5m/s
                </div>
                <div className="text-xs text-muted-foreground mt-1">High-throughput compliance</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            {/* My Contribution Card */}
            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 text-accent">My Technical Role</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-light">
                As the **Mechanical Design Engineer & CAD Designer**, I was responsible for bridging
                the physical environment with the digital vision framework:
              </p>
              <ul className="space-y-3.5 text-sm text-foreground/90 font-light">
                {[
                  "Modeled and assembled the conveyor bracket layout using SolidWorks DFM guides.",
                  "Conducted structural resonance checks to ensure structural isolation at camera points.",
                  "Calculated pneumatic manifold flow volumes to design the solenoid cylinder actuator.",
                  "Collaborated with AI and software teams to integrate camera FOV envelopes with tracking coordinate logic.",
                  "Analyzed site layout workflow constraints to compile the FMEA study and RPN matrices.",
                ].map((contrib, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_var(--primary)]" />
                    <span>{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Project Learnings */}
            <div className="rounded-3xl border border-border bg-surface/20 p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 text-accent">Lessons & System Insights</h3>
              <ul className="space-y-3.5 text-sm text-foreground/90 font-light">
                {[
                  "Optical camera focus shifts easily under structural conveyor shaking; vibration-absorbing bushings are essential.",
                  "Real-time pneumatic solenoid response relies directly on air volume pressure buffers, requiring surge tanks.",
                  "Image processing must be computed locally on Edge systems to avoid network-induced timing failures.",
                  "FMEA studies must run early during conceptual design to set proper actuator sizing limits.",
                  "Dust control sweep sweeps (air knives) are highly cost-effective compared to manual wiping programs.",
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
          className="flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold shadow-glow transition hover:scale-105 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Return to Portfolio
        </button>
      </div>
    </div>
  );
}
