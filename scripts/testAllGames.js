const fs = require('fs');
const path = require('path');

// 获取所有已复刻的游戏
const gamesDir = path.join(process.cwd(), 'data', 'games');
const replicatedGames = [];

if (fs.existsSync(gamesDir)) {
  const dirs = fs.readdirSync(gamesDir);
  dirs.forEach(dir => {
    const dirPath = path.join(gamesDir, dir);
    if (fs.statSync(dirPath).isDirectory()) {
      replicatedGames.push(dir);
    }
  });
}

replicatedGames.sort();

console.log(`\n========== 游戏测试清单 ==========`);
console.log(`总共需要测试: ${replicatedGames.length} 个游戏\n`);

console.log('测试步骤：');
console.log('1. 使用 Chrome DevTools 打开两个标签页');
console.log('2. 左侧打开本地版本');
console.log('3. 右侧打开原始网站');
console.log('4. 对比游戏加载和功能\n');

console.log('游戏列表：\n');

replicatedGames.forEach((slug, index) => {
  console.log(`${index + 1}. ${slug}`);
  console.log(`   本地: http://localhost:3000/g/${slug}`);
  console.log(`   原始: https://poki.ee/g/${slug}`);
  console.log('');
});

console.log('\n========== 测试完成后 ==========');
console.log('运行以下命令更新进度：');
console.log('node scripts/extractGames.js');
