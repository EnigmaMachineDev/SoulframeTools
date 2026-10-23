import React, { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

// Cycles the site theme: match system → light → dark. The state lives in
// public/theme.js (window.siteTheme), which runs before React so the first
// paint is already in the right palette.
const ORDER = ['system', 'light', 'dark'];
const META = {
  system: { icon: Monitor, label: 'Match system' },
  light: { icon: Sun, label: 'Light' },
  dark: { icon: Moon, label: 'Dark' },
};

export default function ThemeToggle({ className = '' }) {
  const [pref, setPref] = useState(() => window.siteTheme?.get() ?? 'system');

  useEffect(() => window.siteTheme?.subscribe((p) => setPref(p)), []);

  const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
  const { icon: Icon, label } = META[pref];

  return (
    <button
      type="button"
      onClick={() => window.siteTheme?.set(next)}
      title={`Theme: ${label} — switch to ${META[next].label.toLowerCase()}`}
      aria-label={`Theme: ${label}. Switch to ${META[next].label.toLowerCase()}.`}
      className={className}
    >
      <Icon size={18} />
    </button>
  );
}
