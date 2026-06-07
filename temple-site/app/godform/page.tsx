import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Assumption of the Godform",
  description:
    "The pivot of all theurgy — the deliberate striking of the I by which the Magician ceases to invoke and begins to be. A deep working with the rite of Tahuti (Liber Israfel) as its worked example.",
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

function Ornament() {
  return (
    <div className="ornament-divider" style={{ maxWidth: "520px", margin: "0 auto" }}>
      <span className="font-fell" style={{ color: "#c9a84c", fontSize: "1.1rem" }}>
        ✦
      </span>
    </div>
  );
}

// The LXIV → LVX hero glyph: the I struck/faded from the center.
function StrikeGlyph({ size = "clamp(2.6rem, 8vw, 5rem)" }: { size?: string }) {
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
        gap: "clamp(0.6rem, 3vw, 1.6rem)",
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

const prerequisites = [
  {
    n: "I",
    name: "Asana",
    title: "Stillness of Body",
    desc:
      "The form cannot transfer into a fidgeting vessel. Train one posture — the God position (standing, spine erect, feet together, eyes closed) or the Dragon (seated on the heels) — until you can hold it for thirty minutes without conscious adjustment. The body must drop out of awareness so the form can occupy it.",
    color: "#c9a84c",
  },
  {
    n: "II",
    name: "Dharana",
    title: "Steadiness of Mind",
    desc:
      "Hold a single image — a triangle, a rose, the bare disk of the moon — for ten minutes without it warping, sliding, or being interrupted. If you cannot hold a static image, you cannot hold a living one. This is the limiting skill; most failures of Assumption are failures of Dharana wearing a robe.",
    color: "#7c3aed",
  },
  {
    n: "III",
    name: "The Vibrated Word",
    title: "The Carrier Wave",
    desc:
      "The divine name is not spoken; it is vibrated — driven from the diaphragm so the breath itself shakes the chest, the skull, the air of the temple. Practise the single name of the god you will assume until you feel the vibration leave the body and continue outward after the breath ends.",
    color: "#e05c1a",
  },
  {
    n: "IV",
    name: "The Sphere of Sensation",
    title: "Command of the Aura",
    desc:
      "You must be able to feel, and shape, the egg of subtle substance around the body — to flood it with a chosen colour on the exhale, to brighten and dim it at will. The godform is built first in the Sphere, not in the head. Drill: on each exhale, fill the whole egg until it pulses with one elemental colour.",
    color: "#16a34a",
  },
];

const movements = [
  {
    n: "1",
    name: "Construction",
    sub: "The form before you",
    pivot: false,
    desc:
      "Build the godform in the space in front of you, at greater-than-human scale, as an external presence. It is not yet you. Construct it layer by layer, top to bottom, solidifying each layer before adding the next. Do not proceed until the form stands complete, stable, and seen — luminous, dimensional, present enough that the temple is lit by it.",
  },
  {
    n: "2",
    name: "Vivification",
    sub: "Giving it the senses",
    pivot: false,
    desc:
      "A built image is a statue. Vivify it: see the chest rise and fall with breath, see the eyes track, let the regalia move and gleam. Charge it with the vibrated name — each vibration should make the form flare and steady. Vivification separates a remembered picture from a thing that can be inhabited.",
  },
  {
    n: "3",
    name: "The Transfer",
    sub: "The striking of the I",
    pivot: true,
    desc:
      "Take a single physical pace forward as you exhale, and on that step, step into the form — your head into its head, your arms into its arms, your skin into its blazing skin. The forward step is not symbolic; it is the somatic trigger that displaces the self. At the instant of merger, stop narrating. Do not think \"now I am the god.\" That thought is the I, still in the chair. Let the next words out of the body be the god's, in the first person, without a self behind them checking the work.",
  },
  {
    n: "4",
    name: "Apotheosis",
    sub: "The Word as law",
    pivot: false,
    desc:
      "From within the form, speak as the god. The proclamations are not affirmations to be believed — from inside a genuine Transfer they are simply true, and spoken as fact: \"He is in me, and I in Him… my Word is accomplished every day.\" Touch mouth, heart, tongue as the rite directs; the body is now the god's temple, and every utterance carries divine authority. Here the working proper is done — the conjuration, the Word, the Light.",
  },
  {
    n: "5",
    name: "The Return",
    sub: "Decommissioning the form",
    pivot: false,
    desc:
      "Never omit this. The form must be set down with the same deliberation it was taken up. An un-returned godform is the single most common harm in this work. See the Seal of Return below.",
  },
];

const tahutiTable = [
  {
    movement: "Construct",
    israfel: "§4–5",
    act: "Veil of Paroketh parts; build the six layers — white crown, emerald ibis head, caduceus in the right hand, Rosy Cross in the left, night-blue nemmes, orange-blazing body.",
  },
  {
    movement: "Vivify",
    israfel: "§5 close",
    act: "The galaxy-eyes track; the caduceus crackles; charge with TAHUTI vibrated.",
  },
  {
    movement: "Transfer",
    israfel: "§6 (the step)",
    act: "One pace forward; the I is struck; the ibis head rises to the ceiling.",
  },
  {
    movement: "Apotheosis",
    israfel: "§6–14",
    act: "\"I am Yesterday, To-Day, and the Brother of To-Morrow\"; the Emerald Tablet; the binding of all spirits.",
  },
  {
    movement: "Return",
    israfel: "§15–21",
    act: "Isis/Silence cools the fire; \"let it return into the silence of light\"; step backward; ground; LBRP.",
  },
];

const returnSteps = [
  {
    title: "Cool the Current",
    desc:
      "Invoke the receptive, silent counter-pole (for Tahuti, Isis by the Sign of Silence). Feel the aura's fierce colour cool toward silver-blue.",
  },
  {
    title: "The License to Depart",
    desc:
      "Address the form: thank it, release it, and will the separation — \"Depart in peace; let there be peace between us.\"",
  },
  {
    title: "Reverse the Step",
    desc:
      "Take one pace backward, the exact reversal of the Transfer step. As you do, feel the godform stand forth from you again, external once more, and then dissolve.",
  },
  {
    title: "Reclaim the I — On Purpose",
    desc:
      "This is the one moment you deliberately take the self back. State your own name. Feel your ordinary outline return.",
  },
  {
    title: "Ground",
    desc:
      "Three slow breaths into the belly. Feet, hands, the weight of the body. Eat something; touch cold water; record the working in the Magickal Diary immediately — writing is itself a grounding act.",
  },
  {
    title: "Seal with the LBRP",
    desc:
      "The banishing closes the temple and severs any residual link to the form.",
  },
];

const failures = [
  {
    name: "Mere Visualization",
    tag: "No Transfer",
    desc:
      "You saw the god but never stepped in. Remedy: strengthen Dharana; make the forward step a hard somatic trigger; stop narrating at the merge.",
  },
  {
    name: "Inflation",
    tag: "The I steals the crown",
    desc:
      "Afterward you feel grandiose, \"chosen,\" superior. This is the failure of the Return — the I climbed back wearing the godform's regalia. Remedy: rigorous Return, hard grounding, the LBRP, and humility practices. The god departs; you do the dishes.",
  },
  {
    name: "Flux",
    tag: "Failure to return fully",
    desc:
      "Lingering dissociation, thinning of the self, \"not all the way back\" for hours or days. Remedy: repeat the full Return, eat heavily, physical labour, sunlight, sleep; refrain from further god-work until stable. Prevention: never skip the Return.",
  },
  {
    name: "The Clutch of Resistance",
    tag: "Reads as fear",
    desc:
      "Normal at the Transfer. It is the I defending itself. Yield, don't shove.",
  },
];

const curriculum = [
  {
    period: "Weeks 1–2",
    work:
      "The four prerequisites only. Words and gestures memorized in parallel. No Assumption attempted.",
  },
  {
    period: "Weeks 3–4",
    work:
      "Movement 1 (Construction) and Movement 2 (Vivification) of the chosen form — built before you, never yet entered.",
  },
  {
    period: "Month 2",
    work:
      "Attempt the Transfer (Movement 3). Expect ego-resistance. Short holds. Always a full Return.",
  },
  {
    period: "Month 3",
    work:
      "Apotheosis carries genuine force — felt vastness, the cooling at the lunar balance, the flame at the Light.",
  },
  {
    period: "Ongoing",
    work:
      "The form begins to arise unbidden when its qualities are needed. The Transfer shortens from minutes to a single breath.",
  },
];

export default function GodformPage() {
  return (
    <>
      <PageHeader
        title="The Assumption of the Godform"
        subtitle="The pivot of all theurgy — the striking of the I"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Doctrine" },
          { label: "The Assumption" },
        ]}
      />

      {/* ── OPENING / WHAT IT IS ── */}
      <section style={{ backgroundColor: "#05030d", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <SectionLabel text="0 · What It Is, and What It Is Not" />
            <SectionTitle>The Displacement of the Self</SectionTitle>
          </div>

          <p
            className="font-cormorant"
            style={{ fontSize: "1.2rem", color: "#f0e6d3", lineHeight: 1.85, marginBottom: "1.5rem" }}
          >
            <span
              className="font-cinzel"
              style={{
                float: "left",
                fontSize: "3.4rem",
                lineHeight: 0.8,
                color: "#c9a84c",
                marginRight: "0.7rem",
                marginTop: "0.3rem",
                textShadow: "0 0 20px rgba(201,168,76,0.4)",
              }}
            >
              T
            </span>
            he Assumption of the Godform is the deliberate, total identification of the operator
            with a divine form, such that the operator&apos;s &quot;I&quot; is displaced and the
            god speaks, sees, and acts in the first person through the body.
          </p>

          {/* It Is Not / It Is — two-column contrast card */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              margin: "2.5rem 0",
            }}
          >
            <div
              style={{
                background: "rgba(224, 92, 26, 0.05)",
                border: "1px solid rgba(224, 92, 26, 0.3)",
                borderRadius: "4px",
                padding: "1.75rem",
              }}
            >
              <p
                className="font-cinzel"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#e05c1a",
                  marginBottom: "0.9rem",
                }}
              >
                It Is Not · Psychodrama
              </p>
              <p className="font-cormorant" style={{ fontSize: "1.05rem", color: "#b8a8cc", lineHeight: 1.7 }}>
                Psychodrama keeps the self in the director&apos;s chair and wears the god as a mask
                to address its own contents. The director never once rises. The test is merciless:
                in psychodrama you can, at any moment, observe yourself performing.
              </p>
            </div>
            <div
              style={{
                background: "rgba(201, 168, 76, 0.06)",
                border: "1px solid rgba(201, 168, 76, 0.4)",
                borderRadius: "4px",
                padding: "1.75rem",
                boxShadow: "0 0 24px rgba(201,168,76,0.08)",
              }}
            >
              <p
                className="font-cinzel"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  marginBottom: "0.9rem",
                }}
              >
                It Is · Theurgy
              </p>
              <p className="font-cormorant" style={{ fontSize: "1.05rem", color: "#f0e6d3", lineHeight: 1.7 }}>
                The Assumption removes the director. There is no longer a self standing apart to
                observe — there is only the god, and, afterward, the memory of having been displaced.
                It is genuine identity-transfer, not theatre.
              </p>
            </div>
          </div>

          <p
            className="font-fell"
            style={{
              fontSize: "1.4rem",
              color: "#f0d060",
              fontStyle: "italic",
              textAlign: "center",
              letterSpacing: "0.04em",
              textShadow: "0 0 16px rgba(240,208,96,0.4)",
              margin: "2.5rem 0 1rem",
            }}
          >
            This is the operative meaning of the Temple&apos;s standing doctrine: strike the I.
          </p>
          <p
            className="font-cormorant"
            style={{ fontSize: "1.1rem", color: "#b8a8cc", lineHeight: 1.8, textAlign: "center", marginBottom: "3rem" }}
          >
            The whole of the technique below is machinery for the excision of a single letter from
            the centre of the self. Everything that follows is <em>how</em>.
          </p>

          {/* LXIV → LVX hero */}
          <div
            style={{
              background: "radial-gradient(ellipse at center, #1a0d2e 0%, #05030d 80%)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "4px",
              padding: "3rem 1.5rem",
              boxShadow: "0 0 40px rgba(109,40,217,0.15), inset 0 0 60px rgba(109,40,217,0.05)",
            }}
          >
            <StrikeGlyph />
            <p
              className="font-cormorant"
              style={{
                fontSize: "1rem",
                color: "#b8a8cc",
                fontStyle: "italic",
                textAlign: "center",
                marginTop: "1.75rem",
                letterSpacing: "0.05em",
              }}
            >
              You do not add the god. You subtract the I — and what remains was always the Light.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE FOUR PREREQUISITES ── */}
      <section
        style={{
          backgroundColor: "#0f0b1a",
          padding: "6rem 1.5rem",
          borderTop: "1px solid rgba(201, 168, 76, 0.1)",
          borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <SectionLabel text="I · Do Not Skip" color="#e05c1a" />
            <SectionTitle>The Four Prerequisites</SectionTitle>
          </div>
          <p
            className="font-cormorant"
            style={{
              fontSize: "1.1rem",
              color: "#b8a8cc",
              lineHeight: 1.8,
              textAlign: "center",
              maxWidth: "720px",
              margin: "0 auto 3.5rem",
            }}
          >
            The Assumption fails for the unprepared not because the gods are absent but because the
            instrument cannot hold the charge. Four capacities must be drilled to reflex before the
            godform is ever assumed in earnest.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {prerequisites.map((p, i) => (
              <div
                key={i}
                className="mystic-card"
                style={{ backgroundColor: "#05030d", padding: "2rem", position: "relative" }}
              >
                <div
                  className="font-cinzel"
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: p.color,
                    marginBottom: "0.6rem",
                    textShadow: `0 0 16px ${p.color}55`,
                  }}
                >
                  {p.n}
                </div>
                <h3
                  className="font-cinzel"
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#f0e6d3",
                    marginBottom: "0.2rem",
                  }}
                >
                  {p.name}
                </h3>
                <p
                  className="font-cormorant"
                  style={{ fontSize: "0.92rem", color: p.color, fontStyle: "italic", marginBottom: "1rem" }}
                >
                  {p.title}
                </p>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: `linear-gradient(to right, ${p.color}, transparent)`,
                    marginBottom: "1rem",
                  }}
                />
                <p className="font-cormorant" style={{ fontSize: "1rem", color: "#b8a8cc", lineHeight: 1.7 }}>
                  {p.desc}
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
              maxWidth: "720px",
              margin: "3rem auto 0",
            }}
          >
            Months 1–2 of practice are only these four. The words and gestures of the rite can be
            learned in parallel, but the Assumption proper is not attempted until the instrument holds.
          </p>
        </div>
      </section>

      {/* ── THE FIVE MOVEMENTS ── */}
      <section style={{ backgroundColor: "#05030d", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel text="II · The Architecture of the Act" color="#7c3aed" />
            <SectionTitle>The Five Movements</SectionTitle>
            <p
              className="font-cormorant"
              style={{ fontSize: "1.1rem", color: "#b8a8cc", lineHeight: 1.8, maxWidth: "680px", margin: "1.5rem auto 0" }}
            >
              In Liber Israfel the act is spread across Sections 4–9; here it is named as five
              movements so it can be drilled as one motion.
            </p>
          </div>

          {/* Vertical timeline */}
          <div style={{ position: "relative" }}>
            {/* vertical spine */}
            <div
              style={{
                position: "absolute",
                left: "23px",
                top: "12px",
                bottom: "12px",
                width: "1px",
                background:
                  "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), rgba(201,168,76,0.4), transparent)",
              }}
            />

            {movements.map((m, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  display: "flex",
                  gap: "1.5rem",
                  marginBottom: i < movements.length - 1 ? "2rem" : 0,
                  alignItems: "flex-start",
                }}
              >
                {/* node */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: m.pivot ? "2px solid #f0d060" : "1px solid rgba(201,168,76,0.5)",
                    backgroundColor: m.pivot ? "rgba(240,208,96,0.12)" : "#0f0b1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: m.pivot ? "#f0d060" : "#c9a84c",
                    boxShadow: m.pivot
                      ? "0 0 24px rgba(240,208,96,0.5)"
                      : "0 0 12px rgba(201,168,76,0.15)",
                    zIndex: 1,
                  }}
                >
                  {m.n}
                </div>

                {/* card */}
                <div
                  style={{
                    flex: 1,
                    background: m.pivot ? "rgba(240,208,96,0.05)" : "rgba(15,11,26,0.6)",
                    border: m.pivot
                      ? "1px solid rgba(240,208,96,0.55)"
                      : "1px solid rgba(201,168,76,0.18)",
                    borderRadius: "4px",
                    padding: "1.5rem 1.75rem",
                    boxShadow: m.pivot ? "0 0 28px rgba(240,208,96,0.12)" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <h3
                      className="font-cinzel"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: m.pivot ? "#f0d060" : "#f0e6d3",
                      }}
                    >
                      {m.name}
                    </h3>
                    {m.pivot && (
                      <span
                        className="font-cinzel"
                        style={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "#05030d",
                          background: "linear-gradient(135deg, #c9a84c, #f0d060)",
                          padding: "0.25rem 0.7rem",
                          borderRadius: "2px",
                          fontWeight: 700,
                        }}
                      >
                        The Pivot
                      </span>
                    )}
                  </div>
                  <p
                    className="font-cormorant"
                    style={{ fontSize: "0.95rem", color: m.pivot ? "#c9a84c" : "#b8a8cc", fontStyle: "italic", marginBottom: "0.9rem" }}
                  >
                    {m.sub}
                  </p>
                  <p className="font-cormorant" style={{ fontSize: "1.05rem", color: "#f0e6d3", lineHeight: 1.75 }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pull-quote: resistance / yielding */}
          <blockquote
            style={{
              margin: "3.5rem 0 0",
              background: "rgba(109,40,217,0.08)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderLeft: "3px solid #7c3aed",
              borderRadius: "4px",
              padding: "1.75rem 2rem",
            }}
          >
            <p
              className="font-fell"
              style={{ fontSize: "1.2rem", color: "#f0e6d3", fontStyle: "italic", lineHeight: 1.8 }}
            >
              This is where the ego resists — a real, felt clutch of refusal. The resistance is the I
              declining to be struck. Breathe through it. Do not force it with effort, for effort is
              the I trying harder; release into the form. The Transfer succeeds by yielding, not by
              seizing.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── WORKED EXAMPLE: TAHUTI ── */}
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
            <SectionLabel text="III · Liber Israfel" />
            <SectionTitle>The Worked Example — Tahuti</SectionTitle>
            <p
              className="font-cormorant"
              style={{ fontSize: "1.1rem", color: "#b8a8cc", lineHeight: 1.8, maxWidth: "680px", margin: "1.5rem auto 0" }}
            >
              The five movements mapped onto the sections of the Invocation of Thoth.
            </p>
          </div>

          <div
            style={{
              overflowX: "auto",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "4px",
              background: "rgba(5,3,13,0.5)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "640px" }}>
              <thead>
                <tr style={{ background: "rgba(201,168,76,0.08)" }}>
                  {["Movement", "Israfel", "Act"].map((h) => (
                    <th
                      key={h}
                      className="font-cinzel"
                      style={{
                        textAlign: "left",
                        padding: "1rem 1.25rem",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#c9a84c",
                        borderBottom: "1px solid rgba(201,168,76,0.3)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tahutiTable.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom:
                        i < tahutiTable.length - 1 ? "1px solid rgba(201,168,76,0.12)" : "none",
                      background: row.movement === "Transfer" ? "rgba(240,208,96,0.05)" : "transparent",
                    }}
                  >
                    <td
                      className="font-cinzel"
                      style={{
                        padding: "1.1rem 1.25rem",
                        fontSize: "0.85rem",
                        letterSpacing: "0.06em",
                        color: row.movement === "Transfer" ? "#f0d060" : "#f0e6d3",
                        fontWeight: 700,
                        verticalAlign: "top",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.movement}
                    </td>
                    <td
                      className="font-fell"
                      style={{
                        padding: "1.1rem 1.25rem",
                        fontSize: "0.95rem",
                        color: "#c9a84c",
                        fontStyle: "italic",
                        verticalAlign: "top",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.israfel}
                    </td>
                    <td
                      className="font-cormorant"
                      style={{
                        padding: "1.1rem 1.25rem",
                        fontSize: "1rem",
                        color: "#b8a8cc",
                        lineHeight: 1.65,
                        verticalAlign: "top",
                      }}
                    >
                      {row.act}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className="font-cormorant"
            style={{ fontSize: "1.05rem", color: "#b8a8cc", lineHeight: 1.8, marginTop: "1.75rem", textAlign: "center" }}
          >
            The lunar balance of Isis (§15) is part of the Return, not an ornament: the
            solar-Mercurial fire must be cooled to silver before the form is set down, or the
            operator carries the heat out of the temple.
          </p>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/liber-israfel" className="btn-gold-outline" style={{ display: "inline-block", textDecoration: "none" }}>
              Study Liber Israfel →
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE RETURN (SAFETY-CRITICAL) ── */}
      <section style={{ backgroundColor: "#05030d", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <SectionLabel text="IV · How to Set Down a God" color="#e05c1a" />
            <SectionTitle>The Return</SectionTitle>
          </div>

          <div
            style={{
              border: "1px solid rgba(224,92,26,0.45)",
              borderRadius: "4px",
              background: "rgba(224,92,26,0.04)",
              padding: "2.25rem 2rem",
              boxShadow: "0 0 30px rgba(224,92,26,0.08)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(to right, transparent, #e05c1a, transparent)",
              }}
            />
            <p
              className="font-cinzel"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#e05c1a",
                textAlign: "center",
                marginBottom: "1.75rem",
              }}
            >
              ✦ Never Omit This — The Seal of Return ✦
            </p>

            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {returnSteps.map((step, i) => (
                <li key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <span
                    className="font-cinzel"
                    style={{
                      flexShrink: 0,
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid rgba(224,92,26,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ff8c42",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3
                      className="font-cinzel"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "#f0e6d3",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-cormorant" style={{ fontSize: "1.02rem", color: "#b8a8cc", lineHeight: 1.7 }}>
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── FAILURE MODES ── */}
      <section
        style={{
          backgroundColor: "#0f0b1a",
          padding: "6rem 1.5rem",
          borderTop: "1px solid rgba(201, 168, 76, 0.1)",
          borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel text="V · Diagnostics" color="#7c3aed" />
            <SectionTitle>Failure Modes &amp; Remedies</SectionTitle>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {failures.map((f, i) => (
              <div
                key={i}
                className="mystic-card"
                style={{ backgroundColor: "#05030d", padding: "1.9rem" }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                  <h3
                    className="font-cinzel"
                    style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.06em", color: "#f0e6d3" }}
                  >
                    {f.name}
                  </h3>
                  <span
                    className="font-cinzel"
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#e05c1a",
                      border: "1px solid rgba(224,92,26,0.4)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "2px",
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
                <p className="font-cormorant" style={{ fontSize: "1rem", color: "#b8a8cc", lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section style={{ backgroundColor: "#05030d", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel text="VI · The Graded Path" />
            <SectionTitle>The Progressive Curriculum</SectionTitle>
          </div>

          <div
            style={{
              overflowX: "auto",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "4px",
              background: "rgba(15,11,26,0.4)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
              <thead>
                <tr style={{ background: "rgba(201,168,76,0.08)" }}>
                  {["Period", "Work"].map((h) => (
                    <th
                      key={h}
                      className="font-cinzel"
                      style={{
                        textAlign: "left",
                        padding: "1rem 1.25rem",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#c9a84c",
                        borderBottom: "1px solid rgba(201,168,76,0.3)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {curriculum.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom:
                        i < curriculum.length - 1 ? "1px solid rgba(201,168,76,0.12)" : "none",
                    }}
                  >
                    <td
                      className="font-cinzel"
                      style={{
                        padding: "1.1rem 1.25rem",
                        fontSize: "0.85rem",
                        letterSpacing: "0.06em",
                        color: "#f0d060",
                        fontWeight: 700,
                        verticalAlign: "top",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.period}
                    </td>
                    <td
                      className="font-cormorant"
                      style={{
                        padding: "1.1rem 1.25rem",
                        fontSize: "1.05rem",
                        color: "#b8a8cc",
                        lineHeight: 1.65,
                        verticalAlign: "top",
                      }}
                    >
                      {row.work}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── THE SEAL ── */}
      <section
        style={{
          background: "linear-gradient(180deg, #0f0b1a 0%, #05030d 100%)",
          padding: "6rem 1.5rem 7rem",
          borderTop: "1px solid rgba(201, 168, 76, 0.15)",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <SectionLabel text="VII · The Seal" />
          <SectionTitle>What Remains Was Always LVX</SectionTitle>

          <p
            className="font-cormorant"
            style={{ fontSize: "1.15rem", color: "#f0e6d3", lineHeight: 1.85, margin: "2rem auto 3rem", maxWidth: "700px" }}
          >
            The Assumption is not the wearing of a god. It is the striking of the I such that the
            Light already present is no longer obstructed by a self standing in front of it. You do
            not add the god. You subtract the I.
          </p>

          {/* The chain */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem 0.9rem",
              margin: "0 auto 3rem",
            }}
          >
            {["LXIV", "strike the I", "LVX", "65", "Adonai", "the Light"].map((node, i, arr) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem 0.9rem" }}>
                <span
                  className="font-cinzel"
                  style={{
                    fontSize: i === 0 ? "1.3rem" : "1.15rem",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                    color: i === 0 ? "rgba(184,168,204,0.5)" : "#f0d060",
                    textShadow: i === 0 ? "none" : "0 0 14px rgba(240,208,96,0.4)",
                    fontStyle: node === "strike the I" ? "italic" : "normal",
                    textTransform: node === "strike the I" ? "none" : "uppercase",
                  }}
                >
                  {node}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: "#e05c1a", fontSize: "1rem" }}>→</span>
                )}
              </span>
            ))}
          </div>

          <Ornament />

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
            Strike the I, and the Light remains.
          </p>

          <p
            className="font-fell"
            style={{ fontSize: "1rem", color: "#b8a8cc", fontStyle: "italic", letterSpacing: "0.06em", marginBottom: "2.5rem" }}
          >
            Lux in Tenebris. Sealed for the College of the Neophyte of the Alkhemical et Qabalistic
            Temple of Obsidian Flame.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/liber-israfel" className="btn-gold-filled" style={{ display: "inline-block", textDecoration: "none" }}>
              The Figure of L.V.X. →
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
