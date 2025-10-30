const fs = require('fs');
const path = require('path');

// 读取 home-body.html
const htmlPath = path.join(process.cwd(), 'data', 'home-body.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// 提取所有游戏链接
const gameLinks = html.match(/href="\/g\/([^"]+)"/g);
const uniqueSlugs = new Set();

if (gameLinks) {
  gameLinks.forEach(link => {
    const match = link.match(/href="\/g\/([^"]+)"/);
    if (match) {
      uniqueSlugs.add(match[1]);
    }
  });
}

// 检查哪些游戏已经复刻
const gamesDir = path.join(process.cwd(), 'data', 'games');
const replicatedGames = new Set();

if (fs.existsSync(gamesDir)) {
  const dirs = fs.readdirSync(gamesDir);
  dirs.forEach(dir => {
    const dirPath = path.join(gamesDir, dir);
    if (fs.statSync(dirPath).isDirectory()) {
      replicatedGames.add(dir);
    }
  });
}

// 生成报告
console.log(`总游戏数: ${uniqueSlugs.size}`);
console.log(`已复刻: ${replicatedGames.size}`);
console.log(`待复刻: ${uniqueSlugs.size - replicatedGames.size}\n`);

// 按字母顺序排序
const sortedSlugs = Array.from(uniqueSlugs).sort();

// 输出列表
console.log('游戏列表:\n');
sortedSlugs.forEach((slug, index) => {
  const status = replicatedGames.has(slug) ? '✓ 已完成' : '⏳ 待完成';
  console.log(`${index + 1}. ${slug} - ${status}`);
});

// 生成 Markdown 文档
const markdown = `# 游戏复刻进度

**统计信息:**
- 总游戏数: ${uniqueSlugs.size}
- 已完成: ${replicatedGames.size}
- 待完成: ${uniqueSlugs.size - replicatedGames.size}
- 完成率: ${((replicatedGames.size / uniqueSlugs.size) * 100).toFixed(1)}%

## 游戏列表

${sortedSlugs.map((slug, index) => {
  const status = replicatedGames.has(slug) ? '✅' : '⬜';
  return `${index + 1}. ${status} [${slug}](https://poki.ee/g/${slug})`;
}).join('\n')}

## 使用说明

复刻单个游戏:
\`\`\`bash
node scripts/fetchGamePage.js <game-slug>
\`\`\`

批量复刻所有待完成游戏:
\`\`\`bash
node scripts/replicateAll.js
\`\`\`
`;

fs.writeFileSync('GAMES_PROGRESS.md', markdown);
console.log('\n✓ 已生成 GAMES_PROGRESS.md 文档');
