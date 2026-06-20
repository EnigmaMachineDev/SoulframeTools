// Damage-type & status-effect data sourced from wiki.avakot.org/Damage (Preludes 15).
//
// Soulframe lists 11 damage types; 5 are still unnamed placeholders using Warframe icons
// (the two games share a codebase until Soulframe's damage gets its own tuning/icons).
// Documented below are the 6 named types relevant to the Envoy's weapons, pacts and runes.
//
// `mitigatedAs` is how the type counts when dealt BY enemies (Physical → Physical Defense,
// Magick → Magick Defense). `status` is the proc it can inflict, with its DoT/effect detail.

export const DAMAGE_TYPES = [
  {
    name: 'Sharp',
    mitigatedAs: 'Physical',
    status: 'Bleed',
    statusEffect: "Damage-over-time equal to 20% of the attack's damage per tick for 5 ticks (100% total).",
    armourInteraction: null,
    stacks: null,
    notes: 'The most common type — dealt by almost every foe and weapon.',
  },
  {
    name: 'Blunt',
    mitigatedAs: 'Physical',
    status: null,
    statusEffect: 'No status effect — raw physical impact damage.',
    armourInteraction: null,
    stacks: null,
    notes: '',
  },
  {
    name: 'Arcanic',
    mitigatedAs: 'Magick',
    status: 'Arcanic',
    statusEffect: "Deals 100% of the hit's damage over 2 ticks (50% per tick).",
    armourInteraction: 'DoT ticks are reduced by Enemy Armour.',
    stacks: null,
    notes: '',
  },
  {
    name: 'Flame',
    mitigatedAs: 'Magick',
    status: 'Ablaze',
    statusEffect: '+35% damage per second over 4 seconds (140% total).',
    armourInteraction: 'Reduces Enemy Armour by up to 50%; the reduction decays over 6 seconds after the burn ends.',
    stacks: false,
    notes: 'The proc does not appear to stack.',
  },
  {
    name: 'Voltaic',
    mitigatedAs: 'Magick',
    status: 'Stun',
    statusEffect: 'Briefly staggers the affected enemy and nearby enemies; the target then takes additional Stagger damage.',
    armourInteraction: null,
    stacks: null,
    notes: '',
  },
  {
    name: 'Poison',
    mitigatedAs: 'Magick',
    status: 'Poisoned',
    statusEffect: '16.25% of the hit damage per tick over 8 ticks (130% total).',
    armourInteraction: 'Not affected by Enemy Armour.',
    stacks: null,
    notes: '',
  },
];

// Five further damage types exist in-game but are not yet named or tuned (Warframe-icon
// placeholders): two "Magick" types (purple friendly-fire glow; head sparks), a Physical
// "Puncture"-style type (can reduce damage by 40%), a "Corrosive"-style blue flame (Magick),
// and a "Cold"-style slow/frost (Magick). They appear only on certain foes/hazards for now.
export const UNDOCUMENTED_DAMAGE_TYPE_COUNT = 5;
