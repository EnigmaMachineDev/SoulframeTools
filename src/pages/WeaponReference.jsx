import React, { useState, useMemo } from 'react';
import { Sword, Search, ExternalLink, ChevronUp, ChevronDown, Info } from 'lucide-react';
import { WEAPONS, COMBAT_ARTS } from '../data/weapons';
import { calculateChargedAttack } from '../data/calculations';
import { DAMAGE_TYPES, UNDOCUMENTED_DAMAGE_TYPE_COUNT } from '../data/damageTypes';
import { FINISHERS, FINISHER_NOTES, COMBAT_MULTIPLIERS, GROUND_FINISHERS, HEAVY_ATTACK_FORMULAS, SMITE } from '../data/combat';
import { CRAFTWORK_TIERS, REFINEMENT_CHAIN, CHORDSTONES, REFINEMENT_NOTES, TEMPERS, TEMPER_NOTES } from '../data/crafting';

const COLUMNS = [
  { key: 'name', label: 'Name', align: 'left', sortable: true },
  { key: 'slot', label: 'Slot', align: 'left', sortable: true },
  { key: 'combatArt', label: 'Art', align: 'left', sortable: true },
  { key: 'origin', label: 'Origin', align: 'left', sortable: true },
  { key: 'rarity', label: 'Rarity', align: 'left', sortable: true },
  { key: 'damageType', label: 'Type', align: 'left', sortable: true },
  { key: 'rank0Damage', label: 'R0 Atk', align: 'right', sortable: true },
  { key: 'baseDamage', label: 'R30 Atk', align: 'right', sortable: true },
  { key: 'charged', label: 'Charged', align: 'right', sortable: true },
  { key: 'smiteChance', label: 'Smite%', align: 'right', sortable: true },
  { key: 'staggerDamage', label: 'Stagger', align: 'right', sortable: true },
  { key: 'attunement', label: 'Attunement', align: 'left', sortable: false },
  { key: 'virtueReq', label: 'Req', align: 'left', sortable: false },
  { key: 'location', label: 'Location', align: 'left', sortable: false },
  { key: 'wiki', label: '', align: 'left', sortable: false },
];

const RARITY_STYLES = {
  Common: 'bg-sf-hover text-sf-muted',
  Uncommon: 'bg-sf-accent/20 text-sf-green',
  Rare: 'bg-blue-900/20 text-blue-300',
};

