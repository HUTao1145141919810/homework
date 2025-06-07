<template>
  <div id="survey">
    <h1>心理问卷调查</h1>
    <p>以下是一些关于你心理状态的问题，请根据实际情况选择答案。</p>
    <form @submit.prevent="submitSurvey">
      <div>
        <label>你最近是否感到情绪低落？</label>
        <select v-model="answers.q1">
          <option>是</option>
          <option>否</option>
        </select>
      </div>
      <div>
        <label>你是否经常失眠？</label>
        <select v-model="answers.q2">
          <option>是</option>
          <option>否</option>
        </select>
      </div>
      <!-- 可以继续添加更多问题 -->
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PsychologicalSurvey',
  data() {
    return {
      answers: {
        q1: '',
        q2: ''
      }
    };
  },
  methods: {
    async submitSurvey() {
      try {
        // 假设这里向后端发送提交请求
        const response = await axios.post('http://localhost:3307/api/survey', this.answers);
        if (response.data.success) {
          alert('提交成功');
          window.close();
        }
      } catch (error) {
        console.error('提交失败:', error);
        alert('提交失败，请稍后再试');
      }
    }
  }
};
</script>

<style scoped>
#survey {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

form div {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

select {
  width: 100%;
  padding: 8px;
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