// Weapon data sourced from wiki.avakot.org/Module:Data/Weapons
// baseDamage = Rank 30 Attack, rank0Damage = Rank 0 Attack
// Rank scaling: Attack_at_rank = rank0 + floor(rank * (baseDamage - rank0) / 30)
// attuneCap: wiki VirtueAttuneCap field (NOT a bonus cap — see calculations.js)

export const COMBAT_ARTS = [
  'Bow', 'Flyblade', 'Greatsword', 'Long Blade', 'Magick', 'Polearm', 'Shield', 'Short Blade'
];

export const WEAPONS = [
  // === BOWS (Primary) ===
  { name: 'Blitzel', combatArt: 'Bow', damageType: 'Sharp', rank0Damage: 42, baseDamage: 66, attackSpeed: 0.9, smiteChance: 2, staggerDamage: 54, attunement: { courage: 2, spirit: 0, grace: 2 }, virtueReq: { grace: 16 }, attuneCap: 28, slot: 'Primary' },
  { name: 'Juniper', combatArt: 'Bow', damageType: 'Sharp', rank0Damage: 43, baseDamage: 67, attackSpeed: 0.85, smiteChance: 6, staggerDamage: 50, attunement: { courage: 0, spirit: 2, grace: 2 }, virtueReq: { grace: 15 }, attuneCap: 29, slot: 'Primary' },
  { name: 'Maestro', combatArt: 'Bow', damageType: 'Sharp', rank0Damage: 41, baseDamage: 65, attackSpeed: 0.75, smiteChance: 5, staggerDamage: 54, attunement: { courage: 0, spirit: 2, grace: 2 }, virtueReq: { grace: 16 }, attuneCap: 28, slot: 'Primary' },
  { name: 'The Starling', combatArt: 'Bow', damageType: 'Sharp', rank0Damage: 45, baseDamage: 69, attackSpeed: 1.1, smiteChance: 6, staggerDamage: 54, attunement: { courage: 0, spirit: 0, grace: 2 }, virtueReq: { grace: 10 }, attuneCap: 30, slot: 'Primary' },
  { name: 'Thistle', combatArt: 'Bow', damageType: 'Sharp', rank0Damage: 36, baseDamage: 60, attackSpeed: 0.8, smiteChance: 5, staggerDamage: 50, attunement: { courage: 0, spirit: 0, grace: 1 }, virtueReq: {}, attuneCap: 36, slot: 'Primary' },

  // === FLYBLADES (Sidearm) ===
  { name: 'Precklies', combatArt: 'Flyblade', damageType: 'Sharp', rank0Damage: 25, baseDamage: 49, attackSpeed: 1.6, smiteChance: 4, staggerDamage: 19, attunement: { courage: 0, spirit: 0, grace: 1 }, virtueReq: {}, attuneCap: 25, slot: 'Sidearm' },
  { name: 'Skílter', combatArt: 'Flyblade', damageType: 'Sharp', rank0Damage: 29, baseDamage: 53, attackSpeed: 1.5, smiteChance: 3, staggerDamage: 21, attunement: { courage: 2, spirit: 0, grace: 2 }, virtueReq: { grace: 14 }, attuneCap: 19, slot: 'Sidearm' },
  { name: 'Thrice Spurns', combatArt: 'Flyblade', damageType: 'Sharp', rank0Damage: 31, baseDamage: 55, attackSpeed: 1.5, smiteChance: 4, staggerDamage: 21, attunement: { courage: 2, spirit: 0, grace: 0 }, virtueReq: { courage: 10 }, attuneCap: 21, slot: 'Sidearm' },

  // === GREATSWORDS (Primary) ===
  { name: 'Needleseye', combatArt: 'Greatsword', damageType: 'Sharp', rank0Damage: 63, baseDamage: 87, attackSpeed: 0.55, smiteChance: 5, staggerDamage: 108, attunement: { courage: 3, spirit: 0, grace: 0 }, virtueReq: { courage: 21 }, attuneCap: 43, slot: 'Primary' },
  { name: 'Purity', combatArt: 'Greatsword', damageType: 'Sharp', rank0Damage: 68, baseDamage: 92, attackSpeed: 0.5, smiteChance: 6, staggerDamage: 100, attunement: { courage: 3, spirit: 2, grace: 0 }, virtueReq: { courage: 21 }, attuneCap: 36, slot: 'Primary' },
  { name: 'The Paragon', combatArt: 'Greatsword', damageType: 'Sharp', rank0Damage: 67, baseDamage: 91, attackSpeed: 0.5, smiteChance: 7, staggerDamage: 94, attunement: { courage: 2, spirit: 2, grace: 2 }, virtueReq: {}, attuneCap: 134, slot: 'Primary' },

  // === LONG BLADES (Primary) ===
  { name: 'Dewelion', combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 48, baseDamage: 72, attackSpeed: 0.55, smiteChance: 6, staggerDamage: 66, attunement: { courage: 0, spirit: 2, grace: 3 }, virtueReq: { grace: 22 }, attuneCap: 22, slot: 'Primary' },
  { name: 'Igne Mora', combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 47, baseDamage: 71, attackSpeed: 0.6, smiteChance: 1, staggerDamage: 64, attunement: { courage: 2, spirit: 0, grace: 2 }, virtueReq: { courage: 15 }, attuneCap: 29, slot: 'Primary' },
  { name: "Marrow's Bane", combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 54, baseDamage: 78, attackSpeed: 0.5, smiteChance: 5, staggerDamage: 74, attunement: { courage: 4, spirit: 0, grace: 0 }, virtueReq: { courage: 25 }, attuneCap: 27, slot: 'Primary' },
  { name: 'Nurash', combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 39, baseDamage: 63, attackSpeed: 0.6, smiteChance: 5, staggerDamage: 68, attunement: { courage: 2, spirit: 0, grace: 2 }, virtueReq: { courage: 18 }, attuneCap: 26, slot: 'Primary' },
  { name: 'Sollos-I', combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 42, baseDamage: 66, attackSpeed: 0.65, smiteChance: 4, staggerDamage: 64, attunement: { courage: 3, spirit: 0, grace: 0 }, virtueReq: { courage: 16 }, attuneCap: 27, slot: 'Primary' },
  { name: 'Stultin', combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 49, baseDamage: 73, attackSpeed: 0.6, smiteChance: 3, staggerDamage: 68, attunement: { courage: 3, spirit: 0, grace: 0 }, virtueReq: { courage: 19 }, attuneCap: 33, slot: 'Primary' },
  { name: 'Tessard', combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 45, baseDamage: 69, attackSpeed: 0.6, smiteChance: 2, staggerDamage: 64, attunement: { courage: 2, spirit: 2, grace: 0 }, virtueReq: { courage: 17 }, attuneCap: 25, slot: 'Primary' },
  { name: 'The Ivor', combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 44, baseDamage: 68, attackSpeed: 0.6, smiteChance: 4, staggerDamage: 68, attunement: { courage: 2, spirit: 0, grace: 0 }, virtueReq: { courage: 10 }, attuneCap: 29, slot: 'Primary' },
  { name: 'Vetch', combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 44, baseDamage: 68, attackSpeed: 0.6, smiteChance: 3, staggerDamage: 64, attunement: { courage: 2, spirit: 0, grace: 2 }, virtueReq: { courage: 15 }, attuneCap: 28, slot: 'Primary' },
  { name: 'Wulder', combatArt: 'Long Blade', damageType: 'Sharp', rank0Damage: 38, baseDamage: 62, attackSpeed: 0.65, smiteChance: 3, staggerDamage: 62, attunement: { courage: 1, spirit: 0, grace: 0 }, virtueReq: {}, attuneCap: 36, slot: 'Primary' },

  // === MAGICK - Staves (Primary) ===
  { name: 'Gwylen', combatArt: 'Magick', damageType: 'Arcanic', rank0Damage: 33, baseDamage: 57, attackSpeed: 1.0, smiteChance: 6, staggerDamage: 19, attunement: { courage: 0, spirit: 1, grace: 0 }, virtueReq: {}, attuneCap: 32, slot: 'Primary' },
  { name: 'Seathorn', combatArt: 'Magick', damageType: 'Arcanic', rank0Damage: 44, baseDamage: 68, attackSpeed: 0.9, smiteChance: 2, staggerDamage: 46, attunement: { courage: 0, spirit: 3, grace: 2 }, virtueReq: { spirit: 21 }, attuneCap: 22, slot: 'Primary' },
  { name: 'The Alder', combatArt: 'Magick', damageType: 'Arcanic', rank0Damage: 40, baseDamage: 64, attackSpeed: 0.8, smiteChance: 6, staggerDamage: 23, attunement: { courage: 0, spirit: 2, grace: 0 }, virtueReq: { spirit: 10 }, attuneCap: 27, slot: 'Primary' },
  { name: 'The Erstroot', combatArt: 'Magick', damageType: 'Arcanic', rank0Damage: 40, baseDamage: 64, attackSpeed: 0.95, smiteChance: 6, staggerDamage: 27, attunement: { courage: 0, spirit: 3, grace: 0 }, virtueReq: { spirit: 19 }, attuneCap: 27, slot: 'Primary' },

  // === MAGICK - Wristcasters (Sidearm) ===
  { name: "Basker's Wrest", combatArt: 'Magick', damageType: 'Arcanic', rank0Damage: 32, baseDamage: 56, attackSpeed: 1.4, smiteChance: 4, staggerDamage: 40, attunement: { courage: 2, spirit: 2, grace: 0 }, virtueReq: { spirit: 17 }, attuneCap: 21, slot: 'Sidearm' },
  { name: 'Esthelle', combatArt: 'Magick', damageType: 'Arcanic', rank0Damage: 33, baseDamage: 57, attackSpeed: 1.3, smiteChance: 6, staggerDamage: 23, attunement: { courage: 0, spirit: 2, grace: 0 }, virtueReq: { spirit: 10 }, attuneCap: 22, slot: 'Sidearm' },
  { name: 'Odiac', combatArt: 'Magick', damageType: 'Voltaic', rank0Damage: 32, baseDamage: 56, attackSpeed: 1.5, smiteChance: 6, staggerDamage: 25, attunement: { courage: 2, spirit: 2, grace: 0 }, virtueReq: { spirit: 14 }, attuneCap: 21, slot: 'Sidearm' },

  // === POLEARMS (Primary) ===
  { name: 'Duhk Halic', combatArt: 'Polearm', damageType: 'Sharp', rank0Damage: 59, baseDamage: 83, attackSpeed: 0.55, smiteChance: 4, staggerDamage: 80, attunement: { courage: 2, spirit: 2, grace: 0 }, virtueReq: { courage: 15 }, attuneCap: 39, slot: 'Primary' },
  { name: 'Gathannan', combatArt: 'Polearm', damageType: 'Sharp', rank0Damage: 69, baseDamage: 93, attackSpeed: 0.5, smiteChance: 4, staggerDamage: 86, attunement: { courage: 3, spirit: 2, grace: 0 }, virtueReq: { courage: 22 }, attuneCap: 35, slot: 'Primary' },
  { name: 'Rook', combatArt: 'Polearm', damageType: 'Blunt', rank0Damage: 65, baseDamage: 89, attackSpeed: 0.55, smiteChance: 2, staggerDamage: 94, attunement: { courage: 2, spirit: 2, grace: 0 }, virtueReq: { courage: 15 }, attuneCap: 40, slot: 'Primary' },
  { name: 'Vasp-IV', combatArt: 'Polearm', damageType: 'Sharp', rank0Damage: 59, baseDamage: 72, attackSpeed: 0.6, smiteChance: 5, staggerDamage: 80, attunement: { courage: 3, spirit: 0, grace: 0 }, virtueReq: { courage: 16 }, attuneCap: 58, slot: 'Primary' },

  // === SHIELDS (Primary) ===
  { name: 'Bog & Myrtle', combatArt: 'Shield', damageType: 'Sharp', rank0Damage: 39, baseDamage: 63, attackSpeed: 0.7, smiteChance: 2, staggerDamage: 68, attunement: { courage: 2, spirit: 0, grace: 2 }, virtueReq: { courage: 14 }, attuneCap: 26, slot: 'Primary' },
  { name: 'Oryn-Umbr', combatArt: 'Shield', damageType: 'Sharp', rank0Damage: 37, baseDamage: 61, attackSpeed: 0.7, smiteChance: 5, staggerDamage: 60, attunement: { courage: 3, spirit: 0, grace: 0 }, virtueReq: { courage: 16 }, attuneCap: 25, slot: 'Primary' },

  // === SHORT BLADES - Dual Blades (Primary) ===
  { name: 'Rivt-II', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 26, baseDamage: 50, attackSpeed: 1.4, smiteChance: 4, staggerDamage: 49, attunement: { courage: 0, spirit: 0, grace: 3 }, virtueReq: { grace: 16 }, attuneCap: 26, slot: 'Primary' },
  { name: 'Rostrum', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 37, baseDamage: 61, attackSpeed: 1.2, smiteChance: 5, staggerDamage: 60, attunement: { courage: 0, spirit: 2, grace: 2 }, virtueReq: { grace: 15 }, attuneCap: 25, slot: 'Primary' },
  { name: 'The Royal Tines', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 26, baseDamage: 50, attackSpeed: 1.1, smiteChance: 6, staggerDamage: 47, attunement: { courage: 0, spirit: 2, grace: 2 }, virtueReq: { grace: 14 }, attuneCap: 17, slot: 'Primary' },
  { name: 'Unsula', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 26, baseDamage: 50, attackSpeed: 1.3, smiteChance: 5, staggerDamage: 47, attunement: { courage: 2, spirit: 0, grace: 2 }, virtueReq: { grace: 14 }, attuneCap: 17, slot: 'Primary' },
  { name: 'Clivers', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 25, baseDamage: 49, attackSpeed: 1.7, smiteChance: 5, staggerDamage: 40, attunement: { courage: 2, spirit: 0, grace: 2 }, virtueReq: { grace: 15 }, attuneCap: 25, slot: 'Sidearm' },
  { name: 'Cobladh', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 38, baseDamage: 62, attackSpeed: 1.6, smiteChance: 4, staggerDamage: 54, attunement: { courage: 0, spirit: 0, grace: 2 }, virtueReq: { grace: 10 }, attuneCap: 26, slot: 'Sidearm' },
  { name: 'Grinn', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 36, baseDamage: 60, attackSpeed: 1.8, smiteChance: 6, staggerDamage: 60, attunement: { courage: 2, spirit: 0, grace: 2 }, virtueReq: { grace: 16 }, attuneCap: 23, slot: 'Sidearm' },
  { name: 'Nettle', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 33, baseDamage: 57, attackSpeed: 1.5, smiteChance: 3, staggerDamage: 54, attunement: { courage: 0, spirit: 0, grace: 1 }, virtueReq: {}, attuneCap: 32, slot: 'Sidearm' },
  { name: 'Virdigris', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 38, baseDamage: 62, attackSpeed: 1.4, smiteChance: 4, staggerDamage: 60, attunement: { courage: 0, spirit: 2, grace: 2 }, virtueReq: { grace: 15 }, attuneCap: 24, slot: 'Sidearm' },
  { name: 'Witan', combatArt: 'Short Blade', damageType: 'Sharp', rank0Damage: 37, baseDamage: 61, attackSpeed: 1.6, smiteChance: 5, staggerDamage: 60, attunement: { courage: 0, spirit: 2, grace: 2 }, virtueReq: { grace: 15 }, attuneCap: 23, slot: 'Sidearm' },
];
