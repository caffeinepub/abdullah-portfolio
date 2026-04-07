import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  CheckCircle,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

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

interface FormState {
  name: string;
  email: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}
type FocusedField = keyof FormState | null;

interface FloatingFieldProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  rows?: number;
  error?: string;
  focused: boolean;
  ocid: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function FloatingField({
  id,
  label,
  value,
  type = "text",
  rows,
  error,
  focused,
  ocid,
  onChange,
  onFocus,
  onBlur,
}: FloatingFieldProps) {
  const isActive = focused || value.length > 0;
  const borderColor = focused
    ? "oklch(0.70 0.20 200)"
    : error
      ? "oklch(0.65 0.19 22)"
      : "oklch(var(--border) / 0.35)";
  const glowShadow = focused
    ? "0 0 0 2px oklch(0.70 0.20 200 / 0.20), 0 0 16px oklch(0.70 0.20 200 / 0.25)"
    : "none";

  return (
    <div>
      <div
        className="relative w-full rounded-xl px-4 transition-smooth"
        style={{
          background: "oklch(var(--card) / 0.35)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${borderColor}`,
          boxShadow: glowShadow,
        }}
      >
        <label
          htmlFor={id}
          className="absolute left-4 transition-all duration-200 pointer-events-none select-none font-medium"
          style={{
            top: isActive ? "6px" : "50%",
            transform: isActive
              ? "translateY(0) scale(0.78)"
              : "translateY(-50%) scale(1)",
            transformOrigin: "left",
            color: focused
              ? "oklch(0.70 0.20 200)"
              : "oklch(var(--muted-foreground))",
            fontSize: "0.875rem",
          }}
        >
          {label}
        </label>

        {rows ? (
          <textarea
            id={id}
            rows={rows}
            value={value}
            data-ocid={ocid}
            className="w-full bg-transparent outline-none text-foreground text-sm resize-none pt-7 pb-3 px-0"
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            data-ocid={ocid}
            className="w-full bg-transparent outline-none text-foreground text-sm leading-[3rem]"
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
      </div>
      {error && (
        <p
          className="text-xs mt-1.5 ml-1"
          style={{ color: "oklch(0.65 0.19 22)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactSection() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<FocusedField>(null);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleBlur = (field: keyof FormState) => {
    setFocused(null);
    const e = validate();
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "oklch(var(--card) / 0.15)" }}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.70 0.20 200 / 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.22 320 / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Get In <span className="text-primary">Touch</span>
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
            Have a project in mind? Let's create something extraordinary
            together.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <div
                className="rounded-2xl p-10 text-center"
                style={{
                  background: "oklch(var(--card) / 0.5)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid oklch(0.70 0.20 200 / 0.4)",
                  boxShadow: "0 0 30px oklch(0.70 0.20 200 / 0.15)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                  <CheckCircle
                    size={52}
                    className="mx-auto mb-4"
                    style={{
                      color: "oklch(0.70 0.85 145)",
                      filter:
                        "drop-shadow(0 0 12px oklch(0.70 0.85 145 / 0.6))",
                    }}
                  />
                </motion.div>
                <h3
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "oklch(0.70 0.85 145)" }}
                >
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold transition-smooth"
                  style={{
                    background: "oklch(var(--card) / 0.5)",
                    border: "1px solid oklch(0.70 0.20 200 / 0.4)",
                    color: "oklch(0.70 0.20 200)",
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl p-7 space-y-5"
                style={{
                  background: "oklch(var(--card) / 0.5)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid oklch(var(--border) / 0.3)",
                  boxShadow: "0 8px 32px oklch(0 0 0 / 0.3)",
                }}
              >
                <h3 className="font-display font-bold text-lg text-foreground mb-1">
                  Send a Message
                </h3>

                <FloatingField
                  id="contact-name"
                  label="Your Name"
                  value={form.name}
                  error={errors.name}
                  focused={focused === "name"}
                  ocid="contact-name"
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  onFocus={() => setFocused("name")}
                  onBlur={() => handleBlur("name")}
                />
                <FloatingField
                  id="contact-email"
                  label="Email Address"
                  value={form.email}
                  type="email"
                  error={errors.email}
                  focused={focused === "email"}
                  ocid="contact-email"
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  onFocus={() => setFocused("email")}
                  onBlur={() => handleBlur("email")}
                />
                <FloatingField
                  id="contact-message"
                  label="Your Message"
                  value={form.message}
                  rows={5}
                  error={errors.message}
                  focused={focused === "message"}
                  ocid="contact-message"
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                  onFocus={() => setFocused("message")}
                  onBlur={() => handleBlur("message")}
                />

                <motion.button
                  type="submit"
                  data-ocid="contact-submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-smooth relative overflow-hidden group"
                  style={{
                    background: "oklch(0.70 0.20 200)",
                    color: "oklch(0.10 0 0)",
                    boxShadow: "0 0 20px oklch(0.70 0.20 200 / 0.4)",
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-smooth"
                    style={{
                      boxShadow:
                        "0 0 30px oklch(0.70 0.20 200 / 0.5), 0 0 60px oklch(0.70 0.20 200 / 0.3)",
                    }}
                  />
                  <Send size={15} className="relative z-10" />
                  <span className="relative z-10">Send Message</span>
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* RIGHT: Socials + Map */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Social icons */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(var(--card) / 0.5)",
                backdropFilter: "blur(24px)",
                border: "1px solid oklch(var(--border) / 0.3)",
              }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-5">
                Find me on
              </p>
              <div className="flex gap-4">
                {SOCIALS.map(({ icon: Icon, label, href, glowColor }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-ocid={`social-${label.toLowerCase()}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.12 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground transition-smooth"
                    style={{
                      background: "oklch(var(--card) / 0.5)",
                      border: "1px solid oklch(var(--border) / 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.boxShadow = `0 0 20px ${glowColor}`;
                      el.style.borderColor = glowColor.replace("0.7", "0.6");
                      el.style.color = "oklch(0.70 0.20 200)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.boxShadow = "";
                      el.style.borderColor = "oklch(var(--border) / 0.3)";
                      el.style.color = "";
                    }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="rounded-2xl overflow-hidden relative"
              style={{
                height: "300px",
                background: "oklch(var(--card) / 0.5)",
                backdropFilter: "blur(24px)",
                border: "1px solid oklch(var(--border) / 0.3)",
              }}
            >
              {/* Grid lines */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(0.70 0.20 200 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(0.70 0.20 200 / 0.06) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Radial glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.70 0.20 200 / 0.08) 0%, transparent 70%)",
                }}
              />
              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[80, 120, 160].map((size) => (
                  <div
                    key={size}
                    className="absolute rounded-full animate-ping"
                    style={{
                      width: size,
                      height: size,
                      border: `1px solid oklch(0.70 0.20 200 / ${0.3 - size / 800})`,
                      animationDuration: "3s",
                      animationDelay: `${size / 160}s`,
                    }}
                  />
                ))}
              </div>
              {/* Pin + Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="relative">
                  <MapPin
                    size={36}
                    className="floating"
                    style={{
                      color: "oklch(0.70 0.20 200)",
                      filter:
                        "drop-shadow(0 0 12px oklch(0.70 0.20 200 / 0.9))",
                    }}
                  />
                </div>
                <div className="text-center glass rounded-xl px-5 py-2.5">
                  <p className="font-display font-bold text-foreground text-sm">
                    Lahore, Pakistan
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Punjab, PK · TenBit Solutions
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
