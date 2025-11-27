# Firebase 一键登录 PWA 应用

一个基于 Firebase 的渐进式 Web 应用(PWA),实现 Google 一键登录功能,并展示用户的 Google 账户信息。

## ✨ 功能特性

- 🔐 **Google 一键登录** - 使用 Firebase Authentication 实现安全的 Google OAuth 登录
- 👤 **用户信息展示** - 显示用户头像、姓名、邮箱等详细信息
- 📱 **PWA 支持** - 可安装到桌面或主屏幕,支持离线访问
- 🎨 **现代化 UI** - 深色主题、渐变色、玻璃态效果、流畅动画
- 🔌 **离线缓存** - Service Worker 实现静态资源缓存
- 📱 **响应式设计** - 完美适配移动端和桌面端

## 🚀 快速开始

### 前置要求

1. 一个 Firebase 项目(已配置)
2. 启用 Google 登录提供商
3. 本地 Web 服务器(如 `npx serve`)或部署平台

### 本地开发

1. **克隆或下载项目**
   ```bash
   git clone <repository-url>
   cd firebase-one-click-login
   ```

2. **Firebase 配置已完成**
   - 配置文件位于 `js/firebase-config.js`
   - 已使用您提供的 Firebase 配置信息

3. **启动本地服务器**
   ```bash
   npx serve -p 3000
   # 或
   python -m http.server 3000
   ```

4. **访问应用**
   - 在浏览器中打开 `http://localhost:3000`
   - 点击"使用 Google 登录"按钮
   - 完成 Google OAuth 授权流程

### 部署到生产环境

#### 选项 1: Cloudflare Pages(推荐)
- ✅ 全球 CDN,超快速度
- ✅ 免费 SSL 证书
- ✅ 自定义域名支持
- ✅ 自动部署

详细步骤请查看 [DEPLOY_CLOUDFLARE.md](./DEPLOY_CLOUDFLARE.md)

#### 选项 2: GitHub Pages
- ✅ 免费托管
- ✅ 自动部署
- ✅ 支持自定义域名

详细步骤请查看 [DEPLOY.md](./DEPLOY.md)

### 安装为 PWA

#### Chrome/Edge 浏览器:
1. 访问应用网址
2. 点击地址栏右侧的"安装"图标 ⊕
3. 或点击浏览器菜单 → "安装应用"

#### 移动端 (iOS Safari):
1. 访问应用网址
2. 点击分享按钮
3. 选择"添加到主屏幕"

## 📁 项目结构

```
firebase-one-click-login/
├── index.html              # 主页面
├── manifest.json           # PWA 配置清单
├── service-worker.js       # Service Worker
├── css/
│   └── styles.css         # 样式系统
├── js/
│   ├── firebase-config.js # Firebase 配置
│   ├── auth.js            # 认证逻辑
│   └── app.js             # 应用主逻辑
├── icons/
│   ├── icon-192.png       # 应用图标 192x192
│   └── icon-512.png       # 应用图标 512x512
└── README.md              # 项目文档
```

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **认证**: Firebase Authentication (v10.7.1)
- **PWA**: Service Worker, Web App Manifest
- **设计**: 深色主题, 渐变色, 玻璃态效果, CSS 动画
- **字体**: Google Fonts (Inter)

## 📱 支持的浏览器

- ✅ Chrome/Edge (推荐)
- ✅ Firefox
- ✅ Safari (iOS/macOS)
- ✅ 其他现代浏览器

## 🔒 安全说明

- Firebase 配置信息暴露在客户端是正常的
- 请在 Firebase Console 中配置授权域名
- 建议启用 Firebase App Check 防止滥用
- 设置适当的 Firestore/Storage 安全规则

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

---

**享受您的 Firebase 一键登录体验! 🎉**
