import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming rituals, workshops, study groups, and ceremonies at the Aeternal Temple of Obsidian Flame.",
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

const events = [
  {
    month: "JUN",
    day: "21",
    type: "Ritual",
    typeColor: "#e05c1a",
    title: "Summer Solstice Ritual Circle",
    desc:
      "Our most sacred annual ceremony, marking the peak of the solar year with traditional rites, chant, and communal working. All members of Initiate level and above are welcome. New participants should contact us in advance.",
    location: "In-Person",
    locationIcon: "◆",
    time: "8:00 PM EDT",
  },
  {
    month: "JUN",
    day: "28",
    type: "Workshop",
    typeColor: "#7c3aed",
    title: "Introduction to the Hermetic Principles",
    desc:
      "A two-hour introductory workshop exploring the Seven Hermetic Principles from the Kybalion and Corpus Hermeticum. Open to all levels. Attendees receive a curated reading list and follow-up materials.",
    location: "Online",
    locationIcon: "●",
    time: "7:00 PM EDT",
  },
  {
    month: "JUL",
    day: "5",
    type: "Study Group",
    typeColor: "#16a34a",
    title: "Kabbalah Study Circle: Binah",
    desc:
      "Monthly deep-dive into a single Sephirah. This session focuses on Binah — the Great Mother, Understanding, and the third Sephirah of the Tree. Suitable for intermediate students with basic Tree knowledge.",
    location: "Online",
    locationIcon: "●",
    time: "6:30 PM EDT",
  },
  {
    month: "JUL",
    day: "12",
    type: "Workshop",
    typeColor: "#7c3aed",
    title: "Tarot & Astrology Integration Workshop",
    desc:
      "Discover the rich correspondences between the 78 Tarot arcana and the celestial map. This hands-on workshop teaches practical synthesis methods for combined Tarot/astrology readings.",
    location: "In-Person",
    locationIcon: "◆",
    time: "2:00 PM EDT",
  },
  {
    month: "JUL",
    day: "19",
    type: "Orientation",
    typeColor: "#c9a84c",
    title: "New Student Orientation",
    desc:
      "A welcoming introduction to the Temple's community, curriculum, and initiatory structure. Meet faculty, learn about available courses, and ask questions in a relaxed, open setting.",
    location: "Online",
    locationIcon: "●",
    time: "5:00 PM EDT",
  },
  {
    month: "AUG",
    day: "1",
    type: "Ritual",
    typeColor: "#e05c1a",
    title: "Lammas Seasonal Rite",
    desc:
      "The first harvest rite of the year — honoring Lugh, the grain king, and the turning of the solar wheel. Traditional ceremony with communal feast to follow. Open to all members.",
    location: "In-Person",
    locationIcon: "◆",
    time: "7:00 PM EDT",
  },
];

