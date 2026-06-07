"use client";

import { useState } from "react";
import Link from "next/link";

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

const tiers = [
  {
    name: "Seeker",
    price: "Free",
    color: "#b8a8cc",
    borderColor: "rgba(184, 168, 204, 0.4)",
    bgColor: "rgba(184, 168, 204, 0.05)",
    desc: "Begin your exploration of the Temple's public offerings.",
    features: [
      "Access to the full Sacred Writings archive",
      "Registration for free public events",
      "Monthly newsletter & lunar calendar",
      "Access to introductory resources",
    ],
    cta: "Join Free",
    isFeatured: false,
  },
  {
    name: "Initiate",
    price: "$33",
    period: "/month",
    color: "#c9a84c",
    borderColor: "rgba(201, 168, 76, 0.6)",
    bgColor: "rgba(201, 168, 76, 0.05)",
    desc: "Full access to the Temple's complete educational curriculum.",
    features: [
      "Everything in Seeker",
      "Access to all 34 courses",
      "Temple community forums & study circles",
      "Monthly live Q&A with faculty",
      "Digital library of esoteric texts",
      "Course completion certificates",
    ],
    cta: "Become an Initiate",
    isFeatured: true,
  },
  {
    name: "Adept",
    price: "$77",
    period: "/month",
    color: "#e05c1a",
    borderColor: "rgba(224, 92, 26, 0.5)",
    bgColor: "rgba(224, 92, 26, 0.05)",
    desc: "The complete Temple experience with private mentorship.",
    features: [
      "Everything in Initiate",
      "One-on-one monthly mentorship session",
      "Access to advanced & restricted materials",
      "Private initiatory ceremonies (in-person)",
      "Priority enrollment in workshops",
      "Dedicated student advisor",
    ],
    cta: "Apply for Adept",
    isFeatured: false,
  },
];

