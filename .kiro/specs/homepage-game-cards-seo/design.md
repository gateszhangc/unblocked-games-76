# 设计文档

## 概述

本设计文档详细说明了如何为Unblocked Games 76首页游戏卡片添加SEO优化的游戏描述文案,并优化卡片布局以更好地展示游戏信息。设计遵循以下核心原则:

1. **SEO优化**: 自然融入"unblocked games 76"及相关关键词,提升搜索引擎排名
2. **用户体验**: 清晰的视觉层次和易读的文案,帮助用户快速了解游戏
3. **响应式设计**: 在桌面端和移动端都能完美展示
4. **性能优先**: 保持现有的加载速度和交互性能

## 架构

### 数据流架构

```
游戏数据源 (HOME_GAMES_LIST.md)
    ↓
游戏描述数据文件 (data/game-descriptions.json)
    ↓
Next.js 服务端渲染 (app/page.tsx)
    ↓
HTML 输出 (data/home-body.html)
    ↓
浏览器渲染
```

### 组件层次结构

```
首页容器
├── 导航栏
├── 游戏网格容器 (.m-grid-start)
│   └── 游戏卡片 (.m-game-card) [多个]
│       ├── 游戏链接 (.m-game-link)
│       │   └── 游戏缩略图 (.m-game-thumbnail)
│       │       └── 游戏详情容器 (.m-game-details)
│       │           ├── 游戏名称 (<p>)
│       │           └── 游戏描述 (<p class="game-description">) [新增]
└── 页脚
```

## 组件和接口

### 1. 游戏描述数据结构

创建新的JSON数据文件存储游戏描述:

**文件路径**: `data/game-descriptions.json`


```json
{
  "slope": {
    "name": "Slope",
    "description": "Race down endless slopes in this fast-paced 3D running game. One of the most popular unblocked games 76 titles, Slope challenges your reflexes as you dodge obstacles at high speed. Play now for free, no download required!",
    "keywords": ["unblocked games", "free games", "3D running", "online games"],
    "category": "running"
  },
  "happy-wheels": {
    "name": "Happy Wheels",
    "description": "Experience the hilarious ragdoll physics in Happy Wheels, a fan-favorite unblocked game. Navigate deadly obstacle courses with unique characters in this free online game. 100% unblocked at school!",
    "keywords": ["unblocked games 76", "ragdoll physics", "obstacle course", "free to play"],
    "category": "action"
  }
  // ... 更多游戏描述
}
```

**接口定义**:

```typescript
interface GameDescription {
  name: string;           // 游戏名称
  description: string;    // 40-60词的SEO优化描述
  keywords: string[];     // 相关SEO关键词数组
  category: string;       // 游戏分类
}

interface GameDescriptions {
  [gameSlug: string]: GameDescription;
}
```

### 2. HTML结构更新

**当前结构**:
```html
<div class="m-game-card">
  <a class="m-game-link" href="/g/slope">
    <picture class="m-game-thumbnail" style="background-image: url(...)">
      <div class="m-game-details">
        <p>Slope</p>
      </div>
    </picture>
  </a>
</div>
```

**新结构**:
```html
<article class="m-game-card" itemscope itemtype="https://schema.org/Game">
  <a class="m-game-link" href="/g/slope" itemprop="url">
    <picture class="m-game-thumbnail" style="background-image: url(...)">
      <img src="..." alt="Slope - Unblocked Games 76" itemprop="image" style="display:none;" />
    </picture>
    <div class="m-game-details">
      <h3 class="game-title" itemprop="name">Slope</h3>
      <p class="game-description" itemprop="description">
        Race down endless slopes in this fast-paced 3D running game. 
        One of the most popular unblocked games 76 titles, Slope challenges 
        your reflexes as you dodge obstacles at high speed. Play now for free, 
        no download required!
      </p>
    </div>
  </a>
</article>
```

