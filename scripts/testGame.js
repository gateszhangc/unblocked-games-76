// 测试单个游戏的脚本
// 用法: node scripts/testGame.js <game-slug>

const slug = process.argv[2];

if (!slug) {
  console.error('请提供游戏 slug');
  console.error('用法: node scripts/testGame.js <game-slug>');
  process.exit(1);
}

console.log(`\n========== 测试游戏: ${slug} ==========\n`);
console.log(`本地地址: http://localhost:3000/g/${slug}`);
console.log(`原始地址: https://poki.ee/g/${slug}`);
console.log('\n请使用 Chrome DevTools 进行以下测试:');
console.log('1. 打开两个页面进行对比');
console.log('2. 检查游戏是否正常加载');
console.log('3. 检查页面布局是否一致');
console.log('4. 测试游戏功能是否正常');
console.log('\n如果测试通过，该游戏将被标记为已完成。');
