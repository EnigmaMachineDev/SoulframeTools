# Preludes 17: open items

Status of the Preludes 17 "Verse of the Veilands" update (game version 17.0.1, Hotfix 1). Everything
the sources could confirm is in the data files; this is what they could not. Delete each item as it
is resolved, and delete this file when it is empty.

Sources used: the official patch notes and Hotfix 1 notes, `Module:Data/Weapons`, `Armour`, `Tempers`,
`Totems` and `Runes`, and the `Runes`, `Ode_Shrike` and `Droptable` pages, all as of 6 November 2026.

## Stats nobody has published

Read these off the in-game cards, or re-pull the wiki modules later.

| Item | Missing | Effect on the site until filled |
|---|---|---|
| Dhrullai, Nazilk-Urytes-III, Fulkrom, Creance, Loksprik, Goody's Edge | Rank 0 and Rank 30 Attack, Rank 30 Stagger, Smite % | Attack totals, Stagger and Smite show "—" |
| Goody's Edge | Attunement (blank on the wiki) | Listed with 0 pips, which is a placeholder |
| Ode Shrike | Aligned Virtue, Bonus Life, defences, any Virtue bonus | Shows "Unknown", and Total Life leaves out its bonus |
| Scarletsling, Flamepitch, Smeltsquall | Arcanic Damage % (the wiki gives only Stagger and explosion) | Effect text has no Arcanic figure |
| All 16 new Runes | `runeType` (Single Attack or Timed) | None: no page reads this field |
| 13 rebalanced Arcanics | New cooldowns and values (see below) | Descriptions carry a P17 note, and old figures remain |

## Wiki values that look wrong

All used as published: the wiki stands until someone can read the in-game cards. Correct any that differ.

- **Creance, Rarity Common:** the wiki page says 1-Star, but a Common with the highest requirement (22 C)
  and 4 pips looks wrong, and Rarity feeds the damage cap (`RARITY_MULTIPLIER`). Compare Marrow's Bane, a
  Rare at 21 C and 4 pips.
- **Fulkrom, Damage Type Sharp:** the patch notes call it a "great bludgeoning axe".
- **Loksprik Tempers:** the wiki's list is identical to Rivt-II's Ode'n list, but the patch
  notes and the wiki both give it Dendrit Origin. It should probably have Dendrit Tempers. Its wiki page
  shows the same list, because the page is drawn from the module, so that is not separate confirmation.
- **Goody's Edge Tempers:** the wiki's list has no Feykin Tempers despite its Origin, and
  includes Unencumbered, which cannot roll on a Sidearm. Its page shows the same module list.
- **Dhrullai Tempers:** the wiki page's Possible Tempers section is empty. Rivt-II and Unsula, the other Ode'n Dual Blades, share
  one, so it may match, but `weaponTempers.js` warns these are not derivable.

## Disagreements

Rule: use the wiki unless the patch notes say otherwise. An in-game reading already on record outranks both.

| Item | Sources | Site uses |
|---|---|---|
| Hurlwind | Old site value `+100% Voltaic damage`; wiki `+100% Arcanic damage` | Wiki (changed) |
| Conjuration | Old site value "full Grounded stacks"; wiki "full focus stacks" | Wiki (changed) |
| Rostrum | Patch notes fixed Unencumbered; wiki still lacks it | Patch notes |
| Tempest armour | Patch notes say Carntyne Colliery only; Droptable still lists older sources | Patch notes |
| Sprout Spring | P16 Hotfix 4 says closest ally only; wiki says all allies | Patch notes |
| Mines Of Borro, Carntyne Colliery | Patch notes name the Colliery; the official overview calls the same preview Mines of Borro | Both listed |
| Rune count | Overview says six; the notes list seven families; the wiki has 16 Runes | Wiki's 16 |
| Tempest armour on Wares of Zenith | Patch notes say Colliery only; the Wares page still lists Tempest Brigadine | Patch notes |
| Noble Nestling | In-game Rank 3 card reads 12% with no duration; wiki labels those values seconds | In-game card |

