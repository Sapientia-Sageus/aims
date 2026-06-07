'use client';

import { useState, useEffect, useCallback, type CSSProperties } from 'react';

// ─── Julian Date & Time ────────────────────────────────────────────────────────

function getJulianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

function getT(jd: number): number {
  return (jd - 2451545.0) / 36525;
}

// ─── Angle Utilities ───────────────────────────────────────────────────────────

function norm360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

// ─── Sun Position ──────────────────────────────────────────────────────────────

function getSunLongitude(T: number): number {
  const L0 = norm360(280.46646 + 36000.76983 * T);
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mrad = toRad(M);
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
    0.000289 * Math.sin(3 * Mrad);
  const sunLon = L0 + C;
  const omega = norm360(125.04 - 1934.136 * T);
  return norm360(sunLon - 0.00569 - 0.00478 * Math.sin(toRad(omega)));
}

// ─── Moon Position ─────────────────────────────────────────────────────────────

function getMoonLongitude(T: number): number {
  const L = norm360(218.3165 + 481267.8813 * T);
  const M = norm360(357.5291 + 35999.0503 * T);
  const Mprime = norm360(134.9634 + 477198.8676 * T);
  const D = norm360(297.8502 + 445267.1115 * T);
  const F = norm360(93.272 + 483202.0175 * T);
  const lon =
    L +
    6.2888 * Math.sin(toRad(Mprime)) +
    1.274 * Math.sin(toRad(2 * D - Mprime)) +
    0.6583 * Math.sin(toRad(2 * D)) +
    0.2136 * Math.sin(toRad(2 * Mprime)) -
    0.1851 * Math.sin(toRad(M)) -
    0.1143 * Math.sin(toRad(2 * F)) +
    0.0588 * Math.sin(toRad(2 * D - 2 * Mprime)) +
    0.0572 * Math.sin(toRad(2 * D - M - Mprime)) +
    0.0533 * Math.sin(toRad(2 * D + Mprime));
  return norm360(lon);
}

// ─── Outer / Inner Planet Positions ───────────────────────────────────────────

interface OrbitalElements {
  L0: number;
  L1: number;
  a: number;
  e0: number;
  e1: number;
  i0: number;
  i1: number;
  omega0: number;
  omega1: number;
  varpi0: number;
  varpi1: number;
}

const ORBITAL_ELEMENTS: Record<string, OrbitalElements> = {
  Mercury: {
    L0: 252.2503235, L1: 149472.6741175,
    a: 0.38709927, e0: 0.20563593, e1: 0.00001906,
    i0: 7.00497902, i1: -0.00594749,
    omega0: 48.33076593, omega1: -0.12534081,
    varpi0: 77.45779628, varpi1: 0.16047689,
  },
  Venus: {
    L0: 181.9798009, L1: 58517.8153873,
    a: 0.72333566, e0: 0.00677672, e1: -0.00004107,
    i0: 3.39467605, i1: -0.0007889,
    omega0: 76.67984255, omega1: -0.27769418,
    varpi0: 131.60246718, varpi1: 0.00268329,
  },
  Mars: {
    L0: 355.45332, L1: 19140.30268,
    a: 1.52371034, e0: 0.0933941, e1: 0.00007882,
    i0: 1.84969142, i1: -0.00813131,
    omega0: 49.55953891, omega1: -0.29257343,
    varpi0: 336.06023395, varpi1: 0.44441088,
  },
  Jupiter: {
    L0: 34.39644051, L1: 3034.74612775,
    a: 5.202887, e0: 0.04838624, e1: -0.00013253,
    i0: 1.30439695, i1: -0.00183714,
    omega0: 100.47390909, omega1: 0.20469106,
    varpi0: 14.72847983, varpi1: 0.21252668,
  },
  Saturn: {
    L0: 50.07571329, L1: 1222.11494724,
    a: 9.53667594, e0: 0.05386179, e1: -0.00050991,
    i0: 2.48599187, i1: 0.00193609,
    omega0: 113.66242448, omega1: -0.28867794,
    varpi0: 92.59887831, varpi1: -0.41897216,
  },
  Uranus: {
    L0: 314.05500511, L1: 428.4660716,
    a: 19.18916464, e0: 0.04725744, e1: -0.00004397,
    i0: 0.77263783, i1: -0.00242939,
    omega0: 74.01692503, omega1: 0.04240589,
    varpi0: 170.9542763, varpi1: 0.40805281,
  },
  Neptune: {
    L0: 304.87997031, L1: 218.46515709,
    a: 30.06992276, e0: 0.00859048, e1: 0.00005105,
    i0: 1.77004347, i1: 0.00035372,
    omega0: 131.78422574, omega1: -0.00508664,
    varpi0: 44.96476227, varpi1: -0.32241464,
  },
};

function getPlanetGeoLongitude(
  name: string,
  T: number
): { longitude: number; retrograde: boolean } {
  const el = ORBITAL_ELEMENTS[name];
  const L = norm360(el.L0 + (el.L1 * T) / 36525);
  const varpi = norm360(el.varpi0 + el.varpi1 * T);
  const M = norm360(L - varpi);
  const Mrad = toRad(M);
  const C =
    (2 * el.e0 - (el.e0 * el.e0 * el.e0) / 4) * Math.sin(Mrad) +
    (5 / 4) * el.e0 * el.e0 * Math.sin(2 * Mrad) +
    (13 / 12) * el.e0 * el.e0 * el.e0 * Math.sin(3 * Mrad);
  const trueAnomaly = M + toDeg(C);
  const helioLon = norm360(trueAnomaly + varpi);
  const sunLon = getSunLongitude(T);
  let geoLon: number;
  if (el.a < 1.0) {
    const elongation = helioLon - norm360(sunLon + 180);
    geoLon = norm360(sunLon + elongation * (1 - el.a));
  } else {
    const parallax = toDeg(
      Math.atan2(
        Math.sin(toRad(sunLon + 180 - helioLon)),
        el.a - Math.cos(toRad(sunLon + 180 - helioLon))
      )
    );
    geoLon = norm360(helioLon + parallax);
  }
  const retrograde =
    el.a < 1.0
      ? Math.abs(norm360(geoLon - sunLon)) < 28
      : Math.abs(norm360(geoLon - sunLon) - 180) < 30;
  return { longitude: isNaN(geoLon) ? 0 : geoLon, retrograde };
}

function getPlutoLongitude(T: number): number {
  return norm360(298.5 + 1.4 * T);
}

