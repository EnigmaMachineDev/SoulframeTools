import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Sword, Shield, Dices, CheckSquare, Wrench, Home } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/build', label: 'Build Planner', icon: Wrench },
  { path: '/checklist', label: 'Checklist', icon: CheckSquare },
  { path: '/weapons', label: 'Weapon Reference', icon: Sword },
  { path: '/armour', label: 'Armour Reference', icon: Shield },
  { path: '/random', label: 'Loadout Randomizer', icon: Dices },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-sf-bg">
      {/* Top nav */}
      <header className="sticky top-0 z-50 bg-sf-panel/95 backdrop-blur-sm border-b border-sf-border">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sf-accent to-sf-green flex items-center justify-center">
              <Sword size={16} className="text-sf-bg" />
            </div>
            <span className="text-lg font-bold text-sf-bright tracking-wider hidden sm:inline">Soulframe Tools</span>
            <span className="text-lg font-bold text-sf-bright tracking-wider sm:hidden">SF Tools</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    active
                      ? 'bg-sf-accent/30 text-sf-bright'
                      : 'text-sf-muted hover:text-sf-text hover:bg-sf-hover'
                  }`}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-sf-muted hover:text-sf-bright transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-sf-border bg-sf-panel px-4 py-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? 'bg-sf-accent/30 text-sf-bright'
                      : 'text-sf-muted hover:text-sf-text hover:bg-sf-hover'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Page content */}
      <Outlet />

      {/* Footer */}
      <footer className="border-t border-sf-border mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-sf-muted font-sans">
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <Link to="/about" className="hover:text-sf-bright transition-colors">About</Link>
            <Link to="/contact" className="hover:text-sf-bright transition-colors">Contact</Link>
            <Link to="/privacy-policy" className="hover:text-sf-bright transition-colors">Privacy Policy</Link>
            <a href="https://buymeacoffee.com/EnigmaMachineDev" target="_blank" rel="noopener noreferrer" className="hover:text-sf-bright transition-colors">☕ Buy me a coffee</a>
          </div>
          <p>Soulframe Tools &mdash; Data sourced from <a href="https://wiki.avakot.org" target="_blank" rel="noopener noreferrer" className="text-sf-bright hover:underline">wiki.avakot.org</a></p>
          <p className="mt-1">Soulframe is developed by Digital Extremes. This is a fan-made tool.</p>
          <p className="mt-1">Built by <strong className="text-sf-bright">EnigmaMachineDev</strong></p>
        </div>
      </footer>
    </div>
  );
}
