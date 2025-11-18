# 设计文档：即将推出页面

## 概述

本设计文档详细说明了游戏网站"即将推出"(Coming Soon)页面的实现方案。该页面采用现代化的玻璃态(Glassmorphism)设计风格，为用户提供视觉上令人愉悦的体验。页面包含游戏信息展示、邮箱订阅功能、表单验证、加载状态反馈和导航功能。设计确保与现有网站的视觉风格完全一致，同时提供流畅的用户交互体验。

## 架构

### 页面结构

```
Coming Soon Page
├── 固定背景层（渐变色 + 模糊效果）
├── 容器层（max-width: 1890px）
│   ├── 导航栏（Navbar）
│   │   ├── Logo（可点击返回首页）
│   │   └── 首页图标按钮
│   │
│   └── 主内容卡片（Coming Soon Container）
│       ├── 游戏缩略图（200x200px，圆角，阴影）
│       ├── 游戏名称（h1标题）
│       ├── 状态消息（🚧 图标 + 文字）
│       ├── 描述文字
│       ├── 邮箱订阅表单
│       │   ├── 表单标签
│       │   ├── 邮箱输入框
│       │   ├── 错误消息（条件显示）
│       │   ├── 提交按钮（带加载状态）
│       │   └── 成功消息（条件显示）
│       └── 返回首页按钮（次要样式）
```

### 技术栈

- **框架**: Next.js 13+ with App Router
- **样式方案**: 内联CSS（CSS-in-JS）或独立CSS模块
- **客户端交互**: React Hooks (useState) + 原生JavaScript事件处理
- **表单验证**: 客户端正则表达式验证
- **数据存储**: 模拟API调用（可扩展为真实API）
- **动画**: CSS Keyframes 动画

## 组件和接口

### 1. 主页面组件 (ComingSoonPage)

**位置**: `app/hello-preview/page.tsx` 或 `app/coming-soon/page.tsx`

**组件结构**:
```typescript
export default function ComingSoonPage() {
  return (
    <html lang="en">
      <head>
        {/* Meta tags and title */}
      </head>
      <body>
        <div className="mvn-container">
          <Navbar />
          <ComingSoonContainer />
        </div>
      </body>
    </html>
  )
}
```

### 2. 导航栏组件 (Navbar)

**功能**:
- 显示网站Logo（可点击返回首页）
- 显示首页图标按钮
- 使用玻璃态样式（半透明白色背景 + 背景模糊）
- 固定定位（sticky top: 10px）

**样式特点**:
- 背景: `rgba(255, 255, 255, 0.95)`
- 背景模糊: `backdrop-filter: blur(10px)`
- 圆角: `16px`
- 阴影: `0 8px 24px var(--card-shadow)`
- Logo悬停效果: 放大1.08倍 + 旋转5度

### 3. 主内容容器 (ComingSoonContainer)

**功能**:
- 居中显示所有内容
- 包含游戏信息、表单和按钮
- 使用玻璃态卡片样式

**样式特点**:
- 最大宽度: `600px`
- 内边距: 桌面 `40px`，移动端 `30px 20px`
- 背景: `rgba(255, 255, 255, 0.95)`
- 背景模糊: `backdrop-filter: blur(20px)`
- 圆角: `20px`
- 阴影: `0 8px 32px rgba(0, 0, 0, 0.1)`
- 进入动画: `fadeIn 0.3s ease-out`

### 4. 邮箱订阅表单 (EmailSubscriptionForm)

**状态管理**:
```typescript
interface FormState {
  email: string
  isSubmitting: boolean
  isSuccess: boolean
  showError: boolean
}
```

**验证逻辑**:
```typescript
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
```

**交互流程**:
1. 用户输入邮箱
2. 实时移除错误状态（input事件）
3. 提交时验证格式
4. 显示加载状态（禁用按钮 + 旋转动画）
5. 模拟API调用（1秒延迟）
6. 显示成功消息 + 隐藏表单
7. 2秒后重定向到首页

### 5. 按钮组件样式

