import { useState, useMemo } from 'react';
import { Shield, Sword, Heart, Zap, Target, Info, Flame, Sparkles, Wind, Copy, Check, Upload } from 'lucide-react';
import { calculateVirtues } from '../data/prisms';
import { PACTS, PACT_ART_VIRTUE_VALUES } from '../data/pacts';
import { WEAPONS } from '../data/weapons';
import { ARMOUR_HELMS, ARMOUR_CUIRASSES, ARMOUR_LEGGINGS } from '../data/armour';
import { RUNES } from '../data/runes';
import { TOTEMS, TOTEM_ANIMALS } from '../data/totems';
import { TALISMANS } from '../data/talismans';
import { JOINERIES, getJoineriesForWeapon, formatJoineryStats } from '../data/joineries';
import {
  calculateWeaponAttunement, calculateChargedAttack,
  calculateTotalLife, calculateTotalDefense,
  calculateCooldownReduction, calculateCraftworkDamage,
} from '../data/calculations';
import { CRAFTWORK_TIERS } from '../data/crafting';

function VirtueBar({ label, value, max, color, icon, bonus }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 w-24">{icon}<span className="text-sm font-medium">{label}</span></div>
      <div className="flex-1 h-3 bg-sf-border rounded-full overflow-hidden"><div className={`virtue-bar h-full rounded-full ${color}`} style={{ width: `${pct}%` }} /></div>
      <div className="flex items-center gap-1 w-16 justify-end">
        <span className="text-sm font-semibold">{value}</span>
        {bonus > 0 && <span className="text-xs text-green-400">(+{bonus})</span>}
      </div>
    </div>
  );
}

function StatRow({ label, value, bonus, icon, color = 'text-sf-text' }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2 text-sf-muted">{icon}<span className="text-sm">{label}</span></div>
      <div className="flex items-center gap-1">
        <span className={`text-sm font-semibold ${color}`}>{value}</span>
        {bonus > 0 && <span className="text-xs text-green-400">(+{bonus})</span>}
      </div>
    </div>
  );
}

