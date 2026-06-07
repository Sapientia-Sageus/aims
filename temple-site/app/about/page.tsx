import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Aeternal Temple of Obsidian Flame — our heritage, mission, philosophy, and the traditions we teach.",
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
        {/* Breadcrumb */}
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
                  <span
                    style={{
                      color: "#6d28d9",
                      fontSize: "0.6rem",
                    }}
                  >
                    ◆
                  </span>
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

        {/* Gold ornament below title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1.25rem",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(to right, transparent, #c9a84c)",
            }}
          />
          <span style={{ color: "#c9a84c", fontSize: "1rem" }}>✦</span>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(to left, transparent, #c9a84c)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

const traditions = [
  "Hermeticism",
  "Kabbalah",
  "Alchemy",
  "Theurgy",
  "Astrology",
  "Tarot",
  "Rosicrucianism",
  "Enochian Magic",
  "Norse Runes",
  "Sacred Geometry",
  "Dream Work",
  "Ritual Craft",
];

const faculty = [
  {
    name: "Magister Alistair Vorn",
    role: "Hermetics & Alchemy",
    bio: "A practitioner for over three decades, Magister Vorn holds advanced initiations in the Hermetic Order of the Golden Dawn lineage and has published extensively on the philosophical dimensions of alchemical laboratory work. He leads our flagship Hermetic Corpus course and oversees the Temple's alchemical laboratory.",
    initials: "AV",
    color: "#c9a84c",
  },
  {
    name: "Priestess Seraphina Cross",
    role: "Kabbalah & Tarot",
    bio: "Ordained in the Western Kabbalah tradition, Priestess Cross is a gifted teacher who brings the living Tree of Life into practical daily application. Her Tarot courses weave together symbology, Kabbalistic correspondence, and intuitive development into a seamless whole.",
    initials: "SC",
    color: "#7c3aed",
  },
  {
    name: "Brother Dorian Ash",
    role: "Ritual Craft & Theurgy",
    bio: "Trained in both ceremonial and folk traditions, Brother Ash specializes in the construction of sacred space, the art of invocation, and the theurgic ascent through the planetary spheres. His work draws on Iamblichus, the PGM, and decades of personal ritual experience.",
    initials: "DA",
    color: "#e05c1a",
  },
  {
    name: "Scholar Lyra Moon",
    role: "Astrology & Sacred Geometry",
    bio: "Holding advanced degrees in both history of science and traditional astrology, Scholar Moon brings unmatched academic rigor to the celestial arts. Her research into Platonic mathematics and their expression in sacred architecture has been published in leading esoteric journals.",
    initials: "LM",
    color: "#16a34a",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About the Temple"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      {/* ── OUR HERITAGE ── */}
      <section style={{ backgroundColor: "#05030d", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "1rem",
              }}
            >
              Since 1987
            </p>
            <h2
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                color: "#f0e6d3",
                letterSpacing: "0.08em",
                marginBottom: "2rem",
              }}
            >
              Our Heritage
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.15rem",
                color: "#f0e6d3",
                lineHeight: 1.8,
              }}
            >
              In the autumn of 1987, seven seekers gathered in a cramped Philadelphia apartment to study
              the Corpus Hermeticum by candlelight. They had no temple, no curriculum, and no formal
              structure — only an insatiable hunger for authentic esoteric knowledge and a shared
              frustration with the superficial treatment of the Western occult tradition in popular
              culture.
            </p>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.15rem",
                color: "#b8a8cc",
                lineHeight: 1.8,
              }}
            >
              What began as an informal study circle evolved, over the following decade, into a
              structured school. By 1995, the Temple had established its first formal initiatory
              curriculum, drawing on authentic lineages in Hermeticism, Kabbalah, and ceremonial magic.
              In 2001, the Temple opened its first permanent lodge space, welcoming students from across
              the United States and eventually from every continent.
            </p>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.15rem",
                color: "#b8a8cc",
                lineHeight: 1.8,
              }}
            >
              The transition to digital learning in 2012 allowed us to reach thousands of students who
              could not travel to Philadelphia, while maintaining the depth and rigor that define the
              Temple's approach. Today, with over 2,400 students across twelve active traditions, the
              Aeternal Temple of Obsidian Flame stands as a testament to the enduring power of hidden
              wisdom to transform individual lives and, through those individuals, the world.
            </p>
          </div>

          {/* Timeline markers */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0",
              justifyContent: "center",
              marginTop: "3.5rem",
              borderTop: "1px solid rgba(201, 168, 76, 0.2)",
              paddingTop: "2.5rem",
            }}
          >
            {[
              { year: "1987", label: "Founded" },
              { year: "1995", label: "First Curriculum" },
              { year: "2001", label: "Permanent Lodge" },
              { year: "2012", label: "Online Launch" },
              { year: "2026", label: "Present Day" },
            ].map((milestone, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "0 1.5rem",
                  borderRight:
                    i < 4 ? "1px solid rgba(201, 168, 76, 0.15)" : "none",
                  flex: "1",
                  minWidth: "100px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "#c9a84c",
                    lineHeight: 1,
                  }}
                >
                  {milestone.year}
                </div>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.85rem",
                    color: "#b8a8cc",
                    marginTop: "0.3rem",
                    fontStyle: "italic",
                  }}
                >
                  {milestone.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & PHILOSOPHY ── */}
      <section
        style={{
          backgroundColor: "#0f0b1a",
          padding: "6rem 1.5rem",
          borderTop: "1px solid rgba(201, 168, 76, 0.1)",
          borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#e05c1a",
                marginBottom: "1rem",
              }}
            >
              Our Foundation
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
              Mission &amp; Philosophy
            </h2>
          </div>

          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.1rem",
              color: "#b8a8cc",
              lineHeight: 1.8,
              textAlign: "center",
              maxWidth: "750px",
              margin: "0 auto 4rem",
            }}
          >
            The Temple&apos;s mission is to preserve, transmit, and evolve the living wisdom of the
            Western esoteric tradition through rigorous scholarship, authentic initiatory practice, and
            a genuine community of seekers. Our philosophy rests on three inseparable pillars:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Open book */}
                    <rect x="4" y="12" width="18" height="24" rx="1" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
                    <rect x="26" y="12" width="18" height="24" rx="1" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
                    <line x1="4" y1="24" x2="22" y2="24" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />
                    <line x1="26" y1="24" x2="44" y2="24" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />
                    <line x1="4" y1="30" x2="22" y2="30" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />
                    <line x1="26" y1="30" x2="44" y2="30" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />
                    <line x1="22" y1="12" x2="22" y2="36" stroke="#c9a84c" strokeWidth="1.5" />
                    <line x1="26" y1="12" x2="26" y2="36" stroke="#c9a84c" strokeWidth="1.5" />
                    <path d="M24 8 L24 40" stroke="#c9a84c" strokeWidth="2" />
                  </svg>
                ),
                title: "Study",
                desc:
                  "True wisdom is not received passively — it is excavated through rigorous textual engagement, historical research, and the persistent questioning of received ideas. Our curriculum demands genuine intellectual commitment.",
              },
              {
                icon: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Hands raised / ritual gesture */}
                    <circle cx="24" cy="24" r="16" stroke="#e05c1a" strokeWidth="1.5" fill="none" />
                    <circle cx="24" cy="24" r="8" stroke="#e05c1a" strokeWidth="1" fill="none" strokeOpacity="0.5" />
                    <path
                      d="M24 8 C24 8 20 14 20 20 C20 23.31 21.79 26 24 26 C26.21 26 28 23.31 28 20 C28 14 24 8 24 8Z"
                      fill="url(#pillarFlame)"
                    />
                    <defs>
                      <linearGradient id="pillarFlame" x1="24" y1="8" x2="24" y2="26" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#f0d060" />
                        <stop offset="60%" stopColor="#e05c1a" />
                        <stop offset="100%" stopColor="#6d28d9" />
                      </linearGradient>
                    </defs>
                    <line x1="12" y1="36" x2="36" y2="36" stroke="#e05c1a" strokeWidth="1.5" strokeOpacity="0.6" />
                    <line x1="8" y1="40" x2="40" y2="40" stroke="#e05c1a" strokeWidth="1" strokeOpacity="0.3" />
                  </svg>
                ),
                title: "Practice",
                desc:
                  "Knowledge without practice is philosophy; practice without knowledge is superstition. The Temple bridges both worlds, providing structured practical exercises, meditations, ritual work, and laboratory operations.",
              },
              {
                icon: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Star / initiation symbol */}
                    <polygon
                      points="24,4 30,18 44,18 33,27 37,42 24,33 11,42 15,27 4,18 18,18"
                      stroke="#7c3aed"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <polygon
                      points="24,12 27,20 36,20 29,25 32,34 24,29 16,34 19,25 12,20 21,20"
                      fill="rgba(109, 40, 217, 0.2)"
                      stroke="#7c3aed"
                      strokeWidth="0.5"
                    />
                    <circle cx="24" cy="24" r="4" fill="#7c3aed" opacity="0.8" />
                  </svg>
                ),
                title: "Initiation",
                desc:
                  "The esoteric path is ultimately a path of self-transformation. Through graduated initiatory experiences — whether in-person or adapted for distance students — the Temple guides seekers through genuine threshold moments.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="mystic-card"
                style={{
                  backgroundColor: "#05030d",
                  padding: "2.5rem 2rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    filter: "drop-shadow(0 0 10px rgba(201, 168, 76, 0.3))",
                  }}
                >
                  {pillar.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#c9a84c",
                    marginBottom: "1rem",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1rem",
                    color: "#b8a8cc",
                    lineHeight: 1.7,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRADITIONS ── */}
      <section style={{ backgroundColor: "#05030d", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#7c3aed",
              marginBottom: "1rem",
            }}
          >
            Twelve Sacred Streams
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
            Traditions We Teach
          </h2>
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.1rem",
              color: "#b8a8cc",
              lineHeight: 1.7,
              marginBottom: "3rem",
              maxWidth: "650px",
              margin: "0 auto 3rem",
            }}
          >
            The Temple encompasses twelve living traditions, each with its own language, methodology,
            and path to the hidden center. Our faculty teach these traditions authentically, within
            their proper historical and philosophical contexts.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            {traditions.map((tradition, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: i % 3 === 0 ? "#c9a84c" : i % 3 === 1 ? "#b8a8cc" : "#7c3aed",
                  border: `1px solid ${i % 3 === 0 ? "rgba(201, 168, 76, 0.4)" : i % 3 === 1 ? "rgba(184, 168, 204, 0.3)" : "rgba(124, 58, 237, 0.4)"}`,
                  padding: "0.5rem 1.1rem",
                  backgroundColor:
                    i % 3 === 0
                      ? "rgba(201, 168, 76, 0.05)"
                      : i % 3 === 1
                      ? "rgba(184, 168, 204, 0.05)"
                      : "rgba(124, 58, 237, 0.05)",
                  transition: "all 0.2s ease",
                }}
              >
                {tradition}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACULTY ── */}
      <section
        style={{
          backgroundColor: "#0f0b1a",
          padding: "6rem 1.5rem",
          borderTop: "1px solid rgba(201, 168, 76, 0.1)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "1rem",
              }}
            >
              Masters of the Craft
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
              Our Faculty
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
            }}
          >
            {faculty.map((member, i) => (
              <div
                key={i}
                className="mystic-card"
                style={{
                  backgroundColor: "#1a0d2e",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    border: `2px solid ${member.color}60`,
                    backgroundColor: `${member.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: member.color,
                    boxShadow: `0 0 20px ${member.color}30`,
                  }}
                >
                  {member.initials}
                </div>

                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#f0e6d3",
                    letterSpacing: "0.04em",
                    marginBottom: "0.4rem",
                  }}
                >
                  {member.name}
                </h3>

                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                    color: member.color,
                    marginBottom: "1.25rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  {member.role}
                </p>

                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: `linear-gradient(to right, transparent, ${member.color}, transparent)`,
                    margin: "0 auto 1.25rem",
                  }}
                />

                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.95rem",
                    color: "#b8a8cc",
                    lineHeight: 1.7,
                  }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
