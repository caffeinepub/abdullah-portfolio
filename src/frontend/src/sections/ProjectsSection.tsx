import type { Project } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Noorsons",
    description:
      "Complete brand identity package — social media posts, reels, product catalog, and visiting card design for Noorsons.",
    categories: ["Social Media", "Brand Identity"],
    tags: ["Posts", "Reels", "Catalog", "Visiting Card"],
    initials: "NS",
    accentFrom: "oklch(0.70 0.20 200)",
    accentTo: "oklch(0.52 0.18 250)",
  },
  {
    id: 2,
    title: "HRA",
    description:
      "Full digital presence — posts, social profile, catalog, brochures, and visiting card with cohesive branding.",
    categories: ["Brand Identity"],
    tags: ["Posts", "Profile", "Catalog", "Brochures", "Visiting Card"],
    initials: "HRA",
    accentFrom: "oklch(0.65 0.22 320)",
    accentTo: "oklch(0.52 0.20 290)",
  },
  {
    id: 3,
    title: "Deans",
    description:
      "High-engagement social media reels, posts, product catalog, and visiting card for Deans.",
    categories: ["Social Media"],
    tags: ["Posts", "Reels", "Catalog", "Visiting Card"],
    initials: "DN",
    accentFrom: "oklch(0.72 0.22 175)",
    accentTo: "oklch(0.60 0.18 200)",
  },
  {
    id: 4,
    title: "TenBit Solutions",
    description:
      "Complete digital marketing suite — posts, profile, catalog, brochures, and visiting cards for TenBit.",
    categories: ["Brand Identity"],
    tags: ["Posts", "Profile", "Catalog", "Brochures", "Visiting Card"],
    initials: "TB",
    accentFrom: "oklch(0.70 0.20 200)",
    accentTo: "oklch(0.65 0.22 320)",
  },
  {
    id: 5,
    title: "Planet Venture",
    description:
      "Social media posts, profile optimisation, and visiting card design for Planet Venture's digital presence.",
    categories: ["Social Media"],
    tags: ["Posts", "Profile", "Visiting Card"],
    initials: "PV",
    accentFrom: "oklch(0.75 0.22 85)",
    accentTo: "oklch(0.60 0.22 50)",
  },
  {
    id: 6,
    title: "NH",
    description:
      "Posts, social profile setup, and product catalog design — building NH's visual identity from scratch.",
    categories: ["Catalog"],
    tags: ["Posts", "Profile", "Catalog"],
    initials: "NH",
    accentFrom: "oklch(0.65 0.22 320)",
    accentTo: "oklch(0.70 0.22 85)",
  },
];

const FILTER_CATEGORIES = [
  "All",
  "Social Media",
  "Brand Identity",
  "Catalog",
  "Video",
] as const;
type FilterCat = (typeof FILTER_CATEGORIES)[number];

// Neon underline accent used for section title
function NeonTitle({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-primary relative inline-block"
      style={{ filter: "drop-shadow(0 0 18px oklch(0.70 0.20 200 / 0.7))" }}
    >
      {children}
      <span
        className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.70 0.20 200), oklch(0.65 0.22 320))",
          boxShadow: "0 0 10px oklch(0.70 0.20 200 / 0.7)",
        }}
      />
    </span>
  );
}

// Placeholder image using client initials + gradient
function ProjectThumb({ project }: { project: Project }) {
  return (
    <div
      className="h-44 relative flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.13 0.01 256), oklch(0.18 0.02 256))",
      }}
    >
      {/* Gradient orb */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${project.accentFrom}55, transparent 70%)`,
        }}
      />
      {/* Corner category badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-lg"
          style={{
            background: "oklch(0.16 0.01 256 / 0.85)",
            border: `1px solid ${project.accentFrom}66`,
            color: project.accentFrom,
            backdropFilter: "blur(8px)",
          }}
        >
          {project.categories[0]}
        </span>
      </div>
      {/* Initials */}
      <span
        className="text-5xl font-display font-black tracking-tighter select-none transition-smooth group-hover:scale-105"
        style={{
          background: [
            "linear-gradient(135deg,",
            project.accentFrom,
            ",",
            project.accentTo,
            ")",
          ].join(" "),
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: `drop-shadow(0 0 18px ${project.accentFrom}88)`,
        }}
      >
        {project.initials}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      key={project.id}
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.93 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, scale: 1.035 }}
      className="glass-glow rounded-2xl overflow-hidden group cursor-default relative"
      style={{ border: `1px solid ${project.accentFrom}33` }}
      data-ocid={`project-${project.id}`}
    >
      {/* Neon border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none z-10"
        style={{
          boxShadow: `inset 0 0 28px ${project.accentFrom}22, 0 0 32px ${project.accentFrom}33`,
          border: `1.5px solid ${project.accentFrom}88`,
        }}
      />

      <ProjectThumb project={project} />

      <div className="p-5 relative z-0">
        <h3
          className="font-display font-bold text-lg mb-1 transition-smooth group-hover:text-primary truncate"
          style={{ textShadow: `0 0 12px ${project.accentFrom}00` }}
        >
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
              style={{
                background: "oklch(0.18 0.02 256 / 0.8)",
                border: `1px solid ${project.accentFrom}44`,
                color: project.accentFrom,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterCat>("All");

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(filter));

  return (
    <section
      id="projects"
      className="py-24 px-6"
      style={{ background: "oklch(0.10 0 0)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            My <NeonTitle>Projects</NeonTitle>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mt-3">
            Client work spanning brand identity, social media, catalogs, and
            more.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTER_CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                data-ocid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-5 py-2 rounded-xl text-sm font-semibold transition-smooth relative overflow-hidden"
                style={{
                  background: active
                    ? "oklch(0.70 0.20 200 / 0.18)"
                    : "oklch(0.16 0.01 256 / 0.6)",
                  border: active
                    ? "1.5px solid oklch(0.70 0.20 200 / 0.8)"
                    : "1px solid oklch(0.22 0.01 256 / 0.6)",
                  color: active ? "oklch(0.70 0.20 200)" : "oklch(0.60 0 0)",
                  backdropFilter: "blur(16px)",
                  boxShadow: active
                    ? "0 0 16px oklch(0.70 0.20 200 / 0.3)"
                    : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state (e.g. Video filter — no projects yet) */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-muted-foreground"
              data-ocid="projects-empty"
            >
              <p className="text-4xl mb-3">🎬</p>
              <p className="font-semibold text-foreground mb-1">
                No projects yet in this category
              </p>
              <p className="text-sm">
                Check back soon — more work is on the way.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
