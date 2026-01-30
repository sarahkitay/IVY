import type { Metadata, Viewport } from 'next'
import './globals.css'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://ivy-workbook.vercel.app'),
  title: 'Ivy Workbook',
  description: 'Marketing as Value Architecture - A Strategic Decision-Making Environment',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Ivy Workbook',
    statusBarStyle: 'default',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Ivy Workbook',
    description: 'Marketing as Value Architecture - A Strategic Decision-Making Environment',
    images: ['/logo.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#c9a227',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
