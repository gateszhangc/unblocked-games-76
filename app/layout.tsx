import './globals.css'
import { readFileSync } from 'fs'
import { join } from 'path'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let headContent = ''
  try {
    headContent = readFileSync(join(process.cwd(), 'data', 'home-head.html'), 'utf8')
  } catch (e) {
    console.log('home-head.html not found, using default')
  }

  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: headContent }} />
      <body>{children}</body>
    </html>
  )
}
