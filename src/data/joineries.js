// Joinery data sourced from wiki.avakot.org/Module:Data/Joineries
// Joineries are weapon upgrades applied via Reforging at Tuvalkane.
// Each joinery type applies to specific weapon categories.
// Preludes 14 rework: Joineries now purely add Virtue Attunement pips.
//   Blessed       = +1 Attunement pip
//   Twice Blessed = +2 Attunement pips
//   Thrice Blessed = +3 Attunement pips
// Maximum of 5 pips in a single Virtue; 5+ pips grants a gold-trimmed icon.
// Weapon damage (+25 at max rank) is now part of the weapon rank progression, not joineries.

export const JOINERIES = [
  {
    name: 'Verite',
    description: 'Melee joinery — reliable for mending melee weapons.',
    weaponTypes: ['Short Blade', 'Long Blade', 'Polearm', 'Shield', 'Heavy'],
    tiers: [
      { tier: 'Blessed', rarity: 'Common', pips: 1 },
      { tier: 'Twice Blessed', rarity: 'Uncommon', pips: 2 },
      { tier: 'Thrice Blessed', rarity: 'Rare', pips: 3 },
    ],
  },
  {
    name: 'Feybalt',
    description: 'Magick joinery — powerful conductor for magick weapons.',
    weaponTypes: ['Magick'],
    tiers: [
      { tier: 'Blessed', rarity: 'Common', pips: 1 },
      { tier: 'Twice Blessed', rarity: 'Uncommon', pips: 2 },
      { tier: 'Thrice Blessed', rarity: 'Rare', pips: 3 },
    ],
  },
  {
    name: 'Quicksilver',
    description: 'Ranged joinery — ideal for mending ranged weapons.',
    weaponTypes: ['Bow', 'Flyblade'],
    tiers: [
      { tier: 'Blessed', rarity: 'Common', pips: 1 },
      { tier: 'Twice Blessed', rarity: 'Uncommon', pips: 2 },
      { tier: 'Thrice Blessed', rarity: 'Rare', pips: 3 },
    ],
  },
  {
    name: 'Gildaur',
    description: 'Universal joinery — fine for any weapon that needs mending.',
    weaponTypes: ['Short Blade', 'Long Blade', 'Polearm', 'Shield', 'Heavy', 'Magick', 'Bow', 'Flyblade'],
    tiers: [
      { tier: 'Blessed', rarity: 'Common', pips: 1 },
      { tier: 'Twice Blessed', rarity: 'Uncommon', pips: 2 },
      { tier: 'Thrice Blessed', rarity: 'Rare', pips: 3 },
    ],
  },
];

// Get joineries available for a given combat art
export function getJoineriesForWeapon(combatArt) {
  return JOINERIES.filter(j => j.weaponTypes.includes(combatArt));
}

// Format a joinery tier's stats for display
export function formatJoineryStats(tierData) {
  return [`+${tierData.pips} Virtue Attunement pip${tierData.pips > 1 ? 's' : ''}`];
}