**主按钮 (Primary Button)**:
- 背景: `var(--theme-color)`
- 文字: 白色，粗体，大写
- 圆角: `12px`
- 悬停效果: 放大1.05倍 + 阴影
- 禁用状态: 透明度0.6

**次要按钮 (Secondary Button)**:
- 背景: 透明
- 边框: `2px solid var(--theme-color)`
- 文字: `var(--theme-color)`
- 悬停效果: 背景 `rgba(21, 131, 249, 0.1)`

## 数据模型

### 游戏信息

**硬编码示例**（当前实现）:
```typescript
const gameInfo = {
  name: "Plonky",
  thumbnail: "https://play-lh.googleusercontent.com/37iUpEXB3mkrYkL07ZZBxfOqDVKrNB9jWW5DYrI0-ChlTjLJ7s2zAcLnfNZ6hKYTh9Ze=w240-h480-rw",
  status: "🚧 This game is under development",
  description: "We're working hard to bring you this amazing game. Leave your email below and we'll notify you as soon as it's ready to play!"
}
```

**动态数据结构**（未来扩展）:
```typescript
interface GameData {
  slug: string
  name: string
  thumbnail: string
  status: string
  description: string
}
```

### 订阅数据（未来扩展）

**文件位置**: `data/subscriptions.json`

**模式**:
```json
{
  "subscriptions": [
    {
      "id": "uuid-v4",
      "email": "user@example.com",
      "gameName": "Plonky",
      "subscribedAt": "2025-11-18T10:30:00.000Z"
    }
  ]
}
```

## 错误处理

### 客户端验证错误

**无效邮箱格式**:
- **触发条件**: 用户提交时邮箱不匹配正则表达式
- **视觉反馈**:
  - 错误消息显示: "Please enter a valid email address"
  - 错误消息样式: 红色文字（#dc3545），14px字号
  - 输入框边框变红: `border-color: #dc3545`
- **恢复机制**: 用户开始输入时自动清除错误状态

### 表单状态管理

**提交中状态**:
- 按钮禁用: `disabled={true}`
- 按钮文字变更: "Subscribing"
- 显示加载动画: 旋转的圆形spinner
- 防止重复提交

**成功状态**:
- 显示成功消息（绿色背景 #10b981）
- 隐藏表单（`display: none`）
- 2秒后自动重定向

### 用户体验优化

1. **即时反馈**: 输入时实时清除错误
2. **视觉提示**: 清晰的颜色编码（红色=错误，绿色=成功）
3. **动画过渡**: 所有状态变化都有平滑动画
4. **防误操作**: 提交中禁用按钮

## UI/UX 设计

### 布局结构

```
┌─────────────────────────────────────────────┐
│  [Logo]                          [Home 🏠]  │  ← Navbar (sticky)
├─────────────────────────────────────────────┤
│                                             │
│              ┌─────────────┐                │
│              │   游戏缩略图  │                │  200x200px
│              │  (圆角阴影)  │                │
│              └─────────────┘                │
│                                             │
│                 Plonky                      │  ← h1 (32px)
│                                             │
│     🚧 This game is under development       │  ← 状态消息 (20px)
│                                             │
│   We're working hard to bring you this      │
│   amazing game. Leave your email below...   │  ← 描述 (16px)
│                                             │
│   Get notified when it's ready:             │  ← 表单标签
│   ┌───────────────────────────────────┐    │
│   │ Enter your email address          │    │  ← 输入框
│   └───────────────────────────────────┘    │
│   [错误消息]                                │  ← 条件显示
│                                             │
│   ┌───────────────────────────────────┐    │
│   │         NOTIFY ME                 │    │  ← 主按钮
│   └───────────────────────────────────┘    │
│                                             │
│   [成功消息]                                │  ← 条件显示
│                                             │
│   ┌───────────────────────────────────┐    │
│   │       Back to Home                │    │  ← 次要按钮
│   └───────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

### 视觉设计规范

**CSS变量**:
```css
:root {
  --theme-color: rgb(37, 150, 237);
  --card-shadow: #33333322;
}
```

**颜色方案**:
- **主色**: `rgb(37, 150, 237)` - 用于按钮、链接、聚焦状态
- **背景渐变**: `rgba(51, 255, 197, 0.404)` - 固定背景层
- **卡片背景**: `rgba(255, 255, 255, 0.95)` - 玻璃态效果
- **标题文字**: `#002b50` - 深蓝色
- **正文文字**: `#555` - 中灰色
- **描述文字**: `#666` - 浅灰色
- **错误颜色**: `#dc3545` - 红色
- **成功颜色**: `#10b981` - 绿色

