// Damage & stat calculation formulas sourced from wiki.avakot.org
// Verified against in-game screenshots (Purity R21, Maestro R14, Erstroot R23).
//
// Weapon Attunement Bonus = Courage*(couragePips/2) + Spirit*(spiritPips/2) + Grace*(gracePips/2 + 5/16)
// Rounding: Math.round (confirmed: Purity 53.5 → 54 in-game)
// The wiki VirtueAttuneCap field is NOT a bonus cap — in-game bonuses exceed it.
// The actual cap is 1.5× Rank 0 base damage per wiki text, but in practice
// most builds never hit it. We enforce it as a safety ceiling only.
//
// Rank scaling: Attack_at_rank = rank0 + floor(rank * (rank30 - rank0) / 30)
// Joinery (P14+): Joineries now add Virtue Attunement pips (1–3), not flat damage.
// In-game display: Attack (+bonus) total, where total = rank0 + bonus,
//   and bonus = rankScaling + attunement.
//
// Life per virtue: Courage=10, Spirit=1, Grace=4 (confirmed via 12 in-game data points)
// Base Envoy Life: 2

const BASE_ENVOY_LIFE = 2;

export function calculateWeaponAttunement(weapon, virtues, rank = 30, joineryDamage = 0, blessedPip = null, joineryPips = 1) {
  const req = weapon.virtueReq || {};
  const meetsReq = Object.entries(req).every(([virtue, val]) => (virtues[virtue] || 0) >= val);

  // Some P15 weapons (Vrusht-IX, Ilverac, Veilk) have unpublished stats: rank0 and/or
  // baseDamage may be null. Fall back gracefully so the math never produces NaN —
  // a null baseDamage means "no rank scaling known", so treat r30 = r0 (flat).
  const r0 = weapon.rank0Damage ?? weapon.baseDamage ?? 0;
  const r30 = weapon.baseDamage ?? r0;
  const attackAtRank = r0 + Math.floor(rank * (r30 - r0) / 30);

  if (!meetsReq) return { bonus: 0, attunement: 0, meetsRequirement: false, totalAttack: attackAtRank + joineryDamage, attackAtRank, rankScaling: attackAtRank - r0, joineryDamage };

  // Apply joinery pips (P14: 1–3 pips to chosen virtue's attunement)
  const att = { ...weapon.attunement };
  if (blessedPip && (blessedPip === 'courage' || blessedPip === 'spirit' || blessedPip === 'grace')) {
    att[blessedPip] = (att[blessedPip] || 0) + joineryPips;
  }

  let attunement = 0;
  attunement += (virtues.courage || 0) * ((att.courage || 0) / 2);
  attunement += (virtues.spirit || 0) * ((att.spirit || 0) / 2);
  attunement += (virtues.grace || 0) * ((att.grace || 0) / 2 + ((att.grace || 0) > 0 ? 5 / 16 : 0));

  // Safety cap: 1.5× Rank 0 base damage (wiki theoretical ceiling)
  attunement = Math.min(attunement, r0 * 1.5);
  attunement = Math.round(attunement);

  const bonus = attackAtRank - r0 + attunement + joineryDamage;
  const totalAttack = r0 + bonus;

  return {
    bonus,
    attunement,
    meetsRequirement: true,
    totalAttack,
    attackAtRank,
    rankScaling: attackAtRank - r0,
    joineryDamage,
  };
}

