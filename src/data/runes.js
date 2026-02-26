// Rune data sourced from wiki.avakot.org
// Runes activate on Pull Smite and embolden weapons for a duration
// Each rune is tied to a specific Combat Art
// Stats shown are max rank (Gold / Rank 3)
// Runes also unlock a 4th Totem slot (type varies per rune)

export const RUNES = [
  // === BOW ===
  { name: "Alca's Breath", combatArt: 'Bow', effect: '+175% Arcanic for 30s', bonusTotemSlot: 'Utility', description: 'Enemies hit are occasionally afflicted by a projectile attraction field, redirecting projectiles to affected targets.' },
  { name: 'The Torrent', combatArt: 'Bow', effect: 'Pull Smite summons arrow volley dealing 30 damage', bonusTotemSlot: 'Attack', description: 'A mighty hail of arrows rains down on Pull Smite.' },

  // === FLYBLADE ===
  { name: 'Hurlwind', combatArt: 'Flyblade', effect: '+125% Voltaic for 30s', bonusTotemSlot: 'Attack', description: 'Gusts ever-whirling embolden your Flyblade with Voltaic energy.' },
  { name: 'Picktrix', combatArt: 'Flyblade', effect: 'Projectiles spawn 3 seeking sprites dealing 40% damage for 10s', bonusTotemSlot: 'Utility', description: 'Swarming sprites seek out enemies struck by your Flyblade projectiles.' },

  // === GREATSWORD ===
  { name: 'Everflame', combatArt: 'Greatsword', effect: '+100% Flame for 20s', bonusTotemSlot: 'Attack', description: 'The eternal flame embolds your Greatsword with fire damage.' },
  { name: 'Treefell', combatArt: 'Greatsword', effect: 'Charged heavies charge 100% faster, longer reach, bypass 40 Defense for 30s', bonusTotemSlot: 'Defense', description: 'Heavy, massive, and quick — your charged attacks become devastating.' },

  // === LONG BLADE ===
  { name: 'Everflame', combatArt: 'Long Blade', effect: '+100% Flame for 20s', bonusTotemSlot: 'Attack', description: 'The eternal flame embolds your Long Blade with fire damage.' },
  { name: 'The Mistgale', combatArt: 'Long Blade', effect: 'Attacks become ranged projectiles dealing 150 damage', bonusTotemSlot: 'Utility', description: 'Phantoms formed in mist turn your melee strikes into ranged projectiles.' },

  // === MAGICK ===
  { name: 'Archstorm', combatArt: 'Magick', effect: '+125% Voltaic for 30s', bonusTotemSlot: 'Defense', description: 'The erst storm, the root of all rain, empowers your Magick weapon.' },
  { name: 'The Hollowing', combatArt: 'Magick', effect: 'Mark enemies; subsequent attacks explode for 125 damage', bonusTotemSlot: 'Utility', description: 'Held breath bursting free — marked enemies detonate on repeated strikes.' },

  // === POLEARM ===
  { name: 'Splitbolt', combatArt: 'Polearm', effect: 'Throws have 10 additional projectiles for 20s', bonusTotemSlot: 'Attack', description: 'Forked lightning strengthened in fragmentation splits your thrown polearm.' },
  { name: 'Torcheternal', combatArt: 'Polearm', effect: '+100% Flame for 20s', bonusTotemSlot: 'Defense', description: 'The Fey Torch, alight beyond the veil, empowers your Polearm.' },

  // === SHIELD ===
  { name: 'Forburn', combatArt: 'Shield', effect: '+100% Flame for 20s', bonusTotemSlot: 'Attack', description: 'The Fey Torch, alight beyond the veil, empowers your Shield.' },
  { name: 'The Durglint', combatArt: 'Shield', effect: 'Guarding fires beams dealing 100 damage, boosts next melee for 30s', bonusTotemSlot: 'Defense', description: 'Sharp reflections fire beams from your shield while guarding.' },

  // === SHORT BLADE ===
  { name: 'Emberaught', combatArt: 'Short Blade', effect: '+100% Flame for 20s', bonusTotemSlot: 'Attack', description: 'The ember, ready to be stoked, empowers your Short Blade.' },
  { name: 'The Flitsmoke', combatArt: 'Short Blade', effect: 'Cloaks you in shadow; stealth kills extend duration by 25s', bonusTotemSlot: 'Utility', description: 'Smoke ephemeral cloaks you after Pull Smite, rewarding stealth kills.' },
];
