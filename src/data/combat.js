// Combat mechanics data sourced from wiki.avakot.org/Gameplay (Preludes 15 "Gods & Ghosts").
//
// This captures the structured combat tables from the Gameplay page that aren't weapon- or
// damage-type-specific: Finisher multipliers (by Combat Art), the Grace-scaling Lethality &
// Headshot multipliers, Enemy Armour behaviour, and the Weapon Levelling roll-up at Rank 30.
//
// NOTE (community testing): the Gameplay page flags the Finisher and Headshot tables as
// "recent testing" amidst rapid hotfixes, and several entries are still TBD. Treat the TBD
// rows as not-yet-published, mirroring how weapons.js handles unpublished stats.

// === FINISHERS ===
// Light-Attack on a staggered / knocked-down / unaware foe. Each art's finisher may be several
// hits (hence the additive strings); `frontTotal` / `backTotal` are the % of a Light Attack.
// Almost all finishers also pierce 10% Enemy Armour (exceptions: Magick & Flyblade GROUND
// finishers). Front/Rear finishers also benefit from the Lethality Multiplier (see below).
export const FINISHERS = [
  { combatArt: 'Bow', variants: [
    { name: 'Bows', front: '150% + 200%', back: '160% + 210%', frontTotal: 350, backTotal: 370 },
  ] },
  { combatArt: 'Flyblade', variants: [
    { name: 'Flyblades', front: '150% + 200%', back: '100% x2 + 150%', frontTotal: 350, backTotal: 350 },
  ] },
  { combatArt: 'Heavy', variants: [
    { name: 'Greatswords', front: '150% + 200% + 100%', back: '160% + 210%', frontTotal: 450, backTotal: 370 },
    { name: 'Heavy Maces', front: 'TBD', back: 'TBD', frontTotal: null, backTotal: null },
  ] },
  { combatArt: 'Long Blade', variants: [
    { name: 'Longswords', front: '150% + 200%', back: '150% + 200%', frontTotal: 350, backTotal: 350 },
    { name: 'Cleavers', front: '140% + 190%', back: '150% + 200%', frontTotal: 330, backTotal: 350 },
    { name: 'Rapiers', front: 'TBD', back: 'TBD', frontTotal: null, backTotal: null },
  ] },
  { combatArt: 'Magick', variants: [
    { name: 'Staves', front: '400%', back: '500%', frontTotal: 400, backTotal: 500 },
    { name: 'Wrist Casters', front: '100% x5', back: '100% x4', frontTotal: 500, backTotal: 400 },
  ] },
  { combatArt: 'Polearm', variants: [
    { name: 'Polearms', front: '150% + 200%', back: '60% + 160% x2', frontTotal: 350, backTotal: 380 },
  ] },
  { combatArt: 'Shield', variants: [
    { name: 'Shields', front: '150% + 200%', back: '150% + 200%', frontTotal: 350, backTotal: 350 },
  ] },
  { combatArt: 'Short Blade', variants: [
    { name: 'Daggers', front: '150% + 200%', back: '150% + 200%', frontTotal: 350, backTotal: 350 },
    { name: 'Dual Blades', front: '150% + 200%', back: '100% x2 + 150%', frontTotal: 350, backTotal: 350 },
  ] },
];

export const FINISHER_NOTES = [
  'Finisher % values are relative to the weapon’s Light Attack damage.',
  'Almost all finishers also pierce 10% Enemy Armour (exceptions: Magick & Flyblade ground finishers).',
  'Front/Rear finishers gain the Lethality Multiplier; Ground finishers do NOT.',
  'A weapon’s Virtue Requirement must be met for the Lethality Multiplier to apply.',
];

// === GRACE-SCALING MULTIPLIERS ===
// Both require the weapon's Virtue Requirement to be met. Formulas are exposed as functions in
// calculations.js (calculateLethalityMultiplier / calculateHeadshotMultiplier); these entries
// are the human-readable descriptions for the reference UI.
export const COMBAT_MULTIPLIERS = [
  {
    name: 'Lethality Multiplier',
    formula: '1 + 0.02 × Grace',
    appliesTo: 'Front/Rear Finishers and stealth (unaware) hits.',
    notes: 'Stealth Finishers are both a Finisher and a stealth hit, so it applies TWICE (e.g. 25 Grace turns a 300% finisher into 675% vs an unaware foe).',
  },
  {
    name: 'Headshot Multiplier',
    formula: '1.2 + 0.03 × Grace',
    appliesTo: 'Ranged / thrown / Magick / Flyblade projectiles (not melee).',
    notes: 'Headshots are exclusive to projectile attacks; melee attacks cannot headshot.',
  },
  {
    name: 'Enemy Armour',
    formula: 'damage − armour (min 1)',
    appliesTo: 'All incoming hits against an armoured foe.',
    notes: 'A flat subtraction that can never reduce a hit below 1 damage. Heavy Attacks pierce a portion of it; if a Light Attack would deal only 1, the foe’s healthbar greys out.',
  },
];

