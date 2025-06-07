<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="tabs">
        <button :class="{ active: currentTab === 'login' }" @click="currentTab = 'login'">登录</button>
        <button :class="{ active: currentTab === 'register' }" @click="currentTab = 'register'">注册</button>
      </div>

      <div class="tab-content">
        <!-- 登录表单 -->
        <div v-if="currentTab === 'login'" class="form-container">
          <h2>用户登录</h2>
          <input v-model="loginForm.username" placeholder="用户名" type="text" />
          <input v-model="loginForm.password" placeholder="密码" type="password" />
          <button @click="handleLogin">登录</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>

        <!-- 注册表单 -->
        <div v-if="currentTab === 'register'" class="form-container">
          <h2>用户注册</h2>
          <input v-model="registerForm.username" placeholder="用户名" type="text" />
          <input v-model="registerForm.password" placeholder="密码" type="password" />
          <input v-model="registerForm.confirmPassword" placeholder="确认密码" type="password" />
          <button @click="handleRegister">注册</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$axios.post('http://localhost:3307/api/login', this.loginForm);
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', this.loginForm.username);
          this.$router.push('/dashboard');
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.errorMessage = '登录失败，请重试';
        console.error(error);
      }
    },
    
    async handleRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.errorMessage = '两次输入的密码不一致';
        return;
      }
      
      try {
        const response = await this.$axios.post('http://localhost:3307/api/register', {
          username: this.registerForm.username,
          password: this.registerForm.password
        });
        
        if (response.data.success) {
          this.errorMessage = '注册成功，请登录';
          this.currentTab = 'login';
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.errorMessage = '注册失败，请重试';
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 300px;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

.tabs button.active {
  background-color: #4CAF50;
  color: white;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-container input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-container button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>