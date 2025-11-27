// 导入认证模块
import {
    getEnabledProviders,
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    signOutUser,
    onAuthStateChange,
    formatUserInfo
} from './auth.js';

// DOM 元素引用
let loginSection, userSection, loginButtonsContainer, emailFormSection, logoutBtn;
let userAvatar, userName, userEmail;
let infoUid, infoEmail, infoEmailVerified, infoCreatedAt, infoLastSignIn, infoProvider;
let emailInput, passwordInput, emailLoginBtn, emailSignupBtn, backToProvidersBtn;

/**
 * 初始化应用
 */
function initApp() {
    // 获取 DOM 元素
    loginSection = document.getElementById('login-section');
    userSection = document.getElementById('user-section');
    loginButtonsContainer = document.getElementById('login-buttons');
    emailFormSection = document.getElementById('email-form-section');
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

    emailInput = document.getElementById('email-input');
    passwordInput = document.getElementById('password-input');
    emailLoginBtn = document.getElementById('email-login-btn');
    emailSignupBtn = document.getElementById('email-signup-btn');
    backToProvidersBtn = document.getElementById('back-to-providers');

    // 动态生成登录按钮
    renderLoginButtons();

    // 绑定邮箱表单事件
    if (emailLoginBtn) emailLoginBtn.addEventListener('click', handleEmailLogin);
    if (emailSignupBtn) emailSignupBtn.addEventListener('click', handleEmailSignup);
    if (backToProvidersBtn) backToProvidersBtn.addEventListener('click', showProviderButtons);

    // 绑定登出事件
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
 * 动态渲染登录按钮
 */
function renderLoginButtons() {
    const providers = getEnabledProviders();
    loginButtonsContainer.innerHTML = '';

    providers.forEach((provider, index) => {
        const button = document.createElement('button');
        button.className = `btn btn-${provider.class}`;
        button.style.width = '100%';
        if (index < providers.length - 1) {
            button.style.marginBottom = '1rem';
        }

        button.innerHTML = `
      <span class="btn-icon">${provider.icon}</span>
      使用 ${provider.name} 登录
    `;

        // 绑定点击事件
        button.addEventListener('click', () => handleProviderLogin(provider));

        loginButtonsContainer.appendChild(button);
    });
}

/**
 * 处理提供商登录
 */
async function handleProviderLogin(provider) {
    const button = event.currentTarget;
    const originalText = button.innerHTML;

    try {
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span> 登录中...';

        if (provider.type === 'email') {
            // 显示邮箱登录表单
            showEmailForm();
            button.disabled = false;
            button.innerHTML = originalText;
        } else if (provider.id === 'google.com') {
            await signInWithGoogle();
        } else if (provider.id === 'github.com') {
            await signInWithGithub();
        }
    } catch (error) {
        console.error('登录错误:', error);
        let errorMessage = '登录失败: ' + error.message;

        // 友好的错误提示
        if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = '登录已取消';
        } else if (error.code === 'auth/operation-not-allowed') {
            errorMessage = '该登录方式未启用,请在 Firebase Console 中启用';
        }

        alert(errorMessage);
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

/**
 * 显示邮箱登录表单
 */
function showEmailForm() {
    loginButtonsContainer.style.display = 'none';
    emailFormSection.style.display = 'block';
    emailInput.focus();
}

/**
 * 显示提供商按钮
 */
function showProviderButtons() {
    emailFormSection.style.display = 'none';
    loginButtonsContainer.style.display = 'block';
    emailInput.value = '';
    passwordInput.value = '';
}

/**
 * 处理邮箱登录
 */
async function handleEmailLogin() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert('请输入邮箱和密码');
        return;
    }

    const originalText = emailLoginBtn.innerHTML;

    try {
        emailLoginBtn.disabled = true;
        emailSignupBtn.disabled = true;
        emailLoginBtn.innerHTML = '<span class="loading"></span> 登录中...';

        await signInWithEmail(email, password);
    } catch (error) {
        console.error('邮箱登录错误:', error);
        let errorMessage = '登录失败: ';

        if (error.code === 'auth/user-not-found') {
            errorMessage += '用户不存在,请先注册';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage += '密码错误';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage += '邮箱格式不正确';
        } else {
            errorMessage += error.message;
        }

        alert(errorMessage);
        emailLoginBtn.disabled = false;
        emailSignupBtn.disabled = false;
        emailLoginBtn.innerHTML = originalText;
    }
}

/**
 * 处理邮箱注册
 */
async function handleEmailSignup() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert('请输入邮箱和密码');
        return;
    }

    if (password.length < 6) {
        alert('密码长度至少为 6 位');
        return;
    }

    const originalText = emailSignupBtn.innerHTML;

    try {
        emailLoginBtn.disabled = true;
        emailSignupBtn.disabled = true;
        emailSignupBtn.innerHTML = '<span class="loading"></span> 注册中...';

        await signUpWithEmail(email, password);
    } catch (error) {
        console.error('注册错误:', error);
        let errorMessage = '注册失败: ';

        if (error.code === 'auth/email-already-in-use') {
            errorMessage += '该邮箱已被注册,请直接登录';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage += '邮箱格式不正确';
        } else if (error.code === 'auth/weak-password') {
            errorMessage += '密码强度太弱';
        } else {
            errorMessage += error.message;
        }

        alert(errorMessage);
        emailLoginBtn.disabled = false;
        emailSignupBtn.disabled = false;
        emailSignupBtn.innerHTML = originalText;
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
    showProviderButtons();

    // 重新渲染登录按钮(恢复状态)
    renderLoginButtons();
}

/**
 * 显示用户信息
 */
function showUserProfile(user) {
    const userInfo = formatUserInfo(user);

    loginSection.classList.add('hidden');
    userSection.classList.remove('hidden');

    userAvatar.src = userInfo.photoURL;
    userAvatar.alt = userInfo.displayName;
    userName.textContent = userInfo.displayName;
    userEmail.textContent = userInfo.email;

    infoUid.textContent = userInfo.uid;
    infoEmail.textContent = userInfo.email;
    infoEmailVerified.textContent = userInfo.emailVerified;
    infoCreatedAt.textContent = formatDate(userInfo.createdAt);
    infoLastSignIn.textContent = formatDate(userInfo.lastSignIn);
    infoProvider.textContent = getProviderName(userInfo.providerId);

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
        'github.com': 'GitHub',
        'password': 'Email/Password',
        'facebook.com': 'Facebook',
        'twitter.com': 'Twitter'
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
