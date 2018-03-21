import Vue from 'vue';
import Router from 'vue-router';

const bindEnterprise = r => require.ensure([], (require) => { r(require('@/page/bindEnterprise')); }, 'bindEnterprise');
const noti = r => require.ensure([], (require) => { r(require('@/page/noti')); }, 'noti');
const notid = r => require.ensure([], (require) => { r(require('@/page/noti/children/notid')); }, 'notid');
const seeDetails = r => require.ensure([], (require) => { r(require('@/page/seeDetails')); }, 'seeDetails');
const search = r => require.ensure([], (require) => { r(require('@/page/search')); }, 'search');
const login = r => require.ensure([], (require) => { r(require('@/page/login')); }, 'login');
const step1 = r => require.ensure([], (require) => { r(require('@/page/step/step1')); }, 'step1');
const step11 = r => require.ensure([], (require) => { r(require('@/page/step/step1_1')); }, 'step11');
const step2 = r => require.ensure([], (require) => { r(require('@/page/step/step2')); }, 'step2');
const step3 = r => require.ensure([], (require) => { r(require('@/page/step/step3')); }, 'step3');
const step4 = r => require.ensure([], (require) => { r(require('@/page/step/step4')); }, 'step4');
const step5 = r => require.ensure([], (require) => { r(require('@/page/step/step5')); }, 'step5');

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
      path: '/noti',
      name: 'noti',
      component: noti,
    },
    {
      path: '/notid',
      name: 'notid',
      component: notid,
    },
    {
      path: '/seeDetails',
      name: 'seeDetails',
      component: seeDetails,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/step1',
      name: 'step1',
      component: step1,
    },
    {
      path: '/step11',
      name: 'step11',
      component: step11,
    },
    {
      path: '/step2',
      name: 'step2',
      component: step2,
    },
    {
      path: '/step3',
      name: 'step3',
      component: step3,
    },
    {
      path: '/step4',
      name: 'step4',
      component: step4,
    },
    {
      path: '/step5',
      name: 'step5',
      component: step5,
    },
  ],
});
