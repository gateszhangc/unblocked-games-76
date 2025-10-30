const https = require('https');
const fs = require('fs');
const path = require('path');

// 从命令行获取游戏 slug
const slug = process.argv[2];

if (!slug) {
  console.error('请提供游戏 slug，例如: node scripts/fetchGamePage.js 18-wheeler-accident-lawyer-atlanta');
  process.exit(1);
}

const url = `https://poki.ee/g/${slug}`;
const gameDir = path.join(process.cwd(), 'data', 'games', slug);

console.log(`正在下载: ${url}`);

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`错误: HTTP ${res.statusCode}`);
    process.exit(1);
  }

  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // 创建目录
    if (!fs.existsSync(gameDir)) {
      fs.mkdirSync(gameDir, { recursive: true });
    }

    // 保存完整 HTML
    fs.writeFileSync(path.join(gameDir, 'original.html'), data);
    console.log('✓ 下载完成');
    
    // 提取 head
    const headMatch = data.match(/<head>([\s\S]*?)<\/head>/i);
    if (headMatch) {
      fs.writeFileSync(path.join(gameDir, 'head.html'), headMatch[1].trim());
      console.log('✓ 提取 head');
    }
    
    // 提取 body
    const bodyMatch = data.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      let bodyContent = bodyMatch[1].trim();
      
      // 替换链接：将 poki.ee 的链接改为本地链接
      bodyContent = bodyContent.replace(/https?:\/\/poki\.ee\//g, '/');
      bodyContent = bodyContent.replace(/href="\/g\//g, 'href="/g/');
      
      fs.writeFileSync(path.join(gameDir, 'body.html'), bodyContent);
      console.log('✓ 提取 body 并替换链接');
    }
    
    console.log(`\n游戏页面已保存到: data/games/${slug}/`);
    console.log(`访问地址: http://localhost:3000/g/${slug}`);
  });
}).on('error', (err) => {
  console.error('错误:', err.message);
  process.exit(1);
});
