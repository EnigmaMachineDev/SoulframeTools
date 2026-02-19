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
// Joinery: flat +damage added on top of attunement bonus.
// In-game display: Attack (+bonus) total, where total = rank0 + bonus,
//   and bonus = rankScaling + attunement + joineryDamage.
//
// Life per virtue: Courage=12, Spirit=3, Grace=4
// Base Envoy Life: 100

const BASE_ENVOY_LIFE = 100;

export function calculateWeaponAttunement(weapon, virtues, rank = 30, joineryDamage = 0, blessedPip = null) {
  const req = weapon.virtueReq || {};
  const meetsReq = Object.entries(req).every(([virtue, val]) => (virtues[virtue] || 0) >= val);

  const r0 = weapon.rank0Damage || weapon.baseDamage;
  const r30 = weapon.baseDamage;
  const attackAtRank = r0 + Math.floor(rank * (r30 - r0) / 30);

  if (!meetsReq) return { bonus: 0, attunement: 0, meetsRequirement: false, totalAttack: attackAtRank + joineryDamage, attackAtRank, rankScaling: attackAtRank - r0, joineryDamage };

  // Apply blessed joinery pip (+1 to chosen virtue's attunement)
  const att = { ...weapon.attunement };
  if (blessedPip && (blessedPip === 'courage' || blessedPip === 'spirit' || blessedPip === 'grace')) {
    att[blessedPip] = (att[blessedPip] || 0) + 1;
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

// DPS = totalAttack × attackSpeed.
export function calculateDPS(weapon, virtues, rank = 30, joineryDamage = 0, blessedPip = null) {
  const { totalAttack } = calculateWeaponAttunement(weapon, virtues, rank, joineryDamage, blessedPip);
  const dps = totalAttack * (weapon.attackSpeed || 1);
  return {
    dps: Math.round(dps * 100) / 100,
    totalAttack,
  };
}

export function calculateChargedAttack(weapon, virtues, rank = 30, joineryDamage = 0, blessedPip = null) {
  const { totalAttack } = calculateWeaponAttunement(weapon, virtues, rank, joineryDamage, blessedPip);
  return Math.round(totalAttack * 2);
}

export function calculateTotalLife(pact, virtues) {
  const virtueLife = (virtues.courage || 0) * 12 + (virtues.spirit || 0) * 3 + (virtues.grace || 0) * 4;
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

// Parse a totem's attack bonus into a structured effect object
// Returns { type, value, condition } where type is one of:
//   'flatDmg'       - always-on flat damage (e.g. "+35 Damage to Smited enemies")
//   'pctDmg'        - always-on % damage (e.g. "35% Damage to a nearby enemy")
//   'atkSpeed'      - attack speed % bonus (e.g. "+10% Attack Speed")
//   'chargeRate'    - charge rate % bonus (e.g. "+15% Charge Rate")
//   'condFlatDmg'   - conditional flat damage (e.g. "+14 Damage on Dodge Attacks")
//   'condPctDmg'    - conditional % damage
//   'smiteChance'   - additional smite chance (e.g. "Additional 5% chance of Smite")
//   'other'         - non-damage effects (armour reduction, slow, etc.)
// condition: null for always-on, or a string like "Dodge Attack", "Sprint Attack", etc.
export function parseTotemAttackEffect(totem) {
  if (!totem) return null;
  const bonus = totem.bonuses.attack;
  const statArr = totem.stats.attack;
  if (!bonus || !statArr) return null;

  const val = Array.isArray(statArr[0]) ? statArr[0][3] : statArr[3];

  // % Damage to a nearby enemy (Rat - always on in combat)
  if (/\$1%?\s*[Dd]amage\s+to\s+a\s+nearby/i.test(bonus))
    return { type: 'pctDmg', value: val, condition: null, desc: bonus.replace('$1', val) };

  // +X Damage to Smited enemies (Rat - conditional on smite status)
  if (/[Dd]amage\s+to\s+[Ss]mited/i.test(bonus))
    return { type: 'flatDmg', value: val, condition: 'vs Smited', desc: bonus.replace('$1', val) };

  // +X% Attack Speed (Squirrel)
  if (/[Aa]ttack\s+[Ss]peed/i.test(bonus))
    return { type: 'atkSpeed', value: val, condition: null, desc: bonus.replace('$1', val) };

  // +X% Charge Rate (Squirrel Bow)
  if (/[Cc]harge\s+[Rr]ate/i.test(bonus))
    return { type: 'chargeRate', value: val, condition: null, desc: bonus.replace('$1', val) };

  // Dodge Attack damage (Squirrel)
  if (/[Dd]odge\s+[Aa]ttack/i.test(bonus))
    return { type: 'condFlatDmg', value: val, condition: 'Dodge Attack', desc: bonus.replace('$1', val) };

  // Sprint Attack damage (Deer)
  if (/[Ss]print\s+[Aa]ttack/i.test(bonus))
    return { type: 'condFlatDmg', value: val, condition: 'Sprint Attack', desc: bonus.replace('$1', val) };

  // Throw Damage (Duck)
  if (/[Tt]hrow\s+[Dd]amage/i.test(bonus))
    return { type: 'condFlatDmg', value: val, condition: 'Throw', desc: bonus.replace('$1', val) };

  // Fully Charged Aerial Shots (Duck Bow)
  if (/[Cc]harged\s+[Aa]erial/i.test(bonus))
    return { type: 'condFlatDmg', value: val, condition: 'Charged Aerial', desc: bonus.replace('$1', val) };

  // Sprint Attack Casts (Deer Magick)
  if (/[Ss]print\s+[Aa]ttack\s+[Cc]ast/i.test(bonus))
    return { type: 'condFlatDmg', value: val, condition: 'Sprint Cast', desc: bonus.replace('$1', val) };

  // Kick Staggers increase charge rate (Rabbit)
  if (/[Kk]ick.*[Cc]harge\s+[Rr]ate/i.test(bonus))
    return { type: 'chargeRate', value: val, condition: 'After Kick', desc: bonus.replace('$1', val) };

  // Increase life returned on regain (Rabbit)
  if (/[Ll]ife\s+returned.*[Rr]egain/i.test(bonus))
    return { type: 'other', value: val, condition: 'Regain', desc: bonus.replace('$1', val) };

  // Increase Primary Cast damage (Duck Magick)
  if (/[Pp]rimary\s+[Cc]ast\s+[Dd]amage/i.test(bonus))
    return { type: 'flatDmg', value: val, condition: null, desc: bonus.replace('$1', val) };

  // Armour reduction, slow, etc. - non-damage
  if (/[Aa]rmour|[Ss]low|[Ss]tagger/i.test(bonus))
    return { type: 'other', value: val, condition: null, desc: bonus.replace('$1', val) };

  return { type: 'other', value: val, condition: null, desc: bonus.replace('$1', val) };
}

// Parse totem defense bonus into structured effect
export function parseTotemDefenseEffect(totem) {
  if (!totem) return null;
  const bonus = totem.bonuses.defense;
  const statArr = totem.stats.defense;
  if (!bonus || !statArr) return null;

  const val = Array.isArray(statArr[0]) ? statArr[0][3] : statArr[3];
  let desc = bonus.replace('$1', val);
  if (Array.isArray(statArr[0]) && statArr[1]) desc = desc.replace('$2', statArr[1][3]);

  if (/[Pp]hysical\s+[Aa]rmour/i.test(bonus))
    return { type: 'physArmour', value: val, desc };
  if (/[Mm]agick\s+[Aa]rmour/i.test(bonus))
    return { type: 'magArmour', value: val, desc };
  if (/[Ss]tagger\s+reflected/i.test(bonus))
    return { type: 'staggerReflect', value: val, desc };
  if (/[Dd]efence\s+against\s+[Ss]tagger/i.test(bonus))
    return { type: 'staggerDef', value: val, desc };
  if (/[Pp]arry\s+[Ww]indow/i.test(bonus))
    return { type: 'parryWindow', value: val, desc };
  if (/[Kk]ick\s+[Ss]tagger/i.test(bonus))
    return { type: 'kickStagger', value: val, desc };
  if (/[Pp]erfect\s+[Dd]odge/i.test(bonus) || /[Pp]erfect\s+dodge/i.test(bonus))
    return { type: 'dodgeWindow', value: val, desc };
  if (/[Pp]arr(y|ies).*[Aa]rmour/i.test(bonus))
    return { type: 'parryArmour', value: val, desc };
  if (/[Pp]arr(y|ies).*[Ss]tagger/i.test(bonus))
    return { type: 'parryStagger', value: val, desc };
  if (/[Ss]tagger\s+on/i.test(bonus))
    return { type: 'condStagger', value: val, desc };
  if (/[Ss]tability/i.test(bonus))
    return { type: 'stability', value: val, desc };
  if (/[Dd]eflection/i.test(bonus))
    return { type: 'deflection', value: val, desc };
  if (/[Pp]arrying.*[Pp]rojectile/i.test(bonus))
    return { type: 'projectileParry', value: val, desc };
  if (/[Rr]eflecting.*[Pp]rojectile/i.test(bonus))
    return { type: 'projectileReflect', value: val, desc };

  return { type: 'other', value: val, desc };
}

// Parse totem utility bonus into structured effect
export function parseTotemUtilityEffect(totem) {
  if (!totem) return null;
  const bonus = totem.bonuses.utility;
  const statArr = totem.stats.utility;
  if (!bonus || !statArr) return null;

  const val = Array.isArray(statArr[0]) ? statArr[0][3] : statArr[3];
  let desc = bonus.replace('$1', val);
  if (Array.isArray(statArr[0]) && statArr[1]) desc = desc.replace('$2', statArr[1][3]);

  if (/[Ss]mite\s+[Cc]hance/i.test(bonus) || /[Cc]hance\s+of\s+[Ss]mite/i.test(bonus))
    return { type: 'smiteChance', value: val, desc };
  if (/[Ss]mite\s+duration/i.test(bonus))
    return { type: 'smiteDuration', value: val, desc };
  if (/[Hh]eal/i.test(bonus))
    return { type: 'heal', value: val, desc };
  if (/[Cc]ooldown/i.test(bonus))
    return { type: 'cooldown', value: val, desc };
  if (/[Ss]tagger/i.test(bonus))
    return { type: 'stagger', value: val, desc };
  if (/[Aa]rmour/i.test(bonus))
    return { type: 'armourReduce', value: val, desc };

  return { type: 'other', value: val, desc };
}

// Calculate weapon stats with totem bonuses applied
// Returns { base: {totalAttack, dps, charged, smiteChance, atkSpeed, stagger},
//           modified: {totalAttack, dps, charged, smiteChance, atkSpeed, stagger},
//           conditionals: [{condition, totalAttack, dps, charged}] }
// equippedTotems is an array of { totem, slot } where slot is 'Attack', 'Defense', or 'Utility'
export function calculateWeaponWithTotems(weapon, virtues, equippedTotems, rank = 30, joineryDamage = 0, blessedPip = null) {
  const baseCalc = calculateWeaponAttunement(weapon, virtues, rank, joineryDamage, blessedPip);
  const baseTotalAttack = baseCalc.totalAttack;
  const baseSmite = weapon.smiteChance;
  const baseAtkSpeed = weapon.attackSpeed;
  const baseStagger = weapon.staggerDamage;

  // Collect totem effects — only parse the bonus matching the equipped slot
  let flatDmgAlways = 0;
  let pctDmgAlways = 0;
  let atkSpeedPct = 0;
  let extraSmiteChance = 0;
  let extraPhysArmour = 0;
  let extraMagArmour = 0;
  const conditionals = [];
  const defenseEffects = [];
  const utilityEffects = [];

  for (const entry of equippedTotems) {
    if (!entry) continue;
    const { totem, slot } = entry;
    if (!totem) continue;

    if (slot === 'Attack') {
      const atkEffect = parseTotemAttackEffect(totem);
      if (atkEffect) {
        switch (atkEffect.type) {
          case 'flatDmg':
            if (atkEffect.condition) {
              conditionals.push({ condition: atkEffect.condition, flatDmg: atkEffect.value, pctDmg: 0, desc: atkEffect.desc });
            } else {
              flatDmgAlways += atkEffect.value;
            }
            break;
          case 'pctDmg':
            pctDmgAlways += atkEffect.value;
            break;
          case 'atkSpeed':
            atkSpeedPct += atkEffect.value;
            break;
          case 'condFlatDmg':
            conditionals.push({ condition: atkEffect.condition, flatDmg: atkEffect.value, pctDmg: 0, desc: atkEffect.desc });
            break;
          case 'condPctDmg':
            conditionals.push({ condition: atkEffect.condition, flatDmg: 0, pctDmg: atkEffect.value, desc: atkEffect.desc });
            break;
          default:
            break;
        }
      }
    } else if (slot === 'Defense') {
      const defEffect = parseTotemDefenseEffect(totem);
      if (defEffect) {
        if (defEffect.type === 'physArmour') extraPhysArmour += defEffect.value;
        else if (defEffect.type === 'magArmour') extraMagArmour += defEffect.value;
        defenseEffects.push(defEffect);
      }
    } else if (slot === 'Utility') {
      const utilEffect = parseTotemUtilityEffect(totem);
      if (utilEffect) {
        if (utilEffect.type === 'smiteChance') extraSmiteChance += utilEffect.value;
        utilityEffects.push(utilEffect);
      }
    }
  }

  // Calculate modified base values (always-on effects)
  // Smite is NOT a damage multiplier — DPS = totalAttack × attackSpeed
  const modAtkSpeed = baseAtkSpeed * (1 + atkSpeedPct / 100);
  const modTotalAttack = Math.floor(baseTotalAttack * (1 + pctDmgAlways / 100)) + flatDmgAlways;
  const modSmite = baseSmite + extraSmiteChance;
  const modDPS = Math.round(modTotalAttack * modAtkSpeed * 100) / 100;
  const modCharged = Math.round(modTotalAttack * 2);

  // Calculate each conditional scenario (always-on + that condition)
  const condResults = [];
  for (const cond of conditionals) {
    const condAttack = Math.floor((baseTotalAttack + cond.flatDmg) * (1 + (pctDmgAlways + cond.pctDmg) / 100)) + flatDmgAlways;
    const condDPS = Math.round(condAttack * modAtkSpeed * 100) / 100;
    const condCharged = Math.round(condAttack * 2);
    condResults.push({
      condition: cond.condition,
      desc: cond.desc,
      totalAttack: condAttack,
      dps: condDPS,
      charged: condCharged,
    });
  }

  return {
    meetsRequirement: baseCalc.meetsRequirement,
    base: {
      totalAttack: baseTotalAttack,
      bonus: baseCalc.bonus,
      smiteChance: baseSmite,
      atkSpeed: baseAtkSpeed,
      stagger: baseStagger,
    },
    modified: {
      totalAttack: modTotalAttack,
      dps: modDPS,
      charged: modCharged,
      smiteChance: modSmite,
      atkSpeed: Math.round(modAtkSpeed * 1000) / 1000,
      stagger: baseStagger,
    },
    conditionals: condResults,
    defenseEffects,
    utilityEffects,
    extraPhysArmour,
    extraMagArmour,
  };
}