export default function WeaponReference() {
  const [search, setSearch] = useState('');
  const [filterArt, setFilterArt] = useState('All');
  const [filterSlot, setFilterSlot] = useState('All');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [showDamageInfo, setShowDamageInfo] = useState(false);
  const [showCombatInfo, setShowCombatInfo] = useState(false);
  const [showCraftInfo, setShowCraftInfo] = useState(false);
  const chordstoneById = Object.fromEntries(CHORDSTONES.map(c => [c.id, c]));

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(['name', 'slot', 'combatArt', 'origin', 'rarity', 'damageType'].includes(key) ? 'asc' : 'desc');
    }
  }

  const filtered = useMemo(() => {
    // Charged = fully-charged Heavy/Shot/Cast at Rank 30, unattuned (no virtues), no enemy
    // armour — the per-Combat-Art formula from Damage/Data. Attunement adds on top in a build.
    const ZERO_V = { courage: 0, spirit: 0, grace: 0 };
    let list = WEAPONS.map(w => ({ ...w, charged: w.baseDamage != null ? calculateChargedAttack(w, ZERO_V, 30) : null }));
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(w => w.name.toLowerCase().includes(q));
    }
    if (filterArt !== 'All') list = list.filter(w => w.combatArt === filterArt);
    if (filterSlot !== 'All') list = list.filter(w => w.slot === filterSlot);

    const RARITY_ORDER = { Common: 0, Uncommon: 1, Rare: 2 };
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'slot') cmp = a.slot.localeCompare(b.slot);
      else if (sortKey === 'combatArt') cmp = a.combatArt.localeCompare(b.combatArt);
      else if (sortKey === 'origin') cmp = (a.origin || '').localeCompare(b.origin || '');
      else if (sortKey === 'rarity') cmp = (RARITY_ORDER[a.rarity] ?? -1) - (RARITY_ORDER[b.rarity] ?? -1);
      else if (sortKey === 'damageType') cmp = a.damageType.localeCompare(b.damageType);
      else cmp = (a[sortKey] ?? 0) - (b[sortKey] ?? 0);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [search, filterArt, filterSlot, sortKey, sortDir]);

  function SortIcon({ col }) {
    if (!col.sortable) return null;
    if (sortKey !== col.key) return <ChevronUp size={10} className="ml-0.5 opacity-20 inline" />;
    return sortDir === 'asc'
      ? <ChevronUp size={10} className="ml-0.5 text-sf-bright inline" />
      : <ChevronDown size={10} className="ml-0.5 text-sf-bright inline" />;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-sf-bright tracking-widest mb-2">Weapon Reference</h1>
        <p className="text-sf-muted text-sm font-sans">All weapons with full stats — click column headers to sort</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sf-muted" />
          <input
            type="text"
            placeholder="Search weapons..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-sf-card border border-sf-border rounded-lg pl-9 pr-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-accent font-sans"
          />
        </div>
        <select value={filterArt} onChange={e => setFilterArt(e.target.value)} className="bg-sf-card border border-sf-border rounded-lg px-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer">
          <option value="All">All Combat Arts</option>
          {COMBAT_ARTS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={filterSlot} onChange={e => setFilterSlot(e.target.value)} className="bg-sf-card border border-sf-border rounded-lg px-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer">
          <option value="All">All Slots</option>
          <option value="Primary">Primary</option>
          <option value="Sidearm">Sidearm</option>
        </select>
      </div>

      <div className="text-xs text-sf-muted mb-3 font-sans">{filtered.length} weapons · <span className="text-sf-dim">Charged = fully-charged, unattuned, no enemy armour (per-Art formula); attunement adds on top in a build</span></div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="border-b border-sf-border text-[10px] uppercase tracking-wider text-sf-muted">
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  className={`py-2 px-2 ${col.align === 'right' ? 'text-right' : 'text-left'} ${col.key === 'name' ? 'px-3' : ''} ${col.sortable ? 'cursor-pointer hover:text-sf-text select-none' : ''} ${sortKey === col.key ? 'text-sf-bright' : ''}`}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label}<SortIcon col={col} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(w => {
              const att = w.attunement;
              const attStr = [att.courage > 0 && `C${att.courage}`, att.spirit > 0 && `S${att.spirit}`, att.grace > 0 && `G${att.grace}`].filter(Boolean).join(' ');
              const reqStr = Object.entries(w.virtueReq).map(([v, val]) => `${v.charAt(0).toUpperCase()}${val}`).join(' ') || '-';
              const wikiSlug = encodeURIComponent(w.name).replace(/%20/g, '_');
              return (
                <tr key={w.name} className="border-b border-sf-border/30 hover:bg-sf-hover transition-colors">
                  <td className="py-2 px-3 font-medium text-sf-bright">{w.name}</td>
                  <td className="py-2 px-2"><span className={`text-[10px] px-1.5 py-0.5 rounded ${w.slot === 'Primary' ? 'bg-sf-accent/20 text-sf-green' : 'bg-purple-900/20 text-purple-300'}`}>{w.slot}</span></td>
                  <td className="py-2 px-2 text-sf-muted">{w.combatArt}</td>
                  <td className="py-2 px-2 text-sf-muted">{w.origin || '—'}</td>
                  <td className="py-2 px-2"><span className={`text-[10px] px-1.5 py-0.5 rounded ${RARITY_STYLES[w.rarity] || 'text-sf-muted'}`}>{w.rarity || '—'}</span></td>
                  <td className="py-2 px-2 text-sf-muted">{w.damageType}</td>
                  <td className="py-2 px-2 text-right text-sf-text">{w.rank0Damage ?? '—'}</td>
                  <td className="py-2 px-2 text-right text-sf-bright">{w.baseDamage ?? '—'}</td>
                  <td className="py-2 px-2 text-right text-amber-300">{w.charged ?? '—'}</td>
                  <td className="py-2 px-2 text-right text-sf-text">{w.smiteChance}%</td>
                  <td className="py-2 px-2 text-right text-sf-text">{w.staggerDamage ?? '—'}</td>
                  <td className="py-2 px-2 text-sf-muted text-xs">{attStr}</td>
                  <td className="py-2 px-2 text-sf-muted text-xs">{reqStr}</td>
                  <td className="py-2 px-2 text-sf-muted text-xs max-w-[220px]">{w.location || '—'}</td>
                  <td className="py-2 px-1">
                    <a href={`https://wiki.avakot.org/${wikiSlug}`} target="_blank" rel="noopener noreferrer" className="text-sf-dim hover:text-sf-bright transition-colors"><ExternalLink size={12} /></a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 border-t border-sf-border pt-6">
        <button
          onClick={() => setShowDamageInfo(v => !v)}
          className="flex items-center gap-2 text-sm text-sf-bright hover:text-sf-text transition-colors font-sans"
        >
          <Info size={15} />
          <span className="uppercase tracking-wider">Damage Types &amp; Status Effects</span>
          {showDamageInfo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showDamageInfo && (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {DAMAGE_TYPES.map(dt => (
                <div key={dt.name} className="bg-sf-card border border-sf-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-sf-bright">{dt.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${dt.mitigatedAs === 'Physical' ? 'bg-orange-900/20 text-orange-300' : 'bg-purple-900/20 text-purple-300'}`}>{dt.mitigatedAs}</span>
                  </div>
                  {dt.status && <p className="text-[11px] text-sf-green mb-0.5">Status: {dt.status}</p>}
                  <p className="text-[11px] text-sf-text leading-snug">{dt.statusEffect}</p>
                  {dt.armourInteraction && <p className="text-[10px] text-sf-muted mt-1 leading-snug">{dt.armourInteraction}</p>}
                  {dt.notes && <p className="text-[10px] text-sf-dim mt-1 italic leading-snug">{dt.notes}</p>}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-sf-muted mt-3 font-sans">
              {UNDOCUMENTED_DAMAGE_TYPE_COUNT} further damage types exist in-game but are not yet named or tuned (Warframe-icon placeholders), and currently appear only on certain foes/hazards. &quot;Mitigated as&quot; is how the type counts when dealt by enemies (Physical → Physical Defense, Magick → Magick Defense).
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-sf-border pt-6">
        <button
          onClick={() => setShowCombatInfo(v => !v)}
          className="flex items-center gap-2 text-sm text-sf-bright hover:text-sf-text transition-colors font-sans"
        >
          <Info size={15} />
          <span className="uppercase tracking-wider">Finishers &amp; Combat Multipliers</span>
          {showCombatInfo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showCombatInfo && (
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-sf-green mb-2">Finisher Multipliers</h3>
              <p className="text-[10px] text-sf-muted mb-3 font-sans">% of the weapon’s Light Attack damage. Most finishers also pierce 10% Enemy Armour.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-sans">
                  <thead>
                    <tr className="border-b border-sf-border text-[10px] uppercase tracking-wider text-sf-muted">
                      <th className="py-1.5 px-2 text-left">Art</th>
                      <th className="py-1.5 px-2 text-left">Weapon</th>
                      <th className="py-1.5 px-2 text-left">Front</th>
                      <th className="py-1.5 px-2 text-right">Front %</th>
                      <th className="py-1.5 px-2 text-left">Back</th>
                      <th className="py-1.5 px-2 text-right">Back %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FINISHERS.flatMap(group => group.variants.map((v, i) => (
                      <tr key={`${group.combatArt}-${v.name}`} className="border-b border-sf-border/30">
                        <td className="py-1.5 px-2 text-sf-muted">{i === 0 ? group.combatArt : ''}</td>
                        <td className="py-1.5 px-2 text-sf-text">{v.name}</td>
                        <td className="py-1.5 px-2 text-sf-muted">{v.front}</td>
                        <td className="py-1.5 px-2 text-right text-sf-bright">{v.frontTotal != null ? `${v.frontTotal}%` : '—'}</td>
                        <td className="py-1.5 px-2 text-sf-muted">{v.back}</td>
                        <td className="py-1.5 px-2 text-right text-sf-bright">{v.backTotal != null ? `${v.backTotal}%` : '—'}</td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
              <ul className="mt-2 space-y-0.5">
                {FINISHER_NOTES.map(n => (
                  <li key={n} className="text-[10px] text-sf-dim leading-snug">• {n}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-sf-green mb-2">Ground Finishers</h3>
              <p className="text-[10px] text-sf-muted mb-3 font-sans">Against a knocked-down foe. These do NOT scale with the Grace Lethality Multiplier.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-sans">
                  <thead>
                    <tr className="border-b border-sf-border text-[10px] uppercase tracking-wider text-sf-muted">
                      <th className="py-1.5 px-2 text-left">Grip</th>
                      <th className="py-1.5 px-2 text-left">Damage</th>
                      <th className="py-1.5 px-2 text-right">Armour Pen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GROUND_FINISHERS.map(g => (
                      <tr key={g.grip} className="border-b border-sf-border/30">
                        <td className="py-1.5 px-2 text-sf-text">{g.grip}</td>
                        <td className="py-1.5 px-2 text-sf-bright">{g.damage}{g.note && <span className="text-sf-dim italic"> — {g.note}</span>}</td>
                        <td className="py-1.5 px-2 text-right text-sf-muted">{g.armourPen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-sf-green mb-2">Heavy / Charged Attack Formulas</h3>
              <p className="text-[10px] text-sf-muted mb-3 font-sans">In-game UI mis-displays Heavy Attack damage. Att (attunement) = 0.5 × Pips · Virtues, capped at WB × multiplier × Rarity (Rarity = 100% Common, 150% Uncommon/Rare).</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {HEAVY_ATTACK_FORMULAS.map(h => (
                  <div key={h.mode} className="bg-sf-card border border-sf-border rounded-lg p-3">
                    <div className="text-sm font-semibold text-sf-bright mb-1">{h.mode}</div>
                    <code className="text-[10px] text-amber-300 leading-snug block mb-1.5">{h.formula}</code>
                    <p className="text-[10px] text-sf-muted">Level bonus: +{h.levelBonus} · Att cap ×{h.attuneCapMult} · Armour pen: {h.armourPen}</p>
                    <p className="text-[10px] text-sf-dim italic mt-1 leading-snug">{h.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-sf-green mb-2">Smite Damage</h3>
              <div className="bg-sf-card border border-sf-border rounded-lg p-3">
                <code className="text-[11px] text-amber-300 leading-snug block mb-1.5">{SMITE.formula}</code>
                <ul className="space-y-0.5">
                  {SMITE.notes.map(n => (
                    <li key={n} className="text-[10px] text-sf-muted leading-snug">• {n}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-sf-green mb-2">Grace-Scaling Multipliers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {COMBAT_MULTIPLIERS.map(m => (
                  <div key={m.name} className="bg-sf-card border border-sf-border rounded-lg p-3">
                    <div className="text-sm font-semibold text-sf-bright mb-0.5">{m.name}</div>
                    <code className="text-[11px] text-amber-300">{m.formula}</code>
                    <p className="text-[10px] text-sf-text mt-1.5 leading-snug">{m.appliesTo}</p>
                    <p className="text-[10px] text-sf-muted mt-1 italic leading-snug">{m.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-sf-border pt-6">
        <button
          onClick={() => setShowCraftInfo(v => !v)}
          className="flex items-center gap-2 text-sm text-sf-bright hover:text-sf-text transition-colors font-sans"
        >
          <Info size={15} />
          <span className="uppercase tracking-wider">Craftwork, Refinement &amp; Tempers</span>
          {showCraftInfo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showCraftInfo && (
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-sf-green mb-2">Craftwork Tiers</h3>
              <p className="text-[10px] text-sf-muted mb-3 font-sans">In P15 every weapon drops with a Craftwork tier, which sets its Temper count and adds a flat Damage bonus (+4 per rank; Dual Blades get half).</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-sans">
                  <thead>
                    <tr className="border-b border-sf-border text-[10px] uppercase tracking-wider text-sf-muted">
                      <th className="py-1.5 px-2 text-left">Tier</th>
                      <th className="py-1.5 px-2 text-right">Tempers</th>
                      <th className="py-1.5 px-2 text-right">Damage Bonus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CRAFTWORK_TIERS.map(t => (
                      <tr key={t.id} className="border-b border-sf-border/30">
                        <td className="py-1.5 px-2 font-medium" style={{ color: t.color }}>{t.name}</td>
                        <td className="py-1.5 px-2 text-right text-sf-text">{t.minTempers}–{t.maxTempers}</td>
                        <td className="py-1.5 px-2 text-right text-amber-300">{t.dmgBonus ? `+${t.dmgBonus}` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-sf-green mb-2">Refinement</h3>
              <p className="text-[10px] text-sf-muted mb-3 font-sans">Refine at {REFINEMENT_NOTES.station} to raise a weapon one Craftwork tier using the matching Chordstone. Refining grants at least {REFINEMENT_NOTES.grantsAtLeast} Tempers; reaching Legendary always grants {REFINEMENT_NOTES.legendaryGrants}.</p>
              <div className="flex flex-wrap gap-2">
                {REFINEMENT_CHAIN.map(step => {
                  const cs = chordstoneById[step.chordstone];
                  return (
                    <div key={step.to} className="bg-sf-card border border-sf-border rounded-lg px-3 py-2 text-[11px]">
                      <span className="text-sf-muted capitalize">{step.from}</span>
                      <span className="text-sf-dim"> → </span>
                      <span className="text-sf-bright capitalize">{step.to}</span>
                      <div className="text-[10px] text-amber-300/80 mt-0.5">{cs ? cs.name : step.chordstone}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-sf-green mb-2">Tempers ({TEMPERS.length})</h3>
              <p className="text-[10px] text-sf-muted mb-3 font-sans">{TEMPER_NOTES.doubleStack} {TEMPER_NOTES.noFlyblade}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {TEMPERS.map(t => (
                  <div key={t.name} className="bg-sf-card border border-sf-border rounded-lg p-2.5">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-sf-bright">{t.name}{t.pendingName && <span className="text-sf-dim font-normal italic"> (wiki placeholder)</span>}</span>
                      <span className="text-[9px] text-sf-muted">{t.origin}{t.weaponType !== 'Any' ? ` · ${t.weaponType}` : ''}</span>
                    </div>
                    <p className="text-[10px] text-sf-text leading-snug">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