// ─── Zodiac Signs ──────────────────────────────────────────────────────────────

interface SignDef {
  name: string;
  symbol: string;
  ruler: string;
  element: string;
  quality: string;
  start: number;
}

const SIGNS: SignDef[] = [
  { name: 'Aries',       symbol: '♈', ruler: 'Mars',    element: 'Fire',  quality: 'Cardinal', start: 0   },
  { name: 'Taurus',      symbol: '♉', ruler: 'Venus',   element: 'Earth', quality: 'Fixed',    start: 30  },
  { name: 'Gemini',      symbol: '♊', ruler: 'Mercury', element: 'Air',   quality: 'Mutable',  start: 60  },
  { name: 'Cancer',      symbol: '♋', ruler: 'Moon',    element: 'Water', quality: 'Cardinal', start: 90  },
  { name: 'Leo',         symbol: '♌', ruler: 'Sun',     element: 'Fire',  quality: 'Fixed',    start: 120 },
  { name: 'Virgo',       symbol: '♍', ruler: 'Mercury', element: 'Earth', quality: 'Mutable',  start: 150 },
  { name: 'Libra',       symbol: '♎', ruler: 'Venus',   element: 'Air',   quality: 'Cardinal', start: 180 },
  { name: 'Scorpio',     symbol: '♏', ruler: 'Mars',    element: 'Water', quality: 'Fixed',    start: 210 },
  { name: 'Sagittarius', symbol: '♐', ruler: 'Jupiter', element: 'Fire',  quality: 'Mutable',  start: 240 },
  { name: 'Capricorn',   symbol: '♑', ruler: 'Saturn',  element: 'Earth', quality: 'Cardinal', start: 270 },
  { name: 'Aquarius',    symbol: '♒', ruler: 'Saturn',  element: 'Air',   quality: 'Fixed',    start: 300 },
  { name: 'Pisces',      symbol: '♓', ruler: 'Jupiter', element: 'Water', quality: 'Mutable',  start: 330 },
];

function getSign(longitude: number): SignDef & { degree: number } {
  const safelon = isNaN(longitude) ? 0 : longitude;
  const idx = Math.floor(safelon / 30) % 12;
  return { ...SIGNS[idx], degree: safelon % 30 };
}

// ─── Dignities ─────────────────────────────────────────────────────────────────

const DIGNITIES: Record<
  string,
  { domicile: string[]; exaltation: string; detriment: string[]; fall: string }
> = {
  Sun:     { domicile: ['Leo'],                     exaltation: 'Aries',       detriment: ['Aquarius'],              fall: 'Libra'      },
  Moon:    { domicile: ['Cancer'],                  exaltation: 'Taurus',      detriment: ['Capricorn'],             fall: 'Scorpio'    },
  Mercury: { domicile: ['Gemini', 'Virgo'],         exaltation: 'Virgo',       detriment: ['Sagittarius', 'Pisces'], fall: 'Pisces'     },
  Venus:   { domicile: ['Taurus', 'Libra'],         exaltation: 'Pisces',      detriment: ['Aries', 'Scorpio'],      fall: 'Virgo'      },
  Mars:    { domicile: ['Aries', 'Scorpio'],        exaltation: 'Capricorn',   detriment: ['Taurus', 'Libra'],       fall: 'Cancer'     },
  Jupiter: { domicile: ['Sagittarius', 'Pisces'],   exaltation: 'Cancer',      detriment: ['Gemini', 'Virgo'],       fall: 'Capricorn'  },
  Saturn:  { domicile: ['Capricorn', 'Aquarius'],   exaltation: 'Libra',       detriment: ['Cancer', 'Leo'],         fall: 'Aries'      },
  Uranus:  { domicile: ['Aquarius'],                exaltation: 'Scorpio',     detriment: ['Leo'],                   fall: 'Taurus'     },
  Neptune: { domicile: ['Pisces'],                  exaltation: 'Cancer',      detriment: ['Virgo'],                 fall: 'Capricorn'  },
  Pluto:   { domicile: ['Scorpio'],                 exaltation: 'Aries',       detriment: ['Taurus'],                fall: 'Libra'      },
};

type DignityType = 'Domicile' | 'Exaltation' | 'Detriment' | 'Fall' | null;

function getDignity(planet: string, signName: string): DignityType {
  const d = DIGNITIES[planet];
  if (!d) return null;
  if (d.domicile.includes(signName)) return 'Domicile';
  if (d.exaltation === signName) return 'Exaltation';
  if (d.detriment.includes(signName)) return 'Detriment';
  if (d.fall === signName) return 'Fall';
  return null;
}

// ─── Aspects ───────────────────────────────────────────────────────────────────

interface AspectDef {
  name: string;
  angle: number;
  orb: number;
  symbol: string;
  color: string;
}

const ASPECTS: AspectDef[] = [
  { name: 'Conjunction', angle: 0,   orb: 8, symbol: '☌', color: '#f0d060' },
  { name: 'Opposition',  angle: 180, orb: 8, symbol: '☍', color: '#d9534f' },
  { name: 'Trine',       angle: 120, orb: 8, symbol: '△', color: '#4a90d9' },
  { name: 'Square',      angle: 90,  orb: 7, symbol: '□', color: '#e05c1a' },
  { name: 'Sextile',     angle: 60,  orb: 6, symbol: '⚹', color: '#6dbf67' },
];

interface ActiveAspect {
  planet1: string;
  planet2: string;
  aspect: AspectDef;
  orb: string;
}

function getAspects(positions: PlanetPosition[]): ActiveAspect[] {
  const result: ActiveAspect[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const diff = Math.abs(positions[i].longitude - positions[j].longitude);
      const angle = diff > 180 ? 360 - diff : diff;
      for (const asp of ASPECTS) {
        if (Math.abs(angle - asp.angle) <= asp.orb) {
          result.push({
            planet1: positions[i].name,
            planet2: positions[j].name,
            aspect: asp,
            orb: Math.abs(angle - asp.angle).toFixed(1),
          });
        }
      }
    }
  }
  return result;
}

// ─── Planet Display Data ───────────────────────────────────────────────────────

