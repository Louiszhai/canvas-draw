import Vue from 'vue';
import Router from 'vue-router';
import Canvas from '@/components/canvas';
import Sign from '@/components/sign';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Canvas',
      component: Canvas,
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign,
    },
  ],
});