// Fully-charged Heavy Attack / Charged Shot / Heavy Cast, with no enemy armour.
// Uses the per-Combat-Art formulas from wiki.avakot.org/Damage/Data. Reproduces the wiki's
// non-Grace worked examples exactly (Purity melee 274, Erstroot cast 291). Grace weapons land
// slightly low (e.g. Juniper 182 vs wiki 188) because the wiki adds a +0.6 "innate Grace pip"
// to such weapons; there is no published rule for which weapons qualify, so it is not modelled.
// The charged attunement model differs from the Light-Attack one:
//   Att = 0.5 × Pips · Virtues, capped at WB × capMult × Rarity (Rarity 1.0 Common / 1.5 else).
//   Bow:    2.5×WB + Att + Lvl              (capMult 2.5, no armour pen)
//   Magick: 4.5×WB + Att + Lvl              (capMult 4.5)
//   Melee:  2×(WB + Att) + Lvl              (capMult 1.0; = LA + (WB+Att) at full charge)
// joineryDamage is the legacy flat-damage arg (0 in P14+); joinery pips arrive via blessedPip.
export function calculateChargedAttack(weapon, virtues, rank = 30, joineryDamage = 0, blessedPip = null, joineryPips = 1) {
  const r0 = weapon.rank0Damage ?? weapon.baseDamage ?? 0;
  const r30 = weapon.baseDamage ?? r0;
  const lvl = Math.floor(rank * (r30 - r0) / 30);

  const req = weapon.virtueReq || {};
  const meetsReq = Object.entries(req).every(([virtue, val]) => (virtues[virtue] || 0) >= val);

  const pips = { ...weapon.attunement };
  if (blessedPip && (blessedPip === 'courage' || blessedPip === 'spirit' || blessedPip === 'grace')) {
    pips[blessedPip] = (pips[blessedPip] || 0) + joineryPips;
  }

  const RARITY_MULT = { Common: 1.0, Uncommon: 1.5, Rare: 1.5 };
  const rarityMult = RARITY_MULT[weapon.rarity] ?? 1.0;
  const capMult = weapon.combatArt === 'Bow' ? 2.5 : weapon.combatArt === 'Magick' ? 4.5 : 1.0;

  let att = meetsReq ? calculateChargedAttunement(pips, virtues) : 0;
  att = Math.min(att, attackAttuneCap(r0, rarityMult, capMult));

  let dmg;
  if (weapon.combatArt === 'Bow') dmg = 2.5 * r0 + att + lvl;
  else if (weapon.combatArt === 'Magick') dmg = 4.5 * r0 + att + lvl;
  else dmg = 2 * (r0 + att) + lvl;

  return Math.round(dmg + joineryDamage);
}

export function calculateTotalLife(pact, virtues) {
  const virtueLife = (virtues.courage || 0) * 10 + (virtues.spirit || 0) * 1 + (virtues.grace || 0) * 4;
  const pactLife = pact ? (pact.bonusLife || 0) : 0;
  return BASE_ENVOY_LIFE + virtueLife + pactLife;
}

export function calculateTotalDefense(armourPieces, virtues) {
  let totalPhys = 0, totalMag = 0, totalStab = 0;
  let bonusPhys = 0, bonusMag = 0, bonusStab = 0;

  for (const piece of armourPieces) {
    if (!piece) continue;
    const req = piece.virtueReq || {};
    const meetsReq = Object.entries(req).every(([virtue, val]) => (virtues[virtue] || 0) >= val);

    let pBonus = 0, mBonus = 0, sBonus = 0;
    if (meetsReq && piece.attunement) {
      const calcBonus = (attunePips) => {
        let b = 0;
        b += (attunePips.courage || 0) * (virtues.courage || 0) * (1 / 9);
        b += (attunePips.spirit || 0) * (virtues.spirit || 0) * (1 / 9);
        b += (attunePips.grace || 0) * (virtues.grace || 0) * (1 / 9);
        return Math.round(b);
      };
      pBonus = calcBonus(piece.attunement.physical);
      mBonus = calcBonus(piece.attunement.magick);
      sBonus = calcBonus(piece.attunement.stability);
    }

    totalPhys += piece.physDef + pBonus;
    totalMag += piece.magDef + mBonus;
    totalStab += piece.stability + sBonus;
    bonusPhys += pBonus;
    bonusMag += mBonus;
    bonusStab += sBonus;
  }

  return { totalPhys, totalMag, totalStab, bonusPhys, bonusMag, bonusStab };
}


