import React from 'react';
import { Link } from 'react-router-dom';
import { Dices, Sword, Shield, CheckSquare, Wrench } from 'lucide-react';

const tools = [
  { path: '/build', label: 'Build Planner', desc: 'Plan your build with virtue calculations, weapon DPS, armour defense, totems, runes, and joineries.', icon: Wrench, color: 'from-amber-900/40 to-sf-card' },
  { path: '/checklist', label: 'Checklist', desc: 'Track your journey through Midrath. Check off fables, weapons, armour, pacts, runes, and cosmetics.', icon: CheckSquare, color: 'from-green-900/40 to-sf-card' },
  { path: '/weapons', label: 'Weapon Reference', desc: 'Browse all weapons with full stats including damage, attack speed, attunement, and virtue requirements.', icon: Sword, color: 'from-red-900/40 to-sf-card' },
  { path: '/armour', label: 'Armour Reference', desc: 'View all armour pieces with physical, magick, and stability defense values plus attunement details.', icon: Shield, color: 'from-blue-900/40 to-sf-card' },
  { path: '/random', label: 'Loadout Randomizer', desc: 'Generate random Soulframe loadouts with filters for prisms, weapons, pacts, and armour.', icon: Dices, color: 'from-purple-900/40 to-sf-card' },
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-sf-bright tracking-widest mb-4">
          Soulframe Tools
        </h1>
        <p className="text-sf-muted text-lg font-sans max-w-2xl mx-auto">
          A collection of community-made tools for Soulframe players. Randomize loadouts, reference weapon and armour stats, track your progress, and plan your builds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(({ path, label, desc, icon: Icon, color }) => (
          <Link
            key={path}
            to={path}
            className={`group bg-gradient-to-br ${color} border border-sf-border rounded-xl p-6 hover:border-sf-green transition-all duration-200 hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-sf-accent/30 flex items-center justify-center group-hover:bg-sf-accent/50 transition-colors">
                <Icon size={20} className="text-sf-bright" />
              </div>
              <h2 className="text-lg font-bold text-sf-bright tracking-wide">{label}</h2>
            </div>
            <p className="text-sm text-sf-muted font-sans leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-xs text-sf-muted font-sans">
          Data sourced from <a href="https://wiki.avakot.org" target="_blank" rel="noopener noreferrer" className="text-sf-bright hover:underline">wiki.avakot.org</a>.
          Soulframe is developed by Digital Extremes. This is a fan-made project.
        </p>
      </div>
    </main>
  );
}
