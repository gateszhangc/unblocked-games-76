const fs = require('fs');
const path = require('path');
const https = require('https');

// 获取命令行参数中的游戏名称
const gameSlug = process.argv[2];

if (!gameSlug) {
  console.error('请提供游戏名称，例如: node scripts/fetchGamePage.js plonky');
  process.exit(1);
}

console.log(`正在获取 ${gameSlug} 的游戏页面...`);

// 创建游戏目录
const gameDir = path.join(process.cwd(), 'data', 'games', gameSlug);
if (!fs.existsSync(gameDir)) {
  fs.mkdirSync(gameDir, { recursive: true });
}

const url = `https://poki.ee/g/${gameSlug}`;

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractHead(html) {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    return headMatch[1];
  }
  return '';
}

function extractBody(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1];
  }
  return '';
}

async function main() {
  try {
    const html = await fetchPage(url);

    const headContent = extractHead(html);
    const bodyContent = extractBody(html);

    // 保存head内容
    fs.writeFileSync(
      path.join(gameDir, 'head.html'),
      headContent,
      'utf8'
    );

    // 保存body内容
    fs.writeFileSync(
      path.join(gameDir, 'body.html'),
      bodyContent,
      'utf8'
    );

    // 保存完整的原始HTML
    fs.writeFileSync(
      path.join(gameDir, 'original.html'),
      html,
      'utf8'
    );

    console.log(`✅ 成功获取 ${gameSlug} 的游戏页面数据！`);
    console.log(`📁 文件已保存到: ${gameDir}`);
    console.log(`🌐 现在可以访问: http://localhost:3000/g/${gameSlug}`);

  } catch (error) {
    console.error('❌ 获取页面失败:', error.message);
    process.exit(1);
  }
}

main();