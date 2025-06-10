<template>
  <div class="auth-container">
    <!-- 装饰元素 -->
    <div class="decorative-element top-left"></div>
    <div class="decorative-element bottom-right"></div>
    
    <!-- 主内容区 -->
    <div class="auth-content">
      <!-- 品牌标识 -->
      <div class="brand-logo">
        <div class="logo-icon">SCL90</div>
        <h1 class="logo-text">心理健康测评</h1>
      </div>
      
      <!-- 表单卡片 -->
      <div class="form-card">
        <!-- 登录表单 -->
        <div class="login-form">
          <h2 class="form-title">欢迎回来</h2>
          <p class="form-subtitle">请登录您的账户</p>
          
          <div class="form-group">
            <div class="input-wrapper">
              <i class="fa fa-user input-icon"></i>
              <input v-model="loginUser.username" placeholder="用户名" />
            </div>
            <p v-if="loginError" class="error-message">{{ loginError }}</p>
          </div>
          
          <div class="form-group">
            <div class="input-wrapper">
              <i class="fa fa-lock input-icon"></i>
              <input v-model="loginUser.password" placeholder="密码" type="password" />
            </div>
            <p v-if="loginError" class="error-message">{{ loginError }}</p>
          </div>
          
          <button class="form-button" @click="handleLogin">
            <span>登录</span>
            <i class="fa fa-arrow-right button-icon"></i>
          </button>
        </div>
        
        <!-- 分隔线 -->
        <div class="divider">
          <span>或者</span>
        </div>
        
        <!-- 注册表单 -->
        <div class="register-form">
          <h2 class="form-title">创建账户</h2>
          <p class="form-subtitle">开始您的心理健康之旅</p>
          
          <div class="form-group">
            <div class="input-wrapper">
              <i class="fa fa-user-plus input-icon"></i>
              <input v-model="registerUser.username" placeholder="用户名" />
            </div>
            <p v-if="registerError" class="error-message">{{ registerError }}</p>
          </div>
          
          <div class="form-group">
            <div class="input-wrapper">
              <i class="fa fa-lock input-icon"></i>
              <input v-model="registerUser.password" placeholder="密码" type="password" />
            </div>
            <p v-if="registerError" class="error-message">{{ registerError }}</p>
          </div>
          
          <button class="form-button" @click="handleRegister">
            <span>注册</span>
            <i class="fa fa-user-plus button-icon"></i>
          </button>
          
          <p v-if="registerSuccess" class="success-message">{{ registerSuccess }}</p>
        </div>
      </div>
      
      <!-- 页脚信息 -->
      <div class="auth-footer">
        <p>© 2025 心理健康测评系统 | 保护您的隐私和健康</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AuthPage',
  data() {
    return {
      loginUser: {
        username: '',
        password: ''
      },
      registerUser: {
        username: '',
        password: ''
      },
      loginError: '',
      registerError: '',
      registerSuccess: ''
    };
  },
  methods: {
    async handleLogin() {
      this.loginError = '';
      
      // 表单验证
      if (!this.loginUser.username || !this.loginUser.password) {
        this.loginError = '请输入用户名和密码';
        return;
      }
      
      try {
        const response = await axios.post('http://localhost:3307/api/login', this.loginUser);
        
        // 检查响应状态和数据结构
        if (response.status === 200 && response.data) {
          if (response.data.success) {
            console.log('登录成功');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isAdmin', response.data.isAdmin); // 存储 isAdmin 标识
            
            // 确保路由路径与 router/index.js 中定义的一致
            if (response.data.isAdmin) {
              this.$router.push('/admin-dashboard'); // 修改为与路由配置一致的路径
            } else {
              this.$router.push('/scl90-survey');
            }
          } else {
            // 根据后端返回的错误类型显示不同的提示
            if (response.data.errorType === 'passwordError') {
              this.loginError = '密码错误，请重试';
            } else if (response.data.errorType === 'userNotFound') {
              this.loginError = '未找到用户信息，请核对/注册后再试';
            } else {
              this.loginError = response.data.message || '登录失败，请重试';
            }
          }
        } else {
          this.loginError = '登录请求失败，无效的响应格式';
          console.error('无效的响应格式:', response);
        }
      } catch (error) {
        // 细化错误处理逻辑
        if (error.response) {
          // 服务器返回了错误状态码
          console.error('登录请求错误状态码:', error.response.status);
          console.error('登录请求错误数据:', error.response.data);
          
          // 尝试从错误响应中获取自定义错误信息
          if (error.response.data && error.response.data.message) {
            this.loginError = error.response.data.message;
          } else {
            this.loginError = `登录请求失败，状态码: ${error.response.status}`;
          }
        } else if (error.request) {
          // 请求已发送，但没有收到响应
          this.loginError = '登录请求失败，没有收到服务器响应';
          console.error('登录请求没有收到响应:', error.request);
        } else {
          // 请求设置时出错
          this.loginError = '登录请求失败，请检查网络连接';
          console.error('登录请求设置错误:', error.message);
        }
      }
    },
    async handleRegister() {
      this.registerError = '';
      this.registerSuccess = '';
      
      // 表单验证
      if (!this.registerUser.username || !this.registerUser.password) {
        this.registerError = '请输入用户名和密码';
        return;
      }
      
      try {
        const response = await axios.post('http://localhost:3307/api/register', this.registerUser);
        if (response.data.success) {
          console.log('注册成功');
          this.registerSuccess = '注册成功，请登录';
          // 重置注册表单
          this.registerUser = {
            username: '',
            password: ''
          };
        } else {
          this.registerError = response.data.message || '注册失败，请重试';
        }
      } catch (error) {
        this.registerError = '注册请求失败，请检查网络连接';
        console.error('注册请求失败:', error);
      }
    }
  }
};
</script>

