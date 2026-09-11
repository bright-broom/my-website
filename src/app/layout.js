import { Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'

config.autoAddCss = false

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const notoSansJp = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-jp', preload: false })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

// Runs before first paint so the saved (or system) theme applies without a flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}`

export const metadata = {
  title: 'Toshiki Sakuta',
  description: 'Cloud & Security Engineer based in Osaka, Japan.',
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
}

export default function RootLayout({ children }) {
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
  )
}
