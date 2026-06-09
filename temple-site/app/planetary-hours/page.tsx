'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Planet = 'Saturn' | 'Jupiter' | 'Mars' | 'Sun' | 'Venus' | 'Mercury' | 'Moon';

interface PlanetData {
  glyph: string;
  name: Planet;
  color: string;
  glowColor: string;
  bgColor: string;
  metal: string;
  day: string;
  advice: string[];
  keywords: string[];
  element: string;
  quality: string;
  deity: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  angle?: number;
  angleSpeed?: number;
  radius?: number;
}

interface HourInfo {
  planet: Planet;
  dayRuler: Planet;
  hourNumber: number;
  isDayHour: boolean;
  hourStart: Date;
  hourEnd: Date;
  nextHours: Planet[];
}

// ─── Planet Data ──────────────────────────────────────────────────────────────

const PLANETS: Record<Planet, PlanetData> = {
  Saturn: {
    glyph: '♄',
    name: 'Saturn',
    color: '#8b7355',
    glowColor: 'rgba(139,115,85,0.5)',
    bgColor: 'rgba(139,115,85,0.08)',
    metal: 'Lead',
    day: 'Saturday',
    element: 'Earth',
    quality: 'Cold & Dry',
    deity: 'Kronos',
    keywords: ['Discipline', 'Banishing', 'Karma', 'Time', 'Structure', 'Limits'],
    advice: [
      "Saturn's iron hour demands total accountability. Examine what structures in your life have grown rigid and must be released. This is the hour of discipline — commit to one difficult task and complete it without distraction. The weight you feel is not punishment; it is the ballast of wisdom.",
      "Under Saturn's austere gaze, perform your banishing work. Release debts, obligations, or patterns that drain without nourishing. The old must be cleared with intention before the new can root. Write what you release. Name it. Let it go.",
      "Kronos rules this hour — time itself bends to the will of the disciplined. Set long-term intentions, review karmic debts, and honor your ancestors and teachers. The seeds planted in Saturn's hour grow slowly, but they grow deep as iron roots.",
    ],
  },
  Jupiter: {
    glyph: '♃',
    name: 'Jupiter',
    color: '#4a90d9',
    glowColor: 'rgba(74,144,217,0.5)',
    bgColor: 'rgba(74,144,217,0.08)',
    metal: 'Tin',
    day: 'Thursday',
    element: 'Fire',
    quality: 'Warm & Moist',
    deity: 'Zeus',
    keywords: ['Abundance', 'Expansion', 'Wisdom', 'Justice', 'Fortune', 'Growth'],
    advice: [
      "Jupiter expands all it touches. This is the hour of abundance — make your request to the cosmos with certainty, not supplication. Prosperity rituals, legal matters, and appeals to authority all prosper under Jupiter's benevolent gaze. Ask grandly.",
      "The Great Benefic showers blessings freely. Study philosophy, consult a wise elder, or extend generous kindness without expectation. What you give freely now returns threefold in the next cycle. Generosity is the highest Jupiter magic.",
      "Beneath Jupiter's azure banner, your vision expands beyond ordinary limits. Map your highest aspiration — not what seems realistic, but what is truly desired in your deepest heart. The stars stretch to meet those bold enough to reach.",
    ],
  },
  Mars: {
    glyph: '♂',
    name: 'Mars',
    color: '#d9534f',
    glowColor: 'rgba(217,83,79,0.6)',
    bgColor: 'rgba(217,83,79,0.08)',
    metal: 'Iron',
    day: 'Tuesday',
    element: 'Fire',
    quality: 'Warm & Dry',
    deity: 'Ares',
    keywords: ['Courage', 'Action', 'Strength', 'Protection', 'Conflict', 'Victory'],
    advice: [
      "The iron hour of Mars burns cowardice to ash. What have you been delaying out of fear? Act now — this moment carries the force of the War God's spear. Strike at your obstacles with precision and uncompromising courage. Hesitation is the only true defeat.",
      "Mars rules physical vitality and righteous action. Channel raw force into a single focused movement. Protective magic, warding your sacred space, and defense of what matters are all potent in this hour. Guard what is holy to you with fierce intentionality.",
      "Ares stirs the blood and sharpens the will. If conflict is unavoidable, face it now with clear eyes and iron resolve. Do not seek victory alone — seek truth. Let Mars burn away the inessential so only what is real and worthy remains standing.",
    ],
  },
  Sun: {
    glyph: '☉',
    name: 'Sun',
    color: '#f0d060',
    glowColor: 'rgba(240,208,96,0.6)',
    bgColor: 'rgba(240,208,96,0.06)',
    metal: 'Gold',
    day: 'Sunday',
    element: 'Fire',
    quality: 'Warm & Dry',
    deity: 'Apollo',
    keywords: ['Success', 'Power', 'Health', 'Leadership', 'Clarity', 'Vitality'],
    advice: [
      "The Sun stands at the apex of all power. This is the hour of kings, healers, and those who lead by the light of their own being. Step into your authority without apology or qualification. Solar healing, rituals of success, and self-empowerment work are supremely potent now.",
      "Sol Invictus illuminates every shadow without exception. Seek clarity on whatever has been obscured or confused. Present any question to your oracle now — the solar hour pierces deception and brings truth to the surface like gold rising from dross.",
      "In the hour of the Golden King, align your will with your highest and most luminous purpose. What legacy do you truly wish to leave? The Sun burns generously for all — let your light, too, be offered openly, boldly, without condition.",
    ],
  },
  Venus: {
    glyph: '♀',
    name: 'Venus',
    color: '#b8d4a0',
    glowColor: 'rgba(184,212,160,0.5)',
    bgColor: 'rgba(184,212,160,0.06)',
    metal: 'Copper',
    day: 'Friday',
    element: 'Earth',
    quality: 'Warm & Moist',
    deity: 'Aphrodite',
    keywords: ['Love', 'Beauty', 'Attraction', 'Harmony', 'Arts', 'Pleasure'],
    advice: [
      "Aphrodite's hour is the sweetest gift of time. All works of love, beauty, and harmony flourish now like roses after rain. Draw your beloved closer, create with full intention, or simply allow yourself to receive pleasure without guilt or hurry.",
      "Venus rules the magnetic force of attraction — not merely romantic, but the deep pull that draws like to like across all planes. What do you most deeply wish to call into your life? Speak it now with feeling rather than logic. The heart is the true lodestone.",
      "Under Venus's copper light, mend what has been broken between yourself and another. Write the letter you have been too afraid to send. Beauty requires courage — it insists on genuine connection even when connection carries risk.",
    ],
  },
  Mercury: {
    glyph: '☿',
    name: 'Mercury',
    color: '#f0a040',
    glowColor: 'rgba(240,160,64,0.5)',
    bgColor: 'rgba(240,160,64,0.07)',
    metal: 'Quicksilver',
    day: 'Wednesday',
    element: 'Air',
    quality: 'Dry & Cold',
    deity: 'Hermes',
    keywords: ['Communication', 'Intellect', 'Travel', 'Commerce', 'Magic', 'Divination'],
    advice: [
      "Hermes flies swift and his hour belongs to every form of the Word. Every message, negotiation, act of writing or speaking carries extra potency now. Compose your most important communications, sign agreements, or begin a course of serious study.",
      "The Messenger and the Trickster share this hour — use both faces wisely. Mercury blesses those who think with agility and speak with precision. If you seek information, ask now. If you must persuade, speak now. The word is the wand, and this hour it is charged.",
      "Mercury rules the threshold between all worlds and states. This hour is sacred to diviners and magicians alike. Use any oracle — cards, runes, pendulum, mirror — to query what lies just beyond the boundary of ordinary knowing.",
    ],
  },
  Moon: {
    glyph: '☽',
    name: 'Moon',
    color: '#c8d4e8',
    glowColor: 'rgba(200,212,232,0.5)',
    bgColor: 'rgba(200,212,232,0.06)',
    metal: 'Silver',
    day: 'Monday',
    element: 'Water',
    quality: 'Cold & Moist',
    deity: 'Selene',
    keywords: ['Intuition', 'Dreams', 'Emotions', 'Cycles', 'Divination', 'Mystery'],
    advice: [
      "The Moon's hour is the most liminal of all — the membrane between dreaming and waking grows translucent. Trust every intuition that surfaces, however formless or strange it seems. The body knows. The deep self knows. Listen without trying to explain what arises.",
      "Luna governs the tides of emotion and the subterranean currents of memory. Whatever rises from the depths in this hour carries a genuine message from within. Do not rationalize it away. Sit with what comes. Write it down before it dissolves.",
      "In the silver hour of the Moon, all psychic and divinatory arts are amplified. Perform scrying, dream incubation, or meditation on water. The veil between worlds thins perceptibly here. Call upon your guides, ancestors, and the deeper current of your own soul.",
    ],
  },
};

