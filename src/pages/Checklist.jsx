import React, { useState } from 'react';
import { Menu, X, BookOpen, Sword, Shield, Gem, Flame, Sparkles, Map, Palette, Diamond, RotateCcw, Download, Upload, ChevronDown, ChevronRight, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { gameData, getSectionItemIds, getCategoryItemIds, getTotalItems, getAllItemIds, getItemTrackingIds } from '../data/gameData';
import ProgressBar from '../components/ProgressBar';

const iconMap = { BookOpen, Sword, Shield, Gem, Flame, Sparkles, Map, Palette, Diamond };

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
      <div className="flex items-center gap-4 shrink-0">
        <label className="flex items-center gap-1.5 cursor-pointer" title="Collected">
          <input type="checkbox" checked={collected} onChange={() => toggle(collectedId)} />
          <span className="text-[10px] text-sf-muted select-none hidden sm:inline">Collected</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer" title="Leveled">
          <input type="checkbox" checked={leveled} onChange={() => toggle(leveledId)} />
          <span className="text-[10px] text-sf-muted select-none hidden sm:inline">Leveled</span>
        </label>
      </div>
      <a href={`https://wiki.avakot.org/${wikiSlug}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="opacity-0 group-hover:opacity-100 text-sf-dim hover:text-sf-bright transition-opacity" title="View on Wiki"><ExternalLink size={12} /></a>
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
      <a href={`https://wiki.avakot.org/${wikiSlug}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="opacity-0 group-hover:opacity-100 text-sf-dim hover:text-sf-bright transition-opacity" title="View on Wiki"><ExternalLink size={12} /></a>
    </label>
  );
}

function CategoryGroup({ sectionKey, categoryKey, category, isChecked, toggle, getCheckedCount, checkAll, resetSection, trackLevel }) {
  const [isOpen, setIsOpen] = useState(true);
  const categoryIds = getCategoryItemIds(sectionKey, categoryKey);
  const checkedCount = getCheckedCount(categoryIds);
  const allDone = checkedCount === categoryIds.length;
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
          {trackLevel && (
            <div className="flex items-center gap-3 px-3 py-1 text-[10px] text-sf-dim uppercase tracking-wider">
              <span className="flex-1" />
              <div className="flex items-center gap-4 shrink-0">
                <span className="w-[72px] text-center hidden sm:block">Collected</span>
                <span className="w-[56px] text-center hidden sm:block">Leveled</span>
              </div>
              <span className="w-3" />
            </div>
          )}
          {category.items.map(item => trackLevel
            ? <DualCheckItem key={item.id} item={item} isChecked={isChecked} toggle={toggle} />
            : <SingleCheckItem key={item.id} item={item} isChecked={isChecked} toggle={toggle} />
          )}
        </div>
      )}
    </div>
  );
}

export default function Checklist() {
  const [activeSection, setActiveSection] = useState('fables');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { toggle, isChecked, getCheckedCount, resetAll, resetSection, checkAll, exportProgress, importProgress, totalChecked } = useProgress();

  const section = gameData[activeSection];
  const sectionIds = getSectionItemIds(activeSection);
  const sectionChecked = getCheckedCount(sectionIds);
  const totalItems = getTotalItems();

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Mobile sidebar toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-sf-accent text-sf-bg rounded-full shadow-lg">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/60 z-30" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static z-40 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-64 bg-sf-panel border-r border-sf-border flex flex-col h-[calc(100vh-3.5rem)] sticky top-14`}>
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
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-3xl mx-auto mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-sf-bright tracking-widest">{section?.label}</h1>
            <p className="text-sf-muted text-sm mt-1 font-sans">Track your journey through Midrath</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-sf-bright">{Math.round((totalChecked / totalItems) * 100)}%</div>
            <div className="text-xs text-sf-muted">{totalChecked} / {totalItems} items</div>
          </div>
        </div>

        {section && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="mt-2 flex items-center gap-4">
                <div className="flex-1"><ProgressBar current={sectionChecked} total={sectionIds.length} size="md" /></div>
                <div className="flex gap-2">
                  <button onClick={() => checkAll(sectionIds)} className="text-xs text-sf-muted hover:text-sf-bright px-3 py-1 rounded bg-sf-card hover:bg-sf-hover border border-sf-border transition-colors">Check All</button>
                  <button onClick={() => resetSection(sectionIds)} className="text-xs text-sf-muted hover:text-red-400 px-3 py-1 rounded bg-sf-card hover:bg-red-950/20 border border-sf-border transition-colors">Reset</button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {Object.entries(section.categories).map(([catKey, category]) => (
                <CategoryGroup key={catKey} sectionKey={activeSection} categoryKey={catKey} category={category} isChecked={isChecked} toggle={toggle} getCheckedCount={getCheckedCount} checkAll={checkAll} resetSection={resetSection} trackLevel={!!section.trackLevel} />
              ))}
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
