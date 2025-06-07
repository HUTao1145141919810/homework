<template>
  <div id="app">
    <!-- 这里可以保留你的标题或者其他全局元素 -->
    <h1>用户管理系统</h1>
    <!-- 路由出口，用来显示当前路由对应的组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>