const CHALDEAN: Planet[] = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];
const DAY_RULER_INDICES = [3, 6, 2, 5, 1, 4, 0]; // 0=Sun → index 3 = Sun in Chaldean

// ─── Sun Time Algorithm ───────────────────────────────────────────────────────

function getSunTimes(lat: number, lon: number, date: Date): { sunrise: Date; sunset: Date } {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const dayOfYear = (d: Date) => {
    const start = new Date(d.getFullYear(), 0, 0);
    return Math.floor((d.getTime() - start.getTime()) / 86400000);
  };
  const n = dayOfYear(date);
  const lngHour = lon / 15;
  const calcForSun = (isSunrise: boolean): Date | null => {
    const t = n + ((isSunrise ? 6 : 18) - lngHour) / 24;
    const M = 0.9856 * t - 3.289;
    const L = M + 1.916 * Math.sin(toRad(M)) + 0.02 * Math.sin(toRad(2 * M)) + 282.634;
    const RA = (toDeg(Math.atan(0.91764 * Math.tan(toRad(L)))) + 360) % 360;
    const Lquad = Math.floor(L / 90) * 90;
    const RAquad = Math.floor(RA / 90) * 90;
    const RAadj = (RA + (Lquad - RAquad)) / 15;
    const sinDec = 0.39782 * Math.sin(toRad(L));
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH =
      (Math.cos(toRad(90.833)) - sinDec * Math.sin(toRad(lat))) /
      (cosDec * Math.cos(toRad(lat)));
    if (cosH > 1 || cosH < -1) return null;
    const H = isSunrise
      ? (360 - toDeg(Math.acos(cosH))) / 15
      : toDeg(Math.acos(cosH)) / 15;
    const T = H + RAadj - 0.06571 * t - 6.622;
    const UT = ((T - lngHour) + 24) % 24;
    const localMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return new Date(localMidnight.getTime() + UT * 3600000);
  };
  const sunrise =
    calcForSun(true) ??
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6, 0);
  const sunset =
    calcForSun(false) ??
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0);
  return { sunrise, sunset };
}

