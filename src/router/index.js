import Vue from 'vue';
import Router from 'vue-router';
import Canvas from '@/components/canvas';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Canvas',
      component: Canvas,
    },
  ],
});
