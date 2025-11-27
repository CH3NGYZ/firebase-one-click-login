// 导入 Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google 登录提供商
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// GitHub 登录提供商
const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({
    allow_signup: 'true'
});

/**
 * Google 登录函数
 */
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('Google 登录成功:', user);
        return user;
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
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;
        // GitHub 返回的额外信息
        const credential = GithubAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        console.log('GitHub 登录成功:', user);
        if (accessToken) {
            console.log('GitHub Access Token:', accessToken);
        }
        return user;
    } catch (error) {
        console.error('GitHub 登录失败:', error);
        // 处理账户已存在的情况
        if (error.code === 'auth/account-exists-with-different-credential') {
            alert('该邮箱已使用其他登录方式注册,请使用原登录方式登录');
        }
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
 * @param {Function} callback - 状态变化时的回调函数
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
 * @param {Object} user - Firebase 用户对象
 */
export function formatUserInfo(user) {
    if (!user) return null;

    return {
        uid: user.uid,
        displayName: user.displayName || '未设置',
        email: user.email || '未设置',
        photoURL: user.photoURL || 'https://via.placeholder.com/120',
        emailVerified: user.emailVerified ? '已验证' : '未验证',
        createdAt: user.metadata.creationTime,
        lastSignIn: user.metadata.lastSignInTime,
        providerId: user.providerData[0]?.providerId || 'unknown'
    };
}
