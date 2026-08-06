"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, NAV_CTA } from "@/constants";
import { Magnetic } from "@/components/ui/Magnetic";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 right-0 left-0 z-[9999]",
        "border-b border-white/[0.07] bg-background"
      )}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="container-outer flex h-16 items-center justify-between"
      >
        {/* ── Logo ─────────────────────────────────────────── */}
        <Link
          href="/"
          aria-label="SellVia — home"
          className="flex items-center select-none"
        >
          <Image src="/logo-white.svg" alt="SellVia" width={112} height={32} priority />
        </Link>

        {/* ── Desktop nav links ────────────────────────────── */}
        <ul
          className="hidden items-center gap-7 md:flex"
          role="list"
          aria-label="Site sections"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "group relative font-body text-body-sm font-medium",
                  "text-gray-01 hover:text-white",
                  "transition-colors duration-200"
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right controls ───────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* CTA — always visible on sm+ */}
          <Magnetic strength={4} className="hidden sm:inline-block">
            <Link
              href={NAV_CTA.href}
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden",
                "h-9 px-4 rounded-button",
                "bg-accent font-heading text-body-sm font-bold tracking-tight text-black",
                "transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "hover:-translate-y-0.5 hover:shadow-[0_8px_26px_-8px_rgba(191,255,19,0.6)]"
              )}
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent  transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full"
              />
              <span className="relative">{NAV_CTA.label}</span>
            </Link>
          </Magnetic>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "flex items-center justify-center md:hidden",
              "h-11 w-11 rounded-sm",
              "text-gray-01 hover:text-white transition-colors duration-150"
            )}
          >
            {menuOpen ? (
              <X size={18} strokeWidth={1.75} aria-hidden />
            ) : (
              <Menu size={18} strokeWidth={1.75} aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      <div
        role="region"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={cn(
          "border-b border-border bg-background md:hidden",
          "transition-[max-height,opacity] duration-300 ease-out overflow-hidden",
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="container-outer flex flex-col py-4 gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block py-2.5 font-body text-body-sm font-medium",
                  "text-gray-01 hover:text-white transition-colors duration-150"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href={NAV_CTA.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "inline-flex items-center justify-center",
                "h-9 px-4 rounded-button",
                "bg-accent font-heading text-body-sm font-bold tracking-tight text-black",
                "hover:opacity-90 transition-opacity duration-150"
              )}
            >
              {NAV_CTA.label}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