const PLANET_DISPLAY: Record<string, { glyph: string; color: string; order: number }> = {
  Sun:     { glyph: '☉', color: '#f0d060', order: 0 },
  Moon:    { glyph: '☽', color: '#d0d8f0', order: 1 },
  Mercury: { glyph: '☿', color: '#f0a040', order: 2 },
  Venus:   { glyph: '♀', color: '#a8d5a2', order: 3 },
  Mars:    { glyph: '♂', color: '#d9534f', order: 4 },
  Jupiter: { glyph: '♃', color: '#4a90d9', order: 5 },
  Saturn:  { glyph: '♄', color: '#8b7355', order: 6 },
  Uranus:  { glyph: '⛢', color: '#40c0b0', order: 7 },
  Neptune: { glyph: '♆', color: '#5060d0', order: 8 },
  Pluto:   { glyph: '♇', color: '#8060a0', order: 9 },
};

const ELEMENT_COLORS: Record<string, string> = {
  Fire:  '#e05c1a',
  Earth: '#6dbf67',
  Air:   '#f0d060',
  Water: '#4a90d9',
};

const ELEMENT_FILL: Record<string, string> = {
  Fire:  'rgba(224,92,26,0.08)',
  Earth: 'rgba(109,191,103,0.06)',
  Air:   'rgba(240,208,96,0.06)',
  Water: 'rgba(74,144,217,0.08)',
};

// ─── Types ─────────────────────────────────────────────────────────────────────

interface PlanetPosition {
  name: string;
  longitude: number;
  retrograde: boolean;
  signName: string;
  signSymbol: string;
  degree: number;
  element: string;
  quality: string;
  dignity: DignityType;
}

// ─── Position Calculation ──────────────────────────────────────────────────────

function calculatePositions(now: Date): PlanetPosition[] {
  const jd = getJulianDate(now);
  const T = getT(jd);

  const raw = [
    { name: 'Sun',     longitude: getSunLongitude(T),                    retrograde: false },
    { name: 'Moon',    longitude: getMoonLongitude(T),                   retrograde: false },
    { name: 'Mercury', ...getPlanetGeoLongitude('Mercury', T) },
    { name: 'Venus',   ...getPlanetGeoLongitude('Venus', T) },
    { name: 'Mars',    ...getPlanetGeoLongitude('Mars', T) },
    { name: 'Jupiter', ...getPlanetGeoLongitude('Jupiter', T) },
    { name: 'Saturn',  ...getPlanetGeoLongitude('Saturn', T) },
    { name: 'Uranus',  ...getPlanetGeoLongitude('Uranus', T) },
    { name: 'Neptune', ...getPlanetGeoLongitude('Neptune', T) },
    { name: 'Pluto',   longitude: getPlutoLongitude(T), retrograde: false },
  ];

  return raw.map((p) => {
    const lon = isNaN(p.longitude) ? 0 : p.longitude;
    const sign = getSign(lon);
    return {
      ...p,
      longitude: lon,
      signName: sign.name,
      signSymbol: sign.symbol,
      degree: sign.degree,
      element: sign.element,
      quality: sign.quality,
      dignity: getDignity(p.name, sign.name),
    };
  });
}

// ─── Cosmic Narrative Generator ────────────────────────────────────────────────