**关键变更**:
- 使用 `<article>` 替代 `<div>` 提升语义化
- 添加 Schema.org 微数据标记
- 游戏名称使用 `<h3>` 标签
- 新增 `.game-description` 段落
- 图片添加 SEO 友好的 alt 属性

### 3. CSS样式设计


**文件路径**: 在 `data/home-head.html` 中添加内联样式,或创建新的CSS文件

```css
/* 游戏卡片基础样式增强 */
.m-game-card {
  /* 保持现有样式,增加高度以容纳描述 */
  min-height: 320px; /* 从原来的约250px增加到320px */
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.m-game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* 游戏详情容器 */
.m-game-details {
  padding: 12px;
  background: white;
  border-radius: 0 0 8px 8px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 游戏标题样式 */
.game-title {
  font-size: 16px;
  font-weight: 700;
  color: #002b50;
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 游戏描述样式 */
.game-description {
  font-size: 13px;
  line-height: 1.5;
  color: #5a5a5a;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 限制为3行 */
  -webkit-box-orient: vertical;
}

/* 响应式设计 - 移动端 */
@media (max-width: 768px) {
  .m-game-card {
    min-height: 280px;
  }
  
  .game-title {
    font-size: 14px;
  }
  
  .game-description {
    font-size: 12px;
    line-height: 1.4;
    -webkit-line-clamp: 2; /* 移动端限制为2行 */
  }
  
  .m-game-details {
    padding: 10px;
    gap: 6px;
  }
}

/* 大卡片样式 (data-card-size="md") */
.m-game-card[data-card-size="md"] {
  grid-column: span 2;
  min-height: 340px;
}

.m-game-card[data-card-size="md"] .game-description {
  -webkit-line-clamp: 4; /* 大卡片显示更多内容 */
}
```

### 4. SEO关键词集成策略

基于 `seo/` 目录中的SEMrush数据,设计关键词融入策略:

**高优先级关键词** (来自 broad-match keywords):
- "unblocked games 76"
- "unblocked games"
- "free online games"
- "games at school"
- "no download games"

**游戏特定关键词融入规则**:

1. **热门游戏** (如Slope, Happy Wheels, Geometry Dash):
   - 必须包含 "unblocked games 76" 或 "unblocked games"
   - 融入游戏类型关键词 (如 "3D running", "ragdoll physics")
   - 回答常见问题 (如 "how to play", "is it free")

2. **中等热度游戏**:
   - 包含 "free online games" 或 "play online"
   - 强调 "no download" 或 "browser-based"
   - 突出游戏类型和特点

3. **新游戏/长尾游戏**:
   - 使用语义相关词 (如 "browser games", "web games")
   - 强调 "100% free" 和 "unblocked at school"
   - 关联到热门游戏类型

**关键词密度控制**:
- 每个描述 (40-60词) 包含 1-2 个主关键词
- 整体页面关键词密度保持在 1-2%
- 避免关键词堆砌,保持自然语言流畅度


## 数据模型

### 游戏描述生成模板

为了高效生成200+游戏的SEO描述,设计以下模板系统:

```typescript
interface DescriptionTemplate {
  pattern: string;
  variables: string[];
  keywords: string[];
}

// 示例模板
const templates = {
  running: {
    pattern: "{action} in {gameName}, a {adjective} {gameType} game. {uniqueFeature}. {cta} on unblocked games 76 - {benefit}!",
    variables: ["action", "gameName", "adjective", "gameType", "uniqueFeature", "cta", "benefit"],
    keywords: ["unblocked games 76", "free", "no download"]
  },
  puzzle: {
    pattern: "Challenge your mind with {gameName}, {description}. {feature}. Play this free puzzle game unblocked at school - {benefit}!",
    variables: ["gameName", "description", "feature", "benefit"],
    keywords: ["unblocked games", "free puzzle game", "at school"]
  }
  // ... 更多分类模板
};
```

### 游戏元数据扩展

扩展现有游戏数据结构:

