import React, { useState, useCallback, useMemo } from 'react';
import { Dices, ExternalLink, RotateCcw, Settings, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { WEAPONS, COMBAT_ARTS } from '../data/weapons';
import { PRISMS } from '../data/prisms';
import { PACTS } from '../data/pacts';
import { ARMOUR_HELMS, ARMOUR_CUIRASSES, ARMOUR_LEGGINGS, ARMOUR_SETS } from '../data/armour';
import { RUNES } from '../data/runes';

const VIRTUE_ABBREV = { courage: 'C', spirit: 'S', grace: 'G' };

// Build a scaling string for a weapon: e.g. "3C" or "2C 2G"
function weaponScaling(weapon) {
  const parts = Object.entries(weapon.attunement || {})
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${v}${VIRTUE_ABBREV[k] || k}`);
  return parts.length ? parts.join(' ') : null;
}

// Build a scaling string for an armour piece from its attunement pips.
// Sums pips across physical/magick/stability slots per virtue, e.g. "3G 1C"
function armourScaling(piece) {
  const att = piece.attunement || {};
  const totals = { courage: 0, spirit: 0, grace: 0 };
  for (const slot of Object.values(att)) {
    if (slot && typeof slot === 'object') {
      totals.courage += slot.courage || 0;
      totals.spirit += slot.spirit || 0;
      totals.grace += slot.grace || 0;
    }
  }
  const parts = Object.entries(totals)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${v}${VIRTUE_ABBREV[k] || k}`);
  return parts.length ? parts.join(' ') : null;
}

// Derive which virtues an item requires (by name) from its numeric virtueReq field.
// e.g. { grace: 16 } -> ['grace'], {} -> []
function getItemVirtueRequirements(item) {
  return Object.keys(item.virtueReq || {});
}

// Get which virtues a prism is considered to "belong to" for filtering purposes.
// Wyld prisms have minor allocations (0.15) to non-primary virtues — these are
// ignored for filtering. Only virtues with >= 0.5 distribution count.
// e.g. Wyld Tethren (0.7C/0.15S/0.15G) -> ['courage'] only.
function getPrismVirtues(prism) {
  return Object.entries(prism.distribution)
    .filter(([, v]) => v >= 0.5)
    .map(([k]) => k);
}

// Get the dominant virtue(s) from an item's attunement object.
// Weapons have flat { courage, spirit, grace }, armour has nested { physical, magick, stability }.
// Returns [] if no attunement pips at all (item is virtue-neutral).
function getItemAttunementVirtues(item) {
  const att = item.attunement || {};
  // Weapon attunement: flat object { courage, spirit, grace }
  if (typeof att.courage === 'number' || typeof att.spirit === 'number' || typeof att.grace === 'number') {
    const total = (att.courage || 0) + (att.spirit || 0) + (att.grace || 0);
    if (total === 0) return [];
    const max = Math.max(att.courage || 0, att.spirit || 0, att.grace || 0);
    return Object.entries(att).filter(([, v]) => v === max && v > 0).map(([k]) => k);
  }
  // Armour attunement: nested { physical: {c,s,g}, magick: {c,s,g}, stability: {c,s,g} }
  const totals = { courage: 0, spirit: 0, grace: 0 };
  for (const slot of Object.values(att)) {
    if (slot && typeof slot === 'object') {
      totals.courage += slot.courage || 0;
      totals.spirit += slot.spirit || 0;
      totals.grace += slot.grace || 0;
    }
  }
  const total = totals.courage + totals.spirit + totals.grace;
  if (total === 0) return [];
  const max = Math.max(totals.courage, totals.spirit, totals.grace);
  return Object.entries(totals).filter(([, v]) => v === max && v > 0).map(([k]) => k);
}

// An item is usable with a prism if:
// - it has a virtue requirement matching the prism's virtue(s), OR
// - it has no virtue requirement but its dominant attunement matches the prism, OR
// - it has no virtue requirement AND no attunement (virtue-neutral, always usable)
function itemUsable(item, prism) {
  if (!item || !prism) return false;
  const prismVirtues = getPrismVirtues(prism);
  const reqs = getItemVirtueRequirements(item);
  if (reqs.length > 0) {
    return reqs.some(v => prismVirtues.includes(v));
  }
  // No virtue requirement — check attunement dominant virtue
  const attVirtues = getItemAttunementVirtues(item);
  if (attVirtues.length === 0) return true; // no attunement = virtue-neutral, always usable
  return attVirtues.some(v => prismVirtues.includes(v));
}

