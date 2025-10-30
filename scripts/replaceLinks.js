const fs = require('fs');
const path = require('path');

const homeBodyPath = path.join(process.cwd(), 'data', 'home-body.html');

console.log('正在替换首页链接...');

let content = fs.readFileSync(homeBodyPath, 'utf8');

// 替换游戏链接 https://poki.ee/g/ -> /g/
content = content.replace(/href="https:\/\/poki\.ee\/g\//g, 'href="/g/');

// 替换分类链接 https://poki.ee/category -> /category
content = content.replace(/href="https:\/\/poki\.ee\//g, 'href="/');

fs.writeFileSync(homeBodyPath, content);

console.log('✓ 链接替换完成');
console.log('所有 poki.ee 链接已替换为本地路由');
