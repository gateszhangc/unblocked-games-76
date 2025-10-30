import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'

export default function GamePage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  
  let bodyContent = ''
  try {
    bodyContent = readFileSync(
      join(process.cwd(), 'data', 'games', slug, 'body.html'),
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

  return <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
}