function generateCosmicNarrative(positions: PlanetPosition[]): string {
  const sun = positions.find((p) => p.name === 'Sun');
  const moon = positions.find((p) => p.name === 'Moon');
  const mercury = positions.find((p) => p.name === 'Mercury');
  const venus = positions.find((p) => p.name === 'Venus');
  const mars = positions.find((p) => p.name === 'Mars');
  const saturn = positions.find((p) => p.name === 'Saturn');
  const jupiter = positions.find((p) => p.name === 'Jupiter');

  const signDescriptions: Record<string, { season: string; nature: string; keywords: string }> = {
    Aries:       { season: 'the vernal ignition of all beginnings', nature: 'the cardinal fire of willful assertion', keywords: 'courage, initiative, and the raw force of becoming' },
    Taurus:      { season: 'the deep flowering of terrestrial delight', nature: 'the fixed earth of steadfast endurance', keywords: 'beauty, patience, and the luxuriant abundance of the senses' },
    Gemini:      { season: 'the mutable air of swift exchange and duality', nature: 'the mercurial wind of communication and inquiry', keywords: 'wit, curiosity, and the endless dance of twin perspectives' },
    Cancer:      { season: 'the cardinal water of soul-memory and sacred shelter', nature: 'the lunar tide of feeling and protection', keywords: 'nurturance, intuition, and the hearth-flame of belonging' },
    Leo:         { season: 'the fixed fire of sovereign radiance and creative will', nature: 'the solar blaze of self-expression and magnanimity', keywords: 'courage, generosity, and the lion-hearted art of living fully' },
    Virgo:       { season: 'the mutable earth of discernment and sacred craft', nature: 'the meticulous order of purification and service', keywords: 'precision, devotion, and the alchemy of the particular' },
    Libra:       { season: 'the cardinal air of justice, beauty, and relational grace', nature: 'the Venusian breath of harmony and aesthetic truth', keywords: 'balance, diplomacy, and the art of seeing another clearly' },
    Scorpio:     { season: 'the fixed water of transformative depth and hidden power', nature: 'the Plutonian crucible of death, desire, and regeneration', keywords: 'intensity, mystery, and the phoenix-fire of radical rebirth' },
    Sagittarius: { season: 'the mutable fire of philosophy, adventure, and divine seeking', nature: 'the Jovian arrow aimed at the farthest truth', keywords: 'wisdom, freedom, and the boundless hunger for meaning' },
    Capricorn:   { season: 'the cardinal earth of mastery, legacy, and mountainous ambition', nature: 'the Saturnine patience of those who build what endures', keywords: 'discipline, authority, and the slow forging of worthy achievement' },
    Aquarius:    { season: 'the fixed air of visionary rebellion and collective dreaming', nature: 'the Uranian lightning of revolution and brotherhood', keywords: 'innovation, liberation, and the radical love of all humanity' },
    Pisces:      { season: 'the mutable water of dissolution, mysticism, and boundless compassion', nature: 'the Neptunian ocean of dreams, unity, and sacred surrender', keywords: 'imagination, empathy, and the luminous dissolution of all barriers' },
  };

  // Build sentence 1: Sun's position + season
  const sunSign = sun ? signDescriptions[sun.signName] : null;
  const sunSentence = sun && sunSign
    ? `The Sun traverses ${sun.signName} — ${sunSign.season} — casting its sovereign light upon ${sunSign.keywords}.`
    : 'The Sun holds its station among the celestial spheres, its influence permeating all affairs.';

  // Build sentence 2: Moon's position + emotional quality
  const moonSign = moon ? signDescriptions[moon.signName] : null;
  const moonSentence = moon && moonSign
    ? `The Moon wanders through ${moon.signName}, coloring the emotional atmosphere with ${moonSign.keywords}; the tidal pull of feeling draws inward toward ${moonSign.nature}.`
    : 'The Moon moves in her eternal round, weaving the silver thread of intuition through the fabric of the day.';

  // Build sentence 3: Notable dignities or retrogrades
  const dignifiedPlanets = positions.filter(
    (p) => p.dignity === 'Domicile' || p.dignity === 'Exaltation'
  );
  const retrogradeplanets = positions.filter(
    (p) => p.retrograde && p.name !== 'Sun' && p.name !== 'Moon'
  );
  const detrimented = positions.filter(
    (p) => p.dignity === 'Detriment' || p.dignity === 'Fall'
  );

  let thirdSentence = '';
  if (dignifiedPlanets.length > 0) {
    const dp = dignifiedPlanets[0];
    const dignityPhrases: Record<string, string> = {
      Domicile:   'sits enthroned in its own domicile, operating with full sovereignty and unimpeded grace',
      Exaltation: 'ascends to its exaltation, expressing its highest and most refined nature',
    };
    const phrase = dignityPhrases[dp.dignity!] || 'holds dignity in the heavens';
    const planetDescriptions: Record<string, string> = {
      Sun:     'casting a luminous beneficence across all solar matters of will, leadership, and vitality',
      Moon:    'amplifying the psychic tides, dream-life, and the deep wells of memory and feeling',
      Mercury: 'lending unusual clarity and swiftness to thought, commerce, and all works of the word',
      Venus:   'pouring beauty, love, and abundance freely upon the world below',
      Mars:    'channeling courage, decisive action, and righteous force with uncompromised potency',
      Jupiter: 'expanding fortune, wisdom, and blessings with the fullness of the Great Benefic\'s power',
      Saturn:  'constructing enduring structures of discipline, mastery, and karmic accountability',
      Uranus:  'sparking revelation, liberation, and the brilliant chaos of necessary transformation',
      Neptune: 'dissolving boundaries and opening the oceanic current of vision and mystical perception',
      Pluto:   'wielding the alchemical power of death and regeneration with uncommon intensity',
    };
    const extra = planetDescriptions[dp.name] || 'operating with heightened power and focused intent';
    thirdSentence = `${dp.name} ${phrase} in ${dp.signName}, ${extra}.`;
  } else if (retrogradeplanets.length > 0) {
    const rp = retrogradeplanets[0];
    const retroDescriptions: Record<string, string> = {
      Mercury: 'Mercury\'s retrograde through ' + rp.signName + ' calls us to revisit unfinished communications, reconsider agreements, and retrieve wisdom from the recent past — a season of review, not retreat.',
      Venus:   'Venus turns retrograde in ' + rp.signName + ', drawing love-matters inward for reassessment; old connections resurface, and beauty must be found anew in what was overlooked.',
      Mars:    'Mars moves in apparent retrogression through ' + rp.signName + ', redirecting outward drives toward inner recalibration — the warrior sharpens his blade before battle resumes.',
      Jupiter: 'Jupiter retrograde in ' + rp.signName + ' asks us to seek expansion within rather than without, cultivating inner wisdom before seeking outer abundance.',
      Saturn:  'Saturn\'s retrograde through ' + rp.signName + ' compels a review of foundations, obligations, and the structures we have built — those that lack integrity now crumble to make way for what is sound.',
    };
    thirdSentence =
      retroDescriptions[rp.name] ||
      `${rp.name} appears to move in retrograde through ${rp.signName}, calling for reflection, revision, and the patient unraveling of matters ruled by its sphere.`;
  } else if (detrimented.length > 0) {
    const det = detrimented[0];
    const detPhrase =
      det.dignity === 'Detriment'
        ? `occupies its sign of detriment in ${det.signName}, straining against the grain of its nature — challenges here call for patience, humility, and adaptive wisdom.`
        : `stands at its fall in ${det.signName}, its energies somewhat subdued — an invitation to work with the friction rather than against it, finding hidden gifts in the difficulty.`;
    thirdSentence = `${det.name} ${detPhrase}`;
  } else if (saturn) {
    const saturnSign = signDescriptions[saturn.signName];
    const saturnPhrases: Record<string, string> = {
      Pisces:      'calling collective structures to dissolve and reform through intuition rather than rigidity',
      Aquarius:    'reordering society\'s norms, asking which rules truly serve the collective good',
      Capricorn:   'in its domicile, imposing rigorous order and demanding accountability from every institution',
      Aries:       'at its fall, wrestling with the tension between discipline and impulsive new beginnings',
      Cancer:      'in detriment, challenging the boundary between necessary structure and emotional openness',
    };
    const saturnComment = saturnPhrases[saturn.signName] || `navigating the ${saturnSign?.nature || 'celestial terrain'} with characteristic patience`;
    thirdSentence = `Saturn holds station in ${saturn.signName}, ${saturnComment} — wherever Kronos walks, time itself becomes a teacher.`;
  }

  // Build sentence 4: Stelliums, element balance, or Jupiter/Venus benefic note
  const signCounts: Record<string, string[]> = {};
  for (const p of positions) {
    if (!signCounts[p.signName]) signCounts[p.signName] = [];
    signCounts[p.signName].push(p.name);
  }
  const stelliums = Object.entries(signCounts).filter(([, ps]) => ps.length >= 3);

  let fourthSentence = '';
  if (stelliums.length > 0) {
    const [stelliumSign, stelliumPlanets] = stelliums[0];
    const signInfo = signDescriptions[stelliumSign];
    fourthSentence = `A potent stellium gathers in ${stelliumSign} — ${stelliumPlanets.join(', ')} converge their energies upon ${signInfo?.keywords || 'the affairs of this sign'}, forming a concentrated nexus of celestial intent that few lifetimes witness.`;
  } else if (venus && (venus.dignity === 'Domicile' || venus.dignity === 'Exaltation')) {
    fourthSentence = `Venus moves in the fullness of her power, suffusing the present moment with a rare receptivity to grace — beauty becomes a doorway to the divine, and the heart finds its truest longings honored by heaven.`;
  } else if (jupiter && (jupiter.dignity === 'Domicile' || jupiter.dignity === 'Exaltation')) {
    fourthSentence = `Jupiter's benefic influence falls powerfully across the chart, opening currents of fortune and philosophical insight — this is a season to ask boldly, to extend generosity freely, and to trust the expanding arc of providence.`;
  } else if (mars && mars.signName === 'Aries') {
    fourthSentence = `Mars blazes in Aries, its home sign and first throne — courage, initiative, and decisive will are the order of the hour; the cosmos rewards those who act from their deepest fire rather than waiting for permission from circumstance.`;
  } else {
    // Element balance reading
    const elementCount: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
    for (const p of positions) elementCount[p.element] = (elementCount[p.element] || 0) + 1;
    const dominant = Object.entries(elementCount).sort((a, b) => b[1] - a[1])[0];
    const elementReadings: Record<string, string> = {
      Fire:  'The heavens tilt toward Fire — a season of inspiration, bold action, and creative force courses through all earthly affairs; passion illuminates the path forward.',
      Earth: 'Earth predominates in this celestial hour — the cosmos invites grounding, practical mastery, and the slow alchemy of turning vision into tangible form.',
      Air:   'Air holds sway among the planets — intellect, communication, and the swift exchange of ideas animate the moment; speak, write, and connect with inspired intent.',
      Water: 'Water flows heavily through the chart — dreams, intuitions, and the tidal pull of emotion shape what is visible; trust the unseen current beneath all surface events.',
    };
    fourthSentence = elementReadings[dominant[0]] || 'The elements speak in their ancient harmonics, each lending its voice to the larger symphony of this cosmic hour.';
  }

  return [sunSentence, moonSentence, thirdSentence, fourthSentence].filter(Boolean).join(' ');
}

