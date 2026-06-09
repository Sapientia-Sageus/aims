"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/astrology", label: "Celestial Map" },
  { href: "/planetary-hours", label: "Hours" },
  { href: "/rituals", label: "Rituals" },
  { href: "/godform", label: "Godform" },
  { href: "/liber-israfel", label: "Israfel" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled
          ? "rgba(5, 3, 13, 0.95)"
          : "rgba(5, 3, 13, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201, 168, 76, 0.15)",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
        >
          {/* Flame SVG Icon */}
          <svg
            width="36"
            height="42"
            viewBox="0 0 36 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer flame */}
            <path
              d="M18 2C18 2 6 12 6 22C6 29.18 11.37 35 18 35C24.63 35 30 29.18 30 22C30 12 18 2 18 2Z"
              fill="url(#flameGrad1)"
              opacity="0.9"
            />
            {/* Inner flame core */}
            <path
              d="M18 10C18 10 11 18 11 24C11 27.87 14.13 31 18 31C21.87 31 25 27.87 25 24C25 18 18 10 18 10Z"
              fill="url(#flameGrad2)"
            />
            {/* Teardrop inner */}
            <path
              d="M18 17C18 17 14 22 14 25.5C14 27.43 15.79 29 18 29C20.21 29 22 27.43 22 25.5C22 22 18 17 18 17Z"
              fill="#f0d060"
              opacity="0.9"
            />
            {/* Base obsidian gem */}
            <ellipse cx="18" cy="38" rx="6" ry="3" fill="rgba(45, 20, 82, 0.8)" />
            <defs>
              <linearGradient id="flameGrad1" x1="18" y1="2" x2="18" y2="35" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f0d060" />
                <stop offset="40%" stopColor="#e05c1a" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="flameGrad2" x1="18" y1="10" x2="18" y2="31" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f0d060" />
                <stop offset="60%" stopColor="#ff8c42" />
                <stop offset="100%" stopColor="#e05c1a" />
              </linearGradient>
            </defs>
          </svg>

          <div>
            <div
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.15em",
                color: "#c9a84c",
                lineHeight: 1.1,
                textTransform: "uppercase",
              }}
            >
              ATOF
            </div>
            <div
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "#b8a8cc",
                lineHeight: 1.2,
              }}
            >
              Aeternal Temple
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.5rem 0.875rem",
                  color: isActive ? "#f0d060" : "#b8a8cc",
                  textDecoration: "none",
                  borderBottom: isActive
                    ? "1px solid #c9a84c"
                    : "1px solid transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = "#c9a84c";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = "#b8a8cc";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.5rem 1.25rem",
              color: "#c9a84c",
              textDecoration: "none",
              border: "1px solid #c9a84c",
              marginLeft: "0.75rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(201, 168, 76, 0.1)";
              el.style.color = "#f0d060";
              el.style.borderColor = "#f0d060";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "#c9a84c";
              el.style.borderColor = "#c9a84c";
            }}
          >
            Apply
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "#c9a84c",
              transition: "all 0.3s ease",
              transform: isOpen ? "rotate(45deg) translateY(7px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "#c9a84c",
              transition: "all 0.3s ease",
              opacity: isOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "#c9a84c",
              transition: "all 0.3s ease",
              transform: isOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            backgroundColor: "rgba(15, 11, 26, 0.98)",
            borderTop: "1px solid rgba(201, 168, 76, 0.2)",
            padding: "1rem 1.5rem 2rem",
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.875rem 0",
                  color: isActive ? "#f0d060" : "#b8a8cc",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              fontFamily: "Cinzel, serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.75rem 2rem",
              color: "#c9a84c",
              textDecoration: "none",
              border: "1px solid #c9a84c",
            }}
          >
            Apply
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
