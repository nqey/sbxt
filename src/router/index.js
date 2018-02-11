import Vue from 'vue';
import Router from 'vue-router';
import search from '@/page/search/search';
import bindEnterprise from '@/page/bindEnterprise/bindEnterprise';
import login from '@/page/login/login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/bindEnterprise',
      name: 'bindEnterprise',
      component: bindEnterprise,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ],
});
