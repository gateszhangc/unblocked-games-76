const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 读取 plonky 的 body.html
const bodyPath = path.join(process.cwd(), 'data', 'games', 'plonky', 'body.html');
const bodyContent = fs.readFileSync(bodyPath, 'utf8');

// 提取所有游戏链接
const gameLinks = [...bodyContent.matchAll(/href="\/g\/([^"]+)"/g)];
const uniqueSlugs = [...new Set(gameLinks.map(match => match[1]))];

console.log(`找到 ${uniqueSlugs.length} 个游戏链接`);

// 检查哪些游戏还没有下载
const missingGames = uniqueSlugs.filter(slug => {
  const gameDir = path.join(process.cwd(), 'data', 'games', slug);
  const bodyFile = path.join(gameDir, 'body.html');
  return !fs.existsSync(bodyFile);
});

console.log(`需要下载 ${missingGames.length} 个游戏\n`);

if (missingGames.length === 0) {
  console.log('所有游戏都已下载！');
  process.exit(0);
}

// 获取命令行参数：限制下载数量
const limit = process.argv[2] ? parseInt(process.argv[2]) : missingGames.length;
const gamesToDownload = missingGames.slice(0, limit);

console.log(`本次将下载 ${gamesToDownload.length} 个游戏\n`);

// 批量下载
let successCount = 0;
let failCount = 0;
const failedGames = [];

for (let i = 0; i < gamesToDownload.length; i++) {
  const slug = gamesToDownload[i];
  console.log(`\n[${i + 1}/${gamesToDownload.length}] 下载: ${slug}`);
  console.log('='.repeat(50));
  
  try {
    execSync(`node scripts/fetchGamePage.js ${slug}`, {
      stdio: 'inherit',
      timeout: 30000 // 30秒超时
    });
    successCount++;
    
    // 添加延迟避免请求过快
    if (i < gamesToDownload.length - 1) {
      console.log('\n等待 2 秒...');
      const { spawnSync } = require('child_process');
      spawnSync('ping', ['127.0.0.1', '-n', '3'], { stdio: 'ignore' });
    }
  } catch (error) {
    console.error(`\n✗ 下载失败: ${slug}`);
    failCount++;
    failedGames.push(slug);
  }
}

console.log('\n' + '='.repeat(50));
console.log('下载完成！');
console.log('='.repeat(50));
console.log(`成功: ${successCount}`);
console.log(`失败: ${failCount}`);
console.log(`剩余: ${missingGames.length - gamesToDownload.length}`);

if (failedGames.length > 0) {
  console.log('\n失败的游戏:');
  failedGames.forEach(slug => console.log(`  - ${slug}`));
}

if (missingGames.length > gamesToDownload.length) {
  console.log(`\n提示: 还有 ${missingGames.length - gamesToDownload.length} 个游戏未下载`);
  console.log('运行以下命令继续下载:');
  console.log(`  node scripts/downloadMissingGames.js ${limit}`);
}
