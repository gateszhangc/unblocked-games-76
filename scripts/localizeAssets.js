const fs = require('fs');
const path = require('path');

function localizeAssets(filePath) {
  console.log(`处理: ${path.basename(filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 将 poki.ee 的静态资源路径替换为本地路径
  // 但保留游戏图片等外部资源（通常在其他域名）
  content = content.replace(/https:\/\/poki\.ee\/(static|js|css|themes)\//g, '/$1/');
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ 已本地化`);
}

const files = [
  path.join(process.cwd(), 'data', 'home-head.html'),
  path.join(process.cwd(), 'data', 'home-body.html'),
];

console.log('正在本地化静态资源路径...\n');

files.forEach(file => {
  if (fs.existsSync(file)) {
    localizeAssets(file);
  }
});

console.log('\n完成！所有静态资源路径已本地化');
