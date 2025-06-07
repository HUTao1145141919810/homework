<template>
  <div id="app">
    <h1>用户管理系统</h1>
    
    <div class="user-form">
      <h2>添加用户</h2>
      <input v-model="newUser.name" placeholder="姓名" />
      <input v-model="newUser.email" placeholder="邮箱" />
      <button @click="addUser">提交</button>
    </div>
    
    <div class="user-list">
      <h2>用户列表</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      users: [],
      newUser: {
        name: '',
        email: ''
      }
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3307/api/users');
        this.users = response.data.data;
      } catch (error) {
        console.error('获取用户失败:', error);
      }
    },
    async addUser() {
      try {
        const response = await axios.post('http://localhost:3307/api/users', this.newUser);
        if (response.data.success) {
          this.newUser = { name: '', email: '' };
          this.fetchUsers();
        }
      } catch (error) {
        console.error('添加用户失败:', error);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.user-form, .user-list {
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px;
  margin-bottom: 5px;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>