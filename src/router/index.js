import Vue from 'vue';
import Router from 'vue-router';

const bindEnterprise = r => require.ensure([], (require) => { r(require('@/page/bindEnterprise')); }, 'bindEnterprise');
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
const addOfficer = r => require.ensure([], (require) => { r(require('@/page/officer')); }, 'addOfficer');
const officerlist = r => require.ensure([], (require) => { r(require('@/page/officer/list')); }, 'officerlist');
const officerdetail = r => require.ensure([], (require) => { r(require('@/page/officer/detail')); }, 'officerdetail');
const decEnt = r => require.ensure([], (require) => { r(require('@/page/enterprise')); }, 'decEnt');
const entList = r => require.ensure([], (require) => { r(require('@/page/enterprise/list')); }, 'entList');
const entListdetail = r => require.ensure([], (require) => { r(require('@/page/enterprise/detail')); }, 'entListdetail');
const recommendlist = r => require.ensure([], (require) => { r(require('@/page/recommend/list')); }, 'recommendlist');
const addUser = r => require.ensure([], (require) => { r(require('@/page/user')); }, 'addUser');
const userlist = r => require.ensure([], (require) => { r(require('@/page/user/list')); }, 'userlist');
const userdetail = r => require.ensure([], (require) => { r(require('@/page/user/detail')); }, 'userdetail');
const message = r => require.ensure([], (require) => { r(require('@/page/message')); }, 'message');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/user/add',
      name: 'addUser',
      component: addUser,
    },
    {
      path: '/user/list',
      name: 'userlist',
      component: userlist,
    },
    {
      path: '/user/detail/:type/:id',
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
      path: '/ent/list',
      name: 'entList',
      component: entList,
    },
    {
      path: '/ent/detail/:type/:id',
      name: 'entListdetail',
      component: entListdetail,
    },
    {
      path: '/decEnt',
      name: 'decEnt',
      component: decEnt,
    },
    {
      path: '/officer/add',
      name: 'addOfficer',
      component: addOfficer,
    },
    {
      path: '/officer/list',
      name: 'officerlist',
      component: officerlist,
    },
    {
      path: '/officer/detail/:type/:id',
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
      path: '/bindEnterprise',
      name: 'bindEnterprise',
      component: bindEnterprise,
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
