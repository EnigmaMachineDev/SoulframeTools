// Virtue Prisms sourced from wiki.avakot.org
// Prisms determine the ratio of Virtue Point distribution
// One Virtue Point is allocated per Envoy Rank
// Max Envoy Rank is 30 (30 total virtue points from rank)
// Virtue effects:
//   Courage: 12 Life per point, scales large melee attunement, empowers 1st Arcanic
//   Spirit: 3 Life per point, scales Magick attunement, reduces Arcanic cooldown by 1.5% per point over 2, empowers 2nd Arcanic
//   Grace: 4 Life per point, scales dextrous weapon attunement, empowers 3rd Arcanic

export const PRISMS = [
  // Pure single-virtue prisms
  { name: 'Warrior of Mora', distribution: { courage: 1.0, spirit: 0.0, grace: 0.0 }, description: 'Aligns Virtue distribution to Courage.' },
  { name: "Mora's Beast", distribution: { courage: 1.0, spirit: 0.0, grace: 0.0 }, description: 'Aligns Virtue distribution to Courage.' },
  { name: "Iridis' Shaman", distribution: { courage: 0.0, spirit: 1.0, grace: 0.0 }, description: 'Aligns Virtue distribution to Spirit.' },
  { name: 'Druid of Iridis', distribution: { courage: 0.0, spirit: 1.0, grace: 0.0 }, description: 'Aligns Virtue distribution to Spirit.' },
  { name: 'Rogue to Saphene', distribution: { courage: 0.0, spirit: 0.0, grace: 1.0 }, description: 'Aligns Virtue distribution to Grace.' },
  { name: "Saphene's Shadow", distribution: { courage: 0.0, spirit: 0.0, grace: 1.0 }, description: 'Aligns Virtue distribution to Grace.' },

  // Dual-virtue prisms
  { name: "Knight O'Paladine", distribution: { courage: 0.5, spirit: 0.5, grace: 0.0 }, description: 'Aligns Virtue distribution to Courage and Spirit.' },
  { name: "Oro's Ranger", distribution: { courage: 0.5, spirit: 0.0, grace: 0.5 }, description: 'Aligns Virtue distribution to Courage and Grace.' },
  { name: "Verus' Assassin", distribution: { courage: 0.5, spirit: 0.0, grace: 0.5 }, description: 'Aligns Virtue distribution to Courage and Grace.' },

  // Wyld prisms
  { name: "Wyld Tethren's Braveling", distribution: { courage: 0.7, spirit: 0.15, grace: 0.15 }, description: 'Wyld Tethren variant. Primarily Courage with minor Spirit and Grace.' },
  { name: "Wyld Oscelda's Witch", distribution: { courage: 0.15, spirit: 0.7, grace: 0.15 }, description: 'Wyld Oscelda variant. Primarily Spirit with minor Courage and Grace.' },
  { name: "Wyld Sirin's Trickster", distribution: { courage: 0.15, spirit: 0.15, grace: 0.7 }, description: 'Wyld Sirin variant. Primarily Grace with minor Courage and Spirit.' },
];

export function calculateVirtues(prism, envoyRank, pactArtBonuses = { courage: 0, spirit: 0, grace: 0 }) {
  const basePoints = envoyRank;
  const courage = Math.floor(basePoints * prism.distribution.courage) + pactArtBonuses.courage;
  const spirit = Math.floor(basePoints * prism.distribution.spirit) + pactArtBonuses.spirit;
  const grace = Math.floor(basePoints * prism.distribution.grace) + pactArtBonuses.grace;
  return { courage, spirit, grace };
}

export function calculateLifeFromVirtues(virtues) {
  return virtues.courage * 12 + virtues.spirit * 3 + virtues.grace * 4;
}

export function calculateCooldownReduction(spirit) {
  if (spirit <= 2) return 0;
  return (spirit - 2) * 1.5;
}
