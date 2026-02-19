import React, { useState, useMemo } from 'react';
import { Sword, Search, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { WEAPONS, COMBAT_ARTS } from '../data/weapons';

const COLUMNS = [
  { key: 'name', label: 'Name', align: 'left', sortable: true },
  { key: 'slot', label: 'Slot', align: 'left', sortable: true },
  { key: 'combatArt', label: 'Art', align: 'left', sortable: true },
  { key: 'damageType', label: 'Type', align: 'left', sortable: true },
  { key: 'rank0Damage', label: 'R0 Atk', align: 'right', sortable: true },
  { key: 'baseDamage', label: 'R30 Atk', align: 'right', sortable: true },
  { key: 'attackSpeed', label: 'Speed', align: 'right', sortable: true },
  { key: 'dps', label: 'Base DPS', align: 'right', sortable: true },
  { key: 'charged', label: 'Charged', align: 'right', sortable: true },
  { key: 'smiteChance', label: 'Smite%', align: 'right', sortable: true },
  { key: 'staggerDamage', label: 'Stagger', align: 'right', sortable: true },
  { key: 'attunement', label: 'Attunement', align: 'left', sortable: false },
  { key: 'virtueReq', label: 'Req', align: 'left', sortable: false },
  { key: 'location', label: 'Location', align: 'left', sortable: false },
  { key: 'wiki', label: '', align: 'left', sortable: false },
];

export default function WeaponReference() {
  const [search, setSearch] = useState('');
  const [filterArt, setFilterArt] = useState('All');
  const [filterSlot, setFilterSlot] = useState('All');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(key === 'name' || key === 'slot' || key === 'combatArt' || key === 'damageType' ? 'asc' : 'desc');
    }
  }

  const filtered = useMemo(() => {
    let list = WEAPONS.map(w => ({ ...w, dps: w.baseDamage * w.attackSpeed, charged: w.baseDamage * 2 }));
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(w => w.name.toLowerCase().includes(q));
    }
    if (filterArt !== 'All') list = list.filter(w => w.combatArt === filterArt);
    if (filterSlot !== 'All') list = list.filter(w => w.slot === filterSlot);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'slot') cmp = a.slot.localeCompare(b.slot);
      else if (sortKey === 'combatArt') cmp = a.combatArt.localeCompare(b.combatArt);
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

      <div className="text-xs text-sf-muted mb-3 font-sans">{filtered.length} weapons</div>

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
                  <td className="py-2 px-2 text-sf-muted">{w.damageType}</td>
                  <td className="py-2 px-2 text-right text-sf-text">{w.rank0Damage}</td>
                  <td className="py-2 px-2 text-right text-sf-bright">{w.baseDamage}</td>
                  <td className="py-2 px-2 text-right text-sf-text">{w.attackSpeed}</td>
                  <td className="py-2 px-2 text-right text-sf-green font-medium">{w.dps.toFixed(1)}</td>
                  <td className="py-2 px-2 text-right text-amber-300">{w.charged}</td>
                  <td className="py-2 px-2 text-right text-sf-text">{w.smiteChance}%</td>
                  <td className="py-2 px-2 text-right text-sf-text">{w.staggerDamage}</td>
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
    </main>
  );
}