// ─── SVG Wheel Helpers ─────────────────────────────────────────────────────────

function lonToXY(lon: number, r: number, cx: number, cy: number) {
  const angle = toRad(90 - lon);
  return {
    x: cx + r * Math.cos(angle),
    y: cy - r * Math.sin(angle),
  };
}

function polarToXY(angleDeg: number, r: number, cx: number, cy: number) {
  const rad = toRad(angleDeg);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// ─── Zodiac Wheel Component ────────────────────────────────────────────────────

function ZodiacWheel({ positions }: { positions: PlanetPosition[] }) {
  const cx = 250;
  const cy = 250;
  const R_OUTER = 240;
  const R_SIGN_INNER = 185;
  const R_PLANET = 152;
  const R_ASPECT = 95;
  const R_CENTER = 32;

  const aspects = getAspects(positions);

  // Cluster planets that are within 10° of each other to avoid label overlap
  function getDisplayRadius(lon: number, planetName: string): number {
    const baseR = R_PLANET;
    const nearby = positions.filter(
      (p) =>
        p.name !== planetName &&
        Math.abs(
          Math.min(Math.abs(p.longitude - lon), 360 - Math.abs(p.longitude - lon))
        ) < 12
    );
    if (nearby.length === 0) return baseR;
    const idx = positions.findIndex((p) => p.name === planetName);
    const nearbyIndices = nearby
      .map((p) => positions.findIndex((q) => q.name === p.name))
      .sort((a, b) => a - b);
    const myRank = nearbyIndices.filter((i) => i < idx).length;
    return baseR - myRank * 18;
  }

  // Sector path for a 30° sign slice
  function sectorPath(startDeg: number, endDeg: number, r1: number, r2: number) {
    const s1 = polarToXY(startDeg, r1, cx, cy);
    const s2 = polarToXY(startDeg, r2, cx, cy);
    const e1 = polarToXY(endDeg, r1, cx, cy);
    const e2 = polarToXY(endDeg, r2, cx, cy);
    return `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y} A ${r2} ${r2} 0 0 1 ${e2.x} ${e2.y} L ${e1.x} ${e1.y} A ${r1} ${r1} 0 0 0 ${s1.x} ${s1.y} Z`;
  }

  return (
    <svg
      viewBox="0 0 500 500"
      width="100%"
      style={{ display: 'block', maxWidth: '500px', margin: '0 auto' }}
      aria-label="Zodiac Wheel"
    >
      {/* Defs: gradients and filters */}
      <defs>
        <radialGradient id="wheelBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a0d2e" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#0f0b1a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#05030d" stopOpacity="1" />
        </radialGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background fill */}
      <circle cx={cx} cy={cy} r={R_OUTER} fill="url(#wheelBg)" />

      {/* Sign sectors */}
      {SIGNS.map((sign, i) => {
        // SVG convention: 0° = 3 o'clock, going clockwise
        // Zodiac: 0° Aries = 12 o'clock, increasing counter-clockwise
        // So SVG start angle for sign i: -(90 + i*30) = start from Aries at top going CCW
        // Since SVG arcs go clockwise, we flip: startAngle = 90 - (i+1)*30 = sector end in SVG
        const svgStart = 90 - (i + 1) * 30;
        const svgEnd = 90 - i * 30;
        return (
          <g key={sign.name}>
            <path
              d={sectorPath(svgStart, svgEnd, R_SIGN_INNER, R_OUTER)}
              fill={ELEMENT_FILL[sign.element]}
              stroke="rgba(201,168,76,0.25)"
              strokeWidth="0.5"
            />
          </g>
        );
      })}

      {/* Sign glyphs */}
      {SIGNS.map((sign, i) => {
        const midAngleDeg = 90 - i * 30 - 15; // midpoint SVG angle
        const midRad = toRad(midAngleDeg);
        const r = (R_SIGN_INNER + R_OUTER) / 2;
        const gx = cx + r * Math.cos(midRad);
        const gy = cy + r * Math.sin(midRad);
        return (
          <text
            key={sign.name}
            x={gx}
            y={gy}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="14"
            fill={ELEMENT_COLORS[sign.element]}
            opacity="0.9"
            style={{ fontFamily: 'serif', userSelect: 'none' }}
          >
            {sign.symbol}
          </text>
        );
      })}

      {/* Outer ring border */}
      <circle cx={cx} cy={cy} r={R_OUTER}   fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={R_SIGN_INNER} fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" />

      {/* Sign divider lines — 30° radial lines from inner to outer ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angleDeg = 90 - i * 30;
        const inner = polarToXY(angleDeg, R_SIGN_INNER, cx, cy);
        const outer = polarToXY(angleDeg, R_OUTER, cx, cy);
        return (
          <line
            key={i}
            x1={inner.x} y1={inner.y}
            x2={outer.x} y2={outer.y}
            stroke="rgba(201,168,76,0.35)"
            strokeWidth="0.7"
          />
        );
      })}

      {/* Subtle degree tick marks (every 10°) inside the sign ring */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angleDeg = 90 - i * 10;
        const isSign = i % 3 === 0;
        if (isSign) return null;
        const inner = polarToXY(angleDeg, R_SIGN_INNER, cx, cy);
        const outer = polarToXY(angleDeg, R_SIGN_INNER + 6, cx, cy);
        return (
          <line
            key={i}
            x1={inner.x} y1={inner.y}
            x2={outer.x} y2={outer.y}
            stroke="rgba(201,168,76,0.18)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Aspect lines */}
      {aspects.map((asp, idx) => {
        const p1 = positions.find((p) => p.name === asp.planet1);
        const p2 = positions.find((p) => p.name === asp.planet2);
        if (!p1 || !p2) return null;
        const pt1 = lonToXY(p1.longitude, R_ASPECT, cx, cy);
        const pt2 = lonToXY(p2.longitude, R_ASPECT, cx, cy);
        return (
          <line
            key={idx}
            x1={pt1.x} y1={pt1.y}
            x2={pt2.x} y2={pt2.y}
            stroke={asp.aspect.color}
            strokeWidth="0.8"
            opacity="0.28"
          />
        );
      })}

      {/* Planets */}
      {positions.map((p) => {
        const disp = PLANET_DISPLAY[p.name];
        const displayR = getDisplayRadius(p.longitude, p.name);
        const { x, y } = lonToXY(p.longitude, displayR, cx, cy);

        return (
          <g key={p.name} filter="url(#softGlow)">
            {/* Planet dot */}
            <circle
              cx={x} cy={y} r={9}
              fill={disp.color}
              fillOpacity="0.18"
              stroke={disp.color}
              strokeWidth="1.2"
            />
            {/* Planet glyph */}
            <text
              x={x} y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10"
              fill={disp.color}
              style={{ fontFamily: 'serif', userSelect: 'none' }}
            >
              {disp.glyph}
            </text>
            {/* Retrograde marker */}
            {p.retrograde && (
              <text
                x={x + 9} y={y - 7}
                fontSize="6"
                fill="#d9534f"
                style={{ fontFamily: 'serif', fontStyle: 'italic' }}
              >
                ℞
              </text>
            )}
            {/* Small degree label */}
            <text
              x={x} y={y + 15}
              textAnchor="middle"
              fontSize="5.5"
              fill={disp.color}
              opacity="0.7"
              style={{ fontFamily: 'monospace' }}
            >
              {p.degree.toFixed(0)}°
            </text>
          </g>
        );
      })}

      {/* Inner circles */}
      <circle cx={cx} cy={cy} r={R_ASPECT + 10} fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={R_CENTER + 8}  fill="rgba(15,11,26,0.85)" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />

      {/* Center emblem */}
      <text
        x={cx} y={cy - 6}
        textAnchor="middle"
        fontSize="11"
        fill="#c9a84c"
        opacity="0.8"
        style={{ fontFamily: 'serif', letterSpacing: '0.05em' }}
      >
        ATOF
      </text>
      <text
        x={cx} y={cy + 8}
        textAnchor="middle"
        fontSize="9"
        fill="#c9a84c"
        opacity="0.5"
        style={{ fontFamily: 'serif' }}
      >
        🜂
      </text>
    </svg>
  );
}

// ─── Element Balance Bar ───────────────────────────────────────────────────────

function ElementBalance({ positions }: { positions: PlanetPosition[] }) {
  const counts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  for (const p of positions) {
    counts[p.element] = (counts[p.element] || 0) + 1;
  }
  const total = positions.length;
  const elements = ['Fire', 'Earth', 'Air', 'Water'];

  return (
    <div style={{ marginTop: '0.75rem' }}>
      <p
        className="font-cinzel"
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: '#b8a8cc',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}
      >
        Element Balance
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {elements.map((el) => {
          const count = counts[el] || 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={el} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span
                className="font-cinzel"
                style={{
                  width: '42px',
                  fontSize: '0.55rem',
                  color: ELEMENT_COLORS[el],
                  letterSpacing: '0.1em',
                  flexShrink: 0,
                }}
              >
                {el}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '5px',
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: ELEMENT_COLORS[el],
                    borderRadius: '3px',
                    opacity: 0.75,
                  }}
                />
              </div>
              <span
                className="font-cinzel"
                style={{ fontSize: '0.55rem', color: ELEMENT_COLORS[el], width: '14px', textAlign: 'right' }}
              >
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Quality Balance ───────────────────────────────────────────────────────────

function QualityBalance({ positions }: { positions: PlanetPosition[] }) {
  const counts: Record<string, number> = { Cardinal: 0, Fixed: 0, Mutable: 0 };
  for (const p of positions) {
    counts[p.quality] = (counts[p.quality] || 0) + 1;
  }
  const qualityColors: Record<string, string> = {
    Cardinal: '#f0d060',
    Fixed:    '#d9534f',
    Mutable:  '#6dbf67',
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <p
        className="font-cinzel"
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: '#b8a8cc',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}
      >
        Quality Balance
      </p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {['Cardinal', 'Fixed', 'Mutable'].map((q) => (
          <div
            key={q}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '0.5rem 0.25rem',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${qualityColors[q]}22`,
              borderRadius: '3px',
            }}
          >
            <p
              className="font-cinzel"
              style={{ fontSize: '1rem', color: qualityColors[q], fontWeight: 700 }}
            >
              {counts[q]}
            </p>
            <p
              className="font-cinzel"
              style={{ fontSize: '0.5rem', color: '#b8a8cc', letterSpacing: '0.1em' }}
            >
              {q}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Dignity Badge ─────────────────────────────────────────────────────────────

function DignityBadge({ dignity }: { dignity: DignityType }) {
  if (!dignity) return null;
  const config: Record<string, { bg: string; color: string; border: string }> = {
    Domicile:   { bg: 'rgba(201,168,76,0.15)',   color: '#c9a84c', border: 'rgba(201,168,76,0.4)' },
    Exaltation: { bg: 'rgba(74,144,217,0.15)',   color: '#4a90d9', border: 'rgba(74,144,217,0.4)' },
    Detriment:  { bg: 'rgba(217,83,79,0.12)',    color: '#d9534f', border: 'rgba(217,83,79,0.35)' },
    Fall:       { bg: 'rgba(120,120,120,0.12)',  color: '#8a8a9a', border: 'rgba(120,120,120,0.3)' },
  };
  const c = config[dignity];
  return (
    <span
      className="font-cinzel"
      style={{
        fontSize: '0.5rem',
        padding: '0.15rem 0.45rem',
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        borderRadius: '2px',
        letterSpacing: '0.12em',
        whiteSpace: 'nowrap',
      }}
    >
      {dignity}
    </span>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────

export default function AstrologyPage() {
  const [positions, setPositions] = useState<PlanetPosition[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    document.title = 'Celestial Map | Aeternal Temple of Obsidian Flame';
  }, []);

  const refresh = useCallback(() => {
    const now = new Date();
    setPositions(calculatePositions(now));
    setLastUpdated(now);
  }, []);

  // Initial calculation + 60-second interval
  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 60000);
    return () => clearInterval(interval);
  }, [refresh]);

  // Tick for the live clock (doesn't recalculate planet positions)
  useEffect(() => {
    const t = setInterval(() => setTick((n: number) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);
  void tick; // used to trigger re-render for live clock display

  const aspects = positions.length > 0 ? getAspects(positions) : [];
  const dignifiedPlanets = positions.filter(
    (p: PlanetPosition) => p.dignity === 'Domicile' || p.dignity === 'Exaltation'
  );
  const narrative = positions.length > 0 ? generateCosmicNarrative(positions) : '';

  const cardStyle: CSSProperties = {
    background: 'rgba(15,11,26,0.8)',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: '4px',
    padding: '1.5rem',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#05030d',
        color: '#f0e6d3',
      }}
    >
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <header style={{ textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '1.5rem' }}>
          <p
            className="font-cinzel"
            style={{
              fontSize: '0.65rem',
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
            The Celestial Map
          </h1>
          <p
            className="font-fell"
            style={{
              color: '#b8a8cc',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              opacity: 0.85,
              marginBottom: '1.25rem',
            }}
          >
            Where the Stars Stand Now
          </p>

          {/* Updated timestamp + refresh button */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.4rem 1rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '3px',
            }}
          >
            <span
              className="font-cinzel"
              style={{ fontSize: '0.6rem', color: '#b8a8cc', letterSpacing: '0.12em' }}
            >
              {lastUpdated
                ? `Updated: ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
                : 'Calculating…'}
            </span>
            <button
              onClick={refresh}
              className="font-cinzel"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                background: 'transparent',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: '2px',
                padding: '0.25rem 0.65rem',
                cursor: 'pointer',
              }}
            >
              Refresh
            </button>
          </div>
        </header>

        {/* ── Ornament ──────────────────────────────────────────────────────── */}
        <div className="ornament-divider" style={{ margin: '1rem 0 2rem' }}>
          <span style={{ color: '#c9a84c', fontSize: '0.9rem' }}>✦</span>
        </div>

        {/* ── Two-column layout: Wheel + Planet Table ──────────────────────── */}
        {positions.length > 0 && (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                marginBottom: '2.5rem',
                alignItems: 'start',
              }}
              className="astro-main-grid"
            >
              {/* ── Left: Zodiac Wheel ── */}
              <div style={cardStyle}>
                <p
                  className="font-cinzel"
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.3em',
                    color: '#c9a84c',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    textAlign: 'center',
                  }}
                >
                  Sky Chart
                </p>
                <ZodiacWheel positions={positions} />

                {/* Live time below wheel */}
                <p
                  className="font-cinzel"
                  style={{
                    textAlign: 'center',
                    marginTop: '0.75rem',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    color: '#b8a8cc',
                    opacity: 0.7,
                  }}
                >
                  {new Date().toUTCString().replace(':00 GMT', ' UTC')}
                </p>
              </div>

              {/* ── Right: Planet Position Table ── */}
              <div style={cardStyle}>
                <p
                  className="font-cinzel"
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.3em',
                    color: '#c9a84c',
                    textTransform: 'uppercase',
                    marginBottom: '1.25rem',
                  }}
                >
                  Planetary Positions
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {positions.map((p: PlanetPosition) => {
                    const disp = PLANET_DISPLAY[p.name];
                    return (
                      <div
                        key={p.name}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '20px 1fr auto auto',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.6rem',
                          background: 'rgba(255,255,255,0.025)',
                          border: `1px solid ${disp.color}18`,
                          borderRadius: '3px',
                        }}
                      >
                        {/* Glyph */}
                        <span
                          style={{
                            fontSize: '1rem',
                            color: disp.color,
                            textAlign: 'center',
                            lineHeight: 1,
                          }}
                        >
                          {disp.glyph}
                        </span>

                        {/* Name + sign */}
                        <div>
                          <span
                            className="font-cinzel"
                            style={{
                              fontSize: '0.65rem',
                              color: disp.color,
                              letterSpacing: '0.08em',
                            }}
                          >
                            {p.name}
                          </span>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              color: ELEMENT_COLORS[p.element],
                              marginLeft: '0.4rem',
                            }}
                          >
                            {p.signSymbol}
                          </span>
                          <span
                            className="font-cormorant"
                            style={{
                              fontSize: '0.7rem',
                              color: '#b8a8cc',
                              marginLeft: '0.3rem',
                              fontStyle: 'italic',
                            }}
                          >
                            {p.signName}
                          </span>
                        </div>

                        {/* Degree + retrograde */}
                        <div style={{ textAlign: 'right' }}>
                          <span
                            className="font-cinzel"
                            style={{ fontSize: '0.65rem', color: '#b8a8cc' }}
                          >
                            {p.degree.toFixed(1)}°
                          </span>
                          {p.retrograde && (
                            <span
                              style={{
                                marginLeft: '0.3rem',
                                fontSize: '0.65rem',
                                color: '#d9534f',
                                fontStyle: 'italic',
                              }}
                            >
                              ℞
                            </span>
                          )}
                        </div>

                        {/* Dignity */}
                        <DignityBadge dignity={p.dignity} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Active Dignities ─────────────────────────────────────────── */}
            <section style={{ ...cardStyle, marginBottom: '2rem' }}>
              <p
                className="font-cinzel"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Active Dignities
              </p>
              {dignifiedPlanets.length === 0 ? (
                <p
                  className="font-fell"
                  style={{ color: '#b8a8cc', fontStyle: 'italic', fontSize: '0.9rem' }}
                >
                  No planets are currently in Domicile or Exaltation.
                </p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {dignifiedPlanets.map((p: PlanetPosition) => {
                    const disp = PLANET_DISPLAY[p.name];
                    const dignityColors: Record<string, string> = {
                      Domicile:   '#c9a84c',
                      Exaltation: '#4a90d9',
                    };
                    const dColor = p.dignity ? dignityColors[p.dignity] : '#c9a84c';
                    return (
                      <div
                        key={p.name}
                        style={{
                          padding: '1rem 1.25rem',
                          background: `${disp.color}10`,
                          border: `1px solid ${disp.color}35`,
                          borderRadius: '4px',
                          minWidth: '140px',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: '1.8rem', color: disp.color, lineHeight: 1, marginBottom: '0.3rem' }}>
                          {disp.glyph}
                        </div>
                        <p
                          className="font-cinzel"
                          style={{ fontSize: '0.75rem', color: disp.color, letterSpacing: '0.1em', marginBottom: '0.2rem' }}
                        >
                          {p.name}
                        </p>
                        <p
                          className="font-cormorant"
                          style={{ fontSize: '0.8rem', color: '#b8a8cc', fontStyle: 'italic', marginBottom: '0.35rem' }}
                        >
                          {p.signSymbol} {p.signName} {p.degree.toFixed(1)}°
                        </p>
                        <DignityBadge dignity={p.dignity} />
                        <p
                          className="font-fell"
                          style={{ fontSize: '0.65rem', color: dColor, marginTop: '0.35rem', fontStyle: 'italic', opacity: 0.8 }}
                        >
                          {p.dignity === 'Domicile' ? 'At home — full power' : 'Elevated — highest expression'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ── Current Aspects ──────────────────────────────────────────── */}
            <section style={{ ...cardStyle, marginBottom: '2rem' }}>
              <p
                className="font-cinzel"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Current Aspects
              </p>
              {aspects.length === 0 ? (
                <p
                  className="font-fell"
                  style={{ color: '#b8a8cc', fontStyle: 'italic', fontSize: '0.9rem' }}
                >
                  No major aspects detected within orb.
                </p>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '0.6rem',
                  }}
                >
                  {aspects.map((asp, i) => {
                    const d1 = PLANET_DISPLAY[asp.planet1];
                    const d2 = PLANET_DISPLAY[asp.planet2];
                    return (
                      <div
                        key={i}
                        style={{
                          padding: '0.65rem 0.85rem',
                          background: `${asp.aspect.color}0c`,
                          border: `1px solid ${asp.aspect.color}28`,
                          borderRadius: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ fontSize: '0.9rem', color: d1.color }}>{d1.glyph}</span>
                        <span
                          className="font-cinzel"
                          style={{ fontSize: '0.9rem', color: asp.aspect.color, flex: '0 0 auto' }}
                        >
                          {asp.aspect.symbol}
                        </span>
                        <span style={{ fontSize: '0.9rem', color: d2.color }}>{d2.glyph}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            className="font-cinzel"
                            style={{ fontSize: '0.55rem', color: asp.aspect.color, letterSpacing: '0.08em' }}
                          >
                            {asp.planet1} {asp.aspect.name} {asp.planet2}
                          </p>
                          <p
                            className="font-cormorant"
                            style={{ fontSize: '0.6rem', color: '#b8a8cc', fontStyle: 'italic' }}
                          >
                            orb {asp.orb}°
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ── Current Domicile of the Universe ─────────────────────────── */}
            <section
              style={{
                background: 'linear-gradient(135deg, rgba(26,13,46,0.92) 0%, rgba(15,11,26,0.97) 100%)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '4px',
                padding: '2rem 2.5rem',
                marginBottom: '2rem',
                position: 'relative',
              }}
            >
              {/* Corner ornaments */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                <span
                  key={pos}
                  style={{
                    position: 'absolute',
                    top: pos.startsWith('top') ? '0.7rem' : 'auto',
                    bottom: pos.startsWith('bottom') ? '0.7rem' : 'auto',
                    left: pos.endsWith('left') ? '0.7rem' : 'auto',
                    right: pos.endsWith('right') ? '0.7rem' : 'auto',
                    color: '#c9a84c',
                    fontSize: '0.8rem',
                    opacity: 0.5,
                  }}
                >
                  ✦
                </span>
              ))}

              <p
                className="font-cinzel"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.35em',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                  textAlign: 'center',
                }}
              >
                Oracle Reading
              </p>
              <h2
                className="font-cinzel"
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
                  color: '#f0d060',
                  letterSpacing: '0.1em',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                Current Cosmic Domicile
              </h2>

              <blockquote
                className="font-fell"
                style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                  fontStyle: 'italic',
                  color: '#f0e6d3',
                  lineHeight: 1.95,
                  margin: '0 0 1.5rem',
                  textAlign: 'center',
                  maxWidth: '780px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {narrative}
              </blockquote>

              <div
                style={{
                  borderTop: '1px solid rgba(201,168,76,0.15)',
                  paddingTop: '1.25rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                }}
                className="balance-grid"
              >
                <ElementBalance positions={positions} />
                <QualityBalance positions={positions} />
              </div>
            </section>

            {/* ── Footer note ──────────────────────────────────────────────── */}
            <div className="ornament-divider" style={{ margin: '2rem 0 1rem' }}>
              <span style={{ color: '#c9a84c', fontSize: '0.9rem' }}>✦</span>
            </div>
            <p
              className="font-fell"
              style={{
                textAlign: 'center',
                color: '#b8a8cc',
                fontStyle: 'italic',
                fontSize: '0.82rem',
                opacity: 0.6,
                lineHeight: 1.6,
              }}
            >
              Positions calculated using simplified VSOP algorithms (±2–3° accuracy). Auto-refreshes every 60 seconds.
              <br />
              For precise ephemeris data, consult a professional astrologer or dedicated ephemeris software.
            </p>
          </>
        )}

        {/* ── Loading state ─────────────────────────────────────────────────── */}
        {positions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                border: '2px solid rgba(201,168,76,0.2)',
                borderTop: '2px solid #c9a84c',
                borderRadius: '50%',
                animation: 'spin 1.5s linear infinite',
                margin: '0 auto 1.5rem',
              }}
            />
            <p
              className="font-fell"
              style={{ color: '#c9a84c', fontStyle: 'italic', fontSize: '1.1rem' }}
            >
              Reading the heavens&hellip;
            </p>
          </div>
        )}
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 768px) {
          .astro-main-grid {
            grid-template-columns: 1fr !important;
          }
          .balance-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          section[style*="padding: 2rem 2.5rem"] {
            padding: 1.5rem 1.25rem !important;
          }
        }

        /* Gold shimmer for heading */
        .gold-shimmer {
          background: linear-gradient(
            90deg,
            #c9a84c 0%,
            #f0d060 30%,
            #c9a84c 50%,
            #f0d060 70%,
            #c9a84c 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
