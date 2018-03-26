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
const step31 = r => require.ensure([], (require) => { r(require('@/page/step/step3_1')); }, 'step31');
const step4 = r => require.ensure([], (require) => { r(require('@/page/step/step4')); }, 'step4');
const step5 = r => require.ensure([], (require) => { r(require('@/page/step/step5')); }, 'step5');
const pwmsg = r => require.ensure([], (require) => { r(require('@/page/pw/msg')); }, 'pwmsg');
const index = r => require.ensure([], (require) => { r(require('@/page/index')); }, 'index');
const addOfficer = r => require.ensure([], (require) => { r(require('@/page/addOfficer')); }, 'addOfficer');
const officermsg = r => require.ensure([], (require) => { r(require('@/page/addOfficer/msg')); }, 'officermsg');
const officerlist = r => require.ensure([], (require) => { r(require('@/page/officerList')); }, 'officerlist');
const officerdetail = r => require.ensure([], (require) => { r(require('@/page/officerList/detail')); }, 'officerdetail');
const decEnt = r => require.ensure([], (require) => { r(require('@/page/decEnt')); }, 'decEnt');
const decEntMsg = r => require.ensure([], (require) => { r(require('@/page/decEnt/msg')); }, 'decEntMsg');
const entList = r => require.ensure([], (require) => { r(require('@/page/entList')); }, 'entList');
const entListdetail = r => require.ensure([], (require) => { r(require('@/page/entList/detail')); }, 'entListdetail');
const entListedit = r => require.ensure([], (require) => { r(require('@/page/entList/edit')); }, 'edit');
const recommendlist = r => require.ensure([], (require) => { r(require('@/page/recommendlist')); }, 'recommendlist');
const addUser = r => require.ensure([], (require) => { r(require('@/page/addUser')); }, 'addUser');
const userlist = r => require.ensure([], (require) => { r(require('@/page/addUser/list')); }, 'userlist');
const userdetail = r => require.ensure([], (require) => { r(require('@/page/addUser/detail')); }, 'userdetail');
const useredit = r => require.ensure([], (require) => { r(require('@/page/addUser/edit')); }, 'useredit');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: addUser,
    },
    {
      path: '/userlist',
      name: 'userlist',
      component: userlist,
    },
    {
      path: '/userdetail',
      name: 'userdetail',
      component: userdetail,
    },
    {
      path: '/useredit',
      name: 'useredit',
      component: useredit,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/recommendlist',
      name: 'recommendlist',
      component: recommendlist,
    },
    {
      path: '/entListedit',
      name: 'entListedit',
      component: entListedit,
    },
    {
      path: '/entList',
      name: 'entList',
      component: entList,
    },
    {
      path: '/entListdetail',
      name: 'entListdetail',
      component: entListdetail,
    },
    {
      path: '/decEnt',
      name: 'decEnt',
      component: decEnt,
    },
    {
      path: '/decEntMsg',
      name: 'decEntMsg',
      component: decEntMsg,
    },
    {
      path: '/addOfficer',
      name: 'addOfficer',
      component: addOfficer,
    },
    {
      path: '/officermsg',
      name: 'officermsg',
      component: officermsg,
    },
    {
      path: '/officerlist',
      name: 'officerlist',
      component: officerlist,
    },
    {
      path: '/officerdetail',
      name: 'officerdetail',
      component: officerdetail,
    },
    {
      path: '/pwmsg',
      name: 'pwmsg',
      component: pwmsg,
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
      path: '/step31',
      name: 'step31',
      component: step31,
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
