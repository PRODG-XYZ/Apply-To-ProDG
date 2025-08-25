import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProDG Applications',
  description: 'Join the ProDG team! Apply now to be part of our innovative development team.',
  keywords: ['ProDG', 'jobs', 'careers', 'developer', 'application', 'team'],
  authors: [{ name: 'ProDG' }],
  creator: 'ProDG',
  publisher: 'ProDG',
  
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  
  manifest: '/manifest.json',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apply.prodg.com',
    title: 'ProDG Applications - Join Our Team',
    description: 'Join the ProDG team! Apply now to be part of our innovative development team.',
    siteName: 'ProDG Applications',
    images: [
      {
        url: '/favicon.svg',
        width: 222,
        height: 252,
        alt: 'ProDG Logo',
        type: 'image/svg+xml',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@prodg',
    creator: '@prodg',
    title: 'ProDG Applications - Join Our Team',
    description: 'Join the ProDG team! Apply now to be part of our innovative development team.',
    images: ['/favicon.svg'],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}