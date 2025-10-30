# Git 推送脚本（使用代理）
# 使用方法: .\git-push.ps1 "commit message"

param(
    [string]$message = "Update"
)

# 设置代理
$env:HTTP_PROXY = "http://127.0.0.1:7890"
$env:HTTPS_PROXY = "http://127.0.0.1:7890"

Write-Host "正在添加文件..." -ForegroundColor Green
git add .

Write-Host "正在提交..." -ForegroundColor Green
git commit -m $message

Write-Host "正在推送到 GitHub..." -ForegroundColor Green
git push

Write-Host "完成！" -ForegroundColor Green
