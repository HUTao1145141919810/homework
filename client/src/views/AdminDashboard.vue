<template>
  <div>
    <div class="header">
      <h2>后台管理页面</h2>
      <button @click="logout">退出登录</button>
    </div>

    <div class="action-bar">
      <button @click="showAddForm" class="btn-add">添加用户数据</button>
      <div class="search-container">
        <input v-model="searchUsername" placeholder="搜索用户名" @keyup.enter="searchScl90History">
        <button @click="searchScl90History">搜索</button>
      </div>
    </div>

    <div class="data-container">
      <h3>用户SCL-90历史记录</h3>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="scl90History.length === 0" class="empty-data">暂无数据</div>
      <table v-else>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>创建时间</th>
            <th>总分</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in scl90History" :key="record.id">
            <td>{{ record.id }}</td>
            <td>{{ record.username }}</td>
            <td>{{ formatDate(record.created_at) }}</td>
            <td>{{ calculateTotalScore(record) }}</td>
            <td>
              <button @click="viewRecord(record.id)" class="btn-view">查看</button>
              <button @click="editRecord(record.id)" class="btn-edit">编辑</button>
              <button @click="deleteRecord(record.id)" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加/编辑表单模态框 -->
    <div v-if="showFormModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ formType === 'add' ? '添加用户数据' : '编辑答题结果' }}</h3>
          <button @click="closeFormModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>用户名:</label>
            <input v-model="formData.username" type="text" :disabled="formType === 'edit'" />
          </div>
          
          <div class="form-group">
            <label>答题结果:</label>
            <div class="answers-grid">
              <div v-for="(answer, index) in formData.answers" :key="index" class="answer-item">
                <span>{{ index + 1 }}:</span>
                <!-- 修改这一行，通过索引访问数组元素 -->
                <select v-model.number="formData.answers[index]">
                  <option value="0">从无</option>
                  <option value="1">轻度</option>
                  <option value="2">中度</option>
                  <option value="3">偏重</option>
                  <option value="4">严重</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeFormModal" class="btn-cancel">取消</button>
          <button @click="saveRecord" class="btn-save">{{ formType === 'add' ? '添加' : '保存' }}</button>
        </div>
      </div>
    </div>

    <!-- 查看详情模态框 -->
    <div v-if="showViewModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>答题详情</h3>
          <button @click="closeViewModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-item">
            <span class="detail-label">用户名:</span>
            <span class="detail-value">{{ viewData.username }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">创建时间:</span>
            <span class="detail-value">{{ formatDate(viewData.created_at) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">总分:</span>
            <span class="detail-value">{{ calculateTotalScore(viewData) }}</span>
          </div>
          
          <h4>各因子得分:</h4>
          <div class="factors-grid">
            <div v-for="(factor, index) in factorNames" :key="index" class="factor-item">
              <span>{{ factor }}:</span>
              <span>{{ calculateFactorScore(viewData, index) }}</span>
            </div>
          </div>
          
          <h4>答题结果:</h4>
          <div class="answers-grid">
            <div v-for="(answer, index) in viewData.answers" :key="index" class="answer-item">
              <span>{{ index + 1 }}:</span>
              <span>{{ answerTexts[answer] }}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeViewModal" class="btn-close">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      scl90History: [],
      loading: false,
      searchUsername: '',
      
      // 表单相关
      showFormModal: false,
      formType: 'add', // 'add' 或 'edit'
      formData: {
        username: '',
        answers: Array(90).fill(0) // 初始化为90个0
      },
      
      // 查看详情相关
      showViewModal: false,
      viewData: {},
      
      // 因子名称和答案文本映射
      factorNames: [
        '躯体化', '强迫症状', '人际关系敏感', '抑郁', '焦虑', 
        '敌对', '恐怖', '偏执', '精神病性', '其他'
      ],
      factorIndices: [
        [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87], // 躯体化
        [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58, 61, 64, 67, 70, 73, 76, 79, 82, 85, 88], // 强迫症状
        [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77, 80, 83, 86, 89], // 人际关系敏感
        [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87], // 抑郁
        [4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58, 61, 64, 67, 70, 73, 76, 79, 82, 85, 88, 91], // 焦虑
        [5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77, 80, 83, 86, 89, 92], // 敌对
        [6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93], // 恐怖
        [7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58, 61, 64, 67, 70, 73, 76, 79, 82, 85, 88, 91, 94], // 偏执
        [8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77, 80, 83, 86, 89, 92, 95], // 精神病性
        [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96]  // 其他
      ],
      answerTexts: ['从无', '轻度', '中度', '偏重', '严重']
    };
  },
  mounted() {
    this.fetchScl90History();
  },
  methods: {
    // 获取所有SCL90历史记录
    async fetchScl90History() {
      this.loading = true;
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3307/api/admin/scl90history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          // 转换数据库格式为前端格式
          this.scl90History = response.data.data.map(record => ({
            ...record,
            answers: Array.from({ length: 90 }, (_, i) => record[`q${i + 1}`])
          }));
        }
      } catch (error) {
        console.error('获取SCL90历史记录失败:', error);
        alert('获取数据失败，请重试');
      } finally {
        this.loading = false;
      }
    },
    
    // 搜索用户历史记录
    async searchScl90History() {
      this.loading = true;
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3307/api/admin/scl90history?username=${this.searchUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          // 转换数据库格式为前端格式
          this.scl90History = response.data.data.map(record => ({
            ...record,
            answers: Array.from({ length: 90 }, (_, i) => record[`q${i + 1}`])
          }));
        }
      } catch (error) {
        console.error('搜索SCL90历史记录失败:', error);
        alert('搜索失败，请重试');
      } finally {
        this.loading = false;
      }
    },
    
    // 删除记录
    async deleteRecord(id) {
      if (!confirm('确定要删除这条记录吗？')) return;
      
      const token = localStorage.getItem('token');
      try {
        const response = await axios.delete(`http://localhost:3307/api/admin/scl90history/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          alert('删除成功');
          this.fetchScl90History();
        } else {
          alert(response.data.message || '删除失败');
        }
      } catch (error) {
        console.error('删除SCL90记录失败:', error);
        alert('删除失败，请重试');
      }
    },
    
    // 显示添加表单
    showAddForm() {
      this.formType = 'add';
      this.formData = {
        username: '',
        answers: Array(90).fill(0)
      };
      this.showFormModal = true;
    },
    
    // 编辑记录
    async editRecord(id) {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3307/api/admin/scl90history/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          const record = response.data.data;
          this.formType = 'edit';
          // 保存记录ID和转换数据格式
          this.formData = {
            id: record.id,
            username: record.username,
            answers: Array.from({ length: 90 }, (_, i) => record[`q${i + 1}`])
          };
          this.showFormModal = true;
        } else {
          alert(response.data.message || '获取记录失败');
        }
      } catch (error) {
        console.error('获取SCL90记录失败:', error);
        alert('获取记录失败，请重试');
      }
    },
    
    // 查看记录详情
    async viewRecord(id) {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3307/api/admin/scl90history/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          const record = response.data.data;
          this.viewData = {
            ...record,
            answers: Array.from({ length: 90 }, (_, i) => record[`q${i + 1}`])
          };
          this.showViewModal = true;
        } else {
          alert(response.data.message || '获取记录失败');
        }
      } catch (error) {
        console.error('获取SCL90记录失败:', error);
        alert('获取记录失败，请重试');
      }
    },
    
    // 保存记录（添加或编辑）
    async saveRecord() {
      // 表单验证
      if (!this.formData.username) {
        alert('请输入用户名');
        return;
      }
      
      const token = localStorage.getItem('token');
      try {
        let response;
        if (this.formType === 'add') {
          // 创建一个不包含id的新对象，因为添加时不需要id
          const addData = {
            username: this.formData.username,
            answers: this.formData.answers
          };
          // 添加新记录
          response = await axios.post('http://localhost:3307/api/admin/scl90history', addData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } else {
          // 更新现有记录
          response = await axios.put(`http://localhost:3307/api/admin/scl90history/${this.formData.id}`, this.formData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
        
        if (response.data.success) {
          alert(this.formType === 'add' ? '添加成功' : '更新成功');
          this.closeFormModal();
          this.fetchScl90History();
        } else {
          alert(response.data.message || (this.formType === 'add' ? '添加失败' : '更新失败'));
        }
      } catch (error) {
        console.error(`${this.formType === 'add' ? '添加' : '更新'}SCL90记录失败:`, error);
        alert(`${this.formType === 'add' ? '添加' : '更新'}失败，请重试`);
      }
    },
    
    // 关闭表单模态框
    closeFormModal() {
      this.showFormModal = false;
    },
    
    // 关闭查看详情模态框
    closeViewModal() {
      this.showViewModal = false;
    },
    
    // 退出登录
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      this.$router.push('/');
    },
    
    // 格式化日期
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    
    // 计算总分
    calculateTotalScore(record) {
      if (!record || !record.answers) return 0;
      return record.answers.reduce((sum, answer) => sum + answer, 0);
    },
    
    // 计算因子得分
    calculateFactorScore(record, factorIndex) {
      if (!record || !record.answers) return 0;
      const indices = this.factorIndices[factorIndex];
      return indices.reduce((sum, index) => {
        // 确保索引在有效范围内
        if (index >= 0 && index < record.answers.length) {
          return sum + record.answers[index];
        }
        return sum;
      }, 0);
    }
  }
};
</script>

<style scoped>
/* 保持原有的样式不变 */
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

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-container input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
}

.search-container button, .btn-add {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.data-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.btn-view {
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-edit {
  background-color: #FFC107;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-delete {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.loading {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}

.empty-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.modal-header h3 {
  margin: 0;
}

.close-btn {
  font-size: 24px;
  cursor: pointer;
  background: none;
  border: none;
}

.modal-body {
  padding: 15px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  border-top: 1px solid #ddd;
}

.btn-cancel {
  padding: 8px 16px;
  background-color: #f2f2f2;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-save {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-close {
  padding: 8px 16px;
  background-color: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.answers-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.answer-item {
  display: flex;
  align-items: center;
}

.answer-item span {
  margin-right: 5px;
}

.detail-item {
  margin-bottom: 10px;
}

.detail-label {
  font-weight: bold;
  margin-right: 10px;
}

.factors-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.factor-item {
  display: flex;
  align-items: center;
}

.factor-item span:first-child {
  margin-right: 5px;
  font-weight: bold;
}
</style>