// ─── Planetary Hour Algorithm ─────────────────────────────────────────────────

function getPlanetaryHourInfo(lat: number, lon: number, now: Date): HourInfo {
  const today = getSunTimes(lat, lon, now);
  const tomorrow = getSunTimes(lat, lon, new Date(now.getTime() + 86400000));

  const dayOfWeek = now.getDay();
  const dayRulerIndex = DAY_RULER_INDICES[dayOfWeek];

  let hourNumber: number;
  let isDayHour: boolean;
  let hourStart: Date;
  let hourEnd: Date;

  if (now >= today.sunrise && now < today.sunset) {
    // Day hours
    const dayLength = today.sunset.getTime() - today.sunrise.getTime();
    const hourLength = dayLength / 12;
    const elapsed = now.getTime() - today.sunrise.getTime();
    hourNumber = Math.floor(elapsed / hourLength);
    isDayHour = true;
    hourStart = new Date(today.sunrise.getTime() + hourNumber * hourLength);
    hourEnd = new Date(hourStart.getTime() + hourLength);
  } else {
    // Night hours
    const nightStartActual =
      now < today.sunrise
        ? getSunTimes(lat, lon, new Date(now.getTime() - 86400000)).sunset
        : today.sunset;
    const nextSunrise = now < today.sunrise ? today.sunrise : tomorrow.sunrise;
    const nightLength = nextSunrise.getTime() - nightStartActual.getTime();
    const nightHourLength = nightLength / 12;
    const elapsed = now.getTime() - nightStartActual.getTime();
    const nightHourNumber = Math.floor(elapsed / nightHourLength);
    hourNumber = 12 + nightHourNumber;
    isDayHour = false;
    hourStart = new Date(nightStartActual.getTime() + nightHourNumber * nightHourLength);
    hourEnd = new Date(hourStart.getTime() + nightHourLength);
  }

  const planet = CHALDEAN[(dayRulerIndex + hourNumber) % 7];
  const dayRuler = CHALDEAN[dayRulerIndex];

  const nextHours: Planet[] = [];
  for (let i = 1; i <= 6; i++) {
    nextHours.push(CHALDEAN[(dayRulerIndex + hourNumber + i) % 7]);
  }

  return { planet, dayRuler, hourNumber, isDayHour, hourStart, hourEnd, nextHours };
}

