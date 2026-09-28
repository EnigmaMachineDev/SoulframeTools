// Preludes 15 "Gods & Ghosts" — Loot & Crafting Rework.
// Weapons drop fully built with a Craftwork tier + Tempers + Origin, and are
// refined at Tuvalkane (Nightfold) using Chordstones (forged from Lampyrites).
// Preludes 16 "Of Hook & Hound" renamed Refine to "Enhance Craftwork" and added
// Temper Striking (see STRIKING).
//
// Authoritative data sourced from the Soulframe Wiki "Crafting" page
// (soulframewiki / wikitide). Numbers not yet confirmed are marked TODO[P15].

import { POSSIBLE_TEMPERS } from './weaponTempers.js';

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
// REFINEMENT (Tuvalkane → "Enhance Craftwork" tab, called "Refine" before P16;
// unlocked by The Steelsinger Fable)
// Raises a Weapon's Craftwork one tier and grants Tempers. Costs miscellaneous
// Materials (varying by the Weapon's Origin) plus the matching Chordstone.
//   - Refining grants at least 2 Tempers (if under the new tier's Temper cap).
//   - Refining to Legendary always grants the full 8 Tempers.
//   - P16: enhancing to Legendary prompts for an Epithet (a weapon name earned by
//     feats around Alca; renameable any time via "Name Weapon").
export const REFINEMENT_CHAIN = [
  { from: 'stock',     to: 'military',  chordstone: 'hushed' },
  { from: 'military',  to: 'officer',   chordstone: 'whispering' },
  { from: 'officer',   to: 'noble',     chordstone: 'lilting' },
  { from: 'noble',     to: 'sovereign', chordstone: 'melodious' },
  { from: 'sovereign', to: 'legendary', chordstone: 'rhapsodic' },
];

