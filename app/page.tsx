import { readFileSync } from 'fs'
import { join } from 'path'

export default function Home() {
  let bodyContent = ''
  try {
    bodyContent = readFileSync(join(process.cwd(), 'data', 'home-body.html'), 'utf8')
  } catch (e) {
    bodyContent = '<div style="padding: 2rem; text-align: center;"><h1>请先运行同步脚本获取网站内容</h1><p>参考 REPLICATION.md 中的步骤</p></div>'
  }

  return <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
}
