const fs = require('fs');
const path = require('path');

// 读取 plonky 的 body.html
const bodyPath = path.join(process.cwd(), 'data', 'games', 'plonky', 'body.html');
const bodyContent = fs.readFileSync(bodyPath, 'utf8');

// 提取所有游戏链接
const gameLinks = [...bodyContent.matchAll(/href="\/g\/([^"]+)"/g)];
const uniqueSlugs = [...new Set(gameLinks.map(match => match[1]))];

console.log(`总共找到 ${uniqueSlugs.length} 个游戏链接\n`);

// 检查哪些游戏还没有下载
const missingGames = [];
const existingGames = [];

uniqueSlugs.forEach(slug => {
  const gameDir = path.join(process.cwd(), 'data', 'games', slug);
  const bodyFile = path.join(gameDir, 'body.html');
  
  if (fs.existsSync(bodyFile)) {
    existingGames.push(slug);
  } else {
    missingGames.push(slug);
  }
});

console.log(`已下载: ${existingGames.length} 个游戏`);
console.log(`未下载: ${missingGames.length} 个游戏\n`);

// 生成报告
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const reportContent = `# 游戏下载状态报告

生成时间: ${new Date().toLocaleString('zh-CN')}

## 统计信息

- 总游戏数: ${uniqueSlugs.length}
- 已下载: ${existingGames.length}
- 未下载: ${missingGames.length}
- 完成度: ${((existingGames.length / uniqueSlugs.length) * 100).toFixed(2)}%

## 未下载的游戏列表 (${missingGames.length} 个)

${missingGames.map((slug, index) => `${index + 1}. ${slug}`).join('\n')}

## 已下载的游戏列表 (${existingGames.length} 个)

${existingGames.map((slug, index) => `${index + 1}. ${slug}`).join('\n')}

## 下载命令

### 批量下载所有缺失游戏:
\`\`\`bash
node scripts/downloadMissingGames.js
\`\`\`

### 分批下载 (推荐):
\`\`\`bash
# 每次下载 20 个
node scripts/downloadMissingGames.js 20
\`\`\`

### 下载单个游戏:
\`\`\`bash
node scripts/fetchGamePage.js <游戏slug>
\`\`\`
`;

// 保存报告
const reportPath = path.join(process.cwd(), 'MISSING_GAMES_REPORT.md');
fs.writeFileSync(reportPath, reportContent);

console.log(`报告已保存到: MISSING_GAMES_REPORT.md`);

// 同时输出到控制台
console.log('\n未下载的游戏:');
console.log('='.repeat(50));
missingGames.slice(0, 20).forEach((slug, index) => {
  console.log(`${index + 1}. ${slug}`);
});

if (missingGames.length > 20) {
  console.log(`... 还有 ${missingGames.length - 20} 个游戏`);
  console.log('\n完整列表请查看: MISSING_GAMES_REPORT.md');
}
