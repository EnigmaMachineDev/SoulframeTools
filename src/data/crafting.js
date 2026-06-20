// Preludes 15 "Gods & Ghosts" — Loot & Crafting Rework.
// Weapons drop fully built with a Craftwork tier + Tempers + Origin, and are
// refined at Tuvalkane (Nightfold) using Chordstones (forged from Lampyrites).
//
// Authoritative data sourced from the Soulframe Wiki "Crafting" page
// (soulframewiki / wikitide). Numbers not yet confirmed are marked TODO[P15].

// ─────────────────────────────────────────────────────────────────────────────
// CRAFTWORK TIERS
// "Craftwork determines the quality of a Weapon, dictating how many Tempers it
//  can have." Six tiers, ascending. Each tier has a Temper range (min–max).
//  Refining one tier up requires the matching Chordstone (see REFINEMENT below).
// Each tier is also a "rank of craftsmanship" granting a flat +4 Damage per rank
// (`dmgBonus` = order × 4). Dual Blades receive HALF this bonus (+2 per rank).
// e.g. a Sovereign (rank 4) weapon = +16 Damage; an Officer (rank 2) = +8.
export const CRAFTWORK_TIERS = [
  { id: 'stock',     name: 'Stock',     order: 0, minTempers: 0, maxTempers: 1, dmgBonus: 0,  color: '#9aa0a6' },
  { id: 'military',  name: 'Military',  order: 1, minTempers: 1, maxTempers: 3, dmgBonus: 4,  color: '#b8d0b5' },
  { id: 'officer',   name: 'Officer',   order: 2, minTempers: 2, maxTempers: 4, dmgBonus: 8,  color: '#b5c6d0' },
  { id: 'noble',     name: 'Noble',     order: 3, minTempers: 3, maxTempers: 5, dmgBonus: 12, color: '#bfb5d0' },
  { id: 'sovereign', name: 'Sovereign', order: 4, minTempers: 4, maxTempers: 6, dmgBonus: 16, color: '#d0b5b5' },
  { id: 'legendary', name: 'Legendary', order: 5, minTempers: 5, maxTempers: 8, dmgBonus: 20, color: '#d1c1b0' },
];

// Flat Damage from Craftwork: +4 per rank of craftsmanship (the tier `order`),
// halved for Dual Blades. Source: wiki.avakot.org/Crafting (Preludes 15).
export const CRAFTWORK_DAMAGE_PER_RANK = 4;

// ─────────────────────────────────────────────────────────────────────────────
// REFINEMENT (Tuvalkane → "Refine" tab; unlocked by The Steelsinger Fable)
// Raises a Weapon's Craftwork one tier and grants Tempers. Costs miscellaneous
// Materials (varying by the Weapon's Origin) plus the matching Chordstone.
//   - Refining grants at least 2 Tempers (if under the new tier's Temper cap).
//   - Refining to Legendary always grants the full 8 Tempers.
//   - Re-rolling Tempers on Legendary weapons is planned for a future update.
export const REFINEMENT_CHAIN = [
  { from: 'stock',     to: 'military',  chordstone: 'hushed' },
  { from: 'military',  to: 'officer',   chordstone: 'whispering' },
  { from: 'officer',   to: 'noble',     chordstone: 'lilting' },
  { from: 'noble',     to: 'sovereign', chordstone: 'melodious' },
  { from: 'sovereign', to: 'legendary', chordstone: 'rhapsodic' },
];

export const REFINEMENT_NOTES = {
  station: 'Tuvalkane',
  tab: 'Refine',
  unlock: 'Complete The Steelsinger (Ancestor Fable) to unlock Tuvalkane.',
  grantsAtLeast: 2,
  legendaryGrants: 8,
  reroll: 'Re-rolling Tempers on Legendary-Craftwork weapons is planned for a future update.',
  costNote: 'Refining costs miscellaneous Materials that vary by the weapon’s Origin, plus the matching Chordstone.',
};

