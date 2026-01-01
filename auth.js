// 多用户凭据列表（可自由添加/删除用户）
// 格式：{ username: 用户名, password: 密码, nickname: 昵称（可选） }
const VALID_USERS = [
  {
    username: "shhjwu5",
    password: "daqiezi1234",
    nickname: "管理员"
  },
  {
    username: "Xue",
    password: "001212",
    nickname: "普通用户1"
  }
  // 如需添加更多用户，直接按上述格式新增对象即可
];

// 登录验证函数（适配多用户）
function login(username, password) {
  // 遍历用户列表，查找匹配的用户名和密码
  const matchedUser = VALID_USERS.find(user => {
    return user.username === username && user.password === password;
  });

  if (matchedUser) {
    // 生成简单的令牌（实际项目可使用JWT）
    const token = "user_" + Date.now() + "_" + username;
    // 存储令牌、登录状态和当前用户信息（便于页面展示）
    localStorage.setItem("authToken", token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(matchedUser)); // 存储用户完整信息
    return true;
  }
  return false;
}

// 检查是否已登录
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true" && localStorage.getItem("authToken");
}

// 获取当前登录用户信息（新增辅助函数）
function getCurrentUser() {
  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
}

// 登出函数
function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser"); // 清除用户信息
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
  getCurrentUser, // 新增导出
  logout,
  protectPage
};
