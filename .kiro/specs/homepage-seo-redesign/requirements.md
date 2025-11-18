# 需求文档

## 简介

本文档概述了 Unblocked Games 76 网站首页内容模块重新设计的需求。重新设计的重点是改进现有首页的文案、UI 和布局，以更好地针对主要关键词"unblocked games 76"及相关搜索查询进行 SEO 优化。重新设计将结合 SEMrush 的关键词研究数据，替换当前的 Poki 相关内容，创建针对 Unblocked Games 76 品牌的优化内容。

## 术语表

- **内容模块 (Content Module)**: data/home-body.html 和 data/home-head.html 文件中的文本内容和元数据
- **SEO 文案 (SEO Copy)**: 包含目标关键词并回答用户问题的优化文本内容
- **元标签 (Meta Tags)**: home-head.html 中用于搜索引擎优化的 HTML 元标签，包括 title、description 和 Open Graph 标签
- **关键词密度 (Keyword Density)**: 内容中目标关键词使用的百分比（最佳范围：1-2%）
- **语义关键词 (Semantic Keywords)**: 支持主要关键词的相关术语和短语，来自 SEMrush 数据
- **品牌替换 (Brand Replacement)**: 将现有的"Poki"品牌引用替换为"Unblocked Games 76"

## 需求

### 需求 1

**用户故事：** 作为一名搜索 unblocked games 的学生，我希望立即了解该网站提供 unblocked games 76 内容，以便我知道我来对地方了

#### 验收标准

1. THE 内容模块 SHALL 将 home-head.html 中的 title 标签更新为以"Unblocked Games 76"开头，最大长度为 60 个字符
2. THE 内容模块 SHALL 将 home-head.html 中的 meta description 更新为在前 20 个单词内包含"unblocked games 76"，最大长度为 155 个字符
3. THE 内容模块 SHALL 将 home-head.html 中的 meta keywords 更新为包含"unblocked games 76"及至少 5 个相关语义关键词
4. THE 内容模块 SHALL 将 home-head.html 中所有 og:title、og:description、og:site_name 等 Open Graph 标签更新为反映"Unblocked Games 76"品牌
5. THE 内容模块 SHALL 将 home-head.html 中所有 Twitter Card 元标签更新为反映"Unblocked Games 76"品牌

### 需求 2

**用户故事：** 作为搜索引擎爬虫，我希望在首页上找到相关的关键词丰富内容，以便我可以正确索引和排名目标查询的页面

#### 验收标准

1. THE 内容模块 SHALL 在 home-body.html 中添加一个新的 SEO 内容区域，包含至少 3 个内容部分，每个部分至少 150 个单词
2. THE SEO 文案 SHALL 将短语"unblocked games 76"的关键词密度保持在 1% 到 2% 之间
3. THE SEO 文案 SHALL 从 seo 目录中的 SEMrush 关键词研究数据整合至少 10 个高搜索量的语义关键词
4. THE SEO 内容区域 SHALL 使用正确的 HTML 标题层次结构，H2 标签用于主要部分标题，H3 标签用于子部分
5. THE SEO 文案 SHALL 包含至少 5 个指向现有游戏分类页面（如 /action、/puzzle 等）的内部链接，使用描述性锚文本

### 需求 3

**用户故事：** 作为对 unblocked games 有疑问的用户，我希望在首页上找到常见问题的答案，以便我无需离开即可了解网站提供的内容

#### 验收标准

1. THE 内容模块 SHALL 在 home-body.html 中添加一个 FAQ 部分，包含至少 5 个来自 seo 目录中 SEMrush questions 数据的常见问题
2. THE FAQ 部分 SHALL 使用可折叠的 HTML 结构（如 details/summary 标签或自定义 JavaScript）实现问题展开功能
3. THE 内容模块 SHALL 在 home-head.html 中添加 schema.org FAQPage 结构化数据的 JSON-LD 脚本
4. THE FAQ 文案 SHALL 在至少 2 个问答对中自然地包含短语"unblocked games 76"
5. THE FAQ 问题 SHALL 按照 SEMrush 数据中的搜索量从高到低排列

### 需求 4

**用户故事：** 作为网站所有者，我希望首页内容能够建立品牌认知和信任，以便用户选择我的网站而不是竞争对手

#### 验收标准

1. THE 内容模块 SHALL 在 home-body.html 中添加一个"关于 Unblocked Games 76"部分，包含至少 3 个价值主张
2. THE 内容模块 SHALL 在显著位置显示网站统计信息，如"超过 1000+ 免费游戏"
3. THE SEO 文案 SHALL 包含用户利益声明，如"100% 免费"、"无需下载"、"学校和工作场所可访问"
4. THE 内容模块 SHALL 将所有现有的"Poki"品牌引用替换为"Unblocked Games 76"
5. THE 内容模块 SHALL 更新 logo 图片的 alt 文本为"Unblocked Games 76"以提高可访问性和 SEO
