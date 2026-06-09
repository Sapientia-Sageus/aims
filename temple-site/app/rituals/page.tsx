'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Type Definitions ───────────────────────────────────────────────────────

type RitualKey = 'LBRP' | 'LBRH' | 'SRP';

type SRPElement =
  | 'Spirit Active'
  | 'Spirit Passive'
  | 'Fire'
  | 'Water'
  | 'Air'
  | 'Earth Invoking'
  | 'Earth Banishing';

interface Point {
  x: number;
  y: number;
}

interface Edge {
  from: Point;
  to: Point;
  label: string;
}

interface FigureData {
  edges: Edge[];
  color: string;
  glowColor: string;
  vertices: { point: Point; label: string }[];
}

interface RitualStep {
  text: string;
  vibration?: string;
  note?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

// Pentagram vertices (200×200 viewBox, center 100,100, radius ~90)
const PENTA: Record<string, Point> = {
  Top:         { x: 100, y: 10  },  // Spirit
  UpperRight:  { x: 185, y: 72  },  // Water
  LowerRight:  { x: 153, y: 168 },  // Earth
  LowerLeft:   { x: 47,  y: 168 },  // Air
  UpperLeft:   { x: 15,  y: 72  },  // Fire
};

const PENTA_VERTICES = [
  { point: PENTA.Top,        label: 'Spirit' },
  { point: PENTA.UpperRight, label: 'Water'  },
  { point: PENTA.LowerRight, label: 'Earth'  },
  { point: PENTA.LowerLeft,  label: 'Air'    },
  { point: PENTA.UpperLeft,  label: 'Fire'   },
];

// Hexagram vertices (200×200 viewBox, center 100,100, outer radius 80)
const HEXA: Record<string, Point> = {
  Top:        { x: 100, y: 20  },
  UpperRight: { x: 169, y: 60  },
  LowerRight: { x: 169, y: 140 },
  Bottom:     { x: 100, y: 180 },
  LowerLeft:  { x: 31,  y: 140 },
  UpperLeft:  { x: 31,  y: 60  },
};

const HEXA_VERTICES = [
  { point: HEXA.Top,        label: 'Sol'    },
  { point: HEXA.UpperRight, label: 'Venus'  },
  { point: HEXA.LowerRight, label: 'Mercury'},
  { point: HEXA.Bottom,     label: 'Luna'   },
  { point: HEXA.LowerLeft,  label: 'Saturn' },
  { point: HEXA.UpperLeft,  label: 'Jupiter'},
];

// ─── Figure Builder ───────────────────────────────────────────────────────────

function buildEdges(pts: Point[], color: string, glowColor: string, vertices: { point: Point; label: string }[], edgeLabels: string[]): FigureData {
  const edges: Edge[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    edges.push({ from: pts[i], to: pts[i + 1], label: edgeLabels[i] ?? `Edge ${i + 1}` });
  }
  return { edges, color, glowColor, vertices };
}

// ─── Pentagram Figure Data ────────────────────────────────────────────────────

const LBRP_FIGURE: FigureData = buildEdges(
  [PENTA.LowerLeft, PENTA.Top, PENTA.LowerRight, PENTA.UpperLeft, PENTA.UpperRight, PENTA.LowerLeft],
  '#a0c0ff',
  'rgba(160, 192, 255, 0.8)',
  PENTA_VERTICES,
  [
    'Air → Spirit',
    'Spirit → Earth',
    'Earth → Fire',
    'Fire → Water',
    'Water → Air',
  ],
);

const SRP_FIGURES: Record<SRPElement, FigureData> = {
  'Spirit Active': buildEdges(
    [PENTA.Top, PENTA.UpperLeft, PENTA.LowerRight, PENTA.UpperRight, PENTA.LowerLeft, PENTA.Top],
    '#ffffff',
    'rgba(255,255,255,0.9)',
    PENTA_VERTICES,
    ['Spirit → Fire', 'Fire → Earth', 'Earth → Water', 'Water → Air', 'Air → Spirit'],
  ),
  'Spirit Passive': buildEdges(
    [PENTA.Top, PENTA.UpperRight, PENTA.LowerLeft, PENTA.UpperLeft, PENTA.LowerRight, PENTA.Top],
    '#f0f0ff',
    'rgba(240,240,255,0.9)',
    PENTA_VERTICES,
    ['Spirit → Water', 'Water → Air', 'Air → Fire', 'Fire → Earth', 'Earth → Spirit'],
  ),
  'Fire': buildEdges(
    [PENTA.UpperLeft, PENTA.Top, PENTA.LowerRight, PENTA.LowerLeft, PENTA.UpperRight, PENTA.UpperLeft],
    '#ff4500',
    'rgba(255,69,0,0.9)',
    PENTA_VERTICES,
    ['Fire → Spirit', 'Spirit → Earth', 'Earth → Air', 'Air → Water', 'Water → Fire'],
  ),
  'Water': buildEdges(
    [PENTA.UpperRight, PENTA.LowerLeft, PENTA.Top, PENTA.LowerRight, PENTA.UpperLeft, PENTA.UpperRight],
    '#4080ff',
    'rgba(64,128,255,0.9)',
    PENTA_VERTICES,
    ['Water → Air', 'Air → Spirit', 'Spirit → Earth', 'Earth → Fire', 'Fire → Water'],
  ),
  'Air': buildEdges(
    [PENTA.UpperLeft, PENTA.UpperRight, PENTA.LowerLeft, PENTA.Top, PENTA.LowerRight, PENTA.UpperLeft],
    '#80ffff',
    'rgba(128,255,255,0.9)',
    PENTA_VERTICES,
    ['Air → Water', 'Water → Air', 'Air → Spirit', 'Spirit → Earth', 'Earth → Air'],
  ),
  'Earth Banishing': buildEdges(
    [PENTA.LowerLeft, PENTA.Top, PENTA.LowerRight, PENTA.UpperLeft, PENTA.UpperRight, PENTA.LowerLeft],
    '#40c040',
    'rgba(64,192,64,0.9)',
    PENTA_VERTICES,
    ['Air → Spirit', 'Spirit → Earth', 'Earth → Fire', 'Fire → Water', 'Water → Air'],
  ),
  'Earth Invoking': buildEdges(
    [PENTA.UpperRight, PENTA.LowerLeft, PENTA.UpperLeft, PENTA.LowerRight, PENTA.Top, PENTA.UpperRight],
    '#c0ff80',
    'rgba(192,255,128,0.9)',
    PENTA_VERTICES,
    ['Water → Air', 'Air → Fire', 'Fire → Earth', 'Earth → Spirit', 'Spirit → Water'],
  ),
};

// LBRH has two triangles, so we treat them as separate figures concatenated
const LBRH_TRIANGLE1: FigureData = buildEdges(
  [HEXA.Top, HEXA.LowerRight, HEXA.LowerLeft, HEXA.Top],
  '#d4a0ff',
  'rgba(212,160,255,0.9)',
  HEXA_VERTICES,
  ['Sol → Mercury', 'Mercury → Saturn', 'Saturn → Sol'],
);

const LBRH_TRIANGLE2: FigureData = buildEdges(
  [HEXA.Bottom, HEXA.UpperRight, HEXA.UpperLeft, HEXA.Bottom],
  '#f0d060',
  'rgba(240,208,96,0.9)',
  HEXA_VERTICES,
  ['Luna → Venus', 'Venus → Jupiter', 'Jupiter → Luna'],
);

// Combined LBRH figure: triangle1 edges then triangle2 edges
const LBRH_FIGURE: FigureData = {
  edges: [...LBRH_TRIANGLE1.edges, ...LBRH_TRIANGLE2.edges],
  color: '#d4a0ff',
  glowColor: 'rgba(212,160,255,0.8)',
  vertices: HEXA_VERTICES,
};

// ─── Ritual Steps ─────────────────────────────────────────────────────────────

const LBRP_STEPS: RitualStep[] = [
  { text: 'Face East — Draw banishing Earth pentagram in glowing blue-white light', note: 'Begin at lower-left point (Air), trace upward to Spirit.' },
  { text: 'Point to the center of the pentagram and vibrate the Divine Name', vibration: 'YHVH', note: 'Yod-Heh-Vav-Heh. Feel the vibration expand outward as a beam of light.' },
  { text: 'Face South — Draw banishing Earth pentagram', note: 'Maintain the continuous arc of light connecting East to South.' },
  { text: 'Vibrate the Divine Name into the southern pentagram', vibration: 'ADONAI', note: 'Lord. Earth principle in its most exalted aspect.' },
  { text: 'Face West — Draw banishing Earth pentagram', note: 'The arc of light continues, completing the western quarter.' },
  { text: 'Vibrate the Divine Name into the western pentagram', vibration: 'EHEIEH', note: 'I Am That I Am. The eternal self-existing being.' },
  { text: 'Face North — Draw banishing Earth pentagram', note: 'The final quarter. The circle is nearly complete.' },
  { text: 'Vibrate the Divine Name into the northern pentagram', vibration: 'AGLA', note: 'Atah Gibor Le-olahm Adonai — Thou art mighty forever, O Lord.' },
  { text: 'Return to East — Trace the connecting line completing the circle of pentagrams', note: 'The four pentagrams are now linked by a ring of blue-white flame.' },
  { text: 'The Evocation of Archangels: Raphael (East), Michael (South), Gabriel (West), Uriel (North)', note: 'Visualize each Archangel as a vast pillar of elemental force at each quarter.' },
];

const LBRH_STEPS: RitualStep[] = [
  { text: 'Face East — Trace the first triangle (upward-pointing) of the hexagram', note: 'Begin at the top point (Sol), descend to Mercury, across to Saturn, return to Sol.' },
  { text: 'Trace the second triangle (downward-pointing) of the hexagram', note: 'Begin at the bottom point (Luna), rise to Venus, across to Jupiter, return to Luna.' },
  { text: 'Point to the center of the hexagram and vibrate the mystic word', vibration: 'ARARITA', note: 'Achad Rosh Achdotho Rosh Ichudo Temuratho Achad — One is His beginning; one is His individuality; His permutation is one.' },
  { text: 'Draw the Saturn glyph (♄) in the center of the hexagram', note: 'The cross of matter bearing the scythe of time. Saturn governs the structure of the ritual.' },
  { text: 'Face South — Repeat the full hexagram tracing', note: 'Solar force in the southern quarter. The same ARARITA vibration.' },
  { text: 'Face West — Repeat the full hexagram tracing', note: 'Lunar force in the western quarter.' },
  { text: 'Face North — Repeat the full hexagram tracing', note: 'Saturnine force completes the quaternary.' },
  { text: 'The Analysis of the Keyword (INRI)', vibration: 'INRI', note: 'Yod-Nun-Resh-Yod: Virgo, Scorpio, Sol, Virgo. IAO: Isis, Apophis, Osiris.' },
];

const SRP_STEPS: RitualStep[] = [
  { text: 'Face East — Trace the Spirit Active (invoking) pentagram', note: 'From Spirit, through Fire and Earth, the active force of Spirit descends.' },
  { text: 'Draw the Spirit wheel (a circle with cross ⊕) in the center of the pentagram', note: 'The Rose Cross within the circle: Spirit made manifest.' },
  { text: 'Vibrate the name of the Spirit of Air in the East', vibration: 'EXARP', note: 'The Enochian elemental tablet name governing the eastern tablet of Air.' },
  { text: 'Draw the Air sigil — the upward triangle bisected by a horizontal line', note: 'The alchemical glyph of Air: warmth and moisture ascending.' },
  { text: 'Face South — Trace Spirit Active pentagram, then Fire invoking pentagram', note: 'Two pentagrams at each quarter: Spirit first, then element.' },
  { text: 'Vibrate the name of the Spirit of Fire in the South', vibration: 'BITOM', note: 'Enochian Spirit of Fire. The consuming, purifying force.' },
  { text: 'Face West — Trace Spirit Active pentagram, then Water invoking pentagram', note: 'Spirit penetrates the western waters.' },
  { text: 'Vibrate the name of the Spirit of Water in the West', vibration: 'HCOMA', note: 'Enochian Spirit of Water. Dissolution and reflection.' },
  { text: 'Face North — Trace Spirit Active pentagram, then Earth invoking pentagram', note: 'Spirit descends into the northern earth.' },
  { text: 'Vibrate the name of the Spirit of Earth in the North', vibration: 'NANTA', note: 'Enochian Spirit of Earth. The foundation and crystallization of force.' },
];

// ─── Ritual Descriptions ──────────────────────────────────────────────────────

const RITUAL_INFO: Record<RitualKey, { title: string; subtitle: string; description: string; attributions: { label: string; value: string }[]; commentary: string }> = {
  LBRP: {
    title: 'Lesser Banishing Ritual of the Pentagram',
    subtitle: 'The foundational daily practice of the Western magical tradition',
    description: 'The LBRP establishes a purified magical space by tracing banishing Earth pentagrams at the four quarters, vibrating divine names, and evoking the four archangels as guardians. It is typically performed at the opening of any magical work to clear the operator\'s sphere of unwanted astral influences.',
    attributions: [
      { label: 'East', value: 'Raphael · Air · Swords · Dawn' },
      { label: 'South', value: 'Michael · Fire · Wands · Noon' },
      { label: 'West', value: 'Gabriel · Water · Cups · Dusk' },
      { label: 'North', value: 'Uriel · Earth · Pentacles · Midnight' },
    ],
    commentary: 'The LBRP operates primarily on the sphere of Malkuth, the manifest world, anchoring the operator in the center of the universe as a point of consciousness surrounded by angelic forces. The Earth banishing pentagram is used at all quarters because the ritual addresses earthly rather than celestial influences. Regular practice gradually sensitizes the operator to the subtle forces at work, transforming the ritual from a mechanical exercise into a genuine encounter with living intelligences.',
  },
  LBRH: {
    title: 'Lesser Ritual of the Hexagram (Banishing)',
    subtitle: 'The purification of the sphere of the higher forces',
    description: 'Where the LBRP works on the sphere of Malkuth, the LBRH operates on the planetary and celestial spheres above. The hexagram, composed of two interlaced triangles, represents the union of the macrocosm and microcosm. The banishing form clears the operator\'s sphere of planetary influences before invoking higher forces.',
    attributions: [
      { label: 'First Triangle', value: 'Upward-pointing · Fire · Sol ascending' },
      { label: 'Second Triangle', value: 'Downward-pointing · Water · Luna descending' },
      { label: 'ARARITA', value: 'The mystic word encoding the unity of the seven planets' },
      { label: 'Saturn glyph', value: 'Foundation of the planetary hierarchy' },
    ],
    commentary: 'The LBRH is traditionally performed immediately after the LBRP, completing the clearing of both the terrestrial and celestial spheres. The word ARARITA is a notariqon encoding one of the most profound statements of Unity in the Qabalah. The Analysis of the Keyword (INRI) that closes the ritual re-presents the formula of death and resurrection at the heart of the Western mysteries, recapitulating the entire descent and ascent of the soul.',
  },
  SRP: {
    title: 'Supreme Ritual of the Pentagram',
    subtitle: 'The invocation or banishment of specific elemental forces',
    description: 'The Supreme Ritual of the Pentagram is a more specialized and powerful form that employs different pentagram forms for each of the five elements. Unlike the LBRP which uses a single form at all quarters, the SRP directs specific elemental forces through carefully differentiated pentagram tracings, combined with Enochian divine names from the tablets of the elements.',
    attributions: [
      { label: 'East · Air', value: 'EXARP · Upward triangle bisected · Swords' },
      { label: 'South · Fire', value: 'BITOM · Upward triangle · Wands' },
      { label: 'West · Water', value: 'HCOMA · Downward triangle · Cups' },
      { label: 'North · Earth', value: 'NANTA · Downward triangle bisected · Pentacles' },
    ],
    commentary: 'The SRP represents the refinement of the pentagram rituals beyond the general banishing form. The dual tracing — Spirit first, then element — reflects the hermetic doctrine that all manifest forces are Spirit descending into differentiation. The Enochian divine names carry a specific vibrational quality that resonates with the elemental tablets received by John Dee and Edward Kelley in the sixteenth century, creating a bridge between the operator\'s sphere and the angelic governors of each element.',
  },
};

// ─── Utility ──────────────────────────────────────────────────────────────────

function dist(a: Point, b: Point): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─── SVG Components ───────────────────────────────────────────────────────────

interface AnimatedFigureProps {
  figure: FigureData;
  drawnEdges: number;
  animProgress: number;
  completedFlash: boolean;
  secondFigure?: FigureData | null;
  drawnEdgesOffset?: number;
}

function AnimatedFigure({ figure, drawnEdges, animProgress, completedFlash, secondFigure, drawnEdgesOffset = 0 }: AnimatedFigureProps) {
  const allEdges = secondFigure
    ? [...figure.edges, ...secondFigure.edges]
    : figure.edges;

  return (
    <>
      {/* Vertex dots */}
      {figure.vertices.map((v, i) => (
        <g key={`v-${i}`}>
          <circle
            cx={v.point.x}
            cy={v.point.y}
            r={4}
            fill="rgba(255,255,255,0.15)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1}
          />
          <text
            x={v.point.x}
            y={v.point.y - 8}
            textAnchor="middle"
            fontSize="7"
            fill="rgba(201,168,76,0.5)"
            fontFamily="Cinzel, serif"
            letterSpacing="0.05em"
          >
            {v.label}
          </text>
        </g>
      ))}

      {/* Completed edges */}
      {allEdges.map((edge, i) => {
        if (i >= drawnEdges) return null;
        const isLastCompleted = i === drawnEdges - 1;
        const color = secondFigure && i >= figure.edges.length
          ? secondFigure.color
          : figure.color;
        const glowColor = secondFigure && i >= figure.edges.length
          ? secondFigure.glowColor
          : figure.glowColor;

        return (
          <line
            key={`edge-${i}`}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke={color}
            strokeWidth={isLastCompleted ? 2.5 : 2}
            strokeLinecap="round"
            opacity={completedFlash ? 1 : (isLastCompleted ? 0.85 : 0.55)}
            style={{
              filter: isLastCompleted
                ? `drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 12px ${glowColor})`
                : completedFlash
                ? `drop-shadow(0 0 8px ${glowColor})`
                : 'none',
              transition: 'opacity 0.3s ease',
            }}
          />
        );
      })}

      {/* Currently animating edge */}
      {drawnEdges < allEdges.length && animProgress > 0 && (() => {
        const edge = allEdges[drawnEdges];
        const tx = lerp(edge.from.x, edge.to.x, animProgress);
        const ty = lerp(edge.from.y, edge.to.y, animProgress);
        const color = secondFigure && drawnEdges >= figure.edges.length
          ? secondFigure.color
          : figure.color;
        const glowColor = secondFigure && drawnEdges >= figure.edges.length
          ? secondFigure.glowColor
          : figure.glowColor;

        const totalLen = dist(edge.from, edge.to);
        const drawnLen = dist(edge.from, { x: tx, y: ty });
        const dashArray = `${drawnLen} ${totalLen}`;

        return (
          <>
            {/* Base animating line */}
            <line
              x1={edge.from.x}
              y1={edge.from.y}
              x2={tx}
              y2={ty}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              opacity={1}
              style={{
                filter: `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 16px ${glowColor}) drop-shadow(0 0 24px ${glowColor})`,
              }}
            />
            {/* Bright tip */}
            <circle
              cx={tx}
              cy={ty}
              r={4}
              fill={color}
              opacity={1}
              style={{
                filter: `drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 12px ${glowColor})`,
              }}
            />
          </>
        );
      })()}

      {/* Complete flash overlay */}
      {completedFlash && allEdges.map((edge, i) => {
        const color = secondFigure && i >= figure.edges.length
          ? secondFigure.color
          : figure.color;
        const glowColor = secondFigure && i >= figure.edges.length
          ? secondFigure.glowColor
          : figure.glowColor;
        return (
          <line
            key={`flash-${i}`}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke={color}
            strokeWidth={3.5}
            strokeLinecap="round"
            opacity={0.9}
            style={{
              filter: `drop-shadow(0 0 10px ${glowColor}) drop-shadow(0 0 20px ${glowColor}) drop-shadow(0 0 30px ${glowColor})`,
            }}
          />
        );
      })}
    </>
  );
}

// ─── Speed Settings ───────────────────────────────────────────────────────────

const SPEED_DURATIONS = {
  slow: 2400,
  medium: 1200,
  fast: 500,
};

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function RitualsPage() {
  const [currentRitual, setCurrentRitual] = useState<RitualKey>('LBRP');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [drawnEdges, setDrawnEdges] = useState<number>(0);
  const [animProgress, setAnimProgress] = useState<number>(0);
  const [srpElement, setSrpElement] = useState<SRPElement>('Spirit Active');
  const [completedFlash, setCompletedFlash] = useState<boolean>(false);
  const [speed, setSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');

  const rafRef = useRef<number | null>(null);
  const animStartRef = useRef<number | null>(null);
  const isAnimatingEdgeRef = useRef<boolean>(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derive current figure
  const currentFigure: FigureData = (() => {
    if (currentRitual === 'LBRP') return LBRP_FIGURE;
    if (currentRitual === 'LBRH') return LBRH_FIGURE;
    return SRP_FIGURES[srpElement];
  })();

  // Steps for current ritual
  const currentSteps: RitualStep[] = (() => {
    if (currentRitual === 'LBRP') return LBRP_STEPS;
    if (currentRitual === 'LBRH') return LBRH_STEPS;
    return SRP_STEPS;
  })();

  const totalEdges = currentFigure.edges.length;

  // ── Cleanup ─────────────────────────────────────────────────────────────────

  const cancelAnimation = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (flashTimerRef.current !== null) {
      clearTimeout(flashTimerRef.current);
      flashTimerRef.current = null;
    }
    isAnimatingEdgeRef.current = false;
    animStartRef.current = null;
  }, []);

  // ── Reset ────────────────────────────────────────────────────────────────────

  const resetState = useCallback(() => {
    cancelAnimation();
    setDrawnEdges(0);
    setAnimProgress(0);
    setCurrentStep(0);
    setIsPlaying(false);
    setCompletedFlash(false);
  }, [cancelAnimation]);

  // Reset when ritual or srp element changes
  useEffect(() => {
    resetState();
  }, [currentRitual, srpElement]);

  // ── Animate Single Edge ───────────────────────────────────────────────────────

  const animateEdge = useCallback((edgeIndex: number, onComplete: () => void) => {
    if (edgeIndex >= currentFigure.edges.length) {
      onComplete();
      return;
    }

    const duration = SPEED_DURATIONS[speed];
    isAnimatingEdgeRef.current = true;
    animStartRef.current = null;

    const frame = (timestamp: number) => {
      if (animStartRef.current === null) {
        animStartRef.current = timestamp;
      }
      const elapsed = timestamp - animStartRef.current;
      const t = Math.min(elapsed / duration, 1);
      setAnimProgress(t);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setAnimProgress(0);
        setDrawnEdges(edgeIndex + 1);
        isAnimatingEdgeRef.current = false;
        rafRef.current = null;
        animStartRef.current = null;
        onComplete();
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  }, [currentFigure.edges.length, speed]);

  // ── Trigger Flash When All Edges Done ────────────────────────────────────────

  const triggerCompleteFlash = useCallback(() => {
    setCompletedFlash(true);
    flashTimerRef.current = setTimeout(() => {
      setCompletedFlash(false);
      setIsPlaying(false);
    }, 1000);
  }, []);

  // ── Step Advancement ─────────────────────────────────────────────────────────

  const advanceEdge = useCallback((fromEdge: number) => {
    if (fromEdge >= totalEdges) {
      triggerCompleteFlash();
      return;
    }
    animateEdge(fromEdge, () => {
      // check if playing after edge completes
    });
  }, [totalEdges, animateEdge, triggerCompleteFlash]);

  // ── Auto-play ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isPlaying) return;
    if (drawnEdges >= totalEdges) {
      triggerCompleteFlash();
      return;
    }
    if (isAnimatingEdgeRef.current) return;

    const edgeToAnimate = drawnEdges;

    animateEdge(edgeToAnimate, () => {
      // After edge done, if still playing, the useEffect will fire again
    });

    return () => {
      // cleanup is handled by cancelAnimation
    };
  }, [isPlaying, drawnEdges, totalEdges, animateEdge, triggerCompleteFlash]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  // ── Manual Controls ───────────────────────────────────────────────────────────

  const handleNext = useCallback(() => {
    if (isAnimatingEdgeRef.current) return;
    if (drawnEdges >= totalEdges) return;
    cancelAnimation();
    setIsPlaying(false);
    animateEdge(drawnEdges, () => {});
    // advance step too
    setCurrentStep((prev: number) => Math.min(prev + 1, currentSteps.length - 1));
  }, [drawnEdges, totalEdges, animateEdge, cancelAnimation, currentSteps.length]);

  const handlePrev = useCallback(() => {
    cancelAnimation();
    setIsPlaying(false);
    setAnimProgress(0);
    setCompletedFlash(false);
    const newEdges = Math.max(0, drawnEdges - 1);
    setDrawnEdges(newEdges);
    setCurrentStep((prev: number) => Math.max(0, prev - 1));
  }, [drawnEdges, cancelAnimation]);

  const handleReset = useCallback(() => {
    resetState();
  }, [resetState]);

  const handleAutoToggle = useCallback(() => {
    if (isPlaying) {
      cancelAnimation();
      setIsPlaying(false);
    } else {
      if (drawnEdges >= totalEdges) {
        setDrawnEdges(0);
        setAnimProgress(0);
        setCurrentStep(0);
        setCompletedFlash(false);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, drawnEdges, totalEdges, cancelAnimation]);

  // Edge label for caption
  const currentEdgeLabel = (() => {
    if (drawnEdges >= totalEdges) return 'Figure complete';
    return currentFigure.edges[drawnEdges]?.label ?? '';
  })();

  const ritualInfo = RITUAL_INFO[currentRitual];

  // SRP Element subtabs
  const srpElements: SRPElement[] = [
    'Spirit Active',
    'Spirit Passive',
    'Fire',
    'Water',
    'Air',
    'Earth Invoking',
    'Earth Banishing',
  ];

  const srpElementColors: Record<SRPElement, string> = {
    'Spirit Active':   '#ffffff',
    'Spirit Passive':  '#c0c0ff',
    'Fire':            '#ff4500',
    'Water':           '#4080ff',
    'Air':             '#80ffff',
    'Earth Invoking':  '#c0ff80',
    'Earth Banishing': '#40c040',
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#05030d',
        color: '#f0e6d3',
        paddingBottom: '4rem',
      }}
    >
      {/* ── Page Header ── */}
      <header
        style={{
          textAlign: 'center',
          padding: '3rem 1.5rem 2rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center top, rgba(109,40,217,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <h1
          className="font-cinzel gold-shimmer"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            letterSpacing: '0.12em',
            marginBottom: '0.5rem',
            fontWeight: 700,
          }}
        >
          Sacred Ritual Tracing
        </h1>
        <p
          className="font-cormorant"
          style={{
            fontSize: '1.25rem',
            color: '#b8a8cc',
            letterSpacing: '0.05em',
            fontStyle: 'italic',
            marginBottom: '0.5rem',
          }}
        >
          Animate the geometric forms of classical ceremonial magic
        </p>
        <div className="ornament-divider" style={{ maxWidth: '400px', margin: '1.5rem auto 0' }}>
          <span className="font-fell" style={{ color: '#c9a84c', fontSize: '1.1rem' }}>✦</span>
        </div>
      </header>

      {/* ── Ritual Selector Tabs ── */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
        <div
          style={{
            display: 'flex',
            gap: '0',
            borderBottom: '1px solid rgba(201,168,76,0.2)',
            marginBottom: '1.5rem',
          }}
        >
          {(['LBRP', 'LBRH', 'SRP'] as RitualKey[]).map((ritual) => {
            const isActive = currentRitual === ritual;
            return (
              <button
                key={ritual}
                onClick={() => setCurrentRitual(ritual)}
                className="font-cinzel"
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  background: isActive ? 'rgba(201,168,76,0.08)' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #f0d060' : '2px solid transparent',
                  color: isActive ? '#f0d060' : '#b8a8cc',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 700 : 400,
                  textShadow: isActive ? '0 0 12px rgba(240,208,96,0.6)' : 'none',
                }}
              >
                {ritual}
              </button>
            );
          })}
        </div>

        {/* ── SRP Element Sub-tabs ── */}
        {currentRitual === 'SRP' && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              justifyContent: 'center',
            }}
          >
            {srpElements.map((el) => {
              const isActive = srpElement === el;
              const elColor = srpElementColors[el];
              return (
                <button
                  key={el}
                  onClick={() => setSrpElement(el)}
                  className="font-cinzel"
                  style={{
                    padding: '0.4rem 0.9rem',
                    background: isActive ? 'rgba(201,168,76,0.1)' : 'transparent',
                    border: `1px solid ${isActive ? elColor : 'rgba(201,168,76,0.2)'}`,
                    color: isActive ? elColor : '#b8a8cc',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    textShadow: isActive ? `0 0 8px ${elColor}` : 'none',
                    boxShadow: isActive ? `0 0 8px rgba(${elColor},0.2)` : 'none',
                  }}
                >
                  {el}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Main Two-Column Layout ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* ── LEFT: SVG Animation Frame ── */}
          <div>
            {/* SVG Container */}
            <div
              style={{
                background: 'radial-gradient(ellipse at center, #1a0d2e 0%, #05030d 80%)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '4px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                boxShadow: '0 0 40px rgba(109,40,217,0.15), inset 0 0 60px rgba(109,40,217,0.05)',
              }}
            >
              {/* Corner ornaments */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                <div
                  key={corner}
                  style={{
                    position: 'absolute',
                    [corner.includes('top') ? 'top' : 'bottom']: '6px',
                    [corner.includes('left') ? 'left' : 'right']: '6px',
                    width: '20px',
                    height: '20px',
                    borderTop: corner.includes('top') ? '1px solid rgba(201,168,76,0.5)' : 'none',
                    borderBottom: corner.includes('bottom') ? '1px solid rgba(201,168,76,0.5)' : 'none',
                    borderLeft: corner.includes('left') ? '1px solid rgba(201,168,76,0.5)' : 'none',
                    borderRight: corner.includes('right') ? '1px solid rgba(201,168,76,0.5)' : 'none',
                  }}
                />
              ))}

              {/* The SVG */}
              <svg
                viewBox="0 0 200 200"
                style={{
                  width: '100%',
                  maxWidth: '280px',
                  height: 'auto',
                  display: 'block',
                }}
                aria-label={`${currentRitual} figure animation`}
              >
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="rgba(10,5,20,0.7)"
                  stroke="rgba(201,168,76,0.1)"
                  strokeWidth="1"
                />

                {/* Faint circle connecting outer points (pentagram circumscribed circle) */}
                {currentRitual !== 'LBRH' && (
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(201,168,76,0.06)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                )}

                {/* LBRH inner circle for hexagram */}
                {currentRitual === 'LBRH' && (
                  <>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="1" strokeDasharray="3 4" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="1" />
                  </>
                )}

                {/* Animated figure */}
                <AnimatedFigure
                  figure={currentFigure}
                  drawnEdges={drawnEdges}
                  animProgress={animProgress}
                  completedFlash={completedFlash}
                />

                {/* Center dot */}
                <circle
                  cx="100"
                  cy="100"
                  r="3"
                  fill={completedFlash ? currentFigure.color : 'rgba(201,168,76,0.4)'}
                  style={{
                    filter: completedFlash ? `drop-shadow(0 0 6px ${currentFigure.glowColor})` : 'none',
                    transition: 'all 0.3s',
                  }}
                />

                {/* Saturn glyph center for LBRH when complete */}
                {currentRitual === 'LBRH' && drawnEdges >= totalEdges && (
                  <text
                    x="100"
                    y="105"
                    textAnchor="middle"
                    fontSize="20"
                    fill="rgba(212,160,255,0.7)"
                    fontFamily="serif"
                    style={{
                      filter: 'drop-shadow(0 0 4px rgba(212,160,255,0.5))',
                    }}
                  >
                    ♄
                  </text>
                )}
              </svg>

              {/* Caption */}
              <p
                className="font-cormorant"
                style={{
                  marginTop: '1rem',
                  fontSize: '0.85rem',
                  color: '#b8a8cc',
                  textAlign: 'center',
                  letterSpacing: '0.05em',
                  minHeight: '1.4em',
                  fontStyle: 'italic',
                }}
              >
                {drawnEdges >= totalEdges
                  ? '✦ Figure complete ✦'
                  : animProgress > 0
                  ? `Drawing: ${currentEdgeLabel}`
                  : drawnEdges === 0
                  ? 'Ready to begin tracing'
                  : `Next: ${currentEdgeLabel}`}
              </p>

              {/* Progress indicator */}
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  marginTop: '0.75rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {currentFigure.edges.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '24px',
                      height: '3px',
                      borderRadius: '2px',
                      background: i < drawnEdges
                        ? currentFigure.color
                        : i === drawnEdges
                        ? `rgba(${currentFigure.color}, 0.4)`
                        : 'rgba(255,255,255,0.1)',
                      transition: 'background 0.3s ease',
                      boxShadow: i < drawnEdges ? `0 0 4px ${currentFigure.glowColor}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Speed Controls */}
            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                justifyContent: 'center',
              }}
            >
              <span
                className="font-cinzel"
                style={{ fontSize: '0.65rem', color: '#b8a8cc', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Speed
              </span>
              {(['slow', 'medium', 'fast'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className="font-cinzel"
                  style={{
                    padding: '0.3rem 0.7rem',
                    background: speed === s ? 'rgba(201,168,76,0.15)' : 'transparent',
                    border: `1px solid ${speed === s ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
                    color: speed === s ? '#f0d060' : '#b8a8cc',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Playback Controls */}
            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={handlePrev}
                disabled={drawnEdges === 0 && !isAnimatingEdgeRef.current}
                className="btn-gold-outline"
                style={{
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.7rem',
                  opacity: drawnEdges === 0 ? 0.4 : 1,
                }}
              >
                ← Prev
              </button>

              <button
                onClick={handleAutoToggle}
                className={isPlaying ? 'btn-gold-filled' : 'btn-gold-outline'}
                style={{
                  padding: '0.6rem 1.4rem',
                  fontSize: '0.7rem',
                  minWidth: '80px',
                }}
              >
                {isPlaying ? '⏸ Pause' : '▶ Auto'}
              </button>

              <button
                onClick={handleNext}
                disabled={drawnEdges >= totalEdges}
                className="btn-gold-outline"
                style={{
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.7rem',
                  opacity: drawnEdges >= totalEdges ? 0.4 : 1,
                }}
              >
                Next →
              </button>

              <button
                onClick={handleReset}
                className="font-cinzel"
                style={{
                  padding: '0.6rem 1.2rem',
                  background: 'transparent',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: '#b8a8cc',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* ── RIGHT: Instructions Panel ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Current Step Card */}
            <div
              style={{
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.4)',
                borderRadius: '4px',
                padding: '1.25rem 1.5rem',
                position: 'relative',
                boxShadow: '0 0 20px rgba(201,168,76,0.08)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, #c9a84c, transparent)',
                }}
              />
              <p
                className="font-cinzel"
                style={{
                  fontSize: '0.6rem',
                  color: '#c9a84c',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '0.6rem',
                }}
              >
                Step {currentStep + 1} of {currentSteps.length}
              </p>
              <p
                className="font-cormorant"
                style={{
                  fontSize: '1.1rem',
                  color: '#f0e6d3',
                  lineHeight: 1.5,
                  marginBottom: currentSteps[currentStep]?.vibration ? '1rem' : '0',
                }}
              >
                {currentSteps[currentStep]?.text}
              </p>

              {/* Vibrational Name */}
              {currentSteps[currentStep]?.vibration && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <p
                    className="font-fell"
                    style={{
                      fontSize: '2rem',
                      color: '#f0d060',
                      letterSpacing: '0.25em',
                      textShadow: '0 0 16px rgba(240,208,96,0.7), 0 0 32px rgba(240,208,96,0.3)',
                      margin: '0.5rem 0',
                      lineHeight: 1.2,
                    }}
                  >
                    {currentSteps[currentStep].vibration}
                  </p>
                  <p
                    className="font-cormorant"
                    style={{
                      fontSize: '0.875rem',
                      color: '#b8a8cc',
                      fontStyle: 'italic',
                      marginTop: '0.25rem',
                    }}
                  >
                    To vibrate this name, feel the sound resonate in your chest as you exhale slowly.
                  </p>
                </div>
              )}

