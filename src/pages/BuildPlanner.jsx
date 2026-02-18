import { useState, useMemo } from 'react';
import { Shield, Sword, Heart, Zap, Target, Info, Flame, Sparkles, Wind, Copy, Check, Upload } from 'lucide-react';
import { PRISMS, calculateVirtues } from '../data/prisms';
import { PACTS, PACT_ART_VIRTUE_VALUES } from '../data/pacts';
import { WEAPONS } from '../data/weapons';
import { ARMOUR_HELMS, ARMOUR_CUIRASSES, ARMOUR_LEGGINGS } from '../data/armour';
import { RUNES } from '../data/runes';
import { TOTEMS } from '../data/totems';
import { TALISMANS } from '../data/talismans';
import { JOINERIES, getJoineriesForWeapon, formatJoineryStats } from '../data/joineries';
import {
  calculateWeaponAttunement, calculateDPS, calculateChargedAttack,
  calculateTotalLife, calculateTotalDefense,
  calculateCooldownReduction, calculateWeaponWithTotems,
} from '../data/calculations';

function VirtueBar({ label, value, max, color, icon }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 w-24">{icon}<span className="text-sm font-medium">{label}</span></div>
      <div className="flex-1 h-3 bg-sf-border rounded-full overflow-hidden"><div className={`virtue-bar h-full rounded-full ${color}`} style={{ width: `${pct}%` }} /></div>
      <span className="text-sm font-semibold w-8 text-right">{value}</span>
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
  const [selectedPrismIdx, setSelectedPrismIdx] = useState(0);
  const [selectedPactIdx, setSelectedPactIdx] = useState(0);
  const [selectedHelmIdx, setSelectedHelmIdx] = useState(0);
  const [selectedCuirassIdx, setSelectedCuirassIdx] = useState(0);
  const [selectedLeggingsIdx, setSelectedLeggingsIdx] = useState(0);
  const [selectedPrimaryIdx, setSelectedPrimaryIdx] = useState(0);
  const [selectedSidearmIdx, setSelectedSidearmIdx] = useState(0);
  const [selectedPrimaryRuneIdx, setSelectedPrimaryRuneIdx] = useState(-1);
  const [selectedSidearmRuneIdx, setSelectedSidearmRuneIdx] = useState(-1);
  const [primaryTotemSlots, setPrimaryTotemSlots] = useState({ Attack: -1, Defense: -1, Utility: -1 });
  const [sidearmTotemSlots, setSidearmTotemSlots] = useState({ Attack: -1, Defense: -1, Utility: -1 });
  const [primaryRuneBonusTotemIdx, setPrimaryRuneBonusTotemIdx] = useState(-1);
  const [sidearmRuneBonusTotemIdx, setSidearmRuneBonusTotemIdx] = useState(-1);
  const [selectedTalismanIdx, setSelectedTalismanIdx] = useState(-1);
  const [primaryWeaponRank, setPrimaryWeaponRank] = useState(30);
  const [sidearmWeaponRank, setSidearmWeaponRank] = useState(30);
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

  const prism = PRISMS[selectedPrismIdx];
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
  const primaryTotems = TOTEMS.filter(t => t.combatArt === primary.combatArt);
  const sidearmTotems = TOTEMS.filter(t => t.combatArt === sidearm.combatArt);
  const primaryJoineries = useMemo(() => getJoineriesForWeapon(primary.combatArt), [primary.combatArt]);
  const sidearmJoineries = useMemo(() => getJoineriesForWeapon(sidearm.combatArt), [sidearm.combatArt]);
  const primaryJoinery = primaryJoineryIdx >= 0 ? primaryJoineries[primaryJoineryIdx] : null;
  const sidearmJoinery = sidearmJoineryIdx >= 0 ? sidearmJoineries[sidearmJoineryIdx] : null;
  const primaryJoineryDmg = primaryJoinery ? (primaryJoinery.tiers[primaryJoineryTier]?.stats?.damage || primaryJoinery.tiers[primaryJoineryTier]?.stats?.consecutiveDamage || 0) : 0;
  const sidearmJoineryDmg = sidearmJoinery ? (sidearmJoinery.tiers[sidearmJoineryTier]?.stats?.damage || sidearmJoinery.tiers[sidearmJoineryTier]?.stats?.consecutiveDamage || 0) : 0;
  const primaryIsBlessed = primaryJoinery?.tiers[primaryJoineryTier]?.blessed || false;
  const sidearmIsBlessed = sidearmJoinery?.tiers[sidearmJoineryTier]?.blessed || false;
  const primaryEffectivePip = primaryIsBlessed ? primaryBlessedPip : null;
  const sidearmEffectivePip = sidearmIsBlessed ? sidearmBlessedPip : null;

  const pactArtBonuses = useMemo(() => ({
    courage: courageArtRank > 0 ? PACT_ART_VIRTUE_VALUES[courageArtRank - 1] : 0,
    spirit: spiritArtRank > 0 ? PACT_ART_VIRTUE_VALUES[spiritArtRank - 1] : 0,
    grace: graceArtRank > 0 ? PACT_ART_VIRTUE_VALUES[graceArtRank - 1] : 0,
  }), [courageArtRank, spiritArtRank, graceArtRank]);

  const talisman = selectedTalismanIdx >= 0 ? TALISMANS[selectedTalismanIdx] : null;

  const virtues = useMemo(() => {
    const base = calculateVirtues(prism, envoyRank, pactArtBonuses);
    if (pact.bonusVirtue) Object.entries(pact.bonusVirtue).forEach(([v, val]) => { base[v] = (base[v] || 0) + val; });
    if (talisman) { const s = talisman.stats; if (s.courage) base.courage = (base.courage || 0) + s.courage; if (s.spirit) base.spirit = (base.spirit || 0) + s.spirit; if (s.grace) base.grace = (base.grace || 0) + s.grace; }
    return base;
  }, [prism, envoyRank, pactArtBonuses, pact, talisman]);

  const primaryEquippedTotems = useMemo(() => {
    const slots = ['Attack', 'Defense', 'Utility'];
    const entries = slots.map(slot => primaryTotemSlots[slot] >= 0 ? { totem: primaryTotems[primaryTotemSlots[slot]], slot } : null).filter(Boolean);
    if (primaryRune && primaryRuneBonusTotemIdx >= 0 && primaryTotems[primaryRuneBonusTotemIdx]) entries.push({ totem: primaryTotems[primaryRuneBonusTotemIdx], slot: primaryRune.bonusTotemSlot });
    return entries;
  }, [primaryTotemSlots, primaryTotems, primaryRune, primaryRuneBonusTotemIdx]);

  const sidearmEquippedTotems = useMemo(() => {
    const slots = ['Attack', 'Defense', 'Utility'];
    const entries = slots.map(slot => sidearmTotemSlots[slot] >= 0 ? { totem: sidearmTotems[sidearmTotemSlots[slot]], slot } : null).filter(Boolean);
    if (sidearmRune && sidearmRuneBonusTotemIdx >= 0 && sidearmTotems[sidearmRuneBonusTotemIdx]) entries.push({ totem: sidearmTotems[sidearmRuneBonusTotemIdx], slot: sidearmRune.bonusTotemSlot });
    return entries;
  }, [sidearmTotemSlots, sidearmTotems, sidearmRune, sidearmRuneBonusTotemIdx]);

  const primaryCalc = useMemo(() => calculateWeaponAttunement(primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip), [primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip]);
  const sidearmCalc = useMemo(() => calculateWeaponAttunement(sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip), [sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip]);
  const primaryDPS = useMemo(() => calculateDPS(primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip), [primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip]);
  const sidearmDPS = useMemo(() => calculateDPS(sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip), [sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip]);
  const primaryCharged = useMemo(() => calculateChargedAttack(primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip), [primary, virtues, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip]);
  const sidearmCharged = useMemo(() => calculateChargedAttack(sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip), [sidearm, virtues, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip]);
  const primaryTotemCalc = useMemo(() => calculateWeaponWithTotems(primary, virtues, primaryEquippedTotems, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip), [primary, virtues, primaryEquippedTotems, primaryWeaponRank, primaryJoineryDmg, primaryEffectivePip]);
  const sidearmTotemCalc = useMemo(() => calculateWeaponWithTotems(sidearm, virtues, sidearmEquippedTotems, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip), [sidearm, virtues, sidearmEquippedTotems, sidearmWeaponRank, sidearmJoineryDmg, sidearmEffectivePip]);

  const totalLife = useMemo(() => calculateTotalLife(pact, virtues), [pact, virtues]);
  const baseDefense = useMemo(() => calculateTotalDefense(armourPieces, virtues), [armourPieces, virtues]);
  const totemPhysArmour = (primaryTotemCalc?.extraPhysArmour || 0) + (sidearmTotemCalc?.extraPhysArmour || 0);
  const totemMagArmour = (primaryTotemCalc?.extraMagArmour || 0) + (sidearmTotemCalc?.extraMagArmour || 0);
  const defense = useMemo(() => ({ ...baseDefense, totalPhys: baseDefense.totalPhys + totemPhysArmour, totalMag: baseDefense.totalMag + totemMagArmour }), [baseDefense, totemPhysArmour, totemMagArmour]);
  const cooldownReduction = useMemo(() => calculateCooldownReduction(virtues.spirit), [virtues.spirit]);
  const maxVirtue = Math.max(virtues.courage, virtues.spirit, virtues.grace, 1);

  function exportBuild() {
    const build = { envoyRank, selectedPrismIdx, selectedPactIdx, selectedHelmIdx, selectedCuirassIdx, selectedLeggingsIdx, selectedPrimaryIdx, selectedSidearmIdx, selectedPrimaryRuneIdx, selectedSidearmRuneIdx, primaryTotemSlots, sidearmTotemSlots, primaryRuneBonusTotemIdx, sidearmRuneBonusTotemIdx, selectedTalismanIdx, courageArtRank, spiritArtRank, graceArtRank, primaryWeaponRank, sidearmWeaponRank, primaryJoineryIdx, primaryJoineryTier, primaryBlessedPip, sidearmJoineryIdx, sidearmJoineryTier, sidearmBlessedPip };
    return btoa(JSON.stringify(build));
  }

  function importBuild(code) {
    try {
      const build = JSON.parse(atob(code));
      if (build.envoyRank != null) setEnvoyRank(build.envoyRank);
      if (build.selectedPrismIdx != null) setSelectedPrismIdx(build.selectedPrismIdx);
      if (build.selectedPactIdx != null) setSelectedPactIdx(build.selectedPactIdx);
      if (build.selectedHelmIdx != null) setSelectedHelmIdx(build.selectedHelmIdx);
      if (build.selectedCuirassIdx != null) setSelectedCuirassIdx(build.selectedCuirassIdx);
      if (build.selectedLeggingsIdx != null) setSelectedLeggingsIdx(build.selectedLeggingsIdx);
      if (build.selectedPrimaryIdx != null) setSelectedPrimaryIdx(build.selectedPrimaryIdx);
      if (build.selectedSidearmIdx != null) setSelectedSidearmIdx(build.selectedSidearmIdx);
      if (build.selectedPrimaryRuneIdx != null) setSelectedPrimaryRuneIdx(build.selectedPrimaryRuneIdx);
      if (build.selectedSidearmRuneIdx != null) setSelectedSidearmRuneIdx(build.selectedSidearmRuneIdx);
      if (build.primaryTotemSlots) setPrimaryTotemSlots(build.primaryTotemSlots);
      if (build.sidearmTotemSlots) setSidearmTotemSlots(build.sidearmTotemSlots);
      if (build.primaryRuneBonusTotemIdx != null) setPrimaryRuneBonusTotemIdx(build.primaryRuneBonusTotemIdx);
      if (build.sidearmRuneBonusTotemIdx != null) setSidearmRuneBonusTotemIdx(build.sidearmRuneBonusTotemIdx);
      if (build.selectedTalismanIdx != null) setSelectedTalismanIdx(build.selectedTalismanIdx);
      if (build.courageArtRank != null) setCourageArtRank(build.courageArtRank);
      if (build.spiritArtRank != null) setSpiritArtRank(build.spiritArtRank);
      if (build.graceArtRank != null) setGraceArtRank(build.graceArtRank);
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

  function handleCopyBuild() { const code = exportBuild(); navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }
  function handleImportBuild() { const code = prompt('Paste your build code:'); if (code && !importBuild(code.trim())) alert('Invalid build code.'); }

  function formatTotemBonus(totem, slotKey) {
    const bonus = totem.bonuses[slotKey]; const statArr = totem.stats[slotKey];
    if (!bonus || !statArr) return '';
    if (Array.isArray(statArr[0])) { let text = bonus; text = text.replace('$1', statArr[0][3]); text = text.replace('$2', statArr[1][3]); return text; }
    return bonus.replace('$1', statArr[3]);
  }

  function WeaponPanel({ weapon, calc, dps, charged, label, totemCalc }) {
    const hasTotems = totemCalc && (totemCalc.modified.totalAttack !== totemCalc.base.totalAttack || totemCalc.modified.smiteChance !== totemCalc.base.smiteChance || totemCalc.modified.atkSpeed !== totemCalc.base.atkSpeed);
    const mod = totemCalc?.modified;
    const conds = totemCalc?.conditionals || [];
    const r0 = weapon.rank0Damage || weapon.baseDamage;
    return (
      <div className="bg-sf-bg/50 rounded-lg p-4 border border-sf-border/50">
        <div className="flex items-center justify-between mb-3"><h4 className="font-semibold text-sf-bright font-['Cinzel']">{weapon.name}</h4><span className="text-xs px-2 py-0.5 rounded bg-sf-border text-sf-muted">{label}</span></div>
        <div className="flex items-center gap-3 mb-3 text-xs text-sf-muted"><span>{weapon.combatArt}</span><span>•</span><DamageTypeIcon type={weapon.damageType} /></div>
        <div className="space-y-1 mb-3">
          <StatRow label="Base Attack" value={`${r0} → ${calc.attackAtRank}`} icon={<Sword size={14} />} />
          {calc.rankScaling > 0 && <StatRow label="Rank Scaling" value={`+${calc.rankScaling}`} icon={<Zap size={14} />} color="text-blue-300" />}
          <StatRow label="Attunement" value={calc.meetsRequirement ? `+${calc.attunement}` : 'Req. not met'} icon={<Sparkles size={14} />} color={calc.meetsRequirement ? 'text-green-400' : 'text-red-400'} />
          {calc.joineryDamage > 0 && <StatRow label="Joinery" value={`+${calc.joineryDamage}`} icon={<Flame size={14} />} color="text-amber-300" />}
          <StatRow label="Total Attack" value={`(+${calc.bonus}) ${hasTotems ? mod.totalAttack : calc.totalAttack}`} icon={<Sword size={14} />} color="text-sf-bright" bonus={hasTotems && mod.totalAttack > calc.totalAttack ? mod.totalAttack - calc.totalAttack : 0} />
          <StatRow label="Charged Attack" value={hasTotems ? mod.charged : charged} icon={<Zap size={14} />} color="text-emerald-300" />
          <StatRow label="Attack Speed" value={`${hasTotems ? mod.atkSpeed : weapon.attackSpeed}/s`} icon={<Wind size={14} />} bonus={hasTotems && mod.atkSpeed > weapon.attackSpeed ? `+${Math.round((mod.atkSpeed - weapon.attackSpeed) * 100) / 100}` : 0} />
          <StatRow label="Smite Chance" value={`${hasTotems ? mod.smiteChance.toFixed(1) : weapon.smiteChance}%`} icon={<Target size={14} />} bonus={hasTotems && mod.smiteChance > weapon.smiteChance ? `+${(mod.smiteChance - weapon.smiteChance).toFixed(1)}` : 0} />
          <StatRow label="Stagger Damage" value={weapon.staggerDamage} icon={<Shield size={14} />} />
        </div>
        <div className="border-t border-sf-border/50 pt-3">
          <div className="flex items-center justify-between"><span className="text-sm text-sf-muted">Effective DPS</span><span className="text-lg font-bold text-sf-bright">{hasTotems ? mod.dps.toFixed(1) : dps.dps.toFixed(1)}</span></div>
          {hasTotems && mod.dps !== dps.dps && <p className="text-[10px] text-green-400 mt-0.5">Base DPS without totems: {dps.dps.toFixed(1)}</p>}
          <p className="text-[10px] text-sf-muted mt-1">DPS = Total Attack × Attack Speed</p>
        </div>
        {conds.length > 0 && (
          <div className="border-t border-sf-border/50 mt-3 pt-3">
            <h5 className="text-[10px] uppercase tracking-wider text-sf-muted mb-2">Conditional Bonuses</h5>
            {conds.map((c, i) => (<div key={i} className="bg-yellow-900/10 border border-yellow-700/20 rounded p-2 mb-1.5"><div className="flex items-center justify-between"><span className="text-xs text-yellow-300 font-medium">{c.condition}</span><span className="text-xs font-bold text-yellow-200">{c.dps.toFixed(1)} DPS</span></div><div className="flex items-center justify-between mt-0.5"><span className="text-[10px] text-sf-muted">{c.desc}</span><span className="text-[10px] text-yellow-300">Atk: {c.totalAttack}</span></div></div>))}
          </div>
        )}
        {!calc.meetsRequirement && (
          <div className="mt-2 p-2 bg-red-900/20 border border-red-800/30 rounded text-xs text-red-300 flex items-start gap-1.5"><Info size={12} className="mt-0.5 shrink-0" /><span>Virtue requirement not met: {Object.entries(weapon.virtueReq).map(([v, val]) => ` ${v} ${val}`).join(',')}</span></div>
        )}
      </div>
    );
  }

  function WeaponSection({ label, weapons, selectedIdx, setSelectedIdx, selectedRuneIdx, setSelectedRuneIdx, runes, rune, totems, totemSlots, setTotemSlots, runeBonusTotemIdx, setRuneBonusTotemIdx, weaponRank, setWeaponRank, joineries, joineryIdx, setJoineryIdx, joineryTier, setJoineryTier, joinery, isBlessed, blessedPip, setBlessedPip, calc, dps, charged, totemCalc, iconColor }) {
    const weapon = weapons[selectedIdx] || weapons[0];
    return (
      <SectionCard title={label} icon={<Sword size={20} className={iconColor} />}>
        <SelectField label="Weapon" value={selectedIdx} onChange={e => { setSelectedIdx(Number(e.target.value)); setSelectedRuneIdx(-1); setTotemSlots({ Attack: -1, Defense: -1, Utility: -1 }); setRuneBonusTotemIdx(-1); setJoineryIdx(-1); setJoineryTier(0); }}>
          {weapons.map((w, i) => <option key={w.name} value={i}>{w.name} ({w.combatArt})</option>)}
        </SelectField>
        <div className="mt-3 flex items-center gap-3">
          <label className="text-xs text-sf-muted whitespace-nowrap">Rank {weaponRank}</label>
          <input type="range" min={0} max={30} value={weaponRank} onChange={e => setWeaponRank(Number(e.target.value))} className="flex-1 h-1.5 bg-sf-border rounded-full appearance-none cursor-pointer accent-sf-accent" />
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
            <label className="block text-[10px] text-amber-400 uppercase mb-1">Blessed Pip (+1 Attunement)</label>
            <div className="flex gap-1.5">{['courage', 'spirit', 'grace'].map(v => (<button key={v} onClick={() => setBlessedPip(blessedPip === v ? null : v)} className={`flex-1 text-[10px] py-1 px-2 rounded border capitalize ${blessedPip === v ? 'bg-sf-accent/20 border-sf-accent text-sf-accent font-medium' : 'bg-sf-bg border-sf-border text-sf-muted hover:border-sf-accent/50'}`}>{v}</button>))}</div>
          </div>
        )}
        <div className="mt-3"><WeaponPanel weapon={weapon} calc={calc} dps={dps} charged={charged} label={label} totemCalc={totemCalc} /></div>
        <div className="mt-3 pt-3 border-t border-sf-border/50">
          <h4 className="text-xs uppercase tracking-wider text-sf-muted mb-2">Rune</h4>
          <select value={selectedRuneIdx} onChange={e => { setSelectedRuneIdx(Number(e.target.value)); setRuneBonusTotemIdx(-1); }} className="w-full bg-sf-bg border border-sf-border rounded-lg px-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer"><option value={-1}>None</option>{runes.map((r, i) => <option key={i} value={i}>{r.name}</option>)}</select>
          {rune && <div className="mt-2 bg-sf-bg/50 rounded p-2.5 border border-sf-accent/20"><p className="text-xs font-medium text-sf-bright">{rune.effect}</p><p className="text-[10px] text-sf-muted mt-1">{rune.description}</p><p className="text-[10px] text-sf-muted mt-1">Bonus Totem Slot: <span className="text-sf-bright">{rune.bonusTotemSlot}</span></p></div>}
        </div>
        <div className="mt-3 pt-3 border-t border-sf-border/50">
          <h4 className="text-xs uppercase tracking-wider text-sf-muted mb-2">Totems</h4>
          {['Attack', 'Defense', 'Utility'].map(slot => (
            <div key={slot} className="mb-2">
              <label className="block text-[10px] text-sf-muted uppercase mb-1">{slot}</label>
              <select value={totemSlots[slot]} onChange={e => setTotemSlots(prev => ({ ...prev, [slot]: Number(e.target.value) }))} className="w-full bg-sf-bg border border-sf-border rounded px-2 py-1.5 text-xs text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer"><option value={-1}>None</option>{totems.map((t, i) => <option key={i} value={i}>{t.name} ({t.animal}) — {formatTotemBonus(t, slot.toLowerCase())}</option>)}</select>
            </div>
          ))}
          {rune && (
            <div className="mb-2">
              <label className="block text-[10px] text-sf-bright uppercase mb-1">{rune.bonusTotemSlot} (Rune Bonus)</label>
              <select value={runeBonusTotemIdx} onChange={e => setRuneBonusTotemIdx(Number(e.target.value))} className="w-full bg-sf-bg border border-sf-accent/30 rounded px-2 py-1.5 text-xs text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer"><option value={-1}>None</option>{totems.map((t, i) => <option key={i} value={i}>{t.name} ({t.animal}) — {formatTotemBonus(t, rune.bonusTotemSlot.toLowerCase())}</option>)}</select>
            </div>
          )}
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
          <SectionCard title="Virtue Prism" icon={<Sparkles size={20} className="text-sf-bright" />}>
            <SelectField label="Prism" value={selectedPrismIdx} onChange={e => setSelectedPrismIdx(Number(e.target.value))}>{PRISMS.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}</SelectField>
            <p className="text-xs text-sf-muted mt-2">{prism.description}</p>
            <div className="mt-4 space-y-2.5">
              <VirtueBar label="Courage" value={virtues.courage} max={maxVirtue + 5} color="bg-courage" icon={<Flame size={14} className="text-courage" />} />
              <VirtueBar label="Spirit" value={virtues.spirit} max={maxVirtue + 5} color="bg-spirit" icon={<Sparkles size={14} className="text-spirit" />} />
              <VirtueBar label="Grace" value={virtues.grace} max={maxVirtue + 5} color="bg-grace" icon={<Wind size={14} className="text-grace" />} />
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
                      <option value={0}>None</option><option value={1}>Rank 1 (+1)</option><option value={2}>Rank 2 (+3)</option><option value={3}>Rank 3 (+6)</option><option value={4}>Rank 4 (+10)</option>
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
        <WeaponSection label="Primary" weapons={primaryWeapons} selectedIdx={selectedPrimaryIdx} setSelectedIdx={setSelectedPrimaryIdx} selectedRuneIdx={selectedPrimaryRuneIdx} setSelectedRuneIdx={setSelectedPrimaryRuneIdx} runes={primaryRunes} rune={primaryRune} totems={primaryTotems} totemSlots={primaryTotemSlots} setTotemSlots={setPrimaryTotemSlots} runeBonusTotemIdx={primaryRuneBonusTotemIdx} setRuneBonusTotemIdx={setPrimaryRuneBonusTotemIdx} weaponRank={primaryWeaponRank} setWeaponRank={setPrimaryWeaponRank} joineries={primaryJoineries} joineryIdx={primaryJoineryIdx} setJoineryIdx={setPrimaryJoineryIdx} joineryTier={primaryJoineryTier} setJoineryTier={setPrimaryJoineryTier} joinery={primaryJoinery} isBlessed={primaryIsBlessed} blessedPip={primaryBlessedPip} setBlessedPip={setPrimaryBlessedPip} calc={primaryCalc} dps={primaryDPS} charged={primaryCharged} totemCalc={primaryTotemCalc} iconColor="text-sf-bright" />
        <WeaponSection label="Sidearm" weapons={sidearmWeapons} selectedIdx={selectedSidearmIdx} setSelectedIdx={setSelectedSidearmIdx} selectedRuneIdx={selectedSidearmRuneIdx} setSelectedRuneIdx={setSelectedSidearmRuneIdx} runes={sidearmRunes} rune={sidearmRune} totems={sidearmTotems} totemSlots={sidearmTotemSlots} setTotemSlots={setSidearmTotemSlots} runeBonusTotemIdx={sidearmRuneBonusTotemIdx} setRuneBonusTotemIdx={setSidearmRuneBonusTotemIdx} weaponRank={sidearmWeaponRank} setWeaponRank={setSidearmWeaponRank} joineries={sidearmJoineries} joineryIdx={sidearmJoineryIdx} setJoineryIdx={setSidearmJoineryIdx} joineryTier={sidearmJoineryTier} setJoineryTier={setSidearmJoineryTier} joinery={sidearmJoinery} isBlessed={sidearmIsBlessed} blessedPip={sidearmBlessedPip} setBlessedPip={setSidearmBlessedPip} calc={sidearmCalc} dps={sidearmDPS} charged={sidearmCharged} totemCalc={sidearmTotemCalc} iconColor="text-grace" />
      </div>

      {/* Row 3: Build Summary (full width) */}
      <SectionCard title="Build Summary" icon={<Target size={20} className="text-sf-bright" />} className="bg-gradient-to-br from-sf-card to-sf-bg">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-sf-accent/20"><p className="text-[10px] text-sf-muted uppercase mb-1">Primary DPS</p><p className="text-2xl font-bold text-sf-bright">{primaryTotemCalc.modified.dps.toFixed(1)}</p><p className="text-[10px] text-sf-muted">{primary.name}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-grace/20"><p className="text-[10px] text-sf-muted uppercase mb-1">Sidearm DPS</p><p className="text-2xl font-bold text-grace">{sidearmTotemCalc.modified.dps.toFixed(1)}</p><p className="text-[10px] text-sf-muted">{sidearm.name}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-red-800/30"><p className="text-[10px] text-sf-muted uppercase mb-1">Total Life</p><p className="text-2xl font-bold text-red-400">{totalLife}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-blue-800/30"><p className="text-[10px] text-sf-muted uppercase mb-1">Stability</p><p className="text-2xl font-bold text-blue-300">{defense.totalStab}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-orange-800/30"><p className="text-[10px] text-sf-muted uppercase mb-1">Phys Armour</p><p className="text-2xl font-bold text-orange-300">{defense.totalPhys}</p></div>
          <div className="bg-sf-bg/70 rounded-lg p-3 text-center border border-purple-800/30"><p className="text-[10px] text-sf-muted uppercase mb-1">Magick Armour</p><p className="text-2xl font-bold text-purple-300">{defense.totalMag}</p></div>
        </div>
        <div className="mt-4 pt-3 border-t border-sf-border/50">
          <h4 className="text-xs uppercase tracking-wider text-sf-muted mb-2">Build Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1.5 text-xs">
            {[['Prism', prism.name], ['Pact', pact.name], ['Helm', helm.name], ['Cuirass', cuirass.name], ['Leggings', leggings.name], ['Talisman', talisman ? talisman.name : 'None'], ['Primary', primary.name], ['Primary Rune', primaryRune ? primaryRune.name : '—'], ['Sidearm', sidearm.name], ['Sidearm Rune', sidearmRune ? sidearmRune.name : '—']].map(([l, v]) => (
              <div key={l} className="flex justify-between"><span className="text-sf-muted">{l}</span><span className="text-sf-text">{v}</span></div>
            ))}
            <div className="flex justify-between"><span className="text-sf-muted">Virtues</span><span><span className="text-courage">{virtues.courage}C</span> / <span className="text-spirit">{virtues.spirit}S</span> / <span className="text-grace">{virtues.grace}G</span></span></div>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
