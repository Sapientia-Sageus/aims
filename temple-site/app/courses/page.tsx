import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore our full curriculum spanning Hermeticism, Kabbalah, Alchemy, Ritual Magic, Astrology, Tarot, and Sacred Geometry.",
};

function PageHeader({
  title,
  breadcrumb,
}: {
  title: string;
  breadcrumb: { label: string; href?: string }[];
}) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a0d2e 0%, #0f0b1a 100%)",
        borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
        padding: "4rem 1.5rem 3rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <nav style={{ marginBottom: "1.5rem" }}>
          <ol
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
              flexWrap: "wrap",
            }}
          >
            {breadcrumb.map((crumb, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {i > 0 && (
                  <span style={{ color: "#6d28d9", fontSize: "0.6rem" }}>◆</span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#b8a8cc",
                      textDecoration: "none",
                    }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                    }}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#f0e6d3",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1.25rem",
          }}
        >
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, #c9a84c)" }} />
          <span style={{ color: "#c9a84c", fontSize: "1rem" }}>✦</span>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left, transparent, #c9a84c)" }} />
        </div>
      </div>
    </div>
  );
}

const courses = [
  {
    title: "The Hermetic Corpus",
    tradition: "Hermetics",
    level: "Intermediate",
    levelColor: "#c9a84c",
    levelBg: "rgba(201, 168, 76, 0.08)",
    weeks: "12 weeks",
    desc:
      "Immerse yourself in the foundational texts of Western hermeticism — from the Emerald Tablet to the Corpus Hermeticum. Explore the Seven Hermetic Principles as living forces in consciousness and matter, with weekly readings, discussions, and contemplative exercises.",
  },
  {
    title: "Kabbalistic Tree of Life",
    tradition: "Kabbalah",
    level: "Beginner",
    levelColor: "#16a34a",
    levelBg: "rgba(22, 163, 74, 0.08)",
    weeks: "16 weeks",
    desc:
      "A comprehensive journey through the Sephirot, the Paths, and the Four Worlds. Learn to navigate the Tree of Life as a map of divine reality and a guide for inner transformation. No prior experience required.",
  },
  {
    title: "Practical Alchemy & Spagyrics",
    tradition: "Alchemy",
    level: "Advanced",
    levelColor: "#dc2626",
    levelBg: "rgba(220, 38, 38, 0.08)",
    weeks: "20 weeks",
    desc:
      "The Royal Art in both its inner and outer expressions. Work with laboratory procedures, planetary correspondences, and the philosophical dimensions of the Great Work. Prerequisites: Hermetic Corpus or equivalent.",
  },
  {
    title: "Foundations of Ritual Magic",
    tradition: "Ritual",
    level: "Beginner",
    levelColor: "#16a34a",
    levelBg: "rgba(22, 163, 74, 0.08)",
    weeks: "8 weeks",
    desc:
      "Learn the essential skills of ceremonial magic: constructing ritual space, working with elemental forces, basic invocation and banishing, and the foundational techniques of Western ritual practice.",
  },
  {
    title: "Astrology: The Celestial Map",
    tradition: "Divination",
    level: "Beginner",
    levelColor: "#16a34a",
    levelBg: "rgba(22, 163, 74, 0.08)",
    weeks: "12 weeks",
    desc:
      "Master the language of the stars. This course covers chart calculation, planetary dignities, house systems, aspects, and interpretation — using traditional techniques rooted in Hellenistic and Renaissance astrology.",
  },
  {
    title: "Tarot as Living Symbol",
    tradition: "Divination",
    level: "Beginner",
    levelColor: "#16a34a",
    levelBg: "rgba(22, 163, 74, 0.08)",
    weeks: "6 weeks",
    desc:
      "Explore the 78 cards of the Tarot as a complete symbolic system. Learn their Kabbalistic, astrological, and elemental correspondences alongside practical reading techniques and contemplative methods.",
  },
  {
    title: "Enochian Angelick Language",
    tradition: "Ritual",
    level: "Advanced",
    levelColor: "#dc2626",
    levelBg: "rgba(220, 38, 38, 0.08)",
    weeks: "24 weeks",
    desc:
      "The angelic language received by John Dee and Edward Kelley, explored in full. Covers the Calls, the Aethyrs, Enochian tablet system, and advanced ritual applications. Most demanding course in our curriculum.",
  },
  {
    title: "Sacred Geometry & Gematria",
    tradition: "Cosmology",
    level: "Intermediate",
    levelColor: "#c9a84c",
    levelBg: "rgba(201, 168, 76, 0.08)",
    weeks: "10 weeks",
    desc:
      "Uncover the mathematical language underlying creation. From the Platonic solids to the Golden Ratio, from Hebrew letter-numbers to the Great Architectural mysteries — number as the bridge between matter and spirit.",
  },
];

