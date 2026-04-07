import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Briefcase, GraduationCap, MapPin, Sparkles, User } from "lucide-react";
import { motion } from "motion/react";

const DETAILS = [
  {
    icon: MapPin,
    label: "Location",
    value: "Lahore, Pakistan",
    id: "loc",
    color: "rgba(0,255,255,",
    bg: "rgba(0,255,255,0.06)",
    border: "rgba(0,255,255,0.2)",
  },
  {
    icon: Briefcase,
    label: "Industry",
    value: "Software House",
    id: "ind",
    color: "rgba(180,0,255,",
    bg: "rgba(180,0,255,0.06)",
    border: "rgba(180,0,255,0.2)",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "Matric & Intermediate",
    id: "edu",
    color: "rgba(0,255,255,",
    bg: "rgba(0,255,255,0.06)",
    border: "rgba(0,255,255,0.2)",
  },
];

export function AboutSection() {
  const [sectionRef, sectionVisible] =
    useIntersectionObserver<HTMLDivElement>();
  const [cardsRef, cardsVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">
      {/* Radial background accents */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(180,0,255,1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-xs tracking-[0.25em] uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary opacity-60" />
            Who I Am
            <span className="w-8 h-px bg-primary opacity-60" />
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ textShadow: "0 0 40px rgba(0,255,255,0.1)" }}
          >
            About{" "}
            <span
              className="text-primary"
              style={{ textShadow: "0 0 20px rgba(0,255,255,0.35)" }}
            >
              Me
            </span>
          </h2>
        </motion.div>

        <div
          ref={sectionRef}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={sectionVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Spinning neon border */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(0,255,255,0.7), rgba(180,0,255,0.7), rgba(0,255,255,0.7))",
                  padding: "2px",
                  borderRadius: "9999px",
                  filter: "blur(1px)",
                }}
              />
              {/* Secondary rotating ring */}
              <motion.div
                className="absolute -inset-6 rounded-full opacity-30"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  border: "1px dashed rgba(0,255,255,0.4)",
                  borderRadius: "9999px",
                }}
              />
              {/* Outer glow pulse */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 0 40px rgba(0,255,255,0.2), 0 0 80px rgba(180,0,255,0.1)",
                  animation: "glow-pulse 3s ease-in-out infinite",
                  borderRadius: "9999px",
                }}
              />

              {/* Image container */}
              <div
                className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden"
                style={{
                  background: "oklch(var(--card) / 0.7)",
                  backdropFilter: "blur(20px)",
                  border: "2px solid rgba(0,255,255,0.3)",
                  boxShadow:
                    "0 0 30px rgba(0,255,255,0.15), inset 0 0 30px rgba(0,255,255,0.05)",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-card to-accent/10 flex items-center justify-center">
                  <User size={80} className="text-primary/50" />
                </div>
              </div>

              {/* Badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 rounded-xl px-3 py-2 text-xs font-semibold text-primary flex items-center gap-1.5"
                style={{
                  background: "oklch(var(--card) / 0.8)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,255,255,0.3)",
                  boxShadow: "0 0 16px rgba(0,255,255,0.2)",
                }}
              >
                <Sparkles size={12} className="text-primary" />
                Since June 2025
              </motion.div>
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={sectionVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: "oklch(var(--card) / 0.45)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(0,255,255,0.1)",
              boxShadow:
                "0 0 40px rgba(0,255,255,0.04), 0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(0,255,255,0.07)",
            }}
          >
            {/* Top highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent)",
              }}
            />

            <h3 className="font-display text-xl font-bold text-foreground mb-1">
              Muhammad Abdullah
            </h3>
            <p
              className="text-primary text-sm font-mono tracking-wide mb-5"
              style={{ textShadow: "0 0 12px rgba(0,255,255,0.3)" }}
            >
              @TenBit Solutions
            </p>

            <p className="text-foreground/75 leading-relaxed text-sm md:text-base mb-8">
              A passionate{" "}
              <span className="text-primary font-semibold">
                Graphic Designer
              </span>
              ,{" "}
              <span className="text-accent font-semibold">
                AI Tools Creator
              </span>
              ,{" "}
              <span className="text-primary font-semibold">
                Content Creator
              </span>
              , and{" "}
              <span className="text-accent font-semibold">Video Editor</span>{" "}
              based in Lahore, Pakistan. Currently delivering cutting-edge
              digital content and AI-driven creative solutions at{" "}
              <span className="text-foreground font-semibold">
                TenBit Solutions
              </span>{" "}
              since June 2025.
            </p>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {DETAILS.map(
                ({ icon: Icon, label, value, id, bg, border, color }, idx) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="rounded-xl px-3 py-3 flex flex-col items-start gap-2 transition-smooth group cursor-default"
                    style={{
                      background: bg,
                      border: `1px solid ${border}`,
                    }}
                    data-ocid={`about-detail-${id}`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${color}0.12)`,
                        border: `1px solid ${border}`,
                        boxShadow: `0 0 10px ${color}0.15)`,
                      }}
                    >
                      <Icon size={15} style={{ color: `${color}0.9)` }} />
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-muted-foreground text-xs mb-0.5">
                        {label}
                      </p>
                      <p className="text-foreground text-sm font-semibold break-words">
                        {value}
                      </p>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
