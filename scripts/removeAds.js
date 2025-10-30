const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, '..', 'data', 'games');
const games = fs.readdirSync(gamesDir);

let count = 0;

games.forEach(slug => {
  const bodyPath = path.join(gamesDir, slug, 'body.html');
  
  if (fs.existsSync(bodyPath)) {
    let content = fs.readFileSync(bodyPath, 'utf8');
    
    // 移除广告相关的 div 块
    content = content.replace(/<div[^>]*id="ad-700x100"[^>]*>[\s\S]*?<\/div>/gi, '');
    content = content.replace(/<div[^>]*id="ad-400x400-1"[^>]*>[\s\S]*?<\/div>/gi, '');
    content = content.replace(/<div[^>]*id="ad-400x400-2"[^>]*>[\s\S]*?<\/div>/gi, '');
    content = content.replace(/<div[^>]*id="overlayVid"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, '');
    content = content.replace(/<div[^>]*id="ad-box"[^>]*>[\s\S]*?<\/div>/gi, '');
    
    // 移除 adsbygoogle 相关代码
    content = content.replace(/<script[^>]*src="[^"]*adsbygoogle[^"]*"[^>]*>[\s\S]*?<\/script>/gi, '');
    content = content.replace(/<ins[^>]*class="adsbygoogle"[^>]*>[\s\S]*?<\/ins>/gi, '');
    content = content.replace(/<!--\s*drivemad\d+x\d+\s*-->/gi, '');
    content = content.replace(/<script>\s*\(adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\]\)\.push\(\{\}\);\s*<\/script>/gi, '');
    
    fs.writeFileSync(bodyPath, content, 'utf8');
    count++;
  }
});

console.log(`✓ 已移除 ${count} 个游戏页面的广告代码`);