<style scoped>
/* 变量定义 */
:root {
  --primary: #4361ee;
  --secondary: #3f37c9;
  --accent: #4895ef;
  --neutral: #f8f9fa;
  --text: #212529;
  --text-light: #6c757d;
  --radius: 12px;
  --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  /* 新增半透明相关变量 */
  --glassmorphism-bg: rgba(255, 255, 255, 0.7); /* 半透明白色背景 */
  --glassmorphism-border: rgba(255, 255, 255, 0.3); /* 边框颜色 */
  --glassmorphism-blur: 10px; /* 模糊程度 */
  
  /* 添加缺失的绿色变量定义 */
  --green-primary: #4CAF50;
  --green-secondary: #45a049;
  --green-shadow: rgba(76, 175, 80, 0.2);
  --green-shadow-hover: rgba(76, 175, 80, 0.3);
}

/* 基础样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 修改背景图片路径 */
  background-image: url('@/assets/b.png'); /* 从public目录加载 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}

/* 添加半透明遮罩层，避免背景影响内容可读性 */
.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* 白色半透明遮罩 */
  z-index: 0;
}
/* 装饰元素 */
.decorative-element {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  opacity: 0.1;
}

.top-left {
  top: -250px;
  left: -250px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}

.bottom-right {
  bottom: -250px;
  right: -250px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%);
}

/* 内容区 */
.auth-content {
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  z-index: 1;
}

/* 品牌标识 */
.brand-logo {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text);
}

/* 表单卡片 - 添加半透明效果 */
.form-card {
  background: var(--glassmorphism-bg);
  border: 1px solid var(--glassmorphism-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(var(--glassmorphism-blur));
  -webkit-backdrop-filter: blur(var(--glassmorphism-blur));
}

.form-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* 表单通用样式 */
.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.form-subtitle {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  background: rgba(255, 255, 255, 0.8); /* 输入框半透明效果 */
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
}

input:focus + .input-icon {
  color: var(--primary);
}

/* 修复按钮样式 */
.form-button {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, var(--green-primary), var(--green-secondary));
  color: white; /* 修改为白色文本 */
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  box-shadow: 0 4px 6px var(--green-shadow);
}

.form-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px var(--green-shadow-hover);
}

.button-icon {
  margin-left: 0.5rem;
}

/* 分隔线 */
.divider {
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: var(--text-light);
  text-align: center;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #e2e8f0;
}

.divider::before {
  margin-right: 1rem;
}

.divider::after {
  margin-left: 1rem;
}

/* 消息提示 */
.error-message {
  color: #e63946;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.success-message {
  color: var(--primary);
  font-size: 0.8rem;
  margin-top: 0.75rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: rgba(67, 97, 238, 0.1);
  text-align: center;
}

/* 页脚 */
.auth-footer {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.8rem;
  color: var(--text-light);
}

/* 响应式 */
@media (max-width: 576px) {
  .auth-content {
    padding: 1.5rem;
  }
  
  .form-card {
    padding: 2rem;
  }
  
  .decorative-element {
    width: 300px;
    height: 300px;
  }
  
  .top-left {
    top: -150px;
    left: -150px;
  }
  
  .bottom-right {
    bottom: -150px;
    right: -150px;
  }
}
</style>