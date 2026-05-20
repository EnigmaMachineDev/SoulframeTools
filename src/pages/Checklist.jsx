import React, { useState, useMemo } from 'react';
import { Menu, X, BookOpen, Sword, Shield, Gem, Flame, Sparkles, Map, Palette, Diamond, RotateCcw, Download, Upload, ChevronDown, ChevronRight, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { gameData, getSectionItemIds, getTotalItems } from '../data/gameData';
import { ARMOUR_SETS } from '../data/armour';
import { WEAPONS } from '../data/weapons';
import ProgressBar from '../components/ProgressBar';

const iconMap = { BookOpen, Sword, Shield, Gem, Flame, Sparkles, Map, Palette, Diamond };

// Lookup maps built once at module level
const armourLookup = {};
for (const set of ARMOUR_SETS) {
  for (const piece of set.pieces) {
    armourLookup[piece.name] = { slot: piece.slot, virtueReq: piece.virtueReq || {} };
  }
}
const weaponLookup = {};
for (const w of WEAPONS) {
  weaponLookup[w.name] = { slot: w.slot, combatArt: w.combatArt, virtueReq: w.virtueReq || {} };
}

function getPrimaryVirtue(virtueReq) {
  const entries = Object.entries(virtueReq || {});
  if (!entries.length) return 'none';
  return entries.reduce((a, b) => b[1] > a[1] ? b : a)[0];
}

function getItemAllIds(item, sectionKey) {
  const section = gameData[sectionKey];
  if (!section) return [item.id];
  const { trackLevel, trackCraft } = section;
  if (trackLevel) {
    const ids = [`${item.id}:collected`];
    if (trackCraft) ids.push(`${item.id}:crafted`);
    ids.push(`${item.id}:leveled`);
    return ids;
  }
  if (trackCraft) return [item.id, `${item.id}:crafted`];
  return [item.id];
}

function buildArmourGroups(categories, groupBy) {
  const allItems = Object.values(categories).flatMap(c => c.items);
  if (groupBy === 'set') return categories;
  if (groupBy === 'alpha') {
    return { _all: { label: 'All Pieces (A–Z)', items: [...allItems].sort((a, b) => a.name.localeCompare(b.name)) } };
  }
  if (groupBy === 'slot') {
    const groups = { Helm: [], Cuirass: [], Leggings: [] };
    for (const item of allItems) {
      const slot = armourLookup[item.name]?.slot || 'Other';
      (groups[slot] = groups[slot] || []).push(item);
    }
    return Object.fromEntries(
      [['Helm', 'Helms'], ['Cuirass', 'Cuirasses'], ['Leggings', 'Leggings']]
        .filter(([k]) => groups[k]?.length)
        .map(([k, label]) => [k.toLowerCase(), { label, items: groups[k].sort((a, b) => a.name.localeCompare(b.name)) }])
    );
  }
  if (groupBy === 'attribute') {
    const groups = { courage: [], spirit: [], grace: [], none: [] };
    for (const item of allItems) {
      const v = getPrimaryVirtue(armourLookup[item.name]?.virtueReq);
      (groups[v] = groups[v] || []).push(item);
    }
    const order = ['courage', 'spirit', 'grace', 'none'];
    const labels = { courage: 'Courage', spirit: 'Spirit', grace: 'Grace', none: 'No Requirement' };
    return Object.fromEntries(
      order.filter(k => groups[k]?.length).map(k => [k, { label: labels[k], items: groups[k].sort((a, b) => a.name.localeCompare(b.name)) }])
    );
  }
  return categories;
}

function buildWeaponGroups(categories, groupBy) {
  const allItems = Object.values(categories).flatMap(c => c.items);
  if (groupBy === 'type') return categories;
  if (groupBy === 'slot') {
    const groups = { Primary: [], Sidearm: [] };
    for (const item of allItems) {
      const slot = weaponLookup[item.name]?.slot || 'Other';
      (groups[slot] = groups[slot] || []).push(item);
    }
    return Object.fromEntries(
      [['Primary', 'Primary Weapons'], ['Sidearm', 'Sidearm Weapons']]
        .filter(([k]) => groups[k]?.length)
        .map(([k, label]) => [k.toLowerCase(), { label, items: groups[k].sort((a, b) => a.name.localeCompare(b.name)) }])
    );
  }
  if (groupBy === 'attribute') {
    const groups = { courage: [], spirit: [], grace: [], mixed: [], none: [] };
    for (const item of allItems) {
      const vr = weaponLookup[item.name]?.virtueReq || {};
      const keys = Object.keys(vr);
      if (keys.length === 0) groups.none.push(item);
      else if (keys.length > 1) groups.mixed.push(item);
      else (groups[keys[0]] = groups[keys[0]] || []).push(item);
    }
    const order = ['courage', 'spirit', 'grace', 'mixed', 'none'];
    const labels = { courage: 'Courage', spirit: 'Spirit', grace: 'Grace', mixed: 'Mixed Virtues', none: 'No Requirement' };
    return Object.fromEntries(
      order.filter(k => groups[k]?.length).map(k => [k, { label: labels[k], items: groups[k].sort((a, b) => a.name.localeCompare(b.name)) }])
    );
  }
  return categories;
}

function shouldHideItem(item, sectionKey, filters, isChecked) {
  if (sectionKey === 'weapons') {
    if (filters.hideAcquired && isChecked(`${item.id}:collected`)) return true;
    if (filters.hideCrafted && isChecked(`${item.id}:crafted`)) return true;
    if (filters.hideMastered && isChecked(`${item.id}:leveled`)) return true;
  } else if (sectionKey === 'armour') {
    if (filters.hideAcquired && isChecked(item.id)) return true;
    if (filters.hideCrafted && isChecked(`${item.id}:crafted`)) return true;
    if (filters.hideMastered && isChecked(item.id) && isChecked(`${item.id}:crafted`)) return true;
  }
  return false;
}

function WeaponCheckItem({ item, isChecked, toggle }) {
  const acquiredId = `${item.id}:collected`;
  const craftedId = `${item.id}:crafted`;
  const masteredId = `${item.id}:leveled`;
  const acquired = isChecked(acquiredId);
  const crafted = isChecked(craftedId);
  const mastered = isChecked(masteredId);
  const allDone = acquired && crafted && mastered;
  const wikiSlug = encodeURIComponent(item.name).replace(/%20/g, '_');
  return (
    <div className={`flex items-center gap-3 px-3 py-1.5 rounded transition-colors group ${allDone ? 'text-sf-muted' : 'text-sf-text hover:bg-sf-hover'}`}>
      <span className={`flex-1 text-sm ${allDone ? 'line-through opacity-50' : ''}`}>{item.name}</span>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <label className="flex items-center gap-1 cursor-pointer" title="Acquired">
          <input type="checkbox" checked={acquired} onChange={() => toggle(acquiredId)} />
          <span className="text-[10px] text-sf-muted select-none hidden sm:inline">Acquired</span>
        </label>
        <label className="flex items-center gap-1 cursor-pointer" title="Crafted">
          <input type="checkbox" checked={crafted} onChange={() => toggle(craftedId)} />
          <span className="text-[10px] text-sf-muted select-none hidden sm:inline">Crafted</span>
        </label>
        <label className="flex items-center gap-1 cursor-pointer" title="Mastered">
          <input type="checkbox" checked={mastered} onChange={() => toggle(masteredId)} />
          <span className="text-[10px] text-sf-muted select-none hidden sm:inline">Mastered</span>
        </label>
      </div>
      <a href={`https://wiki.avakot.org/${wikiSlug}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-sf-dim hover:text-sf-bright transition-opacity sm:opacity-0 sm:group-hover:opacity-100" title="View on Wiki"><ExternalLink size={12} /></a>
    </div>
  );
}

function ArmourCheckItem({ item, isChecked, toggle }) {
  const acquiredId = item.id;
  const craftedId = `${item.id}:crafted`;
  const acquired = isChecked(acquiredId);
  const crafted = isChecked(craftedId);
  const allDone = acquired && crafted;
  const wikiSlug = encodeURIComponent(item.name).replace(/%20/g, '_');
  return (
    <div className={`flex items-center gap-3 px-3 py-1.5 rounded transition-colors group ${allDone ? 'text-sf-muted' : 'text-sf-text hover:bg-sf-hover'}`}>
      <span className={`flex-1 text-sm ${allDone ? 'line-through opacity-50' : ''}`}>{item.name}</span>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <label className="flex items-center gap-1.5 cursor-pointer" title="Acquired">
          <input type="checkbox" checked={acquired} onChange={() => toggle(acquiredId)} />
          <span className="text-[10px] text-sf-muted select-none hidden sm:inline">Acquired</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer" title="Crafted">
          <input type="checkbox" checked={crafted} onChange={() => toggle(craftedId)} />
          <span className="text-[10px] text-sf-muted select-none hidden sm:inline">Crafted</span>
        </label>
      </div>
      <a href={`https://wiki.avakot.org/${wikiSlug}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-sf-dim hover:text-sf-bright transition-opacity sm:opacity-0 sm:group-hover:opacity-100" title="View on Wiki"><ExternalLink size={12} /></a>
    </div>
  );
}

function DualCheckItem({ item, isChecked, toggle }) {
  const collectedId = `${item.id}:collected`;
  const leveledId = `${item.id}:leveled`;
  const collected = isChecked(collectedId);
  const leveled = isChecked(leveledId);
  const allDone = collected && leveled;
  const wikiSlug = encodeURIComponent(item.name).replace(/%20/g, '_');
  return (
    <div className={`flex items-center gap-3 px-3 py-1.5 rounded transition-colors group ${allDone ? 'text-sf-muted' : 'text-sf-text hover:bg-sf-hover'}`}>
      <span className={`flex-1 text-sm ${allDone ? 'line-through opacity-50' : ''}`}>{item.name}</span>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <label className="flex items-center gap-1.5 cursor-pointer" title="Collected">
          <input type="checkbox" checked={collected} onChange={() => toggle(collectedId)} />
          <span className="text-[10px] text-sf-muted select-none hidden sm:inline">Collected</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer" title="Leveled">
          <input type="checkbox" checked={leveled} onChange={() => toggle(leveledId)} />
          <span className="text-[10px] text-sf-muted select-none hidden sm:inline">Leveled</span>
        </label>
      </div>
      <a href={`https://wiki.avakot.org/${wikiSlug}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-sf-dim hover:text-sf-bright transition-opacity sm:opacity-0 sm:group-hover:opacity-100" title="View on Wiki"><ExternalLink size={12} /></a>
    </div>
  );
}

function SingleCheckItem({ item, isChecked, toggle }) {
  const checked = isChecked(item.id);
  const wikiSlug = encodeURIComponent(item.name).replace(/%20/g, '_');
  return (
    <label className={`flex items-center gap-3 px-3 py-1.5 rounded cursor-pointer transition-colors group ${checked ? 'text-sf-muted' : 'text-sf-text hover:bg-sf-hover'}`}>
      <input type="checkbox" checked={checked} onChange={() => toggle(item.id)} />
      <span className={`flex-1 text-sm ${checked ? 'line-through opacity-50' : ''}`}>{item.name}</span>
      <a href={`https://wiki.avakot.org/${wikiSlug}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-sf-dim hover:text-sf-bright transition-opacity sm:opacity-0 sm:group-hover:opacity-100" title="View on Wiki"><ExternalLink size={12} /></a>
    </label>
  );
}

function CategoryGroup({ categoryIds, category, isChecked, toggle, getCheckedCount, checkAll, resetSection, renderItem, columnHeaders }) {
  const [isOpen, setIsOpen] = useState(true);
  const checkedCount = getCheckedCount(categoryIds);
  const allDone = categoryIds.length > 0 && checkedCount === categoryIds.length;
  return (
    <div className="mb-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sf-card hover:bg-sf-hover border border-sf-border transition-colors group">
        {isOpen ? <ChevronDown size={16} className="text-sf-muted" /> : <ChevronRight size={16} className="text-sf-muted" />}
        {allDone ? <CheckCircle2 size={16} className="text-sf-bright" /> : <Circle size={16} className="text-sf-dim" />}
        <span className="flex-1 text-left text-sm font-semibold text-sf-text">{category.label}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${allDone ? 'bg-sf-accent/40 text-sf-bright' : 'bg-sf-bg text-sf-muted'}`}>{checkedCount}/{categoryIds.length}</span>
      </button>
      {isOpen && (
        <div className="mt-1 ml-2 pl-4 border-l border-sf-border/50">
          <div className="flex gap-2 mb-2 mt-2">
            <button onClick={() => checkAll(categoryIds)} className="text-[10px] text-sf-muted hover:text-sf-bright px-2 py-0.5 rounded bg-sf-bg hover:bg-sf-hover border border-sf-border transition-colors">Check All</button>
            <button onClick={() => resetSection(categoryIds)} className="text-[10px] text-sf-muted hover:text-red-400 px-2 py-0.5 rounded bg-sf-bg hover:bg-red-950/20 border border-sf-border transition-colors">Uncheck All</button>
          </div>
          {columnHeaders && (
            <div className="flex items-center gap-3 px-3 py-1 text-[9px] text-sf-dim uppercase tracking-wider">
              <span className="flex-1" />
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {columnHeaders.map(h => <span key={h}>{h}</span>)}
              </div>
              <span className="w-3" />
            </div>
          )}
          {category.items.map(item => renderItem(item))}
        </div>
      )}
    </div>
  );
}

const ARMOUR_GROUP_OPTIONS = [
  { value: 'set', label: 'By Set' },
  { value: 'alpha', label: 'A–Z' },
  { value: 'slot', label: 'By Slot' },
  { value: 'attribute', label: 'By Attribute' },
];
const WEAPON_GROUP_OPTIONS = [
  { value: 'type', label: 'By Type' },
  { value: 'slot', label: 'By Slot' },
  { value: 'attribute', label: 'By Attribute' },
];
const HIDE_OPTIONS = [
  { key: 'hideAcquired', label: 'Acquired' },
  { key: 'hideCrafted', label: 'Crafted' },
  { key: 'hideMastered', label: 'Mastered' },
];

export default function Checklist() {
  const [activeSection, setActiveSection] = useState('fables');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [armourGroupBy, setArmourGroupBy] = useState('set');
  const [weaponGroupBy, setWeaponGroupBy] = useState('type');
  const [filters, setFilters] = useState({ hideAcquired: false, hideCrafted: false, hideMastered: false });

  const { toggle, isChecked, getCheckedCount, resetAll, resetSection, checkAll, exportProgress, importProgress, totalChecked } = useProgress();

  const section = gameData[activeSection];
  const sectionIds = getSectionItemIds(activeSection);
  const sectionChecked = getCheckedCount(sectionIds);
  const totalItems = getTotalItems();

  const isCustomSection = activeSection === 'armour' || activeSection === 'weapons';
  const groupByOptions = activeSection === 'armour' ? ARMOUR_GROUP_OPTIONS : WEAPON_GROUP_OPTIONS;
  const currentGroupBy = activeSection === 'armour' ? armourGroupBy : weaponGroupBy;
  const setCurrentGroupBy = activeSection === 'armour' ? setArmourGroupBy : setWeaponGroupBy;

  const displayCategories = useMemo(() => {
    if (!section) return {};
    if (activeSection === 'armour') return buildArmourGroups(section.categories, armourGroupBy);
    if (activeSection === 'weapons') return buildWeaponGroups(section.categories, weaponGroupBy);
    return section.categories;
  }, [section, activeSection, armourGroupBy, weaponGroupBy]);

  const renderItem = useMemo(() => {
    if (activeSection === 'weapons') return (item) => <WeaponCheckItem key={item.id} item={item} isChecked={isChecked} toggle={toggle} />;
    if (activeSection === 'armour') return (item) => <ArmourCheckItem key={item.id} item={item} isChecked={isChecked} toggle={toggle} />;
    if (section?.trackLevel) return (item) => <DualCheckItem key={item.id} item={item} isChecked={isChecked} toggle={toggle} />;
    return (item) => <SingleCheckItem key={item.id} item={item} isChecked={isChecked} toggle={toggle} />;
  }, [activeSection, section, isChecked, toggle]);

  const columnHeaders = (() => {
    if (activeSection === 'weapons') return ['Acquired', 'Crafted', 'Mastered'];
    if (activeSection === 'armour') return ['Acquired', 'Crafted'];
    if (section?.trackLevel) return ['Collected', 'Leveled'];
    return null;
  })();

  const hasActiveFilters = filters.hideAcquired || filters.hideCrafted || filters.hideMastered;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Mobile sidebar toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`lg:hidden fixed bottom-6 z-50 p-3 bg-sf-accent text-sf-bg rounded-full shadow-lg transition-[left,right] duration-200 ${sidebarOpen ? 'right-4 left-auto' : 'left-4 right-auto'}`}>
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/60 z-30" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-14 lg:sticky lg:top-14 lg:self-start z-40 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-64 bg-sf-panel border-r border-sf-border flex flex-col h-[calc(100vh-3.5rem)]`}>
        <div className="p-4 border-b border-sf-border">
          <h2 className="text-xl font-bold text-sf-bright tracking-wider">Progress</h2>
          <p className="text-xs text-sf-muted mt-1 font-sans">Track your journey</p>
          <div className="mt-3"><ProgressBar current={totalChecked} total={totalItems} size="md" /></div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {Object.entries(gameData).map(([key, sec]) => {
            const Icon = iconMap[sec.icon];
            const secIds = getSectionItemIds(key);
            const cnt = getCheckedCount(secIds);
            const active = activeSection === key;
            return (
              <button key={key} onClick={() => { setActiveSection(key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${active ? 'bg-sf-accent/30 text-sf-bright border-r-2 border-sf-bright' : 'text-sf-text hover:bg-sf-hover'}`}>
                {Icon && <Icon size={18} className={active ? 'text-sf-bright' : 'text-sf-muted'} />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{sec.label}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <ProgressBar current={cnt} total={secIds.length} size="sm" />
                    <span className="text-[10px] text-sf-muted whitespace-nowrap">{cnt}/{secIds.length}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sf-border space-y-1">
          <div className="flex gap-1">
            <button onClick={exportProgress} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs text-sf-muted hover:text-sf-bright hover:bg-sf-hover rounded transition-colors"><Download size={14} />Export</button>
            <button onClick={importProgress} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs text-sf-muted hover:text-sf-bright hover:bg-sf-hover rounded transition-colors"><Upload size={14} />Import</button>
          </div>
          <button onClick={() => setShowResetConfirm(true)} className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-sf-muted hover:text-red-400 hover:bg-red-950/20 rounded transition-colors"><RotateCcw size={14} />Reset All</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-3xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sf-bright tracking-widest">{section?.label}</h1>
            <p className="text-sf-muted text-sm mt-1 font-sans">Track your journey through Midrath</p>
          </div>
          <div className="sm:text-right">
            <div className="text-xl sm:text-2xl font-bold text-sf-bright">{Math.round((totalChecked / totalItems) * 100)}%</div>
            <div className="text-xs text-sf-muted">{totalChecked} / {totalItems} items</div>
          </div>
        </div>

        {section && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <div className="mt-2 flex items-center gap-4">
                <div className="flex-1"><ProgressBar current={sectionChecked} total={sectionIds.length} size="md" /></div>
                <div className="flex gap-2">
                  <button onClick={() => checkAll(sectionIds)} className="text-xs text-sf-muted hover:text-sf-bright px-3 py-1 rounded bg-sf-card hover:bg-sf-hover border border-sf-border transition-colors">Check All</button>
                  <button onClick={() => resetSection(sectionIds)} className="text-xs text-sf-muted hover:text-red-400 px-3 py-1 rounded bg-sf-card hover:bg-red-950/20 border border-sf-border transition-colors">Reset</button>
                </div>
              </div>
            </div>

            {/* Group-by and hide controls — weapons and armour only */}
            {isCustomSection && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 px-3 py-2.5 bg-sf-card border border-sf-border rounded-lg">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wider text-sf-dim whitespace-nowrap">Group</span>
                  {groupByOptions.map(opt => (
                    <button key={opt.value} onClick={() => setCurrentGroupBy(opt.value)}
                      className={`text-xs px-2 py-0.5 rounded border transition-colors whitespace-nowrap ${currentGroupBy === opt.value ? 'bg-sf-accent/40 text-sf-bright border-sf-accent/50' : 'bg-sf-bg text-sf-muted border-sf-border hover:text-sf-text hover:bg-sf-hover'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="w-px h-4 bg-sf-border hidden sm:block" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wider text-sf-dim whitespace-nowrap">Hide</span>
                  {HIDE_OPTIONS.map(({ key, label }) => (
                    <button key={key} onClick={() => setFilters(f => ({ ...f, [key]: !f[key] }))}
                      className={`text-xs px-2 py-0.5 rounded border transition-colors whitespace-nowrap ${filters[key] ? 'bg-sf-accent/40 text-sf-bright border-sf-accent/50' : 'bg-sf-bg text-sf-muted border-sf-border hover:text-sf-text hover:bg-sf-hover'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {Object.entries(displayCategories).map(([catKey, cat]) => {
                const allCatIds = cat.items.flatMap(item => getItemAllIds(item, activeSection));
                const visibleItems = isCustomSection && hasActiveFilters
                  ? cat.items.filter(item => !shouldHideItem(item, activeSection, filters, isChecked))
                  : cat.items;
                if (isCustomSection && hasActiveFilters && visibleItems.length === 0) return null;
                return (
                  <CategoryGroup
                    key={catKey}
                    categoryIds={allCatIds}
                    category={{ ...cat, items: visibleItems }}
                    isChecked={isChecked}
                    toggle={toggle}
                    getCheckedCount={getCheckedCount}
                    checkAll={checkAll}
                    resetSection={resetSection}
                    renderItem={renderItem}
                    columnHeaders={columnHeaders}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-sf-panel border border-sf-border rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-sf-bright mb-2">Reset All Progress?</h3>
            <p className="text-sf-muted text-sm mb-6">This will uncheck all items across every section. This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2 text-sm text-sf-text bg-sf-card border border-sf-border rounded-lg hover:bg-sf-hover transition-colors">Cancel</button>
              <button onClick={() => { resetAll(); setShowResetConfirm(false); }} className="px-4 py-2 text-sm text-red-300 bg-red-950/40 border border-red-900/50 rounded-lg hover:bg-red-950/60 transition-colors">Reset Everything</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
