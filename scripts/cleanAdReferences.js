const fs = require('fs');
const path = require('path');

// 只处理 plonky 游戏
const bodyPath = path.join(__dirname, '..', 'data', 'games', 'plonky', 'body.html');

if (fs.existsSync(bodyPath)) {
  let content = fs.readFileSync(bodyPath, 'utf8');
  
  // 移除 overlayVid 相关的 JavaScript 函数
  content = content.replace(/<script>\s*function hiddenPopup\(\)\{[\s\S]*?document\.getElementById\("popupPlay"\)\.addEventListener\("click", hiddenPopup\);\s*<\/script>/gi, '');
  
  // 移除 ad-box 相关的注释代码
  content = content.replace(/<script>\s*\/\/\s*document\.addEventListener\("DOMContentLoaded"[\s\S]*?\/\/ \}\);\s*<\/script>/gi, '');
  
  fs.writeFileSync(bodyPath, content, 'utf8');
  console.log('✓ 已清理 plonky 页面的广告引用代码');
} else {
  console.log('✗ 未找到 plonky 游戏页面');
}
