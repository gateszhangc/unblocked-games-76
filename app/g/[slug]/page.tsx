import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

export function generateStaticParams() {
  try {
    const gamesDir = join(process.cwd(), 'data', 'games')
    const games = readdirSync(gamesDir)
    return games.map((slug) => ({ slug }))
  } catch (e) {
    return []
  }
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  
  let bodyContent = ''
  let headContent = ''
  
  try {
    bodyContent = readFileSync(
      join(process.cwd(), 'data', 'games', slug, 'body.html'),
      'utf8'
    )
    headContent = readFileSync(
      join(process.cwd(), 'data', 'games', slug, 'head.html'),
      'utf8'
    )
  } catch (e) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>游戏页面未找到</h1>
        <p>请先运行: node scripts/fetchGamePage.js {slug}</p>
        <a href="/">返回首页</a>
      </div>
    )
  }

  // 提取 head 中的 style 和 link 标签
  const styles = extractStyles(headContent)
  const links = extractLinks(headContent)

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: links }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  )
}

function extractStyles(headContent: string): string {
  const styleMatches = headContent.match(/<style[^>]*>[\s\S]*?<\/style>/gi)
  return styleMatches ? styleMatches.join('\n') : ''
}

function extractLinks(headContent: string): string {
  const linkMatches = headContent.match(/<link[^>]*>/gi)
  return linkMatches ? linkMatches.join('\n') : ''
}
