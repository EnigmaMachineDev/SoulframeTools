// Talisman data sourced from wiki.avakot.org/Module:Data/Armour
// Talismans are accessories worn about the Envoy's neck
// They provide Virtue bonuses, offensive stats, or defensive stats
// Cannot be leveled. One talisman equipped at a time.

export const TALISMANS = [
  // === Alca's Children Set ===
  { name: 'Sproutfolk Seed', set: "Alca's Children", rarity: 'Common', stats: { spirit: 1 } },
  { name: 'Sproutfolk Shoot', set: "Alca's Children", rarity: 'Uncommon', stats: { spirit: 6 } },

  // === Circade Set ===
  { name: 'Dawn Pendant', set: 'Circade', rarity: 'Common', stats: { grace: 1 } },
  { name: 'Dusk Pendant', set: 'Circade', rarity: 'Common', stats: { courage: 1 } },
  { name: 'Midnight Pendant', set: 'Circade', rarity: 'Common', stats: { spirit: 1 } },
  { name: 'Triune Talisman', set: 'Circade', rarity: 'Common', stats: { courage: 3, grace: 3, spirit: 3 } },

  // === Cogah Set ===
  { name: 'The Cogah Creutair', set: 'Cogah', rarity: 'Common', stats: { grace: 2, stagger: 10 } },
  { name: 'The Cogah Grod', set: 'Cogah', rarity: 'Common', stats: { spirit: 2, attack: 10 } },
  { name: 'The Cogah Lorcaan', set: 'Cogah', rarity: 'Common', stats: { courage: 2, attack: 10 } },

  // === Founders Set ===
  { name: 'Paragon Periapt', set: 'Founders', rarity: 'Common', stats: { courage: 3, grace: 3, spirit: 3 } },
  { name: "Wylding's Heart", set: 'Founders', rarity: 'Uncommon', stats: { spirit: 3 } },
  { name: "Wylding's Hilt", set: 'Founders', rarity: 'Uncommon', stats: { courage: 3 } },
  { name: "Wylding's Hush", set: 'Founders', rarity: 'Uncommon', stats: { grace: 3 } },

  // === Kith of Kings Set ===
  { name: 'Medallion of Mora', set: 'Kith of Kings', rarity: 'Common', stats: { courage: 1 } },
  { name: 'Molten Mora', set: 'Kith of Kings', rarity: 'Uncommon', stats: { courage: 6 } },

  // === Orengall Set ===
  { name: 'Direskull', set: 'Orengall', rarity: 'Common', stats: { grace: 4, spirit: 1, courage: 1 } },
  { name: "Orengall's Fang", set: 'Orengall', rarity: 'Common', stats: { courage: 1, grace: 1, spirit: 4 } },

  // === Silent Rose Set ===
  { name: "Bloomin' Bodkin", set: 'Silent Rose', rarity: 'Uncommon', stats: { grace: 6 } },
  { name: "Rose's Bodkin", set: 'Silent Rose', rarity: 'Common', stats: { grace: 1 } },

  // === Unique ===
  { name: 'Cardinal Charm', set: 'Unique', rarity: 'Common', stats: { courage: 1, grace: 1, spirit: 2 } },
  { name: 'Prelude Honour', set: 'Unique', rarity: 'Common', stats: { courage: 1, grace: 1, spirit: 1 } },
  { name: "Synod's Bell Jar", set: 'Unique', rarity: 'Common', stats: { courage: 4, grace: 1, spirit: 1 } },
  { name: "Wazzard's Wish", set: 'Unique', rarity: 'Common', stats: { spirit: 1 } },
];
