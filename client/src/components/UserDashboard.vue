<template>
  <div>
    <div class="header">
      <h2>心理测评中心</h2>
      <button @click="logout">退出登录</button>
    </div>
    
    <div class="welcome-message">
      <p>欢迎回来，{{ username }}!</p>
    </div>
    
    <div class="survey-container">
      <SCL90Survey />
    </div>
  </div>
</template>

<script>
import SCL90Survey from './SCL90Survey.vue';

export default {
  name: 'UserDashboard', // 已修改为多单词
  components: {
    SCL90Survey
  },
  data() {
    return {
      username: localStorage.getItem('username') || ''
    }
  },
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 20px;
}

.header button {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.welcome-message {
  margin-bottom: 20px;
  font-size: 18px;
}
</style>