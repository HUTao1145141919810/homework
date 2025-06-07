<!-- AuthPage.vue -->
<template>
  <div>
    <!-- 登录表单 -->
    <div class="login-form">
      <h2>登录</h2>
      <input v-model="loginUser.username" placeholder="用户名" />
      <input v-model="loginUser.password" placeholder="密码" type="password" />
      <button @click="handleLogin">登录</button>
    </div>

    <!-- 注册表单 -->
    <div class="register-form">
      <h2>注册</h2>
      <input v-model="registerUser.username" placeholder="用户名" />
      <input v-model="registerUser.password" placeholder="密码" type="password" />
      <button @click="handleRegister">注册</button>
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
        email: ''
      },
      registerUser: {
        username: '',
        email: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3307/api/login', this.loginUser);
        if (response.data.success) {
          console.log('登录成功');
          // 保存JWT令牌到本地存储
          localStorage.setItem('token', response.data.token);
          // 跳转到SCL90Survey页面
          this.$router.push('/scl90-survey');
        } else {
          console.error('登录失败:', response.data.message);
        }
      } catch (error) {
        console.error('登录请求失败:', error);
      }
    },
    async handleRegister() {
      try {
        const response = await axios.post('http://localhost:3307/api/register', this.registerUser);
        if (response.data.success) {
          console.log('注册成功');
          // 注册成功后自动登录
          await this.handleLogin();
        } else {
          console.error('注册失败:', response.data.message);
        }
      } catch (error) {
        console.error('注册请求失败:', error);
      }
    }
  }
};
</script>

<style scoped>
.login-form,
.register-form {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>