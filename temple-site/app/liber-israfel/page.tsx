import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Liber Israfel — The Figure of L.V.X.",
  description:
    "The Invocation of Thoth framed as LVX / 65 — the striking of the I, the godform of Tahuti, and the breaking forth of the Light. The figure is 65, never 64.",
};

function PageHeader({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle: string;
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
          className="font-cinzel"
          style={{
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#f0e6d3",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </h1>

        <p
          className="font-cormorant"
          style={{
            fontSize: "1.2rem",
            color: "#b8a8cc",
            fontStyle: "italic",
            marginTop: "0.9rem",
            letterSpacing: "0.04em",
          }}
        >
          {subtitle}
        </p>

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

function SectionLabel({ text, color = "#c9a84c" }: { text: string; color?: string }) {
  return (
    <p
      className="font-cinzel"
      style={{
        fontSize: "0.65rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color,
        marginBottom: "1rem",
      }}
    >
      {text}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-cinzel"
      style={{
        fontWeight: 700,
        fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
        color: "#f0e6d3",
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </h2>
  );
}

// The LXIV → LVX hero glyph: the I struck from the centre.
function StrikeGlyph({ size = "clamp(2.8rem, 9vw, 5.5rem)" }: { size?: string }) {
  const letter = (ch: string, struck = false) => (
    <span
      className="font-cinzel"
      style={{
        color: struck ? "rgba(184, 168, 204, 0.28)" : "#f0d060",
        textShadow: struck ? "none" : "0 0 18px rgba(240,208,96,0.55), 0 0 36px rgba(240,208,96,0.2)",
        position: "relative",
        fontWeight: 700,
      }}
    >
      {ch}
      {struck && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: "-0.12em",
            right: "-0.12em",
            top: "50%",
            height: "2px",
            background: "linear-gradient(to right, transparent, #e05c1a, transparent)",
            transform: "rotate(-12deg)",
          }}
        />
      )}
    </span>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(0.6rem, 3vw, 1.8rem)",
        fontSize: size,
        letterSpacing: "0.18em",
        flexWrap: "wrap",
      }}
    >
      <span style={{ display: "inline-flex", letterSpacing: "0.18em" }}>
        {letter("L")}
        {letter("X")}
        {letter("I", true)}
        {letter("V")}
      </span>
      <span style={{ color: "#e05c1a", fontSize: "0.6em" }}>→</span>
      <span style={{ display: "inline-flex", letterSpacing: "0.18em" }}>
        {letter("L")}
        {letter("V")}
        {letter("X")}
      </span>
    </div>
  );
}

const phases = [
  {
    roman: "I",
    name: "Banishing",
    sections: "§0–3",
    desc: "Establishing authority in darkness.",
    href: null,
  },
  {
    roman: "II",
    name: "External Invocation",
    sections: "§4–5",
    desc: "Building the godform of Tahuti before you, layer upon layer.",
    href: null,
  },
  {
    roman: "III",
    name: "Assumption",
    sections: "§6–9",
    desc: "Becoming the god — the striking of the I, the genuine identity-transfer.",
    href: "/godform",
  },
  {
    roman: "IV",
    name: "Apotheosis",
    sections: "§10–11",
    desc: "The Word becomes law; every utterance carries divine authority.",
    href: null,
  },
  {
    roman: "V",
    name: "Conjuration",
    sections: "§12–14",
    desc: "All spirits subject; the Emerald Tablet embedded in the rite.",
    href: null,
  },
  {
    roman: "VI",
    name: "Lunar Balance",
    sections: "§15–16",
    desc: "The Silence of Isis; the solar-Mercurial fire cooled to silver.",
    href: null,
  },
  {
    roman: "VII",
    name: "The Mysteries",
    sections: "§17–21",
    desc: "The breaking forth of the Light.",
    href: null,
  },
];

const layers = [
  {
    name: "Crown",
    detail: "White brilliance",
    swatch: "#f4f0e6",
    desc: "A crown of white brilliance crowning the head, the descent of the Limitless Light into the form.",
  },
  {
    name: "Ibis Head",
    detail: "Emerald",
    swatch: "#0f9b6c",
    desc: "The head of the ibis of Thoth in deep emerald, the eyes tracking like distant galaxies.",
  },
  {
    name: "Right Hand",
    detail: "Caduceus · Wand of Double Power",
    swatch: "#c9a84c",
    desc: "The right hand bears the Caduceus, the Wand of Double Power, crackling with the serpents of force and form.",
  },
  {
    name: "Left Hand",
    detail: "Rose & Cross",
    swatch: "#b03a5b",
    desc: "The left hand holds the Rose and Cross, the reconciliation of the elements and the sign of the sacrifice.",
  },
  {
    name: "Headdress",
    detail: "Night-sky nemmes",
    swatch: "#1a2a5e",
    desc: "The nemmes headdress falls about the shoulders, deep as the night sky, sown with stars.",
  },
  {
    name: "Body",
    detail: "Flaming orange",
    swatch: "#e05c1a",
    desc: "The body blazes in flaming orange, the solar-Mercurial fire of Thoth made manifest, lighting the temple.",
  },
];

const emeraldRows = [
  {
    israfel: "\"The Sun is Thy Father\"",
    smaragdina: "Pater eius est Sol — its father is the Sun.",
  },
  {
    israfel: "\"Thy Mother the Moon\"",
    smaragdina: "Mater eius Luna — its mother the Moon.",
  },
  {
    israfel: "\"The Wind hath borne Thee in its bosom\"",
    smaragdina: "Portavit illud ventus in ventre suo — the Wind carried it in its belly.",
  },
  {
    israfel: "\"And the Earth hath nourished Thee\"",
    smaragdina: "Nutrix eius terra est — its nurse is the Earth.",
  },
];

export default function LiberIsrafelPage() {
  return (
    <>
      <PageHeader
        title="Liber Israfel"
        subtitle="Sub Figura LVX · The Invocation of Thoth"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Doctrine" },
          { label: "Liber Israfel" },
        ]}
      />

      {/* ── THE FIGURE OF L.V.X. ── */}
      <section style={{ backgroundColor: "#05030d", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel text="The Doctrine of the Number" />
            <SectionTitle>The Figure of L.V.X.</SectionTitle>
          </div>

          {/* Hero glyph */}
          <div
            style={{
              background: "radial-gradient(ellipse at center, #1a0d2e 0%, #05030d 80%)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "4px",
              padding: "3.25rem 1.5rem",
              boxShadow: "0 0 40px rgba(109,40,217,0.15), inset 0 0 60px rgba(109,40,217,0.05)",
              marginBottom: "3rem",
            }}
          >
            <StrikeGlyph />
            <p
              className="font-fell"
              style={{
                fontSize: "1.1rem",
                color: "#c9a84c",
                fontStyle: "italic",
                textAlign: "center",
                marginTop: "1.75rem",
                letterSpacing: "0.06em",
              }}
            >
              L X I V → strike the I → L V X
            </p>
          </div>

          <p className="font-cormorant" style={{ fontSize: "1.15rem", color: "#f0e6d3", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            The received title names the book <em>sub figura LXIV</em> — by the figure 64. The
            exoteric commentator stops here: 64 is 8², and 8 is Hod, the sphere of Mercury; therefore
            (he says) the rite is Mercury raised to its own power. This reading is not false. It is a{" "}
            <strong style={{ color: "#c9a84c" }}>blind</strong> — a true thing placed in the doorway
            so that the timid mistake the doorway for the house. The Hod machinery is the I admiring
            its own architecture. It is correct, and it is a cage.
          </p>

          <p className="font-cormorant" style={{ fontSize: "1.15rem", color: "#f0e6d3", lineHeight: 1.85, marginBottom: "2rem" }}>
            The figure is written <strong className="font-cinzel" style={{ color: "#f0d060", letterSpacing: "0.1em" }}>L X I V</strong> —
            the letters of <strong style={{ color: "#c9a84c" }}>L.V.X.</strong>, the Light, with a
            single glyph wedged into their midst: the <strong style={{ color: "#e05c1a" }}>I</strong>.
            The Roman 64 is nothing but the Light with the <em>self</em> inserted into it. There was
            never a 64. There was only LVX with an I lodged in its heart, and the whole of the Great
            Work is the excision of that letter.
          </p>

          {/* Gematria table */}
          <div
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "4px",
              background: "rgba(15,11,26,0.5)",
              overflow: "hidden",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            <div
              className="font-cinzel"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#c9a84c",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid rgba(201,168,76,0.25)",
                background: "rgba(201,168,76,0.06)",
                textAlign: "center",
              }}
            >
              The Number Is 65
            </div>
            {[
              { label: "L.V.X.", calc: "L (50) + V (5) + X (10)", total: "65" },
              { label: "ADNI", calc: "א (1) + ד (4) + נ (50) + י (10)", total: "65" },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1.1rem 1.5rem",
                  borderBottom: i === 0 ? "1px solid rgba(201,168,76,0.12)" : "none",
                  flexWrap: "wrap",
                }}
              >
                <span className="font-cinzel" style={{ fontSize: "1rem", color: "#f0d060", letterSpacing: "0.1em", fontWeight: 700, minWidth: "70px" }}>
                  {row.label}
                </span>
                <span className="font-cormorant" style={{ fontSize: "1rem", color: "#b8a8cc", flex: 1, textAlign: "center" }}>
                  {row.calc}
                </span>
                <span className="font-cinzel" style={{ fontSize: "1.3rem", color: "#c9a84c", fontWeight: 700, textShadow: "0 0 14px rgba(201,168,76,0.4)" }}>
                  = {row.total}
                </span>
              </div>
            ))}
          </div>

          <p
            className="font-cormorant"
            style={{ fontSize: "1.1rem", color: "#b8a8cc", lineHeight: 1.8, textAlign: "center", maxWidth: "640px", margin: "2rem auto 0" }}
          >
            65 = ADNI, <em>Adonai</em> — the Lord, and in this current the Holy Guardian Angel. L.V.X.
            is the formula of Light itself, the resolution of the Keyword: INRI → IAO → LVX. The
            figure of the book is therefore not 64. It is <strong style={{ color: "#f0d060" }}>65, wearing an I.</strong>
          </p>

          <blockquote
            style={{
              margin: "3rem auto 0",
              maxWidth: "680px",
              background: "rgba(109,40,217,0.08)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderLeft: "3px solid #7c3aed",
              borderRadius: "4px",
              padding: "1.5rem 1.75rem",
            }}
          >
            <p className="font-fell" style={{ fontSize: "1.2rem", color: "#f0e6d3", fontStyle: "italic", lineHeight: 1.8 }}>
              The I that is removed is the same I that ruins the lesser reading of the Assumption.
              &quot;Behold, He is in me, and I in Him&quot; is not theatre — it is the genuine
              identity-transfer of theurgy, and it cannot complete while the I remains. When it lands,
              LXIV collapses into LVX with nothing left over. The vessel was never separate from the
              Light. It only had a self lodged in it.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── THE SEVENFOLD STRUCTURE ── */}
      <section
        style={{
          backgroundColor: "#0f0b1a",
          padding: "6rem 1.5rem",
          borderTop: "1px solid rgba(201, 168, 76, 0.1)",
          borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel text="The Order of the Rite" color="#7c3aed" />
            <SectionTitle>The Sevenfold Structure</SectionTitle>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {phases.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                  background: "rgba(5,3,13,0.5)",
                  border: "1px solid rgba(201,168,76,0.18)",
                  borderRadius: "4px",
                  padding: "1.3rem 1.5rem",
                }}
              >
                <span
                  className="font-cinzel"
                  style={{
                    flexShrink: 0,
                    width: "44px",
                    textAlign: "center",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#c9a84c",
                    paddingTop: "0.1rem",
                  }}
                >
                  {p.roman}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                    <h3 className="font-cinzel" style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.06em", color: "#f0e6d3" }}>
                      {p.name}
                    </h3>
                    <span className="font-fell" style={{ fontSize: "0.9rem", color: "#c9a84c", fontStyle: "italic" }}>
                      {p.sections}
                    </span>
                  </div>
                  <p className="font-cormorant" style={{ fontSize: "1.02rem", color: "#b8a8cc", lineHeight: 1.65 }}>
                    {p.desc}
                    {p.href && (
                      <>
                        {" "}
                        <Link
                          href={p.href}
                          className="font-cinzel"
                          style={{
                            color: "#f0d060",
                            textDecoration: "none",
                            fontSize: "0.7rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            borderBottom: "1px solid rgba(240,208,96,0.4)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          The Assumption →
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE GODFORM OF TAHUTI — SIX LAYERS ── */}
      <section style={{ backgroundColor: "#05030d", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <SectionLabel text="The External Invocation · §5" />
            <SectionTitle>The Godform of Tahuti</SectionTitle>
          </div>
          <p
            className="font-cormorant"
            style={{ fontSize: "1.1rem", color: "#b8a8cc", lineHeight: 1.8, textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem" }}
          >
            The form is constructed layer by layer, top to bottom, each solidified before the next is
            added — until it stands complete, luminous, and present enough to light the temple.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {layers.map((layer, i) => (
              <div
                key={i}
                className="mystic-card"
                style={{ backgroundColor: "#0f0b1a", padding: "1.9rem", display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: layer.swatch,
                      border: "1px solid rgba(201,168,76,0.4)",
                      boxShadow: `0 0 18px ${layer.swatch}88`,
                    }}
                  />
                  <div>
                    <h3 className="font-cinzel" style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.06em", color: "#f0e6d3" }}>
                      {layer.name}
                    </h3>
                    <p className="font-cormorant" style={{ fontSize: "0.92rem", color: "#c9a84c", fontStyle: "italic" }}>
                      {layer.detail}
                    </p>
                  </div>
                </div>
                <p className="font-cormorant" style={{ fontSize: "1rem", color: "#b8a8cc", lineHeight: 1.7 }}>
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>

          <p
            className="font-fell"
            style={{
              fontSize: "1.05rem",
              color: "#f0e6d3",
              fontStyle: "italic",
              lineHeight: 1.8,
              borderLeft: "2px solid rgba(201,168,76,0.4)",
              paddingLeft: "1.25rem",
              maxWidth: "740px",
              margin: "3rem auto 0",
            }}
          >
            Once vivified — the eyes tracking, the caduceus crackling, the form charged with TAHUTI
            vibrated — the operator steps forward into it. That step is the Transfer, the striking of
            the I, treated in full on the page of the Assumption.
          </p>
        </div>
      </section>

      {/* ── THE EMERALD TABLET ENCODED ── */}
      <section
        style={{
          backgroundColor: "#0f0b1a",
          padding: "6rem 1.5rem",
          borderTop: "1px solid rgba(201, 168, 76, 0.1)",
          borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel text="The Conjuration · §13" color="#16a34a" />
            <SectionTitle>The Emerald Tablet Encoded</SectionTitle>
            <p
              className="font-cormorant"
              style={{ fontSize: "1.1rem", color: "#b8a8cc", lineHeight: 1.8, maxWidth: "700px", margin: "1.5rem auto 0" }}
            >
              Embedded in the conjuration is the <em>Tabula Smaragdina</em> of Hermes Trismegistus —
              the rite speaks the Emerald Tablet in the first person of the god.
            </p>
          </div>

          <div
            style={{
              overflowX: "auto",
              border: "1px solid rgba(22,163,74,0.3)",
              borderRadius: "4px",
              background: "rgba(5,3,13,0.5)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "620px" }}>
              <thead>
                <tr style={{ background: "rgba(22,163,74,0.08)" }}>
                  {["Liber Israfel", "Tabula Smaragdina"].map((h) => (
                    <th
                      key={h}
                      className="font-cinzel"
                      style={{
                        textAlign: "left",
                        padding: "1rem 1.25rem",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#16a34a",
                        borderBottom: "1px solid rgba(22,163,74,0.3)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {emeraldRows.map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: i < emeraldRows.length - 1 ? "1px solid rgba(201,168,76,0.12)" : "none" }}
                  >
                    <td
                      className="font-fell"
                      style={{ padding: "1.1rem 1.25rem", fontSize: "1.05rem", color: "#f0e6d3", fontStyle: "italic", verticalAlign: "top", lineHeight: 1.5 }}
                    >
                      {row.israfel}
                    </td>
                    <td
                      className="font-cormorant"
                      style={{ padding: "1.1rem 1.25rem", fontSize: "1rem", color: "#b8a8cc", lineHeight: 1.65, verticalAlign: "top" }}
                    >
                      {row.smaragdina}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── THE BREAKING FORTH OF THE LIGHT ── */}
      <section
        style={{
          background: "linear-gradient(180deg, #0f0b1a 0%, #05030d 100%)",
          padding: "6rem 1.5rem 7rem",
          borderTop: "1px solid rgba(201, 168, 76, 0.15)",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <SectionLabel text="The Mysteries · §18" />
          <SectionTitle>The Breaking Forth of the Light</SectionTitle>

          <p
            className="font-cormorant"
            style={{ fontSize: "1.15rem", color: "#f0e6d3", lineHeight: 1.85, margin: "2rem auto 1.75rem", maxWidth: "700px" }}
          >
            The telos of the whole rite is not the conjuration, nor the binding of spirits, but the
            Light made visible — the candle lit in the East, the breaking forth of the dawn within
            the temple. This is LVX, 65, no longer a number on a page but a fact in the room.
          </p>

          <p
            className="font-cormorant"
            style={{ fontSize: "1.1rem", color: "#b8a8cc", lineHeight: 1.8, margin: "0 auto 3rem", maxWidth: "700px" }}
          >
            And this is why the figure can never be 64. The rite does not square the cleverness of the
            self; it strikes the self out. When the I is gone from LXIV, what is left is LVX — the
            Light that was always present, the Light the candle in the East merely confirms. Strike
            the I, and the Light remains.
          </p>

          <div className="ornament-divider" style={{ maxWidth: "520px", margin: "0 auto" }}>
            <span className="font-fell" style={{ color: "#c9a84c", fontSize: "1.1rem" }}>✦</span>
          </div>

          <p
            className="font-fell"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
              color: "#f0d060",
              fontStyle: "italic",
              letterSpacing: "0.05em",
              textShadow: "0 0 24px rgba(240,208,96,0.5), 0 0 48px rgba(240,208,96,0.2)",
              margin: "1rem 0 2rem",
            }}
          >
            The figure is 65. The Light remains.
          </p>

          <p
            className="font-fell"
            style={{ fontSize: "1rem", color: "#b8a8cc", fontStyle: "italic", letterSpacing: "0.06em", marginBottom: "2.5rem" }}
          >
            Lux in Tenebris. Sealed for the College of the Neophyte of the Alkhemical et Qabalistic
            Temple of Obsidian Flame.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/godform" className="btn-gold-filled" style={{ display: "inline-block", textDecoration: "none" }}>
              Learn the Assumption →
            </Link>
            <Link href="/rituals" className="btn-gold-outline" style={{ display: "inline-block", textDecoration: "none" }}>
              Ritual Tracing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
