import type { Skill } from "@/types";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { useEffect } from "react";

const SKILLS: Skill[] = [
  {
    name: "Graphic Designing",
    level: 90,
    icon: "🎨",
    description: "Brand visuals, print & digital design",
  },
  {
    name: "Video Editing",
    level: 85,
    icon: "🎬",
    description: "CapCut, Premiere Pro, Reels & promos",
  },
  {
    name: "Content Creation",
    level: 92,
    icon: "✍️",
    description: "Social media posts, campaigns",
  },
  {
    name: "AI Content Creation",
    level: 88,
    icon: "🤖",
    description: "Prompt engineering & AI workflows",
  },
  {
    name: "Brand Identity",
    level: 80,
    icon: "💎",
    description: "Logos, color palettes, guidelines",
  },
  {
    name: "Visuals",
    level: 85,
    icon: "🖼️",
    description: "Compositions, layouts & visual storytelling",
  },
  {
    name: "AI Image/Video/Audio",
    level: 82,
    icon: "🔊",
    description: "Firefly, Midjourney, AI video & audio synthesis",
  },
  {
    name: "Adobe Photoshop",
    level: 88,
    icon: "🅿",
    description: "Retouching, compositing & mockups",
  },
  {
    name: "Adobe Illustrator",
    level: 85,
    icon: "🖌️",
    description: "Vector art & logo design",
  },
  {
    name: "Adobe Firefly",
    level: 80,
    icon: "🔥",
    description: "Generative AI fill & image creation",
  },
  {
    name: "CapCut",
    level: 90,
    icon: "✂️",
    description: "Short-form video & Reels",
  },
  {
    name: "Adobe Premiere Pro",
    level: 82,
    icon: "🎞️",
    description: "Professional video editing & colour grading",
  },
];

// Animated counter shown inside the ring
function AnimatedCount({
  target,
  visible,
}: { target: number; visible: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible) return;
    const controls = animate(count, target, { duration: 1.4, ease: "easeOut" });
    return controls.stop;
  }, [visible, target, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (displayRef.current) displayRef.current.textContent = `${v}%`;
    });
  }, [rounded]);

  return <span ref={displayRef}>0%</span>;
}

// SVG ring with gradient stroke
function SkillRing({
  skill,
  visible,
  index,
}: { skill: Skill; visible: boolean; index: number }) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const gradientId = `ring-grad-${index}`;

  const progress = useMotionValue(circumference);
  const target = circumference - (skill.level / 100) * circumference;

  useEffect(() => {
    if (!visible) return;
    const controls = animate(progress, target, {
      duration: 1.4,
      ease: "easeOut",
      delay: index * 0.07,
    });
    return controls.stop;
  }, [visible, target, progress, index]);

  return (
    <div className="relative w-24 h-24">
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        className="-rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.70 0.20 200)" />
            <stop offset="100%" stopColor="oklch(0.65 0.22 320)" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="oklch(0.22 0.01 256 / 0.6)"
          strokeWidth="7"
        />
        {/* Progress */}
        <motion.circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: progress }}
          filter="url(#ring-glow)"
        />
        <defs>
          <filter id="ring-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {/* Centre: icon + percent */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span className="text-lg leading-none">{skill.icon}</span>
        <span className="text-[11px] font-bold text-primary leading-none">
          <AnimatedCount target={skill.level} visible={visible} />
        </span>
      </div>
    </div>
  );
}

function SkillCard({
  skill,
  visible,
  index,
}: { skill: Skill; visible: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.04 }}
      className="glass-glow rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default group relative overflow-hidden"
      data-ocid={`skill-${skill.name.toLowerCase().replace(/[\s/]+/g, "-")}`}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 32px oklch(0.70 0.20 200 / 0.18), 0 0 32px oklch(0.70 0.20 200 / 0.22)",
          border: "1.5px solid oklch(0.70 0.20 200 / 0.55)",
        }}
      />

      <SkillRing skill={skill} visible={visible} index={index} />

      <p className="text-foreground font-semibold text-sm text-center leading-tight min-w-0 break-words px-1">
        {skill.name}
      </p>

      {/* Tooltip */}
      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-smooth pointer-events-none z-20"
        style={{
          background: "oklch(0.16 0.01 256 / 0.92)",
          border: "1px solid oklch(0.70 0.20 200 / 0.4)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 16px oklch(0.70 0.20 200 / 0.2)",
        }}
      >
        {skill.description}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid oklch(0.70 0.20 200 / 0.4)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            My{" "}
            <span
              className="text-primary relative inline-block"
              style={{
                filter: "drop-shadow(0 0 18px oklch(0.70 0.20 200 / 0.7))",
              }}
            >
              Skills
              {/* Neon underline */}
              <span
                className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.70 0.20 200), oklch(0.65 0.22 320))",
                  boxShadow: "0 0 10px oklch(0.70 0.20 200 / 0.7)",
                }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mt-3">
            A blend of creative design, AI-powered tools, and video production
            expertise.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {SKILLS.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              visible={visible}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
