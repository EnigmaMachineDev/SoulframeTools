// Virtue Lith system — replaced Virtue Prisms in a major Preludes update.
// Players now directly allocate Virtue Points between Courage, Spirit, and Grace
// using Virtue Liths. Total available points = envoyRank * 2 (max 60 at Rank 30).
// Acquire Virtue Liths from defeating Agari or completing the Siege of Fort Curlail.
// Virtue effects:
//   Courage: 10 Life per point, scales large melee attunement, empowers 1st Arcanic
//   Spirit: 1 Life per point, scales Magick attunement, reduces Arcanic cooldown by 1.5% per point over 2, empowers 2nd Arcanic
//   Grace: 4 Life per point, scales dextrous weapon attunement, empowers 3rd Arcanic

export function calculateVirtues(alloc, envoyRank, pactArtBonuses = { courage: 0, spirit: 0, grace: 0 }, fableBonuses = { courage: 0, spirit: 0, grace: 0 }) {
  return {
    courage: (alloc.courage || 0) + (pactArtBonuses.courage || 0) + (fableBonuses.courage || 0),
    spirit: (alloc.spirit || 0) + (pactArtBonuses.spirit || 0) + (fableBonuses.spirit || 0),
    grace: (alloc.grace || 0) + (pactArtBonuses.grace || 0) + (fableBonuses.grace || 0),
  };
}

export function calculateLifeFromVirtues(virtues) {
  return virtues.courage * 10 + virtues.spirit * 1 + virtues.grace * 4;
}

export function calculateCooldownReduction(spirit) {
  if (spirit <= 2) return 0;
  return (spirit - 2) * 1.5;
}
