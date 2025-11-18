# Requirements Document

## Introduction

本功能为游戏网站创建一个"即将推出"(Coming Soon)页面系统。当用户访问尚未开发完成的游戏时，将显示一个精美的通知页面，告知用户该游戏正在开发中，并提供邮箱订阅功能，以便在游戏上线后通知用户。该页面采用现代化的玻璃态设计风格，与网站整体风格保持一致。

## Glossary

- **System**: 游戏网站的前端应用程序（Next.js应用）
- **Coming Soon Page**: 即将推出页面，显示游戏开发中状态的独立页面
- **Email Subscription Form**: 邮箱订阅表单，用户提交邮箱以接收游戏上线通知的功能
- **Game Thumbnail**: 游戏缩略图，显示在页面中央的游戏图标
- **Navbar**: 导航栏，包含网站Logo和返回首页按钮的顶部导航组件
- **Glassmorphism**: 玻璃态设计风格，使用半透明背景和背景模糊效果

## Requirements

### Requirement 1

**User Story:** 作为网站访客，我想看到一个美观的即将推出页面，清楚地了解游戏的开发状态

#### Acceptance Criteria

1. THE System SHALL 在页面顶部显示与网站一致的导航栏，包含Logo和返回首页按钮
2. THE System SHALL 在页面中央显示游戏缩略图，尺寸为200x200像素，带圆角和阴影效果
3. THE System SHALL 在缩略图下方显示游戏名称作为主标题
4. THE System SHALL 显示状态消息"🚧 This game is under development"
5. THE System SHALL 显示描述文字"We're working hard to bring you this amazing game. Leave your email below and we'll notify you as soon as it's ready to play!"


### Requirement 2

**User Story:** 作为网站访客，我想能够订阅游戏上线通知，以便在游戏开发完成后第一时间得知

#### Acceptance Criteria

1. THE System SHALL 显示邮箱订阅表单，包含标签"Get notified when it's ready:"
2. THE System SHALL 提供邮箱输入框，占位符文字为"Enter your email address"
3. THE System SHALL 使用正则表达式验证邮箱格式（/^[^\s@]+@[^\s@]+\.[^\s@]+$/）
4. WHEN 用户输入无效的邮箱格式, THE System SHALL 在输入框下方显示红色错误消息"Please enter a valid email address"
5. WHEN 用户输入无效邮箱, THE System SHALL 将输入框边框颜色改为红色（#dc3545）
6. THE System SHALL 提供"NOTIFY ME"提交按钮，宽度占满容器
7. WHEN 用户开始输入邮箱, THE System SHALL 自动隐藏错误消息并恢复输入框边框颜色

### Requirement 3

**User Story:** 作为网站访客，我想在提交邮箱后看到清晰的反馈，并能够返回首页继续浏览

#### Acceptance Criteria

1. WHEN 用户点击提交按钮, THE System SHALL 禁用按钮并显示加载状态
2. WHEN 表单处于提交中状态, THE System SHALL 在按钮文字后显示旋转的加载动画
3. WHEN 用户点击提交按钮, THE System SHALL 将按钮文字改为"Subscribing"并显示加载旋转器
4. WHEN 邮箱提交成功, THE System SHALL 显示绿色成功消息"✓ Thank you! We'll notify you when the game is ready."
5. WHEN 邮箱提交成功, THE System SHALL 隐藏邮箱表单
6. WHEN 邮箱提交成功, THE System SHALL 在2秒后自动重定向到首页
7. THE System SHALL 在表单下方提供"Back to Home"次要按钮
8. WHEN 用户点击"Back to Home"按钮, THE System SHALL 立即导航到首页



### Requirement 4

**User Story:** 作为网站访客，我想看到与网站整体风格完全一致的精美页面，获得流畅的视觉体验

#### Acceptance Criteria

1. THE System SHALL 使用主题颜色变量--theme-color（rgb(37, 150, 237)）作为主色调
2. THE System SHALL 使用渐变背景色rgba(51, 255, 197, 0.404)覆盖整个页面
3. THE System SHALL 使用玻璃态设计风格，卡片背景为rgba(255, 255, 255, 0.95)带10px背景模糊
4. THE System SHALL 为所有卡片元素添加圆角（16px）和阴影效果（0 8px 24px）
5. THE System SHALL 使用系统字体栈：-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif
6. THE System SHALL 为所有交互元素添加0.3秒的过渡动画
7. THE System SHALL 在页面加载时显示淡入动画（fadeIn 0.3s）
8. WHEN 用户悬停在按钮上, THE System SHALL 将按钮放大1.05倍并添加阴影效果

### Requirement 5

**User Story:** 作为移动设备用户，我想在手机上也能完美浏览即将推出页面

#### Acceptance Criteria

1. THE System SHALL 在移动设备（≤768px）上调整容器内边距为30px 20px
2. THE System SHALL 在移动设备上将标题字号从32px缩小到24px
3. THE System SHALL 在移动设备上将游戏缩略图从200x200px缩小到150x150px
4. THE System SHALL 在移动设备上将状态消息字号从20px缩小到18px
5. THE System SHALL 确保所有元素在移动设备上正确堆叠和显示
6. THE System SHALL 在所有设备上保持最大宽度1890px的容器布局
