# 游戏下载指南

## 问题说明

当你点击游戏页面右侧推荐列表中的游戏时，如果显示"游戏页面未找到"，说明该游戏的数据还没有下载到本地。

## 解决方案

### 方法1：下载单个游戏

如果你只想下载某个特定的游戏，使用：

```bash
node scripts/fetchGamePage.js <游戏slug>
```

例如：
```bash
node scripts/fetchGamePage.js 12-minibattles
```

### 方法2：批量下载缺失的游戏

使用批量下载脚本可以自动下载所有在 plonky 页面中引用但尚未下载的游戏。

#### 下载所有缺失的游戏：
```bash
node scripts/downloadMissingGames.js
```

#### 限制下载数量（推荐）：
为了避免一次性下载太多导致问题，可以限制每次下载的数量：

```bash
# 每次下载 10 个游戏
node scripts/downloadMissingGames.js 10

# 每次下载 20 个游戏
node scripts/downloadMissingGames.js 20
```

## 注意事项

1. **下载速度**: 脚本会在每个游戏下载之间等待2秒，避免请求过快
2. **超时设置**: 每个游戏的下载超时时间为30秒
3. **失败重试**: 如果某些游戏下载失败，脚本会记录并在最后显示失败列表
4. **增量下载**: 脚本会自动跳过已经下载的游戏

## 当前状态

运行以下命令查看还有多少游戏需要下载：

```bash
node scripts/downloadMissingGames.js 0
```

这会显示统计信息但不会实际下载任何游戏。

## 示例工作流程

```bash
# 1. 先下载 20 个游戏测试
node scripts/downloadMissingGames.js 20

# 2. 检查是否成功，然后继续下载
node scripts/downloadMissingGames.js 20

# 3. 重复直到所有游戏都下载完成
```

## 故障排除

### 如果下载失败：
- 检查网络连接
- 确认 poki.ee 网站是否可访问
- 尝试单独下载失败的游戏

### 如果游戏页面显示不正确：
- 检查 `data/games/<slug>/` 目录下是否有 `body.html` 和 `head.html` 文件
- 尝试重新下载该游戏
- 检查浏览器控制台是否有错误信息
