// Armour data sourced from wiki.avakot.org Module:Data/Armour (re-synced for Preludes 16; this
// also picked up P14's "reduced all armour Virtue Requirements by 3", which had been missed)
// P17 sets sit at the END of ARMOUR_SETS: the piece arrays below follow this order and Build
// Planner codes store positions in them. That is also why the Veltruska Mask has its own entry
// rather than joining Cucurbita, the set the wiki puts it in.
// Set `location` comes from the wiki Droptable (revision 48049, rendered the day before P17) where it
// has rows. That table has no Enclave Votives, so those come from the item pages, which predate P17.
// Armour slots: Helm, Cuirass, Leggings
// Each piece grants: Physical Defense, Magick Defense, Stability
// Armour Attunement: floor(sum(pips[v] * virtue[v]) / 9) — confirmed via in-game screenshots
// Sets are grouped by name

// Flattened piece arrays by slot for individual selection
export const ARMOUR_HELMS = [];
export const ARMOUR_CUIRASSES = [];
export const ARMOUR_LEGGINGS = [];

export const ARMOUR_SETS = [
  {
    name: 'Arbearer',
    location: 'Wares of Zenith; Fragments: Collector Crate, Hark The Collector, Vadagar Bear',
    pieces: [
      { name: "Arbearer's Mask", slot: 'Helm', physDef: 4, magDef: 1, stability: 2, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 19 } },
      { name: "Arbearer's Pauncher", slot: 'Cuirass', physDef: 7, magDef: 2, stability: 4, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 19 } },
      { name: "Arbearer's Braes", slot: 'Leggings', physDef: 5, magDef: 1, stability: 4, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 19 } },
    ],
  },
  {
    name: 'Circade',
    location: 'Festival of The Circade: Circade Sarcophagus',
    pieces: [
      { name: "Circade's Helm of Deceit", slot: 'Helm', physDef: 4, magDef: 0, stability: 2, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 11 } },
      { name: "Circade's Gutguard", slot: 'Cuirass', physDef: 6, magDef: 0, stability: 4, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 11 } },
      { name: "Circade's Greaves", slot: 'Leggings', physDef: 5, magDef: 0, stability: 3, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 11 } },
    ],
  },
  {
    name: 'Cucurbita',
    location: "Bita's Eve; Fragments: the matching Tattie-bogle, crafted with Wintersquash Seeds",
    pieces: [
      { name: "Crone Cucurbita Mask", slot: 'Helm', physDef: 3, magDef: 3, stability: 1, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 2, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: { spirit: 9 } },
      { name: "Lil' Zook Mask", slot: 'Helm', physDef: 4, magDef: 1, stability: 2, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 9 } },
      { name: "Poppa Pepo Mask", slot: 'Helm', physDef: 2, magDef: 2, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 1 }, magick: { courage: 0, spirit: 2, grace: 2 }, stability: { courage: 0, spirit: 2, grace: 2 } }, virtueReq: { grace: 9 } },
    ],
  },
  {
    name: 'Fire King',
    location: 'Wares of Zenith; Fragments: Kith of Kings Votives (Tier 3 before P17)',
    pieces: [
      { name: "Great Helm of The Fire King", slot: 'Helm', physDef: 3, magDef: 2, stability: 2, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 2 } }, virtueReq: { courage: 12 } },
      { name: "Fire King's Plackart", slot: 'Cuirass', physDef: 5, magDef: 2, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 2 } }, virtueReq: { courage: 12 } },
      { name: "Fire King's Kilt", slot: 'Leggings', physDef: 3, magDef: 2, stability: 2, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 2 } }, virtueReq: { courage: 12 } },
    ],
  },
  {
    name: 'Forgetfire',
    location: "Enclave Votives (Tier 1–2 before P17), Wares of Zenith; Fragments: A Hidden Harvest, Avakot's Stocks",
    pieces: [
      { name: "Forgetfire Visard", slot: 'Helm', physDef: 3, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 9 } },
      { name: "Brazen Lung", slot: 'Helm', physDef: 2, magDef: 4, stability: 0, attunement: { physical: { courage: 0, spirit: 1, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Forgetfire Leathers", slot: 'Cuirass', physDef: 4, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 9 } },
      { name: "Forgetfire Braes", slot: 'Leggings', physDef: 3, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 9 } },
    ],
  },
  {
    name: 'Garren',
    location: 'Wares of Zenith; Fragments: Collector Crate, Hark The Collector, Vadagar Stag',
    pieces: [
      { name: "Garren's Crown of Grace", slot: 'Helm', physDef: 2, magDef: 2, stability: 3, attunement: { physical: { courage: 0, spirit: 1, grace: 2 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 12 } },
      { name: "Regalia of Garren Rood", slot: 'Cuirass', physDef: 3, magDef: 3, stability: 3, attunement: { physical: { courage: 0, spirit: 1, grace: 2 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 12 } },
      { name: "Garren's Cloven Hosen", slot: 'Leggings', physDef: 3, magDef: 2, stability: 3, attunement: { physical: { courage: 0, spirit: 1, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 12 } },
    ],
  },
  {
    name: 'Mendicant King',
    location: 'Wares of Zenith; Fragments: The Mendicant King',
    pieces: [
      { name: "Bascinet of The Mendicant King", slot: 'Helm', physDef: 3, magDef: 1, stability: 3, attunement: { physical: { courage: 3, spirit: 1, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 1, spirit: 1, grace: 0 } }, virtueReq: { courage: 17 } },
      { name: "Mendicant King's Suit of Rancor", slot: 'Cuirass', physDef: 6, magDef: 3, stability: 4, attunement: { physical: { courage: 3, spirit: 1, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 1, spirit: 1, grace: 0 } }, virtueReq: { courage: 17 } },
      { name: "Mendicant King's Sabatons", slot: 'Leggings', physDef: 4, magDef: 2, stability: 4, attunement: { physical: { courage: 3, spirit: 1, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 1, spirit: 1, grace: 0 } }, virtueReq: { courage: 17 } },
    ],
  },
  {
    name: 'Mockery',
    location: 'Wares of Zenith; Fragments: Thrice-bound Impidh',
    pieces: [
      { name: "Mockery Ilk", slot: 'Helm', physDef: 3, magDef: 3, stability: 2, attunement: { physical: { courage: 0, spirit: 2, grace: 1 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 17 } },
      { name: "Mockery Binds", slot: 'Cuirass', physDef: 4, magDef: 4, stability: 4, attunement: { physical: { courage: 0, spirit: 2, grace: 1 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 17 } },
      { name: "Mockery Douthrot", slot: 'Leggings', physDef: 4, magDef: 4, stability: 2, attunement: { physical: { courage: 0, spirit: 2, grace: 1 }, magick: { courage: 0, spirit: 2, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { grace: 17 } },
    ],
  },
  {
    name: 'Orengall',
    // P16: moved from Alca's Children to the Siege of Kearnhold (replaced there by The Sleeve).
    location: 'Wares of Zenith; Fragments: Collector Crate, Fort Kearnhold Siege, Hark The Collector',
    pieces: [
      { name: "Armet of Orengall", slot: 'Helm', physDef: 3, magDef: 2, stability: 3, attunement: { physical: { courage: 1, spirit: 0, grace: 3 }, magick: { courage: 1, spirit: 0, grace: 1 }, stability: { courage: 0, spirit: 0, grace: 3 } }, virtueReq: { grace: 17 } },
      { name: "Orengall's Cuirass", slot: 'Cuirass', physDef: 5, magDef: 3, stability: 4, attunement: { physical: { courage: 1, spirit: 0, grace: 3 }, magick: { courage: 1, spirit: 0, grace: 1 }, stability: { courage: 0, spirit: 0, grace: 3 } }, virtueReq: { grace: 17 } },
      { name: "Orengall's Greaves", slot: 'Leggings', physDef: 4, magDef: 3, stability: 3, attunement: { physical: { courage: 1, spirit: 0, grace: 3 }, magick: { courage: 1, spirit: 0, grace: 1 }, stability: { courage: 0, spirit: 0, grace: 3 } }, virtueReq: { grace: 17 } },
    ],
  },
  {
    name: 'Oscelda',
    location: 'Starter armour (Oscelda pact)',
    pieces: [
      { name: "Oscelda's Diadem", slot: 'Helm', physDef: 1, magDef: 3, stability: 0, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Oscelda's Blues", slot: 'Cuirass', physDef: 3, magDef: 5, stability: 0, attunement: { physical: { courage: 0, spirit: 1, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Oscelda's Featherbinds", slot: 'Leggings', physDef: 2, magDef: 4, stability: 0, attunement: { physical: { courage: 0, spirit: 1, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Regent',
    location: 'Wares of Zenith; Fragments: Silent Rose Votives (Tier 3 before P17)',
    pieces: [
      { name: "Regent's Veil", slot: 'Helm', physDef: 3, magDef: 1, stability: 1, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 12 } },
      { name: "Regent's Shell", slot: 'Cuirass', physDef: 6, magDef: 3, stability: 2, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 12 } },
      { name: "Regent's Drapery", slot: 'Leggings', physDef: 4, magDef: 2, stability: 2, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 12 } },
    ],
  },
  {
    name: 'Sirin',
    location: 'Starter armour (Sirin pact)',
    pieces: [
      { name: "Sirin's Shroud", slot: 'Helm', physDef: 2, magDef: 0, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
      { name: "Sirin's Plainhide", slot: 'Cuirass', physDef: 4, magDef: 0, stability: 4, attunement: { physical: { courage: 0, spirit: 0, grace: 1 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
      { name: "Sirin's Stalks", slot: 'Leggings', physDef: 3, magDef: 0, stability: 2, attunement: { physical: { courage: 0, spirit: 0, grace: 1 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
    ],
  },
  {
    name: 'The Sleeve',
    location: "Wares of Zenith; Fragments: Alca's Children vendor, Ranks 3 to 5 (7,500 to 16,500 Favour)",
    pieces: [
      { name: 'Coronal of The Sleeve', slot: 'Helm', physDef: 3, magDef: 1, stability: 1, attunement: { physical: { courage: 0, spirit: 1, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 1, grace: 0 } }, virtueReq: { spirit: 15 } },
      { name: 'Gilet of The Sleeve', slot: 'Cuirass', physDef: 5, magDef: 4, stability: 2, attunement: { physical: { courage: 0, spirit: 3, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 1, grace: 0 } }, virtueReq: { spirit: 15 } },
      { name: 'Buskins of The Sleeve', slot: 'Leggings', physDef: 4, magDef: 2, stability: 2, attunement: { physical: { courage: 0, spirit: 3, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 2, grace: 0 } }, virtueReq: { spirit: 15 } },
    ],
  },
  {
    name: 'Steelsinger',
    location: 'Wares of Zenith; Fragments: Bisulcam, Collector Crate, Hark The Collector',
    pieces: [
      { name: "Steelsinger's Circlet", slot: 'Helm', physDef: 2, magDef: 2, stability: 1, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 2, grace: 0 } }, virtueReq: { spirit: 11 } },
      { name: "Steelsinger's Stithywicks", slot: 'Cuirass', physDef: 3, magDef: 5, stability: 3, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 2, grace: 0 } }, virtueReq: { spirit: 11 } },
      { name: "Steelsinger's Shreds", slot: 'Leggings', physDef: 3, magDef: 3, stability: 2, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 2, grace: 0 } }, virtueReq: { spirit: 11 } },
    ],
  },
  {
    name: 'Tempest',
    location: 'Chests in the Carntyne Colliery dungeons (the only source since P17)',
    pieces: [
      { name: "Tempest Visard", slot: 'Helm', physDef: 3, magDef: 0, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 2 } }, virtueReq: { grace: 7 } },
      { name: "Tempest Leathers", slot: 'Cuirass', physDef: 3, magDef: 0, stability: 4, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 2 } }, virtueReq: { grace: 7 } },
      { name: "Tempest Braes", slot: 'Leggings', physDef: 3, magDef: 0, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 2 } }, virtueReq: { grace: 7 } },
    ],
  },
  {
    name: 'Tethren',
    location: 'Starter armour (Tethren pact)',
    pieces: [
      { name: "Tethren's Cap", slot: 'Helm', physDef: 3, magDef: 0, stability: 2, attunement: { physical: { courage: 1, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Tethren's Tunic", slot: 'Cuirass', physDef: 5, magDef: 0, stability: 3, attunement: { physical: { courage: 1, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Tethren's Roots", slot: 'Leggings', physDef: 4, magDef: 0, stability: 1, attunement: { physical: { courage: 1, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Thawtide',
    location: 'Thawtide event; Fragments: Undercover Gruulseeker',
    pieces: [
      { name: "Thawtide Grimguise", slot: 'Helm', physDef: 4, magDef: 2, stability: 1, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 2, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 13 } },
      { name: "Thawtide Meltcap", slot: 'Helm', physDef: 3, magDef: 0, stability: 2, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 2 } }, virtueReq: { grace: 14 } },
      { name: "Thawtide Thermals", slot: 'Cuirass', physDef: 5, magDef: 0, stability: 4, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 2 } }, virtueReq: { grace: 14 } },
      { name: "Thawtide Shingles", slot: 'Leggings', physDef: 4, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 2 } }, virtueReq: { grace: 14 } },
    ],
  },
  {
    name: "Mestra's Uniform",
    location: 'The Wreck of Mestra Carmo (shipwrecked duels while wearing the Duelo Ribbon), Wares of Zenith; Fragments: Mestra Carmo',
    pieces: [
      { name: "Duelo Ribbon", slot: 'Helm', physDef: 0, magDef: 0, stability: 0, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Mestra's Helm", slot: 'Helm', physDef: 1, magDef: 2, stability: 2, attunement: { physical: { courage: 0, spirit: 0, grace: 3 }, magick: { courage: 0, spirit: 0, grace: 2 }, stability: { courage: 0, spirit: 0, grace: 2 } }, virtueReq: { grace: 12 } },
      { name: "Mestra's Furbelow", slot: 'Cuirass', physDef: 4, magDef: 3, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 3 }, magick: { courage: 0, spirit: 0, grace: 2 }, stability: { courage: 0, spirit: 0, grace: 3 } }, virtueReq: { grace: 12 } },
      { name: "Mestra's Breeches", slot: 'Leggings', physDef: 3, magDef: 2, stability: 2, attunement: { physical: { courage: 0, spirit: 0, grace: 3 }, magick: { courage: 0, spirit: 0, grace: 2 }, stability: { courage: 0, spirit: 0, grace: 3 } }, virtueReq: { grace: 12 } },
    ],
  },
  {
    name: 'Pensive',
    location: "Orlick's Sanctuary chapters; Fragments: A Bicameral's Biography, A Grand Fable, A Title",
    pieces: [
      { name: "Pensive's Bonnet", slot: 'Helm', physDef: 2, magDef: 2, stability: 1, attunement: { physical: { courage: 1, spirit: 2, grace: 1 }, magick: { courage: 1, spirit: 2, grace: 1 }, stability: { courage: 1, spirit: 2, grace: 1 } }, virtueReq: { spirit: 6 } },
      { name: "Pensive's Cloak", slot: 'Cuirass', physDef: 4, magDef: 4, stability: 3, attunement: { physical: { courage: 1, spirit: 2, grace: 1 }, magick: { courage: 1, spirit: 2, grace: 1 }, stability: { courage: 1, spirit: 2, grace: 1 } }, virtueReq: { spirit: 6 } },
      { name: "Pensive's Pantaloons", slot: 'Leggings', physDef: 3, magDef: 3, stability: 2, attunement: { physical: { courage: 1, spirit: 2, grace: 1 }, magick: { courage: 1, spirit: 2, grace: 1 }, stability: { courage: 1, spirit: 2, grace: 1 } }, virtueReq: { spirit: 6 } },
    ],
  },
  {
    name: 'Underwear',
    location: 'Default (no source)',
    pieces: [
      { name: "Helmless", slot: 'Helm', physDef: 0, magDef: 0, stability: 0, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Laid Bare", slot: 'Cuirass', physDef: 0, magDef: 0, stability: 0, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Forsaken Rags", slot: 'Leggings', physDef: 0, magDef: 0, stability: 0, attunement: { physical: { courage: 0, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Wazzard',
    location: 'Wares of Zenith; Fragments: Wraith of Wastes',
    pieces: [
      { name: "Wazzard's Bycoket", slot: 'Helm', physDef: 2, magDef: 3, stability: 2, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 3, grace: 0 }, stability: { courage: 0, spirit: 1, grace: 0 } }, virtueReq: { spirit: 19 } },
      { name: "Wazzard's Robes", slot: 'Cuirass', physDef: 3, magDef: 5, stability: 4, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 3, grace: 0 }, stability: { courage: 0, spirit: 1, grace: 0 } }, virtueReq: { spirit: 19 } },
      { name: "Wazzard's Trunks", slot: 'Leggings', physDef: 3, magDef: 4, stability: 4, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 2, grace: 0 }, stability: { courage: 0, spirit: 2, grace: 0 } }, virtueReq: { spirit: 19 } },
    ],
  },
  {
    name: 'Wyld Oscelda',
    location: 'Wyld Oscelda / Paragon Founders Pack',
    pieces: [
      { name: "Wyld Oscelda's Exhalt", slot: 'Helm', physDef: 1, magDef: 3, stability: 0, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Wyld Oscelda Pendelveil", slot: 'Cuirass', physDef: 3, magDef: 5, stability: 0, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Wyld Oscelda Beltolls", slot: 'Leggings', physDef: 2, magDef: 4, stability: 0, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 1, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Wyld Sirin',
    location: 'Wyld Sirin / Paragon Founders Pack',
    pieces: [
      { name: "Wyld Sirin's Feignmask", slot: 'Helm', physDef: 2, magDef: 0, stability: 3, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
      { name: "Wyld Sirin Finery", slot: 'Cuirass', physDef: 4, magDef: 0, stability: 4, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
      { name: "Wyld Sirin Wevetbelt", slot: 'Leggings', physDef: 3, magDef: 0, stability: 2, attunement: { physical: { courage: 0, spirit: 0, grace: 2 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 0, spirit: 0, grace: 1 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Wyld Tethren',
    location: 'Wyld Tethren / Paragon Founders Pack',
    pieces: [
      { name: "Wyld Tethren's Hornhelm", slot: 'Helm', physDef: 3, magDef: 0, stability: 2, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Wyld Tethren Solist Shield", slot: 'Cuirass', physDef: 5, magDef: 0, stability: 3, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
      { name: "Wyld Tethren Flamefoot", slot: 'Leggings', physDef: 4, magDef: 0, stability: 1, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 0, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: {} },
    ],
  },
  {
    name: 'Shrike',
    location: "Votives in The Veilands",
    pieces: [
      { name: "Shrike's Lockmaw", slot: 'Helm', physDef: 2, magDef: 2, stability: 2, attunement: { physical: { courage: 0, spirit: 1, grace: 2 }, magick: { courage: 0, spirit: 1, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 1 } }, virtueReq: { spirit: 8, grace: 12 } },
      { name: "Shrike's Claes", slot: 'Cuirass', physDef: 4, magDef: 3, stability: 3, attunement: { physical: { courage: 0, spirit: 1, grace: 2 }, magick: { courage: 0, spirit: 1, grace: 2 }, stability: { courage: 0, spirit: 1, grace: 1 } }, virtueReq: { spirit: 8, grace: 12 } },
      { name: "Shrike's Clavisons", slot: 'Leggings', physDef: 3, magDef: 2, stability: 3, attunement: { physical: { courage: 0, spirit: 1, grace: 2 }, magick: { courage: 0, spirit: 1, grace: 1 }, stability: { courage: 0, spirit: 1, grace: 2 } }, virtueReq: { spirit: 8, grace: 12 } },
    ],
  },
  {
    name: 'Ceptet',
    location: "Fragments from the Ceptet Agari",
    pieces: [
      { name: "Ceptet's Skullcap", slot: 'Helm', physDef: 3, magDef: 3, stability: 2, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 1, spirit: 1, grace: 0 } }, virtueReq: { courage: 18 } },
      { name: "Ceptet's Carapace", slot: 'Cuirass', physDef: 6, magDef: 3, stability: 3, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 2, grace: 0 }, stability: { courage: 1, spirit: 1, grace: 0 } }, virtueReq: { courage: 18 } },
      { name: "Ceptet's Gaiters", slot: 'Leggings', physDef: 5, magDef: 3, stability: 2, attunement: { physical: { courage: 2, spirit: 2, grace: 0 }, magick: { courage: 1, spirit: 1, grace: 0 }, stability: { courage: 1, spirit: 2, grace: 0 } }, virtueReq: { courage: 18 } },
    ],
  },
  {
    name: 'Inquisitor',
    location: "Within The Veilands",
    pieces: [
      { name: "Inquisitor's Belfry", slot: 'Helm', physDef: 3, magDef: 2, stability: 2, attunement: { physical: { courage: 1, spirit: 0, grace: 0 }, magick: { courage: 3, spirit: 0, grace: 0 }, stability: { courage: 2, spirit: 0, grace: 0 } }, virtueReq: { courage: 21 } },
      { name: "Inquisitor's Birze", slot: 'Cuirass', physDef: 5, magDef: 4, stability: 4, attunement: { physical: { courage: 3, spirit: 0, grace: 0 }, magick: { courage: 2, spirit: 0, grace: 0 }, stability: { courage: 1, spirit: 0, grace: 0 } }, virtueReq: { courage: 21 } },
      { name: "Inquisitor's Pulpit", slot: 'Leggings', physDef: 4, magDef: 2, stability: 4, attunement: { physical: { courage: 2, spirit: 0, grace: 0 }, magick: { courage: 1, spirit: 0, grace: 0 }, stability: { courage: 3, spirit: 0, grace: 0 } }, virtueReq: { courage: 21 } },
    ],
  },
  {
    name: 'Cucurbita (Veltruska)',
    location: "Bita's Eve: Fragments from the Veltruska, crafted with Wintersquash Seeds at Tuvalkane",
    pieces: [
      { name: 'Veltruska Mask', slot: 'Helm', physDef: 3, magDef: 2, stability: 3, attunement: { physical: { courage: 0, spirit: 2, grace: 0 }, magick: { courage: 0, spirit: 3, grace: 0 }, stability: { courage: 0, spirit: 1, grace: 0 } }, virtueReq: { spirit: 9 } },
    ],
  },
];

// Populate individual piece arrays from sets
for (const set of ARMOUR_SETS) {
  for (const piece of set.pieces) {
    const tagged = { ...piece, setName: set.name, location: set.location };
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
    let total = 0;
    total += (attunePips.courage || 0) * (virtues.courage || 0);
    total += (attunePips.spirit || 0) * (virtues.spirit || 0);
    total += (attunePips.grace || 0) * (virtues.grace || 0);
    return Math.floor(total / 9);
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
