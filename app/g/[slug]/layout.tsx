import '../../globals.css'
import { readFileSync } from 'fs'
import { join } from 'path'

export default function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  let headContent = ''
  try {
    headContent = readFileSync(
      join(process.cwd(), 'data', 'games', params.slug, 'head.html'),
      'utf8'
    )
  } catch (e) {
    console.log(`Game ${params.slug} head not found`)
  }

  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: headContent }} />
      <body>{children}</body>
    </html>
  )
}
