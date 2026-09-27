// Rune data sourced from wiki.avakot.org (current through Preludes 16)
// Runes now activate by pressing Spectral Sight + Heavy Attack.
//   For Bows: activating with Spectral Sight + Heavy Attack charges with a regular Shot (not alt fire).
// Smite a combatant to store a Rune charge; unleash at the moment of your choosing.
// P16: attacking enemies also charges Runes (on-hit charging scales with Spirit), a Pull Smite
// grants less charge than before, and Runes slowly lose charge while out of combat.
// Rune rank determines max charge capacity (up to 4 charges at max rank).
// Elite enemies (e.g. Bannerettes) grant 2 charges from a Smite.
// Two types:
//   Single Attack Runes — consume one charge immediately on the next attack
//   Timed Runes — consume a Smite charge over a duration
// Each rune is tied to a specific Combat Art.
// Each Rune also unlocks a 4th Totem slot, attuned to the Virtue in `totemSlotVirtue`.
// `effect` is the wiki's max-rank (Rank 3) text, matching how totems.js shows max rank.

export const RUNES = [
  // === BOW — Single Attack ===
  { name: "Alca's Breath", combatArt: 'Bow', runeType: 'Single Attack', effect: "Deal +150% Arcanic damage", totemSlotVirtue: 'Grace', description: 'Enemies hit are occasionally afflicted by a projectile attraction field, redirecting projectiles to affected targets.' },
  { name: 'The Torrent', combatArt: 'Bow', runeType: 'Single Attack', effect: "A volley of arrows rains from the sky dealing 80% damage", totemSlotVirtue: 'Courage', description: 'A mighty hail of arrows rains down on a fully charged Shot.' },

  // === FLYBLADE — Single Attack ===
  { name: 'Hurlwind', combatArt: 'Flyblade', runeType: 'Single Attack', effect: "Deal +100% Voltaic damage", totemSlotVirtue: 'Spirit', description: 'Gusts ever-whirling embolden your Flyblade with Voltaic energy.' },
  { name: 'Picktrix', combatArt: 'Flyblade', runeType: 'Single Attack', effect: "A flock of 4 seeking sprites deal 120% damage", totemSlotVirtue: 'Spirit', description: 'Swarming sprites seek out enemies struck by your Flyblade.' },

  // === GREATSWORD ===
  { name: 'Cindermore', combatArt: 'Heavy', runeType: 'Single Attack', effect: "Deal +250% Flame damage", totemSlotVirtue: 'Courage', description: "The rune of the eternal flame, never to be stifled." },
  { name: 'Treefell', combatArt: 'Heavy', runeType: 'Timed', effect: "Treefell begins. For 8 seconds, heavy attacks charge 100% quicker, have a longer reach, and strike through 70 Defence. Treefell duration resets with each enemy slain", totemSlotVirtue: 'Courage', description: 'Heavy, massive, and quick — your charged attacks become devastating for a duration.' },

  // === LONG BLADE ===
  { name: 'Everflame', combatArt: 'Long Blade', runeType: 'Single Attack', effect: "Deal +250% Flame damage", totemSlotVirtue: 'Courage', description: 'The eternal flame embolds your Long Blade with fire damage.' },
  { name: 'The Mistgale', combatArt: 'Long Blade', runeType: 'Single Attack', effect: "Cast a magick gale dealing +200% Damage and +300% Stagger", totemSlotVirtue: 'Grace', description: 'Phantoms formed in mist cast a devastating gale on a fully charged Heavy Attack.' },

  // === MAGICK ===
  { name: 'Archstorm', combatArt: 'Magick', runeType: 'Single Attack', effect: "Deal +200% Arcanic damage", totemSlotVirtue: 'Spirit', description: 'The erst storm, the root of all rain, empowers your Magick weapon.' },
  { name: 'The Hollowing', combatArt: 'Magick', runeType: 'Single Attack', effect: "Mark a foe for Hollowing. 3 attacks on the marked foe releases an explosion dealing 300% damage", totemSlotVirtue: 'Courage', description: 'Held breath bursting free — marked enemies detonate on repeated strikes.' },

  // === POLEARM ===
  { name: 'Splitbolt', combatArt: 'Polearm', runeType: 'Single Attack', effect: "A barrage of spears is summoned, dealing 100% weapon damage each", totemSlotVirtue: 'Grace', description: 'Forked lightning strengthened in fragmentation — a barrage of spears erupts on a fully charged Heavy Attack.' },
  { name: 'Torcheternal', combatArt: 'Polearm', runeType: 'Single Attack', effect: "Deal +250% Flame damage", totemSlotVirtue: 'Courage', description: 'The Fey Torch, alight beyond the veil, empowers your Polearm.' },

  // === SHIELD ===
  { name: 'Forburn', combatArt: 'Shield', runeType: 'Single Attack', effect: "Deal +250% Flame damage", totemSlotVirtue: 'Courage', description: 'The Fey Torch, alight beyond the veil, empowers your Shield.' },
  { name: 'The Durglint', combatArt: 'Shield', runeType: 'Timed', effect: "Your shield is set alight for 8 seconds, dealing 125 damage and increasing the power of the next melee attack", totemSlotVirtue: 'Spirit', description: 'Your shield blazes for a duration after a fully charged Heavy Attack, and empowers the next melee strike.' },

  // === SHORT BLADE ===
  { name: 'Emberaught', combatArt: 'Short Blade', runeType: 'Single Attack', effect: "Deal +250% Flame damage", totemSlotVirtue: 'Courage', description: 'The ember, ready to be stoked, empowers your Short Blade.' },
  { name: 'The Flitsmoke', combatArt: 'Short Blade', runeType: 'Timed', effect: "You are cloaked in shadow for 6 seconds. Each stealth kill increases shadow duration by 3 seconds", totemSlotVirtue: 'Grace', description: 'Smoke ephemeral cloaks you after a fully charged Heavy Attack, rewarding stealth kills.' },
];