// ─────────────────────────────────────────────────────────────────────────────
// CHORDSTONES — primary refining material, forged with Tuvalkane (the Fragment
// blueprint is reusable and auto-unlocks at the required Crafting Rank). Higher
// tiers consume lower-tier Chordstones + Lampyrites. Also buyable from Zenith.
//   `upliftsTo` = the Craftwork tier this Chordstone refines a weapon INTO.
export const CHORDSTONES = [
  { id: 'hushed',     name: 'Hushed Chordstone',     stars: 1, upliftsTo: 'military',  note: 'Intro Chordstone — simple materials only.' },
  { id: 'whispering', name: 'Whispering Chordstone', stars: 2, upliftsTo: 'officer' },
  { id: 'lilting',    name: 'Lilting Chordstone',    stars: 2, upliftsTo: 'noble' },
  { id: 'melodious',  name: 'Melodious Chordstone',  stars: 3, upliftsTo: 'sovereign' },
  { id: 'rhapsodic',  name: 'Rhapsodic Chordstone',  stars: 3, upliftsTo: 'legendary' },
  { id: 'chaos',      name: 'Chaos Chordstone',      stars: 3, upliftsTo: null,
    note: 'Completely resets a weapon’s Tempers and Craftwork (re-roll as though dropped from a high-level area). One-time material from Orlick’s Dispatch — not craftable.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// LAMPYRITES — reagent used (with lower-tier Chordstones) to craft higher
// Chordstones. Three types; each rarity forges a stronger Chordstone. Earned
// from Sieges, The Organ, Hark The Collector, under The Cogah, dungeon chests,
// dismantling high-Craftwork weapons, and Avakot's Gots (random bundles for Arcs).
export const LAMPYRITES = [
  { id: 'glow',  name: 'Glow Lampyrite',  note: 'Husks of glowsprites. Lowest tier; also from regular Dungeon chests, Neath’uns Sap Pods, and dismantling Noble+ weapons.' },
  { id: 'amber', name: 'Amber Lampyrite', note: 'Ambersprite husks. Mid tier; Rare chests in level 15+ Dungeons, dismantling Sovereign+ weapons.' },
  { id: 'faer',  name: 'Faer Lampyrite',  note: 'Faersprite husks. Top tier; Rare chests in level 25+ Dungeons, dismantling Legendary weapons.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// ORIGINS — "the make of a weapon." Each Origin has its own pool of Tempers, and
// Refinement material costs differ by Origin. Tempers also carry an Origin frame;
// "Universal" Tempers can roll on any Origin. The five weapon Origins:
export const ORIGINS = [
  { id: 'cassid',  name: 'Cassid',  note: 'Pigwen Skerry — from long-brined sailors and salt-rotted chests.' },
  { id: 'dendrit', name: 'Dendrit', note: 'Uncovered from Dendrit stashes (secret-y Glades).' },
  { id: 'feykin',  name: 'Feykin',  note: "Founders' weapons are Feykin Origin, Noble Craftwork, with pre-selected Tempers." },
  { id: 'mendicant', name: 'Mendicant', note: 'Mendicant weapons (e.g. Mendicant Reinbreaker line).' },
  { id: 'oden',    name: "Ode'n",   note: "Reclaimed from Ode'n pillaging. Source of Veilk, Ilverac, Vrusht-IX." },
];

// ─────────────────────────────────────────────────────────────────────────────
// TEMPERS — "unique modifiers granting augmented properties," rolled randomly when
// a weapon drops/is crafted (count by Craftwork) and added by Refinement. The pool
// is gated by two axes: `origin` ('Universal' = any) and `weaponType`
// ('Any' | 'Melee' | 'Bow' | 'Magick'). Up to TWO of the same Temper can roll
// ("Double-Stacked" — 2× effect, 2 slots). Tempers have no per-rank numeric values.
// Source: wiki.avakot.org/Tempers (Index of Tempers), Preludes 15.
export const TEMPER_WEAPON_TYPES = ['Any', 'Melee', 'Bow', 'Magick'];
export const TEMPER_ORIGINS = ['Universal', 'Cassid', 'Dendrit', 'Feykin', 'Mendicant', "Ode'n"];

export const TEMPERS = [
  // === UNIVERSAL — Any weapon ===
  { name: 'Cowp',            origin: 'Universal', weaponType: 'Any', description: 'Grants chance for doubled Stagger damage.' },
  { name: 'Follow Up',       origin: 'Universal', weaponType: 'Any', description: 'Increased weapon damage on consecutive attacks following a Heavy Attack.' },
  { name: 'Fortified',       origin: 'Universal', weaponType: 'Any', description: 'Take less Stagger damage when blocking.' },
  { name: 'From Above',      origin: 'Universal', weaponType: 'Any', description: 'Increased weapon damage from Aerial Attacks.' },
  { name: 'Heightened Parry', origin: 'Universal', weaponType: 'Any', description: 'Increased parry window.' },
  { name: 'Sullying Force',  origin: 'Universal', weaponType: 'Any', description: 'Increased chance of Smite.' },
  { name: 'Swooning Blow',   origin: 'Universal', weaponType: 'Any', description: 'Increased Stagger while attacking.' },
  { name: 'Unencumbered',    origin: 'Universal', weaponType: 'Any', description: 'Increased weapon damage while no sidearm is equipped.' },
  { name: 'Venger',          origin: 'Universal', weaponType: 'Any', description: 'Increased Riposte Damage.' },
  // === UNIVERSAL — Melee ===
  { name: 'Bounding Swipe',  origin: 'Universal', weaponType: 'Melee', description: 'Increased Damage and Stagger while Sprinting.' },
  { name: 'Breakneck',       origin: 'Universal', weaponType: 'Melee', description: 'Heavy Attacks charge more quickly.' },
  { name: 'Fleet Fling',     origin: 'Universal', weaponType: 'Melee', description: 'Increased Throw Speed.' },
  { name: 'Full Force',      origin: 'Universal', weaponType: 'Melee', description: 'Increased Damage and Stagger during Heavy Attacks.' },
  { name: 'Hale and Hearty', origin: 'Universal', weaponType: 'Melee', description: 'Increased weapon damage at full Life.' },
  { name: 'Rejoinder',       origin: 'Universal', weaponType: 'Melee', description: 'Increased Damage and Stagger during dodge attacks.' },
  { name: 'Swift Strike',    origin: 'Universal', weaponType: 'Melee', description: 'Increased weapon attack speed.' },
  // === UNIVERSAL — Bow ===
  { name: 'Quick Draw',      origin: 'Universal', weaponType: 'Bow', description: 'Bows charge more quickly.' },
  { name: 'Rupture',         origin: 'Universal', weaponType: 'Bow', description: 'Increased Shatter and Stagger damage.' },
  // === UNIVERSAL — Magick ===
  { name: 'Arcane Alacrity', origin: 'Universal', weaponType: 'Magick', description: 'Magick Heavy Attacks charge more quickly.' },
  { name: 'Arcane Rebound',  origin: 'Universal', weaponType: 'Magick', description: 'Deflected Magick projectiles deal increased damage.' },
  { name: 'Heavy Cast Force', origin: 'Universal', weaponType: 'Magick', description: 'Increased Damage and Stagger during Heavy Cast Attacks.', pendingName: true /* wiki shows placeholder name */ },

  // === CASSID — Melee ===
  { name: 'Afflicted Lurgy', origin: 'Cassid', weaponType: 'Melee', description: 'Chance to apply poison on hit.' },
  { name: 'First Strike',    origin: 'Cassid', weaponType: 'Melee', description: 'Increased weapon damage against foes with full Life.' },
  { name: 'Cassid Riposte',  origin: 'Cassid', weaponType: 'Melee', description: 'Increased Stagger damage on parry.', pendingName: true /* wiki shows placeholder name */ },

  // === DENDRIT — Any ===
  { name: 'Enkindled',       origin: 'Dendrit', weaponType: 'Any', description: 'Chance to add fire damage on hit.' },
  { name: 'Renewed Slayer',  origin: 'Dendrit', weaponType: 'Any', description: 'Restore Life upon slaying a foe.' },
  // === DENDRIT — Melee ===
  { name: "Hunter's Relish", origin: 'Dendrit', weaponType: 'Melee', description: 'Increased Life recovery when attacking during regain.' },

  // === FEYKIN — Any ===
  { name: 'Aftershock',      origin: 'Feykin', weaponType: 'Any', description: 'Chance to add Arcanic damage on hit.' },
  { name: 'Sympathy Pang',   origin: 'Feykin', weaponType: 'Any', description: 'Damage inflicted from attacks will spread to another.' },
  // === FEYKIN — Magick ===
  { name: 'Dual Cast',       origin: 'Feykin', weaponType: 'Magick', description: 'Chance for a second projectile to be cast.' },

  // === MENDICANT — Any ===
  { name: 'Savagery',        origin: 'Mendicant', weaponType: 'Any', description: 'Chance to add Bleed damage on hit.' },
  { name: 'Unnerving Blow',  origin: 'Mendicant', weaponType: 'Any', description: 'Chance to inflict fear on foes when hit.' },
  // === MENDICANT — Melee ===
  { name: 'Sinister Volley', origin: 'Mendicant', weaponType: 'Melee', description: 'Chance to inflict fear to foes when thrown weapon hits.' },

  // === ODE'N — Any ===
  { name: 'Bypass',          origin: "Ode'n", weaponType: 'Any', description: 'Enemy defense reduced on first hit.' },
  { name: 'Galvanic Strike', origin: "Ode'n", weaponType: 'Any', description: 'Adds Voltaic damage to weapon, staggering enemies in area of effect when it discharges.' },
  { name: "Slinger's Tempo", origin: "Ode'n", weaponType: 'Any', description: 'Chance for Stagger to become Knockdown.' },
];

// "Double-Stacked": up to 2 copies of the same Temper may roll on one weapon,
// doubling its effect and consuming two Temper slots (flashing frame + icon).
export const TEMPER_NOTES = {
  doubleStack: 'Up to two of the same Temper can roll on a weapon ("Double-Stacked"): twice the effect, two slots.',
  noFlyblade: 'There are no Flyblade-specific Tempers (the only Combat Art without weapon-specific Tempers).',
};

// ─────────────────────────────────────────────────────────────────────────────
// CRAFTING RANK (Bond with Tuvalkane) — gates which recipes/refinements unlock.
//   Rank 1: base crafting. Rank 2: unlocks Reforging (Joineries). Rank 4: current
//   cap. XP from first-time crafts and the first time a weapon type reaches each
//   new Craftwork tier (none once that type hits its max tier or the cap is hit).
export const CRAFTING_RANK = { max: 4, reforgeUnlocksAt: 2 };

// ─────────────────────────────────────────────────────────────────────────────
// HARMONY — currency used to upgrade Totems and Runes (rarity + effectiveness),
// up to a maximum of three stars. All pre-P15 Totems were converted into Harmony
// when the Totem system was reworked. See totems.js.
export const HARMONY = { maxStars: 3, use: 'Upgrade the rarity and effectiveness of Totems and Runes, up to 3 stars.' };
