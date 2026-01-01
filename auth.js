// 模拟的用户凭据（实际项目中建议使用更安全的方式）
const VALID_CREDENTIALS = {
  username: "admin",
  password: "password123" // 实际使用时请修改为强密码
};

// 登录验证函数
function login(username, password) {
  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    // 生成简单的令牌（实际项目可使用JWT）
    const token = "user_" + Date.now();
    // 存储令牌和登录状态
    localStorage.setItem("authToken", token);
    localStorage.setItem("isLoggedIn", "true");
    return true;
  }
  return false;
}

// 检查是否已登录
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true" && localStorage.getItem("authToken");
}

// 登出函数
function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}

// 保护页面的验证函数
function protectPage() {
  if (!isLoggedIn()) {
    // 未登录则跳转到登录页，并记录来源页面
    window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
  }
}

// 导出函数供其他页面使用
window.auth = {
  login,
  isLoggedIn,
  logout,
  protectPage
};
