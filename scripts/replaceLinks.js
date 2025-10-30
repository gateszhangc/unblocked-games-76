const fs = require('fs');
const path = require('path');

const homeBodyPath = path.join(process.cwd(), 'data', 'home-body.html');

console.log('正在替换首页链接...');

let content = fs.readFileSync(homeBodyPath, 'utf8');

// 只替换 href 中的链接，不替换 src（图片、脚本等资源）
// 替换游戏链接 https://poki.ee/g/ -> /g/
content = content.replace(/href="https:\/\/poki\.ee\/g\//g, 'href="/g/');

// 替换分类链接 https://poki.ee/category -> /category
// 但要排除 src 属性
content = content.replace(/href="https:\/\/poki\.ee\/([^"]+)"/g, 'href="/$1"');

fs.writeFileSync(homeBodyPath, content);

console.log('✓ 链接替换完成');
console.log('所有 poki.ee 的 href 链接已替换为本地路由');
console.log('图片和资源路径保持不变，继续从原网站加载');
