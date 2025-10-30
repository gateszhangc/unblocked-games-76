# Poki.ee 网站复刻项目

这个项目用于学习研究目的，复刻 https://poki.ee 网站。

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 获取网站内容

下载 poki.ee 的 HTML：
```powershell
Invoke-WebRequest https://poki.ee -UseBasicParsing | Out-File poki_home.html -Encoding utf8
```

提取 head 和 body 内容：
```bash
node -e "const fs=require('fs');const path=require('path');if(!fs.existsSync('data'))fs.mkdirSync('data');const html=fs.readFileSync('poki_home.html','utf8');const headMatch=html.match(/<head>([\s\S]*?)<\/head>/i);const bodyMatch=html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);if(headMatch)fs.writeFileSync(path.join('data','home-head.html'),headMatch[1].trim());if(bodyMatch)fs.writeFileSync(path.join('data','home-body.html'),bodyMatch[1].trim());console.log('✓ Extracted head and body');"
```

生成静态快照：
```bash
node scripts/updateOriginalHtml.js
```

### 3. 运行开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看复刻的网站。

### 4. 构建生产版本
```bash
npm run build
npm run start
```

## 视觉对比测试

### 安装 Playwright
```bash
npx playwright install chromium
```

### 截图对比
1. 确保生产服务器在运行：
```bash
npm run start
```

2. 捕获截图（在另一个终端）：
```bash
node scripts/captureScreenshots.js
```

3. 生成差异图：
```bash
node scripts/compareScreenshots.js
```

4. 分析差异区域（可选）：
```bash
node scripts/analyzeRawDiff.js
```

截图保存在 `screenshots/` 目录：
- `original.png` - 原始网站
- `clone.png` - 复刻版本
- `diff.png` - 差异对比图

## 项目结构

```
.
├── app/
│   ├── layout.tsx      # 注入 head 内容
│   ├── page.tsx        # 渲染 body 内容
│   └── globals.css     # Tailwind CSS
├── data/
│   ├── home-head.html  # 提取的 head 内容
│   └── home-body.html  # 提取的 body 内容
├── public/
│   └── original.html   # 完整的静态快照
├── scripts/
│   ├── updateOriginalHtml.js    # 生成静态快照
│   ├── captureScreenshots.js    # 截图工具
│   ├── compareScreenshots.js    # 对比工具
│   └── analyzeRawDiff.js        # 差异分析
└── screenshots/        # 截图输出目录
```

## 注意事项

- 由于原网站可能加载广告、分析脚本等动态内容，即使禁用 JavaScript，也可能存在 2-3% 的像素差异
- 本项目仅用于学习研究目的
- 定期重新同步以获取最新的网站内容

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Playwright (截图)
- Pixelmatch (图像对比)
