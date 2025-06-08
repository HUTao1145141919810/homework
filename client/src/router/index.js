import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '../components/AuthPage.vue';
import UserDashboard from '../components/UserDashboard.vue';
import SCL90Survey from '../views/SCL90Survey.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/');
  } else {
    next();
  }
});

export default router;