import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-sf-bright tracking-widest mb-6">About</h1>

      <div className="space-y-6 text-sm leading-relaxed font-sans">
        <p>
          <strong className="text-sf-bright">Soulframe Tools</strong> is a free, community-made collection of tools
          designed to help players in{' '}
          <a href="https://www.soulframe.com" target="_blank" rel="noopener noreferrer" className="text-sf-bright underline hover:text-sf-green transition-colors">Soulframe</a>,
          the free-to-play MMORPG by Digital Extremes.
        </p>

        <p>
          This site consolidates several standalone Soulframe tools into one place: a loadout randomizer,
          weapon and armour reference tables, a progress tracker checklist, and a full build planner with
          DPS calculations.
        </p>

        <h2 className="text-xl font-bold text-sf-bright tracking-wider pt-4">Features</h2>
        <ul className="list-disc list-inside space-y-1 text-sf-text">
          <li>Loadout Randomizer &mdash; generate random builds with prisms, weapons, pacts, and armour</li>
          <li>Weapon Reference &mdash; browse all weapons with full stats, sorting, and filtering</li>
          <li>Armour Reference &mdash; view all armour sets with defense values and attunement details</li>
          <li>Progress Tracker &mdash; check off fables, weapons, armour, pacts, runes, locations, and cosmetics</li>
          <li>Build Planner &mdash; plan builds with virtue calculations, weapon DPS, totems, runes, and joineries</li>
          <li>All progress data is saved locally in your browser &mdash; nothing is sent to any server</li>
        </ul>

        <h2 className="text-xl font-bold text-sf-bright tracking-wider pt-4">Data Sources</h2>
        <p>
          Game data is sourced from community wikis and resources, primarily{' '}
          <a href="https://wiki.avakot.org" target="_blank" rel="noopener noreferrer" className="text-sf-bright underline hover:text-sf-green transition-colors">wiki.avakot.org</a>.
          This is a fan-made project and is not affiliated with or endorsed by Digital Extremes.
        </p>

        <h2 className="text-xl font-bold text-sf-bright tracking-wider pt-4">Created By</h2>
        <p>
          Built by <strong className="text-sf-bright">EnigmaMachineDev</strong>. If you find these tools helpful, consider{' '}
          <a href="https://buymeacoffee.com/EnigmaMachineDev" target="_blank" rel="noopener noreferrer" className="text-sf-bright underline hover:text-sf-green transition-colors">buying me a coffee</a>.
        </p>
      </div>
    </main>
  );
}
