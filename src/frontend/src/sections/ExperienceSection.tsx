import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Award, Star, Trophy } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const RESPONSIBILITIES = [
  "Designing engaging social media posts, reels, and branding materials for multiple clients",
  "Creating AI-generated content using Adobe Firefly, Midjourney, and other cutting-edge tools",
  "Editing and producing professional videos with CapCut and Adobe Premiere Pro",
  "Building complete brand identities including logos, catalogs, brochures, and visiting cards",
];

const ACHIEVEMENTS = [
  {
    icon: Star,
    text: "Working as Graphic Designer at 16",
    color: "text-primary",
  },
  {
    icon: Award,
    text: "Internship Completion Certificate",
    color: "text-accent",
  },
];

export function ExperienceSection() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>();
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="py-24 px-6 bg-background relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.70 0.20 200 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
            My <span className="text-primary">Experience</span>
          </h2>
          {/* Neon underline */}
          <div
            className="mx-auto w-20 h-0.5 rounded-full mt-3 mb-4"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.70 0.20 200), transparent)",
              boxShadow: "0 0 12px oklch(0.70 0.20 200 / 0.7)",
            }}
          />
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Building real-world expertise at the intersection of design and
            technology.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative pl-14">
          {/* Static background track */}
          <div
            className="absolute left-5 top-0 bottom-0 w-0.5"
            style={{ background: "oklch(var(--border) / 0.3)" }}
          />

          {/* Animated glowing line */}
          <div
            ref={lineRef}
            className="absolute left-5 top-0 bottom-0 w-0.5 overflow-hidden"
            style={{ height: "100%" }}
          >
            <motion.div
              style={{ height: lineHeight }}
              className="w-full origin-top"
              transition={{ ease: "linear" }}
            >
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(to bottom, oklch(0.70 0.20 200), oklch(0.65 0.22 320 / 0.6))",
                  boxShadow: "0 0 8px oklch(0.70 0.20 200 / 0.8)",
                }}
              />
            </motion.div>
          </div>

          {/* Timeline dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={visible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute left-3 top-1 w-5 h-5 rounded-full border-2 z-10"
            style={{
              background: "oklch(0.70 0.20 200)",
              borderColor: "oklch(var(--background))",
              boxShadow:
                "0 0 12px oklch(0.70 0.20 200 / 0.8), 0 0 24px oklch(0.70 0.20 200 / 0.4)",
            }}
          />

          {/* Timeline card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-glow rounded-2xl p-7 mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div>
                <h3 className="font-display font-bold text-xl text-foreground leading-tight">
                  Graphic Designer / AI Tools Creator
                </h3>
                <p className="text-sm text-foreground/70 mt-0.5">
                  Content Creation · Video Editing
                </p>
                <p
                  className="font-semibold mt-1"
                  style={{ color: "oklch(0.70 0.20 200)" }}
                >
                  TenBit Solutions
                </p>
              </div>
              {/* Date badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg shrink-0 self-start"
                style={{
                  background: "oklch(var(--card) / 0.6)",
                  border: "1px solid oklch(0.65 0.22 320 / 0.4)",
                  color: "oklch(0.65 0.22 320)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "oklch(0.65 0.22 320)" }}
                />
                June 2025 – Present
              </motion.span>
            </div>

            <ul className="space-y-2 text-sm text-foreground/75 mb-6">
              {RESPONSIBILITIES.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-2"
                >
                  <span
                    className="mt-1 shrink-0"
                    style={{ color: "oklch(0.70 0.20 200)" }}
                  >
                    ›
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* Achievements */}
            <div
              className="border-t pt-5"
              style={{ borderColor: "oklch(var(--border) / 0.25)" }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-4">
                Achievements
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {ACHIEVEMENTS.map(({ icon: Icon, text, color }, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, y: 16 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 flex-1 cursor-default group transition-smooth"
                    style={{
                      background: "oklch(var(--card) / 0.4)",
                      border: "1px solid oklch(var(--border) / 0.2)",
                    }}
                    data-ocid={`achievement-${i}`}
                  >
                    <div
                      className={`${color} group-hover:scale-110 transition-smooth shrink-0`}
                      style={{
                        filter:
                          i === 0
                            ? "drop-shadow(0 0 6px oklch(0.70 0.20 200 / 0.7))"
                            : "drop-shadow(0 0 6px oklch(0.65 0.22 320 / 0.7))",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <p className="text-foreground/85 text-sm font-medium">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* End dot */}
          <div
            className="absolute left-3.5 bottom-8 w-3 h-3 rounded-full"
            style={{
              border: "2px solid oklch(0.70 0.20 200 / 0.35)",
              background: "oklch(var(--background))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
