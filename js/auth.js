// 导入 Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    EmailAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    fetchSignInMethodsForEmail
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 定义所有支持的提供商配置
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

// 配置提供商参数
PROVIDERS_CONFIG['google.com'].provider.setCustomParameters({
    prompt: 'select_account'
});

PROVIDERS_CONFIG['github.com'].provider.setCustomParameters({
    allow_signup: 'true'
});

/**
 * 获取启用的认证提供商列表
 * 注意: Firebase 没有直接的 API 来获取启用的提供商
 * 这里返回配置的所有提供商,实际使用时会在登录失败时处理
 */
export function getEnabledProviders() {
    // 返回所有配置的提供商
    // 实际部署时,可以根据 Firebase Console 配置手动调整
    return Object.keys(PROVIDERS_CONFIG).map(id => ({
        id,
        ...PROVIDERS_CONFIG[id]
    }));
}

/**
 * 通用登录函数 - 根据提供商 ID 登录
 */
export async function signInWithProvider(providerId) {
    const config = PROVIDERS_CONFIG[providerId];

    if (!config) {
        throw new Error(`不支持的提供商: ${providerId}`);
    }

    if (config.type === 'popup') {
        return await signInWithPopup(auth, config.provider);
    } else if (config.type === 'email') {
        // 邮箱登录需要单独处理,返回 null 表示需要显示邮箱表单
        return null;
    }
}

/**
 * Google 登录函数
 */
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, PROVIDERS_CONFIG['google.com'].provider);
        console.log('Google 登录成功:', result.user);
        return result.user;
    } catch (error) {
        console.error('Google 登录失败:', error);
        throw error;
    }
}

/**
 * GitHub 登录函数
 */
export async function signInWithGithub() {
    try {
        const result = await signInWithPopup(auth, PROVIDERS_CONFIG['github.com'].provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        console.log('GitHub 登录成功:', result.user);
        if (accessToken) {
            console.log('GitHub Access Token:', accessToken);
        }
        return result.user;
    } catch (error) {
        console.error('GitHub 登录失败:', error);
        if (error.code === 'auth/account-exists-with-different-credential') {
            alert('该邮箱已使用其他登录方式注册,请使用原登录方式登录');
        }
        throw error;
    }
}

/**
 * 邮箱密码登录
 */
export async function signInWithEmail(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log('邮箱登录成功:', result.user);
        return result.user;
    } catch (error) {
        console.error('邮箱登录失败:', error);
        throw error;
    }
}

/**
 * 邮箱密码注册
 */
export async function signUpWithEmail(email, password) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        console.log('注册成功:', result.user);
        return result.user;
    } catch (error) {
        console.error('注册失败:', error);
        throw error;
    }
}

/**
 * 登出函数
 */
export async function signOutUser() {
    try {
        await signOut(auth);
        console.log('登出成功');
    } catch (error) {
        console.error('登出失败:', error);
        throw error;
    }
}

/**
 * 监听认证状态变化
 */
export function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
}

/**
 * 获取当前用户
 */
export function getCurrentUser() {
    return auth.currentUser;
}

/**
 * 格式化用户信息用于显示
 */
export function formatUserInfo(user) {
    if (!user) return null;

    return {
        uid: user.uid,
        displayName: user.displayName || user.email?.split('@')[0] || '未设置',
        email: user.email || '未设置',
        photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=6366f1&color=fff`,
        emailVerified: user.emailVerified ? '已验证' : '未验证',
        createdAt: user.metadata.creationTime,
        lastSignIn: user.metadata.lastSignInTime,
        providerId: user.providerData[0]?.providerId || 'unknown'
    };
}
