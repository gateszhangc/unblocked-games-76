const fs = require('fs');
const path = require('path');

const headPath = path.join(process.cwd(), 'data', 'home-head.html');
let head = fs.readFileSync(headPath, 'utf8');

// 移除 Google Analytics
head = head.replace(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js[^"]*"><\/script>/g, '');
head = head.replace(/<script>[\s\S]*?gtag[\s\S]*?<\/script>/g, '');

// 移除 Google AdSense
head = head.replace(/<script[^>]*pagead2\.googlesyndication\.com[^>]*><\/script>/g, '');

// 移除其他可能的广告脚本
head = head.replace(/<script[^>]*adsbygoogle[^>]*>[\s\S]*?<\/script>/g, '');

// 注释掉而不是删除，以便调试
console.log('Cleaned head content from tracking and ad scripts');

fs.writeFileSync(headPath, head);
console.log('✓ Updated data/home-head.html');