```typescript
interface GameMetadata {
  slug: string;              // 游戏URL slug
  name: string;              // 游戏名称
  thumbnailUrl: string;      // 缩略图URL
  category: string;          // 游戏分类
  featured: boolean;         // 是否为特色游戏
  cardSize?: 'md' | 'lg';   // 卡片尺寸
  
  // 新增SEO字段
  description: string;       // SEO优化描述
  keywords: string[];        // 关键词数组
  altText: string;          // 图片alt文本
  schemaType: string;       // Schema.org类型
}
```

## 错误处理

### 1. 描述数据缺失处理

```typescript
function getGameDescription(gameSlug: string): string {
  const descriptions = loadGameDescriptions();
  
  if (descriptions[gameSlug]) {
    return descriptions[gameSlug].description;
  }
  
  // 降级策略: 使用默认模板
  return generateDefaultDescription(gameSlug);
}

function generateDefaultDescription(gameSlug: string): string {
  const gameName = formatGameName(gameSlug);
  return `Play ${gameName} free online on unblocked games 76. 
          Enjoy this exciting game with no download required. 
          100% unblocked at school!`;
}
```

### 2. 图片加载失败处理

```html
<picture class="m-game-thumbnail" style="background-image: url(...)">
  <img 
    src="..." 
    alt="..." 
    onerror="this.parentElement.style.backgroundImage='url(/static/img/placeholder.png)'"
  />
</picture>
```

### 3. 长文本溢出处理

使用CSS `text-overflow: ellipsis` 和 `-webkit-line-clamp` 确保文本不会破坏布局:

```css
.game-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
}
```

## 测试策略

### 1. 视觉回归测试

**测试目标**: 确保新布局在不同设备和浏览器上正确显示

**测试用例**:
- 桌面端 (1920x1080, 1366x768)
- 平板端 (768x1024)
- 移动端 (375x667, 414x896)
- 不同浏览器 (Chrome, Firefox, Safari, Edge)

**验证点**:
- 卡片高度一致性
- 文本不溢出
- 悬停效果正常
- 响应式断点正确

### 2. SEO验证测试

**测试目标**: 验证SEO优化效果

**测试用例**:
- 关键词密度检查 (应在1-2%范围内)
- Schema.org标记验证 (使用Google Rich Results Test)
- Alt文本完整性检查
- 语义HTML标签正确使用

**工具**:
- Google Search Console
- Lighthouse SEO审计
- Schema.org验证器

### 3. 性能测试

**测试目标**: 确保添加描述不影响页面性能

**测试指标**:
- 首次内容绘制 (FCP) < 1.8s
- 最大内容绘制 (LCP) < 2.5s
- 累积布局偏移 (CLS) < 0.1
- 首次输入延迟 (FID) < 100ms

**测试方法**:
- Lighthouse性能审计
- WebPageTest
- Chrome DevTools Performance面板


### 4. 内容质量测试

**测试目标**: 确保游戏描述质量和SEO效果

**测试用例**:
- 描述长度验证 (40-60词)
- 关键词自然融入检查
- 语法和拼写检查
- 可读性评分 (Flesch Reading Ease > 60)

**验证方法**:
- 人工审核前20个热门游戏描述
- 使用Grammarly或类似工具检查语法
- 使用Hemingway Editor检查可读性

### 5. 功能测试

**测试目标**: 验证所有交互功能正常

**测试用例**:
- 游戏卡片点击跳转正确
- 悬停效果正常显示
- 搜索功能不受影响
- 分类筛选正常工作
- 响应式布局切换流畅

## 实现优先级

### 阶段1: 核心功能 (MVP)

1. 创建游戏描述数据文件 (前20个热门游戏)
2. 更新HTML结构添加描述元素
3. 实现基础CSS样式
4. 添加响应式设计

**交付物**:
- `data/game-descriptions.json` (20个游戏)
- 更新的 `data/home-body.html`
- CSS样式代码

### 阶段2: SEO优化