export const REFINEMENT_NOTES = {
  station: 'Tuvalkane',
  tab: 'Enhance Craftwork',
  unlock: 'Complete The Steelsinger (Ancestor Fable) to unlock Tuvalkane.',
  grantsAtLeast: 2,
  legendaryGrants: 8,
  reroll: 'Individual Tempers can be replaced or added by Striking (P16) — see STRIKING.',
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
// a weapon drops/is crafted (count by Craftwork) and, since P16, Struck on by Tuvalkane (see
// STRIKING below). Which Tempers a weapon can hold is per weapon — see weaponTempers.js and
// getPossibleTempers(). `origin` is the Temper's frame ('Universal' = any Origin);
// `weaponType` is the wiki's own label for its reach, for display only.
// Up to TWO of the same Temper can sit on a weapon ("Double-Stacked" / "amped" — 2× effect,
// 2 slots). `effects` holds the published single- and double-stack values; effects the
// wiki has no numbers for are omitted, and `approx` marks values it flags as approximate.
// Source: wiki.avakot.org Module:Data/Tempers, Preludes 16 "Of Hook & Hound".
//
// P16 renamed six P15 Tempers (the wiki follows the in-game names): Venger → Vengeance,
// Fleet Fling → Streamlined, Dual Cast → Duplicate, Afflicted Lurgy → Sickness, and the two
// P15 placeholders resolved to Arcane Barrage (Heavy Cast) and Clam's Foot (Cassid parry).
// P16 added six: Grounding Spell, Conjuration, Severed Root, Hollowed, Well Woven, Invader.
// The data module has no numbers for those yet; Conjuration, Hollowed and Well Woven values come
// from their own wiki pages (Conjuration and Hollowed are marked WIP there, hence approx), and
// Grounding Spell's from the patch notes. Severed Root and Invader are still unpublished.
export const TEMPER_ORIGINS = ['Universal', 'Cassid', 'Dendrit', 'Feykin', 'Mendicant', "Ode'n"];

export const TEMPERS = [
  // === UNIVERSAL ===
  { name: 'Arcane Alacrity', origin: 'Universal', weaponType: 'Magick', description: 'Increases charging speed of Magick Heavy Attacks.', effects: [{ effect: 'Heavy Attack Charge Rate', single: '10%', double: '20%' }] },
  { name: 'Arcane Barrage', origin: 'Universal', weaponType: 'Magick', description: 'Increases Damage and Stagger during Heavy Attacks.', effects: [{ effect: 'Heavy Cast Damage', single: '10 Damage', double: '20 Damage' }] },
  { name: 'Arcane Rebound', origin: 'Universal', weaponType: 'Magick', description: 'Increases damage inflicted through deflected Magick projectiles.', effects: [{ effect: 'Deflected Projectile Damage', single: '~20%', double: '~40%', approx: true }] },
  { name: 'Bounding Swipe', origin: 'Universal', weaponType: 'Non-Bow', description: 'Increases Damage and Stagger while Sprinting.', effects: [{ effect: 'Sprint Attack Damage', single: '12 Damage', double: '24 Damage' }] },
  { name: 'Breakneck', origin: 'Universal', weaponType: 'Melee / Flyblade', description: 'Reduces charging time for Heavy Attacks.', effects: [{ effect: 'Heavy Attack Charge Rate', single: '15%', double: '30%' }] },
  { name: 'Conjuration', origin: 'Universal', weaponType: 'Magick', description: 'Increases Heavy Cast Damage at full Grounded stacks.', effects: [{ effect: 'Heavy Cast Damage when fully Grounded', single: '+30 Damage', double: '+60 Damage', approx: true }] },
  { name: 'Cowp', origin: 'Universal', weaponType: 'Any', description: 'Grants chance for doubled Stagger.', effects: [{ effect: 'Double Stagger Chance', single: '10%', double: '20%' }] },
  { name: 'Follow Up', origin: 'Universal', weaponType: 'Melee / Magick', description: 'Increases Weapon Damage on consecutive attacks following a Heavy Attack.', effects: [{ effect: 'Post Heavy Consecutive Light Damage', single: '7 Damage per Hit, 28 Maximum', double: '14 Damage per Hit, 56 Maximum' }] },
  { name: 'Fortified', origin: 'Universal', weaponType: 'Any', description: 'Reduces Stagger when Blocking.', effects: [] },
  { name: 'From Above', origin: 'Universal', weaponType: 'Any', description: 'Increases Weapon Damage during Aerial Attacks.', effects: [{ effect: 'Aerial Attack Damage', single: '10 Damage', double: '20 Damage' }] },
  { name: 'Full Force', origin: 'Universal', weaponType: 'Heavy Melee', description: 'Increases Damage and Stagger during Heavy Attacks.', effects: [{ effect: 'Heavy Attack Damage', single: '15 Damage', double: '30 Damage' }] },
  { name: 'Grounding Spell', origin: 'Universal', weaponType: 'Magick', description: 'Remain Grounded while Dodging.', effects: [{ effect: 'Grounded Dodges', single: '1', double: '2' }] },
  { name: 'Hale and Hearty', origin: 'Universal', weaponType: 'Light Melee / Flyblade', description: 'Increases Weapon Damage at full Life.', effects: [{ effect: 'Full Envoy Life Damage', single: '12 Damage', double: '24 Damage' }] },
  { name: 'Heightened Parry', origin: 'Universal', weaponType: 'Light Melee / Bow / Flyblade', description: 'Increases Parry window.', effects: [] },
  { name: 'Quick Draw', origin: 'Universal', weaponType: 'Bow', description: 'Increases charging speed of Bow Charged Shots.', effects: [{ effect: 'Bow Charge Rate', single: '~12.5%', double: '~25%', approx: true }] },
  { name: 'Rejoinder', origin: 'Universal', weaponType: 'Non-Bow', description: 'Increases Damage and Stagger during Dodge Attacks.', effects: [{ effect: 'Dodge Attack Base Damage', single: '10 Base Damage', double: '20 Base Damage' }] },
  { name: 'Rupture', origin: 'Universal', weaponType: 'Bow', description: 'Increases Stagger and Shatter Damage.', effects: [{ effect: 'Splintered Embedded Arrow Damage', single: '8 Damage', double: '16 Damage' }, { effect: 'Bow Stagger Damage', single: 'Unknown', double: 'Unknown', approx: true }] },
  { name: 'Severed Root', origin: 'Universal', weaponType: 'Bow', description: 'Increases Stagger during leg shots.', effects: [] },
  { name: 'Streamlined', origin: 'Universal', weaponType: 'Melee', description: 'Increases Throw Speed.', effects: [{ effect: 'Throw Speed', single: '20%', double: '40%' }] },
  { name: 'Sullying Force', origin: 'Universal', weaponType: 'Any', description: 'Increases chance of Smite.', effects: [{ effect: 'Smite Proc Chance', single: '3%', double: '6%' }] },
  { name: 'Swift Strike', origin: 'Universal', weaponType: 'Melee / Flyblade', description: 'Increases Weapon attack speed.', effects: [{ effect: 'Weapon Attack Speed', single: '15%', double: '30%' }] },
  { name: 'Swooning Blow', origin: 'Universal', weaponType: 'Any', description: 'Increases Stagger while attacking.', effects: [{ effect: 'Hit Stagger Damage', single: '12 Stagger Damage', double: '24 Stagger Damage' }] },
  { name: 'Unencumbered', origin: 'Universal', weaponType: 'Light Primaries', description: 'Increases Weapon Damage while no sidearm is wielded.', effects: [{ effect: 'No Sidearm Weapon Damage', single: '14 Damage', double: '28 Damage' }] },
  { name: 'Vengeance', origin: 'Universal', weaponType: 'Non-Magick', description: 'Increases Riposte Damage.', effects: [{ effect: 'Riposte Base Damage', single: '15 Base Damage', double: '30 Base Damage' }] },
  // === CASSID ===
  { name: "Clam's Foot", origin: 'Cassid', weaponType: 'Light Melee', description: 'Increases Stagger on Parry.', effects: [] },
  { name: 'First Strike', origin: 'Cassid', weaponType: 'Light Melee', description: 'Increased weapon damage against foes with full Life.', effects: [{ effect: 'Full Life Target Damage', single: '20 Damage', double: '40 Damage' }] },
  { name: 'Invader', origin: 'Cassid', weaponType: 'Light Melee', description: 'Increases Damage on foes below 30% Life.', effects: [] },
  { name: 'Sickness', origin: 'Cassid', weaponType: 'Light Melee', description: 'Grants chance to inflict Poison on hit.', effects: [{ effect: 'Poison Proc Chance', single: '10%', double: '20%' }] },
  // === DENDRIT ===
  { name: 'Enkindled', origin: 'Dendrit', weaponType: 'Any', description: 'Grants chance to inflict Flame Damage on hit.', effects: [{ effect: 'Ablaze Proc Chance', single: '10%', double: '20%', approx: true }, { effect: 'Ablaze Damage Over Time', single: '35% Hit Damage per Second', double: '35% Hit Damage per Second' }, { effect: 'Ablaze Enemy Armour Reduction', single: 'Up to 50%', double: 'Up to 50%', approx: true }] },
  { name: "Hunter's Relish", origin: 'Dendrit', weaponType: 'Melee', description: 'Increases Life recovery when attacking during Regain.', effects: [{ effect: 'Regain Hit Life Recovery', single: '10%', double: '20%' }] },
  { name: 'Renewed Slayer', origin: 'Dendrit', weaponType: 'Any', description: 'Restores Life on slaying a foe.', effects: [{ effect: 'Kill Life Regeneration', single: '5 Life per Second for 4 Seconds', double: '10 Life per Second for 4 Seconds' }] },
  { name: 'Well Woven', origin: 'Dendrit', weaponType: 'Melee', description: 'Increases the duration of time before Regain potential starts to decay.', effects: [{ effect: 'Regain hold before decay (base 5 s; none during The Cogah)', single: '10 s', double: '15 s' }] },
  // === FEYKIN ===
  { name: 'Aftershock', origin: 'Feykin', weaponType: 'Any', description: 'Grants chance to inflict Arcanic Damage on hit.', effects: [{ effect: 'Arcanic Proc Chance', single: '10%', double: '20%' }, { effect: 'Arcanic Damage Over Time', single: '100% Hit Damage', double: '100% Hit Damage' }] },
  { name: 'Duplicate', origin: 'Feykin', weaponType: 'Magick', description: 'Grants chance for a second projectile to be cast.', effects: [{ effect: 'Duplicate Projectile Chance', single: '9%', double: '18%' }] },
  { name: 'Sympathy Pang', origin: 'Feykin', weaponType: 'Any', description: 'Damage inflicted from attacks will spread to another.', effects: [{ effect: 'Nearby Foe Damage Spread', single: '10%', double: '20%' }] },
  // === MENDICANT ===
  { name: 'Hollowed', origin: 'Mendicant', weaponType: 'Any', description: 'Reduces Damage taken from foes.', effects: [{ effect: 'Chance on hit to cut Damage taken by 20% for 8 s', single: '10%', double: '20%', approx: true }] },
  { name: 'Savagery', origin: 'Mendicant', weaponType: 'Any', description: 'Grants chance to inflict Bleed Damage on hit.', effects: [{ effect: 'Bleed Proc Chance', single: '10%', double: '20%' }, { effect: 'Bleed Damage Over Time', single: '20% Attack Damage per Tick', double: '20% Attack Damage per Tick' }] },
  { name: 'Sinister Volley', origin: 'Mendicant', weaponType: 'Melee', description: 'Grants chance to inflict Fear on foes when a thrown weapon hits.', effects: [] },
  { name: 'Unnerving Blow', origin: 'Mendicant', weaponType: 'Magick', description: 'Grants chance to inflict Fear on foes when hit.', effects: [] },
  // === ODE'N ===
  { name: 'Bypass', origin: "Ode'n", weaponType: 'Any', description: 'Reduces foe Defence on first hit.', effects: [{ effect: 'Enemy Armour Reduction', single: '10 Armour on First Hit', double: '10 Armour on First Two Hits', approx: true }] },
  { name: 'Galvanic Strike', origin: "Ode'n", weaponType: 'Any', description: 'Applies Voltaic Damage to weapon and Staggers enemies in area of effect when it discharges.', effects: [{ effect: 'Voltaic Proc Chance', single: '10%', double: '20%' }] },
  { name: "Slinger's Tempo", origin: "Ode'n", weaponType: 'Any', description: 'Grants chance for Stagger to become Knockdown.', effects: [{ effect: 'Stagger To Knockdown Chance', single: '10%', double: '20%' }] },
];

// One-line, player-facing summaries for pickers (Build Planner dropdowns, Weapon Compare).
// Numbers are for a single copy; Double-Stacking doubles them. Written from the effects above —
// update alongside them. Tempers with no published numbers get a plain-language line.
const TEMPER_SUMMARIES = {
  'Arcane Alacrity': '+10% Magick Heavy Attack charge speed',
  'Arcane Barrage': '+10 Heavy Cast damage, more Stagger',
  'Arcane Rebound': '~+20% damage from deflected projectiles',
  'Bounding Swipe': '+12 damage and more Stagger while sprinting',
  'Breakneck': '+15% Heavy Attack charge speed',
  'Conjuration': '+30 Heavy Cast damage when fully Grounded',
  'Cowp': '10% chance to double Stagger',
  'Follow Up': '+7 damage per hit after a Heavy Attack (max 28)',
  'Fortified': 'Take less Stagger while blocking',
  'From Above': '+10 damage on aerial attacks',
  'Full Force': '+15 damage and more Stagger on Heavy Attacks',
  'Grounding Spell': 'Dodge once without losing Grounded',
  'Hale and Hearty': '+12 damage while at full Life',
  'Heightened Parry': 'Wider parry window',
  'Quick Draw': '~12.5% faster Bow charge',
  'Rejoinder': '+10 damage and more Stagger on dodge attacks',
  'Rupture': '+8 shatter damage, more Bow Stagger',
  'Severed Root': 'More Stagger on leg shots',
  'Streamlined': '+20% throw speed',
  'Sullying Force': '+3% Smite chance',
  'Swift Strike': '+15% attack speed',
  'Swooning Blow': '+12 Stagger per hit',
  'Unencumbered': '+14 damage with no Sidearm equipped',
  'Vengeance': '+15 Riposte damage',
  "Clam's Foot": 'More Stagger on parry',
  'First Strike': '+20 damage against foes at full Life',
  'Invader': 'More damage against foes below 30% Life',
  'Sickness': '10% chance to Poison on hit',
  'Enkindled': '10% chance to set foes ablaze on hit',
  "Hunter's Relish": '+10% Life recovered by hits during Regain',
  'Renewed Slayer': 'Heal 5 Life/s for 4 s on each kill',
  'Well Woven': 'Regain holds 10 s before decaying (base 5 s)',
  'Aftershock': '10% chance to deal Arcanic damage over time',
  'Duplicate': '9% chance to cast a second projectile',
  'Sympathy Pang': '10% of damage spreads to a nearby foe',
  'Hollowed': '10% chance on hit to take 20% less damage for 8 s',
  'Savagery': '10% chance to inflict Bleed on hit',
  'Sinister Volley': 'Thrown hits can Fear foes',
  'Unnerving Blow': 'Hits can Fear foes',
  'Bypass': '−10 foe Armour on your first hit',
  'Galvanic Strike': '10% chance of a Voltaic discharge that Staggers nearby foes',
  "Slinger's Tempo": '10% chance for Stagger to become Knockdown',
};
for (const t of TEMPERS) t.summary = TEMPER_SUMMARIES[t.name] || t.description;

export const TEMPER_BY_NAME = Object.fromEntries(TEMPERS.map(t => [t.name, t]));

// The Tempers a weapon can roll or be Struck with, Origin-specific ones first.
export function getPossibleTempers(weapon) {
  const names = POSSIBLE_TEMPERS[weapon.name] || [];
  return names
    .map(n => TEMPER_BY_NAME[n])
    .filter(Boolean)
    .sort((a, b) => (a.origin === 'Universal') - (b.origin === 'Universal') || a.name.localeCompare(b.name));
}

// Max copies of one Temper on a weapon (Double-Stacked).
export const MAX_TEMPER_STACK = 2;

export const TEMPER_NOTES = {
  doubleStack: 'Up to two of the same Temper can sit on a weapon ("Double-Stacked"): twice the effect, two slots.',
  noFlyblade: 'There are no Flyblade-specific Tempers (the only Combat Art without weapon-specific Tempers).',
};

// ─────────────────────────────────────────────────────────────────────────────
// STRIKING (P16) — Tuvalkane's "Strike" tab. Replace a Temper, fill an empty slot, or amp
// an existing Temper to its double by Striking it over another slot. Permanent, never fails.
// A Temper must first be LEARNED by dismantling weapons that carry it.
// Source: Preludes 16 patch notes (wiki.avakot.org/Preludes_16).
export const STRIKING = {
  station: 'Tuvalkane',
  tab: 'Strike',
  weaponLevel: 30,
  tuvalkaneRank: 3,
  learnPoints: 10,
  cost: [
    { name: 'Glow Lampyrite', qty: 1 },
    { name: 'Amber Lampyrite', qty: 1 },
    { name: 'Faer Lampyrite', qty: 1 },
  ],
  lampyriteStackMax: 99,
  rules: [
    'The Steelsinger must be finished — Tempers dismantled before then are not learned retroactively.',
    'Each Temper takes 10 points to learn. Every dismantle (from the Inventory or the ground) gives 1 point towards each Temper on the weapon; a Double-Stacked Temper gives 2.',
    'Weapons must be Level 30 and Tuvalkane Rank 3.',
    'Tempers can only be Struck onto weapons they suit: Bow Tempers onto Bows, Origin Tempers onto weapons of that Origin.',
    'Striking a Temper the weapon already has amps it to Double-Stacked.',
    'Empty slots can be filled, up to the Craftwork\'s maximum. Any Temper works at full strength on any Craftwork.',
    'Each Strike costs 1 Glow, 1 Amber and 1 Faer Lampyrite, and cannot fail.',
  ],
};

// P16 loot changes that affect which Craftwork you find weapons at.
export const CRAFTWORK_DROP_NOTES = [
  'Weapons from Rare Chests drop at Military Craftwork or better.',
  'Weapons offered by Enclaves are Officer Craftwork (lowered from Sovereign in P16 Hotfix 3).',
];

// ─────────────────────────────────────────────────────────────────────────────
// CRAFTING RANK (Bond with Tuvalkane) — gates which recipes/refinements unlock.
//   Rank 1: base crafting. Rank 2: unlocks Reforging (Joineries). Rank 3: unlocks
//   Temper Striking (P16). Rank 4: current cap. XP from first-time crafts and the first time a weapon type reaches each
//   new Craftwork tier (none once that type hits its max tier or the cap is hit).
export const CRAFTING_RANK = { max: 4, reforgeUnlocksAt: 2, strikeUnlocksAt: 3 };

// ─────────────────────────────────────────────────────────────────────────────
// HARMONY — currency used to upgrade Totems and Runes (rarity + effectiveness),
// up to a maximum of three stars. All pre-P15 Totems were converted into Harmony
// when the Totem system was reworked. See totems.js.
export const HARMONY = { maxStars: 3, use: 'Upgrade the rarity and effectiveness of Totems and Runes, up to 3 stars.' };