function SectionCard({ title, icon, children, className = '' }) {
  return (
    <div className={`bg-sf-card border border-sf-border rounded-xl p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-4">{icon}<h3 className="text-lg font-semibold font-['Cinzel']">{title}</h3></div>
      {children}
    </div>
  );
}

function SelectField({ label, value, onChange, children }) {
  return (
    <div>
      <label className="block text-xs text-sf-muted mb-1.5 uppercase tracking-wider">{label}</label>
      <select value={value} onChange={onChange} className="w-full bg-sf-bg border border-sf-border rounded-lg px-3 py-2.5 text-sm text-sf-text focus:outline-none focus:border-sf-accent transition-colors cursor-pointer hover:border-sf-accent/50">{children}</select>
    </div>
  );
}

function DamageTypeIcon({ type }) {
  const icons = { Sharp: <Sword size={14} className="text-gray-300" />, Blunt: <Shield size={14} className="text-yellow-400" />, Arcanic: <Sparkles size={14} className="text-purple-400" />, Flame: <Flame size={14} className="text-orange-400" />, Voltaic: <Zap size={14} className="text-cyan-400" /> };
  return <span className="inline-flex items-center gap-1 text-xs">{icons[type] || null}<span>{type}</span></span>;
}

export default function BuildPlanner() {
  const [envoyRank, setEnvoyRank] = useState(30);
  const [directCourage, setDirectCourage] = useState(0);
  const [directSpirit, setDirectSpirit] = useState(0);
  const [directGrace, setDirectGrace] = useState(0);
  const [selectedPactIdx, setSelectedPactIdx] = useState(0);
  const [selectedHelmIdx, setSelectedHelmIdx] = useState(0);
  const [selectedCuirassIdx, setSelectedCuirassIdx] = useState(0);
  const [selectedLeggingsIdx, setSelectedLeggingsIdx] = useState(0);
  const [selectedPrimaryIdx, setSelectedPrimaryIdx] = useState(0);
  const [selectedSidearmIdx, setSelectedSidearmIdx] = useState(0);
  const [selectedPrimaryRuneIdx, setSelectedPrimaryRuneIdx] = useState(-1);
  const [selectedSidearmRuneIdx, setSelectedSidearmRuneIdx] = useState(-1);
  // P15: totems are a flat, build-wide pool (no per-weapon slots). Track selected totem names.
  const [selectedTotems, setSelectedTotems] = useState(() => []);
  const [selectedTalismanIdx, setSelectedTalismanIdx] = useState(-1);
  const [primaryWeaponRank, setPrimaryWeaponRank] = useState(30);
  const [sidearmWeaponRank, setSidearmWeaponRank] = useState(30);
  const [primaryCraftwork, setPrimaryCraftwork] = useState(0); // CRAFTWORK_TIERS order (0=Stock)
  const [sidearmCraftwork, setSidearmCraftwork] = useState(0);
  const [primaryJoineryIdx, setPrimaryJoineryIdx] = useState(-1);
  const [primaryJoineryTier, setPrimaryJoineryTier] = useState(0);
  const [sidearmJoineryIdx, setSidearmJoineryIdx] = useState(-1);
  const [sidearmJoineryTier, setSidearmJoineryTier] = useState(0);
  const [primaryBlessedPip, setPrimaryBlessedPip] = useState(null);
  const [sidearmBlessedPip, setSidearmBlessedPip] = useState(null);
  const [copied, setCopied] = useState(false);
  const [courageArtRank, setCourageArtRank] = useState(0);
  const [spiritArtRank, setSpiritArtRank] = useState(0);
  const [graceArtRank, setGraceArtRank] = useState(0);
  const [fable1Virtue, setFable1Virtue] = useState('grace');
  const [fable2Virtue, setFable2Virtue] = useState('grace');

  const totalVirtuePoints = envoyRank * 2;
  const allocatedVirtue = directCourage + directSpirit + directGrace;
  const pact = PACTS[selectedPactIdx];
  const helm = ARMOUR_HELMS[selectedHelmIdx] || ARMOUR_HELMS[0];
  const cuirass = ARMOUR_CUIRASSES[selectedCuirassIdx] || ARMOUR_CUIRASSES[0];
  const leggings = ARMOUR_LEGGINGS[selectedLeggingsIdx] || ARMOUR_LEGGINGS[0];
  const armourPieces = [helm, cuirass, leggings];
  const primaryWeapons = WEAPONS.filter(w => w.slot === 'Primary');
  const sidearmWeapons = WEAPONS.filter(w => w.slot === 'Sidearm');
  const primary = primaryWeapons[selectedPrimaryIdx] || primaryWeapons[0];
  const sidearm = sidearmWeapons[selectedSidearmIdx] || sidearmWeapons[0];
  const primaryRunes = RUNES.filter(r => r.combatArt === primary.combatArt);
  const sidearmRunes = RUNES.filter(r => r.combatArt === sidearm.combatArt);
  const primaryRune = selectedPrimaryRuneIdx >= 0 ? primaryRunes[selectedPrimaryRuneIdx] : null;
  const sidearmRune = selectedSidearmRuneIdx >= 0 ? sidearmRunes[selectedSidearmRuneIdx] : null;
  const primaryJoineries = useMemo(() => getJoineriesForWeapon(primary.combatArt), [primary.combatArt]);
  const sidearmJoineries = useMemo(() => getJoineriesForWeapon(sidearm.combatArt), [sidearm.combatArt]);
  const primaryJoinery = primaryJoineryIdx >= 0 ? primaryJoineries[primaryJoineryIdx] : null;
  const sidearmJoinery = sidearmJoineryIdx >= 0 ? sidearmJoineries[sidearmJoineryIdx] : null;
  const primaryJoineryDmg = 0; // P14: joineries no longer grant flat damage
  const sidearmJoineryDmg = 0;
  const primaryJoineryPips = primaryJoinery ? (primaryJoinery.tiers[primaryJoineryTier]?.pips || 0) : 0;
  const sidearmJoineryPips = sidearmJoinery ? (sidearmJoinery.tiers[sidearmJoineryTier]?.pips || 0) : 0;
  const primaryIsBlessed = primaryJoineryPips > 0; // any joinery tier now grants pips
  const sidearmIsBlessed = sidearmJoineryPips > 0;
  const primaryEffectivePip = primaryIsBlessed ? primaryBlessedPip : null;
  const sidearmEffectivePip = sidearmIsBlessed ? sidearmBlessedPip : null;

  const pactArtBonuses = useMemo(() => ({
    courage: courageArtRank > 0 ? PACT_ART_VIRTUE_VALUES[courageArtRank - 1] : 0,
    spirit: spiritArtRank > 0 ? PACT_ART_VIRTUE_VALUES[spiritArtRank - 1] : 0,
    grace: graceArtRank > 0 ? PACT_ART_VIRTUE_VALUES[graceArtRank - 1] : 0,
  }), [courageArtRank, spiritArtRank, graceArtRank]);

  const talisman = selectedTalismanIdx >= 0 ? TALISMANS[selectedTalismanIdx] : null;

  const fableBonuses = useMemo(() => {
    const b = { courage: 0, spirit: 0, grace: 0 };
    b[fable1Virtue] = (b[fable1Virtue] || 0) + 1;
    b[fable2Virtue] = (b[fable2Virtue] || 0) + 1;
    return b;
  }, [fable1Virtue, fable2Virtue]);

  const virtues = useMemo(() => {
    const base = calculateVirtues({ courage: directCourage, spirit: directSpirit, grace: directGrace }, envoyRank, pactArtBonuses, fableBonuses);
    if (pact.bonusVirtue) Object.entries(pact.bonusVirtue).forEach(([v, val]) => { base[v] = (base[v] || 0) + val; });
    if (talisman) { const s = talisman.stats; if (s.courage) base.courage = (base.courage || 0) + s.courage; if (s.spirit) base.spirit = (base.spirit || 0) + s.spirit; if (s.grace) base.grace = (base.grace || 0) + s.grace; }
    return base;
  }, [directCourage, directSpirit, directGrace, envoyRank, pactArtBonuses, fableBonuses, pact, talisman]);

  const primaryCalc = useMemo(() => calculateWeaponAttunement(primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip, primaryJoineryPips), [primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip, primaryJoineryPips]);
  const sidearmCalc = useMemo(() => calculateWeaponAttunement(sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip, sidearmJoineryPips), [sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip, sidearmJoineryPips]);
  const primaryCharged = useMemo(() => calculateChargedAttack(primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip, primaryJoineryPips), [primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip, primaryJoineryPips]);
  const sidearmCharged = useMemo(() => calculateChargedAttack(sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip, sidearmJoineryPips), [sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip, sidearmJoineryPips]);
  const primaryCraftworkDmg = calculateCraftworkDamage(primaryCraftwork);
  const sidearmCraftworkDmg = calculateCraftworkDamage(sidearmCraftwork);

  const totalLife = useMemo(() => calculateTotalLife(pact, virtues), [pact, virtues]);
  // P15 totems are conditional Rune/Smite triggers, not flat always-on attack/armour buffs,
  // so they are no longer folded into the Attack/Defense summary numbers.
  const defense = useMemo(() => calculateTotalDefense(armourPieces, virtues), [armourPieces, virtues]);
  const cooldownReduction = useMemo(() => calculateCooldownReduction(virtues.spirit), [virtues.spirit]);
  const maxVirtue = Math.max(virtues.courage, virtues.spirit, virtues.grace, 1);

  function exportBuild() {
    const build = { envoyRank, directCourage, directSpirit, directGrace, selectedPactIdx, selectedHelmIdx, selectedCuirassIdx, selectedLeggingsIdx, selectedPrimaryIdx, selectedSidearmIdx, selectedPrimaryRuneIdx, selectedSidearmRuneIdx, selectedTotems, selectedTalismanIdx, courageArtRank, spiritArtRank, graceArtRank, primaryWeaponRank, sidearmWeaponRank, primaryCraftwork, sidearmCraftwork, primaryJoineryIdx, primaryJoineryTier, primaryBlessedPip, sidearmJoineryIdx, sidearmJoineryTier, sidearmBlessedPip, fable1Virtue, fable2Virtue };
    return btoa(JSON.stringify(build));
  }

  function importBuild(code) {
    try {
      const build = JSON.parse(atob(code));
      if (build.envoyRank != null) setEnvoyRank(build.envoyRank);
      if (build.directCourage != null) setDirectCourage(build.directCourage);
      if (build.directSpirit != null) setDirectSpirit(build.directSpirit);
      if (build.directGrace != null) setDirectGrace(build.directGrace);
      if (build.selectedPactIdx != null) setSelectedPactIdx(build.selectedPactIdx);
      if (build.selectedHelmIdx != null) setSelectedHelmIdx(build.selectedHelmIdx);
      if (build.selectedCuirassIdx != null) setSelectedCuirassIdx(build.selectedCuirassIdx);
      if (build.selectedLeggingsIdx != null) setSelectedLeggingsIdx(build.selectedLeggingsIdx);
      if (build.selectedPrimaryIdx != null) setSelectedPrimaryIdx(build.selectedPrimaryIdx);
      if (build.selectedSidearmIdx != null) setSelectedSidearmIdx(build.selectedSidearmIdx);
      if (build.selectedPrimaryRuneIdx != null) setSelectedPrimaryRuneIdx(build.selectedPrimaryRuneIdx);
      if (build.selectedSidearmRuneIdx != null) setSelectedSidearmRuneIdx(build.selectedSidearmRuneIdx);
      if (Array.isArray(build.selectedTotems)) setSelectedTotems(build.selectedTotems.filter(n => TOTEMS.some(t => t.name === n)));
      if (build.selectedTalismanIdx != null) setSelectedTalismanIdx(build.selectedTalismanIdx);
      if (build.primaryCraftwork != null) setPrimaryCraftwork(build.primaryCraftwork);
      if (build.sidearmCraftwork != null) setSidearmCraftwork(build.sidearmCraftwork);
      if (build.courageArtRank != null) setCourageArtRank(build.courageArtRank);
      if (build.spiritArtRank != null) setSpiritArtRank(build.spiritArtRank);
      if (build.graceArtRank != null) setGraceArtRank(build.graceArtRank);
      if (build.fable1Virtue) setFable1Virtue(build.fable1Virtue);
      if (build.fable2Virtue) setFable2Virtue(build.fable2Virtue);
      if (build.primaryWeaponRank != null) setPrimaryWeaponRank(build.primaryWeaponRank);
      if (build.sidearmWeaponRank != null) setSidearmWeaponRank(build.sidearmWeaponRank);
      if (build.primaryJoineryIdx != null) setPrimaryJoineryIdx(build.primaryJoineryIdx);
      if (build.primaryJoineryTier != null) setPrimaryJoineryTier(build.primaryJoineryTier);
      if (build.sidearmJoineryIdx != null) setSidearmJoineryIdx(build.sidearmJoineryIdx);
      if (build.sidearmJoineryTier != null) setSidearmJoineryTier(build.sidearmJoineryTier);
      if (build.primaryBlessedPip !== undefined) setPrimaryBlessedPip(build.primaryBlessedPip);
      if (build.sidearmBlessedPip !== undefined) setSidearmBlessedPip(build.sidearmBlessedPip);
      return true;
    } catch { return false; }
  }

  function handleCopyBuild() {
    const code = exportBuild();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true); setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        fallbackCopy(code);
      });
    } else {
      fallbackCopy(code);
    }
  }
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { alert('Copy failed — please copy this code manually:\n\n' + text); }
    document.body.removeChild(ta);
  }
  function handleImportBuild() { const code = prompt('Paste your build code:'); if (code && !importBuild(code.trim())) alert('Invalid build code.'); }

  function toggleTotem(name) {
    setSelectedTotems(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  }

  function WeaponPanel({ weapon, calc, charged, label, craftworkDmg = 0, craftworkName = 'Stock' }) {
    const r0 = weapon.rank0Damage ?? weapon.baseDamage ?? 0;
    const unknownStats = weapon.baseDamage == null;
    return (
      <div className="bg-sf-bg/50 rounded-lg p-4 border border-sf-border/50">
        <div className="flex items-center justify-between mb-3"><h4 className="font-semibold text-sf-bright font-['Cinzel']">{weapon.name}</h4><span className="text-xs px-2 py-0.5 rounded bg-sf-border text-sf-muted">{label}</span></div>
        <div className="flex items-center gap-3 mb-3 text-xs text-sf-muted"><span>{weapon.combatArt}</span><span>•</span><span>{weapon.origin}</span><span>•</span><DamageTypeIcon type={weapon.damageType} /></div>
        <div className="space-y-1 mb-3">
          <StatRow label="Base Attack" value={`${r0} → ${calc.attackAtRank}`} icon={<Sword size={14} />} />
          {calc.rankScaling > 0 && <StatRow label="Rank Scaling" value={`+${calc.rankScaling}`} icon={<Zap size={14} />} color="text-blue-300" />}
          <StatRow label="Attunement" value={calc.meetsRequirement ? `+${calc.attunement}` : 'Req. not met'} icon={<Sparkles size={14} />} color={calc.meetsRequirement ? 'text-green-400' : 'text-red-400'} />
          <StatRow label="Craftwork" value={craftworkDmg > 0 ? `${craftworkName} (+${craftworkDmg})` : craftworkName} icon={<Flame size={14} />} color="text-amber-300" />
          <StatRow label="Total Attack" value={`(+${calc.bonus + craftworkDmg}) ${calc.totalAttack + craftworkDmg}`} icon={<Sword size={14} />} color="text-sf-bright" />
          <StatRow label="Charged Attack" value={charged + craftworkDmg} icon={<Zap size={14} />} color="text-emerald-300" />
          <StatRow label="Smite Chance" value={`${weapon.smiteChance}%`} icon={<Target size={14} />} />
          <StatRow label="Stagger Damage" value={weapon.staggerDamage ?? '—'} icon={<Shield size={14} />} />
        </div>
        {unknownStats && (
          <div className="mb-2 p-2 bg-sf-bg border border-sf-border/50 rounded text-[10px] text-sf-muted flex items-start gap-1.5"><Info size={12} className="mt-0.5 shrink-0" /><span>Rank 30 stats not yet published on the wiki — figures shown are Rank 0 with no rank scaling.</span></div>
        )}
        {!calc.meetsRequirement && (
          <div className="mt-2 p-2 bg-red-900/20 border border-red-800/30 rounded text-xs text-red-300 flex items-start gap-1.5"><Info size={12} className="mt-0.5 shrink-0" /><span>Virtue requirement not met: {Object.entries(weapon.virtueReq).map(([v, val]) => ` ${v} ${val}`).join(',')}</span></div>
        )}
      </div>
    );
  }

  function WeaponSection({ label, weapons, selectedIdx, setSelectedIdx, selectedRuneIdx, setSelectedRuneIdx, runes, rune, weaponRank, setWeaponRank, craftwork, setCraftwork, craftworkDmg, joineries, joineryIdx, setJoineryIdx, joineryTier, setJoineryTier, joinery, isBlessed, blessedPip, setBlessedPip, calc, charged, iconColor }) {
    const weapon = weapons[selectedIdx] || weapons[0];
    const craftworkTier = CRAFTWORK_TIERS[craftwork] || CRAFTWORK_TIERS[0];
    return (
      <SectionCard title={label} icon={<Sword size={20} className={iconColor} />}>
        <SelectField label="Weapon" value={selectedIdx} onChange={e => { setSelectedIdx(Number(e.target.value)); setSelectedRuneIdx(-1); setJoineryIdx(-1); setJoineryTier(0); }}>
          {weapons.map((w, i) => <option key={w.name} value={i}>{w.name} ({w.combatArt})</option>)}
        </SelectField>
        <div className="mt-3 flex items-center gap-3">
          <label className="text-xs text-sf-muted whitespace-nowrap">Rank {weaponRank}</label>
          <input type="range" min={0} max={30} value={weaponRank} onChange={e => setWeaponRank(Number(e.target.value))} className="flex-1 h-1.5 bg-sf-border rounded-full appearance-none cursor-pointer accent-sf-accent" />
        </div>
        <div className="mt-2">
          <label className="block text-[10px] text-sf-muted uppercase mb-1">Craftwork ({craftworkTier.minTempers}–{craftworkTier.maxTempers} Tempers)</label>
          <select value={craftwork} onChange={e => setCraftwork(Number(e.target.value))} className="w-full bg-sf-bg border border-sf-border rounded px-2 py-1.5 text-xs text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer">
            {CRAFTWORK_TIERS.map(t => <option key={t.id} value={t.order}>{t.name}{t.dmgBonus ? ` (+${t.dmgBonus} Atk)` : ''}</option>)}
          </select>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-sf-muted uppercase mb-1">Joinery</label>
            <select value={joineryIdx} onChange={e => { setJoineryIdx(Number(e.target.value)); setJoineryTier(0); }} className="w-full bg-sf-bg border border-sf-border rounded px-2 py-1.5 text-xs text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer"><option value={-1}>None</option>{joineries.map((j, i) => <option key={j.name} value={i}>{j.name}</option>)}</select>
          </div>
          <div>
            <label className="block text-[10px] text-sf-muted uppercase mb-1">Tier</label>
            <select value={joineryTier} onChange={e => setJoineryTier(Number(e.target.value))} className="w-full bg-sf-bg border border-sf-border rounded px-2 py-1.5 text-xs text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer" disabled={!joinery}>{joinery ? joinery.tiers.map((t, i) => <option key={t.tier} value={i}>{t.tier} ({t.rarity})</option>) : <option value={0}>—</option>}</select>
          </div>
        </div>
        {joinery && joinery.tiers[joineryTier] && <div className="mt-1.5 text-[10px] text-amber-300/80">{formatJoineryStats(joinery.tiers[joineryTier]).map((s, i) => <span key={i} className="block">{s}</span>)}</div>}
        {isBlessed && (
          <div className="mt-2">
            <label className="block text-[10px] text-amber-400 uppercase mb-1">Joinery Pip (+{joinery?.tiers[joineryTier]?.pips || 1} Attunement)</label>
            <div className="flex gap-1.5">{['courage', 'spirit', 'grace'].map(v => (<button key={v} onClick={() => setBlessedPip(blessedPip === v ? null : v)} className={`flex-1 text-[10px] py-1 px-2 rounded border capitalize ${blessedPip === v ? 'bg-sf-accent/20 border-sf-accent text-sf-accent font-medium' : 'bg-sf-bg border-sf-border text-sf-muted hover:border-sf-accent/50'}`}>{v}</button>))}</div>
          </div>
        )}
        <div className="mt-3"><WeaponPanel weapon={weapon} calc={calc} charged={charged} label={label} craftworkDmg={craftworkDmg} craftworkName={craftworkTier.name} /></div>
        <div className="mt-3 pt-3 border-t border-sf-border/50">
          <h4 className="text-xs uppercase tracking-wider text-sf-muted mb-2">Rune</h4>
          <select value={selectedRuneIdx} onChange={e => setSelectedRuneIdx(Number(e.target.value))} className="w-full bg-sf-bg border border-sf-border rounded-lg px-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer"><option value={-1}>None</option>{runes.map((r, i) => <option key={i} value={i}>{r.name}</option>)}</select>
          {rune && <div className="mt-2 bg-sf-bg/50 rounded p-2.5 border border-sf-accent/20"><p className="text-xs font-medium text-sf-bright">{rune.effect}</p><p className="text-[10px] text-sf-muted mt-1">{rune.description}</p></div>}
        </div>
      </SectionCard>
    );
  }

  function TotemPool() {
    return (
      <SectionCard title="Totems" icon={<Sparkles size={20} className="text-sf-bright" />}>
        <p className="text-xs text-sf-muted mb-3 font-sans">
          P15 totems are a build-wide pool of Rune / Pull&nbsp;Smite / Smite effects (max rank shown). Select any you plan to run — they trigger in combat and aren&apos;t folded into the Attack summary.
          <span className="text-sf-bright"> {selectedTotems.length} selected.</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {TOTEM_ANIMALS.map(animal => (
            <div key={animal}>
              <h4 className="text-[11px] uppercase tracking-wider text-sf-green mb-1.5">{animal}</h4>
              <div className="space-y-1">
                {TOTEMS.filter(t => t.animal === animal).map(t => {
                  const on = selectedTotems.includes(t.name);
                  return (
                    <button key={t.name} onClick={() => toggleTotem(t.name)} className={`w-full text-left rounded px-2 py-1.5 border transition-colors ${on ? 'bg-sf-accent/15 border-sf-accent' : 'bg-sf-bg border-sf-border hover:border-sf-accent/50'}`}>
                      <div className="flex items-start gap-1.5">
                        <span className={`mt-0.5 shrink-0 w-3 h-3 rounded-sm border flex items-center justify-center ${on ? 'bg-sf-accent border-sf-accent' : 'border-sf-muted'}`}>{on && <Check size={9} className="text-sf-bg" />}</span>
                        <span>
                          <span className={`block text-xs font-medium ${on ? 'text-sf-bright' : 'text-sf-text'}`}>{t.name}</span>
                          <span className="block text-[10px] text-sf-muted leading-snug">{t.effect[3]}</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-sf-bright tracking-widest">Build Planner</h1>
          <p className="text-xs text-sf-muted font-sans">Data sourced from wiki.avakot.org</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-sf-muted">Envoy Rank</label>
            <input type="range" min="1" max="30" value={envoyRank} onChange={e => setEnvoyRank(Number(e.target.value))} className="w-24 accent-sf-accent" />
            <span className="text-sm font-bold text-sf-bright w-6 text-center">{envoyRank}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={handleCopyBuild} className="flex items-center gap-1.5 px-3 py-1.5 bg-sf-bg border border-sf-border rounded-lg text-xs text-sf-text hover:border-sf-accent transition-colors" title="Export build">{copied ? <Check size={14} className="text-sf-bright" /> : <Copy size={14} />}<span>{copied ? 'Copied!' : 'Export'}</span></button>
            <button onClick={handleImportBuild} className="flex items-center gap-1.5 px-3 py-1.5 bg-sf-bg border border-sf-border rounded-lg text-xs text-sf-text hover:border-sf-accent transition-colors" title="Import build"><Upload size={14} /><span>Import</span></button>
          </div>
        </div>
      </div>

      {/* Row 1: Character setup (2-col on lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Prism + Pact */}
        <div className="space-y-6">
          <SectionCard title="Virtues" icon={<Sparkles size={20} className="text-sf-bright" />}>
            <h4 className="text-xs uppercase tracking-wider text-sf-muted mb-3">Virtue Allocation</h4>
            <div className="space-y-3">
              {[
                { key: 'courage', label: 'Courage', color: 'text-courage', barColor: 'bg-courage', icon: <Flame size={14} className="text-courage" />, val: directCourage, set: setDirectCourage, others: directSpirit + directGrace },
                { key: 'spirit', label: 'Spirit', color: 'text-spirit', barColor: 'bg-spirit', icon: <Sparkles size={14} className="text-spirit" />, val: directSpirit, set: setDirectSpirit, others: directCourage + directGrace },
                { key: 'grace', label: 'Grace', color: 'text-grace', barColor: 'bg-grace', icon: <Wind size={14} className="text-grace" />, val: directGrace, set: setDirectGrace, others: directCourage + directSpirit },
              ].map(({ key, label, color, barColor, icon, val, set, others }) => {
                const maxForThis = Math.max(0, totalVirtuePoints - others);
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <label className={`text-xs uppercase tracking-wider ${color}`}>{label}</label>
                      <span className={`text-sm font-semibold ${color}`}>{val}</span>
                    </div>
                    <input type="range" min={0} max={maxForThis} value={Math.min(val, maxForThis)} onChange={e => set(Number(e.target.value))} className="w-full h-1.5 bg-sf-border rounded-full appearance-none cursor-pointer accent-sf-accent" />
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex justify-between text-xs">
              <span className="text-sf-muted">Virtue points available: {totalVirtuePoints}</span>
              <span className={allocatedVirtue > totalVirtuePoints ? 'text-red-400' : 'text-sf-muted'}>Allocated: {allocatedVirtue}</span>
            </div>
            <div className="mt-4 pt-3 border-t border-sf-border/50">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs uppercase tracking-wider text-sf-muted">Effective Virtue</h4>
                <span className="text-[10px] text-sf-muted">includes pact arts, fables &amp; talisman</span>
              </div>
              <div className="space-y-2.5">
                <VirtueBar label="Courage" value={virtues.courage} max={maxVirtue + 5} color="bg-courage" icon={<Flame size={14} className="text-courage" />} bonus={virtues.courage - directCourage} />
                <VirtueBar label="Spirit" value={virtues.spirit} max={maxVirtue + 5} color="bg-spirit" icon={<Sparkles size={14} className="text-spirit" />} bonus={virtues.spirit - directSpirit} />
                <VirtueBar label="Grace" value={virtues.grace} max={maxVirtue + 5} color="bg-grace" icon={<Wind size={14} className="text-grace" />} bonus={virtues.grace - directGrace} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-sf-border/50">
              <h4 className="text-xs uppercase tracking-wider text-sf-muted mb-1">Fable Virtue Bonuses</h4>
              <p className="text-[10px] text-sf-muted mb-2">2 fables grant +1 to a chosen virtue: The Shewolf Snared &amp; The Waste Bear.</p>
              <div className="space-y-2">
                {[{ label: 'The Shewolf Snared', val: fable1Virtue, set: setFable1Virtue }, { label: 'The Waste Bear', val: fable2Virtue, set: setFable2Virtue }].map(f => (
                  <div key={f.label} className="flex items-center justify-between">
                    <span className="text-xs text-sf-muted">{f.label}</span>
                    <div className="flex gap-1">
                      {['courage', 'spirit', 'grace'].map(v => (
                        <button key={v} onClick={() => f.set(v)} className={`text-[10px] py-0.5 px-2 rounded border capitalize ${f.val === v ? (v === 'courage' ? 'bg-courage/20 border-courage text-courage' : v === 'spirit' ? 'bg-spirit/20 border-spirit text-spirit' : 'bg-grace/20 border-grace text-grace') : 'bg-sf-bg border-sf-border text-sf-muted hover:border-sf-accent/50'}`}>{v}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Pact" icon={<Zap size={20} className="text-purple-400" />}>
            <SelectField label="Pact" value={selectedPactIdx} onChange={e => setSelectedPactIdx(Number(e.target.value))}>{PACTS.map((p, i) => <option key={p.name} value={i}>{p.name}{p.type === 'Wyld' ? ' (Wyld)' : ''}</option>)}</SelectField>
            <p className="text-xs text-sf-muted mt-2">{pact.description}</p>
            <div className="mt-3 space-y-1">
              <StatRow label="Bonus Life" value={`+${pact.bonusLife}`} icon={<Heart size={14} />} color="text-green-400" />
              <StatRow label="Aligned Virtue" value={pact.alignedVirtue.charAt(0).toUpperCase() + pact.alignedVirtue.slice(1)} icon={<Sparkles size={14} />} />
            </div>
            <div className="mt-4 pt-3 border-t border-sf-border/50">
              <h4 className="text-xs uppercase tracking-wider text-sf-muted mb-3">Pact Art Virtue Bonuses</h4>
              <div className="space-y-2">
                {[{ label: "Mora's Pride (Courage)", val: courageArtRank, set: setCourageArtRank, cls: 'text-courage' }, { label: "Iridis' Favour (Spirit)", val: spiritArtRank, set: setSpiritArtRank, cls: 'text-spirit' }, { label: "Saphene's Gift (Grace)", val: graceArtRank, set: setGraceArtRank, cls: 'text-grace' }].map(a => (
                  <div key={a.label} className="flex items-center justify-between">
                    <span className={`text-xs ${a.cls}`}>{a.label}</span>
                    <select value={a.val} onChange={e => a.set(Number(e.target.value))} className="bg-sf-bg border border-sf-border rounded px-2 py-1 text-xs text-sf-text focus:outline-none focus:border-sf-accent">
                      <option value={0}>None</option>{PACT_ART_VIRTUE_VALUES.map((v, i) => (<option key={i + 1} value={i + 1}>Rank {i + 1} (+{v})</option>))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-sf-border/50">
              <h4 className="text-xs uppercase tracking-wider text-sf-muted mb-2">Arcanics</h4>
              <div className="space-y-2">
                {pact.arcanics.map((arc, i) => (
                  <div key={i} className="bg-sf-bg/50 rounded p-2.5 border border-sf-border/30">
                    <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium">{arc.name}</span><span className={`text-[10px] px-1.5 py-0.5 rounded ${arc.virtue === 'courage' ? 'bg-courage/20 text-courage-light' : arc.virtue === 'spirit' ? 'bg-spirit/20 text-spirit-light' : 'bg-grace/20 text-grace-light'}`}>{arc.virtue}</span></div>
                    <p className="text-[11px] text-sf-muted leading-relaxed">{arc.description}</p>
                  </div>
                ))}
              </div>
              {cooldownReduction > 0 && <p className="text-xs text-spirit mt-2">Spirit Cooldown Reduction: -{cooldownReduction.toFixed(1)}%</p>}
            </div>
          </SectionCard>
        </div>

        {/* Armour + Talisman + Defense */}
        <div className="space-y-6">
          <SectionCard title="Armour" icon={<Shield size={20} className="text-sf-bright" />}>
            {[{ label: 'Helm', pieces: ARMOUR_HELMS, idx: selectedHelmIdx, setIdx: setSelectedHelmIdx }, { label: 'Cuirass', pieces: ARMOUR_CUIRASSES, idx: selectedCuirassIdx, setIdx: setSelectedCuirassIdx }, { label: 'Leggings', pieces: ARMOUR_LEGGINGS, idx: selectedLeggingsIdx, setIdx: setSelectedLeggingsIdx }].map(({ label, pieces, idx, setIdx }) => {
              const piece = pieces[idx] || pieces[0]; const req = piece?.virtueReq || {};
              const meetsReq = Object.entries(req).every(([v, val]) => (virtues[v] || 0) >= val);
              return (
                <div key={label} className="mb-3">
                  <SelectField label={label} value={idx} onChange={e => setIdx(Number(e.target.value))}>{pieces.map((p, i) => <option key={i} value={i}>{p.name} ({p.setName})</option>)}</SelectField>
                  <div className={`mt-2 bg-sf-bg/50 rounded-lg p-3 border ${meetsReq ? 'border-sf-border/50' : 'border-red-800/30'}`}>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs"><div><p className="text-sf-muted">Physical</p><p className="font-semibold text-orange-300">{piece.physDef}</p></div><div><p className="text-sf-muted">Magick</p><p className="font-semibold text-purple-300">{piece.magDef}</p></div><div><p className="text-sf-muted">Stability</p><p className="font-semibold text-blue-300">{piece.stability}</p></div></div>
                    {!meetsReq && Object.keys(req).length > 0 && <p className="text-[10px] text-red-400 mt-1.5">Req: {Object.entries(req).map(([v, val]) => `${v} ${val}`).join(', ')}</p>}
                  </div>
                </div>
              );
            })}
          </SectionCard>

          <SectionCard title="Talisman" icon={<Sparkles size={20} className="text-yellow-400" />}>
            <SelectField label="Talisman" value={selectedTalismanIdx} onChange={e => setSelectedTalismanIdx(Number(e.target.value))}><option value={-1}>None</option>{TALISMANS.map((t, i) => <option key={i} value={i}>{t.name} ({t.set})</option>)}</SelectField>
            {talisman && (
              <div className="mt-3 bg-sf-bg/50 rounded-lg p-3 border border-sf-border/50">
                <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium">{talisman.name}</span><span className="text-[10px] px-1.5 py-0.5 rounded bg-sf-border text-sf-muted">{talisman.rarity}</span></div>
                <div className="flex flex-wrap gap-2">
                  {talisman.stats.courage > 0 && <span className="text-xs px-2 py-1 rounded bg-courage/20 text-courage-light">+{talisman.stats.courage} Courage</span>}
                  {talisman.stats.spirit > 0 && <span className="text-xs px-2 py-1 rounded bg-spirit/20 text-spirit-light">+{talisman.stats.spirit} Spirit</span>}
                  {talisman.stats.grace > 0 && <span className="text-xs px-2 py-1 rounded bg-grace/20 text-grace-light">+{talisman.stats.grace} Grace</span>}
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Defense Summary" icon={<Shield size={20} className="text-sf-bright" />}>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-sf-bg/50 rounded-lg p-2 border border-sf-border/30"><p className="text-sf-muted">Life</p><p className="text-lg font-bold text-red-400">{totalLife}</p></div>
              <div className="bg-sf-bg/50 rounded-lg p-2 border border-sf-border/30"><p className="text-sf-muted">Stability</p><p className="text-lg font-bold text-blue-300">{defense.totalStab}</p></div>
              <div className="bg-sf-bg/50 rounded-lg p-2 border border-sf-border/30"><p className="text-sf-muted">Physical</p><p className="text-lg font-bold text-orange-300">{defense.totalPhys}</p></div>
              <div className="bg-sf-bg/50 rounded-lg p-2 border border-sf-border/30"><p className="text-sf-muted">Magick</p><p className="text-lg font-bold text-purple-300">{defense.totalMag}</p></div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Row 2: Weapons side by side (2-col on lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <WeaponSection label="Primary" weapons={primaryWeapons} selectedIdx={selectedPrimaryIdx} setSelectedIdx={setSelectedPrimaryIdx} selectedRuneIdx={selectedPrimaryRuneIdx} setSelectedRuneIdx={setSelectedPrimaryRuneIdx} runes={primaryRunes} rune={primaryRune} weaponRank={primaryWeaponRank} setWeaponRank={setPrimaryWeaponRank} craftwork={primaryCraftwork} setCraftwork={setPrimaryCraftwork} craftworkDmg={primaryCraftworkDmg} joineries={primaryJoineries} joineryIdx={primaryJoineryIdx} setJoineryIdx={setPrimaryJoineryIdx} joineryTier={primaryJoineryTier} setJoineryTier={setPrimaryJoineryTier} joinery={primaryJoinery} isBlessed={primaryIsBlessed} blessedPip={primaryBlessedPip} setBlessedPip={setPrimaryBlessedPip} calc={primaryCalc} charged={primaryCharged} iconColor="text-sf-bright" />
        <WeaponSection label="Sidearm" weapons={sidearmWeapons} selectedIdx={selectedSidearmIdx} setSelectedIdx={setSelectedSidearmIdx} selectedRuneIdx={selectedSidearmRuneIdx} setSelectedRuneIdx={setSelectedSidearmRuneIdx} runes={sidearmRunes} rune={sidearmRune} weaponRank={sidearmWeaponRank} setWeaponRank={setSidearmWeaponRank} craftwork={sidearmCraftwork} setCraftwork={setSidearmCraftwork} craftworkDmg={sidearmCraftworkDmg} joineries={sidearmJoineries} joineryIdx={sidearmJoineryIdx} setJoineryIdx={setSidearmJoineryIdx} joineryTier={sidearmJoineryTier} setJoineryTier={setSidearmJoineryTier} joinery={sidearmJoinery} isBlessed={sidearmIsBlessed} blessedPip={sidearmBlessedPip} setBlessedPip={setSidearmBlessedPip} calc={sidearmCalc} charged={sidearmCharged} iconColor="text-grace" />
      </div>

      {/* Row 2.5: Totems (full width, build-wide pool) */}
      <div className="mb-6"><TotemPool /></div>

      {/* Row 3: Build Summary (full width) */}
      <SectionCard title="Build Summary" icon={<Target size={20} className="text-sf-bright" />} className="bg-gradient-to-br from-sf-card to-sf-bg">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-sf-accent/20"><p className="text-[10px] text-sf-muted uppercase mb-1">Primary Atk</p><p className="text-2xl font-bold text-sf-bright">{primaryCalc.totalAttack + primaryCraftworkDmg}</p><p className="text-[10px] text-sf-muted">{primary.name}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-grace/20"><p className="text-[10px] text-sf-muted uppercase mb-1">Sidearm Atk</p><p className="text-2xl font-bold text-grace">{sidearmCalc.totalAttack + sidearmCraftworkDmg}</p><p className="text-[10px] text-sf-muted">{sidearm.name}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-red-800/30"><p className="text-[10px] text-sf-muted uppercase mb-1">Total Life</p><p className="text-2xl font-bold text-red-400">{totalLife}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-blue-800/30"><p className="text-[10px] text-sf-muted uppercase mb-1">Stability</p><p className="text-2xl font-bold text-blue-300">{defense.totalStab}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-orange-800/30"><p className="text-[10px] text-sf-muted uppercase mb-1">Phys Armour</p><p className="text-2xl font-bold text-orange-300">{defense.totalPhys}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-purple-800/30"><p className="text-[10px] text-sf-muted uppercase mb-1">Magick Armour</p><p className="text-2xl font-bold text-purple-300">{defense.totalMag}</p></div>
        </div>
        <div className="mt-4 pt-3 border-t border-sf-border/50">
          <h4 className="text-xs uppercase tracking-wider text-sf-muted mb-2">Build Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1.5 text-xs">
            {[['Virtues', `${directCourage}C / ${directSpirit}S / ${directGrace}G`], ['Pact', pact.name], ['Helm', helm.name], ['Cuirass', cuirass.name], ['Leggings', leggings.name], ['Talisman', talisman ? talisman.name : 'None'], ['Primary', primary.name], ['Primary Rune', primaryRune ? primaryRune.name : '—'], ['Sidearm', sidearm.name], ['Sidearm Rune', sidearmRune ? sidearmRune.name : '—'], ['Totems', selectedTotems.length ? `${selectedTotems.length} equipped` : 'None']].map(([l, v]) => (
              <div key={l} className="flex justify-between"><span className="text-sf-muted">{l}</span><span className="text-sf-text">{v}</span></div>
            ))}
            <div className="flex justify-between"><span className="text-sf-muted">Virtues</span><span><span className="text-courage">{virtues.courage}C</span> / <span className="text-spirit">{virtues.spirit}S</span> / <span className="text-grace">{virtues.grace}G</span></span></div>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
