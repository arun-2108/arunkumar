export const resume = {
  name: "Arunkumar Sundaravel",
  tag: "Founder • Researcher • Mechanical Engineer",
  location: "Chennai, Tamil Nadu, India",
  email: "arunpvtz2108@gmail.com",
  phone: "+91 86396 57245",
  linkedin: "https://linkedin.com/in/arun-kumar-7755492a5",
  resumeUrl: "/Arunkumar_Resume.pdf",

  hero: {
    title: [
      "Building intelligent products",
      "at the intersection of",
      "Mechanical Engineering, AI, and Automation.",
    ],
    sub: "Founder of EAURA • Smart Manufacturing Engineer at IIITDM Kancheepuram • Entrepreneur, and Passionate about building impactful products, leading teams, solving complex problems and exploring how technology, management, and innovation can create meaningful real-world impact.",
  },

  about: {
    intro:
      "I build at the intersection of mechanical design, intelligent systems, and product thinking. From founding a government-approved startup to publishing research on auxetic structures and AI-driven mining systems, my work is about turning hard engineering problems into shipped products.",
    philosophy:
      "Design for manufacturability. Validate with simulation. Ship with intent. Every project I take on lives at the seam where CAD, code, and real users meet.",
  },

  stats: [
    { label: "Years in Engineering", value: 3, suffix: "+" },
    { label: "Research Publications", value: 3 },
    { label: "Major Projects", value: 3 },
    { label: "Leadership Roles", value: 3 },
    { label: "Startup Founded", value: 1 },
    { label: "GATE 2026 AIR", value: 710 },
  ],

  experience: [
    {
      org: "Eaura Pvt Ltd",
      tagline: "Government Approved Startup • Robotics & Automation",
      role: "Founder / CEO",
      duration: "Jun 2025 – Present",
      location: "Chennai, Tamil Nadu",
      points: [
        "Founded a government-approved startup developing a personal voice assistant to help senior citizens manage daily activities and support independent living.",
        "Leading end-to-end MVP development including AI features for reminders, emergency support, smart scheduling, system architecture, and hardware/software integration.",
      ],
    },
    {
      org: "SRJ Energy Technologies",
      tagline: "IITM Research Park",
      role: "Research Intern",
      duration: "Apr 2025 – Present",
      points: [
        "Working on high-capacity cylindrical battery cell and composite battery enclosure design for EV applications, targeting improved strength-to-weight ratio and impact resistance.",
        "Performed thermal and structural optimization using SolidWorks and ANSYS, while developing validation protocols to enhance safety, durability, and heat dissipation.",
      ],
    },
    {
      org: "Neyveli Lignite Corporation India Limited",
      tagline: "Public Sector • Heavy Industry",
      role: "Project Research Fellow",
      duration: "May 2025 – Present",
      points: [
        "Designed a lignite separation and conveyor handling system, reducing operational downtime by 20% through improved workflow and optimized equipment layout.",
        "Integrated magnetic separation and vibrating screening mechanisms to improve stone segregation accuracy, reduce manual sorting, and enhance plant safety and efficiency.",
      ],
    },
  ],

  projects: [
    {
      title: "Mobile Banana Processing Unit",
      client: "Trident Fruits, Mumbai",
      duration: "Dec 2024 – Mar 2025",
      summary:
        "A mobile post-harvest processing unit designed for on-site deployment — de-handing, cleaning, grading, and packaging — engineered for portability and throughput.",
      tech: ["SolidWorks", "GD&T", "Mechanical Layout", "DFM"],
      disciplines: ["Mechanical Design", "Process Engineering", "Agri-Tech"],
      outcomes: [
        "Multi-stage quality control workflow with fungicide wash, grading, labeling, boxing",
        "Optimized layout for portability and on-site agricultural deployment",
        "Extended shelf life and reduced spoilage in transit",
      ],
      images: ["/banana_unit.png", "/banana-mpu.png"],
    },
    {
      title: "AI-Assisted Lignite Rock Separation System",
      client: "NLC India Limited, Neyveli",
      duration: "May 2025 – Present",
      summary:
        "Designed and developed an AI-assisted rock separation system for lignite mining operations using computer vision, conveyor systems, pneumatic diversion mechanisms, and mechanical screening.",
      tech: ["SolidWorks", "YOLOv11", "Python", "Pneumatic Systems", "Conveyor Design"],
      disciplines: ["Mechanical Design", "AI", "Heavy Industry"],
      outcomes: [
        "Designed conveyor-based material handling system",
        "Integrated YOLOv11 object detection",
        "Developed pneumatic rock diversion mechanism",
        "Improved lignite stream quality through automated segregation",
      ],
      images: [
        "/Nlc_1.png",
        "/Nlc_2.png",
        "/Nlc_3.png",
        "/Nlc_4.png",
        "/Nlc_5.png",
        "/Nlc_6.png",
        "/Nlc_7.png",
      ],
    },
    {
      title: "Driver Authentication & Monitoring System",
      client: "Coursework",
      duration: "Jan 2025 – May 2025",
      summary:
        "An intelligent driver authorization stack combining biometric, RFID, and continuous facial recognition to ensure only licensed, verified individuals operate a vehicle.",
      tech: ["Python", "Computer Vision", "RFID", "Embedded Systems"],
      disciplines: ["Mechatronics", "Safety Systems", "AI"],
      outcomes: [
        "Fingerprint + RFID license verification gates vehicle start",
        "Continuous facial recognition during operation",
        "Real-time unauthorized access detection",
      ],
      images: ["/Lic_1.png", "/Lic_2.png", "/Lic_3.png", "/Lic_4.png"],
    },
    {
      title: "Compact Agricultural E-Transportation Vehicle",
      client: "Project Team Lead",
      duration: "Jan 2026 – Present",
      summary:
        "A farm-based electric transport vehicle built to move banana bunches from inside the plantation to the loading area, engineered for uneven terrain.",
      tech: ["Vehicle Dynamics", "Suspension Design", "Powertrain", "Chassis"],
      disciplines: ["EV", "Vehicle Engineering", "Agri-Logistics"],
      outcomes: [
        "Leading vehicle dynamics subsystem — suspension, steering, braking, stability",
        "Coordinating powertrain, chassis, and electronics teams",
        "Optimized maneuverability and load-carrying efficiency",
      ],
      images: ["/Baja_1.png", "/Baja_2.png", "/Baja_3.png"],
    },
  ],

  research: [
    {
      title:
        "Data-Driven Mechanical Characterization of Re-Entrant Auxetic Honeycomb Structures Using Polynomial Ridge Regression",
      venue: "ASME IMECE-INDIA 2026",
      status: "Accepted",
      area: "Materials • ML",
      summary:
        "Interpretable PolyRidge model predicts specific plateau stress, Poisson's ratio, and specific energy absorption of re-entrant auxetic honeycombs from geometric parameters. R² 0.9455–0.9962, deployed as a design-time GUI.",
    },
    {
      title:
        "AI-Assisted Rock Detection & Mechanical Diversion System for Lignite Mining Conveyor Operations",
      venue: "ICoRD '27 — International Conference on Research into Design",
      status: "Under Review",
      area: "AI • Heavy Industry",
      summary:
        "Real-time rock separation using a YOLOv11 vision model synchronized with a pneumatic diversion mechanism. Multi-stage screening pipeline that diverts oversized fragments without halting belt operation.",
    },
    {
      title: "Low Velocity Impact Response of Advanced Composites",
      venue: "Journal Review Paper",
      status: "Under Review",
      area: "Composites • FEA",
      summary:
        "Comprehensive review of low-velocity impact damage in advanced composites — BVID, matrix cracking, delamination, energy absorption — plus state-of-the-art mitigation: nanomodified composites, bio-inspired architectures, self-healing systems, CZM/Hashin/Puck.",
    },
  ],

  startup: {
    name: "Eaura",
    founder: "Arunkumar S",
    role: "Founder & CEO",
    stage: "MVP Development & Beta Preparation",
    takeaway: "Eaura is building an ecosystem of AI-powered products that combine intelligent software, privacy-first architecture, and automation to solve meaningful real-world problems. NOVA and envx represent the first steps toward a broader platform spanning personal AI, developer tools, and intelligent systems.",
    lookingFor: [
      "Beta Testers",
      "Early Adopters",
      "Advisors",
      "Strategic Partners",
      "AI Engineers",
      "Embedded Systems Engineers",
      "Product Designers",
      "Researchers",
      "Angel Investors",
    ],
    products: {
      nova: {
        name: "NOVA",
        tagline: "Proactive AI Companion",
        desc: "A proactive, privacy-first AI assistant that combines persistent memory, multi-agent orchestration, and edge computing to help users manage communication, wellness, and daily life."
      },
      envx: {
        name: "envx",
        tagline: "Secure Secrets Sync",
        desc: "A developer-focused platform for secure environment variable synchronization and management across teams and projects."
      }
    },
    futureProducts: [
      "AI assistants",
      "Automation systems",
      "Productivity tools",
      "Robotics",
      "Intelligent hardware"
    ]
  },

  skills: [
    {
      category: "CAD & Design",
      level: 92,
      items: ["SolidWorks", "AutoCAD", "Fusion 360", "GD&T", "2D Documentation"],
    },
    { category: "Simulation", level: 85, items: ["ANSYS", "LS-Dyna", "Hypermesh", "FEA"] },
    { category: "Manufacturing", level: 80, items: ["DFM", "Prototyping", "Smart Manufacturing"] },
    {
      category: "Research",
      level: 88,
      items: ["Publication Writing", "Experimental Design", "Data Analysis"],
    },
    { category: "Programming", level: 75, items: ["Python", "C", "SQL", "HTML"] },
    {
      category: "Product Development",
      level: 90,
      items: ["3D Modelling", "Product Design", "System Architecture"],
    },
  ],

  leadership: [
    {
      role: "Department Lead, Placement Cell",
      duration: "Dec 2024 – Present",
      impact:
        "Coordinated campus recruitment drives — recruiters, faculty, students. Organized pre-placement talks, interviews, and assessments while leading volunteer teams.",
    },
    {
      role: "Team Lead, Smart India Hackathon",
      duration: "Nov 2025",
      impact:
        "Led a 6-member team proposing a solar-powered dewatering system for mining — PV panels, battery storage, IoT, and SCADA-based monitoring for sustainable, uninterrupted operation.",
    },
    {
      role: "Captain, Department Volleyball Team",
      duration: "2025",
      impact:
        "Led the Mechanical Engineering department volleyball team — built training discipline and team cohesion across an entire season.",
    },
  ],

  achievements: [
    {
      title: "GATE 2026 — Production & Industrial Engineering",
      headline: "AIR 710",
      detail: "Score: 384",
      year: "2026",
    },
    {
      title: "Frystgen Tech Hackathon, VIT Amravati",
      headline: "Participant",
      detail: "Engineering innovation track",
      year: "Oct 2025",
    },
    {
      title: "School Athletics & Sports Team Captain",
      headline: "Captain",
      detail: "Led multi-sport school team",
      year: "2023",
    },
  ],

  education: [
    {
      degree: "B.Tech, Smart Manufacturing",
      school: "Indian Institute of Information Technology, Design & Manufacturing (IIITDM Chennai)",
      duration: "Aug 2023 – May 2027",
      score: "CGPA 7.4 / 10",
    },
    {
      degree: "HSC, Class XII",
      school: "Narayana Junior College, Nellore",
      duration: "Sep 2021 – May 2023",
      score: "96%",
    },
    {
      degree: "SSC, Class X",
      school: "Narayana Higher Secondary School, Nellore",
      duration: "Jun 2020 – Apr 2021",
      score: "99%",
    },
  ],
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "startup", label: "Venture" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
];
