<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- 顶部导航栏 -->
      <header class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
        <h1 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight">SCL - 90 心理问卷调查</h1>
        <p class="mt-2 opacity-90">请根据您最近一周内的实际感受选择最符合的选项</p>
      </header>

      <!-- 进度指示器 -->
      <div class="bg-gray-100 px-6 py-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-600">
            进度: {{ answeredQuestions }}/{{ totalQuestions }}
          </span>
          <span class="text-sm font-medium text-gray-600">
            完成度: {{ progressPercentage }}%
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
      </div>

      <!-- 问卷内容区 -->
      <form @submit.prevent="submitSurvey" class="p-6 md:p-8">
        <div class="space-y-8">
          <!-- 问题卡片 -->
          <div v-for="(question, index) in paginatedQuestions" :key="index" class="bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <div class="flex">
              <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="font-medium text-blue-800">{{ currentPage * itemsPerPage + index + 1 }}</span>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">{{ question }}</h3>
                <div class="mt-4 grid grid-cols-5 gap-2">
                  <label v-for="option in options" :key="option.value" class="cursor-pointer">
                    <input 
                      type="radio" 
                      :value="option.value" 
                      v-model="answers[currentPage * itemsPerPage + index]"
                      class="sr-only peer"
                    >
                    <div class="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all duration-200">
                      {{ option.label }}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页控制 -->
        <div class="mt-8 flex flex-col sm:flex-row justify-between items-center">
          <button 
            type="button" 
            @click="prevPage" 
            :disabled="currentPage === 0"
            class="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-600 rounded-lg font-medium transition-all duration-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <i class="fa fa-arrow-left mr-2"></i> 上一页
          </button>
          
          <div class="mt-4 sm:mt-0 text-sm text-gray-500">
            第 {{ currentPage + 1 }}/{{ totalPages }} 页
          </div>
          
          <button 
            type="button" 
            @click="nextPage" 
            :disabled="currentPage === totalPages - 1"
            class="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3 bg-gray-200 text-gray-600 rounded-lg font-medium transition-all duration-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            下一页 <i class="fa fa-arrow-right ml-2"></i>
          </button>
        </div>

        <!-- 提交按钮 -->
        <div class="mt-8">
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!isFormComplete || isSubmitting"
          >
            <i class="fa fa-check-circle mr-2"></i> 
            {{ isSubmitting ? '提交中...' : '提交问卷' }}
          </button>
        </div>
      </form>
    </div>

    <!-- 页脚 -->
    <footer class="mt-8 text-center text-sm text-gray-500">
      <p>© 2025 心理健康评估系统 | 本问卷仅供参考，非专业诊断</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scl90Questions: [
        "头痛",
        "神经过敏，心中不踏实",
        "头脑中有不必要的想法或字句盘旋",
        "头昏或昏倒",
        "对异性的兴趣减退",
        "对旁人责备求全",
        "感到别人能控制你的思想",
        "责怪别人制造麻烦",
        "忘记性大",
        "担心自己的衣饰整齐及仪态的端正",
        "容易烦恼和激动",
        "胸痛",
        "害怕空旷的场所或街道",
        "感到自己的精力下降，活动减慢",
        "想结束自己的生命",
        "听到旁人听不到的声音",
        "发抖",
        "感到大多数人都不可信任",
        "胃口不好",
        "容易哭泣",
        "同异性相处时感到害羞不自在",
        "感到受骗，中了圈套或有人想抓住你",
        "无缘无故地突然感到害怕",
        "自己不能控制地大发脾气",
        "怕单独出门",
        "经常责怪自己",
        "腰痛",
        "感到难以完成任务",
        "感到孤独",
        "感到苦闷",
        "过分担忧",
        "对事物不感兴趣",
        "感到害怕",
        "你的感情容易受到伤害",
        "旁人能知道你的私下想法",
        "感到别人不理解你、不同情你",
        "感到人们对你不友好，不喜欢你",
        "做事必须做得很慢以保证做得正确",
        "心跳得很厉害",
        "恶心或胃部不舒服",
        "感到比不上别人",
        "肌肉酸痛",
        "感到有人在监视你、谈论你",
        "难以入睡",
        "做事必须反复检查",
        "难以作出决定",
        "怕乘电车、公共汽车、地铁或火车",
        "呼吸有困难",
        "一阵阵发冷或发热",
        "因为感到害怕而避开某些东西、场合或活动",
        "脑子变空了",
        "身体发麻或刺痛",
        "喉咙有梗塞感",
        "感到前途没有希望",
        "不能集中注意力",
        "感到身体的某一部分软弱无力",
        "感到紧张或容易紧张",
        "感到手或脚发沉",
        "想到有关死亡的事",
        "吃得太多",
        "当别人看着你或谈论你时感到不自在",
        "有一些不属于你自己的想法",
        "有想打人或伤害他人的冲动",
        "醒得太早",
        "必须反复洗手、点数目或触摸某些东西",
        "睡得不稳不深",
        "有想摔坏或破坏东西的冲动",
        "有一些别人没有的想法或念头",
        "感到对别人神经过敏",
        "在商店或电影院等人多的地方感到不自在",
        "感到任何事情都很困难",
        "一阵阵恐惧或惊恐",
        "感到在公共场合吃东西很不舒服",
        "经常与人争论",
        "单独一人时神经很紧张",
        "别人对你的成绩没有作出恰当的评价",
        "即使和别人在一起也感到孤单",
        "感到坐立不安心神不定",
        "感到自己没有什么价值",
        "感到熟悉的东西变成陌生或不像是真的",
        "大叫或摔东西",
        "害怕会在公共场合昏倒",
        "感到别人想占你的便宜",
        "为一些有关“性”的想法而很苦恼",
        "你认为应该因为自己的过错而受到惩罚",
        "感到要赶快把事情做完",
        "感到自己的身体有严重问题",
        "从未感到和其他人很亲近",
        "感到自己有罪",
        "感到自己的脑子有毛病"
      ],
      answers: new Array(90).fill(''),
      currentPage: 0,
      itemsPerPage: 5,
      options: [
        { value: '没有', label: '没有' },
        { value: '很轻', label: '很轻' },
        { value: '中等', label: '中等' },
        { value: '偏重', label: '偏重' },
        { value: '严重', label: '严重' }
      ],
      isSubmitting: false // 新增：用于跟踪提交状态
    };
  },
  computed: {
    // 计算总页数
    totalPages() {
      return Math.ceil(this.scl90Questions.length / this.itemsPerPage);
    },
    // 获取当前页的问题
    paginatedQuestions() {
      const startIndex = this.currentPage * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.scl90Questions.slice(startIndex, endIndex);
    },
    // 已回答的问题数量
    answeredQuestions() {
      return this.answers.filter(answer => answer !== '').length;
    },
    // 总问题数量
    totalQuestions() {
      return this.scl90Questions.length;
    },
    // 进度百分比
    progressPercentage() {
      return Math.round((this.answeredQuestions / this.totalQuestions) * 100);
    },
    // 表单是否填写完整
    isFormComplete() {
      return this.answeredQuestions === this.totalQuestions;
    }
  },
  methods: {
    // 下一页
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    // 上一页
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    // 提交问卷
    async submitSurvey() {
      try {
        // 表单验证
        if (!this.isFormComplete) {
          alert('请回答所有问题后再提交');
          return;
        }

        // 更新提交状态
        this.isSubmitting = true;

        // 准备发送的数据
        const surveyData = {
          answers: this.answers
        };

        // 发送数据到服务器
        const response = await fetch('/api/scl90', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(surveyData)
        });

        const result = await response.json();

        if (result.success) {
          alert('提交成功！感谢您的参与。');
          this.resetForm();
        } else {
          alert('提交失败: ' + result.message);
        }
      } catch (error) {
        console.error('提交失败:', error);
        alert('提交失败，请稍后再试');
      } finally {
        // 恢复提交状态
        this.isSubmitting = false;
      }
    },
    // 重置表单
    resetForm() {
      this.answers = new Array(90).fill('');
      this.currentPage = 0;
    }
  }
};
</script>

<style scoped>
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
</style>

<style type="text/tailwindcss">
@layer utilities {
  .question-card {
    @apply bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md;
  }
  .option-button {
    @apply flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all duration-200;
  }
}
</style>