function pickUsable(arr, prism) {
  if (!arr || arr.length === 0) return null;
  const usable = arr.filter(w => itemUsable(w, prism));
  if (usable.length === 0) return null;
  return usable[Math.floor(Math.random() * usable.length)];
}

function pickRandom(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

const COMBAT_ART_RUNES = {};
RUNES.forEach(r => {
  if (!COMBAT_ART_RUNES[r.combatArt]) COMBAT_ART_RUNES[r.combatArt] = [];
  COMBAT_ART_RUNES[r.combatArt].push(r);
});

const STORAGE_KEY = 'sf-randomizer-options';

function loadOptions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

function buildDefaultOptions() {
  const opts = {};
  opts.prisms = Object.fromEntries(PRISMS.map(p => [p.name, true]));
  opts.pacts = Object.fromEntries(PACTS.map(p => [p.name, true]));
  opts.primary = Object.fromEntries(WEAPONS.filter(w => w.slot === 'Primary').map(w => [w.name, true]));
  opts.sidearm = Object.fromEntries(WEAPONS.filter(w => w.slot === 'Sidearm').map(w => [w.name, true]));
  opts.helms = Object.fromEntries(ARMOUR_HELMS.map(h => [h.name, true]));
  opts.cuirasses = Object.fromEntries(ARMOUR_CUIRASSES.map(c => [c.name, true]));
  opts.leggings = Object.fromEntries(ARMOUR_LEGGINGS.map(l => [l.name, true]));
  opts.runes = Object.fromEntries(RUNES.map(r => [r.name, true]));
  return opts;
}

function OptionsCategory({ title, items, options, onToggle, onSelectAll, onDeselectAll }) {
  const [open, setOpen] = useState(false);
  const enabled = Object.values(options).filter(Boolean).length;
  return (
    <div className="border border-sf-border rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-2.5 bg-sf-card hover:bg-sf-hover transition-colors text-left">
        <span className="text-sm font-medium text-sf-text">{title} <span className="text-sf-muted text-xs">({enabled}/{items.length})</span></span>
        {open ? <ChevronUp size={14} className="text-sf-muted" /> : <ChevronDown size={14} className="text-sf-muted" />}
      </button>
      {open && (
        <div className="px-4 py-3 bg-sf-bg border-t border-sf-border/50">
          <div className="flex gap-2 mb-3">
            <button onClick={onSelectAll} className="text-[10px] px-2 py-1 rounded border border-sf-border text-sf-muted hover:text-sf-text hover:border-sf-accent transition-colors">Select All</button>
            <button onClick={onDeselectAll} className="text-[10px] px-2 py-1 rounded border border-sf-border text-sf-muted hover:text-sf-text hover:border-sf-accent transition-colors">Deselect All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {items.map(item => (
              <label key={item} className="flex items-center gap-2 text-xs text-sf-text cursor-pointer hover:text-sf-bright py-0.5">
                <input type="checkbox" checked={!!options[item]} onChange={() => onToggle(item)} />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoadoutRandomizer() {
  const [result, setResult] = useState(null);
  const [includeRunes, setIncludeRunes] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(() => loadOptions() || buildDefaultOptions());

  const saveOpts = (newOpts) => { setOptions(newOpts); localStorage.setItem(STORAGE_KEY, JSON.stringify(newOpts)); };

  const toggleItem = (category, name) => {
    const newOpts = { ...options, [category]: { ...options[category], [name]: !options[category][name] } };
    saveOpts(newOpts);
  };
  const selectAll = (category, items) => { const newOpts = { ...options, [category]: Object.fromEntries(items.map(i => [i, true])) }; saveOpts(newOpts); };
  const deselectAll = (category, items) => { const newOpts = { ...options, [category]: Object.fromEntries(items.map(i => [i, false])) }; saveOpts(newOpts); };
  const resetOptions = () => { const d = buildDefaultOptions(); saveOpts(d); };

  const pools = useMemo(() => ({
    prisms: PRISMS.filter(p => options.prisms?.[p.name]),
    pacts: PACTS.filter(p => options.pacts?.[p.name]),
    primary: WEAPONS.filter(w => w.slot === 'Primary' && options.primary?.[w.name]),
    sidearm: WEAPONS.filter(w => w.slot === 'Sidearm' && options.sidearm?.[w.name]),
    helms: ARMOUR_HELMS.filter(h => options.helms?.[h.name]),
    cuirasses: ARMOUR_CUIRASSES.filter(c => options.cuirasses?.[c.name]),
    leggings: ARMOUR_LEGGINGS.filter(l => options.leggings?.[l.name]),
  }), [options]);

  function pickArmour(pool, prism, emptyMsg, unusableMsg) {
    if (pool.length === 0) return { item: null, error: emptyMsg };
    if (prism) {
      const item = pickUsable(pool, prism);
      return { item, error: item ? null : unusableMsg };
    }
    return { item: pickRandom(pool), error: null };
  }

  const randomize = useCallback(() => {
    const prism = pickRandom(pools.prisms);
    const pact = pickRandom(pools.pacts);
    const { item: helm, error: helmError } = pickArmour(pools.helms, prism, 'No Helms Selected', 'No Usable Helm Selected');
    const { item: cuirass, error: cuirassError } = pickArmour(pools.cuirasses, prism, 'No Cuirasses Selected', 'No Usable Cuirass Selected');
    const { item: leggings, error: leggingsError } = pickArmour(pools.leggings, prism, 'No Leggings Selected', 'No Usable Leggings Selected');

    let primary = null;
    let primaryError = null;
    if (pools.primary.length === 0) {
      primaryError = 'No Primary Weapons Selected';
    } else if (prism) {
      primary = pickUsable(pools.primary, prism);
      if (!primary) primaryError = 'No Usable Primary Selected';
    } else {
      primary = pickRandom(pools.primary);
    }

    let sidearm = null;
    let sidearmError = null;
    if (pools.sidearm.length === 0) {
      sidearmError = 'No Sidearms Selected';
    } else if (prism) {
      sidearm = pickUsable(pools.sidearm, prism);
      if (!sidearm) sidearmError = 'No Usable Sidearm Selected';
    } else {
      sidearm = pickRandom(pools.sidearm);
    }

    let primaryRune = null;
    let sidearmRune = null;
    if (includeRunes) {
      if (primary) {
        const pRunes = (COMBAT_ART_RUNES[primary.combatArt] || []).filter(r => options.runes?.[r.name]);
        if (pRunes.length > 0) primaryRune = pickRandom(pRunes);
      }
      if (sidearm) {
        const sRunes = (COMBAT_ART_RUNES[sidearm.combatArt] || []).filter(r => options.runes?.[r.name]);
        if (sRunes.length > 0) sidearmRune = pickRandom(sRunes);
      }
    }

    setResult({
      prism, pact, helm, cuirass, leggings,
      primary, primaryError, primaryRune,
      sidearm, sidearmError, sidearmRune,
      prismError: !prism ? 'No Prisms Selected' : null,
      pactError: !pact ? 'No Pacts Selected' : null,
      helmError, cuirassError, leggingsError,
    });
  }, [includeRunes, pools, options]);

  const reroll = useCallback((key) => {
    if (!result) return;
    const newResult = { ...result };
    const prism = newResult.prism;
    if (key === 'prism') {
      newResult.prism = pickRandom(pools.prisms) || result.prism;
      newResult.prismError = !newResult.prism ? 'No Prisms Selected' : null;
    } else if (key === 'pact') {
      newResult.pact = pickRandom(pools.pacts) || result.pact;
      newResult.pactError = !newResult.pact ? 'No Pacts Selected' : null;
    } else if (key === 'primary') {
      if (pools.primary.length === 0) {
        newResult.primary = null; newResult.primaryError = 'No Primary Weapons Selected';
      } else if (prism) {
        newResult.primary = pickUsable(pools.primary, prism);
        newResult.primaryError = !newResult.primary ? 'No Usable Primary Selected' : null;
      } else {
        newResult.primary = pickRandom(pools.primary);
        newResult.primaryError = null;
      }
      if (newResult.primary && includeRunes) {
        const pRunes = (COMBAT_ART_RUNES[newResult.primary.combatArt] || []).filter(r => options.runes?.[r.name]);
        newResult.primaryRune = pRunes.length > 0 ? pickRandom(pRunes) : null;
      }
    } else if (key === 'sidearm') {
      if (pools.sidearm.length === 0) {
        newResult.sidearm = null; newResult.sidearmError = 'No Sidearms Selected';
      } else if (prism) {
        newResult.sidearm = pickUsable(pools.sidearm, prism);
        newResult.sidearmError = !newResult.sidearm ? 'No Usable Sidearm Selected' : null;
      } else {
        newResult.sidearm = pickRandom(pools.sidearm);
        newResult.sidearmError = null;
      }
      if (newResult.sidearm && includeRunes) {
        const sRunes = (COMBAT_ART_RUNES[newResult.sidearm.combatArt] || []).filter(r => options.runes?.[r.name]);
        newResult.sidearmRune = sRunes.length > 0 ? pickRandom(sRunes) : null;
      }
    } else if (key === 'helm') {
      const r = pickArmour(pools.helms, prism, 'No Helms Selected', 'No Usable Helm Selected');
      newResult.helm = r.item || result.helm; newResult.helmError = r.item ? null : r.error;
    } else if (key === 'cuirass') {
      const r = pickArmour(pools.cuirasses, prism, 'No Cuirasses Selected', 'No Usable Cuirass Selected');
      newResult.cuirass = r.item || result.cuirass; newResult.cuirassError = r.item ? null : r.error;
    } else if (key === 'leggings') {
      const r = pickArmour(pools.leggings, prism, 'No Leggings Selected', 'No Usable Leggings Selected');
      newResult.leggings = r.item || result.leggings; newResult.leggingsError = r.item ? null : r.error;
    }
    setResult(newResult);
  }, [result, pools, includeRunes, options]);

  const primaryNames = useMemo(() => WEAPONS.filter(w => w.slot === 'Primary').map(w => w.name), []);
  const sidearmNames = useMemo(() => WEAPONS.filter(w => w.slot === 'Sidearm').map(w => w.name), []);
  const helmNames = useMemo(() => ARMOUR_HELMS.map(h => h.name), []);
  const cuirassNames = useMemo(() => ARMOUR_CUIRASSES.map(c => c.name), []);
  const leggingsNames = useMemo(() => ARMOUR_LEGGINGS.map(l => l.name), []);
  const runeNames = useMemo(() => RUNES.map(r => r.name), []);
  const prismNames = useMemo(() => PRISMS.map(p => p.name), []);
  const pactNames = useMemo(() => PACTS.map(p => p.name), []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-sf-bright tracking-widest mb-2">Loadout Randomizer</h1>
        <p className="text-sf-muted text-sm font-sans">Generate a random Soulframe loadout</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm text-sf-text font-sans cursor-pointer">
          <input type="checkbox" checked={includeRunes} onChange={(e) => setIncludeRunes(e.target.checked)} />
          Include Runes
        </label>
        <button onClick={randomize} className="flex items-center gap-2 px-6 py-3 bg-sf-accent hover:bg-sf-green text-sf-bg font-bold rounded-xl transition-colors text-sm">
          <Dices size={18} />
          Randomize
        </button>
        <button onClick={() => setShowOptions(!showOptions)} className="flex items-center gap-2 px-4 py-3 bg-sf-card border border-sf-border hover:border-sf-accent rounded-xl transition-colors text-sm text-sf-text">
          <Settings size={16} />
          Options
        </button>
      </div>

      {showOptions && (
        <div className="mb-8 bg-sf-card border border-sf-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-sf-bright">Configure Options</h2>
            <button onClick={resetOptions} className="text-xs px-3 py-1.5 rounded border border-sf-border text-sf-muted hover:text-sf-text hover:border-sf-accent transition-colors">Reset Defaults</button>
          </div>
          <p className="text-xs text-sf-muted mb-4 font-sans">Uncheck items to exclude them from randomization. Options are saved automatically.</p>
          <div className="space-y-2">
            <OptionsCategory title="Virtue Prisms" items={prismNames} options={options.prisms || {}} onToggle={n => toggleItem('prisms', n)} onSelectAll={() => selectAll('prisms', prismNames)} onDeselectAll={() => deselectAll('prisms', prismNames)} />
            <OptionsCategory title="Pacts" items={pactNames} options={options.pacts || {}} onToggle={n => toggleItem('pacts', n)} onSelectAll={() => selectAll('pacts', pactNames)} onDeselectAll={() => deselectAll('pacts', pactNames)} />
            <OptionsCategory title="Primary Weapons" items={primaryNames} options={options.primary || {}} onToggle={n => toggleItem('primary', n)} onSelectAll={() => selectAll('primary', primaryNames)} onDeselectAll={() => deselectAll('primary', primaryNames)} />
            <OptionsCategory title="Sidearm Weapons" items={sidearmNames} options={options.sidearm || {}} onToggle={n => toggleItem('sidearm', n)} onSelectAll={() => selectAll('sidearm', sidearmNames)} onDeselectAll={() => deselectAll('sidearm', sidearmNames)} />
            <OptionsCategory title="Helms" items={helmNames} options={options.helms || {}} onToggle={n => toggleItem('helms', n)} onSelectAll={() => selectAll('helms', helmNames)} onDeselectAll={() => deselectAll('helms', helmNames)} />
            <OptionsCategory title="Cuirasses" items={cuirassNames} options={options.cuirasses || {}} onToggle={n => toggleItem('cuirasses', n)} onSelectAll={() => selectAll('cuirasses', cuirassNames)} onDeselectAll={() => deselectAll('cuirasses', cuirassNames)} />
            <OptionsCategory title="Leggings" items={leggingsNames} options={options.leggings || {}} onToggle={n => toggleItem('leggings', n)} onSelectAll={() => selectAll('leggings', leggingsNames)} onDeselectAll={() => deselectAll('leggings', leggingsNames)} />
            <OptionsCategory title="Runes" items={runeNames} options={options.runes || {}} onToggle={n => toggleItem('runes', n)} onSelectAll={() => selectAll('runes', runeNames)} onDeselectAll={() => deselectAll('runes', runeNames)} />
          </div>
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCard label="Virtue Prism" value={result.prism?.name} sub={result.prism?.description} error={result.prismError} onReroll={() => reroll('prism')} />
          <ResultCard label="Pact" value={result.pact?.name} sub={result.pact ? `${result.pact.type} — ${result.pact.alignedVirtue}` : null} error={result.pactError} onReroll={() => reroll('pact')} />
          <ResultCard label="Primary Weapon" value={result.primary?.name} sub={result.primary ? `${result.primary.combatArt} — ${result.primary.damageType}` : null} scaling={result.primary ? weaponScaling(result.primary) : null} extra={result.primaryRune ? `Rune: ${result.primaryRune.name}` : null} error={result.primaryError} onReroll={() => reroll('primary')} />
          <ResultCard label="Sidearm" value={result.sidearm?.name} sub={result.sidearm ? `${result.sidearm.combatArt} — ${result.sidearm.damageType}` : null} scaling={result.sidearm ? weaponScaling(result.sidearm) : null} extra={result.sidearmRune ? `Rune: ${result.sidearmRune.name}` : null} error={result.sidearmError} onReroll={() => reroll('sidearm')} />
          <ResultCard label="Helm" value={result.helm?.name} sub={result.helm?.setName} scaling={result.helm ? armourScaling(result.helm) : null} error={result.helmError} onReroll={() => reroll('helm')} />
          <ResultCard label="Cuirass" value={result.cuirass?.name} sub={result.cuirass?.setName} scaling={result.cuirass ? armourScaling(result.cuirass) : null} error={result.cuirassError} onReroll={() => reroll('cuirass')} />
          <ResultCard label="Leggings" value={result.leggings?.name} sub={result.leggings?.setName} scaling={result.leggings ? armourScaling(result.leggings) : null} error={result.leggingsError} onReroll={() => reroll('leggings')} />
        </div>
      )}

      {!result && (
        <div className="text-center py-16 text-sf-muted font-sans">
          <Dices size={48} className="mx-auto mb-4 opacity-30" />
          <p>Click Randomize to generate a loadout</p>
        </div>
      )}
    </main>
  );
}

function ResultCard({ label, value, sub, scaling, extra, error, onReroll }) {
  const wikiSlug = value ? encodeURIComponent(value).replace(/%20/g, '_') : null;
  return (
    <div className={`bg-sf-card border rounded-xl p-4 transition-colors ${error ? 'border-red-800/50' : 'border-sf-border hover:border-sf-accent/50'}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] uppercase tracking-wider text-sf-muted font-sans">{label}</div>
        <button onClick={onReroll} className="p-1 rounded hover:bg-sf-hover text-sf-muted hover:text-sf-bright transition-colors" title={`Reroll ${label}`}>
          <RotateCcw size={14} />
        </button>
      </div>
      {error ? (
        <div className="flex items-center gap-2 text-red-400">
          <AlertTriangle size={14} className="shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-sf-bright">{value}</div>
            {wikiSlug && (
              <a href={`https://wiki.avakot.org/${wikiSlug}`} target="_blank" rel="noopener noreferrer" className="text-sf-dim hover:text-sf-bright transition-colors" title="View on Wiki">
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          {sub && <div className="text-xs text-sf-muted font-sans mt-1">{sub}</div>}
          {scaling && <div className="text-xs text-sf-dim font-sans mt-0.5">{scaling}</div>}
          {extra && <div className="text-xs text-sf-green font-sans mt-1">{extra}</div>}
        </>
      )}
    </div>
  );
}
