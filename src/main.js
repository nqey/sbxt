// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import cookie from '@/components/tool/cookie';
import axios from 'axios';

import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  // 监听路由检查登录
  watch: {
    $route: 'checkLogin',
  },
  // 进入页面时
  created() {
    this.checkLogin();
    if (cookie.getCookie('username')) {
      this.$router.push('/search');
    }
  },
  methods: {
    checkLogin() {
      // cookie操作方法在源码里有或者参考网上的即可
      if (!cookie.getCookie('username')) {
        // 如果没有登录状态则跳转到登录页
        this.$router.push('/login');
      }
    },
  },
});