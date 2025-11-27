# Cloudflare Pages 部署指南

本文档说明如何将 Firebase PWA 应用部署到 Cloudflare Pages。

## ✨ 优势

使用 Cloudflare Pages 部署的优势:
- 🚀 **全球 CDN** - 超快的访问速度
- 🌐 **自定义域名** - 支持根域名部署(如 `firebase.ch3ng.top`)
- 🔒 **免费 SSL** - 自动 HTTPS 证书
- ⚡ **自动部署** - Git 推送后自动构建和部署
- 📊 **无限带宽** - 免费计划提供无限带宽

## 📋 前提条件

- Cloudflare 账户(免费)
- GitHub/GitLab 账户
- 已完成 Firebase 控制台配置
- 自定义域名(可选,Cloudflare 也提供免费子域名)

## 🚀 部署步骤

### 方法一: 通过 Git 集成部署(推荐)

#### 1. 推送代码到 Git 仓库

如果还没有推送代码到 GitHub/GitLab:

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Firebase PWA Login App"

# 添加远程仓库(GitHub 示例)
git remote add origin https://github.com/YOUR_USERNAME/firebase-one-click-login.git

# 推送到 GitHub
git push -u origin main
```

#### 2. 连接到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在左侧菜单选择 **Pages**
3. 点击 **Create a project** (创建项目)
4. 选择 **Connect to Git** (连接到 Git)
5. 授权 Cloudflare 访问您的 GitHub/GitLab 账户
6. 选择您的仓库: `firebase-one-click-login`

#### 3. 配置构建设置

在构建配置页面:

- **Project name**: `firebase-login` (或您喜欢的名称)
- **Production branch**: `main` (或 `master`)
- **Framework preset**: `None` (选择无)
- **Build command**: 留空(静态网站无需构建)
- **Build output directory**: `/` (根目录)

点击 **Save and Deploy** (保存并部署)

#### 4. 等待部署完成

- Cloudflare Pages 会自动部署您的应用
- 通常需要 1-2 分钟
- 部署完成后会显示您的应用地址:
  ```
  https://firebase-login.pages.dev
  ```

### 方法二: 直接上传部署

如果不想使用 Git:

1. 在 Cloudflare Pages 点击 **Create a project**
2. 选择 **Direct Upload** (直接上传)
3. 将项目文件夹拖拽到上传区域
4. 点击 **Deploy site**

## 🌐 配置自定义域名

### 添加自定义域名 `firebase.ch3ng.top`

1. 在 Cloudflare Pages 项目页面,点击 **Custom domains** (自定义域名)
2. 点击 **Set up a custom domain** (设置自定义域名)
3. 输入您的域名: `firebase.ch3ng.top`
4. 点击 **Continue** (继续)

### 配置 DNS 记录

Cloudflare 会自动为您配置 DNS(如果域名在 Cloudflare 管理):

- **类型**: CNAME
- **名称**: `firebase` (或 `@` 如果是根域名)
- **目标**: `firebase-login.pages.dev`
- **代理状态**: 已代理(橙色云朵)

如果域名不在 Cloudflare,需要在您的 DNS 提供商添加:
```
CNAME  firebase  firebase-login.pages.dev
```

### 等待 DNS 生效

- 通常需要几分钟到几小时
- 完成后访问: `https://firebase.ch3ng.top`

## 🔒 配置 Firebase 授权域名

**重要**: 必须将自定义域名添加到 Firebase 授权域名列表

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 选择您的项目: **uniapp-25c5f**
3. 进入 **Authentication** → **Sign-in method**
4. 滚动到 **Authorized domains** (授权域名)
5. 点击 **Add domain** (添加域名)
6. 输入您的域名:
   ```
   firebase.ch3ng.top
   ```
7. 如果使用 Cloudflare 提供的域名,也需要添加:
   ```
   firebase-login.pages.dev
   ```
8. 点击 **Add** (添加)

## ✅ 验证部署

1. 访问您的应用:
   - Cloudflare 域名: `https://firebase-login.pages.dev`
   - 自定义域名: `https://firebase.ch3ng.top`

2. 测试功能:
   - ✅ 页面正常加载
   - ✅ 样式和图标显示正确
   - ✅ 点击"使用 Google 登录"
   - ✅ 完成 OAuth 授权
   - ✅ 用户信息正确显示
   - ✅ PWA 可以安装

## 🔄 自动部署

配置 Git 集成后,每次推送代码都会自动部署:

```bash
# 修改代码后
git add .
git commit -m "更新说明"
git push

# Cloudflare Pages 会自动:
# 1. 检测到推送
# 2. 构建项目
# 3. 部署到生产环境
# 4. 更新所有域名
```

## 📱 路径配置说明

**好消息**: 您的应用已经配置为使用相对路径!

当前配置完美支持:
- ✅ 根域名部署: `https://firebase.ch3ng.top/`
- ✅ 子域名部署: `https://firebase.ch3ng.top/app/`
- ✅ Cloudflare 域名: `https://firebase-login.pages.dev/`

所有资源路径都使用 `./` 相对路径:
- `./manifest.json`
- `./css/styles.css`
- `./js/app.js`
- `./icons/icon-192.png`

## ⚙️ Cloudflare Pages 高级配置

### 环境变量(可选)

如果需要为不同环境使用不同的 Firebase 配置:

1. 在 Cloudflare Pages 项目设置中
2. 进入 **Settings** → **Environment variables**
3. 添加变量(如 `FIREBASE_API_KEY`)
4. 修改代码读取环境变量

### 重定向规则

在项目根目录创建 `_redirects` 文件:

```
# 将所有请求重定向到 index.html(用于 SPA)
/*  /index.html  200
```

### 自定义头部

创建 `_headers` 文件:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

## 🐛 常见问题

### 问题 1: 部署后页面显示空白

**解决方案**:
- 检查浏览器控制台错误
- 确认所有文件路径使用相对路径
- 清除浏览器缓存

### 问题 2: 登录失败 (auth/unauthorized-domain)

**解决方案**:
- 在 Firebase 控制台添加域名到授权列表
- 确认域名格式正确(不包含 `https://` 和路径)
- 等待几分钟让配置生效

### 问题 3: 自定义域名无法访问

**解决方案**:
- 检查 DNS 记录是否正确
- 等待 DNS 传播(最多 48 小时)
- 使用 `dig` 或在线工具检查 DNS 解析

### 问题 4: SSL 证书错误

**解决方案**:
- Cloudflare 会自动配置 SSL
- 确认代理状态已启用(橙色云朵)
- 等待几分钟让证书生效

## 📊 性能优化

Cloudflare Pages 自动提供:
- ✅ **Brotli 压缩** - 更小的文件大小
- ✅ **HTTP/3** - 更快的连接
- ✅ **全球 CDN** - 就近访问
- ✅ **自动缓存** - 静态资源缓存
- ✅ **DDoS 防护** - 安全保护

## 📚 相关资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Firebase Authentication 文档](https://firebase.google.com/docs/auth)
- [自定义域名配置](https://developers.cloudflare.com/pages/platform/custom-domains/)

## 🎯 部署清单

- [ ] 代码推送到 Git 仓库
- [ ] 在 Cloudflare Pages 创建项目
- [ ] 连接 Git 仓库并部署
- [ ] 配置自定义域名 `firebase.ch3ng.top`
- [ ] 在 Firebase 控制台添加授权域名
- [ ] 测试应用功能
- [ ] 测试 PWA 安装
- [ ] 验证自动部署流程

---

**使用 Cloudflare Pages + 自定义域名,您的应用将拥有最佳性能和用户体验! 🚀**
