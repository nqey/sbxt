// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/config/https';
import ElementUI from 'element-ui';

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import validator from './config/validator';

Vue.config.productionTip = false;
Vue.prototype.setObj = Vue.set;
Vue.prototype.$http = http;
validator(Vue);

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
