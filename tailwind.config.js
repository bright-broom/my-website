/** @type {import('tailwindcss').Config} */

// Color values live in src/app/globals.css (per theme); this file exposes them as utilities
// and defines the rest of the design system: type scale, radii, shadows and motion.
const color = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: color('bg'), subtle: color('bg-subtle') },
        surface: color('surface'),
        fg: { DEFAULT: color('fg'), muted: color('fg-muted'), subtle: color('fg-subtle') },
        border: { DEFAULT: color('border'), strong: color('border-strong') },
        accent: { DEFAULT: color('accent'), hover: color('accent-hover'), fg: color('accent-fg') },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'var(--font-jp)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3rem, 1.4rem + 6.4vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
        heading: ['clamp(2rem, 1.5rem + 2vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        title: ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.125rem, 1rem + 0.4vw, 1.3125rem)', { lineHeight: '1.7' }],
        label: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
      },
      borderRadius: {
        control: '0.5rem',
        card: '1rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--color-shadow) / 0.04), 0 12px 32px -16px rgb(var(--color-shadow) / 0.18)',
      },
      maxWidth: {
        content: '72rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
