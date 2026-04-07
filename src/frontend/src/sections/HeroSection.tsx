import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { ArrowDown, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const TITLES = [
  "Graphic Designer",
  "AI Tools Creator",
  "Content Creator",
  "Video Editor",
];

type Shape = {
  id: string;
  type: "triangle" | "hexagon" | "circle" | "diamond";
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  cyan: boolean;
};

const SHAPES: Shape[] = [
  {
    id: "s1",
    type: "hexagon",
    size: 70,
    top: "8%",
    left: "4%",
    delay: 0,
    duration: 7,
    cyan: true,
  },
  {
    id: "s2",
    type: "diamond",
    size: 50,
    top: "15%",
    left: "88%",
    delay: 1.2,
    duration: 9,
    cyan: false,
  },
  {
    id: "s3",
    type: "circle",
    size: 90,
    top: "60%",
    left: "6%",
    delay: 2,
    duration: 8,
    cyan: false,
  },
  {
    id: "s4",
    type: "triangle",
    size: 44,
    top: "72%",
    left: "91%",
    delay: 0.5,
    duration: 10,
    cyan: true,
  },
  {
    id: "s5",
    type: "diamond",
    size: 38,
    top: "38%",
    left: "2%",
    delay: 1.5,
    duration: 6,
    cyan: true,
  },
  {
    id: "s6",
    type: "circle",
    size: 60,
    top: "48%",
    left: "94%",
    delay: 2.5,
    duration: 11,
    cyan: false,
  },
  {
    id: "s7",
    type: "hexagon",
    size: 32,
    top: "85%",
    left: "22%",
    delay: 3,
    duration: 7.5,
    cyan: false,
  },
  {
    id: "s8",
    type: "triangle",
    size: 28,
    top: "28%",
    left: "76%",
    delay: 0.8,
    duration: 9.5,
    cyan: true,
  },
];

function ShapeEl({ s }: { s: Shape }) {
  const color = s.cyan
    ? "border-primary/40 shadow-[0_0_12px_rgba(0,255,255,0.15)]"
    : "border-accent/40 shadow-[0_0_12px_rgba(180,0,255,0.15)]";

  const base = `absolute border opacity-70 floating ${color}`;
  const style = {
    width: s.size,
    height: s.size,
    top: s.top,
    left: s.left,
    animationDelay: `${s.delay}s`,
    animationDuration: `${s.duration}s`,
  };

  if (s.type === "circle") {
    return (
      <motion.div
        key={s.id}
        className={`${base} rounded-full`}
        style={style}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: s.duration * 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    );
  }
  if (s.type === "triangle") {
    return (
      <motion.div
        key={s.id}
        className={`${base} rounded-sm`}
        style={{ ...style, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        animate={{ rotate: [0, 120, 240, 360] }}
        transition={{
          duration: s.duration * 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    );
  }
  if (s.type === "hexagon") {
    return (
      <motion.div
        key={s.id}
        className={`${base} rounded-sm`}
        style={{
          ...style,
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
        animate={{ rotate: [0, 60, 0] }}
        transition={{
          duration: s.duration * 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    );
  }
  // diamond
  return (
    <motion.div
      key={s.id}
      className={`${base} rounded-sm`}
      style={{ ...style, rotate: 45 }}
      animate={{ rotate: [45, 90, 45] }}
      transition={{
        duration: s.duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

export function HeroSection() {
  const typed = useTypingAnimation({ words: TITLES });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const COLORS = [
      "rgba(0,255,255,",
      "rgba(180,0,255,",
      "rgba(0,220,255,",
      "rgba(120,0,220,",
    ];

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const CONNECTION_DIST = 110;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,255,255,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/40" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(0,255,255,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(180,0,255,0.08) 0%, transparent 70%)
          `,
        }}
      />
      {/* Tech grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {SHAPES.map((s) => (
        <ShapeEl key={s.id} s={s} />
      ))}

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
        {/* Glassmorphic floating panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-10 md:p-16 overflow-hidden"
          style={{
            background: "oklch(var(--card) / 0.45)",
            backdropFilter: "blur(32px)",
            border: "1px solid oklch(var(--primary) / 0.15)",
            boxShadow:
              "0 0 60px rgba(0,255,255,0.06), 0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,255,255,0.08)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-60"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,255,0.5), transparent)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-mono text-xs tracking-[0.25em] uppercase mb-5 flex items-center justify-center gap-2"
          >
            <span className="w-8 h-px bg-primary opacity-60" />
            Portfolio — Creative &amp; Digital Media
            <span className="w-8 h-px bg-primary opacity-60" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.05] mb-5"
          >
            Muhammad
            <br />
            <span
              className="text-primary"
              style={{
                textShadow:
                  "0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.25)",
              }}
            >
              Abdullah
            </span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-10 flex items-center justify-center gap-2 mb-5"
          >
            <span
              className="text-xl md:text-2xl font-semibold text-accent font-mono"
              style={{ textShadow: "0 0 16px rgba(180,0,255,0.4)" }}
            >
              {typed}
              <span
                className="inline-block w-0.5 h-5 ml-1 bg-primary align-middle"
                style={{ animation: "cursor-blink 0.9s step-end infinite" }}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Creative Solutions for Modern Digital Media
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero-cta"
              className="group relative px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base overflow-hidden transition-smooth hover:scale-105 pulse-glow"
              style={{
                boxShadow:
                  "0 0 24px rgba(0,255,255,0.35), 0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-smooth"
                />
              </span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(180,0,255,0.15))",
                }}
              />
            </button>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero-projects"
              className="px-8 py-3.5 rounded-xl border font-bold text-base transition-smooth hover:scale-105 hover:bg-accent/10"
              style={{
                borderColor: "rgba(180,0,255,0.5)",
                color: "oklch(var(--accent))",
                boxShadow: "0 0 20px rgba(180,0,255,0.2)",
              }}
            >
              View Projects
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          type="button"
          onClick={scrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-10 text-muted-foreground hover:text-primary transition-smooth flex flex-col items-center gap-2 mx-auto group"
          aria-label="Scroll down to About section"
          data-ocid="hero-scroll-down"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-mono group-hover:text-primary transition-smooth">
            Scroll
          </span>
          <div
            className="w-px h-8 mx-auto"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,255,255,0.5), transparent)",
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
          <div
            className="w-5 h-5 rounded-full border flex items-center justify-center"
            style={{
              borderColor: "rgba(0,255,255,0.4)",
              boxShadow: "0 0 10px rgba(0,255,255,0.2)",
            }}
          >
            <span
              className="w-1 h-1 rounded-full bg-primary animate-bounce"
              style={{ boxShadow: "0 0 6px rgba(0,255,255,0.8)" }}
            />
          </div>
        </motion.button>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
