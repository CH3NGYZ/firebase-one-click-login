// 导入认证模块
import { signInWithGoogle, signOutUser, onAuthStateChange, formatUserInfo } from './auth.js';

// DOM 元素引用
let loginSection, userSection, loginBtn, logoutBtn;
let userAvatar, userName, userEmail;
let infoUid, infoEmail, infoEmailVerified, infoCreatedAt, infoLastSignIn, infoProvider;

/**
 * 初始化应用
 */
function initApp() {
    // 获取 DOM 元素
    loginSection = document.getElementById('login-section');
    userSection = document.getElementById('user-section');
    loginBtn = document.getElementById('login-btn');
    logoutBtn = document.getElementById('logout-btn');

    userAvatar = document.getElementById('user-avatar');
    userName = document.getElementById('user-name');
    userEmail = document.getElementById('user-email');

    infoUid = document.getElementById('info-uid');
    infoEmail = document.getElementById('info-email');
    infoEmailVerified = document.getElementById('info-email-verified');
    infoCreatedAt = document.getElementById('info-created-at');
    infoLastSignIn = document.getElementById('info-last-signin');
    infoProvider = document.getElementById('info-provider');

    // 绑定事件
    loginBtn.addEventListener('click', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);

    // 监听认证状态
    onAuthStateChange((user) => {
        if (user) {
            showUserProfile(user);
        } else {
            showLoginScreen();
        }
    });

    // 注册 Service Worker
    registerServiceWorker();
}

/**
 * 处理登录
 */
async function handleLogin() {
    const originalText = loginBtn.innerHTML;

    try {
        // 显示加载状态
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span class="loading"></span> 登录中...';

        await signInWithGoogle();
        // 登录成功后会触发 onAuthStateChange
    } catch (error) {
        console.error('登录错误:', error);
        alert('登录失败: ' + error.message);

        // 恢复按钮状态
        loginBtn.disabled = false;
        loginBtn.innerHTML = originalText;
    }
}

/**
 * 处理登出
 */
async function handleLogout() {
    const originalText = logoutBtn.innerHTML;

    try {
        logoutBtn.disabled = true;
        logoutBtn.innerHTML = '<span class="loading"></span> 登出中...';

        await signOutUser();
        // 登出成功后会触发 onAuthStateChange
    } catch (error) {
        console.error('登出错误:', error);
        alert('登出失败: ' + error.message);

        logoutBtn.disabled = false;
        logoutBtn.innerHTML = originalText;
    }
}

/**
 * 显示登录界面
 */
function showLoginScreen() {
    loginSection.classList.remove('hidden');
    userSection.classList.add('hidden');

    // 恢复登录按钮状态
    loginBtn.disabled = false;
    loginBtn.innerHTML = '<span class="btn-icon">🔐</span> 使用 Google 登录';
}

/**
 * 显示用户信息
 */
function showUserProfile(user) {
    const userInfo = formatUserInfo(user);

    // 隐藏登录界面,显示用户信息
    loginSection.classList.add('hidden');
    userSection.classList.remove('hidden');

    // 更新用户信息
    userAvatar.src = userInfo.photoURL;
    userAvatar.alt = userInfo.displayName;
    userName.textContent = userInfo.displayName;
    userEmail.textContent = userInfo.email;

    // 更新详细信息
    infoUid.textContent = userInfo.uid;
    infoEmail.textContent = userInfo.email;
    infoEmailVerified.textContent = userInfo.emailVerified;
    infoCreatedAt.textContent = formatDate(userInfo.createdAt);
    infoLastSignIn.textContent = formatDate(userInfo.lastSignIn);
    infoProvider.textContent = getProviderName(userInfo.providerId);

    // 恢复登出按钮状态
    logoutBtn.disabled = false;
    logoutBtn.innerHTML = '<span class="btn-icon">🚪</span> 登出';
}

/**
 * 格式化日期
 */
function formatDate(dateString) {
    if (!dateString) return '未知';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * 获取提供商名称
 */
function getProviderName(providerId) {
    const providers = {
        'google.com': 'Google',
        'facebook.com': 'Facebook',
        'twitter.com': 'Twitter',
        'github.com': 'GitHub'
    };
    return providers[providerId] || providerId;
}

/**
 * 注册 Service Worker
 */
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('./service-worker.js');
            console.log('Service Worker 注册成功:', registration.scope);
        } catch (error) {
            console.error('Service Worker 注册失败:', error);
        }
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
