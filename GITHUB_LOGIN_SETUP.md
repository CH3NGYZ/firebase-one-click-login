# GitHub 登录配置指南

本文档说明如何在 Firebase 中配置 GitHub 登录提供商。

## 📋 前提条件

- Firebase 项目(已创建)
- GitHub 账户
- 应用已部署或有可访问的回调 URL

## 🔧 配置步骤

### 步骤 1: 在 GitHub 创建 OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 **OAuth Apps** → **New OAuth App**
3. 填写应用信息:
   - **Application name**: `Firebase 一键登录` (或您喜欢的名称)
   - **Homepage URL**: 
     - 本地开发: `http://localhost:3000`
     - 生产环境: `https://firebase.ch3ng.top` (您的实际域名)
   - **Application description**: (可选) 应用描述
   - **Authorization callback URL**: 
     ```
     https://uniapp-25c5f.firebaseapp.com/__/auth/handler
     ```
     > 注意: 将 `uniapp-25c5f` 替换为您的 Firebase 项目 ID

4. 点击 **Register application**
5. 记录以下信息:
   - **Client ID**: 类似 `Iv1.a1b2c3d4e5f6g7h8`
   - **Client Secret**: 点击 **Generate a new client secret** 生成,只显示一次,请妥善保存

### 步骤 2: 在 Firebase Console 配置 GitHub 提供商

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 选择您的项目: **uniapp-25c5f**
3. 进入 **Authentication** (身份验证)
4. 点击 **Sign-in method** (登录方法) 标签
5. 找到 **GitHub** 提供商
6. 点击 **启用** 开关
7. 填写 GitHub OAuth 信息:
   - **Client ID**: 粘贴步骤 1 中的 Client ID
   - **Client Secret**: 粘贴步骤 1 中的 Client Secret
8. 复制 **Authorization callback URL** (用于步骤 1)
9. 点击 **保存**

### 步骤 3: 配置授权域名

在 Firebase Console 的 **Authentication** → **Sign-in method** 页面:

1. 滚动到 **Authorized domains** (授权域名)
2. 确认以下域名已添加:
   - `localhost` (本地开发)
   - `firebase.ch3ng.top` (您的生产域名)
   - `your-project.pages.dev` (Cloudflare Pages 域名,如果使用)
   - `your-username.github.io` (GitHub Pages 域名,如果使用)

### 步骤 4: 测试 GitHub 登录

1. 访问您的应用
2. 点击 **使用 GitHub 登录** 按钮
3. 会跳转到 GitHub 授权页面
4. 点击 **Authorize** (授权)
5. 成功后会返回应用并显示用户信息

## 🔒 安全最佳实践

### 1. 保护 Client Secret

- ❌ 不要将 Client Secret 提交到公开仓库
- ✅ 只在 Firebase Console 中配置
- ✅ 定期轮换 Client Secret

### 2. 限制授权范围

GitHub OAuth 默认请求的权限:
- `user:email` - 读取用户邮箱
- `read:user` - 读取用户基本信息

这些是 Firebase 所需的最小权限,无需额外配置。

### 3. 配置正确的回调 URL

确保 GitHub OAuth App 中的回调 URL 与 Firebase 提供的完全一致:
```
https://[YOUR-PROJECT-ID].firebaseapp.com/__/auth/handler
```

## 🐛 常见问题

### 问题 1: 登录后显示 "redirect_uri_mismatch"

**原因**: GitHub OAuth App 的回调 URL 配置不正确

**解决方案**:
1. 检查 GitHub OAuth App 设置
2. 确认回调 URL 与 Firebase 提供的完全一致
3. 注意 `http` vs `https` 和尾部斜杠

### 问题 2: 登录失败 "auth/account-exists-with-different-credential"

**原因**: 该邮箱已使用其他登录方式(如 Google)注册

**解决方案**:
1. 使用原登录方式登录
2. 或在 Firebase Console 启用账户关联功能
3. 应用会自动提示用户使用原登录方式

### 问题 3: GitHub 授权页面显示 "Application not found"

**原因**: Client ID 配置错误

**解决方案**:
1. 检查 Firebase Console 中的 Client ID
2. 确认与 GitHub OAuth App 的 Client ID 一致
3. 重新保存 Firebase 配置

### 问题 4: 登录成功但无法获取用户邮箱

**原因**: GitHub 账户邮箱未公开

**解决方案**:
1. 用户需要在 GitHub 设置中公开至少一个邮箱
2. 或在 GitHub OAuth App 请求 `user:email` 权限(Firebase 默认已请求)

## 📊 获取的用户信息

通过 GitHub 登录,Firebase 可以获取:

- ✅ **用户 ID** (GitHub User ID)
- ✅ **显示名称** (GitHub 用户名)
- ✅ **邮箱地址** (主邮箱或公开邮箱)
- ✅ **头像 URL** (GitHub 头像)
- ✅ **GitHub Access Token** (可用于调用 GitHub API)

## 🔄 更新 OAuth App 设置

如果需要修改 GitHub OAuth App 设置:

1. 访问 [GitHub OAuth Apps](https://github.com/settings/developers)
2. 选择您的应用
3. 修改设置后点击 **Update application**
4. 无需在 Firebase 中重新配置(除非修改了 Client ID/Secret)

## 📚 相关资源

- [Firebase GitHub 登录文档](https://firebase.google.com/docs/auth/web/github-auth)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Firebase 授权域名配置](https://firebase.google.com/docs/auth/web/hosting)

---

**配置完成后,您的应用将支持 Google 和 GitHub 双登录方式! 🎉**
