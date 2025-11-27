# 动态认证提供商配置指南

本文档说明如何配置应用以自动检测和显示 Firebase 启用的认证方式。

## 🎯 功能说明

应用现在支持动态认证提供商检测:
- ✅ 自动读取配置的认证提供商
- ✅ 动态生成登录按钮
- ✅ 支持 Google、GitHub、Email/Password 登录
- ✅ 可轻松扩展其他提供商

## 📝 配置认证提供商

### 方法 1: 在代码中配置(当前方式)

编辑 `js/auth.js` 文件中的 `PROVIDERS_CONFIG` 对象:

```javascript
const PROVIDERS_CONFIG = {
  'google.com': {
    name: 'Google',
    icon: '🔐',
    class: 'google',
    provider: new GoogleAuthProvider(),
    type: 'popup'
  },
  'github.com': {
    name: 'GitHub',
    icon: '🐙',
    class: 'github',
    provider: new GithubAuthProvider(),
    type: 'popup'
  },
  'password': {
    name: 'Email',
    icon: '📧',
    class: 'email',
    provider: EmailAuthProvider,
    type: 'email'
  }
};
```

**添加或删除提供商**:
- 添加: 在对象中添加新的提供商配置
- 删除: 从对象中移除对应的提供商
- 应用会自动根据配置生成登录按钮

### 方法 2: 使用环境变量(推荐用于生产环境)

创建 `js/providers-config.js`:

```javascript
// 从环境变量或配置文件读取启用的提供商
export const ENABLED_PROVIDERS = [
  'google.com',
  'github.com',
  'password'
];
```

然后在 `auth.js` 中过滤:

```javascript
export function getEnabledProviders() {
  return Object.keys(PROVIDERS_CONFIG)
    .filter(id => ENABLED_PROVIDERS.includes(id))
    .map(id => ({
      id,
      ...PROVIDERS_CONFIG[id]
    }));
}
```

## 🔧 支持的认证提供商

### 已实现

| 提供商 | ID | 图标 | 类型 | 状态 |
|--------|-----|------|------|------|
| Google | `google.com` | 🔐 | popup | ✅ 已实现 |
| GitHub | `github.com` | 🐙 | popup | ✅ 已实现 |
| Email/Password | `password` | 📧 | email | ✅ 已实现 |

### 可扩展

| 提供商 | ID | 建议图标 | 类型 |
|--------|-----|----------|------|
| Facebook | `facebook.com` | 📘 | popup |
| Twitter | `twitter.com` | 🐦 | popup |
| Microsoft | `microsoft.com` | 🪟 | popup |
| Apple | `apple.com` | 🍎 | popup |
| 手机号 | `phone` | 📱 | phone |

## 📱 Email/Password 登录

### Firebase Console 配置

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 选择项目: **uniapp-25c5f**
3. 进入 **Authentication** → **Sign-in method**
4. 找到 **Email/Password** 提供商
5. 点击 **启用** 开关
6. 可选: 启用 **Email link (passwordless sign-in)**
7. 点击 **保存**

### 功能特性

- ✅ 邮箱密码登录
- ✅ 邮箱密码注册
- ✅ 自动表单验证
- ✅ 友好的错误提示
- ✅ 最小密码长度: 6 位

### 用户体验

1. 点击 "使用 Email 登录" 按钮
2. 显示邮箱密码表单
3. 输入邮箱和密码
4. 选择 "登录" 或 "注册"
5. 可点击 "返回其他登录方式" 切换

## 🎨 自定义按钮样式

每个提供商都有对应的 CSS 类,可在 `css/styles.css` 中自定义:

```css
/* Google 按钮 */
.btn-google {
  background: var(--gradient-primary);
}

/* GitHub 按钮 */
.btn-github {
  background: linear-gradient(135deg, #24292e 0%, #1a1e22 100%);
}

/* Email 按钮 */
.btn-email {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}
```

## 🔄 添加新的认证提供商

### 示例: 添加 Facebook 登录

1. **在 `auth.js` 中添加配置**:

```javascript
import { FacebookAuthProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const PROVIDERS_CONFIG = {
  // ... 现有配置
  'facebook.com': {
    name: 'Facebook',
    icon: '📘',
    class: 'facebook',
    provider: new FacebookAuthProvider(),
    type: 'popup'
  }
};
```

2. **在 `css/styles.css` 中添加样式**:

```css
.btn-facebook {
  background: linear-gradient(135deg, #1877f2 0%, #0c63d4 100%);
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-facebook:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), 0 0 30px rgba(24, 119, 242, 0.4);
}
```

3. **在 Firebase Console 启用 Facebook 登录**

4. **应用会自动显示 Facebook 登录按钮**

## 🐛 常见问题

### 问题 1: 按钮没有显示

**原因**: 提供商配置错误或被注释

**解决方案**:
- 检查 `PROVIDERS_CONFIG` 中是否包含该提供商
- 确认没有被注释或删除
- 检查浏览器控制台错误

### 问题 2: Email 登录失败 "auth/operation-not-allowed"

**原因**: Firebase Console 未启用 Email/Password 登录

**解决方案**:
1. 在 Firebase Console 启用 Email/Password
2. 刷新页面重试

### 问题 3: 注册时提示 "auth/weak-password"

**原因**: 密码强度不足

**解决方案**:
- 密码至少 6 位字符
- 建议使用字母、数字和特殊字符组合

### 问题 4: 登录时提示 "auth/user-not-found"

**原因**: 用户不存在

**解决方案**:
- 先点击 "注册" 按钮创建账户
- 或使用其他登录方式

## 📊 提供商优先级

按钮显示顺序由 `PROVIDERS_CONFIG` 对象的键顺序决定:

1. Google (最常用)
2. GitHub (开发者友好)
3. Email/Password (通用方式)

可通过调整对象键的顺序来改变显示顺序。

## 🔒 安全建议

1. **Email 验证**: 启用邮箱验证功能
2. **密码强度**: 提示用户使用强密码
3. **账户关联**: 启用多提供商账户关联
4. **限流**: 配置 Firebase 限流规则防止滥用

## 📚 相关文档

- [Firebase Authentication 文档](https://firebase.google.com/docs/auth)
- [Email/Password 登录](https://firebase.google.com/docs/auth/web/password-auth)
- [管理用户](https://firebase.google.com/docs/auth/web/manage-users)

---

**现在您的应用支持动态检测和显示认证方式! 🎉**
