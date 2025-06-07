import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthPage from '../components/AuthPage.vue';
import UserDashboard from '../components/UserDashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: AuthPage
  },
{
  path: '/dashboard',
  name: 'UserDashboard',
  component: UserDashboard,
  meta: { requiresAuth: true }
}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
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