const areasOfInterest = [
  "Hermetics",
  "Kabbalah",
  "Alchemy",
  "Ritual",
  "Divination",
  "Cosmology",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    interests: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        title="Join the Temple"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Join" },
        ]}
      />

      <section style={{ backgroundColor: "#05030d", padding: "5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Intro */}
          <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "700px", margin: "0 auto 4rem" }}>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.15rem",
                color: "#b8a8cc",
                lineHeight: 1.8,
              }}
            >
              The Temple welcomes sincere seekers at every stage of the path. Choose the membership
              level that aligns with your commitment and reach out to us with your questions.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 480px",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {/* ── LEFT: Membership Tiers ── */}
            <div>
              <h2
                style={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#f0e6d3",
                  marginBottom: "2rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
                }}
              >
                Membership Tiers
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {tiers.map((tier, i) => (
                  <div
                    key={i}
                    style={{
                      border: `1px solid ${tier.borderColor}`,
                      backgroundColor: tier.bgColor,
                      padding: "2rem",
                      position: "relative",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Featured badge */}
                    {tier.isFeatured && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-1px",
                          right: "1.5rem",
                          fontFamily: "Cinzel, serif",
                          fontSize: "0.55rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "#05030d",
                          backgroundColor: "#c9a84c",
                          padding: "0.3rem 0.75rem",
                        }}
                      >
                        Most Popular
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: tier.color,
                        }}
                      >
                        {tier.name}
                      </h3>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem" }}>
                        <span
                          style={{
                            fontFamily: "Cinzel, serif",
                            fontWeight: 700,
                            fontSize: "1.75rem",
                            color: tier.color,
                          }}
                        >
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span
                            style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontSize: "0.95rem",
                              color: "#b8a8cc",
                              fontStyle: "italic",
                            }}
                          >
                            {tier.period}
                          </span>
                        )}
                      </div>
                    </div>

                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1rem",
                        color: "#b8a8cc",
                        fontStyle: "italic",
                        marginBottom: "1.25rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {tier.desc}
                    </p>

                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {tier.features.map((feature, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                          <span style={{ color: tier.color, fontSize: "0.65rem", marginTop: "0.3rem", flexShrink: 0 }}>✦</span>
                          <span
                            style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontSize: "0.97rem",
                              color: "#b8a8cc",
                              lineHeight: 1.5,
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        padding: "0.75rem 1.5rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        ...(tier.isFeatured
                          ? {
                              background: "linear-gradient(135deg, #c9a84c, #f0d060)",
                              color: "#05030d",
                              border: "none",
                            }
                          : {
                              backgroundColor: "transparent",
                              color: tier.color,
                              border: `1px solid ${tier.borderColor}`,
                            }),
                      }}
                    >
                      {tier.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Contact Form ── */}
            <div>
              <h2
                style={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#f0e6d3",
                  marginBottom: "2rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
                }}
              >
                Send an Inquiry
              </h2>

              {submitted ? (
                <div
                  style={{
                    backgroundColor: "rgba(201, 168, 76, 0.08)",
                    border: "1px solid rgba(201, 168, 76, 0.4)",
                    padding: "3rem 2rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", color: "#c9a84c", marginBottom: "1rem" }}>✦</div>
                  <h3
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      letterSpacing: "0.1em",
                      color: "#f0e6d3",
                      marginBottom: "1rem",
                    }}
                  >
                    Message Received
                  </h3>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontStyle: "italic",
                      fontSize: "1.05rem",
                      color: "#b8a8cc",
                      lineHeight: 1.6,
                    }}
                  >
                    A member of our faculty will reach out within 3 business days.
                    May your path be illumined.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Name */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#c9a84c",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(15, 11, 26, 0.8)",
                        border: "1px solid rgba(201, 168, 76, 0.25)",
                        color: "#f0e6d3",
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1rem",
                        padding: "0.875rem 1rem",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(201, 168, 76, 0.6)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(201, 168, 76, 0.25)";
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#c9a84c",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(15, 11, 26, 0.8)",
                        border: "1px solid rgba(201, 168, 76, 0.25)",
                        color: "#f0e6d3",
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1rem",
                        padding: "0.875rem 1rem",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(201, 168, 76, 0.6)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(201, 168, 76, 0.25)";
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#c9a84c",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Tell Us About Your Path
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Share your background, experience, and what draws you to the Temple..."
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(15, 11, 26, 0.8)",
                        border: "1px solid rgba(201, 168, 76, 0.25)",
                        color: "#f0e6d3",
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1rem",
                        padding: "0.875rem 1rem",
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.2s ease",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderColor = "rgba(201, 168, 76, 0.6)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderColor = "rgba(201, 168, 76, 0.25)";
                      }}
                    />
                  </div>

                  {/* Areas of Interest */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#c9a84c",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Areas of Interest
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                      {areasOfInterest.map((area) => {
                        const isChecked = formData.interests.includes(area);
                        return (
                          <button
                            type="button"
                            key={area}
                            onClick={() => toggleInterest(area)}
                            style={{
                              fontFamily: "Cinzel, serif",
                              fontSize: "0.6rem",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              padding: "0.4rem 0.9rem",
                              cursor: "pointer",
                              border: isChecked
                                ? "1px solid #c9a84c"
                                : "1px solid rgba(201, 168, 76, 0.25)",
                              backgroundColor: isChecked
                                ? "rgba(201, 168, 76, 0.15)"
                                : "transparent",
                              color: isChecked ? "#f0d060" : "#b8a8cc",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {isChecked ? "✦ " : ""}
                            {area}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn-gold-filled"
                    style={{ marginTop: "0.5rem", width: "100%" }}
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Contact info row ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              marginTop: "5rem",
              paddingTop: "3rem",
              borderTop: "1px solid rgba(201, 168, 76, 0.15)",
            }}
          >
            {[
              {
                icon: "✉",
                label: "Email",
                value: "initiates@aeternaltemple.org",
                sub: "Response within 3 business days",
              },
              {
                icon: "◆",
                label: "Location",
                value: "Philadelphia, PA",
                sub: "In-person ceremonies & workshops",
              },
              {
                icon: "◉",
                label: "Office Hours",
                value: "Mon–Fri: 10am–6pm EST",
                sub: "Sat: 11am–3pm EST",
              },
            ].map((info, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    color: "#c9a84c",
                    marginBottom: "0.75rem",
                    fontFamily: "Cinzel, serif",
                  }}
                >
                  {info.icon}
                </div>
                <div
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#c9a84c",
                    marginBottom: "0.4rem",
                  }}
                >
                  {info.label}
                </div>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1rem",
                    color: "#f0e6d3",
                    marginBottom: "0.25rem",
                  }}
                >
                  {info.value}
                </div>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "0.85rem",
                    color: "#b8a8cc",
                    fontStyle: "italic",
                  }}
                >
                  {info.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="grid-template-columns: 1fr 480px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
