import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ivy Workbook',
  description: 'Marketing as Value Architecture - A Strategic Decision-Making Environment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
