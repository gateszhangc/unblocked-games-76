const fs = require('fs');
const path = require('path');

// 只处理 plonky 游戏
const bodyPath = path.join(__dirname, '..', 'data', 'games', 'plonky', 'body.html');

if (fs.existsSync(bodyPath)) {
  let content = fs.readFileSync(bodyPath, 'utf8');
  
  // 移除 play-frame 元素（包括内部的所有内容）
  content = content.replace(/<div class="play-frame hidden">[\s\S]*?<\/div>\s*<\/div>/i, '');
  
  fs.writeFileSync(bodyPath, content, 'utf8');
  console.log('✓ 已移除 plonky 页面的 play-frame 白框');
} else {
  console.log('✗ 未找到 plonky 游戏页面');
}
