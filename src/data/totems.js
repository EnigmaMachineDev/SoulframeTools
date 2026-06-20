// Totem data sourced from wiki.avakot.org/Totems/table (Preludes 15 "Gods & Ghosts").
//
// P15 reworked Totems: they are no longer bound to a Combat Art and no longer split into
// Attack / Defense / Utility slots. There are now 26 totems grouped only by Animal, each a
// single effect that triggers on Rune-unleash, Pull Smite, or Smite. Effects scale Rank 0→3;
// `effect` is the 4 rank strings [R0, R1, R2, R3]. The UI shows the max rank (index 3).
//
// The wiki's Totems main page (which would document how many totems a build may equip) is
// still WIP, so the Build Planner treats them as a flat, build-wide selectable pool.

export const TOTEM_ANIMALS = ['Beaver', 'Duck', 'Fawn', 'Rabbit', 'Rat', 'Squirrel'];

export const TOTEMS = [
  // ========== BEAVER (Rune-triggered armour / sustain) ==========
  { name: 'Armour Coat', animal: 'Beaver', effect: [
    'Increase Physical Armour by +2 per Rune Charge',
    'Increase Physical Armour by +2 per Rune Charge',
    'Increase Physical Armour by +3 per Rune Charge',
    'Increase Physical Armour by +3 per Rune Charge',
  ] },
  { name: 'Draft Dam', animal: 'Beaver', effect: [
    'Reduce Rune drain by 10%',
    'Reduce Rune drain by 15%',
    'Reduce Rune drain by 20%',
    'Reduce Rune drain by 25%',
  ] },
  { name: 'Rivers Revive', animal: 'Beaver', effect: [
    'Restore +15 Life per second for 8 seconds upon unleashing a Rune',
    'Restore +16 Life per second for 8 seconds upon unleashing a Rune',
    'Restore +18 Life per second for 8 seconds upon unleashing a Rune',
    'Restore +20 Life per second for 8 seconds upon unleashing a Rune',
  ] },
  { name: 'Stocky Lodge', animal: 'Beaver', effect: [
    '+8 Armour upon unleashing Rune',
    '+9 Armour upon unleashing Rune',
    '+10 Armour upon unleashing Rune',
    '+12 Armour upon unleashing Rune',
  ] },
  { name: 'Thunder Tail', animal: 'Beaver', effect: [
    'Unleashing a Rune deals +100 Stagger damage within 5 m',
    'Unleashing a Rune deals +150 Stagger damage within 6 m',
    'Unleashing a Rune deals +175 Stagger damage within 8 m',
    'Unleashing a Rune deals +200 Stagger damage within 10 m',
  ] },

  // ========== DUCK (Pull Smite sustain / range) ==========
  { name: 'Dabble Dredge', animal: 'Duck', effect: [
    'Restore +50 Life on Pull Smite',
    'Restore +125 Life on Pull Smite',
    'Restore +175 Life on Pull Smite',
    'Restore +200 Life on Pull Smite',
  ] },
  { name: 'Diving Drake', animal: 'Duck', effect: [
    'Pull Smite deals +30 additional damage',
    'Pull Smite deals +50 additional damage',
    'Pull Smite deals +80 additional damage',
    'Pull Smite deals +100 additional damage',
  ] },
  { name: 'Far Foul', animal: 'Duck', effect: [
    'Increase Pull Smite Range by +2 m',
    'Increase Pull Smite Range by +3 m',
    'Increase Pull Smite Range by +4 m',
    'Increase Pull Smite Range by +5 m',
  ] },
  { name: 'Heal Preens', animal: 'Duck', effect: [
    'Heals all allies within 8 m for +50 Life on Pull Smite',
    'Heals all allies within 10 m for +75 Life on Pull Smite',
    'Heals all allies within 12 m for +100 Life on Pull Smite',
    'Heals all allies within 15 m for +125 Life on Pull Smite',
  ] },

  // ========== FAWN (Pull Smite control / Smite chance) ==========
  { name: 'Cervid Ward', animal: 'Fawn', effect: [
    'Increase Magick Armour by +2 per Rune Charge',
    'Increase Magick Armour by +2 per Rune Charge',
    'Increase Magick Armour by +3 per Rune Charge',
    'Increase Magick Armour by +3 per Rune Charge',
  ] },
  { name: 'Hollowed Herd', animal: 'Fawn', effect: [
    'Create a Decoy for 2 seconds on Pull Smite',
    'Create a Decoy for 3 seconds on Pull Smite',
    'Create a Decoy for 4 seconds on Pull Smite',
    'Create a Decoy for 5 seconds on Pull Smite',
  ] },
  { name: 'Moving Musk', animal: 'Fawn', effect: [
    'Drag enemies towards the Envoy on Pull Smite dealing +20 damage',
    'Drag enemies towards the Envoy on Pull Smite dealing +40 damage',
    'Drag enemies towards the Envoy on Pull Smite dealing +60 damage',
    'Drag enemies towards the Envoy on Pull Smite dealing +80 damage',
  ] },
  { name: 'Smiting Stag', animal: 'Fawn', effect: [
    'Increase Smite Chance by 2% per Rune Charge',
    'Increase Smite Chance by 3% per Rune Charge',
    'Increase Smite Chance by 4% per Rune Charge',
    'Increase Smite Chance by 5% per Rune Charge',
  ] },
  { name: 'Turn Tusk', animal: 'Fawn', effect: [
    'Temporarily turn enemies into allies for 2 seconds on Pull Smite',
    'Temporarily turn enemies into allies for 3 seconds on Pull Smite',
    'Temporarily turn enemies into allies for 3 seconds on Pull Smite',
    'Temporarily turn enemies into allies for 4 seconds on Pull Smite',
  ] },

  // ========== RABBIT (Pull Smite explosions / Rune damage) ==========
  { name: 'Binky Kick', animal: 'Rabbit', effect: [
    'Pull Smite causes a +50 damage explosion 5 m around the Envoy',
    'Pull Smite causes a +75 damage explosion 7 m around the Envoy',
    'Pull Smite causes a +100 damage explosion 9 m around the Envoy',
    'Pull Smite causes a +125 damage explosion 10 m around the Envoy',
  ] },
  { name: 'Dewclawer', animal: 'Rabbit', effect: [
    'Runes deal 5% additional damage',
    'Runes deal 8% additional damage',
    'Runes deal 10% additional damage',
    'Runes deal 15% additional damage',
  ] },
  { name: 'Hare Harms', animal: 'Rabbit', effect: [
    'Pull Smite causes +30 damage explosion 5 m around the Enemy',
    'Pull Smite causes +40 damage explosion 6 m around the Enemy',
    'Pull Smite causes +50 damage explosion 8 m around the Enemy',
    'Pull Smite causes +80 damage explosion 12 m around the Enemy',
  ] },
  { name: 'Sprout Spring', animal: 'Rabbit', effect: [
    'Effects of Pull Smite has a 20% chance of spreading to all allies',
    'Effects of Pull Smite has a 33.3% chance of spreading to all allies',
    'Effects of Pull Smite has a 33.3% chance of spreading to all allies',
    'Effects of Pull Smite has a 50% chance of spreading to all allies',
  ] },

  // ========== RAT (Smite damage / duration / virtue) ==========
  { name: 'Arcanic Gnaws', animal: 'Rat', effect: [
    'Increases Arcanic damage by +5 on Smite',
    'Increases Arcanic damage by +15 on Smite',
    'Increases Arcanic damage by +20 on Smite',
    'Increases Arcanic damage by +25 on Smite',
  ] },
  { name: 'Bandicota Blast', animal: 'Rat', effect: [
    'Smite creates a blast that Staggers and deals +100 Stagger damage to nearby enemies',
    'Smite creates a blast that Staggers and deals +125 Stagger damage to nearby enemies',
    'Smite creates a blast that Staggers and deals +150 Stagger damage to nearby enemies',
    'Smite creates a blast that Staggers and deals +200 Stagger damage to nearby enemies',
  ] },
  { name: 'Lingering Litter', animal: 'Rat', effect: [
    'Increase Smite duration by +1 seconds',
    'Increase Smite duration by +2 seconds',
    'Increase Smite duration by +3 seconds',
    'Increase Smite duration by +4 seconds',
  ] },
  { name: 'Noble Nestling', animal: 'Rat', effect: [
    'Buff Virtue 5% associated with enemy soul colour on Pull Smite',
    'Buff Virtue 8% associated with enemy soul colour on Pull Smite',
    'Buff Virtue 10% associated with enemy soul colour on Pull Smite',
    'Buff Virtue 12% associated with enemy soul colour on Pull Smite',
  ] },

  // ========== SQUIRREL (Smite spread / speed / Voltaic) ==========
  { name: 'Blinding Bite', animal: 'Squirrel', effect: [
    'Create a bright flash that blinds enemies in a 4 m radius',
    'Create a bright flash that blinds enemies in a 5 m radius',
    'Create a bright flash that blinds enemies in a 5 m radius',
    'Create a bright flash that blinds enemies in a 6 m radius',
  ] },
  { name: 'Quick Drey', animal: 'Squirrel', effect: [
    'Increase attack speed by 10% on Pull Smite',
    'Increase attack speed by 12% on Pull Smite',
    'Increase attack speed by 14% on Pull Smite',
    'Increase attack speed by 16% on Pull Smite',
  ] },
  { name: 'Spreading Sploot', animal: 'Squirrel', effect: [
    '10% chance to Smite other enemies within 10 m of Smite',
    '12.5% chance to Smite other enemies within 12 m of Smite',
    '16.7% chance to Smite other enemies within 17 m of Smite',
    '20% chance to Smite other enemies within 20 m of Smite',
  ] },
  { name: 'Voltaic Scurry', animal: 'Squirrel', effect: [
    'Increase Voltaic Damage by +5 on Smite enemies',
    'Increase Voltaic Damage by +15 on Smite enemies',
    'Increase Voltaic Damage by +20 on Smite enemies',
    'Increase Voltaic Damage by +25 on Smite enemies',
  ] },
];
