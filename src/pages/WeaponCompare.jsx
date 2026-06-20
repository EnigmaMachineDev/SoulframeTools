import { useState, useMemo, useEffect } from 'react';
import { Swords, Sword, Zap, Target, Shield, Sparkles, Flame, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { WEAPONS } from '../data/weapons';
import { CRAFTWORK_TIERS, TEMPERS } from '../data/crafting';
import { calculateWeaponAttunement, calculateChargedAttack, calculateCraftworkDamage } from '../data/calculations';

// Map a weapon's Combat Art to the Temper weaponType family used for pool filtering.
// Flyblade has no weapon-specific Tempers, so it only ever matches 'Any'.
function temperFamily(combatArt) {
  if (combatArt === 'Bow') return 'Bow';
  if (combatArt === 'Magick') return 'Magick';
  if (combatArt === 'Flyblade') return 'Flyblade';
  return 'Melee';
}

function availableTempers(weapon) {
  const fam = temperFamily(weapon.combatArt);
  return TEMPERS.filter(t =>
    (t.origin === 'Universal' || t.origin === weapon.origin) &&
    (t.weaponType === 'Any' || t.weaponType === fam)
  );
}

// Everything needed to drive one side of the comparison — including its own
// independent Virtue allocation, so two different builds can be compared head-to-head.
function useWeaponState(defaultIdx, defaultVirtues) {
  const [idx, setIdx] = useState(defaultIdx);
  const [rank, setRank] = useState(30);
  const [craftwork, setCraftwork] = useState(0); // CRAFTWORK_TIERS order
  const [tempers, setTempers] = useState([]);     // selected temper names (display only)
  const [virtues, setVirtues] = useState(defaultVirtues);
  const weapon = WEAPONS[idx] || WEAPONS[0];
  const tier = CRAFTWORK_TIERS[craftwork] || CRAFTWORK_TIERS[0];

  function setVirtue(key, raw) {
    const v = Math.max(0, Math.min(60, Number(raw) || 0));
    setVirtues(prev => ({ ...prev, [key]: v }));
  }

  // Trim temper selection if a lower Craftwork tier reduces the cap, and drop any
  // tempers no longer in the (origin/type-filtered) pool when the weapon changes.
  useEffect(() => {
    const pool = new Set(availableTempers(weapon).map(t => t.name));
    setTempers(prev => prev.filter(n => pool.has(n)).slice(0, tier.maxTempers));
  }, [idx, craftwork]); // eslint-disable-line react-hooks/exhaustive-deps

  return { idx, setIdx, rank, setRank, craftwork, setCraftwork, tempers, setTempers, virtues, setVirtue, weapon, tier };
}

function deriveStats(weapon, virtues, rank, craftworkOrder) {
  const calc = calculateWeaponAttunement(weapon, virtues, rank);
  const craftworkDmg = calculateCraftworkDamage(craftworkOrder);
  const charged = calculateChargedAttack(weapon, virtues, rank);
  return {
    r0: weapon.rank0Damage ?? weapon.baseDamage ?? null,
    attackAtRank: calc.attackAtRank,
    rankScaling: calc.rankScaling,
    attunement: calc.attunement,
    meetsRequirement: calc.meetsRequirement,
    craftworkDmg,
    totalAttack: calc.totalAttack + craftworkDmg,
    charged: charged + craftworkDmg,
    smiteChance: weapon.smiteChance,
    staggerDamage: weapon.staggerDamage,
  };
}

const VIRTUE_FIELDS = [
  { key: 'courage', label: 'Courage', color: 'text-courage' },
  { key: 'spirit', label: 'Spirit', color: 'text-spirit' },
  { key: 'grace', label: 'Grace', color: 'text-grace' },
];

export default function WeaponCompare() {
  const A = useWeaponState(0, { courage: 20, spirit: 10, grace: 10 });
  const B = useWeaponState(1, { courage: 20, spirit: 10, grace: 10 });

  const statsA = useMemo(() => deriveStats(A.weapon, A.virtues, A.rank, A.craftwork), [A.weapon, A.virtues, A.rank, A.craftwork]);
  const statsB = useMemo(() => deriveStats(B.weapon, B.virtues, B.rank, B.craftwork), [B.weapon, B.virtues, B.rank, B.craftwork]);

  // Comparison rows: higher is better for all of these.
  const rows = [
    { label: 'Base Attack', a: statsA.attackAtRank, b: statsB.attackAtRank, fmt: (s) => s.r0 != null ? `${s.r0} → ${s.attackAtRank}` : '—', cmp: (s) => s.attackAtRank },
    { label: 'Attunement', a: statsA.attunement, b: statsB.attunement, fmt: (s) => s.meetsRequirement ? `+${s.attunement}` : 'Req not met', cmp: (s) => s.meetsRequirement ? s.attunement : -1 },
    { label: 'Craftwork', a: statsA.craftworkDmg, b: statsB.craftworkDmg, fmt: (s, side) => `${side.tier.name}${s.craftworkDmg ? ` (+${s.craftworkDmg})` : ''}`, cmp: (s) => s.craftworkDmg, sideAware: true },
    { label: 'Total Attack', a: statsA.totalAttack, b: statsB.totalAttack, fmt: (s) => s.totalAttack, cmp: (s) => s.totalAttack, key: true },
    { label: 'Charged Attack', a: statsA.charged, b: statsB.charged, fmt: (s) => s.charged, cmp: (s) => s.charged, key: true },
    { label: 'Smite Chance', a: statsA.smiteChance, b: statsB.smiteChance, fmt: (s) => `${s.smiteChance}%`, cmp: (s) => s.smiteChance },
    { label: 'Stagger', a: statsA.staggerDamage ?? -1, b: statsB.staggerDamage ?? -1, fmt: (s) => s.staggerDamage ?? '—', cmp: (s) => s.staggerDamage ?? -1 },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-sf-bright tracking-widest mb-2 flex items-center justify-center gap-2"><Swords size={26} /> Weapon Compare</h1>
        <p className="text-sf-muted text-sm font-sans">Put two builds head-to-head — each weapon has its own Virtue allocation, Rank, Craftwork and Tempers.</p>
      </div>

      {/* Weapon pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <WeaponColumn side={A} accent="text-sf-bright" badge="A" />
        <WeaponColumn side={B} accent="text-grace" badge="B" />
      </div>

      {/* Comparison table */}
      <div className="bg-sf-card border border-sf-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] text-sm font-sans">
          <div className="px-4 py-2.5 bg-sf-panel text-[10px] uppercase tracking-wider text-sf-muted">Stat</div>
          <div className="px-4 py-2 bg-sf-panel text-right min-w-[130px]"><div className="text-[10px] uppercase tracking-wider text-sf-bright">A · {A.weapon.name}</div><div className="text-[9px] text-sf-dim normal-case">{A.virtues.courage}C / {A.virtues.spirit}S / {A.virtues.grace}G</div></div>
          <div className="px-4 py-2 bg-sf-panel text-right min-w-[130px]"><div className="text-[10px] uppercase tracking-wider text-grace">B · {B.weapon.name}</div><div className="text-[9px] text-sf-dim normal-case">{B.virtues.courage}C / {B.virtues.spirit}S / {B.virtues.grace}G</div></div>
          {rows.map(row => {
            const va = row.cmp(statsA), vb = row.cmp(statsB);
            const aWins = va > vb, bWins = vb > va;
            const winCls = 'text-sf-bright font-semibold';
            const loseCls = 'text-sf-muted';
            const aVal = row.sideAware ? row.fmt(statsA, A) : row.fmt(statsA);
            const bVal = row.sideAware ? row.fmt(statsB, B) : row.fmt(statsB);
            return (
              <div key={row.label} className="contents">
                <div className={`px-4 py-2.5 border-t border-sf-border/40 ${row.key ? 'text-sf-text font-medium' : 'text-sf-muted'}`}>{row.label}</div>
                <div className={`px-4 py-2.5 border-t border-sf-border/40 text-right ${aWins ? winCls : bWins ? loseCls : 'text-sf-text'}`}>{aVal}{row.key && aWins && va - vb > 0 ? <span className="text-[10px] text-sf-green ml-1">+{va - vb}</span> : null}</div>
                <div className={`px-4 py-2.5 border-t border-sf-border/40 text-right ${bWins ? winCls : aWins ? loseCls : 'text-sf-text'}`}>{bVal}{row.key && bWins && vb - va > 0 ? <span className="text-[10px] text-sf-green ml-1">+{vb - va}</span> : null}</div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] text-sf-muted mt-3 font-sans flex items-start gap-1.5">
        <Info size={12} className="mt-0.5 shrink-0" />
        <span>Tempers are selectable (capped by Craftwork) but their effects are not yet folded into these numbers — they’ll be added once the wiki’s per-Temper values are confirmed. Craftwork damage uses the full +4/rank; Dual Blades take half (not auto-detected).</span>
      </p>
    </main>
  );
}

function WeaponColumn({ side, accent, badge }) {
  const [showTempers, setShowTempers] = useState(false);
  const pool = availableTempers(side.weapon);
  const max = side.tier.maxTempers;

  function toggleTemper(name) {
    side.setTempers(prev => {
      if (prev.includes(name)) return prev.filter(n => n !== name);
      if (prev.length >= max) return prev; // craftwork cap
      return [...prev, name];
    });
  }

  return (
    <div className="bg-sf-card border border-sf-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs px-2 py-0.5 rounded bg-sf-border ${accent}`}>Weapon {badge}</span>
        <span className="text-xs text-sf-muted">{side.weapon.combatArt} · {side.weapon.origin}</span>
      </div>

      <select value={side.idx} onChange={e => side.setIdx(Number(e.target.value))}
        className="w-full bg-sf-bg border border-sf-border rounded-lg px-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer mb-3">
        {WEAPONS.map((w, i) => <option key={w.name} value={i}>{w.name} ({w.combatArt})</option>)}
      </select>

      <label className="block text-[10px] text-sf-muted uppercase mb-1">Virtue Allocation</label>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {VIRTUE_FIELDS.map(f => (
          <div key={f.key}>
            <label className={`block text-[9px] uppercase mb-0.5 ${f.color}`}>{f.label}</label>
            <input type="number" min={0} max={60} value={side.virtues[f.key]} onChange={e => side.setVirtue(f.key, e.target.value)}
              className="w-full bg-sf-bg border border-sf-border rounded px-2 py-1.5 text-xs text-sf-text focus:outline-none focus:border-sf-accent" />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-sf-muted whitespace-nowrap">Rank {side.rank}</label>
        <input type="range" min={0} max={30} value={side.rank} onChange={e => side.setRank(Number(e.target.value))}
          className="flex-1 h-1.5 bg-sf-border rounded-full appearance-none cursor-pointer accent-sf-accent" />
      </div>

      <label className="block text-[10px] text-sf-muted uppercase mb-1">Craftwork ({side.tier.minTempers}–{max} Tempers)</label>
      <select value={side.craftwork} onChange={e => side.setCraftwork(Number(e.target.value))}
        className="w-full bg-sf-bg border border-sf-border rounded px-2 py-1.5 text-xs text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer">
        {CRAFTWORK_TIERS.map(t => <option key={t.id} value={t.order}>{t.name}{t.dmgBonus ? ` (+${t.dmgBonus} Atk)` : ''}</option>)}
      </select>

      <button onClick={() => setShowTempers(v => !v)} className="mt-3 w-full flex items-center justify-between text-xs text-sf-muted hover:text-sf-text transition-colors">
        <span>Tempers <span className={side.tempers.length >= max ? 'text-amber-300' : 'text-sf-bright'}>{side.tempers.length}/{max}</span></span>
        {showTempers ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {showTempers && (
        <div className="mt-2 max-h-56 overflow-y-auto space-y-1 pr-1">
          {max === 0 && <p className="text-[10px] text-sf-dim italic">Stock Craftwork allows up to 1 Temper — raise Craftwork to add more.</p>}
          {pool.map(t => {
            const on = side.tempers.includes(t.name);
            const blocked = !on && side.tempers.length >= max;
            return (
              <button key={t.name} onClick={() => toggleTemper(t.name)} disabled={blocked}
                className={`w-full text-left rounded px-2 py-1.5 border text-[11px] transition-colors ${on ? 'bg-sf-accent/20 border-sf-accent text-sf-text' : blocked ? 'bg-sf-bg border-sf-border/40 text-sf-dim cursor-not-allowed' : 'bg-sf-bg border-sf-border text-sf-muted hover:border-sf-accent/50'}`}>
                <span className="font-medium">{t.name}</span>
                <span className="text-[9px] text-sf-dim ml-1">{t.origin}{t.weaponType !== 'Any' ? ` · ${t.weaponType}` : ''}</span>
                <div className="text-[10px] text-sf-muted leading-snug">{t.description}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