const filterTabs = ["All", "Hermetics", "Kabbalah", "Alchemy", "Ritual", "Divination", "Cosmology"];

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        title="Our Courses"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Courses" },
        ]}
      />

      <section style={{ backgroundColor: "#05030d", padding: "5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>

          {/* Intro text */}
          <div style={{ textAlign: "center", marginBottom: "3rem", maxWidth: "750px", margin: "0 auto 3rem" }}>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.15rem",
                color: "#b8a8cc",
                lineHeight: 1.8,
              }}
            >
              Our curriculum spans twelve esoteric traditions, structured across three tiers of study.
              Each course is developed and taught by initiated faculty members with decades of practical
              and scholarly experience.
            </p>
          </div>

          {/* Filter tabs (visual only — server component) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "center",
              marginBottom: "3.5rem",
            }}
          >
            {filterTabs.map((tab, i) => (
              <span
                key={tab}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.5rem 1.25rem",
                  cursor: "pointer",
                  border: i === 0 ? "1px solid #c9a84c" : "1px solid rgba(201, 168, 76, 0.25)",
                  color: i === 0 ? "#f0d060" : "#b8a8cc",
                  backgroundColor: i === 0 ? "rgba(201, 168, 76, 0.1)" : "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Level legend */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              justifyContent: "center",
              marginBottom: "3rem",
            }}
          >
            {[
              { label: "Beginner", color: "#16a34a" },
              { label: "Intermediate", color: "#c9a84c" },
              { label: "Advanced", color: "#dc2626" },
            ].map((level) => (
              <div
                key={level.label}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: level.color,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.9rem",
                    color: "#b8a8cc",
                  }}
                >
                  {level.label}
                </span>
              </div>
            ))}
          </div>

          {/* Courses grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {courses.map((course, i) => (
              <div
                key={i}
                className="mystic-card"
                style={{
                  backgroundColor: "#0f0b1a",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: course.levelColor,
                    opacity: 0.5,
                  }}
                />

                {/* Badges row */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#b8a8cc",
                      border: "1px solid rgba(184, 168, 204, 0.3)",
                      padding: "0.2rem 0.55rem",
                    }}
                  >
                    {course.tradition}
                  </span>
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: course.levelColor,
                      border: `1px solid ${course.levelColor}55`,
                      backgroundColor: course.levelBg,
                      padding: "0.2rem 0.55rem",
                    }}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "#f0e6d3",
                    marginBottom: "0.75rem",
                    letterSpacing: "0.04em",
                    lineHeight: 1.3,
                  }}
                >
                  {course.title}
                </h3>

                {/* Duration */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    marginBottom: "1rem",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="#6d28d9" strokeWidth="1" />
                    <line x1="6" y1="3" x2="6" y2="6" stroke="#6d28d9" strokeWidth="1.2" />
                    <line x1="6" y1="6" x2="8.5" y2="8" stroke="#6d28d9" strokeWidth="1.2" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "0.85rem",
                      color: "#7c3aed",
                      fontStyle: "italic",
                    }}
                  >
                    {course.weeks}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.95rem",
                    color: "#b8a8cc",
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: "1.5rem",
                  }}
                >
                  {course.desc}
                </p>

                {/* CTA */}
                <Link
                  href="/contact"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#05030d",
                    textDecoration: "none",
                    padding: "0.7rem 1rem",
                    background: "linear-gradient(135deg, #c9a84c, #f0d060)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div
            style={{
              textAlign: "center",
              marginTop: "4rem",
              padding: "2rem",
              borderTop: "1px solid rgba(201, 168, 76, 0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "IM Fell English, serif",
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "#b8a8cc",
                marginBottom: "1.5rem",
              }}
            >
              Not sure where to begin? Our faculty will guide you to the right starting point.
            </p>
            <Link href="/contact" className="btn-gold-outline">
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
