const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// 获取待复刻的游戏列表
const pendingGames = Array.from(uniqueSlugs).filter(slug => !replicatedGames.has(slug)).sort();

console.log(`总游戏数: ${uniqueSlugs.size}`);
console.log(`已完成: ${replicatedGames.size}`);
console.log(`待复刻: ${pendingGames.length}\n`);

if (pendingGames.length === 0) {
  console.log('✓ 所有游戏已复刻完成！');
  process.exit(0);
}

// 询问是否开始批量复刻
console.log('准备复刻以下游戏:');
pendingGames.slice(0, 10).forEach((slug, i) => {
  console.log(`  ${i + 1}. ${slug}`);
});
if (pendingGames.length > 10) {
  console.log(`  ... 还有 ${pendingGames.length - 10} 个游戏\n`);
}

// 开始复刻
let successCount = 0;
let failCount = 0;
const failedGames = [];

console.log('\n注意: 每个游戏复刻后需要通过测试才能标记为完成');
console.log('测试方法: 使用 Chrome DevTools 对比本地和原始网站\n');

for (let i = 0; i < pendingGames.length; i++) {
  const slug = pendingGames[i];
  console.log(`\n[${i + 1}/${pendingGames.length}] 正在复刻: ${slug}`);
  
  try {
    execSync(`node scripts/fetchGamePage.js ${slug}`, {
      stdio: 'inherit',
      timeout: 30000 // 30秒超时
    });
    
    console.log(`\n✓ 复刻完成: ${slug}`);
    console.log(`本地: http://localhost:3000/g/${slug}`);
    console.log(`原始: https://poki.ee/g/${slug}`);
    console.log('请使用 Chrome DevTools 测试后确认\n');
    
    successCount++;
    
    // 更新进度文档
    execSync('node scripts/extractGames.js', { stdio: 'pipe' });
    
  } catch (error) {
    console.error(`✗ 复刻失败: ${slug}`);
    failCount++;
    failedGames.push(slug);
  }
  
  // 每复刻5个游戏暂停一下
  if ((i + 1) % 5 === 0) {
    console.log(`\n--- 已完成 ${i + 1}/${pendingGames.length} ---`);
    console.log(`成功: ${successCount}, 失败: ${failCount}\n`);
  }
}

// 最终报告
console.log('\n========== 复刻完成 ==========');
console.log(`成功: ${successCount}`);
console.log(`失败: ${failCount}`);
console.log(`总计: ${pendingGames.length}`);

if (failedGames.length > 0) {
  console.log('\n失败的游戏:');
  failedGames.forEach(slug => console.log(`  - ${slug}`));
}

console.log('\n✓ 进度已更新到 GAMES_PROGRESS.md');
