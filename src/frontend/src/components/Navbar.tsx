import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 30);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (sy / docHeight) * 100 : 0);
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "oklch(var(--card) / 0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(28px) saturate(1.8)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0,255,255,0.1)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,255,255,0.04)"
            : "none",
        }}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-0.5 transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            background:
              "linear-gradient(90deg, rgba(0,255,255,0.8), rgba(180,0,255,0.8))",
            boxShadow: "0 0 8px rgba(0,255,255,0.4)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="font-display font-bold text-lg md:text-xl relative group"
            data-ocid="nav-logo"
          >
            <span
              className="text-primary"
              style={{ textShadow: "0 0 20px rgba(0,255,255,0.4)" }}
            >
              Muhammad
            </span>
            <span className="text-foreground/90"> Abdullah</span>
            <span
              className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-400"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,255,255,0.7), transparent)",
              }}
            />
          </button>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-ocid={`nav-link-${id}`}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-smooth group ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={
                      isActive
                        ? { textShadow: "0 0 12px rgba(0,255,255,0.5)" }
                        : {}
                    }
                  >
                    {link.label}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                          style={{ boxShadow: "0 0 6px rgba(0,255,255,0.8)" }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth"
                      style={{ background: "rgba(0,255,255,0.04)" }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            data-ocid="nav-cta"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-smooth hover:scale-105"
            style={{
              background: "oklch(var(--card) / 0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,255,255,0.3)",
              color: "oklch(var(--primary))",
              boxShadow: "0 0 16px rgba(0,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = "0 0 24px rgba(0,255,255,0.35)";
              btn.style.borderColor = "rgba(0,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = "0 0 16px rgba(0,255,255,0.15)";
              btn.style.borderColor = "rgba(0,255,255,0.3)";
            }}
          >
            Hire Me
          </button>

          {/* Mobile hamburger — animated 3-line to X */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-smooth"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-ocid="nav-hamburger"
            style={{
              background: menuOpen ? "rgba(0,255,255,0.1)" : "transparent",
              border: `1px solid ${menuOpen ? "rgba(0,255,255,0.3)" : "transparent"}`,
            }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-0.5 rounded-full"
              style={{
                background: menuOpen
                  ? "rgba(0,255,255,0.9)"
                  : "oklch(var(--foreground))",
              }}
            />
            <motion.span
              animate={
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 rounded-full"
              style={{ background: "oklch(var(--foreground))" }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-0.5 rounded-full"
              style={{
                background: menuOpen
                  ? "rgba(0,255,255,0.9)"
                  : "oklch(var(--foreground))",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "oklch(var(--background) / 0.92)",
                backdropFilter: "blur(24px)",
              }}
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none opacity-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,255,255,1) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <div className="relative flex flex-col items-center justify-center flex-1 gap-2 px-6">
              {NAV_LINKS.map((link, idx) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                return (
                  <motion.button
                    key={link.href}
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-ocid={`mobile-nav-${id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25, delay: idx * 0.06 }}
                    className={`w-full max-w-xs text-center py-3.5 text-lg font-semibold rounded-xl transition-smooth ${
                      isActive
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                    style={
                      isActive
                        ? {
                            background: "rgba(0,255,255,0.06)",
                            border: "1px solid rgba(0,255,255,0.2)",
                            textShadow: "0 0 12px rgba(0,255,255,0.4)",
                          }
                        : {
                            background: "oklch(var(--card) / 0.3)",
                            border: "1px solid oklch(var(--border) / 0.3)",
                          }
                    }
                  >
                    {link.label}
                  </motion.button>
                );
              })}

              <motion.button
                type="button"
                onClick={() => scrollTo("#contact")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: NAV_LINKS.length * 0.06 }}
                className="mt-2 w-full max-w-xs py-3.5 text-lg font-bold rounded-xl text-primary"
                style={{
                  background: "rgba(0,255,255,0.08)",
                  border: "1px solid rgba(0,255,255,0.4)",
                  boxShadow: "0 0 20px rgba(0,255,255,0.15)",
                  textShadow: "0 0 12px rgba(0,255,255,0.5)",
                }}
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
