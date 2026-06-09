import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sacred Writings",
  description:
    "Explore articles, essays, and teachings from the faculty of the Aeternal Temple of Obsidian Flame.",
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
                {i > 0 && <span style={{ color: "#6d28d9", fontSize: "0.6rem" }}>◆</span>}
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

const articles = [
  {
    category: "Kabbalah",
    categoryColor: "#7c3aed",
    title: "Understanding the Sephirot: A Beginner's Guide",
    excerpt:
      "The ten Sephirot of the Kabbalistic Tree of Life form one of the most complete maps of divine reality ever conceived. This introduction unpacks each sphere and its correspondences for the new student.",
    author: "Priestess Seraphina Cross",
    date: "May 28, 2026",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg, #1a0d2e 0%, #2d1452 100%)",
  },
  {
    category: "Alchemy",
    categoryColor: "#e05c1a",
    title: "Alchemy of the Soul: Inner and Outer Transformation",
    excerpt:
      "Beyond laboratory procedures and metallic operations, alchemy has always described a profound process of psychological and spiritual transformation. Magister Vorn explores the inner dimensions of the Great Work.",
    author: "Magister Alistair Vorn",
    date: "May 14, 2026",
    readTime: "11 min read",
    gradient: "linear-gradient(135deg, #1a0d2e 0%, #2d1010 100%)",
  },
  {
    category: "Astrology",
    categoryColor: "#16a34a",
    title: "Reading the Celestial Map: Introduction to Natal Charts",
    excerpt:
      "Your natal chart is a snapshot of the sky at your first breath — a symbolic map of your soul's potential and the patterns woven into your life. Scholar Moon guides you through the essential elements.",
    author: "Scholar Lyra Moon",
    date: "April 30, 2026",
    readTime: "9 min read",
    gradient: "linear-gradient(135deg, #0a1a0d 0%, #0f1a0d 100%)",
  },
  {
    category: "Tarot",
    categoryColor: "#c9a84c",
    title: "The Fool's Journey: Tarot as a Tool for Self-Knowledge",
    excerpt:
      "The twenty-two Major Arcana tell a complete story of the soul's journey from innocent beginnings through death and rebirth to ultimate illumination. Explore each archetype as a mirror of inner experience.",
    author: "Priestess Seraphina Cross",
    date: "April 12, 2026",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg, #1a1500 0%, #2d1452 100%)",
  },
  {
    category: "Ritual Craft",
    categoryColor: "#b8a8cc",
    title: "Ritual Space: Creating Sacred Environment",
    excerpt:
      "Before any ceremony can unfold, the space must be prepared. Brother Ash shares the principles and practical techniques for consecrating, protecting, and enlivening the ritual circle.",
    author: "Brother Dorian Ash",
    date: "March 25, 2026",
    readTime: "10 min read",
    gradient: "linear-gradient(135deg, #0f0b1a 0%, #1a0d2e 100%)",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Sacred Writings"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      <section style={{ backgroundColor: "#05030d", padding: "5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* ── FEATURED ARTICLE ── */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <h2
                style={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                }}
              >
                Featured Article
              </h2>
              <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(201, 168, 76, 0.2)" }} />
            </div>

            <article
              className="mystic-card"
              style={{
                backgroundColor: "#0f0b1a",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 50%, #2d1452 0%, #1a0d2e 40%, #05030d 100%)",
                  minHeight: "360px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative SVG */}
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                  style={{ opacity: 0.6, animation: "float 6s ease-in-out infinite" }}
                >
                  <circle cx="100" cy="100" r="90" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4" />
                  <circle cx="100" cy="100" r="60" stroke="#6d28d9" strokeWidth="0.5" strokeOpacity="0.4" />
                  <polygon
                    points="100,20 173,65 173,135 100,180 27,135 27,65"
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                  <path
                    d="M100 55 C100 55 82 73 82 87 C82 96.94 90.06 105 100 105 C109.94 105 118 96.94 118 87 C118 73 100 55 100 55Z"
                    fill="url(#featFlame)"
                  />
                  <defs>
                    <linearGradient id="featFlame" x1="100" y1="55" x2="100" y2="105" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#f0d060" />
                      <stop offset="60%" stopColor="#e05c1a" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Category label overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    left: "1.5rem",
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#c9a84c",
                    border: "1px solid rgba(201, 168, 76, 0.5)",
                    backgroundColor: "rgba(5, 3, 13, 0.7)",
                    padding: "0.3rem 0.75rem",
                  }}
                >
                  Hermetics
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "2.5rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                      border: "1px solid rgba(201, 168, 76, 0.4)",
                      padding: "0.2rem 0.6rem",
                    }}
                  >
                    Featured
                  </span>
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "0.85rem",
                      color: "#b8a8cc",
                      fontStyle: "italic",
                    }}
                  >
                    June 1, 2026 · 14 min read
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    color: "#f0e6d3",
                    letterSpacing: "0.04em",
                    lineHeight: 1.3,
                    marginBottom: "1.25rem",
                  }}
                >
                  The Seven Hermetic Principles: A Modern Interpretation
                </h2>

                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.05rem",
                    color: "#b8a8cc",
                    lineHeight: 1.75,
                    marginBottom: "2rem",
                  }}
                >
                  The Kybalion, published anonymously in 1908 and attributed to the Three Initiates, distilled the Hermetic tradition into seven universal principles. Magister Vorn examines how these ancient axioms — Mentalism, Correspondence, Vibration, Polarity, Rhythm, Cause and Effect, and Gender — operate not merely as philosophical abstractions but as living forces perceivable in everyday experience and verifiable through practical working.
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(201, 168, 76, 0.15)",
                    paddingTop: "1.25rem",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(201, 168, 76, 0.15)",
                        border: "1px solid rgba(201, 168, 76, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Cinzel, serif",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        color: "#c9a84c",
                      }}
                    >
                      AV
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "0.7rem",
                          letterSpacing: "0.08em",
                          color: "#f0e6d3",
                        }}
                      >
                        Magister Alistair Vorn
                      </div>
                      <div
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "0.8rem",
                          color: "#b8a8cc",
                          fontStyle: "italic",
                        }}
                      >
                        Hermetics &amp; Alchemy
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/blog"
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                      textDecoration: "none",
                      border: "1px solid rgba(201, 168, 76, 0.4)",
                      padding: "0.45rem 1rem",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>

            <style>{`
              @media (max-width: 700px) {
                article[style*="grid-template-columns: 1fr 1fr"] {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </div>

          {/* ── MORE ARTICLES ── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <h2
                style={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  whiteSpace: "nowrap",
                }}
              >
                Recent Writings
              </h2>
              <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(201, 168, 76, 0.2)" }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.75rem",
              }}
            >
              {articles.map((article, i) => (
                <article
                  key={i}
                  className="mystic-card"
                  style={{
                    backgroundColor: "#0f0b1a",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Image placeholder */}
                  <div
                    style={{
                      background: article.gradient,
                      height: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {/* Small decorative SVG */}
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" style={{ opacity: 0.5 }}>
                      <circle cx="35" cy="35" r="30" stroke={article.categoryColor} strokeWidth="1" strokeOpacity="0.6" />
                      <circle cx="35" cy="35" r="18" stroke={article.categoryColor} strokeWidth="0.5" strokeOpacity="0.4" />
                      <circle cx="35" cy="35" r="5" fill={article.categoryColor} opacity="0.7" />
                    </svg>

                    {/* Category badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0.75rem",
                        left: "0.75rem",
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: article.categoryColor,
                        border: `1px solid ${article.categoryColor}55`,
                        backgroundColor: "rgba(5, 3, 13, 0.7)",
                        padding: "0.2rem 0.6rem",
                      }}
                    >
                      {article.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "#f0e6d3",
                        letterSpacing: "0.04em",
                        lineHeight: 1.35,
                        marginBottom: "0.875rem",
                      }}
                    >
                      {article.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "0.95rem",
                        color: "#b8a8cc",
                        lineHeight: 1.65,
                        marginBottom: "1.25rem",
                        flex: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div
                      style={{
                        borderTop: "1px solid rgba(201, 168, 76, 0.12)",
                        paddingTop: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.6rem",
                            letterSpacing: "0.08em",
                            color: "#f0e6d3",
                            marginBottom: "0.15rem",
                          }}
                        >
                          {article.author}
                        </div>
                        <div
                          style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontSize: "0.78rem",
                            color: "#b8a8cc",
                            fontStyle: "italic",
                          }}
                        >
                          {article.date} · {article.readTime}
                        </div>
                      </div>

                      <Link
                        href="/blog"
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "0.55rem",
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#c9a84c",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Load more */}
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/blog" className="btn-gold-outline">
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
