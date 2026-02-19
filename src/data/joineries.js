// Joinery data sourced from wiki.avakot.org/Module:Data/Joineries
// Joineries are weapon upgrades applied via Steelsinging.
// Each joinery type applies to specific weapon categories.
// Tiers: Rusted (Common), Tempered (Uncommon), Polished (Rare), Blessed (Rare)
// Blessed tier has same stats as Polished but also adds +1 Attunement pip via reforge.
// The Gildaur "Polished" in the user's screenshot showed +25 Damage (not +20 as wiki says).
// P13 patch notes: "Increased Damage bonus given by Gildaur Joineries."
// We use the higher post-P13 values where confirmed by in-game screenshots.

export const JOINERIES = [
  {
    name: 'Verite',
    description: 'Melee joinery — reliable for mending melee weapons.',
    weaponTypes: ['Short Blade', 'Long Blade', 'Polearm', 'Shield', 'Greatsword'],
    tiers: [
      { tier: 'Rusted', rarity: 'Common', stats: { damage: 15 } },
      { tier: 'Tempered', rarity: 'Uncommon', stats: { damage: 20, parryStabilityCost: -10 } },
      { tier: 'Polished', rarity: 'Rare', stats: { damage: 25, parryStabilityCost: -15, perfectThrowDamage: 25 } },
      { tier: 'Blessed', rarity: 'Rare', stats: { damage: 25, parryStabilityCost: -15, perfectThrowDamage: 25 }, blessed: true },
    ],
  },
  {
    name: 'Feybalt',
    description: 'Magick joinery — powerful conductor for magick weapons.',
    weaponTypes: ['Magick'],
    tiers: [
      { tier: 'Rusted', rarity: 'Common', stats: { consecutiveDamage: 5 } },
      { tier: 'Tempered', rarity: 'Uncommon', stats: { consecutiveDamage: 5, parryStabilityCost: -20 } },
      { tier: 'Polished', rarity: 'Rare', stats: { consecutiveDamage: 10, parryStabilityCost: -25, throwDistance: 5 } },
      { tier: 'Blessed', rarity: 'Rare', stats: { consecutiveDamage: 10, parryStabilityCost: -25, throwDistance: 5 }, blessed: true },
    ],
  },
  {
    name: 'Quicksilver',
    description: 'Ranged joinery — ideal for mending ranged weapons.',
    weaponTypes: ['Bow', 'Flyblade'],
    tiers: [
      { tier: 'Rusted', rarity: 'Common', stats: { damage: 10 } },
      { tier: 'Tempered', rarity: 'Uncommon', stats: { damage: 15, weaponChargeRate: 10 } },
      { tier: 'Polished', rarity: 'Rare', stats: { damage: 20, weaponChargeRate: 20, headshotMultiplier: 25 } },
      { tier: 'Blessed', rarity: 'Rare', stats: { damage: 20, weaponChargeRate: 20, headshotMultiplier: 25 }, blessed: true },
    ],
  },
  {
    name: 'Gildaur',
    description: 'Universal joinery — fine for any weapon that needs mending.',
    weaponTypes: ['Short Blade', 'Long Blade', 'Polearm', 'Shield', 'Greatsword', 'Magick', 'Bow', 'Flyblade'],
    tiers: [
      { tier: 'Rusted', rarity: 'Common', stats: { damage: 10, parryStabilityCost: -20 } },
      { tier: 'Tempered', rarity: 'Uncommon', stats: { damage: 15, parryStabilityCost: -40 } },
      { tier: 'Polished', rarity: 'Rare', stats: { damage: 25, parryStabilityCost: -50, lifeSteal: 4 } },
      { tier: 'Blessed', rarity: 'Rare', stats: { damage: 25, parryStabilityCost: -50, lifeSteal: 4 }, blessed: true },
    ],
  },
];

// Get joineries available for a given combat art
export function getJoineriesForWeapon(combatArt) {
  return JOINERIES.filter(j => j.weaponTypes.includes(combatArt));
}

// Format a joinery tier's stats for display
export function formatJoineryStats(tierData) {
  const lines = [];
  const s = tierData.stats;
  if (s.damage) lines.push(`+${s.damage} Damage`);
  if (s.consecutiveDamage) lines.push(`+${s.consecutiveDamage} Consecutive damage`);
  if (s.parryStabilityCost) lines.push(`${s.parryStabilityCost}% Parry stability cost`);
  if (s.perfectThrowDamage) lines.push(`+${s.perfectThrowDamage} Perfect Throw damage`);
  if (s.weaponChargeRate) lines.push(`+${s.weaponChargeRate}% Weapon charge rate`);
  if (s.headshotMultiplier) lines.push(`+${s.headshotMultiplier}% Headshot multiplier`);
  if (s.lifeSteal) lines.push(`+${s.lifeSteal}% Life steal`);
  if (s.throwDistance) lines.push(`+${s.throwDistance} Throw distance`);
  if (tierData.blessed) lines.push('+1 Attunement pip (reforge)');
  return lines;
}
