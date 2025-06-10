import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '../components/AuthPage.vue';
import UserDashboard from '../components/UserDashboard.vue';
import SCL90Survey from '../views/SCL90Survey.vue';
import AdminDashboard from '../views/AdminDashboard.vue'; // 假设存在后台管理页面组件

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: AuthPage
  },
  {
    path: '/scl90-survey',
    name: 'SCL90Survey',
    component: SCL90Survey
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAdmin: true } // 新增管理员权限验证
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // 假设后端返回的管理员标识

  if (to.meta.requiresAuth && !token) {
    next('/');
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/dashboard'); // 如果不是管理员，跳转到普通用户页面
  } else {
    next();
  }
});

export default router;