// === WEAPON LEVELLING (Rank 0 → 30 roll-up) ===
// Only Weapons and Pacts level (not Armour). A Pact gains +30 Arts by Rank 30. Weapons gain
// Arts, Damage and Stagger; the totals differ by class. A handful of weapons get ±10 Stagger.
export const WEAPON_LEVELLING = {
  // Rank-30 totals added on top of the base (Rank 0) card stats.
  totals: [
    { className: 'Melee', arts: 5, damage: 54, stagger: 50 },
    { className: 'Dual Short Blades', arts: 5, damage: 27, stagger: 25 },
    { className: 'Ranged', arts: 5, damage: 48, stagger: 30 },
  ],
  // Per-class exceptions to the Rank-30 Stagger total.
  staggerMinus10: ['Gwylen', 'Nettle', 'Precklies', 'Thistle', 'Wulder'],
  staggerPlus10: ['Avex', 'Cenotaph', 'Dewelion', 'Espadarte', 'Gathannan', "Marrow's Bane", 'Navalha', 'Purity'],
  // XP to reach a given rank (cumulative, from unranked): Pact = 1000 × rank²; Weapon = half.
  // Foe XP scales by 1 + 0.85 × √(foeLevel), floored. See calculations.js for the functions.
  xpNote: 'Pact total XP to rank N = 1000 × N²; a Weapon needs half. Rank 30 Pact = 900,000 XP, Weapon = 450,000.',
};

// === GROUND FINISHERS (wiki.avakot.org/Damage/Data) ===
// Performed against a knocked-down foe. Unlike Front/Rear finishers these do NOT scale with the
// Grace Lethality Multiplier. All pierce 10% Enemy Armour except Magick & Flyblade.
export const GROUND_FINISHERS = [
  { grip: 'Bows', damage: '200% × 2', armourPen: '10%' },
  { grip: 'Greatswords', damage: '250%', armourPen: '10%' },
  { grip: 'Long Blades', damage: '250% + 150%', armourPen: '10%' },
  { grip: 'Polearms', damage: '200% × 2', armourPen: '10%' },
  { grip: 'Shields', damage: '100% + 200% + 100%', armourPen: '10%' },
  { grip: 'Daggers', damage: '250% + 150%', armourPen: '10%' },
  { grip: 'Dual Blades', damage: '100% × 4', armourPen: '10%' },
  { grip: 'Magick & Flyblades', damage: '100% + 3× Weapon Base', armourPen: '0%', note: 'Single hit; formula varies slightly between Magick weapons.' },
];

// === RARITY (STAR) MULTIPLIER ===
// The attunement-bonus cap on Heavy/Charged attacks scales with weapon rarity (its star count):
// Common (1★) = 100%, Uncommon (2★) and Rare (3★) = 150%.
export const RARITY_MULTIPLIER = { Common: 1.0, Uncommon: 1.5, Rare: 1.5 };

// === HEAVY / CHARGED ATTACK FORMULAS (wiki.avakot.org/Damage/Data) ===
// Heavy Attack damage is mis-displayed in the in-game UI; these are the true formulas.
// Att (attunement bonus) here = 0.5 × Pips · Virtues (dot product), capped per `attuneCapMult`
// below as WB × attuneCapMult × Rarity. NOTE: this 0.5×Pips·Virtues form is the Heavy/Charged
// attunement model and differs from the Light-Attack attunement in calculations.js.
export const HEAVY_ATTACK_FORMULAS = [
  {
    mode: 'Melee Heavy',
    formula: 'LA + Charge% × (WB + Att) − 0.8 × Enemy Armour',
    levelBonus: 54,
    attuneCapMult: 1.0,   // cap = WB × 1.0 × Rarity
    armourPen: '20%',
    notes: 'LA (Light Attack) = WB + Att + Lvl. Heavy Maces’ charged 2nd hit uses 0.25×(WB+Att) instead of Charge%.',
  },
  {
    mode: 'Bow Charged Shot',
    formula: '(2.5 × WB) + Att + Lvl − Enemy Armour',
    levelBonus: 48,
    attuneCapMult: 2.5,   // cap = WB × 2.5 × Rarity
    armourPen: '0% (no penetration)',
    notes: 'Base damage ×2.5 when fully charged. Caps at a higher Virtue amount than the Light shot.',
  },
  {
    mode: 'Magick Heavy Cast',
    formula: '1.5 × WB + Charge% × 3 × WB + Att + Lvl − 0.8 × Enemy Armour',
    levelBonus: 48,
    attuneCapMult: 4.5,   // cap = WB × 4.5 × Rarity
    armourPen: '20%',
    notes: 'Silistavf and Basker’s Wrest currently use 3× instead of 4.5× WB — likely a bug.',
  },
];

// === SMITE DAMAGE (wiki.avakot.org/Stats, "Smite Damage") ===
// Soulframe’s "Critical Hit": the damage dealt by a Pull Smite on a Smitten foe.
export const SMITE = {
  formula: '4 × (Weapon Base + Weapon Level Bonus + Voided Bonus) + Rat Totem Bonus',
  notes: [
    'Ignores Enemy Armour entirely.',
    'Total damage is reduced by 50% against Bosses.',
    'Can be increased by Voided Pact Art and Rat-group Totems.',
    'Smite is considered the "Critical Hit" of Soulframe.',
  ],
};
