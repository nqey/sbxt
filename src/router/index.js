import Vue from 'vue';
import Router from 'vue-router';

const sysMsg = r => require.ensure([], (require) => { r(require('@/page/system')); }, 'sysMsg');
const sysMsgDetail = r => require.ensure([], (require) => { r(require('@/page/system/detail')); }, 'sysMsgDetail');
const agency = r => require.ensure([], (require) => { r(require('@/page/login/agency')); }, 'agency');
const search = r => require.ensure([], (require) => { r(require('@/page/search')); }, 'search');
const login = r => require.ensure([], (require) => { r(require('@/page/login')); }, 'login');
const step1 = r => require.ensure([], (require) => { r(require('@/page/register/step1')); }, 'step1');
const step11 = r => require.ensure([], (require) => { r(require('@/page/register/step1_1')); }, 'step11');
const step2 = r => require.ensure([], (require) => { r(require('@/page/register/step2')); }, 'step2');
const step3 = r => require.ensure([], (require) => { r(require('@/page/register/step3')); }, 'step3');
const step4 = r => require.ensure([], (require) => { r(require('@/page/register/step4')); }, 'step4');
const step5 = r => require.ensure([], (require) => { r(require('@/page/register/step5')); }, 'step5');
const resetPw = r => require.ensure([], (require) => { r(require('@/page/register/resetPw')); }, 'resetPw');
const resetPwMsg = r => require.ensure([], (require) => { r(require('@/page/register/resetPwMsg')); }, 'resetPwMsg');
const index = r => require.ensure([], (require) => { r(require('@/page/index')); }, 'index');
const indexdetail = r => require.ensure([], (require) => { r(require('@/page/index/detail')); }, 'indexdetail');
const officer = r => require.ensure([], (require) => { r(require('@/page/officer')); }, 'officer');
const officerEdit = r => require.ensure([], (require) => { r(require('@/page/officer/edit')); }, 'officerEdit');
const officerlist = r => require.ensure([], (require) => { r(require('@/page/officer/list')); }, 'officerlist');
const officerdetail = r => require.ensure([], (require) => { r(require('@/page/officer/detail')); }, 'officerdetail');
const decEnt = r => require.ensure([], (require) => { r(require('@/page/enterprise')); }, 'decEnt');
const decEntEdit = r => require.ensure([], (require) => { r(require('@/page/enterprise/edit')); }, 'decEntEdit');
const entList = r => require.ensure([], (require) => { r(require('@/page/enterprise/list')); }, 'entList');
const entListdetail = r => require.ensure([], (require) => { r(require('@/page/enterprise/detail')); }, 'entListdetail');
const recommendlist = r => require.ensure([], (require) => { r(require('@/page/recommend/list')); }, 'recommendlist');
const recommendOfficerList = r => require.ensure([], (require) => { r(require('@/page/recommend/officer/list')); }, 'recommendOfficerList');
const user = r => require.ensure([], (require) => { r(require('@/page/user')); }, 'user');
const userEdit = r => require.ensure([], (require) => { r(require('@/page/user/edit')); }, 'userEdit');
const userlist = r => require.ensure([], (require) => { r(require('@/page/user/list')); }, 'userlist');
const userdetail = r => require.ensure([], (require) => { r(require('@/page/user/detail')); }, 'userdetail');
const message = r => require.ensure([], (require) => { r(require('@/page/message')); }, 'message');
const officerRegister = r => require.ensure([], (require) => { r(require('@/page/officer/register')); }, 'officerRegister');
const officerRegisterSuccess = r => require.ensure([], (require) => { r(require('@/page/officer/registerSuccess')); }, 'officerRegisterSuccess');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/officer/register',
      name: 'officerRegister',
      component: officerRegister,
    },
    {
      path: '/officer/registerSuccess',
      name: 'officerRegisterSuccess',
      component: officerRegisterSuccess,
    },
    {
      path: '/user/entry',
      name: 'user',
      component: user,
    },
    {
      path: '/user/edit/:id',
      name: 'userEdit',
      component: userEdit,
    },
    {
      path: '/user/list',
      name: 'userlist',
      component: userlist,
    },
    {
      path: '/user/detail/:id',
      name: 'userdetail',
      component: userdetail,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/index/detail/:id',
      name: 'indexdetail',
      component: indexdetail,
    },
    {
      path: '/recommend/list',
      name: 'recommendlist',
      component: recommendlist,
    },
    {
      path: '/recommend/officer/list',
      name: 'recommendOfficerList',
      component: recommendOfficerList,
    },
    {
      path: '/ent/list',
      name: 'entList',
      component: entList,
    },
    {
      path: '/ent/detail/:id',
      name: 'entListdetail',
      component: entListdetail,
    },
    {
      path: '/decEnt/entry',
      name: 'decEnt',
      component: decEnt,
    },
    {
      path: '/decEnt/edit/:id',
      name: 'decEntEdit',
      component: decEntEdit,
    },
    {
      path: '/officer/entry',
      name: 'officer',
      component: officer,
    },
    {
      path: '/officer/edit/:id',
      name: 'officerEdit',
      component: officerEdit,
    },
    {
      path: '/officer/list',
      name: 'officerlist',
      component: officerlist,
    },
    {
      path: '/officer/detail/:id',
      name: 'officerdetail',
      component: officerdetail,
    },
    {
      path: '/password/reset',
      name: 'resetPw',
      component: resetPw,
    },
    {
      path: '/password/reset/msg',
      name: 'resetPwMsg',
      component: resetPwMsg,
    },
    {
      path: '/sys/msg/list',
      name: 'sysMsg',
      component: sysMsg,
    },
    {
      path: '/sys/msg/detail/:id',
      name: 'sysMsgDetail',
      component: sysMsgDetail,
    },
    {
      path: '/agency/:type',
      name: 'agency',
      component: agency,
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
      path: '/step2/:type',
      name: 'step2',
      component: step2,
    },
    {
      path: '/step3',
      name: 'step3',
      component: step3,
    },
    {
      path: '/step4/:type',
      name: 'step4',
      component: step4,
    },
    {
      path: '/step5',
      name: 'step5',
      component: step5,
    },
    {
      path: '/message',
      name: 'message',
      component: message,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({
      path: '/login',
    });
  } else {
    next();
  }
});

export default router;