const eventTypes = ["Ritual", "Workshop", "Study Group", "Orientation", "Lecture", "Ceremony"];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events & Rituals"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Events" },
        ]}
      />

      <section style={{ backgroundColor: "#05030d", padding: "5rem 1.5rem 6rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* ── EVENTS LIST (left) ── */}
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#f0e6d3",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Upcoming Events
              </h2>
              <div
                style={{
                  height: "1px",
                  background: "linear-gradient(to right, #c9a84c, transparent)",
                  marginBottom: "0",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {events.map((event, i) => (
                <article
                  key={i}
                  className="mystic-card"
                  style={{
                    backgroundColor: "#0f0b1a",
                    padding: "1.75rem",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "1.5rem",
                    alignItems: "start",
                  }}
                >
                  {/* Date block */}
                  <div
                    style={{
                      textAlign: "center",
                      minWidth: "70px",
                      borderRight: "1px solid rgba(201, 168, 76, 0.2)",
                      paddingRight: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "#e05c1a",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {event.month}
                    </div>
                    <div
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontWeight: 700,
                        fontSize: "2.5rem",
                        color: "#c9a84c",
                        lineHeight: 1,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {event.day}
                    </div>
                    <div
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "0.75rem",
                        color: "#b8a8cc",
                        fontStyle: "italic",
                      }}
                    >
                      {event.time}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    {/* Type tag */}
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: event.typeColor,
                        border: `1px solid ${event.typeColor}55`,
                        backgroundColor: `${event.typeColor}10`,
                        padding: "0.2rem 0.6rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {event.type}
                    </span>

                    <h3
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontWeight: 600,
                        fontSize: "1.05rem",
                        color: "#f0e6d3",
                        letterSpacing: "0.04em",
                        marginBottom: "0.75rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {event.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "0.97rem",
                        color: "#b8a8cc",
                        lineHeight: 1.7,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {event.desc}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      {/* Location badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span
                          style={{
                            color:
                              event.location === "In-Person" ? "#e05c1a" : "#7c3aed",
                            fontSize: "0.6rem",
                          }}
                        >
                          {event.locationIcon}
                        </span>
                        <span
                          style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontSize: "0.9rem",
                            color: "#b8a8cc",
                            fontStyle: "italic",
                          }}
                        >
                          {event.location}
                        </span>
                      </div>

                      {/* Register link */}
                      <Link
                        href="/contact"
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#c9a84c",
                          textDecoration: "none",
                          border: "1px solid rgba(201, 168, 76, 0.4)",
                          padding: "0.35rem 0.9rem",
                          transition: "all 0.2s ease",
                        }}
                      >
                        Register →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ── SIDEBAR (right) ── */}
          <aside style={{ position: "sticky", top: "100px" }}>
            {/* Event Types filter */}
            <div
              style={{
                backgroundColor: "#0f0b1a",
                border: "1px solid rgba(201, 168, 76, 0.15)",
                padding: "1.75rem",
                marginBottom: "1.75rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  marginBottom: "1.25rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
                }}
              >
                Event Types
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {eventTypes.map((type, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#b8a8cc",
                      border: "1px solid rgba(184, 168, 204, 0.25)",
                      padding: "0.3rem 0.7rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "1.25rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(201, 168, 76, 0.1)",
                }}
              >
                {[
                  { label: "In-Person", color: "#e05c1a", icon: "◆" },
                  { label: "Online", color: "#7c3aed", icon: "●" },
                ].map((loc) => (
                  <div key={loc.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ color: loc.color, fontSize: "0.5rem" }}>{loc.icon}</span>
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "0.85rem",
                        color: "#b8a8cc",
                      }}
                    >
                      {loc.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter signup */}
            <div
              style={{
                background: "linear-gradient(135deg, #1a0d2e, #2d1452)",
                border: "1px solid rgba(201, 168, 76, 0.2)",
                padding: "1.75rem",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                <span style={{ color: "#c9a84c", fontSize: "1.5rem" }}>✦</span>
              </div>
              <h3
                style={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#f0e6d3",
                  marginBottom: "0.75rem",
                  textAlign: "center",
                }}
              >
                Sacred Dispatches
              </h3>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "0.95rem",
                  color: "#b8a8cc",
                  lineHeight: 1.6,
                  marginBottom: "1.25rem",
                  textAlign: "center",
                }}
              >
                Receive event announcements, lunar calendars, and teachings in your inbox.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    backgroundColor: "rgba(5, 3, 13, 0.5)",
                    border: "1px solid rgba(201, 168, 76, 0.3)",
                    color: "#f0e6d3",
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1rem",
                    padding: "0.75rem 1rem",
                    outline: "none",
                    width: "100%",
                  }}
                />
                <button
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#05030d",
                    padding: "0.75rem",
                    background: "linear-gradient(135deg, #c9a84c, #f0d060)",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="grid-template-columns: 1fr 320px"] {
            grid-template-columns: 1fr !important;
          }
          aside[style*="sticky"] {
            position: static !important;
          }
        }
      `}</style>
    </>
  );
}
