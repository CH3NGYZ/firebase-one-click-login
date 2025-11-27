// 路径配置 - 用于 GitHub Pages 部署
// 如果部署到根域名,BASE_PATH 为 '/'
// 如果部署到子目录,BASE_PATH 为 '/repository-name/'

// 自动检测部署路径
const BASE_PATH = window.location.pathname.match(/^\/[^\/]+\//)?.[0] || '/';

// 导出配置
export { BASE_PATH };

// 辅助函数:获取资源的完整路径
export function getAssetPath(path) {
    // 移除开头的斜杠
    const cleanPath = path.replace(/^\//, '');
    // 确保 BASE_PATH 以斜杠结尾
    const basePath = BASE_PATH.endsWith('/') ? BASE_PATH : BASE_PATH + '/';
    return basePath + cleanPath;
}
