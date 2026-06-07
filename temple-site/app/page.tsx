import Link from "next/link";

function GoldDivider({ label }: { label?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "0 auto",
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(to right, transparent, #c9a84c)",
        }}
      />
      <span
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          color: "#c9a84c",
          whiteSpace: "nowrap",
        }}
      >
        {label || "✦"}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(to left, transparent, #c9a84c)",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "6rem 1.5rem 4rem",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #1a0d2e 0%, #0f0b1a 45%, #05030d 100%)",
          overflow: "hidden",
        }}
      >
        {/* Animated flame/glow SVG behind content */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            pointerEvents: "none",
            opacity: 0.18,
          }}
        >
          <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6d28d9" stopOpacity="1" />
                <stop offset="40%" stopColor="#e05c1a" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#05030d" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="flameCore" cx="50%" cy="70%" r="40%">
                <stop offset="0%" stopColor="#f0d060" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ff8c42" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#e05c1a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="280" fill="url(#heroGlow)" />
            <ellipse cx="300" cy="380" rx="120" ry="180" fill="url(#flameCore)" />
          </svg>
        </div>

        {/* Central flame icon (animated) */}
        <div
          style={{
            marginBottom: "2.5rem",
            animation: "float 6s ease-in-out infinite",
            position: "relative",
            zIndex: 1,
          }}
        >
          <svg
            width="80"
            height="96"
            viewBox="0 0 36 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 0 20px rgba(224, 92, 26, 0.6))" }}
          >
            <path
              d="M18 2C18 2 6 12 6 22C6 29.18 11.37 35 18 35C24.63 35 30 29.18 30 22C30 12 18 2 18 2Z"
              fill="url(#heroFlame1)"
              opacity="0.9"
              style={{ animation: "flame-pulse 3s ease-in-out infinite" }}
            />
            <path
              d="M18 10C18 10 11 18 11 24C11 27.87 14.13 31 18 31C21.87 31 25 27.87 25 24C25 18 18 10 18 10Z"
              fill="url(#heroFlame2)"
            />
            <path
              d="M18 17C18 17 14 22 14 25.5C14 27.43 15.79 29 18 29C20.21 29 22 27.43 22 25.5C22 22 18 17 18 17Z"
              fill="#f0d060"
              opacity="0.95"
            />
            <defs>
              <linearGradient id="heroFlame1" x1="18" y1="2" x2="18" y2="35" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f0d060" />
                <stop offset="40%" stopColor="#e05c1a" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="heroFlame2" x1="18" y1="10" x2="18" y2="31" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f0d060" />
                <stop offset="60%" stopColor="#ff8c42" />
                <stop offset="100%" stopColor="#e05c1a" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main title */}
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 5vw, 3.5rem)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(135deg, #c9a84c 0%, #f0d060 35%, #c9a84c 60%, #f0d060 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 4s linear infinite",
          }}
        >
          Aeternal Temple<br />of Obsidian Flame
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "IM Fell English, serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "#b8a8cc",
            letterSpacing: "0.05em",
            marginBottom: "3rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          Where Ancient Wisdom Meets Living Practice
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            marginBottom: "4rem",
          }}
        >
          <Link href="/courses" className="btn-gold-outline">
            Explore Our Courses
          </Link>
          <Link href="/contact" className="btn-gold-filled">
            Begin Your Journey
          </Link>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid rgba(201, 168, 76, 0.2)",
            borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
            padding: "1.25rem 2rem",
            backgroundColor: "rgba(26, 13, 46, 0.4)",
          }}
        >
          {[
            { label: "Est.", value: "1987" },
            { label: "Students", value: "2,400+" },
            { label: "Courses", value: "34" },
            { label: "Traditions", value: "12" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0",
              }}
            >
              <div
                style={{
                  padding: "0 2rem",
                  textAlign: "center",
                  borderRight: i < 3 ? "1px solid rgba(201, 168, 76, 0.2)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "#c9a84c",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#b8a8cc",
                    marginTop: "0.2rem",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PATH OF HIDDEN KNOWLEDGE ── */}
      <section
        style={{
          backgroundColor: "#0f0b1a",
          padding: "6rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <GoldDivider label="✦ ✦ ✦" />
            <h2
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                color: "#f0e6d3",
                letterSpacing: "0.08em",
                marginTop: "2rem",
                marginBottom: "0",
              }}
            >
              The Path of Hidden Knowledge
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* Decorative Pentagram SVG */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg
                width="280"
                height="280"
                viewBox="0 0 280 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(109, 40, 217, 0.4))",
                  animation: "float 8s ease-in-out infinite",
                }}
              >
                {/* Outer circle */}
                <circle cx="140" cy="140" r="130" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4" />
                <circle cx="140" cy="140" r="120" stroke="#6d28d9" strokeWidth="0.5" strokeOpacity="0.3" />

                {/* Pentagram lines */}
                {/* Star points at top, then clockwise */}
                {/* Top: 140, 20 */}
                {/* Upper-right: 252, 101 */}
                {/* Lower-right: 210, 236 */}
                {/* Lower-left: 70, 236 */}
                {/* Upper-left: 28, 101 */}
                <polygon
                  points="140,20 252,101 210,236 70,236 28,101"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />
                {/* Inner circle */}
                <circle cx="140" cy="140" r="50" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />

                {/* Central flame symbol */}
                <path
                  d="M140 95 C140 95 118 115 118 132 C118 144.15 128.06 154 140 154 C151.94 154 162 144.15 162 132 C162 115 140 95 140 95Z"
                  fill="url(#pentaFlame)"
                  opacity="0.9"
                />
                <path
                  d="M140 110 C140 110 130 122 130 131 C130 136.52 134.48 141 140 141 C145.52 141 150 136.52 150 131 C150 122 140 110 140 110Z"
                  fill="#f0d060"
                  opacity="0.8"
                />

                {/* Small stars at vertices */}
                {[
                  [140, 20],
                  [252, 101],
                  [210, 236],
                  [70, 236],
                  [28, 101],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="4" fill="#c9a84c" opacity="0.8" />
                ))}

                <defs>
                  <linearGradient id="pentaFlame" x1="140" y1="95" x2="140" y2="154" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f0d060" />
                    <stop offset="50%" stopColor="#e05c1a" />
                    <stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Text */}
            <div>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.15rem",
                  color: "#f0e6d3",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                Founded in Philadelphia in 1987, the Aeternal Temple of Obsidian Flame began as a small
                study circle of dedicated practitioners who believed that the Western esoteric tradition
                deserved rigorous academic treatment alongside genuine initiatory practice.
              </p>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.15rem",
                  color: "#b8a8cc",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                Today, we are recognized as one of the premier centers for occult education in the world,
                offering structured courses across twelve esoteric traditions. Our faculty includes
                working practitioners, initiated adepts, and scholars who bridge the gap between
                academic rigour and living magical practice.
              </p>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.15rem",
                  color: "#b8a8cc",
                  lineHeight: 1.8,
                }}
              >
                We believe the hidden wisdom of the ages is not locked away — it is accessible to every
                sincere seeker who approaches with reverence, dedication, and an open mind.
              </p>

              <div style={{ marginTop: "2rem" }}>
                <Link
                  href="/about"
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#c9a84c",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(201, 168, 76, 0.4)",
                    paddingBottom: "0.25rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  Discover Our Heritage →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section
        style={{
          backgroundColor: "#05030d",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <GoldDivider />
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#6d28d9",
                marginTop: "1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              Sacred Knowledge
            </p>
            <h2
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                color: "#f0e6d3",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              Featured Courses
            </h2>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.1rem",
                color: "#b8a8cc",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Step into the mysteries with our most celebrated courses, taught by initiated adepts and
              master practitioners of the Western esoteric tradition.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                title: "The Hermetic Corpus",
                tradition: "Hermetics",
                level: "Intermediate",
                levelColor: "#c9a84c",
                weeks: "12 weeks",
                desc:
                  "Immerse yourself in the foundational texts of Western hermeticism — from the Emerald Tablet to the Corpus Hermeticum. Explore the Seven Hermetic Principles as living forces in consciousness and matter.",
              },
              {
                title: "Kabbalistic Tree of Life",
                tradition: "Kabbalah",
                level: "Beginner",
                levelColor: "#16a34a",
                weeks: "16 weeks",
                desc:
                  "A comprehensive journey through the Sephirot, the Paths, and the Four Worlds. Learn to navigate the Tree of Life as a map of divine reality and a guide for inner transformation.",
              },
              {
                title: "Alchemy & Spagyrics",
                tradition: "Alchemy",
                level: "Advanced",
                levelColor: "#dc2626",
                weeks: "20 weeks",
                desc:
                  "The Royal Art in both its inner and outer expressions. Work with laboratory procedures, planetary correspondences, and the philosophical dimensions of the Great Work through a structured practicum.",
              },
            ].map((course, i) => (
              <div
                key={i}
                className="mystic-card"
                style={{
                  backgroundColor: "#0f0b1a",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle top border accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background:
                      "linear-gradient(to right, transparent, rgba(201, 168, 76, 0.6), transparent)",
                  }}
                />

                {/* Badges */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#b8a8cc",
                      border: "1px solid rgba(184, 168, 204, 0.3)",
                      padding: "0.2rem 0.6rem",
                    }}
                  >
                    {course.tradition}
                  </span>
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: course.levelColor,
                      border: `1px solid ${course.levelColor}50`,
                      padding: "0.2rem 0.6rem",
                    }}
                  >
                    {course.level}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    fontSize: "1.15rem",
                    color: "#f0e6d3",
                    marginBottom: "0.75rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {course.title}
                </h3>

                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.95rem",
                    color: "#b8a8cc",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}
                >
                  {course.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(201, 168, 76, 0.15)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "0.85rem",
                      color: "#6d28d9",
                      fontStyle: "italic",
                    }}
                  >
                    {course.weeks}
                  </span>
                  <Link
                    href="/courses"
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/courses" className="btn-gold-outline">
              View All 34 Courses
            </Link>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section
        style={{
          backgroundColor: "#0f0b1a",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <GoldDivider />
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#e05c1a",
                marginTop: "1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              Mark the Calendar
            </p>
            <h2
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                color: "#f0e6d3",
                letterSpacing: "0.08em",
              }}
            >
              Upcoming Events
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                month: "JUN",
                day: "21",
                type: "Ritual",
                title: "Summer Solstice Ritual Circle",
                location: "In-Person",
              },
              {
                month: "JUN",
                day: "28",
                type: "Workshop",
                title: "Introduction to the Hermetic Principles",
                location: "Online",
              },
              {
                month: "JUL",
                day: "5",
                type: "Study Group",
                title: "Kabbalah Study Circle: Binah",
                location: "Online",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="mystic-card"
                style={{
                  backgroundColor: "#1a0d2e",
                  padding: "1.5rem",
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                }}
              >
                {/* Date block */}
                <div
                  style={{
                    minWidth: "60px",
                    textAlign: "center",
                    borderRight: "1px solid rgba(201, 168, 76, 0.2)",
                    paddingRight: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#e05c1a",
                    }}
                  >
                    {event.month}
                  </div>
                  <div
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontWeight: 700,
                      fontSize: "2rem",
                      color: "#c9a84c",
                      lineHeight: 1,
                      marginTop: "0.2rem",
                    }}
                  >
                    {event.day}
                  </div>
                </div>

                <div>
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#6d28d9",
                      border: "1px solid rgba(109, 40, 217, 0.4)",
                      padding: "0.15rem 0.5rem",
                      display: "inline-block",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {event.type}
                  </span>
                  <h3
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "#f0e6d3",
                      marginBottom: "0.5rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {event.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span style={{ color: "#c9a84c", fontSize: "0.6rem" }}>◆</span>
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "0.85rem",
                        color: "#b8a8cc",
                        fontStyle: "italic",
                      }}
                    >
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/events" className="btn-gold-outline">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section
        style={{
          backgroundColor: "#05030d",
          padding: "6rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <GoldDivider label="✦" />

          <blockquote style={{ margin: "2.5rem 0" }}>
            <p
              style={{
                fontFamily: "IM Fell English, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
                color: "#c9a84c",
                lineHeight: 1.6,
                letterSpacing: "0.02em",
              }}
            >
              &ldquo;As above, so below; as within, so without; as the universe, so the soul.&rdquo;
            </p>
            <footer
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#b8a8cc",
                marginTop: "1.25rem",
              }}
            >
              — The Emerald Tablet of Hermes Trismegistus
            </footer>
          </blockquote>

          <GoldDivider label="✦" />
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a0d2e 0%, #2d1452 50%, #1a0d2e 100%)",
          padding: "5rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid rgba(201, 168, 76, 0.2)",
          borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "1rem",
            }}
          >
            Begin the Great Work
          </p>
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "#f0e6d3",
              letterSpacing: "0.08em",
              marginBottom: "1.25rem",
            }}
          >
            Ready to Begin?
          </h2>
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.15rem",
              color: "#b8a8cc",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Join a community of dedicated seekers who have walked this path before you.
            Our initiatory curriculum awaits those who approach with sincerity and purpose.
          </p>
          <Link href="/contact" className="btn-gold-filled">
            Apply for Membership
          </Link>
        </div>
      </section>
    </>
  );
}
