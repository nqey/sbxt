import Vue from 'vue';
import Router from 'vue-router';

const bindEnterprise = r => require.ensure([], (require) => { r(require('@/page/bindEnterprise')); }, 'bindEnterprise');
const search = r => require.ensure([], (require) => { r(require('@/page/search')); }, 'search');
const login = r => require.ensure([], (require) => { r(require('@/page/login')); }, 'login');

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
