import { ChevronUp, Github, Instagram, Linkedin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const SOCIALS = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhammad-abdullah",
    glowColor: "oklch(0.60 0.18 240 / 0.7)",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/muhammad-abdullah",
    glowColor: "oklch(0.70 0.20 200 / 0.7)",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/muhammad.abdullah",
    glowColor: "oklch(0.65 0.22 320 / 0.7)",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <footer
        className="relative overflow-hidden"
        style={{ background: "oklch(0.08 0.01 256)" }}
      >
        {/* Neon top line */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(0.70 0.20 200) 40%, oklch(0.65 0.22 320) 60%, transparent 100%)",
            boxShadow:
              "0 0 16px oklch(0.70 0.20 200 / 0.6), 0 0 32px oklch(0.65 0.22 320 / 0.4)",
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.70 0.20 200 / 0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-5xl mx-auto px-6 pt-14 pb-8">
          {/* Main grid */}
          <div className="grid sm:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div>
              <p
                className="font-display font-bold text-xl mb-1"
                style={{
                  color: "oklch(0.70 0.20 200)",
                  textShadow:
                    "0 0 16px oklch(0.70 0.20 200 / 0.6), 0 0 32px oklch(0.70 0.20 200 / 0.3)",
                }}
              >
                Muhammad Abdullah
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                Graphic Designer · AI Tools Creator
                <br />
                Content Creator · Video Editor
              </p>
              <p className="text-xs" style={{ color: "oklch(0.50 0 0)" }}>
                TenBit Solutions, Lahore, Pakistan
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-4">
                Navigation
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="text-muted-foreground text-sm transition-smooth hover:text-primary"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-4">
                Connect
              </p>
              <div className="flex gap-3 mb-4">
                {SOCIALS.map(({ icon: Icon, label, href, glowColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-ocid={`footer-social-${label.toLowerCase()}`}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground transition-smooth hover:scale-110"
                    style={{
                      background: "oklch(var(--card) / 0.35)",
                      border: "1px solid oklch(var(--border) / 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.boxShadow = `0 0 16px ${glowColor}`;
                      el.style.borderColor = glowColor.replace("0.7", "0.5");
                      el.style.color = "oklch(0.70 0.20 200)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.boxShadow = "";
                      el.style.borderColor = "oklch(var(--border) / 0.3)";
                      el.style.color = "";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
              <p className="text-muted-foreground text-xs">
                Available for freelance &amp; full-time
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: "oklch(var(--border) / 0.15)" }}
          >
            {/* Copyright glass panel */}
            <div
              className="rounded-xl px-6 py-3"
              style={{
                background: "oklch(var(--card) / 0.35)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(var(--border) / 0.2)",
              }}
            >
              <p className="text-muted-foreground text-xs text-center">
                {"© "}
                {year}{" "}
                <span style={{ color: "oklch(0.70 0.20 200)" }}>
                  Muhammad Abdullah
                </span>
                {" – TenBit Solutions.  Built with love using "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-smooth hover:underline"
                  style={{ color: "oklch(0.70 0.20 200)" }}
                >
                  caffeine.ai
                </a>
              </p>
            </div>

            {/* Invisible spacer matching scroll-to-top */}
            <div className="w-11 h-11 sm:invisible" />
          </div>
        </div>
      </footer>

      {/* Fixed scroll-to-top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="scroll-top"
            type="button"
            onClick={scrollTop}
            aria-label="Scroll to top"
            data-ocid="footer-scroll-top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-xl flex items-center justify-center transition-smooth"
            style={{
              background: "oklch(0.70 0.20 200 / 0.15)",
              backdropFilter: "blur(16px)",
              border: "1px solid oklch(0.70 0.20 200 / 0.5)",
              color: "oklch(0.70 0.20 200)",
              boxShadow:
                "0 0 16px oklch(0.70 0.20 200 / 0.4), 0 0 32px oklch(0.70 0.20 200 / 0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 24px oklch(0.70 0.20 200 / 0.7), 0 0 48px oklch(0.70 0.20 200 / 0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 16px oklch(0.70 0.20 200 / 0.4), 0 0 32px oklch(0.70 0.20 200 / 0.2)";
            }}
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
