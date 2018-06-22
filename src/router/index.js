import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/search',
      name: 'search',
      component: r => require.ensure([], (require) => { r(require('@/page/search')); }, 'search'),
    },
    {
      path: '/officer/register',
      name: 'officerRegister',
      component: r => require.ensure([], (require) => { r(require('@/page/officer/register')); }, 'officerRegister'),
    },
    {
      path: '/officer/registerEl',
      name: 'registerEl',
      component: r => require.ensure([], (require) => { r(require('@/page/officer/registerEl')); }, 'registerEl'),
    },
    {
      path: '/officer/sblist',
      name: 'sblist',
      component: r => require.ensure([], (require) => { r(require('@/page/officer/sblist')); }, 'sblist'),
    },
    {
      path: '/officer/registerSuccess',
      name: 'officerRegisterSuccess',
      component: r => require.ensure([], (require) => { r(require('@/page/officer/registerSuccess')); }, 'officerRegisterSuccess'),
    },
    {
      path: '/user/entry',
      name: 'user',
      component: r => require.ensure([], (require) => { r(require('@/page/user')); }, 'user'),
    },
    {
      path: '/user/edit/:id',
      name: 'userEdit',
      component: r => require.ensure([], (require) => { r(require('@/page/user/edit')); }, 'userEdit'),
    },
    {
      path: '/user/list',
      name: 'userlist',
      component: r => require.ensure([], (require) => { r(require('@/page/user/list')); }, 'userlist'),
    },
    {
      path: '/user/detail/:id',
      name: 'userdetail',
      component: r => require.ensure([], (require) => { r(require('@/page/user/detail')); }, 'userdetail'),
    },
    {
      path: '/index',
      name: 'index',
      component: r => require.ensure([], (require) => { r(require('@/page/index')); }, 'index'),
    },
    {
      path: '/index/detail/:id',
      name: 'indexdetail',
      component: r => require.ensure([], (require) => { r(require('@/page/index/detail')); }, 'indexdetail'),
    },
    {
      path: '/recommend/list',
      name: 'recommendlist',
      component: r => require.ensure([], (require) => { r(require('@/page/recommend/list')); }, 'recommendlist'),
    },
    {
      path: '/recommend/officer/list',
      name: 'recommendOfficerList',
      component: r => require.ensure([], (require) => { r(require('@/page/recommend/officer/list')); }, 'recommendOfficerList'),
    },
    {
      path: '/recommend/officer/other/:id',
      name: 'recommendOfficerOther',
      component: r => require.ensure([], (require) => { r(require('@/page/recommend/officer/other')); }, 'recommendOfficerOther'),
    },
    {
      path: '/ent/list',
      name: 'entList',
      component: r => require.ensure([], (require) => { r(require('@/page/enterprise/list')); }, 'entList'),
    },
    {
      path: '/ent/detail/:id',
      name: 'entListdetail',
      component: r => require.ensure([], (require) => { r(require('@/page/enterprise/detail')); }, 'entListdetail'),
    },
    {
      path: '/decEnt/entry',
      name: 'decEnt',
      component: r => require.ensure([], (require) => { r(require('@/page/enterprise')); }, 'decEnt'),
    },
    {
      path: '/decEnt/edit/:id',
      name: 'decEntEdit',
      component: r => require.ensure([], (require) => { r(require('@/page/enterprise/edit')); }, 'decEntEdit'),
    },
    {
      path: '/officer/entry',
      name: 'officer',
      component: r => require.ensure([], (require) => { r(require('@/page/officer')); }, 'officer'),
    },
    {
      path: '/officer/edit/:id',
      name: 'officerEdit',
      component: r => require.ensure([], (require) => { r(require('@/page/officer/edit')); }, 'officerEdit'),
    },
    {
      path: '/officer/list',
      name: 'officerlist',
      component: r => require.ensure([], (require) => { r(require('@/page/officer/list')); }, 'officerlist'),
    },
    {
      path: '/officer/detail/:id',
      name: 'officerdetail',
      component: r => require.ensure([], (require) => { r(require('@/page/officer/detail')); }, 'officerdetail'),
    },
    {
      path: '/password/reset',
      name: 'resetPw',
      component: r => require.ensure([], (require) => { r(require('@/page/register/resetPw')); }, 'resetPw'),
    },
    {
      path: '/password/reset/msg',
      name: 'resetPwMsg',
      component: r => require.ensure([], (require) => { r(require('@/page/register/resetPwMsg')); }, 'resetPwMsg'),
    },
    {
      path: '/sys/msg/list',
      name: 'sysMsg',
      component: r => require.ensure([], (require) => { r(require('@/page/system')); }, 'sysMsg'),
    },
    {
      path: '/sys/msg/detail/:id',
      name: 'sysMsgDetail',
      component: r => require.ensure([], (require) => { r(require('@/page/system/detail')); }, 'sysMsgDetail'),
    },
    {
      path: '/agency/:type',
      name: 'agency',
      component: r => require.ensure([], (require) => { r(require('@/page/login/agency')); }, 'agency'),
    },
    {
      path: '/login',
      name: 'login',
      component: r => require.ensure([], (require) => { r(require('@/page/login')); }, 'login'),
    },
    {
      path: '/step1',
      name: 'step1',
      component: r => require.ensure([], (require) => { r(require('@/page/register/step1')); }, 'step1'),
    },
    {
      path: '/step11',
      name: 'step11',
      component: r => require.ensure([], (require) => { r(require('@/page/register/step1_1')); }, 'step11'),
    },
    {
      path: '/step2/:type',
      name: 'step2',
      component: r => require.ensure([], (require) => { r(require('@/page/register/step2')); }, 'step2'),
    },
    {
      path: '/step3',
      name: 'step3',
      component: r => require.ensure([], (require) => { r(require('@/page/register/step3')); }, 'step3'),
    },
    {
      path: '/step4/:type',
      name: 'step4',
      component: r => require.ensure([], (require) => { r(require('@/page/register/step4')); }, 'step4'),
    },
    {
      path: '/step5',
      name: 'step5',
      component: r => require.ensure([], (require) => { r(require('@/page/register/step5')); }, 'step5'),
    },
    {
      path: '/message',
      name: 'message',
      component: r => require.ensure([], (require) => { r(require('@/page/message')); }, 'message'),
    },
    {
      path: '/subsidy/apply_subsidy',
      name: 'subsidyApplySubsidy',
      component: r => require.ensure([], require => r(require('@/page/subsidy/apply_subsidy')), 'subsidyApplySubsidy'),
    },
    {
      path: '/subsidy/successful',
      name: 'subsidySuccessful',
      component: r => require.ensure([], require => r(require('@/page/subsidy/successful')), 'subsidySuccessful'),
    },
    {
      path: '/subsidy/apply',
      name: 'subsidyApply',
      component: r => require.ensure([], require => r(require('@/page/subsidy/apply')), 'subsidyApply'),
    },
    {
      path: '/subsidy/record',
      name: 'subsidyRecord',
      component: r => require.ensure([], require => r(require('@/page/subsidy/record')), 'subsidyRecord'),
    },
    {
      path: '/subsidy/list',
      name: 'subsidyList',
      component: r => require.ensure([], require => r(require('@/page/subsidy/list')), 'subsidyList'),
    },
    {
      path: '/recommend/apply_subsidy',
      name: 'subsidyApplySubsidyRecommend',
      component: r => require.ensure([], require => r(require('@/page/recommend/apply_subsidy')), 'subsidyApplySubsidyRecommend'),
    },
    {
      path: '/recommend/successful',
      name: 'subsidySuccessfulrecommend',
      component: r => require.ensure([], require => r(require('@/page/recommend/successful')), 'recommendSuccessfulrecommend'),
    },
    {
      path: '/recommend/apply',
      name: 'subsidyApplyrecommend',
      component: r => require.ensure([], require => r(require('@/page/recommend/apply')), 'recommendApplyrecommend'),
    },
    {
      path: '/recommend/record',
      name: 'subsidyRecordrecommend',
      component: r => require.ensure([], require => r(require('@/page/recommend/record')), 'recommendRecordrecommend'),
    },
    {
      path: '/recommend/detail',
      name: 'recommenddetail',
      component: r => require.ensure([], require => r(require('@/page/recommend/detail')), 'recommenddetail'),
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
