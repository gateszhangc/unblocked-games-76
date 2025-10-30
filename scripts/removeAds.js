const fs = require('fs');
const path = require('path');

const slug = process.argv[2];

if (!slug) {
  console.error('请提供游戏 slug');
  process.exit(1);
}

const bodyPath = path.join(process.cwd(), 'data', 'games', slug, 'body.html');

if (!fs.existsSync(bodyPath)) {
  console.error(`文件不存在: ${bodyPath}`);
  process.exit(1);
}

let content = fs.readFileSync(bodyPath, 'utf8');

// 删除 overlayVid 广告容器
content = content.replace(/<div id="overlayVid"[^>]*>[\s\S]*?<\/div>\s*<\/div>/g, '');

// 删除其他广告相关元素
content = content.replace(/<div id="ad-box"[^>]*>[\s\S]*?<\/div>/g, '');

// 删除 Google AdSense 脚本
content = content.replace(/<script[^>]*pagead2\.googlesyndication\.com[^>]*>[\s\S]*?<\/script>/g, '');
content = content.replace(/<ins class="adsbygoogle"[^>]*>[\s\S]*?<\/ins>/g, '');

fs.writeFileSync(bodyPath, content);

console.log(`✓ 已从 ${slug} 游戏页面删除广告`);