// ─── Format helpers ───────────────────────────────────────────────────────────

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSecs = Math.floor(ms / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

function ordinalHour(n: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

// ─── Particle system ──────────────────────────────────────────────────────────

function createParticle(planet: Planet, cx: number, cy: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random();

  switch (planet) {
    case 'Saturn': {
      const a = Math.random() * Math.PI * 2;
      return {
        x: cx, y: cy,
        vx: Math.cos(a) * (0.2 + Math.random() * 0.4),
        vy: Math.sin(a) * (0.2 + Math.random() * 0.4),
        size: 1 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4,
        life: 0, maxLife: 200 + Math.random() * 150,
        angle: a, angleSpeed: (Math.random() - 0.5) * 0.008,
        radius: Math.random() * 50,
      };
    }
    case 'Jupiter': {
      const large = Math.random() > 0.8;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * (0.5 + speed * 1.2),
        vy: Math.sin(angle) * (0.5 + speed * 1.2),
        size: large ? 3 + Math.random() * 2 : 1.5 + Math.random() * 1.5,
        opacity: large ? 0.5 + Math.random() * 0.3 : 0.3 + Math.random() * 0.4,
        life: 0, maxLife: 180 + Math.random() * 120,
      };
    }
    case 'Mars': {
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * (1.5 + speed * 3),
        vy: Math.sin(angle) * (1.5 + speed * 3),
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.6 + Math.random() * 0.4,
        life: 0, maxLife: 80 + Math.random() * 80,
      };
    }
    case 'Sun': {
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * (0.8 + speed * 1.8),
        vy: Math.sin(angle) * (0.8 + speed * 1.8),
        size: 1 + Math.random() * 2,
        opacity: 0.5 + Math.random() * 0.5,
        life: 0, maxLife: 140 + Math.random() * 100,
      };
    }
    case 'Venus': {
      const swirl = Math.random() * Math.PI * 2;
      return {
        x: cx + (Math.random() - 0.5) * 60,
        y: cy + (Math.random() - 0.5) * 60,
        vx: Math.cos(swirl) * (0.3 + Math.random() * 0.5),
        vy: Math.sin(swirl) * (0.3 + Math.random() * 0.5) - 0.2,
        size: 1.5 + Math.random() * 2,
        opacity: 0.25 + Math.random() * 0.4,
        life: 0, maxLife: 220 + Math.random() * 100,
        angle: swirl, angleSpeed: (Math.random() - 0.5) * 0.012,
        radius: 20 + Math.random() * 80,
      };
    }
    case 'Mercury': {
      return {
        x: cx, y: cy,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        size: 0.8 + Math.random() * 1.5,
        opacity: 0.5 + Math.random() * 0.5,
        life: 0, maxLife: 60 + Math.random() * 80,
      };
    }
    case 'Moon': {
      return {
        x: cx + (Math.random() - 0.5) * 200,
        y: cy + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.1 - Math.random() * 0.4,
        size: 1.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.3,
        life: 0, maxLife: 280 + Math.random() * 150,
      };
    }
  }
}

function getParticleColor(planet: Planet): string {
  switch (planet) {
    case 'Saturn': return `hsl(${35 + Math.random() * 20}, 40%, ${40 + Math.random() * 20}%)`;
    case 'Jupiter': return `hsl(${210 + Math.random() * 20}, 60%, ${50 + Math.random() * 20}%)`;
    case 'Mars': return Math.random() > 0.5 ? `hsl(${0 + Math.random() * 20}, 80%, 55%)` : `hsl(${20 + Math.random() * 20}, 90%, 55%)`;
    case 'Sun': return `hsl(${45 + Math.random() * 15}, 90%, ${60 + Math.random() * 20}%)`;
    case 'Venus': return `hsl(${100 + Math.random() * 40}, 40%, ${55 + Math.random() * 20}%)`;
    case 'Mercury': return Math.random() > 0.5 ? `hsl(${30 + Math.random() * 20}, 80%, 55%)` : `hsl(0, 0%, ${70 + Math.random() * 20}%)`;
    case 'Moon': return `hsl(${220 + Math.random() * 30}, 25%, ${70 + Math.random() * 20}%)`;
  }
}

// ─── Canvas Hook ──────────────────────────────────────────────────────────────

