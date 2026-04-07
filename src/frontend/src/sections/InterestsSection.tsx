import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { BookOpen, Gamepad2, Lightbulb, Sparkles, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface InterestItem {
  id: number;
  label: string;
  description: string;
  Icon: LucideIcon;
  glowColor: string;
  iconColor: string;
}

const INTERESTS: InterestItem[] = [
  {
    id: 1,
    label: "Cricket",
    description: "Passionate about the sport — both playing and watching",
    Icon: Trophy,
    glowColor: "oklch(0.70 0.20 200 / 0.6)",
    iconColor: "oklch(0.70 0.20 200)",
  },
  {
    id: 2,
    label: "Novel Reading",
    description: "Avid reader of novels and creative fiction",
    Icon: BookOpen,
    glowColor: "oklch(0.65 0.22 320 / 0.6)",
    iconColor: "oklch(0.65 0.22 320)",
  },
  {
    id: 3,
    label: "Learning Skills",
    description: "Continuously exploring new tools and technologies",
    Icon: Lightbulb,
    glowColor: "oklch(0.77 0.19 70 / 0.6)",
    iconColor: "oklch(0.77 0.19 70)",
  },
  {
    id: 4,
    label: "Gaming Design",
    description: "Fascinated by UI/UX in interactive gaming worlds",
    Icon: Gamepad2,
    glowColor: "oklch(0.63 0.27 304 / 0.6)",
    iconColor: "oklch(0.63 0.27 304)",
  },
  {
    id: 5,
    label: "Creativity",
    description: "Bringing new concepts to life through visual art",
    Icon: Sparkles,
    glowColor: "oklch(0.70 0.20 200 / 0.6)",
    iconColor: "oklch(0.70 0.20 200)",
  },
];

export function InterestsSection() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section
      id="interests"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "oklch(var(--background))" }}
    >
      {/* Background glow blobs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.22 320 / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
            My <span className="text-primary">Interests</span>
          </h2>
          <div
            className="mx-auto w-20 h-0.5 rounded-full mt-3 mb-4"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.70 0.20 200), transparent)",
              boxShadow: "0 0 12px oklch(0.70 0.20 200 / 0.7)",
            }}
          />
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            What fuels my creativity beyond the screen.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div ref={ref} className="flex flex-wrap justify-center gap-5">
          {INTERESTS.map((interest, i) => (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative rounded-2xl px-7 py-8 flex flex-col items-center gap-4 w-44 cursor-default transition-smooth overflow-hidden"
              style={{
                background: "oklch(var(--card) / 0.5)",
                backdropFilter: "blur(24px)",
                border: "1px solid oklch(var(--border) / 0.3)",
              }}
              data-ocid={`interest-${interest.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
                style={{
                  border: `1px solid ${interest.glowColor}`,
                  boxShadow: `0 0 20px ${interest.glowColor}, inset 0 0 20px ${interest.glowColor.replace("0.6", "0.05")}`,
                }}
              />

              {/* Icon container */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-smooth group-hover:scale-110"
                style={{
                  background: "oklch(var(--card) / 0.6)",
                  border: `1px solid ${interest.iconColor.replace(")", " / 0.3)")}`,
                }}
              >
                <interest.Icon
                  size={26}
                  style={{
                    color: interest.iconColor,
                    filter: `drop-shadow(0 0 8px ${interest.glowColor})`,
                  }}
                />
              </div>

              <p className="font-semibold text-sm text-center text-foreground leading-tight">
                {interest.label}
              </p>

              {/* Description on hover */}
              <p className="text-muted-foreground text-xs text-center opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-smooth overflow-hidden leading-relaxed">
                {interest.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