**排版系统**:
- **h1标题**: 32px, 700粗细, `#002b50`
- **状态消息**: 20px, 正常粗细, `#555`
- **描述文字**: 16px, 行高1.6, `#666`
- **表单标签**: 14px, 600粗细, `#002b50`
- **输入框**: 16px
- **按钮**: 16px, 600粗细, 大写

**间距规范**:
- **外层容器**: max-width 1890px, margin 10px auto
- **内容卡片**: max-width 600px, padding 40px
- **游戏缩略图**: 200x200px, margin-bottom 24px
- **标题间距**: margin-bottom 16px
- **描述间距**: margin-bottom 32px
- **表单间距**: margin 32px 0
- **按钮间距**: margin-top 16px (主), 12px (次要)

**圆角和阴影**:
- **导航栏**: 圆角16px, 阴影 `0 8px 24px var(--card-shadow)`
- **内容卡片**: 圆角20px, 阴影 `0 8px 32px rgba(0,0,0,0.1)`
- **游戏缩略图**: 圆角16px, 阴影 `0 8px 24px rgba(0,0,0,0.1)`
- **输入框**: 圆角12px
- **按钮**: 圆角12px

### 响应式断点

**桌面 (> 768px)**:
- 内容卡片: padding 40px
- 游戏缩略图: 200x200px
- h1标题: 32px
- 状态消息: 20px

**移动端 (≤ 768px)**:
- 内容卡片: padding 30px 20px, margin 20px auto
- 游戏缩略图: 150x150px
- h1标题: 24px
- 状态消息: 18px

### 动画效果

**页面进入动画** (fadeIn):
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
/* 应用: 0.3s ease-out */
```

**成功消息动画** (slideIn):
```css
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
/* 应用: 0.3s ease-out */
```

**加载旋转动画** (spin):
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
/* 应用: 0.6s linear infinite */
```

**交互动画**:
- 所有元素: `transition: 0.3s`
- 按钮悬停: `transform: scale(1.05)` + 阴影增强
- Logo悬停: `transform: scale(1.08) rotate(5deg)`

## 测试策略

### 功能测试

**邮箱验证测试**:
- ✓ 有效邮箱: `test@example.com`, `user.name@domain.co.uk`
- ✗ 无效邮箱: `invalid`, `@example.com`, `test@`, `test @example.com`
- ✗ 空邮箱: 提交空表单

**表单交互测试**:
1. 输入无效邮箱 → 点击提交 → 验证错误消息显示
2. 查看输入框边框变红
3. 开始输入 → 验证错误消息自动消失
4. 输入有效邮箱 → 点击提交 → 验证加载状态
5. 验证成功消息显示 + 表单隐藏
6. 等待2秒 → 验证重定向到首页

**导航测试**:
1. 点击Logo → 验证跳转到首页
2. 点击首页图标 → 验证跳转到首页
3. 点击"Back to Home"按钮 → 验证跳转到首页

### 视觉测试

**响应式测试**:
- 桌面 (1920x1080): 验证布局居中，间距正确
- 平板 (768x1024): 验证布局适配
- 移动端 (375x667): 验证字号缩小，缩略图缩小
- 移动端横屏: 验证布局不破坏

**动画测试**:
- 页面加载: 验证淡入动画流畅
- 按钮悬停: 验证放大和阴影效果
- Logo悬停: 验证旋转效果
- 加载spinner: 验证旋转动画
- 成功消息: 验证滑入动画

**样式一致性测试**:
- 验证颜色使用CSS变量
- 验证玻璃态效果正确渲染
- 验证阴影和圆角符合设计
- 验证字体栈正确应用