              {/* Note */}
              {currentSteps[currentStep]?.note && (
                <p
                  className="font-fell"
                  style={{
                    fontSize: '0.875rem',
                    color: '#b8a8cc',
                    fontStyle: 'italic',
                    borderLeft: '2px solid rgba(201,168,76,0.3)',
                    paddingLeft: '0.75rem',
                    marginTop: '0.5rem',
                  }}
                >
                  {currentSteps[currentStep].note}
                </p>
              )}
            </div>

            {/* All Steps List */}
            <div
              style={{
                background: 'rgba(15,11,26,0.6)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '4px',
                padding: '1rem',
                maxHeight: '320px',
                overflowY: 'auto',
              }}
            >
              <p
                className="font-cinzel"
                style={{
                  fontSize: '0.6rem',
                  color: '#c9a84c',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                All Steps
              </p>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {currentSteps.map((step, i) => {
                  const isCurrent = i === currentStep;
                  const isPast = i < currentStep;
                  const opacity = isCurrent ? 1 : isPast ? 0.7 : 0.35;

                  return (
                    <li
                      key={i}
                      onClick={() => setCurrentStep(i)}
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                        padding: '0.5rem 0.75rem',
                        background: isCurrent ? 'rgba(201,168,76,0.08)' : 'transparent',
                        border: isCurrent ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        opacity,
                      }}
                    >
                      <span
                        className="font-cinzel"
                        style={{
                          fontSize: '0.65rem',
                          color: isCurrent ? '#f0d060' : '#c9a84c',
                          minWidth: '1.5rem',
                          paddingTop: '0.15rem',
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}.
                      </span>
                      <span
                        className="font-cormorant"
                        style={{
                          fontSize: '0.9rem',
                          color: isCurrent ? '#f0e6d3' : '#b8a8cc',
                          lineHeight: 1.4,
                        }}
                      >
                        {step.text}
                        {step.vibration && (
                          <span
                            className="font-fell"
                            style={{
                              display: 'inline-block',
                              marginLeft: '0.5rem',
                              color: '#f0d060',
                              fontSize: '1rem',
                              opacity: 0.9,
                            }}
                          >
                            · {step.vibration}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Step navigation in right panel */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setCurrentStep((prev: number) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="btn-gold-outline"
                style={{ padding: '0.4rem 1rem', fontSize: '0.65rem', opacity: currentStep === 0 ? 0.4 : 1 }}
              >
                ← Previous Step
              </button>
              <button
                onClick={() => setCurrentStep((prev: number) => Math.min(currentSteps.length - 1, prev + 1))}
                disabled={currentStep === currentSteps.length - 1}
                className="btn-gold-outline"
                style={{ padding: '0.4rem 1rem', fontSize: '0.65rem', opacity: currentStep === currentSteps.length - 1 ? 0.4 : 1 }}
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>

        {/* ── Reference Info Section ── */}
        <div
          style={{
            marginTop: '3rem',
          }}
        >
          <div className="ornament-divider">
            <span className="font-fell" style={{ color: '#c9a84c', fontSize: '1rem' }}>✦</span>
          </div>

          <div
            className="mystic-card"
            style={{
              background: 'rgba(15,11,26,0.7)',
              borderRadius: '4px',
              padding: '2rem',
            }}
          >
            {/* Ritual title + description */}
            <h2
              className="font-cinzel"
              style={{
                fontSize: '1.2rem',
                color: '#f0d060',
                letterSpacing: '0.08em',
                marginBottom: '0.3rem',
              }}
            >
              {ritualInfo.title}
            </h2>
            <p
              className="font-cormorant"
              style={{
                fontSize: '1rem',
                color: '#b8a8cc',
                fontStyle: 'italic',
                marginBottom: '1rem',
              }}
            >
              {ritualInfo.subtitle}
            </p>
            <p
              className="font-cormorant"
              style={{
                fontSize: '1rem',
                color: '#f0e6d3',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {ritualInfo.description}
            </p>

            {/* Attributions */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.75rem',
              }}
            >
              {ritualInfo.attributions.map((attr: { label: string; value: string }, i: number) => (
                <div
                  key={i}
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(201,168,76,0.05)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: '3px',
                  }}
                >
                  <p
                    className="font-cinzel"
                    style={{
                      fontSize: '0.65rem',
                      color: '#c9a84c',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {attr.label}
                  </p>
                  <p
                    className="font-cormorant"
                    style={{
                      fontSize: '0.9rem',
                      color: '#f0e6d3',
                    }}
                  >
                    {attr.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Temple Commentary */}
            <div
              style={{
                borderTop: '1px solid rgba(201,168,76,0.15)',
                paddingTop: '1.25rem',
              }}
            >
              <p
                className="font-cinzel"
                style={{
                  fontSize: '0.65rem',
                  color: '#c9a84c',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                The Temple's Commentary
              </p>
              <p
                className="font-fell"
                style={{
                  fontSize: '1rem',
                  color: '#f0e6d3',
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  paddingLeft: '1rem',
                  borderLeft: '2px solid rgba(201,168,76,0.3)',
                }}
              >
                {ritualInfo.commentary}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
