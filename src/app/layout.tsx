import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';

config.autoAddCss = false;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  adjustFontFallback: false,
  fallback: ['Inter Fallback'],
});
const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jp',
  preload: false,
  adjustFontFallback: false,
  fallback: ['Noto Sans JP Fallback'],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  adjustFontFallback: false,
  fallback: ['JetBrains Mono Fallback'],
});

// Runs before first paint so the saved (or system) theme applies without a flash.
// Keep this function self-contained: its compiled JavaScript runs in the browser before hydration.
function initializeTheme(): void {
  try {
    const saved = localStorage.getItem('theme');
    const theme =
      saved === 'light' || saved === 'dark'
        ? saved
        : matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    document.documentElement.dataset.theme = theme;
  } catch {}
}

const themeScript = `(${initializeTheme.toString()})()`;

export const metadata: Metadata = {
  title: 'Toshiki Sakuta',
  description: 'Cloud & Security Engineer based in Tokyo, Japan.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansJp.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