### 浏览器兼容性测试

**目标浏览器**:
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动Safari (iOS)
- Chrome Mobile (Android)

**测试项目**:
- CSS backdrop-filter支持
- CSS变量支持
- Flexbox布局
- CSS动画
- 表单验证

### 手动测试清单

- [ ] 页面加载速度正常
- [ ] 所有文字清晰可读
- [ ] 图片加载正常（游戏缩略图、Logo）
- [ ] 表单验证逻辑正确
- [ ] 错误消息显示和隐藏正常
- [ ] 加载状态显示正常
- [ ] 成功消息显示正常
- [ ] 自动重定向工作（2秒）
- [ ] 所有链接和按钮可点击
- [ ] 移动端触摸交互正常
- [ ] 无控制台错误
- [ ] 无布局偏移(CLS)问题

## 实现说明

### 文件结构

**当前实现** (静态HTML):
```
public/
└── hello-pre.html (完整的Coming Soon页面)
```

**Next.js实现方案**:
```
app/
├── hello-preview/
│   └── page.tsx (转换自hello-pre.html)
│
或
│
├── coming-soon/
│   └── page.tsx (独立的Coming Soon页面)
│
或
│
├── g/
│   └── [slug]/
│       ├── page.tsx (动态游戏页面)
│       └── components/
│           └── ComingSoonPage.tsx (Coming Soon组件)

public/
└── static/
    └── img/
        └── logo/
            └── 476588537Poki-Unblocked.png (Logo图片)
```

### 实现方式选择

**方案1: 独立静态页面** (当前)
- 优点: 简单快速，无需服务器逻辑
- 缺点: 游戏信息硬编码，不易维护
- 适用: 快速原型或单一游戏展示

**方案2: Next.js页面组件**
- 优点: 可复用，支持动态数据
- 缺点: 需要转换HTML到JSX
- 适用: 多游戏场景

**方案3: 动态路由集成**
- 优点: 与游戏系统深度集成
- 缺点: 实现复杂度高
- 适用: 完整的游戏管理系统

### 转换步骤 (HTML → Next.js)

1. **创建页面组件**:
   - 将HTML结构转换为JSX
   - `class` → `className`
   - `onclick` → `onClick`
   - 内联样式提取到`<style jsx>`或CSS模块

2. **状态管理**:
   - 使用`useState`管理表单状态
   - 使用`useRouter`处理导航

3. **事件处理**:
   - 将内联JavaScript转换为React事件处理器
   - 表单提交逻辑封装为函数

4. **样式处理**:
   - 选项A: 保留内联样式（`<style jsx>`）
   - 选项B: 提取到CSS模块
   - 选项C: 转换为Tailwind类

### 关键代码片段

**邮箱验证**:
```typescript
const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
```

**表单提交处理**:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!isValidEmail(email)) {
    setShowError(true)
    return
  }
  
  setIsSubmitting(true)
  
  // 模拟API调用
  setTimeout(() => {
    setIsSuccess(true)
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }, 1000)
}
```

### 性能优化

1. **图片优化**: 使用Next.js `<Image>`组件
2. **字体优化**: 使用系统字体栈（已实现）
3. **CSS优化**: 最小化CSS，使用CSS变量
4. **JavaScript优化**: 代码分割，懒加载

### 可访问性 (a11y)

1. **语义化HTML**: 使用正确的标签（form, button, label）
2. **表单标签**: 所有输入框都有关联的label
3. **错误提示**: 使用aria-live区域
4. **键盘导航**: 确保所有交互元素可键盘访问
5. **对比度**: 确保文字和背景对比度符合WCAG标准

### 未来增强

**短期**:
1. 实际的API集成（替换模拟调用）
2. 数据持久化（保存订阅到数据库）
3. 邮箱重复检查

**中期**:
4. 多语言支持（i18n）
5. 自定义游戏信息（通过props或API）
6. 社交分享功能

**长期**:
7. 管理后台（查看订阅列表）
8. 邮件通知系统（游戏上线时发送邮件）
9. 进度跟踪（显示游戏开发进度）
10. A/B测试（优化转化率）
