import React, { useState, useMemo } from 'react';
import { Shield, Search, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { ARMOUR_HELMS, ARMOUR_CUIRASSES, ARMOUR_LEGGINGS, ARMOUR_SETS } from '../data/armour';

const ALL_PIECES = [...ARMOUR_HELMS, ...ARMOUR_CUIRASSES, ...ARMOUR_LEGGINGS];
const SET_NAMES = ARMOUR_SETS.map(s => s.name);

export default function ArmourReference() {
  const [search, setSearch] = useState('');
  const [filterSlot, setFilterSlot] = useState('All');
  const [filterSet, setFilterSet] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  function handleSort(key) {
    if (sortBy === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir(key === 'name' || key === 'set' || key === 'slot' ? 'asc' : 'desc');
    }
  }

  function SortIcon({ col }) {
    if (sortBy !== col) return <ChevronUp size={10} className="ml-0.5 opacity-20 inline" />;
    return sortDir === 'asc'
      ? <ChevronUp size={10} className="ml-0.5 text-sf-bright inline" />
      : <ChevronDown size={10} className="ml-0.5 text-sf-bright inline" />;
  }

  const filtered = useMemo(() => {
    let list = [...ALL_PIECES];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.setName.toLowerCase().includes(q));
    }
    if (filterSlot !== 'All') list = list.filter(p => p.slot === filterSlot);
    if (filterSet !== 'All') list = list.filter(p => p.setName === filterSet);

    list = list.map(p => ({ ...p, totalArmour: p.physDef + p.magDef }));

    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'set') cmp = a.setName.localeCompare(b.setName) || a.slot.localeCompare(b.slot);
      else if (sortBy === 'slot') cmp = a.slot.localeCompare(b.slot);
      else if (sortBy === 'phys') cmp = a.physDef - b.physDef;
      else if (sortBy === 'mag') cmp = a.magDef - b.magDef;
      else if (sortBy === 'stab') cmp = a.stability - b.stability;
      else if (sortBy === 'total') cmp = a.totalArmour - b.totalArmour;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [search, filterSlot, filterSet, sortBy, sortDir]);

  const fmtAttune = (a) => {
    if (!a) return '-';
    const parts = [a.courage > 0 && `C${a.courage}`, a.spirit > 0 && `S${a.spirit}`, a.grace > 0 && `G${a.grace}`].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : '-';
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-sf-bright tracking-widest mb-2">Armour Reference</h1>
        <p className="text-sf-muted text-sm font-sans">All armour pieces with defense stats and attunement details</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sf-muted" />
          <input
            type="text"
            placeholder="Search armour pieces or sets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-sf-card border border-sf-border rounded-lg pl-9 pr-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-accent font-sans"
          />
        </div>
        <select value={filterSlot} onChange={e => setFilterSlot(e.target.value)} className="bg-sf-card border border-sf-border rounded-lg px-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer">
          <option value="All">All Slots</option>
          <option value="Helm">Helms</option>
          <option value="Cuirass">Cuirasses</option>
          <option value="Leggings">Leggings</option>
        </select>
        <select value={filterSet} onChange={e => setFilterSet(e.target.value)} className="bg-sf-card border border-sf-border rounded-lg px-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-accent cursor-pointer">
          <option value="All">All Sets</option>
          {SET_NAMES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="text-xs text-sf-muted mb-3 font-sans">{filtered.length} pieces — click column headers to sort</div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="border-b border-sf-border text-[10px] uppercase tracking-wider text-sf-muted">
              {[['name','Name','left'],['set','Set','left'],['slot','Slot','left'],['phys','Phys','right'],['mag','Magick','right'],['total','Total Armour','right'],['stab','Stability','right']].map(([key, label, align]) => (
                <th key={key} className={`py-2 px-2 text-${align} cursor-pointer hover:text-sf-text select-none ${key === 'name' ? 'px-3' : ''} ${sortBy === key ? 'text-sf-bright' : ''}`} onClick={() => handleSort(key)}>{label}<SortIcon col={key} /></th>
              ))}
              <th className="py-2 px-2 text-left">Phys Attune</th>
              <th className="py-2 px-2 text-left">Mag Attune</th>
              <th className="py-2 px-2 text-left">Stab Attune</th>
              <th className="py-2 px-2 text-left">Req</th>
              <th className="py-2 px-1"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const reqStr = Object.entries(p.virtueReq || {}).map(([v, val]) => `${v.charAt(0).toUpperCase()}${val}`).join(' ') || '-';
              const wikiSlug = encodeURIComponent(p.name).replace(/%20/g, '_');
              const slotColor = p.slot === 'Helm' ? 'bg-sf-accent/20 text-sf-green' : p.slot === 'Cuirass' ? 'bg-purple-900/20 text-purple-300' : 'bg-blue-900/20 text-blue-300';
              return (
                <tr key={p.name} className="border-b border-sf-border/30 hover:bg-sf-hover transition-colors">
                  <td className="py-2 px-3 font-medium text-sf-bright">{p.name}</td>
                  <td className="py-2 px-2 text-sf-muted">{p.setName}</td>
                  <td className="py-2 px-2"><span className={`text-[10px] px-1.5 py-0.5 rounded ${slotColor}`}>{p.slot}</span></td>
                  <td className="py-2 px-2 text-right text-orange-300">{p.physDef}</td>
                  <td className="py-2 px-2 text-right text-purple-300">{p.magDef}</td>
                  <td className="py-2 px-2 text-right text-sf-green font-medium">{p.totalArmour}</td>
                  <td className="py-2 px-2 text-right text-blue-300">{p.stability}</td>
                  <td className="py-2 px-2 text-sf-muted text-xs">{fmtAttune(p.attunement?.physical)}</td>
                  <td className="py-2 px-2 text-sf-muted text-xs">{fmtAttune(p.attunement?.magick)}</td>
                  <td className="py-2 px-2 text-sf-muted text-xs">{fmtAttune(p.attunement?.stability)}</td>
                  <td className="py-2 px-2 text-sf-muted text-xs">{reqStr}</td>
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
