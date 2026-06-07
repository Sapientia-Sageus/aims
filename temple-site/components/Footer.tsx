import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#05030d",
        borderTop: "1px solid rgba(201, 168, 76, 0.2)",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Top section: brand + columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand column */}
          <div style={{ maxWidth: "300px" }}>
            {/* Flame + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <svg width="32" height="38" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 2C18 2 6 12 6 22C6 29.18 11.37 35 18 35C24.63 35 30 29.18 30 22C30 12 18 2 18 2Z"
                  fill="url(#footerFlame1)"
                  opacity="0.9"
                />
                <path
                  d="M18 10C18 10 11 18 11 24C11 27.87 14.13 31 18 31C21.87 31 25 27.87 25 24C25 18 18 10 18 10Z"
                  fill="url(#footerFlame2)"
                />
                <path
                  d="M18 17C18 17 14 22 14 25.5C14 27.43 15.79 29 18 29C20.21 29 22 27.43 22 25.5C22 22 18 17 18 17Z"
                  fill="#f0d060"
                  opacity="0.9"
                />
                <defs>
                  <linearGradient id="footerFlame1" x1="18" y1="2" x2="18" y2="35" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f0d060" />
                    <stop offset="40%" stopColor="#e05c1a" />
                    <stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
                  <linearGradient id="footerFlame2" x1="18" y1="10" x2="18" y2="31" gradientUnits="userSpaceOnUse">
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
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                    color: "#c9a84c",
                    textTransform: "uppercase",
                  }}
                >
                  Aeternal Temple
                </div>
                <div
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 400,
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: "#b8a8cc",
                  }}
                >
                  of Obsidian Flame
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "0.95rem",
                color: "#b8a8cc",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Where Ancient Wisdom Meets Living Practice. Guiding seekers on the path of hidden knowledge since 1987.
            </p>

            {/* Decorative ornament */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#c9a84c" }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}>✦</span>
              <span
                style={{
                  fontFamily: "IM Fell English, serif",
                  fontStyle: "italic",
                  fontSize: "0.875rem",
                  color: "#c9a84c",
                  letterSpacing: "0.05em",
                }}
              >
                Lux in Tenebris
              </span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}>✦</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "1.25rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid rgba(201, 168, 76, 0.25)",
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About the Temple" },
                { href: "/courses", label: "Our Courses" },
                { href: "/events", label: "Events & Rituals" },
                { href: "/blog", label: "Sacred Writings" },
                { href: "/contact", label: "Join Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "0.95rem",
                      color: "#b8a8cc",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#b8a8cc";
                    }}
                  >
                    <span style={{ color: "#6d28d9", fontSize: "0.5rem" }}>◆</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "1.25rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid rgba(201, 168, 76, 0.25)",
              }}
            >
              Learn
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { href: "/courses", label: "The Hermetic Corpus" },
                { href: "/courses", label: "Kabbalistic Studies" },
                { href: "/courses", label: "Practical Alchemy" },
                { href: "/courses", label: "Ritual Magic" },
                { href: "/courses", label: "Sacred Geometry" },
                { href: "/courses", label: "Celestial Astrology" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "0.95rem",
                      color: "#b8a8cc",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#b8a8cc";
                    }}
                  >
                    <span style={{ color: "#6d28d9", fontSize: "0.5rem" }}>◆</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "1.25rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid rgba(201, 168, 76, 0.25)",
              }}
            >
              Connect
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <div>
                <div
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6d28d9",
                    marginBottom: "0.2rem",
                  }}
                >
                  Email
                </div>
                <a
                  href="mailto:initiates@aeternaltemple.org"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.95rem",
                    color: "#b8a8cc",
                    textDecoration: "none",
                  }}
                >
                  initiates@aeternaltemple.org
                </a>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6d28d9",
                    marginBottom: "0.2rem",
                  }}
                >
                  Location
                </div>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.95rem",
                    color: "#b8a8cc",
                    margin: 0,
                  }}
                >
                  Philadelphia, PA
                </p>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6d28d9",
                    marginBottom: "0.2rem",
                  }}
                >
                  Office Hours
                </div>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.95rem",
                    color: "#b8a8cc",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Mon–Fri: 10am–6pm EST<br />
                  Sat: 11am–3pm EST
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(201, 168, 76, 0.3), transparent)",
            margin: "2rem 0",
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "0.85rem",
              color: "rgba(184, 168, 204, 0.6)",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Aeternal Temple of Obsidian Flame. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ color: "#c9a84c", fontSize: "0.75rem" }}>✦</span>
            <span
              style={{
                fontFamily: "IM Fell English, serif",
                fontStyle: "italic",
                fontSize: "0.875rem",
                color: "rgba(201, 168, 76, 0.7)",
                letterSpacing: "0.08em",
              }}
            >
              Lux in Tenebris
            </span>
            <span style={{ color: "#c9a84c", fontSize: "0.75rem" }}>✦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
