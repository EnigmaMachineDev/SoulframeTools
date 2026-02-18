// Armour data sourced from wiki.avakot.org
// Armour slots: Helm, Cuirass, Leggings
// Each piece grants: Physical Defense, Magick Defense, Stability
// Armour Attunement: Each virtue pip adds 1/9 defense per point of corresponding virtue
// Sets are grouped by name

// Flattened piece arrays by slot for individual selection
export const ARMOUR_HELMS = [];
export const ARMOUR_CUIRASSES = [];
export const ARMOUR_LEGGINGS = [];

export const ARMOUR_SETS = [
  {
    name: 'Arbearer',
    pieces: [
      { name: "Arbearer's Mask", slot: 'Helm', physDef: 7, magDef: 0, stability: 3, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 22 } },
      { name: "Arbearer's Pauncher", slot: 'Cuirass', physDef: 7, magDef: 2, stability: 4, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 22 } },
      { name: "Arbearer's Braes", slot: 'Leggings', physDef: 5, magDef: 1, stability: 5, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 22 } },
    ],
  },
  {
    name: 'Circade',
    pieces: [
      { name: "Circade's Helm of Deceit", slot: 'Helm', physDef: 4, magDef: 0, stability: 2, attunement: { physical: { courage: 4, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 14 } },
      { name: "Circade's Gutguard", slot: 'Cuirass', physDef: 6, magDef: 0, stability: 4, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 14 } },
      { name: "Circade's Greaves", slot: 'Leggings', physDef: 5, magDef: 0, stability: 3, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 14 } },
    ],
  },
  {
    name: 'Fire King',
    pieces: [
      { name: "Great Helm of The Fire King", slot: 'Helm', physDef: 3, magDef: 2, stability: 2, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 2 } }, virtueReq: { courage: 15 } },
      { name: "Fire King's Plackart", slot: 'Cuirass', physDef: 5, magDef: 2, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 2 } }, virtueReq: { courage: 15 } },
      { name: "Fire King's Kilt", slot: 'Leggings', physDef: 3, magDef: 2, stability: 2, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 2 } }, virtueReq: { courage: 15 } },
    ],
  },
  {
    name: 'Forgetfire',
    pieces: [
      { name: "Forgetfire Visard", slot: 'Helm', physDef: 3, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 12 } },
      { name: "Forgetfire Leathers", slot: 'Cuirass', physDef: 4, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 12 } },
      { name: "Forgetfire Braes", slot: 'Leggings', physDef: 3, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 12 } },
    ],
  },
  {
    name: 'Garren',
    pieces: [
      { name: "Garren's Crown of Grace", slot: 'Helm', physDef: 2, magDef: 2, stability: 3, attunement: { physical: { courage: 0, spirit: 1, grace: 2 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 15 } },
      { name: "Regalia of Garren Rood", slot: 'Cuirass', physDef: 3, magDef: 3, stability: 3, attunement: { physical: { courage: 0, spirit: 1, grace: 2 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 15 } },
      { name: "Garren's Cloven Hosen", slot: 'Leggings', physDef: 3, magDef: 2, stability: 3, attunement: { physical: { courage: 0, spirit: 1, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 15 } },
    ],
  },
  {
    name: 'Mendicant King',
    pieces: [
      { name: "Bascinet of The Mendicant King", slot: 'Helm', physDef: 3, magDef: 1, stability: 3, attunement: { physical: { courage: 3, spirit: 1, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 1, spirit: 1, grace: 0 } }, virtueReq: { courage: 20 } },
      { name: "Mendicant King's Suit of Rancor", slot: 'Cuirass', physDef: 6, magDef: 3, stability: 4, attunement: { physical: { courage: 3, spirit: 1, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 1, spirit: 1, grace: 0 } }, virtueReq: { courage: 20 } },
      { name: "Mendicant King's Sabatons", slot: 'Leggings', physDef: 4, magDef: 2, stability: 4, attunement: { physical: { courage: 3, spirit: 1, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 1, spirit: 1, grace: 0 } }, virtueReq: { courage: 20 } },
    ],
  },
  {
    name: 'Mockery',
    pieces: [
      { name: "Mockery Ilk", slot: 'Helm', physDef: 3, magDef: 3, stability: 2, attunement: { physical: { courage: 0, spirit: 2, grace: 1 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 20 } },
      { name: "Mockery Binds", slot: 'Cuirass', physDef: 4, magDef: 4, stability: 4, attunement: { physical: { courage: 0, spirit: 2, grace: 1 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 20 } },
      { name: "Mockery Douthrot", slot: 'Leggings', physDef: 4, magDef: 4, stability: 2, attunement: { physical: { courage: 0, spirit: 2, grace: 1 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 20 } },
    ],
  },
  {
    name: 'Orengall',
    pieces: [
      { name: "Armet of Orengall", slot: 'Helm', physDef: 3, magDef: 2, stability: 3, attunement: { physical: { courage: 1, spirit: 0, grace: 3 }, magick: { courage: 1, spirit: 0, grace: 1 }, stability: { courage: 0, spirit: 0, grace: 3 } }, virtueReq: { grace: 20 } },
      { name: "Orengall's Cuirass", slot: 'Cuirass', physDef: 5, magDef: 3, stability: 4, attunement: { physical: { courage: 1, spirit: 0, grace: 3 }, magick: { courage: 1, spirit: 0, grace: 1 }, stability: { courage: 1, spirit: 0, grace: 2 } }, virtueReq: { grace: 20 } },
      { name: "Orengall's Greaves", slot: 'Leggings', physDef: 4, magDef: 3, stability: 3, attunement: { physical: { courage: 1, spirit: 0, grace: 3 }, magick: { courage: 1, spirit: 0, grace: 1 }, stability: { courage: 0, spirit: 0, grace: 3 } }, virtueReq: { grace: 20 } },
    ],
  },
  {
    name: 'Oscelda',
    pieces: [
      { name: "Oscelda's Diadem", slot: 'Helm', physDef: 1, magDef: 3, stability: 0, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Oscelda's Blues", slot: 'Cuirass', physDef: 3, magDef: 5, stability: 0, attunement: { physical: { courage: 0, spirit: 1, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Oscelda's Featherbinds", slot: 'Leggings', physDef: 2, magDef: 4, stability: 0, attunement: { physical: { courage: 0, spirit: 1, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Regent',
    pieces: [
      { name: "Regent's Veil", slot: 'Helm', physDef: 3, magDef: 1, stability: 1, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 15 } },
      { name: "Regent's Shell", slot: 'Cuirass', physDef: 6, magDef: 3, stability: 2, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 15 } },
      { name: "Regent's Drapery", slot: 'Leggings', physDef: 4, magDef: 2, stability: 2, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 15 } },
    ],
  },
  {
    name: 'Sirin',
    pieces: [
      { name: "Sirin's Shroud", slot: 'Helm', physDef: 2, magDef: 0, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
      { name: "Sirin's Plainhide", slot: 'Cuirass', physDef: 4, magDef: 0, stability: 4, attunement: { physical: { courage: 0, spirit: 0, grace: 1 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
      { name: "Sirin's Stalks", slot: 'Leggings', physDef: 3, magDef: 0, stability: 2, attunement: { physical: { courage: 0, spirit: 0, grace: 1 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Steelsinger',
    pieces: [
      { name: "Steelsinger's Circlet", slot: 'Helm', physDef: 2, magDef: 2, stability: 1, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 2, grace: 0 } }, virtueReq: { spirit: 14 } },
      { name: "Steelsinger's Stithywicks", slot: 'Cuirass', physDef: 3, magDef: 5, stability: 3, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 2, grace: 0 } }, virtueReq: { spirit: 14 } },
      { name: "Steelsinger's Shreds", slot: 'Leggings', physDef: 3, magDef: 3, stability: 2, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 2, grace: 0 } }, virtueReq: { spirit: 14 } },
    ],
  },
  {
    name: 'Tempest',
    pieces: [
      { name: "Tempest Visard", slot: 'Helm', physDef: 3, magDef: 0, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 2 } }, virtueReq: { grace: 10 } },
      { name: "Tempest Leathers", slot: 'Cuirass', physDef: 3, magDef: 0, stability: 4, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 2 } }, virtueReq: { grace: 10 } },
      { name: "Tempest Braes", slot: 'Leggings', physDef: 3, magDef: 0, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 2 } }, virtueReq: { grace: 10 } },
    ],
  },
  {
    name: 'Tethren',
    pieces: [
      { name: "Tethren's Cap", slot: 'Helm', physDef: 3, magDef: 0, stability: 2, attunement: { physical: { courage: 1, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Tethren's Tunic", slot: 'Cuirass', physDef: 5, magDef: 0, stability: 3, attunement: { physical: { courage: 1, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Tethren's Roots", slot: 'Leggings', physDef: 4, magDef: 0, stability: 2, attunement: { physical: { courage: 1, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Thawtide',
    pieces: [
      { name: "Thawtide Grimguise", slot: 'Helm', physDef: 4, magDef: 2, stability: 1, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 2, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 16 } },
      { name: "Thawtide Meltcap", slot: 'Helm', physDef: 3, magDef: 1, stability: 2, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 2 } }, virtueReq: { grace: 17 } },
      { name: "Thawtide Thermals", slot: 'Cuirass', physDef: 5, magDef: 0, stability: 4, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 2 } }, virtueReq: { grace: 17 } },
      { name: "Thawtide Shingles", slot: 'Leggings', physDef: 4, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 2 } }, virtueReq: { grace: 17 } },
    ],
  },
  {
    name: 'Underwear',
    pieces: [
      { name: "Helmless", slot: 'Helm', physDef: 0, magDef: 0, stability: 0, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Laid Bare", slot: 'Cuirass', physDef: 0, magDef: 0, stability: 0, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Forsaken Rags", slot: 'Leggings', physDef: 0, magDef: 0, stability: 0, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Wazzard',
    pieces: [
      { name: "Wazzard's Bycoket", slot: 'Helm', physDef: 2, magDef: 3, stability: 2, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 3, grace: 0 }, stability: { courage: 0, spirit: 1, grace: 0 } }, virtueReq: { spirit: 22 } },
      { name: "Wazzard's Robes", slot: 'Cuirass', physDef: 3, magDef: 5, stability: 4, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 3, grace: 0 }, stability: { courage: 0, spirit: 1, grace: 0 } }, virtueReq: { spirit: 22 } },
      { name: "Wazzard's Trunks", slot: 'Leggings', physDef: 3, magDef: 4, stability: 4, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 1, grace: 0 } }, virtueReq: { spirit: 22 } },
    ],
  },
  {
    name: 'Wyld Oscelda',
    pieces: [
      { name: "Wyld Oscelda's Exhalt", slot: 'Helm', physDef: 1, magDef: 3, stability: 0, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Wyld Oscelda Pendelveil", slot: 'Cuirass', physDef: 3, magDef: 5, stability: 0, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Wyld Oscelda Beltolls", slot: 'Leggings', physDef: 2, magDef: 4, stability: 0, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Wyld Sirin',
    pieces: [
      { name: "Wyld Sirin's Feignmask", slot: 'Helm', physDef: 2, magDef: 0, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
      { name: "Wyld Sirin Finery", slot: 'Cuirass', physDef: 4, magDef: 0, stability: 4, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
      { name: "Wyld Sirin Wevetbelt", slot: 'Leggings', physDef: 3, magDef: 0, stability: 2, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Wyld Tethren',
    pieces: [
      { name: "Wyld Tethren's Hornhelm", slot: 'Helm', physDef: 5, magDef: 0, stability: 1, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Wyld Tethren Solist Shield", slot: 'Cuirass', physDef: 5, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Wyld Tethren Flamefoot", slot: 'Leggings', physDef: 4, magDef: 0, stability: 1, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
];

// Populate individual piece arrays from sets
for (const set of ARMOUR_SETS) {
  for (const piece of set.pieces) {
    const tagged = { ...piece, setName: set.name };
    if (piece.slot === 'Helm') ARMOUR_HELMS.push(tagged);
    else if (piece.slot === 'Cuirass') ARMOUR_CUIRASSES.push(tagged);
    else if (piece.slot === 'Leggings') ARMOUR_LEGGINGS.push(tagged);
  }
}

export function calculateArmourAttunement(piece, virtues) {
  const req = piece.virtueReq || {};
  const meetsReq = Object.entries(req).every(([virtue, val]) => (virtues[virtue] || 0) >= val);
  if (!meetsReq) {
    return { physDef: piece.physDef, magDef: piece.magDef, stability: piece.stability, bonusPhys: 0, bonusMag: 0, bonusStab: 0 };
  }

  const calcBonus = (attunePips) => {
    let bonus = 0;
    bonus += (attunePips.courage || 0) * (virtues.courage || 0) * (1 / 9);
    bonus += (attunePips.spirit || 0) * (virtues.spirit || 0) * (1 / 9);
    bonus += (attunePips.grace || 0) * (virtues.grace || 0) * (1 / 9);
    return Math.round(bonus);
  };

  const bonusPhys = calcBonus(piece.attunement.physical);
  const bonusMag = calcBonus(piece.attunement.magick);
  const bonusStab = calcBonus(piece.attunement.stability);

  return {
    physDef: piece.physDef + bonusPhys,
    magDef: piece.magDef + bonusMag,
    stability: piece.stability + bonusStab,
    bonusPhys,
    bonusMag,
    bonusStab,
  };
}
