const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('=== 检查图片文件 ===\n');

const imagePath = path.join(process.cwd(), 'public', 'static', 'img', 'logo', '685909868Poki-Unblocked.png');

if (fs.existsSync(imagePath)) {
  const stats = fs.statSync(imagePath);
  console.log('✓ 图片文件存在');
  console.log(`  路径: ${imagePath}`);
  console.log(`  大小: ${stats.size} bytes`);
} else {
  console.log('✗ 图片文件不存在');
  console.log(`  路径: ${imagePath}`);
}

console.log('\n=== 测试 HTTP 访问 ===\n');

const testUrl = 'http://localhost:3000/static/img/logo/685909868Poki-Unblocked.png';

http.get(testUrl, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`Content-Type: ${res.headers['content-type']}`);
  
  if (res.statusCode === 200) {
    console.log('✓ 图片可以正常访问');
  } else {
    console.log('✗ 图片访问失败');
  }
}).on('error', (err) => {
  console.log('✗ 请求失败:', err.message);
});