- **Rostrum:** regenerating `weaponTempers.js` from the module would remove `Unencumbered`, so re-add it
  until the wiki catches up.
- **Mines Of Borro:** if the Colliery turns out to be a rename, keep the old `loc-mines-borro` id so saved
  progress survives.

## Inferred, not published

- **Weapon XP:** the notes say only "reduced by 50%". The site's 225,000 for Rank 30 (a quarter of the
  Pact curve) is derived from that. Neither the figure nor the function is shown on any page.
- **Rune sources:** the notes name one Rune per family, so `source` is inferred for the other names.

## Rebalanced Arcanics

P17 reduced these cooldowns and weakened other values (duration, damage or radius), with no numbers:

Wevetroot, Flintlock, Picktrix Powder, Trick of the Light, Glamour, Bestone, Elderbloom, Phantom Flock,
Ignus Wroth, Torment, Behest, Stampede, Seismor.

- Bestone, Elderbloom and Phantom Flock show formulas in `pacts.js` that may now be wrong.
- The notes do not say whether the Wyld Sirin and Wyld Oscelda versions changed. They are untouched.

## Drop sources

Weapon and armour `location` strings were rebuilt from the wiki's Droptable page (revision 48049). That
page was rendered on 4 November 2026, the day before P17, so it does not show P17 changes. It has no
rows for Ceptet, Veltruska or Carntyne Colliery, and it still lists Tempest in Alca's Bounty.

- **Refresh it:** save the Droptable page again once the wiki has P17, then rerun the comparison.
- **New items:** none of them appear in that table. Their sources come from the patch notes and from the
  wiki's weapon pages.
- **Enclave Votives:** the table has no Votive rewards, so these come from item pages or older site data,
  labelled "before P17". Patch notes removed Votive star tiers, and no source says what replaced them.
  That affects Fire King, Regent, Forgetfire, Needleseye, Igne Mora, Vetch, Seathorn, Basker's Wrest, Rook,
  Bog & Myrtle, Virdigris and Witan. The Votives page has a rework banner and still describes the old tiers.
- **Removed sources:** where the table omits an old source, the site now omits it too, on the assumption
  that the table is newer (for example The Organ on Avex and Falx, and Gourdo and Kabocha on Marrow's
  Bane). `git diff src/data/weapons.js src/data/armour.js` shows each one.
- **Wares of Zenith:** weapon and armour entries now follow that page's lists, which include no P17 items.
  Matching "Knightmaiden's Shell" to Regent and "Shewolf's Pelt" to Orengall is inferred from the set names.
- **Kept without table support:** Farilwyd's rare Knell Knight, Mendicant Knight Duo and Vella drops, and
  every faction shop, starter and The Wreck of Mestra Carmo entry.
- **Not itemised:** the P17 Rare Chest, Rare Amber Deposit and Carntyne Colliery weapon drops are one
  general note in `CRAFTWORK_DROP_NOTES`, because the patch notes list weapon groups, not weapons.
- **Not used yet:** the table also covers Runes and Talismans. The 16 older Runes and all Talismans could
  show sources, but neither has them today.

## Finisher values

`combat.js` has `TBD` rows for Heavy Axes and Hammer and Shield, added for Fulkrom and Nazilk-Urytes-III.
Heavy Maces and Rapiers were already `TBD`.

## Gaps that predate P17

- **Talisman defence stats:** The Cogah Creutair, Grod and Lorcaan and Wazzard's Wish also give
  Stability, Physical or Magick defence on the wiki. `talismans.js` and the Build Planner do not model it.
- **`attuneCap`:** 44 weapons still have a value, but the wiki module now has none. No page reads it.

## Refreshing this data

wiki.avakot.org now blocks automated requests with a bot check, so save the pages from a normal browser:

- https://wiki.avakot.org/Module:Data/Weapons?action=raw
- https://wiki.avakot.org/Module:Data/Armour?action=raw
- https://wiki.avakot.org/Module:Data/Runes?action=raw
- https://wiki.avakot.org/Ode_Shrike?action=raw
- https://wiki.avakot.org/Droptable (copy the rendered page: its rows are generated)
