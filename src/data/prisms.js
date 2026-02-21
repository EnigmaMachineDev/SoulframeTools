// Virtue Prisms sourced from wiki.avakot.org/wiki/Module:Data/VirtuePrisms
// Prisms determine the ratio of Virtue Point distribution
// TWO Virtue Points are allocated per Envoy Rank (confirmed via in-game back-solving)
// Max Envoy Rank is 30 (60 total virtue points from rank)
// Virtue effects:
//   Courage: 10 Life per point, scales large melee attunement, empowers 1st Arcanic
//   Spirit: 1 Life per point, scales Magick attunement, reduces Arcanic cooldown by 1.5% per point over 2, empowers 2nd Arcanic
//   Grace: 4 Life per point, scales dextrous weapon attunement, empowers 3rd Arcanic

export const PRISMS = [
  // Pure single-virtue prisms (wiki: ~88% dominant, ~6% each minor)
  { name: 'Warrior of Mora', distribution: { courage: 0.39, spirit: 0.305, grace: 0.305 }, description: 'Aligns Virtue distribution to Courage.' },
  { name: "Mora's Beast", distribution: { courage: 0.88, spirit: 0.06, grace: 0.06 }, description: 'Aligns Virtue distribution heavily to Courage.' },
  { name: "Iridis' Shaman", distribution: { courage: 0.305, spirit: 0.39, grace: 0.305 }, description: 'Aligns Virtue distribution to Spirit.' },
  { name: 'Druid of Iridis', distribution: { courage: 0.06, spirit: 0.88, grace: 0.06 }, description: 'Aligns Virtue distribution heavily to Spirit.' },
  { name: 'Rogue to Saphene', distribution: { courage: 0.305, spirit: 0.305, grace: 0.39 }, description: 'Aligns Virtue distribution to Grace.' },
  { name: "Saphene's Shadow", distribution: { courage: 0.06, spirit: 0.06, grace: 0.88 }, description: 'Aligns Virtue distribution heavily to Grace.' },

  // Dual-virtue prisms
  { name: "Knight O'Paladine", distribution: { courage: 0.45, spirit: 0.43, grace: 0.12 }, description: 'Aligns Virtue distribution to Courage and Spirit.' },
  { name: "Oro's Ranger", distribution: { courage: 0.12, spirit: 0.45, grace: 0.43 }, description: 'Aligns Virtue distribution to Spirit and Grace.' },
  { name: "Verus' Assassin", distribution: { courage: 0.45, spirit: 0.12, grace: 0.43 }, description: 'Aligns Virtue distribution to Courage and Grace.' },

  // Wyld prisms (wiki: ~64% dominant, ~18% each minor)
  { name: "Wyld Tethren's Braveling", distribution: { courage: 0.64, spirit: 0.18, grace: 0.18 }, description: 'Wyld Tethren variant. Primarily Courage with minor Spirit and Grace.' },
  { name: "Wyld Oscelda's Witch", distribution: { courage: 0.18, spirit: 0.64, grace: 0.18 }, description: 'Wyld Oscelda variant. Primarily Spirit with minor Courage and Grace.' },
  { name: "Wyld Sirin's Trickster", distribution: { courage: 0.18, spirit: 0.18, grace: 0.64 }, description: 'Wyld Sirin variant. Primarily Grace with minor Courage and Spirit.' },
];

export function calculateVirtues(prism, envoyRank, pactArtBonuses = { courage: 0, spirit: 0, grace: 0 }, fableBonuses = { courage: 0, spirit: 0, grace: 0 }) {
  const basePoints = envoyRank * 2;
  const courage = Math.floor(basePoints * prism.distribution.courage) + pactArtBonuses.courage + (fableBonuses.courage || 0);
  const spirit = Math.floor(basePoints * prism.distribution.spirit) + pactArtBonuses.spirit + (fableBonuses.spirit || 0);
  const grace = Math.floor(basePoints * prism.distribution.grace) + pactArtBonuses.grace + (fableBonuses.grace || 0);
  return { courage, spirit, grace };
}

export function calculateLifeFromVirtues(virtues) {
  return virtues.courage * 10 + virtues.spirit * 1 + virtues.grace * 4;
}

export function calculateCooldownReduction(spirit) {
  if (spirit <= 2) return 0;
  return (spirit - 2) * 1.5;
}