1. 添加Schema.org微数据标记
2. 优化图片alt属性
3. 使用语义化HTML标签
4. 完成所有200个游戏的描述

**交付物**:
- 完整的 `data/game-descriptions.json` (200个游戏)
- SEO优化的HTML结构
- Schema.org标记实现

### 阶段3: 性能和体验优化

1. 实现图片懒加载
2. 优化CSS性能
3. 添加加载动画
4. 实现描述文本的渐进式显示

**交付物**:
- 性能优化代码
- 动画效果实现
- 性能测试报告

## 设计决策和理由

### 1. 为什么使用JSON文件而不是数据库?

**决策**: 使用静态JSON文件存储游戏描述

**理由**:
- 项目当前使用静态HTML文件,保持一致性
- 200个游戏的数据量不大,JSON文件足够
- 便于版本控制和内容审核
- 无需额外的数据库基础设施
- 构建时可以直接读取,提升性能

### 2. 为什么限制描述为3行?

**决策**: 桌面端显示3行,移动端显示2行

**理由**:
- 保持卡片视觉一致性
- 避免过长文本影响布局
- 40-60词的描述通常为3-4行
- 用户可以通过点击查看完整信息
- 符合卡片式设计的最佳实践

### 3. 为什么使用内联样式而不是外部CSS?

**决策**: 关键CSS内联,非关键CSS外部引入

**理由**:
- 当前项目使用 `dangerouslySetInnerHTML` 渲染HTML
- 内联关键CSS可以减少渲染阻塞
- 保持与现有架构的兼容性
- 便于快速迭代和测试

### 4. 为什么使用模板系统生成描述?

**决策**: 设计模板系统辅助生成游戏描述

**理由**:
- 200个游戏手动编写描述工作量大
- 模板确保描述风格一致
- 便于批量更新和优化
- 保证关键词合理分布
- 提高内容生产效率

### 5. 为什么添加Schema.org标记?

**决策**: 为游戏卡片添加Schema.org Game类型标记

**理由**:
- 提升搜索引擎理解页面内容的能力
- 可能获得富媒体搜索结果展示
- 符合现代SEO最佳实践
- 为未来功能扩展(如评分、评论)打基础
- 提升网站的专业性和可信度

## 技术约束和限制

### 1. 现有架构约束

- 项目使用 `dangerouslySetInnerHTML` 渲染静态HTML
- 无法使用React组件的动态特性
- 需要在构建时生成完整HTML
- 样式需要内联或通过外部CSS文件引入

### 2. 性能约束

- 首页加载时间不应超过3秒
- 添加描述后HTML文件大小增加约30-40KB
- 需要保持现有的动画和交互性能
- 移动端性能不应下降

### 3. SEO约束

- 关键词密度需控制在1-2%
- 避免关键词堆砌被搜索引擎惩罚
- 描述需要自然流畅,符合用户阅读习惯
- 需要平衡SEO和用户体验

### 4. 内容约束

- 所有描述必须为英文
- 描述长度严格控制在40-60词
- 需要为200个游戏编写独特描述
- 描述需要准确反映游戏内容

## 未来扩展考虑

### 1. 动态内容加载

未来可以考虑实现:
- 游戏描述的A/B测试
- 基于用户行为的个性化描述
- 动态关键词优化

### 2. 多语言支持

为国际化做准备:
- 描述数据结构支持多语言
- 使用i18n框架
- 自动翻译和人工审核流程

### 3. 用户生成内容

增强社区参与:
- 用户评分和评论
- 游戏标签系统
- 社区推荐描述

### 4. 高级SEO功能

进一步优化SEO:
- 结构化数据扩展(评分、播放次数)
- Open Graph和Twitter Card标记
- 动态生成meta描述
- 面包屑导航

## 参考资料

- [Schema.org Game Type](https://schema.org/Game)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Web.dev Performance Best Practices](https://web.dev/performance/)
- [MDN Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [CSS-Tricks: Line Clamping](https://css-tricks.com/line-clampin/)