export function calculateCooldownReduction(spirit) {
  if (spirit <= 2) return 0;
  return Math.round((spirit - 2) * 1.5 * 100) / 100;
}

// === Combat multipliers (wiki.avakot.org/Gameplay, P15) ===
// All Grace-scaling multipliers require the weapon's Virtue Requirement to be met to apply.

// Lethality Multiplier — applies to Front/Rear Finishers and stealth (unaware) hits.
// A Stealth Finisher is both, so callers should apply this twice in that case.
export function calculateLethalityMultiplier(grace = 0) {
  return 1 + 0.02 * grace;
}

// Headshot Multiplier — projectile attacks only (ranged / thrown / Magick / Flyblade).
export function calculateHeadshotMultiplier(grace = 0) {
  return 1.2 + 0.03 * grace;
}

// Enemy Armour is a flat subtraction from each hit, never below 1 damage dealt.
export function applyEnemyArmour(damage, enemyArmour = 0) {
  return Math.max(1, Math.round(damage) - enemyArmour);
}

// Foe XP scaling: base XP × this multiplier, then floored to a whole number.
export function calculateExperienceMultiplier(foeLevel = 0) {
  return 1 + 0.85 * Math.sqrt(foeLevel);
}

// Cumulative XP to reach `rank` from unranked. Pact = 1000 × rank²; Weapon = half.
export function xpToRank(rank, type = 'weapon') {
  const pact = 1000 * rank * rank;
  return type === 'pact' ? pact : pact / 2;
}

// === Heavy / Charged attacks & Smite (wiki.avakot.org/Damage/Data, /Stats) ===
// Heavy-attack attunement uses a different model from Light attacks: Att = 0.5 × Pips · Virtues
// (dot product), capped at WB × attuneCapMult × Rarity. Rarity (the weapon's star count) is
// 1.0 for Common and 1.5 for Uncommon/Rare. attuneCapMult is 1 (melee), 2.5 (bow), 4.5 (cast).
export function calculateChargedAttunement(pips, virtues) {
  const dot =
    (pips.courage || 0) * (virtues.courage || 0) +
    (pips.spirit || 0) * (virtues.spirit || 0) +
    (pips.grace || 0) * (virtues.grace || 0);
  return 0.5 * dot;
}

export function attackAttuneCap(weaponBase, rarityMult = 1, attuneCapMult = 1) {
  return weaponBase * attuneCapMult * rarityMult;
}

// Craftwork (Refinement) Damage: flat +4 per craftsmanship rank (the tier's order,
// 0=Stock … 5=Legendary), halved for Dual Blades. We can't detect Dual Blades from a
// weapon's combatArt ('Short Blade' covers both Daggers and Dual Blades), so callers pass
// isDualBlades explicitly; it defaults false (full bonus).
export function calculateCraftworkDamage(craftworkOrder = 0, isDualBlades = false) {
  const bonus = craftworkOrder * 4;
  return isDualBlades ? Math.floor(bonus / 2) : bonus;
}

// Smite Damage ("Critical Hit"): 4 × (WB + Lvl + Voided) + Rat Totem bonus.
// Ignores enemy armour; halved against bosses.
export function calculateSmiteDamage({ weaponBase = 0, levelBonus = 0, voidedBonus = 0, ratTotemBonus = 0, isBoss = false } = {}) {
  let dmg = 4 * (weaponBase + levelBonus + voidedBonus) + ratTotemBonus;
  if (isBoss) dmg *= 0.5;
  return Math.round(dmg);
}

// NOTE: Totem damage/armour folding was removed in the Preludes 15 rework. P15 totems are a
// flat, build-wide pool of conditional Rune/Pull-Smite/Smite effects (see data/totems.js),
// not flat always-on attack/defense buffs, so they are no longer applied to weapon stat math.
