<template>
  <div id="login-register">
    <h1>登录兼注册</h1>
    <input v-model="username" placeholder="用户名" />
    <input v-model="email" placeholder="邮箱" />
    <button @click="submit">提交</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginRegister',
  data() {
    return {
      username: '',
      email: ''
    };
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post('http://localhost:3307/api/login-register', {
          username: this.username,
          email: this.email
        });
        if (response.data.success) {
          this.$router.push('/survey');
        }
      } catch (error) {
        console.error('登录/注册失败:', error);
      }
    }
  }
};
</script>

<style scoped>
#login-register {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
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