function useParticleCanvas(canvasRef: RefObject<HTMLCanvasElement | null>, planet: Planet) {
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Array<Particle & { color: string }>>([]);
  const planetRef = useRef<Planet>(planet);

  useEffect(() => {
    planetRef.current = planet;
    particlesRef.current = [];
  }, [planet]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const getParticleCount = (p: Planet) => {
      const counts: Record<Planet, number> = {
        Saturn: 30, Jupiter: 50, Mars: 60, Sun: 50, Venus: 35, Mercury: 45, Moon: 40,
      };
      return counts[p];
    };

    const tick = () => {
      if (!canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const p = planetRef.current;
      const count = getParticleCount(p);

      // Fill missing particles
      while (particlesRef.current.length < count) {
        const part = createParticle(p, cx, cy);
        particlesRef.current.push({ ...part, color: getParticleColor(p) });
      }
      // Trim excess
      if (particlesRef.current.length > count) {
        particlesRef.current = particlesRef.current.slice(0, count);
      }

      ctx.clearRect(0, 0, w, h);

      // Draw radial gradient background glow
      const planetData = PLANETS[p];
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.45);
      gradient.addColorStop(0, planetData.glowColor.replace('0.5', '0.07').replace('0.6', '0.07'));
      gradient.addColorStop(0.5, planetData.glowColor.replace('0.5', '0.03').replace('0.6', '0.03'));
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Update and draw particles
      const nextParticles: Array<Particle & { color: string }> = [];
      for (const part of particlesRef.current) {
        part.life++;

        if (part.life >= part.maxLife) {
          // Reset
          const newPart = createParticle(p, cx, cy);
          nextParticles.push({ ...newPart, color: getParticleColor(p) });
          continue;
        }

        const progress = part.life / part.maxLife;
        const fadeIn = Math.min(progress * 5, 1);
        const fadeOut = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
        const alpha = part.opacity * fadeIn * fadeOut;

        // Special movement for Saturn (spiral) and Venus (swirl)
        if (p === 'Saturn' && part.angle !== undefined && part.radius !== undefined) {
          part.angle += part.angleSpeed ?? 0.005;
          part.radius += 0.15;
          part.x = cx + Math.cos(part.angle) * part.radius;
          part.y = cy + Math.sin(part.angle) * part.radius;
        } else if (p === 'Venus' && part.angle !== undefined && part.radius !== undefined) {
          part.angle += part.angleSpeed ?? 0.01;
          part.x += part.vx + Math.cos(part.angle) * 0.3;
          part.y += part.vy + Math.sin(part.angle) * 0.3;
        } else {
          part.x += part.vx;
          part.y += part.vy;
        }

        // Sun shimmer: vary opacity sinusoidally
        const finalAlpha =
          p === 'Sun'
            ? alpha * (0.7 + 0.3 * Math.sin(part.life * 0.2))
            : alpha;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, finalAlpha));
        ctx.filter = `blur(${part.size * 0.4}px)`;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        ctx.fillStyle = part.color;
        ctx.fill();
        ctx.restore();

        nextParticles.push(part);
      }
      particlesRef.current = nextParticles;

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}

// ─── Glyph pulse keyframe injection ──────────────────────────────────────────

const STYLE_ID = 'planetary-glyph-pulse';

