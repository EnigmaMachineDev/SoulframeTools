// Rune data sourced from wiki.avakot.org
// Runes now activate by pressing Spectral Sight + Heavy Attack.
//   For Bows: activating with Spectral Sight + Heavy Attack charges with a regular Shot (not alt fire).
// Smite a combatant to store a Rune charge; unleash at the moment of your choosing.
// Rune rank determines max charge capacity (up to 4 charges at max rank).
// Elite enemies (e.g. Bannerettes) grant 2 charges from a Smite.
// Two types:
//   Single Attack Runes — consume one charge immediately on the next attack
//   Timed Runes — consume a Smite charge over a duration
// Each rune is tied to a specific Combat Art.
// Runes also unlock a 4th Totem slot (type varies per rune).

export const RUNES = [
  // === BOW — Single Attack ===
  { name: "Alca's Breath", combatArt: 'Bow', runeType: 'Single Attack', effect: 'Deal additional Arcanic damage', bonusTotemSlot: 'Utility', description: 'Enemies hit are occasionally afflicted by a projectile attraction field, redirecting projectiles to affected targets.' },
  { name: 'The Torrent', combatArt: 'Bow', runeType: 'Single Attack', effect: 'Summon a volley of arrows that rains from the sky, dealing a percentage of damage', bonusTotemSlot: 'Attack', description: 'A mighty hail of arrows rains down on a fully charged Shot.' },

  // === FLYBLADE — Single Attack ===
  { name: 'Hurlwind', combatArt: 'Flyblade', runeType: 'Single Attack', effect: 'Deal additional Voltaic damage', bonusTotemSlot: 'Attack', description: 'Gusts ever-whirling embolden your Flyblade with Voltaic energy.' },
  { name: 'Picktrix', combatArt: 'Flyblade', runeType: 'Single Attack', effect: 'Releases a flock of seeking sprites, dealing a percentage of damage', bonusTotemSlot: 'Utility', description: 'Swarming sprites seek out enemies struck by your Flyblade.' },

  // === GREATSWORD ===
  { name: 'Everflame', combatArt: 'Heavy', runeType: 'Single Attack', effect: 'Deal additional Flame damage', bonusTotemSlot: 'Attack', description: 'The eternal flame embolds your Heavy weapon with fire damage.' },
  { name: 'Treefell', combatArt: 'Heavy', runeType: 'Timed', effect: 'For a duration, Heavy Attacks charge faster, have longer reach and strike through defences. Duration resets with each enemy slain', bonusTotemSlot: 'Defense', description: 'Heavy, massive, and quick — your charged attacks become devastating for a duration.' },

  // === LONG BLADE ===
  { name: 'Everflame', combatArt: 'Long Blade', runeType: 'Single Attack', effect: 'Deal additional Flame damage', bonusTotemSlot: 'Attack', description: 'The eternal flame embolds your Long Blade with fire damage.' },
  { name: 'The Mistgale', combatArt: 'Long Blade', runeType: 'Single Attack', effect: 'Cast a magick gale that deals increased damage and Stagger damage', bonusTotemSlot: 'Utility', description: 'Phantoms formed in mist cast a devastating gale on a fully charged Heavy Attack.' },

  // === MAGICK ===
  { name: 'Archstorm', combatArt: 'Magick', runeType: 'Single Attack', effect: 'Deal additional Voltaic damage', bonusTotemSlot: 'Defense', description: 'The erst storm, the root of all rain, empowers your Magick weapon.' },
  { name: 'The Hollowing', combatArt: 'Magick', runeType: 'Single Attack', effect: 'Mark a foe for Hollowing; additional attacks release an explosion that deals damage', bonusTotemSlot: 'Utility', description: 'Held breath bursting free — marked enemies detonate on repeated strikes.' },

  // === POLEARM ===
  { name: 'Splitbolt', combatArt: 'Polearm', runeType: 'Single Attack', effect: 'A barrage of spears is summoned, dealing a percentage of weapon damage each', bonusTotemSlot: 'Attack', description: 'Forked lightning strengthened in fragmentation — a barrage of spears erupts on a fully charged Heavy Attack.' },
  { name: 'Torcheternal', combatArt: 'Polearm', runeType: 'Single Attack', effect: 'Deal additional Flame damage', bonusTotemSlot: 'Defense', description: 'The Fey Torch, alight beyond the veil, empowers your Polearm.' },

  // === SHIELD ===
  { name: 'Forburn', combatArt: 'Shield', runeType: 'Single Attack', effect: 'Deal additional Flame damage', bonusTotemSlot: 'Attack', description: 'The Fey Torch, alight beyond the veil, empowers your Shield.' },
  { name: 'The Durglint', combatArt: 'Shield', runeType: 'Timed', effect: 'Shield is set alight for a duration, dealing bonus damage and increasing the power of the next Melee attack', bonusTotemSlot: 'Defense', description: 'Your shield blazes for a duration after a fully charged Heavy Attack, and empowers the next melee strike.' },

  // === SHORT BLADE ===
  { name: 'Emberaught', combatArt: 'Short Blade', runeType: 'Single Attack', effect: 'Deal additional Flame damage', bonusTotemSlot: 'Attack', description: 'The ember, ready to be stoked, empowers your Short Blade.' },
  { name: 'The Flitsmoke', combatArt: 'Short Blade', runeType: 'Timed', effect: 'Cloaked in shadow for a duration; each stealth kill increases the duration', bonusTotemSlot: 'Utility', description: 'Smoke ephemeral cloaks you after a fully charged Heavy Attack, rewarding stealth kills.' },
];
