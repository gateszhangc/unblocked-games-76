const https = require('https');
const fs = require('fs');
const path = require('path');

// 从 HTML 中提取所有 poki.ee 的静态资源 URL
function extractAssetUrls(htmlContent) {
  const urls = new Set();
  
  // 匹配 src 和 href 中的 poki.ee 资源
  const patterns = [
    /src="(https:\/\/poki\.ee\/[^"]+)"/g,
    /href="(https:\/\/poki\.ee\/[^"]+\.(?:css|js|png|jpg|jpeg|gif|svg|ico))"/g,
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(htmlContent)) !== null) {
      urls.add(match[1]);
    }
  });
  
  return Array.from(urls);
}

// 下载单个文件
function downloadFile(url, localPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(localPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else if (res.statusCode === 301 || res.statusCode === 302) {
        // 处理重定向
        downloadFile(res.headers.location, localPath).then(resolve).catch(reject);
      } else {
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

// 主函数
async function downloadAssets() {
  console.log('正在扫描 HTML 文件...');
  
  // 获取命令行参数中的游戏 slug
  const gameSlug = process.argv[2];
  
  let files = [];
  
  if (gameSlug) {
    // 如果指定了游戏 slug，只扫描该游戏的文件
    const gameDir = path.join(process.cwd(), 'data', 'games', gameSlug);
    files = [
      path.join(gameDir, 'head.html'),
      path.join(gameDir, 'body.html'),
    ];
    console.log(`扫描游戏: ${gameSlug}`);
  } else {
    // 否则扫描首页文件
    files = [
      path.join(process.cwd(), 'data', 'home-head.html'),
      path.join(process.cwd(), 'data', 'home-body.html'),
    ];
    console.log('扫描首页文件');
  }
  
  const allUrls = new Set();
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const urls = extractAssetUrls(content);
      urls.forEach(url => allUrls.add(url));
    }
  });
  
  console.log(`找到 ${allUrls.size} 个静态资源`);
  
  let downloaded = 0;
  let failed = 0;
  
  for (const url of allUrls) {
    try {
      // 将 URL 转换为本地路径
      const urlPath = url.replace('https://poki.ee/', '');
      const localPath = path.join(process.cwd(), 'public', urlPath);
      
      // 检查文件是否已存在
      if (fs.existsSync(localPath)) {
        console.log(`跳过（已存在）: ${urlPath}`);
        continue;
      }
      
      console.log(`下载: ${urlPath}`);
      await downloadFile(url, localPath);
      downloaded++;
    } catch (err) {
      console.error(`失败: ${url} - ${err.message}`);
      failed++;
    }
  }
  
  console.log(`\n完成！`);
  console.log(`成功: ${downloaded} 个`);
  console.log(`失败: ${failed} 个`);
  console.log(`跳过: ${allUrls.size - downloaded - failed} 个`);
}

downloadAssets().catch(console.error);