function injectGlyphPulse(planet: Planet) {
  const planetData = PLANETS[planet];
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `
    @keyframes planet-glow-pulse {
      0%, 100% {
        text-shadow:
          0 0 30px ${planetData.color},
          0 0 60px ${planetData.glowColor},
          0 0 90px ${planetData.glowColor};
        transform: scale(1);
      }
      50% {
        text-shadow:
          0 0 50px ${planetData.color},
          0 0 100px ${planetData.glowColor},
          0 0 140px ${planetData.glowColor};
        transform: scale(1.04);
      }
    }
    .planet-glyph-animated {
      animation: planet-glow-pulse 4s ease-in-out infinite;
      display: inline-block;
    }
  `;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#05030d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          border: '2px solid rgba(201,168,76,0.2)',
          borderTop: '2px solid #c9a84c',
          borderRadius: '50%',
          animation: 'spin 1.5s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p
        className="font-fell"
        style={{
          color: '#c9a84c',
          fontSize: '1.2rem',
          fontStyle: 'italic',
          letterSpacing: '0.08em',
        }}
      >
        Reading the heavens&hellip;
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PlanetaryHoursPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hourInfo, setHourInfo] = useState<HourInfo | null>(null);
  const [countdown, setCountdown] = useState('');
  const [adviceIndex, setAdviceIndex] = useState(0);
  const [glyphKey, setGlyphKey] = useState(0); // force remount for transition
  const prevPlanetRef = useRef<Planet | null>(null);
  const [now, setNow] = useState<Date>(new Date());

  // Set document title
  useEffect(() => {
    document.title = 'Planetary Hours | Aeternal Temple of Obsidian Flame';
  }, []);

  // Request geolocation on mount
  useEffect(() => {
    const fallback = { lat: 40.7128, lon: -74.006 };
    if (!navigator.geolocation) {
      setCoords(fallback);
      setIsLoading(false);
      return;
    }
    const id = setTimeout(() => {
      setCoords(fallback);
      setIsLoading(false);
    }, 8000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(id);
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setIsLoading(false);
      },
      () => {
        clearTimeout(id);
        setCoords(fallback);
        setIsLoading(false);
      },
      { timeout: 7000 }
    );
    return () => clearTimeout(id);
  }, []);

  // Inject glyph pulse styles on planet change
  const currentPlanet = hourInfo?.planet ?? null;
  useEffect(() => {
    if (currentPlanet) injectGlyphPulse(currentPlanet);
  }, [currentPlanet]);

  // Tick every second
  useEffect(() => {
    if (!coords) return;
    const tick = () => {
      const n = new Date();
      setNow(n);
      const info = getPlanetaryHourInfo(coords.lat, coords.lon, n);
      setHourInfo((prev: HourInfo | null) => {
        if (prev?.planet !== info.planet) {
          if (prevPlanetRef.current !== null) {
            setAdviceIndex(0);
            setGlyphKey((k: number) => k + 1);
          }
          prevPlanetRef.current = info.planet;
        }
        return info;
      });
      const remaining = info.hourEnd.getTime() - n.getTime();
      setCountdown(formatCountdown(remaining));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [coords]);

  // Canvas particle animation — planet changes are handled inside the hook
  useParticleCanvas(canvasRef, hourInfo?.planet ?? 'Moon');

  if (isLoading || !hourInfo) return <Spinner />;

  const planetData = PLANETS[hourInfo.planet];
  const dayRulerData = PLANETS[hourInfo.dayRuler];

  const handleNextAdvice = () => {
    setAdviceIndex((i: number) => (i + 1) % planetData.advice.length);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#05030d',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Page Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '0 auto',
          padding: '2rem 1.5rem 4rem',
        }}
      >
        {/* ── Header ── */}
        <header style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '1rem' }}>
          <p
            className="font-cinzel"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              color: '#c9a84c',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              opacity: 0.7,
            }}
          >
            Aeternal Temple of Obsidian Flame
          </p>
          <h1
            className="gold-shimmer font-cinzel"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              marginBottom: '0.5rem',
              lineHeight: 1.15,
            }}
          >
            The Planetary Hours
          </h1>
          <p
            className="font-fell"
            style={{
              color: '#b8a8cc',
              fontStyle: 'italic',
              fontSize: '1rem',
              opacity: 0.8,
            }}
          >
            Time as sacred architecture — each hour a gate to a different power
          </p>
        </header>

        {/* ── Ornament ── */}
        <div className="ornament-divider" style={{ margin: '1.5rem 0' }}>
          <span style={{ color: '#c9a84c', fontSize: '0.9rem' }}>✦</span>
        </div>

        {/* ── Central Planet Display ── */}
        <section style={{ textAlign: 'center', padding: '2rem 0 1.5rem' }}>
          {/* Glyph */}
          <div
            key={glyphKey}
            className="planet-glyph-animated"
            style={{
              fontSize: 'clamp(7rem, 16vw, 10rem)',
              color: planetData.color,
              lineHeight: 1,
              marginBottom: '0.5rem',
              display: 'inline-block',
              filter: `drop-shadow(0 0 30px ${planetData.glowColor})`,
            }}
            aria-label={planetData.name}
          >
            {planetData.glyph}
          </div>

          {/* Planet name */}
          <h2
            className="font-cinzel"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: planetData.color,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
              textShadow: `0 0 20px ${planetData.glowColor}`,
            }}
          >
            {planetData.name}
          </h2>

          {/* Deity */}
          <p
            className="font-cormorant"
            style={{
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#b8a8cc',
              letterSpacing: '0.08em',
            }}
          >
            {planetData.deity}, Ruler of this Hour
          </p>
        </section>

        {/* ── Three Info Panels ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            margin: '1.5rem 0',
          }}
          className="info-panels"
        >
          {/* Planetary Day */}
          <div
            className="mystic-card"
            style={{
              background: dayRulerData.bgColor,
              borderRadius: '4px',
              padding: '1.25rem 1rem',
              textAlign: 'center',
            }}
          >
            <p
              className="font-cinzel"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                color: '#b8a8cc',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Planetary Day
            </p>
            <p
              style={{
                fontSize: '1.6rem',
                color: dayRulerData.color,
                lineHeight: 1,
                marginBottom: '0.25rem',
              }}
            >
              {dayRulerData.glyph}
            </p>
            <p
              className="font-cinzel"
              style={{ fontSize: '0.85rem', color: dayRulerData.color, letterSpacing: '0.1em' }}
            >
              {dayRulerData.name}
            </p>
            <p
              className="font-cormorant"
              style={{ fontSize: '0.75rem', color: '#b8a8cc', marginTop: '0.2rem', fontStyle: 'italic' }}
            >
              {dayRulerData.day}
            </p>
          </div>

          {/* Current Hour */}
          <div
            className="mystic-card"
            style={{
              background: planetData.bgColor,
              borderRadius: '4px',
              padding: '1.25rem 1rem',
              textAlign: 'center',
              borderColor: `${planetData.color}44`,
            }}
          >
            <p
              className="font-cinzel"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                color: '#b8a8cc',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Current Hour
            </p>
            <p
              className="font-cinzel"
              style={{
                fontSize: '1.5rem',
                color: planetData.color,
                letterSpacing: '0.05em',
                marginBottom: '0.2rem',
              }}
            >
              {ordinalHour(hourInfo.isDayHour ? hourInfo.hourNumber + 1 : hourInfo.hourNumber - 12 + 1)}
            </p>
            <p
              className="font-cormorant"
              style={{ fontSize: '0.8rem', color: '#b8a8cc', fontStyle: 'italic' }}
            >
              {formatTime(hourInfo.hourStart)} – {formatTime(hourInfo.hourEnd)}
            </p>
          </div>

          {/* Hour Type */}
          <div
            className="mystic-card"
            style={{
              background: hourInfo.isDayHour
                ? 'rgba(240,208,96,0.04)'
                : 'rgba(200,212,232,0.04)',
              borderRadius: '4px',
              padding: '1.25rem 1rem',
              textAlign: 'center',
            }}
          >
            <p
              className="font-cinzel"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                color: '#b8a8cc',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Hour Type
            </p>
            <p
              style={{
                fontSize: '2rem',
                lineHeight: 1,
                marginBottom: '0.25rem',
                color: hourInfo.isDayHour ? '#f0d060' : '#c8d4e8',
              }}
            >
              {hourInfo.isDayHour ? '☀' : '☽'}
            </p>
            <p
              className="font-cinzel"
              style={{
                fontSize: '0.85rem',
                color: hourInfo.isDayHour ? '#f0d060' : '#c8d4e8',
                letterSpacing: '0.1em',
              }}
            >
              {hourInfo.isDayHour ? 'Diurnal' : 'Nocturnal'}
            </p>
            <p
              className="font-cormorant"
              style={{ fontSize: '0.75rem', color: '#b8a8cc', marginTop: '0.2rem', fontStyle: 'italic' }}
            >
              {hourInfo.isDayHour ? 'Hour of Light' : 'Hour of Shadow'}
            </p>
          </div>
        </div>

        {/* ── Countdown Timer ── */}
        <div
          style={{
            textAlign: 'center',
            margin: '2rem 0',
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${planetData.color}33`,
            borderRadius: '4px',
          }}
        >
          <p
            className="font-cinzel"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: '#b8a8cc',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Hour ends in
          </p>
          <p
            className="font-cinzel"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: planetData.color,
              fontVariantNumeric: 'tabular-nums',
              textShadow: `0 0 30px ${planetData.glowColor}, 0 0 60px ${planetData.glowColor}`,
              lineHeight: 1,
            }}
          >
            {countdown}
          </p>
        </div>

        {/* ── Ornament ── */}
        <div className="ornament-divider" style={{ margin: '1.5rem 0' }}>
          <span style={{ color: '#c9a84c', fontSize: '0.9rem' }}>✦</span>
        </div>

        {/* ── Advice Card ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(26,13,46,0.9) 0%, rgba(15,11,26,0.95) 100%)',
            border: `1px solid ${planetData.color}55`,
            borderRadius: '4px',
            padding: '2rem 2.5rem',
            margin: '0 0 1.5rem',
            position: 'relative',
            boxShadow: `0 0 40px ${planetData.bgColor}, inset 0 0 40px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Ornate corners */}
          <span
            style={{
              position: 'absolute', top: '0.6rem', left: '0.6rem',
              color: planetData.color, fontSize: '0.8rem', opacity: 0.6,
            }}
          >
            ✦
          </span>
          <span
            style={{
              position: 'absolute', top: '0.6rem', right: '0.6rem',
              color: planetData.color, fontSize: '0.8rem', opacity: 0.6,
            }}
          >
            ✦
          </span>
          <span
            style={{
              position: 'absolute', bottom: '0.6rem', left: '0.6rem',
              color: planetData.color, fontSize: '0.8rem', opacity: 0.6,
            }}
          >
            ✦
          </span>
          <span
            style={{
              position: 'absolute', bottom: '0.6rem', right: '0.6rem',
              color: planetData.color, fontSize: '0.8rem', opacity: 0.6,
            }}
          >
            ✦
          </span>

          <p
            className="font-cinzel"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: planetData.color,
              textTransform: 'uppercase',
              marginBottom: '1rem',
              textAlign: 'center',
              opacity: 0.8,
            }}
          >
            Oracle Counsel · {planetData.name}
          </p>

          <blockquote
            className="font-fell"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              fontStyle: 'italic',
              color: '#f0e6d3',
              lineHeight: 1.85,
              margin: 0,
              textAlign: 'center',
            }}
          >
            {planetData.advice[adviceIndex]}
          </blockquote>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              className="btn-gold-outline"
              onClick={handleNextAdvice}
              style={{
                borderColor: planetData.color,
                color: planetData.color,
              }}
            >
              Reveal Another Counsel
            </button>
          </div>
        </div>

        {/* ── Keywords ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            justifyContent: 'center',
            margin: '1.5rem 0',
          }}
        >
          {planetData.keywords.map((kw: string) => (
            <span
              key={kw}
              className="font-cinzel"
              style={{
                padding: '0.35rem 1rem',
                border: `1px solid ${planetData.color}55`,
                borderRadius: '2px',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: planetData.color,
                background: planetData.bgColor,
              }}
            >
              {kw}
            </span>
          ))}
        </div>

        {/* ── Ornament ── */}
        <div className="ornament-divider" style={{ margin: '1.5rem 0' }}>
          <span style={{ color: '#c9a84c', fontSize: '0.9rem' }}>✦</span>
        </div>

        {/* ── Planet Attributes ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            margin: '0 0 2rem',
          }}
        >
          {[
            { label: 'Sacred Metal', value: planetData.metal, icon: '⚗' },
            { label: 'Element', value: planetData.element, icon: '◈' },
            { label: 'Quality', value: planetData.quality, icon: '⊕' },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="mystic-card"
              style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '4px',
                padding: '1.25rem 1rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '1.4rem',
                  color: planetData.color,
                  marginBottom: '0.5rem',
                  opacity: 0.7,
                }}
              >
                {icon}
              </p>
              <p
                className="font-cinzel"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.25em',
                  color: '#b8a8cc',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                {label}
              </p>
              <p
                className="font-cormorant"
                style={{
                  fontSize: '1.1rem',
                  color: '#f0e6d3',
                  fontWeight: 500,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Next Hours ── */}
        <div>
          <p
            className="font-cinzel"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: '#b8a8cc',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            Upcoming Hours
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '0.6rem',
            }}
          >
            {hourInfo.nextHours.map((p: Planet, i: number) => {
              const pd = PLANETS[p];
              return (
                <div
                  key={i}
                  className="mystic-card"
                  style={{
                    background: pd.bgColor,
                    borderRadius: '4px',
                    padding: '0.85rem 0.5rem',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: '1.4rem',
                      color: pd.color,
                      lineHeight: 1,
                      marginBottom: '0.3rem',
                    }}
                  >
                    {pd.glyph}
                  </p>
                  <p
                    className="font-cinzel"
                    style={{
                      fontSize: '0.5rem',
                      letterSpacing: '0.1em',
                      color: pd.color,
                      textTransform: 'uppercase',
                    }}
                  >
                    {pd.name}
                  </p>
                  <p
                    className="font-cormorant"
                    style={{
                      fontSize: '0.65rem',
                      color: '#b8a8cc',
                      marginTop: '0.15rem',
                      fontStyle: 'italic',
                    }}
                  >
                    +{i + 1}h
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem' }}>
          <div className="ornament-divider" style={{ margin: '0 0 1.5rem' }}>
            <span style={{ color: '#c9a84c', fontSize: '0.9rem' }}>✦</span>
          </div>
          <p
            className="font-fell"
            style={{
              color: '#b8a8cc',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              opacity: 0.6,
              letterSpacing: '0.05em',
            }}
          >
            Calculated for your location &middot; Updated every second
          </p>
          <p
            className="font-cinzel"
            style={{
              color: '#c9a84c',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginTop: '0.5rem',
              opacity: 0.4,
            }}
          >
            {now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </footer>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 640px) {
          .info-panels {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 500px) {
          div[style*="repeat(6, 1fr)"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
