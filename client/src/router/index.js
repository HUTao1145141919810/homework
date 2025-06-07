import { createRouter, createWebHistory } from 'vue-router';
import LoginRegister from '../components/LoginRegister.vue';
import PsychologicalSurvey from '../components/PsychologicalSurvey.vue';

const routes = [
  {
    path: '/',
    name: 'LoginRegister',
    component: LoginRegister
  },
  {
    path: '/survey',
    name: 'PsychologicalSurvey',
    component: PsychologicalSurvey
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;