import colors from 'tailwindcss/colors'

// Theme colors are CSS variables (space-separated RGB channels, so opacity
// modifiers like bg-sf-accent/30 keep working). src/index.css defines them:
// :root is the light theme, [data-theme="dark"] the original dark green.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sf: {
          bg: token('sf-bg'),
          panel: token('sf-panel'),
          card: token('sf-card'),
          border: token('sf-border'),
          hover: token('sf-hover'),
          accent: token('sf-accent'),
          green: token('sf-green'),
          bright: token('sf-bright'),
          text: token('sf-text'),
          muted: token('sf-muted'),
          dim: token('sf-dim'),
        },
        courage: {
          DEFAULT: token('courage'),
          light: token('courage-light'),
        },
        spirit: {
          DEFAULT: token('spirit'),
          light: token('spirit-light'),
        },
        grace: {
          DEFAULT: token('grace'),
          light: token('grace-light'),
        },
        // The handful of stock Tailwind shades used as accent TEXT on the dark
        // ground are pale tints that vanish on white, so each is a variable that
        // deepens in the light theme; the 900s behind the tinted washes and chips
        // lighten instead, so a wash stays a wash (values in src/index.css).
        red: { ...colors.red, 300: token('tw-red-300'), 400: token('tw-red-400'), 900: token('tw-red-900') },
        amber: { ...colors.amber, 300: token('tw-amber-300'), 400: token('tw-amber-400'), 900: token('tw-amber-900') },
        orange: { ...colors.orange, 300: token('tw-orange-300'), 400: token('tw-orange-400'), 900: token('tw-orange-900') },
        cyan: { ...colors.cyan, 400: token('tw-cyan-400') },
        yellow: { ...colors.yellow, 400: token('tw-yellow-400') },
        green: { ...colors.green, 400: token('tw-green-400'), 900: token('tw-green-900') },
        emerald: { ...colors.emerald, 300: token('tw-emerald-300') },
        blue: { ...colors.blue, 300: token('tw-blue-300'), 900: token('tw-blue-900') },
        purple: { ...colors.purple, 300: token('tw-purple-300'), 400: token('tw-purple-400'), 900: token('tw-purple-900') },
        gray: { ...colors.gray, 300: token('tw-gray-300') },
      }
    },
  },
  plugins: [],
}
