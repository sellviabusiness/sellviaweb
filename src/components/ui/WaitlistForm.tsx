"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

type Role = "business" | "creator";
type FormState = "idle" | "loading" | "success";

interface WaitlistFormProps {
  /** Unique prefix so multiple forms can coexist on one page */
  idPrefix: string;
  showRole?: boolean;
  showReason?: boolean;
  ctaLabel?: string;
}

/* ─── Success ──────────────────────────────────────────────────
   The reward for converting: a mark that draws itself, then the
   confirmation rises underneath it. No confetti — the restraint
   is the premium part.
──────────────────────────────────────────────────────────────── */

function Success({ role, showRole }: { role: Role; showRole: boolean }) {
  return (
    <motion.div
      role="status"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
      }}
      className="flex flex-col items-center gap-5 text-center"
    >
      {/* Drawn check inside a ring that scales in */}
      <motion.span
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: ease.expo },
          },
        }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/[0.07]"
      >
        <motion.span
          aria-hidden
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: ease.out }}
          className="absolute inset-0 rounded-full border border-accent/40"
        />
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <motion.path
            d="M4 12.5 L9.5 18 L20 6.5"
            stroke="#bfff13"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: ease.expo }}
          />
        </svg>
      </motion.span>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: ease.out },
          },
        }}
      >
        <p className="font-heading text-heading-xl font-medium tracking-tight text-white">
          You&apos;re on the list.
        </p>
        <p className="mx-auto mt-2 max-w-xs font-body text-body-sm leading-relaxed text-gray-01">
          We&apos;ll email you as soon as the beta opens
          {showRole && ` for ${role === "business" ? "brands" : "creators"}`}.
          Reply to it — we read every message.
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Form ─────────────────────────────────────────────────────── */

export function WaitlistForm({
  idPrefix,
  showRole = true,
  showReason = false,
  ctaLabel = "Join the waitlist",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [role, setRole] = useState<Role>("business");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email doesn't look right — mind checking it?");
      return;
    }
    setError(null);
    setState("loading");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { email, role, reason },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setState("success");
    } catch {
      setError("Something went wrong — mind trying again?");
      setState("idle");
    }
  }

  if (state === "success") {
    return <Success role={role} showRole={showRole} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col items-start gap-4"
      noValidate
    >
      {showRole && (
        <div
          role="group"
          aria-label="Joining as"
          className="relative flex w-full p-1"
        >
          {(["business", "creator"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              aria-pressed={role === r}
              className={cn(
                "relative flex-1 px-4 py-1.5 font-body text-body-xs font-medium",
                "transition-colors duration-200 outline-none",
                "focus-visible:ring-1 focus-visible:ring-accent/50",
                role === r ? "text-white" : "text-gray-02 hover:text-gray-01"
              )}
            >
              {role === r && (
                <motion.span
                  layoutId={`${idPrefix}-role-pill`}
                  transition={{ duration: 0.32, ease: ease.expo }}
                  className="absolute inset-0 bg-white/[0.08]"
                />
              )}
              <span className="relative">
                {r === "business" ? "A business" : "A creator"}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="w-full">
        <label htmlFor={`${idPrefix}-email`} className="sr-only">
          Email address
        </label>

        <div className="relative w-full">
          <input
            id={`${idPrefix}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${idPrefix}-error` : undefined}
            placeholder="you@company.com"
            className={cn(
              "h-13 w-full rounded-input border bg-white/[0.02] px-4",
              "font-body text-body-sm text-white placeholder:text-gray-02",
              "transition-[border-color,background-color] duration-200 focus:outline-none",
              error
                ? "border-red-400/60"
                : "border-white/[0.11] hover:border-white/[0.18] focus:border-accent/50"
            )}
            style={{ height: "3.25rem" }}
          />
          {/* Focus beam — a rule that wipes across the base of the field */}
          <span
            aria-hidden
            className={cn(
              "absolute bottom-0 left-0 h-px w-full origin-left bg-accent",
              "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              focused && !error ? "scale-x-100" : "scale-x-0"
            )}
          />
        </div>
      </div>

      {showReason && (
        <div className="w-full">
          <label htmlFor={`${idPrefix}-reason`} className="sr-only">
            Why do you want to join?
          </label>
          <textarea
            id={`${idPrefix}-reason`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Why do you want to join?"
            rows={4}
            className={cn(
              "w-full resize-none rounded-input border border-white/[0.11] bg-white/[0.02] px-4 py-3",
              "font-body text-body-sm text-white placeholder:text-gray-02",
              "transition-colors duration-200 hover:border-white/[0.18]",
              "focus:outline-none focus:border-accent/50"
            )}
          />
        </div>
      )}

      <div className="flex w-full flex-col gap-4">
        <Magnetic strength={4} className="block w-full">
          <button
            type="submit"
            disabled={state === "loading"}
            className={cn(
              "group relative w-full overflow-hidden rounded-button px-7",
              "bg-accent font-heading text-body-sm font-bold tracking-tight text-black",
              "transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "hover:-translate-y-0.5 hover:shadow-[0_10px_34px_-10px_rgba(191,255,19,0.55)]",
              "active:translate-y-0",
              "disabled:cursor-not-allowed disabled:opacity-60"
            )}
            style={{ height: "3.25rem" }}
          >
            {/* Sheen sweep on hover */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full"
            />
            <span className="relative">
              {state === "loading" ? "Joining…" : ctaLabel}
            </span>
          </button>
        </Magnetic>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: ease.out }}
          id={`${idPrefix}-error`}
          role="alert"
          className="self-start font-body text-body-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}
