# GitHub Pages 部署指南

本文档说明如何将 Firebase PWA 应用部署到 GitHub Pages。

## 📋 前提条件

- GitHub 账户
- Git 已安装
- 已完成 Firebase 控制台配置

## 🚀 部署步骤

### 1. 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 `+` → `New repository`
3. 填写仓库信息:
   - **Repository name**: `firebase-one-click-login` (或您喜欢的名称)
   - **Public** 或 **Private** (GitHub Pages 两者都支持)
   - 不要勾选 "Initialize this repository with a README"
4. 点击 `Create repository`

### 2. 推送代码到 GitHub

在项目目录中打开终端,执行以下命令:

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Firebase PWA Login App"

# 添加远程仓库 (替换 YOUR_USERNAME 和 YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送到 GitHub
git push -u origin main
```

> 如果您的默认分支是 `master` 而不是 `main`,请将上述命令中的 `main` 替换为 `master`

### 3. 启用 GitHub Pages

1. 在 GitHub 仓库页面,点击 `Settings` (设置)
2. 在左侧菜单中找到 `Pages`
3. 在 `Source` 部分:
   - **Branch**: 选择 `main` (或 `master`)
   - **Folder**: 选择 `/ (root)`
4. 点击 `Save`
5. 等待几分钟,页面会显示您的应用地址:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

### 4. 配置 Firebase 授权域名

**重要**: 必须将 GitHub Pages 域名添加到 Firebase 授权域名列表

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 选择您的项目: **uniapp-25c5f**
3. 进入 **Authentication** → **Sign-in method**
4. 滚动到 **Authorized domains** (授权域名)
5. 点击 **Add domain** (添加域名)
6. 输入您的 GitHub Pages 域名:
   ```
   YOUR_USERNAME.github.io
   ```
7. 点击 **Add** (添加)

### 5. 测试部署

1. 访问您的 GitHub Pages 地址:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```
2. 应用应该正常加载
3. 点击"使用 Google 登录"按钮
4. 完成 Google OAuth 授权
5. 验证用户信息正确显示

## 📱 PWA 安装

部署后,用户可以将应用安装到设备:

**桌面端 (Chrome/Edge)**:
- 访问应用网址
- 点击地址栏右侧的安装图标 ⊕
- 或点击浏览器菜单 → "安装应用"

**移动端 (iOS Safari)**:
- 访问应用网址
- 点击分享按钮
- 选择"添加到主屏幕"

**移动端 (Android Chrome)**:
- 访问应用网址
- 点击浏览器菜单 (三个点)
- 选择"添加到主屏幕"或"安装应用"

## 🔄 更新应用

当您修改代码后,使用以下命令更新 GitHub Pages:

```bash
# 添加更改
git add .

# 提交更改
git commit -m "描述您的更改"

# 推送到 GitHub
git push
```

GitHub Pages 会自动重新部署,通常需要几分钟生效。

## ⚙️ 路径配置说明

本应用已配置为支持 GitHub Pages 的子目录部署:

- ✅ 所有资源路径使用相对路径 (`./`)
- ✅ `manifest.json` 使用相对路径
- ✅ Service Worker 缓存使用相对路径
- ✅ 支持根域名和子目录部署

这意味着应用可以部署在:
- `https://username.github.io/` (根域名)
- `https://username.github.io/repo-name/` (子目录)

## 🔒 安全注意事项

1. **Firebase 配置**: 配置信息暴露在客户端是正常的
2. **授权域名**: 确保只添加您信任的域名
3. **HTTPS**: GitHub Pages 自动启用 HTTPS
4. **App Check**: 建议在 Firebase 控制台启用 App Check

## 🐛 常见问题

### 问题 1: 页面显示 404

**解决方案**:
- 确认 GitHub Pages 已启用
- 检查分支和文件夹设置是否正确
- 等待几分钟让 GitHub Pages 完成部署

### 问题 2: 登录失败 (auth/unauthorized-domain)

**解决方案**:
- 在 Firebase 控制台添加 GitHub Pages 域名到授权域名列表
- 域名格式: `username.github.io` (不包含 https:// 和路径)

### 问题 3: Service Worker 注册失败

**解决方案**:
- 确认所有文件路径使用相对路径
- 清除浏览器缓存并刷新
- 检查浏览器控制台错误信息

### 问题 4: PWA 无法安装

**解决方案**:
- 确认 `manifest.json` 路径正确
- 检查所有图标文件是否存在
- 使用 Chrome DevTools 的 Application 标签检查 Manifest

## 📚 相关资源

- [GitHub Pages 文档](https://docs.github.com/pages)
- [Firebase Authentication 文档](https://firebase.google.com/docs/auth)
- [PWA 文档](https://web.dev/progressive-web-apps/)

---

**部署成功后,您的 Firebase PWA 应用就可以在全球访问了! 🎉**
